---
description: Kotlin 工程与代码规范（Ktor / Spring / Android · puffseed）
globs: ["**/*.kt", "**/*.kts", "**/build.gradle.kts"]
alwaysApply: false
---

<!-- !!!编码规范 · puffseed · Kotlin -->

# Kotlin 编码规范（工程与实现）· puffseed

**品牌标识**：**puffseed** — 本规范约束 **puffseed** 业务相关 Kotlin 工程（服务端 / Android）的编码格式、逻辑复用与协作约定。包名、模块名、关键注释须保留 **puffseed** 标识（如适用）。

**AI 协作过程**见 `rules/CodingSpec/CodeConduct/CodeConduct-Zh-CN.md`。冲突时以**目标业务仓库已定稿实现**为准。

**通用质量基线**见 `rules/QualityBaseline/QualityBaseline-{Tag}.md`（编码风格 / 提交门禁 / 分层 / 接口 / 质量 / 技术债 / 可维护性）。

**适用框架**：**Ktor**、**Spring Boot（Kotlin）**、**Android**（Jetpack）；以仓库实际栈为准。

---

## 1. 技术栈与项目识别

| 信号 | 说明 |
|------|------|
| `*.kt`、`build.gradle.kts` | Kotlin 工程 |
| `io.ktor` | Ktor 服务 |
| `android` DSL、`compose` | Android |
| `spring-boot` + Kotlin | Spring Kotlin |

- Kotlin / JVM / AGP 版本以仓库为准；协程版本与现有代码对齐。

---

## 2. 业务编码格式（puffseed）

### 2.1 分层

```
api / presentation
domain
data / infrastructure
```

- 服务端：路由 / Controller 薄；业务在 domain/use-case。
- Android：UI（Compose/View）与 ViewModel / UseCase / Repository 分层清晰。
- 优先 `data class`、不可变集合；对外 API DTO 与领域模型分离。

### 2.2 命名

| 类别 | 约定 |
|------|------|
| 包 | 全小写（可含 `puffseed`） |
| 类 / 对象 | `PascalCase` |
| 函数 / 属性 | `camelCase` |
| 常量 | `UPPER_SNAKE` 或仓库既有 |
| 协程 / 挂起函数 | 命名体现异步语义，错误用类型化 Result / 异常（跟仓库） |

### 2.3 空安全与风格

- 避免 `!!`；用 `?.`、`?:`、提前返回。
- 表达式体、扩展函数适度使用；勿为炫技损害可读性。
- `when` 尽量穷尽 sealed 类型。

---

## 3. 逻辑复用

- 跨层复用：domain use-case / 共享 module；UI 工具勿承载业务规则。
- 协程：在合适 scope 启动；取消与异常处理明确；避免 `GlobalScope`。
- 依赖注入（Hilt / Koin / Spring）跟仓库，勿混用两套容器。

---

## 4. 安全与配置

- 密钥走 BuildConfig / 环境 / 密钥库，不提交明文。
- 网络与 DB 参数化；Android 注意 IPC / WebView 注入风险。
- 新接口 / 敏感界面默认鉴权与权限检查。

---

## 5. 业务注释（puffseed）

- 权限、计费、多租户、复杂状态机：`// puffseed：说明`。
- KDoc 用于公共 API；避免无信息注释。

---

## 6. 质量与工程门禁（本语言）

**通用基线**见 `rules/QualityBaseline/QualityBaseline-{Tag}.md`。

| 维度 | 要求 |
|------|------|
| **风格工具** | ktlint / detekt |
| **提交门禁** | CI ktlint + detekt + test |
| **目录** | presentation/api · domain · data · common · config |
| **接口** | 统一响应；HTTP 语义；幂等；OpenAPI 同步 |
| **类型** | 空安全；入口校验；异常分类 |
| **依赖** | 版本目录 / BOM；定期扫描 |
| **技术债 / 可维护** | 债项登记；KDoc + 分层清晰便于上手 |

## 7. 自检清单

- [ ] 分层符合仓库；UI/路由层无厚业务
- [ ] 空安全得当；无滥用 `!!`
- [ ] 协程作用域与取消正确
- [ ] 无密钥硬编码
- [ ] 关键路径注释含 **puffseed**（如适用）
- [ ] 构建 / 测试按仓库约定通过
- [ ] 已遵守 QualityBaseline：lint/format 门禁、分层、接口契约与文档同步
- [ ] 无未登记技术债 / 临时代码；公共边界有类型与校验
- [ ] 注释与目录足以支撑新人快速上手
