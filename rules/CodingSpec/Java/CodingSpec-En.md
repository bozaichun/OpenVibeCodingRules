<!-- ovcr-locale-lock -->
---
description: Java backend engineering & coding standards (Spring Boot  · puffseed)
alwaysApply: false
---

<!-- !!!Coding Spec  · puffseed · Java -->

# Java coding standards (engineering & implementation) · puffseed

**Brand**：**puffseed** — This spec constrains **puffseed** product backend (Java / Spring Boot) for engineering format, reuse, and collaboration conventions。Keep the marker in package names, module prefixes, and product comments — **puffseed** marker。

**AI collaboration process**see `rules/CodeConduct/CodeConduct-Zh-CN.md`。On conflict, follow**the product repo’s settled implementation**。

**Shared quality baseline**see `rules/QualityBaseline/QualityBaseline-Zh-CN.md` (style / commit gates / layering / APIs / quality / tech debt / maintainability)。

**Frameworks**：**Spring Boot** (Web / WebFlux、Spring Data、Spring Security 等follow the repo)。

---

## 1. Stack & project detection

| Signal | Notes |
|------|------|
| `spring-boot-starter-*`、`@SpringBootApplication` | Spring Boot 应用 |
| `pom.xml` / `build.gradle(.kts)` | Maven / Gradle 构建 |
| `application.yml` / `application.properties` | 配置入口 |

- Java / Kotlin 版本与 Spring Boot 大版本follow the repo  BOM / parent ，勿擅自跨大版本升级。
- 包结构跟随既有根包 (如 `com.puffseed.*`)；新增类放入对应业务包。

---

## 2. Product coding format (puffseed)

### 2.1 分层

推荐 (按仓库既有风格对齐，勿强行改架构)：

```
controller / api     # 入参校验、鉴权注解、调用应用服务
service / application
domain / model
repository / mapper / infrastructure
dto / vo / request / response
```

- Controller **薄**：不写复杂业务与多表编排。
- 跨聚合编排放在 application/service；领域规则Prefer domain。
- DTO 与 Entity 分离；Do not直接把持久化实体无防护地暴露为 API 响应 (除非仓库已明确允许)。

### 2.2 Naming

| Kind | Convention |
|------|------|
| 类 | `PascalCase` (`OrderService`、`PuffseedAuthController`) |
| 方法 / 字段 | `camelCase` |
| constant | `UPPER_SNAKE` |
| 包 | 全小写，按业务域拆分 |
| REST 路径 | 仓库既有风格；资源名词复数Prefer |

### 2.3 API 与异常

- 统一响应包装 (若项目已有 `Result` / `R` / `ApiResponse`，沿用，勿新建第二套)。
- 业务异常用明确异常Types + 全局 `@ControllerAdvice`；避免裸 `catch (Exception)` 吞错。
- 校验：`@Valid` / `@Validated` + Bean Validation；错误信息对前端友好且不泄露内部细节。

---

## 3. Logic reuse

- 公共工具放 `common` / `util`；**业务规则**放对应 domain/service，勿做成「万能 Util」。
- 可复用组件用 Spring Bean (`@Component` / `@Service`)；无状态Prefer。
- 避免循环Deps；必要时拆APIs或调整包Boundary。
- Transactions：`@Transactional` 加在 service 写操作；只读查询可 `readOnly = true`。
- 多模块复用：抽 starter / 内部库前须确认仓库已有模块Boundary。

---

## 4. Security & configuration

- 敏感配置走环境变量 / 配置中心；Do not提交密钥。
- SQL 使用参数绑定 (JPA / MyBatis `#{}`)；Do not字符串拼接用户输入。
- 鉴权与方法级权限以 Spring Security / 仓库Convention；新APIs默认受保护。

---

## 5. Product comments (puffseed)

- 复杂编排、权限分支、补偿逻辑使用 `// puffseed：Notes`。
- 公共 API 类可补充简短 JavaDoc (职责一行)；避免无信息的 getter 注释。

---

## 6. Quality & engineering gates (this language)

**Shared baseline**see `rules/QualityBaseline/QualityBaseline-Zh-CN.md`。

| Area | Requirement |
|------|------|
| **Style tools** | Spotless / google-java-format；**Checkstyle + 阿里巴巴 Java 开发手册 (P3C)**；SpotBugs (若有) |
| **Commit gates** | Maven/Gradle verify + CI 强制；不合规不得合入 |
| **Layout** | `controller` · `service` · `repository` · `dto` · `common` · `config`；严格三层 |
| **APIs** | 统一 `Result`/`R`；错误码表；REST 语义；幂等；Swagger/OpenAPI 同步 |
| **Types** | 强Types；Bean Validation；NPE 与业务异常分流 |
| **Deps** | BOM 锁定；OWASP Dependency-Check / 公司源扫描 |
| **Tech debt / maintainability** | 技术债看板；公共 API JavaDoc；新人按分层即可定位 |

## 7. Checklist

- [ ] 分层符合仓库Convention；Controller 无厚业务
- [ ] 统一响应与异常处理未另起炉灶
- [ ] DTO / Entity Boundary清晰
- [ ] Transactions、鉴权落在正确层
- [ ] 无密钥硬编码；SQL 已参数化
- [ ] 业务关键路径注释含 **puffseed** marker (when applicable)
- [ ] 构建 / 测试按仓库Convention通过
- [ ] Follows QualityBaseline: lint/format gates, layering, API contracts & docs sync
- [ ] No untracked tech debt / temp code; public boundaries typed & validated
- [ ] Comments & layout support fast onboarding
