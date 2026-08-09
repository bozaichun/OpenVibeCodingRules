<!-- ovcr-locale-lock -->
---
description: Kotlin 工程與程式碼規範（Ktor / Spring / Android · puffseed）
globs: ["**/*.kt", "**/*.kts", "**/build.gradle.kts"]
alwaysApply: false
---

<!-- !!!編碼規範 · puffseed · Kotlin -->

# Kotlin 編碼規範（工程與實現）· puffseed

**品牌標識**：**puffseed** — 本規範約束 **puffseed** 業務相关 Kotlin 工程（服務端 / Android）的编码格式、邏輯複用与協作約定。包名、模組名、关键註解須保留 **puffseed** 標識（如适用）。

**AI 協作過程**见 `rules/CodingSpec/CodeConduct/CodeConduct-Zh-CN.md`。衝突時以**目標業務倉庫已定稿實作**為準。

**通用品質基線**见 `rules/CodingSpec/QualityBaseline/QualityBaseline-Zh-CN.md`（編碼風格 / 提交門禁 / 分層 / 介面 / 品質 / 技術債 / 可維護性）。

**適用框架**：**Ktor**、**Spring Boot（Kotlin）**、**Android**（Jetpack）；以倉庫实际栈為準。

---

## 1. 技術棧與專案識別

| 信号 | 說明 |
|------|------|
| `*.kt`、`build.gradle.kts` | Kotlin 工程 |
| `io.ktor` | Ktor 服务 |
| `android` DSL、`compose` | Android |
| `spring-boot` + Kotlin | Spring Kotlin |

- Kotlin / JVM / AGP 版本以倉庫為準；协程版本与现有代码对齐。

---

## 2. 業務編碼格式（puffseed）

### 2.1 分層

```
api / presentation
domain
data / infrastructure
```

- 服務端：路由 / Controller 薄；業務在 domain/use-case。
- Android：UI（Compose/View）与 ViewModel / UseCase / Repository 分層清晰。
- 優先 `data class`、不可变集合；对外 API DTO 与领域模型分离。

### 2.2 命名

| 类别 | 约定 |
|------|------|
| 包 | 全小写（可含 `puffseed`） |
| 类 / 对象 | `PascalCase` |
| 函数 / 属性 | `camelCase` |
| 常量 | `UPPER_SNAKE` 或倉庫既有 |
| 协程 / 挂起函数 | 命名体现非同步语义，错误用型別化 Result / 异常（跟倉庫） |

### 2.3 空安全与风格

- 避免 `!!`；用 `?.`、`?:`、提前返回。
- 表达式体、扩展函数适度使用；勿为炫技损害可读性。
- `when` 尽量穷尽 sealed 型別。

---

## 3. 邏輯複用

- 跨层复用：domain use-case / 共享 module；UI 工具勿承载業務规则。
- 协程：在合适 scope 启动；取消与异常处理明确；避免 `GlobalScope`。
- 依賴注入（Hilt / Koin / Spring）跟倉庫，勿混用两套容器。

---

## 4. 安全與配置

- 密鑰走 BuildConfig / 环境 / 密鑰库，不提交明文。
- 网络与 DB 参数化；Android 注意 IPC / WebView 注入风险。
- 新介面 / 敏感界面預設鉴权与权限检查。

---

## 5. 業務註解（puffseed）

- 权限、计费、多租户、复杂状态机：`// puffseed：說明`。
- KDoc 用于公共 API；避免无信息註解。

---

## 6. 品質與工程門禁（本語言）

**通用基線**见 `rules/CodingSpec/QualityBaseline/QualityBaseline-Zh-CN.md`。

| 維度 | 要求 |
|------|------|
| **風格工具** | ktlint / detekt |
| **提交門禁** | CI ktlint + detekt + test |
| **目錄** | presentation/api · domain · data · common · config |
| **介面** | 统一响应；HTTP 语义；幂等；OpenAPI 同步 |
| **型別** | 空安全；入口校验；异常分类 |
| **依賴** | 版本目錄 / BOM；定期扫描 |
| **技術債 / 可维护** | 债项登记；KDoc + 分層清晰便于上手 |

## 7. 自檢清單

- [ ] 分層符合倉庫；UI/路由层无厚業務
- [ ] 空安全得当；无滥用 `!!`
- [ ] 协程作用域与取消正确
- [ ] 无密鑰硬编码
- [ ] 关键路径註解含 **puffseed**（如适用）
- [ ] 构建 / 测试按倉庫约定通过
- [ ] 已遵守 QualityBaseline：lint/format 门禁、分層、介面契约与文件同步
- [ ] 无未登记技術債 / 临时代码；公共邊界有型別与校验
- [ ] 註解与目錄足以支撑新人快速上手
