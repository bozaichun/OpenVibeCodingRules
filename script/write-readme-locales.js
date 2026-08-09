/**
 * Write locked translations for rules/README/README-<LocaleTag>.md
 * Usage: node script/write-readme-locales.js
 */
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const lock = "<!-- ovcr-locale-lock -->\n";

const tableLang = {
  "zh-TW": {
    h: "| 語言 | 框架 / 場景 |",
    sep: "|------|------------|",
    rows: [
      "| JavaScript & TypeScript | Vue、React、Next.js、UniApp |",
      "| Node.js | NestJS、Express |",
      "| Python | FastAPI、Django |",
      "| Java | Spring Boot |",
      "| Go | Gin |",
      "| PHP | Laravel |",
      "| C | 系統 / 嵌入式 / C ABI |",
      "| C++ | 現代 C++ · CMake / Qt |",
      "| C# | ASP.NET Core · .NET |",
      "| Rust | Axum / Actix · Tokio |",
      "| SQL | PostgreSQL / MySQL / SQL Server |",
      "| R | tidyverse / Shiny |",
      "| Kotlin | Ktor / Spring / Android |",
      "| Swift | SwiftUI / Vapor |",
      "| Dart | Flutter |",
      "| Ruby | Rails |",
      "| Scala | Play / http4s / ZIO |",
      "| Shell | Bash / POSIX |",
    ],
  },
  en: {
    h: "| Language | Frameworks / scenarios |",
    sep: "|----------|------------------------|",
    rows: [
      "| JavaScript & TypeScript | Vue, React, Next.js, UniApp |",
      "| Node.js | NestJS, Express |",
      "| Python | FastAPI, Django |",
      "| Java | Spring Boot |",
      "| Go | Gin |",
      "| PHP | Laravel |",
      "| C | Systems / embedded / C ABI |",
      "| C++ | Modern C++ · CMake / Qt |",
      "| C# | ASP.NET Core · .NET |",
      "| Rust | Axum / Actix · Tokio |",
      "| SQL | PostgreSQL / MySQL / SQL Server |",
      "| R | tidyverse / Shiny |",
      "| Kotlin | Ktor / Spring / Android |",
      "| Swift | SwiftUI / Vapor |",
      "| Dart | Flutter |",
      "| Ruby | Rails |",
      "| Scala | Play / http4s / ZIO |",
      "| Shell | Bash / POSIX |",
    ],
  },
  ru: {
    h: "| Язык | Фреймворки / сценарии |",
    sep: "|------|----------------------|",
    rows: [
      "| JavaScript & TypeScript | Vue, React, Next.js, UniApp |",
      "| Node.js | NestJS, Express |",
      "| Python | FastAPI, Django |",
      "| Java | Spring Boot |",
      "| Go | Gin |",
      "| PHP | Laravel |",
      "| C | Системы / embedded / C ABI |",
      "| C++ | Современный C++ · CMake / Qt |",
      "| C# | ASP.NET Core · .NET |",
      "| Rust | Axum / Actix · Tokio |",
      "| SQL | PostgreSQL / MySQL / SQL Server |",
      "| R | tidyverse / Shiny |",
      "| Kotlin | Ktor / Spring / Android |",
      "| Swift | SwiftUI / Vapor |",
      "| Dart | Flutter |",
      "| Ruby | Rails |",
      "| Scala | Play / http4s / ZIO |",
      "| Shell | Bash / POSIX |",
    ],
  },
  ja: {
    h: "| 言語 | フレームワーク / シーン |",
    sep: "|------|------------------------|",
    rows: [
      "| JavaScript & TypeScript | Vue、React、Next.js、UniApp |",
      "| Node.js | NestJS、Express |",
      "| Python | FastAPI、Django |",
      "| Java | Spring Boot |",
      "| Go | Gin |",
      "| PHP | Laravel |",
      "| C | システム / 組み込み / C ABI |",
      "| C++ | 現代 C++ · CMake / Qt |",
      "| C# | ASP.NET Core · .NET |",
      "| Rust | Axum / Actix · Tokio |",
      "| SQL | PostgreSQL / MySQL / SQL Server |",
      "| R | tidyverse / Shiny |",
      "| Kotlin | Ktor / Spring / Android |",
      "| Swift | SwiftUI / Vapor |",
      "| Dart | Flutter |",
      "| Ruby | Rails |",
      "| Scala | Play / http4s / ZIO |",
      "| Shell | Bash / POSIX |",
    ],
  }
};

function langTable(code) {
  const t = tableLang[code];
  return [t.h, t.sep, ...t.rows].join("\n");
}

const bodies = {
  "zh-TW": `# OpenVibeCodingRules

遵循 OpenVibeCodingRules 規範消除 AI 編碼痕跡，自訂專屬設計風格，適配個人 / 團隊 / 國企海外專案，支援網頁、後台系統與 VibeCoding 愛好者開發（**puffseed**）。

---

## 這是什麼

OpenVibeCodingRules 是一套面向 **AI 輔助多語言開發（VibeCoding）** 的規範倉庫，包含：

- **行為準則**：控制 AI 如何思考、如何改程式碼（\`rules/CodingSpec/CodeConduct/CodeConduct-Zh-CN.md\`）
- **品質基線**：全語言程式碼規範 / 品質 / 可維護性（\`rules/CodingSpec/QualityBaseline/QualityBaseline-Zh-CN.md\`）
- **按語言劃分的工程規範**（\`rules/CodingSpec/<語言>/\`）
- **前端設計規範與 Token**：\`DESIGN.md\` · **WebVariable**（原 VariableFile）· PreView

**支援語言與框架**（全球熱門語言 + 主流業務棧）：

${langTable("zh-TW")}

---

## 使用說明

1. **新手可先開啟本倉庫根目錄的 [\`README.html\`](./README.html)**（瀏覽器直接開啟），快速瀏覽專案概覽、多語言規範入口與品質基線。
2. **詳細文字說明見本檔案**（\`README.md\`）。
3. **將本倉庫中的 \`rules/\` 資料夾與 \`AGENTS.md\` 複製到你的業務專案根目錄**，保持相對路徑不變。範例：

\`\`\`
demo/
├── AGENTS.md                 # 入口（语种路由见文内）
├── language/                 # README.html 界面 i18n（本仓库）
├── script/                   # 构建 / 同步脚本（本仓库）
├── rules/
│   ├── AGENTS.en.md · AGENTS.zh-TW.md · AGENTS.ru.md · AGENTS.ja.md
│   ├── README-Zh-CN.md · README-En.md · …
│   └── CodingSpec/
│       ├── CodeConduct-Zh-CN.md · QualityBaseline-Zh-CN.md
│       └── JavaScript&TypeScript/
│           ├── CodingSpec-Zh-CN.md · CodingSpec-En.md · …
│           ├── DESIGN.md · WebVariable/ · PreView/
│           └── …
├── src/
└── ...
\`\`\`

向 AI 發起任務時建議說明：

> 請根據 AGENTS.md 進行編碼開發。

---

## 目錄結構

\`\`\`
OpenVibeCodingRules/
├── AGENTS.md                          # 智能体入口 · 语种路由
├── README.md · README.html
├── language/                          # README.html 界面 i18n
│   └── languages.js · messages*.js · i18n.js
├── script/                            # sync / build-md-bundle 等
├── rules/
│   ├── AGENTS.en.md · AGENTS.zh-TW.md · AGENTS.ru.md · AGENTS.ja.md
│   ├── README-Zh-CN.md · README-En.md · …
│   └── CodingSpec/
│       ├── CodeConduct-Zh-CN.md · …-En.md · …
│       ├── QualityBaseline-Zh-CN.md · …-En.md · …
│       └── <Lang>/
│           ├── CodingSpec-Zh-CN.md · CodingSpec-En.md · …
│           └── (JS/TS: DESIGN · WebVariable · PreView)
└── LICENSE
\`\`\`

---

## 快速開始

### 1. 引入到你的專案

將 \`AGENTS.md\` 與 \`rules/\` 複製到業務專案根目錄，或使用 Git Submodule 後按實際路徑調整引用。

### 2. 前端專案引入樣式 Token（WebVariable）

全域樣式**不要複製** WebVariable 原始碼，只在入口引入：

\`\`\`html
<link rel="stylesheet" href="./rules/CodingSpec/JavaScript&TypeScript/WebVariable/ThemeVariable.css" />
<link rel="stylesheet" href="./rules/CodingSpec/JavaScript&TypeScript/WebVariable/SystemVariable.css" />
<link rel="stylesheet" href="./rules/CodingSpec/JavaScript&TypeScript/WebVariable/ProjectReset.css" />
\`\`\`

\`\`\`typescript
import './rules/CodingSpec/JavaScript&TypeScript/WebVariable/ThemeVariable.css'
import './rules/CodingSpec/JavaScript&TypeScript/WebVariable/SystemVariable.css'
import './rules/CodingSpec/JavaScript&TypeScript/WebVariable/ProjectReset.css'
\`\`\`

引入順序固定：**ThemeVariable → SystemVariable → ProjectReset → 應用級 CSS**。

### 3. 在 Cursor / AI IDE 中啟用

1. 確保根目錄存在 \`AGENTS.md\`
2. \`rules/CodingSpec/CodeConduct/CodeConduct-Zh-CN.md\` 已 \`alwaysApply: true\`
3. 按語言 \`@\` 引用對應 \`CodingSpec.md\`；前端 UI 再引用 \`DESIGN.md\` / WebVariable

> 請遵循本專案 \`AGENTS.md\` 與 \`rules/\` 規範；先識別語言與技術棧，再編碼。

---

## 給開發者的使用指南

### 識別語言與專案模式

先按依賴識別語言 / 框架（見 \`AGENTS.md\` §1）。前端倉再判斷：

| 模式 | 判斷方式 | 支援技術棧 |
|------|---------|-----------|
| 普通專案 | 無 \`public/plugin.json\` | 原生 HTML · Vue · React · Next.js · UniApp |
| uTools 生態外掛 | 存在 \`public/plugin.json\` | 僅 React · Vue |

### 樣式編寫原則（前端 · 1:1）

| 樣式類型 | 寫在哪裡 | 禁止 |
|---------|---------|------|
| 全域 Token | \`WebVariable/\` | 在業務元件內重複定義 |
| 佈局 / 頁面 / 元件 | 對應模組內 | 跨模組堆樣式、硬編碼色值 |

### 修改主題與尺寸

| 需求 | 修改檔案 |
|------|---------|
| 主題色、功能色、文字色 | \`WebVariable/ThemeVariable.css\` |
| 間距、字號、陰影 | \`WebVariable/SystemVariable.css\` |
| 全域 reset | \`WebVariable/ProjectReset.css\`（慎改） |

修改後開啟 \`PreView/LightDesignSpec.html\` 或 \`DarkDesignSpec.html\` 驗收。

### 自訂品牌風格

在 \`WebVariable/\` 或 \`Extensions/\` **新增**擴充 CSS，入口追加引入，**不要修改**核心 WebVariable。

---

## 給 VibeCoding 愛好者的使用指南

**✅ 推薦**

- 「按 \`AGENTS.md\`，用 Vue 3 做使用者列表頁，樣式引用 WebVariable Token」
- 「這是 FastAPI 專案，按 \`CodingSpec/Python\` 與 puffseed 業務註解約定實作介面」
- 「只改 ThemeVariable 主色，並檢查 PreView」

**❌ 避免**

- 缺少語言 / 規範約束的模糊需求
- 在元件內硬編碼整套顏色或複製 Token

### AI 應載入哪些規範

| 任務類型 | 讓 AI 閱讀 |
|---------|-----------|
| 任意起步 | \`AGENTS.md\` + \`CodeConduct.md\` |
| 任意業務程式碼 | + \`QualityBaseline.md\` + 對應語言 \`CodingSpec.md\` |
| 前端 UI | + \`DESIGN.md\` + WebVariable |

---

## 視覺預覽

| 檔案 | 說明 |
|------|------|
| \`rules/CodingSpec/JavaScript&TypeScript/PreView/LightDesignSpec.html\` | 淺色 · puffseed-ui |
| \`rules/CodingSpec/JavaScript&TypeScript/PreView/DarkDesignSpec.html\` | 深色 · puffseed-ui |

---

## 規範檔案速查

| 檔案 | 何時查閱 |
|------|---------|
| \`AGENTS.md\` | 任何 AI 協作任務開始前 |
| \`rules/CodingSpec/CodeConduct/CodeConduct-Zh-CN.md\` | 判斷範圍、避免過度實作 |
| \`rules/CodingSpec/QualityBaseline/QualityBaseline-Zh-CN.md\` | 風格門禁、分層、介面、品質、技術債、可維護性 |
| \`rules/CodingSpec/<語言>/CodingSpec-Zh-CN.md\` | 寫對應語言業務程式碼 |
| \`.../JavaScript&TypeScript/DESIGN.md\` | UI 佈局、元件視覺 |
| \`.../WebVariable/*.css\` | 改色值、間距、reset |

**優先級**：行為 → \`CodeConduct\` · 品質門禁 → \`QualityBaseline\` · 怎麼寫 → 語言 \`CodingSpec\` · 長什麼樣 → \`DESIGN\` + WebVariable。

---

## 常見問題

**Q：可以把 WebVariable 複製到 \`src/styles/\` 嗎？**  
A：不建議。應透過入口引用，保證 Token 單一維護源。

**Q：後端也要 WebVariable 嗎？**  
A：不需要。後端只載入對應語言的 \`CodingSpec.md\`。

**Q：AI 沒有遵守規範怎麼辦？**  
A：顯式 \`@AGENTS.md\` 與對應語言 \`CodingSpec.md\`；任務中寫明「遵循 OpenVibeCodingRules / puffseed，最小 diff」。

---

## 授權

見 [LICENSE](./LICENSE)。
`,

  en: `# OpenVibeCodingRules

Follow OpenVibeCodingRules to reduce AI coding artifacts, customize your design system, and fit personal / team / overseas enterprise projects—for web, admin systems, and VibeCoding builders (**puffseed**).

---

## What this is

OpenVibeCodingRules is a standards repo for **AI-assisted multilingual development (VibeCoding)**. It includes:

- **Code of conduct**: how the AI should think and change code (\`rules/CodingSpec/CodeConduct/CodeConduct-Zh-CN.md\`)
- **Quality baseline**: cross-language standards / quality / maintainability (\`rules/CodingSpec/QualityBaseline/QualityBaseline-Zh-CN.md\`)
- **Per-language engineering specs** (\`rules/CodingSpec/<lang>/\`)
- **Frontend design & tokens**: \`DESIGN.md\` · **WebVariable** (formerly VariableFile) · PreView

**Supported languages & frameworks** (popular languages + mainstream stacks):

${langTable("en")}

---

## How to use

1. **Newcomers can open [\`README.html\`](./README.html) at the repo root** in a browser for overview, language entries, and the quality baseline.
2. **This file (\`README.md\`) is the detailed text guide.**
3. **Copy \`rules/\` and \`AGENTS.md\` into your product repo root**, keeping relative paths. Example:

\`\`\`
demo/
├── AGENTS.md                 # 入口（语种路由见文内）
├── language/                 # README.html 界面 i18n（本仓库）
├── script/                   # 构建 / 同步脚本（本仓库）
├── rules/
│   ├── AGENTS.en.md · AGENTS.zh-TW.md · AGENTS.ru.md · AGENTS.ja.md
│   ├── README-Zh-CN.md · README-En.md · …
│   └── CodingSpec/
│       ├── CodeConduct-Zh-CN.md · QualityBaseline-Zh-CN.md
│       └── JavaScript&TypeScript/
│           ├── CodingSpec-Zh-CN.md · CodingSpec-En.md · …
│           ├── DESIGN.md · WebVariable/ · PreView/
│           └── …
├── src/
└── ...
\`\`\`

When prompting the AI, prefer:

> Please develop according to AGENTS.md.

---

## Directory layout

\`\`\`
OpenVibeCodingRules/
├── AGENTS.md                          # 智能体入口 · 语种路由
├── README.md · README.html
├── language/                          # README.html 界面 i18n
│   └── languages.js · messages*.js · i18n.js
├── script/                            # sync / build-md-bundle 等
├── rules/
│   ├── AGENTS.en.md · AGENTS.zh-TW.md · AGENTS.ru.md · AGENTS.ja.md
│   ├── README-Zh-CN.md · README-En.md · …
│   └── CodingSpec/
│       ├── CodeConduct-Zh-CN.md · …-En.md · …
│       ├── QualityBaseline-Zh-CN.md · …-En.md · …
│       └── <Lang>/
│           ├── CodingSpec-Zh-CN.md · CodingSpec-En.md · …
│           └── (JS/TS: DESIGN · WebVariable · PreView)
└── LICENSE
\`\`\`

---

## Quick start

### 1. Bring into your project

Copy \`AGENTS.md\` and \`rules/\` to the product root, or use a Git submodule and adjust paths.

### 2. Frontend style tokens (WebVariable)

**Do not copy** WebVariable sources for global styles—import at the entry only:

\`\`\`html
<link rel="stylesheet" href="./rules/CodingSpec/JavaScript&TypeScript/WebVariable/ThemeVariable.css" />
<link rel="stylesheet" href="./rules/CodingSpec/JavaScript&TypeScript/WebVariable/SystemVariable.css" />
<link rel="stylesheet" href="./rules/CodingSpec/JavaScript&TypeScript/WebVariable/ProjectReset.css" />
\`\`\`

\`\`\`typescript
import './rules/CodingSpec/JavaScript&TypeScript/WebVariable/ThemeVariable.css'
import './rules/CodingSpec/JavaScript&TypeScript/WebVariable/SystemVariable.css'
import './rules/CodingSpec/JavaScript&TypeScript/WebVariable/ProjectReset.css'
\`\`\`

Order is fixed: **ThemeVariable → SystemVariable → ProjectReset → app-level CSS**.

### 3. Enable in Cursor / AI IDE

1. Keep \`AGENTS.md\` at the root
2. \`rules/CodingSpec/CodeConduct/CodeConduct-Zh-CN.md\` has \`alwaysApply: true\`
3. \`@\` the language \`CodingSpec.md\`; for UI also \`DESIGN.md\` / WebVariable

> Follow this project's \`AGENTS.md\` and \`rules/\`; identify language and stack first, then code.

---

## Guide for developers

### Detect language and project mode

Identify language / framework from deps (see \`AGENTS.md\` §1). For frontend repos also check:

| Mode | How to tell | Stacks |
|------|-------------|--------|
| Normal project | No \`public/plugin.json\` | Native HTML · Vue · React · Next.js · UniApp |
| uTools plugin | Has \`public/plugin.json\` | React · Vue only |

### Styling principles (frontend · 1:1)

| Style type | Where | Don't |
|------------|-------|-------|
| Global tokens | \`WebVariable/\` | Redefine inside product components |
| Layout / page / component | Owning module | Dump styles across modules or hard-code colors |

### Theme and sizing

| Need | Edit |
|------|------|
| Theme / semantic / text colors | \`WebVariable/ThemeVariable.css\` |
| Spacing, type, shadows | \`WebVariable/SystemVariable.css\` |
| Global reset | \`WebVariable/ProjectReset.css\` (change carefully) |

Then verify in \`PreView/LightDesignSpec.html\` or \`DarkDesignSpec.html\`.

### Custom brand look

**Add** extension CSS under \`WebVariable/\` or \`Extensions/\`, import at entry—**do not edit** core WebVariable.

---

## Guide for VibeCoding users

**✅ Prefer**

- “Per \`AGENTS.md\`, build a Vue 3 user list page using WebVariable tokens”
- “This is FastAPI; implement APIs per \`CodingSpec/Python\` and puffseed comment conventions”
- “Only change ThemeVariable primary color and check PreView”

**❌ Avoid**

- Vague asks without language / spec constraints
- Hard-coding full palettes or copying tokens into components

### Which specs the AI should load

| Task | Have the AI read |
|------|------------------|
| Any kickoff | \`AGENTS.md\` + \`CodeConduct.md\` |
| Any product code | + \`QualityBaseline.md\` + matching \`CodingSpec.md\` |
| Frontend UI | + \`DESIGN.md\` + WebVariable |

---

## Visual preview

| File | Notes |
|------|-------|
| \`rules/CodingSpec/JavaScript&TypeScript/PreView/LightDesignSpec.html\` | Light · puffseed-ui |
| \`rules/CodingSpec/JavaScript&TypeScript/PreView/DarkDesignSpec.html\` | Dark · puffseed-ui |

---

## Spec map

| File | When |
|------|------|
| \`AGENTS.md\` | Before any AI collaboration |
| \`rules/CodingSpec/CodeConduct/CodeConduct-Zh-CN.md\` | Scope decisions; avoid over-building |
| \`rules/CodingSpec/QualityBaseline/QualityBaseline-Zh-CN.md\` | Style gates, layers, APIs, quality, tech debt, maintainability |
| \`rules/CodingSpec/<lang>/CodingSpec-Zh-CN.md\` | Writing product code in that language |
| \`.../JavaScript&TypeScript/DESIGN.md\` | UI layout and component visuals |
| \`.../WebVariable/*.css\` | Colors, spacing, reset |

**Priority**: behavior → \`CodeConduct\` · quality → \`QualityBaseline\` · how to write → language \`CodingSpec\` · how it looks → \`DESIGN\` + WebVariable.

---

## FAQ

**Q: Can I copy WebVariable into \`src/styles/\`?**  
A: Prefer not. Import at the entry so Token stays single-sourced.

**Q: Does the backend need WebVariable?**  
A: No. Load the matching language \`CodingSpec.md\` only.

**Q: What if the AI ignores the rules?**  
A: Explicitly \`@AGENTS.md\` and the language \`CodingSpec.md\`; say “follow OpenVibeCodingRules / puffseed, minimal diff”.

---

## License

See [LICENSE](./LICENSE).
`,

  ru: `# OpenVibeCodingRules

Следуйте OpenVibeCodingRules, чтобы убрать следы AI-кода, настроить свой дизайн и адаптировать личные / командные / зарубежные корпоративные проекты — веб, админки и VibeCoding (**puffseed**).

---

## Что это

OpenVibeCodingRules — репозиторий правил для **AI-assisted многоязычной разработки (VibeCoding)**. Включает:

- **Кодекс поведения**: как AI думает и меняет код (\`rules/CodingSpec/CodeConduct/CodeConduct-Zh-CN.md\`)
- **База качества**: кросс-языковые стандарты / качество / сопровождаемость (\`rules/CodingSpec/QualityBaseline/QualityBaseline-Zh-CN.md\`)
- **Инженерные правила по языкам** (\`rules/CodingSpec/<язык>/\`)
- **Фронтенд-дизайн и Token**: \`DESIGN.md\` · **WebVariable** (ранее VariableFile) · PreView

**Поддерживаемые языки и фреймворки** (популярные языки + бизнес-стек):

${langTable("ru")}

---

## Как пользоваться

1. **Новичкам удобно открыть [\`README.html\`](./README.html)** в корне репозитория в браузере — обзор, языки и база качества.
2. **Подробный текст — в этом файле** (\`README.md\`).
3. **Скопируйте \`rules/\` и \`AGENTS.md\` в корень продуктового репо**, сохранив относительные пути. Пример:

\`\`\`
demo/
├── AGENTS.md                 # 入口（语种路由见文内）
├── language/                 # README.html 界面 i18n（本仓库）
├── script/                   # 构建 / 同步脚本（本仓库）
├── rules/
│   ├── AGENTS.en.md · AGENTS.zh-TW.md · AGENTS.ru.md · AGENTS.ja.md
│   ├── README-Zh-CN.md · README-En.md · …
│   └── CodingSpec/
│       ├── CodeConduct-Zh-CN.md · QualityBaseline-Zh-CN.md
│       └── JavaScript&TypeScript/
│           ├── CodingSpec-Zh-CN.md · CodingSpec-En.md · …
│           ├── DESIGN.md · WebVariable/ · PreView/
│           └── …
├── src/
└── ...
\`\`\`

В задаче для AI лучше указать:

> Разрабатывайте согласно AGENTS.md.

---

## Структура каталогов

\`\`\`
OpenVibeCodingRules/
├── AGENTS.md                          # 智能体入口 · 语种路由
├── README.md · README.html
├── language/                          # README.html 界面 i18n
│   └── languages.js · messages*.js · i18n.js
├── script/                            # sync / build-md-bundle 等
├── rules/
│   ├── AGENTS.en.md · AGENTS.zh-TW.md · AGENTS.ru.md · AGENTS.ja.md
│   ├── README-Zh-CN.md · README-En.md · …
│   └── CodingSpec/
│       ├── CodeConduct-Zh-CN.md · …-En.md · …
│       ├── QualityBaseline-Zh-CN.md · …-En.md · …
│       └── <Lang>/
│           ├── CodingSpec-Zh-CN.md · CodingSpec-En.md · …
│           └── (JS/TS: DESIGN · WebVariable · PreView)
└── LICENSE
\`\`\`

---

## Быстрый старт

### 1. Подключение к проекту

Скопируйте \`AGENTS.md\` и \`rules/\` в корень продукта или используйте Git Submodule и поправьте пути.

### 2. Frontend Token (WebVariable)

Глобальные стили **не копируйте** — только подключайте во входе:

\`\`\`html
<link rel="stylesheet" href="./rules/CodingSpec/JavaScript&TypeScript/WebVariable/ThemeVariable.css" />
<link rel="stylesheet" href="./rules/CodingSpec/JavaScript&TypeScript/WebVariable/SystemVariable.css" />
<link rel="stylesheet" href="./rules/CodingSpec/JavaScript&TypeScript/WebVariable/ProjectReset.css" />
\`\`\`

\`\`\`typescript
import './rules/CodingSpec/JavaScript&TypeScript/WebVariable/ThemeVariable.css'
import './rules/CodingSpec/JavaScript&TypeScript/WebVariable/SystemVariable.css'
import './rules/CodingSpec/JavaScript&TypeScript/WebVariable/ProjectReset.css'
\`\`\`

Порядок фиксирован: **ThemeVariable → SystemVariable → ProjectReset → CSS приложения**.

### 3. Включение в Cursor / AI IDE

1. В корне есть \`AGENTS.md\`
2. У \`rules/CodingSpec/CodeConduct/CodeConduct-Zh-CN.md\` — \`alwaysApply: true\`
3. \`@\` на \`CodingSpec.md\` языка; для UI — \`DESIGN.md\` / WebVariable

> Следуйте \`AGENTS.md\` и \`rules/\` этого проекта; сначала язык и стек, затем код.

---

## Руководство для разработчиков

### Язык и режим проекта

Определите язык / фреймворк по зависимостям (см. \`AGENTS.md\` §1). Для frontend также:

| Режим | Как понять | Стек |
|------|------------|------|
| Обычный проект | Нет \`public/plugin.json\` | Native HTML · Vue · React · Next.js · UniApp |
| Плагин uTools | Есть \`public/plugin.json\` | Только React · Vue |

### Принципы стилей (frontend · 1:1)

| Тип | Где | Запрещено |
|-----|-----|-----------|
| Глобальные Token | \`WebVariable/\` | Дублировать в бизнес-компонентах |
| Вёрстка / страница / компонент | В своём модуле | Сваливать стили между модулями, хардкод цветов |

### Тема и размеры

| Нужно | Файл |
|------|------|
| Цвета темы / семантика / текст | \`WebVariable/ThemeVariable.css\` |
| Отступы, кегль, тени | \`WebVariable/SystemVariable.css\` |
| Global reset | \`WebVariable/ProjectReset.css\` (осторожно) |

После правок откройте \`PreView/LightDesignSpec.html\` или \`DarkDesignSpec.html\`.

### Свой бренд

**Добавляйте** extension CSS в \`WebVariable/\` или \`Extensions/\`, подключайте во входе — **не меняйте** ядро WebVariable.

---

## Для любителей VibeCoding

**✅ Рекомендуется**

- «По \`AGENTS.md\` сделай список пользователей на Vue 3 со стилями WebVariable»
- «Это FastAPI; реализуй API по \`CodingSpec/Python\` и комментариям puffseed»
- «Только смени primary в ThemeVariable и проверь PreView»

**❌ Избегать**

- Размытых задач без языка / правил
- Хардкода палитры или копирования Token в компоненты

### Какие спецификации загружать AI

| Тип задачи | Пусть AI читает |
|-----------|-----------------|
| Любой старт | \`AGENTS.md\` + \`CodeConduct.md\` |
| Любой продуктовый код | + \`QualityBaseline.md\` + нужный \`CodingSpec.md\` |
| Frontend UI | + \`DESIGN.md\` + WebVariable |

---

## Визуальный превью

| Файл | Описание |
|------|----------|
| \`rules/CodingSpec/JavaScript&TypeScript/PreView/LightDesignSpec.html\` | Светлая · puffseed-ui |
| \`rules/CodingSpec/JavaScript&TypeScript/PreView/DarkDesignSpec.html\` | Тёмная · puffseed-ui |

---

## Карта спецификаций

| Файл | Когда смотреть |
|------|----------------|
| \`AGENTS.md\` | Перед любой AI-задачей |
| \`rules/CodingSpec/CodeConduct/CodeConduct-Zh-CN.md\` | Границы объёма, без оверинжиниринга |
| \`rules/CodingSpec/QualityBaseline/QualityBaseline-Zh-CN.md\` | Стиль, слои, API, качество, техдолг, сопровождаемость |
| \`rules/CodingSpec/<язык>/CodingSpec-Zh-CN.md\` | Код на соответствующем языке |
| \`.../JavaScript&TypeScript/DESIGN.md\` | UI-вёрстка и визуал компонентов |
| \`.../WebVariable/*.css\` | Цвета, отступы, reset |

**Приоритет**: поведение → \`CodeConduct\` · качество → \`QualityBaseline\` · как писать → языковой \`CodingSpec\` · как выглядит → \`DESIGN\` + WebVariable.

---

## FAQ

**Q: Можно скопировать WebVariable в \`src/styles/\`?**  
A: Не рекомендуется. Подключайте во входе — один источник Token.

**Q: Нужен ли WebVariable бэкенду?**  
A: Нет. Достаточно языкового \`CodingSpec.md\`.

**Q: AI не следует правилам — что делать?**  
A: Явно \`@AGENTS.md\` и языковой \`CodingSpec.md\`; напишите «следовать OpenVibeCodingRules / puffseed, минимальный diff».

---

## Лицензия

См. [LICENSE](./LICENSE).
`,
};

bodies.ja = `# OpenVibeCodingRules

OpenVibeCodingRules に従い AI コーディングの痕跡を抑え、独自のデザインを整え、個人 / チーム / 海外向け企業プロジェクトに適合させます。Web・管理画面・VibeCoding 愛好者向け（**puffseed**）。

---

## これは何か

OpenVibeCodingRules は **AI 補助の多言語開発（VibeCoding）** 向け規範リポジトリです。含むもの：

- **行動規範**：AI の思考とコード変更の仕方（\`rules/CodingSpec/CodeConduct/CodeConduct-Zh-CN.md\`）
- **品質ベースライン**：全言語の規範 / 品質 / 保守性（\`rules/CodingSpec/QualityBaseline/QualityBaseline-Zh-CN.md\`）
- **言語別のエンジニアリング規範**（\`rules/CodingSpec/<言語>/\`）
- **フロント設計と Token**：\`DESIGN.md\` · **WebVariable**（旧 VariableFile）· PreView

**対応言語とフレームワーク**（人気言語 + 主流業務スタック）：

${langTable("ja")}

---

## 使い方

1. **まずはルートの [\`README.html\`](./README.html)** をブラウザで開き、概要・言語入口・品質ベースラインを確認。
2. **詳細は本ファイル**（\`README.md\`）。
3. **\`rules/\` と \`AGENTS.md\` を業務リポジトリのルートへコピー**し、相対パスを維持。例：

\`\`\`
demo/
├── AGENTS.md                 # 入口（语种路由见文内）
├── language/                 # README.html 界面 i18n（本仓库）
├── script/                   # 构建 / 同步脚本（本仓库）
├── rules/
│   ├── AGENTS.en.md · AGENTS.zh-TW.md · AGENTS.ru.md · AGENTS.ja.md
│   ├── README-Zh-CN.md · README-En.md · …
│   └── CodingSpec/
│       ├── CodeConduct-Zh-CN.md · QualityBaseline-Zh-CN.md
│       └── JavaScript&TypeScript/
│           ├── CodingSpec-Zh-CN.md · CodingSpec-En.md · …
│           ├── DESIGN.md · WebVariable/ · PreView/
│           └── …
├── src/
└── ...
\`\`\`

AI への依頼例：

> AGENTS.md に従ってコーディングしてください。

---

## ディレクトリ構成

\`\`\`
OpenVibeCodingRules/
├── AGENTS.md                          # 智能体入口 · 语种路由
├── README.md · README.html
├── language/                          # README.html 界面 i18n
│   └── languages.js · messages*.js · i18n.js
├── script/                            # sync / build-md-bundle 等
├── rules/
│   ├── AGENTS.en.md · AGENTS.zh-TW.md · AGENTS.ru.md · AGENTS.ja.md
│   ├── README-Zh-CN.md · README-En.md · …
│   └── CodingSpec/
│       ├── CodeConduct-Zh-CN.md · …-En.md · …
│       ├── QualityBaseline-Zh-CN.md · …-En.md · …
│       └── <Lang>/
│           ├── CodingSpec-Zh-CN.md · CodingSpec-En.md · …
│           └── (JS/TS: DESIGN · WebVariable · PreView)
└── LICENSE
\`\`\`

---

## クイックスタート

### 1. プロジェクトへ導入

\`AGENTS.md\` と \`rules/\` を業務ルートへコピーするか、Git Submodule 後にパスを調整。

### 2. フロントでスタイル Token（WebVariable）

グローバルスタイルは WebVariable 源を**複製せず**、エントリでだけ導入：

\`\`\`html
<link rel="stylesheet" href="./rules/CodingSpec/JavaScript&TypeScript/WebVariable/ThemeVariable.css" />
<link rel="stylesheet" href="./rules/CodingSpec/JavaScript&TypeScript/WebVariable/SystemVariable.css" />
<link rel="stylesheet" href="./rules/CodingSpec/JavaScript&TypeScript/WebVariable/ProjectReset.css" />
\`\`\`

\`\`\`typescript
import './rules/CodingSpec/JavaScript&TypeScript/WebVariable/ThemeVariable.css'
import './rules/CodingSpec/JavaScript&TypeScript/WebVariable/SystemVariable.css'
import './rules/CodingSpec/JavaScript&TypeScript/WebVariable/ProjectReset.css'
\`\`\`

順序固定：**ThemeVariable → SystemVariable → ProjectReset → アプリ級 CSS**。

### 3. Cursor / AI IDE で有効化

1. ルートに \`AGENTS.md\`
2. \`rules/CodingSpec/CodeConduct/CodeConduct-Zh-CN.md\` は \`alwaysApply: true\`
3. 言語の \`CodingSpec.md\` を \`@\`；UI は \`DESIGN.md\` / WebVariable も

> 本プロジェクトの \`AGENTS.md\` と \`rules/\` に従い、先に言語と技術スタックを識別してから実装。

---

## 開発者向けガイド

### 言語とプロジェクト形態

依存から言語 / フレームワークを識別（\`AGENTS.md\` §1）。フロントはさらに：

| 形態 | 判定 | 対応スタック |
|------|------|-------------|
| 通常プロジェクト | \`public/plugin.json\` なし | ネイティブ HTML · Vue · React · Next.js · UniApp |
| uTools プラグイン | \`public/plugin.json\` あり | React · Vue のみ |

### スタイル原則（フロント · 1:1）

| 種類 | 場所 | 禁止 |
|------|------|------|
| グローバル Token | \`WebVariable/\` | 業務コンポーネント内での再定義 |
| レイアウト / ページ / コンポーネント | 所属モジュール内 | モジュール横断のスタイル溜め、色のハードコード |

### テーマと寸法

| 用途 | 編集ファイル |
|------|-------------|
| テーマ色・機能色・テキスト色 | \`WebVariable/ThemeVariable.css\` |
| 余白・字号・影 | \`WebVariable/SystemVariable.css\` |
| グローバル reset | \`WebVariable/ProjectReset.css\`（慎重に） |

変更後は \`PreView/LightDesignSpec.html\` または \`DarkDesignSpec.html\` で確認。

### ブランドカスタム

\`WebVariable/\` または \`Extensions/\` に拡張 CSS を**追加**しエントリで読み込む。コア WebVariable は**変更しない**。

---

## VibeCoding 愛好者向け

**✅ 推奨**

- 「\`AGENTS.md\` に沿い Vue 3 でユーザー一覧、スタイルは WebVariable Token」
- 「FastAPI。\`CodingSpec/Python\` と puffseed コメント規約で API 実装」
- 「ThemeVariable の主色だけ変え PreView を確認」

**❌ 避ける**

- 言語 / 規範のない曖昧な依頼
- コンポーネント内でのフルパレット硬コーディングや Token 複製

### AI が読むべき規範

| タスク | AI に読ませる |
|--------|--------------|
| 任意の開始 | \`AGENTS.md\` + \`CodeConduct.md\` |
| 任意の業務コード | + \`QualityBaseline.md\` + 対応言語 \`CodingSpec.md\` |
| フロント UI | + \`DESIGN.md\` + WebVariable |

---

## ビジュアルプレビュー

| ファイル | 説明 |
|---------|------|
| \`rules/CodingSpec/JavaScript&TypeScript/PreView/LightDesignSpec.html\` | ライト · puffseed-ui |
| \`rules/CodingSpec/JavaScript&TypeScript/PreView/DarkDesignSpec.html\` | ダーク · puffseed-ui |

---

## 規範ファイル早見

| ファイル | いつ見るか |
|---------|-----------|
| \`AGENTS.md\` | あらゆる AI 協働の開始前 |
| \`rules/CodingSpec/CodeConduct/CodeConduct-Zh-CN.md\` | 範囲判断、過剰実装の回避 |
| \`rules/CodingSpec/QualityBaseline/QualityBaseline-Zh-CN.md\` | スタイル門禁、層、API、品質、技術的負債、保守性 |
| \`rules/CodingSpec/<言語>/CodingSpec-Zh-CN.md\` | その言語の業務コード |
| \`.../JavaScript&TypeScript/DESIGN.md\` | UI レイアウト・コンポーネント視覚 |
| \`.../WebVariable/*.css\` | 色・余白・reset |

**優先度**：行動 → \`CodeConduct\` · 品質 → \`QualityBaseline\` · 書き方 → 言語 \`CodingSpec\` · 見た目 → \`DESIGN\` + WebVariable。

---

## よくある質問

**Q：WebVariable を \`src/styles/\` にコピーしてよい？**  
A：非推奨。エントリ参照で Token の単一源を保つ。

**Q：バックエンドにも WebVariable は必要？**  
A：不要。対応言語の \`CodingSpec.md\` だけでよい。

**Q：AI が規範に従わないときは？**  
A：明示的に \`@AGENTS.md\` と言語 \`CodingSpec.md\`。「OpenVibeCodingRules / puffseed 準拠、最小 diff」と書く。

---

## ライセンス

[LICENSE](./LICENSE) を参照。
`;

const fileTag = { "zh-TW": "Zh-TW", en: "En", ja: "Ja", ru: "Ru" };
for (const code of Object.keys(bodies)) {
  const out = path.join(root, "rules", "README", "README-" + fileTag[code] + ".md");
  fs.writeFileSync(out, lock + bodies[code].trim() + "\n", "utf8");
  console.log("wrote", path.relative(root, out));
}
