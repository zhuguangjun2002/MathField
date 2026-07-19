<script setup>
import ConceptPage from '../../components/ConceptPage.vue'
import MathBlock from '../../components/MathBlock.vue'
import MathInline from '../../components/MathInline.vue'
import PathIntegralDemo from '../../demos/PathIntegralDemo.vue'
</script>

<template>
  <ConceptPage slug="cauchy-integral">
    <h2><span class="sec-no">壹</span>困境：路径千万条，积分值听谁的</h2>
    <p>
      实数轴上的定积分 <MathInline tex="\int_a^b" /> 没有歧义：从 a 到 b 只有一条路。
      复平面上麻烦来了：从 A 到 B 有<strong>无穷多条路径</strong>，积分
      <MathInline tex="\int_\Gamma f(z)\,dz" /> 得沿着指定的曲线 Γ 算。
      于是一个尴尬的问题横在所有人面前：<strong>换条路径，积分值变不变？</strong>
    </p>
    <p>
      若积分值依赖路径，复积分就是一门"曲线簿记学"，每条路各记各账，理论价值有限；
      若不依赖路径，那"从 A 积到 B"就是良定义的——整套微积分基本定理的框架才搬得过来。
      18 世纪的欧拉、拉普拉斯已经在用"换路径算积分"的技巧偷偷解实积分（算得对，但不知道为什么对），
      这门"实验数学"急需一个定理来兜底。
    </p>
    <div class="story">
      <div class="story-title">📜 1814 — 1825 年 · 柯西的兜底定理</div>
      <p>
        <strong>柯西</strong>1814 年的论文还在小心翼翼地把复积分拆成两个实的线积分处理；
        到 1825 年《关于积分限为虚数的定积分的报告》，他给出了干净的断言：
        <strong>被积函数在回路内处处解析，则回路积分为零</strong>。
        （后来古萨在 1900 年去掉了"导数连续"的多余假设，所以教科书叫"柯西-古萨定理"。）
        有趣的是柯西本人对"复数是什么"长期心存疑虑——他建大厦时，地基的哲学问题还没解决。
      </p>
    </div>

    <h2><span class="sec-no">贰</span>破局：回路积分为零 ⟺ 路径无关</h2>
    <p>先看两句话怎么等价：两条同起终点的路径 Γ₁、Γ₂，正走 Γ₁ 再倒走 Γ₂ 就拼成一条闭合回路。所以</p>
    <MathBlock tex="\oint f\,dz = 0 \ \text{（一切回路）} \quad\Longleftrightarrow\quad \int_{\Gamma_1} f\,dz = \int_{\Gamma_2} f\,dz \ \text{（同端点的一切路径）}" />
    <p>
      为什么解析函数的回路积分是零？把 <MathInline tex="f\,dz" /> 拆开写成两个实线积分，
      套格林公式（微积分的老朋友：回路积分 = 内部旋度的面积分），被积项恰好是柯西-黎曼方程的左右两边之差——
      <strong>逐点为零</strong>。上一讲的"局部旋转伸缩"约束，在积分层面兑现为"整体无账可记"。
    </p>
    <div class="insight">
      <div class="insight-title">💡 核心直觉：无源的场，绕一圈白绕</div>
      <p>
        把解析函数想成一种"无源无旋的流"：柯西-黎曼方程保证它在每一点既不冒水也不打旋。
        沿闭合回路积分，就是沿途"收集流量"——场里没有源头，<strong>绕一圈收支必然平衡</strong>。
        这与重力场做功只看高度差是同一个逻辑。而一旦回路里包进一个<strong>奇点</strong>（函数失去解析性的点），
        它就是场里的一眼泉——绕它一圈收集到的账不再是零。奇点是复平面上唯一"存账"的地方。
      </p>
    </div>
    <p>
      奇点存的账能精确算出。最重要的样本是 <MathInline tex="f(z) = 1/z" />，绕原点一圈（用
      <MathInline tex="z = e^{i\theta}" /> 参数化）：
    </p>
    <MathBlock tex="\oint \frac{dz}{z} = \int_0^{2\pi} \frac{i e^{i\theta}}{e^{i\theta}}\, d\theta = 2\pi i" />
    <p>
      不管圆多大、甚至不管什么形状，答案永远是 <strong>2πi</strong>——回路可以在不跨奇点的前提下随意变形而不改积分值
      （变形扫过的区域里 f 解析，两条回路之差是零）。这个"变形不变性"，就是下面动画让你亲手玩的东西。
    </p>

    <h2><span class="sec-no">叁</span>亲手变形一条积分路径</h2>
    <PathIntegralDemo />

    <h2><span class="sec-no">肆</span>严格定义</h2>
    <div class="definition">
      <div class="def-title">📐 定理（柯西-古萨积分定理，1825 / 1900）</div>
      <p>
        设 f 在<strong>单连通</strong>区域 D 内解析，Γ 是 D 内任一分段光滑闭合曲线，则
      </p>
      <MathBlock tex="\oint_\Gamma f(z)\, dz = 0" />
    </div>
    <div class="definition">
      <div class="def-title">📐 定理（柯西积分公式，1831）</div>
      <p>设 f 在闭回路 Γ 及其内部解析，z₀ 为 Γ 内任一点，则</p>
      <MathBlock tex="f(z_0) = \frac{1}{2\pi i} \oint_\Gamma \frac{f(z)}{z - z_0}\, dz" />
    </div>
    <p>逐词拆解：</p>
    <ul>
      <li>
        <strong>"单连通"不是官样文章</strong>：它要求区域没有洞。1/z 在圆环区域（挖掉原点）里处处解析，
        回路积分却是 2πi——因为回路绕着洞，没法在区域内缩成一点。拓扑第一次在分析里刷存在感：
        <strong>积分值看的是回路绕了洞几圈</strong>（这个"圈数"观点直通下一讲）；
      </li>
      <li>
        <strong>积分公式是"全息原理"</strong>：只要知道 f 在边界 Γ 上的值，圆内<strong>每一点</strong>的值都被公式定死。
        解析函数没有隐私——边界数据决定内部一切。对比实函数：边界值对内部毫无约束力；
      </li>
      <li>
        <strong>上一讲的奇迹在此结案</strong>：对积分公式里的 z₀ 求导，导数全落在被积函数上——
        <MathInline tex="f^{(n)}(z_0) = \frac{n!}{2\pi i}\oint \frac{f(z)}{(z-z_0)^{n+1}}dz" />，
        想求几阶导就求几阶。<strong>"可导一次就无穷可导"的魔法，机关是导数可以写成积分</strong>；
      </li>
      <li>
        <strong>泰勒级数免费到货</strong>：把公式里的 1/(z−z₀) 按几何级数展开逐项积分，
        就得到 f 的幂级数展开——且收敛半径顶到最近的奇点为止。微积分泰勒讲的"收敛半径之谜"至此拿到完整解释。
      </li>
    </ul>

    <h2><span class="sec-no">伍</span>买到了什么：从"全息"到刘维尔</h2>
    <ul>
      <li>
        <strong>平均值性质</strong>：积分公式取 Γ 为圆、参数化后即知——解析函数在圆心的值等于圆周上值的平均。
        实部虚部都如此，这正是调和函数"每点 = 邻域平均"的来源（数理方程课拉普拉斯方程的核心直觉，提前到账）；
      </li>
      <li>
        <strong>刘维尔定理，一行推出代数基本定理</strong>：全平面解析且有界的函数必是常数
        （用积分公式估计导数，半径推到无穷）。若多项式 p 无根，则 1/p 全平面解析有界 → 常数 → 矛盾——
        上上讲许诺的"n 次方程 n 个根"，被一个积分不等式轻松兑现；
      </li>
      <li>
        <strong>数值反差萌</strong>：理论上积分"只看端点"，数值上沿不同路径算的稳定性可以天差地别——
        计算数学里选积分围道是一门手艺（鞍点法、最速下降路径都靠变形回路）；
      </li>
      <li>
        <strong>唯一的悬念</strong>：回路里有奇点时积分不为零——那到底等于多少？
        1/z 给出 2πi，一般的奇点呢？答案是一套惊人好用的演算，下一讲。
      </li>
    </ul>
    <div class="insight">
      <div class="insight-title">🔗 与你学过的课程连一连</div>
      <p>
        <strong>微积分</strong>：本定理是"微积分基本定理"家族的复平面成员——"内部的累积由边界决定"，
        与牛顿-莱布尼茨（线段）、格林（平面区域）、斯托克斯（曲面）一脉相承；
        <strong>数学物理方程</strong>（预告）：柯西积分公式 ⟺ 调和函数平均值性质 ⟺ 稳态温度分布的物理直觉——
        三门课在同一个事实上会师，到时候回来看这一段。
      </p>
    </div>
  </ConceptPage>
</template>
