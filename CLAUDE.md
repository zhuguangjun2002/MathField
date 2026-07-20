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

## 技术栈与结构

Vue 3 + Vite + vue-router（hash 路由）+ KaTeX。动画是手写 Canvas，无第三方图表库。

```
src/data/courses.js        课程/概念元数据（单一事实来源，新增先改这里）
src/components/            MathInline, MathBlock（KaTeX）、RichText（把字符串里 $...$ 交给
                           KaTeX，其余当 HTML；courses.js 的文案字段专用）、
                           DemoFrame（动画卡片框架）、
                           ControlSlider（滑杆）、ConceptPage（概念页统一布局+上下讲导航）
src/demos/plot.js          Canvas 绘图工具：usePlot(自适应+高分屏+watch重绘)、
                           makeView(坐标映射)、makeSquareView(等比例视图，几何/变换类动画必用)、
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
- **渲染给用户看的散文里**（view 的 `<p>`、demo 的 `#note`/`#readout`）：凡出现**带脱字符的指数**
  （`e^(−n²π²τ)`、`e^{...}`）或**带括号的根式**（`√(T/ρ)`）——`^`、括号会原样显示，像坏公式——
  一律改用 `<MathInline>`；demo 组件如未 import 需补 `import MathInline from '../components/MathInline.vue'`
- **保留 Unicode 内联**的两种情形：①简单单字符上下标（`x²`、`n²`、`√2`、`t₀`、`aₙ`）是全站刻意的轻量风格；
  ②canvas 的 `drawLabel`/`yLabel`/`xLabel` 字符串——canvas 画不了 KaTeX，Unicode 是唯一写法

## 常用命令

```bash
npm run dev      # 开发
npx vite build   # 构建验证（改完必跑）
```
