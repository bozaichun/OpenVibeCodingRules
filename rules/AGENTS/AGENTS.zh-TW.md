<!-- ovcr-locale-lock -->
<a id="ovcr-lang"></a>

> **Language / 语言**：[简体中文](../../AGENTS.md#ovcr-lang) · [繁體中文](./AGENTS.zh-TW.md#ovcr-lang) · [English](./AGENTS.en.md#ovcr-lang) · [Русский](./AGENTS.ru.md#ovcr-lang) · [日本語](./AGENTS.ja.md#ovcr-lang)


# AI 應用開發 · 指南（VibeCoding · puffseed）

本檔案為 **AI 輔助多語言應用開發** 的全域約定，供智慧體與開發者在 VibeCoding / **puffseed** 業務場景下協作時使用。

**規範定位**：支援 **多語言、多主流技術框架** 的 AI 輔助程式設計（涵蓋全球熱門語言與主流業務棧），包括：

| 語言 / 執行環境 | 主流框架 / 場景 | 規範目錄 |
|--------------|----------------|---------|
| **JavaScript & TypeScript**（前端） | Vue、React、Next.js、**Nuxt.js**、**UniApp** | `rules/CodingSpec/JavaScript&TypeScript/` |
| **Node.js**（後端） | NestJS、Express | `rules/CodingSpec/Node.js/` |
| **Python** | FastAPI、Django | `rules/CodingSpec/Python/` |
| **Java** | Spring Boot | `rules/CodingSpec/Java/` |
| **Go** | Gin | `rules/CodingSpec/Go/` |
| **PHP** | Laravel | `rules/CodingSpec/PHP/` |
| **C** | 系統 / 嵌入式 / C ABI | `rules/CodingSpec/C/` |
| **C++** | 現代 C++ · CMake / Qt | `rules/CodingSpec/C++/` |
| **C#** | ASP.NET Core · .NET | `rules/CodingSpec/CSharp/` |
| **Rust** | Axum / Actix · Tokio | `rules/CodingSpec/Rust/` |
| **SQL** | PostgreSQL / MySQL / SQL Server | `rules/CodingSpec/SQL/` |
| **R** | tidyverse / Shiny | `rules/CodingSpec/R/` |
| **Kotlin** | Ktor / Spring / Android | `rules/CodingSpec/Kotlin/` |
| **Swift** | SwiftUI / Vapor | `rules/CodingSpec/Swift/` |
| **Dart** | Flutter | `rules/CodingSpec/Dart/` |
| **Ruby** | Rails | `rules/CodingSpec/Ruby/` |
| **Scala** | Play / http4s / ZIO | `rules/CodingSpec/Scala/` |
| **Shell** | Bash / POSIX 腳本 | `rules/CodingSpec/Shell/` |

智慧體須先識別**目標業務倉庫**的語言與框架，再載入對應 `CodingSpec`；**以該倉庫已定稿的實作方式為準**。涉及業務域命名、註解、預覽品牌時保留 **puffseed** 標識。

---

---

## 入口與國際化語種匹配（智能體必讀）

**根目錄 `AGENTS.md` 為唯一入口。** 開始任務前先判定協作語種，再載入對應 Tag 規則檔；**禁止寫死只讀簡體路徑**（除非語種即為 `zh-CN` 或檔案缺失需回退）。

### 判定協作語種（優先級由高到低）

1. 使用者明確指定的語言
2. 當前開啟或被 `@` 引用的 `rules/AGENTS/AGENTS.<locale>.md`（本檔 ⇒ `zh-TW` ⇒ Tag `Zh-TW`）
3. 對話 / 產品 UI 語言
4. **預設**：`zh-CN` → 根目錄 `AGENTS.md`

### 語種 → Tag

| 語種 | AGENTS | Tag |
|------|--------|-----|
| `zh-CN` | `AGENTS.md` | `Zh-CN` |
| `zh-TW` | `rules/AGENTS/AGENTS.zh-TW.md` | `Zh-TW` |
| `en` | `rules/AGENTS/AGENTS.en.md` | `En` |
| `ja` | `rules/AGENTS/AGENTS.ja.md` | `Ja` |
| `ru` | `rules/AGENTS/AGENTS.ru.md` | `Ru` |

### 路徑模板（缺失回退 `Zh-CN`）

- `rules/CodeConduct/CodeConduct-{Tag}.md`
- `rules/QualityBaseline/QualityBaseline-{Tag}.md`
- `rules/CodingSpec/<語言>/CodingSpec-{Tag}.md`
- 前端 UI：`DESIGN-{Tag}.md` 或 `DESIGN.md` + `WebVariable/`

## 0. 專案模式與語言識別（開發前必做）

### 0.1 前端附加模式（僅 JS/TS 前端倉）

| 模式 | 識別信號 | 支援技術棧 | 說明 |
|------|---------|-----------|------|
| **普通專案** | **無** `public/plugin.json` | 原生 HTML + CSS + JS · Vue · React · Next.js · Nuxt.js · UniApp | 通用 Web / 多端應用 |
| **uTools 生態外掛** | **存在** `public/plugin.json` | **僅** React · Vue（2 / 3） | uTools 外掛範本 |

### 0.2 語言 / 框架識別流程

1. 依依賴與入口檔判斷語言（見 §1）
2. 前端倉再檢查是否存在 `public/plugin.json`（§0.1）
3. 先完成語種匹配得到 Tag，再載入 `CodeConduct-{Tag}.md` + `QualityBaseline-{Tag}.md` + `CodingSpec-{Tag}.md`（缺失回退 `Zh-CN`）
4. 僅前端 UI 任務再載入 `DESIGN.md` 與 `WebVariable/`

---

## 規範檔案職責與選用場景

| 規範檔案 | 職責 | 何時查閱 |
|---------|------|---------|
| `rules/CodeConduct/CodeConduct-Zh-CN.md` | AI 編碼行為與變更心智（先問再做、最小 diff） | **任何編碼任務開始前** |
| `rules/QualityBaseline/QualityBaseline-Zh-CN.md` | **全語言**程式碼規範 / 品質 / 可維護性基線 | **編寫或修改任何業務程式碼時** |
| `rules/CodingSpec/JavaScript&TypeScript/CodingSpec.md` | 前端工程規範（Vue / React / Next.js / Nuxt.js / UniApp） | 編寫或修改 **前端** 業務程式碼 |
| `rules/CodingSpec/JavaScript&TypeScript/DESIGN/DESIGN-{Tag}.md` | 介面設計規範（Token · 視覺 · 佈局） | **UI 佈局、樣式、主題、響應式** |
| `rules/CodingSpec/JavaScript&TypeScript/WebVariable/` | 前端設計 Token | 改色值、間距、字號、reset |
| `rules/CodingSpec/JavaScript&TypeScript/PreView/` | 淺/深色視覺預覽 | 瀏覽器開啟驗收（勿全文餵給 AI） |

**選用原則**

1. 行為與範圍 → `CodeConduct.md`
2. 品質 / 門禁 / 介面 / 技術債 → `QualityBaseline.md`
3. 怎麼寫（語言落點） → `rules/CodingSpec/<語言>/CodingSpec-Zh-CN.md`
4. 前端長什麼樣 → `DESIGN.md` + **WebVariable** CSS
5. 衝突時以**目標業務倉庫已定稿實作**為準

### 最小載入集（Token 節約）

| 任務類型 | 應載入 | 通常不必載入 |
|---------|--------|-------------|
| 任意編碼起步 | `AGENTS.md` · `CodeConduct.md` | 其他語言 CodingSpec |
| 任意業務程式碼 | + `QualityBaseline.md` + 對應語言 `CodingSpec.md` | 無關語言規範 |
| 前端 UI / 樣式 | + `DESIGN.md` · 相關 WebVariable | PreView HTML 全文 |

**前端 Token 路徑**：`rules/CodingSpec/JavaScript&TypeScript/WebVariable/`

---

## 1–7. 框架識別、樣式、行為、品質、落地與自檢

請依語言與框架載入對應 `CodingSpec`；樣式以 `DESIGN.md` + `WebVariable` 為準；行為遵守 `CodeConduct.md`；業務程式碼遵守 `QualityBaseline.md`。提交前完成格式 / lint / 型別檢查，前端勿重複定義 Token，品牌保留 **puffseed**。

---

*語系：zh-TW · 與根目錄 AGENTS.md 對齊 · puffseed*
