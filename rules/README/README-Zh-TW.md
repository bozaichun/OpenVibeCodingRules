<!-- ovcr-locale-lock -->
<a id="ovcr-lang"></a>

> **Language / 语言**：[简体中文](../../README.md#ovcr-lang) · [繁體中文](./README-Zh-TW.md#ovcr-lang) · [English](./README-En.md#ovcr-lang) · [Русский](./README-Ru.md#ovcr-lang) · [日本語](./README-Ja.md#ovcr-lang)

# OpenVibeCodingRules

遵循 OpenVibeCodingRules 規範消除 AI 編碼痕跡，自訂專屬設計風格，適配個人 / 團隊 / 國企海外專案，支援網頁、後台系統與 VibeCoding 愛好者開發（**puffseed**）。

---

## 這是什麼

OpenVibeCodingRules 是一套面向 **AI 輔助多語言開發（VibeCoding）** 的規範倉庫，包含：

- **行為準則**：控制 AI 如何思考、如何改程式碼（`rules/CodeConduct/CodeConduct-Zh-CN.md`）
- **品質基線**：全語言程式碼規範 / 品質 / 可維護性（`rules/QualityBaseline/QualityBaseline-Zh-CN.md`）
- **按語言劃分的工程規範**（`rules/CodingSpec/<語言>/`）
- **前端設計規範與 Token**：`DESIGN.md` · **WebVariable**（原 VariableFile）· PreView

**支援語言與框架**（全球熱門語言 + 主流業務棧）：

| 語言 | 框架 / 場景 |
|------|------------|
| JavaScript & TypeScript | Vue、React、Next.js、UniApp |
| Node.js | NestJS、Express |
| Python | FastAPI、Django |
| Java | Spring Boot |
| Go | Gin |
| PHP | Laravel |
| C | 系統 / 嵌入式 / C ABI |
| C++ | 現代 C++ · CMake / Qt |
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

## 使用說明

1. **新手可先開啟本倉庫根目錄的 [`README.html`](../../README.html)**（瀏覽器直接開啟），快速瀏覽專案概覽、多語言規範入口與品質基線。
2. **詳細文字說明見本檔案**（`README.md`）。
3. **將本倉庫中的 `rules/` 資料夾與 `AGENTS.md` 複製到你的業務專案根目錄**，保持相對路徑不變。範例：

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

向 AI 發起任務時建議說明：

> 請根據 AGENTS.md 進行編碼開發。

---

## 目錄結構

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
│           └── (JS/TS: DESIGN · WebVariable · PreView)
└── LICENSE
```

---

## 快速開始

### 1. 引入到你的專案

將 `AGENTS.md` 與 `rules/` 複製到業務專案根目錄，或使用 Git Submodule 後按實際路徑調整引用。

### 2. 前端專案引入樣式 Token（WebVariable）

全域樣式**不要複製** WebVariable 原始碼，只在入口引入：

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

引入順序固定：**ThemeVariable → SystemVariable → ProjectReset → 應用級 CSS**。

### 3. 在 Cursor / AI IDE 中啟用

1. 確保根目錄存在 `AGENTS.md`
2. `rules/CodeConduct/CodeConduct-Zh-CN.md` 已 `alwaysApply: true`
3. 按語言 `@` 引用對應 `CodingSpec.md`；前端 UI 再引用 `DESIGN.md` / WebVariable

> 請遵循本專案 `AGENTS.md` 與 `rules/` 規範；先識別語言與技術棧，再編碼。

---

## 給開發者的使用指南

### 識別語言與專案模式

先按依賴識別語言 / 框架（見 `AGENTS.md` §1）。前端倉再判斷：

| 模式 | 判斷方式 | 支援技術棧 |
|------|---------|-----------|
| 普通專案 | 無 `public/plugin.json` | 原生 HTML · Vue · React · Next.js · UniApp |
| uTools 生態外掛 | 存在 `public/plugin.json` | 僅 React · Vue |

### 樣式編寫原則（前端 · 1:1）

| 樣式類型 | 寫在哪裡 | 禁止 |
|---------|---------|------|
| 全域 Token | `WebVariable/` | 在業務元件內重複定義 |
| 佈局 / 頁面 / 元件 | 對應模組內 | 跨模組堆樣式、硬編碼色值 |

### 修改主題與尺寸

| 需求 | 修改檔案 |
|------|---------|
| 主題色、功能色、文字色 | `WebVariable/ThemeVariable.css` |
| 間距、佈局、字號、陰影 | `WebVariable/SystemVariable.css` |
| 全域 reset | `WebVariable/ProjectReset.css`（慎改） |

修改後開啟 `PreView/LightDesignSpec.html` 或 `DarkDesignSpec.html` 驗收。

### 自訂品牌風格

在 `WebVariable/` 或 `Extensions/` **新增**擴充 CSS，入口追加引入，**不要修改**核心 WebVariable。

---

## 給 VibeCoding 愛好者的使用指南

**✅ 推薦**

- 「按 `AGENTS.md`，用 Vue 3 做使用者列表頁，樣式引用 WebVariable Token」
- 「這是 FastAPI 專案，按 `CodingSpec/Python` 與 puffseed 業務註解約定實作介面」
- 「只改 ThemeVariable 主色，並檢查 PreView」

**❌ 避免**

- 缺少語言 / 規範約束的模糊需求
- 在元件內硬編碼整套顏色或複製 Token

### AI 應載入哪些規範

| 任務類型 | 讓 AI 閱讀 |
|---------|-----------|
| 任意起步 | `AGENTS.md` + `CodeConduct.md` |
| 任意業務程式碼 | + `QualityBaseline.md` + 對應語言 `CodingSpec.md` |
| 前端 UI | + `DESIGN.md` + WebVariable |

---

## 視覺預覽

| 檔案 | 說明 |
|------|------|
| `rules/CodingSpec/JavaScript&TypeScript/PreView/LightDesignSpec.html` | 淺色 · puffseed-ui |
| `rules/CodingSpec/JavaScript&TypeScript/PreView/DarkDesignSpec.html` | 深色 · puffseed-ui |

---

## 規範檔案速查

| 檔案 | 何時查閱 |
|------|---------|
| `AGENTS.md` | 任何 AI 協作任務開始前 |
| `rules/CodeConduct/CodeConduct-Zh-CN.md` | 判斷範圍、避免過度實作 |
| `rules/QualityBaseline/QualityBaseline-Zh-CN.md` | 風格門禁、分層、介面、品質、技術債、可維護性 |
| `rules/CodingSpec/<語言>/CodingSpec-Zh-CN.md` | 寫對應語言業務程式碼 |
| `.../JavaScript&TypeScript/DESIGN/DESIGN-Zh-CN.md` | UI 佈局、元件視覺 |
| `.../WebVariable/*.css` | 改色值、間距、reset |

**優先級**：行為 → `CodeConduct` · 品質門禁 → `QualityBaseline` · 怎麼寫 → 語言 `CodingSpec` · 長什麼樣 → `DESIGN` + WebVariable。

---

## 常見問題

**Q：可以把 WebVariable 複製到 `src/styles/` 嗎？**  
A：不建議。應透過入口引用，保證 Token 單一維護源。

**Q：後端也要 WebVariable 嗎？**  
A：不需要。後端只載入對應語言的 `CodingSpec.md`。

**Q：AI 沒有遵守規範怎麼辦？**  
A：顯式 `@AGENTS.md` 與對應語言 `CodingSpec.md`；任務中寫明「遵循 OpenVibeCodingRules / puffseed，最小 diff」。

---

## 授權

見 [LICENSE](../../LICENSE)。
