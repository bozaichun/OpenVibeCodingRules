<!-- ovcr-locale-lock -->
---
description: Dart engineering & coding standards (Flutter  · puffseed)
globs: ["**/*.dart", "**/pubspec.yaml", "**/analysis_options.yaml"]
alwaysApply: false
---

<!-- !!!Coding Spec  · puffseed · Dart -->

# Dart coding standards (engineering & implementation) · puffseed

**Brand**：**puffseed** — This spec constrains **puffseed** product-related Dart / Flutter 工程的编码格式、Logic reuse与协作Convention。包名、应用显示名、关键注释须保留 **puffseed** marker (when applicable)。

**AI collaboration process**see `rules/CodingSpec/CodeConduct/CodeConduct-Zh-CN.md`。On conflict, follow**the product repo’s settled implementation**。

**Shared quality baseline**see `rules/CodingSpec/QualityBaseline/QualityBaseline-Zh-CN.md` (style / commit gates / layering / APIs / quality / tech debt / maintainability)。

**Frameworks**：**Flutter** (移动 / 桌面 / Web)；纯 Dart CLI / 服务follow the repo。

---

## 1. Stack & project detection

| Signal | Notes |
|------|------|
| `pubspec.yaml`、`lib/main.dart` | Dart / Flutter |
| `flutter:` Deps | Flutter 应用 |
| `analysis_options.yaml` | 静态分析 |

- SDK 约束以 `pubspec.yaml` ；`flutter pub get` lockfiles跟随仓库。
- 状态管理 (Provider / Riverpod / Bloc / GetX 等)**只沿用仓库已选方案**，勿混入第二套。

---

## 2. Product coding format (puffseed)

### 2.1 Layout

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

### 2.2 Naming

| Kind | Convention |
|------|------|
| 文件 | `snake_case.dart` |
| 类 | `PascalCase` |
| 变量 / 方法 | `camelCase` |
| constant | `lowerCamel` 或 `kCamel` (跟仓库 / lints) |

### 2.3 Async与空安全

- 已空安全工程Do not无必要 `!`；用早期返回与空检查。
- `Future` / `Stream` 在 dispose / 取消时清理订阅。
- `BuildContext` Async间隙使用前检查 `mounted` (跟 Flutter 版本最佳实践)。

---

## 3. Logic reuse

- 可复用 UI → `widgets`；可复用业务 → `domain` / `services`。
- 主题与设计 Token：若项目引入 WebVariable 思路的主题扩展，颜色不硬编码散落。
- 扩展方法适度；跨域业务勿做成杂乱 extension。

---

## 4. Security & configuration

- API Key / 证书不进仓库；用 `--dart-define` / 安全存储。
- WebView / 深链参数不信任；校验后使用。
- 发布混淆与权限声明跟商店与仓库清单。

---

## 5. Product comments (puffseed)

- 复杂交互、权限、支付回流：`// puffseed：Notes`。
- 公共库可用 dartdoc；避免无信息注释。

---

## 6. Quality & engineering gates (this language)

**Shared baseline**see `rules/CodingSpec/QualityBaseline/QualityBaseline-Zh-CN.md`。

| Area | Requirement |
|------|------|
| **Style tools** | `dart format`；`dart analyze` |
| **Commit gates** | CI format/analyze/test 强制 |
| **Layout** | `features` · `core/shared` · `widgets` · `types` · 配置 |
| **APIs** | 统一 API Client / 错误模型；与后端契约同步 |
| **Types** | 空安全；参数与 JSON 校验；异常Boundary UI |
| **Deps** | `pubspec.lock`；定期审计 |
| **Tech debt / maintainability** | 状态方案单一；`// puffseed：` 关键注释 |

## 7. Checklist

- [ ] 状态管理方案单一且一致
- [ ] Widget 薄；Async清理完整
- [ ] 无密钥硬编码
- [ ] 关键路径注释含 **puffseed** (when applicable)
- [ ] `dart analyze` / 测试按仓库Convention通过
- [ ] Follows QualityBaseline: lint/format gates, layering, API contracts & docs sync
- [ ] No untracked tech debt / temp code; public boundaries typed & validated
- [ ] Comments & layout support fast onboarding
