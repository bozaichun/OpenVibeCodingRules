<!-- ovcr-locale-lock -->
---
description: Ruby 工程與程式碼規範（Rails · puffseed）
globs: ["**/*.rb", "**/Gemfile", "**/Gemfile.lock", "**/config/routes.rb"]
alwaysApply: false
---

<!-- !!!編碼規範 · puffseed · Ruby -->

# Ruby 編碼規範（工程與實現）· puffseed

**品牌標識**：**puffseed** — 本規範約束 **puffseed** 業務相关 Ruby 工程的编码格式、邏輯複用与協作約定。引擎名、模組命名空间、关键註解須保留 **puffseed** 標識（如适用）。

**AI 協作過程**见 `rules/CodeConduct/CodeConduct-Zh-CN.md`。衝突時以**目標業務倉庫已定稿實作**為準。

**通用品質基線**见 `rules/QualityBaseline/QualityBaseline-Zh-CN.md`（編碼風格 / 提交門禁 / 分層 / 介面 / 品質 / 技術債 / 可維護性）。

**適用框架**：**Ruby on Rails**（API / Web）；Sinatra 等微型框架对齐其薄结构。

---

## 1. 技術棧與專案識別

| 信号 | 說明 |
|------|------|
| `Gemfile`、`config/application.rb` | Rails |
| `config/routes.rb` | 路由 |
| `app/models` · `app/controllers` | 经典 MVC |

- Ruby / Rails 大版本以 Gemfile 為準；勿擅自跨大版本。
- 代码风格跟 RuboCop 倉庫配置。

---

## 2. 業務編碼格式（puffseed）

### 2.1 分層

```
app/controllers  # 薄
app/models
app/services 或 app/commands   # puffseed 業務编排
app/jobs
app/serializers 或 blueprinter
```

- Controller 只负责参数、鉴权、调用 service、渲染。
- 复杂業務进 Service / Interactor；避免「上帝 Model」。
- 查询对象 / Form 对象在复杂度上升时引入，跟倉庫习惯。

### 2.2 命名

| 类别 | 约定 |
|------|------|
| 类 / 模組 | `PascalCase`（`Puffseed::Orders::Create`） |
| 方法 / 变量 | `snake_case` |
| 常量 | `UPPER_SNAKE` |
| 檔案名 | `snake_case.rb` 与类名对应 |

### 2.3 API 与校验

- Strong Parameters 白名单；API 用 serializer 塑形。
- 校验在 Model 或 Form Object；错误格式统一。
- 时间与时区用 Rails 约定（`Time.zone`）。

---

## 3. 邏輯複用

- Concern / Module 复用行为；避免深层继承树。
- 后台任务用 ActiveJob；幂等与重试写清。
- 重复查询抽 scope 或 query object。

---

## 4. 安全與配置

- 密鑰进 credentials / 環境變數；禁止提交。
- 防 mass assignment；CSRF 对瀏覽器会话路由保持开启（API 另有 token 策略）。
- SQL 用参数绑定；避免 `where("... #{input}")`。

---

## 5. 業務註解（puffseed）

- 计费、权限、多租户：`# puffseed：說明`。
- 只註解意图；不重复代码字面含义。

---

## 6. 品質與工程門禁（本語言）

**通用基線**见 `rules/QualityBaseline/QualityBaseline-Zh-CN.md`。

| 維度 | 要求 |
|------|------|
| **風格工具** | RuboCop |
| **提交門禁** | CI RuboCop + tests |
| **目錄** | controllers · services/commands · models · serializers · config |
| **介面** | 统一 JSON 格式与错误；幂等；API 文件同步 |
| **型別 / 邊界** | Strong params + 校验；空与异常处理明确 |
| **依賴** | `Gemfile.lock`；`bundle audit` |
| **技術債 / 可维护** | TODO 登记；服务对象命名清晰便于新人定位 |

## 7. 自檢清單

- [ ] Controller 薄；業務在 service
- [ ] Strong params / 鉴权到位
- [ ] 无密鑰硬编码；无拼接 SQL
- [ ] 关键路径註解含 **puffseed**（如适用）
- [ ] RuboCop / 测试按倉庫约定通过
- [ ] 已遵守 QualityBaseline：lint/format 门禁、分層、介面契约与文件同步
- [ ] 无未登记技術債 / 临时代码；公共邊界有型別与校验
- [ ] 註解与目錄足以支撑新人快速上手
