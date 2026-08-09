# 主题规范

> **权威源**：本文件用于维护 `SystemVariable.css`、`ThemeVariable.css`。  
> **维护方式**：先在下方表格中修改场景 / 变量 / 值，再对 Agent 说：  
> 「根据这个 `SubjectAuthority.md` 对 `SystemVariable.css`、`ThemeVariable.css` 进行更新同步」。  
> **完整说明**（团队换肤、扩展套件、推荐话术）见同目录 [`README.md`](./README.md)。

## 一、系统变量

### 1.1 元素尺寸

|场景名称|尺寸|变量|
|---|---|---|
|清空元素|0px|--size-0|
|边框线|0.5px|--size-line|
|常规线|1px|--size-1|
|强关联|4px|--size-4|
|非关联|6px|--size-6|
|元素间距|8px|--size-8|
|列间距|12px|--size-12|
|栏目间距|16px|--size-16|
|内容边距|20px|--size-20|
|模块间距|24px|--size-24|
|标语间距|30px|--size-30|
|卡片列表间距|32px|--size-32|
|页面边距|40px|--size-40|
|单元间距|48px|--size-48|
|页头高度|56px|--size-56|
|圆角、页脚高度|100px|--size-100|

### 1.2 图标尺寸

|场景名称|尺寸|变量|
|---|---|---|
|提示图标|12px|--wh-12|
|字体图标|16px|--wh-16|
|表格图标|20px|--wh-20|
|卡片小图标操作|24px|--wh-24|
|常用按钮、大图标操作|32px|--wh-32|

### 1.3 字体（字阶 + 行高强制成对）

> 凡使用 `--fs-*`，必须同步设置同行对应的 `--lh-*`；禁止只设字阶或错配行高。

|场景名称|尺寸|字阶变量|行高变量|
|---|---|---|---|
|辅助文字：表单提示文字、标签文字|12px|--fs-12|--lh-20|
|正文：段落文本、列表内容|14px|--fs-14|--lh-22|
|小标题：卡片标题、表单分组标题|16px|--fs-16|--lh-24|
|大标题：页面主标题|20px|--fs-20|--lh-28|
|特大标题：登录页标题、欢迎页标题|24px|--fs-24|--lh-32|
|超大标题：首页Banner标题|30px|--fs-30|--lh-38|
|巨大标题：活动/营销主视觉|38px|--fs-38|--lh-46|
|展示标题：数据大屏展示标题|46px|--fs-46|--lh-54|
|展示标题：数据大屏主标题|56px|--fs-56|--lh-64|
|展示标题：数据大屏超大标题|68px|--fs-68|--lh-76|

### 1.4 边框线

|场景名称|值|变量|
|---|---|---|
|基础实线|solid 0.5px var(--border)|--line|
|常规实线|solid 1px var(--border)|--solid|
|常规虚线|dashed 2px var(--border)|--dashed|

### 1.5 阴影

|场景名称|值|变量|
|---|---|---|
|基础阴影|0 6px 10px 0 rgba(0, 0, 0, 0.08), 0 0 1px 0 rgba(0, 0, 0, 0.15)|--shadow|
|上阴影|0px -20px 40px 0px rgba(0, 0, 0, 0.06)|--shadow-top|
|下阴影|0px 20px 40px 0px rgba(0, 0, 0, 0.06)|--shadow-bottom|
|左阴影|-20px 0px 40px 0px rgba(0, 0, 0, 0.06)|--shadow-left|
|右阴影|20px 0px 40px 0px rgba(0, 0, 0, 0.06)|--shadow-right|

## 二、主题变量

### 2.1 标准色

|场景名称|颜色|变量|
|---|---|---|
|主题色|#1890ff|--primary|
|悬停色|#40a9ff|--primary-hover|
|激活色|#2d85e4|--primary-active|
|背景色|#e9f3ff|--primary-bg|
|边框色|#bad0f8|--primary-border|

### 2.2 功能色 - 成功色

|场景名称|颜色|变量|
|---|---|---|
|成功色|#22bd14|--success|
|悬停色|#23cf13|--success-hover|
|激活色|#15af07|--success-active|
|背景色|#e8f5e9|--success-bg|
|边框色|#c8e6c9|--success-border|

### 2.3 功能色 - 警告色

|场景名称|颜色|变量|
|---|---|---|
|警告色|#eba51b|--warning|
|悬停色|#fab120|--warning-hover|
|激活色|#db9200|--warning-active|
|背景色|#fff3e0|--warning-bg|
|边框色|#ffe0b2|--warning-border|

### 2.4 功能色 - 信息色

|场景名称|颜色|变量|
|---|---|---|
|信息色|#9c9c9c|--info|
|悬停色|#BBBBBB|--info-hover|
|激活色|#E4E4E8|--info-active|
|背景色|#F2F2F6|--info-bg|
|边框色|#e4e4e4|--info-border|

### 2.5 功能色 - 错误色

|场景名称|颜色|变量|
|---|---|---|
|错误色|#f05e45|--error|
|悬停色|#fa755e|--error-hover|
|激活色|#eb3939|--error-active|
|背景色|#fbe9e7|--error-bg|
|边框色|#ffc9b8|--error-border|

### 2.6 辅助色

|场景名称|颜色|变量|
|---|---|---|
|悬停色|#F0F1F2|--hover|
|边框色|#e4e5e7|--border|
|分隔线|#f0f0f0|--divider|
|背景色|#f3f4f6|--bg|
|白色|#ffffff|--white|
|黑色|#000000|--black|

### 2.7 文本色 - 浅色背景

|场景名称|颜色|变量|
|---|---|---|
|标题|#262626|--title|
|主要文本|#595959|--main-text|
|次要文本|#8c8c8c|--secondary-text|
|禁用文本|#bfbfbf|--disabled-text|

### 2.8 文本色 - 深色背景

|场景名称|颜色|变量|
|---|---|---|
|标题|#d9d9d9|--title-dark|
|主要文本|#a6a6a6|--main-text-dark|
|次要文本|#737373|--secondary-text-dark|
|禁用文本|#4d4d4d|--disabled-text-dark|
