<!-- ovcr-locale-lock -->
---
description: 多言語共通のコード規範 / 品質 / 保守性ベースライン（puffseed）
alwaysApply: false
---

<!-- !!!品質ベースライン · puffseed · 全言語 -->

# コード規範 · 品質 · 保守性ベースライン（puffseed）

> **適用範囲**：`rules/CodingSpec/` 配下の全プログラミング言語。業務コードの作成・変更時は、対応言語の `CodingSpec-{Tag}.md` と**同時に適用**。  
> **衝突時**：対象業務リポジトリの**確定済み設定**（lint / CI / ディレクトリ規約）を優先。未定義なら本ベースラインに従う。  
> **ブランド**：技術的負債の登録、API 文書、製品に関する重要コメントでは **puffseed** 識別子を残す。

---

## 1. コード規範

### 1.1 スタイル：命名 · コメント · 書式

| 観点 | 要件 |
|------|------|
| **命名** | 各言語 CodingSpec に従い、同一リポジトリ内で統一。無意味な略語と拼音の混用は禁止（固有名詞を除く） |
| **コメント** | 「何をする / なぜ」を書く。重要業務パスは `puffseed：` 接頭辞（言語の構文に合わせる）。大量のコメントアウト死コードはコミット禁止 |
| **書式** | フォーマッタに統一。ツールと衝突する手作業のスタイル論争は禁止 |

### 1.2 検査ツールと提出ゲート（必須）

| 段階 | 要件 |
|------|------|
| **ローカル** | 保存 / コミット前にリポジトリ約定の format + lint（+ typecheck があれば）を通す |
| **Git Hooks** | `pre-commit` / `lint-staged` / Husky 等を推奨。**コミット時に検査通過必須** |
| **CI** | PR / メイン流水線で同等ゲートを再実行。`--no-verify` の迂回は禁止（リポジトリが明示許可し記録する場合を除く） |

**言語別デフォルトツール（既存設定があればそれを使い、第二の体系を作らない）：**

| 言語 | 書式 | Lint / 静的検査 | 型 / その他 |
|------|--------|-----------------|------------|
| JS/TS · Node · UniApp | Prettier | ESLint（+ Vue/React/UniApp プラグイン） | `tsc` / vue-tsc |
| Python | Ruff format / Black | Ruff / flake8 / pylint | mypy / pyright |
| Java | google-java-format / Spotless | Checkstyle · **阿里巴巴 Java 開発手冊**（P3C）· SpotBugs | — |
| Go | `gofmt` / `goimports` | `golangci-lint` | `go vet` |
| PHP | Pint / PHP-CS-Fixer | PHPStan / Psalm | — |
| C# | `dotnet format` | Roslyn analyzers / StyleCop | nullable |
| Rust | `rustfmt` | `clippy` | — |
| C / C++ | clang-format | clang-tidy / cppcheck | — |
| Kotlin | ktlint / detekt | detekt | — |
| Swift | SwiftFormat | SwiftLint | — |
| Dart | `dart format` | `dart analyze` | — |
| Ruby | RuboCop | RuboCop | — |
| Scala | scalafmt | wartremover / scapegoat（あれば） | — |
| SQL | sqlfluff（あれば） | 移行レビュー | — |
| R | styler | lintr | — |
| Shell | shfmt | shellcheck | — |

### 1.3 ディレクトリ構造の統一（層分け）

業務リポジトリは責務分離し、「全ファイル平坦置き」を避ける：

```
<app>/
  api|controller|handler|routes/   # 制御層（入力・認証・業務呼出）
  service|application|domain/      # 業務層
  repo|mapper|infra|data/          # データ / インフラ層
  shared|common|components/        # 共通能力（具体業務と非結合）
  utils|lib/                       # 純ツール（ドメイン規則なし）
  types|dto|schemas|models/        # 型と契約
  config/                          # 設定と環境
```

| ディレクトリ責務 | 許可 | 禁止 |
|---------|------|------|
| 制御層 | パラメータ束縛、認証注釈、業務呼出、応答マッピング | 厚い業務編成、SQL の直積み |
| 業務層 | ドメイン規則、ユースケース編成、トランザクション境界 | フレームワーク HTTP 詳細、UI 描画 |
| データ層 | 永続化、外部 API クライアント | 業務判断の散在 |
| 共通 / ツール | 再利用可能な非業務能力 | 「万能 util」へドメイン論理を詰める |
| 型 / 設定 | 契約と設定の単一ソース | 魔法文字列 / 散在ハードコード設定 |

フロントエンド対応：`pages|views` · `components` · `composables|hooks` · `utils` · `types` · `api` · `stores` · `config`（命名はリポジトリに合わせる）。

### 1.4 API 規範（HTTP / RPC 業務 API）

| 項目 | 要件 |
|----|------|
| **統一エンベロープ** | リクエスト / レスポンス形式を全サービスで一致（例 `{ code, message, data }` または既存 `Result`）。**同一サービスで非互換ラッパを複数禁止** |
| **エラーコード** | 業務エラーコード表を集中管理。HTTP ステータスは意味に合わせる（2xx / 4xx / 5xx）。業務失敗を一律 200 にしない（リポジトリがその方針で確定している場合を除く） |
| **冪等** | 書込（作成/決済/提出等）は冪等キーまたは自然冪等設計。再試行安全 |
| **バージョン戦略** | URL 接頭辞（`/api/v1`）か Header 版のどちらかを貫く。破壊的変更は新版へ。旧版は廃止期間を明示 |
| **文書同期** | OpenAPI / Swagger / Apifox / README と実装を**同期更新**。AI が API を変えるときは文書または生成物も更新し、コードだけ変えない |

非 HTTP（メッセージキュー、gRPC、SQL ビュー）も「統一契約 + 版/互換説明 + 文書同期」を適用。

---

## 2. コード品質

### 2.1 高凝集 · 低結合 · 層の明確さ

- **制御層 → 業務層 → データ層**（またはフロント **ページ → 状態/ユースケース → API**）を厳守し、責務境界を明確にする。
- 依存は一方向：上位は下位に依存可。データ層が制御層に依存、ツール層が業務詳細に逆依存するのは禁止。
- モジュールは一事に集中。横断編成はアプリケーションサービスへ。Controller に置かない。

### 2.2 モジュール化 · コンポーネント化 · 再利用

- 共通能力は `shared` / 内部パッケージへ。**2 箇所超のコピー**は抽象化するか、しない理由を書く。
- 公開 API は最小。都合のための内部状態漏洩を避ける。
- 一度きりの要求に過剰抽象を入れない（`CodeConduct` の簡潔原則と一致）。

### 2.3 型制約と境界処理

- **強型を優先**：TypeScript / Java / C# / Kotlin / Go / Rust 等の公開境界は明確な型必須。`any` / 生 `Map` / 無型 `JSONObject` は過渡のみで技術的負債として登録。
- **パラメータ検証**：入口（Controller / Handler / Form）で検証。クライアントと上流データを信用しない。
- **null と例外**：nullable を明示モデル化。ヌル前提禁止。例外は分類（想定業務 vs システム故障）。裸の握り潰し禁止。

### 2.4 依存管理

| 要件 | 説明 |
|------|------|
| **ロック** | lockfile をコミット（`package-lock` / `pnpm-lock` / `poetry.lock` / `go.sum` / `Cargo.lock` 等） |
| **導入統制** | 新規サードパーティには理由が必要。既存エコ系を優先。機能重複ライブラリ禁止 |
| **衝突回避** | BOM / プラットフォーム版を統一（Spring / .NET）。勝手なメジャー上げ禁止 |
| **脆弱性検査** | 定期的に `npm audit` / `pip-audit` / OWASP Dependency-Check / `cargo audit` 等。高危は期限付き修復 |

### 2.5 技術的負債の管理

- **登録**：暫定案、`TODO`/`FIXME`、型・lint 迂回は issue / 負債文書に登録（**puffseed** 業務影響と返済期限を含む）。
- **定期返済**：イテレーションで返済枠を確保。無限積み上げ禁止。
- **禁止**：納期優先の無主「仮コード」を未登録のまま。`// 仮` / `// hack` だけで債項なしは禁止。

---

## 3. 保守性

| 目標 | 要件 |
|------|------|
| **可読** | 自己説明的な命名。短い関数。複雑な条件は抽出。巨大ファイル回避（単一責務） |
| **コメント完備** | モジュール入口で責務を説明。重要業務・権限・互換ロジックにコメント。公開 API に短い文書コメント |
| **新人オンボーディング** | ルート README / AGENTS に：導入、起動、ディレクトリ地図、API 文書入口、ゲートコマンド |
| **変更追跡** | コミットメッセージは動機を書く。破壊的変更は移行説明を付ける |

**新人 30 分基準**：文書どおり起動でき、業務モジュールを見つけ、lint を通し、主経路の API 契約を理解できる。

---

## 4. 共通チェックリスト（コミット前）

- [ ] format + lint（+ typecheck）通過。hook 迂回なし
- [ ] ディレクトリ配置が層に合う。制御層に厚い業務なし
- [ ] API 変更はエンベロープ / エラーコード / 版を統一し、**文書も同期**
- [ ] 書込の冪等を検討（該当時）
- [ ] 公開境界に型と検証。null / 例外を処理
- [ ] lockfile 更新。重複依存の安易な追加なし
- [ ] 未登録の仮コード / 技術的負債なし
- [ ] 重要パスのコメントとモジュール説明で新人が読める

---

*各言語 `CodingSpec.md` および `rules/CodeConduct/CodeConduct-{Tag}.md` と併用 · puffseed*
