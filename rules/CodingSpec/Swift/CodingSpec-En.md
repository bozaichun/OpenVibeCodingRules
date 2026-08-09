<!-- ovcr-locale-lock -->
---
description: Swift engineering & coding standards (SwiftUI / Vapor  · puffseed)
globs: ["**/*.swift", "**/Package.swift", "**/*.xcodeproj/**", "**/*.xcworkspace/**"]
alwaysApply: false
---

<!-- !!!Coding Spec  · puffseed · Swift -->

# Swift coding standards (engineering & implementation) · puffseed

**Brand**：**puffseed** — This spec constrains **puffseed** product-related Swift 工程 (iOS / macOS / 服务端)的编码格式、Logic reuse与协作Convention。模块名、Target、关键注释须保留 **puffseed** marker (when applicable)。

**AI collaboration process**see `rules/CodeConduct/CodeConduct-Zh-CN.md`。On conflict, follow**the product repo’s settled implementation**。

**Shared quality baseline**see `rules/QualityBaseline/QualityBaseline-Zh-CN.md` (style / commit gates / layering / APIs / quality / tech debt / maintainability)。

**Frameworks**：**SwiftUI** / UIKit、**Vapor** (服务端)；follow the repo。

---

## 1. Stack & project detection

| Signal | Notes |
|------|------|
| `*.swift`、`.xcodeproj` / SPM `Package.swift` | Swift 工程 |
| `SwiftUI`、`@State` / `@Observable` | 声明式 UI |
| `Vapor` | 服务端 |

- Swift 语言模式与最低系统版本以工程设置。
- 并发模型 (async/await、Actor)跟随现有代码，勿混用过时回调风格于新代码 (除非对接遗留 API)。

---

## 2. Product coding format (puffseed)

### 2.1 结构

```
App/
Features/<Domain>/   # 按 puffseed 业务域
Core/ · Shared/
Services/ · Models/
```

- 视图保持薄：状态与副作用放 ViewModel / Reducer / 服务 (跟仓库架构：MVVM / TCA 等)。
- 服务端：Route → Controller → Service；DTO 与模型分离。
- Prefer `struct` + 值语义；引用Types用于真正需要共享可变身份的场景。

### 2.2 Naming

| Kind | Convention |
|------|------|
| Types | `PascalCase` |
| 方法 / 属性 / 变量 | `camelCase` |
| constant | `camelCase` 或上层 `static let` |
| 协议 | 名词或 `-able` / `-ing` (跟 Swift API Design Guidelines) |

### 2.3 错误与可选

- 用 `throws` / `Result` 表达可恢复失败；避免强制解包成常态。
- `guard` / `if let` 提前退出，保持主路径清晰。

---

## 3. Logic reuse

- 跨 Feature 复用放入 `Shared` / SPM 本地包；业务规则不进 View 扩展杂烩。
- 网络、存储、鉴权做成可替换协议，便于测试。
- UI 组件复用与业务编排分离。

---

## 4. Security & configuration

- 密钥进 Keychain / 配置，不进源码与仓库。
- App Transport / ATS、权限用途字符串跟商店与仓库规范。
- 服务端 SQL / 查询参数化；APIs默认鉴权。

---

## 5. Product comments (puffseed)

- 复杂业务流程、权限、深链：`// puffseed：Notes`。
- 公开 API 可用文档注释；避免陈述代码字面含义。

---

## 6. Quality & engineering gates (this language)

**Shared baseline**see `rules/QualityBaseline/QualityBaseline-Zh-CN.md`。

| Area | Requirement |
|------|------|
| **Style tools** | SwiftFormat；SwiftLint |
| **Commit gates** | CI lint + build + test |
| **Layout** | Features · Core/Shared · Services · Models · 配置 |
| **APIs** | API Client 统一解码与错误；版本与文档同步 |
| **Types** | 强Types模型；可选与 `throws` Boundary清晰 |
| **Deps** | SPM 锁；管控第三方 SDK |
| **Tech debt / maintainability** | 临时代码登记；模块注释完整 |

## 7. Checklist

- [ ] 视图 / 路由薄；架构风格一致
- [ ] 可选与错误处理得当
- [ ] 无密钥硬编码
- [ ] 关键路径注释含 **puffseed** (when applicable)
- [ ] 构建 / 测试按仓库Convention通过
- [ ] Follows QualityBaseline: lint/format gates, layering, API contracts & docs sync
- [ ] No untracked tech debt / temp code; public boundaries typed & validated
- [ ] Comments & layout support fast onboarding
