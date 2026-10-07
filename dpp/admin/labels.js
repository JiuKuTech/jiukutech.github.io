import { validSN } from "/dpp/schema.js";
const list = JSON.parse(sessionStorage.getItem("jiuku-dpp-labels") || "[]")
  .filter((x) => validSN(x.sn))
  .slice(0, 100);
const waits = [];
for (const item of list) {
  const box = document.createElement("section");
  box.className = "label";
  const name = document.createElement("strong");
  name.textContent = "JIUKU";
  const image = new Image();
  image.alt = "Passport QR: " + item.sn;
  waits.push(
    new Promise((resolve) => {
      image.onload = () => resolve(true);
      image.onerror = () => resolve(false);
    }),
  );
  image.src = "/dpp/api/qr?sn=" + encodeURIComponent(item.sn);
  const sn = document.createElement("p");
  sn.className = "mono";
  sn.textContent = item.sn;
  const url = document.createElement("p");
  url.textContent = item.url;
  const text = document.createElement("p");
  text.textContent = "Digital Product Passport";
  box.append(name, image, sn, text, url);
  document.querySelector("#labels").append(box);
}
const loaded = await Promise.all(waits);
document.querySelector("#status").textContent = !list.length
  ? "No selected batch. Open this page from the administration system."
  : loaded.every(Boolean)
    ? list.length +
      " labels ready. Check one printed QR before mass production."
    : "Some QR codes failed to load. Reload before printing.";
document.querySelector("#print").disabled =
  !list.length || !loaded.every(Boolean);
document.querySelector("#print").onclick = () => window.print();
