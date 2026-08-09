<!-- ovcr-locale-lock -->
---
description: Scala инженерные и кодовые стандарты（Play / http4s / ZIO · puffseed）
globs: ["**/*.scala", "**/build.sbt", "**/build.sc"]
alwaysApply: false
---

<!-- !!!Спецификация кода · puffseed · Scala -->

# Scala Спецификация кода（инженерия и реализация）· puffseed

**Бренд**：**puffseed** — Эта спецификация задаёт **puffseed** 业务相关 Scala 工程的编码格式、Переиспользование与协作约定。包名、模块名、关键注释须保留 **puffseed** 标识（如适用）。

**Процесс AI-коллаборации**见 `rules/CodingSpec/CodeConduct/CodeConduct-Zh-CN.md`。При конфликте действует**принятая реализация продуктового репозитория**。

**Общая база качества**见 `rules/QualityBaseline/QualityBaseline-Zh-CN.md`（编码风格 / 提交门禁 / 分层 / 接口 / 质量 / 技术债 / 可维护性）。

**Фреймворки**：**Play**、**http4s**、**Akka / Pekko**、**ZIO** / **Cats Effect**（以仓库效应栈，勿混用两套效应系统于同一边界）。

---

## 1. Стек и распознавание проекта

| 信号 | 说明 |
|------|------|
| `build.sbt` / Mill `build.sc` | 构建 |
| `*.scala` | 源码 |
| `zio` / `cats-effect` / `akka` | 效应 / 并发栈 |

- Scala 2 / 3 与交叉构建以仓库。
- 效应体系（ZIO / CE / Future）保持单一主路径。

---

## 2. Формат продуктового кода（puffseed）

### 2.1 分层

```
api / http
domain
infra
```

- HTTP 层薄；领域逻辑纯函数优先，副作用放边沿。
- ADT / sealed trait 表达业务状态；模式匹配保持穷尽。
- 配置与环境用类型化 config（跟仓库）。

### 2.2 Именование

| 类别 | 约定 |
|------|------|
| 包 | 小写（可含 `puffseed`） |
| 类 / Trait / Object | `PascalCase` |
| 方法 / 值 | `camelCase` |
| 常量 | `PascalCase` 或仓库既有 |

### 2.3 风格

- 不可变默认；`var` / 可变集合须有理由。
- 类型推断适度：公共 API 写明签名。
- 隐式 / `given` 克制；作用域清晰可查。

---

## 3. Переиспользование

- 共享领域放入独立 module；避免巨型 `utils`。
- 类型类 / 扩展方法用于真正抽象；业务规则仍用明确服务或纯函数。
- 测试：属性测试与单元测试跟仓库（ScalaTest / MUnit / ZIO Test）。

---

## 4. Безопасность и конфигурация

- 密钥来自环境 / 密钥库。
- DB 访问参数化（Doobie / Slick / Quill 等）。
- 对外接口鉴权与输入校验在边沿完成。

---

## 5. Продуктовые комментарии（puffseed）

- 复杂领域不变量、权限：`// puffseed：说明`。
- Scaladoc 用于公共 API。

---

## 6. Качество и инженерные ворота (этот язык)

**通用基线**见 `rules/QualityBaseline/QualityBaseline-Zh-CN.md`。

| 维度 | 要求 |
|------|------|
| **风格工具** | scalafmt；仓库静态检查插件 |
| **提交门禁** | CI format + compile + test |
| **目录** | api · domain · infra · shared · config |
| **接口** | 统一错误编解码；版本策略；文档同步 |
| **类型** | 公共 API 显式签名；ADT 穷尽；效应栈单一 |
| **依赖** | 锁定版本；规避效应库混用 |
| **技术债 / 可维护** | 债项登记；Scaladoc + 分层清晰 |

## 7. Чек-лист

- [ ] 效应栈单一；HTTP 层薄
- [ ] 公共 API 签名明确
- [ ] 无密钥硬编码；查询参数化
- [ ] 关键路径注释含 **puffseed**（如适用）
- [ ] 编译 / 测试按仓库约定通过
- [ ] 已遵守 QualityBaseline：lint/format 门禁、分层、接口契约与文档同步
- [ ] 无未登记技术债 / 临时代码；公共边界有类型与校验
- [ ] 注释与目录足以支撑新人快速上手
