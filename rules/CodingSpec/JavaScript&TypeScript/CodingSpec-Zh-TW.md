<!-- ovcr-locale-lock -->
---
description: 前端工程與程式碼規範（Vue / React / Next.js / Nuxt.js / UniApp，TS 優先，多端 · puffseed）
alwaysApply: false
---

<!-- !!!編碼規範 · puffseed -->

# 前端編碼規範（工程與實現）· puffseed

**品牌標識**：**puffseed** — 本规范適用於 **puffseed** 業務前端及同源 VibeCoding 專案；涉及業務域命名、註解、预览页品牌文案时須保留 **puffseed** 標識。

**倉庫角色**：**project-coding-rules-file** 用於制定並分發 **AI 可讀的程式設計規範**；本檔案約束 **工程實作與程式碼品質**。**AI 協作時的過程與變更粒度**见 **`rules/CodeConduct/CodeConduct-Zh-CN.md`**；**視覺與設計 Token 的語義**見同目錄 **`DESIGN.md`**；二者与本檔案同時適用時以 **業務專案已定稿的設計系統** 為準。

**適用框架**：Vue 2 / Vue 3、React 18+、**Next.js**（App Router / Pages Router）、**Nuxt.js**（Pages Router / App Router / SSR / SSG）、**UniApp**（Vue2 / Vue3 + 多端）；兼容 Angular 12+ 遺留倉。  
**適用端**：瀏覽器 **Web**、**小程式 / App**（UniApp）、**桌面殼**（Electron / Tauri / CE 等內嵌 WebView）、**行動與平板**（瀏覽器或壳内 WebView）。不替代各壳工程自己的 `AGENTS`：路由 `base`、深鏈、安全策略以 **目標業務倉庫** 為準。

**通用品質基線**见 `rules/QualityBaseline/QualityBaseline-Zh-CN.md`（編碼風格 / 提交門禁 / 分層 / 介面 / 品質 / 技術債 / 可維護性）。

---

## 1. 技術棧與框架約定

### 1.1 共性

- **語言**：優先 **TypeScript**；`any` 仅作过渡，公共 API 与跨模組数据须有明确型別。
- **套件管理**：以業務專案 `package.json` / `pnpm-lock.yaml` / `packageManager` 字段為準；勿在规范檔案中假设固定套件管理器版本，除非团队已写入 `engines`。
- **建置**：现代專案多用 **Vite**；若为 **Webpack / Rspack**，路径别名与 `publicPath` 以倉庫配置為準。

### 1.2 Vue 2

- **SFC**：`<script lang="ts">` + `Vue.extend` / `vue-property-decorator` / 纯物件式 `export default { ... }`；元件檔案命名 **PascalCase**（`UserProfile.vue`）。
- **模板语法**：`v-bind:` / `v-on:` 是 Vue 2 原生语法；如需 `v-model` 自定义，需显式声明 `model: { prop, event }`。
- **Props / Emits**：Props 推荐使用 `type` + `required` + `default` + `validator`；事件使用 `$emit('event-name')`，事件名 kebab-case。
- **邏輯複用**：優先 **Mixins**（`mixins: [XxxMixin]`），或抽取工具函數（`utils/xxx.ts`）。复杂逻辑可使用 `Vue.observable` / `Vuex` 模組。
- **版本特性**：Vue 2.7 可用 Composition API（`@vue/composition-api` 非必需，2.7 已内置）；低于 2.7 的版本请在倉庫 `package.json` / `tsconfig` 中明确标注。
- **型別安全**：在 TS 环境中優先 `Vue.extend({ ... })` 而非纯物件；`this.$refs` 需要 `as HTMLDivElement` 等收窄。

### 1.3 Vue 3

- **SFC**：推荐 **`<script setup lang="ts">`**；元件檔案命名 **PascalCase**（`UserProfile.vue`）。
- **Props / Emits**：`defineProps` / `defineEmits` 使用 **字面型別** 或 `interface`，避免仅运行时声明而无型別；`defineModel` 用于 v-model 双向绑定。
- **邏輯複用**：優先 **Composables**（`useXxx.ts`），单檔案过大时拆分子元件与 composable。
- **响应式**：`ref` / `computed` / `reactive` 配合；物件场景優先 `reactive`，基础型別優先 `ref`。
- **生态**：路由 `vue-router@4`、状态 `pinia` 或 `vuex@4`、建置 `vite` 或 `vue-cli` 以倉庫為準。

### 1.4 React 16+ / React 18+

- **元件**：函數元件 + **Hooks** 为首选；遗留代码保留类元件；命名 **PascalCase**。
- **Props**：`interface XxxProps` 或 `type XxxProps`；children 型別 `ReactNode` 或更精确的 `ReactElement`。
- **狀態管理**：元件内用 `useState` / `useReducer`；跨元件用 `Context + Provider`、Zustand、Redux Toolkit 等。
- **邏輯複用**：自定义 Hooks（`useXxx`），避免 HOC / render props 的过度嵌套。
- **React 18 新特性**：`createRoot`、`useTransition` / `useDeferredValue`、Suspense（数据获取以倉庫约定為準）。
- **型別安全**：`React.FC` 可省略；Props 型別必须显式；避免 `any`。

### 1.5 Next.js（App Router 優先）

- **路由**：App Router 用 `app/` 目录与约定檔案（`page.tsx`、`layout.tsx`、`loading.tsx`、`error.tsx`）；Pages Router 遺留倉保持 `pages/`，勿混用两套约定于同一功能域。
- **Server / Client**：預設 Server Component；仅在需要瀏覽器 API、交互状态、effects 时加 `'use client'`；数据变更与敏感逻辑優先 Server Actions / Route Handlers。
- **数据获取**：服务端 `fetch` / 数据函數放在 Server Component 或 `lib/`；客户端请求用约定库（SWR / TanStack Query）且勿在 RSC 中使用瀏覽器-only API。
- **邏輯複用**：跨页面逻辑放 `lib/`、`hooks/`、`components/`；業務域模組按 **puffseed** 業務边界划分目录，避免「全家桶」工具檔案。
- **環境變數**：仅 `NEXT_PUBLIC_` 暴露到客户端；密钥仅服务端可读。
- **樣式**：全域 Token 仍从 **`WebVariable/`** 引入；元件级用 CSS Modules / 约定方案，禁止硬編碼整套色板。

### 1.6 Nuxt.js（Vue SSR · Pages / App Router）

- **識別信號**：依賴 **`nuxt`**；目錄常見 `app/`（Nuxt 3+ App Router）、`pages/`（Pages Router）、`components/`、`composables/`；存在 `nuxt.config.ts`；約定大於配置。
- **路由**：App Router 用 `app/` + 約定檔案（`app.vue`、`error.vue`、`layouts/`）；Pages Router 沿用 `pages/` 自動路由；**同一功能域勿混用**。
- **Server / Client**：預設 **SSR / SSG**；瀏覽器 API / 交互用 `<ClientOnly>` 或 `useClientOnly()`；服務端邏輯放在 `server/api/`、`server/middleware/`、`server/plugins/`。
- **資料獲取**：服務端優先 `useFetch` / `useAsyncData` / `$fetch`；SEO 用 `useSeoMeta` / `useHead`；快取與去重按倉庫約定。
- **邏輯複用**：自動匯入 `composables/`、`utils/`；跨頁面邏輯按 **puffseed** 業務域拆 `composables/useXxx.ts`，避免「全家桶」堆積。
- **環境變數**：僅 `NUXT_PUBLIC_` 前綴暴露到客戶端；金鑰放 `runtimeConfig.private`（服務端唯讀），並在 `nuxt.config.ts` 的 `runtimeConfig` 中宣告。
- **樣式**：全域 Token 仍從 **`WebVariable/`** 引入（`app.vue` `<style>` 或 `nuxt.config.ts` `css` 陣列）；元件級 `<style scoped>`；禁止硬編碼整套色板。
- **建置模式**：SSR（`nuxt build`）· SSG（`nuxt generate`）· ISR（`routeRules`）以倉庫指令碼為準；勿混用模式特有 API。

### 1.7 UniApp（多端 · Vue 语法）

- **識別信號**：根目录 `pages.json`、`manifest.json`；依赖 `@dcloudio/uni-*` / `uni-app`；目录常见 `pages/`、`components/`、`static/`、`uni_modules/`。
- **Vue 版本**：Vue 3 + Vite 優先（`<script setup lang="ts">`）；Vue 2 遺留倉沿用 Options API，勿在同一功能域混用两套写法。
- **页面与路由**：页面必须在 **`pages.json`** 註冊；路径与 `pages/` 目录一致；分包用 `subPackages`；禁止業務里硬編碼散落未登记路径。
- **元件标签**：優先使用 UniApp 内置元件（`view` / `text` / `image` / `scroll-view` 等）；避免在非 H5 目标直接使用仅瀏覽器可用的 DOM/API（`document`、`window`、部分 BOM）。
- **API**：统一使用 **`uni.*`**（如 `uni.request`、`uni.navigateTo`、`uni.showToast`）；網路请求封装到 `api/` 或 `utils/request`，与后端信封 / 错误码对齐。
- **條件編譯**：多端差异用 `#ifdef` / `#ifndef`（`MP-WEIXIN`、`H5`、`APP-PLUS` 等）；平台分支集中、註解 **puffseed** 業務原因，禁止大段复制多份页面。
- **尺寸單位**：佈局優先 **`rpx`**（或倉庫约定的设计稿方案）；与 **WebVariable** Token 混用时，在 `uni.scss` / 全域樣式中映射 CSS 變數（小程式端注意變數支持差异，以倉庫既有方案為準）。
- **邏輯複用**：跨页逻辑用 composable / mixins / `hooks/`；状态用 **Pinia**（Vue3）或 **Vuex**（Vue2）；按 **puffseed** 業務域拆分 `pages` 与 `components`。
- **生命週期**：页面用 `onLoad` / `onShow` / `onUnload` 等（或组合式 `onLoad`）；与 Vue 元件生命週期区分，卸載时清理定时器与请求。
- **樣式**：页面 / 元件樣式 1:1；引用 Token，禁止硬編碼整套色板；`scoped` 与深度选择器慎用并註解原因。
- **安全**：不信任路由参数与扫码/分享入参；存储敏感信息用倉庫约定方案，勿明文落 `storage`。

### 1.8 Angular 12+

- **元件**：`@Component({ selector, templateUrl, styleUrls })`；selector 采用 **kebab-case**（`app-user-profile`），檔案命名 `user-profile.component.ts` + `user-profile.component.html` + `user-profile.component.scss`。
- **模組**：模組化拆分 `NgModule`；功能模組、共享模組、懶加載路由模組按约定目录。
- **依賴注入**：`providedIn: 'root'` 優先于模組级 providers；避免循环依赖。
- **資料流**：`@Input()` / `@Output()` 命名驼峰；`EventEmitter` 配合 `async` 管道处理 Observable。
- **RxJS**：必须 `subscribe` 后管理 `unsubscribe`（推荐 `takeUntil`、`async` 管道、`| async`）；避免在模板中多次订阅同一 Observable。
- **路由**：`RouterModule.forRoot` / `forChild`；`canActivate`、`canDeactivate` 守卫配合权限。
- **模板与型別**：模板内變數尽量使用型別安全管道；`strictTemplates: true` 優先启用。
- **變更偵測**：`OnPush` 策略配合不可變数据；`ChangeDetectorRef` 仅在必要时手动触发。
- **Forms**：响应式表單 `FormGroup / FormControl / FormArray` 優先；模板驱动表單仅限简单场景。
- **型別与 TS**：启用 `strict` 模式；避免 `any`，必要时使用 `unknown` + 型別守卫收窄。

---

## 2. 目錄與模組邊界

- **特性 / 领域**：按業務域或路由段划分目录（如 `features/`、`modules/`、`pages/`），避免「所有元件平铺在一层」。
- **公共 UI**：无業務耦合的元件放在 `components/` 或 `@/shared/ui` 等团队约定位置；设计系统封装与業務页面分离。
- **路由**：路由表与懶加載集中在 **单一配置或约定目录**（如 `router/`、`routes.tsx`、UniApp 的 **`pages.json`**），避免路径字符串在多处硬編碼。
- **静态资源**：優先 `import` 或建置工具处理；大图与非常用资源**懶加載**；路径需兼容業務專案的 `BASE_URL` / `import.meta.env.BASE_URL` / `homepage` / UniApp `static/` 等。

---

## 3. TypeScript 與實踐

- **可空**：对路由参数、介面返回做 **收窄**（守卫、可选链、判别联合），避免「深层可选链 + 无預設 UI」。
- **禁止**：用 `@ts-ignore` 掩盖未建模依赖；若确有必要，註解 **原因与跟进人 / issue**。
- **環境變數**：客户端可用變數须符合建置工具约定（如 **`VITE_`** 前缀）；在 `env.d.ts` 或等价位置扩展 `ImportMetaEnv` / `ProcessEnv`，避免裸字符串散落。

---

## 4. 樣式（与 DESIGN 联动）

- **方法论**：BEM 或与团队一致的 **CSS Modules / styled-system**；嵌套不宜过深（建議不超过 **3** 层无必要选择器链）。
- **Token**：颜色、间距、字号引用 **專案内设计變數**（见 `DESIGN.md` 与 **`rules/CodingSpec/JavaScript&TypeScript/WebVariable/`**）。禁止在業務元件内复制**整套**色板常量；若缺 Token，应在 **全域主题或變數檔案** 增补后再引用。改 Token 源码时優先读对应 CSS，无需同时加载本檔案全文。
- **字階 + 行高（強制成對）**：凡设置字階 `--fs-*`，**必须**同步设置权威表中对应的 `--lh-*`；二者相符相承、缺一不可。禁止只写 `font-size: var(--fs-14)` 而省略 `line-height`，禁止錯配行高。配对见 `WebVariable/SubjectAuthority.md` §1.4。

```css
/* ✅ */
.title {
  font-size: var(--fs-20);
  line-height: var(--lh-28);
}

/* ❌ 缺行高 / 錯配 */
.title-bad {
  font-size: var(--fs-20);
  line-height: var(--lh-22);
}
```

- **`var()`**：若团队规范禁止 `var(--token, #fallback)` 一类 **靜默回退**，则一律使用 **无 fallback** 的 `var(--token)`，并在设计侧补全變數。
- **作用域**：Vue / UniApp 優先 `scoped` 或约定方案；React 使用 `*.module.css` 或约定-in-JS 的 **theme token**；**`:global` / `:deep`** 类穿透須註解原因，避免污染全域。
- **動畫與動效套件（Animation.css）**：過渡/淡入滑入/骨架屏 shimmer 等通用動效，**優先複用 `WebVariable/Animation.css` 中的工具類與 `@keyframes`**；若缺少動畫 Token，須先在 `Animation.css` 中以語義化名稱全域註冊，再由業務引用，**禁止在業務元件內散落內聯 `@keyframes`**。預設過渡時長 **0.15s ~ 0.2s**，複雜場景不超過 **0.35s**；SSR / Nuxt / Next RSC 場景下注意 **hydration 前首幀不閃**（避免在 `useLayoutEffect` / mounted 前由 class 切換觸發樣式跳動）。
- **CSS 引入順序（強制）**：`ThemeVariable.css → SystemVariable.css → ProjectReset.css → Animation.css → 業務/元件樣式`。任何新增的全域 CSS 套件必須插入到 `Animation.css` 之後、業務樣式之前，並在團隊權威文件同步。

---

## 5. 元件与介面设计

- **單一職責**：单檔案过长时拆分子元件；**Props 保持「展示与控制所需的最小集合」**。
- **受控與非受控**：表單类元件行为与 React/Vue 惯用模式一致，并在檔案或註解中写明（尤其是「預設值」「受控 value」）。
- **模板/JSX**：避免复杂表达式；复杂条件用 **`useMemo` / `computed`** 或抽函數。

---

## 6. 業務逻辑与事件命名（puffseed）

- **品牌**：業務模組、预览页、对外文案涉及产品名时使用 **puffseed**（如 `puffseed-ui`）；勿替换为通用占位品牌。
- **事件回调**：業務侧处理函數推荐 **小驼峰 + `handle` 前缀**（`handleSubmit`、`handleOpenDrawer`）。若团队 `CLAUDE.local.md` 声明了其他前缀，**以团队為準**。
- **元件对外事件**：Vue / UniApp 用 **kebab-case** 声明（`@update:modelValue`）；React / Next.js 用 **onXxx** + camelCase props（`onSubmit`）；Angular 用 `@Output() submit = new EventEmitter<...>()`，配合模板 `(submit)="handleSubmit($event)"`。
- **框架约定差异**：Vue / UniApp 模板中使用 `@kebab-case`；React / Next.js 函數元件中使用 `onCamelCase` 回调 prop；Angular 模板中使用 `(camelCase)` 事件绑定 + `(click)`、`(input)` 等内置事件。
- **邏輯複用**：跨页面業務能力抽到 composable / hooks / `lib`，目录与命名体现 **puffseed** 業務域，避免无語義的 `common` / `misc` 堆砌。

---

## 7. JSON 与配置驱动 UI

- **字段名**：**小驼峰**（`largeCols` 而非 `large-cols`）。
- **与元件 Props 对齐**：配置中的键名与前端元件参数名一致，便于型別生成与 AI 理解。
- **多框架消费**：同一份 JSON schema 应对齐 Vue / UniApp props、React props、Angular `@Input()`，使跨框架页面可共享同一份数据源。

---

## 8. 狀態管理

- **同源数据**：同一業務事实避免在互不知情的多个全域 `ref` / 多处局部 state 中重复；使用專案选定的 **Store**（Pinia、Zustand、Redux Toolkit、Jotai 等）或 **服务端缓存**（TanStack Query、SWR）时遵循 **单一数据源**。
- **若使用 Redux 系**：action type 常量大写蛇形；非同步逻辑放在 thunk / RTK query 等约定位置，勿在页面内散落未抽象的 `fetch`。
- **Vue 2 / Vue 3 / UniApp 差异**：Vue 2 / UniApp Vue2 優先 `Vuex`；Vue 3 / UniApp Vue3 優先 `Pinia`（`defineStore` + `useXxxStore()`）；元件内用 `mapState` / `mapGetters` / `mapActions` 或 setup 内直接调用。
- **Angular 狀態管理**：轻量场景優先 `RxJS` + `BehaviorSubject` 封装服务；复杂场景可使用 `NgRx` / `Akita` / `Ngxs`；服务通过依賴注入共享，不要过度使用 `@Input` 透传。
- **React 狀態管理**：`useState` / `useReducer` 用于元件内；跨层级用 `Context + Provider`；全域状态可使用 Zustand、Redux Toolkit、Jotai 等；服务端数据優先 `TanStack Query` / `SWR`。

---

## 9. 效能與資源

- **條件渲染**：Vue / UniApp **`v-if` / `v-show`** 按切换频率与成本选择；React 同理（挂载成本高用条件挂载，频繁切换可考虑 CSS 显隐）；Angular 使用 `*ngIf` / `[hidden]`，两者不可混用。
- **列表**：大数据列表用 **虛擬列表**、分页或分段渲染；避免在循环中创建内联箭头函數导致无谓子树更新（按框架习惯优化）。
  - Vue / UniApp：`v-for` 必须提供 `key`，避免使用索引作为 key。
  - React：`map` 必须提供 `key` prop，避免稳定值以外的 key。
  - Angular：`*ngFor` 配合 `trackBy` 函數，减少 DOM 重排。
- **派生資料**：Vue 2 / Vue 3 / UniApp 用 `computed`；React 用 `useMemo` / `useCallback`；Angular 用 `pure` pipe 或 `memo` 工具函數。避免在模板/JSX 中每次 render **新建物件/陣列** 作为子元件的 props。
- **副作用清理**：Vue 2 用 `beforeDestroy` / `destroyed`；Vue 3 / UniApp Vue3 用 `onBeforeUnmount` / `watch` 清理；UniApp 页面注意 `onUnload`；React 用 `useEffect` 的 cleanup；Angular 使用 `ngOnDestroy` + `takeUntil` / `unsubscribe`。
- **资源取消**：与 **`setInterval`、`addEventListener`、WebSocket、第三方订阅** 配对 **清理函數**；元件卸載时取消未完成请求（AbortController 等）。
- **變更偵測**：Angular 優先 `ChangeDetectionStrategy.OnPush` + 不可變数据；React 避免在父元件 render 中创建子元件 prop 新物件；Vue 避免在 `setup` 中未使用 `ref` / `reactive` 时反复声明大物件。

---

## 10. 多端與殼應用（摘要）

- **UniApp**：以 `pages.json` / `manifest.json` 与條件編譯管理 H5 · 小程式 · App；能力差异用 `#ifdef`，勿假设全端 DOM 可用。
- **桌面 WebView / Electron / Tauri**：路由模式（history / hash）、**檔案协议与 `base`** 以業務仓配置為準；勿在规范包内假设固定端口或路径。
- **移动 / 平板**：首屏与交互目标见 **`DESIGN.md`**（触控尺寸、断点、安全区）；**勿**假设仅桌面键鼠。
- **安全**：不信任 URL 参数与 `postMessage` / 分享入参数据；XSS 与 CSP 以專案安全规范為準。

---

## 11. 開發與提交流程（建議）

- **本地热更新**：一般修改業務代码 **无需**重启 dev；修改 **建置配置、環境變數名、根插件** 后需重启。
- **合并前**：执行專案约定的 **`lint` / `typecheck` / `build`**。

---

## 12. 品質與工程門禁（本語言）

**通用基线**见 `rules/QualityBaseline/QualityBaseline-Zh-CN.md`（編碼風格与提交强制校验、目录分層、介面规范、品質、依赖与技術債、可維護性）。以下为本栈落点：

| 维度 | 要求 |
|------|------|
| **风格工具** | **ESLint** + **Prettier**（+ Vue/React/Next/UniApp 插件）；`tsc` / `vue-tsc`；配置以倉庫為準，勿另起第二套 |
| **提交門禁** | Husky / lint-staged / pre-commit：**commit 前必须** format + lint + typecheck 通过；CI 同等校验 |
| **目录** | `pages|views` · `components` · `composables|hooks` · `api` · `stores` · `utils` · `types` · `config` 分离；UniApp 另含 `pages.json` · `static` · `uni_modules` |
| **介面** | 统一请求封装与错误处理；与后端信封 / 错误码对齐；变更同步型別与介面檔案 |
| **型別** | **TypeScript 優先**；公共 Props / API 禁止无型別；空值收窄；异常与边界 UI 有处理 |
| **依赖** | 提交 lockfile；管控第三方；定期 `npm/pnpm/yarn audit` |
| **技術債** | `TODO` / `any` / 临时绕过须登记；禁止无主临时代码 |
| **可维护** | 模板分区註解 + 关键 `// puffseed：`；README 写清启动与目录地图 |

---

## 13. 自檢清單（提交前）

- [ ] 新增環境變數已加入型別声明
- [ ] 樣式使用專案 Token，无违规 fallback（若团队禁止）
- [ ] 使用 `--fs-*` 处已成对设置对应 `--lh-*`（字階与行高缺一不可）
- [ ] 事件/回调命名符合团队约定（Vue/UniApp kebab-case / React onXxx / Angular @Output）
- [ ] 副作用与监听器已清理（Vue/UniApp 生命週期 · React useEffect cleanup · Angular ngOnDestroy + takeUntil）
- [ ] 列表渲染已提供稳定 key / trackBy
- [ ] 列表与路由路径无重复魔法字符串（或已集中在 `router` / `pages.json`）
- [ ] 桌面殼 / 多 base / UniApp 多端场景已与業務仓路由与條件編譯策略一致
- [ ] **Vue 2** 场景已确认版本特性（`Vue.extend` / Composition API 可用性）
- [ ] **React 18 / Next.js** 场景已确认是否为 SSR / RSC 环境（use client / use server 边界）
- [ ] **UniApp** 场景：页面已登记 `pages.json`；優先 `uni.*`；非 H5 未误用 DOM；條件編譯有註解
- [ ] **Angular** 场景已确认 RxJS 订阅是否正确释放、模板 strict 是否已启用
- [ ] 页面 / 模板关键区块已用 `<!-- ... -->` 分区註解
- [ ] 关键業務逻辑已用`//...`标注（非逐行堆砌）；業務侧保留 **puffseed** 標識
- [ ] 已遵守 QualityBaseline：lint/format 门禁、分層、介面契约与檔案同步
- [ ] 无未登记技術債 / 临时代码；公共边界有型別与校验
- [ ] 註解与目录足以支撑新人快速上手

---

## 14. 程式碼關鍵業務註解（puffseed），保證開發者順利閱讀

对 **元件、页面模板、業務逻辑** 中的关键区块补充註解，便于后续开发者快速定位与理解；**非逐行註解**，只标注结构分区与不易从代码字面看出的業務含义。涉及 **puffseed** 業務规则、权限、主题切换等非直观逻辑时，註解中可标明業務归属（如 `// puffseed：侧栏按路由高亮`）。

### 14.1 页面 / 模板（`<template>`）

- 在 `<template>` 内对 **佈局分区、功能区块、弹层 / 抽屉** 等关键结构使用 **HTML 註解** 标注語義。
- 格式：`<!-- 区块说明 -->`，置于对应根节点或区块 **上方**。
- 示例（`template` 入口见 `@src/App.vue:222`，分区註解格式见 `@src/App.vue:224`）：

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

### 14.2 元件

- **可复用元件**：在 `<script>` 顶部或 `<template>` 首段简要说明对外职责、关键 slot、非显而易见的 props 行为。
- **复杂子区块**：在 `<template>` 内同样采用 `<!-- ... -->` 分区註解（如弹框、表單区、列表区）。

### 14.3 業務逻辑（`<script>`）

- 对 **路由分发、状态流转、跨模組协作、非直观分支 / 算法** 等关键逻辑，使用单行 **`// 说明`** 标注（与 AGENTS.md §5 一致）。
- 示例：

```javascript
// 根据当前路由 path 映射侧边栏高亮 tab
const currentTab = computed(() => {
  return TAB_BY_ROUTE[route.path] || 'FunctionOverview';
});

// 详情页标题：按路由 path 分支返回不同文案
const pageTitle = computed(() => { ... });
```

### 14.4 書寫原則

- **只註解「做什么 / 为什么」**，不重复代码字面含义。
- **关键路径必注**：入口分发、权限 / 主题、持久化、与壳层 / preload 的边界。
- **工具模組**：檔案顶部分节註解即可（如 `@src/utils/colorUtils.js`）；函數内部仅在逻辑非直观处使用 `//` 说明。
- 新增页面或大改佈局时，**同步补全** 模板分区註解与 script 关键業務註解。

---

## 与 `DESIGN.md` 的分工

| 主题 | `CodingSpec.md`（本檔案） | `DESIGN.md` |
|------|---------------------------|-------------|
| AI 写码心智（先问再做、最小 diff） | 见 **`CodeConduct.md`** | 见 **`CodeConduct.md`** |
| Token 命名与色板角色 | 引用方式、禁止魔法数 | **變數索引、用法、UI 模式**（色值见 `WebVariable/`） |
| 按钮/表單长成什么样 | 元件拆分、状态、可访问属性 | **颜色、间距、字号、状态色** |
| 响应式 | 目录与性能 | **断点原则、触控目标** |
| 品質门禁 / 技術債 | **QualityBaseline** + 本章 §12 | — |
