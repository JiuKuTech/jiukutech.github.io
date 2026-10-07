import assert from "node:assert/strict";
import { mkdir } from "node:fs/promises";
import { createRequire } from "node:module";
import { previewServer } from "./preview.mjs";
import { createBatch, getPassport, savePassport } from "../src/service.js";
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || "playwright");
const fixture = await previewServer();
let browser;
try {
  browser = await chromium.launch({ channel: "msedge", headless: true });
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1050 },
  });
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto(fixture.url + "/dpp/?sn=" + fixture.sn);
  await page.locator("#passport").waitFor({ state: "visible" });
  assert.equal(await page.locator("#sections>section").count(), 8);
  assert.equal(
    await page.locator("#product-name").textContent(),
    "Demonstration Claw Machine",
  );
  await mkdir(".screenshots", { recursive: true });
  await page.screenshot({
    path: ".screenshots/dpp-desktop.png",
    fullPage: true,
  });
  await page.setViewportSize({ width: 390, height: 844 });
  assert.equal(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
    true,
  );
  await page.screenshot({
    path: ".screenshots/dpp-mobile.png",
    fullPage: true,
  });
  await page.locator("#sn").fill("JK-CL-SN-20261007-99999");
  await page.locator("#lookup button").click();
  await page
    .getByText("No published passport was found.", { exact: false })
    .waitFor();
  await page.setViewportSize({ width: 1440, height: 1050 });
  // Only admin transport is replaced in this browser test. Service tests exercise
  // persistence and production auth separately; no test bypass exists in worker.js.
  await page.route("**/dpp/api/admin/**", async (route) => {
    const req = route.request(),
      u = new URL(req.url()),
      p = u.pathname.replace("/dpp/api/admin/", "");
    try {
      let data;
      if (p === "me")
        data = { email: fixture.actor, publicOrigin: fixture.url };
      else if (p === "batches")
        data = {
          records: await createBatch(
            fixture.db,
            req.postDataJSON(),
            fixture.actor,
          ),
        };
      else if (p === "records") {
        data = {
          records: (
            await fixture.db
              .prepare(
                "SELECT sn,version,published_at,updated_at FROM passports ORDER BY sn",
              )
              .all()
          ).results,
          nextCursor: null,
        };
      } else if (p === "export") {
        data = {
          records: (
            await fixture.db.prepare("SELECT sn,version FROM passports").all()
          ).results.map((x) => ({
            ...x,
            url: fixture.url + "/dpp/?sn=" + x.sn,
          })),
          nextCursor: null,
        };
      } else {
        const [, sn, action] = p.split("/");
        if (req.method() === "GET") {
          data = { ...(await getPassport(fixture.db, sn, true)), files: [] };
        } else
          data = await savePassport(
            fixture.db,
            sn,
            req.postDataJSON(),
            fixture.actor,
            action === "publish",
          );
      }
      await route.fulfill({ json: data });
    } catch (e) {
      await route.fulfill({
        status: e.status || 500,
        json: { error: e.message },
      });
    }
  });
  await page.goto(fixture.url + "/dpp/admin/");
  await page.locator("#workspace").waitFor({ state: "visible" });
  await page.locator("#batch-count").fill("2");
  await page.locator("#create button[type=submit]").click();
  await page
    .getByText("已创建 2 台设备的独立草稿。", { exact: false })
    .waitFor();
  await page
    .getByLabel("Product name", { exact: true })
    .fill("UI verified machine");
  await page.getByLabel("Model", { exact: true }).fill("UI-TEST");
  await page
    .getByLabel("Manufacturer name", { exact: true })
    .fill("Test manufacturer");
  await page.getByRole("button", { name: "保存草稿", exact: true }).click();
  await page.getByText("草稿已保存，", { exact: false }).waitFor();
  await page
    .getByRole("button", { name: "发布到公开页面", exact: true })
    .click();
  await page.getByText("已发布。原链接", { exact: false }).waitFor();
  await page.screenshot({ path: ".screenshots/dpp-admin.png", fullPage: true });
  const current = await page.locator(".admin-header h2").textContent();
  assert.equal(
    (await getPassport(fixture.db, current)).document.identity.name,
    "UI verified machine",
  );
  const popupPromise = page.waitForEvent("popup");
  await page
    .getByRole("button", { name: "打印此机二维码", exact: true })
    .click();
  const popup = await popupPromise;
  await popup.getByText("1 labels ready.", { exact: false }).waitFor();
  assert.equal(await popup.locator("#print").isEnabled(), true);
  await popup.close();
  await page.getByRole("button", { name: "导出 SN 清单（CSV）" }).click();
  await page.getByText("已导出 3 条。", { exact: false }).waitFor();
  assert.deepEqual(errors, []);
  console.log(
    "Browser checks passed: public lookup, 8 sections, mobile layout, not-found, admin create/edit/save/publish, QR labels, export; no JS errors.",
  );
} finally {
  await browser?.close();
  await fixture.close();
}
