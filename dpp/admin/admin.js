import { sections, blankPassport } from "/dpp/schema.js";
const $ = (s) => document.querySelector(s),
  el = (tag, text, cls) => {
    const e = document.createElement(tag);
    if (text !== undefined) e.textContent = text;
    if (cls) e.className = cls;
    return e;
  };
let selected = null,
  files = [],
  dirty = false,
  nextCursor = null,
  batch = [],
  origin = location.origin,
  creating = null,
  working = false;
const labels = {
  identity: "产品基础身份",
  operators: "制造商与欧盟进口商",
  materials: "材质 BOM",
  certificates: "安全合规文件",
  sustainability: "寿命、维修与碳足迹",
  parts: "可替换零配件",
  instructions: "使用与保养",
  recycling: "报废回收",
};
function status(text, error = false) {
  $("#status").textContent = text;
  $("#status").className = "notice message-sticky" + (error ? " error" : "");
}
async function api(path, options = {}) {
  const r = await fetch("/dpp/api/admin/" + path, {
    ...options,
    headers:
      options.body instanceof FormData
        ? {}
        : { "Content-Type": "application/json" },
    cache: "no-store",
  });
  if (!r.ok) {
    let message;
    try {
      message = (await r.json()).error;
    } catch {}
    throw Error(
      message ||
        (r.status === 401 || r.status === 403
          ? "登录已过期或没有权限，请刷新并通过 Cloudflare Access 登录。"
          : "请求失败：" + r.status),
    );
  }
  return r.json();
}
async function action(fn) {
  if (working) return;
  working = true;
  const buttons = [...document.querySelectorAll("button")];
  buttons.forEach((b) => (b.disabled = true));
  try {
    await fn();
  } catch (e) {
    status(e.message, true);
  } finally {
    working = false;
    buttons.forEach((b) => (b.disabled = false));
  }
}
function recordPath() {
  return "records/" + encodeURIComponent(selected.sn);
}
function chooseOK() {
  return !dirty || window.confirm("当前修改尚未保存。是否放弃这些修改？");
}
async function list(append = false) {
  const q = $("#query").value.trim().toUpperCase();
  const data = await api(
    "records?q=" +
      encodeURIComponent(q) +
      (append && nextCursor ? "&after=" + encodeURIComponent(nextCursor) : ""),
  );
  if (!append) $("#records").replaceChildren();
  for (const r of data.records) {
    const b = el("button");
    b.type = "button";
    b.append(
      el("strong", r.sn),
      el(
        "div",
        r.published_at
          ? "已发布 · 修订 " + r.version
          : "未发布草稿 · 修订 " + r.version,
      ),
    );
    b.setAttribute("aria-pressed", String(selected?.sn === r.sn));
    b.onclick = () =>
      action(async () => {
        if (chooseOK()) await open(r.sn);
      });
    $("#records").append(b);
  }
  nextCursor = data.nextCursor;
  $("#next").hidden = !nextCursor;
  if (!data.records.length && !append)
    $("#records").append(el("p", "没有匹配的设备。", "muted"));
}
async function open(sn) {
  selected = await api("records/" + encodeURIComponent(sn));
  files = selected.files;
  dirty = false;
  render();
  status("已载入 " + sn + "。所有对外内容请填写英文。");
}
function link(label, url) {
  const a = el("a", label);
  a.href = url;
  a.target = "_blank";
  a.rel = "noopener";
  return a;
}
function field(section, row, definition, index) {
  const [key, label, type] = definition;
  const wrap = el(
    "div",
    undefined,
    "field" + (type === "textarea" ? " wide" : ""),
  );
  const id = "field-" + section.key + "-" + index + "-" + key;
  const lab = el("label", label);
  lab.htmlFor = id;
  let input;
  if (key === "fileId" || key === "imageId") {
    input = el("select");
    const none = el("option", "未关联文件");
    none.value = "";
    input.append(none);
    for (const file of files.filter(
      (f) =>
        selected.document.files.includes(f.id) &&
        (key !== "imageId" || f.mime.startsWith("image/")),
    )) {
      const op = el("option", file.filename);
      op.value = file.id;
      input.append(op);
    }
  } else {
    input = el(type === "textarea" ? "textarea" : "input");
    if (type !== "textarea") {
      input.type = type || "text";
      if (type === "number") {
        input.min = "0";
        input.step = "any";
        if (key === "recycledPercent") input.max = "100";
      }
      input.maxLength = 12000;
    }
  }
  input.id = id;
  input.value = row[key] ?? "";
  input.addEventListener("input", () => {
    row[key] =
      type === "number"
        ? input.value === ""
          ? null
          : Number(input.value)
        : input.value;
    dirty = true;
  });
  wrap.append(lab, input);
  return wrap;
}
function render() {
  const root = $("#editor");
  root.replaceChildren();
  const head = el("section", undefined, "admin-header");
  head.append(
    el("p", "当前设备 · SN 永久不变", "eyebrow"),
    el("h2", selected.sn, "mono"),
  );
  const meta = el(
    "p",
    "草稿版本 " +
      selected.version +
      " · " +
      (selected.publishedAt ? "已有公开版本" : "尚未发布"),
    "muted",
  );
  head.append(meta);
  const toolbar = el("div", undefined, "toolbar");
  const save = el("button", "保存草稿"),
    publish = el("button", "发布到公开页面"),
    reload = el("button", "重新载入", "secondary");
  save.className = "secondary";
  save.onclick = () => action(() => saveDoc(false));
  publish.onclick = () => action(() => saveDoc(true));
  reload.onclick = () =>
    action(async () => {
      if (chooseOK()) await open(selected.sn);
    });
  toolbar.append(
    save,
    publish,
    reload,
    link("查看公开档案 ↗", origin + "/dpp/?sn=" + selected.sn),
  );
  const qr = el("button", "打印此机二维码", "secondary");
  qr.onclick = () => print([{ sn: selected.sn }]);
  toolbar.append(qr);
  head.append(toolbar);
  root.append(head);
  for (const s of sections) {
    const detail = el("details", undefined, "card");
    detail.open = ["identity", "operators"].includes(s.key);
    detail.append(el("summary", labels[s.key] + " / " + s.title));
    const content = el("div");
    function draw() {
      content.replaceChildren();
      const rows = s.array
        ? selected.document[s.key]
        : [selected.document[s.key]];
      rows.forEach((row, i) => {
        const outer = el("div", undefined, s.array ? "row-box" : ""),
          grid = el("div", undefined, "form-grid");
        s.fields.forEach((f) => grid.append(field(s, row, f, i)));
        outer.append(grid);
        if (s.array) {
          const del = el("button", "移除此行", "danger");
          del.type = "button";
          del.onclick = () => {
            rows.splice(i, 1);
            dirty = true;
            draw();
          };
          const t = el("div", undefined, "toolbar");
          t.append(del);
          outer.append(t);
        }
        content.append(outer);
      });
      if (s.array) {
        const add = el("button", "新增一行", "secondary");
        add.type = "button";
        add.onclick = () => {
          selected.document[s.key].push(
            Object.fromEntries(
              s.fields.map(([k, , t]) => [k, t === "number" ? null : ""]),
            ),
          );
          dirty = true;
          draw();
        };
        content.append(add);
      }
    }
    draw();
    detail.append(content);
    root.append(detail);
  }
  const upload = el("section", undefined, "card");
  upload.append(
    el("h2", "图片与资料文件"),
    el(
      "p",
      "支持 PDF、PNG、JPEG、WebP，单个最大 15 MB。文件仅在保存并发布后对外可见；上传后可在对应板块选择关联。",
      "muted",
    ),
  );
  const uploadForm = el("form");
  const kind = el("select");
  kind.setAttribute("aria-label", "文件类别");
  for (const [v, t] of [
    ["image", "产品图片"],
    ["certificate", "证书 / 声明"],
    ["manual", "使用手册"],
    ["repair", "维修资料"],
    ["recycling", "回收资料"],
  ]) {
    const op = el("option", t);
    op.value = v;
    kind.append(op);
  }
  const input = el("input");
  input.type = "file";
  input.accept = ".pdf,.png,.jpg,.jpeg,.webp";
  input.required = true;
  input.setAttribute("aria-label", "上传文件");
  const submit = el("button", "上传并加入当前草稿");
  const bar = el("div", undefined, "toolbar");
  bar.append(kind, input, submit);
  uploadForm.append(bar);
  uploadForm.onsubmit = (e) => {
    e.preventDefault();
    action(async () => {
      const file = input.files[0];
      if (!file || file.size > 15 * 1024 * 1024)
        throw Error("请选择不超过 15 MB 的文件。");
      const form = new FormData();
      form.append("file", file);
      form.append("kind", kind.value);
      const f = await api(recordPath() + "/files", {
        method: "POST",
        body: form,
      });
      files.unshift(f);
      selected.document.files.push(f.id);
      if (kind.value === "image" && !selected.document.identity.imageId)
        selected.document.identity.imageId = f.id;
      dirty = true;
      render();
      status("文件已上传。请保存草稿或发布以保留文件关联。");
    });
  };
  upload.append(uploadForm);
  for (const f of files) {
    const row = el("div", undefined, "file-row");
    row.append(
      el("strong", f.filename),
      el("p", f.kind + " · " + Math.ceil(f.size / 1024) + " KB", "muted"),
    );
    const attached = selected.document.files.includes(f.id),
      toggle = el(
        "button",
        attached ? "从当前草稿移除" : "加入当前草稿",
        "secondary",
      );
    toggle.onclick = () => {
      if (attached) {
        selected.document.files = selected.document.files.filter(
          (id) => id !== f.id,
        );
        if (selected.document.identity.imageId === f.id)
          selected.document.identity.imageId = "";
        for (const x of [
          ...selected.document.certificates,
          ...selected.document.parts,
        ])
          if (x.fileId === f.id) x.fileId = "";
      } else selected.document.files.push(f.id);
      dirty = true;
      render();
    };
    row.append(toggle);
    upload.append(row);
  }
  root.append(upload);
  const history = el("details", undefined, "card");
  history.append(el("summary", "修改记录（最近 50 次）"));
  const historyBody = el("div");
  history.append(historyBody);
  history.addEventListener("toggle", () => {
    if (history.open && !historyBody.childNodes.length)
      action(async () => {
        const data = await api(recordPath() + "/history");
        for (const r of data.revisions) {
          const line = el("div", undefined, "file-row");
          line.append(
            el(
              "p",
              "版本 " + r.version + " · " + r.action + " · " + r.created_at,
            ),
            el("small", r.actor),
          );
          const restore = el("button", "载入为当前草稿", "secondary");
          restore.onclick = () => {
            if (!chooseOK()) return;
            selected.document = JSON.parse(r.document_json);
            dirty = true;
            render();
            status("已载入旧版内容，尚未保存；保存后会生成新版本，SN 不变。");
          };
          line.append(restore);
          historyBody.append(line);
        }
      });
  });
  root.append(history);
}
async function saveDoc(publish) {
  const result = await api(recordPath() + (publish ? "/publish" : ""), {
    method: publish ? "POST" : "PUT",
    body: JSON.stringify({
      version: selected.version,
      document: selected.document,
    }),
  });
  selected = { ...result, files };
  dirty = false;
  render();
  await list();
  status(
    publish
      ? "已发布。原链接和二维码保持不变。"
      : "草稿已保存，公开页面保持现有已发布内容。",
  );
}
function print(items) {
  if (!items.length) {
    status("请先新增一批设备，或在设备编辑页打印单机二维码。", true);
    return;
  }
  sessionStorage.setItem(
    "jiuku-dpp-labels",
    JSON.stringify(
      items.map((x) => ({ sn: x.sn, url: origin + "/dpp/?sn=" + x.sn })),
    ),
  );
  window.open("/dpp/admin/labels.html", "_blank");
}
function download(name, text, type) {
  const blob = new Blob([text], { type }),
    url = URL.createObjectURL(blob),
    a = el("a");
  a.href = url;
  a.download = name;
  document.body.append(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 30000);
}
const cell = (v) =>
  '"' +
  (/^[=+@\t\r-]/.test(String(v)) ? "'" : "") +
  String(v ?? "").replaceAll('"', '""') +
  '"';
async function exportData(json) {
  let after = "",
    rows = [];
  do {
    status("正在导出档案：已读取 " + rows.length + " 条…");
    const data = await api("export?after=" + encodeURIComponent(after));
    rows.push(...data.records);
    after = data.nextCursor;
  } while (after);
  const date = new Date().toISOString().slice(0, 10);
  download(
    "JIUKU-DPP-" + date + (json ? ".json" : ".csv"),
    json
      ? JSON.stringify(
          { exportedAt: new Date().toISOString(), records: rows },
          null,
          2,
        )
      : "\uFEFF" +
          [
            ["SN", "DPP URL", "Published", "Revision"],
            ...rows.map((r) => [r.sn, r.url, r.published, r.version]),
          ]
            .map((r) => r.map(cell).join(","))
            .join("\r\n"),
    json ? "application/json" : "text/csv;charset=utf-8",
  );
  status(
    "已导出 " +
      rows.length +
      " 条。完整档案 JSON 不包含文件二进制；文件备份请使用 R2。",
  );
}
$("#create").onsubmit = (e) => {
  e.preventDefault();
  action(async () => {
    const serials = $("#manual-sn")
      .value.split(/\r?\n/)
      .map((s) => s.trim().toUpperCase())
      .filter(Boolean);
    const input = serials.length
      ? { serials }
      : {
          date: $("#batch-date").value,
          count: Number($("#batch-count").value),
        };
    const fingerprint = JSON.stringify(input);
    if (!creating || creating.fingerprint !== fingerprint)
      creating = { fingerprint, key: crypto.randomUUID() };
    batch = (
      await api("batches", {
        method: "POST",
        body: JSON.stringify({
          ...input,
          idempotencyKey: creating.key,
          document: blankPassport(),
        }),
      })
    ).records;
    creating = null;
    await list();
    if (chooseOK()) await open(batch[0].sn);
    status(
      "已创建 " +
        batch.length +
        " 台设备的独立草稿。可打印本批二维码；发布后客户才能查询。",
    );
  });
};
$("#search").onsubmit = (e) => {
  e.preventDefault();
  action(() => list());
};
$("#next").onclick = () => action(() => list(true));
$("#export-csv").onclick = () => action(() => exportData(false));
$("#export-json").onclick = () => action(() => exportData(true));
$("#print-selected").onclick = () => print(batch);
window.addEventListener("beforeunload", (e) => {
  if (dirty) {
    e.preventDefault();
    e.returnValue = "";
  }
});
$("#batch-date").value = new Intl.DateTimeFormat("en-CA", {
  timeZone: "Asia/Shanghai",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
}).format(new Date());
await action(async () => {
  const me = await api("me");
  origin = new URL(me.publicOrigin).origin;
  $("#account").textContent = me.email;
  $("#workspace").hidden = false;
  await list();
  status("已登录。新增设备或选择已有档案开始编辑。");
});
