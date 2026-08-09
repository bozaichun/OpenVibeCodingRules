# 界面文案多语言（README.html）

本目录位于仓库根目录，仅保留 README.html **界面** i18n。

规范文档语种文件位置：

| 内容 | 位置 |
|------|------|
| 智能体入口 | `AGENTS.md` |
| AGENTS 译文 | `rules/AGENTS/AGENTS.<locale>.md` |
| 说明入口 | `README.md`（含语种切换） |
| README 译文 | `rules/README/README-{Tag}.md` |
| CodeConduct | `rules/CodingSpec/CodeConduct/CodeConduct-{Tag}.md` |
| QualityBaseline | `rules/QualityBaseline/QualityBaseline-{Tag}.md` |
| CodingSpec | `rules/CodingSpec/<语言>/CodingSpec-{Tag}.md` |

Tag：`Zh-CN` · `Zh-TW` · `En` · `Ja` · `Ru`（由 `AGENTS.md` 按协作语种解析）。

## 维护

```bash
node script/sync-md-locales.js
node script/build-md-bundle.js
```
