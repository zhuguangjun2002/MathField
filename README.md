# 数学的来龙去脉

一个把数学概念的**历史动机**讲清楚的网站：每个概念按
「历史困境 → 为什么发明 → 交互动画 → 严格定义 → 应用与联系」展开，
配手写 Canvas 交互动画帮助建立直觉。

## 运行

```bash
npm install     # 首次
npm run dev     # 开发服务器，浏览器打开提示的地址
npm run build   # 构建到 dist/
npm run preview # 预览构建产物
```

## 技术栈

- Vue 3 + Vite + vue-router（hash 路由）
- KaTeX 渲染数学公式（`MathInline` / `MathBlock` 组件）
- 交互动画为手写 Canvas 组件，公共绘图工具在 `src/demos/plot.js`

## 目录结构

```
src/
  data/courses.js        课程与概念元数据（单一事实来源，课程页/导航/上下讲全由它驱动）
  components/            公式渲染、演示卡片框架、滑杆、概念页布局
  demos/                 各概念的 Canvas 交互动画 + plot.js 绘图工具
  views/                 首页、课程总览页（数据驱动，多课程共用）
  views/concepts/        微积分各讲页面
  views/linear-algebra/  线性代数各讲页面
  views/probability/     概率论各讲页面
  views/complex/         复变函数各讲页面
  views/mathphys/        数学物理方程各讲页面
```

## 已完成 / 计划

- [x] 微积分（5 讲）：极限、导数、积分、微积分基本定理、泰勒展开
- [x] 线性代数（5 讲）：消元法、行列式、矩阵与线性变换、向量空间、特征值
- [x] 概率论（5 讲）：点数分配、贝叶斯、随机变量与分布、大数定律、中心极限定理
- [x] 复变函数（5 讲）：虚数的诞生、复可导、柯西积分定理、留数定理、解析延拓
- [x] 数学物理方程（5 讲）：偏微分预备、波动方程、热传导与傅里叶、拉普拉斯方程、分离变量法

**五门课共 25 讲全部上线。**各课程的详细规划（讲次划分、每讲的困境/动画构想/课程间联系）见
[`docs/course-plans.md`](docs/course-plans.md)。

## 其他文档

- [`CLAUDE.md`](CLAUDE.md) —— 开发工作指引：内容五段式风格约定、目录结构、
  新增一讲/新开一门课的流程、样式与动画配色约定、验证方法
- [`docs/course-plans.md`](docs/course-plans.md) —— 各课程的完整蓝图与上线进度

## 新增一讲的步骤

1. 在 `src/data/courses.js` 对应课程的 concepts 数组里登记元数据；
2. 在 `src/demos/` 写动画组件（用 `usePlot` + `makeView` 等工具；
   几何/变换类用 `makeSquareView` 保持等比例，模拟类用 `rng(seed)` 保证可复现）；
3. 在 `src/views/<课程目录>/` 写内容页（套 `ConceptPage` 布局）；
4. 在 `src/router.js` 加路由。
