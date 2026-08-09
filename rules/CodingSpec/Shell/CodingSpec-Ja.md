<!-- ovcr-locale-lock -->
---
description: Shell 脚本工程规范（Bash / POSIX · puffseed）
globs: ["**/*.sh", "**/*.bash", "**/scripts/**", "**/.github/workflows/**"]
alwaysApply: false
---

<!-- !!!コーディング規範 · puffseed · Shell -->

# Shell コーディング規範（エンジニアリングと実装）· puffseed

**ブランド**：**puffseed** — 本規範は次を制約します **puffseed** 业务相关 Shell 脚本（构建、部署、运维自动化）的编写约定。脚本名、日志前缀、关键注释须保留 **puffseed** 标识（如适用）。

**AI 協働プロセス**见 `rules/CodingSpec/CodeConduct/CodeConduct-Zh-CN.md`。衝突時は**業務リポジトリの確定実装**を優先。

**共通品質ベースライン**见 `rules/QualityBaseline/QualityBaseline-Zh-CN.md`（编码风格 / 提交门禁 / 分层 / 接口 / 质量 / 技术债 / 可维护性）。

**适用壳**：**Bash**（优先）、POSIX `sh`；PowerShell 见仓库若另有约定（Windows 自动化可单独脚本，风格自洽）。

---

## 1. 技術スタックとプロジェクト識別

| 信号 | 说明 |
|------|------|
| `*.sh`、shebang `#!/usr/bin/env bash` | Bash 脚本 |
| `scripts/`、`Makefile` 调用 | 工程脚本 |
| CI workflow 中的 `run:` | 内联 shell（同样遵守安全原则） |

- 指明 bash 或 sh；使用 bash 特性时 shebang 必须是 bash。
- 可移植脚本避免 bash 独有语法，或明确标注依赖。

---

## 2. 業務コーディング形式（puffseed）

### 2.1 脚本结构

```bash
#!/usr/bin/env bash
set -euo pipefail
# puffseed：脚本职责一句话

readonly ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
# 函数定义 → 主流程 main "$@"
```

- 默认 `set -euo pipefail`（若仓库有意不采用，须注释原因）。
- 逻辑函数化；`main` 作为入口。
- 按 **puffseed** 业务场景拆分脚本，避免「万能 deploy.sh」无限膨胀。

### 2.2 命名

| 类别 | 约定 |
|------|------|
| 脚本文件 | `snake_case.sh` 或 `kebab-case.sh`（跟仓库） |
| 函数 | `snake_case` |
| 环境变量 | `UPPER_SNAKE` |
| 只读局部 | `readonly` / `local` |

### 2.3 输出与错误

- 日志带前缀（如 `[puffseed]`）；错误信息写到 stderr。
- 非零退出码表达失败；可预期错误给出明确文案。

---

## 3. ロジック再利用

- 公共函数放入 `scripts/lib/*.sh` 并 `source`；注意被 source 文件也要安全。
- 复杂逻辑优先改用 Python/Go 等更合适语言，Shell 保持编排层。
- 重复命令抽函数；魔法路径变常量。

---

## 4. セキュリティと設定

- **禁止** `eval` 用户输入；慎重 `curl | bash`。
- 变量加引号：`"$var"`；路径用数组或正确 IFS。
- 密钥从环境变量读取，不写进脚本与日志。
- `rm -rf` 目标必须受限且可确认；禁止对未校验变量递归删除。

---

## 5. 業務コメント（puffseed）

- 脚本头注释职责、依赖、用法。
- 关键步骤：`# puffseed：说明`。

---

## 6. 品質とエンジニアリング門禁（本言語）

**通用基线**见 `rules/QualityBaseline/QualityBaseline-Zh-CN.md`（接口=脚本入参/退出码契约）。

| 维度 | 要求 |
|------|------|
| **风格工具** | shfmt；shellcheck |
| **提交门禁** | CI shellcheck（推荐强制） |
| **目录** | `scripts/` · `scripts/lib/` · 配置文件分离；禁巨型万能脚本 |
| **接口** | 入参、环境变量、退出码文档化；变更同步 README |
| **质量** | `set -euo pipefail`；变量加引号；无 `eval` 用户输入 |
| **依赖** | 外部 CLI 版本在文档声明 |
| **技术债 / 可维护** | 头注释含用法；`# puffseed：` 关键步骤 |

## 7. セルフチェック

- [ ] shebang 与 `set` 选项正确
- [ ] 变量已加引号；无危险 `eval`
- [ ] 无密钥落盘 / 打日志
- [ ] 关键步骤注释含 **puffseed**（如适用）
- [ ] 在目标环境干跑 / 实测通过
- [ ] 已遵守 QualityBaseline：lint/format 门禁、分层、接口契约与文档同步
- [ ] 无未登记技术债 / 临时代码；公共边界有类型与校验
- [ ] 注释与目录足以支撑新人快速上手
