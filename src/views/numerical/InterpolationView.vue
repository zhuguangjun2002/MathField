<script setup>
import ConceptPage from '../../components/ConceptPage.vue'
import MathBlock from '../../components/MathBlock.vue'
import MathInline from '../../components/MathInline.vue'
import RungeDemo from '../../demos/RungeDemo.vue'
</script>

<template>
  <ConceptPage slug="interpolation">
    <h2><span class="sec-no">壹</span>困境：手里只有一张离散的表，中间的值怎么办</h2>
    <p>
      天文历表给出每天正午的行星位置，你想知道下午三点的；实验仪器每隔 0.1 秒采一个点，你想还原连续曲线；
      对数表只列了整数，你要 <MathInline tex="\lg 2.5" />。共同的处境是：只有<strong>有限个离散点</strong>，
      却想要它们之间的值。最自然的想法——找一条<strong>穿过所有已知点的光滑曲线</strong>，用它来"填空"。这就是<strong>插值</strong>。
    </p>
    <p>
      多项式是最顺手的填空工具：<MathInline tex="n+1" /> 个点，恰好唯一确定一条 <MathInline tex="n" /> 次多项式。
      拉格朗日（1795）给了一个漂亮的显式写法——为每个节点造一个"只在自己这儿等于 1、在别的节点都等于 0"的基函数：
    </p>
    <MathBlock tex="p(x)=\sum_{i=0}^{n} y_i\, L_i(x), \qquad L_i(x)=\prod_{j\ne i}\frac{x-x_j}{x_i-x_j}" />
    <p>
      于是自然而然地，人人都相信一条<strong>看起来天经地义的直觉</strong>：既然点越多、曲线被"钉"得越死，
      那用越高次的多项式、穿过越多的点，就该越贴近真相。整整一个世纪，没人怀疑这件事。
    </p>

    <h2><span class="sec-no">贰</span>破局（其实是打脸）：龙格 1901 年的反例</h2>
    <p>
      1901 年，<strong>龙格</strong>拿一个人畜无害的函数开刀：<MathInline tex="f(x)=\dfrac{1}{1+25x^2}" />，
      形状就是个温柔的钟形包。他在 <MathInline tex="[-1,1]" /> 上<strong>等距</strong>取点，用穿过这些点的多项式去逼近。
      结果惊掉了所有人：点取得越多、次数升得越高，多项式在<strong>区间两端的震荡越来越疯狂</strong>，
      振幅不是缩小而是<strong>发散到无穷</strong>。中间贴得越来越好，两端却彻底失控。
      "次数越高越准"这个百年直觉，被一个巴掌拍碎。
    </p>
    <div class="insight">
      <div class="insight-title">💡 深层真相藏在复平面里（复变第四讲的收割）</div>
      <p>
        表面看，龙格现象是"高次多项式太僵硬、被逼着穿点只好剧烈摆动"。但<strong>为什么偏偏是这个温和的函数</strong>？
        真正的解释要抬头看<strong>复平面</strong>。<router-link to="/complex/residue">复变第四讲</router-link>埋过一个伏笔：
        幂级数的<strong>收敛半径 = 到最近奇点的距离</strong>。龙格函数
        <MathInline tex="\dfrac{1}{1+25x^2}" /> 在实轴上处处光滑，可一旦延拓到复平面，它在
        <MathInline tex="x=\pm\tfrac{i}{5}" /> 处有两个<strong>极点</strong>——就藏在实轴上方不远处。正是这对看不见的奇点，
        卡住了等距插值的收敛半径，让两端的误差压不下去。一个纯实数的数值灾难，病根却在虚轴上——
        这是复变函数在本课最漂亮的一次现身。
      </p>
    </div>
    <p>
      既然病根是"奇点太近 + 节点摆错位置"，解药就有两条：其一，<strong>别再等距取点</strong>，
      改用<strong>切比雪夫点</strong>（两端加密、中间稀疏），它恰好抵消了收敛半径的限制，误差随次数稳稳下降；
      其二，干脆<strong>放弃一根高次多项式</strong>，改用<strong>分段低次</strong>的样条——这才是工程界的主流选择。
      下面的动画让你亲手在这两条路之间切换。
    </p>

    <h2><span class="sec-no">叁</span>亲手制造龙格灾难，再一键平息它</h2>
    <RungeDemo />

    <h2><span class="sec-no">肆</span>严格定义</h2>
    <div class="definition">
      <div class="def-title">📐 插值多项式、余项与样条</div>
      <p>
        给定 <MathInline tex="n+1" /> 个互异节点 <MathInline tex="(x_i,y_i)" />，存在<strong>唯一</strong>次数
        <MathInline tex="\le n" /> 的多项式 <MathInline tex="p" /> 满足 <MathInline tex="p(x_i)=y_i" />
        （唯一性由范德蒙行列式非零保证）。若 <MathInline tex="y_i=f(x_i)" /> 且 <MathInline tex="f\in C^{n+1}" />，则<strong>插值余项</strong>为
      </p>
      <MathBlock tex="f(x)-p(x)=\frac{f^{(n+1)}(\xi)}{(n+1)!}\prod_{i=0}^{n}(x-x_i)" />
      <p>
        龙格现象的根源正在此式：等距节点下 <MathInline tex="\prod(x-x_i)" /> 在两端剧烈增大，
        而 <MathInline tex="f^{(n+1)}" /> 又不随 <MathInline tex="n" /> 收敛——两者相乘发散。切比雪夫点则是让
        <MathInline tex="\max\big|\prod(x-x_i)\big|" /> <strong>最小化</strong>的那组点。
      </p>
      <p>
        <strong>三次样条</strong>：不追求一根多项式全场通吃，而在每个小段上用三次多项式，段与段之间
        <strong>拼到二阶导都连续</strong>——既灵活又不震荡。名字来自造船厂：用一根有弹性的木条（样条 spline）
        压过一排钉子放样，木条自然弯成的正是这条最"省弯曲能量"的曲线。
      </p>
    </div>

    <h2><span class="sec-no">伍</span>买到了什么：一条贯穿数字世界的曲线</h2>
    <ul>
      <li>
        <strong>屏幕上每一个字母</strong>：字体轮廓用的是贝塞尔曲线（样条的近亲），CAD、动画的关键帧插值、
        字体渲染，本质都是"给几个控制点、要一条光滑曲线"；
      </li>
      <li>
        <strong>造船与工业设计</strong>：样条从船体放样起家，如今是所有曲面建模的基石——你的手机外壳、汽车车身，
        都是样条曲面拼出来的；
      </li>
      <li>
        <strong>一条价值千金的教训</strong>：<strong>"用更复杂的模型去拟合更多的点"未必更好</strong>。
        龙格现象是数值分析版的"过拟合"——机器学习里高次多项式回归的剧烈震荡，与这里是同一个幽灵，
        正则化、样条基、分段建模都是它的解药；
      </li>
    </ul>
    <div class="insight">
      <div class="insight-title">🔗 与你学过的课程连一连</div>
      <p>
        <strong>线性代数</strong>：求插值多项式的系数 = 解一个<strong>范德蒙线性方程组</strong>；而范德蒙矩阵是出了名的
        <em>病态</em>——这直接把你推向<router-link to="/numerical/linear-system">第五讲的条件数</router-link>，
        也是实际中改用拉格朗日 / 牛顿基而非直接解系数的原因；<strong>微积分</strong>：那个插值余项
        <MathInline tex="\tfrac{f^{(n+1)}(\xi)}{(n+1)!}\prod(x-x_i)" /> 和
        <router-link to="/calculus/taylor">泰勒余项</router-link>长得几乎一模一样——都是"高阶导数 × 一堆因子"在控制误差，
        插值是"多点贴合"、泰勒是"一点贴到底"，一对孪生兄弟；<strong>复变函数</strong>：龙格现象的真正裁判是复平面上那对极点——
        <router-link to="/complex/residue">收敛半径 = 到最近奇点的距离</router-link>在这里第二次收割。
      </p>
    </div>
  </ConceptPage>
</template>
