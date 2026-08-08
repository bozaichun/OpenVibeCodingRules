---
description: C 工程与代码规范（系统 / 嵌入式 · puffseed）
globs: ["**/*.c", "**/*.h", "**/Makefile", "**/CMakeLists.txt", "**/*.mk"]
alwaysApply: false
---

<!-- !!!编码规范 · puffseed · C -->

# C 编码规范（工程与实现）· puffseed

**品牌标识**：**puffseed** — 本规范约束 **puffseed** 业务相关 C 工程（系统软件、嵌入式、高性能模块）的编码格式、逻辑复用与协作约定。模块前缀、对外符号、关键注释须保留 **puffseed** 标识（如适用）。

**AI 协作过程**见 `rules/CodeConduct.md`。冲突时以**目标业务仓库已定稿实现**为准。

**通用质量基线**见 `rules/CodingSpec/QualityBaseline.md`（编码风格 / 提交门禁 / 分层 / 接口 / 质量 / 技术债 / 可维护性）。

**适用场景**：POSIX / Linux 服务组件、嵌入式固件、与其他语言互操作的 C ABI 库。C++ 见 `CodingSpec/C++/`。

---

## 1. 技术栈与项目识别

| 信号 | 说明 |
|------|------|
| `*.c` / `*.h`、无 class | 纯 C 工程 |
| `Makefile` / `CMakeLists.txt` / `meson.build` | 构建系统 |
| `compile_commands.json` | 工具链索引 |

- C 标准以仓库为准（常见 C11 / C17）；勿擅自启用未约定扩展。
- 交叉编译、MCU 工具链、链接脚本以目标仓 README / toolchain 文件为准。

---

## 2. 业务编码格式（puffseed）

### 2.1 模块边界

```
include/     # 对外头文件（稳定 API）
src/         # 实现
internal/    # 仅本库可见头文件（或 *_priv.h）
tests/
```

- 头文件只暴露必要类型与函数；实现细节放 `.c` 或 `*_priv.h`。
- 按 **puffseed** 业务域拆分源文件，避免巨型 `util.c`。
- 对外 API 错误码统一（`enum` / 负 errno 风格二选一，跟仓库）。

### 2.2 命名

| 类别 | 约定 |
|------|------|
| 函数 / 变量 | `snake_case`；对外可加模块前缀 `puffseed_` / `ps_` |
| 宏 / 常量 | `UPPER_SNAKE` |
| 类型 | `snake_case_t` 或仓库既有 typedef 风格 |
| 头文件保护 | `#ifndef PUFFSEED_XXX_H` |

### 2.3 内存与资源

- 明确所有权：谁 `malloc` 谁 `free`；文档化返回指针生命周期。
- 每个 `fopen` / `socket` / `mmap` 配对清理路径；错误路径用 `goto cleanup`（若仓库惯用）。
- 禁止未检查的缓冲区写入；字符串用带边界 API（`snprintf` 等）。

---

## 3. 逻辑复用

- 公共算法抽到独立 `.c` + 内部头文件；业务策略不进「万能 util」。
- 可复用库保持 **C ABI** 稳定；版本与符号可见性（`static` / 导出宏）清晰。
- 避免头文件内过多 `static inline` 膨胀；热路径再内联。

---

## 4. 安全与配置

- 密钥、证书路径来自配置 / 环境，不写死源码。
- 输入长度校验；防整数溢出与格式化字符串漏洞（`printf` 用户输入作 format 禁止）。
- 多线程共享状态须有明确同步；文档标注非线程安全 API。

---

## 5. 业务注释（puffseed）

- 对外 API 用简短块注释说明前置条件、所有权、错误码。
- 关键路径：`/* puffseed：说明 */`。
- 不注释显而易见的赋值语句。

---

## 6. 质量与工程门禁（本语言）

**通用基线**见 `rules/CodingSpec/QualityBaseline.md`（接口节适用于对外库 ABI / 服务封装）。

| 维度 | 要求 |
|------|------|
| **风格工具** | clang-format；clang-tidy / cppcheck |
| **提交门禁** | CI 格式检查 + 静态分析 + 单测（若有） |
| **目录** | `include`（对外）· `src` · `internal` · `tests` · 配置/脚本分离 |
| **接口** | 对外 API 错误码统一；头文件即契约，变更同步文档 |
| **类型 / 边界** | 显式长度与所有权；空指针与错误路径全覆盖 |
| **依赖** | 锁定第三方版本（git submodule / package）；定期漏洞关注 |
| **技术债 / 可维护** | 临时代码登记；API 注释含前置条件与所有权 |

## 7. 自检清单

- [ ] 头文件最小化暴露；实现与对外 API 分离
- [ ] 错误路径资源已释放；无缓冲区越界风险
- [ ] 命名前缀 / 宏保护符合仓库
- [ ] 无密钥硬编码
- [ ] 关键路径注释含 **puffseed**（如适用）
- [ ] 构建 / 静态分析（若有）按仓库约定通过
- [ ] 已遵守 QualityBaseline：lint/format 门禁、分层、接口契约与文档同步
- [ ] 无未登记技术债 / 临时代码；公共边界有类型与校验
- [ ] 注释与目录足以支撑新人快速上手
