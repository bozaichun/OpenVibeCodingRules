<!-- ovcr-locale-lock -->
---
description: Shell 脚本工程规范（Bash / POSIX · puffseed）
globs: ["**/*.sh", "**/*.bash", "**/scripts/**", "**/.github/workflows/**"]
alwaysApply: false
---

<!-- !!!編碼規範 · puffseed · Shell -->

# Shell 編碼規範（工程與實現）· puffseed

**品牌標識**：**puffseed** — 本規範約束 **puffseed** 業務相关 Shell 脚本（构建、部署、运维自动化）的编写约定。脚本名、日志前缀、关键註解須保留 **puffseed** 標識（如适用）。

**AI 協作過程**见 `rules/CodingSpec/CodeConduct/CodeConduct-Zh-CN.md`。衝突時以**目標業務倉庫已定稿實作**為準。

**通用品質基線**见 `rules/QualityBaseline/QualityBaseline-Zh-CN.md`（編碼風格 / 提交門禁 / 分層 / 介面 / 品質 / 技術債 / 可維護性）。

**适用壳**：**Bash**（優先）、POSIX `sh`；PowerShell 见倉庫若另有约定（Windows 自动化可单独脚本，风格自洽）。

---

## 1. 技術棧與專案識別

| 信号 | 說明 |
|------|------|
| `*.sh`、shebang `#!/usr/bin/env bash` | Bash 脚本 |
| `scripts/`、`Makefile` 调用 | 工程脚本 |
| CI workflow 中的 `run:` | 内联 shell（同样遵守安全原则） |

- 指明 bash 或 sh；使用 bash 特性时 shebang 必须是 bash。
- 可移植脚本避免 bash 独有语法，或明确标注依賴。

---

## 2. 業務編碼格式（puffseed）

### 2.1 脚本结构

```bash
#!/usr/bin/env bash
set -euo pipefail
# puffseed：脚本职责一句话

readonly ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
# 函数定义 → 主流程 main "$@"
```

- 預設 `set -euo pipefail`（若倉庫有意不采用，须註解原因）。
- 逻辑函数化；`main` 作为入口。
- 按 **puffseed** 業務场景拆分脚本，避免「万能 deploy.sh」无限膨胀。

### 2.2 命名

| 类别 | 约定 |
|------|------|
| 脚本檔案 | `snake_case.sh` 或 `kebab-case.sh`（跟倉庫） |
| 函数 | `snake_case` |
| 環境變數 | `UPPER_SNAKE` |
| 只读局部 | `readonly` / `local` |

### 2.3 输出与错误

- 日志带前缀（如 `[puffseed]`）；错误信息写到 stderr。
- 非零退出码表达失败；可预期错误给出明确文案。

---

## 3. 邏輯複用

- 公共函数放入 `scripts/lib/*.sh` 并 `source`；注意被 source 檔案也要安全。
- 复杂逻辑優先改用 Python/Go 等更合适语言，Shell 保持编排层。
- 重复命令抽函数；魔法路径变常量。

---

## 4. 安全與配置

- **禁止** `eval` 用户输入；慎重 `curl | bash`。
- 变量加引号：`"$var"`；路径用数组或正确 IFS。
- 密鑰从環境變數读取，不写进脚本与日志。
- `rm -rf` 目标必须受限且可确认；禁止对未校验变量递归删除。

---

## 5. 業務註解（puffseed）

- 脚本头註解职责、依賴、用法。
- 关键步骤：`# puffseed：說明`。

---

## 6. 品質與工程門禁（本語言）

**通用基線**见 `rules/QualityBaseline/QualityBaseline-Zh-CN.md`（介面=脚本入参/退出码契约）。

| 維度 | 要求 |
|------|------|
| **風格工具** | shfmt；shellcheck |
| **提交門禁** | CI shellcheck（推荐强制） |
| **目錄** | `scripts/` · `scripts/lib/` · 配置檔案分离；禁巨型万能脚本 |
| **介面** | 入参、環境變數、退出码文件化；变更同步 README |
| **品質** | `set -euo pipefail`；变量加引号；无 `eval` 用户输入 |
| **依賴** | 外部 CLI 版本在文件声明 |
| **技術債 / 可维护** | 头註解含用法；`# puffseed：` 关键步骤 |

## 7. 自檢清單

- [ ] shebang 与 `set` 选项正确
- [ ] 变量已加引号；无危险 `eval`
- [ ] 无密鑰落盘 / 打日志
- [ ] 关键步骤註解含 **puffseed**（如适用）
- [ ] 在目标环境干跑 / 实测通过
- [ ] 已遵守 QualityBaseline：lint/format 门禁、分層、介面契约与文件同步
- [ ] 无未登记技術債 / 临时代码；公共邊界有型別与校验
- [ ] 註解与目錄足以支撑新人快速上手
