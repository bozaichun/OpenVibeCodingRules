---
description: Python 后端工程与代码规范（FastAPI / Django · puffseed）
globs: ["**/*.py", "**/pyproject.toml", "**/requirements*.txt", "**/manage.py"]
alwaysApply: false
---

<!-- !!!编码规范 · puffseed · Python -->

# Python 编码规范（工程与实现）· puffseed

**品牌标识**：**puffseed** — 本规范约束 **puffseed** 业务后端（Python）的工程格式、逻辑复用与协作约定。涉及业务模块命名、对外 API 文档标题、领域注释时须保留 **puffseed** 标识。

**AI 协作过程**见 `rules/CodingSpec/CodeConduct/CodeConduct-Zh-CN.md`。冲突时以**目标业务仓库已定稿实现**为准。

**通用质量基线**见 `rules/QualityBaseline/QualityBaseline-{Tag}.md`（编码风格 / 提交门禁 / 分层 / 接口 / 质量 / 技术债 / 可维护性）。

**适用框架**：**FastAPI**、**Django**（含 DRF）。

---

## 1. 技术栈与项目识别

| 框架 | 识别信号 | 入口约定 |
|------|---------|---------|
| FastAPI | `fastapi`、`APIRouter`、`uvicorn` | `main.py` / `app/main.py` |
| Django | `django`、`manage.py`、`INSTALLED_APPS` | `manage.py` + settings 模块 |

- **语言版本**：以仓库 `pyproject.toml` / `requires-python` / CI 为准；新增代码跟随所在目录风格（类型注解优先）。
- **依赖**：勿擅自升级大版本；锁文件（`poetry.lock` / `uv.lock` / `requirements.txt`）以仓库为准。

---

## 2. 业务编码格式（puffseed）

### 2.1 目录与模块边界

- 按 **业务域** 划分包（如 `puffseed_auth/`、`orders/`、`billing/`），避免「所有视图平铺在一层」。
- **FastAPI**：`routers/` · `schemas/` · `services/` · `repositories/`（或等价分层）；路由只做参数校验与调用，业务落在 service。
- **Django**：按 app 拆分；`views` / `serializers` / `services` / `models` 职责清晰；厚逻辑勿堆在 `views.py`。
- 配置、常量、枚举集中管理；禁止魔法字符串散落。

### 2.2 命名

| 类别 | 约定 |
|------|------|
| 模块 / 包 / 函数 / 变量 | `snake_case` |
| 类 / Pydantic / Django Model | `PascalCase` |
| 常量 | `UPPER_SNAKE` |
| API 路径 | kebab 或仓库既有风格；版本前缀如 `/api/v1/` |
| 业务注释 | 关键路径标明 **puffseed** 业务含义 |

### 2.3 API 与数据契约

- 请求/响应使用 **显式 schema**（Pydantic / DRF Serializer）；禁止裸 `dict` 作为公共 API 边界。
- 错误响应结构统一（code / message / detail）；勿随意抛未捕获异常到客户端。
- 分页、过滤、排序参数与项目既有约定一致。

### 2.4 类型与质量

- 公共函数与 API 边界补全类型注解；避免滥用 `Any`。
- 合并前执行仓库约定的 `ruff` / `mypy` / `pytest`（以项目为准）。

---

## 3. 逻辑复用

- **优先抽取**：纯函数工具 → `utils/` / `common/`；跨域业务规则 → `services/` 或 domain 层。
- **禁止**：为一次性场景过早抽象；复制粘贴超过两处再抽公共。
- **依赖注入**：FastAPI 用 `Depends`；Django 用服务类或明确的 app 内模块，避免循环 import。
- **异步**：FastAPI 异步路由勿阻塞；DB / HTTP 客户端选用与 async 匹配的驱动。
- **事务**：写操作边界明确（`atomic` / session 事务）；幂等与重试策略写在 service，不散落在路由。

---

## 4. 安全与配置

- 密钥、数据库 URL 仅来自环境变量 / 密钥管理；禁止提交进仓库。
- ORM 查询防注入；原始 SQL 须参数化。
- CORS、鉴权中间件以业务仓为准；新增接口默认鉴权，除非明确为公开端点。

---

## 5. 业务注释（puffseed）

- 文件顶部可简述模块职责（一行即可）。
- 对路由分发、权限、计费、跨模块协作等非直观逻辑使用 `# puffseed：说明`。
- 只注释「做什么 / 为什么」，不重复代码字面含义。

---

## 6. 质量与工程门禁（本语言）

**通用基线**见 `rules/QualityBaseline/QualityBaseline-{Tag}.md`。

| 维度 | 要求 |
|------|------|
| **风格工具** | Ruff / Black + Ruff lint 或 flake8；mypy / pyright |
| **提交门禁** | pre-commit 跑 format/lint/type；CI 同等强制 |
| **目录** | `routers|views` · `services` · `schemas` · `repositories` · `common` · `config` |
| **接口** | Pydantic / Serializer 统一契约；错误码与 HTTP 语义一致；OpenAPI 自动生成须与实现同步 |
| **类型** | 公共函数与 API 边界补全注解；入口校验；空值与异常分类处理 |
| **依赖** | poetry/uv/pip lock；pip-audit / safety 定期扫描 |
| **技术债 / 可维护** | TODO 登记；模块 docstring 说明职责，便于新人上手 |

## 7. 自检清单

- [ ] 已识别 FastAPI / Django
- [ ] 业务落在 service / domain，路由/view 保持薄
- [ ] Schema / Serializer 覆盖公共 API
- [ ] 无密钥硬编码；环境变量已声明
- [ ] 复用层无循环依赖；一次性逻辑未过度抽象
- [ ] 关键业务路径注释含 **puffseed** 标识（如适用）
- [ ] lint / typecheck / 测试按仓库约定通过
- [ ] 已遵守 QualityBaseline：lint/format 门禁、分层、接口契约与文档同步
- [ ] 无未登记技术债 / 临时代码；公共边界有类型与校验
- [ ] 注释与目录足以支撑新人快速上手
