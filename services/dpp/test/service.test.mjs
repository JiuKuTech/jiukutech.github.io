import test from "node:test";
import assert from "node:assert/strict";
import { LocalD1 } from "./db.mjs";
import {
  createBatch,
  getPassport,
  savePassport,
  fileType,
} from "../src/service.js";
import {
  validSN,
  blankPassport,
  validatePassport,
} from "../../../public/dpp/schema.js";
import worker from "../src/worker.js";
const actor = "test@example.com",
  input = (overrides = {}) => ({
    date: "2026-10-07",
    count: 2,
    idempotencyKey: crypto.randomUUID(),
    ...overrides,
  });
const publishable = () => {
  const d = blankPassport();
  d.identity.name = "Test machine";
  d.identity.model = "TEST";
  d.operators.manufacturerName = "Test manufacturer";
  return d;
};
test("serial validation rejects malformed dates and zero counters", () => {
  for (const sn of [
    "JK-CL-SN-20260230-00001",
    "JK-CL-SN-20261301-00001",
    "JK-CL-SN-20261007-00000",
    "JK-CL-SN-20261007-100000",
    "../x",
  ])
    assert.equal(validSN(sn), false);
  assert.equal(validSN("JK-CL-SN-20240229-00001"), true);
});
test("atomic batches allocate consecutive unique IDs and reset by date", async () => {
  const db = new LocalD1();
  const [a, b] = await Promise.all([
    createBatch(db, input(), actor),
    createBatch(db, input(), actor),
  ]);
  assert.deepEqual(
    [...a, ...b].map((r) => r.sn).sort(),
    [1, 2, 3, 4].map((n) => "JK-CL-SN-20261007-" + String(n).padStart(5, "0")),
  );
  assert.equal(
    (await createBatch(db, input({ date: "2026-10-08", count: 1 }), actor))[0]
      .sn,
    "JK-CL-SN-20261008-00001",
  );
  db.close();
});
test("idempotent retries do not allocate more devices; changed payload conflicts", async () => {
  const db = new LocalD1(),
    i = input();
  const a = await createBatch(db, i, actor);
  assert.deepEqual(await createBatch(db, i, actor), a);
  await assert.rejects(createBatch(db, { ...i, count: 3 }, actor), {
    status: 409,
  });
  assert.equal(
    (await createBatch(db, input({ count: 1 }), actor))[0].sn,
    "JK-CL-SN-20261007-00003",
  );
  db.close();
});
test("manual numbers advance allocation and collision rolls back entire batch", async () => {
  const db = new LocalD1();
  await createBatch(db, input({ serials: ["JK-CL-SN-20261007-00009"] }), actor);
  await assert.rejects(
    createBatch(
      db,
      input({
        serials: ["JK-CL-SN-20261007-00010", "JK-CL-SN-20261007-00009"],
      }),
      actor,
    ),
    { status: 409 },
  );
  assert.equal(
    (await createBatch(db, input({ count: 1 }), actor))[0].sn,
    "JK-CL-SN-20261007-00010",
  );
  db.close();
});
test("daily capacity limit rolls back all statements", async () => {
  const db = new LocalD1();
  await createBatch(db, input({ serials: ["JK-CL-SN-20261007-99998"] }), actor);
  await assert.rejects(createBatch(db, input(), actor), { status: 409 });
  assert.equal(
    (await createBatch(db, input({ count: 1 }), actor))[0].sn,
    "JK-CL-SN-20261007-99999",
  );
  db.close();
});
test("drafts stay private; publish snapshots; optimistic updates preserve audit", async () => {
  const db = new LocalD1();
  const [{ sn }] = await createBatch(db, input({ count: 1 }), actor);
  await assert.rejects(getPassport(db, sn), { status: 404 });
  const d = publishable();
  await savePassport(db, sn, { version: 1, document: d }, actor, true);
  d.identity.name = "Private draft";
  await savePassport(db, sn, { version: 2, document: d }, actor);
  assert.equal(
    (await getPassport(db, sn)).document.identity.name,
    "Test machine",
  );
  await assert.rejects(
    savePassport(db, sn, { version: 2, document: d }, actor, true),
    { status: 409 },
  );
  assert.equal(
    (await db.prepare("SELECT count(*) AS n FROM revisions").first()).n,
    3,
  );
  assert.equal(
    (await getPassport(db, sn, true)).document.identity.name,
    "Private draft",
  );
  await savePassport(db, sn, { version: 3, document: d }, actor, true);
  assert.equal(
    (await getPassport(db, sn)).document.identity.name,
    "Private draft",
  );
  assert.throws(() => db.db.exec("DELETE FROM passports"), /permanent/);
  assert.throws(
    () => db.db.exec("UPDATE passports SET sn='changed'"),
    /immutable/,
  );
  db.close();
});
test("invalid claims and cross-device file references rejected", async () => {
  const db = new LocalD1();
  const [{ sn }] = await createBatch(db, input(), actor);
  const d = publishable();
  d.files = [crypto.randomUUID()];
  await assert.rejects(
    savePassport(db, sn, { version: 1, document: d }, actor),
    /belong to this device/,
  );
  const bad = blankPassport();
  bad.sustainability.carbonKgCO2e = -1;
  assert.throws(() => validatePassport(bad));
  await assert.rejects(
    savePassport(
      db,
      sn,
      { version: 1, document: blankPassport() },
      actor,
      true,
    ),
    /required to publish/,
  );
  db.close();
});
test("public API hides drafts and unreferenced files; published API uses no-store", async () => {
  const db = new LocalD1();
  const [{ sn }] = await createBatch(db, input(), actor);
  const env = { DB: db };
  assert.equal(
    (
      await worker.fetch(
        new Request("https://example.com/dpp/api/passport?sn=" + sn),
        env,
      )
    ).status,
    404,
  );
  await savePassport(
    db,
    sn,
    { version: 1, document: publishable() },
    actor,
    true,
  );
  const response = await worker.fetch(
    new Request("https://example.com/dpp/api/passport?sn=" + sn),
    env,
  );
  assert.equal(response.status, 200);
  assert.equal(response.headers.get("Cache-Control"), "no-store");
  assert.equal((await response.json()).sn, sn);
  db.close();
});
test("admin fails closed without configuration or signed Access token", async () => {
  let r = await worker.fetch(
    new Request("https://example.com/dpp/api/admin/records"),
    {},
  );
  assert.equal(r.status, 503);
  r = await worker.fetch(
    new Request("https://example.com/dpp/api/admin/records"),
    {
      ACCESS_TEAM_DOMAIN: "test.cloudflareaccess.com",
      ACCESS_AUD: "aud",
      ADMIN_EMAILS: actor,
    },
  );
  assert.equal(r.status, 401);
  r = await worker.fetch(
    new Request("https://example.com/dpp/api/admin/records", {
      headers: { "Cf-Access-Jwt-Assertion": "forged" },
    }),
    {
      ACCESS_TEAM_DOMAIN: "test.cloudflareaccess.com",
      ACCESS_AUD: "aud",
      ADMIN_EMAILS: actor,
    },
  );
  assert.equal(r.status, 403);
});
test("file signature allowlist excludes SVG and HTML", () => {
  const bytes = (s) => new TextEncoder().encode(s).buffer;
  assert.equal(fileType(bytes("%PDF-1.7")), "application/pdf");
  assert.equal(fileType(bytes('<svg onload="alert(1)">')), null);
  assert.equal(fileType(bytes("<html>test</html>")), null);
});
test("QR endpoint produces local SVG for stable full URL and validates serial", async () => {
  const env = { PUBLIC_ORIGIN: "https://jiukuclaw.com" };
  const r = await worker.fetch(
    new Request("https://jiukuclaw.com/dpp/api/qr?sn=JK-CL-SN-20261007-00001"),
    env,
  );
  assert.equal(r.status, 200);
  assert.match(await r.text(), /^<svg/);
  assert.equal(
    (
      await worker.fetch(
        new Request("https://jiukuclaw.com/dpp/api/qr?sn=invalid"),
        env,
      )
    ).status,
    400,
  );
});
