<script setup>
import ConceptPage from '../../components/ConceptPage.vue'
import MathBlock from '../../components/MathBlock.vue'
import MathInline from '../../components/MathInline.vue'
import RevealBox from '../../components/RevealBox.vue'
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
        <strong>最美的意外（通向复变函数）</strong>：把 <MathInline tex="e^x" /> 的级数里每个 x
        大胆换成虚数 <MathInline tex="i\theta" />，再把结果按"带不带 i"分成两堆，会撞出这个等式：
      </li>
    </ul>
    <MathBlock tex="e^{i\theta} = \cos\theta + i\sin\theta" />
    <p>
      指数函数与三角函数——一个来自复利、一个来自几何——竟是同一枚硬币的两面（欧拉 1748）。
      取 <MathInline tex="\theta = \pi" /> 就得到 <MathInline tex="e^{i\pi} + 1 = 0" />。
    </p>
    <RevealBox
      title="🧮 这一步到底怎么算出来的？（顺便回答：它算推导，还是算定义）"
      label="看逐项整理的全过程（含那个必须交代的漏洞）"
      close-label="收起这段推导"
    >
      <template #hint>
        先自己试三分钟：把 <MathInline tex="e^x" /> 的级数里每个 x 换成 <MathInline tex="i\theta" />，
        用 <MathInline tex="i^2 = -1" /> 逐项化简，再把带 i 的项和不带 i 的项分成两堆，
        看看这两堆各自像什么。
      </template>
      <p>
        <strong>① 先把三张底牌摆上桌</strong>——都是本讲那条
        <MathInline tex="c_k = f^{(k)}(0)/k!" /> 现算出来的，没有新东西：
      </p>
      <MathBlock tex="\begin{aligned} e^x &= 1 + x + \frac{x^2}{2!} + \frac{x^3}{3!} + \frac{x^4}{4!} + \frac{x^5}{5!} + \cdots \\ \cos x &= 1 \phantom{{}+ x} - \frac{x^2}{2!} \phantom{{}+ \frac{x^3}{3!}} + \frac{x^4}{4!} - \cdots \\ \sin x &= \phantom{1 + {}} x \phantom{{}+ \frac{x^2}{2!}} - \frac{x^3}{3!} \phantom{{}+ \frac{x^4}{4!}} + \frac{x^5}{5!} - \cdots \end{aligned}" />
      <p>
        这样竖着摆是为了看清一件事：<strong>cos 只占偶次项，sin 只占奇次项，
        两人加起来刚好铺满 <MathInline tex="e^x" /> 的所有项</strong>，一个不多一个不少。
        这个"分工"就是下面能对上号的全部原因。
      </p>
      <p>
        <strong>② i 的幂四步一循环</strong>——魔术的机械部分只有这一条：
      </p>
      <MathBlock tex="i^0 = 1, \quad i^1 = i, \quad i^2 = -1, \quad i^3 = -i, \quad i^4 = 1, \quad i^5 = i, \ \cdots" />
      <p>
        <strong>③ 代进去，逐项化简</strong>（θ 的幂次一动不动，变的只是前面的系数）：
      </p>
      <MathBlock tex="\begin{aligned} e^{i\theta} &= 1 + i\theta + \frac{(i\theta)^2}{2!} + \frac{(i\theta)^3}{3!} + \frac{(i\theta)^4}{4!} + \frac{(i\theta)^5}{5!} + \cdots \\ &= 1 + i\theta - \frac{\theta^2}{2!} - i\frac{\theta^3}{3!} + \frac{\theta^4}{4!} + i\frac{\theta^5}{5!} - \cdots \end{aligned}" />
      <p>
        系数被 <MathInline tex="1, i, -1, -i" /> 循环"染色"，于是<strong>偶次项一律不带 i、
        奇次项一律带 i</strong>——正好对上 ① 里的那个分工。
      </p>
      <p>
        <strong>④ 按有没有 i 分成两堆</strong>：
      </p>
      <MathBlock tex="e^{i\theta} = \underbrace{\left(1 - \frac{\theta^2}{2!} + \frac{\theta^4}{4!} - \cdots\right)}_{\cos\theta} + i\,\underbrace{\left(\theta - \frac{\theta^3}{3!} + \frac{\theta^5}{5!} - \cdots\right)}_{\sin\theta}" />
      <p>
        两堆抬头一看，正是 ① 里 cos 与 sin 的级数，<strong>连正负号都分毫不差</strong>：
        偶次项的系数按 <MathInline tex="i^0, i^2, i^4, \ldots = +, -, +, \ldots" /> 排列，
        这恰好是 cos 级数的符号规律；奇次项同理给出 sin。
        <strong>欧拉公式的全部内容，就是这一次分堆。</strong>
      </p>
      <p>
        <strong>⑤ 现在补那个漏洞：凭什么能把虚数代进一个为实数造的级数？</strong>
        严格说<strong>不能</strong>——在实分析里 <MathInline tex="e^{i\theta}" /> 根本还没有意义，
        "代入"等于给一个尚未定义的符号强行赋值。所以正规做法是<strong>把整件事倒过来</strong>：
        不去"推导"，而是直接把这条级数<strong>当作定义</strong>——
      </p>
      <MathBlock tex="e^{z} \;:=\; 1 + z + \frac{z^2}{2!} + \frac{z^3}{3!} + \cdots \qquad (z\ \text{为任意复数})" />
      <p>
        这个定义站得住脚：各项的模是 <MathInline tex="|z|^k/k!" />，加起来就是收敛的实级数
        <MathInline tex="e^{|z|}" />，所以它对每个复数都绝对收敛；而且逐项求导仍得自己、
        相乘仍满足 <MathInline tex="e^{z+w} = e^z e^w" />，
        是实指数函数<strong>唯一</strong>不别扭的推广（这就是复变里
        <router-link to="/complex/continuation">解析延续</router-link>的头一个例子）。
        定义这么一落，<strong>欧拉公式立刻降格为 ③④ 两步的算术结论</strong>，不再需要任何胆量。
        换句话说：欧拉当年"大胆代入"欠的账，是后人用定义替他补上的。
      </p>
      <p>
        <strong>⑥ 自查两下再走</strong>：取 <MathInline tex="\theta = 0" /> 得
        <MathInline tex="e^{0} = 1" />，对得上；算模长
        <MathInline tex="|e^{i\theta}|^2 = \cos^2\theta + \sin^2\theta = 1" />，
        说明 <MathInline tex="e^{i\theta}" /> 永远落在单位圆上——所以乘它"只转不伸缩"，
        与<router-link to="/complex/imaginary">复变函数 · 虚数的诞生</router-link>里
        "乘法即旋转"那句话严丝合缝。
      </p>
    </RevealBox>
    <p>
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
