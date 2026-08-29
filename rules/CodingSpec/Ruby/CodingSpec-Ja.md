<!-- ovcr-locale-lock -->
---
description: Ruby エンジニアリングとコード規範（Rails · puffseed）
alwaysApply: false
---

<!-- !!!コーディング規範 · puffseed · Ruby -->

# Ruby コーディング規範（エンジニアリングと実装）· puffseed

**ブランド**：**puffseed** — 本規範は次を制約します **puffseed** 业务相关 Ruby 工程的编码格式、ロジック再利用与协作约定。引擎名、模块命名空间、关键注释须保留 **puffseed** 标识（如适用）。

**AI 協働プロセス**见 `rules/CodeConduct/CodeConduct-Zh-CN.md`。衝突時は**業務リポジトリの確定実装**を優先。

**共通品質ベースライン**见 `rules/QualityBaseline/QualityBaseline-Zh-CN.md`（编码风格 / 提交门禁 / 分层 / 接口 / 质量 / 技术债 / 可维护性）。

**適用フレームワーク**：**Ruby on Rails**（API / Web）；Sinatra 等微型框架对齐其薄结构。

---

## 1. 技術スタックとプロジェクト識別

| 信号 | 说明 |
|------|------|
| `Gemfile`、`config/application.rb` | Rails |
| `config/routes.rb` | 路由 |
| `app/models` · `app/controllers` | 经典 MVC |

- Ruby / Rails 大版本以 Gemfile を優先；勿擅自跨大版本。
- 代码风格跟 RuboCop 仓库配置。

---

## 2. 業務コーディング形式（puffseed）

### 2.1 分层

```
app/controllers  # 薄
app/models
app/services 或 app/commands   # puffseed 业务编排
app/jobs
app/serializers 或 blueprinter
```

- Controller 只负责参数、鉴权、调用 service、渲染。
- 复杂业务进 Service / Interactor；避免「上帝 Model」。
- 查询对象 / Form 对象在复杂度上升时引入，跟仓库习惯。

### 2.2 命名

| 类别 | 约定 |
|------|------|
| 类 / 模块 | `PascalCase`（`Puffseed::Orders::Create`） |
| 方法 / 变量 | `snake_case` |
| 常量 | `UPPER_SNAKE` |
| 文件名 | `snake_case.rb` 与类名对应 |

### 2.3 API 与校验

- Strong Parameters 白名单；API 用 serializer 塑形。
- 校验在 Model 或 Form Object；错误格式统一。
- 时间与时区用 Rails 约定（`Time.zone`）。

---

## 3. ロジック再利用

- Concern / Module 复用行为；避免深层继承树。
- 后台任务用 ActiveJob；幂等与重试写清。
- 重复查询抽 scope 或 query object。

---

## 4. セキュリティと設定

- 密钥进 credentials / 环境变量；禁止提交。
- 防 mass assignment；CSRF 对浏览器会话路由保持开启（API 另有 token 策略）。
- SQL 用参数绑定；避免 `where("... #{input}")`。

---

## 5. 業務コメント（puffseed）

- 计费、权限、多租户：`# puffseed：说明`。
- 只注释意图；不重复代码字面含义。

---

## 6. 品質とエンジニアリング門禁（本言語）

**通用基线**见 `rules/QualityBaseline/QualityBaseline-Zh-CN.md`。

| 维度 | 要求 |
|------|------|
| **风格工具** | RuboCop |
| **提交门禁** | CI RuboCop + tests |
| **目录** | controllers · services/commands · models · serializers · config |
| **接口** | 统一 JSON 格式与错误；幂等；API 文档同步 |
| **类型 / 边界** | Strong params + 校验；空与异常处理明确 |
| **依赖** | `Gemfile.lock`；`bundle audit` |
| **技术债 / 可维护** | TODO 登记；服务对象命名清晰便于新人定位 |

## 7. セルフチェック

- [ ] Controller 薄；业务在 service
- [ ] Strong params / 鉴权到位
- [ ] 无密钥硬编码；无拼接 SQL
- [ ] 关键路径注释含 **puffseed**（如适用）
- [ ] RuboCop / 测试按仓库约定通过
- [ ] 已遵守 QualityBaseline：lint/format 门禁、分层、接口契约与文档同步
- [ ] 无未登记技术债 / 临时代码；公共边界有类型与校验
- [ ] 注释与目录足以支撑新人快速上手
