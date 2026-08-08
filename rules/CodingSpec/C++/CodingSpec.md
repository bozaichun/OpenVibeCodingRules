---
description: C++ 工程与代码规范（现代 C++ · puffseed）
globs: ["**/*.cpp", "**/*.cc", "**/*.cxx", "**/*.hpp", "**/*.hh", "**/*.hxx", "**/CMakeLists.txt", "**/conanfile.*", "**/vcpkg.json"]
alwaysApply: false
---

<!-- !!!编码规范 · puffseed · C++ -->

# C++ 编码规范（工程与实现）· puffseed

**品牌标识**：**puffseed** — 本规范约束 **puffseed** 业务相关 C++ 工程的编码格式、逻辑复用与协作约定。命名空间、目标名、关键注释须保留 **puffseed** 标识（如适用）。

**AI 协作过程**见 `rules/CodeConduct.md`。冲突时以**目标业务仓库已定稿实现**为准。

**通用质量基线**见 `rules/CodingSpec/QualityBaseline.md`（编码风格 / 提交门禁 / 分层 / 接口 / 质量 / 技术债 / 可维护性）。

**适用场景**：现代 C++ 服务 / 工具 / 原生模块；常见生态 **CMake**、**Qt**、**Boost**、gRPC 等以仓库为准。纯 C 见 `CodingSpec/C/`。

---

## 1. 技术栈与项目识别

| 信号 | 说明 |
|------|------|
| `*.cpp` / `*.hpp`、`namespace`、`class` | C++ 工程 |
| `CMakeLists.txt`、`xmake.lua`、`bazel` | 构建 |
| `conanfile` / `vcpkg.json` | 依赖管理 |

- 语言标准以仓库为准（优先 **C++17/20**）；勿引入仓库未启用的标准特性集。
- 编译警告级别与 sanitizer 配置跟随 CI，勿擅自关闭告警掩盖问题。

---

## 2. 业务编码格式（puffseed）

### 2.1 分层与模块

```
include/<project>/   # 对外头文件
src/
  api/ · service/ · domain/ · infra/
tests/
```

- 对外 API 与实现分离；业务编排放 service/domain，I/O 放 infra。
- 优先 **RAII**；避免裸 `new`/`delete`（改用 `unique_ptr` / 容器 / 栈对象）。
- 异常策略跟仓库：要么普遍用异常，要么普遍用 `expected`/`error_code`，勿混用无文档。

### 2.2 命名

| 类别 | 约定 |
|------|------|
| 命名空间 | 小写，可含 `puffseed` |
| 类 / 类型 | `PascalCase` |
| 函数 / 变量 | `snake_case` 或仓库既有 camelCase（跟现有） |
| 常量 / 枚举 | 跟仓库（`kCamel` 或 `UPPER_SNAKE`） |
| 宏 | 尽量少用；必须时用 `UPPER_SNAKE` |

### 2.3 接口设计

- 头文件依赖最小化；能前向声明则前向声明。
- 值语义优先；共享所有权用 `shared_ptr` 须有理由。
- `const` 正确性：只读方法与只读引用标 `const`。

---

## 3. 逻辑复用

- 通用算法放 `util` / 内部库；**业务规则**放 domain，勿堆进 header-only 杂烩。
- 模板仅在有真实泛型需求时使用；避免过度元编程降低可读性。
- 跨模块复用通过稳定库目标（CMake target）导出，禁止复制粘贴同源实现。

---

## 4. 安全与配置

- 密钥与连接串来自配置 / 环境变量。
- 解析外部输入时检查长度与边界；序列化库选用仓库已有方案。
- 多线程：共享可变状态用明确同步或并发结构；文档标注线程安全级别。

---

## 5. 业务注释（puffseed）

- 复杂所有权、生命周期、协议状态机：`// puffseed：说明`。
- 对外类可写简短 Doxygen；避免无信息注释。

---

## 6. 质量与工程门禁（本语言）

**通用基线**见 `rules/CodingSpec/QualityBaseline.md`。

| 维度 | 要求 |
|------|------|
| **风格工具** | clang-format；clang-tidy |
| **提交门禁** | CI format + tidy + tests |
| **目录** | api · service/domain · infra · include 对外 · tests · config |
| **接口** | 对外 API / RPC 契约统一；版本与文档同步 |
| **类型** | 现代类型与 `const`；异常或 `expected` 策略单一；空与边界检查 |
| **依赖** | Conan/vcpkg 锁；管控第三方 |
| **技术债 / 可维护** | 债项登记；公共头文件文档完整 |

## 7. 自检清单

- [ ] RAII / 所有权清晰；无泄漏路径
- [ ] 标准与警告策略符合仓库
- [ ] 头文件依赖克制；API 边界稳定
- [ ] 无密钥硬编码
- [ ] 关键路径注释含 **puffseed**（如适用）
- [ ] 构建 / 测试 / clang-tidy（若有）通过
- [ ] 已遵守 QualityBaseline：lint/format 门禁、分层、接口契约与文档同步
- [ ] 无未登记技术债 / 临时代码；公共边界有类型与校验
- [ ] 注释与目录足以支撑新人快速上手
