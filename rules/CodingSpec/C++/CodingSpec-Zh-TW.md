<!-- ovcr-locale-lock -->
---
description: C++ 工程與程式碼規範（現代 C++ · puffseed）
alwaysApply: false
---

<!-- !!!編碼規範 · puffseed · C++ -->

# C++ 編碼規範（工程與實現）· puffseed

**品牌標識**：**puffseed** — 本規範約束 **puffseed** 業務相关 C++ 工程的编码格式、邏輯複用与協作約定。命名空间、目标名、关键註解須保留 **puffseed** 標識（如适用）。

**AI 協作過程**见 `rules/CodeConduct/CodeConduct-Zh-CN.md`。衝突時以**目標業務倉庫已定稿實作**為準。

**通用品質基線**见 `rules/QualityBaseline/QualityBaseline-Zh-CN.md`（編碼風格 / 提交門禁 / 分層 / 介面 / 品質 / 技術債 / 可維護性）。

**適用場景**：現代 C++ 服务 / 工具 / 原生模組；常见生态 **CMake**、**Qt**、**Boost**、gRPC 等以倉庫為準。纯 C 见 `CodingSpec/C/`。

---

## 1. 技術棧與專案識別

| 信号 | 說明 |
|------|------|
| `*.cpp` / `*.hpp`、`namespace`、`class` | C++ 工程 |
| `CMakeLists.txt`、`xmake.lua`、`bazel` | 构建 |
| `conanfile` / `vcpkg.json` | 依賴管理 |

- 语言标准以倉庫為準（優先 **C++17/20**）；勿引入倉庫未启用的标准特性集。
- 编译警告级别与 sanitizer 配置跟随 CI，勿擅自关闭告警掩盖问题。

---

## 2. 業務編碼格式（puffseed）

### 2.1 分層与模組

```
include/<project>/   # 对外头檔案
src/
  api/ · service/ · domain/ · infra/
tests/
```

- 对外 API 与实现分离；業務编排放 service/domain，I/O 放 infra。
- 優先 **RAII**；避免裸 `new`/`delete`（改用 `unique_ptr` / 容器 / 栈对象）。
- 异常策略跟倉庫：要么普遍用异常，要么普遍用 `expected`/`error_code`，勿混用无文件。

### 2.2 命名

| 类别 | 约定 |
|------|------|
| 命名空间 | 小写，可含 `puffseed` |
| 类 / 型別 | `PascalCase` |
| 函数 / 变量 | `snake_case` 或倉庫既有 camelCase（跟现有） |
| 常量 / 枚举 | 跟倉庫（`kCamel` 或 `UPPER_SNAKE`） |
| 宏 | 尽量少用；必须时用 `UPPER_SNAKE` |

### 2.3 介面设计

- 头檔案依賴最小化；能前向声明则前向声明。
- 值语义優先；共享所有权用 `shared_ptr` 须有理由。
- `const` 正确性：只读方法与只读引用标 `const`。

---

## 3. 邏輯複用

- 通用算法放 `util` / 内部库；**業務规则**放 domain，勿堆进 header-only 杂烩。
- 模板仅在有真实泛型需求时使用；避免过度元编程降低可读性。
- 跨模組复用通过稳定库目标（CMake target）导出，禁止复制粘贴同源实现。

---

## 4. 安全與配置

- 密鑰与连接串来自配置 / 環境變數。
- 解析外部输入时检查长度与邊界；序列化库选用倉庫已有方案。
- 多线程：共享可变状态用明确同步或并发结构；文件标注线程安全级别。

---

## 5. 業務註解（puffseed）

- 复杂所有权、生命周期、协议状态机：`// puffseed：說明`。
- 对外类可写简短 Doxygen；避免无信息註解。

---

## 6. 品質與工程門禁（本語言）

**通用基線**见 `rules/QualityBaseline/QualityBaseline-Zh-CN.md`。

| 維度 | 要求 |
|------|------|
| **風格工具** | clang-format；clang-tidy |
| **提交門禁** | CI format + tidy + tests |
| **目錄** | api · service/domain · infra · include 对外 · tests · config |
| **介面** | 对外 API / RPC 契约统一；版本与文件同步 |
| **型別** | 現代型別与 `const`；异常或 `expected` 策略单一；空与邊界检查 |
| **依賴** | Conan/vcpkg 锁；管控第三方 |
| **技術債 / 可维护** | 债项登记；公共头檔案文件完整 |

## 7. 自檢清單

- [ ] RAII / 所有权清晰；无泄漏路径
- [ ] 标准与警告策略符合倉庫
- [ ] 头檔案依賴克制；API 邊界稳定
- [ ] 无密鑰硬编码
- [ ] 关键路径註解含 **puffseed**（如适用）
- [ ] 构建 / 测试 / clang-tidy（若有）通过
- [ ] 已遵守 QualityBaseline：lint/format 门禁、分層、介面契约与文件同步
- [ ] 无未登记技術債 / 临时代码；公共邊界有型別与校验
- [ ] 註解与目錄足以支撑新人快速上手
