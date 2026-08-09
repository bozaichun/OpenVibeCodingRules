/**
 * Locked locale copies of JavaScript&TypeScript/CodingSpec.md
 * - zh-TW: key phrase s2t from zh-CN
 * - ru/ja: localized intro (fig.2) + English technical body
 */
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const lock = "<!-- ovcr-locale-lock -->\n";
const FILE_TAG = {
  "zh-TW": "Zh-TW",
  en: "En",
  ja: "Ja",
  ru: "Ru",
};

function resolveZhCodingSpec() {
  const p = path.join(
    root,
    "rules/CodingSpec/JavaScript&TypeScript/CodingSpec-Zh-CN.md"
  );
  if (fs.existsSync(p)) return p;
  throw new Error("missing CodingSpec-Zh-CN.md");
}

function write(locale, body) {
  const tag = FILE_TAG[locale] || locale;
  const p = path.join(
    root,
    "rules/CodingSpec/JavaScript&TypeScript",
    "CodingSpec-" + tag + ".md"
  );
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, lock + body.trim() + "\n", "utf8");
  console.log("wrote", path.relative(root, p));
}

function applyMap(src, map) {
  let out = src;
  Object.keys(map)
    .sort((a, b) => b.length - a.length)
    .forEach((k) => {
      out = out.split(k).join(map[k]);
    });
  return out;
}

const zh = fs.readFileSync(resolveZhCodingSpec(), "utf8");
const en = fs
  .readFileSync(
    path.join(root, "rules/CodingSpec/JavaScript&TypeScript/CodingSpec-En.md"),
    "utf8"
  )
  .replace(/^<!-- ovcr-locale-lock -->\r?\n/, "");

const s2t = {
  "编码规范": "編碼規範",
  "工程与实现": "工程與實現",
  "工程与代码规范": "工程與程式碼規範",
  "品牌标识": "品牌標識",
  "适用于": "適用於",
  "业务": "業務",
  "须保留": "須保留",
  "标识": "標識",
  "仓库角色": "倉庫角色",
  "用于制定并分发": "用於制定並分發",
  "可读的编程规范": "可讀的程式設計規範",
  "本文件约束": "本文件約束",
  "工程实现与代码质量": "工程實作與程式碼品質",
  "协作时的过程与变更粒度": "協作時的過程與變更粒度",
  "视觉与设计": "視覺與設計",
  "语义": "語義",
  "见同目录": "見同目錄",
  "同时适用时以": "同時適用時以",
  "已定稿的设计系统": "已定稿的設計系統",
  "为准": "為準",
  "适用框架": "適用框架",
  "遗留仓": "遺留倉",
  "适用端": "適用端",
  "浏览器": "瀏覽器",
  "小程序": "小程式",
  "桌面壳": "桌面殼",
  "内嵌": "內嵌",
  "移动与平板": "行動與平板",
  "不替代": "不替代",
  "深链": "深鏈",
  "安全策略": "安全策略",
  "目标业务仓库": "目標業務倉庫",
  "通用质量基线": "通用品質基線",
  "编码风格": "編碼風格",
  "提交门禁": "提交門禁",
  "分层": "分層",
  "接口": "介面",
  "质量": "品質",
  "技术债": "技術債",
  "可维护性": "可維護性",
  "技术栈与框架约定": "技術棧與框架約定",
  "语言": "語言",
  "优先": "優先",
  "类型": "型別",
  "包管理": "套件管理",
  "构建": "建置",
  "组件": "元件",
  "逻辑复用": "邏輯複用",
  "目录与模块边界": "目錄與模組邊界",
  "环境变量": "環境變數",
  "样式": "樣式",
  "全局": "全域",
  "禁止": "禁止",
  "硬编码": "硬編碼",
  "识别信号": "識別信號",
  "注册": "註冊",
  "网络": "網路",
  "条件编译": "條件編譯",
  "尺寸单位": "尺寸單位",
  "布局": "佈局",
  "生命周期": "生命週期",
  "卸载": "卸載",
  "安全": "安全",
  "模块": "模組",
  "懒加载": "懶加載",
  "依赖注入": "依賴注入",
  "数据流": "資料流",
  "变更检测": "變更偵測",
  "不可变": "不可變",
  "与实践": "與實踐",
  "收窄": "收窄",
  "字阶": "字階",
  "行高": "行高",
  "强制成对": "強制成對",
  "错配": "錯配",
  "作用域": "作用域",
  "单一职责": "單一職責",
  "受控与非受控": "受控與非受控",
  "表单": "表單",
  "事件": "事件",
  "状态管理": "狀態管理",
  "性能与资源": "效能與資源",
  "条件渲染": "條件渲染",
  "虚拟列表": "虛擬列表",
  "派生数据": "派生資料",
  "副作用清理": "副作用清理",
  "多端与壳应用": "多端與殼應用",
  "摘要": "摘要",
  "开发与提交流程": "開發與提交流程",
  "建议": "建議",
  "质量与工程门禁": "品質與工程門禁",
  "本语言": "本語言",
  "自检清单": "自檢清單",
  "提交前": "提交前",
  "代码关键业务注释": "程式碼關鍵業務註解",
  "保证开发者顺利阅读": "保證開發者順利閱讀",
  "书写原则": "書寫原則",
  "的分工": "的分工",
  "默认": "預設",
  "文档": "文件",
  "注释": "註解",
  "变量": "變數",
  "数组": "陣列",
  "对象": "物件",
  "函数": "函數",
  "异步": "非同步",
  "项目": "專案",
  "仓库": "倉庫",
  "文件": "檔案",
};

write("zh-TW", applyMap(zh, s2t));

function wrapLocalized(meta, enBody) {
  const idx = enBody.indexOf("\n## 1. ");
  const rest = idx >= 0 ? enBody.slice(idx + 1) : enBody;
  return meta.trim() + "\n\n---\n\n" + rest.trim();
}

const metas = {
  ru: `---
description: Фронтенд-инженерия и стандарты кода (Vue / React / Next.js / UniApp, TS first, multi-end · puffseed)
globs: ["**/*.vue", "**/*.nvue", "**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx", "**/pages.json", "**/manifest.json", "src/**/*.html", "**/*.less", "**/*.scss", "src/**/*.css", "**/*.module.css"]
alwaysApply: false
---

<!-- !!! Стандарты кода · puffseed -->

# Фронтенд-стандарты кодирования (инженерия и реализация) · puffseed

**Бренд**:**puffseed** — спецификация для продуктового фронтенда **puffseed** и родственных VibeCoding-проектов. Маркер **puffseed** обязателен в доменных именах, комментариях и брендовых текстах превью.

**Роль репозитория**:**project-coding-rules-file** задаёт и распространяет **AI-читаемые правила**; этот файл ограничивает **инженерную реализацию и качество кода**. **Процесс AI-коллаборации и гранулярность изменений** → **\`rules/CodeConduct/CodeConduct-Zh-CN.md\`**. **Семантика визуала и Token** → соседний **\`DESIGN.md\`**. При совместном применении побеждает **утверждённая дизайн-система продуктового репозитория**.

**Фреймворки**: Vue 2 / Vue 3, React 18+, **Next.js** (App Router / Pages Router), **UniApp** (Vue2 / Vue3 + multi-end); поддерживаются legacy Angular 12+.  
**Цели**: браузерный **Web**, **мини-программы / App** (UniApp), **десктоп-оболочки** (Electron / Tauri / CE WebView), **mobile & tablet**. Не заменяет собственные \`AGENTS\` оболочки: \`base\` маршрутов, deep link и security — по **продуктовому репо**.

**Общая база качества** → \`rules/QualityBaseline/QualityBaseline-Zh-CN.md\` (стиль / commit-гейты / слои / API / качество / техдолг / сопровождаемость).

> Ниже — полная инженерная спецификация на английском (термины унифицированы; структура совпадает с zh-CN).`,

  ja: `---
description: フロントエンジニアリングとコード規範（Vue / React / Next.js / UniApp、TS 優先、多端 · puffseed）
globs: ["**/*.vue", "**/*.nvue", "**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx", "**/pages.json", "**/manifest.json", "src/**/*.html", "**/*.less", "**/*.scss", "src/**/*.css", "**/*.module.css"]
alwaysApply: false
---

<!-- !!!コーディング規範 · puffseed -->

# フロントコーディング規範（エンジニアリングと実装）· puffseed

**ブランド**:**puffseed** — **puffseed** 業務フロントおよび同源 VibeCoding プロジェクト向け。ドメイン命名・コメント・プレビューのブランド文案では **puffseed** 識別子を残すこと。

**リポジトリの役割**:**project-coding-rules-file** は **AI 可読のプログラミング規範** を策定・配布する。本ファイルは **エンジニアリング実装とコード品質** を制約する。**AI 協働のプロセスと変更粒度** → **\`rules/CodeConduct/CodeConduct-Zh-CN.md\`**。**視覚とデザイン Token の意味** → 同ディレクトリ **\`DESIGN.md\`**。同時適用時は **業務リポジトリの確定デザインシステム** を優先。

**適用フレームワーク**: Vue 2 / Vue 3、React 18+、**Next.js**（App Router / Pages Router）、**UniApp**（Vue2 / Vue3 + 多端）。Angular 12+ のレガシーも可。  
**適用端**: ブラウザ **Web**、**小プログラム / App**（UniApp）、**デスクトップシェル**（Electron / Tauri / CE WebView）、**モバイル / タブレット**。各シェル独自の \`AGENTS\` は置換しない。\`base\`・ディープリンク・セキュリティは **業務リポジトリ** 準拠。

**共通品質ベースライン** → \`rules/QualityBaseline/QualityBaseline-Zh-CN.md\`（スタイル / 提出ゲート / 層 / API / 品質 / 技術的負債 / 保守性）。

> 以下は完全なエンジニアリング規範本文です（英語。用語統一のため。構成は zh-CN と同一）。`
};

for (const [locale, meta] of Object.entries(metas)) {
  write(locale, wrapLocalized(meta, en));
}

console.log("jsts locales done");
