<!-- ovcr-locale-lock -->
<a id="ovcr-lang"></a>

> **Language / 语言**：[简体中文](../../README.md#ovcr-lang) · [繁體中文](./README-Zh-TW.md#ovcr-lang) · [English](./README-En.md#ovcr-lang) · [Русский](./README-Ru.md#ovcr-lang) · [日本語](./README-Ja.md#ovcr-lang)

# OpenVibeCodingRules

Follow OpenVibeCodingRules to reduce AI coding artifacts, customize your design system, and fit personal / team / overseas enterprise projects—for web, admin systems, and VibeCoding builders (**puffseed**).

---

## What this is

OpenVibeCodingRules is a standards repo for **AI-assisted multilingual development (VibeCoding)**. It includes:

- **Code of conduct**: how the AI should think and change code (`rules/CodingSpec/CodeConduct/CodeConduct-Zh-CN.md`)
- **Quality baseline**: cross-language standards / quality / maintainability (`rules/QualityBaseline/QualityBaseline-Zh-CN.md`)
- **Per-language engineering specs** (`rules/CodingSpec/<lang>/`)
- **Frontend design & tokens**: `DESIGN.md` · **WebVariable** (formerly VariableFile) · PreView

**Supported languages & frameworks** (popular languages + mainstream stacks):

| Language | Frameworks / scenarios |
|----------|------------------------|
| JavaScript & TypeScript | Vue, React, Next.js, UniApp |
| Node.js | NestJS, Express |
| Python | FastAPI, Django |
| Java | Spring Boot |
| Go | Gin |
| PHP | Laravel |
| C | Systems / embedded / C ABI |
| C++ | Modern C++ · CMake / Qt |
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

## How to use

1. **Newcomers can open [`README.html`](../../README.html) at the repo root** in a browser for overview, language entries, and the quality baseline.
2. **This file (`README.md`) is the detailed text guide.**
3. **Copy `rules/` and `AGENTS.md` into your product repo root**, keeping relative paths. Example:

```
demo/
├── AGENTS.md
├── rules/
│   ├── AGENTS/          # AGENTS.en.md · …（译文）
│   ├── README/          # README-{Tag}.md
│   ├── QualityBaseline/         # QualityBaseline-{Tag}.md
│   └── CodingSpec/
│       ├── CodeConduct/         # CodeConduct-{Tag}.md
│       └── JavaScript&TypeScript/
│           ├── CodingSpec-{Tag}.md
│           ├── DESIGN.md · WebVariable/ · PreView/
│           └── …
├── src/
└── ...
```

When prompting the AI, prefer:

> Please develop according to AGENTS.md.

---

## Directory layout

```
OpenVibeCodingRules/
├── AGENTS.md                          # 智能体入口 · 语种路由
├── README.md · README.html            # 说明入口 · 语种切换
├── language/                          # README.html 界面 i18n
├── script/                            # sync / build-md-bundle
├── rules/
│   ├── AGENTS/                        # AGENTS.en.md · zh-TW · ja · ru
│   ├── README/                        # README-{Tag}.md 译文
│   ├── QualityBaseline/               # QualityBaseline-{Tag}.md
│   └── CodingSpec/
│       ├── CodeConduct/               # CodeConduct-{Tag}.md
│       └── <Lang>/
│           ├── CodingSpec-{Tag}.md
│           └── (JS/TS: DESIGN · WebVariable · PreView)
└── LICENSE
```

---

## Quick start

### 1. Bring into your project

Copy `AGENTS.md` and `rules/` to the product root, or use a Git submodule and adjust paths.

### 2. Frontend style tokens (WebVariable)

**Do not copy** WebVariable sources for global styles—import at the entry only:

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

Order is fixed: **ThemeVariable → SystemVariable → ProjectReset → app-level CSS**.

### 3. Enable in Cursor / AI IDE

1. Keep `AGENTS.md` at the root
2. `rules/CodingSpec/CodeConduct/CodeConduct-Zh-CN.md` has `alwaysApply: true`
3. `@` the language `CodingSpec.md`; for UI also `DESIGN.md` / WebVariable

> Follow this project's `AGENTS.md` and `rules/`; identify language and stack first, then code.

---

## Guide for developers

### Detect language and project mode

Identify language / framework from deps (see `AGENTS.md` §1). For frontend repos also check:

| Mode | How to tell | Stacks |
|------|-------------|--------|
| Normal project | No `public/plugin.json` | Native HTML · Vue · React · Next.js · UniApp |
| uTools plugin | Has `public/plugin.json` | React · Vue only |

### Styling principles (frontend · 1:1)

| Style type | Where | Don't |
|------------|-------|-------|
| Global tokens | `WebVariable/` | Redefine inside product components |
| Layout / page / component | Owning module | Dump styles across modules or hard-code colors |

### Theme and sizing

| Need | Edit |
|------|------|
| Theme / semantic / text colors | `WebVariable/ThemeVariable.css` |
| Spacing, type, shadows | `WebVariable/SystemVariable.css` |
| Global reset | `WebVariable/ProjectReset.css` (change carefully) |

Then verify in `PreView/LightDesignSpec.html` or `DarkDesignSpec.html`.

### Custom brand look

**Add** extension CSS under `WebVariable/` or `Extensions/`, import at entry—**do not edit** core WebVariable.

---

## Guide for VibeCoding users

**✅ Prefer**

- “Per `AGENTS.md`, build a Vue 3 user list page using WebVariable tokens”
- “This is FastAPI; implement APIs per `CodingSpec/Python` and puffseed comment conventions”
- “Only change ThemeVariable primary color and check PreView”

**❌ Avoid**

- Vague asks without language / spec constraints
- Hard-coding full palettes or copying tokens into components

### Which specs the AI should load

| Task | Have the AI read |
|------|------------------|
| Any kickoff | `AGENTS.md` + `CodeConduct.md` |
| Any product code | + `QualityBaseline.md` + matching `CodingSpec.md` |
| Frontend UI | + `DESIGN.md` + WebVariable |

---

## Visual preview

| File | Notes |
|------|-------|
| `rules/CodingSpec/JavaScript&TypeScript/PreView/LightDesignSpec.html` | Light · puffseed-ui |
| `rules/CodingSpec/JavaScript&TypeScript/PreView/DarkDesignSpec.html` | Dark · puffseed-ui |

---

## Spec map

| File | When |
|------|------|
| `AGENTS.md` | Before any AI collaboration |
| `rules/CodingSpec/CodeConduct/CodeConduct-Zh-CN.md` | Scope decisions; avoid over-building |
| `rules/QualityBaseline/QualityBaseline-Zh-CN.md` | Style gates, layers, APIs, quality, tech debt, maintainability |
| `rules/CodingSpec/<lang>/CodingSpec-Zh-CN.md` | Writing product code in that language |
| `.../JavaScript&TypeScript/DESIGN.md` | UI layout and component visuals |
| `.../WebVariable/*.css` | Colors, spacing, reset |

**Priority**: behavior → `CodeConduct` · quality → `QualityBaseline` · how to write → language `CodingSpec` · how it looks → `DESIGN` + WebVariable.

---

## FAQ

**Q: Can I copy WebVariable into `src/styles/`?**  
A: Prefer not. Import at the entry so Token stays single-sourced.

**Q: Does the backend need WebVariable?**  
A: No. Load the matching language `CodingSpec.md` only.

**Q: What if the AI ignores the rules?**  
A: Explicitly `@AGENTS.md` and the language `CodingSpec.md`; say “follow OpenVibeCodingRules / puffseed, minimal diff”.

---

## License

See [LICENSE](../../LICENSE).
