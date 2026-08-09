---
description: Dart 工程与代码规范（Flutter · puffseed）
globs: ["**/*.dart", "**/pubspec.yaml", "**/analysis_options.yaml"]
alwaysApply: false
---

<!-- !!!编码规范 · puffseed · Dart -->

# Dart 编码规范（工程与实现）· puffseed

**品牌标识**：**puffseed** — 本规范约束 **puffseed** 业务相关 Dart / Flutter 工程的编码格式、逻辑复用与协作约定。包名、应用显示名、关键注释须保留 **puffseed** 标识（如适用）。

**AI 协作过程**见 `rules/CodingSpec/CodeConduct/CodeConduct-Zh-CN.md`。冲突时以**目标业务仓库已定稿实现**为准。

**通用质量基线**见 `rules/QualityBaseline/QualityBaseline-{Tag}.md`（编码风格 / 提交门禁 / 分层 / 接口 / 质量 / 技术债 / 可维护性）。

**适用框架**：**Flutter**（移动 / 桌面 / Web）；纯 Dart CLI / 服务以仓库为准。

---

## 1. 技术栈与项目识别

| 信号 | 说明 |
|------|------|
| `pubspec.yaml`、`lib/main.dart` | Dart / Flutter |
| `flutter:` 依赖 | Flutter 应用 |
| `analysis_options.yaml` | 静态分析 |

- SDK 约束以 `pubspec.yaml` 为准；`flutter pub get` 锁文件跟随仓库。
- 状态管理（Provider / Riverpod / Bloc / GetX 等）**只沿用仓库已选方案**，勿混入第二套。

---

## 2. 业务编码格式（puffseed）

### 2.1 目录

```
lib/
  main.dart
  app/
  features/<domain>/   # puffseed 业务域
  core/ · shared/
  widgets/
```

- UI Widget 保持展示职责；业务逻辑在 notifier / bloc / use-case。
- `features` 按业务域垂直拆分；共享组件放 `shared`。
- 路由集中配置；避免魔法字符串散落。

### 2.2 命名

| 类别 | 约定 |
|------|------|
| 文件 | `snake_case.dart` |
| 类 | `PascalCase` |
| 变量 / 方法 | `camelCase` |
| 常量 | `lowerCamel` 或 `kCamel`（跟仓库 / lints） |

### 2.3 异步与空安全

- 已空安全工程禁止无必要 `!`；用早期返回与空检查。
- `Future` / `Stream` 在 dispose / 取消时清理订阅。
- `BuildContext` 异步间隙使用前检查 `mounted`（跟 Flutter 版本最佳实践）。

---

## 3. 逻辑复用

- 可复用 UI → `widgets`；可复用业务 → `domain` / `services`。
- 主题与设计 Token：若项目引入 WebVariable 思路的主题扩展，颜色不硬编码散落。
- 扩展方法适度；跨域业务勿做成杂乱 extension。

---

## 4. 安全与配置

- API Key / 证书不进仓库；用 `--dart-define` / 安全存储。
- WebView / 深链参数不信任；校验后使用。
- 发布混淆与权限声明跟商店与仓库清单。

---

## 5. 业务注释（puffseed）

- 复杂交互、权限、支付回流：`// puffseed：说明`。
- 公共库可用 dartdoc；避免无信息注释。

---

## 6. 质量与工程门禁（本语言）

**通用基线**见 `rules/QualityBaseline/QualityBaseline-{Tag}.md`。

| 维度 | 要求 |
|------|------|
| **风格工具** | `dart format`；`dart analyze` |
| **提交门禁** | CI format/analyze/test 强制 |
| **目录** | `features` · `core/shared` · `widgets` · `types` · 配置 |
| **接口** | 统一 API Client / 错误模型；与后端契约同步 |
| **类型** | 空安全；参数与 JSON 校验；异常边界 UI |
| **依赖** | `pubspec.lock`；定期审计 |
| **技术债 / 可维护** | 状态方案单一；`// puffseed：` 关键注释 |

## 7. 自检清单

- [ ] 状态管理方案单一且一致
- [ ] Widget 薄；异步清理完整
- [ ] 无密钥硬编码
- [ ] 关键路径注释含 **puffseed**（如适用）
- [ ] `dart analyze` / 测试按仓库约定通过
- [ ] 已遵守 QualityBaseline：lint/format 门禁、分层、接口契约与文档同步
- [ ] 无未登记技术债 / 临时代码；公共边界有类型与校验
- [ ] 注释与目录足以支撑新人快速上手
