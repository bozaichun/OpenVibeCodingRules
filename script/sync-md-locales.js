/**
 * 同步简体权威源到其他语种文件。
 *
 * 用法：
 *   node script/sync-md-locales.js
 *   node script/sync-md-locales.js --force
 */
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const force = process.argv.includes("--force");
const LOCK = "<!-- ovcr-locale-lock -->";
const LOCALES = [
  { file: "Zh-TW" },
  { file: "En" },
  { file: "Ja" },
  { file: "Ru" },
];

function ensureDir(p) {
  fs.mkdirSync(path.dirname(p), { recursive: true });
}

function syncFile(src, dest) {
  if (!fs.existsSync(src)) return "missing";
  if (fs.existsSync(dest)) {
    const cur = fs.readFileSync(dest, "utf8");
    if (cur.trimStart().startsWith(LOCK)) return "locked";
    if (!force) return "skipped";
  }
  ensureDir(dest);
  fs.writeFileSync(dest, fs.readFileSync(src), "utf8");
  return "written";
}

function nestReadmeLinks(body) {
  return body
    .replace(/\]\(\.\/README\.md#ovcr-lang\)/g, "](../../README.md#ovcr-lang)")
    .replace(/\]\(\.\/rules\/README\/README-/g, "](./README-")
    .replace(/\]\(\.\/LICENSE\)/g, "](../../LICENSE)")
    .replace(/\]\(\.\/README\.html\)/g, "](../../README.html)")
    .replace(/\]\(\.\/AGENTS\.md/g, "](../../AGENTS.md");
}

const csRoot = path.join(root, "rules", "CodingSpec");
let written = 0;
let skipped = 0;
let locked = 0;

function tally(r) {
  if (r === "written") written++;
  else if (r === "locked") locked++;
  else if (r === "skipped") skipped++;
}

for (const base of ["QualityBaseline", "CodeConduct"]) {
  const dir = path.join(csRoot, base);
  const zh = path.join(dir, base + "-Zh-CN.md");
  for (const loc of LOCALES) {
    tally(syncFile(zh, path.join(dir, base + "-" + loc.file + ".md")));
  }
}

for (const name of fs.readdirSync(csRoot)) {
  const dir = path.join(csRoot, name);
  if (!fs.statSync(dir).isDirectory()) continue;
  if (name === "CodeConduct" || name === "QualityBaseline") continue;
  const zhSpec = path.join(dir, "CodingSpec-Zh-CN.md");
  const zhDesign = path.join(dir, "DESIGN.md");
  for (const loc of LOCALES) {
    tally(syncFile(zhSpec, path.join(dir, "CodingSpec-" + loc.file + ".md")));
    if (fs.existsSync(zhDesign)) {
      tally(syncFile(zhDesign, path.join(dir, "DESIGN-" + loc.file + ".md")));
    }
  }
}

const zhReadme = path.join(root, "rules/README/README-Zh-CN.md");
const rootReadme = path.join(root, "README.md");
if (fs.existsSync(rootReadme)) {
  fs.writeFileSync(zhReadme, nestReadmeLinks(fs.readFileSync(rootReadme, "utf8")), "utf8");
}
for (const loc of LOCALES) {
  tally(
    syncFile(zhReadme, path.join(root, "rules/README", "README-" + loc.file + ".md"))
  );
}

console.log(
  "sync-md-locales: written=",
  written,
  "skipped=",
  skipped,
  "locked=",
  locked
);
