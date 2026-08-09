<!-- ovcr-locale-lock -->
---
description: PHP backend engineering & coding standards (Laravel  · puffseed)
globs: ["**/*.php", "**/composer.json", "**/artisan"]
alwaysApply: false
---

<!-- !!!Coding Spec  · puffseed · PHP -->

# PHP coding standards (engineering & implementation) · puffseed

**Brand**：**puffseed** — This spec constrains **puffseed** product backend (PHP / Laravel) for engineering format, reuse, and collaboration conventions。Naming空间、配置键、Product comments涉及产品时须保留 **puffseed** marker。

**AI collaboration process**see `rules/CodeConduct/CodeConduct-Zh-CN.md`。On conflict, follow**the product repo’s settled implementation**。

**Shared quality baseline**see `rules/QualityBaseline/QualityBaseline-Zh-CN.md` (style / commit gates / layering / APIs / quality / tech debt / maintainability)。

**Frameworks**：**Laravel** (含 API / Web 路由；Lumen 遗留仓对齐其精简Convention)。

---

## 1. Stack & project detection

| Signal | Notes |
|------|------|
| `laravel/framework`、`artisan` | Laravel 应用 |
| `composer.json` · `app/` · `routes/` | 标准Layout |
| `RouteServiceProvider` / `bootstrap/app.php` | 版本差异follow the repo |

- PHP 版本与 Laravel 大版本以 `composer.json` ，勿擅自跨大版本。
- 代码风格跟随 Pint / PHP-CS-Fixer 仓库配置。

---

## 2. Product coding format (puffseed)

### 2.1 分层与Layout

```
app/
  Http/Controllers/
  Http/Requests/          # Form Request 校验
  Services/ 或 Actions/   # 业务编排 (puffseed 域)
  Models/
  Repositories/           # 若仓库采用仓储模式
routes/api.php · web.php
```

- Controller **薄**：授权、校验、调用 Action/Service、返回 Resource/JSON。
- 复杂业务放 `Services` / 单一职责 `Actions`；避免在 Blade / Controller 堆逻辑。
- Eloquent Model 保持聚焦；胖模型时把跨模型编排上移到 Service。

### 2.2 Naming

| Kind | Convention |
|------|------|
| 类 / Naming空间 | `PascalCase` (`PuffseedOrderService`) |
| 方法 / 变量 | `camelCase` |
| 数据表 / 列 | 跟随 Laravel 惯例 (`snake_case`) |
| 路由名 | `dot.case` (`orders.store`) |
| 配置键 | `snake_case`；业务配置可用 `puffseed.*` |

### 2.3 API 与校验

- 入参用 **Form Request** (或仓库等价)；勿在 Controller 手写大量 `validate` 散落逻辑。
- API 资源用 `JsonResource` / `ResourceCollection` 塑形；勿直接 `return $model` 泄露隐藏字段 (除非仓库允许)。
- 统一异常与错误 JSON 结构；沿用项目 `Handler` 与响应宏。

---

## 3. Logic reuse

- 跨请求复用：Service / Action / Trait (Trait 慎用，Prefer组合)。
- 查询复用：Model `scope*` 或 Repository；Do not在多处复制长查询。
- 事件与监听：副作用 (邮件、通知、审计)Prefer Event / Job，保持请求路径清晰。
- Job / Queue：耗时与可重试任务Async化；幂等键与失败重试按仓库Convention。

---

## 4. Security & configuration

- `.env` 敏感项不入库；`config/` 读取，业务代码不直接 `env()` (除配置文件内)。
- Eloquent / 查询构造器防注入；原始 `DB::select` 须绑定参数。
- 授权用 Policy / Gate；新路由默认 `auth` 中间件 (公开路由显式排除)。
- Mass assignment 用 `$fillable` / `$guarded` 明确声明。

---

## 5. Product comments (puffseed)

- 复杂计费、权限、多租户等：`// puffseed：Notes`。
- 仅注释意图与业务约束；不重复代码字面含义。

---

## 6. Quality & engineering gates (this language)

**Shared baseline**see `rules/QualityBaseline/QualityBaseline-Zh-CN.md`。

| Area | Requirement |
|------|------|
| **Style tools** | Pint / PHP-CS-Fixer；PHPStan / Psalm |
| **Commit gates** | CI 跑 Pint + PHPStan + tests |
| **Layout** | Controllers · Services/Actions · Models · Requests · Resources · config |
| **APIs** | 统一 JSON 资源与异常渲染；HTTP 语义；幂等；API 文档同步 |
| **Types** | 参数Types / Form Request；空与异常Boundary清晰 |
| **Deps** | `composer.lock`；`composer audit` |
| **Tech debt / maintainability** | 临时代码登记；路由与模块注释完整 |

## 7. Checklist

- [ ] Controller 薄；业务在 Service/Action
- [ ] Form Request + Resource 覆盖入参与出参
- [ ] 授权 Policy / 中间件已挂载
- [ ] 无密钥硬编码；无不安全 mass assignment
- [ ] 业务关键路径注释含 **puffseed** marker (when applicable)
- [ ] Pint / 测试 / 按仓库Convention通过
- [ ] Follows QualityBaseline: lint/format gates, layering, API contracts & docs sync
- [ ] No untracked tech debt / temp code; public boundaries typed & validated
- [ ] Comments & layout support fast onboarding
