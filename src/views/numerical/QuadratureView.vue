<script setup>
import ConceptPage from '../../components/ConceptPage.vue'
import MathBlock from '../../components/MathBlock.vue'
import MathInline from '../../components/MathInline.vue'
import QuadratureDemo from '../../demos/QuadratureDemo.vue'
</script>

<template>
  <ConceptPage slug="quadrature">
    <h2><span class="sec-no">壹</span>困境：正态分布表里的数，到底是怎么来的</h2>
    <p>
      概率论学到正态分布，书后总附一张长长的表：<MathInline tex="\Phi(z)" /> 在各个 <MathInline tex="z" /> 处的值。
      你有没有想过——这些数是<strong>算</strong>出来的，可它们背后的积分
      <MathInline tex="\int e^{-x^2}\,dx" /> <strong>根本没有初等原函数</strong>。
    </p>
    <p>
      这不是没找到，是<strong>刘维尔定理</strong>证明了它<strong>不可能</strong>用初等函数写出原函数。
      同样"算不出原函数"的还有 <MathInline tex="\dfrac{\sin x}{x}" />、<MathInline tex="\sqrt{1-k^2\sin^2\theta}" />（椭圆积分）……
      比比皆是。这意味着<router-link to="/calculus/ftc">微积分基本定理</router-link>那套无往不利的
      "找原函数 <MathInline tex="F" />、代端点作差 <MathInline tex="F(b)-F(a)" />"的招数，在这里<strong>整个失效</strong>。
      可正态分布表就摆在那儿，工程和科学离不开这些面积。怎么算？
    </p>
    <div class="story">
      <div class="story-title">📜 退回积分最原始的含义：面积</div>
      <p>
        既然算不出原函数，就回到<router-link to="/calculus/integral">积分的出生地</router-link>——它本就是
        "曲线下方的面积"，是黎曼和的极限。面积不需要原函数，只需要把曲边图形<strong>拆成一堆算得出面积的简单形状</strong>再加起来。
        最朴素的做法：切成 <MathInline tex="N" /> 条竖直细条，每条近似成矩形（<strong>中点矩形法</strong>）。
        这一定能出数，只是要多细才够准？这正是"求积公式"要回答的。
      </p>
    </div>

    <h2><span class="sec-no">贰</span>破局：别把细条切得更多，把每条的"顶"凑得更聪明</h2>
    <p>
      提升精度有两条路。笨路是把 <MathInline tex="N" /> 加大——细条更窄，误差自然减小，但要的块数吓人。
      聪明路是：<strong>让每一小条的"顶"更贴合曲线</strong>。矩形的顶是平的（0 次），把它换成斜直线，
      就是<strong>梯形法</strong>；再换成<strong>抛物线</strong>，就是<strong>辛普森法</strong>（1743）。
    </p>
    <div class="insight">
      <div class="insight-title">💡 核心直觉：辛普森的"越级精度"</div>
      <p>
        梯形法用直线，误差随步长按 <MathInline tex="h^2" /> 缩小（<MathInline tex="N" /> 翻倍，误差降到 1/4）。
        辛普森用抛物线——直觉上"只高一档"，精度却<strong>一步跨两级</strong>：误差按 <MathInline tex="h^4" /> 缩小
        （<MathInline tex="N" /> 翻倍，误差降到 <strong>1/16</strong>）。更妙的是，抛物线只有三个自由度，
        本"应该"只对二次多项式精确，可辛普森公式<strong>意外地对三次多项式也精确</strong>——三次项的误差因对称而恰好抵消，
        白捡一阶。这就是为什么同样切 8 块，辛普森常常比矩形准上千倍。动画里你亲手拖 <MathInline tex="N" />、切换形状，
        盯着误差的数量级，就能看清 <MathInline tex="h^2" /> 和 <MathInline tex="h^4" /> 的天壤之别。
      </p>
    </div>
    <p>
      沿这条思路还能更极致。<strong>理查森外推</strong>：用两个不同步长的粗结果，把误差的主项<strong>代数消掉</strong>，
      白捡高一阶精度（梯形连续外推就变成大名鼎鼎的<strong>龙贝格积分</strong>）。而<strong>高斯 1814 年</strong>更狠——
      他连<strong>取点的位置</strong>都不肯固定，把它也当成待优化的自由度：精心选的 <MathInline tex="n" /> 个点，
      竟能精确积分 <MathInline tex="2n-1" /> 次多项式，效率登峰造极。
    </p>

    <h2><span class="sec-no">叁</span>亲手切块，对比三种形状的误差数量级</h2>
    <QuadratureDemo />

    <h2><span class="sec-no">肆</span>严格定义</h2>
    <div class="definition">
      <div class="def-title">📐 牛顿-柯特斯公式与代数精度</div>
      <p>
        把 <MathInline tex="[a,b]" /> <MathInline tex="n" /> 等分，步长 <MathInline tex="h=(b-a)/n" />，
        <MathInline tex="x_i=a+ih" />。常用<strong>复合公式</strong>：
      </p>
      <MathBlock tex="\text{梯形：}\ \int_a^b f \approx h\Big(\tfrac{f_0}{2}+f_1+\cdots+f_{n-1}+\tfrac{f_n}{2}\Big),\quad \text{误差}=-\tfrac{(b-a)h^2}{12}f''(\xi)" />
      <MathBlock tex="\text{辛普森：}\ \int_a^b f \approx \tfrac{h}{3}\big(f_0+4f_1+2f_2+\cdots+4f_{n-1}+f_n\big),\quad \text{误差}=-\tfrac{(b-a)h^4}{180}f^{(4)}(\xi)" />
      <p>
        <strong>代数精度</strong>：若一个求积公式对所有次数 <MathInline tex="\le m" /> 的多项式给出<em>精确</em>结果、
        对 <MathInline tex="m+1" /> 次不精确，则称其代数精度为 <MathInline tex="m" />。梯形为 1，辛普森为 <strong>3</strong>
        （越级的来源），<MathInline tex="n" /> 点高斯求积高达 <MathInline tex="2n-1" />。
      </p>
    </div>

    <h2><span class="sec-no">伍</span>买到了什么：让"面积"从公式变成随处可算的量</h2>
    <ul>
      <li>
        <strong>那张正态分布表</strong>：连同金融里的期权定价、可靠性工程里的失效概率，只要涉及"钟形曲线下的面积"，
        算的都是数值积分——刘维尔说没有原函数，辛普森说没关系，我数给你；
      </li>
      <li>
        <strong>仿真的引擎</strong>：有限元分析（造桥、飞机受力）、计算流体力学，内核都是在无数小单元上做数值积分再拼起来；
      </li>
      <li>
        <strong>高维的另一条路</strong>：维度一高，切网格的块数指数爆炸（"维数灾难"）。这时改用<strong>蒙特卡洛积分</strong>——
        随机撒点、取平均，误差按 <MathInline tex="1/\sqrt{N}" /> 下降，<strong>与维度无关</strong>。这套把积分变成"求期望"的思路，
        正是概率论的地盘，也是现代金融、渲染、AI 里高维积分的主力；
      </li>
    </ul>
    <div class="insight">
      <div class="insight-title">🔗 与你学过的课程连一连</div>
      <p>
        <strong>微积分</strong>：数值积分就是<router-link to="/calculus/integral">黎曼和</router-link>的"精装升级版"，
        而误差公式里的 <MathInline tex="f''(\xi)" />、<MathInline tex="f^{(4)}(\xi)" /> 又是泰勒展开在幕后控场；
        它也标出了<router-link to="/calculus/ftc">基本定理</router-link>的适用边界——没有原函数时，就轮到求积公式上场；
        <strong>概率论</strong>：蒙特卡洛积分 = <router-link to="/probability/lln">大数定律</router-link>（撒点取平均收敛到真值），
        它的误差 <MathInline tex="1/\sqrt N" /> 正是<router-link to="/probability/clt">中心极限定理</router-link>给的；
        <strong>本课呼应</strong>：牛顿-柯特斯公式次数一高也会犯<router-link to="/numerical/interpolation">龙格现象</router-link>
        （权重出现负数、剧烈震荡），所以实战宁可用低次的<strong>复合</strong>辛普森，而不用一根高次公式——
        和插值讲"宁可分段样条"是同一个教训。
      </p>
    </div>
  </ConceptPage>
</template>
