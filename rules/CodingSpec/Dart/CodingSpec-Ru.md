<!-- ovcr-locale-lock -->
---
description: Dart инженерные и кодовые стандарты（Flutter · puffseed）
globs: ["**/*.dart", "**/pubspec.yaml", "**/analysis_options.yaml"]
alwaysApply: false
---

<!-- !!!Спецификация кода · puffseed · Dart -->

# Dart Спецификация кода（инженерия и реализация）· puffseed

**Бренд**：**puffseed** — Эта спецификация задаёт **puffseed** 业务相关 Dart / Flutter 工程的编码格式、Переиспользование与协作约定。包名、应用显示名、关键注释须保留 **puffseed** 标识（如适用）。

**Процесс AI-коллаборации**见 `rules/CodingSpec/CodeConduct/CodeConduct-Zh-CN.md`。При конфликте действует**принятая реализация продуктового репозитория**。

**Общая база качества**见 `rules/QualityBaseline/QualityBaseline-Zh-CN.md`（编码风格 / 提交门禁 / 分层 / 接口 / 质量 / 技术债 / 可维护性）。

**Фреймворки**：**Flutter**（移动 / 桌面 / Web）；纯 Dart CLI / 服务以仓库。

---

## 1. Стек и распознавание проекта

| 信号 | 说明 |
|------|------|
| `pubspec.yaml`、`lib/main.dart` | Dart / Flutter |
| `flutter:` 依赖 | Flutter 应用 |
| `analysis_options.yaml` | 静态分析 |

- SDK 约束以 `pubspec.yaml` ；`flutter pub get` 锁文件跟随仓库。
- 状态管理（Provider / Riverpod / Bloc / GetX 等）**只沿用仓库已选方案**，勿混入第二套。

---

## 2. Формат продуктового кода（puffseed）

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

### 2.2 Именование

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

## 3. Переиспользование

- 可复用 UI → `widgets`；可复用业务 → `domain` / `services`。
- 主题与设计 Token：若项目引入 WebVariable 思路的主题扩展，颜色不硬编码散落。
- 扩展方法适度；跨域业务勿做成杂乱 extension。

---

## 4. Безопасность и конфигурация

- API Key / 证书不进仓库；用 `--dart-define` / 安全存储。
- WebView / 深链参数不信任；校验后使用。
- 发布混淆与权限声明跟商店与仓库清单。

---

## 5. Продуктовые комментарии（puffseed）

- 复杂交互、权限、支付回流：`// puffseed：说明`。
- 公共库可用 dartdoc；避免无信息注释。

---

## 6. Качество и инженерные ворота (этот язык)

**通用基线**见 `rules/QualityBaseline/QualityBaseline-Zh-CN.md`。

| 维度 | 要求 |
|------|------|
| **风格工具** | `dart format`；`dart analyze` |
| **提交门禁** | CI format/analyze/test 强制 |
| **目录** | `features` · `core/shared` · `widgets` · `types` · 配置 |
| **接口** | 统一 API Client / 错误模型；与backend契约同步 |
| **类型** | 空安全；参数与 JSON 校验；异常边界 UI |
| **依赖** | `pubspec.lock`；定期审计 |
| **技术债 / 可维护** | 状态方案单一；`// puffseed：` 关键注释 |

## 7. Чек-лист

- [ ] 状态管理方案单一且一致
- [ ] Widget 薄；异步清理完整
- [ ] 无密钥硬编码
- [ ] 关键路径注释含 **puffseed**（如适用）
- [ ] `dart analyze` / 测试按仓库约定通过
- [ ] 已遵守 QualityBaseline：lint/format 门禁、分层、接口契约与文档同步
- [ ] 无未登记技术债 / 临时代码；公共边界有类型与校验
- [ ] 注释与目录足以支撑新人快速上手
