import { sections, validSN } from "./schema.js";
const $ = (s) => document.querySelector(s);
const el = (tag, text, cls) => {
  const e = document.createElement(tag);
  if (text !== undefined) e.textContent = text;
  if (cls) e.className = cls;
  return e;
};
const fileURL = (id) => "/dpp/api/files/" + encodeURIComponent(id);
function value(v, key) {
  if (key === "fileId" && v) {
    const a = el("a", "Download document");
    a.href = fileURL(v);
    return a;
  }
  return el(
    "span",
    v === null || v === "" || v === undefined ? "Not provided" : String(v),
  );
}
let controller;
async function load(sn) {
  controller?.abort();
  controller = new AbortController();
  $("#passport").hidden = true;
  $("#message").hidden = false;
  $("#message").className = "notice";
  if (!validSN(sn)) {
    $("#message").textContent =
      "Enter a valid serial number, for example JK-CL-SN-20261006-00001.";
    return;
  }
  $("#message").textContent = "Loading product passport…";
  try {
    const response = await fetch(
      "/dpp/api/passport?sn=" + encodeURIComponent(sn),
      { signal: controller.signal, cache: "no-store" },
    );
    if (!response.ok)
      throw Error(
        response.status === 404
          ? "No published passport was found. Check the serial number or contact JIUKU."
          : "The passport service is temporarily unavailable. Please try again.",
      );
    const p = await response.json();
    const d = p.document;
    $("#product-name").textContent = d.identity.name;
    $("#serial").textContent = p.sn;
    $("#metadata").textContent =
      "Published revision " +
      p.version +
      " · Updated " +
      new Date(p.updatedAt).toLocaleDateString("en-GB", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }) +
      " · Schema " +
      d.schemaVersion;
    document.title = d.identity.name + " | JIUKU Product Passport";
    $("#qr").src = "/dpp/api/qr?sn=" + encodeURIComponent(sn);
    $("#qr-download").href = $("#qr").src;
    $("#product-image").hidden = !d.identity.imageId;
    if (d.identity.imageId)
      $("#product-image").src = fileURL(d.identity.imageId);
    $("#section-nav").replaceChildren();
    $("#sections").replaceChildren();
    for (const [i, s] of sections.entries()) {
      const a = el("a", String(i + 1).padStart(2, "0") + "  " + s.title);
      a.href = "#" + s.key;
      $("#section-nav").append(a);
      const box = el("section", undefined, "card");
      box.id = s.key;
      const h = el("h2");
      h.append(
        el("span", String(i + 1).padStart(2, "0"), "number"),
        document.createTextNode(s.title),
      );
      box.append(h);
      const fields = s.fields.filter((f) => f[0] !== "imageId");
      if (s.array) {
        const rows = d[s.key];
        if (!rows.length) box.append(el("p", "Not provided", "muted"));
        else {
          const wrap = el("div", undefined, "table-wrap"),
            table = el("table"),
            head = el("thead"),
            tr = el("tr");
          for (const [, label] of fields) {
            const th = el("th", label);
            th.scope = "col";
            tr.append(th);
          }
          head.append(tr);
          table.append(head);
          const body = el("tbody");
          for (const row of rows) {
            const tr = el("tr");
            for (const [k] of fields) {
              const td = el("td");
              td.append(value(row[k], k));
              tr.append(td);
            }
            body.append(tr);
          }
          table.append(body);
          wrap.append(table);
          box.append(wrap);
        }
      } else {
        const dl = el("dl");
        for (const [k, label] of fields) {
          dl.append(el("dt", label));
          const dd = el("dd");
          dd.append(value(d[s.key][k], k));
          dl.append(dd);
        }
        box.append(dl);
      }
      $("#sections").append(box);
    }
    $("#documents").replaceChildren();
    if (!p.files.length)
      $("#documents").append(el("p", "No files have been published.", "muted"));
    for (const f of p.files) {
      const row = el("div", undefined, "doc"),
        info = el("div");
      info.append(
        el("strong", f.filename),
        el("small", f.kind + " · " + Math.ceil(f.size / 1024) + " KB"),
        el("small", "SHA-256: " + f.sha256),
      );
      const a = el("a", "Download ↗");
      a.href = fileURL(f.id);
      row.append(info, a);
      $("#documents").append(row);
    }
    $("#message").hidden = true;
    $("#passport").hidden = false;
  } catch (e) {
    if (e.name === "AbortError") return;
    $("#message").className = "notice error";
    $("#message").textContent = e.message;
  }
}
$("#lookup").addEventListener("submit", (e) => {
  e.preventDefault();
  const sn = $("#sn").value.trim().toUpperCase();
  $("#sn").value = sn;
  history.replaceState(null, "", "/dpp/?sn=" + encodeURIComponent(sn));
  load(sn);
});
const sn = new URLSearchParams(location.search).get("sn");
if (sn) {
  $("#sn").value = sn;
  load(sn);
}
