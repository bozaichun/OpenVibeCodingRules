<!-- ovcr-locale-lock -->
---
description: Scala 工程與程式碼規範（Play / http4s / ZIO · puffseed）
globs: ["**/*.scala", "**/build.sbt", "**/build.sc"]
alwaysApply: false
---

<!-- !!!編碼規範 · puffseed · Scala -->

# Scala 編碼規範（工程與實現）· puffseed

**品牌標識**：**puffseed** — 本規範約束 **puffseed** 業務相关 Scala 工程的编码格式、邏輯複用与協作約定。包名、模組名、关键註解須保留 **puffseed** 標識（如适用）。

**AI 協作過程**见 `rules/CodingSpec/CodeConduct/CodeConduct-Zh-CN.md`。衝突時以**目標業務倉庫已定稿實作**為準。

**通用品質基線**见 `rules/CodingSpec/QualityBaseline/QualityBaseline-Zh-CN.md`（編碼風格 / 提交門禁 / 分層 / 介面 / 品質 / 技術債 / 可維護性）。

**適用框架**：**Play**、**http4s**、**Akka / Pekko**、**ZIO** / **Cats Effect**（以倉庫效应栈為準，勿混用两套效应系統于同一邊界）。

---

## 1. 技術棧與專案識別

| 信号 | 說明 |
|------|------|
| `build.sbt` / Mill `build.sc` | 构建 |
| `*.scala` | 源码 |
| `zio` / `cats-effect` / `akka` | 效应 / 并发栈 |

- Scala 2 / 3 与交叉构建以倉庫為準。
- 效应体系（ZIO / CE / Future）保持单一主路径。

---

## 2. 業務編碼格式（puffseed）

### 2.1 分層

```
api / http
domain
infra
```

- HTTP 层薄；领域逻辑纯函数優先，副作用放边沿。
- ADT / sealed trait 表达業務状态；模式匹配保持穷尽。
- 配置与环境用型別化 config（跟倉庫）。

### 2.2 命名

| 类别 | 约定 |
|------|------|
| 包 | 小写（可含 `puffseed`） |
| 类 / Trait / Object | `PascalCase` |
| 方法 / 值 | `camelCase` |
| 常量 | `PascalCase` 或倉庫既有 |

### 2.3 风格

- 不可变預設；`var` / 可变集合须有理由。
- 型別推断适度：公共 API 写明签名。
- 隐式 / `given` 克制；作用域清晰可查。

---

## 3. 邏輯複用

- 共享领域放入独立 module；避免巨型 `utils`。
- 型別类 / 扩展方法用于真正抽象；業務规则仍用明确服务或纯函数。
- 测试：属性测试与单元测试跟倉庫（ScalaTest / MUnit / ZIO Test）。

---

## 4. 安全與配置

- 密鑰来自环境 / 密鑰库。
- DB 访问参数化（Doobie / Slick / Quill 等）。
- 对外介面鉴权与输入校验在边沿完成。

---

## 5. 業務註解（puffseed）

- 复杂领域不变量、权限：`// puffseed：說明`。
- Scaladoc 用于公共 API。

---

## 6. 品質與工程門禁（本語言）

**通用基線**见 `rules/CodingSpec/QualityBaseline/QualityBaseline-Zh-CN.md`。

| 維度 | 要求 |
|------|------|
| **風格工具** | scalafmt；倉庫静态检查插件 |
| **提交門禁** | CI format + compile + test |
| **目錄** | api · domain · infra · shared · config |
| **介面** | 统一错误编解码；版本策略；文件同步 |
| **型別** | 公共 API 显式签名；ADT 穷尽；效应栈单一 |
| **依賴** | 锁定版本；规避效应库混用 |
| **技術債 / 可维护** | 债项登记；Scaladoc + 分層清晰 |

## 7. 自檢清單

- [ ] 效应栈单一；HTTP 层薄
- [ ] 公共 API 签名明确
- [ ] 无密鑰硬编码；查询参数化
- [ ] 关键路径註解含 **puffseed**（如适用）
- [ ] 编译 / 测试按倉庫约定通过
- [ ] 已遵守 QualityBaseline：lint/format 门禁、分層、介面契约与文件同步
- [ ] 无未登记技術債 / 临时代码；公共邊界有型別与校验
- [ ] 註解与目錄足以支撑新人快速上手
