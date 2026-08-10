<!-- ovcr-locale-lock -->
---
description: UI レイアウト・スタイル・コンポーネント視覚・テーマ・レスポンシブ作業時に参照（クロスブラウザ · VibeCoding）
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

# 画面設計規範（VibeCoding · puffseed）

> **用途**：業務リポジトリで UI を書く際の**設計規範ソース**（**puffseed** フロント視覚体系）。  
> **適用範囲**：素の HTML + CSS + JavaScript、Vue 2 / Vue 3、React 18+、**Next.js**、**UniApp**、Angular 12+、および uTools プラグイン（React / Vue）。  
> **原則**：先にプロジェクトモード（`AGENTS.md` §0）と実フレームワークを識別し、対応章に従う。プレビューとブランド文案は **puffseed** / **puffseed-ui** を維持。

---

## 1. 設計の位置づけ（共通）

| 観点 | 説明 |
|------|------|
| 視覚スタイル | 簡潔ツール風 · 意味的 Token · カードレイアウト |
| 設計思想 | 適度な情報密度 · 可読性優先 · 明暗で一貫した体験 |
| Token 原則 | 業務コンポーネントにテーマ色の直書き禁止。必ず CSS 変数 |
| スタイル隔離 | コンポーネント内 / ページ内 / グローバル Token は `WebVariable/` |

具体色値・寸法は **Token ソース** と **プレビュー HTML** を正とし、本規範へ hex を機械コピーしない。

---

## 2. CSS アーキテクチャと Token

### 2.1 スタイル階層（クロスフレームワーク）

```
rules/CodingSpec/JavaScript&TypeScript/WebVariable/     # 設計 Token とグローバルリセット（唯一の保守箇所）
  ThemeVariable.css     # テーマ色 / テキスト色
  SystemVariable.css    # 余白 / 字号 / 影など
  ProjectReset.css      # ブラウザリセット + ルート基礎
src/ または app/        # フレームワーク入口で上記を import
layout/                 # レイアウト専用
components/             # 再利用コンポーネント（scoped / CSS Modules）
pages/ または views/    # ページ専用
```

| 技術スタック | グローバル CSS | コンポーネント隔離 |
|--------|------------------|-------------|
| 素の HTML/CSS/JS | `index.html` の `<link>` | BEM / ページ `<style>` |
| Vue 2 / Vue 3 | `main.js` / `main.ts` で `import` | `<style scoped>` / SCSS scoped |
| UniApp | `App.vue` / `uni.scss` 等；小プログラムは CSS 変数に注意 | ページ/コンポーネント + `rpx`；条件コンパイル |
| React 18+ | `index.jsx` / `main.tsx` で `import` | CSS Modules / styled-components |
| Angular 12+ | `angular.json` `styles` | `styleUrls` + `:host` |

**1:1 原則**：コンポーネント / ページ / レイアウトのスタイルは各スコープ内のみ。魔法色の直書き禁止。WebVariable 既存 Token の再定義禁止。

### 2.2 Token の場所と導入

| ファイル | 役割 |
|------|------|
| `.../WebVariable/ThemeVariable.css` | **テーマ色とテキスト色**（唯一ソース） |
| `.../WebVariable/SystemVariable.css` | 余白・レイアウト・字号・アイコン・枠幅・複合枠/影 |
| `.../WebVariable/ProjectReset.css` | グローバルリセット、`html`/`body` |

導入順：

```javascript
import "../rules/CodingSpec/JavaScript&TypeScript/WebVariable/ThemeVariable.css";
import "../rules/CodingSpec/JavaScript&TypeScript/WebVariable/SystemVariable.css";
import "../rules/CodingSpec/JavaScript&TypeScript/WebVariable/ProjectReset.css";
import "./main.css";
```

拡張時：色 → ThemeVariable；寸法/レイアウト → SystemVariable；リセット → 真にグローバルなときのみ ProjectReset。

### 2.3 抜挿メカニズム

既定は ThemeVariable + SystemVariable。別ブランドは `WebVariable/` または `Extensions/` に **追加** CSS を置きコアを改変しない。`AGENTS.md` §2.5 参照。

### 2.4 主要変数インデックス

色は ThemeVariable、余白/字号は SystemVariable。視覚確認は PreView の Light/Dark HTML（全文を AI に載せない）。

#### テーマ色とテキスト色

| 区分 | 変数 | 用途 |
|------|------|------|
| 標準色 | `--primary` 系 | テーマと変体 |
| 機能色 | `--success` · `--warning` · `--info` · `--error` 系 | 状態フィードバック |
| 補助色 | `--hover` · `--border` · `--divider` · `--bg` · `--white` · `--black` | 面と枠 |
| テキスト（明） | `--title` · `--main-text` · `--secondary-text` · `--disabled-text` | 明背景 |
| テキスト（暗） | `--title-dark` など | 暗背景 |

#### システム寸法

| 区分 | 例 | 用途 |
|------|---------|------|
| 余白 | `--size-8` · `--size-16` · `--size-24` · `--size-48` | 要素/モジュール/ユニット |
| レイアウト | `--layout-header` · `--layout-footer` · `--layout-aside` · `--layout-content` | ヘッダー/フッター/サイドバー/版心 |
| 字号 | `--fs-12` · `--fs-14` · `--fs-16` · `--fs-20` | 補助/本文/小見出し/大見出し |
| アイコン | `--wh-16` · `--wh-24` | アイコンと操作 |
| 枠幅 | `--border-fine` · `--border-1` | ボーダー幅 |
| 枠/影 | `--line` · `--solid` · `--shadow` | `var(--border)` 参照 |

---

## 3. 視覚リファレンス

| 資源 | 説明 |
|------|------|
| `PreView/LightDesignSpec.html` | ライト Token・コンポーネント |
| `PreView/DarkDesignSpec.html` | ダーク Token・コンポーネント |

---

## 4. よく使う UI パターン

### 4.1 パネルカード / 4.2 主次ボタン / 4.3 コードブロック / 4.4 トランジション

Zh-CN 版と同じ SCSS パターンを用いる（`var(--*)`）。コードブロックの深い背景 `#1e1e2e` は明暗共通の固定値。遷移は `0.15s~0.2s ease`。

```scss
.panel {
  background: var(--white);
  border: var(--solid);
  border-radius: var(--size-8);
  padding: var(--size-20);
  box-shadow: var(--shadow);
}
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
.code-block {
  background: #1e1e2e;
  color: #cdd6f4;
  padding: var(--size-20);
  border-radius: var(--size-8);
  font-family: 'SF Mono', Consolas, Monaco, monospace;
}
```

---

## 5. フレームワーク対応表

| 場面 | Vue 3 | UniApp | React / Next | Angular | 素の JS |
|------|-------|--------|--------------|---------|---------|
| グローバル Token | `main.ts` import | `App.vue` / `uni.scss` | 入口 / root layout | `angular.json` | HTML `<link>` |
| コンポーネント | SCSS scoped | ページ/部品 + rpx | CSS Modules | SCSS + `:host` | BEM |
| 動的スタイル | `:style` / class | `:style` + `#ifdef` | `style` / `className` | `[ngStyle]` | classList |

---

## 6. VibeCoding ルール

### 6.1 必須

1. Token 優先（色・角丸・影）
2. スタイル 1:1（コンポーネント / ページ / レイアウト）
3. 遷移 `0.15s~0.2s ease`
4. スタイル隔離
5. `handle` 接頭辞；アンマウントで副作用クリーンアップ

### 6.2 禁止

1. テーマ色の直書き（固定コード背景を除く）
2. WebVariable Token の再定義
3. 第二の色板の持ち込み
4. コア WebVariable の無断変更

### 6.3 新規ページ Checklist

- [ ] 入口で WebVariable 導入済み
- [ ] ページスタイルはそのファイル内のみ
- [ ] 共有コンポーネントは Token 参照
- [ ] 640px でレイアウト正常
- [ ] 明暗コントラスト正常

---

*最終同期：`WebVariable/` · `AGENTS.md` · `PreView/`*
