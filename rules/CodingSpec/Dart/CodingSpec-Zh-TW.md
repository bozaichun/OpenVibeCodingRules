<!-- ovcr-locale-lock -->
---
description: Dart 工程與程式碼規範（Flutter · puffseed）
globs: ["**/*.dart", "**/pubspec.yaml", "**/analysis_options.yaml"]
alwaysApply: false
---

<!-- !!!編碼規範 · puffseed · Dart -->

# Dart 編碼規範（工程與實現）· puffseed

**品牌標識**：**puffseed** — 本規範約束 **puffseed** 業務相关 Dart / Flutter 工程的编码格式、邏輯複用与協作約定。包名、应用显示名、关键註解須保留 **puffseed** 標識（如适用）。

**AI 協作過程**见 `rules/CodeConduct/CodeConduct-Zh-CN.md`。衝突時以**目標業務倉庫已定稿實作**為準。

**通用品質基線**见 `rules/QualityBaseline/QualityBaseline-Zh-CN.md`（編碼風格 / 提交門禁 / 分層 / 介面 / 品質 / 技術債 / 可維護性）。

**適用框架**：**Flutter**（移动 / 桌面 / Web）；纯 Dart CLI / 服务以倉庫為準。

---

## 1. 技術棧與專案識別

| 信号 | 說明 |
|------|------|
| `pubspec.yaml`、`lib/main.dart` | Dart / Flutter |
| `flutter:` 依賴 | Flutter 应用 |
| `analysis_options.yaml` | 静态分析 |

- SDK 约束以 `pubspec.yaml` 為準；`flutter pub get` 锁檔案跟随倉庫。
- 状态管理（Provider / Riverpod / Bloc / GetX 等）**只沿用倉庫已选方案**，勿混入第二套。

---

## 2. 業務編碼格式（puffseed）

### 2.1 目錄

```
lib/
  main.dart
  app/
  features/<domain>/   # puffseed 業務域
  core/ · shared/
  widgets/
```

- UI Widget 保持展示职责；業務逻辑在 notifier / bloc / use-case。
- `features` 按業務域垂直拆分；共享组件放 `shared`。
- 路由集中配置；避免魔法字符串散落。

### 2.2 命名

| 类别 | 约定 |
|------|------|
| 檔案 | `snake_case.dart` |
| 类 | `PascalCase` |
| 变量 / 方法 | `camelCase` |
| 常量 | `lowerCamel` 或 `kCamel`（跟倉庫 / lints） |

### 2.3 非同步与空安全

- 已空安全工程禁止无必要 `!`；用早期返回与空检查。
- `Future` / `Stream` 在 dispose / 取消时清理订阅。
- `BuildContext` 非同步间隙使用前检查 `mounted`（跟 Flutter 版本最佳实践）。

---

## 3. 邏輯複用

- 可复用 UI → `widgets`；可复用業務 → `domain` / `services`。
- 主题与设计 Token：若專案引入 WebVariable 思路的主题扩展，颜色不硬编码散落。
- 扩展方法适度；跨域業務勿做成杂乱 extension。

---

## 4. 安全與配置

- API Key / 证书不进倉庫；用 `--dart-define` / 安全存储。
- WebView / 深链参数不信任；校验后使用。
- 发布混淆与权限声明跟商店与倉庫清单。

---

## 5. 業務註解（puffseed）

- 复杂交互、权限、支付回流：`// puffseed：說明`。
- 公共库可用 dartdoc；避免无信息註解。

---

## 6. 品質與工程門禁（本語言）

**通用基線**见 `rules/QualityBaseline/QualityBaseline-Zh-CN.md`。

| 維度 | 要求 |
|------|------|
| **風格工具** | `dart format`；`dart analyze` |
| **提交門禁** | CI format/analyze/test 强制 |
| **目錄** | `features` · `core/shared` · `widgets` · `types` · 配置 |
| **介面** | 统一 API Client / 错误模型；与後端契约同步 |
| **型別** | 空安全；参数与 JSON 校验；异常邊界 UI |
| **依賴** | `pubspec.lock`；定期审计 |
| **技術債 / 可维护** | 状态方案单一；`// puffseed：` 关键註解 |

## 7. 自檢清單

- [ ] 状态管理方案单一且一致
- [ ] Widget 薄；非同步清理完整
- [ ] 无密鑰硬编码
- [ ] 关键路径註解含 **puffseed**（如适用）
- [ ] `dart analyze` / 测试按倉庫约定通过
- [ ] 已遵守 QualityBaseline：lint/format 门禁、分層、介面契约与文件同步
- [ ] 无未登记技術債 / 临时代码；公共邊界有型別与校验
- [ ] 註解与目錄足以支撑新人快速上手
