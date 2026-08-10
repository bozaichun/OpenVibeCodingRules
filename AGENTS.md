<a id="ovcr-lang"></a>

> **Language / 语言**：[简体中文](./AGENTS.md#ovcr-lang) · [繁體中文](./rules/AGENTS/AGENTS.zh-TW.md#ovcr-lang) · [English](./rules/AGENTS/AGENTS.en.md#ovcr-lang) · [Русский](./rules/AGENTS/AGENTS.ru.md#ovcr-lang) · [日本語](./rules/AGENTS/AGENTS.ja.md#ovcr-lang)

# AI 应用开发 · 指南（VibeCoding · puffseed）

本文件为 **AI 辅助多语言应用开发** 的全局约定，供智能体与开发者在 VibeCoding / **puffseed** 业务场景下协作时使用。

**规范定位**：支持 **多语言、多主流技术框架** 的 AI 辅助编程（覆盖全球热门语言与主流业务栈），涵盖：

| 语言 / 运行时 | 主流框架 / 场景 | 规范目录 |
|--------------|----------------|---------|
| **JavaScript & TypeScript**（前端） | Vue、React、Next.js、**UniApp** | `rules/CodingSpec/JavaScript&TypeScript/` |
| **Node.js**（后端） | NestJS、Express | `rules/CodingSpec/Node.js/` |
| **Python** | FastAPI、Django | `rules/CodingSpec/Python/` |
| **Java** | Spring Boot | `rules/CodingSpec/Java/` |
| **Go** | Gin | `rules/CodingSpec/Go/` |
| **PHP** | Laravel | `rules/CodingSpec/PHP/` |
| **C** | 系统 / 嵌入式 / C ABI | `rules/CodingSpec/C/` |
| **C++** | 现代 C++ · CMake / Qt | `rules/CodingSpec/C++/` |
| **C#** | ASP.NET Core · .NET | `rules/CodingSpec/CSharp/` |
| **Rust** | Axum / Actix · Tokio | `rules/CodingSpec/Rust/` |
| **SQL** | PostgreSQL / MySQL / SQL Server | `rules/CodingSpec/SQL/` |
| **R** | tidyverse / Shiny | `rules/CodingSpec/R/` |
| **Kotlin** | Ktor / Spring / Android | `rules/CodingSpec/Kotlin/` |
| **Swift** | SwiftUI / Vapor | `rules/CodingSpec/Swift/` |
| **Dart** | Flutter | `rules/CodingSpec/Dart/` |
| **Ruby** | Rails | `rules/CodingSpec/Ruby/` |
| **Scala** | Play / http4s / ZIO | `rules/CodingSpec/Scala/` |
| **Shell** | Bash / POSIX 脚本 | `rules/CodingSpec/Shell/` |

智能体须先识别**目标业务仓库**的语言与框架，再加载对应 `CodingSpec`；**以该仓库已定稿的实现方式为准**。涉及业务域命名、注释、预览品牌时保留 **puffseed** 标识。

---

## 入口与国际化语种匹配（智能体必读）

**本文件 `AGENTS.md` 是唯一入口。** 开始任何任务前，先判定协作语种，再按映射加载同语种规则文件；**禁止写死只读简体路径**（除非语种即为 `zh-CN` 或目标文件缺失需回退）。

### 判定协作语种（优先级从高到低）

1. 用户明确指定的语言（如「用 English / 日本語 / 繁體」）
2. 当前打开或被 `@` 引用的 `rules/AGENTS/AGENTS.<locale>.md`
3. 对话 / 产品 UI 语言（与 `README.html` i18n 一致：`zh-CN` · `zh-TW` · `en` · `ja` · `ru`）
4. **默认**：`zh-CN`（即本文件）

### 语种 → 文件标签 Tag

| 协作语种 | AGENTS 文件 | Tag（用于规范文件名） |
|---------|------------|----------------------|
| `zh-CN` | `AGENTS.md`（本文件） | `Zh-CN` |
| `zh-TW` | `rules/AGENTS/AGENTS.zh-TW.md` | `Zh-TW` |
| `en` | `rules/AGENTS/AGENTS.en.md` | `En` |
| `ja` | `rules/AGENTS/AGENTS.ja.md` | `Ja` |
| `ru` | `rules/AGENTS/AGENTS.ru.md` | `Ru` |

若用户打开的是译文 AGENTS，仍以该文件对应 Tag 加载规则；行为约定与本入口一致。

### 按 Tag 解析规则路径（缺失则回退 `Zh-CN`）

| 用途 | 路径模板 |
|------|---------|
| 行为准则 | `rules/CodeConduct/CodeConduct-{Tag}.md` |
| 质量基线 | `rules/QualityBaseline/QualityBaseline-{Tag}.md` |
| 语言工程规范 | `rules/CodingSpec/<编程语言>/CodingSpec-{Tag}.md` |
| 前端设计（可选译文） | `rules/CodingSpec/JavaScript&TypeScript/DESIGN/DESIGN-{Tag}.md`（缺失回退 `Zh-CN`） |
| 前端 Token / 预览 | `rules/CodingSpec/JavaScript&TypeScript/WebVariable/` · `PreView/`（与语种无关） |
| 说明文档译文 | `rules/README/README-{Tag}.md`（`zh-CN` 亦可读根目录 `README.md`） |

**示例**：协作语种为 `en` → Tag=`En` → 加载 `CodeConduct-En.md`、`QualityBaseline-En.md`、`…/CodingSpec-En.md`；若某文件不存在，回退同路径的 `-Zh-CN.md`。

---

## 0. 项目模式与语言识别（开发前必做）

### 0.1 前端附加模式（仅 JS/TS 前端仓）

| 模式 | 识别信号 | 支持技术栈 | 说明 |
|------|---------|-----------|------|
| **普通项目** | **无** `public/plugin.json` | 原生 HTML + CSS + JS · Vue · React · Next.js · UniApp | 通用 Web / 多端应用 |
| **uTools 生态插件** | **存在** `public/plugin.json` | **仅** React · Vue（2 / 3） | uTools 插件模板 |

### 0.2 语言 / 框架识别流程

1. **先完成「入口与国际化语种匹配」**，得到 Tag
2. 根据依赖与入口文件判断编程语言（见 §1）
3. 前端仓再检查是否存在 `public/plugin.json`（§0.1）
4. 加载 `CodeConduct-{Tag}.md` + `QualityBaseline-{Tag}.md` + 对应语言目录下的 `CodingSpec-{Tag}.md`（缺失回退 `Zh-CN`）
5. 仅前端 UI 任务再加载 `DESIGN`（按 Tag）与 `WebVariable/`

---

## 规范文件职责与选用场景

下表路径中的 `{Tag}` 按上文语种映射替换（默认 `Zh-CN`）。

| 规范文件 | 职责 | 何时查阅 |
|---------|------|---------|
| `rules/CodeConduct/CodeConduct-{Tag}.md` | AI 编码行为与变更心智（先问再做、最小 diff） | **任何编码任务开始前** |
| `rules/QualityBaseline/QualityBaseline-{Tag}.md` | **全语言**代码规范 / 质量 / 可维护性基线（风格门禁、分层、接口、类型、依赖、技术债） | **编写或修改任何业务代码时** |
| `rules/CodingSpec/JavaScript&TypeScript/CodingSpec-{Tag}.md` | 前端工程规范（Vue / React / Next.js / UniApp） | 编写或修改 **前端** 业务代码 |
| `rules/CodingSpec/JavaScript&TypeScript/DESIGN/DESIGN-{Tag}.md` | 界面设计规范（Token · 视觉 · 布局） | **UI 布局、样式、主题、响应式** |
| `rules/CodingSpec/JavaScript&TypeScript/WebVariable/` | 前端设计 Token（原 VariableFile） | 改色值、间距、字号、reset |
| `rules/CodingSpec/JavaScript&TypeScript/PreView/` | 浅/深色视觉预览 | 浏览器打开验收（勿全文喂给 AI） |
| `rules/CodingSpec/Python/CodingSpec-{Tag}.md` | Python · FastAPI / Django | Python 业务代码 |
| `rules/CodingSpec/Java/CodingSpec-{Tag}.md` | Java · Spring Boot | Java 业务代码 |
| `rules/CodingSpec/Go/CodingSpec-{Tag}.md` | Go · Gin | Go 业务代码 |
| `rules/CodingSpec/Node.js/CodingSpec-{Tag}.md` | Node.js · NestJS / Express | Node **服务端**业务代码 |
| `rules/CodingSpec/PHP/CodingSpec-{Tag}.md` | PHP · Laravel | PHP 业务代码 |
| `rules/CodingSpec/C/CodingSpec-{Tag}.md` | C · 系统 / 嵌入式 | C 业务 / 基础库代码 |
| `rules/CodingSpec/C++/CodingSpec-{Tag}.md` | C++ · 现代 C++ | C++ 业务 / 原生模块 |
| `rules/CodingSpec/CSharp/CodingSpec-{Tag}.md` | C# · ASP.NET Core | .NET 业务代码 |
| `rules/CodingSpec/Rust/CodingSpec-{Tag}.md` | Rust · Axum / Actix | Rust 业务代码 |
| `rules/CodingSpec/SQL/CodingSpec-{Tag}.md` | SQL · 迁移 / 建模 | 库表与查询 |
| `rules/CodingSpec/R/CodingSpec-{Tag}.md` | R · tidyverse / Shiny | 数据分析 / Shiny |
| `rules/CodingSpec/Kotlin/CodingSpec-{Tag}.md` | Kotlin · Ktor / Android | Kotlin 业务代码 |
| `rules/CodingSpec/Swift/CodingSpec-{Tag}.md` | Swift · SwiftUI / Vapor | Swift 业务代码 |
| `rules/CodingSpec/Dart/CodingSpec-{Tag}.md` | Dart · Flutter | Flutter 业务代码 |
| `rules/CodingSpec/Ruby/CodingSpec-{Tag}.md` | Ruby · Rails | Ruby 业务代码 |
| `rules/CodingSpec/Scala/CodingSpec-{Tag}.md` | Scala · Play / ZIO | Scala 业务代码 |
| `rules/CodingSpec/Shell/CodingSpec-{Tag}.md` | Shell · Bash | 脚本 / CI / 运维自动化 |

**选用原则**

1. 行为与范围 → `CodeConduct-{Tag}.md`
2. 质量 / 门禁 / 接口 / 技术债 → `QualityBaseline-{Tag}.md`
3. 怎么写（语言落点） → `rules/CodingSpec/<语言>/CodingSpec-{Tag}.md`
4. 前端长什么样 → `DESIGN` + **WebVariable** CSS
5. 冲突时以**目标业务仓库已定稿实现**为准

### 最小加载集（Token 节约）

| 任务类型 | 应加载 | 通常不必加载 |
|---------|--------|-------------|
| 任意编码起步 | `AGENTS.md` · `CodeConduct-{Tag}.md` | 其他编程语言 CodingSpec |
| 任意业务代码 | + `QualityBaseline-{Tag}.md` + 对应 `CodingSpec-{Tag}.md` | 无关语言规范 |
| 前端业务代码 | + `JavaScript&TypeScript/CodingSpec-{Tag}.md` | DESIGN（无 UI 时） |
| 前端 UI / 样式 | + `DESIGN` · 相关 WebVariable | PreView HTML 全文 |
| 改主题色 / 间距 | + `ThemeVariable.css` / `SystemVariable.css` | — |
| 深浅色视觉验收 | 浏览器打开 PreView HTML | 勿将 HTML 载入 AI 上下文 |

**前端 Token 路径**：`rules/CodingSpec/JavaScript&TypeScript/WebVariable/`  
**前端预览路径**：`rules/CodingSpec/JavaScript&TypeScript/PreView/`

---

## 1. 框架识别与编码约定

执行任务前，确认技术栈并选用对应规范：

### 1.1 前端 · JavaScript & TypeScript

| 技术栈 | 识别信号 | 规范 |
|--------|---------|------|
| 原生 HTML/CSS/JS | 无框架依赖、`index.html` 直引脚本 | JS&TS CodingSpec 共性 / 样式章节 |
| Vue 2 | `vue@2`、Options API | JS&TS CodingSpec · Vue 2 |
| Vue 3 | `vue@3`、`<script setup>` | JS&TS CodingSpec · Vue 3 |
| React 18+ | `react`、Hooks | JS&TS CodingSpec · React |
| Next.js | `next`、`app/` 或 `pages/` | JS&TS CodingSpec · Next.js |
| UniApp | `pages.json`、`manifest.json`、`@dcloudio/uni-*` | JS&TS CodingSpec · UniApp |

**跨框架共性（前端摘录）**

- **语言**：TypeScript 优先；公共 API 须有明确类型。
- **目录**：按业务域划分；路由集中配置（含 UniApp `pages.json`）。
- **事件**：业务处理函数 `handle` 前缀；Vue / UniApp 对外事件 kebab-case；React/Next `onXxx`。
- **样式**：引用 **WebVariable** Token，禁止业务组件硬编码整套色板。
- **注释**：模板 `<!-- 区块说明 -->`；关键业务可用 `// puffseed：说明`。

### 1.2 后端 / 系统 / 数据 · 各语言

| 语言 | 框架 / 场景 | 识别信号 | 规范 |
|------|------------|---------|------|
| Python | FastAPI / Django | `fastapi` / `manage.py` | `CodingSpec/Python/` |
| Java | Spring Boot | `@SpringBootApplication` | `CodingSpec/Java/` |
| Go | Gin | `gin-gonic/gin` | `CodingSpec/Go/` |
| Node.js | NestJS / Express | `@nestjs/*` / `express` | `CodingSpec/Node.js/` |
| PHP | Laravel | `artisan` / `laravel/framework` | `CodingSpec/PHP/` |
| C | 系统 / 嵌入式 | `*.c` / `*.h`、Makefile/CMake | `CodingSpec/C/` |
| C++ | 现代 C++ | `*.cpp` / `*.hpp`、CMake | `CodingSpec/C++/` |
| C# | ASP.NET Core | `*.csproj`、`WebApplication` | `CodingSpec/CSharp/` |
| Rust | Axum / Actix | `Cargo.toml`、`axum`/`actix-web` | `CodingSpec/Rust/` |
| SQL | 迁移 / 建模 | `*.sql`、`migrations/` | `CodingSpec/SQL/` |
| R | tidyverse / Shiny | `DESCRIPTION`、`*.Rmd`、`app.R` | `CodingSpec/R/` |
| Kotlin | Ktor / Android | `*.kt`、`build.gradle.kts` | `CodingSpec/Kotlin/` |
| Swift | SwiftUI / Vapor | `*.swift`、`Package.swift` | `CodingSpec/Swift/` |
| Dart | Flutter | `pubspec.yaml`、`lib/main.dart` | `CodingSpec/Dart/` |
| Ruby | Rails | `Gemfile`、`config/routes.rb` | `CodingSpec/Ruby/` |
| Scala | Play / ZIO | `build.sbt`、`*.scala` | `CodingSpec/Scala/` |
| Shell | Bash / POSIX | `*.sh`、`scripts/` | `CodingSpec/Shell/` |

各语言规范均覆盖：**业务编码格式**、**逻辑复用**、**安全与配置**、**puffseed 业务注释**、自检清单。

---

## 2. 样式系统概览（仅前端）

涉及 **UI 布局、样式、组件视觉、主题色** 时，遵守  
`rules/CodingSpec/JavaScript&TypeScript/DESIGN/DESIGN-Zh-CN.md`，Token 以 **`WebVariable/`** 为准。

### 2.1 样式分层与 1:1 编写原则

| 层级 | 文件 / 位置 | 内容 | 可否在业务项目中重复定义 |
|------|-------------|------|------------------------|
| 主题 Token | `WebVariable/ThemeVariable.css` | 标准色板 + 文本色 | **禁止** |
| 系统 Token | `WebVariable/SystemVariable.css` | 间距 · 布局 · 字号 · 图标 · 阴影 | **禁止** |
| 全局重置 | `WebVariable/ProjectReset.css` | 盒模型、`html`/`body` | **禁止** |
| 应用补充 | 各仓库入口 CSS | 仅应用级补充 | 按需 |
| 布局 / 页面 / 组件 | 对应模块内 | 1:1 作用域样式，引用 Token | 仅本模块内 |

**1:1 原则**：组件 / 页面 / 布局样式各写在其作用域内。**全局 Token 与 reset 仅在 `WebVariable/` 维护。**

**WebVariable 引入顺序**：**ThemeVariable → SystemVariable → ProjectReset → 应用 CSS**

```javascript
// 路径按业务仓库相对位置调整
import "../rules/CodingSpec/JavaScript&TypeScript/WebVariable/ThemeVariable.css";
import "../rules/CodingSpec/JavaScript&TypeScript/WebVariable/SystemVariable.css";
import "../rules/CodingSpec/JavaScript&TypeScript/WebVariable/ProjectReset.css";
import "./main.css";
```

| 技术栈 | 引入位置 |
|--------|---------|
| 原生 HTML/CSS/JS | `index.html` 中 `<link>` |
| Vue 2 / Vue 3 | `main.js` / `main.ts` 中 `import` |
| UniApp | `App.vue` / `uni.scss` 或入口引入（注意小程序 CSS 变量） |
| React / Next.js | 入口或根 layout 中 `import` |

### 2.2 主题 / 系统变量要点

| 类别 | 变量示例 | 来源 |
|------|---------|------|
| 标准色 / 功能色 | `--primary` · `--success` · `--error` | ThemeVariable |
| 文本色 | `--title` · `--main-text` · `--title-dark` | ThemeVariable |
| 间距 / 布局 / 字号·行高 / 阴影 | `--size-16` · `--layout-header` · `--fs-14`/`--lh-22`（成对） · `--shadow` | SystemVariable |

### 2.3 Token 扩展（规则拔插）

- **核心套件**：`ThemeVariable.css` + `SystemVariable.css` + `ProjectReset.css`
- **扩展套件**：可在 `WebVariable/` 或 `Extensions/` **追加** CSS，入口追加引入，**不修改核心文件**
- 未明确要求时，AI **仅使用核心套件**

---

## 3. AI 编码行为规范

遵守 `rules/CodeConduct/CodeConduct-{Tag}.md` 核心心智（Tag 见「入口与国际化语种匹配」；缺失回退 `Zh-CN`）：

1. **先思考，再编码**：明确假设、列出解读、不确定时提问
2. **简洁优先**：最少代码解决问题，不做推测性工作
3. **精准修改**：只动必须动的部分，匹配已有风格
4. **目标驱动**：定义成功标准并验证

---

## 3.1 代码规范 · 质量 · 可维护性（QualityBaseline）

编写业务代码时**必须**遵守 `rules/QualityBaseline/QualityBaseline-{Tag}.md`，摘要如下：

| 支柱 | 要点 |
|------|------|
| **代码规范** | 命名/注释/格式统一；**ESLint·Prettier·阿里 P3C** 等工具按语言启用；**提交阶段强制校验**；目录分层（控制/业务/数据 · 公共 · 工具 · 类型 · 配置）；接口统一信封/错误码/HTTP 语义/幂等/版本，**文档同步** |
| **代码质量** | 高内聚低耦合；模块化复用；强类型 + 参数校验 + 空值/异常边界；lockfile + 漏洞扫描；技术债登记，禁止无主「临时代码」 |
| **可维护性** | 可读、注释完整；新人能按 README 快速跑通并定位模块 |

语言专属工具与目录落点见各 `CodingSpec.md` 的「质量与工程门禁」章节。

---

## 4. 各端落地对照（摘要）

### 4.1 前端

| 场景 | Vue 3 | UniApp | React 18+ | Next.js |
|------|-------|--------|-----------|---------|
| 组件 | `<script setup>` SFC | Vue SFC + `view`/`text` 等 | 函数组件 + Hooks | Server/Client Component 边界 |
| 路由 | `vue-router` | `pages.json` | React Router | `app/` 或 `pages/` 约定 |
| 状态 | `ref` / Pinia | Pinia / Vuex | `useState` / Zustand 等 | 服务端数据 + 客户端状态分离 |
| 样式 | SCSS scoped | Token + rpx / 条件编译 | CSS Modules | 同左 + 根 layout 引 WebVariable |

### 4.2 其他端（摘要）

| 场景 | 薄入口 | 业务层 | 典型校验 / 边界 |
|------|--------|--------|----------------|
| FastAPI / Django | Router / View | Service | Pydantic / Serializer |
| Spring Boot | Controller | Service | Bean Validation |
| ASP.NET Core | Controller / Endpoint | Application | DataAnnotations / FluentValidation |
| Gin / Axum | Handler | Service | Bind + 类型化错误 |
| NestJS / Express | Controller / Router | Service | DTO |
| Laravel / Rails | Controller | Service / Action | Form Request / Strong Params |
| Flutter / SwiftUI / Android | UI Widget / View | ViewModel / UseCase | 状态管理方案单一 |
| SQL | — | 迁移 + Repository | 参数化查询 |
| Shell | 脚本入口 `main` | 函数库 | `set -euo pipefail` + 引号 |

---

## 5. 业务注释规范（puffseed）

- **前端模板**：`<!-- 区块说明 -->`
- **脚本 / 后端关键路径**：`// puffseed：说明` 或语言对应的 `# puffseed：说明`
- **原则**：只注释「做什么 / 为什么」；完整示例见各语言 `CodingSpec.md`
- **品牌**：业务预览与产品文案保留 **puffseed** / **puffseed-ui**

---

## 6. 自检清单（提交前）

- [ ] 已按协作语种解析 Tag，并加载 `CodeConduct-{Tag}` · `QualityBaseline-{Tag}` · 对应 `CodingSpec-{Tag}`（缺失已回退 `Zh-CN`）
- [ ] 已识别编程语言与框架
- [ ] format / lint / typecheck 已通过，未绕过提交钩子
- [ ] 分层正确（控制层薄、业务在 service）；目录落点符合约定
- [ ] 接口变更：信封/错误码/版本一致，**文档已同步**；写操作考虑幂等
- [ ] 强类型与入口校验到位；无未登记技术债 / 临时代码
- [ ] 前端仓：已识别普通项目 / uTools；**WebVariable** 已引入且未重复定义 Token
- [ ] 样式 1:1（前端）；无密钥硬编码；副作用 / 资源已清理或事务 / 鉴权正确
- [ ] 关键业务路径注释含 **puffseed**；新人可据注释与 README 上手
- [ ] UI 视觉正常（可对照 PreView）

---

## 7. 开发与调试

| 场景 | 操作 |
|------|------|
| 前端本地开发 | 以业务仓脚本为准（常见 `npm run dev`） |
| Token 视觉预览 | 打开 `rules/CodingSpec/JavaScript&TypeScript/PreView/LightDesignSpec.html` 或 `DarkDesignSpec.html` |
| 后端 | 以各语言仓库 README / Makefile / compose 为准 |
| uTools 调试 | 开发者工具 → 插件开发 → 加载项目目录 |

---

*最后同步：AGENTS/ · README/ · CodeConduct/CodeConduct-{Tag}.md · QualityBaseline/QualityBaseline-{Tag}.md · CodingSpec/*/CodingSpec-{Tag}.md · language/ · script/ · WebVariable · PreView · puffseed*
