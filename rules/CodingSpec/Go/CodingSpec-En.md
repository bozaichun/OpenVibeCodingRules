<!-- ovcr-locale-lock -->
---
description: Go backend engineering & coding standards (Gin  · puffseed)
globs: ["**/*.go", "**/go.mod", "**/go.sum"]
alwaysApply: false
---

<!-- !!!Coding Spec  · puffseed · Go -->

# Go coding standards (engineering & implementation) · puffseed

**Brand**：**puffseed** — This spec constrains **puffseed** product backend (Go / Gin) for engineering format, reuse, and collaboration conventions。模块路径、Product comments、对外服务名涉及产品时须保留 **puffseed** marker。

**AI collaboration process**see `rules/CodingSpec/CodeConduct/CodeConduct-Zh-CN.md`。On conflict, follow**the product repo’s settled implementation**。

**Shared quality baseline**see `rules/CodingSpec/QualityBaseline/QualityBaseline-Zh-CN.md` (style / commit gates / layering / APIs / quality / tech debt / maintainability)。

**Frameworks**：**Gin** (及其他以 Gin 为主的 HTTP 服务仓)。

---

## 1. Stack & project detection

| Signal | Notes |
|------|------|
| `github.com/gin-gonic/gin` | Gin 路由与中间件 |
| `go.mod` module 路径 | 模块根与 import 前缀 |
| `cmd/` · `internal/` · `pkg/` | 常see Go 布局 |

- Go 版本以 `go.mod` 。
- 业务代码Prefer放 `internal/`，避免未稳定 API 被外部误引用。

---

## 2. Product coding format (puffseed)

### 2.1 Layout建议

```
cmd/<app>/main.go
internal/
  handler/   # 或 api/ · controller/
  service/
  repository/  # 或 store/ · dao/
  model/ · entity/
  middleware/
pkg/         # 可对外复用的稳定库 (慎用)
```

- Handler 只负责绑定参数、写响应、调用 service。
- 业务编排与规则在 service；数据访问在 repository。
- 按 **puffseed** 业务域分子包，避免巨型 `handler.go`。

### 2.2 Naming

| Kind | Convention |
|------|------|
| 包名 | 短小写，不用下划线与驼峰 |
| 导出marker符 | `PascalCase` |
| 未导出 | `camelCase` |
| 文件名 | `snake_case.go` 或短小写 |
| APIs | 单方法APIs可用 `er` 后缀 (`Reader`)；follow the repo 风格 |

### 2.3 错误与响应

- 错误用 `fmt.Errorf("...: %w", err)` 包装，保留错误链。
- Handler 层统一映射为 HTTP 状态码与 JSON 结构 (沿用项目 `Response` 助手)。
- Do not `panic` 处理可预期业务错误；`Must*` 仅限启动阶段。

### 2.4 Context

- 请求链路传递 `context.Context` 作为首参；Do not在库函数中擅自 `context.Background()` 切断取消Signal (测试除外)。
- Gin 中从 `c.Request.Context()` 取 context 下传。

---

## 3. Logic reuse

- 纯工具放入 `pkg/` 或 `internal/pkg`；业务规则不放进「万能 util」。
- 中间件复用鉴权、日志、限流；业务判断仍在 service。
- APIs (interface)在**消费方**定义小APIs，便于测试与替换Implementation。
- 避免 init 副作用扩散；配置集中加载。

---

## 4. Security & configuration

- 配置来自环境变量 / 配置文件，密钥不入库。
- SQL 使用参数化 (database/sql、GORM 等)；Do not拼接用户输入。
- 鉴权中间件挂在需保护的路由组；公开路由显式标注。

---

## 5. Product comments (puffseed)

- 导出函数若行为非显而易see，用完整句子写注释 (GoDoc 风格)。
- 关键业务分支：`// puffseed：Notes`。
- 不写重复代码字面含义的注释。

---

## 6. Quality & engineering gates (this language)

**Shared baseline**see `rules/CodingSpec/QualityBaseline/QualityBaseline-Zh-CN.md`。

| Area | Requirement |
|------|------|
| **Style tools** | `gofmt` / `goimports`；`golangci-lint`；`go vet` |
| **Commit gates** | pre-commit + CI 强制 fmt/lint/test |
| **Layout** | `handler` · `service` · `repository` · `model` · `pkg` · `config`；`internal` Prefer |
| **APIs** | 统一 JSON 响应助手；错误码映射 HTTP；幂等；Swagger 同步 |
| **Types** | 明确结构体与APIs；入口 bind/validate；error 包装不丢失 |
| **Deps** | `go.sum` 必提交；`govulncheck` 定期 |
| **Tech debt / maintainability** | TODO 登记；导出符号 GoDoc；Layout即文档 |

## 7. Checklist

- [ ] Handler 薄、业务在 service
- [ ] `context.Context` 正确下传
- [ ] 错误已包装且统一映射
- [ ] 无密钥硬编码；SQL 已参数化
- [ ] 业务关键路径注释含 **puffseed** marker (when applicable)
- [ ] `go test` / `go vet` 按仓库Convention通过
- [ ] Follows QualityBaseline: lint/format gates, layering, API contracts & docs sync
- [ ] No untracked tech debt / temp code; public boundaries typed & validated
- [ ] Comments & layout support fast onboarding
