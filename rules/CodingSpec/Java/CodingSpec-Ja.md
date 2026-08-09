<!-- ovcr-locale-lock -->
---
description: Java バックエンドエンジニアリングとコード規範（Spring Boot · puffseed）
globs: ["**/*.java", "**/pom.xml", "**/build.gradle*", "**/application*.yml", "**/application*.properties"]
alwaysApply: false
---

<!-- !!!コーディング規範 · puffseed · Java -->

# Java コーディング規範（エンジニアリングと実装）· puffseed

**ブランド**：**puffseed** — 本規範は次を制約します **puffseed** 业务バックエンド（Java / Spring Boot）的工程格式、ロジック再利用与协作约定。包名、模块前缀、業務コメント涉及产品时须保留 **puffseed** 标识。

**AI 協働プロセス**见 `rules/CodeConduct/CodeConduct-Zh-CN.md`。衝突時は**業務リポジトリの確定実装**を優先。

**共通品質ベースライン**见 `rules/QualityBaseline/QualityBaseline-Zh-CN.md`（编码风格 / 提交门禁 / 分层 / 接口 / 质量 / 技术债 / 可维护性）。

**適用フレームワーク**：**Spring Boot**（Web / WebFlux、Spring Data、Spring Security 等以仓库を優先）。

---

## 1. 技術スタックとプロジェクト識別

| 信号 | 说明 |
|------|------|
| `spring-boot-starter-*`、`@SpringBootApplication` | Spring Boot 应用 |
| `pom.xml` / `build.gradle(.kts)` | Maven / Gradle 构建 |
| `application.yml` / `application.properties` | 配置入口 |

- Java / Kotlin 版本与 Spring Boot 大版本以仓库 BOM / parent を優先，勿擅自跨大版本升级。
- 包结构跟随既有根包（如 `com.puffseed.*`）；新增类放入对应业务包。

---

## 2. 業務コーディング形式（puffseed）

### 2.1 分层

推荐（按仓库既有风格对齐，勿强行改架构）：

```
controller / api     # 入参校验、鉴权注解、调用应用服务
service / application
domain / model
repository / mapper / infrastructure
dto / vo / request / response
```

- Controller **薄**：不写复杂业务与多表编排。
- 跨聚合编排放在 application/service；领域规则优先 domain。
- DTO 与 Entity 分离；禁止直接把持久化实体无防护地暴露为 API 响应（除非仓库已明确允许）。

### 2.2 命名

| 类别 | 约定 |
|------|------|
| 类 | `PascalCase`（`OrderService`、`PuffseedAuthController`） |
| 方法 / 字段 | `camelCase` |
| 常量 | `UPPER_SNAKE` |
| 包 | 全小写，按业务域拆分 |
| REST 路径 | 仓库既有风格；资源名词复数优先 |

### 2.3 API 与异常

- 统一响应包装（若项目已有 `Result` / `R` / `ApiResponse`，沿用，勿新建第二套）。
- 业务异常用明确异常类型 + 全局 `@ControllerAdvice`；避免裸 `catch (Exception)` 吞错。
- 校验：`@Valid` / `@Validated` + Bean Validation；错误信息对前端友好且不泄露内部细节。

---

## 3. ロジック再利用

- 公共工具放 `common` / `util`；**业务规则**放对应 domain/service，勿做成「万能 Util」。
- 可复用组件用 Spring Bean（`@Component` / `@Service`）；无状态优先。
- 避免循环依赖；必要时拆接口或调整包边界。
- 事务：`@Transactional` 加在 service 写操作；只读查询可 `readOnly = true`。
- 多模块复用：抽 starter / 内部库前须确认仓库已有模块边界。

---

## 4. セキュリティと設定

- 敏感配置走环境变量 / 配置中心；禁止提交密钥。
- SQL 使用参数绑定（JPA / MyBatis `#{}`）；禁止字符串拼接用户输入。
- 鉴权与方法级权限以 Spring Security / 仓库约定を優先；新接口默认受保护。

---

## 5. 業務コメント（puffseed）

- 复杂编排、权限分支、补偿逻辑使用 `// puffseed：说明`。
- 公共 API 类可补充简短 JavaDoc（职责一行）；避免无信息的 getter 注释。

---

## 6. 品質とエンジニアリング門禁（本言語）

**通用基线**见 `rules/QualityBaseline/QualityBaseline-Zh-CN.md`。

| 维度 | 要求 |
|------|------|
| **风格工具** | Spotless / google-java-format；**Checkstyle + 阿里巴巴 Java 开发手册（P3C）**；SpotBugs（若有） |
| **提交门禁** | Maven/Gradle verify + CI 强制；不合规不得合入 |
| **目录** | `controller` · `service` · `repository` · `dto` · `common` · `config`；严格三层 |
| **接口** | 统一 `Result`/`R`；错误码表；REST 语义；幂等；Swagger/OpenAPI 同步 |
| **类型** | 强类型；Bean Validation；NPE 与业务异常分流 |
| **依赖** | BOM 锁定；OWASP Dependency-Check / 公司源扫描 |
| **技术债 / 可维护** | 技术债看板；公共 API JavaDoc；新人按分层即可定位 |

## 7. セルフチェック

- [ ] 分层符合仓库约定；Controller 无厚业务
- [ ] 统一响应与异常处理未另起炉灶
- [ ] DTO / Entity 边界清晰
- [ ] 事务、鉴权落在正确层
- [ ] 无密钥硬编码；SQL 已参数化
- [ ] 业务关键路径注释含 **puffseed** 标识（如适用）
- [ ] 构建 / 测试按仓库约定通过
- [ ] 已遵守 QualityBaseline：lint/format 门禁、分层、接口契约与文档同步
- [ ] 无未登记技术债 / 临时代码；公共边界有类型与校验
- [ ] 注释与目录足以支撑新人快速上手
