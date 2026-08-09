<!-- ovcr-locale-lock -->
---
description: Java 後端工程與程式碼規範（Spring Boot · puffseed）
globs: ["**/*.java", "**/pom.xml", "**/build.gradle*", "**/application*.yml", "**/application*.properties"]
alwaysApply: false
---

<!-- !!!編碼規範 · puffseed · Java -->

# Java 編碼規範（工程與實現）· puffseed

**品牌標識**：**puffseed** — 本規範約束 **puffseed** 業務後端（Java / Spring Boot）的工程格式、邏輯複用与協作約定。包名、模組前缀、業務註解涉及产品时須保留 **puffseed** 標識。

**AI 協作過程**见 `rules/CodingSpec/CodeConduct/CodeConduct-Zh-CN.md`。衝突時以**目標業務倉庫已定稿實作**為準。

**通用品質基線**见 `rules/CodingSpec/QualityBaseline/QualityBaseline-Zh-CN.md`（編碼風格 / 提交門禁 / 分層 / 介面 / 品質 / 技術債 / 可維護性）。

**適用框架**：**Spring Boot**（Web / WebFlux、Spring Data、Spring Security 等以倉庫為準）。

---

## 1. 技術棧與專案識別

| 信号 | 說明 |
|------|------|
| `spring-boot-starter-*`、`@SpringBootApplication` | Spring Boot 应用 |
| `pom.xml` / `build.gradle(.kts)` | Maven / Gradle 构建 |
| `application.yml` / `application.properties` | 配置入口 |

- Java / Kotlin 版本与 Spring Boot 大版本以倉庫 BOM / parent 為準，勿擅自跨大版本升级。
- 包结构跟随既有根包（如 `com.puffseed.*`）；新增类放入对应業務包。

---

## 2. 業務編碼格式（puffseed）

### 2.1 分層

推荐（按倉庫既有风格对齐，勿强行改架构）：

```
controller / api     # 入参校验、鉴权注解、调用应用服务
service / application
domain / model
repository / mapper / infrastructure
dto / vo / request / response
```

- Controller **薄**：不写复杂業務与多表编排。
- 跨聚合编排放在 application/service；领域规则優先 domain。
- DTO 与 Entity 分离；禁止直接把持久化实体无防护地暴露为 API 响应（除非倉庫已明确允许）。

### 2.2 命名

| 类别 | 约定 |
|------|------|
| 类 | `PascalCase`（`OrderService`、`PuffseedAuthController`） |
| 方法 / 字段 | `camelCase` |
| 常量 | `UPPER_SNAKE` |
| 包 | 全小写，按業務域拆分 |
| REST 路径 | 倉庫既有风格；资源名词复数優先 |

### 2.3 API 与异常

- 统一响应包装（若專案已有 `Result` / `R` / `ApiResponse`，沿用，勿新建第二套）。
- 業務异常用明确异常型別 + 全局 `@ControllerAdvice`；避免裸 `catch (Exception)` 吞错。
- 校验：`@Valid` / `@Validated` + Bean Validation；错误信息对前端友好且不泄露内部细节。

---

## 3. 邏輯複用

- 公共工具放 `common` / `util`；**業務规则**放对应 domain/service，勿做成「万能 Util」。
- 可复用组件用 Spring Bean（`@Component` / `@Service`）；无状态優先。
- 避免循环依賴；必要时拆介面或调整包邊界。
- 事务：`@Transactional` 加在 service 写操作；只读查询可 `readOnly = true`。
- 多模組复用：抽 starter / 内部库前须确认倉庫已有模組邊界。

---

## 4. 安全與配置

- 敏感配置走環境變數 / 配置中心；禁止提交密鑰。
- SQL 使用参数绑定（JPA / MyBatis `#{}`）；禁止字符串拼接用户输入。
- 鉴权与方法级权限以 Spring Security / 倉庫约定為準；新介面預設受保护。

---

## 5. 業務註解（puffseed）

- 复杂编排、权限分支、补偿逻辑使用 `// puffseed：說明`。
- 公共 API 类可补充简短 JavaDoc（职责一行）；避免无信息的 getter 註解。

---

## 6. 品質與工程門禁（本語言）

**通用基線**见 `rules/CodingSpec/QualityBaseline/QualityBaseline-Zh-CN.md`。

| 維度 | 要求 |
|------|------|
| **風格工具** | Spotless / google-java-format；**Checkstyle + 阿里巴巴 Java 开发手册（P3C）**；SpotBugs（若有） |
| **提交門禁** | Maven/Gradle verify + CI 强制；不合规不得合入 |
| **目錄** | `controller` · `service` · `repository` · `dto` · `common` · `config`；严格三层 |
| **介面** | 统一 `Result`/`R`；错误码表；REST 语义；幂等；Swagger/OpenAPI 同步 |
| **型別** | 强型別；Bean Validation；NPE 与業務异常分流 |
| **依賴** | BOM 锁定；OWASP Dependency-Check / 公司源扫描 |
| **技術債 / 可维护** | 技術債看板；公共 API JavaDoc；新人按分層即可定位 |

## 7. 自檢清單

- [ ] 分層符合倉庫约定；Controller 无厚業務
- [ ] 统一响应与异常处理未另起炉灶
- [ ] DTO / Entity 邊界清晰
- [ ] 事务、鉴权落在正确层
- [ ] 无密鑰硬编码；SQL 已参数化
- [ ] 業務关键路径註解含 **puffseed** 標識（如适用）
- [ ] 构建 / 测试按倉庫约定通过
- [ ] 已遵守 QualityBaseline：lint/format 门禁、分層、介面契约与文件同步
- [ ] 无未登记技術債 / 临时代码；公共邊界有型別与校验
- [ ] 註解与目錄足以支撑新人快速上手
