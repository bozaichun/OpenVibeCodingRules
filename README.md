# OpenCodeRules

遵循 OpenCodeRules 规范消除 AI 编码痕迹，自定义专属设计风格，适配个人 / 团队 / 国企海外项目，支持网页、后台系统与 VibeCoding 爱好者开发。

---

## 这是什么

OpenCodeRules 是一套面向 **AI 辅助前端开发（VibeCoding）** 的规范仓库，包含：

- **行为准则**：控制 AI 如何思考、如何改代码（`rules/CodeConduct.md`）
- **工程规范**：多框架编码约定（`rules/CodingSpec.md`）
- **设计规范**：Token、布局、组件视觉（`rules/DESIGN.md`）
- **样式变量**：主题色、间距、字号、阴影等 CSS 变量（`rules/VariableFile/`）
- **视觉预览**：浏览器可直接打开的规范预览页（`rules/PreView/`）

适用于：原生 HTML、Vue 2/3、React 18+、Angular 12+，以及 [uTools 生态插件](https://www.u-tools.cn/docs/developer/basic/getting-started.html)（React / Vue）。

---

## 使用说明

1. **新手使用前，请仔细阅读本使用说明文档**（`README.md`），了解规范目录结构、引入方式与 AI 协作约定后再开始开发。
2. **将本仓库中的 `rules/` 文件夹与 `AGENTS.md` 复制到你的业务项目根目录**（例如 `demo/` 文件夹），保持相对路径不变。示例目录结构如下：

```
demo/                                  # 你的业务项目根目录
├── AGENTS.md                          # 从 OpenCodeRules 复制 · AI 全局入口指南
├── rules/                             # 从 OpenCodeRules 复制 · 规范与样式 Token
│   ├── CodeConduct.md
│   ├── CodingSpec.md
│   ├── DESIGN.md
│   ├── VariableFile/
│   └── PreView/
├── src/                               # 你的业务源码（示例）
├── package.json
└── ...
```

项目开发前，向 AI 发起任务时建议说明：

> 请根据 AGENTS.md 进行编码开发。

---

## 目录结构

```
OpenCodeRules/
├── AGENTS.md                          # AI 全局入口指南（优先阅读）
├── README.md                          # 本文件 · 使用说明
├── rules/
│   ├── CodeConduct.md                 # AI 编码行为准则
│   ├── CodingSpec.md                  # 前端工程与代码规范
│   ├── DESIGN.md                      # 界面设计规范
│   ├── VariableFile/
│   │   ├── ThemeVariable.css          # 主题色 · 文本色 Token
│   │   ├── SystemVariable.css         # 间距 · 字号 · 阴影 Token
│   │   └── ProjectReset.css           # 全局 reset
│   └── PreView/
│       ├── LightDesignSpec.html       # 浅色规范预览
│       └── DarkDesignSpec.html        # 深色规范预览
└── LICENSE
```

---

## 快速开始

### 1. 引入到你的项目

**方式 A：复制规范目录（推荐）**

将本仓库中的 `AGENTS.md` 与 `rules/` 目录复制到你的业务项目根目录，保持相对路径不变。

**方式 B：Git Submodule / 子目录引用**

```bash
git submodule add <本仓库地址> rules/OpenCodeRules
```

业务项目中引用路径按实际位置调整即可。

### 2. 在业务项目中引入样式 Token

全局样式**不要复制** VariableFile 源码，只在入口引入：

**原生 HTML**

```html
<link rel="stylesheet" href="./rules/VariableFile/ThemeVariable.css" />
<link rel="stylesheet" href="./rules/VariableFile/SystemVariable.css" />
<link rel="stylesheet" href="./rules/VariableFile/ProjectReset.css" />
```

**Vue 3（`main.ts`）**

```typescript
import './rules/VariableFile/ThemeVariable.css'
import './rules/VariableFile/SystemVariable.css'
import './rules/VariableFile/ProjectReset.css'
import './main.css'
```

**React 18+（`main.tsx`）**

```tsx
import './rules/VariableFile/ThemeVariable.css'
import './rules/VariableFile/SystemVariable.css'
import './rules/VariableFile/ProjectReset.css'
import './index.css'
```

引入顺序固定：**ThemeVariable → SystemVariable → ProjectReset → 应用级 CSS**。

### 3. 在 Cursor / AI IDE 中启用

1. 确保项目根目录存在 `AGENTS.md`（Cursor 会自动识别为 Agent 指南）
2. `rules/CodeConduct.md` 已配置 `alwaysApply: true`，AI 编码时会默认遵守
3. 按需将 `rules/CodingSpec.md`、`rules/DESIGN.md` 加入 Cursor Rules，或通过 `@` 引用相关文件

向 AI 发起任务时，建议开头说明：

> 请遵循本项目 `AGENTS.md` 与 `rules/` 规范；先识别项目模式与技术栈，再编码。

---

## 给开发者的使用指南

### 识别项目模式

| 模式 | 判断方式 | 支持技术栈 |
|------|---------|-----------|
| 普通项目 | 无 `public/plugin.json` | 原生 HTML · Vue · React · Angular |
| uTools 生态插件 | 存在 `public/plugin.json` | 仅 React · Vue |

详见 `AGENTS.md` §0。

### 样式编写原则（1:1）

| 样式类型 | 写在哪里 | 禁止 |
|---------|---------|------|
| 全局 Token | `rules/VariableFile/` | 在业务组件内重复定义 |
| 布局样式 | `layout/` 对应模块 | 写到组件或页面里 |
| 页面样式 | 对应 `pages/` / `views/` | 写到其他页面或全局 |
| 组件样式 | 组件内（scoped / CSS Modules） | 污染全局、硬编码色值 |

业务代码中一律使用 CSS 变量，例如：

```css
.card {
  background: var(--white);
  border: var(--solid);
  padding: var(--size-16);
  color: var(--title);
}
```

### 修改主题与尺寸

| 需求 | 修改文件 |
|------|---------|
| 改主题色、功能色、文本色 | `rules/VariableFile/ThemeVariable.css` |
| 改间距、字号、阴影 | `rules/VariableFile/SystemVariable.css` |
| 改全局 reset | `rules/VariableFile/ProjectReset.css`（慎改） |

修改后，用浏览器打开 `rules/PreView/LightDesignSpec.html` 或 `DarkDesignSpec.html` 对照验收。

### 自定义品牌风格（规则拔插）

若默认 Token 不满足需求，可在 `rules/VariableFile/` 或 `rules/Extensions/` **新增**扩展 CSS（如 `BrandTheme.css`），在入口追加引入，**不要修改**核心 VariableFile。

---

## 给 VibeCoding 爱好者的使用指南

### 向 AI 提需求时的推荐写法

**✅ 好的示例**

- 「按 `AGENTS.md` 规范，用 Vue 3 做一个用户列表页，样式引用 VariableFile Token」
- 「只改 `ThemeVariable.css` 的主色为 `#0052d9`，并同步检查 PreView 预览页」
- 「这是 uTools 插件项目（有 `public/plugin.json`），用 React 实现设置页」

**❌ 避免的写法**

- 「随便写个页面，好看就行」（缺少规范约束，易产生 AI 痕迹）
- 「把所有颜色写死在组件里」（违反 Token 原则）
- 「帮我在每个组件里重新定义一套 CSS 变量」（重复定义 Token）

### AI 应加载哪些规范（省 Token）

| 任务类型 | 让 AI 阅读 |
|---------|-----------|
| 纯逻辑 / 工具函数 | `AGENTS.md` + `CodeConduct.md` |
| 写业务代码 | + `CodingSpec.md`（对应框架章节） |
| UI / 样式 | + `DESIGN.md` + 相关 VariableFile |
| 改主题色 | + `ThemeVariable.css` |
| 改间距字号 | + `SystemVariable.css` |
| 视觉验收 | 浏览器打开 PreView HTML（勿把 HTML 全文喂给 AI） |

完整对照表见 `AGENTS.md`「最小加载集」。

### 提交前自检

开发完成后，对照 `AGENTS.md` §6 自检清单逐项确认，重点包括：

- [ ] 已识别项目模式（普通 / uTools）
- [ ] VariableFile 已在入口引入
- [ ] 无硬编码主题色
- [ ] 组件 / 页面 / 布局样式各在其作用域内

---

## 视觉预览

在浏览器中直接打开（无需启动服务）：

| 文件 | 说明 |
|------|------|
| `rules/PreView/LightDesignSpec.html` | 浅色模式 · 色板、字号、按钮、卡片、间距等 |
| `rules/PreView/DarkDesignSpec.html` | 深色模式 · 同上结构 |

预览页通过 `<link>` 引入 `ThemeVariable.css` 与 `SystemVariable.css`，修改 Token 后刷新即可查看效果。

---

## 规范文件速查

| 文件 | 何时查阅 |
|------|---------|
| `AGENTS.md` | 任何 AI 协作任务开始前 |
| `rules/CodeConduct.md` | 判断范围、避免过度实现 |
| `rules/CodingSpec.md` | 写代码、目录结构、命名、生命周期 |
| `rules/DESIGN.md` | UI 布局、组件视觉、主题 |
| `rules/VariableFile/*.css` | 改色值、间距、reset |

**优先级**：行为与范围 → `CodeConduct.md` · 怎么写 → `CodingSpec.md` · 长什么样 → `DESIGN.md` + VariableFile。

---

## 常见问题

**Q：规范目录必须叫 `rules/` 吗？**  
A：建议保持默认结构，便于 AI 与文档路径一致。若改名，需同步更新 `AGENTS.md` 与入口 `import` 路径。

**Q：可以把 VariableFile 内容复制到 `src/styles/` 吗？**  
A：不建议。应通过入口 `import` / `<link>` 引用，保证 Token 单一维护源。

**Q：团队有自己的设计系统怎么办？**  
A：使用「规则拔插机制」追加扩展 CSS，或在 VariableFile 中按团队规范定制（建议 fork 本仓库维护团队版本）。

**Q：AI 没有遵守规范怎么办？**  
A：在对话中显式 `@AGENTS.md` 或 `@CodeConduct.md`；检查 Cursor Rules 是否启用；任务描述中写明「遵循 OpenCodeRules，最小 diff」。

---

## 许可证

见 [LICENSE](./LICENSE)。
