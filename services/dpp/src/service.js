import {
  blankPassport,
  validatePassport,
  validDate,
  validSN,
} from "../../../public/dpp/schema.js";
export const fail = (message, status = 400) => {
  throw Object.assign(Error(message), { status });
};
export async function hash(value) {
  return [
    ...new Uint8Array(
      await crypto.subtle.digest(
        "SHA-256",
        typeof value === "string" ? new TextEncoder().encode(value) : value,
      ),
    ),
  ]
    .map((v) => v.toString(16).padStart(2, "0"))
    .join("");
}
export function parseDocument(value) {
  try {
    return validatePassport(value);
  } catch (e) {
    fail(e.message);
  }
}
export async function createBatch(db, input, actor) {
  const { idempotencyKey: key } = input;
  if (typeof key !== "string" || !/^[-a-f0-9]{36}$/.test(key))
    fail("A UUID idempotencyKey is required");
  const document = parseDocument(input.document ?? blankPassport());
  const manual = input.serials !== undefined;
  let serials = input.serials;
  if (
    manual &&
    (!Array.isArray(serials) ||
      !serials.length ||
      serials.length > 100 ||
      serials.some((s) => !validSN(s)) ||
      new Set(serials).size !== serials.length)
  )
    fail("Supply 1–100 unique, valid serial numbers");
  const count = manual ? serials.length : input.count;
  if (!manual) {
    try {
      if (!validDate(input.date)) fail("Invalid manufacturing date");
    } catch {
      fail("Invalid manufacturing date");
    }
    if (!Number.isInteger(count) || count < 1 || count > 100)
      fail("Batch size must be 1–100");
  }
  if (document.files.length || document.identity.imageId)
    fail("Attach files after creating each individual passport");
  const fingerprint = await hash(
    JSON.stringify({
      serials: manual ? serials : null,
      date: input.date ?? null,
      count,
      document,
    }),
  );
  const existing = await db
    .prepare("SELECT request_hash FROM batches WHERE id=?")
    .bind(key)
    .first();
  if (existing) {
    if (existing.request_hash !== fingerprint)
      fail("Idempotency key already used for a different request", 409);
    return (
      await db
        .prepare("SELECT sn FROM passports WHERE batch_id=? ORDER BY sn")
        .bind(key)
        .all()
    ).results;
  }
  const now = new Date().toISOString();
  const statements = [
    db
      .prepare("INSERT INTO batches VALUES(?,?,?,?)")
      .bind(key, fingerprint, now, actor),
  ];
  if (manual) {
    const byDay = {};
    for (const sn of serials)
      byDay[sn.slice(9, 17)] = Math.max(
        byDay[sn.slice(9, 17)] ?? 0,
        +sn.slice(-5),
      );
    for (const [day, max] of Object.entries(byDay))
      statements.push(
        db
          .prepare(
            "INSERT INTO daily_sequences(day,last_value) VALUES(?,?) ON CONFLICT(day) DO UPDATE SET last_value=max(last_value,excluded.last_value)",
          )
          .bind(day, max),
      );
    statements.push(
      db
        .prepare(
          "INSERT INTO passports(sn,batch_id,draft_json,created_at,updated_at) SELECT value,?,?,?,? FROM json_each(?)",
        )
        .bind(key, JSON.stringify(document), now, now, JSON.stringify(serials)),
    );
  } else {
    const day = input.date.replaceAll("-", "");
    statements.push(
      db
        .prepare(
          "INSERT INTO daily_sequences(day,last_value) VALUES(?,?) ON CONFLICT(day) DO UPDATE SET last_value=last_value+excluded.last_value",
        )
        .bind(day, count),
    );
    statements.push(
      db
        .prepare(
          "INSERT INTO passports(sn,batch_id,draft_json,created_at,updated_at) SELECT 'JK-CL-SN-' || ? || '-' || printf('%05d',last_value-?+CAST(j.value AS INTEGER)),?,?,?,? FROM daily_sequences,json_each(?) j WHERE day=?",
        )
        .bind(
          day,
          count,
          key,
          JSON.stringify(document),
          now,
          now,
          JSON.stringify(Array.from({ length: count }, (_, i) => i + 1)),
          day,
        ),
    );
  }
  statements.push(
    db
      .prepare(
        "INSERT INTO revisions(sn,version,action,document_json,actor,created_at) SELECT sn,1,'create',draft_json,?,? FROM passports WHERE batch_id=?",
      )
      .bind(actor, now, key),
  );
  try {
    await db.batch(statements);
  } catch (e) {
    const replay = await db
      .prepare("SELECT request_hash FROM batches WHERE id=?")
      .bind(key)
      .first();
    if (!replay || replay.request_hash !== fingerprint)
      fail(
        "Serial already exists or daily limit reached. No devices in this batch were added.",
        409,
      );
  }
  return (
    await db
      .prepare("SELECT sn FROM passports WHERE batch_id=? ORDER BY sn")
      .bind(key)
      .all()
  ).results;
}
export async function getPassport(db, sn, admin = false) {
  if (!validSN(sn)) fail("Invalid serial number");
  const row = await db
    .prepare("SELECT * FROM passports WHERE sn=?")
    .bind(sn)
    .first();
  if (!row || (!admin && !row.published_json))
    fail("No published passport found for this serial number", 404);
  return {
    sn: row.sn,
    version: admin ? row.version : row.published_version,
    updatedAt: admin ? row.updated_at : row.published_at,
    publishedAt: row.published_at,
    document: JSON.parse(admin ? row.draft_json : row.published_json),
  };
}
export async function savePassport(db, sn, input, actor, publish = false) {
  if (!validSN(sn) || !Number.isInteger(input.version) || input.version < 1)
    fail("Invalid serial or version");
  const doc = parseDocument(input.document);
  if (doc.files.length) {
    const f = await db
      .prepare("SELECT id FROM files WHERE sn=?")
      .bind(sn)
      .all();
    if (doc.files.some((id) => !f.results.some((x) => x.id === id)))
      fail("Files must belong to this device");
  }
  if (
    publish &&
    (!doc.identity.name.trim() ||
      !doc.identity.model.trim() ||
      !doc.operators.manufacturerName.trim())
  )
    fail("Product name, model and manufacturer are required to publish");
  const now = new Date().toISOString(),
    json = JSON.stringify(doc);
  const sql = publish
    ? "UPDATE passports SET draft_json=?,version=version+1,updated_at=?,published_json=?,published_version=version+1,published_at=? WHERE sn=? AND version=? RETURNING version"
    : "UPDATE passports SET draft_json=?,version=version+1,updated_at=? WHERE sn=? AND version=? RETURNING version";
  const params = publish
    ? [json, now, json, now, sn, input.version]
    : [json, now, sn, input.version];
  const results = await db.batch([
    db.prepare(sql).bind(...params),
    db
      .prepare(
        "INSERT INTO revisions(sn,version,action,document_json,actor,created_at) SELECT sn,version,?,draft_json,?,? FROM passports WHERE sn=? AND changes()>0",
      )
      .bind(publish ? "publish" : "save", actor, now, sn),
  ]);
  if (!results[0].results.length)
    fail("Another editor changed this record. Reload before saving.", 409);
  return getPassport(db, sn, true);
}
export function csvCell(s) {
  s = String(s ?? "");
  if (/^[=+@\-\t\r]/.test(s)) s = "'" + s;
  return '"' + s.replaceAll('"', '""') + '"';
}
export function fileType(bytes) {
  const b = new Uint8Array(bytes);
  const ascii = (start, n) => String.fromCharCode(...b.slice(start, start + n));
  if (ascii(0, 5) === "%PDF-") return "application/pdf";
  if (
    b[0] === 137 &&
    ascii(1, 3) === "PNG" &&
    b[4] === 13 &&
    b[5] === 10 &&
    b[6] === 26 &&
    b[7] === 10
  )
    return "image/png";
  if (b[0] === 255 && b[1] === 216 && b[2] === 255) return "image/jpeg";
  if (ascii(0, 4) === "RIFF" && ascii(8, 4) === "WEBP") return "image/webp";
  return null;
}
