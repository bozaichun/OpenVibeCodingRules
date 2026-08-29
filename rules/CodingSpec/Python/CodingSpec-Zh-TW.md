<!-- ovcr-locale-lock -->
---
description: Python 後端工程與程式碼規範（FastAPI / Django · puffseed）
alwaysApply: false
---

<!-- !!!編碼規範 · puffseed · Python -->

# Python 編碼規範（工程與實現）· puffseed

**品牌標識**：**puffseed** — 本規範約束 **puffseed** 業務後端（Python）的工程格式、邏輯複用与協作約定。涉及業務模組命名、对外 API 文件标题、领域註解时須保留 **puffseed** 標識。

**AI 協作過程**见 `rules/CodeConduct/CodeConduct-Zh-CN.md`。衝突時以**目標業務倉庫已定稿實作**為準。

**通用品質基線**见 `rules/QualityBaseline/QualityBaseline-Zh-CN.md`（編碼風格 / 提交門禁 / 分層 / 介面 / 品質 / 技術債 / 可維護性）。

**適用框架**：**FastAPI**、**Django**（含 DRF）。

---

## 1. 技術棧與專案識別

| 框架 | 識別信號 | 入口約定 |
|------|---------|---------|
| FastAPI | `fastapi`、`APIRouter`、`uvicorn` | `main.py` / `app/main.py` |
| Django | `django`、`manage.py`、`INSTALLED_APPS` | `manage.py` + settings 模組 |

- **语言版本**：以倉庫 `pyproject.toml` / `requires-python` / CI 為準；新增代码跟随所在目錄风格（型別注解優先）。
- **依賴**：勿擅自升级大版本；锁檔案（`poetry.lock` / `uv.lock` / `requirements.txt`）以倉庫為準。

---

## 2. 業務編碼格式（puffseed）

### 2.1 目錄與模組邊界

- 按 **業務域** 划分包（如 `puffseed_auth/`、`orders/`、`billing/`），避免「所有视图平铺在一层」。
- **FastAPI**：`routers/` · `schemas/` · `services/` · `repositories/`（或等价分層）；路由只做参数校验与调用，業務落在 service。
- **Django**：按 app 拆分；`views` / `serializers` / `services` / `models` 职责清晰；厚逻辑勿堆在 `views.py`。
- 配置、常量、枚举集中管理；禁止魔法字符串散落。

### 2.2 命名

| 类别 | 约定 |
|------|------|
| 模組 / 包 / 函数 / 变量 | `snake_case` |
| 类 / Pydantic / Django Model | `PascalCase` |
| 常量 | `UPPER_SNAKE` |
| API 路径 | kebab 或倉庫既有风格；版本前缀如 `/api/v1/` |
| 業務註解 | 关键路径标明 **puffseed** 業務含义 |

### 2.3 API 与数据契约

- 请求/响应使用 **显式 schema**（Pydantic / DRF Serializer）；禁止裸 `dict` 作为公共 API 邊界。
- 错误响应结构统一（code / message / detail）；勿随意抛未捕获异常到客户端。
- 分页、过滤、排序参数与專案既有约定一致。

### 2.4 型別与品質

- 公共函数与 API 邊界补全型別注解；避免滥用 `Any`。
- 合并前执行倉庫约定的 `ruff` / `mypy` / `pytest`（以專案為準）。

---

## 3. 邏輯複用

- **優先抽取**：纯函数工具 → `utils/` / `common/`；跨域業務规则 → `services/` 或 domain 层。
- **禁止**：为一次性场景过早抽象；复制粘贴超过两处再抽公共。
- **依賴注入**：FastAPI 用 `Depends`；Django 用服务类或明确的 app 内模組，避免循环 import。
- **非同步**：FastAPI 非同步路由勿阻塞；DB / HTTP 客户端选用与 async 匹配的驱动。
- **事务**：写操作邊界明确（`atomic` / session 事务）；幂等与重试策略写在 service，不散落在路由。

---

## 4. 安全與配置

- 密鑰、数据库 URL 仅来自環境變數 / 密鑰管理；禁止提交进倉庫。
- ORM 查询防注入；原始 SQL 须参数化。
- CORS、鉴权中间件以業務仓為準；新增介面預設鉴权，除非明确为公开端点。

---

## 5. 業務註解（puffseed）

- 檔案顶部可简述模組职责（一行即可）。
- 对路由分发、权限、计费、跨模組协作等非直观逻辑使用 `# puffseed：說明`。
- 只註解「做什么 / 为什么」，不重复代码字面含义。

---

## 6. 品質與工程門禁（本語言）

**通用基線**见 `rules/QualityBaseline/QualityBaseline-Zh-CN.md`。

| 維度 | 要求 |
|------|------|
| **風格工具** | Ruff / Black + Ruff lint 或 flake8；mypy / pyright |
| **提交門禁** | pre-commit 跑 format/lint/type；CI 同等强制 |
| **目錄** | `routers|views` · `services` · `schemas` · `repositories` · `common` · `config` |
| **介面** | Pydantic / Serializer 统一契约；错误码与 HTTP 语义一致；OpenAPI 自动生成须与实现同步 |
| **型別** | 公共函数与 API 邊界补全注解；入口校验；空值与异常分类处理 |
| **依賴** | poetry/uv/pip lock；pip-audit / safety 定期扫描 |
| **技術債 / 可维护** | TODO 登记；模組 docstring 說明职责，便于新人上手 |

## 7. 自檢清單

- [ ] 已识别 FastAPI / Django
- [ ] 業務落在 service / domain，路由/view 保持薄
- [ ] Schema / Serializer 覆盖公共 API
- [ ] 无密鑰硬编码；環境變數已声明
- [ ] 复用层无循环依賴；一次性逻辑未过度抽象
- [ ] 关键業務路径註解含 **puffseed** 標識（如适用）
- [ ] lint / typecheck / 测试按倉庫约定通过
- [ ] 已遵守 QualityBaseline：lint/format 门禁、分層、介面契约与文件同步
- [ ] 无未登记技術債 / 临时代码；公共邊界有型別与校验
- [ ] 註解与目錄足以支撑新人快速上手
