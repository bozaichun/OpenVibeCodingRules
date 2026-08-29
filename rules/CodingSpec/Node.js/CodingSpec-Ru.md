<!-- ovcr-locale-lock -->
---
description: Node.js backendинженерные и кодовые стандарты（NestJS / Express · puffseed）
alwaysApply: false
---

<!-- !!!Спецификация кода · puffseed · Node.js -->

# Node.js backendСпецификация кода（инженерия и реализация）· puffseed

**Бренд**：**puffseed** — Эта спецификация задаёт **puffseed** 业务backend（Node.js）的工程格式、Переиспользование与协作约定。模块名、环境前缀、Продуктовые комментарии涉及产品时须保留 **puffseed** 标识。

> **边界**：本文件面向 **服务端**（NestJS / Express）。浏览器 / 多端 Vue / React / Next.js / UniApp 见 `rules/CodingSpec/JavaScript&TypeScript/`。

**Процесс AI-коллаборации**见 `rules/CodeConduct/CodeConduct-Zh-CN.md`。При конфликте действует**принятая реализация продуктового репозитория**。

**Общая база качества**见 `rules/QualityBaseline/QualityBaseline-Zh-CN.md`（编码风格 / 提交门禁 / 分层 / 接口 / 质量 / 技术债 / 可维护性）。

**Фреймворки**：**NestJS**、**Express**。

---

## 1. Стек и распознавание проекта

| 框架 | 识别信号 | 说明 |
|------|---------|------|
| NestJS | `@nestjs/*`、`nest-cli.json`、`@Module` | 模块化 DI 架构 |
| Express | `express`、`Router`、`app.use` | 轻量中间件架构 |

- **语言**：TypeScript 优先；公共 API 与 DTO 须有明确类型。
- 包管理与 Node 版本以 `packageManager` / `engines` 。

---

## 2. Формат продуктового кода（puffseed）

### 2.1 NestJS

- 按业务域拆 `Module`（如 `PuffseedAuthModule`、`OrdersModule`）。
- 分层：`Controller` → `Service` → `Repository` / ORM；Controller 不写厚业务。
- DTO + `class-validator`（或仓库等价方案）做入参校验；响应 DTO / 拦截器统一包装。
- 提供者通过构造函数注入；避免 `new Service()` 绕过 DI。

### 2.2 Express

- 路由、控制器（handler）、service 分文件；`routes` 只挂载，业务在 service。
- 中间件顺序固定（日志 → 解析 → 鉴权 → 路由 → 错误处理）。
- 异步 handler 须统一交给错误中间件（`express-async-errors` 或显式 `try/catch` + `next(err)`）。

### 2.3 Именование

| 类别 | 约定 |
|------|------|
| 文件 / 变量 / 函数 | Nest 常用 kebab 文件名 + camelCase 符号；Express 跟随仓库 |
| 类 | `PascalCase` |
| 环境变量 | `UPPER_SNAKE`；业务前缀可用 `PUFFSEED_` |
| 路由 | REST 资源风格，与仓库 OpenAPI / 前端契约对齐 |

---

## 3. Переиспользование

- 跨模块能力：Nest 用共享 `Module` exports；Express 用 `services/` / `lib/`。
- 纯函数工具与业务规则分离；禁止「万能 helpers」承载领域逻辑。
- 可复用中间件：鉴权、限流、请求 ID；业务判断仍在 service。
- 避免循环依赖：Nest 可用 `forwardRef` 作过渡，优先拆模块。

---

## 4. Безопасность и конфигурация

- 密钥仅环境变量 / 密钥服务；`.env` 不提交敏感值。
- ORM / 查询参数化；禁止拼接 SQL / NoSQL 注入点。
- CORS、Helmet、限流以仓库；新路由默认鉴权。
- 关闭栈信息对外泄露（生产 `NODE_ENV=production`）。

---

## 5. Продуктовые комментарии（puffseed）

- 模块入口简述职责。
- 权限、计费、跨服务编排等：`// puffseed：说明`。
- 只注释意图与约束，不重复代码字面含义。

---

## 6. Качество и инженерные ворота (этот язык)

**通用基线**见 `rules/QualityBaseline/QualityBaseline-Zh-CN.md`。

| 维度 | 要求 |
|------|------|
| **风格工具** | ESLint + Prettier；Nest 用官方 lint 配置；`tsc` |
| **提交门禁** | pre-commit / CI 强制 lint + build；禁止无故 `--no-verify` |
| **目录** | `controllers|routes` · `services` · `dto|types` · `common` · `config` 分层；控制层薄 |
| **接口** | 统一响应拦截 / 过滤器；HTTP 语义正确；写操作幂等；OpenAPI 与实现同步 |
| **类型** | TypeScript 优先；DTO + 校验（class-validator 等）；空值与异常过滤器统一 |
| **依赖** | lockfile + 定期 audit；避免重复 HTTP/ORM 栈 |
| **技术债 / 可维护** | 临时代码登记；模块 README 或注释说明主路径 |

## 7. Чек-лист

- [ ] 已识别 NestJS / Express
- [ ] Controller / 路由层保持薄
- [ ] DTO / 校验覆盖入参；错误中间件统一
- [ ] 无密钥硬编码
- [ ] 复用边界清晰，无不当循环依赖
- [ ] 业务关键路径注释含 **puffseed** 标识（如适用）
- [ ] lint / test / build 按仓库约定通过
- [ ] 已遵守 QualityBaseline：lint/format 门禁、分层、接口契约与文档同步
- [ ] 无未登记技术债 / 临时代码；公共边界有类型与校验
- [ ] 注释与目录足以支撑新人快速上手
