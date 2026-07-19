<script setup>
import ConceptPage from '../../components/ConceptPage.vue'
import MathBlock from '../../components/MathBlock.vue'
import MathInline from '../../components/MathInline.vue'
import NewtonMethodDemo from '../../demos/NewtonMethodDemo.vue'
</script>

<template>
  <ConceptPage slug="root-finding">
    <h2><span class="sec-no">壹</span>困境：五次方程没有求根公式，可工程师就是要那个数</h2>
    <p>
      二次方程有求根公式，三次、四次也被文艺复兴的数学家啃了下来（还顺带逼出了虚数，见
      <router-link to="/complex/imaginary">复变第一讲</router-link>）。于是所有人都以为，五次方程的公式只是还没被找到。
      直到 1824 年，<strong>阿贝尔</strong>证明了一件让人绝望的事：<strong>五次及以上的一般方程，根本不存在用加减乘除和开方写出的求根公式</strong>。
      伽罗瓦随后讲清了为什么。这不是"暂时算不出"，是"永远没有那种公式"。
    </p>
    <p>
      更别提超越方程了。<MathInline tex="x = \cos x" />、<MathInline tex="xe^x = 1" /> 这类混着三角、指数的方程，
      连"多项式"都不是，求根公式更无从谈起。可现实世界不管这些——卫星轨道、电路工作点、期权隐含波动率，
      归根到底都是在解某个 <MathInline tex="f(x)=0" />，而且要的是一个能拿去用的<strong>具体数值</strong>。
      纯数学耸耸肩说"无公式解"，数值分析却必须交出答案。怎么办？
    </p>
    <div class="story">
      <div class="story-title">📜 最笨也最稳的办法：二分法</div>
      <p>
        如果 <MathInline tex="f" /> 连续，且 <MathInline tex="f(a)" /> 与 <MathInline tex="f(b)" /> 一正一负，
        那么<strong>介值定理</strong>保证 <MathInline tex="[a,b]" /> 里必有一个根。取中点 <MathInline tex="c" />，
        看 <MathInline tex="f(c)" /> 的符号，就能把根锁进左半段或右半段——区间每次砍半。这就是<strong>二分法</strong>：
        稳得像铁，只要初始区间套住了根，它绝不失手。代价是<strong>慢</strong>：每步只把误差减半，
        换算成十进制，大约每 3.3 步才多确定一位有效数字。要 15 位精度得迭代约 50 次。稳，但笨。
      </p>
    </div>

    <h2><span class="sec-no">贰</span>破局：牛顿用一条切线，把"逐位挪"变成"位数翻倍"</h2>
    <p>
      1669 年，牛顿盯着曲线想：既然曲线难缠，何不用它在当前点的<strong>切线</strong>来代替它？
      切线是直线，一撞横轴就给出下一个更好的猜测。这背后其实就是<strong>泰勒展开只留一阶项</strong>
      （微积分的老朋友）：<MathInline tex="f(x)\approx f(x_n)+f'(x_n)(x-x_n)" />，令它等于 0 解出 <MathInline tex="x" />，得到
    </p>
    <MathBlock tex="x_{n+1} = x_n - \frac{f(x_n)}{f'(x_n)}" />
    <p>
      拉夫森 1690 年把它整理成这个沿用至今的递推式。它有多快？对单根附近，误差满足
      <MathInline tex="e_{n+1} \approx C\, e_n^2" />——<strong>每一步误差平方级缩小，正确的有效数字大致翻倍</strong>：
      <MathInline tex="0.1 \to 0.01 \to 0.0001 \to 10^{-8} \to 10^{-16}" />，四五步就顶到机器精度。这叫<strong>二次收敛</strong>，
      和二分法的"逐位挪"是两个物种。
    </p>
    <div class="insight">
      <div class="insight-title">💡 一个惊喜：四千年前的巴比伦人早就在用牛顿法</div>
      <p>
        把牛顿法用到 <MathInline tex="f(x)=x^2-a" />（求 <MathInline tex="\sqrt a" />），递推式化简后是
        <MathInline tex="x_{n+1}=\tfrac12\left(x_n+\dfrac{a}{x_n}\right)" />——
        <strong>猜一个数，和它除 a 的商取平均，再猜</strong>。这正是巴比伦泥板上开平方的古法，比牛顿早了三千多年。
        动画里你会亲手拖动它，看误差怎么一步一个数量级往下砸。但也别忘了它的软肋：切线太平（导数接近 0）时，
        下一步会被甩到十万八千里——牛顿法快，却<strong>挑初值</strong>，这是它一辈子的脾气。
      </p>
    </div>

    <h2><span class="sec-no">叁</span>亲手拖动牛顿迭代，数它正确位数翻倍</h2>
    <NewtonMethodDemo />

    <h2><span class="sec-no">肆</span>严格定义</h2>
    <div class="definition">
      <div class="def-title">📐 二分法、牛顿法与收敛阶</div>
      <p>
        <strong>收敛阶</strong>：迭代 <MathInline tex="x_n\to x^*" />，若存在
        <MathInline tex="p\ge1" /> 与常数 <MathInline tex="C>0" /> 使
        <MathInline tex="\lim\limits_{n\to\infty}\dfrac{|x_{n+1}-x^*|}{|x_n-x^*|^{p}}=C" />，
        则称收敛阶为 <MathInline tex="p" />。<MathInline tex="p=1" />（且 <MathInline tex="C<1" />）为<strong>线性收敛</strong>，
        <MathInline tex="p=2" /> 为<strong>二次收敛</strong>。
      </p>
      <p>
        <strong>二分法</strong>：线性收敛，因子 <MathInline tex="C=\tfrac12" />，第 <MathInline tex="n" /> 步误差
        <MathInline tex="\le (b-a)/2^{n+1}" />——收敛慢但<strong>全局保证</strong>。
      </p>
      <p>
        <strong>牛顿法</strong>：设 <MathInline tex="x^*" /> 是单根（<MathInline tex="f'(x^*)\ne0" />），
        <MathInline tex="f\in C^2" />，则初值足够近时二次收敛，且
        <MathInline tex="e_{n+1}=\dfrac{f''(\xi)}{2f'(x_n)}\,e_n^2" />。
        误差主项来自<strong>泰勒展开被截断在一阶</strong>——这正是<router-link to="/numerical/float-error">第一讲</router-link>说的截断误差。
      </p>
    </div>

    <h2><span class="sec-no">伍</span>买到了什么：藏在每一次按键背后的迭代</h2>
    <ul>
      <li>
        <strong>你的计算器就在这么算</strong>：芯片没有"开方电路"，按下 <MathInline tex="\sqrt{}" /> 时它跑的正是牛顿迭代；
        连硬件<strong>除法</strong>都常用牛顿法先算倒数 <MathInline tex="1/b" />（解 <MathInline tex="1/x-b=0" />）再乘——
        因为乘法比除法便宜；
      </li>
      <li>
        <strong>优化的心脏</strong>：机器学习、经济学里的"求最优"，本质是求导数为零点 <MathInline tex="\nabla f=0" />，
        又是一个求根问题。牛顿法在这里升级成<strong>多元</strong>版：
        <MathInline tex="\mathbf{x}_{n+1}=\mathbf{x}_n-[J(\mathbf{x}_n)]^{-1}f(\mathbf{x}_n)" />，
        那个 <MathInline tex="J" /> 是雅可比矩阵——每一步都要<router-link to="/numerical/linear-system">解一个线性方程组</router-link>，
        本课后两讲在这里合流；
      </li>
      <li>
        <strong>不动点视角</strong>：把 <MathInline tex="f(x)=0" /> 改写成 <MathInline tex="x=g(x)" />，
        求根就成了"反复代入直到不动"，收敛快慢由 <MathInline tex="|g'(x^*)|" /> 决定——这套不动点迭代思想，
        在第五讲解大型方程组的迭代法里会再次登场；
      </li>
    </ul>
    <div class="insight">
      <div class="insight-title">🔗 与你学过的课程连一连</div>
      <p>
        <strong>微积分</strong>：牛顿法 =“用切线（一阶泰勒）代替曲线”，二分法 = 介值定理的算法化——
        两条中值 / 介值定理在这里从"存在性证明"变成了"能出数的工具"；<strong>线性代数</strong>：
        多元牛顿法每步要解 <MathInline tex="J\Delta\mathbf{x}=-f" />，雅可比矩阵 <MathInline tex="J" /> 就是
        <router-link to="/linear-algebra/linear-map">矩阵与线性变换</router-link>讲的"局部线性近似"；
        <strong>复变函数</strong>：把牛顿法丢进复平面，看每个初值最终收敛到哪个根、按颜色染出来，
        就是著名的<strong>牛顿分形</strong>——迭代法的"挑初值"脾气，在复平面上开出了一朵分形之花。
      </p>
    </div>
  </ConceptPage>
</template>
