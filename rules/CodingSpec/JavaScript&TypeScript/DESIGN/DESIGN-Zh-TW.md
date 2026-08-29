<!-- ovcr-locale-lock -->
---
description: UI 佈局、樣式、元件視覺、主題與響應式相關任務時查閱（跨瀏覽器端技術棧 · VibeCoding）
alwaysApply: false
---

# 介面設計規範（VibeCoding · puffseed）

> **用途**：智能體在目標業務倉庫中編寫 UI 時的**設計規範來源**（**puffseed** 前端視覺體系）。  
> **適用範圍**：原生 HTML + CSS + JavaScript、Vue 2 / Vue 3、React 18+、**Next.js**、**Nuxt.js**、**UniApp**、Angular 12+ 等技術棧，以及 uTools 生態外掛（React / Vue）。  
> **執行原則**：先識別目標倉庫的專案模式（見 `AGENTS.md` §0）與實際框架，再按對應章節落地。預覽頁與品牌文案保持 **puffseed** / **puffseed-ui** 標識。

---

## 1. 設計定位（通用）

| 維度 | 說明 |
|------|------|
| 視覺風格 | 簡潔工具風 · 語義化 Token · 卡片化佈局 |
| 設計哲學 | 資訊密度適中 · 內容可讀優先 · 深淺色一致體驗 |
| Token 原則 | 禁止在業務元件硬編碼主題色；一律引用 CSS 變數 |
| 樣式隔離 | 元件樣式在元件內 · 頁面樣式在頁面內 · 全域 Token 在 `rules/CodingSpec/JavaScript&TypeScript/WebVariable/` |

各倉庫的具體色值、佈局尺寸以 **Token 原始碼** 與 **預覽 HTML** 為準，勿在規範中機械複製裸色值。

---

## 2. CSS 架構與 Token 體系

### 2.1 樣式分層（跨框架）

```
rules/CodingSpec/JavaScript&TypeScript/WebVariable/     # 設計 Token 與全域重置（唯一維護處，業務專案不重複定義）
  ThemeVariable.css     # 主題色 / 文本色
  SystemVariable.css    # 間距 / 字號 / 陰影等系統變數
  ProjectReset.css      # 瀏覽器重置 + 根節點基礎樣式
src/ 或 app/            # 框架入口引入上述 CSS
layout/                 # 佈局級樣式（僅佈局模組內）
components/             # 可複用元件（scoped / CSS Modules）
pages/ 或 views/        # 頁面級樣式（僅對應頁面內）
```

| 技術棧 | 全域 CSS 引入方式 | 元件樣式隔離 |
|--------|------------------|-------------|
| 原生 HTML/CSS/JS | `<link>` 於 `index.html` | BEM / 頁面級 `<style>` |
| Vue 2 / Vue 3 | 入口 `main.js` / `main.ts` 中 `import` | `<style scoped>` / SCSS scoped |
| UniApp | `App.vue` / `uni.scss` 或入口引入；小程式端注意 CSS 變數支援 | 頁面/元件樣式 + `rpx`；條件編譯樣式 |
| React 18+ | `index.jsx` / `main.tsx` 中 `import` | CSS Modules / styled-components |
| Angular 12+ | `angular.json` `styles` 陣列 | 元件 `styleUrls` + `:host` |

**1:1 原則**：元件樣式僅在元件內編寫；頁面模組樣式僅在對應頁面內編寫；佈局樣式僅在佈局模組內編寫。**禁止**在業務元件中硬編碼魔法色；一律引用 CSS 變數。**禁止**在業務專案中重複定義已在 WebVariable 中的 Token。

### 2.2 Token 原始碼位置與引入

| 檔案 | 職責 |
|------|------|
| `rules/CodingSpec/JavaScript&TypeScript/WebVariable/ThemeVariable.css` | **主題色與文本色**（唯一維護處） |
| `rules/CodingSpec/JavaScript&TypeScript/WebVariable/SystemVariable.css` | 間距、佈局、字號、圖示尺寸、邊框寬度、複合邊框/陰影 |
| `rules/CodingSpec/JavaScript&TypeScript/WebVariable/ProjectReset.css` | 全域重置、`html`/`body` 基礎樣式 |
| `rules/CodingSpec/JavaScript&TypeScript/WebVariable/Animation.css` | **全域動效工具類**：入場、強調、載入 spinner、骨架屏、滾動顯現等；優先複用類名，**禁止**在元件內散寫未登記的 `@keyframes` |

入口引入順序：

```javascript
import "../rules/CodingSpec/JavaScript&TypeScript/WebVariable/ThemeVariable.css";
import "../rules/CodingSpec/JavaScript&TypeScript/WebVariable/SystemVariable.css";
import "../rules/CodingSpec/JavaScript&TypeScript/WebVariable/ProjectReset.css";
import "../rules/CodingSpec/JavaScript&TypeScript/WebVariable/Animation.css";
import "./main.css";  // 應用級補充（如 #app）
```

擴展 Token 時：**主題色/文本色** 寫入 `ThemeVariable.css`；**尺寸/間距/佈局** 寫入 `SystemVariable.css`；**重置規則** 僅在確有全域需求時改 `ProjectReset.css`；**新 keyframes / 動效工具** 先補 `Animation.css`。

### 2.3 規則拔插機制

當前預設啟用 **通用介面設計規範**（`ThemeVariable.css` + `SystemVariable.css`）。開發者若需不同風格，可在 `WebVariable/` 或 `Extensions/` **追加**擴展 CSS 並在入口引入，**不修改核心檔案**。詳見 `AGENTS.md` §2.5。

### 2.4 核心變數索引

色值以 **`ThemeVariable.css`** 為唯一原始碼；間距/字號/複合邊框以 **`SystemVariable.css`** 為準。視覺對照在瀏覽器開啟 **`PreView/LightDesignSpec.html`** · **`DarkDesignSpec.html`**（勿將預覽 HTML 全文載入 AI 上下文）。

下表僅列**變數名與用途**，不複製 hex。

#### 主題色與文本色（ThemeVariable.css）

| 類別 | 變數 | 用途 |
|------|------|------|
| 標準色 | `--primary` · `--primary-hover` · `--primary-active` · `--primary-bg` · `--primary-border` | 主題色及變體 |
| 功能色 | `--success` · `--warning` · `--info` · `--error`（各含 hover/active/bg/border） | 狀態回饋 |
| 輔助色 | `--hover` · `--border` · `--divider` · `--bg` · `--white` · `--black` | 通用介面底色與邊框 |
| 文本（淺底） | `--title` · `--main-text` · `--secondary-text` · `--disabled-text` | 淺色背景文字層級 |
| 文本（深底） | `--title-dark` · `--main-text-dark` · `--secondary-text-dark` · `--disabled-text-dark` | 深色背景文字層級 |

#### 系統尺寸（SystemVariable.css）

| 類別 | 變數示例 | 用途 |
|------|---------|------|
| 間距 | `--size-8` · `--size-16` · `--size-24` · `--size-48` | 元素/模組/單元間距 |
| 佈局 | `--layout-header` · `--layout-footer` · `--layout-aside` · `--layout-content` | 頁頭/頁腳/側欄/版心 |
| 字號 | `--fs-12` · `--fs-14` · `--fs-16` · `--fs-20` | 輔助/正文/小標題/大標題 |
| 圖示 | `--wh-16` · `--wh-24` | 圖示與操作按鈕尺寸 |
| 邊框寬度 | `--border-fine` · `--border-1` | 邊框線寬檔位 |
| 複合邊框/陰影 | `--line` · `--solid` · `--shadow` · `--shadow-bottom` | 引用 `var(--border)` |

色值等寬展示：`font-family: 'SF Mono', Consolas, Monaco, monospace`

---

## 3. 視覺參考

| 資源 | 說明 |
|------|------|
| `.../PreView/LightDesignSpec.html` | 淺色模式 Token 與元件預覽 |
| `.../PreView/DarkDesignSpec.html` | 深色模式 Token 與元件預覽 |

預覽頁透過 `<link>` 引入 ThemeVariable 與 SystemVariable，色板區展示十六進位速查，元件區按變數渲染。

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

### 4.2 主 / 次按鈕

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

### 4.3 程式碼區塊

```scss
.code-block {
  background: #1e1e2e;  /* 固定深色程式碼底，深淺模式通用 */
  color: #cdd6f4;
  padding: var(--size-20);
  border-radius: var(--size-8);
  font-family: 'SF Mono', Consolas, Monaco, monospace;
}
```

### 4.4 過渡動效

互動態統一：`transition: ... 0.15s~0.2s ease`

---

## 5. 各框架樣式落地對照

| 場景 | Vue 3 | UniApp | React 18+ / Next.js | Angular 12+ | 原生 JS |
|------|-------|--------|---------------------|-------------|---------|
| 全域 Token | `main.ts` import WebVariable | `App.vue` / `uni.scss` 對映 | 入口 / 根 layout import | `angular.json` styles | `<link>` in HTML |
| 元件樣式 | SCSS scoped | 頁面/元件樣式 + rpx | CSS Modules | 元件 SCSS + `:host` | 頁面 CSS / BEM |
| 動態樣式 | `:style` / class 繫結 | `:style` / class + `#ifdef` | `style` / `className` | `[ngStyle]` / `[class]` | `element.style` / classList |

---

## 6. VibeCoding 編碼規則

### 6.1 必須做

1. **Token 優先**：顏色、圓角、陰影使用 WebVariable 變數
2. **樣式 1:1**：元件 / 頁面 / 佈局樣式各在其作用域內
3. **過渡**：`transition: ... 0.15s~0.2s ease`
4. **元件樣式隔離**：Vue scoped / React CSS Modules / Angular 元件樣式，避免污染全域
5. **框架約定**：業務處理函式 `handle` 前綴；副作用在卸載時清理

### 6.2 禁止做

1. 硬編碼主題色值（程式碼區塊固定深色底除外）
2. 在業務元件或專案中重複定義已在 WebVariable 中的 Token
3. 繞過已定稿的全域 CSS 架構私自引入第二套色板
4. 擅自修改 `WebVariable/` 核心檔案（擴展套件除外且須開發者明確要求）

### 6.3 新建頁面 Checklist

- [ ] WebVariable 已在入口引入
- [ ] 頁面樣式僅在對應頁面檔案內
- [ ] 複用元件樣式在元件內，引用 Token
- [ ] 640px 斷點佈局正常
- [ ] 深淺色 / 深淺背景下 Token 對比度正常

---

*最後同步：`rules/CodingSpec/JavaScript&TypeScript/WebVariable/` · `AGENTS.md` · `PreView/`*
