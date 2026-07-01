---
description: 前端工程与代码规范（Vue 3 / React 18+，TS 优先，多端）
globs: ["**/*.vue", "**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx", "src/**/*.html", "**/*.less", "**/*.scss", "src/**/*.css", "**/*.module.css"]
alwaysApply: false
---

<!-- !!!编码规范-->

# 前端编码规范（工程与实现）

**仓库角色**：**project-coding-rules-file** 用于制定并分发 **AI 可读的编程规范**；本文件约束 **工程实现与代码质量**。**AI 协作时的过程与变更粒度**见 **`CodeConduct.md`**；**视觉与设计 Token 的语义**见 **`DESIGN.md`**；二者与本文件同时适用时以 **业务项目已定稿的设计系统** 为准。

**适用端**：浏览器 **Web**、**桌面壳**（Electron / Tauri / CE 等内嵌 WebView）、**移动与平板**（浏览器或壳内 WebView）。不替代各壳工程自己的 `AGENTS`：路由 `base`、深链、安全策略以 **目标业务仓库** 为准。

---

## 1. 技术栈与框架约定

### 1.1 共性

- **语言**：优先 **TypeScript**；`any` 仅作过渡，公共 API 与跨模块数据须有明确类型。
- **包管理**：以业务项目 `package.json` / `pnpm-lock.yaml` / `packageManager` 字段为准；勿在规范文档中假设固定包管理器版本，除非团队已写入 `engines`。
- **构建**：现代项目多用 **Vite**；若为 **Webpack / Rspack**，路径别名与 `publicPath` 以仓库配置为准。

### 1.2 Vue 2

- **SFC**：`<script lang="ts">` + `Vue.extend` / `vue-property-decorator` / 纯对象式 `export default { ... }`；组件文件命名 **PascalCase**（`UserProfile.vue`）。
- **模板语法**：`v-bind:` / `v-on:` 是 Vue 2 原生语法；如需 `v-model` 自定义，需显式声明 `model: { prop, event }`。
- **Props / Emits**：Props 推荐使用 `type` + `required` + `default` + `validator`；事件使用 `$emit('event-name')`，事件名 kebab-case。
- **逻辑复用**：优先 **Mixins**（`mixins: [XxxMixin]`），或抽取工具函数（`utils/xxx.ts`）。复杂逻辑可使用 `Vue.observable` / `Vuex` 模块。
- **版本特性**：Vue 2.7 可用 Composition API（`@vue/composition-api` 非必需，2.7 已内置）；低于 2.7 的版本请在仓库 `package.json` / `tsconfig` 中明确标注。
- **类型安全**：在 TS 环境中优先 `Vue.extend({ ... })` 而非纯对象；`this.$refs` 需要 `as HTMLDivElement` 等收窄。

### 1.3 Vue 3

- **SFC**：推荐 **`<script setup lang="ts">`**；组件文件命名 **PascalCase**（`UserProfile.vue`）。
- **Props / Emits**：`defineProps` / `defineEmits` 使用 **字面类型** 或 `interface`，避免仅运行时声明而无类型；`defineModel` 用于 v-model 双向绑定。
- **逻辑复用**：优先 **Composables**（`useXxx.ts`），单文件过大时拆分子组件与 composable。
- **响应式**：`ref` / `computed` / `reactive` 配合；对象场景优先 `reactive`，基础类型优先 `ref`。
- **生态**：路由 `vue-router@4`、状态 `pinia` 或 `vuex@4`、构建 `vite` 或 `vue-cli` 以仓库为准。

### 1.4 React 16+ / React 18+

- **组件**：函数组件 + **Hooks** 为首选；遗留代码保留类组件；命名 **PascalCase**。
- **Props**：`interface XxxProps` 或 `type XxxProps`；children 类型 `ReactNode` 或更精确的 `ReactElement`。
- **状态管理**：组件内用 `useState` / `useReducer`；跨组件用 `Context + Provider`、Zustand、Redux Toolkit 等。
- **逻辑复用**：自定义 Hooks（`useXxx`），避免 HOC / render props 的过度嵌套。
- **React 18 新特性**：`createRoot`、`useTransition` / `useDeferredValue`、Suspense（数据获取以仓库约定为准）。
- **SSR / RSC**：若仓库涉及 Next.js App Router，应遵守「use client / use server」边界，不要在服务端组件使用浏览器 API。
- **类型安全**：`React.FC` 可省略；Props 类型必须显式；避免 `any`。

### 1.5 Angular 12+

- **组件**：`@Component({ selector, templateUrl, styleUrls })`；selector 采用 **kebab-case**（`app-user-profile`），文件命名 `user-profile.component.ts` + `user-profile.component.html` + `user-profile.component.scss`。
- **模块**：模块化拆分 `NgModule`；功能模块、共享模块、懒加载路由模块按约定目录。
- **依赖注入**：`providedIn: 'root'` 优先于模块级 providers；避免循环依赖。
- **数据流**：`@Input()` / `@Output()` 命名驼峰；`EventEmitter` 配合 `async` 管道处理 Observable。
- **RxJS**：必须 `subscribe` 后管理 `unsubscribe`（推荐 `takeUntil`、`async` 管道、`| async`）；避免在模板中多次订阅同一 Observable。
- **路由**：`RouterModule.forRoot` / `forChild`；`canActivate`、`canDeactivate` 守卫配合权限。
- **模板与类型**：模板内变量尽量使用类型安全管道；`strictTemplates: true` 优先启用。
- **变更检测**：`OnPush` 策略配合不可变数据；`ChangeDetectorRef` 仅在必要时手动触发。
- **Forms**：响应式表单 `FormGroup / FormControl / FormArray` 优先；模板驱动表单仅限简单场景。
- **类型与 TS**：启用 `strict` 模式；避免 `any`，必要时使用 `unknown` + 类型守卫收窄。

---

## 2. 目录与模块边界

- **特性 / 领域**：按业务域或路由段划分目录（如 `features/`、`modules/`、`pages/`），避免「所有组件平铺在一层」。
- **公共 UI**：无业务耦合的组件放在 `components/` 或 `@/shared/ui` 等团队约定位置；设计系统封装与业务页面分离。
- **路由**：路由表与懒加载集中在 **单一配置或约定目录**（如 `router/`、`routes.tsx`），避免路径字符串在多处硬编码。
- **静态资源**：优先 `import` 或构建工具处理；大图与非常用资源**懒加载**；路径需兼容业务项目的 `BASE_URL` / `import.meta.env.BASE_URL` / `homepage` 等。

---

## 3. TypeScript 与实践

- **可空**：对路由参数、接口返回做 **收窄**（守卫、可选链、判别联合），避免「深层可选链 + 无默认 UI」。
- **禁止**：用 `@ts-ignore` 掩盖未建模依赖；若确有必要，注释 **原因与跟进人 / issue**。
- **环境变量**：客户端可用变量须符合构建工具约定（如 **`VITE_`** 前缀）；在 `env.d.ts` 或等价位置扩展 `ImportMetaEnv` / `ProcessEnv`，避免裸字符串散落。

---

## 4. 样式（与 DESIGN 联动）

- **方法论**：BEM 或与团队一致的 **CSS Modules / styled-system**；嵌套不宜过深（建议不超过 **3** 层无必要选择器链）。
- **Token**：颜色、间距、字号引用 **项目内设计变量**（见 `DESIGN.md` 与 **`rules/VariableFile/`**）。禁止在业务组件内复制**整套**色板常量；若缺 Token，应在 **全局主题或变量文件** 增补后再引用。改 Token 源码时优先读对应 CSS，无需同时加载本文件全文。
- **`var()`**：若团队规范禁止 `var(--token, #fallback)` 一类 **静默回退**，则一律使用 **无 fallback** 的 `var(--token)`，并在设计侧补全变量。
- **作用域**：Vue 优先 `scoped` 或 CSS Modules；React 使用 `*.module.css` 或约定-in-JS 的 **theme token**；**`:global` / `:deep`** 类穿透须注释原因，避免污染全局。

---

## 5. 组件与接口设计

- **单一职责**：单文件过长时拆分子组件；**Props 保持「展示与控制所需的最小集合」**。
- **受控与非受控**：表单类组件行为与 React/Vue 惯用模式一致，并在文档或注释中写明（尤其是「默认值」「受控 value」）。
- **模板/JSX**：避免复杂表达式；复杂条件用 **`useMemo` / `computed`** 或抽函数。

---

## 6. 业务逻辑与事件命名

- **事件回调**：业务侧处理函数推荐 **小驼峰 + `handle` 前缀**（`handleSubmit`、`handleOpenDrawer`）。若团队 `CLAUDE.local.md` 声明了其他前缀，**以团队为准**。
- **组件对外事件**：Vue 用 **kebab-case** 声明（`@update:modelValue`）；React 用 **onXxx** + camelCase props（`onSubmit`）；Angular 用 `@Output() submit = new EventEmitter<...>()`，配合模板 `(submit)="handleSubmit($event)"`。
- **框架约定差异**：Vue 模板中使用 `@kebab-case`；React 函数组件中使用 `onCamelCase` 回调 prop；Angular 模板中使用 `(camelCase)` 事件绑定 + `(click)`、`(input)` 等内置事件。

---

## 7. JSON 与配置驱动 UI

- **字段名**：**小驼峰**（`largeCols` 而非 `large-cols`）。
- **与组件 Props 对齐**：配置中的键名与前端组件参数名一致，便于类型生成与 AI 理解。
- **多框架消费**：同一份 JSON schema 应对齐 Vue props、React props、Angular `@Input()`，使跨框架页面可共享同一份数据源。

---

## 8. 状态管理

- **同源数据**：同一业务事实避免在互不知情的多个全局 `ref` / 多处局部 state 中重复；使用项目选定的 **Store**（Pinia、Zustand、Redux Toolkit、Jotai 等）或 **服务端缓存**（TanStack Query、SWR）时遵循 **单一数据源**。
- **若使用 Redux 系**：action type 常量大写蛇形；异步逻辑放在 thunk / RTK query 等约定位置，勿在页面内散落未抽象的 `fetch`。
- **Vue 2 / Vue 3 差异**：Vue 2 优先 `Vuex`（`$store.commit` / `dispatch`），Vue 3 优先 `Pinia`（`defineStore` + `useXxxStore()`）；组件内用 `mapState` / `mapGetters` / `mapActions` 或 setup 内直接调用。
- **Angular 状态管理**：轻量场景优先 `RxJS` + `BehaviorSubject` 封装服务；复杂场景可使用 `NgRx` / `Akita` / `Ngxs`；服务通过依赖注入共享，不要过度使用 `@Input` 透传。
- **React 状态管理**：`useState` / `useReducer` 用于组件内；跨层级用 `Context + Provider`；全局状态可使用 Zustand、Redux Toolkit、Jotai 等；服务端数据优先 `TanStack Query` / `SWR`。

---

## 9. 性能与资源

- **条件渲染**：Vue **`v-if` / `v-show`** 按切换频率与成本选择；React 同理（挂载成本高用条件挂载，频繁切换可考虑 CSS 显隐）；Angular 使用 `*ngIf` / `[hidden]`，两者不可混用。
- **列表**：大数据列表用 **虚拟列表**、分页或分段渲染；避免在循环中创建内联箭头函数导致无谓子树更新（按框架习惯优化）。
  - Vue：`v-for` 必须提供 `key`，避免使用索引作为 key。
  - React：`map` 必须提供 `key` prop，避免稳定值以外的 key。
  - Angular：`*ngFor` 配合 `trackBy` 函数，减少 DOM 重排。
- **派生数据**：Vue 2 用 `computed`；Vue 3 用 `computed`；React 用 `useMemo` / `useCallback`；Angular 用 `pure` pipe 或 `memo` 工具函数。避免在模板/JSX 中每次 render **新建对象/数组** 作为子组件的 props。
- **副作用清理**：Vue 2 用 `beforeDestroy` / `destroyed`；Vue 3 用 `onBeforeUnmount` / `watch` 清理；React 用 `useEffect` 的 cleanup；Angular 使用 `ngOnDestroy` + `takeUntil` / `unsubscribe`。
- **资源取消**：与 **`setInterval`、`addEventListener`、WebSocket、第三方订阅** 配对 **清理函数**；组件卸载时取消未完成请求（AbortController 等）。
- **变更检测**：Angular 优先 `ChangeDetectionStrategy.OnPush` + 不可变数据；React 避免在父组件 render 中创建子组件 prop 新对象；Vue 避免在 `setup` 中未使用 `ref` / `reactive` 时反复声明大对象。

---

## 10. 多端与壳应用（摘要）

- **桌面 WebView / Electron / Tauri**：路由模式（history / hash）、**文件协议与 `base`** 以业务仓配置为准；勿在规范包内假设固定端口或路径。
- **移动 / 平板**：首屏与交互目标见 **`DESIGN.md`**（触控尺寸、断点、安全区）；**勿**假设仅桌面键鼠。
- **安全**：不信任 URL 参数与 `postMessage` 数据；XSS 与 CSP 以项目安全规范为准。

---

## 11. 开发与提交流程（建议）

- **本地热更新**：一般修改业务代码 **无需**重启 dev；修改 **构建配置、环境变量名、根插件** 后需重启。
- **合并前**：执行项目约定的 **`lint` / `typecheck` / `build`**。

---

## 12. 自检清单（提交前）

- [ ] 新增环境变量已加入类型声明
- [ ] 样式使用项目 Token，无违规 fallback（若团队禁止）
- [ ] 事件/回调命名符合团队约定（Vue kebab-case / React onXxx / Angular @Output）
- [ ] 副作用与监听器已清理（Vue beforeDestroy / onBeforeUnmount · React useEffect cleanup · Angular ngOnDestroy + takeUntil）
- [ ] 列表渲染已提供稳定 key / trackBy
- [ ] 列表与路由路径无重复魔法字符串（或已集中在配置）
- [ ] 桌面壳 / 多 base 场景已与业务仓路由策略一致
- [ ] **Vue 2** 场景已确认版本特性（`Vue.extend` / Composition API 可用性）
- [ ] **React 18** 场景已确认是否为 SSR / RSC 环境（use client / use server 边界）
- [ ] **Angular** 场景已确认 RxJS 订阅是否正确释放、模板 strict 是否已启用
- [ ] 页面 / 模板关键区块已用 `<!-- ... -->` 分区注释
- [ ] 关键业务逻辑已用`//...`标注（非逐行堆砌）

---

## 13. 代码关键业务注释，保证开发者顺利阅读

对 **组件、页面模板、业务逻辑** 中的关键区块补充注释，便于后续开发者快速定位与理解；**非逐行注释**，只标注结构分区与不易从代码字面看出的业务含义。

### 13.1 页面 / 模板（`<template>`）

- 在 `<template>` 内对 **布局分区、功能区块、弹层 / 抽屉** 等关键结构使用 **HTML 注释** 标注语义。
- 格式：`<!-- 区块说明 -->`，置于对应根节点或区块 **上方**。
- 示例（`template` 入口见 `@src/App.vue:222`，分区注释格式见 `@src/App.vue:224`）：

```vue
<template>
  <div class="app-layout">
    <!-- 左侧导航 -->
    <sidebar-layout ... />

    <!-- 右侧内容区 -->
    <main-content-layout>
      <!-- 页头 -->
      ...
    </main-content-layout>
  </div>
</template>
```

### 13.2 组件

- **可复用组件**：在 `<script>` 顶部或 `<template>` 首段简要说明对外职责、关键 slot、非显而易见的 props 行为。
- **复杂子区块**：在 `<template>` 内同样采用 `<!-- ... -->` 分区注释（如弹框、表单区、列表区）。

### 13.3 业务逻辑（`<script>`）

- 对 **路由分发、状态流转、跨模块协作、非直观分支 / 算法** 等关键逻辑，使用单行 **`// 说明`** 标注（与 AGENTS.md §5 一致）。
- 示例：

```javascript
// 根据当前路由 path 映射侧边栏高亮 tab
const currentTab = computed(() => {
  return TAB_BY_ROUTE[route.path] || 'FunctionOverview';
});

// 详情页标题：按路由 path 分支返回不同文案
const pageTitle = computed(() => { ... });
```

### 13.4 书写原则

- **只注释「做什么 / 为什么」**，不重复代码字面含义。
- **关键路径必注**：入口分发、权限 / 主题、持久化、与壳层 / preload 的边界。
- **工具模块**：文件顶部分节注释即可（如 `@src/utils/colorUtils.js`）；函数内部仅在逻辑非直观处使用 `//` 说明。
- 新增页面或大改布局时，**同步补全** 模板分区注释与 script 关键业务注释。

---

## 与 `DESIGN.md` 的分工

| 主题 | `CodingSpec.md`（本文件） | `DESIGN.md` |
|------|---------------------------|-------------|
| AI 写码心智（先问再做、最小 diff） | 见 **`CodeConduct.md`** | 见 **`CodeConduct.md`** |
| Token 命名与色板角色 | 引用方式、禁止魔法数 | **变量索引、用法、UI 模式**（色值见 `VariableFile/`） |
| 按钮/表单长成什么样 | 组件拆分、状态、可访问属性 | **颜色、间距、字号、状态色** |
| 响应式 | 目录与性能 | **断点原则、触控目标** |