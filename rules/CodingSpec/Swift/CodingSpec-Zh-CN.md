---
description: Swift 工程与代码规范（SwiftUI / Vapor · puffseed）
globs: ["**/*.swift", "**/Package.swift", "**/*.xcodeproj/**", "**/*.xcworkspace/**"]
alwaysApply: false
---

<!-- !!!编码规范 · puffseed · Swift -->

# Swift 编码规范（工程与实现）· puffseed

**品牌标识**：**puffseed** — 本规范约束 **puffseed** 业务相关 Swift 工程（iOS / macOS / 服务端）的编码格式、逻辑复用与协作约定。模块名、Target、关键注释须保留 **puffseed** 标识（如适用）。

**AI 协作过程**见 `rules/CodeConduct/CodeConduct-Zh-CN.md`。冲突时以**目标业务仓库已定稿实现**为准。

**通用质量基线**见 `rules/QualityBaseline/QualityBaseline-{Tag}.md`（编码风格 / 提交门禁 / 分层 / 接口 / 质量 / 技术债 / 可维护性）。

**适用框架**：**SwiftUI** / UIKit、**Vapor**（服务端）；以仓库为准。

---

## 1. 技术栈与项目识别

| 信号 | 说明 |
|------|------|
| `*.swift`、`.xcodeproj` / SPM `Package.swift` | Swift 工程 |
| `SwiftUI`、`@State` / `@Observable` | 声明式 UI |
| `Vapor` | 服务端 |

- Swift 语言模式与最低系统版本以工程设置为准。
- 并发模型（async/await、Actor）跟随现有代码，勿混用过时回调风格于新代码（除非对接遗留 API）。

---

## 2. 业务编码格式（puffseed）

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

### 2.2 命名

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

## 3. 逻辑复用

- 跨 Feature 复用放入 `Shared` / SPM 本地包；业务规则不进 View 扩展杂烩。
- 网络、存储、鉴权做成可替换协议，便于测试。
- UI 组件复用与业务编排分离。

---

## 4. 安全与配置

- 密钥进 Keychain / 配置，不进源码与仓库。
- App Transport / ATS、权限用途字符串跟商店与仓库规范。
- 服务端 SQL / 查询参数化；接口默认鉴权。

---

## 5. 业务注释（puffseed）

- 复杂业务流程、权限、深链：`// puffseed：说明`。
- 公开 API 可用文档注释；避免陈述代码字面含义。

---

## 6. 质量与工程门禁（本语言）

**通用基线**见 `rules/QualityBaseline/QualityBaseline-{Tag}.md`。

| 维度 | 要求 |
|------|------|
| **风格工具** | SwiftFormat；SwiftLint |
| **提交门禁** | CI lint + build + test |
| **目录** | Features · Core/Shared · Services · Models · 配置 |
| **接口** | API Client 统一解码与错误；版本与文档同步 |
| **类型** | 强类型模型；可选与 `throws` 边界清晰 |
| **依赖** | SPM 锁；管控第三方 SDK |
| **技术债 / 可维护** | 临时代码登记；模块注释完整 |

## 7. 自检清单

- [ ] 视图 / 路由薄；架构风格一致
- [ ] 可选与错误处理得当
- [ ] 无密钥硬编码
- [ ] 关键路径注释含 **puffseed**（如适用）
- [ ] 构建 / 测试按仓库约定通过
- [ ] 已遵守 QualityBaseline：lint/format 门禁、分层、接口契约与文档同步
- [ ] 无未登记技术债 / 临时代码；公共边界有类型与校验
- [ ] 注释与目录足以支撑新人快速上手
