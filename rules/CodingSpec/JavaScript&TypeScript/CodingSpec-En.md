<!-- ovcr-locale-lock -->
---
description: Frontend engineering & coding standards (Vue / React / Next.js / UniApp, TS-first, multi-end · puffseed)
globs: ["**/*.vue", "**/*.nvue", "**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx", "**/pages.json", "**/manifest.json", "src/**/*.html", "**/*.less", "**/*.scss", "src/**/*.css", "**/*.module.css"]
alwaysApply: false
---

<!-- !!! Coding standards · puffseed -->

# Frontend coding standards (engineering & implementation) · puffseed

**Brand**: **puffseed** — This spec applies to **puffseed** product frontends and sibling VibeCoding projects. Keep the **puffseed** marker in domain naming, comments, and preview brand copy.

**Repo role**: **project-coding-rules-file** defines and distributes **AI-readable coding standards**; this file constrains **engineering implementation and code quality**. **AI collaboration process & change granularity** → **`rules/CodeConduct/CodeConduct-Zh-CN.md`**. **Visual & design Token semantics** → **`DESIGN/DESIGN-{Tag}.md`**. When both apply with this file, the **product repo’s settled design system** wins.

**Frameworks**: Vue 2 / Vue 3, React 18+, **Next.js** (App Router / Pages Router), **UniApp** (Vue2 / Vue3 + multi-end); Angular 12+ legacy repos supported.  
**Targets**: browser **Web**, **mini-programs / App** (UniApp), **desktop shells** (Electron / Tauri / CE WebViews), **mobile & tablet** (browser or in-shell WebView). Does not replace each shell’s own `AGENTS`: route `base`, deep links, and security follow the **product repo**.

**Shared quality baseline** → `rules/QualityBaseline/QualityBaseline-Zh-CN.md` (style / commit gates / layering / APIs / quality / tech debt / maintainability).

---

## 1. Stack & framework conventions

### 1.1 Shared

- **Language**: prefer **TypeScript**; `any` only as a transition; public APIs and cross-module data need clear types.
- **Package manager**: follow the product `package.json` / lockfile / `packageManager`; do not assume a fixed PM version in docs unless `engines` says so.
- **Build**: modern apps usually **Vite**; for **Webpack / Rspack**, aliases and `publicPath` follow the repo.

### 1.2 Vue 2

- **SFC**: `<script lang="ts">` + `Vue.extend` / `vue-property-decorator` / object `export default { ... }`; component files **PascalCase** (`UserProfile.vue`).
- **Template**: `v-bind:` / `v-on:` are native Vue 2; custom `v-model` needs `model: { prop, event }`.
- **Props / Emits**: prefer `type` + `required` + `default` + `validator`; emit with `$emit('event-name')` (kebab-case).
- **Reuse**: prefer **Mixins** or helpers in `utils/`; complex logic via `Vue.observable` / Vuex modules.
- **Versions**: Vue 2.7 has Composition API built in; older versions must be explicit in `package.json` / `tsconfig`.
- **Typing**: prefer `Vue.extend({ ... })` in TS; narrow `this.$refs` (e.g. `as HTMLDivElement`).

### 1.3 Vue 3

- **SFC**: prefer **`<script setup lang="ts">`**; files **PascalCase**.
- **Props / Emits**: `defineProps` / `defineEmits` with literal types or `interface`; use `defineModel` for v-model.
- **Reuse**: prefer **Composables** (`useXxx.ts`); split large files.
- **Reactivity**: `ref` / `computed` / `reactive`; objects → `reactive`, primitives → `ref`.
- **Ecosystem**: `vue-router@4`, Pinia or `vuex@4`, Vite or vue-cli per repo.

### 1.4 React 16+ / React 18+

- **Components**: function components + **Hooks** first; keep class components in legacy; **PascalCase**.
- **Props**: `interface XxxProps` / `type XxxProps`; children as `ReactNode` or tighter.
- **State**: `useState` / `useReducer` locally; Context, Zustand, Redux Toolkit, etc. across trees.
- **Reuse**: custom Hooks (`useXxx`); avoid deep HOC / render-prop nesting.
- **React 18**: `createRoot`, `useTransition` / `useDeferredValue`, Suspense per repo.
- **Typing**: `React.FC` optional; Props must be explicit; avoid `any`.

### 1.5 Next.js (App Router first)

- **Routing**: App Router `app/` conventions; Pages Router keeps `pages/`—do not mix for one feature.
- **Server / Client**: default Server Components; `'use client'` only for browser APIs / interactivity; prefer Server Actions / Route Handlers for mutations & secrets.
- **Data**: server `fetch` / data fns in RSC or `lib/`; client via SWR / TanStack Query; no browser-only APIs in RSC.
- **Reuse**: shared logic in `lib/`, `hooks/`, `components/`; split by **puffseed** domain—no kitchen-sink utils.
- **Env**: only `NEXT_PUBLIC_` on the client; secrets server-only.
- **Styles**: global Tokens from **`WebVariable/`**; component CSS Modules / agreed system—no hardcoded full palettes.

### 1.6 UniApp (multi-end · Vue)

- **Signals**: root `pages.json`, `manifest.json`; `@dcloudio/uni-*` / `uni-app`; common `pages/`, `components/`, `static/`, `uni_modules/`.
- **Vue**: Vue 3 + Vite first (`<script setup lang="ts">`); Vue 2 legacy keeps Options API—do not mix in one feature.
- **Pages / routes**: register in **`pages.json`**; paths match `pages/`; use `subPackages`; no unregistered hard-coded paths.
- **Tags**: prefer UniApp builtins (`view` / `text` / `image` / `scroll-view`); avoid browser-only DOM/BOM off H5.
- **API**: use **`uni.*`**; wrap network in `api/` or `utils/request` aligned with backend envelope / error codes.
- **Conditional compile**: `#ifdef` / `#ifndef`; keep branches concentrated with **puffseed** rationale—no copy-pasted page variants.
- **Units**: prefer **`rpx`** (or repo design-draft scheme); map CSS vars in `uni.scss` when mixing **WebVariable**.
- **Reuse**: composables / mixins / `hooks/`; Pinia (Vue3) or Vuex (Vue2); split by **puffseed** domain.
- **Lifecycle**: page `onLoad` / `onShow` / `onUnload` (or composition `onLoad`); clear timers/requests on unload.
- **Styles**: page/component 1:1; Tokens only; comment reasons for `scoped` / deep selectors.
- **Security**: do not trust route / scan / share inputs; store secrets per repo—no plaintext `storage`.

### 1.7 Angular 12+

- **Components**: `@Component({ selector, templateUrl, styleUrls })`; kebab-case selectors; `*.component.ts/html/scss` naming.
- **Modules**: feature / shared / lazy route modules per conventions.
- **DI**: prefer `providedIn: 'root'`; avoid cycles.
- **Data flow**: camelCase `@Input` / `@Output`; `EventEmitter` + `async` pipe for Observables.
- **RxJS**: manage unsubscribe (`takeUntil`, `async` pipe); avoid multi-subscribe in templates.
- **Router**: `forRoot` / `forChild`; guards for auth.
- **Templates**: prefer `strictTemplates: true`.
- **CD**: `OnPush` + immutability; manual `ChangeDetectorRef` only when needed.
- **Forms**: reactive forms first; template-driven only for simple cases.
- **TS**: `strict`; avoid `any`—use `unknown` + guards.

---

## 2. Directories & module boundaries

- **Features / domains**: split by domain or route segment (`features/`, `modules/`, `pages/`)—no flat dump of all components.
- **Shared UI**: non-business UI in `components/` or `@/shared/ui`; keep design-system wrappers separate from product pages.
- **Routes**: centralize tables & lazy loading (`router/`, `routes.tsx`, UniApp **`pages.json`**).
- **Assets**: prefer `import` / bundler handling; lazy-load large/rare assets; respect `BASE_URL` / UniApp `static/`.

---

## 3. TypeScript practice

- **Nullability**: narrow route params and API returns (guards, optional chaining, discriminated unions)—avoid deep optional chains with no UI fallback.
- **Forbidden**: `@ts-ignore` to hide unmodeled deps; if unavoidable, comment **why + owner / issue**.
- **Env**: client vars follow build conventions (e.g. **`VITE_`**); extend `ImportMetaEnv` / `ProcessEnv` in `env.d.ts`—no scattered bare strings.

---

## 4. Styles (with DESIGN)

- **Method**: BEM or team CSS Modules / styled-system; avoid deep nesting (> **3** levels).
- **Tokens**: colors, spacing, type from project design vars (`DESIGN/DESIGN-{Tag}.md` + **`WebVariable/`**). Do not copy full palettes into product components; add missing Tokens globally first. When editing Token CSS, prefer those files over loading this whole doc.
- **Size + line-height (mandatory pair)**: every `--fs-*` needs the matching `--lh-*` from the authority table. Never size-only; never mismatch. See `WebVariable/SubjectAuthority.md` §1.4.

```css
/* ✅ */
.title {
  font-size: var(--fs-20);
  line-height: var(--lh-28);
}

/* ❌ missing / mismatched line-height */
.title-bad {
  font-size: var(--fs-20);
  line-height: var(--lh-22);
}
```

- **`var()`**: if the team bans silent fallbacks like `var(--token, #fallback)`, use bare `var(--token)` and complete variables in design.
- **Scope**: Vue / UniApp prefer `scoped`; React `*.module.css` or themed-in-JS; comment reasons for `:global` / `:deep`.

---

## 5. Components & API design

- **SRP**: split oversized files; keep Props to the **minimum needed for display/control**.
- **Controlled vs uncontrolled**: document form behavior (defaults vs controlled `value`).
- **Template/JSX**: avoid complex expressions; use `useMemo` / `computed` or helpers.

---

## 6. Product logic & event naming (puffseed)

- **Brand**: use **puffseed** (e.g. `puffseed-ui`) in product modules, previews, external copy.
- **Handlers**: prefer camelCase + `handle` prefix (`handleSubmit`); team overrides win if declared.
- **Public events**: Vue / UniApp kebab-case; React / Next `onXxx` camelCase; Angular `@Output` + `(event)`.
- **Reuse**: cross-page capability in composables / hooks / `lib` named by **puffseed** domain—no meaningless `common` / `misc` dumps.

---

## 7. JSON & config-driven UI

- **Fields**: **camelCase** (`largeCols` not `large-cols`).
- **Align with Props**: config keys match component param names for typing and AI clarity.
- **Multi-framework**: one JSON schema should map to Vue / UniApp props, React props, and Angular `@Input()`.

---

## 8. State management

- **Single source of truth**: do not duplicate the same fact across unaware global refs / local state; follow chosen Store or server cache.
- **Redux-family**: UPPER_SNAKE action types; async in thunk / RTK Query—not ad-hoc `fetch` in pages.
- **Vue / UniApp**: Vue2 → Vuex; Vue3 → Pinia.
- **Angular**: light RxJS + `BehaviorSubject` services; NgRx / Akita / Ngxs when complex.
- **React**: local hooks; Context for mid trees; Zustand / RTK / Jotai globally; TanStack Query / SWR for server data.

---

## 9. Performance & resources

- **Conditional render**: Vue/UniApp `v-if` / `v-show`; React mount vs CSS hide; Angular `*ngIf` / `[hidden]`—do not mix carelessly.
- **Lists**: virtualize / paginate large lists; stable keys (`key` / `trackBy`), not index keys.
- **Derived data**: `computed` / `useMemo` / `useCallback` / pure pipes—avoid new object/array props every render.
- **Cleanup**: Vue2 `beforeDestroy`; Vue3 `onBeforeUnmount`; UniApp `onUnload`; React effect cleanup; Angular `ngOnDestroy` + `takeUntil`.
- **Cancel**: pair intervals, listeners, sockets, subscriptions with cleanup; abort in-flight requests on unmount.
- **CD**: Angular `OnPush`; React avoid new prop objects each parent render; Vue avoid redeclaring huge objects without `ref`/`reactive`.

---

## 10. Multi-end & shells (summary)

- **UniApp**: manage H5 · mini-program · App via `pages.json` / `manifest.json` + `#ifdef`—do not assume full DOM everywhere.
- **Desktop WebView / Electron / Tauri**: history/hash, file protocol, and `base` follow the product repo.
- **Mobile / tablet**: touch targets, breakpoints, safe areas in **`DESIGN/DESIGN-{Tag}.md`**—do not assume desktop-only input.
- **Security**: do not trust URL params or `postMessage` / share payloads; XSS/CSP per project security rules.

---

## 11. Dev & commit flow (recommended)

- **HMR**: usual product edits need no restart; restart after build config / env name / root plugin changes.
- **Before merge**: run agreed `lint` / `typecheck` / `build`.

---

## 12. Quality & engineering gates (this language)

**Shared baseline** → `QualityBaseline.md`. Local landing:

| Area | Requirement |
|------|-------------|
| **Style tools** | ESLint + Prettier (+ Vue/React/Next/UniApp plugins); `tsc` / `vue-tsc`; one config set |
| **Commit gates** | Husky / lint-staged / pre-commit: format + lint + typecheck; same in CI |
| **Layout** | `pages|views` · `components` · `composables|hooks` · `api` · `stores` · `utils` · `types` · `config`; UniApp also `pages.json` · `static` · `uni_modules` |
| **APIs** | Unified request wrapper & errors; align backend envelope / codes; sync types & docs |
| **Types** | **TypeScript first**; public Props/APIs typed; null narrowing; boundary UI for errors |
| **Deps** | Commit lockfile; control third parties; periodic audit |
| **Tech debt** | Register `TODO` / `any` / bypasses; no ownerless temp code |
| **Maintainability** | Template section comments + critical `// puffseed：`; README covers start & map |

---

## 13. Pre-submit checklist

- [ ] New env vars typed
- [ ] Styles use project Tokens; no banned fallbacks
- [ ] Every `--fs-*` paired with matching `--lh-*`
- [ ] Event/callback naming matches team (Vue/UniApp kebab / React onXxx / Angular @Output)
- [ ] Side effects cleaned up
- [ ] Lists have stable key / trackBy
- [ ] No duplicated magic path strings (centralized in router / `pages.json`)
- [ ] Shell / multi-base / UniApp multi-end aligned with product routing & `#ifdef`
- [ ] Vue 2 version features confirmed
- [ ] React 18 / Next SSR·RSC boundaries confirmed
- [ ] UniApp pages registered; prefer `uni.*`; no DOM off H5
- [ ] Angular RxJS teardown + strict templates
- [ ] Critical template sections use `<!-- ... -->`
- [ ] Critical business logic annotated; keep **puffseed** marker
- [ ] QualityBaseline followed
- [ ] No untracked debt / temp code; public boundaries typed & validated
- [ ] Comments & layout support onboarding

---

## 14. Critical product comments (puffseed)

Comment **structure partitions and non-obvious business meaning**—not every line. For **puffseed** rules, auth, theme, etc., mark ownership (e.g. `// puffseed：sidebar highlight by route`).

### 14.1 Page / template

- Use HTML comments above layout / feature / drawer blocks: `<!-- section -->`.

```vue
<template>
  <div class="app-layout">
    <!-- Left nav -->
    <sidebar-layout ... />

    <!-- Right content -->
    <main-content-layout>
      <!-- Header -->
      ...
    </main-content-layout>
  </div>
</template>
```

### 14.2 Components

- Reusable components: brief role / slots / non-obvious props at script top or template head.
- Complex sub-blocks: same `<!-- ... -->` partitions.

### 14.3 Business logic (`<script>`)

- Annotate routing, state transitions, cross-module work, non-obvious branches with `// note` (see AGENTS.md §5).

```javascript
// Map current route path to sidebar highlight tab
const currentTab = computed(() => {
  return TAB_BY_ROUTE[route.path] || 'FunctionOverview';
});

// Detail title: branch copy by route path
const pageTitle = computed(() => { ... });
```

### 14.4 Writing principles

- Comment **what/why**, not literal code.
- **Must-comment paths**: entry dispatch, auth/theme, persistence, shell/preload boundaries.
- Utility modules: section comments at file top; `//` only where non-obvious.
- Keep comments in sync when adding pages or major layout changes.

---

## Split with `DESIGN/DESIGN-{Tag}.md`

| Topic | `CodingSpec.md` (this file) | `DESIGN/DESIGN-{Tag}.md` |
|------|------------------------------|-------------|
| AI coding mindset | `CodeConduct.md` | `CodeConduct.md` |
| Token names & palette roles | How to reference; ban magic numbers | Variable index, usage, UI patterns (values in `WebVariable/`) |
| Button/form look | Component split, state, a11y attrs | Color, spacing, type, state colors |
| Responsive | Layout & performance | Breakpoints, touch targets |
| Quality gates / debt | QualityBaseline + §12 | — |
