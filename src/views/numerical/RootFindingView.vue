<script setup>
import ConceptPage from '../../components/ConceptPage.vue'
import MathBlock from '../../components/MathBlock.vue'
import MathInline from '../../components/MathInline.vue'
import RevealBox from '../../components/RevealBox.vue'
import QuizBox from '../../components/QuizBox.vue'
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
    <p>
      "误差平方级缩小"这句话是本讲的全部卖点，它<strong>只用三行泰勒就能证出来</strong>——
      而且证完你会看到那个平方是<strong>从哪儿冒出来的</strong>，
      以及它凭什么在重根面前失效：
    </p>
    <RevealBox
      title="🔍 三行推出二次收敛，并看清那个平方的来历"
      label="对答案 / 看完整拆解"
    >
      <template #hint>
        先自己动笔：设真根是 <MathInline tex="x^*" />，误差
        <MathInline tex="e_n = x_n - x^*" />。
        把 <MathInline tex="f(x^*)" /> 在 <MathInline tex="x_n" /> 处泰勒展开到二阶
        （注意 <MathInline tex="f(x^*) = 0" />，这是唯一用到"它是根"的地方）。
        再把展开式代进牛顿迭代式，看 <MathInline tex="e_{n+1}" /> 剩下什么。
      </template>
      <p>
        <strong>第一行：在 <MathInline tex="x_n" /> 处展开，代入 <MathInline tex="x = x^*" />。</strong>
      </p>
      <MathBlock tex="0 = f(x^*) = f(x_n) + f'(x_n)(x^* - x_n) + \tfrac12 f''(\xi)(x^* - x_n)^2" />
      <p>
        （<MathInline tex="\xi" /> 在 <MathInline tex="x_n" /> 与 <MathInline tex="x^*" /> 之间，
        拉格朗日余项。）注意 <MathInline tex="x^* - x_n = -e_n" />，整理一下：
      </p>
      <MathBlock tex="0 = f(x_n) - f'(x_n)\,e_n + \tfrac12 f''(\xi)\,e_n^2" />
      <p>
        <strong>第二行：两边除以 <MathInline tex="f'(x_n)" />。</strong>
        （这一步就是牛顿法要求 <MathInline tex="f'(x^*)\ne0" /> 的原因——除数不能是零。）
      </p>
      <MathBlock tex="\frac{f(x_n)}{f'(x_n)} - e_n + \frac{f''(\xi)}{2f'(x_n)}e_n^2 = 0" />
      <p>
        <strong>第三行：认出牛顿迭代式。</strong>
        <MathInline tex="x_{n+1} = x_n - f(x_n)/f'(x_n)" />，两边减 <MathInline tex="x^*" /> 得
        <MathInline tex="e_{n+1} = e_n - f(x_n)/f'(x_n)" />。
        把它代进上式：
      </p>
      <MathBlock tex="\boxed{\;e_{n+1} = \frac{f''(\xi)}{2f'(x_n)}\; e_n^2\;}" />
      <p>
        <strong>那个平方是这么来的：一阶项被牛顿迭代式整个吃掉了，剩下的最低阶就是二阶。</strong>
        换句话说，<strong>牛顿法之所以快，正因为它精确地对消掉了泰勒展开的一阶项</strong>——
        它不是"猜得准"，是"把能算准的部分全算了，只留下算不了的二阶尾巴"。
      </p>
      <p>
        <strong>顺带读出两条实战规矩，都写在那个系数里。</strong>
        分母是 <MathInline tex="f'(x_n)" />：<strong>导数越接近 0，这个常数越大，收敛越糟</strong>——
        动画里把 <MathInline tex="x_0" /> 拖到 0.1 就是在把分母往小里逼。
        而如果 <MathInline tex="x^*" /> 是<strong>重根</strong>（<MathInline tex="f'(x^*) = 0" />），
        整个推导垮掉，牛顿法<strong>退化成线性收敛</strong>，
        每步误差只减半左右——快不起来了。
        （补救办法也很直接：改用 <MathInline tex="x_{n+1} = x_n - m\,f/f'" />，
        m 是重根的重数，二次收敛就回来了。）
      </p>
      <p>
        <strong>再顺手把巴比伦那条化简出来。</strong>取
        <MathInline tex="f(x) = x^2 - a" />，则 <MathInline tex="f' = 2x" />：
      </p>
      <MathBlock tex="x_{n+1} = x_n - \frac{x_n^2 - a}{2x_n} = \frac{2x_n^2 - x_n^2 + a}{2x_n} = \frac{1}{2}\Bigl(x_n + \frac{a}{x_n}\Bigr)" />
      <p>
        <strong>"猜一个数，和 <MathInline tex="a" /> 除以它的商取平均"</strong>——
        泥板上那条四千年前的口诀，就是这么一行代数化简的结果。
        实测从 <MathInline tex="x_0 = 1.5" /> 求 <MathInline tex="\sqrt2" />，
        正确位数走成 <strong>2.8 → 5.8 → 11.9 → 15.8</strong>，
        <strong>确实每步翻倍，四步顶到机器精度</strong>。
      </p>
    </RevealBox>
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

    <QuizBox
      quiz-id="root-finding-q1"
      question="牛顿法收敛快得吓人，那它一定收敛吗？"
      hint="回头看误差公式里那个系数的分母是什么；再想想重根处的导数等于多少。"
      :options="[
        { t: '不一定。快只是「初值离根足够近」时的特权：初值太远，切线可能把它甩飞；碰上重根（根处 $f^{\\prime}=0$），二次收敛整个垮掉，退化成每步误差只减半的慢爬。二分法慢，却有介值定理兜底，绝不失手。', why: '对。误差式 $e_{n+1}=\\frac{f^{\\prime\\prime}(\\xi)}{2f^{\\prime}(x_n)}e_n^2$ 里藏着两个前提：分母不能太小，$e_n$ 本身得先够小（平方才划算）。两个前提都是局部的。所以实战里常常先用二分法把根圈进一个小区间，再交给牛顿法收尾——稳和快各取一半。' },
        { t: '一定收敛，只是坏初值会多绕几步——像动画里 $x_0=0.1$ 那样先被甩出去，再老老实实爬回来。', why: '你被 demo 那条抛物线的好脾气骗了：$x^2-2$ 开口向上、正半轴只有一个根，怎么甩都会滑回来。换个函数立刻翻脸——对 $\\arctan x$ 从 $x_0=2$ 出发，迭代走成 $2 \\to -3.5 \\to 14 \\to -279 \\to 1.2\\times10^{5}$，一路发散到爆。收敛是局部定理，不是全局承诺。' },
        { t: '只要 f 连续可导就一定二次收敛；重根处函数更平坦，收敛只会更快。', why: '「更平」恰恰是灾难。二次收敛的常数是 $f^{\\prime\\prime}(\\xi)/(2f^{\\prime}(x_n))$，分母正是导数：根处越平，分母越接近 0，常数越大。重根时 $f^{\\prime}(x^{*})=0$，整条推导垮掉，收敛降成线性——每步减半，和二分法一个档次。要救回来得把迭代式改成 $x_{n+1}=x_n-m\\,f/f^{\\prime}$，m 是重数。' },
      ]"
      :answer="0"
    />

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

    <QuizBox
      quiz-id="root-finding-q2"
      question="收敛阶 $p=2$，是不是说每一步误差都减半？"
      hint="先照定义把 p 等于 1 那一档写出来：误差乘一个固定的小常数，那叫哪一种收敛？"
      :options="[
        { t: '不是。「每步减半」是 $p=1$、$C=1/2$ 的线性收敛（二分法正是如此）；$p=2$ 说的是误差被平方，正确位数每步翻倍：$10^{-2} \\to 10^{-4} \\to 10^{-8}$。', why: '对。定义里 p 站在 $|e_n|$ 的指数位置上，不是当分母。demo 里从 $x_0=1.5$ 出发，误差走成 $8.6\\times10^{-2} \\to 2.5\\times10^{-3} \\to 2.1\\times10^{-6} \\to 1.6\\times10^{-12}$，换算成正确位数是 1.07 → 2.61 → 5.67 → 11.80，几乎精确地一步一翻倍。' },
        { t: '是：$p=2$ 就是误差每步缩到 1/2，$p=3$ 就是缩到 1/3。', why: '这是把指数看成了分母。误差缩到固定比例（1/2 也好 1/10 也好）全都是 $p=1$，差别只写在常数 C 里——二分法那句「每步砍半」正是 $p=1$、$C=1/2$。$p=2$ 的定义是 $|e_{n+1}|\\approx C|e_n|^2$：误差自己乘自己，$10^{-2}$ 的下一步是 $10^{-4}$ 的量级，不是 0.005。' },
        { t: '$p=2$ 是说每一步固定多算准两位小数（十进制两位两位地降）。', why: '「每步固定降两位」仍然是线性收敛，只是 $C=1/100$：降幅是个常数。二次收敛的降幅自己会加速——上面那串正确位数 1.07 → 2.61 → 5.67 → 11.80，单步涨了 1.5、3.1、6.1 位，一次比一次猛。二分法要 3.3 步才多攒一位，摆在一起就知道差在哪了。' },
      ]"
      :answer="0"
    />

    <p>
      定义里有个悄悄的前提：牛顿法每步都要 <MathInline tex="f'(x_n)" />。
      <strong>可现实中的 f 常常是一段没人能求导的代码</strong>（一次仿真、一次查表、一次数值积分），
      导数写不出来，只能用差商去<strong>近似</strong>。这一近似，
      就正面撞上了<router-link to="/numerical/float-error">第 1 讲</router-link>那个坑——
      而且这次能算出<strong>最优步长该取多少</strong>：
    </p>
    <RevealBox
      title="🔍 用差商代替导数：为什么 h 不能太大，也不能太小"
      label="对答案 / 看完整拆解"
    >
      <template #hint>
        先自己想两头：<MathInline tex="f'(x) \approx \dfrac{f(x+h)-f(x)}{h}" />。
        <strong>h 太大</strong>时，这个近似离真导数有多远？（用泰勒展开估一下。）
        <strong>h 太小</strong>时，分子上两个几乎相等的数相减会发生什么？
        （这正是上一讲的灾难性抵消。）两种坏处一个随 h 涨、一个随 h 跌——
        那么最好的 h 应该在哪儿？
      </template>
      <p>
        <strong>第一头：截断误差，随 h 变大而变大。</strong>泰勒展开：
      </p>
      <MathBlock tex="\frac{f(x+h)-f(x)}{h} = f'(x) + \frac{h}{2}f''(\xi) \quad\Longrightarrow\quad \text{截断误差} \sim \tfrac{h}{2}|f''|" />
      <p>它正比于 <MathInline tex="h" />——想减小它，h 越小越好。</p>
      <p>
        <strong>第二头：舍入误差，随 h 变小而变大。</strong>
        <MathInline tex="f(x+h)" /> 与 <MathInline tex="f(x)" /> 各自带着约
        <MathInline tex="\varepsilon|f|" /> 的表示误差，两者一减，
        误差不抵消反而叠加；再除以一个很小的 h，就被放大：
      </p>
      <MathBlock tex="\text{舍入误差} \sim \frac{2\varepsilon |f|}{h}" />
      <p>它正比于 <MathInline tex="1/h" />——想减小它，h 越大越好。<strong>两头打架。</strong></p>
      <p>
        <strong>第三步：把两项加起来求最小。</strong>
        总误差 <MathInline tex="E(h) \approx \tfrac{h}{2}|f''| + 2\varepsilon|f|/h" />，
        对 h 求导令其为零：
      </p>
      <MathBlock tex="h_{\text{opt}} \sim \sqrt{\varepsilon} \approx \sqrt{2.2\times10^{-16}} \approx 1.5\times10^{-8}" />
      <p>
        <strong>而此时的总误差也只有 <MathInline tex="\sqrt{\varepsilon} \approx 10^{-8}" /> 量级</strong>——
        <strong>你手上明明有 16 位有效数字的机器，算一次导数却只能拿到 8 位。
        一半的精度就这么没了</strong>，而且这不是编程水平问题，是这个做法的天花板。
      </p>
      <p>
        <strong>实测对一下。</strong>取 <MathInline tex="f = \sin x" />、
        <MathInline tex="x = 1" />（真值 <MathInline tex="\cos 1" />），用 float64 逐档扫 h：
      </p>
      <MathBlock tex="\begin{array}{c|cc} h & \text{前向差商误差} & \text{中心差商误差} \\ \hline 10^{-4} & 4.2\times10^{-5} & 9.0\times10^{-10} \\ 10^{-6} & 4.2\times10^{-7} & 2.8\times10^{-11} \\ 10^{-8} & \mathbf{3.0\times10^{-9}} & 2.6\times10^{-9} \\ 10^{-10} & 5.9\times10^{-8} & 5.9\times10^{-8} \\ 10^{-14} & 3.7\times10^{-3} & 3.7\times10^{-3} \end{array}" />
      <p>
        前向差商的最优点<strong>正落在 <MathInline tex="h = 10^{-8}" /></strong>，
        与理论的 <MathInline tex="\sqrt\varepsilon = 1.5\times10^{-8}" /> 吻合，
        最好也就 <MathInline tex="3\times10^{-9}" />。
        再往小拖，误差反而<strong>暴涨四个数量级</strong>——
        这就是<router-link to="/numerical/float-error">上一讲</router-link>动画里那条曲线的同一个 U 形，
        换了个场合又出现了一次。
      </p>
      <p>
        <strong>顺带看一件划算的事：换成中心差商，白赚三位数字。</strong>
        <MathInline tex="\dfrac{f(x+h)-f(x-h)}{2h}" /> 的截断误差是
        <MathInline tex="O(h^2)" /> 而非 <MathInline tex="O(h)" />
        （<strong>这个记号本讲第一次出现：<MathInline tex="O(h^2)" /> 读作「量级不超过
        <MathInline tex="h^2" /> 的常数倍」——h 缩小一半，这一项至少缩小到四分之一。
        它只报量级、不报系数</strong>，因为要紧的从来是"随 h 变化多快"，
        而那个系数在换一个函数、换一个点时就变了；奇次项对消，与<router-link to="/mathphys/laplace">数理方程第 4 讲</router-link>
        推 <MathInline tex="\Delta u" /> 时用的是同一个技巧），
        于是最优 <MathInline tex="h \sim \varepsilon^{1/3}" />，
        最好能到 <MathInline tex="10^{-11}" />——上表里 <MathInline tex="h = 10^{-6}" /> 那一行
        <strong>2.8×10⁻¹¹，比前向差商最好的成绩还准两个数量级</strong>，
        代价只是多算一次函数值。
      </p>
      <p>
        <strong>这也解释了机器学习为什么不用差商求梯度。</strong>
        参数上百万时，差商要算上百万次函数值，且每个只有 8 位准；
        <strong>自动微分</strong>按链式法则精确地算出导数，
        没有 h、没有截断误差、也没有这个 U 形——
        <router-link to="/calculus/derivative">微积分第 2 讲</router-link>那条求导法则，
        在这里从"纸上的规则"变成了编译器里的一趟遍历。
      </p>
    </RevealBox>

    <QuizBox
      quiz-id="root-finding-q3"
      question="数值求导的步长 h，是不是取得越小越准？"
      hint="把两种误差分开看：一种随 h 变小而变小，另一种随 h 变小反而变大。"
      :options="[
        { t: '不是。截断误差随 h 减小，舍入误差却随 h 减小而暴涨，最优点卡在中间：前向差商大约落在 $\\sqrt{\\varepsilon}\\approx1.5\\times10^{-8}$，再往小拖误差反而涨回去。', why: '对，这就是那条 U 形。h 太小时分子是两个几乎相等的数相减（第 1 讲那个灾难性抵消原地复发），剩下的那点有效数字再被小小的 h 一除，就被放大成灾：表里 $h=10^{-14}$ 那一行误差 $3.7\\times10^{-3}$，比 $h=10^{-4}$ 时还差了近百倍。' },
        { t: '是：h 是这个近似唯一的误差来源，$h \\to 0$ 就是导数的定义，越小当然越接近真值。', why: '纸上成立，机器上不成立——因为纸上的实数没有「最后一位」。float64 只有约 16 位有效数字，$h=10^{-14}$ 时 $f(x+h)$ 与 $f(x)$ 只在最后一两位上不同，相减之后有效数字几乎被吃光。取极限是数学动作，浮点数不陪你做。' },
        { t: '越小越准——只要改用中心差商就没这个毛病，它的截断误差是 $O(h^2)$。', why: '中心差商只是把 U 形的底往下挪了一截（最优 h 从 $\\sqrt{\\varepsilon}$ 变成 $\\varepsilon^{1/3}$，最好成绩从 $3\\times10^{-9}$ 提到 $10^{-11}$），U 形本身还在：表里 $h=10^{-10}$ 那一行，两种差商的误差一模一样，都是 $5.9\\times10^{-8}$——那时舍入误差已经压倒一切，跟你用哪个公式无关。' },
      ]"
      :answer="0"
    />

    <h2><span class="sec-no">伍</span>买到了什么：藏在每一次按键背后的迭代</h2>

    <h3>你按下的每一次开方、每一次除法，跑的都是牛顿法</h3>
    <p>
      伍节第一条说"计算器就在这么算"，这话比听上去更字面。
      CPU 里<strong>没有开方电路</strong>，也没有真正意义上的高速除法电路——
      硬件只擅长加法和乘法。所以这两件事都是<strong>用牛顿法现算的</strong>，
      而且算法就写在芯片的微码里。
    </p>
    <p>
      <strong>除法：把除法变成不含除法的迭代。</strong>
      要算 <MathInline tex="a/b" />，先求 <MathInline tex="1/b" /> 再乘。
      取 <MathInline tex="f(x) = 1/x - b" />，代进牛顿迭代式并化简：
    </p>
    <MathBlock tex="x_{n+1} = x_n - \frac{1/x_n - b}{-1/x_n^2} = x_n\,(2 - b\,x_n)" />
    <p>
      <strong>请盯着右边看：只有一次减法和两次乘法，一个除号都没有。</strong>
      这正是硬件想要的——用它最擅长的乘法，换掉它最不擅长的除法。
      实测求 <MathInline tex="1/7" />，从一个粗糙的初值 0.1 出发：
    </p>
    <MathBlock tex="0.1 \to 0.13 \to 0.1417 \to 0.14284777 \to 0.1428571422 \to 0.142857142857143" />
    <p>
      误差 <MathInline tex="1.3\times10^{-2} \to 1.2\times10^{-3} \to 9.4\times10^{-6} \to 6.2\times10^{-10} \to 2.8\times10^{-17}" />——
      <strong>又是位数翻倍</strong>，五步到机器精度。
      真实芯片还要快：初值不是随手取的 0.1，而是<strong>查一张小表</strong>得到的近似值，
      于是只需两三步。
    </p>
    <div class="insight">
      <div class="insight-title">💡 程序员文化里最有名的一段代码，就是"一个好初值 + 一次牛顿迭代"</div>
      <p>
        1999 年《雷神之锤 III》的源码公开后，一段计算
        <MathInline tex="1/\sqrt x" /> 的函数让无数人看傻了眼——
        它先把浮点数的二进制<strong>当成整数</strong>，右移一位，
        再用一个神秘常数 <code>0x5f3759df</code> 去减，得到一个初值；
        然后<strong>只做一次</strong>牛顿迭代就返回。
      </p>
      <p>
        为什么它能工作？<router-link to="/numerical/float-error">上一讲</router-link>说过，
        浮点数的二进制里<strong>指数部分就是以 2 为底的对数的整数部分</strong>。
        把它当整数右移一位，相当于把指数<strong>除以 2</strong>——
        这不正是开平方要做的事吗？那个魔数则是在修正"取对数再取指数"带来的偏差。
        <strong>整个位运算是一台极便宜的"对数近似器"</strong>。
      </p>
      <p>
        效果实测（扫两万个 x 取最大相对误差）：
        <strong>光靠那个位运算，初值的误差已经小于 3.44%</strong>；
        接上<strong>一次</strong>牛顿迭代降到 <strong>0.175%</strong>——
        对三维游戏里做向量归一化来说完全够用，而代价只有几条指令。
        （再来一次能到 <MathInline tex="4.6\times10^{-6}" />，但游戏不需要，就省了。）
      </p>
      <p>
        <strong>这段代码之所以成为传奇，恰恰因为它把本讲的两个教训用到了极致：</strong>
        牛顿法收敛极快，<strong>但挑初值</strong>——那就花几条指令造一个好得离谱的初值，
        然后迭代一次就收工。<strong>"算法快不快"从来不只取决于算法，
        还取决于你从哪儿出发</strong>。
      </p>
    </div>

    <h3>还买到了什么</h3>
    <ul>
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
