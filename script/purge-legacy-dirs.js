/**
 * 删除迁移残留的空目录（仅安全清理空壳；勿删 language/ · script/ · rules/CodingSpec）。
 *
 *   node script/purge-legacy-dirs.js
 */
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const targets = [
  // 历史路径残留（若为空才删）
  path.join(root, "rules", "language"),
  path.join(root, "rules", "script"),
];

for (const t of targets) {
  if (!fs.existsSync(t)) {
    console.log("already gone:", path.relative(root, t));
    continue;
  }
  const entries = fs.readdirSync(t);
  if (entries.length) {
    console.log("skip non-empty:", path.relative(root, t));
    continue;
  }
  try {
    fs.rmSync(t, { recursive: true, force: true });
    console.log("removed:", path.relative(root, t));
  } catch (e) {
    console.error("FAILED:", path.relative(root, t), e.message);
    process.exitCode = 1;
  }
}
