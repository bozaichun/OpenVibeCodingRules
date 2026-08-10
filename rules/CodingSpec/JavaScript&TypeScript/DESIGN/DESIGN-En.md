<!-- ovcr-locale-lock -->
---
description: Consult for UI layout, styles, component visuals, theme, and responsive work (cross browser stacks · VibeCoding)
globs:
  - "**/*.vue"
  - "**/*.scss"
  - "**/*.less"
  - "src/**/*.css"
  - "**/layout/**"
  - "**/components/**"
  - "**/pages/**"
alwaysApply: false
---

# UI design spec (VibeCoding · puffseed)

> **Purpose**: Design source for agents building UI in the product repo (**puffseed** frontend visual system).  
> **Scope**: Vanilla HTML + CSS + JavaScript, Vue 2 / Vue 3, React 18+, **Next.js**, **UniApp**, Angular 12+, and uTools plugins (React / Vue).  
> **Rule**: Detect project mode (`AGENTS.md` §0) and framework first, then apply the matching sections. Keep **puffseed** / **puffseed-ui** in preview and brand copy.

---

## 1. Design positioning (shared)

| Dimension | Notes |
|------|------|
| Visual style | Clean tool UI · semantic Tokens · card layouts |
| Philosophy | Moderate density · readability first · light/dark parity |
| Token rule | Never hard-code theme colors in product components; always use CSS variables |
| Style isolation | Component styles in the component · page styles in the page · global Tokens in `rules/CodingSpec/JavaScript&TypeScript/WebVariable/` |

Concrete colors and spacing come from **Token source** and **preview HTML** — do not mechanically copy hex values into this doc.

---

## 2. CSS architecture & Token system

### 2.1 Style layers (cross-framework)

```
rules/CodingSpec/JavaScript&TypeScript/WebVariable/     # design Tokens + global reset (single source; do not redefine in apps)
  ThemeVariable.css     # theme / text colors
  SystemVariable.css    # spacing / type / shadows
  ProjectReset.css      # browser reset + root basics
src/ or app/            # framework entry imports the CSS above
layout/                 # layout-only styles
components/             # reusable components (scoped / CSS Modules)
pages/ or views/        # page-only styles
```

| Stack | Global CSS entry | Component isolation |
|--------|------------------|-------------|
| Vanilla HTML/CSS/JS | `<link>` in `index.html` | BEM / page `<style>` |
| Vue 2 / Vue 3 | `import` in `main.js` / `main.ts` | `<style scoped>` / SCSS scoped |
| UniApp | `App.vue` / `uni.scss` or entry import; watch CSS vars on mini programs | page/component styles + `rpx`; conditional styles |
| React 18+ | `import` in `index.jsx` / `main.tsx` | CSS Modules / styled-components |
| Angular 12+ | `angular.json` `styles` | component `styleUrls` + `:host` |

**1:1 rule**: component styles only inside the component; page styles only in that page; layout styles only in layout. **No** magic colors in product components — use CSS variables. **No** redefining Tokens already in WebVariable.

### 2.2 Token sources & import

| File | Role |
|------|------|
| `rules/CodingSpec/JavaScript&TypeScript/WebVariable/ThemeVariable.css` | **Theme & text colors** (single source) |
| `rules/CodingSpec/JavaScript&TypeScript/WebVariable/SystemVariable.css` | Spacing, layout, type, icon sizes, border widths, composite borders/shadows |
| `rules/CodingSpec/JavaScript&TypeScript/WebVariable/ProjectReset.css` | Global reset, `html`/`body` basics |

Import order:

```javascript
import "../rules/CodingSpec/JavaScript&TypeScript/WebVariable/ThemeVariable.css";
import "../rules/CodingSpec/JavaScript&TypeScript/WebVariable/SystemVariable.css";
import "../rules/CodingSpec/JavaScript&TypeScript/WebVariable/ProjectReset.css";
import "./main.css";  // app extras (e.g. #app)
```

When extending Tokens: **colors** → `ThemeVariable.css`; **size/spacing/layout** → `SystemVariable.css`; **reset** → `ProjectReset.css` only when truly global.

### 2.3 Plug-in styles

Default stack is **ThemeVariable.css + SystemVariable.css**. For alternate brands, **append** CSS under `WebVariable/` or `Extensions/` and import after the core trio — **do not edit core files**. See `AGENTS.md` §2.5.

### 2.4 Core variable index

Colors: **`ThemeVariable.css`**. Spacing/layout/type/borders: **`SystemVariable.css`**. Visual check: open **`PreView/LightDesignSpec.html`** · **`DarkDesignSpec.html`** (do not dump full HTML into AI context).

Table lists **names and use**, not hex.

#### Theme & text (ThemeVariable.css)

| Category | Variables | Use |
|------|------|------|
| Brand | `--primary` · `--primary-hover` · `--primary-active` · `--primary-bg` · `--primary-border` | Theme and variants |
| Status | `--success` · `--warning` · `--info` · `--error` (each with hover/active/bg/border) | Feedback |
| Utility | `--hover` · `--border` · `--divider` · `--bg` · `--white` · `--black` | Surfaces and borders |
| Text (light) | `--title` · `--main-text` · `--secondary-text` · `--disabled-text` | Light backgrounds |
| Text (dark) | `--title-dark` · `--main-text-dark` · `--secondary-text-dark` · `--disabled-text-dark` | Dark backgrounds |

#### System sizes (SystemVariable.css)

| Category | Examples | Use |
|------|---------|------|
| Spacing | `--size-8` · `--size-16` · `--size-24` · `--size-48` | Element / module / unit spacing |
| Layout | `--layout-header` · `--layout-footer` · `--layout-aside` · `--layout-content` | Header / footer / aside / content width |
| Type | `--fs-12` · `--fs-14` · `--fs-16` · `--fs-20` | Helper / body / small / large titles |
| Icons | `--wh-16` · `--wh-24` | Icons and action buttons |
| Border width | `--border-fine` · `--border-1` | Border width scale |
| Borders/shadows | `--line` · `--solid` · `--shadow` · `--shadow-bottom` | Uses `var(--border)` |

Monospace for hex samples: `font-family: 'SF Mono', Consolas, Monaco, monospace`

---

## 3. Visual references

| Asset | Notes |
|------|------|
| `.../PreView/LightDesignSpec.html` | Light Token & component preview |
| `.../PreView/DarkDesignSpec.html` | Dark Token & component preview |

Previews `<link>` ThemeVariable + SystemVariable; swatches show hex; components render via variables.

---

## 4. Common UI patterns (cross-framework CSS)

### 4.1 Panel card

```scss
.panel {
  background: var(--white);
  border: var(--solid);
  border-radius: var(--size-8);
  padding: var(--size-20);
  box-shadow: var(--shadow);
}
```

### 4.2 Primary / secondary buttons

```scss
.primary-btn {
  background: var(--primary);
  color: var(--white);
  border: var(--solid);
  border-color: var(--primary);
  border-radius: var(--size-8);
}

.secondary-btn {
  background: var(--white);
  color: var(--title);
  border: var(--solid);
}
```

### 4.3 Code block

```scss
.code-block {
  background: #1e1e2e;  /* fixed dark code surface for both themes */
  color: #cdd6f4;
  padding: var(--size-20);
  border-radius: var(--size-8);
  font-family: 'SF Mono', Consolas, Monaco, monospace;
}
```

### 4.4 Transitions

Interaction: `transition: ... 0.15s~0.2s ease`

---

## 5. Framework style mapping

| Scene | Vue 3 | UniApp | React 18+ / Next.js | Angular 12+ | Vanilla JS |
|------|-------|--------|---------------------|-------------|---------|
| Global Tokens | `main.ts` import WebVariable | `App.vue` / `uni.scss` | entry / root layout import | `angular.json` styles | `<link>` in HTML |
| Component styles | SCSS scoped | page/component + rpx | CSS Modules | component SCSS + `:host` | page CSS / BEM |
| Dynamic styles | `:style` / class binding | `:style` / class + `#ifdef` | `style` / `className` | `[ngStyle]` / `[class]` | `element.style` / classList |

---

## 6. VibeCoding rules

### 6.1 Must

1. **Tokens first**: colors, radii, shadows from WebVariable
2. **1:1 styles**: component / page / layout each in their scope
3. **Transitions**: `0.15s~0.2s ease`
4. **Isolation**: Vue scoped / React CSS Modules / Angular component styles
5. **Conventions**: `handle` prefix for handlers; clean up effects on unmount

### 6.2 Must not

1. Hard-code theme colors (except fixed dark code surfaces)
2. Redefine WebVariable Tokens in product code
3. Introduce a second palette outside the settled CSS architecture
4. Edit core `WebVariable/` files unless the developer explicitly asks for an extension

### 6.3 New page checklist

- [ ] WebVariable imported at entry
- [ ] Page styles only in that page file
- [ ] Shared component styles use Tokens
- [ ] Layout OK at 640px
- [ ] Contrast OK on light/dark surfaces

---

*Last sync: `rules/CodingSpec/JavaScript&TypeScript/WebVariable/` · `AGENTS.md` · `PreView/`*
