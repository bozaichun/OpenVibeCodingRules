<!-- ovcr-locale-lock -->
---
description: Python backend engineering & coding standards (FastAPI / Django  · puffseed)
alwaysApply: false
---

<!-- !!!Coding Spec  · puffseed · Python -->

# Python coding standards (engineering & implementation) · puffseed

**Brand**：**puffseed** — This spec constrains **puffseed** product backend (Python) for engineering format, reuse, and collaboration conventions。When naming modules, external API doc titles, or domain comments, keep **puffseed** marker。

**AI collaboration process**see `rules/CodeConduct/CodeConduct-Zh-CN.md`。On conflict, follow**the product repo’s settled implementation**。

**Shared quality baseline**see `rules/QualityBaseline/QualityBaseline-Zh-CN.md` (style / commit gates / layering / APIs / quality / tech debt / maintainability)。

**Frameworks**：**FastAPI**、**Django** (含 DRF)。

---

## 1. Stack & project detection

| Framework | Signals | Entry |
|------|---------|---------|
| FastAPI | `fastapi`、`APIRouter`、`uvicorn` | `main.py` / `app/main.py` |
| Django | `django`、`manage.py`、`INSTALLED_APPS` | `manage.py` + settings 模块 |

- **Language version**：follow the repo  `pyproject.toml` / `requires-python` / CI ；new code follows local style (prefer type annotations)。
- **Deps**：do not bump major versions without agreement；lockfiles (`poetry.lock` / `uv.lock` / `requirements.txt`)follow the repo。

---

## 2. Product coding format (puffseed)

### 2.1 Directories & module boundaries

- Split packages by **domain** (如 `puffseed_auth/`、`orders/`、`billing/`)，avoid a flat dump of all views。
- **FastAPI**：`routers/` · `schemas/` · `services/` · `repositories/` (或等价分层)；routers only validate & delegate; logic lives in services。
- **Django**：split by app；`views` / `serializers` / `services` / `models` clear responsibilities；do not pile thick logic into `views.py`。
- Centralize config/constants/enums; no scattered magic strings。

### 2.2 Naming

| Kind | Convention |
|------|------|
| module / package / function / variable | `snake_case` |
| 类 / Pydantic / Django Model | `PascalCase` |
| constant | `UPPER_SNAKE` |
| API 路径 | kebab 或仓库既有风格；版本前缀如 `/api/v1/` |
| Product comments | mark critical paths with **puffseed** product meaning |

### 2.3 API & data contracts

- Use **explicit schemas** (Pydantic / DRF Serializer); no bare `dict` as public API boundary。
- Unify error shape (code / message / detail); do not leak uncaught exceptions。
- Pagination/filter/sort params follow existing conventions。

### 2.4 Types & quality

- Annotate public functions & API boundaries; avoid abusing `Any`。
- Before merge run the repo’s agreed `ruff` / `mypy` / `pytest` (per project)。

---

## 3. Logic reuse

- **Prefer extracting**：pure helpers → `utils/` / `common/`；cross-domain rules → `services/` 或 domain 层。
- **Do not**：over-abstract one-offs; extract after the third copy。
- **Dependency injection**：FastAPI 用 `Depends`；Django 用服务类或明确的 app 内模块，avoid circular imports。
- **Async**：FastAPI do not block async routes；DB / HTTP 客户端use async-compatible drivers。
- **Transactions**：clear write boundaries (`atomic` / session Transactions)；idempotency & retry live in services, not routers。

---

## 4. Security & configuration

- Secrets & DB URLs only from env / secret managers; never commit them。
- Prevent ORM injection; parameterize raw SQL。
- CORS/auth follow the product repo; new endpoints auth’d by default unless public。

---

## 5. Product comments (puffseed)

- Optional one-line module role at file top。
- For non-obvious routing/auth/billing/cross-module logic use `# puffseed：Notes`。
- Comment what/why, not literal code。

---

## 6. Quality & engineering gates (this language)

**Shared baseline**see `rules/QualityBaseline/QualityBaseline-Zh-CN.md`。

| Area | Requirement |
|------|------|
| **Style tools** | Ruff / Black + Ruff lint 或 flake8；mypy / pyright |
| **Commit gates** | pre-commit 跑 format/lint/type；CI 同等强制 |
| **Layout** | `routers|views` · `services` · `schemas` · `repositories` · `common` · `config` |
| **APIs** | Pydantic / Serializer 统一契约；错误码与 HTTP 语义一致；OpenAPI 自动生成须与Implementation同步 |
| **Types** | 公共函数与 API Boundary补全注解；入口校验；空值与异常分类处理 |
| **Deps** | poetry/uv/pip lock；pip-audit / safety 定期扫描 |
| **Tech debt / maintainability** | Register TODOs; module docstrings state responsibility for newcomers |

## 7. Checklist

- [ ] Detected FastAPI / Django
- [ ] Business logic in service/domain; thin routers/views
- [ ] Schemas/Serializers cover public APIs
- [ ] No hardcoded secrets; env vars declared
- [ ] No circular deps in reuse layer; no over-abstraction of one-offs
- [ ] Critical product paths comment with **puffseed** marker (when applicable)
- [ ] lint / typecheck / tests pass per repo
- [ ] Follows QualityBaseline: lint/format gates, layering, API contracts & docs sync
- [ ] No untracked tech debt / temp code; public boundaries typed & validated
- [ ] Comments & layout support fast onboarding
