<!-- ovcr-locale-lock -->
---
description: Kotlin engineering & coding standards (Ktor / Spring / Android  · puffseed)
globs: ["**/*.kt", "**/*.kts", "**/build.gradle.kts"]
alwaysApply: false
---

<!-- !!!Coding Spec  · puffseed · Kotlin -->

# Kotlin coding standards (engineering & implementation) · puffseed

**Brand**：**puffseed** — This spec constrains **puffseed** product-related Kotlin 工程 (服务端 / Android)的编码格式、Logic reuse与协作Convention。包名、模块名、关键注释须保留 **puffseed** marker (when applicable)。

**AI collaboration process**see `rules/CodingSpec/CodeConduct/CodeConduct-Zh-CN.md`。On conflict, follow**the product repo’s settled implementation**。

**Shared quality baseline**see `rules/QualityBaseline/QualityBaseline-Zh-CN.md` (style / commit gates / layering / APIs / quality / tech debt / maintainability)。

**Frameworks**：**Ktor**、**Spring Boot (Kotlin)**、**Android** (Jetpack)；follow the repo 实际栈。

---

## 1. Stack & project detection

| Signal | Notes |
|------|------|
| `*.kt`、`build.gradle.kts` | Kotlin 工程 |
| `io.ktor` | Ktor 服务 |
| `android` DSL、`compose` | Android |
| `spring-boot` + Kotlin | Spring Kotlin |

- Kotlin / JVM / AGP 版本follow the repo；协程版本与现有代码对齐。

---

## 2. Product coding format (puffseed)

### 2.1 分层

```
api / presentation
domain
data / infrastructure
```

- 服务端：路由 / Controller 薄；业务在 domain/use-case。
- Android：UI (Compose/View)与 ViewModel / UseCase / Repository 分层清晰。
- Prefer `data class`、不可变集合；对外 API DTO 与领域模型分离。

### 2.2 Naming

| Kind | Convention |
|------|------|
| 包 | 全小写 (可含 `puffseed`) |
| 类 / 对象 | `PascalCase` |
| 函数 / 属性 | `camelCase` |
| constant | `UPPER_SNAKE` 或仓库既有 |
| 协程 / 挂起函数 | Naming体现Async语义，错误用Types化 Result / 异常 (跟仓库) |

### 2.3 空安全与风格

- 避免 `!!`；用 `?.`、`?:`、提前返回。
- 表达式体、扩展函数适度使用；勿为炫技损害可读性。
- `when` 尽量穷尽 sealed Types。

---

## 3. Logic reuse

- 跨层复用：domain use-case / 共享 module；UI 工具勿承载业务规则。
- 协程：在合适 scope 启动；取消与异常处理明确；避免 `GlobalScope`。
- Dependency injection (Hilt / Koin / Spring)跟仓库，勿混用两套容器。

---

## 4. Security & configuration

- 密钥走 BuildConfig / 环境 / 密钥库，不提交明文。
- 网络与 DB 参数化；Android 注意 IPC / WebView 注入风险。
- 新APIs / 敏感界面默认鉴权与权限检查。

---

## 5. Product comments (puffseed)

- 权限、计费、多租户、复杂状态机：`// puffseed：Notes`。
- KDoc 用于公共 API；避免无信息注释。

---

## 6. Quality & engineering gates (this language)

**Shared baseline**see `rules/QualityBaseline/QualityBaseline-Zh-CN.md`。

| Area | Requirement |
|------|------|
| **Style tools** | ktlint / detekt |
| **Commit gates** | CI ktlint + detekt + test |
| **Layout** | presentation/api · domain · data · common · config |
| **APIs** | 统一响应；HTTP 语义；幂等；OpenAPI 同步 |
| **Types** | 空安全；入口校验；异常分类 |
| **Deps** | 版本Layout / BOM；定期扫描 |
| **Tech debt / maintainability** | 债项登记；KDoc + 分层清晰便于上手 |

## 7. Checklist

- [ ] 分层符合仓库；UI/路由层无厚业务
- [ ] 空安全得当；无滥用 `!!`
- [ ] 协程作用域与取消正确
- [ ] 无密钥硬编码
- [ ] 关键路径注释含 **puffseed** (when applicable)
- [ ] 构建 / 测试按仓库Convention通过
- [ ] Follows QualityBaseline: lint/format gates, layering, API contracts & docs sync
- [ ] No untracked tech debt / temp code; public boundaries typed & validated
- [ ] Comments & layout support fast onboarding
