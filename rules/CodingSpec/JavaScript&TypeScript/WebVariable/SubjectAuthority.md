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
|圆角|100px|--size-100|

### 1.2 图标尺寸

|场景名称|尺寸|变量|
|---|---|---|
|提示图标|12px|--wh-12|
|字体图标|16px|--wh-16|
|表格图标|20px|--wh-20|
|卡片操作|24px|--wh-24|
|常用操作|32px|--wh-32|

### 1.3 字体

|场景名称|尺寸|变量|
|---|---|---|
|辅助文字：表单提示文字、标签文字|12px|--fs-12|
|正文：段落文本、列表内容|14px|--fs-14|
|小标题：卡片标题、表单分组标题|16px|--fs-16|
|中标题：页面区域标题、模块标题|18px|--fs-18|
|大标题：页面主标题|20px|--fs-20|
|特大标题：登录页标题、欢迎页标题|24px|--fs-24|
|超大标题：首页Banner标题|30px|--fs-30|
|展示标题：数据大屏展示标题|46px|--fs-46|
|展示标题：数据大屏主标题|56px|--fs-56|
|展示标题：数据大屏超大标题|68px|--fs-68|

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

|场景名称|变量|颜色|
|---|---|---|
|主题色|--primary|#1890ff|
|悬停色|--primary-hover|#40a9ff|
|激活色|--primary-active|#2d85e4|
|背景色|--primary-bg|#e9f3ff|
|边框色|--primary-border|#bad0f8|

### 2.2 功能色 - 成功色

|场景名称|变量|颜色|
|---|---|---|
|成功色|--success|#22bd14|
|悬停色|--success-hover|#23cf13|
|激活色|--success-active|#15af07|
|背景色|--success-bg|#e8f5e9|
|边框色|--success-border|#c8e6c9|

### 2.3 功能色 - 警告色

|场景名称|变量|颜色|
|---|---|---|
|警告色|--warning|#eba51b|
|悬停色|--warning-hover|#fab120|
|激活色|--warning-active|#db9200|
|背景色|--warning-bg|#fff3e0|
|边框色|--warning-border|#ffe0b2|

### 2.4 功能色 - 信息色

|场景名称|变量|颜色|
|---|---|---|
|信息色|--info|#9c9c9c|
|悬停色|--info-hover|#BBBBBB|
|激活色|--info-active|#E4E4E8|
|背景色|--info-bg|#F2F2F6|
|边框色|--info-border|#e4e4e4|

### 2.5 功能色 - 错误色

|场景名称|变量|颜色|
|---|---|---|
|错误色|--error|#f05e45|
|悬停色|--error-hover|#fa755e|
|激活色|--error-active|#eb3939|
|背景色|--error-bg|#fbe9e7|
|边框色|--error-border|#ffc9b8|

### 2.6 辅助色

|场景名称|变量|颜色|
|---|---|---|
|悬停色|--hover|#F0F1F2|
|边框色|--border|#e4e5e7|
|分隔线|--divider|#f0f0f0|
|背景色|--bg|#f3f4f6|
|白色|--white|#ffffff|
|黑色|--black|#000000|

### 2.7 文本色 - 浅色背景

|场景名称|变量|颜色|
|---|---|---|
|标题|--title|#262626|
|主要文本|--main-text|#595959|
|次要文本|--secondary-text|#8c8c8c|
|禁用文本|--disabled-text|#bfbfbf|

### 2.8 文本色 - 深色背景

|场景名称|变量|颜色|
|---|---|---|
|标题|--title-dark|#d9d9d9|
|主要文本|--main-text-dark|#a6a6a6|
|次要文本|--secondary-text-dark|#737373|
|禁用文本|--disabled-text-dark|#4d4d4d|
