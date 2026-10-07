import { authenticate } from "./auth.js";
import {
  fail,
  createBatch,
  getPassport,
  savePassport,
  hash,
  fileType,
} from "./service.js";
import { validSN } from "../../../public/dpp/schema.js";
import QRCode from "qrcode";
const json = (value, status = 200) =>
  new Response(JSON.stringify(value), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
async function boundedBytes(request, limit) {
  if (Number(request.headers.get("content-length")) > limit)
    fail("Request too large", 413);
  if (!request.body) return new Uint8Array();
  const reader = request.body.getReader(),
    chunks = [];
  let size = 0;
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    size += value.length;
    if (size > limit) {
      await reader.cancel();
      fail("Request too large", 413);
    }
    chunks.push(value);
  }
  const result = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) {
    result.set(chunk, offset);
    offset += chunk.length;
  }
  return result;
}
async function body(request) {
  if (!request.headers.get("content-type")?.includes("application/json"))
    fail("JSON required", 415);
  const bytes = await boundedBytes(request, 131072);
  try {
    return JSON.parse(new TextDecoder().decode(bytes));
  } catch {
    fail("Invalid JSON");
  }
}
async function route(request, env) {
  const url = new URL(request.url),
    path = url.pathname;
  if (path === "/dpp")
    return Response.redirect(url.origin + "/dpp/" + url.search, 308);
  if (!path.startsWith("/dpp/"))
    return new Response("Not found", { status: 404 });
  const admin = path.startsWith("/dpp/api/admin/");
  let actor;
  if (admin) {
    actor = await authenticate(request, env);
    if (
      !["GET", "HEAD"].includes(request.method) &&
      request.headers.get("Origin") !== url.origin
    )
      fail("Cross-origin writes are not allowed", 403);
  }
  if (path === "/dpp/api/passport" && request.method === "GET") {
    const p = await getPassport(env.DB, url.searchParams.get("sn"));
    const files = (
      await env.DB.prepare(
        "SELECT id,filename,mime,size,sha256,kind FROM files WHERE sn=?",
      )
        .bind(p.sn)
        .all()
    ).results.filter((f) => p.document.files.includes(f.id));
    return json({ ...p, files });
  }
  if (path === "/dpp/api/qr" && request.method === "GET") {
    const sn = url.searchParams.get("sn");
    if (!validSN(sn)) fail("Invalid serial number");
    const base = new URL(env.PUBLIC_ORIGIN);
    if (base.protocol !== "https:") fail("Public origin must use HTTPS", 503);
    const content = base.origin + "/dpp/?sn=" + encodeURIComponent(sn);
    const svg = await QRCode.toString(content, {
      type: "svg",
      errorCorrectionLevel: "M",
      margin: 4,
      width: 320,
    });
    return new Response(svg, {
      headers: {
        "Content-Type": "image/svg+xml",
        "Cache-Control": "public, max-age=86400",
        "Content-Disposition": `inline; filename="${sn}.svg"`,
      },
    });
  }
  if (path.startsWith("/dpp/api/files/") && request.method === "GET") {
    const id = path.split("/").pop();
    const f = await env.DB.prepare("SELECT * FROM files WHERE id=?")
      .bind(id)
      .first();
    if (!f) fail("File not found", 404);
    const p = await env.DB.prepare(
      "SELECT published_json FROM passports WHERE sn=?",
    )
      .bind(f.sn)
      .first();
    if (!p?.published_json || !JSON.parse(p.published_json).files.includes(id))
      fail("File not published", 404);
    const object = await env.FILES.get(f.object_key);
    if (!object) fail("File unavailable", 404);
    return new Response(object.body, {
      headers: {
        "Content-Type": f.mime,
        "Content-Disposition": `${f.mime === "application/pdf" ? "attachment" : "inline"}; filename*=UTF-8''${encodeURIComponent(f.filename)}`,
        "Cache-Control": "public, max-age=60, must-revalidate",
        ETag: '"' + f.sha256 + '"',
        "Content-Security-Policy": "sandbox; default-src 'none'",
      },
    });
  }
  if (admin) {
    if (path === "/dpp/api/admin/me" && request.method === "GET")
      return json({ email: actor, publicOrigin: env.PUBLIC_ORIGIN });
    if (path === "/dpp/api/admin/batches" && request.method === "POST")
      return json(
        { records: await createBatch(env.DB, await body(request), actor) },
        201,
      );
    if (path === "/dpp/api/admin/records" && request.method === "GET") {
      const after = url.searchParams.get("after") || "",
        query = (url.searchParams.get("q") || "").slice(0, 80);
      const rows = (
        await env.DB.prepare(
          "SELECT sn,version,published_at,updated_at FROM passports WHERE sn>? AND instr(sn,?)>0 ORDER BY sn LIMIT 101",
        )
          .bind(after, query)
          .all()
      ).results;
      return json({
        records: rows.slice(0, 100),
        nextCursor: rows.length > 100 ? rows[99].sn : null,
      });
    }
    if (path === "/dpp/api/admin/export" && request.method === "GET") {
      // Pagination makes exports bounded, even for lifetime factory records.
      const after = url.searchParams.get("after") || "";
      const rows = (
        await env.DB.prepare(
          "SELECT * FROM passports WHERE sn>? ORDER BY sn LIMIT 501",
        )
          .bind(after)
          .all()
      ).results;
      const selected = rows.slice(0, 500),
        next = rows.length > 500 ? selected.at(-1).sn : null;
      return json({
        records: selected.map((r) => ({
          sn: r.sn,
          url: env.PUBLIC_ORIGIN + "/dpp/?sn=" + r.sn,
          published: !!r.published_json,
          version: r.version,
          draft: JSON.parse(r.draft_json),
          publishedDocument: r.published_json
            ? JSON.parse(r.published_json)
            : null,
        })),
        nextCursor: next,
      });
    }
    const match = path.match(
      /^\/dpp\/api\/admin\/records\/([^/]+)(?:\/(publish|files|history))?$/,
    );
    if (match) {
      const [, sn, action] = match;
      if (!validSN(sn)) fail("Invalid serial");
      if (!action && request.method === "GET") {
        const p = await getPassport(env.DB, sn, true);
        return json({
          ...p,
          files: (
            await env.DB.prepare(
              "SELECT id,filename,mime,size,sha256,kind FROM files WHERE sn=? ORDER BY created_at DESC",
            )
              .bind(sn)
              .all()
          ).results,
        });
      }
      if (
        (!action && request.method === "PUT") ||
        (action === "publish" && request.method === "POST")
      )
        return json(
          await savePassport(env.DB, sn, await body(request), actor, !!action),
        );
      if (action === "history" && request.method === "GET")
        return json({
          revisions: (
            await env.DB.prepare(
              "SELECT version,action,actor,created_at,document_json FROM revisions WHERE sn=? ORDER BY id DESC LIMIT 50",
            )
              .bind(sn)
              .all()
          ).results,
        });
      if (action === "files" && request.method === "POST") {
        await getPassport(env.DB, sn, true);
        if (Number(request.headers.get("content-length")) > 16 * 1024 * 1024)
          fail("Maximum file size is 15 MB", 413);
        const bytesForm = await boundedBytes(request, 16 * 1024 * 1024);
        let form;
        try {
          form = await new Response(bytesForm, {
            headers: {
              "Content-Type": request.headers.get("Content-Type") || "",
            },
          }).formData();
        } catch {
          fail("Invalid upload form");
        }
        const file = form.get("file"),
          kind = form.get("kind");
        if (
          !file ||
          typeof file === "string" ||
          file.size > 15 * 1024 * 1024 ||
          file.size < 5
        )
          fail("Upload a PDF, PNG, JPEG or WebP file up to 15 MB");
        if (
          !["image", "certificate", "manual", "repair", "recycling"].includes(
            kind,
          )
        )
          fail("Invalid document category");
        const bytes = await file.arrayBuffer(),
          mime = fileType(bytes);
        if (!mime || (kind === "image" && !mime.startsWith("image/")))
          fail("Unsupported file content", 415);
        const id = crypto.randomUUID(),
          key = sn + "/" + id,
          sha256 = await hash(bytes),
          filename = file.name.replace(/[\x00-\x1f\/\\]/g, "_").slice(0, 150);
        await env.FILES.put(key, bytes, {
          httpMetadata: { contentType: mime },
        });
        try {
          await env.DB.prepare("INSERT INTO files VALUES(?,?,?,?,?,?,?,?,?,?)")
            .bind(
              id,
              sn,
              key,
              filename,
              mime,
              file.size,
              sha256,
              kind,
              new Date().toISOString(),
              actor,
            )
            .run();
        } catch (e) {
          await env.FILES.delete(key);
          throw e;
        }
        return json({ id, filename, mime, size: file.size, sha256, kind }, 201);
      }
    }
  }
  if (path.startsWith("/dpp/api/")) return json({ error: "Not found" }, 404);
  if (!["GET", "HEAD"].includes(request.method))
    return new Response("Method not allowed", { status: 405 });
  const assetURL = new URL(request.url);
  assetURL.pathname = path.slice(4) || "/";
  const asset = await env.ASSETS.fetch(new Request(assetURL, request));
  // Keep redirects under /dpp/ when the asset service canonicalizes directory URLs.
  if (
    asset.status >= 300 &&
    asset.status < 400 &&
    asset.headers.get("Location")
  ) {
    const target = new URL(asset.headers.get("Location"), assetURL);
    return Response.redirect(
      url.origin + "/dpp" + target.pathname + target.search,
      asset.status,
    );
  }
  return asset;
}
export default {
  async fetch(request, env) {
    try {
      const response = await route(request, env);
      const safe = new Response(response.body, response);
      safe.headers.set("X-Content-Type-Options", "nosniff");
      safe.headers.set("Referrer-Policy", "same-origin");
      safe.headers.set("X-Frame-Options", "DENY");
      if (!safe.headers.has("Content-Security-Policy"))
        safe.headers.set(
          "Content-Security-Policy",
          "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; connect-src 'self'; object-src 'none'; base-uri 'none'; frame-ancestors 'none'",
        );
      return safe;
    } catch (error) {
      if (!error.status) console.error("DPP request failed", error.message);
      return json(
        {
          error: error.status
            ? error.message
            : "Service temporarily unavailable",
        },
        error.status || 500,
      );
    }
  },
};
