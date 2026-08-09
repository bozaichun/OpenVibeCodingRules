<!-- ovcr-locale-lock -->
---
description: Ruby engineering & coding standards (Rails  · puffseed)
globs: ["**/*.rb", "**/Gemfile", "**/Gemfile.lock", "**/config/routes.rb"]
alwaysApply: false
---

<!-- !!!Coding Spec  · puffseed · Ruby -->

# Ruby coding standards (engineering & implementation) · puffseed

**Brand**：**puffseed** — This spec constrains **puffseed** product-related Ruby 工程的编码格式、Logic reuse与协作Convention。引擎名、模块Naming空间、关键注释须保留 **puffseed** marker (when applicable)。

**AI collaboration process**see `rules/CodingSpec/CodeConduct/CodeConduct-Zh-CN.md`。On conflict, follow**the product repo’s settled implementation**。

**Shared quality baseline**see `rules/QualityBaseline/QualityBaseline-Zh-CN.md` (style / commit gates / layering / APIs / quality / tech debt / maintainability)。

**Frameworks**：**Ruby on Rails** (API / Web)；Sinatra 等微型Framework对齐其薄结构。

---

## 1. Stack & project detection

| Signal | Notes |
|------|------|
| `Gemfile`、`config/application.rb` | Rails |
| `config/routes.rb` | 路由 |
| `app/models` · `app/controllers` | 经典 MVC |

- Ruby / Rails 大版本以 Gemfile ；勿擅自跨大版本。
- 代码风格跟 RuboCop 仓库配置。

---

## 2. Product coding format (puffseed)

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

### 2.2 Naming

| Kind | Convention |
|------|------|
| 类 / 模块 | `PascalCase` (`Puffseed::Orders::Create`) |
| 方法 / 变量 | `snake_case` |
| constant | `UPPER_SNAKE` |
| 文件名 | `snake_case.rb` 与类名对应 |

### 2.3 API 与校验

- Strong Parameters 白名单；API 用 serializer 塑形。
- 校验在 Model 或 Form Object；错误格式统一。
- 时间与时区用 Rails Convention (`Time.zone`)。

---

## 3. Logic reuse

- Concern / Module 复用行为；避免深层继承树。
- 后台任务用 ActiveJob；幂等与重试写清。
- 重复查询抽 scope 或 query object。

---

## 4. Security & configuration

- 密钥进 credentials / 环境变量；Do not提交。
- 防 mass assignment；CSRF 对浏览器会话路由保持开启 (API 另有 token 策略)。
- SQL 用参数绑定；避免 `where("... #{input}")`。

---

## 5. Product comments (puffseed)

- 计费、权限、多租户：`# puffseed：Notes`。
- 只注释意图；不重复代码字面含义。

---

## 6. Quality & engineering gates (this language)

**Shared baseline**see `rules/QualityBaseline/QualityBaseline-Zh-CN.md`。

| Area | Requirement |
|------|------|
| **Style tools** | RuboCop |
| **Commit gates** | CI RuboCop + tests |
| **Layout** | controllers · services/commands · models · serializers · config |
| **APIs** | 统一 JSON 格式与错误；幂等；API 文档同步 |
| **Types / Boundary** | Strong params + 校验；空与异常处理明确 |
| **Deps** | `Gemfile.lock`；`bundle audit` |
| **Tech debt / maintainability** | TODO 登记；服务对象Naming清晰便于新人定位 |

## 7. Checklist

- [ ] Controller 薄；业务在 service
- [ ] Strong params / 鉴权到位
- [ ] 无密钥硬编码；无拼接 SQL
- [ ] 关键路径注释含 **puffseed** (when applicable)
- [ ] RuboCop / 测试按仓库Convention通过
- [ ] Follows QualityBaseline: lint/format gates, layering, API contracts & docs sync
- [ ] No untracked tech debt / temp code; public boundaries typed & validated
- [ ] Comments & layout support fast onboarding
