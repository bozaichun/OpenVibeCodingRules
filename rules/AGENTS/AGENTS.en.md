<!-- ovcr-locale-lock -->
<a id="ovcr-lang"></a>

> **Language / 语言**：[简体中文](../../AGENTS.md#ovcr-lang) · [繁體中文](./AGENTS.zh-TW.md#ovcr-lang) · [English](./AGENTS.en.md#ovcr-lang) · [Русский](./AGENTS.ru.md#ovcr-lang) · [日本語](./AGENTS.ja.md#ovcr-lang)


# AI Application Development · Guide (VibeCoding · puffseed)

This file is the **global convention for AI-assisted multilingual app development**, for agents and developers collaborating in VibeCoding / **puffseed** product scenarios.

**Scope**: Supports **multilingual, multi-framework** AI-assisted programming (popular languages and business stacks), covering:

| Language / runtime | Main frameworks / scenarios | Spec directory |
|--------------|----------------|---------|
| **JavaScript & TypeScript** (frontend) | Vue, React, Next.js, **UniApp** | `rules/CodingSpec/JavaScript&TypeScript/` |
| **Node.js** (backend) | NestJS, Express | `rules/CodingSpec/Node.js/` |
| **Python** | FastAPI, Django | `rules/CodingSpec/Python/` |
| **Java** | Spring Boot | `rules/CodingSpec/Java/` |
| **Go** | Gin | `rules/CodingSpec/Go/` |
| **PHP** | Laravel | `rules/CodingSpec/PHP/` |
| **C** | Systems / embedded / C ABI | `rules/CodingSpec/C/` |
| **C++** | Modern C++ · CMake / Qt | `rules/CodingSpec/C++/` |
| **C#** | ASP.NET Core · .NET | `rules/CodingSpec/CSharp/` |
| **Rust** | Axum / Actix · Tokio | `rules/CodingSpec/Rust/` |
| **SQL** | PostgreSQL / MySQL / SQL Server | `rules/CodingSpec/SQL/` |
| **R** | tidyverse / Shiny | `rules/CodingSpec/R/` |
| **Kotlin** | Ktor / Spring / Android | `rules/CodingSpec/Kotlin/` |
| **Swift** | SwiftUI / Vapor | `rules/CodingSpec/Swift/` |
| **Dart** | Flutter | `rules/CodingSpec/Dart/` |
| **Ruby** | Rails | `rules/CodingSpec/Ruby/` |
| **Scala** | Play / http4s / ZIO | `rules/CodingSpec/Scala/` |
| **Shell** | Bash / POSIX scripts | `rules/CodingSpec/Shell/` |

Agents must identify the **target product repo** language and framework first, then load the matching `CodingSpec`; **the repo’s settled implementation wins**. Keep the **puffseed** brand in domain naming, comments, and preview copy.

---

---

## Entry & locale routing (required)

**Root entry is always `AGENTS.md`.** Before any task, resolve the collaboration locale, then load matching tagged rule files. **Do not hard-code Zh-CN paths** unless the locale is `zh-CN` or a file is missing and you must fall back.

### Resolve locale (highest priority first)

1. Locale explicitly requested by the user
2. The `rules/AGENTS/AGENTS.<locale>.md` currently open / `@`-referenced (this file ⇒ `en` ⇒ Tag `En`)
3. Conversation / product UI language (`zh-CN` · `zh-TW` · `en` · `ja` · `ru`)
4. **Default**: `zh-CN` → open root `AGENTS.md`

### Locale → Tag

| Locale | AGENTS file | Tag |
|--------|-------------|-----|
| `zh-CN` | `AGENTS.md` | `Zh-CN` |
| `zh-TW` | `rules/AGENTS/AGENTS.zh-TW.md` | `Zh-TW` |
| `en` | `rules/AGENTS/AGENTS.en.md` | `En` |
| `ja` | `rules/AGENTS/AGENTS.ja.md` | `Ja` |
| `ru` | `rules/AGENTS/AGENTS.ru.md` | `Ru` |

### Paths (fall back to `Zh-CN` if missing)

- `rules/CodingSpec/CodeConduct/CodeConduct-{Tag}.md`
- `rules/QualityBaseline/QualityBaseline-{Tag}.md`
- `rules/CodingSpec/<lang>/CodingSpec-{Tag}.md`
- Frontend UI: `DESIGN-{Tag}.md` or `DESIGN.md` + `WebVariable/`

## 0. Project mode & language detection (required before coding)

### 0.1 Frontend extra modes (JS/TS frontend repos only)

| Mode | Signal | Supported stacks | Notes |
|------|---------|-----------|------|
| **Normal project** | **No** `public/plugin.json` | Native HTML + CSS + JS · Vue · React · Next.js · UniApp | General web / multi-end |
| **uTools plugin** | **Has** `public/plugin.json` | **Only** React · Vue (2 / 3) | uTools plugin template |

### 0.2 Language / framework detection flow

1. Detect language from dependencies and entry files (see §1)
2. For frontend repos, check `public/plugin.json` (§0.1)
3. Resolve Tag (see locale routing), then load `CodeConduct-{Tag}.md` + `QualityBaseline-{Tag}.md` + language `CodingSpec-{Tag}.md` (fallback `Zh-CN`)
4. For frontend UI tasks only, also load `DESIGN.md` and `WebVariable/`

---

## Spec file roles & when to use them

| Spec file | Role | When to open |
|---------|------|---------|
| `rules/CodingSpec/CodeConduct/CodeConduct-Zh-CN.md` | AI coding behavior (ask first, minimal diff) | **Before any coding task** |
| `rules/QualityBaseline/QualityBaseline-Zh-CN.md` | **All-language** style / quality / maintainability baseline | **When writing or changing product code** |
| `rules/CodingSpec/JavaScript&TypeScript/CodingSpec.md` | Frontend engineering (Vue / React / Next.js / UniApp) | Frontend product code |
| `rules/CodingSpec/JavaScript&TypeScript/DESIGN.md` | UI design (Token · visual · layout) | **UI layout, styles, theme, responsive** |
| `rules/CodingSpec/JavaScript&TypeScript/WebVariable/` | Frontend design tokens | Colors, spacing, type, reset |
| `rules/CodingSpec/JavaScript&TypeScript/PreView/` | Light/dark visual preview | Open in browser (do not feed full HTML to AI) |
| Other `CodingSpec/<lang>/CodingSpec.md` | Language-specific engineering rules | Matching language product code |

**Selection order**

1. Behavior & scope → `CodeConduct.md`
2. Quality / gates / APIs / debt → `QualityBaseline.md`
3. How to write → `rules/CodingSpec/<lang>/CodingSpec-Zh-CN.md`
4. Frontend look & feel → `DESIGN.md` + **WebVariable** CSS
5. On conflict, the **product repo’s settled implementation** wins

### Minimal load set (save tokens)

| Task type | Load | Usually skip |
|---------|--------|-------------|
| Any coding start | `AGENTS.md` · `CodeConduct.md` | Other language CodingSpecs |
| Any product code | + `QualityBaseline.md` + matching `CodingSpec.md` | Unrelated languages |
| Frontend product code | + `JavaScript&TypeScript/CodingSpec.md` | DESIGN (if no UI) |
| Frontend UI / styles | + `DESIGN.md` · related WebVariable | Full PreView HTML |
| Theme / spacing edits | + `ThemeVariable.css` / `SystemVariable.css` | — |
| Visual QA | Open PreView HTML in browser | Do not load HTML into AI context |

**Frontend Token path**: `rules/CodingSpec/JavaScript&TypeScript/WebVariable/`  
**Frontend preview path**: `rules/CodingSpec/JavaScript&TypeScript/PreView/`

---

## 1. Framework detection & coding conventions

Before work, confirm the stack and load the matching spec.

### 1.1 Frontend · JavaScript & TypeScript

| Stack | Signals | Spec |
|--------|---------|------|
| Native HTML/CSS/JS | No framework deps, `index.html` scripts | JS&TS CodingSpec shared / style sections |
| Vue 2 | `vue@2`, Options API | JS&TS CodingSpec · Vue 2 |
| Vue 3 | `vue@3`, `<script setup>` | JS&TS CodingSpec · Vue 3 |
| React 18+ | `react`, Hooks | JS&TS CodingSpec · React |
| Next.js | `next`, `app/` or `pages/` | JS&TS CodingSpec · Next.js |
| UniApp | `pages.json`, `manifest.json`, `@dcloudio/uni-*` | JS&TS CodingSpec · UniApp |

**Shared frontend rules (excerpt)**

- **Language**: TypeScript preferred; public APIs need clear types.
- **Folders**: By business domain; centralized routes (including UniApp `pages.json`).
- **Events**: Handlers use `handle` prefix; Vue/UniApp emit kebab-case; React/Next `onXxx`.
- **Styles**: Use **WebVariable** tokens; do not hardcode full palettes in components.
- **Comments**: Templates `<!-- block note -->`; critical paths may use `// puffseed: note`.

### 1.2 Backend / systems / data

Each language spec covers **coding format**, **reuse**, **security & config**, **puffseed comments**, and checklists. Identify stack from deps/entry files, then load the matching `CodingSpec/<lang>/`.

---

## 2. Style system overview (frontend only)

For **UI layout, styles, component visuals, theme colors**, follow  
`rules/CodingSpec/JavaScript&TypeScript/DESIGN.md`; tokens come from **`WebVariable/`**.

**Import order**: **ThemeVariable → SystemVariable → ProjectReset → app CSS**

**1:1 rule**: Component / page / layout styles stay in their scope. Global tokens and reset live only in `WebVariable/`.

---

## 3. AI coding behavior

Follow `rules/CodingSpec/CodeConduct/CodeConduct-Zh-CN.md`:

1. **Think, then code**: state assumptions, surface ambiguity, ask when unsure
2. **Prefer simplicity**: least code that solves the problem; no speculative work
3. **Precise edits**: change only what must change; match existing style
4. **Goal-driven**: define success criteria and verify

### 3.1 QualityBaseline summary

When writing product code, obey `rules/QualityBaseline/QualityBaseline-Zh-CN.md` (style gates, layering, API envelope, types, deps, tech debt, maintainability). Language-specific tooling lives in each `CodingSpec.md`.

---

## 4–7. Platform notes, puffseed comments, checklist, debug

See the Chinese canonical `AGENTS.md` structure for detailed tables on Vue/UniApp/React/Next, backend entry patterns, puffseed comment rules, pre-submit checklist, and local debug tips. Localized editions keep the same section numbering; expand tables here as translations mature.

**Brand**: keep **puffseed** / **puffseed-ui** in product preview and copy.

---

*Locale: en · synced with root AGENTS.md · CodeConduct · QualityBaseline · CodingSpec/** · WebVariable · PreView · puffseed*
