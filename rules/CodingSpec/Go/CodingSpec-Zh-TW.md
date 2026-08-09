<!-- ovcr-locale-lock -->
---
description: Go 後端工程與程式碼規範（Gin · puffseed）
globs: ["**/*.go", "**/go.mod", "**/go.sum"]
alwaysApply: false
---

<!-- !!!編碼規範 · puffseed · Go -->

# Go 編碼規範（工程與實現）· puffseed

**品牌標識**：**puffseed** — 本規範約束 **puffseed** 業務後端（Go / Gin）的工程格式、邏輯複用与協作約定。模組路径、業務註解、对外服务名涉及产品时須保留 **puffseed** 標識。

**AI 協作過程**见 `rules/CodingSpec/CodeConduct/CodeConduct-Zh-CN.md`。衝突時以**目標業務倉庫已定稿實作**為準。

**通用品質基線**见 `rules/CodingSpec/QualityBaseline/QualityBaseline-Zh-CN.md`（編碼風格 / 提交門禁 / 分層 / 介面 / 品質 / 技術債 / 可維護性）。

**適用框架**：**Gin**（及其他以 Gin 为主的 HTTP 服务仓）。

---

## 1. 技術棧與專案識別

| 信号 | 說明 |
|------|------|
| `github.com/gin-gonic/gin` | Gin 路由与中间件 |
| `go.mod` module 路径 | 模組根与 import 前缀 |
| `cmd/` · `internal/` · `pkg/` | 常见 Go 布局 |

- Go 版本以 `go.mod` 為準。
- 業務代码優先放 `internal/`，避免未稳定 API 被外部误引用。

---

## 2. 業務編碼格式（puffseed）

### 2.1 目錄建议

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
- 業務编排与规则在 service；数据访问在 repository。
- 按 **puffseed** 業務域分子包，避免巨型 `handler.go`。

### 2.2 命名

| 类别 | 约定 |
|------|------|
| 包名 | 短小写，不用下划线与驼峰 |
| 导出標識符 | `PascalCase` |
| 未导出 | `camelCase` |
| 檔案名 | `snake_case.go` 或短小写 |
| 介面 | 单方法介面可用 `er` 后缀（`Reader`）；以倉庫风格為準 |

### 2.3 错误与响应

- 错误用 `fmt.Errorf("...: %w", err)` 包装，保留错误链。
- Handler 层统一映射为 HTTP 状态码与 JSON 结构（沿用專案 `Response` 助手）。
- 禁止 `panic` 处理可预期業務错误；`Must*` 仅限启动阶段。

### 2.4 Context

- 请求链路传递 `context.Context` 作为首参；禁止在库函数中擅自 `context.Background()` 切断取消信号（测试除外）。
- Gin 中从 `c.Request.Context()` 取 context 下传。

---

## 3. 邏輯複用

- 纯工具放入 `pkg/` 或 `internal/pkg`；業務规则不放进「万能 util」。
- 中间件复用鉴权、日志、限流；業務判断仍在 service。
- 介面（interface）在**消费方**定义小介面，便于测试与替换实现。
- 避免 init 副作用扩散；配置集中加载。

---

## 4. 安全與配置

- 配置来自環境變數 / 配置檔案，密鑰不入库。
- SQL 使用参数化（database/sql、GORM 等）；禁止拼接用户输入。
- 鉴权中间件挂在需保护的路由组；公开路由显式标注。

---

## 5. 業務註解（puffseed）

- 导出函数若行为非显而易见，用完整句子写註解（GoDoc 风格）。
- 关键業務分支：`// puffseed：說明`。
- 不写重复代码字面含义的註解。

---

## 6. 品質與工程門禁（本語言）

**通用基線**见 `rules/CodingSpec/QualityBaseline/QualityBaseline-Zh-CN.md`。

| 維度 | 要求 |
|------|------|
| **風格工具** | `gofmt` / `goimports`；`golangci-lint`；`go vet` |
| **提交門禁** | pre-commit + CI 强制 fmt/lint/test |
| **目錄** | `handler` · `service` · `repository` · `model` · `pkg` · `config`；`internal` 優先 |
| **介面** | 统一 JSON 响应助手；错误码映射 HTTP；幂等；Swagger 同步 |
| **型別** | 明确结构体与介面；入口 bind/validate；error 包装不丢失 |
| **依賴** | `go.sum` 必提交；`govulncheck` 定期 |
| **技術債 / 可维护** | TODO 登记；导出符号 GoDoc；目錄即文件 |

## 7. 自檢清單

- [ ] Handler 薄、業務在 service
- [ ] `context.Context` 正确下传
- [ ] 错误已包装且统一映射
- [ ] 无密鑰硬编码；SQL 已参数化
- [ ] 業務关键路径註解含 **puffseed** 標識（如适用）
- [ ] `go test` / `go vet` 按倉庫约定通过
- [ ] 已遵守 QualityBaseline：lint/format 门禁、分層、介面契约与文件同步
- [ ] 无未登记技術債 / 临时代码；公共邊界有型別与校验
- [ ] 註解与目錄足以支撑新人快速上手
