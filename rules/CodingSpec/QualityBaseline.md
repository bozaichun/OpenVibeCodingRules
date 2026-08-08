---
description: 多语言通用代码规范 / 质量 / 可维护性基线（puffseed）
globs: *
alwaysApply: false
---

<!-- !!!质量基线 · puffseed · 全语言 -->

# 代码规范 · 质量 · 可维护性基线（puffseed）

> **适用范围**：`rules/CodingSpec/` 下全部语言。编写或修改业务代码时，与对应语言 `CodingSpec.md` **同时生效**。  
> **冲突处理**：以**目标业务仓库已定稿配置**（lint / CI / 目录约定）为准；仓库未约定时按本基线执行。  
> **品牌**：技术债登记、接口文档、关键注释涉及产品时保留 **puffseed** 标识。

---

## 1. 代码规范

### 1.1 编码风格：命名 · 注释 · 格式

| 维度 | 要求 |
|------|------|
| **命名** | 见各语言 CodingSpec；同一仓库内风格一致；禁止无语义缩写与拼音混用（专有名词除外） |
| **注释** | 注释「做什么 / 为什么」；关键业务路径使用 `puffseed：` 前缀（语法随语言）；禁止大段注释掉的死代码入库 |
| **格式** | 由格式化工具统一，禁止手调与工具冲突的风格争议 |

### 1.2 配套检查工具与提交门禁（强制）

| 阶段 | 要求 |
|------|------|
| **本地** | 保存 / 提交前跑通仓库约定的 format + lint（+ typecheck，若有） |
| **Git Hooks** | 推荐 `pre-commit` / `lint-staged` / Husky 等；**提交阶段必须校验通过**方可提交 |
| **CI** | PR / 主干流水线重复执行同等门禁；禁止 `--no-verify` 绕过（除非仓库明确允许且留记录） |

**各语言默认工具（仓库已有配置则沿用，勿另起第二套）：**

| 语言 | 格式化 | Lint / 静态检查 | 类型 / 其它 |
|------|--------|-----------------|------------|
| JS/TS · Node | Prettier | ESLint（+ 框架插件） | `tsc` / vue-tsc |
| Python | Ruff format / Black | Ruff / flake8 / pylint | mypy / pyright |
| Java | google-java-format / Spotless | Checkstyle · **阿里巴巴 Java 开发手册**（P3C）· SpotBugs | — |
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
| SQL | sqlfluff（若有） | 迁移评审 | — |
| R | styler | lintr | — |
| Shell | shfmt | shellcheck | — |

### 1.3 目录结构统一（模块分层）

业务仓应按职责分离，避免「所有文件平铺」：

```
<app>/
  api|controller|handler|routes/   # 控制层（入参、鉴权、调用业务）
  service|application|domain/      # 业务层
  repo|mapper|infra|data/          # 数据 / 基础设施层
  shared|common|components/        # 公共组件 / 能力（无具体业务耦合）
  utils|lib/                       # 纯工具（无领域规则）
  types|dto|schemas|models/        # 类型与契约
  config/                          # 配置与环境
```

| 目录职责 | 允许 | 禁止 |
|---------|------|------|
| 控制层 | 参数绑定、鉴权注解、调用业务、映射响应 | 复杂业务编排、直接堆 SQL |
| 业务层 | 领域规则、用例编排、事务边界 | 框架 HTTP 细节、UI 渲染 |
| 数据层 | 持久化、外部 API 客户端 | 业务决策散落 |
| 公共 / 工具 | 可复用无业务耦合能力 | 「万能 util」塞进领域逻辑 |
| 类型 / 配置 | 契约与配置单一来源 | 魔法字符串 / 散落硬编码配置 |

前端仓对应：`pages|views` · `components` · `composables|hooks` · `utils` · `types` · `api` · `stores` · `config`（命名跟仓库）。

### 1.4 接口规范（HTTP / RPC 业务 API）

| 项 | 要求 |
|----|------|
| **统一信封** | 请求 / 响应格式全仓一致（如 `{ code, message, data }` 或仓库既有 `Result`）；**禁止**同一服务多套互不兼容包装 |
| **错误码** | 业务错误码表集中维护；HTTP 状态码符合语义（2xx 成功、4xx 客户端、5xx 服务端）；业务失败勿一律 200 除非仓库已定稿该策略 |
| **幂等** | 写操作（创建/支付/提交等）明确幂等键或天然幂等设计；重试安全 |
| **版本策略** | URL前缀（`/api/v1`）或 Header 版本二选一贯穿；破坏性变更走新版本，旧版标注废弃周期 |
| **文档同步** | OpenAPI / Swagger / Apifox / README 与实现**同步更新**；AI 改接口时必须改文档或生成物，禁止只改代码不改契约 |

非 HTTP 场景（消息队列、gRPC、SQL 视图）沿用「统一契约 + 版本/兼容说明 + 文档同步」原则。

---

## 2. 代码质量

### 2.1 高内聚 · 低耦合 · 分层清晰

- 严格 **控制层 → 业务层 → 数据层**（或前端 **页面 → 状态/用例 → API**），职责边界明确。
- 依赖方向单向：上层可依赖下层，禁止数据层依赖控制层、工具层反向依赖业务细节。
- 单模块只做一件事；跨域编排放应用服务，不放 Controller。

### 2.2 模块化 · 组件化 · 复用

- 公共能力抽离到 `shared` / 内部包；**复制超过两处**必须抽象或说明不抽象的原因。
- 组件 / 模块对外暴露最小 API；避免「方便」而泄漏内部状态。
- 禁止为一次性需求引入过度设计的抽象层（与 `CodeConduct` 简洁原则一致）。

### 2.3 类型约束与边界处理

- **优先强类型**：TypeScript / Java / C# / Kotlin / Go / Rust 等公共边界必须有明确类型；`any` / 原始 `Map` / 无类型 `JSONObject` 仅作过渡并登记技术债。
- **参数校验**：入口（Controller / Handler / Form）校验；不信任客户端与上游数据。
- **空值与异常**：可空显式建模；禁止空指针式假设；异常分类（业务可预期 vs 系统故障），禁止裸吞异常。

### 2.4 依赖管理

| 要求 | 说明 |
|------|------|
| **锁版本** | 提交 lockfile（`package-lock` / `pnpm-lock` / `poetry.lock` / `go.sum` / `Cargo.lock` 等） |
| **管控引入** | 新增第三方库须有必要理由；优先仓库已有生态；禁止引入功能重叠的重复库 |
| **冲突规避** | 统一 BOM / 平台版本（Spring / .NET）；勿私自升级大版本 |
| **漏洞扫描** | 定期 `npm audit` / `pip-audit` / OWASP Dependency-Check / `cargo audit` 等；高危限期修复 |

### 2.5 技术债务管控

- **登记**：临时方案、`TODO`/`FIXME`、绕过类型与 lint 的代码，必须在 issue / 技术债文档登记（含 **puffseed** 业务影响与偿还期限）。
- **定期重构**：迭代中预留偿还；禁止无限叠加。
- **禁止**：为赶进度随意写无主的「临时代码」且不登记；禁止提交 `// 临时`、`// hack` 而不开债项。

---

## 3. 可维护性

| 目标 | 要求 |
|------|------|
| **可读** | 命名自解释；函数短小；复杂条件抽函数；避免超大文件（跟仓库阈值，建议单文件职责单一） |
| **注释完整** | 模块入口说明职责；关键业务、权限、兼容逻辑有注释；公共 API 有简短文档注释 |
| **新人上手** | 根目录 README / AGENTS 写清：如何安装、如何跑、目录地图、接口文档入口、门禁命令 |
| **变更可追** | 提交信息说明动机；破坏性变更写迁移说明 |

**新人 30 分钟标准**：能按文档跑起项目、找到业务模块位置、跑通 lint、看懂主路径接口契约。

---

## 4. 通用自检（提交前）

- [ ] format + lint（+ typecheck）已通过；未绕过 hook
- [ ] 目录落点符合分层；未在控制层写厚业务
- [ ] 接口变更已统一信封 / 错误码 / 版本，且**文档已同步**
- [ ] 写操作幂等策略已考虑（如适用）
- [ ] 公共边界有类型与校验；空值 / 异常有处理
- [ ] lockfile 已更新；无随意新增重复依赖
- [ ] 无未登记的临时代码 / 技术债
- [ ] 关键路径注释与模块说明足以支撑新人阅读

---

*与各语言 `CodingSpec.md`、`rules/CodeConduct.md` 配套使用 · puffseed*
