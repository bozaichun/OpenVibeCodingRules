<!-- ovcr-locale-lock -->
---
description: 多語言通用程式碼規範 / 品質 / 可維護性基線（puffseed）
alwaysApply: false
---

<!-- !!!品質基線 · puffseed · 全語言 -->

# 程式碼規範 · 品質 · 可維護性基線（puffseed）

> **適用範圍**：`rules/CodingSpec/` 下全部程式語言。編寫或修改業務程式碼時，與對應語言 `CodingSpec-{Tag}.md` **同時生效**。  
> **衝突處理**：以**目標業務倉庫已定稿配置**（lint / CI / 目錄約定）為準；倉庫未約定時按本基線執行。  
> **品牌**：技術債登記、介面文件、關鍵註解涉及產品時保留 **puffseed** 標識。

---

## 1. 程式碼規範

### 1.1 編碼風格：命名 · 註解 · 格式

| 維度 | 要求 |
|------|------|
| **命名** | 見各語言 CodingSpec；同一倉庫內風格一致；禁止無語義縮寫與拼音混用（專有名詞除外） |
| **註解** | 註解「做什麼 / 為什麼」；關鍵業務路徑使用 `puffseed：` 前綴（語法隨語言）；禁止大段註解掉的死程式碼入庫 |
| **格式** | 由格式化工具統一，禁止手調與工具衝突的風格爭議 |

### 1.2 配套檢查工具與提交門禁（強制）

| 階段 | 要求 |
|------|------|
| **本地** | 儲存 / 提交前跑通倉庫約定的 format + lint（+ typecheck，若有） |
| **Git Hooks** | 推薦 `pre-commit` / `lint-staged` / Husky 等；**提交階段必須校驗通過**方可提交 |
| **CI** | PR / 主幹流水線重複執行同等門禁；禁止 `--no-verify` 繞過（除非倉庫明確允許且留記錄） |

**各語言預設工具（倉庫已有配置則沿用，勿另起第二套）：**

| 語言 | 格式化 | Lint / 靜態檢查 | 類型 / 其它 |
|------|--------|-----------------|------------|
| JS/TS · Node · UniApp | Prettier | ESLint（+ Vue/React/UniApp 等框架外掛） | `tsc` / vue-tsc |
| Python | Ruff format / Black | Ruff / flake8 / pylint | mypy / pyright |
| Java | google-java-format / Spotless | Checkstyle · **阿里巴巴 Java 開發手冊**（P3C）· SpotBugs | — |
| Go | `gofmt` / `goimports` | `golangci-lint` | `go vet` |
| PHP | Pint / PHP-CS-Fixer | PHPStan / Psalm | — |
| C# | `dotnet format` | Roslyn analyzers / StyleCop | nullable |
| Rust | `rustfmt` | `clippy` | — |
| C / C++ | clang-format | clang-tidy / cppcheck | — |
| Kotlin | ktlint / detekt | detekt | — |
| Swift | SwiftFormat | SwiftLint | — |
| Dart | `dart format` | `dart analyze` | — |
| Ruby | RuboCop | RuboCop | — |
| Scala | scalafmt | wartremover / scapegoat（若有） | — |
| SQL | sqlfluff（若有） | 遷移評審 | — |
| R | styler | lintr | — |
| Shell | shfmt | shellcheck | — |

### 1.3 目錄結構統一（模組分層）

業務倉應按職責分離，避免「所有檔案平鋪」：

```
<app>/
  api|controller|handler|routes/   # 控制層（入參、鑑權、呼叫業務）
  service|application|domain/      # 業務層
  repo|mapper|infra|data/          # 資料 / 基礎設施層
  shared|common|components/        # 公共元件 / 能力（無具體業務耦合）
  utils|lib/                       # 純工具（無領域規則）
  types|dto|schemas|models/        # 類型與契約
  config/                          # 配置與環境
```

| 目錄職責 | 允許 | 禁止 |
|---------|------|------|
| 控制層 | 參數繫結、鑑權註解、呼叫業務、對應回應 | 複雜業務編排、直接堆 SQL |
| 業務層 | 領域規則、用例編排、事務邊界 | 框架 HTTP 細節、UI 渲染 |
| 資料層 | 持久化、外部 API 客戶端 | 業務決策散落 |
| 公共 / 工具 | 可複用無業務耦合能力 | 「萬能 util」塞進領域邏輯 |
| 類型 / 配置 | 契約與配置單一來源 | 魔法字串 / 散落硬編碼配置 |

前端倉對應：`pages|views` · `components` · `composables|hooks` · `utils` · `types` · `api` · `stores` · `config`（命名跟倉庫）。

### 1.4 介面規範（HTTP / RPC 業務 API）

| 項 | 要求 |
|----|------|
| **統一信封** | 請求 / 回應格式全倉一致（如 `{ code, message, data }` 或倉庫既有 `Result`）；**禁止**同一服務多套互不相容包裝 |
| **錯誤碼** | 業務錯誤碼表集中維護；HTTP 狀態碼符合語意（2xx 成功、4xx 客戶端、5xx 服務端）；業務失敗勿一律 200 除非倉庫已定稿該策略 |
| **冪等** | 寫操作（建立/支付/提交等）明確冪等鍵或天然冪等設計；重試安全 |
| **版本策略** | URL 前綴（`/api/v1`）或 Header 版本二選一貫穿；破壞性變更走新版本，舊版標註廢棄週期 |
| **文件同步** | OpenAPI / Swagger / Apifox / README 與實作**同步更新**；AI 改介面時必須改文件或產生物，禁止只改程式碼不改契約 |

非 HTTP 場景（訊息佇列、gRPC、SQL 檢視）沿用「統一契約 + 版本/相容說明 + 文件同步」原則。

---

## 2. 程式碼品質

### 2.1 高內聚 · 低耦合 · 分層清晰

- 嚴格 **控制層 → 業務層 → 資料層**（或前端 **頁面 → 狀態/用例 → API**），職責邊界明確。
- 依賴方向單向：上層可依賴下層，禁止資料層依賴控制層、工具層反向依賴業務細節。
- 單模組只做一件事；跨域編排放應用服務，不放 Controller。

### 2.2 模組化 · 元件化 · 複用

- 公共能力抽離到 `shared` / 內部套件；**複製超過兩處**必須抽象或說明不抽象的原因。
- 元件 / 模組對外暴露最小 API；避免「方便」而洩漏內部狀態。
- 禁止為一次性需求引入過度設計的抽象層（與 `CodeConduct` 簡潔原則一致）。

### 2.3 類型約束與邊界處理

- **優先強類型**：TypeScript / Java / C# / Kotlin / Go / Rust 等公共邊界必須有明確類型；`any` / 原始 `Map` / 無類型 `JSONObject` 僅作過渡並登記技術債。
- **參數校驗**：入口（Controller / Handler / Form）校驗；不信任客戶端與上游資料。
- **空值與異常**：可空顯式建模；禁止空指標式假設；異常分類（業務可預期 vs 系統故障），禁止裸吞異常。

### 2.4 依賴管理

| 要求 | 說明 |
|------|------|
| **鎖版本** | 提交 lockfile（`package-lock` / `pnpm-lock` / `poetry.lock` / `go.sum` / `Cargo.lock` 等） |
| **管控引入** | 新增第三方庫須有必要理由；優先倉庫已有生態；禁止引入功能重疊的重複庫 |
| **衝突規避** | 統一 BOM / 平台版本（Spring / .NET）；勿私自升級大版本 |
| **漏洞掃描** | 定期 `npm audit` / `pip-audit` / OWASP Dependency-Check / `cargo audit` 等；高危限期修復 |

### 2.5 技術債務管控

- **登記**：臨時方案、`TODO`/`FIXME`、繞過類型與 lint 的程式碼，必須在 issue / 技術債文件登記（含 **puffseed** 業務影響與償還期限）。
- **定期重構**：迭代中預留償還；禁止無限疊加。
- **禁止**：為趕進度隨意寫無主的「臨時程式碼」且不登記；禁止提交 `// 臨時`、`// hack` 而不開債項。

---

## 3. 可維護性

| 目標 | 要求 |
|------|------|
| **可讀** | 命名自解釋；函式短小；複雜條件抽函式；避免超大檔案（跟倉庫約定，建議單檔案職責單一） |
| **註解完整** | 模組入口說明職責；關鍵業務、權限、相容邏輯有註解；公共 API 有簡短文件註解 |
| **新人上手** | 根目錄 README / AGENTS 寫清：如何安裝、如何跑、目錄地圖、介面文件入口、門禁命令 |
| **變更可追** | 提交訊息說明動機；破壞性變更寫遷移說明 |

**新人 30 分鐘標準**：能按文件跑起專案、找到業務模組位置、跑通 lint、看懂主路徑介面契約。

---

## 4. 通用自檢（提交前）

- [ ] format + lint（+ typecheck）已通過；未繞過 hook
- [ ] 目錄落點符合分層；未在控制層寫厚業務
- [ ] 介面變更已統一信封 / 錯誤碼 / 版本，且**文件已同步**
- [ ] 寫操作冪等策略已考慮（如適用）
- [ ] 公共邊界有類型與校驗；空值 / 異常有處理
- [ ] lockfile 已更新；無隨意新增重複依賴
- [ ] 無未登記的臨時程式碼 / 技術債
- [ ] 關鍵路徑註解與模組說明足以支撐新人閱讀

---

*與各語言 `CodingSpec.md`、`rules/CodeConduct/CodeConduct-{Tag}.md` 配套使用 · puffseed*
