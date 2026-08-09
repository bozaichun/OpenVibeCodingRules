<!-- ovcr-locale-lock -->
<a id="ovcr-lang"></a>

> **Language / 语言**：[简体中文](../../AGENTS.md#ovcr-lang) · [繁體中文](./AGENTS.zh-TW.md#ovcr-lang) · [English](./AGENTS.en.md#ovcr-lang) · [Русский](./AGENTS.ru.md#ovcr-lang) · [日本語](./AGENTS.ja.md#ovcr-lang)


# AI アプリケーション開発 · ガイド（VibeCoding · puffseed）

本ファイルは **AI 支援の多言語アプリ開発** におけるグローバル規約です。VibeCoding / **puffseed** 業務シナリオでエージェントと開発者が共有します。

**位置づけ**：人気言語・主流フレームワーク向けの **多言語・多スタック** AI 支援プログラミングを対象とします。

| 言語 / ランタイム | 主なフレームワーク / 場面 | 規範ディレクトリ |
|--------------|----------------|---------|
| **JavaScript & TypeScript**（フロント） | Vue、React、Next.js、**UniApp** | `rules/CodingSpec/JavaScript&TypeScript/` |
| **Node.js**（バックエンド） | NestJS、Express | `rules/CodingSpec/Node.js/` |
| **Python** | FastAPI、Django | `rules/CodingSpec/Python/` |
| **Java** | Spring Boot | `rules/CodingSpec/Java/` |
| **Go** | Gin | `rules/CodingSpec/Go/` |
| **PHP** | Laravel | `rules/CodingSpec/PHP/` |
| **C** | システム / 組込み / C ABI | `rules/CodingSpec/C/` |
| **C++** | モダン C++ · CMake / Qt | `rules/CodingSpec/C++/` |
| **C#** | ASP.NET Core · .NET | `rules/CodingSpec/CSharp/` |
| **Rust** | Axum / Actix · Tokio | `rules/CodingSpec/Rust/` |
| **SQL** | PostgreSQL / MySQL / SQL Server | `rules/CodingSpec/SQL/` |
| **R** | tidyverse / Shiny | `rules/CodingSpec/R/` |
| **Kotlin** | Ktor / Spring / Android | `rules/CodingSpec/Kotlin/` |
| **Swift** | SwiftUI / Vapor | `rules/CodingSpec/Swift/` |
| **Dart** | Flutter | `rules/CodingSpec/Dart/` |
| **Ruby** | Rails | `rules/CodingSpec/Ruby/` |
| **Scala** | Play / http4s / ZIO | `rules/CodingSpec/Scala/` |
| **Shell** | Bash / POSIX | `rules/CodingSpec/Shell/` |

エージェントはまず**対象業務リポジトリ**の言語・フレームワークを特定し、対応する `CodingSpec` を読み込みます。**確定済み実装を優先**します。命名・コメント・プレビューでは **puffseed** ブランドを維持してください。

---

---

## エントリとロケール解決（必須）

**ルートの `AGENTS.md` が唯一の入口です。** 作業前に協業言語を決め、対応 Tag の規則ファイルを読み込みます。**Zh-CN パスの固定読みは禁止**（ロケールが `zh-CN`、または欠落時のフォールバック以外）。

### ロケール判定（優先度高→低）

1. ユーザーが明示した言語
2. 開いている / `@` 参照中の `rules/AGENTS/AGENTS.<locale>.md`（本ファイル ⇒ `ja` ⇒ Tag `Ja`）
3. 会話 / 製品 UI 言語
4. **既定**：`zh-CN` → ルート `AGENTS.md`

### ロケール → Tag

| ロケール | AGENTS | Tag |
|----------|--------|-----|
| `zh-CN` | `AGENTS.md` | `Zh-CN` |
| `zh-TW` | `rules/AGENTS/AGENTS.zh-TW.md` | `Zh-TW` |
| `en` | `rules/AGENTS/AGENTS.en.md` | `En` |
| `ja` | `rules/AGENTS/AGENTS.ja.md` | `Ja` |
| `ru` | `rules/AGENTS/AGENTS.ru.md` | `Ru` |

### パス（欠落時は `Zh-CN` にフォールバック）

- `rules/CodeConduct/CodeConduct-{Tag}.md`
- `rules/QualityBaseline/QualityBaseline-{Tag}.md`
- `rules/CodingSpec/<言語>/CodingSpec-{Tag}.md`
- UI: `DESIGN-{Tag}.md` または `DESIGN.md` + `WebVariable/`

## 0. プロジェクトモードと言語識別（開発前必須）

### 0.1 フロント追加モード（JS/TS フロントのみ）

| モード | 識別信号 | 対応スタック | 説明 |
|------|---------|-----------|------|
| **通常プロジェクト** | **なし** `public/plugin.json` | HTML/CSS/JS · Vue · React · Next.js · UniApp | 汎用 Web / 多端 |
| **uTools プラグイン** | **あり** `public/plugin.json` | **のみ** React · Vue（2 / 3） | uTools テンプレート |

### 0.2 識別フロー

1. 依存とエントリから言語を判定（§1）
2. フロントは `public/plugin.json` を確認（§0.1）
3. ロケール解決で Tag を決め、`CodeConduct-{Tag}.md` + `QualityBaseline-{Tag}.md` + `CodingSpec-{Tag}.md` を読む（欠落時 `Zh-CN`）
4. UI タスクのみ `DESIGN.md` と `WebVariable/` を追加

---

## 規範ファイルの役割

| ファイル | 役割 | 参照タイミング |
|---------|------|---------|
| `rules/CodeConduct/CodeConduct-Zh-CN.md` | AI の振る舞い（先に確認、最小 diff） | **任意のコーディング前** |
| `rules/QualityBaseline/QualityBaseline-Zh-CN.md` | **全言語**品質ベースライン | **業務コードの作成・変更時** |
| `rules/CodingSpec/<言語>/CodingSpec-Zh-CN.md` | 言語別エンジニアリング規範 | 該当言語の業務コード |
| `DESIGN.md` + `WebVariable/` | UI と Token | レイアウト・スタイル・テーマ |

**選定順**：CodeConduct → QualityBaseline → 言語 CodingSpec →（フロント）DESIGN + WebVariable。衝突時は業務リポジトリの確定実装を優先。

### 最小ロードセット

| タスク | 読み込む | 通常不要 |
|---------|--------|-------------|
| コーディング開始 | `AGENTS.md` · `CodeConduct.md` | 他言語 CodingSpec |
| 業務コード | + `QualityBaseline.md` + 言語 `CodingSpec.md` | 無関係な言語 |
| フロント UI | + `DESIGN.md` · WebVariable | PreView HTML 全文 |

---

## 1–7. フレームワーク・スタイル・行動・品質・チェックリスト

スタックを特定し対応 `CodingSpec` を読み込みます。スタイルは **WebVariable** Token のみ。行動は `CodeConduct.md`、品質は `QualityBaseline.md`。コミット前に format/lint/型チェック。ブランドは **puffseed**。

---

*Locale: ja · ルート AGENTS.md と同期 · puffseed*
