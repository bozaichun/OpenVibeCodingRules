# AI 应用开发 · 指南（VibeCoding）

本文件为 **AI 辅助前端应用开发** 的全局约定，供智能体与开发者在 VibeCoding 场景下协作时使用。

**适用范围**：原生 HTML + CSS + JavaScript、Vue 2 / Vue 3、React 18+、Angular 12+ 等浏览器端技术栈，以及 uTools 生态插件（React / Vue）。智能体须先识别**目标业务仓库**的项目模式与实际框架，再按对应章节执行；**以该仓库已定稿的实现方式为准**。

---

## 0. 项目模式识别（开发前必做）

执行任务前，先区分项目属于 **普通项目** 还是 **uTools 生态插件**：

| 模式 | 识别信号 | 支持技术栈 | 说明 |
|------|---------|-----------|------|
| **普通项目** | **无** `public/plugin.json` | 原生 HTML + CSS + JavaScript · Vue 2 / Vue 3 · React 18+ · Angular 12+ | 通用浏览器端应用 |
| **uTools 生态插件** | **存在** `public/plugin.json` | **仅** React · Vue（2 / 3） | uTools 插件模板；遵循 uTools 插件生命周期与 API |

**识别流程**

1. 检查目标仓库是否存在 `public/plugin.json`
2. 存在 → 按 **uTools 生态插件** 规范开发；不存在 → 按 **普通项目** 规范开发
3. 再识别具体框架（见 §1），选用 `CodingSpec.md` 对应章节

---

## 规范文件职责与选用场景

| 规范文件 | 职责 | 何时查阅 |
|---------|------|---------|
| `rules/CodeConduct.md` | AI 编码行为与变更心智（先问再做、最小 diff） | **任何编码任务开始前**；涉及范围判断、是否过度实现时 |
| `rules/CodingSpec.md` | 前端工程与代码规范（多框架差异、事件命名、性能、注释） | **编写或修改业务代码时**；需确认目录结构、命名、生命周期、自检项时 |
| `rules/DESIGN.md` | 界面设计规范（Token · 视觉 · 组件 · 布局模式） | **UI 布局、样式、组件视觉、主题、响应式**相关任务 |
| `rules/VariableFile/ThemeVariable.css` | 标准色板 + 文本色 Token | **新增/修改颜色、主题变量**时；禁止在组件内硬编码色值 |
| `rules/VariableFile/SystemVariable.css` | 间距、字号、图标尺寸、复合边框与阴影 | **调整间距、字号层级、阴影、边框线型**时 |
| `rules/VariableFile/ProjectReset.css` | 浏览器重置 + 根节点基础样式 | **全局 reset 或 html/body 基础行为**需变更时（慎改） |

**选用原则**

1. 行为与范围 → `CodeConduct.md`
2. 怎么写代码 → `CodingSpec.md`（按技术栈章节）
3. 长什么样 → `DESIGN.md` + VariableFile CSS
4. 色值与主题 → 只改 `ThemeVariable.css`；尺寸与排版 → `SystemVariable.css`
5. 三者（Conduct / CodingSpec / DESIGN）与 VariableFile 冲突时，以**目标业务仓库已定稿实现**为准

### 最小加载集（Token 节约）

按任务类型**只加载必要规范**，避免无关文件全文进入上下文：

| 任务类型 | 应加载 | 通常不必加载 |
|---------|--------|-------------|
| 纯逻辑 / 工具函数 | `AGENTS.md` · `CodeConduct.md` | `DESIGN.md` · VariableFile · PreView HTML |
| 编写 / 修改业务代码 | + `CodingSpec.md`（对应该框架 §） | `DESIGN.md`（无 UI 变更时） |
| UI 布局 / 组件视觉 | + `DESIGN.md` | PreView HTML 全文 |
| 改主题色 / 文本色 | + `ThemeVariable.css` | — |
| 改间距 / 字号 / 阴影 | + `SystemVariable.css` | — |
| 改全局 reset | + `ProjectReset.css`（慎改） | — |
| 深浅色视觉验收 | 浏览器打开 PreView HTML | 勿将 HTML 载入 AI 上下文 |

**开发者预览**（非运行时依赖）：`rules/PreView/LightDesignSpec.html` · `rules/PreView/DarkDesignSpec.html`

---

## 1. 框架识别与编码约定

执行任务前，先确认目标仓库的技术栈，再选用 `CodingSpec.md` 对应章节：

| 技术栈 | 识别信号 | 规范章节 |
|--------|---------|---------|
| 原生 HTML/CSS/JS | 无框架依赖、`index.html` 直引脚本 | §1.1 共性 · §4 样式 · §6 事件命名 |
| Vue 2 | `vue@2`、`Vue.extend` / Options API | CodingSpec §1.2 |
| Vue 3 | `vue@3`、`<script setup>`、`createApp` | CodingSpec §1.3 |
| React 18+ | `react`、`useState` / `useEffect` | CodingSpec §1.4 |
| Angular 12+ | `@Component`、`NgModule`、RxJS | CodingSpec §1.5 |

### 1.1 跨框架共性（摘自 CodingSpec）

- **语言**：TypeScript 优先；公共 API 须有明确类型。各仓库以自身为准；新增代码应跟随所在目录已有风格。
- **目录**：按业务域划分 `pages/`、`components/`、`utils/`；路由集中在 `router/`；避免路径魔法字符串散落。
- **事件命名**：
  - 业务处理函数：`handle` 前缀（`handleSubmit`、`handleOpenDialog`）
  - Vue 对外事件：kebab-case（`@color-copied`）
  - React 回调 prop：`onXxx` camelCase（`onSubmit`）
  - Angular：`@Output() submit = new EventEmitter()`
- **样式**：引用 CSS 变量 / Design Token，禁止在业务组件内硬编码整套色板；Vue 用 `scoped`，React 用 CSS Modules。
- **性能**：列表须提供稳定 `key` / `trackBy`；副作用在卸载时清理（`onUnmounted` / `useEffect cleanup` / `ngOnDestroy`）。
- **注释**：模板用 `<!-- 区块说明 -->`；关键业务逻辑用单行 `// 说明`（见 CodingSpec §13）。

---

## 2. 样式系统概览

涉及 **UI 布局、样式、组件视觉、主题色** 时，遵守 `rules/DESIGN.md`，Token 以 `rules/VariableFile/` 为准。

### 2.1 样式分层与 1:1 编写原则

| 层级 | 文件 / 位置 | 内容 | 可否在业务项目中重复定义 |
|------|-------------|------|------------------------|
| 主题 Token | `ThemeVariable.css` | 标准色板（`--primary`、`--success` 等）+ 文本色（`--title` 等） | **禁止** |
| 系统 Token | `SystemVariable.css` | `--size-*` 间距 · `--fs-*` 字号 · `--wh-*` 图标 · `--line` / `--shadow` 等 | **禁止** |
| 全局重置 | `ProjectReset.css` | 盒模型、`html`/`body` 基础重置 | **禁止** |
| 应用补充 | 各仓库入口 CSS（如 `src/main.css`） | 仅放应用级补充（如 `#app` 容器），不重复定义 Token | 按需 |
| 布局模块 | `layout/` 内各模块样式文件 | 侧栏、页头、内容区等布局级样式 | 仅布局模块内 |
| 页面模块 | `pages/` / `views/` 内样式 | 该页面专属样式 | 仅对应页面内 |
| 组件私有 | `<style scoped>` / CSS Modules | 该组件专属样式，引用 Token，不写裸色值 | 仅对应组件内 |

**1:1 原则**：组件样式仅在组件内编写；页面模块样式仅在对应页面内编写；布局样式仅在布局模块内编写。**全局 Token 与 reset 仅在 `rules/VariableFile/` 维护，业务项目不得擅自增改。**

**VariableFile 引入方式**（不在业务项目中复制 Token 源码）：

| 技术栈 | 引入位置 | 引入顺序 |
|--------|---------|---------|
| 原生 HTML/CSS/JS | `index.html` 中 `<link>` | ThemeVariable → SystemVariable → ProjectReset → 应用 CSS |
| Vue 2 / Vue 3 | `main.js` / `main.ts` 中 `import` | 同上 |
| React 18+ | `main.tsx` / `index.jsx` 中 `import` | 同上 |
| Angular 12+ | `angular.json` 的 `styles` 数组 | 同上 |

```javascript
// 框架入口示例（路径按实际仓库相对位置调整）
import "../rules/VariableFile/ThemeVariable.css";
import "../rules/VariableFile/SystemVariable.css";
import "../rules/VariableFile/ProjectReset.css";
import "./main.css";  // 应用级补充
```

### 2.2 主题变量要点（ThemeVariable.css）

| 类别 | 变量示例 | 用途 |
|------|---------|------|
| 标准色 | `--primary` · `--success` · `--warning` · `--info` · `--error` | 主题色与功能色（含 hover / active / bg / border 变体） |
| 辅助色 | `--hover` · `--border` · `--divider` · `--bg` · `--white` · `--black` | 通用界面底色与边框 |
| 文本色（浅底） | `--title` · `--main-text` · `--secondary-text` · `--disabled-text` | 浅色背景上的文字层级 |
| 文本色（深底） | `--title-dark` · `--main-text-dark` · `--secondary-text-dark` · `--disabled-text-dark` | 深色背景上的文字层级 |

### 2.3 系统变量要点（SystemVariable.css）

| 类别 | 变量示例 | 用途 |
|------|---------|------|
| 间距 | `--size-8` · `--size-16` · `--size-24` · `--size-40` | 元素间距、边距、模块间距 |
| 字号 | `--fs-12` · `--fs-14` · `--fs-16` · `--fs-20` | 辅助文字、正文、小标题、大标题 |
| 图标 | `--wh-16` · `--wh-24` · `--wh-32` | 字体图标、操作按钮 |
| 边框/阴影 | `--line` · `--solid` · `--shadow` · `--shadow-bottom` | 引用 `var(--border)`，随主题切换 |

### 2.4 Token 扩展原则

1. **语义命名**：`--primary-bg`、`--main-text`，而非裸 `#ffffff`
2. **集中维护**：扩展 Token 只写入 `rules/VariableFile/`，不在业务组件重复定义
3. **文本色分场景**：浅底用 `--title` 系列；深底用 `--title-dark` 系列
4. **禁止硬编码**主题色值于业务组件

### 2.5 规则拔插机制（可扩展样式套件）

当前默认样式套件为 **通用界面设计规范**，以以下文件为核心：

- `rules/VariableFile/ThemeVariable.css`
- `rules/VariableFile/SystemVariable.css`

开发者若需不同页面风格，可在 `rules/VariableFile/` **追加**扩展 CSS（如品牌主题、行业配色），并在业务入口按序引入，**不修改、不覆盖**上述核心文件。

| 角色 | 说明 |
|------|------|
| **核心套件**（默认启用） | `ThemeVariable.css` + `SystemVariable.css` + `ProjectReset.css` |
| **扩展套件**（按需拔插） | 开发者自行在 `rules/VariableFile/` 或 `rules/Extensions/` 新增 CSS，入口 `import` / `<link>` 追加即可 |
| **AI 约束** | 未明确要求启用扩展套件时，**仅使用核心套件**；不得擅自创建或修改扩展文件 |

扩展套件命名建议：`BrandTheme.css`、`IndustryColors.css` 等，并在仓库 README 或注释中说明启用方式。

---

## 3. AI 编码行为规范

遵守 `rules/CodeConduct.md` 核心心智：

1. **先思考，再编码**：明确假设、列出解读、不确定时提问
2. **简洁优先**：最少代码解决问题，不做推测性工作
3. **精准修改**：只动必须动的部分，匹配已有风格
4. **目标驱动**：定义成功标准并验证

---

## 4. 各框架落地方式对照

> 按目标仓库实际框架选用对应列，勿强行套用某一框架语法。

| 场景 | Vue 3 | React 18+ | Angular 12+ | 原生 JS |
|------|-------|-----------|-------------|---------|
| 组件定义 | `<script setup>` SFC | 函数组件 + Hooks | `@Component` + 模板 | 函数 + DOM API |
| 路由 | `vue-router` Hash | React Router | `RouterModule` | History / Hash 手写 |
| 状态 | `ref` / `computed` | `useState` / `useMemo` | Service + RxJS | 模块级变量 + 事件 |
| 样式 | SCSS scoped | CSS Modules | 组件 SCSS | CSS 类名 + 变量 |
| 列表渲染 | `v-for` + `:key` | `.map()` + `key` | `*ngFor` + `trackBy` | `forEach` + 模板字符串 |
| 全局 Token | `main.ts` import VariableFile | `main.tsx` import | `angular.json` styles | `<link>` in HTML |

---

## 5. 业务注释规范（详见 CodingSpec §13）

- **模板**：`<!-- 区块说明 -->`（如 `<!-- 页头操作区 -->`）
- **Script 关键路径**：单行 `// 说明`（路由分发、持久化、跨模块协作）
- **工具模块**：文件顶部分节说明职责
- **原则**：只注释「做什么 / 为什么」，不重复代码字面含义；完整示例与书写原则见 **`CodingSpec.md` §13**

---

## 6. 自检清单（提交前 · CodingSpec §12）

- [ ] 已识别项目模式（普通项目 / uTools 生态插件）
- [ ] VariableFile 已在入口引入，未在业务项目中重复定义 Token
- [ ] 样式 1:1：组件 / 页面 / 布局样式各在其作用域内
- [ ] 事件/回调命名符合框架约定
- [ ] 样式使用项目 Token，无违规硬编码
- [ ] 副作用与监听器已清理
- [ ] 列表渲染已提供稳定 key / trackBy
- [ ] 路由与配置路径无重复魔法字符串
- [ ] 页面模板关键区块已有分区注释
- [ ] UI 视觉正常（可对照 `rules/PreView/` 预览页）

---

## 7. 开发与调试

| 场景 | 操作 |
|------|------|
| 本地开发 | `npm run dev` → http://localhost:5173 |
| 生产构建 | `npm run build` → `dist/` |
| Token 视觉预览 | 浏览器打开 `rules/PreView/LightDesignSpec.html` 或 `DarkDesignSpec.html` |
| uTools 调试 | 开发者工具 → 插件开发 → 加载项目目录 |

---

*最后同步：rules/DESIGN.md · rules/CodingSpec.md · rules/CodeConduct.md · rules/VariableFile/ · rules/PreView/*
