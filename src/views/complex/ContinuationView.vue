<script setup>
import ConceptPage from '../../components/ConceptPage.vue'
import MathBlock from '../../components/MathBlock.vue'
import MathInline from '../../components/MathInline.vue'
import RevealBox from '../../components/RevealBox.vue'
import QuizBox from '../../components/QuizBox.vue'
import ContinuationDemo from '../../demos/ContinuationDemo.vue'
</script>

<template>
  <ConceptPage slug="continuation">
    <h2><span class="sec-no">壹</span>困境：级数死了，函数还活着吗</h2>
    <p>从一个你熟悉的等式说起：</p>
    <MathBlock tex="1 + z + z^2 + z^3 + \cdots = \frac{1}{1 - z}, \qquad |z| < 1" />
    <p>
      左边只在单位圆盘内收敛——|z| ≥ 1 时级数干脆利落地发散。可右边这个函数，
      除了 z = 1 一个点，<strong>整个复平面上处处有意义</strong>：z = 2 时它等于 −1，z = −3 时等于 1/4。
      级数只是函数的一件"小了几号的衣服"。于是一个自然的问题：
      <strong>如果我们手里只有那个级数（衣服），能不能恢复出整个函数（本体）？恢复出的本体是唯一的吗？</strong>
    </p>
    <p>
      顺带先记下一个眼下看着像胡话的等式，本讲末尾要回来结账。你大概在哪儿刷到过：
    </p>
    <MathBlock tex="1 + 2 + 3 + 4 + \cdots = -\tfrac{1}{12}" />
    <p>
      一堆正数加出一个负分数，怎么看都是耍流氓。但它跟上面那件事其实是<strong>同一类事</strong>——
      注意 <MathInline tex="1 + z + z^2 + \cdots" /> 在 <MathInline tex="z = 2" /> 处也"等于"
      <MathInline tex="-1" />，虽然 <MathInline tex="1+2+4+8+\cdots" /> 明摆着发散。
      读完这一讲你会知道这句话的严格版本该怎么写。
    </p>
    <p>
      这不是无聊的哲学题。19 世纪的数学家手里攥着一堆"只在半张纸上有定义"的函数，
      最著名的一个是<strong>黎曼 ζ 函数</strong>：
    </p>
    <MathBlock tex="\zeta(s) = 1 + \frac{1}{2^s} + \frac{1}{3^s} + \frac{1}{4^s} + \cdots" />
    <p>
      （<MathInline tex="s" /> 是复数；<MathInline tex="n^{-s}" /> 的意思是
      <MathInline tex="e^{-s\ln n}" />。）它只在 <MathInline tex="\operatorname{Re} s > 1" />
      时收敛——比如 <MathInline tex="s=2" /> 给出欧拉当年一举成名的
      <MathInline tex="\zeta(2) = \pi^2/6" />，而 <MathInline tex="s=1" /> 就是发散的调和级数。
    </p>
    <p>
      这里得先解释一件事，否则整讲的动机是空的：<strong>一个关于全体正整数的级数，
      凭什么能讲素数的事？</strong>桥是欧拉 1737 年架的，而且架得非常朴素——
      就是中学生都会的<strong>埃拉托色尼筛法</strong>，只不过用级数写了一遍。
    </p>
    <RevealBox
      title="🔍 欧拉乘积：把筛法写成等式，素数就从 ζ 里掉出来了"
      label="对答案 / 看完整拆解"
    >
      <template #hint>
        先自己动笔：把 <MathInline tex="\zeta(s)" /> 整体乘以 <MathInline tex="2^{-s}" />，
        得到的是哪些项？拿 <MathInline tex="\zeta(s)" /> 减去它，又剩下哪些项？
        （盯着分母的编号看。）再对 3 做一遍，你会想起小学做过的什么事？
      </template>
      <p>
        <strong>第一步：乘 <MathInline tex="2^{-s}" /> 再相减。</strong>
        <MathInline tex="2^{-s}\zeta(s) = \frac{1}{2^s} + \frac{1}{4^s} + \frac{1}{6^s} + \cdots" />
        ——分母恰好是全体<strong>偶数</strong>。拿原级数减掉它：
      </p>
      <MathBlock tex="(1 - 2^{-s})\,\zeta(s) = 1 + \frac{1}{3^s} + \frac{1}{5^s} + \frac{1}{7^s} + \cdots" />
      <p><strong>偶数项被划掉了。</strong>这不就是筛法的第一刀吗。</p>
      <p>
        <strong>第二步：对 3 再来一遍。</strong>把上式乘 <MathInline tex="3^{-s}" /> 再相减，
        剩下的分母就是"既不被 2 整除、也不被 3 整除"的数：
      </p>
      <MathBlock tex="(1 - 3^{-s})(1 - 2^{-s})\,\zeta(s) = 1 + \frac{1}{5^s} + \frac{1}{7^s} + \frac{1}{11^s} + \cdots" />
      <p>
        <strong>第三步：对每个素数都来一遍。</strong>每划一次，就删掉一个素数的所有倍数。
        全体素数轮完之后，因为<strong>每个大于 1 的整数都至少有一个素因子</strong>
        （算术基本定理），除了 <MathInline tex="1" /> 以外的项统统被划光，右边只剩一个孤零零的 1：
      </p>
      <MathBlock tex="\Bigl[\prod_{p\ \text{素数}} (1 - p^{-s})\Bigr]\zeta(s) = 1 \quad\Longrightarrow\quad \zeta(s) = \prod_{p\ \text{素数}} \frac{1}{1 - p^{-s}}" />
      <p>
        左边是<strong>对全体正整数求和</strong>，右边是<strong>对全体素数求积</strong>，
        中间连着一个等号。这就是 <MathInline tex="\zeta" /> 与素数的全部渊源：
        任何关于 <MathInline tex="\zeta" /> 的信息，都能翻译成关于素数的信息。
        顺带一提，右边这个乘积也顺手证明了<strong>素数有无穷多个</strong>——
        若只有有限个，右边在 <MathInline tex="s \to 1" /> 时是个有限数，
        可左边是发散的调和级数。
      </p>
    </RevealBox>
    <p>
      桥搭好了，麻烦也来了：素数的秘密藏在 <MathInline tex="\zeta" /> 的<strong>零点</strong>里，
      而那些零点根本不在 <MathInline tex="\operatorname{Re} s > 1" /> 这半张纸上。
      想追问下去，就必须让 <MathInline tex="\zeta" /> 活到收敛域之外去。
    </p>
    <div class="story">
      <div class="story-title">📜 1859 年 · 八页纸的遗产</div>
      <p>
        <strong>黎曼</strong>一生只写过一篇数论文章——1859 年《论小于给定数值的素数个数》，共八页。
        他把 ζ 延拓到整个复平面（只在 s = 1 留一个极点），发现素数的分布规律被编码在
        <strong>延拓后</strong>的 ζ 的零点位置里，并顺手写下一句"很可能所有非平凡零点都在直线
        Re s = 1/2 上"——这就是<strong>黎曼猜想</strong>，一百六十多年后仍是数学第一悬案。
        注意逻辑链条：没有解析延拓，ζ 在零点所在的区域<strong>根本没有定义</strong>——
        延拓不是锦上添花，是这一切故事的先决条件。
      </p>
    </div>

    <h2><span class="sec-no">贰</span>破局：解析函数是刚体，认一小段就认全体</h2>
    <p>延拓的可行性与唯一性，靠的都是解析函数的"刚性"：</p>
    <div class="insight">
      <div class="insight-title">💡 核心直觉：一小段决定全体</div>
      <p>
        <strong>唯一性定理</strong>：两个解析函数只要在一小段弧（甚至一列聚点）上相等，就在整个连通区域上相等。
        实函数毫无此性质——你可以把实函数的一段随意改掉再光滑接回去；解析函数不行，
        它像一块<strong>刚体</strong>：抓住一角，整体的姿态就定了（道理不神秘：一小段确定该处全部导数，
        确定泰勒级数，级数又确定邻域，邻域再向外传播——上一讲"收敛盘顶到奇点"的圆盘一个接一个铺过去）。
        所以"恢复本体"如果可行，<strong>答案必唯一</strong>——延拓不是发明，是发现。
      </p>
    </div>
    <p>
      操作上就是动画里的"<strong>圆盘接力</strong>"：在收敛盘边缘附近取一个新中心，
      把函数在那里<strong>重新泰勒展开</strong>，新级数的收敛盘会伸出旧盘之外；
      一步一盘，函数的领土不断扩张，直到被"天然边界"（奇点连成墙）挡住为止。
      这话听着抽象，其实动一次笔就完全具体了——拿开篇那个级数走一步给你看：
    </p>
    <RevealBox
      title="🔍 真接一步：把 Σzⁿ 的地盘从「|z| < 1」扩到「z = −2 也算数」"
      label="对答案 / 看完整拆解"
    >
      <template #hint>
        先自己动笔：把 <MathInline tex="\frac{1}{1-z}" /> 在新中心
        <MathInline tex="a = -\tfrac12" /> 处重新展成幂级数。
        办法是把分母凑成 <MathInline tex="(1-a) - (z-a)" /> 再提公因子，
        剩下的又是等比级数。展完看看：这个新级数的收敛半径是多少，它盖住了哪些原来盖不到的点？
      </template>
      <p>
        <strong>第一步：换个中心重写分母。</strong>令 <MathInline tex="w = z - a" />
        （<MathInline tex="a = -\tfrac12" />），那么 <MathInline tex="z = a + w" />，
      </p>
      <MathBlock tex="\frac{1}{1-z} = \frac{1}{(1-a) - w} = \frac{1}{1-a}\cdot\frac{1}{1 - \frac{w}{1-a}}" />
      <p>
        <strong>第二步：右边那个又是等比级数。</strong>代
        <MathInline tex="1 - a = \tfrac32" />，用
        <MathInline tex="\frac{1}{1-q} = \sum q^n" />（这里
        <MathInline tex="q = \frac{w}{3/2}" />）：
      </p>
      <MathBlock tex="\frac{1}{1-z} = \frac{2}{3}\sum_{n=0}^{\infty}\Bigl(\frac{z + \frac12}{3/2}\Bigr)^{n}" />
      <p>
        <strong>第三步：看新盘有多大。</strong>等比级数要 <MathInline tex="|q| < 1" />，即
        <MathInline tex="\bigl|z + \tfrac12\bigr| < \tfrac32" />——
        圆心 <MathInline tex="-\tfrac12" />、半径 <MathInline tex="\tfrac32" /> 的圆盘。
        （半径正好是圆心到奇点 <MathInline tex="z=1" /> 的距离，
        <router-link to="/complex/residue">上一讲</router-link>那条"收敛半径顶到最近奇点"再次现身。）
      </p>
      <p>
        <strong>第四步：数一数赚到了什么。</strong>老盘是 <MathInline tex="|z| < 1" />，
        在实轴上就是 <MathInline tex="(-1,\, 1)" />；新盘在实轴上是
        <MathInline tex="(-2,\, 1)" />。<MathInline tex="z = -1.5" /> 原来的级数
        <MathInline tex="1 - 1.5 + 2.25 - \cdots" /> 发散得一塌糊涂，
        <strong>新级数却收敛</strong>，而且收敛到
        <MathInline tex="\frac{1}{1-(-1.5)} = 0.4" />。
      </p>
      <p>
        全程<strong>没有任何一步用到"我们早就知道答案是 <MathInline tex="1/(1-z)" />"</strong>——
        用的只是"在老盘内部一点处，函数的各阶导数都算得出来，于是能重新展开"。
        所以哪怕手里只有级数、根本不知道闭形式，这一步照样走得通。
        再选新中心、再走一步，圆盘一个接一个铺过去，就绕过奇点走到了任何想去的地方。
        对 <MathInline tex="1/(1-z)" />，挡路的墙只有 <MathInline tex="z=1" /> 一块砖，绕过去畅通无阻。
      </p>
    </RevealBox>
    <QuizBox
      quiz-id="continuation-q1"
      question="你手里只有 $1+z+z^2+\cdots$ 在单位圆盘里的那一段。要把它延拓到 $z=-1.5$，圆盘接力的路线可以摆得千奇百怪。那么不同人铺出来的延拓结果之间是什么关系？"
      hint="回想贰节那条「一小段决定全体」：新中心处的泰勒系数是谁定的？"
      :options="[
        { t: '只要终点落在同一个连通区域里、路上没绕过奇点，结果就完全一样——那一小段已经把整条函数钉死了', why: '对。唯一性定理说的正是这件事：两个解析函数只要在一个有聚点的点集上相等（这里干脆是整整一个圆盘），就在整个连通区域上处处相等。所以延拓是发现，不是发明。' },
        { t: '不一样。换个新中心就是换了一个新级数，得到的当然是另一个函数', why: '你把函数的一件「衣服」当成了函数本体。新中心处的泰勒系数一点自由度也没有：它们由老盘内部那点上的各阶导数算出来，而那些导数早被老级数定死了。' },
        { t: '一样，但那是因为我们事先知道答案是 $\\frac{1}{1-z}$；要是手里只有级数就说不准了', why: '很常见的顾虑，可贰节那步接力全程没用过闭形式，只用了「老盘内部一点处各阶导数都算得出来」。知不知道闭形式，不影响唯一性。' },
        { t: '不好说，要看延拓时用的是泰勒级数还是别的展开方法', why: '方法确实可以千奇百怪，但结论被唯一性定理管着：只要两个结果都在同一个连通区域上解析、且在出发的那一小段上与原函数相等，它们就必须处处相等。' },
      ]"
      :answer="0"
    />
    <p>
      <strong>回到开篇那句"胡话"。</strong>把 ζ 一路延拓过去（黎曼那八页纸干的就是这件事，
      结果是：<MathInline tex="\zeta" /> 在整个复平面上解析，只在 <MathInline tex="s=1" /> 留一个极点），
      延拓后的函数在 <MathInline tex="s = -1" /> 处有一个确定的值：
      <MathInline tex="\zeta(-1) = -\tfrac{1}{12}" />。
      而<strong>若</strong>把定义级数硬代进 <MathInline tex="s = -1" />，形式上写出来正是
      <MathInline tex="1 + 2 + 3 + \cdots" />。所以那句网红等式的严格版本是：
    </p>
    <p>
      <strong>"1+2+3+⋯ = −1/12"错；"ζ 的解析延拓在 −1 处取值 −1/12"对。</strong>
      等号左右两边住在不同的数学句子里。这和开篇那个例子一模一样：
      <MathInline tex="1+2+4+8+\cdots" /> 不等于 <MathInline tex="-1" />，
      但"<MathInline tex="\sum z^n" /> 的解析延拓在 <MathInline tex="z=2" /> 处取值
      <MathInline tex="-1" />"完全成立。<strong>发散的是级数（衣服），不是函数（本体）。</strong>
    </p>
    <p>
      那 <MathInline tex="-1/12" /> 这个具体数字是怎么冒出来的？黎曼那篇八页论文有两个核心结果：
      一个是把 <MathInline tex="\zeta" /> 延拓到整个复平面，另一个是一条<strong>函数方程</strong>——
      它把 <MathInline tex="s" /> 处的值和 <MathInline tex="1-s" /> 处的值钉在一起，
      于是"左半平面"的值可以由"右半平面"（级数还老老实实收敛的地方）换算出来。
      这条方程的证明超出本讲，但请留意它的地位：<strong>整条 <MathInline tex="-1/12" /> 的推导里，
      黑箱只有这一条方程</strong>。把它当已知之后，剩下每一步都是当场可验的算术——
      查一个正弦值、算一个阶乘、代一个欧拉早就算出的收敛级数，仅此而已。
    </p>
    <p>
      动手之前还有一个零件要认个脸：<strong>Γ 函数</strong>。
      阶乘 <MathInline tex="n!" /> 本来只对正整数有定义（<MathInline tex="3! = 6" />，
      可"2.5 的阶乘"是什么？没人规定过）。Γ 干的事，就是把阶乘这张<strong>只画在整数点上的散点图，
      内插成一条画在一切数上的光滑曲线</strong>，记号约定是
      <MathInline tex="\Gamma(n) = (n-1)!" />（差的这个 1 是历史遗留的写法习惯，别被它绊住）。
      拿整数点验两个就有感觉了：<MathInline tex="\Gamma(2) = 1! = 1" />，
      <MathInline tex="\Gamma(4) = 3! = 6" />。
      本讲用到 Γ 的地方<strong>全都落在整数点上</strong>，所以你现在完全可以把它读成
      "错开一位的阶乘"；至于它在非整数点上凭什么有唯一的取法，正是伍节要还的一笔账。
    </p>
    <RevealBox
      title="🔍 −1/12 到底从哪来：把 s = −1 代进函数方程"
      label="对答案 / 看完整拆解"
    >
      <template #hint>
        先自己代一步（函数方程写在下面，当已知用）：把
        <MathInline tex="s = -1" /> 代进去，右边会用到
        <MathInline tex="\sin(-\pi/2)" />、<MathInline tex="\Gamma(2)" /> 和
        <MathInline tex="\zeta(2)" /> 三个值——它们各等于几？
        （Γ 刚在上面认过脸，这里只用整数点；<MathInline tex="\zeta(2)" /> 就是欧拉那个成名作。）
      </template>
      <p><strong>函数方程</strong>（黎曼 1859，本讲当已知）：</p>
      <MathBlock tex="\zeta(s) = 2^{s}\,\pi^{s-1}\,\sin\!\Bigl(\frac{\pi s}{2}\Bigr)\,\Gamma(1-s)\,\zeta(1-s)" />
      <p>
        它的漂亮之处在于<strong>把复平面沿 <MathInline tex="\operatorname{Re}s = 1/2" />
        对折了起来</strong>：<MathInline tex="s" /> 与 <MathInline tex="1-s" /> 关于这条竖线对称。
        黎曼猜想里那条"临界线"，就是这条折痕。
      </p>
      <p><strong>代 <MathInline tex="s = -1" />，右边需要四个零件：</strong></p>
      <ul>
        <li><MathInline tex="2^{-1} = \tfrac12" />，<MathInline tex="\pi^{-2} = 1/\pi^2" />；</li>
        <li><MathInline tex="\sin(-\pi/2) = -1" />；</li>
        <li><MathInline tex="\Gamma(1-(-1)) = \Gamma(2) = 1! = 1" />；</li>
        <li>
          <MathInline tex="\zeta(1-(-1)) = \zeta(2) = \tfrac{\pi^2}{6}" />——
          注意这一项落在 <MathInline tex="\operatorname{Re}s>1" /> 里，
          <strong>原始级数在那儿是收敛的</strong>，值是欧拉 1735 年算出的巴塞尔问题答案。
        </li>
      </ul>
      <p>乘起来：</p>
      <MathBlock tex="\zeta(-1) = \tfrac12 \cdot \frac{1}{\pi^2} \cdot (-1) \cdot 1 \cdot \frac{\pi^2}{6} = -\frac{1}{12}" />
      <p>
        <MathInline tex="\pi^2" /> 上下一约就没了，剩下
        <MathInline tex="-\tfrac12\cdot\tfrac16" />。
        <strong>这个数不是"把正整数加出来的"，是从 <MathInline tex="\zeta(2) = \pi^2/6" />
        换算过来的</strong>——而 <MathInline tex="\zeta(2)" /> 那边的级数老老实实收敛。
        整条路径上没有任何一步在给发散级数求和。
      </p>
    </RevealBox>
    <p>
      物理学家在弦论、卡西米尔效应之类的计算里用到这个值，用的正是延拓值：
      他们的计算中途会冒出一个形如 <MathInline tex="1+2+3+\cdots" /> 的发散和，
      而把它替换成 <MathInline tex="\zeta(-1) = -1/12" /> 之后，
      算出来的最终结果<strong>和实验对得上</strong>。这不是"把正整数加出了负数"，
      是"那个发散和本来就是某个解析函数在错误地点的错误写法，换成正确写法即可"。
      这句话听着像辩解，所以伍节会挑其中最干净的一件事——真空里两块金属板互相吸引——
      从画面一路走到实验数字，让你自己判断这套做法站不站得住。
    </p>
    <QuizBox
      quiz-id="continuation-q2"
      question="网上流传的那句 $1+2+3+\cdots = -\frac{1}{12}$，严格说来对不对？"
      hint="先分开问两件事：那个级数收敛吗？那个数错了吗？"
      :options="[
        { t: '不对。左边的级数是发散的，等号立不起来；对的说法是「$\\zeta$ 的解析延拓在 $s=-1$ 处取值 $-\\frac{1}{12}$」', why: '对。发散的是级数（衣服），不是函数（本体）。而 $-\\frac{1}{12}$ 是从收敛的 $\\zeta(2)=\\pi^2/6$ 经函数方程换算过来的，整条路径上没有任何一步在给发散级数求和。' },
        { t: '对。只要换一种「特殊的求和法」，正整数之和确实就等于 $-\\frac{1}{12}$', why: '这话把「换一套记账办法」偷换成了「和真的等于它」。部分和 1, 3, 6, 10, … 一路奔向无穷，这一点没有哪种说法能改；存在的不是正整数之和，而是延拓值。' },
        { t: '不对，因为一堆正数加起来不可能是负数，所以 $-\\frac{1}{12}$ 这个数本身就是错的', why: '结论蒙对了，理由却反了：错的是那个等号，不是那个数。$\\zeta(-1)=-\\frac{1}{12}$ 是硬邦邦算出来的，而且自然界还真按它付账（伍节要拿实验说话）。' },
        { t: '对，但只在物理里对，数学上不对', why: '物理里并没有另一套数学。物理学家用的就是 $\\zeta(-1)$ 这个延拓值，把它写成 $1+2+3+\\cdots$ 只是速记；速记当成等式，物理上和数学上一样不成立。' },
      ]"
      :answer="0"
    />

    <h2><span class="sec-no">叁</span>亲手铺一条圆盘链</h2>
    <ContinuationDemo />

    <h2><span class="sec-no">肆</span>严格定义</h2>
    <div class="definition">
      <div class="def-title">📐 定义（解析延拓）与定理（唯一性）</div>
      <p>
        设 f 在区域 D 内解析，<MathInline tex="D \subset D'" />。若存在 D′ 内解析的 F 使
        <MathInline tex="F|_D = f" />，称 F 为 f 到 D′ 的<strong>解析延拓</strong>。
      </p>
      <p>
        <strong>唯一性定理</strong>：若 f、g 在连通区域 Ω 内解析，且在 Ω 内某个<strong>有聚点</strong>的点集上相等，
        则 f ≡ g 于 Ω。因此解析延拓（若存在）唯一。
      </p>
    </div>
    <p>小字里的门道：</p>
    <ul>
      <li>
        <strong>"有聚点"是命门</strong>。"有聚点"的意思是：这堆点里能找出一串，
        <strong>越挤越近、挤向某一个点</strong>（那个点就叫聚点）。
        比如 <MathInline tex="1, \tfrac12, \tfrac13, \tfrac14, \ldots" /> 挤向 0，算有聚点；
        而全体整数 <MathInline tex="0, \pm1, \pm2, \ldots" /> 彼此永远隔着 1，算没有。
        为什么非要挤？因为要榨出导数——导数是"差商的极限"，
        点若不挤成一堆，连一阶导数都算不出来，更别说定死整条泰勒级数。
        反例就摆在眼前：<MathInline tex="\sin \pi z" /> 与常值 0 在<strong>所有整数</strong>处都相等，
        可它俩显然不是同一个函数；
      </li>
      <li>
        <strong>"连通"也不能少</strong>：两个互不相连的区域各自为政，一边定死不了另一边；
      </li>
      <li>
        <strong>延拓可能失败</strong>：有的函数四面都是"墙"——如 <MathInline tex="\sum z^{2^n}" />
        在单位圆的每一点都奇异（自然边界），一步也延拓不出去。能不能出去，是函数自己的性质；
      </li>
      <li>
        <strong>绕不同的路可能到不同的"层"</strong>：对 <MathInline tex="\sqrt{z}" />、log z，
        绕原点一圈延拓回出发点，函数值差了一个分支（log 多了 2πi）——上一讲"辐角绕圈回不来"的老朋友。
        黎曼的解法石破天惊：那就让定义域本身变成多层的螺旋面（<strong>黎曼面</strong>）——
        与其说函数多值，不如说平面太小。
      </li>
    </ul>
    <QuizBox
      quiz-id="continuation-q3"
      question="从 $z=1$ 出发（约定 $\sqrt{1}=1$）把 $\sqrt{z}$ 延拓到 $z=-1$：一条路线走上半平面绕过去，另一条走下半平面。两条路线给出的值一样吗？"
      hint="唯一性定理有一个前提词，回头在定义框里找一下——再看看这两条路合起来围出了什么。"
      :options="[
        { t: '不一样，差一个负号：绕过原点这个奇点就落到了另一层（黎曼面）；只有路径没把奇点圈进去时，两条路才必定同结果', why: '对。上半平面那条路辐角从 0 走到 $\\pi$，得 $i$；下半平面那条走到 $-\\pi$，得 $-i$。两条路合起来正好绕原点一圈，函数值翻了号——与其说函数多值，不如说平面太小，黎曼面就是为此发明的。' },
        { t: '一样。唯一性定理说了延拓唯一，所以任意两条路径都必须给出同一个值', why: '唯一性定理的前提是「在一个连通区域上解析」。$\\sqrt{z}$ 在原点不解析，两条路把它圈在了中间，谁也没法在整个圈起来的区域上把两个结果连成一个解析函数，前提就不成立了。' },
        { t: '不一样，因为两条路上取的圆盘中心不同，累积的数值误差不同', why: '这里没有数值误差可言，每一步都是精确的重新展开。差别是拓扑性质的：只看绕没绕过奇点，跟你把圆盘摆在哪儿完全无关。' },
        { t: '一样，只要两条路都不经过原点这个奇点就行', why: '不经过还不够。要紧的是两条路合起来的闭曲线有没有把奇点套在里面——这里两条路都躲开了原点，可它们围成的圈正好套住原点，值就对不上了。' },
      ]"
      :answer="0"
    />

    <h2><span class="sec-no">伍</span>买到了什么：自然界按延拓值付账</h2>

    <h3>卡西米尔效应：真空里的两块金属板，为什么自己吸到一起</h3>
    <p>
      这一讲到现在为止，全是数学内部的事。可 <MathInline tex="\zeta(-1) = -\tfrac{1}{12}" />
      有一个非常不数学的去处：它出现在一张<strong>实验账单</strong>上。
    </p>
    <p>
      <strong>先给画面。</strong>真空舱里挂两块平行的金属板，相距一微米
      （大约头发丝直径的百分之一）。两块板<strong>不带电、不通电、不磁化</strong>，
      中间的空气也抽干净了。按中学物理，它们之间不该有任何力。
      可它们会<strong>互相吸引</strong>，而且靠得越近吸得越凶。
      1948 年，荷兰物理学家<strong>卡西米尔</strong>（Hendrik Casimir）算出了这个力——
      他当时在飞利浦实验室里研究胶体悬浮为什么会沉淀，本来是桩工业活。
      预言之后将近半个世纪都测不准，直到 1997 年 Lamoreaux 用一台扭秤第一次精确测到，
      与理论符合到百分之几的水平；此后用原子力显微镜做的实验把符合度推进到 1% 的量级。
    </p>
    <p>
      <strong>为什么这事非绕道本讲不可。</strong>量子理论说真空不空：电磁场的每一个
      允许存在的振动模式，哪怕里面一个光子也没有，也仍然带着一份抹不掉的<strong>零点能</strong>
      <MathInline tex="\tfrac12\hbar\omega" />（这跟量子力学里"谐振子的基态能量不为零"是同一件事）。
      两块板一夹，中间就只剩<strong>驻波</strong>能存在：像吉他弦两端被按死一样，
      板间距里必须正好塞进整数个半波长。<strong>"只能取整数"这四个字是全部关键</strong>——
      模式于是按 <MathInline tex="n = 1, 2, 3, \ldots" /> 编号，频率正比于
      <MathInline tex="n" />，把这些 <MathInline tex="\tfrac12\hbar\omega" /> 全加起来，
      纸上冒出来的东西正是开篇那句"胡话"的形状：<MathInline tex="1 + 2 + 3 + \cdots" />。
      板外的空间没人限制，模式是连续的——两边的账不一样，那个<strong>差额</strong>才是要算的东西。
    </p>
    <p><strong>推导的逻辑链：前两步是认脸，后两步是本讲的活。</strong></p>
    <ul>
      <li>
        ① 板间零点能的总和，形式上是（一个常数）乘以
        <MathInline tex="(1 + 2 + 3 + \cdots)" />，发散——物理学家头一回算到这里也想撕纸；
      </li>
      <li>
        ② 认一下这个和的身份：它正是 <MathInline tex="\zeta(s) = \sum n^{-s}" /> 在
        <MathInline tex="s = -1" /> 处的<strong>级数写法</strong>。级数写法在那里失效了，
        <strong>函数并没有失效</strong>——这就是本讲从头讲到尾的那句话；
      </li>
      <li>
        ③ 于是换成贰节已经当场算出来的延拓值 <MathInline tex="\zeta(-1) = -\tfrac{1}{12}" />。
        回想那个数的来路：它是从收敛的 <MathInline tex="\zeta(2) = \pi^2/6" /> 经函数方程
        换算过来的，整条路径上没有任何一步在给发散级数求和；
      </li>
      <li>
        ④ 无穷大当场塌成一个有限的负数：板间的零点能<strong>比同一块空间在板不在时更低</strong>，
        而且板越近越低。能量随距离减小而下降，就等于有一个把两块板往一起拉的力。
      </li>
    </ul>
    <p>
      真实的三维平板还要对两个横向方向多求一次和（板面上的波可以斜着跑），
      落地的是同一族公式的另一个成员 <MathInline tex="\zeta(-3) = \tfrac{1}{120}" />——
      同一条函数方程照代不误，推导见下面的框。最后的结果只有一行：
    </p>
    <MathBlock tex="\frac{E}{A} = -\frac{\pi^2 \hbar c}{720\, d^3}, \qquad \frac{F}{A} = -\frac{\pi^2 \hbar c}{240\, d^4}" />
    <p>
      <MathInline tex="d" /> 是板间距，<MathInline tex="A" /> 是板面积，
      <MathInline tex="\hbar" /> 是普朗克常数除以 <MathInline tex="2\pi" />，
      <MathInline tex="c" /> 是光速；负号表示"吸引"。
      第二式就是第一式对 <MathInline tex="d" /> 求一次导（能量随距离怎么降，力就有多大），
      <MathInline tex="d^{-3}" /> 求导掉出一个 3，<MathInline tex="720/3 = 240" />。
      值得盯一眼的是：<strong>这两行里没有一个可调参数</strong>——没有材料常数、没有电荷、
      没有拟合系数，只有两个自然常数和一个几何长度。理论要是错了，无处可赖。
    </p>
    <RevealBox
      title="🔍 同一条函数方程，这次代 s = −3"
      label="对答案 / 看完整拆解"
    >
      <template #hint>
        照贰节的样子再走一遍：把 <MathInline tex="s = -3" /> 代进函数方程，
        右边会用到 <MathInline tex="\sin(-3\pi/2)" />、<MathInline tex="\Gamma(4)" /> 和
        <MathInline tex="\zeta(4) = \pi^4/90" />。留意第一个的正负号跟上次不一样。
      </template>
      <p>四个零件逐个摆出来：</p>
      <ul>
        <li><MathInline tex="2^{-3} = \tfrac18" />，<MathInline tex="\pi^{-4} = 1/\pi^4" />；</li>
        <li>
          <MathInline tex="\sin(-3\pi/2) = +1" />——上次 <MathInline tex="s = -1" /> 时它是
          <MathInline tex="-1" />，差了半个周期，符号翻了过来；
        </li>
        <li><MathInline tex="\Gamma(1-(-3)) = \Gamma(4) = 3! = 6" />（Γ 又只用在整数点上）；</li>
        <li><MathInline tex="\zeta(4) = \pi^4/90" />，还是一个级数老老实实收敛的地方。</li>
      </ul>
      <MathBlock tex="\zeta(-3) = \tfrac18 \cdot \frac{1}{\pi^4} \cdot 1 \cdot 6 \cdot \frac{\pi^4}{90} = \frac{6}{720} = \frac{1}{120}" />
      <p>
        <MathInline tex="\pi^4" /> 又一次上下约光。这个 <MathInline tex="120" /> 就是上面那两行
        物理公式里分母的出处：<MathInline tex="720 = 6 \times 120" />，
        <MathInline tex="240 = 720/3" />。换句话说，实验测的那个数，
        分母里明明白白站着一个只有靠解析延拓才写得出来的值。
      </p>
    </RevealBox>
    <p>
      <strong>读出物理：这个力有多大。</strong>拿 <MathInline tex="\hbar c \approx 3.16\times10^{-26}" />
      J·m 代进去，<MathInline tex="d = 1" /> 微米时
    </p>
    <MathBlock tex="\frac{F}{A} \approx 1.3\times 10^{-3}\ \mathrm{N/m^2}" />
    <p>
      换成能想象的单位：每平方厘米板面上约 <MathInline tex="1.3\times10^{-7}" /> 牛，
      连百万分之一牛都不到，<strong>相当于托着一粒十几微克的尘埃</strong>。
      1997 年那次实验的了不起之处正在这里——要在这个量级上分辨出静电残余、
      板面不平、温度漂移之外的那一点点力。
    </p>
    <p>
      但它对距离极其敏感，公式里是<strong>四次方</strong>。把板挪到 10 纳米
      （几十个原子的厚度），同一条公式给出 <MathInline tex="1.3\times10^{5}" /> N/m²，
      也就是<strong>约 1.3 个大气压</strong>——不再是"测不测得到"的问题了。
      微机电器件做到这个尺度时，卡西米尔力会把悬臂直接吸死在衬底上，是工程上必须防的一件事。
    </p>
    <div class="insight">
      <div class="insight-title">💡 账单核对</div>
      <p>
        理论值里那个延拓值是<strong>必需的零件</strong>：把它抽掉，纸上剩下的就是一个发散的
        无穷大，什么都预言不了；换成 <MathInline tex="\zeta(-1)" />、
        <MathInline tex="\zeta(-3)" /> 的值，得到的是一条没有可调参数的公式，
        而实验称出来的力与它对得上。
        <strong>解析延拓不是数学家的文字游戏——自然界按延拓值付账。</strong>
      </p>
    </div>
    <p>
      <strong>条件不成立会怎样：凭什么是它？</strong>上面那步"发散了就代延拓值"，
      最该被追问的是：我随便抓一个有限数顶包不行吗？不行。
      而理由不是"数学家规定的"，是<strong>物理自己提的要求</strong>：
    </p>
    <ul>
      <li>
        <strong>发散本来就是模型说过头了</strong>。"金属板对任意高频率的电磁波都是完美反射镜"
        这句话是假的：频率高到波长短过原子间距，电磁波直接穿板而过，板对它根本不存在。
        所以真实的那个和本来就是有限的，只是<strong>截止在哪儿、怎么截，谁也说不准</strong>；
      </li>
      <li>
        <strong>于是物理要求答案与"截断方案"无关</strong>。换一种截断办法
        （让高频按指数衰减、按幂次衰减、把频率上限挪到别处），中间过程面目全非，
        可算出来的<strong>力</strong>是同一个：截断带来的那些项，在"减去板不在时同一块空间的能量"
        这一步里成对消掉了，剩下的与方案无关的部分，恰好等于代入 <MathInline tex="\zeta(-1)" />
        的结果。<strong>这个方案无关性才是延拓值的凭据</strong>——
        延拓只是把这个与方案无关的部分一次写出来的最省事办法；
      </li>
      <li>
        <strong>所以壹节那个立场一步也没松动</strong>：<MathInline tex="1+2+3+\cdots = -\tfrac{1}{12}" />
        这个等号依然是错的。物理里从来没有人真的把一串正整数加出了负数。
        真实发生的是：写下一个本该有限的量，图省事写成了发散级数的样子，
        再问"这个量正确的值是多少"——答案是 <MathInline tex="\zeta" /> 在那一点的取值，
        而不是那串加法的结果。
      </li>
    </ul>

    <h3>还买到了什么</h3>
    <ul>
      <li>
        <strong>ζ 与素数</strong>：延拓 + 留数（ζ 在 s=1 的极点）+ 围道积分，合力证明了素数定理
        （素数个数 ~ x/ln x，1896）——本课四讲的武器在数论战场上会师。黎曼猜想悬赏百万美元，入口就在这讲；
      </li>
      <li>
        <strong>阶乘居然能取小数</strong>：阶乘 <MathInline tex="n!" /> 本来只对正整数有意义。
        欧拉找到一个在整个复平面上（除去几个点）解析、且在正整数处恰好等于
        <MathInline tex="(n-1)!" /> 的函数——<strong>Γ 函数</strong>。
        按唯一性定理，这样的函数只可能有一个，所以"<MathInline tex="\tfrac12" /> 的阶乘等于多少"
        从此有了唯一答案：<MathInline tex="\Gamma(1/2) = \sqrt{\pi}" />
        （半整数的阶乘里冒出 <MathInline tex="\pi" />，第一次见都会愣一下）。
        <strong>这是延拓的标准用法：把一个只在稀疏点上定义的东西，唯一地补成整片</strong>；
      </li>
      <li>
        <strong>物理里"发散了怎么办"的正规答案</strong>：刚才那两块金属板不是孤例。
        物理计算中途算出无穷大，并不总意味着理论错了——
        常常只是因为把某个本该有限的量，写成了它在错误地点的级数形式。
        把这类和换成对应函数的延拓值，是一门正经手艺（叫<strong>正规化</strong>），
        弦论里"时空维数只能取某几个数"这类结论，也是从同一个
        <MathInline tex="\zeta(-1)" /> 上掉下来的；
      </li>
      <li>
        <strong>全课地图</strong>：虚数被三次方程逼出（壹）→ 复可导 = 局部旋转伸缩（贰）→
        解析函数全息、积分只看奇点（叁、肆）→ 一小段决定全体（伍）。一以贯之的主题：
        <strong>复解析是一种极强的刚性</strong>，苛刻的准入条件换来不可思议的整体性质。
      </li>
    </ul>
    <div class="insight">
      <div class="insight-title">🔗 通往最后一门课的桥</div>
      <p>
        复变函数到此收官，下一站是<strong>数学物理方程</strong>——你没学过的那门课，但门票已经备齐：
        解析函数的实部虚部满足拉普拉斯方程（第二讲的赠品）、柯西积分公式 = 调和函数平均值性质（第三讲）、
        傅里叶变换的反演靠留数（第四讲）、特殊函数靠延拓（本讲）。三大方程的故事将把微积分、线代、
        概率、复变全部串起来——整个网站的概念在那里大会师。
      </p>
    </div>
  </ConceptPage>
</template>
