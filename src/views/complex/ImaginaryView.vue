<script setup>
import ConceptPage from '../../components/ConceptPage.vue'
import MathBlock from '../../components/MathBlock.vue'
import MathInline from '../../components/MathInline.vue'
import ComplexMulDemo from '../../demos/ComplexMulDemo.vue'
</script>

<template>
  <ConceptPage slug="imaginary">
    <h2><span class="sec-no">壹</span>困境：求实根的路上，冒出了 √−121</h2>
    <p>
      先纠正一个流传极广的误会：虚数<strong>不是</strong>为了解 <MathInline tex="x^2 + 1 = 0" /> 发明的。
      这种方程无解就无解了，数学家完全可以耸耸肩走开——就像"最大的整数"不存在一样，天塌不下来。
      真正把 √−1 逼进数学的，是三次方程，而且是它<strong>有实根</strong>的情形。
    </p>
    <div class="story">
      <div class="story-title">📜 1545 年 · 《大术》与一桩数学公案</div>
      <p>
        三次方程求根公式的发现史本身就是一出戏：塔尔塔利亚在比武中靠它扬名，被<strong>卡尔达诺</strong>
        软磨硬泡学去并立誓保密，几年后卡尔达诺发现费罗更早的手稿，认为誓言失效，将公式发表于《大术》——
        两人反目成仇。但真正的麻烦在公式本身。对 <MathInline tex="x^3 = px + q" />，公式给出：
      </p>
      <MathBlock tex="x = \sqrt[3]{\frac{q}{2} + \sqrt{\frac{q^2}{4} - \frac{p^3}{27}}} + \sqrt[3]{\frac{q}{2} - \sqrt{\frac{q^2}{4} - \frac{p^3}{27}}}" />
      <p>
        某些方程——比如 <MathInline tex="x^3 = 15x + 4" />——根号里的数是<strong>负的</strong>：
        <MathInline tex="\sqrt{4 - 125} = \sqrt{-121}" />。按理该宣布"无解"，
        可这个方程<strong>明摆着有实根 x = 4</strong>（代入即验）。公式没错，答案存在，
        中间却横着一个"不可能的数"。这就是所谓"不可约情形"（casus irreducibilis）：
        <strong>不穿过复数，就取不到明明存在的实数</strong>。
      </p>
    </div>
    <p>
      1572 年，水利工程师<strong>邦贝利</strong>做了他自称"狂野的想法"的事：不追问 √−1 是什么，
      先给它立好运算规则（照普通代数算，遇到 <MathInline tex="(\sqrt{-1})^2" /> 就换成 −1），然后硬算：
    </p>
    <MathBlock tex="\sqrt[3]{2 + \sqrt{-121}} = 2 + \sqrt{-1}, \qquad \sqrt[3]{2 - \sqrt{-121}} = 2 - \sqrt{-1}" />
    <p>
      两个立方根相加，<MathInline tex="\sqrt{-1}" /> 正负抵消，得 x = 4。<strong>幽灵在计算中途登场，
      规规矩矩干完活，又体面地退场，留下一个完全真实的答案。</strong>此后两百年，数学家一直这样用它：
      好用、可靠、但没人知道它"是"什么。莱布尼茨称之为"存在与不存在之间的两栖物"，
      欧拉一边写下 <MathInline tex="e^{i\pi} + 1 = 0" /> 一边仍叫它"不可能的数"。
    </p>

    <h2><span class="sec-no">贰</span>破局：别问它是什么，看它在哪儿</h2>
    <p>
      解开心结的不是代数学家，而是两个"外行"：1797 年挪威-丹麦<strong>测量员韦塞尔</strong>、
      1806 年巴黎<strong>书商阿尔冈</strong>各自发表了同一个想法（都被主流无视，直到<strong>高斯</strong>
      1831 年以自己的威望重新阐述才被接受）：
    </p>
    <div class="insight">
      <div class="insight-title">💡 核心直觉：复数 = 平面上的点，乘法 = 旋转 + 伸缩</div>
      <p>
        实数排成一条线，早已被"占满"了——√−1 在线上确实无处可住。但谁规定数只能住在线上？
        <strong>把数轴扩建成平面</strong>：横轴照旧是实数，纵轴留给 i 的倍数，复数 a+bi 就是点 (a, b)。
        加法是平移（向量相加），而乘法的几何意义堪称神来之笔：
        <strong>乘一个复数 = 按它的辐角旋转 + 按它的模伸缩</strong>。
        于是 i²=−1 瞬间"脱魅"：乘 i 是逆时针转 90°，转两次就是转 180°——把 1 转到 −1。
        <strong>−1 的平方根不是一个数值怪胎，是"旋转半圈"这个动作的两个中点（转 90° 或转 −90°）。</strong>
      </p>
    </div>
    <p>
      韦塞尔的职业出卖了动机：测量员天天需要"带方向的量"的乘除。复数从此不再是幽灵，
      而是<strong>平面几何的代数语言</strong>——这也是欧拉公式 <MathInline tex="e^{i\theta} = \cos\theta + i\sin\theta" />
      的正确打开方式：<MathInline tex="e^{i\theta}" /> 就是"逆时针转 θ 角"的旋转算符，
      <MathInline tex="e^{i\pi} = -1" /> 说的不过是"转半圈就是掉头"。
    </p>

    <h2><span class="sec-no">叁</span>亲手转一转</h2>
    <ComplexMulDemo />

    <h2><span class="sec-no">肆</span>严格定义</h2>
    <div class="definition">
      <div class="def-title">📐 定义（复数域，哈密顿 1835 定型）</div>
      <p>
        <strong>复数</strong>是有序实数对 <MathInline tex="(a, b)" />，记作 <MathInline tex="a + bi" />，按
      </p>
      <MathBlock tex="(a, b) + (c, d) = (a+c,\ b+d), \qquad (a, b) \cdot (c, d) = (ac - bd,\ ad + bc)" />
      <p>
        运算。全体复数记为 <MathInline tex="\mathbb{C}" />，构成一个<strong>域</strong>（加减乘除全通，除数非零）。
        模 <MathInline tex="|z| = \sqrt{a^2+b^2}" />，辐角 <MathInline tex="\arg z" />；极形式
        <MathInline tex="z = |z| e^{i\arg z}" /> 下，乘法即"模相乘、辐角相加"。
      </p>
    </div>
    <p>拆几个关键处：</p>
    <ul>
      <li>
        <strong>定义里没有 √−1</strong>：哈密顿的贡献是把"神秘实体"驱逐出定义——复数就是实数对加上两条运算规则，
        i 只是 (0, 1) 的绰号。你验证 (0,1)·(0,1) = (−1, 0) 即得 i²=−1，全程无鬼；
      </li>
      <li>
        <strong>乘法公式不是拍脑袋</strong>：(ac−bd, ad+bc) 恰好就是"辐角相加、模相乘"的坐标展开——
        代数规则与几何图像是同一件事的两种记法（和矩阵那讲如出一辙：还记得
        <MathInline tex="\begin{bmatrix} a & -b \\ b & a \end{bmatrix}" /> 吗？复数乘法就是这种旋转伸缩矩阵）；
      </li>
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

    <h2><span class="sec-no">伍</span>买到了什么：一门语言，不止一个数</h2>
    <ul>
      <li>
        <strong>三角恒等式批发部</strong>：棣莫弗公式 <MathInline tex="(\cos\theta + i\sin\theta)^n = \cos n\theta + i\sin n\theta" />
        就是"转 n 次 = 转 n 倍角"；展开取实虚部，倍角、和角公式成打掉落——
        线代讲里用旋转矩阵变过这个魔术，复数把它压缩成一行；
      </li>
      <li>
        <strong>电工程的母语</strong>：交流电路的阻抗、相位全用复数记账——"相位差"就是辐角差，
        电容电感不过是"乘 ±i"的元件。傅里叶分析（数理方程课的主角）同样建立在
        <MathInline tex="e^{i\omega t}" /> 上；
      </li>
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
