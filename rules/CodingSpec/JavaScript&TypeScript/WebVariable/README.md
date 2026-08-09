# WebVariable 维护说明（puffseed）

本目录是前端 **设计 Token 唯一维护处**。开发者通过编辑 **`SubjectAuthority.md`**（权威表），再同步到 CSS；业务组件只引用 `var(--*)`，不复制色板。

---

## 1. 目录里有什么

| 文件 | 职责 | 谁改 |
|------|------|------|
| **`SubjectAuthority.md`** | **权威源**：主题色、文本色、间距、**字阶+行高**、图标、边框、阴影的表格定义 | 设计师 / 开发者先改这里 |
| **`ThemeVariable.css`** | 主题色 · 功能色 · 辅助色 · 文本色（由权威表同步） | 由 Agent / 开发者按表生成，勿手改漂移 |
| **`SystemVariable.css`** | 间距 · 图标 · **字阶 `--fs-*` + 行高 `--lh-*`** · 边框线 · 阴影（由权威表同步） | 同上 |
| **`ProjectReset.css`** | 浏览器重置与 `html`/`body` 基础样式 | 仅全局 reset 需求时改；**不走** SubjectAuthority 表格 |
| **`README.md`** | 本说明 | — |

引入顺序（业务入口固定）：

```text
ThemeVariable.css → SystemVariable.css → ProjectReset.css → 应用级 CSS
```

视觉验收（浏览器打开，勿把 HTML 全文喂给 AI）：

- `../PreView/LightDesignSpec.html`
- `../PreView/DarkDesignSpec.html`

---

## 2. 核心工作流：先改权威表，再同步 CSS

```text
编辑 SubjectAuthority.md
        ↓
对 Agent 下发「按 SubjectAuthority 同步」指令
        ↓
更新 ThemeVariable.css / SystemVariable.css
        ↓
打开 PreView 刷新验收
```

### 2.1 权威表结构

`SubjectAuthority.md` 分为：

| 章节 | 同步目标文件 |
|------|-------------|
| **一、系统变量**（元素尺寸、图标、字体字阶+行高、边框线、阴影） | `SystemVariable.css` |
| **二、主题变量**（标准色、功能色、辅助色、文本色） | `ThemeVariable.css` |

表格列约定：

- 系统变量（尺寸 / 图标 / 边框 / 阴影）：`场景名称 | 尺寸或值 | 变量`
- 系统变量（§1.3 字体）：`场景名称 | 尺寸 | 字阶变量 | 行高变量`（`--fs-*` 与 `--lh-*` 强制成对）
- 主题变量：`场景名称 | 颜色 | 变量`

**规则：**

1. **新增 Token**：先在对应表格加一行（场景名 + 变量名 + 值），再同步 CSS。
2. **改色 / 改尺寸**：只改表格中的值，保持变量名稳定（业务代码已引用变量名）。
3. **重命名变量**：属于破坏性变更；须同步改业务引用，并在 PR 中说明。
4. **删除变量**：确认无引用后再删表项并同步 CSS。
5. **不要**只改 CSS 不改 `SubjectAuthority.md`，否则下次同步会被表覆盖或产生漂移。

### 2.2 变量命名建议

| 类型 | 示例 | 说明 |
|------|------|------|
| 主题色 | `--primary` · `--primary-hover` | 语义名，禁止 `--blue-1` 当业务主色 |
| 文本色 | `--title` · `--main-text-dark` | 浅底 / 深底成套 |
| 间距 | `--size-8` · `--size-16` | 与像素档位对应 |
| 字阶 | `--fs-14` · `--fs-20` | 与使用场景注释一致；须成对行高 |
| 行高 | `--lh-22` · `--lh-28` | 与同行字阶强制配对，见 §1.3 |
| 图标 | `--wh-16` · `--wh-24` | 宽高同值 |
| 复合 | `--solid` · `--shadow` | 可引用其他变量，如 `var(--border)` |

---

## 3. 如何对 Agent 说明（推荐话术）

在 Cursor 中 `@SubjectAuthority.md`，并视情况 `@ThemeVariable.css` `@SystemVariable.css`，然后使用下列指令。

### 3.1 全量同步（改完表格后）

```text
请根据 @SubjectAuthority.md 对 WebVariable 下的 ThemeVariable.css、SystemVariable.css 进行更新同步：
1. 以 SubjectAuthority 表格为唯一权威，覆盖对应 CSS 变量值；
2. 保持现有 CSS 分区注释风格（标准色 / 功能色 / 字体 / 阴影等）；
3. 不要改 ProjectReset.css（除非我明确要求）；
4. 同步后列出变更的变量清单。
```

### 3.2 只改主题色 / 品牌色（团队换肤）

```text
我们团队要统一品牌色。请先把 @SubjectAuthority.md 里「二、主题变量」的标准色与相关功能色改成：
- 主色 --primary: #______
- hover / active / bg / border 按主色生成合理梯度（或使用我给出的完整色值表）
然后根据 SubjectAuthority 同步 ThemeVariable.css，并提醒我打开 PreView 验收。
不要改系统间距与字号，除非我另附尺寸表。
```

### 3.3 只改间距 / 字号（系统变量）

```text
请按我提供的尺寸表更新 @SubjectAuthority.md「一、系统变量」对应行，再同步到 SystemVariable.css。
ThemeVariable.css 保持不动。同步后列出变更项。
```

### 3.4 用团队规范整体替换当前默认（统一团队规范）

适用于：fork 本仓库后，把 puffseed 默认 Token **整体换成团队设计系统**。

```text
请将本项目 WebVariable 切换为「我司 / 我团队」设计规范，步骤：
1. 按我提供的色板与尺寸表，重写 @SubjectAuthority.md（保留表格结构：系统变量 + 主题变量）；
2. 根据新的 SubjectAuthority 全量同步 ThemeVariable.css、SystemVariable.css；
3. 变量名尽量保持与现有 --primary / --size-* / --fs-* 兼容，便于业务少改代码；
   若必须新增变量，在表中补行并说明用途；
4. 不要在业务组件里硬编码色值；
5. 同步完成后给出：变更摘要 + PreView 验收路径 + 业务侧是否需要改引用。
品牌标识按团队要求处理（保留或替换 puffseed 相关文案仅在预览页，Token 文件以变量为准）。
```

把「我提供的色板」可直接贴在对话里，或写成附件表。

### 3.5 扩展套件（不改核心表，追加风格）

若只需额外品牌主题、不想动默认核心：

```text
请在 WebVariable 或同级 Extensions/ 新增 BrandTheme.css（或指定文件名），
覆盖/追加若干 CSS 变量；不要修改 ThemeVariable.css / SystemVariable.css 核心文件。
并说明业务入口如何在核心三件套之后追加 import。
```

---

## 4. 团队定制化路径（选一种）

### 路径 A：改权威表（推荐 · 团队统一规范）

适合「全公司 / 全项目一套 Token」。

1. 编辑 `SubjectAuthority.md` 色值与尺寸  
2. Agent 同步两个 CSS  
3. PreView 验收  
4. 业务仓继续引用同一变量名  

### 路径 B：扩展 CSS 拔插

适合「默认规范 + 个别品牌皮肤」。

1. 新增 `BrandTheme.css`（或 `Extensions/Xxx.css`）  
2. 入口在核心三件套**之后**再 `import`  
3. 用同名变量覆盖，或新增带前缀变量（如 `--brand-primary`）  
4. **明确要求前**，AI 不得擅自改核心文件、不得私自加扩展  

### 路径 C：仅业务仓覆盖（不推荐作长期方案）

在应用入口之后的本地 CSS 覆盖 `var`。易漂移，难以与 `SubjectAuthority` 对齐；仅作临时演示。

---

## 5. 验收清单

改完 Token 后请确认：

- [ ] `SubjectAuthority.md` 与两个 CSS **数值一致**（无只改一侧）
- [ ] 变量名未无故破坏性重命名
- [ ] `ProjectReset.css` 未被误改（除非有意）
- [ ] 浏览器打开浅色 / 深色 PreView，主色、文本、间距、阴影正常
- [ ] 业务组件仍使用 `var(--token)`，无新增硬编码色板
- [ ] 若有扩展套件，入口引入顺序正确

---

## 6. 常见问题

**Q：能不能直接改 CSS？**  
A：紧急热修可以，但必须立刻回写 `SubjectAuthority.md`，否则下次「按表同步」会丢改动或覆盖你的热修。

**Q：Agent 同步后注释乱了？**  
A：在指令中要求「保持现有分区注释与编号风格」；对照当前 `ThemeVariable.css` / `SystemVariable.css` 结构生成。

**Q：深色模式怎么办？**  
A：文本色已在权威表「浅色背景 / 深色背景」两套；组件按背景选用 `--title` 或 `--title-dark` 等。整页主题切换若需额外 `[data-theme=dark]` 覆盖，用扩展 CSS，并在表中登记新增变量。

**Q：与 DESIGN.md / AGENTS.md 冲突？**  
A：Token **色值与尺寸以本目录（SubjectAuthority → CSS）为准**；用法与禁令见 `DESIGN.md`、`AGENTS.md`。

---

## 7. 一句话原则

> **表是权威，CSS 是产物；先改 `SubjectAuthority.md`，再让 Agent 同步，最后用 PreView 验收。**

团队要替换默认规范时：把色板/尺寸写进权威表 → 用 §3.4 话术让 Agent 全量同步 → 锁定变量名兼容，减少业务改动。
