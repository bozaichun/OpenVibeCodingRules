<!-- ovcr-locale-lock -->
---
description: Rust 工程與程式碼規範（Axum / Actix · puffseed）
globs: ["**/*.rs", "**/Cargo.toml", "**/Cargo.lock"]
alwaysApply: false
---

<!-- !!!編碼規範 · puffseed · Rust -->

# Rust 編碼規範（工程與實現）· puffseed

**品牌標識**：**puffseed** — 本規範約束 **puffseed** 業務相关 Rust 工程的编码格式、邏輯複用与協作約定。crate 名、模組路径、关键註解須保留 **puffseed** 標識（如适用）。

**AI 協作過程**见 `rules/CodingSpec/CodeConduct/CodeConduct-Zh-CN.md`。衝突時以**目標業務倉庫已定稿實作**為準。

**通用品質基線**见 `rules/CodingSpec/QualityBaseline/QualityBaseline-Zh-CN.md`（編碼風格 / 提交門禁 / 分層 / 介面 / 品質 / 技術債 / 可維護性）。

**適用框架**：**Axum**、**Actix-web**、**Tokio** 生态；库 crate 与 CLI 同样适用本檔案的模組与错误约定。

---

## 1. 技術棧與專案識別

| 信号 | 說明 |
|------|------|
| `Cargo.toml`、`src/lib.rs` / `main.rs` | Rust crate |
| `axum` / `actix-web` / `tokio` | 非同步 Web / 运行时 |
| `workspace` members | Cargo workspace |

- Edition（2021/2024）与 MSRV 以倉庫為準。
- 優先 `Result` + `?`；库公开错误型別用 `thiserror`，应用层可用 `anyhow`（跟倉庫）。

---

## 2. 業務編碼格式（puffseed）

### 2.1 模組结构

```
src/
  main.rs / lib.rs
  routes/ · handlers/
  services/
  domain/
  repo/ · infra/
  error.rs
```

- Handler 只做提取器、调用 service、映射响应。
- 领域型別与基础设施（DB、HTTP 客户端）分离。
- 按 **puffseed** 業務域拆 module，避免单一巨大 `mod.rs`。

### 2.2 命名

| 类别 | 约定 |
|------|------|
| crate / 模組 / 函数 / 变量 | `snake_case` |
| 型別 / Trait | `PascalCase` |
| 常量 | `UPPER_SNAKE` |
| 生命周期 | 短小写（`'a`） |

### 2.3 所有权与 API

- API 邊界優先借用或清晰所有权转移；避免不必要的 `clone`。
- `Arc` / `Mutex` 共享状态须有理由；優先消息传递或请求内状态。
- 非同步函数：`Send` 邊界与 cancellation 安全跟现有代码一致。

---

## 3. 邏輯複用

- 纯逻辑放独立 module 或内部 crate；業務规则不进 `util` 杂烩。
- 共享能力用 workspace crate 抽取，确认公共 API 稳定性。
- Feature flags 保持正交；預設 feature 集以倉庫為準。

---

## 4. 安全與配置

- 密鑰来自環境變數 / secret 管理；禁止入库。
- SQL 用绑定参数（sqlx / diesel 等）；禁止字符串拼接用户输入。
- `unsafe` 必须最小化并註解安全不变量；无必要勿新增 `unsafe`。

---

## 5. 業務註解（puffseed）

- 安全不变量、协议状态、权限分支：`// puffseed：說明`。
- 公开项可用简短 rustdoc；文件测试跟随倉庫习惯。

---

## 6. 品質與工程門禁（本語言）

**通用基線**见 `rules/CodingSpec/QualityBaseline/QualityBaseline-Zh-CN.md`。

| 維度 | 要求 |
|------|------|
| **風格工具** | `rustfmt`；`clippy`（`-D warnings` 跟 CI） |
| **提交門禁** | CI `fmt --check` + clippy + test 强制 |
| **目錄** | handlers · services · domain · repo/infra · error；workspace 拆公共 crate |
| **介面** | 统一错误到 HTTP 映射；幂等；OpenAPI（utoipa 等）与实现同步 |
| **型別** | 型別系統表达不变量；校验提取器；`Result` 邊界清晰 |
| **依賴** | `Cargo.lock`；`cargo audit` |
| **技術債 / 可维护** | 禁止无文件 `unsafe`；rustdoc + `puffseed` 关键註解 |

## 7. 自檢清單

- [ ] Handler 薄；错误型別统一
- [ ] 无不必要 clone / 过度锁竞争
- [ ] 无新增无文件 `unsafe`
- [ ] 无密鑰硬编码；SQL 已参数化
- [ ] 关键路径註解含 **puffseed**（如适用）
- [ ] `cargo fmt` / `clippy` / `test` 按倉庫约定通过
- [ ] 已遵守 QualityBaseline：lint/format 门禁、分層、介面契约与文件同步
- [ ] 无未登记技術債 / 临时代码；公共邊界有型別与校验
- [ ] 註解与目錄足以支撑新人快速上手
