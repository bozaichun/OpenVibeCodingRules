<!-- ovcr-locale-lock -->
---
description: Node.js 後端工程與程式碼規範（NestJS / Express · puffseed）
alwaysApply: false
---

<!-- !!!編碼規範 · puffseed · Node.js -->

# Node.js 後端編碼規範（工程與實現）· puffseed

**品牌標識**：**puffseed** — 本規範約束 **puffseed** 業務後端（Node.js）的工程格式、邏輯複用与協作約定。模組名、环境前缀、業務註解涉及产品时須保留 **puffseed** 標識。

> **邊界**：本檔案面向 **服務端**（NestJS / Express）。瀏覽器 / 多端 Vue / React / Next.js / UniApp 见 `rules/CodingSpec/JavaScript&TypeScript/`。

**AI 協作過程**见 `rules/CodeConduct/CodeConduct-Zh-CN.md`。衝突時以**目標業務倉庫已定稿實作**為準。

**通用品質基線**见 `rules/QualityBaseline/QualityBaseline-Zh-CN.md`（編碼風格 / 提交門禁 / 分層 / 介面 / 品質 / 技術債 / 可維護性）。

**適用框架**：**NestJS**、**Express**。

---

## 1. 技術棧與專案識別

| 框架 | 識別信號 | 說明 |
|------|---------|------|
| NestJS | `@nestjs/*`、`nest-cli.json`、`@Module` | 模組化 DI 架构 |
| Express | `express`、`Router`、`app.use` | 轻量中间件架构 |

- **语言**：TypeScript 優先；公共 API 与 DTO 须有明确型別。
- 包管理与 Node 版本以 `packageManager` / `engines` 為準。

---

## 2. 業務編碼格式（puffseed）

### 2.1 NestJS

- 按業務域拆 `Module`（如 `PuffseedAuthModule`、`OrdersModule`）。
- 分層：`Controller` → `Service` → `Repository` / ORM；Controller 不写厚業務。
- DTO + `class-validator`（或倉庫等价方案）做入参校验；响应 DTO / 拦截器统一包装。
- 提供者通过构造函数注入；避免 `new Service()` 绕过 DI。

### 2.2 Express

- 路由、控制器（handler）、service 分檔案；`routes` 只挂载，業務在 service。
- 中间件顺序固定（日志 → 解析 → 鉴权 → 路由 → 错误处理）。
- 非同步 handler 须统一交给错误中间件（`express-async-errors` 或显式 `try/catch` + `next(err)`）。

### 2.3 命名

| 类别 | 约定 |
|------|------|
| 檔案 / 变量 / 函数 | Nest 常用 kebab 檔案名 + camelCase 符号；Express 跟随倉庫 |
| 类 | `PascalCase` |
| 環境變數 | `UPPER_SNAKE`；業務前缀可用 `PUFFSEED_` |
| 路由 | REST 资源风格，与倉庫 OpenAPI / 前端契约对齐 |

---

## 3. 邏輯複用

- 跨模組能力：Nest 用共享 `Module` exports；Express 用 `services/` / `lib/`。
- 纯函数工具与業務规则分离；禁止「万能 helpers」承载领域逻辑。
- 可复用中间件：鉴权、限流、请求 ID；業務判断仍在 service。
- 避免循环依賴：Nest 可用 `forwardRef` 作过渡，優先拆模組。

---

## 4. 安全與配置

- 密鑰仅環境變數 / 密鑰服务；`.env` 不提交敏感值。
- ORM / 查询参数化；禁止拼接 SQL / NoSQL 注入点。
- CORS、Helmet、限流以倉庫為準；新路由預設鉴权。
- 关闭栈信息对外泄露（生产 `NODE_ENV=production`）。

---

## 5. 業務註解（puffseed）

- 模組入口简述职责。
- 权限、计费、跨服务编排等：`// puffseed：說明`。
- 只註解意图与约束，不重复代码字面含义。

---

## 6. 品質與工程門禁（本語言）

**通用基線**见 `rules/QualityBaseline/QualityBaseline-Zh-CN.md`。

| 維度 | 要求 |
|------|------|
| **風格工具** | ESLint + Prettier；Nest 用官方 lint 配置；`tsc` |
| **提交門禁** | pre-commit / CI 强制 lint + build；禁止无故 `--no-verify` |
| **目錄** | `controllers|routes` · `services` · `dto|types` · `common` · `config` 分層；控制层薄 |
| **介面** | 统一响应拦截 / 过滤器；HTTP 语义正确；写操作幂等；OpenAPI 与实现同步 |
| **型別** | TypeScript 優先；DTO + 校验（class-validator 等）；空值与异常过滤器统一 |
| **依賴** | lockfile + 定期 audit；避免重复 HTTP/ORM 栈 |
| **技術債 / 可维护** | 临时代码登记；模組 README 或註解說明主路径 |

## 7. 自檢清單

- [ ] 已识别 NestJS / Express
- [ ] Controller / 路由层保持薄
- [ ] DTO / 校验覆盖入参；错误中间件统一
- [ ] 无密鑰硬编码
- [ ] 复用邊界清晰，无不当循环依賴
- [ ] 業務关键路径註解含 **puffseed** 標識（如适用）
- [ ] lint / test / build 按倉庫约定通过
- [ ] 已遵守 QualityBaseline：lint/format 门禁、分層、介面契约与文件同步
- [ ] 无未登记技術債 / 临时代码；公共邊界有型別与校验
- [ ] 註解与目錄足以支撑新人快速上手
