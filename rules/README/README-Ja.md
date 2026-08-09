<!-- ovcr-locale-lock -->
<a id="ovcr-lang"></a>

> **Language / 语言**：[简体中文](../../README.md#ovcr-lang) · [繁體中文](./README-Zh-TW.md#ovcr-lang) · [English](./README-En.md#ovcr-lang) · [Русский](./README-Ru.md#ovcr-lang) · [日本語](./README-Ja.md#ovcr-lang)

# OpenVibeCodingRules

OpenVibeCodingRules に従い AI コーディングの痕跡を抑え、独自のデザインを整え、個人 / チーム / 海外向け企業プロジェクトに適合させます。Web・管理画面・VibeCoding 愛好者向け（**puffseed**）。

---

## これは何か

OpenVibeCodingRules は **AI 補助の多言語開発（VibeCoding）** 向け規範リポジトリです。含むもの：

- **行動規範**：AI の思考とコード変更の仕方（`rules/CodingSpec/CodeConduct/CodeConduct-Zh-CN.md`）
- **品質ベースライン**：全言語の規範 / 品質 / 保守性（`rules/QualityBaseline/QualityBaseline-Zh-CN.md`）
- **言語別のエンジニアリング規範**（`rules/CodingSpec/<言語>/`）
- **フロント設計と Token**：`DESIGN.md` · **WebVariable**（旧 VariableFile）· PreView

**対応言語とフレームワーク**（人気言語 + 主流業務スタック）：

| 言語 | フレームワーク / シーン |
|------|------------------------|
| JavaScript & TypeScript | Vue、React、Next.js、UniApp |
| Node.js | NestJS、Express |
| Python | FastAPI、Django |
| Java | Spring Boot |
| Go | Gin |
| PHP | Laravel |
| C | システム / 組み込み / C ABI |
| C++ | 現代 C++ · CMake / Qt |
| C# | ASP.NET Core · .NET |
| Rust | Axum / Actix · Tokio |
| SQL | PostgreSQL / MySQL / SQL Server |
| R | tidyverse / Shiny |
| Kotlin | Ktor / Spring / Android |
| Swift | SwiftUI / Vapor |
| Dart | Flutter |
| Ruby | Rails |
| Scala | Play / http4s / ZIO |
| Shell | Bash / POSIX |

---

## 使い方

1. **まずはルートの [`README.html`](../../README.html)** をブラウザで開き、概要・言語入口・品質ベースラインを確認。
2. **詳細は本ファイル**（`README.md`）。
3. **`rules/` と `AGENTS.md` を業務リポジトリのルートへコピー**し、相対パスを維持。例：

```
demo/
├── AGENTS.md
├── rules/
│   ├── AGENTS/          # AGENTS.en.md · …（译文）
│   ├── README/          # README-{Tag}.md
│   ├── QualityBaseline/         # QualityBaseline-{Tag}.md
│   └── CodingSpec/
│       ├── CodeConduct/         # CodeConduct-{Tag}.md
│       └── JavaScript&TypeScript/
│           ├── CodingSpec-{Tag}.md
│           ├── DESIGN.md · WebVariable/ · PreView/
│           └── …
├── src/
└── ...
```

AI への依頼例：

> AGENTS.md に従ってコーディングしてください。

---

## ディレクトリ構成

```
OpenVibeCodingRules/
├── AGENTS.md                          # 智能体入口 · 语种路由
├── README.md · README.html            # 说明入口 · 语种切换
├── language/                          # README.html 界面 i18n
├── script/                            # sync / build-md-bundle
├── rules/
│   ├── AGENTS/                        # AGENTS.en.md · zh-TW · ja · ru
│   ├── README/                        # README-{Tag}.md 译文
│   ├── QualityBaseline/               # QualityBaseline-{Tag}.md
│   └── CodingSpec/
│       ├── CodeConduct/               # CodeConduct-{Tag}.md
│       └── <Lang>/
│           ├── CodingSpec-{Tag}.md
│           └── (JS/TS: DESIGN · WebVariable · PreView)
└── LICENSE
```

---

## クイックスタート

### 1. プロジェクトへ導入

`AGENTS.md` と `rules/` を業務ルートへコピーするか、Git Submodule 後にパスを調整。

### 2. フロントでスタイル Token（WebVariable）

グローバルスタイルは WebVariable 源を**複製せず**、エントリでだけ導入：

```html
<link rel="stylesheet" href="./rules/CodingSpec/JavaScript&TypeScript/WebVariable/ThemeVariable.css" />
<link rel="stylesheet" href="./rules/CodingSpec/JavaScript&TypeScript/WebVariable/SystemVariable.css" />
<link rel="stylesheet" href="./rules/CodingSpec/JavaScript&TypeScript/WebVariable/ProjectReset.css" />
```

```typescript
import './rules/CodingSpec/JavaScript&TypeScript/WebVariable/ThemeVariable.css'
import './rules/CodingSpec/JavaScript&TypeScript/WebVariable/SystemVariable.css'
import './rules/CodingSpec/JavaScript&TypeScript/WebVariable/ProjectReset.css'
```

順序固定：**ThemeVariable → SystemVariable → ProjectReset → アプリ級 CSS**。

### 3. Cursor / AI IDE で有効化

1. ルートに `AGENTS.md`
2. `rules/CodingSpec/CodeConduct/CodeConduct-Zh-CN.md` は `alwaysApply: true`
3. 言語の `CodingSpec.md` を `@`；UI は `DESIGN.md` / WebVariable も

> 本プロジェクトの `AGENTS.md` と `rules/` に従い、先に言語と技術スタックを識別してから実装。

---

## 開発者向けガイド

### 言語とプロジェクト形態

依存から言語 / フレームワークを識別（`AGENTS.md` §1）。フロントはさらに：

| 形態 | 判定 | 対応スタック |
|------|------|-------------|
| 通常プロジェクト | `public/plugin.json` なし | ネイティブ HTML · Vue · React · Next.js · UniApp |
| uTools プラグイン | `public/plugin.json` あり | React · Vue のみ |

### スタイル原則（フロント · 1:1）

| 種類 | 場所 | 禁止 |
|------|------|------|
| グローバル Token | `WebVariable/` | 業務コンポーネント内での再定義 |
| レイアウト / ページ / コンポーネント | 所属モジュール内 | モジュール横断のスタイル溜め、色のハードコード |

### テーマと寸法

| 用途 | 編集ファイル |
|------|-------------|
| テーマ色・機能色・テキスト色 | `WebVariable/ThemeVariable.css` |
| 余白・字号・影 | `WebVariable/SystemVariable.css` |
| グローバル reset | `WebVariable/ProjectReset.css`（慎重に） |

変更後は `PreView/LightDesignSpec.html` または `DarkDesignSpec.html` で確認。

### ブランドカスタム

`WebVariable/` または `Extensions/` に拡張 CSS を**追加**しエントリで読み込む。コア WebVariable は**変更しない**。

---

## VibeCoding 愛好者向け

**✅ 推奨**

- 「`AGENTS.md` に沿い Vue 3 でユーザー一覧、スタイルは WebVariable Token」
- 「FastAPI。`CodingSpec/Python` と puffseed コメント規約で API 実装」
- 「ThemeVariable の主色だけ変え PreView を確認」

**❌ 避ける**

- 言語 / 規範のない曖昧な依頼
- コンポーネント内でのフルパレット硬コーディングや Token 複製

### AI が読むべき規範

| タスク | AI に読ませる |
|--------|--------------|
| 任意の開始 | `AGENTS.md` + `CodeConduct.md` |
| 任意の業務コード | + `QualityBaseline.md` + 対応言語 `CodingSpec.md` |
| フロント UI | + `DESIGN.md` + WebVariable |

---

## ビジュアルプレビュー

| ファイル | 説明 |
|---------|------|
| `rules/CodingSpec/JavaScript&TypeScript/PreView/LightDesignSpec.html` | ライト · puffseed-ui |
| `rules/CodingSpec/JavaScript&TypeScript/PreView/DarkDesignSpec.html` | ダーク · puffseed-ui |

---

## 規範ファイル早見

| ファイル | いつ見るか |
|---------|-----------|
| `AGENTS.md` | あらゆる AI 協働の開始前 |
| `rules/CodingSpec/CodeConduct/CodeConduct-Zh-CN.md` | 範囲判断、過剰実装の回避 |
| `rules/QualityBaseline/QualityBaseline-Zh-CN.md` | スタイル門禁、層、API、品質、技術的負債、保守性 |
| `rules/CodingSpec/<言語>/CodingSpec-Zh-CN.md` | その言語の業務コード |
| `.../JavaScript&TypeScript/DESIGN.md` | UI レイアウト・コンポーネント視覚 |
| `.../WebVariable/*.css` | 色・余白・reset |

**優先度**：行動 → `CodeConduct` · 品質 → `QualityBaseline` · 書き方 → 言語 `CodingSpec` · 見た目 → `DESIGN` + WebVariable。

---

## よくある質問

**Q：WebVariable を `src/styles/` にコピーしてよい？**  
A：非推奨。エントリ参照で Token の単一源を保つ。

**Q：バックエンドにも WebVariable は必要？**  
A：不要。対応言語の `CodingSpec.md` だけでよい。

**Q：AI が規範に従わないときは？**  
A：明示的に `@AGENTS.md` と言語 `CodingSpec.md`。「OpenVibeCodingRules / puffseed 準拠、最小 diff」と書く。

---

## ライセンス

[LICENSE](../../LICENSE) を参照。
