<script setup>
import ConceptPage from '../../components/ConceptPage.vue'
import MathBlock from '../../components/MathBlock.vue'
import MathInline from '../../components/MathInline.vue'
import TaylorDemo from '../../demos/TaylorDemo.vue'
</script>

<template>
  <ConceptPage slug="taylor">
    <h2><span class="sec-no">壹</span>困境：sin 0.3 到底是怎么算出来的？</h2>
    <p>
      人类的双手（以及计算机的电路）只会四则运算。多项式只用加减乘，所以能直接算；可
      <MathInline tex="\sin x" />、<MathInline tex="e^x" />、<MathInline tex="\ln x" />
      这些"超越函数"呢？几百年来天文和航海离不开三角函数表与对数表，
      而造表人手里并没有 sin 键。<strong>唯一的出路：找一个多项式来"冒充"目标函数</strong>——
      冒充得够像，算多项式就等于算函数。
    </p>

    <h2><span class="sec-no">贰</span>思路：一层一层地模仿导数</h2>
    <p>怎样让多项式 P 在 x = 0 附近长得像 f？让它们的"各阶信息"逐层对齐：</p>
    <ul>
      <li><strong>0 阶</strong>：起点一样高，<MathInline tex="P(0) = f(0)" /> —— 水平线；</li>
      <li><strong>1 阶</strong>：起步方向一样，<MathInline tex="P'(0) = f'(0)" /> —— 这就是切线；</li>
      <li><strong>2 阶</strong>：弯曲程度一样，<MathInline tex="P''(0) = f''(0)" /> —— 抛物线开始"抱"住曲线；</li>
      <li><strong>逐层加码</strong>……模仿的导数阶数越多，贴合得越久。</li>
    </ul>
    <p>
      设 <MathInline tex="P(x) = c_0 + c_1 x + c_2 x^2 + \cdots" />，对它反复求导再代入 x = 0，
      会发现第 k 项系数被唯一锁定为 <MathInline tex="c_k = f^{(k)}(0)/k!" />
      （那个 k! 来自 <MathInline tex="x^k" /> 被求导 k 次落下的连乘）。
      系数不是猜的，是<strong>被"逐层模仿导数"这个要求逼出来的</strong>。
    </p>
    <TaylorDemo />

    <h2><span class="sec-no">叁</span>严格定义</h2>
    <div class="definition">
      <div class="def-title">📐 泰勒公式（带拉格朗日余项）</div>
      <p>若 f 在含 x₀ 的区间上 n+1 阶可导，则</p>
      <MathBlock
        tex="f(x) = \sum_{k=0}^{n} \frac{f^{(k)}(x_0)}{k!}(x - x_0)^k + \underbrace{\frac{f^{(n+1)}(\xi)}{(n+1)!}(x - x_0)^{n+1}}_{\text{余项 } R_n}"
      />
      <p>
        其中 ξ 介于 x₀ 与 x 之间。x₀ = 0 的特例叫麦克劳林公式。
      </p>
    </div>
    <p>
      <strong>余项 Rₙ 才是定理的灵魂</strong>——它精确回答"冒充得有多像"。
      对 sin x，余项以 <MathInline tex="|x|^{n+1}/(n+1)!" /> 为界，而阶乘增长碾压一切幂，
      所以阶数够高时误差要多小有多小：这就是计算器的实际算法
      （先用周期性把 x 折到 0 附近，再算七八项多项式，误差就低于浮点精度了）。
      但"冒充"并不总能得逞——你在动画里已经看到 ln(1+x) 在 |x| &gt; 1 处的溃败：
      每个幂级数都有自己的<strong>收敛半径</strong>，出了圈，加再多项也无济于事。
    </p>

    <h2><span class="sec-no">肆</span>应用：现代分析的瑞士军刀</h2>
    <ul>
      <li>
        <strong>近似计算与物理建模</strong>：<MathInline tex="\sin x \approx x" />（单摆方程由此变成简谐振动）、
        <MathInline tex="(1+x)^\alpha \approx 1 + \alpha x" />（相对论低速展开回牛顿力学）——
        物理学里遍地都是"泰勒展开取前两项"；
      </li>
      <li>
        <strong>算极限</strong>：<MathInline tex="\lim_{x \to 0} \frac{\sin x - x}{x^3}" />
        这类题，把 <MathInline tex="\sin x = x - x^3/6 + o(x^3)" /> 一代，答案 −1/6 立现——
        比洛必达法则更快也更不容易错，这就是"等价无穷小替换"背后的真相；
      </li>
      <li>
        <strong>数值方法（计算数学的根）</strong>：欧拉法解常微分方程是"展开保留一阶"，
        龙格–库塔是"凑出更高阶"；有限差分格式的精度阶数，全靠泰勒展开来分析——
        你计算数学课上的误差估计，几乎都是泰勒公式的应用题；
      </li>
      <li>
        <strong>最美的意外（通向复变函数）</strong>：把三个展开式摆在一起，在
        <MathInline tex="e^x" /> 中大胆代入虚数 <MathInline tex="x = i\theta" />，逐项整理：
      </li>
    </ul>
    <MathBlock tex="e^{i\theta} = \cos\theta + i\sin\theta" />
    <p>
      指数函数与三角函数——一个来自复利、一个来自几何——竟是同一枚硬币的两面（欧拉 1748）。
      取 <MathInline tex="\theta = \pi" /> 就得到 <MathInline tex="e^{i\pi} + 1 = 0" />。
      而"收敛半径为什么叫半径"的谜底也在复平面上：ln(1+x) 的级数在 x = −1 处撞上奇点，
      于是以原点为心、奇点距离为半径的<strong>圆</strong>之外全部失效——实轴上看是个区间，
      复平面上看才是真正的圆。你学过的复变函数，正是泰勒级数的老家。
    </p>
    <div class="insight">
      <div class="insight-title">🔗 五讲的终点，也是下一段旅程的起点</div>
      <p>
        极限给了我们安全使用无穷的语言；导数和积分用它回答了"多陡"与"多大"；
        基本定理证明二者互逆；泰勒展开则把一切光滑函数化归为多项式。
        沿着这条路继续走：多元微积分（线性代数接管局部近似）、微分方程（数学物理方程的正门）、
        复变函数（幂级数的完全体）——欢迎随时回来，这个网站会继续陪你把它们一一讲清楚。
      </p>
    </div>
  </ConceptPage>
</template>
