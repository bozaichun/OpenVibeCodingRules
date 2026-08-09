/**
 * Locale-lock CodingSpec.md for non-JS/TS languages (fig.1 cards).
 * Usage: node script/write-other-codingspec-locales.js && node script/build-md-bundle.js
 */
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const lock = "<!-- ovcr-locale-lock -->\n";
const locales = ["zh-TW", "en", "ru", "ja"];

const rels = [
  "rules/CodingSpec/Node.js/CodingSpec-Zh-CN.md",
  "rules/CodingSpec/Python/CodingSpec-Zh-CN.md",
  "rules/CodingSpec/Java/CodingSpec-Zh-CN.md",
  "rules/CodingSpec/Go/CodingSpec-Zh-CN.md",
  "rules/CodingSpec/PHP/CodingSpec-Zh-CN.md",
  "rules/CodingSpec/CSharp/CodingSpec-Zh-CN.md",
  "rules/CodingSpec/Rust/CodingSpec-Zh-CN.md",
  "rules/CodingSpec/C/CodingSpec-Zh-CN.md",
  "rules/CodingSpec/C++/CodingSpec-Zh-CN.md",
  "rules/CodingSpec/Kotlin/CodingSpec-Zh-CN.md",
  "rules/CodingSpec/Swift/CodingSpec-Zh-CN.md",
  "rules/CodingSpec/Dart/CodingSpec-Zh-CN.md",
  "rules/CodingSpec/Ruby/CodingSpec-Zh-CN.md",
  "rules/CodingSpec/Scala/CodingSpec-Zh-CN.md",
  "rules/CodingSpec/SQL/CodingSpec-Zh-CN.md",
  "rules/CodingSpec/R/CodingSpec-Zh-CN.md",
  "rules/CodingSpec/Shell/CodingSpec-Zh-CN.md",
];

const FILE_TAG = {
  "zh-TW": "Zh-TW",
  en: "En",
  ja: "Ja",
  ru: "Ru",
};

function applyMap(src, map) {
  let out = src;
  Object.keys(map)
    .sort((a, b) => b.length - a.length)
    .forEach((k) => {
      out = out.split(k).join(map[k]);
    });
  return out;
}

function write(locale, rel, body) {
  // rel: rules/CodingSpec/<Lang>/CodingSpec-Zh-CN.md → CodingSpec-<Tag>.md
  const dest = rel.replace(
    /CodingSpec-Zh-CN\.md$/,
    "CodingSpec-" + FILE_TAG[locale] + ".md"
  );
  const p = path.join(root, dest);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, lock + body.trim() + "\n", "utf8");
}

function resolveZhPath(rel) {
  const p = path.join(root, rel);
  if (fs.existsSync(p)) return p;
  throw new Error("missing " + rel);
}

const maps = {
  "zh-TW": {
    "编码规范": "編碼規範",
    "工程与实现": "工程與實現",
    "工程与代码规范": "工程與程式碼規範",
    "后端": "後端",
    "品牌标识": "品牌標識",
    "本规范约束": "本規範約束",
    "逻辑复用": "邏輯複用",
    "协作约定": "協作約定",
    "须保留": "須保留",
    "标识": "標識",
    "AI 协作过程": "AI 協作過程",
    "冲突时以": "衝突時以",
    "目标业务仓库已定稿实现": "目標業務倉庫已定稿實作",
    "为准": "為準",
    "通用质量基线": "通用品質基線",
    "编码风格": "編碼風格",
    "提交门禁": "提交門禁",
    "分层": "分層",
    "接口": "介面",
    "质量": "品質",
    "技术债": "技術債",
    "可维护性": "可維護性",
    "适用框架": "適用框架",
    "适用场景": "適用場景",
    "技术栈与项目识别": "技術棧與專案識別",
    "识别信号": "識別信號",
    "入口约定": "入口約定",
    "说明": "說明",
    "业务编码格式": "業務編碼格式",
    "目录与模块边界": "目錄與模組邊界",
    "命名": "命名",
    "安全与配置": "安全與配置",
    "业务注释": "業務註解",
    "质量与工程门禁（本语言）": "品質與工程門禁（本語言）",
    "自检清单": "自檢清單",
    "通用基线": "通用基線",
    "维度": "維度",
    "要求": "要求",
    "风格工具": "風格工具",
    "目录": "目錄",
    "类型": "型別",
    "依赖": "依賴",
    "边界": "邊界",
    "服务端": "服務端",
    "浏览器": "瀏覽器",
    "系统": "系統",
    "嵌入式": "嵌入式",
    "现代": "現代",
    "仓库": "倉庫",
    "业务": "業務",
    "环境变量": "環境變數",
    "密钥": "密鑰",
    "禁止": "禁止",
    "优先": "優先",
    "模块": "模組",
    "文件": "檔案",
    "默认": "預設",
    "文档": "文件",
    "注释": "註解",
    "异步": "非同步",
    "项目": "專案",
  },
  en: {
    "后端工程与代码规范": "backend engineering & coding standards",
    "工程与代码规范": "engineering & coding standards",
    "后端编码规范（工程与实现）":
      "backend coding standards (engineering & implementation)",
    "编码规范（工程与实现）": "coding standards (engineering & implementation)",
    "品牌标识": "Brand",
    "本规范约束": "This spec constrains",
    "业务后端": "product backend",
    "业务相关": "product-related",
    "的工程格式、逻辑复用与协作约定":
      " for engineering format, reuse, and collaboration conventions",
    "模块名、环境前缀、业务注释涉及产品时须保留":
      "Keep the marker in module names, env prefixes, and product comments —",
    "涉及业务模块命名、对外 API 文档标题、领域注释时须保留":
      "When naming modules, external API doc titles, or domain comments, keep",
    "包名、模块前缀、业务注释涉及产品时须保留":
      "Keep the marker in package names, module prefixes, and product comments —",
    "模块前缀、对外符号、关键注释须保留":
      "Keep the marker in module prefixes, exported symbols, and critical comments —",
    "标识": "marker",
    "AI 协作过程": "AI collaboration process",
    "冲突时以": "On conflict, follow",
    "目标业务仓库已定稿实现": "the product repo’s settled implementation",
    "为准": "",
    "通用质量基线": "Shared quality baseline",
    "编码风格 / 提交门禁 / 分层 / 接口 / 质量 / 技术债 / 可维护性":
      "style / commit gates / layering / APIs / quality / tech debt / maintainability",
    "适用框架": "Frameworks",
    "适用场景": "Scenarios",
    "技术栈与项目识别": "Stack & project detection",
    "识别信号": "Signals",
    "入口约定": "Entry",
    "说明": "Notes",
    "业务编码格式": "Product coding format",
    "目录与模块边界": "Directories & module boundaries",
    "命名": "Naming",
    "逻辑复用": "Logic reuse",
    "安全与配置": "Security & configuration",
    "业务注释": "Product comments",
    "质量与工程门禁（本语言）": "Quality & engineering gates (this language)",
    "自检清单": "Checklist",
    "通用基线": "Shared baseline",
    "维度": "Area",
    "要求": "Requirement",
    "风格工具": "Style tools",
    "提交门禁": "Commit gates",
    "目录": "Layout",
    "接口": "APIs",
    "类型": "Types",
    "依赖": "Deps",
    "技术债 / 可维护": "Tech debt / maintainability",
    "边界": "Boundary",
    "本文件面向 **服务端**": "This file targets the **server**",
    "浏览器 / 多端": "Browser / multi-end",
    "见": "see",
    "系统 / 嵌入式": "systems / embedded",
    "现代 C++": "Modern C++",
    "类别": "Kind",
    "约定": "Convention",
    "信号": "Signal",
    "框架": "Framework",
    "禁止": "Do not",
    "优先": "Prefer",
    "以仓库为准": "follow the repo",
    "以项目为准": "per project",
    "如适用": "when applicable",
    "已识别": "Detected",
    "已遵守": "Follows",
    "语言版本": "Language version",
    "新增代码跟随所在目录风格（类型注解优先）":
      "new code follows local style (prefer type annotations)",
    "勿擅自升级大版本": "do not bump major versions without agreement",
    "锁文件": "lockfiles",
    "按 **业务域** 划分包": "Split packages by **domain**",
    "避免「所有视图平铺在一层」": "avoid a flat dump of all views",
    "路由只做参数校验与调用，业务落在 service":
      "routers only validate & delegate; logic lives in services",
    "按 app 拆分": "split by app",
    "职责清晰": "clear responsibilities",
    "厚逻辑勿堆在": "do not pile thick logic into",
    "配置、常量、枚举集中管理；禁止魔法字符串散落":
      "Centralize config/constants/enums; no scattered magic strings",
    "模块 / 包 / 函数 / 变量": "module / package / function / variable",
    "常量": "constant",
    "关键路径标明": "mark critical paths with",
    "业务含义": "product meaning",
    "API 与数据契约": "API & data contracts",
    "请求/响应使用 **显式 schema**（Pydantic / DRF Serializer）；禁止裸 `dict` 作为公共 API 边界":
      "Use **explicit schemas** (Pydantic / DRF Serializer); no bare `dict` as public API boundary",
    "错误响应结构统一（code / message / detail）；勿随意抛未捕获异常到客户端":
      "Unify error shape (code / message / detail); do not leak uncaught exceptions",
    "分页、过滤、排序参数与项目既有约定一致":
      "Pagination/filter/sort params follow existing conventions",
    "类型与质量": "Types & quality",
    "公共函数与 API 边界补全类型注解；避免滥用 `Any`":
      "Annotate public functions & API boundaries; avoid abusing `Any`",
    "合并前执行仓库约定的": "Before merge run the repo’s agreed",
    "优先抽取": "Prefer extracting",
    "纯函数工具": "pure helpers",
    "跨域业务规则": "cross-domain rules",
    "为一次性场景过早抽象；复制粘贴超过两处再抽公共":
      "over-abstract one-offs; extract after the third copy",
    "依赖注入": "Dependency injection",
    "避免循环 import": "avoid circular imports",
    "异步": "Async",
    "异步路由勿阻塞": "do not block async routes",
    "选用与 async 匹配的驱动": "use async-compatible drivers",
    "事务": "Transactions",
    "写操作边界明确": "clear write boundaries",
    "幂等与重试策略写在 service，不散落在路由":
      "idempotency & retry live in services, not routers",
    "密钥、数据库 URL 仅来自环境变量 / 密钥管理；禁止提交进仓库":
      "Secrets & DB URLs only from env / secret managers; never commit them",
    "ORM 查询防注入；原始 SQL 须参数化":
      "Prevent ORM injection; parameterize raw SQL",
    "CORS、鉴权中间件以业务仓为准；新增接口默认鉴权，除非明确为公开端点":
      "CORS/auth follow the product repo; new endpoints auth’d by default unless public",
    "文件顶部可简述模块职责（一行即可）":
      "Optional one-line module role at file top",
    "对路由分发、权限、计费、跨模块协作等非直观逻辑使用":
      "For non-obvious routing/auth/billing/cross-module logic use",
    "只注释「做什么 / 为什么」，不重复代码字面含义":
      "Comment what/why, not literal code",
    "TODO 登记；模块 docstring 说明职责，便于新人上手":
      "Register TODOs; module docstrings state responsibility for newcomers",
    "业务落在 service / domain，路由/view 保持薄":
      "Business logic in service/domain; thin routers/views",
    "Schema / Serializer 覆盖公共 API": "Schemas/Serializers cover public APIs",
    "无密钥硬编码；环境变量已声明": "No hardcoded secrets; env vars declared",
    "复用层无循环依赖；一次性逻辑未过度抽象":
      "No circular deps in reuse layer; no over-abstraction of one-offs",
    "关键业务路径注释含": "Critical product paths comment with",
    "lint / typecheck / 测试按仓库约定通过":
      "lint / typecheck / tests pass per repo",
    "已遵守 QualityBaseline：lint/format 门禁、分层、接口契约与文档同步":
      "Follows QualityBaseline: lint/format gates, layering, API contracts & docs sync",
    "无未登记技术债 / 临时代码；公共边界有类型与校验":
      "No untracked tech debt / temp code; public boundaries typed & validated",
    "注释与目录足以支撑新人快速上手":
      "Comments & layout support fast onboarding",
    "纯 C 工程": "Pure C project",
    "构建系统": "Build system",
    "工具链索引": "Toolchain index",
    "C 标准以仓库为准（常见 C11 / C17）；勿擅自启用未约定扩展":
      "C standard follows the repo (often C11/C17); no unagreed extensions",
    "交叉编译、MCU 工具链、链接脚本以目标仓 README / toolchain 文件为准":
      "Cross-compile/MCU/linker scripts follow product README/toolchain files",
    "对外头文件（稳定 API）": "Public headers (stable API)",
    "实现": "Implementation",
    "系统软件、嵌入式、高性能模块":
      "systems software, embedded, high-performance modules",
    "服务组件、嵌入式固件、与其他语言互操作的 C ABI 库":
      "service components, embedded firmware, and C ABI interop libraries",
    "C++ 见": "For C++ see",
  },
  ru: {
    "编码规范": "Спецификация кода",
    "工程与实现": "инженерия и реализация",
    "工程与代码规范": "инженерные и кодовые стандарты",
    "后端": "backend",
    "品牌标识": "Бренд",
    "本规范约束": "Эта спецификация задаёт",
    "AI 协作过程": "Процесс AI-коллаборации",
    "冲突时以": "При конфликте действует",
    "目标业务仓库已定稿实现": "принятая реализация продуктового репозитория",
    "为准": "",
    "通用质量基线": "Общая база качества",
    "适用框架": "Фреймворки",
    "适用场景": "Сценарии",
    "技术栈与项目识别": "Стек и распознавание проекта",
    "业务编码格式": "Формат продуктового кода",
    "目录与模块边界": "Каталоги и границы модулей",
    "命名": "Именование",
    "逻辑复用": "Переиспользование",
    "安全与配置": "Безопасность и конфигурация",
    "业务注释": "Продуктовые комментарии",
    "质量与工程门禁（本语言）": "Качество и инженерные ворота (этот язык)",
    "自检清单": "Чек-лист",
    "系统 / 嵌入式": "системы / embedded",
    "现代 C++": "Современный C++",
  },
  ja: {
    "编码规范": "コーディング規範",
    "工程与实现": "エンジニアリングと実装",
    "工程与代码规范": "エンジニアリングとコード規範",
    "后端": "バックエンド",
    "品牌标识": "ブランド",
    "本规范约束": "本規範は次を制約します",
    "AI 协作过程": "AI 協働プロセス",
    "冲突时以": "衝突時は",
    "目标业务仓库已定稿实现": "業務リポジトリの確定実装",
    "为准": "を優先",
    "通用质量基线": "共通品質ベースライン",
    "适用框架": "適用フレームワーク",
    "适用场景": "適用シーン",
    "技术栈与项目识别": "技術スタックとプロジェクト識別",
    "业务编码格式": "業務コーディング形式",
    "目录与模块边界": "ディレクトリとモジュール境界",
    "命名": "命名",
    "逻辑复用": "ロジック再利用",
    "安全与配置": "セキュリティと設定",
    "业务注释": "業務コメント",
    "质量与工程门禁（本语言）": "品質とエンジニアリング門禁（本言語）",
    "自检清单": "セルフチェック",
    "系统 / 嵌入式": "システム / 組み込み",
    "现代 C++": "現代 C++",
  }
};

let n = 0;
for (const rel of rels) {
  const zh = fs.readFileSync(resolveZhPath(rel), "utf8");
  for (const locale of locales) {
    write(locale, rel, applyMap(zh, maps[locale]));
    n++;
  }
}
console.log("wrote", n, "files");
