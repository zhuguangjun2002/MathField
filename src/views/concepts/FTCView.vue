<script setup>
import ConceptPage from '../../components/ConceptPage.vue'
import MathBlock from '../../components/MathBlock.vue'
import MathInline from '../../components/MathInline.vue'
import FTCDemo from '../../demos/FTCDemo.vue'
</script>

<template>
  <ConceptPage slug="ftc">
    <h2><span class="sec-no">壹</span>困境：按定义算积分，是英雄行为</h2>
    <p>
      上一讲的黎曼和定义漂亮而严格，但拿它<em>计算</em>就是灾难：阿基米德算一个抛物线弓形就足以名垂青史，
      每换一条曲线都得重新发明一套求和技巧。试试按定义算
      <MathInline tex="\int_0^1 x^2 \mathrm{d}x" />：要写出
      <MathInline tex="\sum i^2 = \frac{n(n+1)(2n+1)}{6}" /> 再取极限才得到 1/3。
      要是被积函数换成 <MathInline tex="\sin x" />、<MathInline tex="e^x" /> 呢？
      <strong>面积问题需要一台通用计算机器。</strong>
    </p>

    <h2><span class="sec-no">贰</span>洞见：别盯着一块面积，看面积怎么"生长"</h2>
    <p>
      转机来自一个视角切换：不要问"0 到 1 的面积是多少"，而是<strong>把右端点松开变成变量</strong>——
      设 <MathInline tex="A(x)" /> 是从 0 扫到 x 累积的面积，研究这个<em>面积函数</em>怎么变化。
    </p>
    <p>
      让 x 向右挪一点点 <MathInline tex="\mathrm{d}x" />，面积新增一窄条。窄条近似矩形：
      宽 <MathInline tex="\mathrm{d}x" />，高恰好是当地曲线高度 <MathInline tex="f(x)" />，所以
      <MathInline tex="\mathrm{d}A \approx f(x)\,\mathrm{d}x" />，即
      <MathInline tex="A'(x) = f(x)" />。
      <strong>面积函数的导数，就是曲线本身。</strong>求面积（积分）与求变化率（求导）竟是互逆的操作！
    </p>
    <FTCDemo />

    <h2><span class="sec-no">叁</span>定理与它带来的计算革命</h2>
    <div class="definition">
      <div class="def-title">📐 微积分基本定理</div>
      <p>
        <strong>第一部分</strong>：若 f 连续，则面积函数
        <MathInline tex="A(x) = \int_a^x f(t)\,\mathrm{d}t" /> 可导，且
        <MathInline tex="A'(x) = f(x)" />。
      </p>
      <p>
        <strong>第二部分（牛顿–莱布尼茨公式）</strong>：若 F 是 f 的任意一个原函数（即
        <MathInline tex="F' = f" />），则
      </p>
      <MathBlock tex="\int_a^b f(x)\,\mathrm{d}x = F(b) - F(a)" />
    </div>
    <p>
      第二部分就是那台梦寐以求的通用机器：<strong>算面积不必再切条求和，
      只需逆向查一张求导表</strong>。想算 <MathInline tex="\int_0^1 x^2\mathrm{d}x" />？
      谁的导数是 <MathInline tex="x^2" />？—— <MathInline tex="x^3/3" />。代入两端：
      <MathInline tex="\frac{1}{3} - 0 = \frac{1}{3}" />，两秒钟完成阿基米德级别的工作。
      这就是"积分表"“不定积分技巧"存在的意义：它们都是在<strong>反查求导表</strong>。
    </p>
    <div class="story">
      <div class="story-title">📜 为什么说牛顿和莱布尼茨"发明"了微积分？</div>
      <p>
        切线问题（费马、笛卡尔）和面积问题（阿基米德、卡瓦列里）都不是他们首创，
        很多具体结果前人已有。他们的真正功绩是<strong>看穿并证明了这两个问题互逆</strong>，
        并据此建立了一套系统化的计算规则（求导法则 + 反查）——把零散的天才技巧变成了
        任何人都能学会的算法。顺便说：牛顿的老师巴罗已经几乎摸到了这个定理，
        但只有牛顿和莱布尼茨认识到它是整座大厦的枢纽。
      </p>
    </div>

    <h2><span class="sec-no">肆</span>更深远的馈赠</h2>
    <ul>
      <li>
        <strong>不定积分与定积分的和解</strong>：教科书先讲"不定积分 = 原函数族"，
        再讲"定积分 = 面积极限"，两者字面上风马牛不相及——是基本定理把它们焊在一起，
        所以才共用一个 ∫ 记号；
      </li>
      <li>
        <strong>制造新函数的工厂</strong>：有些函数的原函数不是初等函数，但基本定理第一部分保证
        "面积函数"总是存在且可导——于是数学家直接用积分<em>定义</em>新函数：
        <MathInline tex="\ln x = \int_1^x \frac{1}{t}\mathrm{d}t" />、
        正态分布的分布函数 <MathInline tex="\Phi(x) = \frac{1}{\sqrt{2\pi}}\int_{-\infty}^x e^{-t^2/2}\mathrm{d}t" />
        （概率论查表查的就是它）；
      </li>
      <li>
        <strong>微分方程的总开关</strong>：知道变化率求原量，是"解微分方程"的最简形式。
        牛顿力学、电路方程、人口模型……整个用微分方程描述世界的范式，都从这里出发；
      </li>
      <li>
        <strong>它还会长大</strong>：格林公式、斯托克斯公式、高斯散度定理（多元微积分），
        本质都是基本定理的高维推广——"区域内部的累积 = 边界上的取值"。
        复变函数里的柯西积分定理也是这个家族的成员。
      </li>
    </ul>
  </ConceptPage>
</template>
