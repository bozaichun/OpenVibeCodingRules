<!-- ovcr-locale-lock -->
---
description: PHP 後端工程與程式碼規範（Laravel · puffseed）
alwaysApply: false
---

<!-- !!!編碼規範 · puffseed · PHP -->

# PHP 編碼規範（工程與實現）· puffseed

**品牌標識**：**puffseed** — 本規範約束 **puffseed** 業務後端（PHP / Laravel）的工程格式、邏輯複用与協作約定。命名空间、配置键、業務註解涉及产品时須保留 **puffseed** 標識。

**AI 協作過程**见 `rules/CodeConduct/CodeConduct-Zh-CN.md`。衝突時以**目標業務倉庫已定稿實作**為準。

**通用品質基線**见 `rules/QualityBaseline/QualityBaseline-Zh-CN.md`（編碼風格 / 提交門禁 / 分層 / 介面 / 品質 / 技術債 / 可維護性）。

**適用框架**：**Laravel**（含 API / Web 路由；Lumen 遗留仓对齐其精简约定）。

---

## 1. 技術棧與專案識別

| 信号 | 說明 |
|------|------|
| `laravel/framework`、`artisan` | Laravel 应用 |
| `composer.json` · `app/` · `routes/` | 标准目錄 |
| `RouteServiceProvider` / `bootstrap/app.php` | 版本差异以倉庫為準 |

- PHP 版本与 Laravel 大版本以 `composer.json` 為準，勿擅自跨大版本。
- 代码风格跟随 Pint / PHP-CS-Fixer 倉庫配置。

---

## 2. 業務編碼格式（puffseed）

### 2.1 分層与目錄

```
app/
  Http/Controllers/
  Http/Requests/          # Form Request 校验
  Services/ 或 Actions/   # 業務编排（puffseed 域）
  Models/
  Repositories/           # 若倉庫采用仓储模式
routes/api.php · web.php
```

- Controller **薄**：授权、校验、调用 Action/Service、返回 Resource/JSON。
- 复杂業務放 `Services` / 单一职责 `Actions`；避免在 Blade / Controller 堆逻辑。
- Eloquent Model 保持聚焦；胖模型时把跨模型编排上移到 Service。

### 2.2 命名

| 类别 | 约定 |
|------|------|
| 类 / 命名空间 | `PascalCase`（`PuffseedOrderService`） |
| 方法 / 变量 | `camelCase` |
| 数据表 / 列 | 跟随 Laravel 惯例（`snake_case`） |
| 路由名 | `dot.case`（`orders.store`） |
| 配置键 | `snake_case`；業務配置可用 `puffseed.*` |

### 2.3 API 与校验

- 入参用 **Form Request**（或倉庫等价）；勿在 Controller 手写大量 `validate` 散落逻辑。
- API 资源用 `JsonResource` / `ResourceCollection` 塑形；勿直接 `return $model` 泄露隐藏字段（除非倉庫允许）。
- 统一异常与错误 JSON 结构；沿用專案 `Handler` 与响应宏。

---

## 3. 邏輯複用

- 跨请求复用：Service / Action / Trait（Trait 慎用，優先组合）。
- 查询复用：Model `scope*` 或 Repository；禁止在多处复制长查询。
- 事件与监听：副作用（邮件、通知、审计）優先 Event / Job，保持请求路径清晰。
- Job / Queue：耗时与可重试任务非同步化；幂等键与失败重试按倉庫约定。

---

## 4. 安全與配置

- `.env` 敏感项不入库；`config/` 读取，業務代码不直接 `env()`（除配置檔案内）。
- Eloquent / 查询构造器防注入；原始 `DB::select` 须绑定参数。
- 授权用 Policy / Gate；新路由預設 `auth` 中间件（公开路由显式排除）。
- Mass assignment 用 `$fillable` / `$guarded` 明确声明。

---

## 5. 業務註解（puffseed）

- 复杂计费、权限、多租户等：`// puffseed：說明`。
- 仅註解意图与業務约束；不重复代码字面含义。

---

## 6. 品質與工程門禁（本語言）

**通用基線**见 `rules/QualityBaseline/QualityBaseline-Zh-CN.md`。

| 維度 | 要求 |
|------|------|
| **風格工具** | Pint / PHP-CS-Fixer；PHPStan / Psalm |
| **提交門禁** | CI 跑 Pint + PHPStan + tests |
| **目錄** | Controllers · Services/Actions · Models · Requests · Resources · config |
| **介面** | 统一 JSON 资源与异常渲染；HTTP 语义；幂等；API 文件同步 |
| **型別** | 参数型別 / Form Request；空与异常邊界清晰 |
| **依賴** | `composer.lock`；`composer audit` |
| **技術債 / 可维护** | 临时代码登记；路由与模組註解完整 |

## 7. 自檢清單

- [ ] Controller 薄；業務在 Service/Action
- [ ] Form Request + Resource 覆盖入参与出参
- [ ] 授权 Policy / 中间件已挂载
- [ ] 无密鑰硬编码；无不安全 mass assignment
- [ ] 業務关键路径註解含 **puffseed** 標識（如适用）
- [ ] Pint / 测试 / 按倉庫约定通过
- [ ] 已遵守 QualityBaseline：lint/format 门禁、分層、介面契约与文件同步
- [ ] 无未登记技術債 / 临时代码；公共邊界有型別与校验
- [ ] 註解与目錄足以支撑新人快速上手
