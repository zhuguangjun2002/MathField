<script setup>
import ConceptPage from '../../components/ConceptPage.vue'
import MathBlock from '../../components/MathBlock.vue'
import MathInline from '../../components/MathInline.vue'
import ResidueDemo from '../../demos/ResidueDemo.vue'
</script>

<template>
  <ConceptPage slug="residue">
    <h2><span class="sec-no">壹</span>困境：物理里到处是算不动的实积分</h2>
    <p>18、19 世纪的物理学家有一抽屉共同的噩梦，长这样：</p>
    <MathBlock tex="\int_0^{\infty} \frac{dx}{1 + x^4}, \qquad \int_0^{\infty} \frac{\cos x}{1 + x^2}\, dx, \qquad \int_0^{\infty} \frac{\sin x}{x}\, dx" />
    <p>
      波的衍射、热的传导、概率的特征函数……处处冒出这类积分。它们的原函数要么写不出初等形式，
      要么求出来也没法代无穷限。<strong>欧拉、拉普拉斯各显神通逐个击破过一些</strong>（换积分次序、引参数求导、
      形式代入虚数……），但全是一题一策的杂技，没有通法，而且常常"算得对却说不清为什么可以这么算"。
    </p>
    <div class="story">
      <div class="story-title">📜 1826 — 1846 年 · 柯西把杂技变成流水线</div>
      <p>
        <strong>柯西</strong>接着上一讲的线索追问：回路里有奇点时，积分到底等于多少？
        1826 年他给这笔账起了名字——résidu（<strong>留数</strong>，字面义"残余物"）：
        函数在奇点附近展开后，唯一"积分积不掉"的那一项的系数。到 1846 年，完整的留数定理成形，
        实积分的攻略从此变成三步流水线：<strong>补一条回路把实轴围起来 → 数圈内奇点的留数 → 乘 2πi</strong>。
        一抽屉的噩梦，变成了口算题。
      </p>
    </div>

    <h2><span class="sec-no">贰</span>破局：奇点附近，只有一项"积不掉"</h2>
    <p>
      在奇点 z₀ 附近，函数虽然炸了，但仍能展开——只是级数得允许<strong>负幂项</strong>（洛朗展开，1843）：
    </p>
    <MathBlock tex="f(z) = \cdots + \frac{a_{-2}}{(z - z_0)^2} + \frac{a_{-1}}{z - z_0} + a_0 + a_1 (z - z_0) + \cdots" />
    <p>沿绕 z₀ 的小圈逐项积分，奇迹出现：<strong>几乎每一项都积出零</strong>。</p>
    <ul>
      <li>非负幂项（a₀、a₁…）：处处解析，柯西定理直接判零；</li>
      <li>
        <MathInline tex="(z-z_0)^{-2}" /> 及更负的幂：它们有原函数（比如 −1/(z−z₀)），绕一圈回到起点，差值为零；
      </li>
      <li>
        唯独 <MathInline tex="\frac{a_{-1}}{z - z_0}" />：它的"原函数"是对数——<strong>多值的</strong>，
        绕一圈辐角加 2π，回不到原值——积出 <MathInline tex="a_{-1} \cdot 2\pi i" />。
      </li>
    </ul>
    <div class="insight">
      <div class="insight-title">💡 核心直觉：留数 = 奇点的"账户余额"</div>
      <p>
        整个无穷级数里，只有 −1 次幂那一项在回路积分下"幸存"，它的系数 a₋₁ 就叫<strong>留数</strong>——
        奇点存的全部账。回路积分于是变成纯粹的记账：<strong>绕一圈 = 把圈内每个奇点的余额加起来、乘 2πi</strong>。
        上一讲"1/z 绕一圈得 2πi"不是特例，是通式的最简样本（它的留数恰是 1）。
        大回路可以在解析区域里自由变形、缩成各奇点旁的小圈——这就是"账目守恒"的几何原因。
      </p>
    </div>

    <h2><span class="sec-no">叁</span>亲手圈奇点</h2>
    <ResidueDemo />

    <h2><span class="sec-no">肆</span>严格定义</h2>
    <div class="definition">
      <div class="def-title">📐 定理（留数定理，柯西 1846）</div>
      <p>
        设 f 在闭回路 Γ 上及其内部除有限个奇点 <MathInline tex="z_1, \dots, z_n" /> 外解析，Γ 逆时针取向，则
      </p>
      <MathBlock tex="\oint_\Gamma f(z)\, dz = 2\pi i \sum_{k=1}^{n} \operatorname{Res}(f, z_k)" />
      <p>
        其中 <MathInline tex="\operatorname{Res}(f, z_k)" /> 为 f 在 z₀ = z_k 处洛朗展开的 a₋₁ 系数；对一阶极点可用
        <MathInline tex="\operatorname{Res}(f, z_0) = \lim_{z \to z_0} (z - z_0) f(z)" /> 直接计算。
      </p>
    </div>
    <p>几处小字都有故事：</p>
    <ul>
      <li>
        <strong>"逆时针取向"</strong>：方向反了差个负号——积分是"带方向的记账"，
        与线代行列式的"定向面积"是同一种讲究；
      </li>
      <li>
        <strong>"有限个奇点"</strong>：奇点若堆积（如 1/sin(1/z) 在原点附近），圈法就失去意义——定理的边界清清楚楚；
      </li>
      <li>
        <strong>2πi 从哪来</strong>：来自"绕一圈辐角走过 2π"——它是圆周的周长（辐角版）。
        物理书里神出鬼没的 2π 因子，十有八九是某个回路积分的这枚指纹；
      </li>
      <li>
        <strong>算例</strong>：<MathInline tex="\int_{-\infty}^{\infty} \frac{dx}{1+x^2}" />。
        用上半平面大半圆补成回路（半圆上的贡献随半径趋无穷而消失），圈内唯一奇点 z = i，留数
        <MathInline tex="\lim_{z\to i}(z-i)\frac{1}{(z-i)(z+i)} = \frac{1}{2i}" />，
        故积分 = <MathInline tex="2\pi i \cdot \frac{1}{2i} = \pi" />。
        与 arctan 的答案一致——但这套流水线对 arctan 失效的积分照样开工。
      </li>
    </ul>

    <h2><span class="sec-no">伍</span>买到了什么：一台实积分收割机，和一个谜底</h2>
    <ul>
      <li>
        <strong>物理与工程的日常</strong>：傅里叶反变换、拉普拉斯反变换的标准算法就是留数
        （数理方程课解出来的答案，很多要靠这一步落地）；量子场论里的传播子积分、
        信号处理里的滤波器分析，围道 + 留数是母语；
      </li>
      <li>
        <strong>概率论的伏笔兑现</strong>：中心极限定理讲提过的特征函数反演，实操就是围道积分——
        柯西分布的密度与其特征函数 <MathInline tex="e^{-|t|}" /> 之间的换算，留数一步到位；
      </li>
      <li>
        <strong>收敛半径之谜正式结案</strong>：泰勒讲的悬案——<MathInline tex="1/(1+x^2)" />
        在实轴上处处光滑，展开却只活在 (−1, 1)。真相：它在 ±i 有极点，
        幂级数的收敛盘<strong>顶到最近奇点为止</strong>，半径 = 到 ±i 的距离 = 1。
        实轴上的"无端翻车"，是复平面上奇点的投影——<strong>"收敛半径"的"半径"，是复平面上一个真实圆盘的半径</strong>；
      </li>
      <li>
        <strong>还剩最后一问</strong>：奇点挡住了幂级数的去路——那函数本身能不能绕过奇点、活到盘外去？
        能。这就是最后一讲：解析延拓。
      </li>
    </ul>
    <div class="insight">
      <div class="insight-title">🔗 与你学过的课程连一连</div>
      <p>
        <strong>微积分</strong>：泰勒展开的收敛半径在此拿到几何解释；反常积分的"主值"概念在围道法里自然出现；
        <strong>概率论</strong>：特征函数反演；<strong>计算数学</strong>：数值求积遇到振荡积分（如 ∫sin x/x）时，
        把路径挪进复平面（最速下降法）常常一举驯服——理论出自本讲，技巧用在数值。
      </p>
    </div>
  </ConceptPage>
</template>
