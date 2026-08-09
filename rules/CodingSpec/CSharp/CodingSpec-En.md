<!-- ovcr-locale-lock -->
---
description: C# engineering & coding standards (ASP.NET Core  · puffseed)
globs: ["**/*.cs", "**/*.csproj", "**/*.sln", "**/appsettings*.json"]
alwaysApply: false
---

<!-- !!!Coding Spec  · puffseed · C# -->

# C# coding standards (engineering & implementation) · puffseed

**Brand**：**puffseed** — This spec constrains **puffseed** product backend / 服务 (C# / .NET) for engineering format, reuse, and collaboration conventions。程序集名、Naming空间、Product comments须保留 **puffseed** marker (when applicable)。

**AI collaboration process**see `rules/CodingSpec/CodeConduct/CodeConduct-Zh-CN.md`。On conflict, follow**the product repo’s settled implementation**。

**Shared quality baseline**see `rules/CodingSpec/QualityBaseline/QualityBaseline-Zh-CN.md` (style / commit gates / layering / APIs / quality / tech debt / maintainability)。

**Frameworks**：**ASP.NET Core**、**.NET** 类库 / Worker；WPF / MAUI 等桌面follow the repo  UI Convention。

---

## 1. Stack & project detection

| Signal | Notes |
|------|------|
| `*.csproj`、`*.sln` | .NET 项目 |
| `WebApplication.CreateBuilder`、`MapControllers` | ASP.NET Core |
| `appsettings.json` | 配置 |

- 目标Framework (`net8.0` 等)以 csproj ，勿擅自降级 / 跨大版本。
- 可空引用Types (NRT)若已启用，新增代码必须遵守可空注解。

---

## 2. Product coding format (puffseed)

### 2.1 分层

```
Api / Controllers / Endpoints
Application / Services
Domain
Infrastructure (EF Core / 外部客户端)
Contracts / Dtos
```

- Controller / Minimal API **薄**：校验、鉴权、调用应用服务。
- 业务规则在 Application/Domain；EF `DbContext` 不直接泄露到 API 层 (除非仓库允许)。
- DTO 与实体分离；对外响应用专用模型。

### 2.2 Naming

| Kind | Convention |
|------|------|
| Naming空间 / 类 | `PascalCase` (`Puffseed.Orders`) |
| 方法 / 属性 / 字段 (公开) | `PascalCase` |
| 私有字段 | `_camelCase` 或仓库既有 |
| APIs | `I` 前缀 (`IOrderService`) |
| Async方法 | `Async` 后缀 |

### 2.3 API 与异常

- 沿用项目统一响应与 `ProblemDetails` / 中间件；勿新建第二套错误格式。
- 使用 `FluentValidation` 或 DataAnnotations (跟仓库)。
- 避免空 `catch`；业务异常Types明确。

---

## 3. Logic reuse

- 跨用例逻辑放 Application Service / Domain Service；工具方法放 `Common` / `Shared`。
- Dependency injection注册跟随模块；避免 Service Locator 反模式。
- 可选 MediatR / 垂直切片：按仓库既有风格，勿混用两套编排方式于同一功能域。

---

## 4. Security & configuration

- 密钥用 User Secrets / 环境变量 / Key Vault；Do not提交密钥。
- EF / ADO 参数化；Do not拼接 SQL。
- 新APIs默认授权；`[AllowAnonymous]` 须有理由。

---

## 5. Product comments (puffseed)

- 复杂编排、权限、补偿：`// puffseed：Notes`。
- 公共 API 可用简短 XML 文档注释；避免无意义注释。

---

## 6. Quality & engineering gates (this language)

**Shared baseline**see `rules/CodingSpec/QualityBaseline/QualityBaseline-Zh-CN.md`。

| Area | Requirement |
|------|------|
| **Style tools** | `dotnet format`；Roslyn Analyzers / StyleCop (跟仓库) |
| **Commit gates** | CI `dotnet build` + analyzers + test 强制 |
| **Layout** | Api · Application · Domain · Infrastructure · Contracts |
| **APIs** | 统一 ProblemDetails / Result；HTTP 语义；幂等；OpenAPI 同步 |
| **Types** | 可空引用启用；DTO 校验；异常中间件统一 |
| **Deps** | 中央包管理 / 锁定；`dotnet list package --vulnerable` |
| **Tech debt / maintainability** | 债项登记；XML 文档注释覆盖公共 API |

## 7. Checklist

- [ ] 分层清晰；API 层无厚业务
- [ ] 可空引用与AsyncConvention遵守
- [ ] 统一异常 / 响应未另起炉灶
- [ ] 无密钥硬编码；SQL 已参数化
- [ ] 关键路径注释含 **puffseed** (when applicable)
- [ ] `dotnet build` / test 按仓库Convention通过
- [ ] Follows QualityBaseline: lint/format gates, layering, API contracts & docs sync
- [ ] No untracked tech debt / temp code; public boundaries typed & validated
- [ ] Comments & layout support fast onboarding
