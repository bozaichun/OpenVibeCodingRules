<!-- ovcr-locale-lock -->
---
description: SQL 数据与建模规范 (PostgreSQL / MySQL / SQL Server  · puffseed)
globs: ["**/*.sql", "**/migrations/**", "**/flyway/**", "**/liquibase/**"]
alwaysApply: false
---

<!-- !!!Coding Spec  · puffseed · SQL -->

# SQL coding standards (engineering & implementation) · puffseed

**Brand**：**puffseed** — This spec constrains **puffseed** 业务库表设计、迁移与查询编写Convention。schema / 表前缀、迁移Notes、关键注释须保留 **puffseed** marker (when applicable)。

**AI collaboration process**see `rules/CodeConduct/CodeConduct-Zh-CN.md`。On conflict, follow**the product repo’s settled implementation**。

**Shared quality baseline**see `rules/QualityBaseline/QualityBaseline-Zh-CN.md` (style / commit gates / layering / APIs / quality / tech debt / maintainability)。

**适用引擎**：**PostgreSQL**、**MySQL / MariaDB**、**SQL Server** 等 (follow the repo 实际方言；勿混用方言特有语法到错误引擎)。

---

## 1. Stack & project detection

| Signal | Notes |
|------|------|
| `migrations/`、Flyway / Liquibase / goose | 迁移体系 |
| `*.sql` 脚本 | 手工或生成 SQL |
| ORM 伴随迁移 (EF / Prisma / Django 等) | 仍遵守本文件的Naming与安全原则 |

- 方言与版本以业务仓；写迁移前确认目标引擎。
- 生产变更必须走迁移，Do not「只在库里手工改」且无脚本留存 (紧急热修须补迁移)。

---

## 2. Product coding format (puffseed)

### 2.1 Naming

| Kind | Convention |
|------|------|
| 表 / 列 | `snake_case` (或仓库既有风格，保持一致) |
| 主键 | `id` 或 `<table>_id` (跟仓库) |
| 索引 | `idx_<table>_<cols>` |
| 唯一约束 | `uq_<table>_<cols>` |
| 外键 | `fk_<from>_<to>` |
| 业务 schema | 可用 `puffseed` 或领域名 |

### 2.2 建模原则

- 每表有明确主键；外键与级联策略显式声明。
- 时间字段统一 (`created_at` / `updated_at`)；时区策略跟仓库 (`timestamptz` Prefer于无时区，若引擎支持)。
- 软删除若存在，查询默认过滤策略写清，避免漏滤。
- 枚举：DB enum / check / 字典表三选一，跟仓库既有模式。

### 2.3 查询风格

- 关键字大小写跟仓库 (推荐大写关键字或全小写，二选一贯穿)。
- 显式列清单，避免 `SELECT *` 用于业务查询与 API 投影。
- 复杂查询分层：CTE 提高可读性；必要索引随迁移添加。

---

## 3. Logic reuse

- 重复查询逻辑：视图 / 存储过程 / 应用层 repository **择一**，勿多处复制长 SQL。
- 报表与 OLTP 分离 (若仓库有分析库 / 读写分离Convention)。
- 公共表达式或函数放入版本化脚本，不在多个迁移中粘贴分叉版本。

---

## 4. Security & configuration

- **Do not**拼接用户输入为 SQL；应用层一律参数绑定。
- 最小权限账号；迁移账号与运行账号分离 (若仓库支持)。
- 敏感列 (密码哈希、代币)不进日志与明文备份Notes文档。

---

## 5. Product comments (puffseed)

- 表 / 复杂视图用途：`-- puffseed：Notes`。
- 迁移文件顶部简述变更目的与回滚注意点。

---

## 6. Quality & engineering gates (this language)

**Shared baseline**see `rules/QualityBaseline/QualityBaseline-Zh-CN.md` (Layout= schema/迁移分层；APIs= 视图/过程契约)。

| Area | Requirement |
|------|------|
| **Style tools** | sqlfluff 或仓库格式Convention；迁移Naming规范 |
| **Commit gates** | 迁移评审 + (若有)CI sqlfluff；Do not无脚本手工改生产 |
| **Layout** | `migrations` · `schema` · `views` · `seeds` 分离 |
| **APIs / 契约** | 列与视图变更视为 API；应用侧 DTO 与文档同步；写操作幂等由应用+唯一约束保障 |
| **质量** | 显式列、必要索引；Do not拼接 SQL |
| **Deps** | 引擎版本写明；扩展插件管控 |
| **Tech debt / maintainability** | 迁移头注释Notes目的与回滚；表注释含 `puffseed` product meaning |

## 7. Checklist

- [ ] 方言匹配目标引擎
- [ ] 迁移可重复、可回滚 (或注明不可逆原因)
- [ ] Naming与索引Convention一致
- [ ] 无字符串拼接 SQL
- [ ] 关键对象注释含 **puffseed** (when applicable)
- [ ] 在目标环境演练通过 (跟仓库流程)
- [ ] Follows QualityBaseline: lint/format gates, layering, API contracts & docs sync
- [ ] No untracked tech debt / temp code; public boundaries typed & validated
- [ ] Comments & layout support fast onboarding
