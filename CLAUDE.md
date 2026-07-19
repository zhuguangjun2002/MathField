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
5. **应用与联系** —— 尽量勾连用户学过的课（微积分、线性代数、概率论、复变函数、计算数学；**数学物理方程用户没学过**，讲到时要从零铺垫）

风格类比 3Blue1Brown；语言是中文，正文口吻是"讲给一个会做题的大学毕业生"。

## 技术栈与结构

Vue 3 + Vite + vue-router（hash 路由）+ KaTeX。动画是手写 Canvas，无第三方图表库。

```
src/data/courses.js        课程/概念元数据（单一事实来源，新增先改这里）
src/components/            MathInline, MathBlock（KaTeX）、DemoFrame（动画卡片框架）、
                           ControlSlider（滑杆）、ConceptPage（概念页统一布局+上下讲导航）
src/demos/plot.js          Canvas 绘图工具：usePlot(自适应+高分屏+watch重绘)、
                           makeView(坐标映射)、makeSquareView(等比例视图，几何/变换类动画必用)、
                           drawAxes、plotFn、drawPoint、drawLabel、drawArrow、调色板 C
src/demos/*.vue            每个动画一个组件，套 DemoFrame，控件放 #controls，
                           实时数值放 #readout，说明文字放 #note
src/views/concepts/*.vue   微积分每讲一个页面，套 ConceptPage（传 slug）
src/views/linear-algebra/  线性代数每讲一个页面（同样套 ConceptPage）
docs/course-plans.md       待建课程的详细规划（讲次、动画构想）——新开课先读它
```

## 新增一讲的流程

1. `src/data/courses.js` 登记元数据（slug/title/subtitle/question/era/figures）
2. `src/demos/` 写动画组件（复用 plot.js，参考 RiemannSumDemo.vue 最典型）
3. `src/views/concepts/` 写内容页（参考 LimitView.vue 的结构和样式类）
4. `src/router.js` 加路由
5. 验证：`npx vite build` 必须过；起 dev server 后用无头 Chrome 截图检查渲染
   （`google-chrome --headless=new --no-sandbox --screenshot=... --window-size=1280,4200 --virtual-time-budget=8000 <url>`）

## 新开一门课的流程

1. 先读 `docs/course-plans.md` 里该课的规划（讲次划分、每讲动画构想已写好）
2. `courses.js` 里把该课 `available: false` 改为 true，补 `path`、`concepts` 数组，
   以及课程总览页数据 `intro`（可含 HTML）、`timelineTitle`、`timeline`、`tocNote`
3. 路由、视图目录按已有课程的模式复制（每门课建 `src/views/<course>/` 子目录）
4. CourseView、ConceptPage、顶部导航均已数据驱动（courses.js 是唯一事实来源），无需改组件；
   概念 slug 需全站唯一（conceptContext 按 slug 跨课程查找）

## 样式约定

- 全局样式都在 `src/styles/main.css`，CSS 变量定义配色（暖纸色底、朱红强调、靛蓝定义框）
- 内容页可用的样式类：`.story`（历史故事，金色）、`.definition`（严格定义，靛蓝）、
  `.insight`（直觉/联系，朱红）；正文 `strong` 会自动变朱红
- 动画配色用 plot.js 导出的 `C`：曲线主体用 `C.ink`，重点/可动元素用 `C.accent`，
  目标/参考用 `C.indigo`，辅助标注用 `C.gold`，达标状态用 `C.green`

## 常用命令

```bash
npm run dev      # 开发
npx vite build   # 构建验证（改完必跑）
```
