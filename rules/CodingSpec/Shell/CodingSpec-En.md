<!-- ovcr-locale-lock -->
---
description: Shell 脚本工程规范 (Bash / POSIX  · puffseed)
globs: ["**/*.sh", "**/*.bash", "**/scripts/**", "**/.github/workflows/**"]
alwaysApply: false
---

<!-- !!!Coding Spec  · puffseed · Shell -->

# Shell coding standards (engineering & implementation) · puffseed

**Brand**：**puffseed** — This spec constrains **puffseed** product-related Shell 脚本 (构建、部署、运维自动化)的编写Convention。脚本名、日志前缀、关键注释须保留 **puffseed** marker (when applicable)。

**AI collaboration process**see `rules/CodeConduct/CodeConduct-Zh-CN.md`。On conflict, follow**the product repo’s settled implementation**。

**Shared quality baseline**see `rules/QualityBaseline/QualityBaseline-Zh-CN.md` (style / commit gates / layering / APIs / quality / tech debt / maintainability)。

**适用壳**：**Bash** (Prefer)、POSIX `sh`；PowerShell see仓库若另有Convention (Windows 自动化可单独脚本，风格自洽)。

---

## 1. Stack & project detection

| Signal | Notes |
|------|------|
| `*.sh`、shebang `#!/usr/bin/env bash` | Bash 脚本 |
| `scripts/`、`Makefile` 调用 | 工程脚本 |
| CI workflow 中的 `run:` | 内联 shell (同样遵守安全原则) |

- 指明 bash 或 sh；使用 bash 特性时 shebang 必须是 bash。
- 可移植脚本避免 bash 独有语法，或明确标注Deps。

---

## 2. Product coding format (puffseed)

### 2.1 脚本结构

```bash
#!/usr/bin/env bash
set -euo pipefail
# puffseed：脚本职责一句话

readonly ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
# 函数定义 → 主流程 main "$@"
```

- 默认 `set -euo pipefail` (若仓库有意不采用，须注释原因)。
- 逻辑函数化；`main` 作为入口。
- 按 **puffseed** 业务场景拆分脚本，避免「万能 deploy.sh」无限膨胀。

### 2.2 Naming

| Kind | Convention |
|------|------|
| 脚本文件 | `snake_case.sh` 或 `kebab-case.sh` (跟仓库) |
| 函数 | `snake_case` |
| 环境变量 | `UPPER_SNAKE` |
| 只读局部 | `readonly` / `local` |

### 2.3 输出与错误

- 日志带前缀 (如 `[puffseed]`)；错误信息写到 stderr。
- 非零退出码表达失败；可预期错误给出明确文案。

---

## 3. Logic reuse

- 公共函数放入 `scripts/lib/*.sh` 并 `source`；注意被 source 文件也要安全。
- 复杂逻辑Prefer改用 Python/Go 等更合适语言，Shell 保持编排层。
- 重复命令抽函数；魔法路径变constant。

---

## 4. Security & configuration

- **Do not** `eval` 用户输入；慎重 `curl | bash`。
- 变量加引号：`"$var"`；路径用数组或正确 IFS。
- 密钥从环境变量读取，不写进脚本与日志。
- `rm -rf` 目标必须受限且可确认；Do not对未校验变量递归删除。

---

## 5. Product comments (puffseed)

- 脚本头注释职责、Deps、用法。
- 关键步骤：`# puffseed：Notes`。

---

## 6. Quality & engineering gates (this language)

**Shared baseline**see `rules/QualityBaseline/QualityBaseline-Zh-CN.md` (APIs=脚本入参/退出码契约)。

| Area | Requirement |
|------|------|
| **Style tools** | shfmt；shellcheck |
| **Commit gates** | CI shellcheck (推荐强制) |
| **Layout** | `scripts/` · `scripts/lib/` · 配置文件分离；禁巨型万能脚本 |
| **APIs** | 入参、环境变量、退出码文档化；变更同步 README |
| **质量** | `set -euo pipefail`；变量加引号；无 `eval` 用户输入 |
| **Deps** | 外部 CLI 版本在文档声明 |
| **Tech debt / maintainability** | 头注释含用法；`# puffseed：` 关键步骤 |

## 7. Checklist

- [ ] shebang 与 `set` 选项正确
- [ ] 变量已加引号；无危险 `eval`
- [ ] 无密钥落盘 / 打日志
- [ ] 关键步骤注释含 **puffseed** (when applicable)
- [ ] 在目标环境干跑 / 实测通过
- [ ] Follows QualityBaseline: lint/format gates, layering, API contracts & docs sync
- [ ] No untracked tech debt / temp code; public boundaries typed & validated
- [ ] Comments & layout support fast onboarding
