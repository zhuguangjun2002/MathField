# CLAUDE.md — 项目工作指引

## 项目是什么

「数学的来龙去脉」：把数学概念的**历史动机**讲清楚的中文网站。
用户会做题但觉得概念懵懂，本站补的是教科书缺的那一环——概念为什么被发明。

## 不可动摇的内容风格（用户明确选择）

每一讲必须按固定五段展开，节标题用 壹/贰/叁/肆/伍 编号：

1. **困境** —— 历史上遇到了什么具体麻烦（讲故事，给年代和人物）
2. **破局/思路** —— 为什么非发明这个概念不可，思想转折在哪
3. **交互动画** —— 不是演示而是论证：让用户拖滑杆亲手"发现"结论
4. **严格定义** —— 教科书定义，逐词拆解为什么这么写
5. **应用与联系** —— 尽量勾连用户学过的课（微积分、线性代数、概率论、复变函数、数值分析；**数学物理方程用户没学过**——本站数理方程课已按零基础写成，勾连它时优先指向站内对应讲，不要假设用户已有课堂背景）。跨课勾连尽量用站内 `<router-link>` 指向对应讲，让伏笔在站内真正兑现

风格类比 3Blue1Brown；语言是中文，正文口吻是"讲给一个会做题的大学毕业生"。

### 不许只给结论（2026-07-25 用户连提五次的同一类问题）

复变第 1 讲一讲之内就被挑出五处，都是同一个毛病：**句子在陈述结果，读者却要的是那一步怎么迈过去的**。
写完每一段自查这几种"跳步"，见一个补一个：

- **等号从天而降**——"邦贝利硬算得 $\sqrt[3]{2+\sqrt{-121}} = 2+\sqrt{-1}$"。补：它是猜形状再立方回去验的，
  写出验算过程，并说清等号的含义是"验算通过"而非"解出来"
- **定义框只有条文**——"复数是有序实数对 $(a,b)$，记作 $a+bi$"。补：为什么改用实数对（动机）、
  $a+bi$ 这个写法是推出来的（实数嵌入 + $i=(0,1)$）、"构成一个域"要用逆元公式兑现
- **形容词代替推导**——"乘法公式不是拍脑袋""倍角和角公式成打掉落""最美的意外"。
  凡是这类夸奖，后面必须紧跟一次真的算给读者看
- **超前引用**——用本讲还没定义的东西（如 $e^{i\theta}$）去解释本讲的结论。要么明说"此处先当缩写、
  凭据在某讲"，要么补上定义
- **甩术语就跑**——"阻抗、相位、乘 ±i 的元件"这种外课黑话，站内又没有任何一讲讲过。
  要么翻译成人话（讲清需要哪几条前提，并说明**不需要**先学一学期那门课），要么删掉

### 长推导默认收起（用 RevealBox）

补上的推导不能一上来就摊开——那等于替读者把思考做完了。超过三四段的推导一律塞进 `RevealBox`：
折叠时只露标题和一句**思考提示**，提示要给一个**能动笔的具体任务**（"把这两个复数乘开，
再想想左边按辐角相加等于什么"），按钮文案写成"对答案 / 看完整拆解"，让读者自己推完再点开核对。
结论本身留在框外，藏起来的只有过程。

## 技术栈与结构

Vue 3 + Vite + vue-router（hash 路由）+ KaTeX。动画是手写 Canvas，无第三方图表库。

```
src/data/courses.js        课程/概念元数据（单一事实来源，新增先改这里）
src/components/            MathInline, MathBlock（KaTeX）、RichText（把字符串里 $...$ 交给
                           KaTeX，其余当 HTML；courses.js 的文案字段专用）、
                           DemoFrame（动画卡片框架）、
                           ControlSlider（滑杆）、ConceptPage（概念页统一布局+上下讲导航）、
                           RevealBox（先思考后揭晓：折叠时只露标题+一句思考提示 hint，
                           点按钮才展开推导；hint 里要写公式就改用 #hint 具名插槽）
src/demos/plot.js          Canvas 绘图工具：usePlot(自适应+高分屏+watch重绘)、
                           makeView(坐标映射)、makeSquareView(等比例视图，几何/变换类动画必用)、
                           makeFitView(等比例且装下指定数据框；配 pad 可把画布切成"原像/像"双面板，
                           两边给同样 span 才不会看起来偷偷缩放)、clipView(双面板必用)、
                           sampleGrid + contourSegments(marching squares 等值线；只发一小段一小段
                           不连折线，故意的——端点可再过一次映射，同一族线就同时画到了两个平面)、
                           drawAxes、plotFn、drawPoint、drawLabel、drawArrow、调色板 C
src/demos/*.vue            每个动画一个组件，套 DemoFrame，控件放 #controls，
                           实时数值放 #readout，说明文字放 #note
src/views/concepts/*.vue   微积分每讲一个页面，套 ConceptPage（传 slug）
src/views/linear-algebra/  线性代数每讲一个页面（同样套 ConceptPage）
src/views/probability/     概率论每讲一个页面；模拟类动画用 plot.js 的 rng(seed) 保证可复现
src/views/complex/         复变函数每讲一个页面（复数运算在各 demo 内手写展开为实虚部）
src/views/mathphys/        数学物理方程每讲一个页面（用户零基础，行文最细、推导放慢）
src/views/numerical/       数值分析每讲一个页面；动画多为可复现的实算（浮点抵消、牛顿迭代、
                           龙格插值、求积、条件数），部分 demo 真用 float64 当场算出误差
docs/course-plans.md       各课程蓝图（讲次、动画构想）——六门课 30 讲已全部上线
```

## 新增一讲的流程

1. `src/data/courses.js` 登记元数据（slug/title/subtitle/question/era/figures）
2. `src/demos/` 写动画组件（复用 plot.js，参考 RiemannSumDemo.vue 最典型）
3. `src/views/concepts/` 写内容页（参考 LimitView.vue 的结构和样式类）
4. `src/router.js` 加路由
5. 验证：`npx vite build` 必须过；起 dev server 后用无头 Chrome 截图检查渲染
   （`google-chrome --headless=new --no-sandbox --screenshot=... --window-size=1280,4200 --virtual-time-budget=8000 <url>`）

## 新开一门课的流程

（原规划五门课 + 后加的数值分析共六门课已全部上线；此流程适用于将来增开新课或补选讲，如复变第 5 讲提过的 ζ 函数短讲。数值分析是范例：不在原 course-plans.md 蓝图里，也照此流程从零建了一门课。）

1. 先读 `docs/course-plans.md` 里该课的规划（讲次划分、每讲动画构想已写好）
2. `courses.js` 里把该课 `available: false` 改为 true，补 `path`、`concepts` 数组，
   以及课程总览页数据 `intro`（可含 HTML）、`timelineTitle`、`timeline`、`tocNote`
   —— courses.js 里凡出现公式，一律写成 `$...$`（LaTeX，JS 字符串里反斜杠要转义成 `\\`），
   不要用 `√` `²` `∫` 这类 Unicode 字符；已接 RichText 的字段：课程 `intro`、
   时间线 `title`/`text`、概念 `subtitle`/`question`
3. 路由、视图目录按已有课程的模式复制（每门课建 `src/views/<course>/` 子目录）
4. CourseView、ConceptPage、顶部导航均已数据驱动（courses.js 是唯一事实来源），无需改组件；
   概念 slug 需全站唯一（conceptContext 按 slug 跨课程查找）

## 样式约定

- 全局样式都在 `src/styles/main.css`，CSS 变量定义配色（暖纸色底、朱红强调、靛蓝定义框）
- 内容页可用的样式类：`.story`（历史故事，金色）、`.definition`（严格定义，靛蓝）、
  `.insight`（直觉/联系，朱红）；正文 `strong` 会自动变朱红
- 动画配色用 plot.js 导出的 `C`：曲线主体用 `C.ink`，重点/可动元素用 `C.accent`，
  目标/参考用 `C.indigo`，辅助标注用 `C.gold`，达标状态用 `C.green`

## 公式书写约定

数学符号在页面上有三种渲染路径，按所在位置选对写法，别混：

- **正式公式**（view 里独立成行或行内的算式）：用 `<MathBlock>` / `<MathInline tex="..." />`（KaTeX）
- **`courses.js` 的文案字段**（intro、时间线 title/text、概念 subtitle/question）：写成 `$...$`，
  由 RichText 交给 KaTeX（JS 字符串里反斜杠转义成 `\\`）
- **渲染给用户看的散文里**（view 的 `<p>`、demo 的 `#note`/`#readout`）：出现下面任一，一律改用
  `<MathInline>`（demo 组件如未 import 需补 `import MathInline from '../components/MathInline.vue'`）：
  ① **带脱字符的指数**（`e^(−n²π²τ)`、`e^{...}`）——`^`、括号会原样显示，像坏公式；
  ② **露出下划线的下标**（`u_xx`、`b_m`、`Z_n`、`z_k`）——同上，且常常同一段里紧挨着的
     `<MathInline tex="u_{xx}" />` 已经排得好好的，对比之下更刺眼；
  ③ **任何根式**（`√n`、`√2`、`√−1`、`√(T/ρ)`）——裸 `√` **没有横线盖住被开方数**，
     `√n` 看着像"√ 和 n 两个字"。
  全站体检：`python3 scripts/scan-math-katex.py`（只扫 `<template>`，已抠掉 Math* 标签与 `{{ }}` 插值；
  剩下报出来的多是刻意保留的 Unicode 大算符与"讨论符号本身"的句子，逐条看一眼即可）
- **保留 Unicode 内联**的两种情形：①简单单字符上下标（`x²`、`n²`、`t₀`、`aₙ`）是全站刻意的轻量风格
  ——**但根号与大算符不在此列**，见上条（2026-07-25 全站散文与 readout 里的裸 `√`、`∫ ∮ ∂`
  已清零，别再引入）；②canvas 的 `drawLabel`/`yLabel`/`xLabel` 字符串——canvas 画不了 KaTeX，
  Unicode 是唯一写法
- **唯一该留裸符号的情形**：句子在**讨论这个符号本身**（"计算器芯片不认识'√'这个符号"、
  "所以才共用一个 `∫` 记号"、"`∂` 这个弯尾巴的 d"）。此外站标那个 `∫` 是 logo，不是公式。

## 读数区（`#readout`）不能超宽

`.demo-readout` 是 `white-space: nowrap` + `overflow-x: auto`：**一超宽就变成横向滚动条**，
右边的内容读者根本不知道存在（曾经偏导数 demo 的"两者之比"被挤出去，而紧接着的 `#note`
正文还写着"读数区里那个比值始终在 1 附近"）。改完 readout（尤其把 Unicode 换成 KaTeX，会变宽）必量：

```bash
node scripts/measure-readout.mjs                      # 全站，1280px 桌面宽，只报溢出的
node scripts/measure-readout.mjs /calculus/derivative  # 单页，逐档 1440→390px
```

目标：**1024px 以上必须为 0，820px 尽量为 0**（640/390 手机宽放不下任何一条读数，是全站通病，暂不处理）。
超宽了怎么办，按这个顺序：① 删冗余前缀与括注（"[t₀, t₀+h] **上的**平均速度"→"[t₀, t₀+h] 平均速度"）；
② 重复结构压缩（"两个 ½ac 三角形（合 ac = 3）"→"½ac 三角形×2 = 3"）；
③ 信息不能删时（如各项配色与画布图块一一对应）**插 `<br>` 断行**——`nowrap` 只挡自动换行，`<br>` 照断。

## 公式块（`MathBlock`）同样不能超宽

`.math-block` 是 `overflow-x: auto`，超宽就只剩一条细滚动条，公式右半截读者看不见
（曾经"用乘积卡住 a、b"那条的 `= ∛125 = 5` 就这么被吃掉过）。新写的推导步骤最容易踩，改完必量：

```bash
node scripts/measure-mathblock.mjs                   # 全站，1280px 桌面宽，只报溢出的
node scripts/measure-mathblock.mjs /calculus/taylor  # 单页，逐档 1440→390px
```

脚本会自动点开页面上所有 `RevealBox`（折叠着的公式否则量不到）。目标同读数区：
**1024px 以上必须为 0，820px 尽量为 0**（640/390 手机宽放不下长公式，全站通病，暂不处理）。
超宽了：① 用 `\begin{aligned}` 按 `&=` 断行；② 把公式尾巴上的中文注释（`\text{（辐角相加）}`）挪回正文；
③ 断不开就拆成两个 MathBlock。另：多条级数竖排对齐时用 `\phantom{...}` 占位，
能让 cos/sin 的项正好落在 $e^x$ 对应幂次的正下方（泰勒讲欧拉公式那段就靠这个才看得出"偶次/奇次分工"）。

## 常用命令

```bash
npm run dev      # 开发
npx vite build   # 构建验证（改完必跑）

# 体检（起 dev server 后跑，读数区/公式块两个脚本默认连 5191 端口：
#   npm run dev -- --port 5191 --strictPort；三个都在 scripts/）
python3 scripts/scan-math-katex.py       # 散文里漏掉 KaTeX 的公式（^ / _ / √ / 大算符）
node scripts/measure-readout.mjs         # demo 读数区横向溢出
node scripts/measure-mathblock.mjs       # 独立成行公式横向溢出（会自动点开 RevealBox）
```
