// Versioned, public-only passport data. Do not put buyer personal data or internal notes here.
export const SCHEMA_VERSION = "1.0";
export const sections = [
  {
    key: "identity",
    title: "Product identity",
    fields: [
      ["name", "Product name"],
      ["model", "Model"],
      ["manufacturedOn", "Manufactured on", "date"],
      ["status", "Lifecycle status"],
      ["countryOfOrigin", "Country of origin"],
      ["imageId", "Product image file ID"],
    ],
  },
  {
    key: "operators",
    title: "Manufacturer & EU importer",
    fields: [
      ["manufacturerName", "Manufacturer name"],
      ["manufacturerAddress", "Manufacturer address"],
      ["manufacturerEmail", "Manufacturer contact"],
      ["manufacturerIdentifier", "Manufacturer identifier"],
      ["importerName", "EU importer name"],
      ["importerAddress", "EU importer address"],
      ["importerEmail", "EU importer contact"],
      ["importerIdentifier", "EU importer identifier"],
    ],
  },
  {
    key: "materials",
    title: "Materials & bill of materials",
    array: true,
    fields: [
      ["component", "Component"],
      ["material", "Material"],
      ["massKg", "Mass (kg)", "number"],
      ["recycledPercent", "Recycled content (%)", "number"],
      ["substances", "Substances / declarations"],
    ],
  },
  {
    key: "certificates",
    title: "Safety & compliance documents",
    array: true,
    fields: [
      ["type", "Type (CE / RoHS / REACH / EPR)"],
      ["reference", "Document / registration reference"],
      ["status", "Status"],
      ["scope", "Model / territory scope"],
      ["issuer", "Issuer"],
      ["validUntil", "Valid until", "date"],
      ["fileId", "Uploaded PDF file ID"],
    ],
  },
  {
    key: "sustainability",
    title: "Lifetime, repairability & carbon",
    fields: [
      ["serviceLifeYears", "Expected service life (years)", "number"],
      ["serviceLifeBasis", "Service life basis"],
      ["repairability", "Repairability information"],
      ["carbonKgCO2e", "Carbon footprint (kg CO2e)", "number"],
      ["carbonMethod", "Calculation method & boundary"],
      ["carbonEvidence", "Evidence / assessor"],
      ["assessedOn", "Assessed on", "date"],
    ],
  },
  {
    key: "parts",
    title: "Replaceable spare parts",
    array: true,
    fields: [
      ["partNumber", "Part number"],
      ["name", "Part name"],
      ["compatibility", "Compatible models"],
      ["availability", "Availability / supply period"],
      ["replacement", "Replacement instructions"],
      ["fileId", "Repair document file ID"],
    ],
  },
  {
    key: "instructions",
    title: "Use & maintenance",
    fields: [
      ["operation", "Operating instructions", "textarea"],
      ["safety", "Safety information", "textarea"],
      ["maintenance", "Maintenance schedule", "textarea"],
      ["repair", "Repair guidance", "textarea"],
    ],
  },
  {
    key: "recycling",
    title: "End of life & recycling",
    fields: [
      ["disassembly", "Safe disassembly", "textarea"],
      ["collection", "Collection / take-back route", "textarea"],
      ["hazardousParts", "Components requiring special handling", "textarea"],
      ["recycling", "Material recovery guidance", "textarea"],
    ],
  },
];
export function blankPassport() {
  const p = { schemaVersion: SCHEMA_VERSION, files: [], extensions: {} };
  for (const s of sections)
    p[s.key] = s.array
      ? []
      : Object.fromEntries(
          s.fields.map(([k, , t]) => [k, t === "number" ? null : ""]),
        );
  p.identity.status = "In service";
  return p;
}
export function validDate(day) {
  return (
    /^\d{4}-\d{2}-\d{2}$/.test(day) &&
    new Date(day + "T00:00:00Z").toISOString().slice(0, 10) === day
  );
}
export function validSN(sn) {
  if (typeof sn !== "string" || !/^JK-CL-SN-\d{8}-\d{5}$/.test(sn))
    return false;
  const d = sn.slice(9, 17);
  try {
    return (
      validDate(`${d.slice(0, 4)}-${d.slice(4, 6)}-${d.slice(6, 8)}`) &&
      +sn.slice(-5) > 0
    );
  } catch {
    return false;
  }
}
export function validatePassport(p) {
  if (!p || p.schemaVersion !== SCHEMA_VERSION)
    throw Error("Unsupported schema version");
  const allowed = [
    "schemaVersion",
    "files",
    "extensions",
    ...sections.map((s) => s.key),
  ];
  if (Object.keys(p).some((k) => !allowed.includes(k)))
    throw Error("Unknown passport field");
  for (const s of sections) {
    const rows = s.array ? p[s.key] : [p[s.key]];
    if (!Array.isArray(rows) || rows.length > 150)
      throw Error("Invalid " + s.title);
    for (const row of rows) {
      if (
        !row ||
        typeof row !== "object" ||
        Array.isArray(row) ||
        Object.keys(row).some((k) => !s.fields.some((f) => f[0] === k))
      )
        throw Error("Invalid " + s.title + " fields");
      for (const [k, , type] of s.fields) {
        const v = row[k];
        if (type === "number") {
          if (
            v !== null &&
            (typeof v !== "number" || !Number.isFinite(v) || v < 0)
          )
            throw Error(k + " must be a non-negative number or blank");
          if (k === "recycledPercent" && v > 100)
            throw Error("Recycled percentage cannot exceed 100");
        } else if (typeof v !== "string" || v.length > 12000)
          throw Error("Invalid " + k);
        if (type === "date" && v) {
          try {
            if (!validDate(v)) throw Error();
          } catch {
            throw Error("Invalid date: " + k);
          }
        }
      }
    }
  }
  if (
    !Array.isArray(p.files) ||
    p.files.length > 100 ||
    p.files.some((x) => typeof x !== "string" || !/^[-a-f0-9]{36}$/.test(x)) ||
    new Set(p.files).size !== p.files.length
  )
    throw Error("Invalid file references");
  if (
    !p.extensions ||
    typeof p.extensions !== "object" ||
    Array.isArray(p.extensions) ||
    JSON.stringify(p.extensions).length > 10000
  )
    throw Error("Invalid extensions");
  const refs = [
    p.identity.imageId,
    ...p.certificates.map((x) => x.fileId),
    ...p.parts.map((x) => x.fileId),
  ].filter(Boolean);
  if (refs.some((id) => !p.files.includes(id)))
    throw Error("Referenced files must be attached to this passport");
  return p;
}
