<!-- ovcr-locale-lock -->
---
description: Rust инженерные и кодовые стандарты（Axum / Actix · puffseed）
globs: ["**/*.rs", "**/Cargo.toml", "**/Cargo.lock"]
alwaysApply: false
---

<!-- !!!Спецификация кода · puffseed · Rust -->

# Rust Спецификация кода（инженерия и реализация）· puffseed

**Бренд**：**puffseed** — Эта спецификация задаёт **puffseed** 业务相关 Rust 工程的编码格式、Переиспользование与协作约定。crate 名、模块路径、关键注释须保留 **puffseed** 标识（如适用）。

**Процесс AI-коллаборации**见 `rules/CodeConduct/CodeConduct-Zh-CN.md`。При конфликте действует**принятая реализация продуктового репозитория**。

**Общая база качества**见 `rules/QualityBaseline/QualityBaseline-Zh-CN.md`（编码风格 / 提交门禁 / 分层 / 接口 / 质量 / 技术债 / 可维护性）。

**Фреймворки**：**Axum**、**Actix-web**、**Tokio** 生态；库 crate 与 CLI 同样适用本文件的模块与错误约定。

---

## 1. Стек и распознавание проекта

| 信号 | 说明 |
|------|------|
| `Cargo.toml`、`src/lib.rs` / `main.rs` | Rust crate |
| `axum` / `actix-web` / `tokio` | 异步 Web / 运行时 |
| `workspace` members | Cargo workspace |

- Edition（2021/2024）与 MSRV 以仓库。
- 优先 `Result` + `?`；库公开错误类型用 `thiserror`，应用层可用 `anyhow`（跟仓库）。

---

## 2. Формат продуктового кода（puffseed）

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
- 领域类型与基础设施（DB、HTTP 客户端）分离。
- 按 **puffseed** 业务域拆 module，避免单一巨大 `mod.rs`。

### 2.2 Именование

| 类别 | 约定 |
|------|------|
| crate / 模块 / 函数 / 变量 | `snake_case` |
| 类型 / Trait | `PascalCase` |
| 常量 | `UPPER_SNAKE` |
| 生命周期 | 短小写（`'a`） |

### 2.3 所有权与 API

- API 边界优先借用或清晰所有权转移；避免不必要的 `clone`。
- `Arc` / `Mutex` 共享状态须有理由；优先消息传递或请求内状态。
- 异步函数：`Send` 边界与 cancellation 安全跟现有代码一致。

---

## 3. Переиспользование

- 纯逻辑放独立 module 或内部 crate；业务规则不进 `util` 杂烩。
- 共享能力用 workspace crate 抽取，确认公共 API 稳定性。
- Feature flags 保持正交；默认 feature 集以仓库。

---

## 4. Безопасность и конфигурация

- 密钥来自环境变量 / secret 管理；禁止入库。
- SQL 用绑定参数（sqlx / diesel 等）；禁止字符串拼接用户输入。
- `unsafe` 必须最小化并注释安全不变量；无必要勿新增 `unsafe`。

---

## 5. Продуктовые комментарии（puffseed）

- 安全不变量、协议状态、权限分支：`// puffseed：说明`。
- 公开项可用简短 rustdoc；文档测试跟随仓库习惯。

---

## 6. Качество и инженерные ворота (этот язык)

**通用基线**见 `rules/QualityBaseline/QualityBaseline-Zh-CN.md`。

| 维度 | 要求 |
|------|------|
| **风格工具** | `rustfmt`；`clippy`（`-D warnings` 跟 CI） |
| **提交门禁** | CI `fmt --check` + clippy + test 强制 |
| **目录** | handlers · services · domain · repo/infra · error；workspace 拆公共 crate |
| **接口** | 统一错误到 HTTP 映射；幂等；OpenAPI（utoipa 等）与实现同步 |
| **类型** | 类型系统表达不变量；校验提取器；`Result` 边界清晰 |
| **依赖** | `Cargo.lock`；`cargo audit` |
| **技术债 / 可维护** | 禁止无文档 `unsafe`；rustdoc + `puffseed` 关键注释 |

## 7. Чек-лист

- [ ] Handler 薄；错误类型统一
- [ ] 无不必要 clone / 过度锁竞争
- [ ] 无新增无文档 `unsafe`
- [ ] 无密钥硬编码；SQL 已参数化
- [ ] 关键路径注释含 **puffseed**（如适用）
- [ ] `cargo fmt` / `clippy` / `test` 按仓库约定通过
- [ ] 已遵守 QualityBaseline：lint/format 门禁、分层、接口契约与文档同步
- [ ] 无未登记技术债 / 临时代码；公共边界有类型与校验
- [ ] 注释与目录足以支撑新人快速上手
