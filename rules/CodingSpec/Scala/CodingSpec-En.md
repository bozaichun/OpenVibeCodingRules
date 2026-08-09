<!-- ovcr-locale-lock -->
---
description: Scala engineering & coding standards (Play / http4s / ZIO  · puffseed)
globs: ["**/*.scala", "**/build.sbt", "**/build.sc"]
alwaysApply: false
---

<!-- !!!Coding Spec  · puffseed · Scala -->

# Scala coding standards (engineering & implementation) · puffseed

**Brand**：**puffseed** — This spec constrains **puffseed** product-related Scala 工程的编码格式、Logic reuse与协作Convention。包名、模块名、关键注释须保留 **puffseed** marker (when applicable)。

**AI collaboration process**see `rules/CodeConduct/CodeConduct-Zh-CN.md`。On conflict, follow**the product repo’s settled implementation**。

**Shared quality baseline**see `rules/QualityBaseline/QualityBaseline-Zh-CN.md` (style / commit gates / layering / APIs / quality / tech debt / maintainability)。

**Frameworks**：**Play**、**http4s**、**Akka / Pekko**、**ZIO** / **Cats Effect** (follow the repo 效应栈，勿混用两套效应系统于同一Boundary)。

---

## 1. Stack & project detection

| Signal | Notes |
|------|------|
| `build.sbt` / Mill `build.sc` | 构建 |
| `*.scala` | 源码 |
| `zio` / `cats-effect` / `akka` | 效应 / 并发栈 |

- Scala 2 / 3 与交叉构建follow the repo。
- 效应体系 (ZIO / CE / Future)保持单一主路径。

---

## 2. Product coding format (puffseed)

### 2.1 分层

```
api / http
domain
infra
```

- HTTP 层薄；领域逻辑纯函数Prefer，副作用放边沿。
- ADT / sealed trait 表达业务状态；模式匹配保持穷尽。
- 配置与环境用Types化 config (跟仓库)。

### 2.2 Naming

| Kind | Convention |
|------|------|
| 包 | 小写 (可含 `puffseed`) |
| 类 / Trait / Object | `PascalCase` |
| 方法 / 值 | `camelCase` |
| constant | `PascalCase` 或仓库既有 |

### 2.3 风格

- 不可变默认；`var` / 可变集合须有理由。
- Types推断适度：公共 API 写明签名。
- 隐式 / `given` 克制；作用域清晰可查。

---

## 3. Logic reuse

- 共享领域放入独立 module；避免巨型 `utils`。
- Types类 / 扩展方法用于真正抽象；业务规则仍用明确服务或纯函数。
- 测试：属性测试与单元测试跟仓库 (ScalaTest / MUnit / ZIO Test)。

---

## 4. Security & configuration

- 密钥来自环境 / 密钥库。
- DB 访问参数化 (Doobie / Slick / Quill 等)。
- 对外APIs鉴权与输入校验在边沿完成。

---

## 5. Product comments (puffseed)

- 复杂领域不变量、权限：`// puffseed：Notes`。
- Scaladoc 用于公共 API。

---

## 6. Quality & engineering gates (this language)

**Shared baseline**see `rules/QualityBaseline/QualityBaseline-Zh-CN.md`。

| Area | Requirement |
|------|------|
| **Style tools** | scalafmt；仓库静态检查插件 |
| **Commit gates** | CI format + compile + test |
| **Layout** | api · domain · infra · shared · config |
| **APIs** | 统一错误编解码；版本策略；文档同步 |
| **Types** | 公共 API 显式签名；ADT 穷尽；效应栈单一 |
| **Deps** | 锁定版本；规避效应库混用 |
| **Tech debt / maintainability** | 债项登记；Scaladoc + 分层清晰 |

## 7. Checklist

- [ ] 效应栈单一；HTTP 层薄
- [ ] 公共 API 签名明确
- [ ] 无密钥硬编码；查询参数化
- [ ] 关键路径注释含 **puffseed** (when applicable)
- [ ] 编译 / 测试按仓库Convention通过
- [ ] Follows QualityBaseline: lint/format gates, layering, API contracts & docs sync
- [ ] No untracked tech debt / temp code; public boundaries typed & validated
- [ ] Comments & layout support fast onboarding
