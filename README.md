<a id="ovcr-lang"></a>

> **Language / 语言**：[简体中文](./README.md#ovcr-lang) · [繁體中文](./rules/README/README-Zh-TW.md#ovcr-lang) · [English](./rules/README/README-En.md#ovcr-lang) · [Русский](./rules/README/README-Ru.md#ovcr-lang) · [日本語](./rules/README/README-Ja.md#ovcr-lang)

# OpenVibeCodingRules

遵循 OpenVibeCodingRules 规范消除 AI 编码痕迹，自定义专属设计风格，适配个人 / 团队 / 国企海外项目，支持网页、后台系统与 VibeCoding 爱好者开发（**puffseed**）。

---

## 这是什么

OpenVibeCodingRules 是一套面向 **AI 辅助多语言开发（VibeCoding）** 的规范仓库，包含：

- **行为准则**：控制 AI 如何思考、如何改代码（`rules/CodeConduct/CodeConduct-Zh-CN.md`）
- **质量基线**：全语言代码规范 / 质量 / 可维护性（`rules/QualityBaseline/QualityBaseline-Zh-CN.md`）
- **按语言划分的工程规范**（`rules/CodingSpec/<语言>/`）
- **前端设计规范与 Token**：`DESIGN.md` · **WebVariable**（原 VariableFile）· PreView

**支持语言与框架**（全球热门语言 + 主流业务栈）：

| 语言 | 框架 / 场景 |
|------|------------|
| JavaScript & TypeScript | Vue、React、Next.js、UniApp |
| Node.js | NestJS、Express |
| Python | FastAPI、Django |
| Java | Spring Boot |
| Go | Gin |
| PHP | Laravel |
| C | 系统 / 嵌入式 / C ABI |
| C++ | 现代 C++ · CMake / Qt |
| C# | ASP.NET Core · .NET |
| Rust | Axum / Actix · Tokio |
| SQL | PostgreSQL / MySQL / SQL Server |
| R | tidyverse / Shiny |
| Kotlin | Ktor / Spring / Android |
| Swift | SwiftUI / Vapor |
| Dart | Flutter |
| Ruby | Rails |
| Scala | Play / http4s / ZIO |
| Shell | Bash / POSIX |

---

## 使用说明

1. **新手可先打开本仓库根目录的 [`README.html`](./README.html)**（浏览器直接打开），快速浏览项目概览、多语言规范入口与质量基线。
2. **详细文字说明见本文件**（`README.md`）。
3. **业务项目**：将本仓库中的 `AGENTS.md` 与 `rules/` 复制到业务项目根目录，保持相对路径不变（`language/` · `script/` 仅本仓库 README.html / 构建使用，业务仓可不复制）。示例：

```
demo/
├── AGENTS.md
├── rules/
│   ├── AGENTS/          # AGENTS.en.md · …（译文）
│   ├── README/          # README-{Tag}.md
│   ├── CodeConduct/             # CodeConduct-{Tag}.md
│   ├── QualityBaseline/         # QualityBaseline-{Tag}.md
│   └── CodingSpec/
│       └── JavaScript&TypeScript/
│           ├── CodingSpec-{Tag}.md
│           ├── DESIGN/                 # DESIGN-{Tag}.md
│           ├── WebVariable/ · PreView/
│           └── …
├── src/
└── ...
```

向 AI 发起任务时建议说明：

> 请根据 AGENTS.md 进行编码开发。

---

## 目录结构

```
OpenVibeCodingRules/
├── AGENTS.md                          # 智能体入口 · 语种路由
├── README.md · README.html            # 说明入口 · 语种切换
├── language/                          # README.html 界面 i18n
├── script/                            # sync / build-md-bundle
├── rules/
│   ├── AGENTS/                        # AGENTS.en.md · zh-TW · ja · ru
│   ├── README/                        # README-{Tag}.md 译文
│   ├── CodeConduct/                   # CodeConduct-{Tag}.md
│   ├── QualityBaseline/               # QualityBaseline-{Tag}.md
│   └── CodingSpec/
│       └── <Lang>/
│           ├── CodingSpec-{Tag}.md
│           └── (JS/TS: DESIGN/ · WebVariable · PreView)
└── LICENSE
```

---

## 快速开始

### 1. 引入到你的项目

将 `AGENTS.md` 与 `rules/` 复制到业务项目根目录，或使用 Git Submodule 后按实际路径调整引用。

### 2. 前端项目引入样式 Token（WebVariable）

全局样式**不要复制** WebVariable 源码，只在入口引入：

```html
<link rel="stylesheet" href="./rules/CodingSpec/JavaScript&TypeScript/WebVariable/ThemeVariable.css" />
<link rel="stylesheet" href="./rules/CodingSpec/JavaScript&TypeScript/WebVariable/SystemVariable.css" />
<link rel="stylesheet" href="./rules/CodingSpec/JavaScript&TypeScript/WebVariable/ProjectReset.css" />
```

```typescript
import './rules/CodingSpec/JavaScript&TypeScript/WebVariable/ThemeVariable.css'
import './rules/CodingSpec/JavaScript&TypeScript/WebVariable/SystemVariable.css'
import './rules/CodingSpec/JavaScript&TypeScript/WebVariable/ProjectReset.css'
```

引入顺序固定：**ThemeVariable → SystemVariable → ProjectReset → 应用级 CSS**。

### 3. 在 Cursor / AI IDE 中启用

1. 确保根目录存在 `AGENTS.md`
2. `rules/CodeConduct/CodeConduct-Zh-CN.md` 已 `alwaysApply: true`
3. 按语言 `@` 引用对应 `CodingSpec.md`；前端 UI 再引用 `DESIGN.md` / WebVariable

> 请遵循本项目 `AGENTS.md` 与 `rules/` 规范；先识别语言与技术栈，再编码。

---

## 给开发者的使用指南

### 识别语言与项目模式

先按依赖识别语言 / 框架（见 `AGENTS.md` §1）。前端仓再判断：

| 模式 | 判断方式 | 支持技术栈 |
|------|---------|-----------|
| 普通项目 | 无 `public/plugin.json` | 原生 HTML · Vue · React · Next.js · UniApp |
| uTools 生态插件 | 存在 `public/plugin.json` | 仅 React · Vue |

### 样式编写原则（前端 · 1:1）

| 样式类型 | 写在哪里 | 禁止 |
|---------|---------|------|
| 全局 Token | `WebVariable/` | 在业务组件内重复定义 |
| 布局 / 页面 / 组件 | 对应模块内 | 跨模块堆样式、硬编码色值 |

### 修改主题与尺寸

| 需求 | 修改文件 |
|------|---------|
| 主题色、功能色、文本色 | `WebVariable/ThemeVariable.css` |
| 间距、布局、字号、阴影 | `WebVariable/SystemVariable.css` |
| 全局 reset | `WebVariable/ProjectReset.css`（慎改） |

修改后打开 `PreView/LightDesignSpec.html` 或 `DarkDesignSpec.html` 验收。

### 自定义品牌风格

在 `WebVariable/` 或 `Extensions/` **新增**扩展 CSS，入口追加引入，**不要修改**核心 WebVariable。

---

## 给 VibeCoding 爱好者的使用指南

**✅ 推荐**

- 「按 `AGENTS.md`，用 Vue 3 做用户列表页，样式引用 WebVariable Token」
- 「这是 FastAPI 项目，按 `CodingSpec/Python` 与 puffseed 业务注释约定实现接口」
- 「只改 ThemeVariable 主色，并检查 PreView」

**❌ 避免**

- 缺少语言 / 规范约束的模糊需求
- 在组件内硬编码整套颜色或复制 Token

### AI 应加载哪些规范

| 任务类型 | 让 AI 阅读 |
|---------|-----------|
| 任意起步 | `AGENTS.md` + `CodeConduct.md` |
| 任意业务代码 | + `QualityBaseline.md` + 对应语言 `CodingSpec.md` |
| 前端 UI | + `DESIGN.md` + WebVariable |

---

## 视觉预览

| 文件 | 说明 |
|------|------|
| `rules/CodingSpec/JavaScript&TypeScript/PreView/LightDesignSpec.html` | 浅色 · puffseed-ui |
| `rules/CodingSpec/JavaScript&TypeScript/PreView/DarkDesignSpec.html` | 深色 · puffseed-ui |

---

## 规范文件速查

| 文件 | 何时查阅 |
|------|---------|
| `AGENTS.md` | 任何 AI 协作任务开始前 |
| `rules/CodeConduct/CodeConduct-Zh-CN.md` | 判断范围、避免过度实现 |
| `rules/QualityBaseline/QualityBaseline-Zh-CN.md` | 风格门禁、分层、接口、质量、技术债、可维护性 |
| `rules/CodingSpec/<语言>/CodingSpec-Zh-CN.md` | 写对应语言业务代码 |
| `.../JavaScript&TypeScript/DESIGN/DESIGN-Zh-CN.md` | UI 布局、组件视觉 |
| `.../WebVariable/*.css` | 改色值、间距、reset |

**优先级**：行为 → `CodeConduct` · 质量门禁 → `QualityBaseline` · 怎么写 → 语言 `CodingSpec` · 长什么样 → `DESIGN` + WebVariable。

---

## 常见问题

**Q：可以把 WebVariable 复制到 `src/styles/` 吗？**  
A：不建议。应通过入口引用，保证 Token 单一维护源。

**Q：后端也要 WebVariable 吗？**  
A：不需要。后端只加载对应语言的 `CodingSpec.md`。

**Q：AI 没有遵守规范怎么办？**  
A：显式 `@AGENTS.md` 与对应语言 `CodingSpec.md`；任务中写明「遵循 OpenVibeCodingRules / puffseed，最小 diff」。

---

## 许可证

见 [LICENSE](./LICENSE)。
