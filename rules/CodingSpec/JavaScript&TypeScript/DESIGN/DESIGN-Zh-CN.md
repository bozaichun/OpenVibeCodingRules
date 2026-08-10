---
description: UI 布局、样式、组件视觉、主题与响应式相关任务时查阅（跨浏览器端技术栈 · VibeCoding）
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

# 界面设计规范（VibeCoding · puffseed）

> **用途**：智能体在目标业务仓库中编写 UI 时的**设计规范来源**（**puffseed** 前端视觉体系）。  
> **适用范围**：原生 HTML + CSS + JavaScript、Vue 2 / Vue 3、React 18+、**Next.js**、**UniApp**、Angular 12+ 等技术栈，以及 uTools 生态插件（React / Vue）。  
> **执行原则**：先识别目标仓库的项目模式（见 `AGENTS.md` §0）与实际框架，再按对应章节落地。预览页与品牌文案保持 **puffseed** / **puffseed-ui** 标识。

---

## 1. 设计定位（通用）

| 维度 | 说明 |
|------|------|
| 视觉风格 | 简洁工具风 · 语义化 Token · 卡片化布局 |
| 设计哲学 | 信息密度适中 · 内容可读优先 · 深浅色一致体验 |
| Token 原则 | 禁止在业务组件硬编码主题色；一律引用 CSS 变量 |
| 样式隔离 | 组件样式在组件内 · 页面样式在页面内 · 全局 Token 在 `rules/CodingSpec/JavaScript&TypeScript/WebVariable/` |

各仓库的具体色值、布局尺寸以 **Token 源码** 与 **预览 HTML** 为准，勿在规范中机械复制裸色值。

---

## 2. CSS 架构与 Token 体系

### 2.1 样式分层（跨框架）

```
rules/CodingSpec/JavaScript&TypeScript/WebVariable/     # 设计 Token 与全局重置（唯一维护处，业务项目不重复定义）
  ThemeVariable.css     # 主题色 / 文本色
  SystemVariable.css    # 间距 / 字号 / 阴影等系统变量
  ProjectReset.css      # 浏览器重置 + 根节点基础样式
src/ 或 app/            # 框架入口引入上述 CSS
layout/                 # 布局级样式（仅布局模块内）
components/             # 可复用组件（scoped / CSS Modules）
pages/ 或 views/        # 页面级样式（仅对应页面内）
```

| 技术栈 | 全局 CSS 引入方式 | 组件样式隔离 |
|--------|------------------|-------------|
| 原生 HTML/CSS/JS | `<link>` 于 `index.html` | BEM / 页面级 `<style>` |
| Vue 2 / Vue 3 | 入口 `main.js` / `main.ts` 中 `import` | `<style scoped>` / SCSS scoped |
| UniApp | `App.vue` / `uni.scss` 或入口引入；小程序端注意 CSS 变量支持 | 页面/组件样式 + `rpx`；条件编译样式 |
| React 18+ | `index.jsx` / `main.tsx` 中 `import` | CSS Modules / styled-components |
| Angular 12+ | `angular.json` `styles` 数组 | 组件 `styleUrls` + `:host` |

**1:1 原则**：组件样式仅在组件内编写；页面模块样式仅在对应页面内编写；布局样式仅在布局模块内编写。**禁止**在业务组件中硬编码魔法色；一律引用 CSS 变量。**禁止**在业务项目中重复定义已在 WebVariable 中的 Token。

### 2.2 Token 源码位置与引入

| 文件 | 职责 |
|------|------|
| `rules/CodingSpec/JavaScript&TypeScript/WebVariable/ThemeVariable.css` | **主题色与文本色**（唯一维护处） |
| `rules/CodingSpec/JavaScript&TypeScript/WebVariable/SystemVariable.css` | 间距、布局、字号、图标尺寸、复合边框/阴影 |
| `rules/CodingSpec/JavaScript&TypeScript/WebVariable/ProjectReset.css` | 全局重置、`html`/`body` 基础样式 |

入口引入顺序：

```javascript
import "../rules/CodingSpec/JavaScript&TypeScript/WebVariable/ThemeVariable.css";
import "../rules/CodingSpec/JavaScript&TypeScript/WebVariable/SystemVariable.css";
import "../rules/CodingSpec/JavaScript&TypeScript/WebVariable/ProjectReset.css";
import "./main.css";  // 应用级补充（如 #app）
```

扩展 Token 时：**主题色/文本色** 写入 `ThemeVariable.css`；**尺寸/间距/布局** 写入 `SystemVariable.css`；**重置规则** 仅在确有全局需求时改 `ProjectReset.css`。

### 2.3 规则拔插机制

当前默认启用 **通用界面设计规范**（`ThemeVariable.css` + `SystemVariable.css`）。开发者若需不同风格，可在 `rules/CodingSpec/JavaScript&TypeScript/WebVariable/` 或 `rules/CodingSpec/JavaScript&TypeScript/Extensions/` **追加**扩展 CSS 并在入口引入，**不修改核心文件**。详见 `AGENTS.md` §2.5。

### 2.4 核心变量索引

色值以 **`rules/CodingSpec/JavaScript&TypeScript/WebVariable/ThemeVariable.css`** 为唯一源码；间距/字号/复合边框以 **`SystemVariable.css`** 为准。视觉对照在浏览器打开 **`rules/CodingSpec/JavaScript&TypeScript/PreView/LightDesignSpec.html`** · **`DarkDesignSpec.html`**（勿将预览 HTML 全文载入 AI 上下文）。

下表仅列**变量名与用途**，不复制 hex。

#### 主题色与文本色（ThemeVariable.css）

| 类别 | 变量 | 用途 |
|------|------|------|
| 标准色 | `--primary` · `--primary-hover` · `--primary-active` · `--primary-bg` · `--primary-border` | 主题色及变体 |
| 功能色 | `--success` · `--warning` · `--info` · `--error`（各含 hover/active/bg/border） | 状态反馈 |
| 辅助色 | `--hover` · `--border` · `--divider` · `--bg` · `--white` · `--black` | 通用界面底色与边框 |
| 文本（浅底） | `--title` · `--main-text` · `--secondary-text` · `--disabled-text` | 浅色背景文字层级 |
| 文本（深底） | `--title-dark` · `--main-text-dark` · `--secondary-text-dark` · `--disabled-text-dark` | 深色背景文字层级 |

#### 系统尺寸（SystemVariable.css）

| 类别 | 变量示例 | 用途 |
|------|---------|------|
| 间距 | `--size-8` · `--size-16` · `--size-24` · `--size-40` | 元素/模块/页面边距 |
| 布局 | `--layout-header` · `--layout-footer` · `--layout-aside` · `--layout-content` | 页头/页脚/侧栏/版心 |
| 字号 | `--fs-12` · `--fs-14` · `--fs-16` · `--fs-20` | 辅助/正文/小标题/大标题 |
| 图标 | `--wh-16` · `--wh-24` · `--wh-32` | 图标与操作按钮尺寸 |
| 复合边框/阴影 | `--line` · `--solid` · `--shadow` · `--shadow-bottom` | 引用 `var(--border)` |

色值等宽展示：`font-family: 'SF Mono', Consolas, Monaco, monospace`

---

## 3. 视觉参考

| 资源 | 说明 |
|------|------|
| `rules/CodingSpec/JavaScript&TypeScript/PreView/LightDesignSpec.html` | 浅色模式 Token 与组件预览 |
| `rules/CodingSpec/JavaScript&TypeScript/PreView/DarkDesignSpec.html` | 深色模式 Token 与组件预览 |

预览页通过 `<link>` 引入 `ThemeVariable.css` 与 `SystemVariable.css`，色板区展示十六进制速查，组件区按变量渲染。

---

## 4. 常用 UI 模式（跨框架 CSS）

### 4.1 面板卡片

```scss
.panel {
  background: var(--white);
  border: var(--solid);
  border-radius: var(--size-8);
  padding: var(--size-20);
  box-shadow: var(--shadow);
}
```

### 4.2 主 / 次按钮

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

### 4.3 代码块

```scss
.code-block {
  background: #1e1e2e;  /* 固定深色代码底，深浅模式通用 */
  color: #cdd6f4;
  padding: var(--size-20);
  border-radius: var(--size-8);
  font-family: 'SF Mono', Consolas, Monaco, monospace;
}
```

### 4.4 过渡动效

交互态统一：`transition: ... 0.15s~0.2s ease`

---

## 5. 各框架样式落地对照

| 场景 | Vue 3 | UniApp | React 18+ / Next.js | Angular 12+ | 原生 JS |
|------|-------|--------|---------------------|-------------|---------|
| 全局 Token | `main.ts` import WebVariable | `App.vue` / `uni.scss` 映射 | 入口 / 根 layout import | `angular.json` styles | `<link>` in HTML |
| 组件样式 | SCSS scoped | 页面/组件样式 + rpx | CSS Modules | 组件 SCSS + `:host` | 页面 CSS / BEM |
| 动态样式 | `:style` / class 绑定 | `:style` / class + `#ifdef` | `style` / `className` | `[ngStyle]` / `[class]` | `element.style` / classList |

---

## 6. VibeCoding 编码规则

### 6.1 必须做

1. **Token 优先**：颜色、圆角、阴影使用 WebVariable 变量
2. **样式 1:1**：组件 / 页面 / 布局样式各在其作用域内
3. **过渡**：`transition: ... 0.15s~0.2s ease`
4. **组件样式隔离**：Vue scoped / React CSS Modules / Angular 组件样式，避免污染全局
5. **框架约定**：业务处理函数 `handle` 前缀；副作用在卸载时清理

### 6.2 禁止做

1. 硬编码主题色值（代码块固定深色底除外）
2. 在业务组件或项目中重复定义已在 WebVariable 中的 Token
3. 绕过已定稿的全局 CSS 架构私自引入第二套色板
4. 擅自修改 `rules/CodingSpec/JavaScript&TypeScript/WebVariable/` 核心文件（扩展套件除外且须开发者明确要求）

### 6.3 新建页面 Checklist

- [ ] WebVariable 已在入口引入
- [ ] 页面样式仅在对应页面文件内
- [ ] 复用组件样式在组件内，引用 Token
- [ ] 640px 断点布局正常
- [ ] 深浅色 / 深浅背景下 Token 对比度正常

---

*最后同步：`rules/CodingSpec/JavaScript&TypeScript/WebVariable/` · `AGENTS.md` · `rules/CodingSpec/JavaScript&TypeScript/PreView/`*
