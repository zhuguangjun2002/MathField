<script setup>
import ConceptPage from '../../components/ConceptPage.vue'
import MathBlock from '../../components/MathBlock.vue'
import MathInline from '../../components/MathInline.vue'
import RevealBox from '../../components/RevealBox.vue'
import QuizBox from '../../components/QuizBox.vue'
import ComplexMulDemo from '../../demos/ComplexMulDemo.vue'
</script>

<template>
  <ConceptPage slug="imaginary">
    <h2><span class="sec-no">壹</span>困境：求实根的路上，冒出了 <MathInline tex="\sqrt{-121}" /></h2>
    <p>
      先纠正一个流传极广的误会：虚数<strong>不是</strong>为了解 <MathInline tex="x^2 + 1 = 0" /> 发明的。
      这种方程无解就无解了，数学家完全可以耸耸肩走开——就像"最大的整数"不存在一样，天塌不下来。
      真正把 <MathInline tex="\sqrt{-1}" /> 逼进数学的，是三次方程，而且是它<strong>有实根</strong>的情形。
    </p>
    <div class="story">
      <div class="story-title">📜 1545 年 · 《大术》与一桩数学公案</div>
      <p>
        三次方程求根公式的发现史本身就是一出戏：塔尔塔利亚在比武中靠它扬名，被<strong>卡尔达诺</strong>
        软磨硬泡学去并立誓保密，几年后卡尔达诺发现费罗更早的手稿，认为誓言失效，将公式发表于《大术》——
        两人反目成仇。但真正的麻烦在公式本身。对 <MathInline tex="x^3 = px + q" />，公式给出
        （下面这条就是<strong>卡尔达诺公式</strong>——本讲只把它当一件<strong>历史文物</strong>引用，
        你不需要会推它，也不必逐项看懂，只需要盯住它中途冒出来的那个根号）：
      </p>
      <MathBlock tex="x = \sqrt[3]{\frac{q}{2} + \sqrt{\frac{q^2}{4} - \frac{p^3}{27}}} + \sqrt[3]{\frac{q}{2} - \sqrt{\frac{q^2}{4} - \frac{p^3}{27}}}" />
      <p>
        整条公式里唯一要你留神的，是最里层那个 <MathInline tex="\sqrt{\frac{q^2}{4} - \frac{p^3}{27}}" />：
        全讲的麻烦都从它开始。
      </p>
      <p>
        某些方程——比如 <MathInline tex="x^3 = 15x + 4" />——根号里的数是<strong>负的</strong>：
        <MathInline tex="\sqrt{4 - 125} = \sqrt{-121}" />。按理该宣布"无解"，
        可这个方程<strong>明摆着有实根 x = 4</strong>（代入即验）。公式没错，答案存在，
        中间却横着一个"不可能的数"。这就是所谓"不可约情形"（casus irreducibilis）：
        <strong>不穿过复数，就取不到明明存在的实数</strong>。
      </p>
    </div>
    <p>
      1572 年，水利工程师<strong>邦贝利</strong>做了他自称"狂野的想法"的事：不追问 <MathInline tex="\sqrt{-1}" /> 是什么，
      先给它立好运算规则（照普通代数算，遇到 <MathInline tex="(\sqrt{-1})^2" /> 就换成 −1），然后硬算：
    </p>
    <MathBlock tex="\sqrt[3]{2 + \sqrt{-121}} = 2 + \sqrt{-1}, \qquad \sqrt[3]{2 - \sqrt{-121}} = 2 - \sqrt{-1}" />
    <RevealBox
      title="🔍 这两个等号是怎么来的？"
      hint="先别往下看：邦贝利不可能真去「开」一个不可能的数的立方根，那他凭什么敢写这个等号？给自己一分钟想想——如果两个立方根相加必须得到实数，它们该长什么样子？"
      label="看邦贝利的三步（猜形状 → 卡住系数 → 立方回去对账）"
      close-label="收起这段推导"
    >
      <p>
        它们<strong>不是开立方开出来的</strong>（没人会去开一个"不可能的数"的立方根），
        而是<strong>先猜形状、再验算通过</strong>的。邦贝利的思路分三步：
      </p>
      <p>
        <strong>① 赌一个形状。</strong>两个被开方数只差一个正负号，那两个立方根大概也是一对孪生的
        <MathInline tex="a + b\sqrt{-1}" /> 与 <MathInline tex="a - b\sqrt{-1}" />（<MathInline tex="a,\,b" /> 是普通实数）。
      </p>
      <p>
        <strong>② 用乘积卡住 a、b。</strong>两个立方根之积 = 两个被开方数之积的立方根，
        而后者是干净的实数（平方差公式，<MathInline tex="(\sqrt{-121})^2 = -121" />）：
      </p>
      <MathBlock tex="\begin{aligned} (2+\sqrt{-121})(2-\sqrt{-121}) &= 4 + 121 = 125 \\ \Longrightarrow\quad (a+b\sqrt{-1})(a-b\sqrt{-1}) = a^2 + b^2 &= \sqrt[3]{125} = 5 \end{aligned}" />
      <p>
        <MathInline tex="a^2 + b^2 = 5" /> 的正整数解只剩两种：<MathInline tex="(a,b)=(2,1)" /> 或 <MathInline tex="(1,2)" />。
      </p>
      <p>
        <strong>③ 立方回去对账。</strong>试 <MathInline tex="2+\sqrt{-1}" />，照二项式硬展开，
        遇到 <MathInline tex="(\sqrt{-1})^2" /> 就换成 −1：
      </p>
      <MathBlock tex="\begin{aligned} (2+\sqrt{-1})^3 &= 8 + 12\sqrt{-1} + 6(\sqrt{-1})^2 + (\sqrt{-1})^3 \\ &= (8-6) + (12-1)\sqrt{-1} = 2 + 11\sqrt{-1} \end{aligned}" />
      <p>
        而 <MathInline tex="11\sqrt{-1} = \sqrt{-121}" />，<strong>正好就是被开方数，对上了</strong>。
        （另一个候选 <MathInline tex="1+2\sqrt{-1}" /> 立方后是 <MathInline tex="-11-2\sqrt{-1}" />，对不上，淘汰。）
      </p>
      <p>
        所以那个等号的真正含义是"<strong>我验算过了</strong>"，不是"我解出来了"——这恰恰是全讲的要害：
        邦贝利<strong>没有</strong>弄懂 <MathInline tex="\sqrt{-1}" /> 是什么，
        他只是发现：按普通代数规则摆弄它，账目居然处处合得上。
        （严格说立方根有三支，这里默认取了实部为正的那一支；这件事要等复数搬进平面才说得清——见下一节。）
      </p>
    </RevealBox>
    <p>
      两个立方根相加，<MathInline tex="\sqrt{-1}" /> 正负抵消，得 x = 4。<strong>幽灵在计算中途登场，
      规规矩矩干完活，又体面地退场，留下一个完全真实的答案。</strong>此后两百年，数学家一直这样用它：
      好用、可靠、但没人知道它"是"什么。莱布尼茨称之为"存在与不存在之间的两栖物"，
      欧拉一边写下 <MathInline tex="e^{i\pi} + 1 = 0" /> 一边仍叫它"不可能的数"。
    </p>
    <QuizBox
      quiz-id="imaginary-q1"
      question="邦贝利到底「解出」了 $\sqrt[3]{2+\sqrt{-121}}$ 吗？上面那个等号，说的是哪件事？"
      hint="先回忆他手里到底有什么工具：他没有平面、没有辐角，只有一条「照普通代数算，碰到那个怪东西自乘就换成 −1」的规则。这条规则能拿来做什么动作，又做不了什么动作？"
      :options="[
        { t: '不算解出：他先赌立方根长成 $a+b\\sqrt{-1}$ 的样子，用乘积把 a、b 卡死，再把 $2+\\sqrt{-1}$ 立方回去，发现正好还原成被开方数——等号的意思是「验算通过」', why: '对，这就是全讲的要害。他手上那条规则只能用来「往前算」（展开、化简、验证），不能用来「往回开方」。所以他猜了个形状，再把 $2+\\sqrt{-1}$ 立方展开得到 $2+11\\sqrt{-1}$，正好是被开方数；另一个候选 $1+2\\sqrt{-1}$ 立方后是 $-11-2\\sqrt{-1}$，对不上，就这么被淘汰。整件事里他始终不知道 $\\sqrt{-1}$ 是什么，只知道账目合得上。' },
        { t: '解出来了：先把 $\\sqrt{-121}$ 写成 $11\\sqrt{-1}$，再对 $2+11\\sqrt{-1}$ 开立方就是了', why: '你这么选，是把「能写出来」当成了「能算出来」。把 $\\sqrt{-121}$ 改写成 $11\\sqrt{-1}$ 只是换了个记号，一点新东西都没产生；真正的动作是「开立方」，而在 1572 年，对这种东西开立方根本没有定义——没有平面、没有辐角，谁也答不出「三次方等于它的那个数在哪儿」。邦贝利绕开的正是这一步。' },
        { t: '既然不算解出，那这个等号在当时就只是个没有根据的猜测，靠后人才补上根据', why: '你这么选，是把「第一步是猜的」当成了「整件事都是猜的」。猜的只有形状（孪生的 $a\\pm b\\sqrt{-1}$）这一步；后两步是硬碰硬的：两个被开方数相乘得 125，逼出 $a^2+b^2=5$，正整数解只剩两组；立方展开又把其中一组当场淘汰。猜想加验算，等号站得稳稳的——站不稳的是「$\\sqrt{-1}$ 究竟是什么」这个问题，那要再等两百多年才有答案。' },
      ]"
      :answer="0"
    />

    <h2><span class="sec-no">贰</span>破局：别问它是什么，看它在哪儿</h2>
    <p>
      解开心结的不是代数学家，而是两个"外行"：1797 年挪威-丹麦<strong>测量员韦塞尔</strong>、
      1806 年巴黎<strong>书商阿尔冈</strong>各自发表了同一个想法（都被主流无视，直到<strong>高斯</strong>
      1831 年以自己的威望重新阐述才被接受）：
    </p>
    <div class="insight">
      <div class="insight-title">💡 核心直觉：复数 = 平面上的点，乘法 = 旋转 + 伸缩</div>
      <p>
        实数排成一条线，早已被"占满"了——<MathInline tex="\sqrt{-1}" /> 在线上确实无处可住。但谁规定数只能住在线上？
        <strong>把数轴扩建成平面</strong>：横轴照旧是实数，纵轴留给 i 的倍数，复数 a+bi 就是点 (a, b)。
        加法是平移（向量相加），而乘法的几何意义堪称神来之笔。说它之前先把两个词就地说定：
        既然复数是平面上的点，就可以从原点朝它拉一根箭头——<strong>这根箭头的长度，叫这个复数的「模」；
        箭头与正右方（横轴的正方向，即正实数那一侧）的夹角，叫它的「辐角」</strong>。
        换句话说，一个复数的位置，用"横走多远、竖走多远"能说清，用"箭头多长、朝哪个方向"同样能说清，
        后一种说法正是为乘法准备的。有了这两个词，那句神来之笔只有一行：
        <strong>乘一个复数 = 按它的辐角旋转 + 按它的模伸缩</strong>。
        （这两个词第肆节还会用记号正式立一次：那里的 <MathInline tex="|z|" /> 与
        <MathInline tex="\arg z" />，说的就是此处的长度与夹角。）
        于是 i²=−1 瞬间"脱魅"：乘 i 是逆时针转 90°，转两次就是转 180°——把 1 转到 −1。
        <strong>−1 的平方根不是一个数值怪胎，是"旋转半圈"这个动作的两个中点（转 90° 或转 −90°）。</strong>
      </p>
    </div>
    <p>
      韦塞尔的职业出卖了动机：测量员天天需要"带方向的量"的乘除。复数从此不再是幽灵，
      而是<strong>平面几何的代数语言</strong>——这也是欧拉公式 <MathInline tex="e^{i\theta} = \cos\theta + i\sin\theta" />
      的正确打开方式：<MathInline tex="e^{i\theta}" /> 就是"逆时针转 θ 角"的旋转算符，
      <MathInline tex="e^{i\pi} = -1" /> 说的不过是"转半圈就是掉头"。
      （<strong>这里先打个招呼</strong>：本讲从头到尾没有定义过"把虚数放到指数上"是什么意思，
      所以此处的 <MathInline tex="e^{i\theta}" /> 请先当成"模为 1、辐角为 θ 的那个复数"的
      <strong>记号缩写</strong>——这么读，本节和后面几节的结论一个都不受影响。
      它凭什么配用指数这个记号、而不是随便一个字母，凭据在
      <router-link to="/calculus/taylor">微积分 · 泰勒展开</router-link>那一讲末尾，
      本讲第肆节还会再交代一次。）
    </p>

    <h2><span class="sec-no">叁</span>亲手转一转</h2>
    <ComplexMulDemo />

    <h2><span class="sec-no">肆</span>严格定义</h2>
    <p>
      平面图像虽然好用，却还不能算<strong>定义</strong>：它靠的是"你看得见平面上的点"这份直觉，
      而当年质疑虚数的人恰恰不认这种账。1835 年<strong>哈密顿</strong>换了个思路——
      <strong>别去"发现"虚数是什么，用手头已经完全放心的东西把它"造"出来。</strong>
      手头放心的东西只有实数；于是他让一个复数就是<strong>两个实数的搭配</strong>，
      再给这种搭配规定好加法和乘法。这样一来，谁要是怀疑复数自相矛盾，
      那就等于在怀疑实数自相矛盾——复数的合法性<strong>寄生</strong>在实数上，不需要任何新的信仰。
    </p>
    <div class="definition">
      <div class="def-title">📐 定义（复数域，哈密顿 1835 定型）</div>
      <p>
        <strong>复数</strong>是有序实数对 <MathInline tex="(a, b)" />，按
      </p>
      <MathBlock tex="(a, b) + (c, d) = (a+c,\ b+d), \qquad (a, b) \cdot (c, d) = (ac - bd,\ ad + bc)" />
      <p>
        运算。其中把实数 <MathInline tex="a" /> 认同为 <MathInline tex="(a, 0)" />，并记
        <MathInline tex="i = (0, 1)" />，于是 <MathInline tex="(a,b)" /> 就写成 <MathInline tex="a + bi" />。
        全体复数记为 <MathInline tex="\mathbb{C}" />，构成一个<strong>域</strong>（加减乘除全通，除数非零）。
        模 <MathInline tex="|z| = \sqrt{a^2+b^2}" />，辐角 <MathInline tex="\arg z" />；极形式
        <MathInline tex="z = |z| e^{i\arg z}" /> 下，乘法即"模相乘、辐角相加"。
      </p>
    </div>
    <p>这段话字字都是有来历的，逐处拆开看：</p>
    <ul>
      <li>
        <strong>定义里没有 <MathInline tex="\sqrt{-1}" /></strong>：哈密顿的贡献是把"神秘实体"驱逐出定义——
        复数就是实数对加上两条运算规则，i 只是 <MathInline tex="(0,1)" /> 的绰号。它凭什么配叫"−1 的平方根"？
        按乘法规则算一遍即可：<MathInline tex="(0,1)\cdot(0,1) = (0\cdot 0 - 1\cdot 1,\ 0\cdot 1 + 1\cdot 0) = (-1, 0)" />，
        而 <MathInline tex="(-1,0)" /> 正是实数 −1。<strong>于是 i²=−1 从"必须相信的怪事"变成了"验算得到的结论"，全程无鬼</strong>；
      </li>
      <li>
        <strong>"记作 <MathInline tex="a+bi" />"是<em>推</em>出来的，不是<em>规定</em>的</strong>：先看第一横排
        <MathInline tex="(a,0)" />——按上面两条规则，<MathInline tex="(a,0)+(c,0)=(a+c,0)" />、
        <MathInline tex="(a,0)\cdot(c,0)=(ac,0)" />，加法乘法都与实数一模一样，
        所以把 <MathInline tex="(a,0)" /> 直接当成实数 <MathInline tex="a" /> 是安全的（实数被原样嵌进了平面的横轴）。
        再算一步：
        <MathBlock tex="(a,0) + (b,0)\cdot(0,1) = (a,0) + (0,b) = (a,b)" />
        左边照嵌入与绰号翻译过来正是 <MathInline tex="a + bi" />。所以 <MathInline tex="a+bi" /> 不是新约定，
        <strong>它是这套定义自己长出来的写法</strong>——中学那个"实部虚部"的记号，到这里才算有了出生证；
      </li>
      <li>
        <strong>乘法公式不是拍脑袋，是被逼出来的</strong>：假设你只想保住两件事——分配律照常用、
        <MathInline tex="i^2 = -1" />，那么把 <MathInline tex="(a+bi)(c+di)" /> 硬展开，你<strong>没有第二种选择</strong>：
        <MathBlock tex="(a+bi)(c+di) = ac + adi + bci + bd\,i^2 = (ac - bd) + (ad + bc)i" />
        这正是定义里那条 <MathInline tex="(ac-bd,\ ad+bc)" />。哈密顿只是把这个"被逼出来的结果"
        提前搬到定义里当规则用——顺序反过来了，内容一字未改。更妙的是，
        它同时又恰好是"辐角相加、模相乘"的坐标展开：<strong>代数规则与几何图像是同一件事的两种记法</strong>
        （和矩阵那讲如出一辙：还记得 <MathInline tex="\begin{bmatrix} a & -b \\ b & a \end{bmatrix}" /> 吗？
        复数乘法就是这种旋转伸缩矩阵）；
      </li>
      <li>
        <strong>"域"这个词兑现在除法上</strong>：加减乘显然封闭，唯一要担心的是除法。给定
        <MathInline tex="z = a+bi \neq 0" />，注意它与共轭 <MathInline tex="\bar z = a - bi" /> 相乘会把虚部消干净：
        <MathInline tex="z\bar z = a^2 + b^2" /> 是实数，于是
        <MathBlock tex="\frac{1}{z} = \frac{\bar z}{z \bar z} = \frac{a - bi}{a^2 + b^2}" />
        分母要非零，就得 <MathInline tex="a^2+b^2 \neq 0" />——而这一步<strong>用的是实数的性质</strong>
        （实数平方非负，两个平方和为零必须各自为零，即 <MathInline tex="z=0" />）。
        看见了吗：复数除法能不能做，最后还是由实数说了算。这就是开头那句"寄生"的现金兑付；
      </li>
      <li>
        <strong>极形式里的 <MathInline tex="e^{i\theta}" /> 仍然欠着</strong>：第贰节打招呼时说过，
        这里把这笔账正式挂在明处——定义框里从头到尾只用了实数对与四则运算，
        <MathInline tex="e^{i\arg z}" /> 是<strong>唯一一个没有出处的符号</strong>，
        它仍旧只是 <MathInline tex="\cos\theta + i\sin\theta" /> 的<strong>缩写</strong>，
        换成任何别的字母，上面那些结论一个都不受影响。
        凭什么这个缩写偏偏配用 <MathInline tex="e" />、而不是随便一个字母？靠的是级数展开，
        <router-link to="/calculus/taylor">微积分 · 泰勒展开</router-link>
        那一讲末尾把逐项整理的全过程摊开了（连"这算推导还是算定义"也一并交代）。
      </li>
    </ul>
    <QuizBox
      quiz-id="imaginary-q3"
      question="$e^{i\theta} = \cos\theta + i\sin\theta$ 这个等号，在<strong>本讲</strong>里的地位是「定义」还是「定理」？"
      hint="想清楚一件事：要证明一个等号，得先有两边各自独立的意思。本讲给过左边独立的意思吗？"
      :options="[
        { t: '在本讲它只是记号缩写（一条约定）：把右边那个复数简写成左边；要让它升级成一条真正的定理，得先独立定义「指数函数吃复数」是什么意思——那份定义本讲没有', why: '对。证明一个等号的前提是左右两边各有各的来历，可以各算各的、再比对；而本讲从没说过把 iθ 放到指数上是什么运算，左边除了「右边的简写」以外没有别的意思。没有独立的左边，就没有可证的命题，只有一个方便的记号。' },
        { t: '是定理，本讲已经把它证出来了：乘 i 是转 90°，所以 $e^{i\\theta}$ 就是转 θ 角', why: '你这么选，是把「解释得通」当成了「证明了」。本讲确实给了这个记号一个说得通的几何读法，但全程绕开了一个前置问题：把 iθ 放到指数上，究竟在做什么运算？指数原本的意思是「自乘若干次」，而「自乘 iθ 次」是没有意义的一句话。前置问题没答，后面的推理再顺，也没有一条被证明的命题。' },
        { t: '是定义，欧拉当年就是这么规定 $e^{i\\theta}$ 的，所以无所谓证不证，也没什么可算的', why: '你这么选，是把「本讲拿它当缩写」当成了「这件事本来就是拍脑袋约定的」。它在本讲是约定不假，但在数学里绝不是随便定的：把 $e^x$ 的级数里的 x 换成 iθ 逐项整理，实部会自动拼成 $\\cos\\theta$、虚部自动拼成 $\\sin\\theta$——右边不是选出来的，是算出来的。所以在别处它确实有定理的身份，只是那份凭据本讲还没拿到手。' },
      ]"
      :answer="0"
    />
    <ul>
      <li>
        <strong>代价要认账</strong>：<MathInline tex="\mathbb{C}" /> 里<strong>没有大小顺序</strong>——
        没法说 i 和 1 谁大（任何与四则相容的全序都会推出 −1 &gt; 0 的矛盾）。数学的每次扩张都有账单：
        获得了"每个多项式都有根"，交出了"能比大小"；
      </li>
      <li>
        <strong>回报是封顶的</strong>：代数基本定理（高斯 1799 年博士论文）——n 次复系数多项式恰有 n 个复根。
        为解方程而扩数系的两千年长征（自然数→负数→分数→无理数→复数），<strong>到复数为止，够了</strong>。
      </li>
    </ul>
    <QuizBox
      quiz-id="imaginary-q2"
      question="读完这一节，i 到底是不是一个「不存在的数」？"
      hint="别急着表态，先问自己：这一节里 i 是从哪儿来的、用什么材料造的？i²=−1 这件事，是被规定的，还是被算出来的？"
      :options="[
        { t: 'i 和 1 一样，是被造出来的对象：它就是有序实数对 $(0,1)$，材料全是实数；$i^2=-1$ 是按乘法规则算出来的结果，不是要你相信的信条。「虚」只是历史留下的一个蔑称', why: '对。整个定义里没有一样新东西：两个实数、两条运算规则，如此而已。$i^2=-1$ 是算出来的——$(0,1)\\cdot(0,1)=(0\\cdot 0-1\\cdot 1,\\ 0\\cdot 1+1\\cdot 0)=(-1,0)$，而 $(-1,0)$ 正是实数 −1。要说不存在，那得先说实数对不存在。' },
        { t: '不存在：它是为了让方程有解硬造出来的符号，现实世界里没有跟它对应的量', why: '你这么选，是把「能不能在数轴上指出来」当成了「存不存在」。按这个标准，负数（欠债不是一堆苹果）和无理数（没有哪把尺子量得出来）当年也都被判过「不存在」，如今没人再这么说了。何况 i 有再实在不过的对应物：平面上那个转 90° 的动作；伍节里插座送来的交流电，相位差正是靠它记账的。' },
        { t: '存在啊：因为 −1 确实有一个平方根，i 就是那个数', why: '你这么选，是把结论当成了定义，顺序反了。要是开口就说「i 是 −1 的平方根」，你其实还欠着一个问题：这么个东西凭什么存在？——两百年里卡住所有人的正是这句反问。哈密顿的做法是倒过来走：先用两个实数把 $(0,1)$ 造出来，再按乘法规则算出它的平方是 $(-1,0)$。「−1 的平方根」是它算完之后领到的身份证，不是它进场的门票。' },
      ]"
      :answer="0"
    />

    <h2><span class="sec-no">伍</span>买到了什么：一门语言，不止一个数</h2>

    <h3>插座里的旋转：交流电为什么是复数的主场</h3>
    <p>
      先看一件此刻正在你身边发生的事：墙上插座送来的电压不是一个稳住不动的数，
      它每秒来回摆动五十次，家里所有电器都泡在这来回摆动的电里。
      工程师描述这样一段电压时写下的记号是 <MathInline tex="V\cos(\omega t + \varphi)" />——
      先别管这一串符号，只回答一个问题：<strong>要把这样一段电压说清楚，一共得给几个数？</strong>
      （摆动的快慢是全电路公用的，不必每处重说一遍。）
      想清楚这个数字，你其实已经猜到复数为什么会成为电工的母语了。
      （这一小节<strong>不需要任何电学基础</strong>：全部物理输入只有两条常识，到第 ④ 步当场奉上。）
    </p>
    <p>
      <strong>① 一个正弦量 = 两个数 = 一个复数。</strong>
      交流电路里所有电压电流都是<strong>同一个频率</strong>的正弦（这是它跟直流最大的不同），
      彼此的差别只剩两项：<strong>振幅多大、波形前后错开多少（相位）</strong>。
      两个数——正好装进一个复数 <MathInline tex="V e^{i\varphi}" />（模是振幅、辐角是相位），
      工程上管它叫<strong>相量</strong>。这一步没有物理，只是把"两个数"打了个包。
    </p>
    <p>
      <strong>② 让它转起来。</strong>把整条电路想成一个匀速转动的转盘：
    </p>
    <MathBlock tex="V\cos(\omega t + \varphi) = \operatorname{Re}\left[\underbrace{V e^{i\varphi}}_{\text{相量：静止的}} \cdot \underbrace{e^{i\omega t}}_{\text{转盘：大家共用}}\right]" />
    <p>
      实际电压就是转盘上那个点<strong>在实轴上的投影</strong>——上上下下的正弦波，
      不过是匀速圆周运动的影子。既然 <MathInline tex="e^{i\omega t}" /> 是全电路共用的因子，
      干脆<strong>跟着转盘一起转</strong>，把它约掉，只留下静止的相量来记账。
    </p>
    <p>
      <strong>③ 奇迹只有一句：求导 = 乘 <MathInline tex="i\omega" />。</strong>
      因为 <MathInline tex="\frac{d}{dt}e^{i\omega t} = i\omega\, e^{i\omega t}" />。
      而乘 i 是<strong>逆时针转 90°</strong>（本讲第贰节的老结论）。于是——
      示波器上看到的"电容里电流比电压早四分之一个周期"这件物理现象，
      代数上不过是<strong>求一次导多转 90°</strong>。<strong>那个 90° 不是巧合，
      它就是 i 的几何身份。</strong>
    </p>
    <p>
      <strong>④ 于是微分方程降级成了乘除法。</strong>全部物理输入只有两条中学之后的常识：
      电容上<strong>电流正比于电压的变化率</strong>（<MathInline tex="i = C\,dv/dt" />，
      电容像个水桶：进水快慢决定水位上升快慢）；电感上<strong>电压正比于电流的变化率</strong>
      （<MathInline tex="v = L\,di/dt" />，电感像个飞轮：想让它变速就得使劲）。
      把 ③ 的"求导 = 乘 <MathInline tex="i\omega" />"代进去，两条微分关系当场变成两条乘法关系：
    </p>
    <MathBlock tex="Z_R = R, \qquad Z_L = i\omega L, \qquad Z_C = \frac{1}{i\omega C} = -\frac{i}{\omega C}" />
    <p>
      这三个复数就叫<strong>阻抗</strong>，而欧姆定律原封不动地升级成
      <MathInline tex="V = I \cdot Z" />——只不过 V、I、Z 现在都是复数。
      <strong>解交流电路从此不必再解微分方程</strong>：串联相加、并联倒数相加，
      照初中算电阻的老规矩算就是了。这就是"电工的母语"的全部含义。
    </p>
    <p>
      <strong>⑤ 顺带把两句行话译成人话。</strong>电工挂在嘴边的"相位差就是辐角差""电容电感不过是
      乘 ±i 的元件"，听着像黑话，现在字面全都可读了：
      阻抗的<strong>模</strong>是电压与电流的振幅之比（"这元件有多挡电流"），
      阻抗的<strong>辐角</strong>就是电压与电流的相位差——所以说"相位差就是辐角差"。
      而 <MathInline tex="Z_L" /> 的辐角是 +90°、<MathInline tex="Z_C" /> 的辐角是 −90°，
      所以说"电容电感不过是乘 ±i 的元件"：<strong>电阻只缩放，电容电感只旋转</strong>。
      纯电阻电流电压同相位，功率老老实实变热；纯电容电感差 90°，
      一个周期里吸收的能量原样吐回去——这就是电工说的"无功功率"。
    </p>
    <p>
      <strong>⑥ 一个记号上的小注</strong>：电工程里虚数单位写作 <strong>j</strong> 而不是 i，
      因为 i 这个字母早就被<strong>电流</strong>占用了。看到 <MathInline tex="Z = R + jX" />
      别慌，就是本讲的 <MathInline tex="a + bi" />。
    </p>
    <p>
      所以别被"电工程"三个字唬住：这段东西<strong>不需要先学一学期电路</strong>。
      它要的只是"复数是有序对"（第肆节）、"乘 i 是转 90°"（第贰节）、"求导"（微积分讲），
      外加上面那两条元件常识。真正的电路课要处理的是网络拓扑、瞬态、非线性——那些是另一回事，
      与复数没什么关系。同一个转盘还能转得更远：
      <router-link to="/mathphys/heat">数理方程 · 热传导方程与傅里叶级数</router-link>
      那一讲的主角也是 <MathInline tex="e^{i\omega t}" />，只不过那里不是一个频率在转，
      而是无穷多个频率一起转。
    </p>

    <h3>还买到了什么</h3>
    <ul>
      <li>
        <strong>三角恒等式批发部</strong>：棣莫弗公式 <MathInline tex="(\cos\theta + i\sin\theta)^n = \cos n\theta + i\sin n\theta" />
        就是"转 n 次 = 转 n 倍角"——单位圆上的复数 <MathInline tex="\cos\theta + i\sin\theta" /> 模为 1，
        乘它只转不伸缩，乘 n 次自然转到 <MathInline tex="n\theta" />。
        这个"批发部"到底怎么出货？下面那个框把它拆开了——<strong>先自己动笔试一分钟再点开</strong>，
        这是本讲最后一处要你自己动笔的地方：
      </li>
    </ul>
    <RevealBox
      title="🎁 拆一次：一条乘法怎么掉出一堆三角公式"
      label="对答案 / 看完整拆解（和角 → 倍角 → 三倍角）"
      close-label="收起这段拆解"
    >
      <template #hint>
        先自己试一分钟：把 <MathInline tex="(\cos\alpha + i\sin\alpha)(\cos\beta + i\sin\beta)" /> 硬乘开，
        再想想这个乘积按"辐角相加"应该等于什么。两边一对照，和角公式其实已经被你推出来了——而且一次两条。
      </template>
      <p>
        <strong>关键机制先说破</strong>：一个复数等式<strong>顶两条实数等式</strong>。
        因为复数说到底是有序对 <MathInline tex="(a,b)" />，两个复数相等<strong>当且仅当实部与实部相等、虚部与虚部相等</strong>。
        所以每次你写下一个复数等式再展开，都会同时收到两条实数恒等式——三角公式就是这么"成打"掉出来的。
      </p>
      <p>
        <strong>先要和角公式？把两个单位复数乘一次就够。</strong>左边按几何（辐角相加）算，右边按代数硬展开：
      </p>
      <MathBlock tex="\begin{aligned} (\cos\alpha + i\sin\alpha)(\cos\beta + i\sin\beta) &= \cos(\alpha+\beta) + i\sin(\alpha+\beta) \\[2pt] &= (\cos\alpha\cos\beta - \sin\alpha\sin\beta) \\[2pt] &\quad + i(\sin\alpha\cos\beta + \cos\alpha\sin\beta) \end{aligned}" />
      <p>
        上下一对照，实部对实部、虚部对虚部，<strong>一次落地两条</strong>：
      </p>
      <MathBlock tex="\cos(\alpha+\beta) = \cos\alpha\cos\beta - \sin\alpha\sin\beta, \qquad \sin(\alpha+\beta) = \sin\alpha\cos\beta + \cos\alpha\sin\beta" />
      <p>
        中学背这两条要靠口诀（"符号反着来"），这里它们只是<strong>乘法展开的实部和虚部</strong>，
        那个恼人的负号来源清清楚楚：<MathInline tex="i\sin\alpha \cdot i\sin\beta" /> 里的
        <MathInline tex="i^2 = -1" />。
      </p>
      <p>
        <strong>再要倍角公式？令 <MathInline tex="\alpha = \beta = \theta" /> 即可</strong>（也就是棣莫弗取 n = 2）：
      </p>
      <MathBlock tex="\cos 2\theta = \cos^2\theta - \sin^2\theta, \qquad \sin 2\theta = 2\sin\theta\cos\theta" />
      <p>
        <strong>三倍角？把 n 换成 3，按二项式展开就是了</strong>（记得 <MathInline tex="i^2=-1" />、
        <MathInline tex="i^3=-i" />），实部虚部各自站队：
      </p>
      <MathBlock tex="(\cos\theta + i\sin\theta)^3 = \underbrace{(\cos^3\theta - 3\cos\theta\sin^2\theta)}_{\cos 3\theta} + i\,\underbrace{(3\cos^2\theta\sin\theta - \sin^3\theta)}_{\sin 3\theta}" />
      <p>
        再用 <MathInline tex="\sin^2\theta = 1 - \cos^2\theta" /> 收拾一下，就是你在公式表上见过的：
      </p>
      <MathBlock tex="\cos 3\theta = 4\cos^3\theta - 3\cos\theta, \qquad \sin 3\theta = 3\sin\theta - 4\sin^3\theta" />
      <p>
        <strong>这才是"批发"的意思</strong>：n 想取多大取多大，公式表上那一栏永远列不完，
        而生产它们的机制自始至终只有一条——<strong>乘法即旋转</strong>，展开取实虚部。
        线性代数讲里我们用旋转矩阵连乘变过同一个魔术（<MathInline tex="R(\alpha)R(\beta) = R(\alpha+\beta)" />
        的四个矩阵元就是上面那两条和角公式），复数把那个 2×2 的账本压缩成了一行乘法。
      </p>
    </RevealBox>
    <ul>
      <li>
        <strong>概率论的伏笔兑现</strong>：中心极限定理讲预告的特征函数 <MathInline tex="E[e^{itX}]" />，
        现在你知道 <MathInline tex="e^{itX}" /> 是什么了——把随机变量卷上单位圆再取平均；
      </li>
      <li>
        <strong>真正的悬念</strong>：数系已经完备，但<strong>分析</strong>还没跟上——复变量的函数怎么求导？
        导数定义照搬过来会发生什么？答案出人意料地苛刻、也出人意料地丰厚。下一讲。
      </li>
    </ul>
    <div class="insight">
      <div class="insight-title">🔗 与你学过的课程连一连</div>
      <p>
        <strong>线性代数</strong>：乘复数 w = 旋转伸缩矩阵作用；特征值讲里"旋转矩阵没有实特征值"的谜团，
        在 ℂ 里解开——它的特征值 ±i 正是"旋转"的代数身份证；
        <strong>微积分</strong>：泰勒展开讲留过一个问题——<MathInline tex="1/(1+x^2)" /> 明明处处光滑，
        收敛半径为什么偏偏是 1？现在有嫌疑人了：它在 <strong>±i 处有奇点</strong>，
        实轴上看不见，复平面上一目了然。第四讲正式结案。
      </p>
    </div>
  </ConceptPage>
</template>
