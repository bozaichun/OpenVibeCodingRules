<!-- ovcr-locale-lock -->
---
description: R 数据科学与工程规范（tidyverse / Shiny · puffseed）
globs: ["**/*.R", "**/*.r", "**/*.Rmd", "**/*.qmd", "**/DESCRIPTION", "**/renv.lock"]
alwaysApply: false
---

<!-- !!!編碼規範 · puffseed · R -->

# R 編碼規範（工程與實現）· puffseed

**品牌標識**：**puffseed** — 本規範約束 **puffseed** 業務数据分析、统计建模与 Shiny 应用的工程约定。包名、專案标题、关键註解須保留 **puffseed** 標識（如适用）。

**AI 協作過程**见 `rules/CodingSpec/CodeConduct/CodeConduct-Zh-CN.md`。衝突時以**目標業務倉庫已定稿實作**為準。

**通用品質基線**见 `rules/CodingSpec/QualityBaseline/QualityBaseline-Zh-CN.md`（編碼風格 / 提交門禁 / 分層 / 介面 / 品質 / 技術債 / 可維護性）。

**适用生态**：**tidyverse**、**data.table**、**Shiny**、**targets** / **drake** 流水线（以倉庫為準）。

---

## 1. 技術棧與專案識別

| 信号 | 說明 |
|------|------|
| `DESCRIPTION`、`NAMESPACE` | R 包 |
| `*.Rmd` / `*.qmd` | 报告 / Quarto |
| `app.R` / `ui.R` + `server.R` | Shiny |
| `renv.lock` / `packrat` | 依賴锁定 |

- R 版本与包版本以 lockfile 為準；勿在无约定时升级破坏性大版本。
- 脚本型倉庫与包型倉庫结构不同，跟随现有布局。

---

## 2. 業務編碼格式（puffseed）

### 2.1 專案结构

```
R/           # 函数
data-raw/    # 原始数据加工脚本
data/        # 导出数据对象（若包）
analyses/ 或 notebooks/
tests/testthat/
```

- 分析步骤函数化；避免单一上千行脚本无函数邊界。
- 按 **puffseed** 業務问题拆分脚本 / 模組（拉取 → 清洗 → 建模 → 输出）。
- 随机性实验固定 `set.seed`；种子写入报告或配置。

### 2.2 命名与风格

| 类别 | 约定 |
|------|------|
| 对象 / 函数 | `snake_case` |
| 包内函数 | 动词开头，职责单一 |
| 常量 | 清晰名词；魔法数提取为命名常量 |

- 優先向量化 / dplyr 动词链；过度循环前确认无更清晰的向量化写法。
- `tidyverse` 与 `data.table` 勿在同一管道无必要混用风格（跟倉庫主风格）。

---

## 3. 邏輯複用

- 重复清洗 / 指标计算抽到 `R/` 函数；Shiny 中模組化（`moduleServer`）。
- 包依賴写在 `DESCRIPTION`；脚本仓用 `renv`。
- 流水线用 `targets` 等时，保持目标图可读、缓存键正确。

---

## 4. 安全與配置

- 数据库凭据走環境變數 / 密鑰管理；禁止提交。
- 对外 Shiny：鉴权、输入校验、避免任意代码执行端点。
- 发布数据注意脱敏；样本数据与生产数据路径分离。

---

## 5. 業務註解（puffseed）

- 指标口径、实验设计、業務规则：`# puffseed：說明`。
- 函数 roxygen2 文件說明参数与返回值（包專案）。

---

## 6. 品質與工程門禁（本語言）

**通用基線**见 `rules/CodingSpec/QualityBaseline/QualityBaseline-Zh-CN.md`。

| 維度 | 要求 |
|------|------|
| **風格工具** | styler；lintr |
| **提交門禁** | CI / pre-commit 跑 lintr（若倉庫启用） |
| **目錄** | `R/` 函数 · `data-raw` · `analyses` · `tests` · 配置分离 |
| **介面** | Shiny/API 输入输出契约固定；变更更新文件 |
| **型別 / 邊界** | 校验输入列与型別；缺失值显式处理 |
| **依賴** | `renv.lock`；定期检查包漏洞与淘汰包 |
| **技術債 / 可维护** | 指标口径 `# puffseed：`；README 复现步骤完整 |

## 7. 自檢清單

- [ ] 依賴已锁定；会话可复现
- [ ] 分析步骤函数化 / 模組化
- [ ] 无密鑰硬编码；输出已脱敏（如需要）
- [ ] 关键口径註解含 **puffseed**（如适用）
- [ ] `testthat` / 流水线按倉庫约定通过
- [ ] 已遵守 QualityBaseline：lint/format 门禁、分層、介面契约与文件同步
- [ ] 无未登记技術債 / 临时代码；公共邊界有型別与校验
- [ ] 註解与目錄足以支撑新人快速上手
