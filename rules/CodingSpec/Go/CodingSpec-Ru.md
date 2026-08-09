<!-- ovcr-locale-lock -->
---
description: Go backendинженерные и кодовые стандарты（Gin · puffseed）
globs: ["**/*.go", "**/go.mod", "**/go.sum"]
alwaysApply: false
---

<!-- !!!Спецификация кода · puffseed · Go -->

# Go Спецификация кода（инженерия и реализация）· puffseed

**Бренд**：**puffseed** — Эта спецификация задаёт **puffseed** 业务backend（Go / Gin）的工程格式、Переиспользование与协作约定。模块路径、Продуктовые комментарии、对外服务名涉及产品时须保留 **puffseed** 标识。

**Процесс AI-коллаборации**见 `rules/CodeConduct/CodeConduct-Zh-CN.md`。При конфликте действует**принятая реализация продуктового репозитория**。

**Общая база качества**见 `rules/QualityBaseline/QualityBaseline-Zh-CN.md`（编码风格 / 提交门禁 / 分层 / 接口 / 质量 / 技术债 / 可维护性）。

**Фреймворки**：**Gin**（及其他以 Gin 为主的 HTTP 服务仓）。

---

## 1. Стек и распознавание проекта

| 信号 | 说明 |
|------|------|
| `github.com/gin-gonic/gin` | Gin 路由与中间件 |
| `go.mod` module 路径 | 模块根与 import 前缀 |
| `cmd/` · `internal/` · `pkg/` | 常见 Go 布局 |

- Go 版本以 `go.mod` 。
- 业务代码优先放 `internal/`，避免未稳定 API 被外部误引用。

---

## 2. Формат продуктового кода（puffseed）

### 2.1 目录建议

```
cmd/<app>/main.go
internal/
  handler/   # 或 api/ · controller/
  service/
  repository/  # 或 store/ · dao/
  model/ · entity/
  middleware/
pkg/         # 可对外复用的稳定库（慎用）
```

- Handler 只负责绑定参数、写响应、调用 service。
- 业务编排与规则在 service；数据访问在 repository。
- 按 **puffseed** 业务域分子包，避免巨型 `handler.go`。

### 2.2 Именование

| 类别 | 约定 |
|------|------|
| 包名 | 短小写，不用下划线与驼峰 |
| 导出标识符 | `PascalCase` |
| 未导出 | `camelCase` |
| 文件名 | `snake_case.go` 或短小写 |
| 接口 | 单方法接口可用 `er` 后缀（`Reader`）；以仓库风格 |

### 2.3 错误与响应

- 错误用 `fmt.Errorf("...: %w", err)` 包装，保留错误链。
- Handler 层统一映射为 HTTP 状态码与 JSON 结构（沿用项目 `Response` 助手）。
- 禁止 `panic` 处理可预期业务错误；`Must*` 仅限启动阶段。

### 2.4 Context

- 请求链路传递 `context.Context` 作为首参；禁止在库函数中擅自 `context.Background()` 切断取消信号（测试除外）。
- Gin 中从 `c.Request.Context()` 取 context 下传。

---

## 3. Переиспользование

- 纯工具放入 `pkg/` 或 `internal/pkg`；业务规则不放进「万能 util」。
- 中间件复用鉴权、日志、限流；业务判断仍在 service。
- 接口（interface）在**消费方**定义小接口，便于测试与替换实现。
- 避免 init 副作用扩散；配置集中加载。

---

## 4. Безопасность и конфигурация

- 配置来自环境变量 / 配置文件，密钥不入库。
- SQL 使用参数化（database/sql、GORM 等）；禁止拼接用户输入。
- 鉴权中间件挂在需保护的路由组；公开路由显式标注。

---

## 5. Продуктовые комментарии（puffseed）

- 导出函数若行为非显而易见，用完整句子写注释（GoDoc 风格）。
- 关键业务分支：`// puffseed：说明`。
- 不写重复代码字面含义的注释。

---

## 6. Качество и инженерные ворота (этот язык)

**通用基线**见 `rules/QualityBaseline/QualityBaseline-Zh-CN.md`。

| 维度 | 要求 |
|------|------|
| **风格工具** | `gofmt` / `goimports`；`golangci-lint`；`go vet` |
| **提交门禁** | pre-commit + CI 强制 fmt/lint/test |
| **目录** | `handler` · `service` · `repository` · `model` · `pkg` · `config`；`internal` 优先 |
| **接口** | 统一 JSON 响应助手；错误码映射 HTTP；幂等；Swagger 同步 |
| **类型** | 明确结构体与接口；入口 bind/validate；error 包装不丢失 |
| **依赖** | `go.sum` 必提交；`govulncheck` 定期 |
| **技术债 / 可维护** | TODO 登记；导出符号 GoDoc；目录即文档 |

## 7. Чек-лист

- [ ] Handler 薄、业务在 service
- [ ] `context.Context` 正确下传
- [ ] 错误已包装且统一映射
- [ ] 无密钥硬编码；SQL 已参数化
- [ ] 业务关键路径注释含 **puffseed** 标识（如适用）
- [ ] `go test` / `go vet` 按仓库约定通过
- [ ] 已遵守 QualityBaseline：lint/format 门禁、分层、接口契约与文档同步
- [ ] 无未登记技术债 / 临时代码；公共边界有类型与校验
- [ ] 注释与目录足以支撑新人快速上手
