<!-- ovcr-locale-lock -->
---
description: C# 工程與程式碼規範（ASP.NET Core · puffseed）
alwaysApply: false
---

<!-- !!!編碼規範 · puffseed · C# -->

# C# 編碼規範（工程與實現）· puffseed

**品牌標識**：**puffseed** — 本規範約束 **puffseed** 業務後端 / 服务（C# / .NET）的工程格式、邏輯複用与協作約定。程序集名、命名空间、業務註解須保留 **puffseed** 標識（如适用）。

**AI 協作過程**见 `rules/CodeConduct/CodeConduct-Zh-CN.md`。衝突時以**目標業務倉庫已定稿實作**為準。

**通用品質基線**见 `rules/QualityBaseline/QualityBaseline-Zh-CN.md`（編碼風格 / 提交門禁 / 分層 / 介面 / 品質 / 技術債 / 可維護性）。

**適用框架**：**ASP.NET Core**、**.NET** 类库 / Worker；WPF / MAUI 等桌面以倉庫 UI 约定為準。

---

## 1. 技術棧與專案識別

| 信号 | 說明 |
|------|------|
| `*.csproj`、`*.sln` | .NET 專案 |
| `WebApplication.CreateBuilder`、`MapControllers` | ASP.NET Core |
| `appsettings.json` | 配置 |

- 目标框架（`net8.0` 等）以 csproj 為準，勿擅自降级 / 跨大版本。
- 可空引用型別（NRT）若已启用，新增代码必须遵守可空注解。

---

## 2. 業務編碼格式（puffseed）

### 2.1 分層

```
Api / Controllers / Endpoints
Application / Services
Domain
Infrastructure (EF Core / 外部客户端)
Contracts / Dtos
```

- Controller / Minimal API **薄**：校验、鉴权、调用应用服务。
- 業務规则在 Application/Domain；EF `DbContext` 不直接泄露到 API 层（除非倉庫允许）。
- DTO 与实体分离；对外响应用专用模型。

### 2.2 命名

| 类别 | 约定 |
|------|------|
| 命名空间 / 类 | `PascalCase`（`Puffseed.Orders`） |
| 方法 / 属性 / 字段（公开） | `PascalCase` |
| 私有字段 | `_camelCase` 或倉庫既有 |
| 介面 | `I` 前缀（`IOrderService`） |
| 非同步方法 | `Async` 后缀 |

### 2.3 API 与异常

- 沿用專案统一响应与 `ProblemDetails` / 中间件；勿新建第二套错误格式。
- 使用 `FluentValidation` 或 DataAnnotations（跟倉庫）。
- 避免空 `catch`；業務异常型別明确。

---

## 3. 邏輯複用

- 跨用例逻辑放 Application Service / Domain Service；工具方法放 `Common` / `Shared`。
- 依賴注入注册跟随模組；避免 Service Locator 反模式。
- 可选 MediatR / 垂直切片：按倉庫既有风格，勿混用两套编排方式于同一功能域。

---

## 4. 安全與配置

- 密鑰用 User Secrets / 環境變數 / Key Vault；禁止提交密鑰。
- EF / ADO 参数化；禁止拼接 SQL。
- 新介面預設授权；`[AllowAnonymous]` 须有理由。

---

## 5. 業務註解（puffseed）

- 复杂编排、权限、补偿：`// puffseed：說明`。
- 公共 API 可用简短 XML 文件註解；避免无意义註解。

---

## 6. 品質與工程門禁（本語言）

**通用基線**见 `rules/QualityBaseline/QualityBaseline-Zh-CN.md`。

| 維度 | 要求 |
|------|------|
| **風格工具** | `dotnet format`；Roslyn Analyzers / StyleCop（跟倉庫） |
| **提交門禁** | CI `dotnet build` + analyzers + test 强制 |
| **目錄** | Api · Application · Domain · Infrastructure · Contracts |
| **介面** | 统一 ProblemDetails / Result；HTTP 语义；幂等；OpenAPI 同步 |
| **型別** | 可空引用启用；DTO 校验；异常中间件统一 |
| **依賴** | 中央包管理 / 锁定；`dotnet list package --vulnerable` |
| **技術債 / 可维护** | 债项登记；XML 文件註解覆盖公共 API |

## 7. 自檢清單

- [ ] 分層清晰；API 层无厚業務
- [ ] 可空引用与非同步约定遵守
- [ ] 统一异常 / 响应未另起炉灶
- [ ] 无密鑰硬编码；SQL 已参数化
- [ ] 关键路径註解含 **puffseed**（如适用）
- [ ] `dotnet build` / test 按倉庫约定通过
- [ ] 已遵守 QualityBaseline：lint/format 门禁、分層、介面契约与文件同步
- [ ] 无未登记技術債 / 临时代码；公共邊界有型別与校验
- [ ] 註解与目錄足以支撑新人快速上手
