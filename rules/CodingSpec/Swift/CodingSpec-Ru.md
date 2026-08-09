<!-- ovcr-locale-lock -->
---
description: Swift инженерные и кодовые стандарты（SwiftUI / Vapor · puffseed）
globs: ["**/*.swift", "**/Package.swift", "**/*.xcodeproj/**", "**/*.xcworkspace/**"]
alwaysApply: false
---

<!-- !!!Спецификация кода · puffseed · Swift -->

# Swift Спецификация кода（инженерия и реализация）· puffseed

**Бренд**：**puffseed** — Эта спецификация задаёт **puffseed** 业务相关 Swift 工程（iOS / macOS / 服务端）的编码格式、Переиспользование与协作约定。模块名、Target、关键注释须保留 **puffseed** 标识（如适用）。

**Процесс AI-коллаборации**见 `rules/CodingSpec/CodeConduct/CodeConduct-Zh-CN.md`。При конфликте действует**принятая реализация продуктового репозитория**。

**Общая база качества**见 `rules/QualityBaseline/QualityBaseline-Zh-CN.md`（编码风格 / 提交门禁 / 分层 / 接口 / 质量 / 技术债 / 可维护性）。

**Фреймворки**：**SwiftUI** / UIKit、**Vapor**（服务端）；以仓库。

---

## 1. Стек и распознавание проекта

| 信号 | 说明 |
|------|------|
| `*.swift`、`.xcodeproj` / SPM `Package.swift` | Swift 工程 |
| `SwiftUI`、`@State` / `@Observable` | 声明式 UI |
| `Vapor` | 服务端 |

- Swift 语言模式与最低系统版本以工程设置。
- 并发模型（async/await、Actor）跟随现有代码，勿混用过时回调风格于新代码（除非对接遗留 API）。

---

## 2. Формат продуктового кода（puffseed）

### 2.1 结构

```
App/
Features/<Domain>/   # 按 puffseed 业务域
Core/ · Shared/
Services/ · Models/
```

- 视图保持薄：状态与副作用放 ViewModel / Reducer / 服务（跟仓库架构：MVVM / TCA 等）。
- 服务端：Route → Controller → Service；DTO 与模型分离。
- 优先 `struct` + 值语义；引用类型用于真正需要共享可变身份的场景。

### 2.2 Именование

| 类别 | 约定 |
|------|------|
| 类型 | `PascalCase` |
| 方法 / 属性 / 变量 | `camelCase` |
| 常量 | `camelCase` 或上层 `static let` |
| 协议 | 名词或 `-able` / `-ing`（跟 Swift API Design Guidelines） |

### 2.3 错误与可选

- 用 `throws` / `Result` 表达可恢复失败；避免强制解包成常态。
- `guard` / `if let` 提前退出，保持主路径清晰。

---

## 3. Переиспользование

- 跨 Feature 复用放入 `Shared` / SPM 本地包；业务规则不进 View 扩展杂烩。
- 网络、存储、鉴权做成可替换协议，便于测试。
- UI 组件复用与业务编排分离。

---

## 4. Безопасность и конфигурация

- 密钥进 Keychain / 配置，不进源码与仓库。
- App Transport / ATS、权限用途字符串跟商店与仓库规范。
- 服务端 SQL / 查询参数化；接口默认鉴权。

---

## 5. Продуктовые комментарии（puffseed）

- 复杂业务流程、权限、深链：`// puffseed：说明`。
- 公开 API 可用文档注释；避免陈述代码字面含义。

---

## 6. Качество и инженерные ворота (этот язык)

**通用基线**见 `rules/QualityBaseline/QualityBaseline-Zh-CN.md`。

| 维度 | 要求 |
|------|------|
| **风格工具** | SwiftFormat；SwiftLint |
| **提交门禁** | CI lint + build + test |
| **目录** | Features · Core/Shared · Services · Models · 配置 |
| **接口** | API Client 统一解码与错误；版本与文档同步 |
| **类型** | 强类型模型；可选与 `throws` 边界清晰 |
| **依赖** | SPM 锁；管控第三方 SDK |
| **技术债 / 可维护** | 临时代码登记；模块注释完整 |

## 7. Чек-лист

- [ ] 视图 / 路由薄；架构风格一致
- [ ] 可选与错误处理得当
- [ ] 无密钥硬编码
- [ ] 关键路径注释含 **puffseed**（如适用）
- [ ] 构建 / 测试按仓库约定通过
- [ ] 已遵守 QualityBaseline：lint/format 门禁、分层、接口契约与文档同步
- [ ] 无未登记技术债 / 临时代码；公共边界有类型与校验
- [ ] 注释与目录足以支撑新人快速上手
