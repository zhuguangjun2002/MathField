<script setup>
import ConceptPage from '../../components/ConceptPage.vue'
import MathBlock from '../../components/MathBlock.vue'
import MathInline from '../../components/MathInline.vue'
import SecantTangentDemo from '../../demos/SecantTangentDemo.vue'
</script>

<template>
  <ConceptPage slug="derivative">
    <h2><span class="sec-no">壹</span>困境："此刻的速度"是个病句</h2>
    <p>
      伽利略确认了自由落体的规律：下落距离 <MathInline tex="s = 5t^2" />（米，取
      <MathInline tex="g \approx 10\,\text{m/s}^2" />）。求一段时间里的<strong>平均速度</strong>人人都会：
      路程差除以时间差。但 17 世纪的物理学需要回答一个新问题——
      <strong>石头在 t = 1 秒这一个瞬间，速度是多少？</strong>
    </p>
    <p>
      按定义，速度 = 路程 ÷ 时间。可"一瞬间"里，路程是 0，时间也是 0，速度 = 0/0？！
      "瞬时速度"这个词，在当时的数学里根本不合法。同一时期还有另一个几何版本的难题：
      如何求曲线在某点的<strong>切线</strong>？（望远镜镜片的打磨、光线折射的计算都等着它。）
      两个问题殊途同归：都卡在"点"上——一个点定不出斜率，一个瞬间定不出速度。
    </p>
    <div class="story">
      <div class="story-title">📜 1665 年 · 瘟疫成就的奇迹年</div>
      <p>
        伦敦大瘟疫爆发，剑桥停课，23 岁的牛顿回乡下老家躲了 18 个月。就在这段"居家隔离"里，
        他发明了流数术（微积分）、发现了万有引力和光的色散。牛顿把变量看成流动的量（fluent），
        把变化率称为"流数"（fluxion），记作 <MathInline tex="\dot{x}" /> —— 物理学至今还在用这个点记号。
        几乎同时，莱布尼茨在德国独立发明了同样的方法，并留下了更好用的记号
        <MathInline tex="\mathrm{d}y/\mathrm{d}x" />。两人的追随者为"谁先发明"吵了上百年。
      </p>
    </div>

    <h2><span class="sec-no">贰</span>破局：不问"瞬间"，问"逼近的目标"</h2>
    <p>
      解决方案漂亮地绕开了 0/0：<strong>不直接算瞬时速度，而是用一串越来越短的时间段的平均速度去围剿它</strong>。
      [1, 1.1] 秒的平均速度、[1, 1.01] 的、[1, 1.001] 的……这串数肉眼可见地逼近 10 m/s。
      于是干脆<strong>把这个逼近的目标值定义为瞬时速度</strong>。0/0 从未发生——h 一直不是零，
      我们要的只是 h 缩小时差商的极限（这正是上一讲的工具）。
    </p>
    <SecantTangentDemo />
    <p>
      几何上看同一件事：连接曲线上两点的<strong>割线</strong>，当第二个点滑向第一个点时，
      割线转动着趋于一个极限位置——这个极限位置就是<strong>切线</strong>，它的斜率就是导数。
      "瞬时速度"和"切线斜率"原来是同一个数学对象。
    </p>

    <h2><span class="sec-no">叁</span>严格定义</h2>
    <div class="definition">
      <div class="def-title">📐 定义（导数）</div>
      <p>设 f 在 a 的邻域内有定义。若极限</p>
      <MathBlock tex="f'(a) = \lim_{h \to 0} \frac{f(a+h) - f(a)}{h}" />
      <p>
        存在，则称 f 在 a 处<strong>可导</strong>，该极限称为 f 在 a 处的<strong>导数</strong>。
      </p>
    </div>
    <p>几个当年让人（现在让你）困惑的点，其实定义里都写清楚了：</p>
    <ul>
      <li>
        <strong><MathInline tex="\mathrm{d}y/\mathrm{d}x" /> 不是分数，却长得像分数</strong>——
        它是差商 <MathInline tex="\Delta y / \Delta x" /> 取极限后的整体记号。莱布尼茨故意设计成分数的样子，
        因为它在链式法则、换元积分里"约分"起来太顺手了。好记号是生产力；
      </li>
      <li>
        <strong>导数本身又是函数</strong>：每一点 a 都对应一个数 f′(a)，于是 f′ 是个新函数，
        还可以继续求导得 f″ —— 加速度就是位置的二阶导数；
      </li>
      <li>
        <strong>可导比连续更苛刻</strong>：|x| 在 0 处连续但左右差商极限不等（±1），切线定不下来。
        尖点、竖直切线处都不可导。
      </li>
    </ul>
    <div class="insight">
      <div class="insight-title">💡 更现代的读法：导数 = 最佳线性近似</div>
      <p>
        把定义变形：<MathInline tex="f(a+h) \approx f(a) + f'(a)\,h" />（误差比 h 更高阶地趋于零）。
        意思是：<strong>在显微镜下，任何可导函数局部都是直线</strong>，f′(a) 就是那条直线的斜率。
        "微分 <MathInline tex="\mathrm{d}y = f'(x)\mathrm{d}x" />"说的就是这个线性近似。
        这个观点比"切线斜率"走得更远——多元函数的全微分、雅可比矩阵（线性代数登场！），
        都是"局部用线性函数冒充自己"这一思想的推广。
      </p>
    </div>

    <h2><span class="sec-no">肆</span>应用：只要有"变化率"，就有导数</h2>
    <ul>
      <li>
        <strong>物理</strong>：速度是位置对时间的导数，加速度是速度的导数，电流是电荷量的导数，
        功率是做功的导数——物理定律天然用导数写成（牛顿第二定律
        <MathInline tex="F = m\ddot{x}" /> 就是个微分方程）；
      </li>
      <li>
        <strong>求极值（费马 1629，比牛顿还早）</strong>：山顶处切线必水平，所以极值点满足
        <MathInline tex="f'(x) = 0" />。今天所有优化问题——从利润最大化到机器学习的梯度下降——
        都从这一句出发；
      </li>
      <li>
        <strong>牛顿迭代法（你计算数学的老朋友）</strong>：解方程 f(x)=0 时，
        在猜测点处用切线冒充曲线，切线与 x 轴的交点就是更好的猜测：
        <MathInline tex="x_{n+1} = x_n - f(x_n)/f'(x_n)" /> —— 这正是"局部线性近似"思想的直接兑现；
      </li>
      <li>
        <strong>经济学</strong>：边际成本、边际收益，就是成本函数、收益函数的导数——
        "边际"是"导数"的经济学方言。
      </li>
    </ul>
  </ConceptPage>
</template>
