<script setup>
import ConceptPage from '../../components/ConceptPage.vue'
import MathBlock from '../../components/MathBlock.vue'
import MathInline from '../../components/MathInline.vue'
import RiemannSumDemo from '../../demos/RiemannSumDemo.vue'
</script>

<template>
  <ConceptPage slug="integral">
    <h2><span class="sec-no">壹</span>困境：直边的尺子，量不了曲边的地</h2>
    <p>
      三角形、多边形的面积，古人早就会算。但只要边界弯了——圆、抛物线弓形、酒桶的容积——
      "长 × 宽"立刻失效。<strong>曲边图形的面积怎么定义、怎么计算？</strong>
      这个问题比切线问题还古老两千年。
    </p>
    <div class="story">
      <div class="story-title">📜 公元前 250 年 · 阿基米德的穷竭法</div>
      <p>
        阿基米德求抛物线弓形面积：先内接一个大三角形，再在缝隙里塞两个小三角形，
        再塞四个更小的……每一轮新增的面积恰好是上一轮的 1/4。他证明了弓形面积等于第一个三角形的
        <MathInline tex="1 + \frac{1}{4} + \frac{1}{16} + \cdots = \frac{4}{3}" /> 倍。
        这几乎就是无穷级数求和，但出于对"无穷"的忌惮，他全程用有限步骤 + 反证法表述。
        1800 多年后，开普勒为了计算葡萄酒桶的容积重拾"无限细分"的思路（他的著作就叫《酒桶的新立体几何》），
        这条线索最终汇入牛顿与莱布尼茨之手。
      </p>
    </div>

    <h2><span class="sec-no">贰</span>思路：切成条，用矩形冒充，再让条数飙升</h2>
    <p>
      办法其实只有一个，从阿基米德到黎曼一脉相承：<strong>把曲边图形切成 n 个细条，
      每个细条用矩形近似（高度取条内某点的函数值），加总，然后让 n 趋于无穷</strong>。
      矩形选高的方式（左端点、右端点、中点）会带来不同的误差——但神奇之处在于，
      只要函数足够好，<strong>所有切法、所有取点法，最后都收敛到同一个数</strong>。
    </p>
    <RiemannSumDemo />

    <h2><span class="sec-no">叁</span>严格定义</h2>
    <div class="definition">
      <div class="def-title">📐 定义（定积分，黎曼 1854）</div>
      <p>
        把 [a, b] 任意分割为 n 段，第 i 段宽 <MathInline tex="\Delta x_i" />，在其中任取一点
        <MathInline tex="\xi_i" />，作黎曼和 <MathInline tex="\sum_{i=1}^{n} f(\xi_i)\,\Delta x_i" />。
        若当最宽的一段 <MathInline tex="\lambda = \max \Delta x_i \to 0" /> 时，
        黎曼和的极限存在，且<strong>与分割方式、取点方式都无关</strong>，则称 f 在 [a,b] 上可积，记
      </p>
      <MathBlock tex="\int_a^b f(x)\,\mathrm{d}x = \lim_{\lambda \to 0} \sum_{i=1}^{n} f(\xi_i)\,\Delta x_i" />
    </div>
    <p>读定义时最值得注意的三件事：</p>
    <ul>
      <li>
        <strong>记号本身就是定义的速写</strong>：<MathInline tex="\int" /> 是莱布尼茨把拉丁文
        Summa（求和）的首字母 S 拉长；<MathInline tex="f(x)\,\mathrm{d}x" /> 读作
        "高 f(x) × 无穷细的宽 dx"。整条记号就是"无限细分再求和"的象形文字；
      </li>
      <li>
        <strong>定义里完全没有"原函数"三个字</strong>：积分的本义是面积的极限，
        与求导没有任何先天关系。"积分 = 找原函数"是下一讲那个了不起的定理带来的<em>福利</em>，不是定义；
      </li>
      <li>
        <strong>"与分割、取点无关"是关键门槛</strong>：连续函数都能过（因此都可积）；
        而处处疯狂震荡的狄利克雷函数（有理数处取 1、无理数处取 0）过不了——
        取点全取有理数得 1，全取无理数得 0，极限不唯一，故黎曼不可积。
        这类"病态函数"逼出了 20 世纪的勒贝格积分，也是现代概率论的根基。
      </li>
    </ul>

    <h2><span class="sec-no">肆</span>应用：凡是"累积"，皆是积分</h2>
    <p>
      面积只是幌子。积分真正的身份是<strong>"变化率已知时，把总量累积回来"的万能机器</strong>：
      每个小段上"变化率 × 小段长"是小贡献，积分把无穷多个小贡献加总。
    </p>
    <ul>
      <li>
        <strong>路程</strong>：速度曲线下的"面积"就是路程 <MathInline tex="s = \int_0^T v(t)\,\mathrm{d}t" />
        —— 这正是导数的逆问题（下一讲的主角）；
      </li>
      <li>
        <strong>变力做功</strong>：<MathInline tex="W = \int_a^b F(x)\,\mathrm{d}x" />；
        水压、引力、电场的总效果都这么算；
      </li>
      <li>
        <strong>概率论（你学过的！）</strong>：连续型随机变量落在 [a,b] 的概率是密度曲线下的面积
        <MathInline tex="P(a \le X \le b) = \int_a^b p(x)\,\mathrm{d}x" />，
        期望 <MathInline tex="E[X] = \int x\,p(x)\,\mathrm{d}x" /> 是"取值 × 权重"的连续加权平均——
        没有积分就没有连续型概率论；
      </li>
      <li>
        <strong>计算数学（你也学过）</strong>：当被积函数没有初等原函数时（比如正态分布的
        <MathInline tex="e^{-x^2}" />），数值积分——梯形公式、辛普森公式、高斯求积——
        本质都是"聪明地取点的黎曼和"。
      </li>
    </ul>
    <div class="insight">
      <div class="insight-title">💡 一句话总结</div>
      <p>
        导数是"无限放大看局部"，积分是"无限细分后加总"。它们看起来毫不相干——
        一个是除法的极限，一个是加法的极限。它们之间竟然互为逆运算，
        这件事完全不显然，值得专门用下一讲来讲。
      </p>
    </div>
  </ConceptPage>
</template>
