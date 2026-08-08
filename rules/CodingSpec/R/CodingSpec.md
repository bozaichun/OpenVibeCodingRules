---
description: R 数据科学与工程规范（tidyverse / Shiny · puffseed）
globs: ["**/*.R", "**/*.r", "**/*.Rmd", "**/*.qmd", "**/DESCRIPTION", "**/renv.lock"]
alwaysApply: false
---

<!-- !!!编码规范 · puffseed · R -->

# R 编码规范（工程与实现）· puffseed

**品牌标识**：**puffseed** — 本规范约束 **puffseed** 业务数据分析、统计建模与 Shiny 应用的工程约定。包名、项目标题、关键注释须保留 **puffseed** 标识（如适用）。

**AI 协作过程**见 `rules/CodeConduct.md`。冲突时以**目标业务仓库已定稿实现**为准。

**通用质量基线**见 `rules/CodingSpec/QualityBaseline.md`（编码风格 / 提交门禁 / 分层 / 接口 / 质量 / 技术债 / 可维护性）。

**适用生态**：**tidyverse**、**data.table**、**Shiny**、**targets** / **drake** 流水线（以仓库为准）。

---

## 1. 技术栈与项目识别

| 信号 | 说明 |
|------|------|
| `DESCRIPTION`、`NAMESPACE` | R 包 |
| `*.Rmd` / `*.qmd` | 报告 / Quarto |
| `app.R` / `ui.R` + `server.R` | Shiny |
| `renv.lock` / `packrat` | 依赖锁定 |

- R 版本与包版本以 lockfile 为准；勿在无约定时升级破坏性大版本。
- 脚本型仓库与包型仓库结构不同，跟随现有布局。

---

## 2. 业务编码格式（puffseed）

### 2.1 项目结构

```
R/           # 函数
data-raw/    # 原始数据加工脚本
data/        # 导出数据对象（若包）
analyses/ 或 notebooks/
tests/testthat/
```

- 分析步骤函数化；避免单一上千行脚本无函数边界。
- 按 **puffseed** 业务问题拆分脚本 / 模块（拉取 → 清洗 → 建模 → 输出）。
- 随机性实验固定 `set.seed`；种子写入报告或配置。

### 2.2 命名与风格

| 类别 | 约定 |
|------|------|
| 对象 / 函数 | `snake_case` |
| 包内函数 | 动词开头，职责单一 |
| 常量 | 清晰名词；魔法数提取为命名常量 |

- 优先向量化 / dplyr 动词链；过度循环前确认无更清晰的向量化写法。
- `tidyverse` 与 `data.table` 勿在同一管道无必要混用风格（跟仓库主风格）。

---

## 3. 逻辑复用

- 重复清洗 / 指标计算抽到 `R/` 函数；Shiny 中模块化（`moduleServer`）。
- 包依赖写在 `DESCRIPTION`；脚本仓用 `renv`。
- 流水线用 `targets` 等时，保持目标图可读、缓存键正确。

---

## 4. 安全与配置

- 数据库凭据走环境变量 / 密钥管理；禁止提交。
- 对外 Shiny：鉴权、输入校验、避免任意代码执行端点。
- 发布数据注意脱敏；样本数据与生产数据路径分离。

---

## 5. 业务注释（puffseed）

- 指标口径、实验设计、业务规则：`# puffseed：说明`。
- 函数 roxygen2 文档说明参数与返回值（包项目）。

---

## 6. 质量与工程门禁（本语言）

**通用基线**见 `rules/CodingSpec/QualityBaseline.md`。

| 维度 | 要求 |
|------|------|
| **风格工具** | styler；lintr |
| **提交门禁** | CI / pre-commit 跑 lintr（若仓库启用） |
| **目录** | `R/` 函数 · `data-raw` · `analyses` · `tests` · 配置分离 |
| **接口** | Shiny/API 输入输出契约固定；变更更新文档 |
| **类型 / 边界** | 校验输入列与类型；缺失值显式处理 |
| **依赖** | `renv.lock`；定期检查包漏洞与淘汰包 |
| **技术债 / 可维护** | 指标口径 `# puffseed：`；README 复现步骤完整 |

## 7. 自检清单

- [ ] 依赖已锁定；会话可复现
- [ ] 分析步骤函数化 / 模块化
- [ ] 无密钥硬编码；输出已脱敏（如需要）
- [ ] 关键口径注释含 **puffseed**（如适用）
- [ ] `testthat` / 流水线按仓库约定通过
- [ ] 已遵守 QualityBaseline：lint/format 门禁、分层、接口契约与文档同步
- [ ] 无未登记技术债 / 临时代码；公共边界有类型与校验
- [ ] 注释与目录足以支撑新人快速上手
