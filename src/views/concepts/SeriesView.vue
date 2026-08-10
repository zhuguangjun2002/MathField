<script setup>
import ConceptPage from '../../components/ConceptPage.vue'
import MathBlock from '../../components/MathBlock.vue'
import MathInline from '../../components/MathInline.vue'
import RevealBox from '../../components/RevealBox.vue'
import QuizBox from '../../components/QuizBox.vue'
import HarmonicStackDemo from '../../demos/HarmonicStackDemo.vue'
</script>

<template>
  <ConceptPage slug="series">
    <h2><span class="sec-no">壹</span>困境：两个长得差不多的和，命运完全不同</h2>
    <p>
      <router-link to="/calculus/taylor">上一讲</router-link>做了一件相当大胆的事：
      它把 <MathInline tex="\sin x" />、<MathInline tex="e^x" /> 写成了
      <strong>无穷多项相加</strong>，并且理直气壮地用它们算数。
      可"无穷多个数加起来"这句话本身，其实还没被交代过——
      <router-link to="/calculus/limit">第一讲</router-link>只处理过一个例子：
    </p>
    <MathBlock tex="\frac12+\frac14+\frac18+\cdots = 1" />
    <p>
      （芝诺那条追不上乌龟的路。）现在把它改一个字，看看会发生什么：
    </p>
    <MathBlock tex="1+\frac12+\frac13+\frac14+\frac15+\cdots = \;?" />
    <p>
      这叫<strong>调和级数</strong>。它和芝诺那条<strong>看着差不多</strong>：
      项都是正的、都在往 0 掉、掉得还挺快。凭直觉，它也该停在某个数上。
      <strong>可它不会。它会涨到无穷大。</strong>
    </p>
    <div class="story">
      <div class="story-title">📜 1350 年 · 奥雷姆的分组</div>
      <p>
        巴黎的<strong>奥雷姆</strong>主教在 14 世纪中叶给出了一个至今仍是最漂亮的证明，
        全部内容就是<strong>把项分组</strong>——注意每组的项数是 1、2、4、8 这样翻倍的：
      </p>
      <MathBlock tex="1+\underbrace{\frac12}_{=\,1/2}+\underbrace{\frac13+\frac14}_{\gt\,\frac14+\frac14\,=\,1/2}+\underbrace{\frac15+\cdots+\frac18}_{\gt\,4\times\frac18\,=\,1/2}+\underbrace{\frac19+\cdots+\frac1{16}}_{\gt\,8\times\frac1{16}\,=\,1/2}+\cdots" />
      <p>
        每一组都<strong>严格大于 1/2</strong>（把组里的每一项都换成组里最小的那一项，
        个数正好凑够）。而这样的组<strong>要多少有多少</strong>。
        所以这个和大于 <MathInline tex="1+\frac12+\frac12+\frac12+\cdots" />——
        <strong>它超过任何一个你先说出来的数</strong>。
      </p>
      <p>
        这个证明比牛顿早三百年，比"极限"这个词早五百年。
        它也是<strong>比较判别法</strong>的第一次亮相：
        要证一个和很大，就找一个更小、但你算得动的和。
      </p>
    </div>
    <p>
      发散得有多慢？这才是真正让人不适的地方。把前 n 项加起来记作
      <MathInline tex="H_n" />，那么：
    </p>
    <ul>
      <li><MathInline tex="H_n" /> 超过 <strong>10</strong>，要加到 <strong>12367</strong> 项；</li>
      <li>
        超过 <strong>20</strong>，要 <MathInline tex="2.7\times 10^{8}" /> 项
        （两亿七千万项，你的电脑得算一会儿）；
      </li>
      <li>
        超过 <strong>100</strong>，要 <MathInline tex="1.5\times 10^{43}" /> 项——
        <strong>宇宙的年龄换成纳秒也才 <MathInline tex="4\times10^{26}" /></strong>。
      </li>
    </ul>
    <p>
      <strong>它确实涨到无穷，但你永远看不见它涨上去。</strong>
      这就是本讲的困境：<strong>"每一项都趋于 0"根本不够</strong>，
      而肉眼、直觉、甚至计算机的实测，在这个问题上全部失灵。
      需要的是判据。
    </p>
    <div class="insight">
      <div class="insight-title">💡 还有更离谱的：同一堆数，加的顺序不同，答案不同</div>
      <p>
        把调和级数改成正负交错：
        <MathInline tex="1-\frac12+\frac13-\frac14+\cdots" />。
        这一个<strong>收敛</strong>，等于 <MathInline tex="\ln 2 = 0.693147" />。
      </p>
      <p>
        可黎曼在 1854 年证明了一件颠覆常识的事：<strong>把这堆数重新排个顺序，
        它可以收敛到你指定的任何数</strong>——0、<MathInline tex="\pi" />、
        −1000，随便。同样一堆数，同样每个都加一次，只是先后不同。
      </p>
      <p>
        <strong>小学学的"加法交换律"在无穷面前失效了。</strong>
        这件事逼着数学家把"无穷和"这个词重新定义一遍——那正是贰节要做的。
      </p>
    </div>

    <h2><span class="sec-no">贰</span>破局：无穷和不是加法，是极限</h2>
    <p>
      症结在于我们下意识地把 <MathInline tex="a_1+a_2+a_3+\cdots" /> 当成了
      "<strong>做无穷次加法</strong>"。可加法是<em>两个数</em>之间的运算，
      做一次、两次、一万次都行，<strong>做"无穷次"根本没有定义</strong>。
      正确的做法是绕开它：
    </p>
    <div class="definition">
      <div class="def-title">📐 定义（级数的和）</div>
      <p>给定数列 <MathInline tex="a_1,a_2,\dots" />，定义它的<strong>部分和</strong>：</p>
      <MathBlock tex="S_n = a_1 + a_2 + \cdots + a_n \qquad (\text{只加有限项，是合法的加法})" />
      <p>
        若数列 <MathInline tex="\{S_n\}" /> 收敛到 S，就说级数
        <MathInline tex="\sum a_n" /> <strong>收敛</strong>，并把 S 叫作它的和；
        否则说它<strong>发散</strong>。
      </p>
    </div>
    <p>
      <strong>整个定义只有一句话：无穷和 = 部分和数列的极限。</strong>
      于是所有关于无穷的问题，都被搬回<router-link to="/calculus/limit">第一讲</router-link>
      那套 ε–N 语言里去了——那里我们知道该怎么办。
      顺带解释了黎曼那件怪事：<strong>重排会改变部分和数列</strong>，
      而极限是部分和的性质，凭什么不变？
    </p>
    <h3>第一道关卡：项必须趋于 0（但这远远不够）</h3>
    <p>
      若 <MathInline tex="\sum a_n" /> 收敛，则 <MathInline tex="a_n \to 0" />。
      证明只有一行：<MathInline tex="a_n = S_n - S_{n-1} \to S - S = 0" />。
      <strong>这是必要条件，只能用来"枪毙"，不能用来"通过"</strong>——
      调和级数就是那个项趋于 0 却发散的反例。
    </p>
    <h3>真正好用的判据：拿积分去量级数</h3>
    <p>
      有一个判别法特别适合这门课，因为它把级数和积分接在了一起。
      画面是这样的：把 <MathInline tex="a_n = f(n)" /> 的每一项画成
      <strong>宽为 1、高为 <MathInline tex="f(n)" /> 的矩形</strong>，
      那么级数的和就是<strong>所有矩形的面积</strong>，
      而 <MathInline tex="\int_1^\infty f(x)\,\mathrm{d}x" /> 是曲线下的面积。
      f 单调递减时，两者互相夹住，<strong>要么一起有限，要么一起无穷</strong>。
    </p>
    <div class="definition">
      <div class="def-title">📐 积分判别法</div>
      <p>
        设 <MathInline tex="f" /> 在 <MathInline tex="[1,\infty)" /> 上连续、非负、单调递减，
        <MathInline tex="a_n=f(n)" />。则
      </p>
      <MathBlock tex="\sum_{n=1}^{\infty} a_n \ \text{收敛} \quad\Longleftrightarrow\quad \int_1^{\infty} f(x)\,\mathrm{d}x \ \text{收敛}" />
    </div>
    <p>拿它一秒钟结掉两个经典问题：</p>
    <MathBlock tex="\int_1^{\infty}\frac{\mathrm{d}x}{x} = \bigl[\ln x\bigr]_1^{\infty} = \infty \;\Rightarrow\; \sum\frac1n \ \text{发散}; \qquad \int_1^{\infty}\frac{\mathrm{d}x}{x^2} = \Bigl[-\frac1x\Bigr]_1^{\infty} = 1 \;\Rightarrow\; \sum\frac1{n^2} \ \text{收敛}" />
    <p>
      <strong>一个分母是 <MathInline tex="n" />、一个是 <MathInline tex="n^2" />，
      命运就此分开</strong>——而分界线在哪，由 <MathInline tex="\int x^{-p}" /> 什么时候收敛决定
      （答案是 <MathInline tex="p>1" />）。更妙的是，这个方法顺带给出了
      <strong>发散有多慢</strong>：矩形面积与曲线面积之差有极限，于是
    </p>
    <MathBlock tex="H_n = \ln n + \gamma + o(1), \qquad \gamma = 0.5772156649\ldots" />
    <p>
      这个 <MathInline tex="\gamma" /> 叫<strong>欧拉常数</strong>
      （1734 年由欧拉算出）。<strong>它是数学中最著名的未解之谜之一：
      至今没人知道它是不是无理数。</strong>
      叁节的动画里，读数区会拿这条估计式跟真实的 <MathInline tex="H_n" /> 逐档对账。
    </p>
    <QuizBox
      quiz-id="series-q1"
      question="「每一项都趋于 0」和「级数收敛」是什么关系？"
      hint="调和级数的项 1/n 明明趋于 0。奥雷姆那个分组说明了什么？"
      :options="[
        { t: '前者是后者的必要条件，不充分——调和级数就是项趋于 0 却发散的标准反例', why: '对。$a_n\\to 0$ 只能用来枪毙（项不趋于 0 一定发散），不能用来放行。真正决定命运的是「趋于 0 的速度」：$1/n$ 不够快，$1/n^2$ 就够了，分界线在 $1/n^p$ 的 $p=1$。' },
        { t: '两者等价：项趋于 0 就是收敛的定义', why: '收敛的定义是「部分和数列有极限」，与单项无关。$1/n$ 趋于 0 而部分和涨到无穷，一个例子就把等价性毙了——而且这个例子 1350 年就有了。' },
        { t: '没有关系，收敛只看部分和', why: '有关系，只是单向的：收敛 ⇒ 项趋于 0（因为 $a_n=S_n-S_{n-1}\\to S-S=0$）。这一行推理很有用，能一眼判掉一大批发散的级数。' },
      ]"
      :answer="0"
    />

    <h2><span class="sec-no">叁</span>亲眼看调和级数慢得有多离谱</h2>
    <p>
      调和级数不只是纸上的式子——它有一个<strong>实物版</strong>，
      而且这个实物版会让你对"发散得极慢"有一辈子忘不掉的印象：
      <strong>把砖块摞在桌边，能伸出去多远？</strong>
    </p>
    <p>
      答案是 <MathInline tex="H_n/2" /> 个砖长。理论上<strong>要多远有多远</strong>
      （因为调和级数发散）；可实际上，伸出四个砖长就要 1674 块砖。
      动画下面的三个"照着做一遍"给了整串可核对的数字。
    </p>
    <HarmonicStackDemo />

    <h2><span class="sec-no">肆</span>严格定义：三种判别法与一条颠覆常识的定理</h2>
    <div class="definition">
      <div class="def-title">📐 常用判别法（正项级数）</div>
      <ul>
        <li>
          <strong>比较判别法</strong>：若 <MathInline tex="0\le a_n\le b_n" />，
          则 <MathInline tex="\sum b_n" /> 收敛 ⇒ <MathInline tex="\sum a_n" /> 收敛；
          <MathInline tex="\sum a_n" /> 发散 ⇒ <MathInline tex="\sum b_n" /> 发散。
          （奥雷姆 1350 年用的就是它。）
        </li>
        <li>
          <strong>比值判别法</strong>：设
          <MathInline tex="\lim |a_{n+1}/a_n| = L" />。
          <MathInline tex="L<1" /> 收敛，<MathInline tex="L>1" /> 发散，
          <MathInline tex="L=1" /> <strong>失效</strong>。
        </li>
        <li><strong>积分判别法</strong>：如上。</li>
      </ul>
    </div>
    <p>
      三条判别法值得各说一句它们<strong>为什么长这样</strong>：
    </p>
    <ul>
      <li>
        <strong>比值判别法其实是在跟等比数列比。</strong>
        <MathInline tex="|a_{n+1}/a_n|\to L" /> 意味着往后每一项大约是前一项的 L 倍，
        也就是"尾巴像一个公比为 L 的等比数列"——而等比数列
        <MathInline tex="|L|<1" /> 时收敛，是中学就会的。
        <strong>所有判别法归根到底都是拿一个已知的级数当尺子。</strong>
      </li>
      <li>
        <strong><MathInline tex="L=1" /> 为什么必然失效？</strong>因为
        <MathInline tex="\sum 1/n" />（发散）与 <MathInline tex="\sum 1/n^2" />（收敛）
        的比值极限<strong>都是 1</strong>。一个判据要是在两个命运相反的例子上给同样的答案，
        它就只能弃权。<strong>这不是判别法不够聪明，是这个指标本身分辨不了。</strong>
      </li>
      <li>
        <strong>积分判别法为什么要求单调递减？</strong>因为"矩形夹住曲线"这个画面
        需要 f 在每个小区间上不上下乱窜。去掉单调性，
        矩形可能全落在曲线的高处或低处，夹不住。
      </li>
    </ul>
    <div class="definition">
      <div class="def-title">📐 绝对收敛与黎曼重排定理（1854）</div>
      <p>
        若 <MathInline tex="\sum |a_n|" /> 收敛，称 <MathInline tex="\sum a_n" />
        <strong>绝对收敛</strong>；若 <MathInline tex="\sum a_n" /> 收敛而
        <MathInline tex="\sum|a_n|" /> 发散，称<strong>条件收敛</strong>。
      </p>
      <p>
        <strong>黎曼重排定理</strong>：条件收敛的级数，
        <strong>可以通过重新排列各项，收敛到任意指定的实数，也可以让它发散</strong>。
        而绝对收敛的级数<strong>随便怎么排，和都不变</strong>。
      </p>
    </div>
    <RevealBox title="🔍 重排怎么可能改变结果：一个贪心的算法" label="对答案 / 看完整拆解">
      <template #hint>
        先想清楚一件事：交错调和级数里，
        <strong>全体正项</strong> <MathInline tex="1+\frac13+\frac15+\cdots" /> 自己加起来是多少？
        <strong>全体负项</strong>呢？（提示：它们各自都像调和级数。）
        如果两堆各自都是无穷大，你打算怎么"点菜"，才能凑出 100？
      </template>
      <p>
        <strong>第一步：两堆都是无穷。</strong>正项那堆
        <MathInline tex="1+\frac13+\frac15+\cdots" /> 的第 k 项是
        <MathInline tex="\frac{1}{2k-1} \gt \frac{1}{2k}" />，
        而 <MathInline tex="\sum\frac{1}{2k} = \frac12\sum\frac1k" /> 已经发散，
        所以正项那堆<strong>发散到 +∞</strong>；同理负项那堆发散到 −∞。
      </p>
      <p>
        <strong>第二步：贪心地点菜。</strong>想凑出目标 100？照这个算法做：
      </p>
      <ul>
        <li>先按顺序取正项，一直取到部分和<strong>刚刚超过</strong> 100 为止（一定办得到，因为正项和是无穷）；</li>
        <li>再取一个负项，把和拉回 100 以下；</li>
        <li>再取正项直到刚刚超过 100，再取一个负项……<strong>如此往复。</strong></li>
      </ul>
      <p>
        <strong>第三步：为什么它真的收敛到 100。</strong>
        每次"刚刚超过/刚刚低于"的<strong>超出量不会大于当时用的那一项</strong>，
        而所有项都趋于 0——所以部分和在 100 上下的摆动幅度越来越小，
        <strong>被挤向 100</strong>。而且每一项都恰好被用到一次（正项负项都是按原顺序取的，
        谁也不会被永远跳过）。
      </p>
      <p>
        <strong>回味：错在哪？</strong>错觉来自"加法交换律"。可交换律说的是
        <em>有限</em>多个数——它经过归纳法可以推到任意有限项，但<strong>推不到无穷</strong>。
        无穷和的值是<em>部分和序列</em>的极限，而重排会造出一个<strong>完全不同的序列</strong>。
        <strong>绝对收敛之所以是"安全"的，正是因为它给出了一个与顺序无关的上界</strong>——
        正项和负项各自都有限，就没法靠调度手法多榨出任何东西。
        这也是为什么<router-link to="/calculus/taylor">泰勒级数</router-link>
        在收敛半径内部可以放心地逐项求导、逐项积分：那里的收敛是绝对的。
      </p>
    </RevealBox>
    <QuizBox
      quiz-id="series-q2"
      question="比值判别法在 $L=1$ 时「失效」。这是判别法本身不够好，还是别的原因？"
      hint="把 1/n 与 1/n² 这两个级数的相邻项比值极限各算一下，是多少？"
      :options="[
        { t: '是这个指标本身分辨不了：$\\sum 1/n$（发散）与 $\\sum 1/n^2$（收敛）的比值极限都是 1', why: '对。一个指标在两个命运相反的例子上给出同样的读数，就注定无法判定——只能换更细的尺子（比如积分判别法，它一眼分开这两个）。这跟「二阶导数为 0 时二阶判别法失效」是同一类事：一个数据点区分不了两种命运。' },
        { t: '是判别法不够好，用更精细的证明可以补上 $L=1$ 的情形', why: '补不上：反例已经给出了两个 $L=1$ 却结论相反的级数。任何只看这一个极限值的判据都必然在此弃权。' },
        { t: '因为 $L=1$ 时级数一定发散，只是习惯说「失效」', why: '$\\sum 1/n^2$ 的比值极限是 1 而它收敛（和为 $\\pi^2/6$）。所以 $L=1$ 既可能收敛也可能发散，「失效」是字面意思。' },
      ]"
      :answer="0"
    />

    <h2><span class="sec-no">伍</span>买到了什么：为什么医生说"吃满三天才见效"</h2>

    <h3>一天两次的药，体内到底攒了多少</h3>
    <p>
      <strong>画面。</strong>医生开了药：<strong>每 8 小时吃一次，每次 500 mg</strong>。
      你多半以为体内的药量就是 500 mg 上下。<strong>其实不是</strong>——
      第二次吃药时，第一次的药还没排完；第三次吃时，前两次的都还剩一点。
      药量在<strong>累积</strong>。累积到什么程度？会不会一直涨下去？
    </p>
    <p>
      <strong>为什么绕道级数。</strong><router-link to="/calculus/integral">积分那一讲</router-link>
      算过单次给药的<strong>曲线下面积</strong>，但那只管一次。
      现在要问的是<strong>无穷多次给药叠加</strong>的结果——
      每一次都在前面所有次的残留之上。这正是"把无穷多项加起来"。
    </p>
    <p>
      <strong>推导。</strong>设药物的半衰期是 <MathInline tex="t_{1/2}=6" /> 小时
      （很多常见药就在这个量级），给药间隔 <MathInline tex="\tau=8" /> 小时。
      经过一个间隔，体内剩下的比例是
    </p>
    <MathBlock tex="r = \Bigl(\frac12\Bigr)^{\tau/t_{1/2}} = 0.5^{8/6} = 0.3969" />
    <p>
      现在盯住"<strong>刚吃下第 n 片药那一刻</strong>"的体内总量。
      第 n 片是新的（500），第 n−1 片衰减了一个间隔（<MathInline tex="500r" />），
      第 n−2 片衰减了两个间隔（<MathInline tex="500r^2" />）……于是
    </p>
    <MathBlock tex="C_n = 500\bigl(1 + r + r^2 + \cdots + r^{n-1}\bigr) = 500\,\frac{1-r^{n}}{1-r}" />
    <p>
      这是<strong>等比级数的部分和</strong>——中学的公式，这里第一次派上真用场。
      <MathInline tex="|r|<1" />，所以它收敛：
    </p>
    <MathBlock tex="C_{\infty} = \frac{500}{1-r} = \frac{500}{0.6031} = 829.0\ \text{mg}" />
    <p>
      <strong>读出物理：三个都能对照说明书查的结论。</strong>
    </p>
    <ul>
      <li>
        <strong>稳态存在。</strong>药量不会无限涨，它趋于一个<strong>平台</strong>：
        峰值 829 mg、谷值 <MathInline tex="829\times 0.3969 = 329" /> mg，
        此后每天都在这两个数之间起伏。<strong>是"级数收敛"保证了吃一辈子也不会中毒。</strong>
      </li>
      <li>
        <strong>稳态是单次剂量的 1.66 倍。</strong>系数
        <MathInline tex="1/(1-r) = 1.658" /> 叫<strong>蓄积因子</strong>。
        间隔越短、半衰期越长，r 越接近 1，这个因子越大——
        <MathInline tex="1/(1-r)" /> 在 <MathInline tex="r\to1" /> 时爆炸，
        这正是"擅自缩短服药间隔"危险的数学原因。
      </li>
      <li>
        <strong>"吃满三天才见效"是算得出来的。</strong>要达到稳态的 90%，
        需要 <MathInline tex="1-r^n \ge 0.9" />，即
        <MathInline tex="r^n\le 0.1" />，解得
        <MathInline tex="n \ge \ln 0.1/\ln r = 2.49" />，取 <strong>n = 3 次</strong>，
        也就是 24 小时。逐次算给你看：500.0 → 698.4 → <strong>777.2</strong>
        → 808.4 → 820.8 mg，第三次确实过了 829 的九成。
        <strong>医生那句"要吃几天才起效"，说的就是这条级数爬到平台需要几项。</strong>
      </li>
    </ul>
    <p>
      <strong>条件不成立会怎样。</strong>这套算法假设了<strong>每次剂量相同、间隔严格相等、
      清除速率恒定</strong>。现实中三条都会破：漏服一次相当于在级数里跳过一项
      （谷值会掉下去，所以有些药强调"想起来就补"）；肝肾功能下降会让
      <MathInline tex="t_{1/2}" /> 变长、r 变大，<strong>同样的处方会把平台顶到危险高度</strong>
      ——这就是为什么老年人和肝肾病人要调整剂量。而某些药物（如乙醇、苯妥英）
      的清除<strong>不是</strong>按比例的（酒精基本是恒速代谢），
      那时 r 这个模型整个失效，需要换非线性的药代动力学。
    </p>

    <h3>1735 年：欧拉算出了那个"该收敛到几"的问题</h3>
    <p>
      本讲的判别法只能回答"<strong>收不收敛</strong>"，回答不了"<strong>收敛到几</strong>"。
      后者往往难得多。最著名的例子是<strong>巴塞尔问题</strong>——
      1650 年由门戈利提出：
    </p>
    <MathBlock tex="1+\frac14+\frac19+\frac1{16}+\cdots = \sum_{n=1}^{\infty}\frac{1}{n^2} = \;?" />
    <p>
      积分判别法一秒钟就知道它收敛（上面算过），可它等于几？
      雅各布·伯努利公开求解而不得，坦承"若有人能解出并告知我们，
      我们将不胜感激"。这个问题<strong>难住了整个欧洲八十多年</strong>。
    </p>
    <p>
      1735 年，28 岁的<strong>欧拉</strong>给出了答案：
      <MathInline tex="\pi^2/6 = 1.6449341" />。
      <strong>一个只跟平方数有关的和，答案里冒出了圆周率</strong>——
      这在当时是纯粹的震撼。（他的第一个证法大胆到近乎无理：
      把 <MathInline tex="\sin x/x" /> 当成"无穷次多项式"来做因式分解，
      再比较 <MathInline tex="x^2" /> 的系数。这一步在当时毫无根据，
      一百年后才被严格化——而它的正当性，
      正来自<router-link to="/complex/holomorphic">复变函数</router-link>里的
      整函数分解定理。）
    </p>
    <p>
      顺带看一眼收敛速度：直接加<strong>前 1000 项</strong>只得到 1.6439346，
      与真值差 <MathInline tex="1.0\times10^{-3}" />——<strong>加一千项才对三位小数</strong>。
      这就是为什么欧拉必须另辟蹊径，而不是硬算；
      也是<router-link to="/numerical/quadrature">数值分析</router-link>里
      "加速收敛"成为一门技术的原因。
    </p>
    <div class="insight">
      <div class="insight-title">🔗 这一讲往后通到哪：站内连一连</div>
      <p>
        <strong>泰勒展开</strong>：<router-link to="/calculus/taylor">那一讲</router-link>的
        收敛半径，用本讲的比值判别法一算就出；而"能不能逐项求导"靠的是绝对收敛；
        <strong>数理方程</strong>：<router-link to="/mathphys/heat">傅里叶级数</router-link>
        是另一种"无穷和"，它的收敛问题（狄利克雷 1829）比幂级数微妙得多——
        那里的吉布斯现象就是收敛<em>不一致</em>的后果；
        <strong>概率论</strong>：<router-link to="/probability/distribution">离散分布</router-link>
        的期望是一个级数，条件收敛时"期望不存在"（圣彼得堡悖论就是这么来的）；
        <strong>复变函数</strong>：<router-link to="/complex/continuation">解析延拓</router-link>
        那一讲里"<MathInline tex="1+2+3+\cdots=-1/12" />"之所以不是胡话，
        恰恰因为它<strong>不是本讲定义下的和</strong>——换了一套求和的定义；
        <strong>数值分析</strong>：级数求和的<router-link to="/numerical/float-error">浮点陷阱</router-link>
        （从大加到小 vs 从小加到大，结果不同）是那一讲的经典实验。
      </p>
    </div>
  </ConceptPage>
</template>
