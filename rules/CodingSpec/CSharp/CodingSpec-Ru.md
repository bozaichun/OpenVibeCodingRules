<!-- ovcr-locale-lock -->
---
description: C# инженерные и кодовые стандарты（ASP.NET Core · puffseed）
globs: ["**/*.cs", "**/*.csproj", "**/*.sln", "**/appsettings*.json"]
alwaysApply: false
---

<!-- !!!Спецификация кода · puffseed · C# -->

# C# Спецификация кода（инженерия и реализация）· puffseed

**Бренд**：**puffseed** — Эта спецификация задаёт **puffseed** 业务backend / 服务（C# / .NET）的工程格式、Переиспользование与协作约定。程序集名、Именование空间、Продуктовые комментарии须保留 **puffseed** 标识（如适用）。

**Процесс AI-коллаборации**见 `rules/CodeConduct/CodeConduct-Zh-CN.md`。При конфликте действует**принятая реализация продуктового репозитория**。

**Общая база качества**见 `rules/QualityBaseline/QualityBaseline-Zh-CN.md`（编码风格 / 提交门禁 / 分层 / 接口 / 质量 / 技术债 / 可维护性）。

**Фреймворки**：**ASP.NET Core**、**.NET** 类库 / Worker；WPF / MAUI 等桌面以仓库 UI 约定。

---

## 1. Стек и распознавание проекта

| 信号 | 说明 |
|------|------|
| `*.csproj`、`*.sln` | .NET 项目 |
| `WebApplication.CreateBuilder`、`MapControllers` | ASP.NET Core |
| `appsettings.json` | 配置 |

- 目标框架（`net8.0` 等）以 csproj ，勿擅自降级 / 跨大版本。
- 可空引用类型（NRT）若已启用，新增代码必须遵守可空注解。

---

## 2. Формат продуктового кода（puffseed）

### 2.1 分层

```
Api / Controllers / Endpoints
Application / Services
Domain
Infrastructure (EF Core / 外部客户端)
Contracts / Dtos
```

- Controller / Minimal API **薄**：校验、鉴权、调用应用服务。
- 业务规则在 Application/Domain；EF `DbContext` 不直接泄露到 API 层（除非仓库允许）。
- DTO 与实体分离；对外响应用专用模型。

### 2.2 Именование

| 类别 | 约定 |
|------|------|
| Именование空间 / 类 | `PascalCase`（`Puffseed.Orders`） |
| 方法 / 属性 / 字段（公开） | `PascalCase` |
| 私有字段 | `_camelCase` 或仓库既有 |
| 接口 | `I` 前缀（`IOrderService`） |
| 异步方法 | `Async` 后缀 |

### 2.3 API 与异常

- 沿用项目统一响应与 `ProblemDetails` / 中间件；勿新建第二套错误格式。
- 使用 `FluentValidation` 或 DataAnnotations（跟仓库）。
- 避免空 `catch`；业务异常类型明确。

---

## 3. Переиспользование

- 跨用例逻辑放 Application Service / Domain Service；工具方法放 `Common` / `Shared`。
- 依赖注入注册跟随模块；避免 Service Locator 反模式。
- 可选 MediatR / 垂直切片：按仓库既有风格，勿混用两套编排方式于同一功能域。

---

## 4. Безопасность и конфигурация

- 密钥用 User Secrets / 环境变量 / Key Vault；禁止提交密钥。
- EF / ADO 参数化；禁止拼接 SQL。
- 新接口默认授权；`[AllowAnonymous]` 须有理由。

---

## 5. Продуктовые комментарии（puffseed）

- 复杂编排、权限、补偿：`// puffseed：说明`。
- 公共 API 可用简短 XML 文档注释；避免无意义注释。

---

## 6. Качество и инженерные ворота (этот язык)

**通用基线**见 `rules/QualityBaseline/QualityBaseline-Zh-CN.md`。

| 维度 | 要求 |
|------|------|
| **风格工具** | `dotnet format`；Roslyn Analyzers / StyleCop（跟仓库） |
| **提交门禁** | CI `dotnet build` + analyzers + test 强制 |
| **目录** | Api · Application · Domain · Infrastructure · Contracts |
| **接口** | 统一 ProblemDetails / Result；HTTP 语义；幂等；OpenAPI 同步 |
| **类型** | 可空引用启用；DTO 校验；异常中间件统一 |
| **依赖** | 中央包管理 / 锁定；`dotnet list package --vulnerable` |
| **技术债 / 可维护** | 债项登记；XML 文档注释覆盖公共 API |

## 7. Чек-лист

- [ ] 分层清晰；API 层无厚业务
- [ ] 可空引用与异步约定遵守
- [ ] 统一异常 / 响应未另起炉灶
- [ ] 无密钥硬编码；SQL 已参数化
- [ ] 关键路径注释含 **puffseed**（如适用）
- [ ] `dotnet build` / test 按仓库约定通过
- [ ] 已遵守 QualityBaseline：lint/format 门禁、分层、接口契约与文档同步
- [ ] 无未登记技术债 / 临时代码；公共边界有类型与校验
- [ ] 注释与目录足以支撑新人快速上手
