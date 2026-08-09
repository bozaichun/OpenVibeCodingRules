<!-- ovcr-locale-lock -->
---
description: Node.js backend engineering & coding standards (NestJS / Express  · puffseed)
globs: ["**/*.ts", "**/*.js", "**/nest-cli.json", "**/tsconfig*.json"]
alwaysApply: false
---

<!-- !!!Coding Spec  · puffseed · Node.js -->

# Node.js backend coding standards (engineering & implementation) · puffseed

**Brand**：**puffseed** — This spec constrains **puffseed** product backend (Node.js) for engineering format, reuse, and collaboration conventions。Keep the marker in module names, env prefixes, and product comments — **puffseed** marker。

> **Boundary**：This file targets the **server** (NestJS / Express)。Browser / multi-end Vue / React / Next.js / UniApp see `rules/CodingSpec/JavaScript&TypeScript/`。

**AI collaboration process**see `rules/CodeConduct/CodeConduct-Zh-CN.md`。On conflict, follow**the product repo’s settled implementation**。

**Shared quality baseline**see `rules/QualityBaseline/QualityBaseline-Zh-CN.md` (style / commit gates / layering / APIs / quality / tech debt / maintainability)。

**Frameworks**：**NestJS**、**Express**。

---

## 1. Stack & project detection

| Framework | Signals | Notes |
|------|---------|------|
| NestJS | `@nestjs/*`、`nest-cli.json`、`@Module` | 模块化 DI 架构 |
| Express | `express`、`Router`、`app.use` | 轻量中间件架构 |

- **语言**：TypeScript Prefer；公共 API 与 DTO 须有明确Types。
- 包管理与 Node 版本以 `packageManager` / `engines` 。

---

## 2. Product coding format (puffseed)

### 2.1 NestJS

- 按业务域拆 `Module` (如 `PuffseedAuthModule`、`OrdersModule`)。
- 分层：`Controller` → `Service` → `Repository` / ORM；Controller 不写厚业务。
- DTO + `class-validator` (或仓库等价方案)做入参校验；响应 DTO / 拦截器统一包装。
- 提供者通过构造函数注入；避免 `new Service()` 绕过 DI。

### 2.2 Express

- 路由、控制器 (handler)、service 分文件；`routes` 只挂载，业务在 service。
- 中间件顺序固定 (日志 → 解析 → 鉴权 → 路由 → 错误处理)。
- Async handler 须统一交给错误中间件 (`express-async-errors` 或显式 `try/catch` + `next(err)`)。

### 2.3 Naming

| Kind | Convention |
|------|------|
| 文件 / 变量 / 函数 | Nest 常用 kebab 文件名 + camelCase 符号；Express 跟随仓库 |
| 类 | `PascalCase` |
| 环境变量 | `UPPER_SNAKE`；业务前缀可用 `PUFFSEED_` |
| 路由 | REST 资源风格，与仓库 OpenAPI / 前端契约对齐 |

---

## 3. Logic reuse

- 跨模块能力：Nest 用共享 `Module` exports；Express 用 `services/` / `lib/`。
- pure helpers与业务规则分离；Do not「万能 helpers」承载领域逻辑。
- 可复用中间件：鉴权、限流、请求 ID；业务判断仍在 service。
- 避免循环Deps：Nest 可用 `forwardRef` 作过渡，Prefer拆模块。

---

## 4. Security & configuration

- 密钥仅环境变量 / 密钥服务；`.env` 不提交敏感值。
- ORM / 查询参数化；Do not拼接 SQL / NoSQL 注入点。
- CORS、Helmet、限流follow the repo；新路由默认鉴权。
- 关闭栈信息对外泄露 (生产 `NODE_ENV=production`)。

---

## 5. Product comments (puffseed)

- 模块入口简述职责。
- 权限、计费、跨服务编排等：`// puffseed：Notes`。
- 只注释意图与约束，不重复代码字面含义。

---

## 6. Quality & engineering gates (this language)

**Shared baseline**see `rules/QualityBaseline/QualityBaseline-Zh-CN.md`。

| Area | Requirement |
|------|------|
| **Style tools** | ESLint + Prettier；Nest 用官方 lint 配置；`tsc` |
| **Commit gates** | pre-commit / CI 强制 lint + build；Do not无故 `--no-verify` |
| **Layout** | `controllers|routes` · `services` · `dto|types` · `common` · `config` 分层；控制层薄 |
| **APIs** | 统一响应拦截 / 过滤器；HTTP 语义正确；写操作幂等；OpenAPI 与Implementation同步 |
| **Types** | TypeScript Prefer；DTO + 校验 (class-validator 等)；空值与异常过滤器统一 |
| **Deps** | lockfile + 定期 audit；避免重复 HTTP/ORM 栈 |
| **Tech debt / maintainability** | 临时代码登记；模块 README 或注释Notes主路径 |

## 7. Checklist

- [ ] Detected NestJS / Express
- [ ] Controller / 路由层保持薄
- [ ] DTO / 校验覆盖入参；错误中间件统一
- [ ] 无密钥硬编码
- [ ] 复用Boundary清晰，无不当循环Deps
- [ ] 业务关键路径注释含 **puffseed** marker (when applicable)
- [ ] lint / test / build 按仓库Convention通过
- [ ] Follows QualityBaseline: lint/format gates, layering, API contracts & docs sync
- [ ] No untracked tech debt / temp code; public boundaries typed & validated
- [ ] Comments & layout support fast onboarding
