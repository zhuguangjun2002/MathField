<script setup>
import ConceptPage from '../../components/ConceptPage.vue'
import MathBlock from '../../components/MathBlock.vue'
import MathInline from '../../components/MathInline.vue'
import LimitSequenceDemo from '../../demos/LimitSequenceDemo.vue'
import EpsilonDeltaDemo from '../../demos/EpsilonDeltaDemo.vue'
</script>

<template>
  <ConceptPage slug="limit">
    <h2><span class="sec-no">壹</span>困境：希腊人被"无穷"吓退了</h2>
    <p>
      公元前 450 年左右，哲学家芝诺提出了一组悖论，其中最有名的是<strong>阿基里斯追乌龟</strong>：
      飞毛腿阿基里斯在乌龟身后 1 里处开始追。等他跑完这 1 里，乌龟前进了 1/10 里；
      等他再跑完这 1/10 里，乌龟又前进了 1/100 里……如此下去有<em>无穷多个</em>阶段，
      每个阶段乌龟都还领先一点。所以阿基里斯永远追不上乌龟？
    </p>
    <p>
      每个人都知道结论是荒谬的——阿基里斯当然追得上。但要指出推理<em>错在哪一步</em>，
      希腊人办不到。问题的核心是：<strong>无穷多个正数加起来，为什么可以是个有限数？</strong>
    </p>
    <MathBlock tex="1 + \frac{1}{10} + \frac{1}{100} + \frac{1}{1000} + \cdots = \frac{10}{9}" />
    <p>
      希腊数学从此患上"无穷恐惧症"。阿基米德用穷竭法算面积时，都刻意绕开"无穷"二字，
      改用有限步数加反证法来表述。这个心结，一悬就是两千年。
    </p>

    <h2><span class="sec-no">贰</span>危机：微积分建在流沙上</h2>
    <p>
      17 世纪，牛顿和莱布尼茨发明微积分（详见后面几讲），威力巨大，却把地基埋在了一个
      含糊的概念上——<strong>无穷小量</strong>。比如求 <MathInline tex="y = x^2" /> 的导数，当时的算法是：
      给 <MathInline tex="x" /> 一个"无穷小"的增量 <MathInline tex="o" />，
    </p>
    <MathBlock tex="\frac{(x+o)^2 - x^2}{o} = \frac{2xo + o^2}{o} = 2x + o" />
    <p>
      然后宣布：<MathInline tex="o" /> 无穷小，扔掉不要，答案是 <MathInline tex="2x" />。
    </p>
    <div class="story">
      <div class="story-title">📜 1734 年 · 贝克莱主教的致命一问</div>
      <p>
        哲学家贝克莱写了一本小册子专门嘲讽数学家："这个 o 到底是不是零？
        若是零，第一步就不能拿它当除数；若不是零，最后一步就不能把它扔掉。
        它们既不是有限量，也不是无穷小，又不是无 —— 我们何不称之为
        <strong>消失量的幽灵</strong>（ghosts of departed quantities）？"
      </p>
      <p>
        数学家们答不上来。微积分算出的结果全是对的，逻辑却千疮百孔 ——
        这就是"第二次数学危机"。
      </p>
    </div>

    <h2><span class="sec-no">叁</span>出路：不谈"无穷"，改谈"要多近有多近"</h2>
    <p>
      19 世纪，柯西和魏尔斯特拉斯给出了釜底抽薪的方案：<strong>彻底放弃"无穷小"这个名词，
      把"越来越接近"翻译成一个只含有限数的攻防游戏</strong>。
    </p>
    <div class="insight">
      <div class="insight-title">💡 核心直觉：一场挑战游戏</div>
      <p>
        我说"数列 <MathInline tex="a_n" /> 的极限是 L"，意思是我敢立下战书：
        <strong>你随便提一个精度要求 ε</strong>（比如"误差小于 0.0001"），
        <strong>我都能回答一个位置 N</strong>，保证从第 N 项起，每一项与 L 的误差都小于你要的 ε。
        你出招再狠，我都接得住 —— 这才叫"无限接近"。
      </p>
    </div>
    <LimitSequenceDemo />

    <h2><span class="sec-no">肆</span>严格定义</h2>
    <div class="definition">
      <div class="def-title">📐 定义（数列极限，柯西 1821 / 魏尔斯特拉斯 1861）</div>
      <p>
        设 <MathInline tex="\{a_n\}" /> 为数列，<MathInline tex="L" /> 为常数。若对<strong>任意</strong>
        <MathInline tex="\varepsilon > 0" />，都<strong>存在</strong>正整数 <MathInline tex="N" />，
        使得当 <MathInline tex="n > N" /> 时恒有 <MathInline tex="|a_n - L| < \varepsilon" />，则称
      </p>
      <MathBlock tex="\lim_{n \to \infty} a_n = L" />
    </div>
    <p>逐词拆开读，它就是刚才那个游戏：</p>
    <ul>
      <li><strong>任意 ε＞0</strong> —— 对手随便出精度要求，多苛刻都行；</li>
      <li><strong>存在 N</strong> —— 你总能应答一个"从此以后"的门槛；</li>
      <li><strong>n＞N 时 |aₙ−L|＜ε</strong> —— 过了门槛，误差保证达标。</li>
    </ul>
    <p>
      注意整句话里<strong>没有出现"无穷小"，也没有任何东西在"运动"</strong>——
      只有静态的不等式和有限的数。幽灵被驱散了。函数极限也是同一个思路，
      只是"位置 N"换成了"距离 δ"：
    </p>
    <div class="definition">
      <div class="def-title">📐 定义（函数极限）</div>
      <p>
        若对任意 <MathInline tex="\varepsilon > 0" />，存在 <MathInline tex="\delta > 0" />，使得当
        <MathInline tex="0 < |x - a| < \delta" /> 时恒有 <MathInline tex="|f(x) - L| < \varepsilon" />，则称
        <MathInline tex="\lim_{x \to a} f(x) = L" />。
      </p>
    </div>
    <p>
      条件里写 <MathInline tex="0 < |x-a|" /> 而不是 <MathInline tex="|x-a| \ge 0" />，
      是刻意<strong>把 x = a 这一点排除在外</strong>——极限只关心"接近时的趋势"，
      与函数在该点有没有定义、值是多少完全无关。下面这个例子里 f 在 x = 1 处压根没定义，极限却好端端存在：
    </p>
    <EpsilonDeltaDemo />

    <h2><span class="sec-no">伍</span>买到了什么：整座大厦的地基</h2>
    <p>有了极限这块基石，微积分里所有"懵懵懂懂"的概念都能落地了：</p>
    <ul>
      <li>
        <strong>连续</strong>不再是"笔不离纸"，而是
        <MathInline tex="\lim_{x \to a} f(x) = f(a)" /> —— 趋势值恰好等于实际值；
      </li>
      <li>
        <strong>导数</strong>是差商的极限（第二讲），<strong>积分</strong>是黎曼和的极限（第三讲）——
        两大主角都是极限的化身；
      </li>
      <li>
        <strong>无穷级数求和</strong>被定义为部分和数列的极限 —— 芝诺悖论正式结案：
        阿基里斯追上乌龟的时刻，就是那个部分和的极限；
      </li>
      <li>
        <strong>e 的诞生</strong>：银行复利结算次数 n 越来越多时，本息
        <MathInline tex="(1 + \frac{1}{n})^n" /> 并不会涨到无穷，而是收敛于
        <MathInline tex="e \approx 2.71828" />（试试上面演示里的第二个数列）。
      </li>
    </ul>
    <div class="insight">
      <div class="insight-title">🔗 与你学过的课程连一连</div>
      <p>
        <strong>计算数学</strong>：迭代法（如牛顿迭代）算的就是数列极限，"收敛阶"衡量的是逼近速度；
        <strong>概率论</strong>：大数定律说"频率趋于概率"，用的正是数列极限（依概率收敛）；
        <strong>复变函数</strong>：幂级数的收敛半径，是极限理论搬到复平面后的产物。
        极限不是微积分第一章的过路考点，它是你后来所有数学课的公共地基。
      </p>
    </div>
  </ConceptPage>
</template>
