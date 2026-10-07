import http from "node:http";
import { readFile } from "node:fs/promises";
import { resolve, extname } from "node:path";
import { LocalD1 } from "./db.mjs";
import { createBatch, getPassport, savePassport } from "../src/service.js";
import { blankPassport } from "../../../public/dpp/schema.js";
import worker from "../src/worker.js";
// Local-only UI test fixture. Never imported by the production Worker.
export async function previewServer() {
  const db = new LocalD1(),
    actor = "local-test@example.com";
  const doc = blankPassport();
  doc.identity.name = "Demonstration Claw Machine";
  doc.identity.model = "DEMO — NOT A REAL PRODUCT RECORD";
  doc.operators.manufacturerName = "JIUKU (test fixture)";
  doc.instructions.maintenance = "Test content only. No certification claims.";
  const [{ sn }] = await createBatch(
    db,
    {
      date: "2026-10-07",
      count: 1,
      idempotencyKey: crypto.randomUUID(),
      document: doc,
    },
    actor,
  );
  await savePassport(db, sn, { version: 1, document: doc }, actor, true);
  const root = resolve("public/dpp");
  const env = {
    DB: db,
    PUBLIC_ORIGIN: "https://jiukuclaw.com",
    ASSETS: {
      async fetch(request) {
        let path = new URL(request.url).pathname;
        try {
          path = decodeURIComponent(path);
          if (path.endsWith("/")) path += "index.html";
          const target = resolve(root, "." + path);
          if (!target.startsWith(root)) throw Error();
          const bytes = await readFile(target);
          return new Response(bytes, {
            headers: {
              "Content-Type":
                {
                  ".html": "text/html",
                  ".js": "text/javascript",
                  ".css": "text/css",
                }[extname(path)] || "application/octet-stream",
            },
          });
        } catch {
          return new Response("Not found", { status: 404 });
        }
      },
    },
  };
  const server = http.createServer(async (req, res) => {
    try {
      const response = await worker.fetch(
        new Request("http://127.0.0.1" + req.url, { method: req.method }),
        env,
      );
      res.writeHead(response.status, Object.fromEntries(response.headers));
      res.end(Buffer.from(await response.arrayBuffer()));
    } catch {
      res.writeHead(500);
      res.end();
    }
  });
  await new Promise((r) => server.listen(0, "127.0.0.1", r));
  return {
    url: "http://127.0.0.1:" + server.address().port,
    db,
    sn,
    actor,
    close: () =>
      new Promise((r) =>
        server.close(() => {
          db.close();
          r();
        }),
      ),
  };
}
