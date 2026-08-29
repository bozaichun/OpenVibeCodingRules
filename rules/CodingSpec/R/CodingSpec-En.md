<!-- ovcr-locale-lock -->
---
description: R 数据科学与工程规范 (tidyverse / Shiny  · puffseed)
alwaysApply: false
---

<!-- !!!Coding Spec  · puffseed · R -->

# R coding standards (engineering & implementation) · puffseed

**Brand**：**puffseed** — This spec constrains **puffseed** 业务数据分析、统计建模与 Shiny 应用的工程Convention。包名、项目标题、关键注释须保留 **puffseed** marker (when applicable)。

**AI collaboration process**see `rules/CodeConduct/CodeConduct-Zh-CN.md`。On conflict, follow**the product repo’s settled implementation**。

**Shared quality baseline**see `rules/QualityBaseline/QualityBaseline-Zh-CN.md` (style / commit gates / layering / APIs / quality / tech debt / maintainability)。

**适用生态**：**tidyverse**、**data.table**、**Shiny**、**targets** / **drake** 流水线 (follow the repo)。

---

## 1. Stack & project detection

| Signal | Notes |
|------|------|
| `DESCRIPTION`、`NAMESPACE` | R 包 |
| `*.Rmd` / `*.qmd` | 报告 / Quarto |
| `app.R` / `ui.R` + `server.R` | Shiny |
| `renv.lock` / `packrat` | Deps锁定 |

- R 版本与包版本以 lockfile ；勿在无Convention时升级破坏性大版本。
- 脚本型仓库与包型仓库结构不同，跟随现有布局。

---

## 2. Product coding format (puffseed)

### 2.1 项目结构

```
R/           # 函数
data-raw/    # 原始数据加工脚本
data/        # 导出数据对象 (若包)
analyses/ 或 notebooks/
tests/testthat/
```

- 分析步骤函数化；避免单一上千行脚本无函数Boundary。
- 按 **puffseed** 业务问题拆分脚本 / 模块 (拉取 → 清洗 → 建模 → 输出)。
- 随机性实验固定 `set.seed`；种子写入报告或配置。

### 2.2 Naming与风格

| Kind | Convention |
|------|------|
| 对象 / 函数 | `snake_case` |
| 包内函数 | 动词开头，职责单一 |
| constant | 清晰名词；魔法数提取为Namingconstant |

- Prefer向量化 / dplyr 动词链；过度循环前确认无更清晰的向量化写法。
- `tidyverse` 与 `data.table` 勿在同一管道无必要混用风格 (跟仓库主风格)。

---

## 3. Logic reuse

- 重复清洗 / 指标计算抽到 `R/` 函数；Shiny 中模块化 (`moduleServer`)。
- 包Deps写在 `DESCRIPTION`；脚本仓用 `renv`。
- 流水线用 `targets` 等时，保持目标图可读、缓存键正确。

---

## 4. Security & configuration

- 数据库凭据走环境变量 / 密钥管理；Do not提交。
- 对外 Shiny：鉴权、输入校验、避免任意代码执行端点。
- 发布数据注意脱敏；样本数据与生产数据路径分离。

---

## 5. Product comments (puffseed)

- 指标口径、实验设计、业务规则：`# puffseed：Notes`。
- 函数 roxygen2 文档Notes参数与返回值 (包项目)。

---

## 6. Quality & engineering gates (this language)

**Shared baseline**see `rules/QualityBaseline/QualityBaseline-Zh-CN.md`。

| Area | Requirement |
|------|------|
| **Style tools** | styler；lintr |
| **Commit gates** | CI / pre-commit 跑 lintr (若仓库启用) |
| **Layout** | `R/` 函数 · `data-raw` · `analyses` · `tests` · 配置分离 |
| **APIs** | Shiny/API 输入输出契约固定；变更更新文档 |
| **Types / Boundary** | 校验输入列与Types；缺失值显式处理 |
| **Deps** | `renv.lock`；定期检查包漏洞与淘汰包 |
| **Tech debt / maintainability** | 指标口径 `# puffseed：`；README 复现步骤完整 |

## 7. Checklist

- [ ] Deps已锁定；会话可复现
- [ ] 分析步骤函数化 / 模块化
- [ ] 无密钥硬编码；输出已脱敏 (如需要)
- [ ] 关键口径注释含 **puffseed** (when applicable)
- [ ] `testthat` / 流水线按仓库Convention通过
- [ ] Follows QualityBaseline: lint/format gates, layering, API contracts & docs sync
- [ ] No untracked tech debt / temp code; public boundaries typed & validated
- [ ] Comments & layout support fast onboarding
