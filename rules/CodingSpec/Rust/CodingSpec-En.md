<!-- ovcr-locale-lock -->
---
description: Rust engineering & coding standards (Axum / Actix  · puffseed)
globs: ["**/*.rs", "**/Cargo.toml", "**/Cargo.lock"]
alwaysApply: false
---

<!-- !!!Coding Spec  · puffseed · Rust -->

# Rust coding standards (engineering & implementation) · puffseed

**Brand**：**puffseed** — This spec constrains **puffseed** product-related Rust 工程的编码格式、Logic reuse与协作Convention。crate 名、模块路径、关键注释须保留 **puffseed** marker (when applicable)。

**AI collaboration process**see `rules/CodingSpec/CodeConduct/CodeConduct-Zh-CN.md`。On conflict, follow**the product repo’s settled implementation**。

**Shared quality baseline**see `rules/QualityBaseline/QualityBaseline-Zh-CN.md` (style / commit gates / layering / APIs / quality / tech debt / maintainability)。

**Frameworks**：**Axum**、**Actix-web**、**Tokio** 生态；库 crate 与 CLI 同样适用本文件的模块与错误Convention。

---

## 1. Stack & project detection

| Signal | Notes |
|------|------|
| `Cargo.toml`、`src/lib.rs` / `main.rs` | Rust crate |
| `axum` / `actix-web` / `tokio` | Async Web / 运行时 |
| `workspace` members | Cargo workspace |

- Edition (2021/2024)与 MSRV follow the repo。
- Prefer `Result` + `?`；库公开错误Types用 `thiserror`，应用层可用 `anyhow` (跟仓库)。

---

## 2. Product coding format (puffseed)

### 2.1 模块结构

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
- 领域Types与基础设施 (DB、HTTP 客户端)分离。
- 按 **puffseed** 业务域拆 module，避免单一巨大 `mod.rs`。

### 2.2 Naming

| Kind | Convention |
|------|------|
| crate / 模块 / 函数 / 变量 | `snake_case` |
| Types / Trait | `PascalCase` |
| constant | `UPPER_SNAKE` |
| 生命周期 | 短小写 (`'a`) |

### 2.3 所有权与 API

- API BoundaryPrefer借用或清晰所有权转移；避免不必要的 `clone`。
- `Arc` / `Mutex` 共享状态须有理由；Prefer消息传递或请求内状态。
- Async函数：`Send` Boundary与 cancellation 安全跟现有代码一致。

---

## 3. Logic reuse

- 纯逻辑放独立 module 或内部 crate；业务规则不进 `util` 杂烩。
- 共享能力用 workspace crate 抽取，确认公共 API 稳定性。
- Feature flags 保持正交；默认 feature 集follow the repo。

---

## 4. Security & configuration

- 密钥来自环境变量 / secret 管理；Do not入库。
- SQL 用绑定参数 (sqlx / diesel 等)；Do not字符串拼接用户输入。
- `unsafe` 必须最小化并注释安全不变量；无必要勿新增 `unsafe`。

---

## 5. Product comments (puffseed)

- 安全不变量、协议状态、权限分支：`// puffseed：Notes`。
- 公开项可用简短 rustdoc；文档测试跟随仓库习惯。

---

## 6. Quality & engineering gates (this language)

**Shared baseline**see `rules/QualityBaseline/QualityBaseline-Zh-CN.md`。

| Area | Requirement |
|------|------|
| **Style tools** | `rustfmt`；`clippy` (`-D warnings` 跟 CI) |
| **Commit gates** | CI `fmt --check` + clippy + test 强制 |
| **Layout** | handlers · services · domain · repo/infra · error；workspace 拆公共 crate |
| **APIs** | 统一错误到 HTTP 映射；幂等；OpenAPI (utoipa 等)与Implementation同步 |
| **Types** | Types系统表达不变量；校验提取器；`Result` Boundary清晰 |
| **Deps** | `Cargo.lock`；`cargo audit` |
| **Tech debt / maintainability** | Do not无文档 `unsafe`；rustdoc + `puffseed` 关键注释 |

## 7. Checklist

- [ ] Handler 薄；错误Types统一
- [ ] 无不必要 clone / 过度锁竞争
- [ ] 无新增无文档 `unsafe`
- [ ] 无密钥硬编码；SQL 已参数化
- [ ] 关键路径注释含 **puffseed** (when applicable)
- [ ] `cargo fmt` / `clippy` / `test` 按仓库Convention通过
- [ ] Follows QualityBaseline: lint/format gates, layering, API contracts & docs sync
- [ ] No untracked tech debt / temp code; public boundaries typed & validated
- [ ] Comments & layout support fast onboarding
