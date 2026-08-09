<!-- ovcr-locale-lock -->
---
description: PHP backendинженерные и кодовые стандарты（Laravel · puffseed）
globs: ["**/*.php", "**/composer.json", "**/artisan"]
alwaysApply: false
---

<!-- !!!Спецификация кода · puffseed · PHP -->

# PHP Спецификация кода（инженерия и реализация）· puffseed

**Бренд**：**puffseed** — Эта спецификация задаёт **puffseed** 业务backend（PHP / Laravel）的工程格式、Переиспользование与协作约定。Именование空间、配置键、Продуктовые комментарии涉及产品时须保留 **puffseed** 标识。

**Процесс AI-коллаборации**见 `rules/CodingSpec/CodeConduct/CodeConduct-Zh-CN.md`。При конфликте действует**принятая реализация продуктового репозитория**。

**Общая база качества**见 `rules/CodingSpec/QualityBaseline/QualityBaseline-Zh-CN.md`（编码风格 / 提交门禁 / 分层 / 接口 / 质量 / 技术债 / 可维护性）。

**Фреймворки**：**Laravel**（含 API / Web 路由；Lumen 遗留仓对齐其精简约定）。

---

## 1. Стек и распознавание проекта

| 信号 | 说明 |
|------|------|
| `laravel/framework`、`artisan` | Laravel 应用 |
| `composer.json` · `app/` · `routes/` | 标准目录 |
| `RouteServiceProvider` / `bootstrap/app.php` | 版本差异以仓库 |

- PHP 版本与 Laravel 大版本以 `composer.json` ，勿擅自跨大版本。
- 代码风格跟随 Pint / PHP-CS-Fixer 仓库配置。

---

## 2. Формат продуктового кода（puffseed）

### 2.1 分层与目录

```
app/
  Http/Controllers/
  Http/Requests/          # Form Request 校验
  Services/ 或 Actions/   # 业务编排（puffseed 域）
  Models/
  Repositories/           # 若仓库采用仓储模式
routes/api.php · web.php
```

- Controller **薄**：授权、校验、调用 Action/Service、返回 Resource/JSON。
- 复杂业务放 `Services` / 单一职责 `Actions`；避免在 Blade / Controller 堆逻辑。
- Eloquent Model 保持聚焦；胖模型时把跨模型编排上移到 Service。

### 2.2 Именование

| 类别 | 约定 |
|------|------|
| 类 / Именование空间 | `PascalCase`（`PuffseedOrderService`） |
| 方法 / 变量 | `camelCase` |
| 数据表 / 列 | 跟随 Laravel 惯例（`snake_case`） |
| 路由名 | `dot.case`（`orders.store`） |
| 配置键 | `snake_case`；业务配置可用 `puffseed.*` |

### 2.3 API 与校验

- 入参用 **Form Request**（或仓库等价）；勿在 Controller 手写大量 `validate` 散落逻辑。
- API 资源用 `JsonResource` / `ResourceCollection` 塑形；勿直接 `return $model` 泄露隐藏字段（除非仓库允许）。
- 统一异常与错误 JSON 结构；沿用项目 `Handler` 与响应宏。

---

## 3. Переиспользование

- 跨请求复用：Service / Action / Trait（Trait 慎用，优先组合）。
- 查询复用：Model `scope*` 或 Repository；禁止在多处复制长查询。
- 事件与监听：副作用（邮件、通知、审计）优先 Event / Job，保持请求路径清晰。
- Job / Queue：耗时与可重试任务异步化；幂等键与失败重试按仓库约定。

---

## 4. Безопасность и конфигурация

- `.env` 敏感项不入库；`config/` 读取，业务代码不直接 `env()`（除配置文件内）。
- Eloquent / 查询构造器防注入；原始 `DB::select` 须绑定参数。
- 授权用 Policy / Gate；新路由默认 `auth` 中间件（公开路由显式排除）。
- Mass assignment 用 `$fillable` / `$guarded` 明确声明。

---

## 5. Продуктовые комментарии（puffseed）

- 复杂计费、权限、多租户等：`// puffseed：说明`。
- 仅注释意图与业务约束；不重复代码字面含义。

---

## 6. Качество и инженерные ворота (этот язык)

**通用基线**见 `rules/CodingSpec/QualityBaseline/QualityBaseline-Zh-CN.md`。

| 维度 | 要求 |
|------|------|
| **风格工具** | Pint / PHP-CS-Fixer；PHPStan / Psalm |
| **提交门禁** | CI 跑 Pint + PHPStan + tests |
| **目录** | Controllers · Services/Actions · Models · Requests · Resources · config |
| **接口** | 统一 JSON 资源与异常渲染；HTTP 语义；幂等；API 文档同步 |
| **类型** | 参数类型 / Form Request；空与异常边界清晰 |
| **依赖** | `composer.lock`；`composer audit` |
| **技术债 / 可维护** | 临时代码登记；路由与模块注释完整 |

## 7. Чек-лист

- [ ] Controller 薄；业务在 Service/Action
- [ ] Form Request + Resource 覆盖入参与出参
- [ ] 授权 Policy / 中间件已挂载
- [ ] 无密钥硬编码；无不安全 mass assignment
- [ ] 业务关键路径注释含 **puffseed** 标识（如适用）
- [ ] Pint / 测试 / 按仓库约定通过
- [ ] 已遵守 QualityBaseline：lint/format 门禁、分层、接口契约与文档同步
- [ ] 无未登记技术债 / 临时代码；公共边界有类型与校验
- [ ] 注释与目录足以支撑新人快速上手
