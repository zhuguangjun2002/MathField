<script setup>
import ConceptPage from '../../components/ConceptPage.vue'
import MathBlock from '../../components/MathBlock.vue'
import MathInline from '../../components/MathInline.vue'
import RevealBox from '../../components/RevealBox.vue'
import QuizBox from '../../components/QuizBox.vue'
import LimitSequenceDemo from '../../demos/LimitSequenceDemo.vue'
import EpsilonDeltaDemo from '../../demos/EpsilonDeltaDemo.vue'
</script>

<template>
  <ConceptPage slug="limit">
    <h2><span class="sec-no">壹</span>困境：从芝诺到贝克莱，两千年说不清一个"无穷"</h2>
    <p>
      公元前 450 年左右，哲学家芝诺提出了一组悖论，其中最有名的是<strong>阿基里斯追乌龟</strong>：
      飞毛腿阿基里斯在乌龟身后 1 里处开始追，速度是乌龟的 10 倍。等他跑完这 1 里，
      乌龟前进了 1/10 里；等他再跑完这 1/10 里，乌龟又前进了 1/100 里……如此下去有<em>无穷多个</em>阶段，
      每个阶段乌龟都还领先一点。所以阿基里斯永远追不上乌龟？
    </p>
    <p>
      每个人都知道结论是荒谬的——阿基里斯当然追得上。但要指出推理<em>错在哪一步</em>，
      希腊人办不到。问题的核心是：<strong>无穷多个正数加起来，为什么可以是个有限数？</strong>
      按上面的分法，阿基里斯追上乌龟时跑过的总路程应该是
    </p>
    <MathBlock tex="1 + \frac{1}{10} + \frac{1}{100} + \frac{1}{1000} + \cdots = \frac{10}{9}" />
    <p>
      不过请先盯住这个等号看一眼：<strong>左边是无穷多项，而"把无穷多个数加起来"是什么意思，
      到此刻为止谁也没有定义过</strong>。所以这个等号眼下还是一句没有兑现的口号。
      我们能老老实实做到的，只有"加有限项"——
    </p>
    <RevealBox
      title="🔍 只加有限项：那个 10/9 是怎么冒出来的"
      label="对答案 / 看完整拆解"
    >
      <template #hint>
        先自己动笔：把前五项 <MathInline tex="S_5 = 1 + \tfrac{1}{10} + \tfrac{1}{100} + \tfrac{1}{1000} + \tfrac{1}{10000}" />
        加出来（是个有限小数）；再把 <MathInline tex="S_5" /> 乘以 10，看看
        <MathInline tex="10S_5" /> 和 <MathInline tex="S_5" /> 逐项对比只差哪两项。
        两个数，算完再点开。
      </template>
      <p>
        <strong>第一步：只加前 n 项，一个无穷都不用。</strong>
      </p>
      <MathBlock tex="S_n = 1 + \frac{1}{10} + \frac{1}{100} + \cdots + \frac{1}{10^{\,n-1}}" />
      <p>
        <strong>第二步：乘 10 再相减（"错位相减"）。</strong>把每一项都放大 10 倍，
        整串数就整体<strong>右移一格</strong>——头上多出一个 10，尾巴上少掉最后一项：
      </p>
      <MathBlock tex="10\,S_n = 10 + 1 + \frac{1}{10} + \cdots + \frac{1}{10^{\,n-2}} = 10 + S_n - \frac{1}{10^{\,n-1}}" />
      <p>
        <strong>第三步：解出来。</strong>中间那一长串在相减时全部对消，只剩两头：
      </p>
      <MathBlock tex="9\,S_n = 10 - \frac{1}{10^{\,n-1}} \quad\Longrightarrow\quad S_n = \frac{10}{9}\Bigl(1 - \frac{1}{10^{\,n}}\Bigr)" />
      <p>
        代进去核一下：<MathInline tex="S_1 = 1" />、<MathInline tex="S_2 = 1.1" />、
        <MathInline tex="S_5 = 1.1111" />，跟手算一致。
      </p>
      <p>
        <strong>第四步：看差距。</strong><MathInline tex="S_n" /> 与 10/9 差的正好是
        <MathInline tex="\tfrac{10}{9}\cdot 10^{-n}" />——n 每加 1，差距就缩小到十分之一。
        加到第 5 项时差距已经只有 <MathInline tex="1.1 \times 10^{-5}" />。
      </p>
      <p>
        <strong>回味一下：到这里为止，我们一个"无穷"都没用上</strong>，每一步都是有限项的加减乘除，
        都经得起最挑剔的检查。差的只是最后一句话——"差距要多小有多小，所以那个和<em>就是</em> 10/9"。
        把这句话变成一条能写进证明的定义，正是本讲要做的全部事情。
      </p>
    </RevealBox>
    <p>
      希腊数学从此患上"无穷恐惧症"。阿基米德用穷竭法算面积时，都刻意绕开"无穷"二字，
      改用有限步数加反证法来表述（<router-link to="/calculus/integral">第三讲</router-link>会看到他这套本事有多惊人）。
      这个心结，一悬就是两千年。
    </p>
    <p>
      17 世纪，牛顿和莱布尼茨发明微积分（<router-link to="/calculus/derivative">第二讲</router-link>、
      <router-link to="/calculus/integral">第三讲</router-link>），威力巨大，却把地基埋在了一个
      含糊的概念上——<strong>无穷小量</strong>。他们最常算的一类问题是：
      <MathInline tex="x" /> 挪动一小步，<MathInline tex="y = x^2" /> 跟着变多少？
      两个变化量的<em>比值</em>是多少？（这个比值后来有了专门的名字"导数"，
      要到<router-link to="/calculus/derivative">第二讲</router-link>才正式登场——此处你只需要跟得上分数运算。）
      当时的算法是：给 <MathInline tex="x" /> 一个"无穷小"的增量 <MathInline tex="o" />，
      算出 <MathInline tex="y" /> 的变化量 <MathInline tex="(x+o)^2 - x^2" />，再除以 <MathInline tex="o" />：
    </p>
    <MathBlock tex="\frac{(x+o)^2 - x^2}{o} = \frac{x^2 + 2xo + o^2 - x^2}{o} = \frac{2xo + o^2}{o} = 2x + o" />
    <p>
      三步全是中学代数：第一步把 <MathInline tex="(x+o)^2" /> 按乘法分配展开成
      <MathInline tex="x^2 + 2xo + o^2" />，第二步 <MathInline tex="x^2" /> 对消，
      第三步分子分母同除以 <MathInline tex="o" />。然后宣布：<MathInline tex="o" /> 无穷小，
      扔掉不要，答案是 <MathInline tex="2x" />。
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
    <p>
      两个相隔两千二百年的难题，其实是同一个病：<strong>我们一直在使用"无限接近"这四个字，
      却从来没有说清楚它是什么意思。</strong>
    </p>

    <h2><span class="sec-no">贰</span>破局：不谈"无穷"，改谈"要多近有多近"</h2>
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
    <p>
      先把两个新记号交代干净。<strong>数列</strong>就是一串编了号的数：第 1 个、第 2 个、第 3 个……
      整串记作 <MathInline tex="\{a_n\}" />，n 是编号，<MathInline tex="a_n" /> 是第 n 个数。
      比如 <MathInline tex="a_n = 1 + \frac{1}{n}" /> 就是 2, 1.5, 1.333…, 1.25, … 这串数。
      而 <MathInline tex="|a_n - L|" /> 读作"<MathInline tex="a_n" /> 与 L 的<strong>距离</strong>"——
      绝对值把正负方向抹掉，只留"差多远"，正是数轴上两点之间的距离。
    </p>
    <p>
      "接得住"不能只是嘴上说说，得当场应答一次。就拿上面那串
      <MathInline tex="a_n = 1 + \frac{1}{n}" /> 试试，我宣称它的极限是 1：
    </p>
    <ul>
      <li>
        对手出 <MathInline tex="\varepsilon = 0.001" />。我要找的 N 必须保证 n &gt; N 时
        <MathInline tex="|a_n - 1| = \frac{1}{n} < 0.001" />，也就是 <MathInline tex="n > 1000" />
        （<MathInline tex="\frac{1}{n} < 0.001" /> 两边同取倒数——中学那条规矩：对正数取倒数，
        不等号要翻面）。<strong>取 N = 1000</strong>，交卷；
      </li>
      <li>
        对手加码到 <MathInline tex="\varepsilon = 10^{-9}" />。同样解 <MathInline tex="\frac{1}{n} < 10^{-9}" />，
        <strong>取 N = 10⁹</strong>，照样交得出；
      </li>
      <li>
        对手出任意 ε。解出来 <MathInline tex="n > 1/\varepsilon" />，
        <strong>取 N 为任何大于 <MathInline tex="1/\varepsilon" /> 的整数</strong>即可。
        对手无论出什么，我都有现成的应答公式——这就叫"接得住"。
      </li>
    </ul>
    <p>
      注意这三次应答里，<strong>没有任何一个数是"无穷小"</strong>：ε 是个具体的正数，
      N 是个具体的正整数，比较的是有限的不等式。
    </p>
    <div class="insight">
      <div class="insight-title">💡 现在正面回答贝克莱：o 从头到尾都不是零</div>
      <p>
        再看那个让主教得意的式子。<strong>整个过程中 <MathInline tex="o" /> 一直是个不等于零的普通实数</strong>，
        所以第一步拿它当除数完全合法，约分得到差商 <MathInline tex="2x + o" />。
        最后一步也不是"扔掉"，而是<strong>玩一局刚才那个游戏</strong>：差商与 2x 的差恰好是
        <MathInline tex="|(2x+o) - 2x| = |o|" />，对手给出任意 ε，我回答 <MathInline tex="\delta = \varepsilon" />，
        则只要 <MathInline tex="0 < |o| < \delta" /> 就有 <MathInline tex="|(2x+o)-2x| < \varepsilon" />。
        <strong>所以差商的极限是 2x</strong>——这句话里 o 始终非零，"消失量的幽灵"从未出场，
        因为我们根本没让任何量"消失"过，只是问了它<em>逼近的目标</em>是什么。
      </p>
    </div>
    <p>
      同一个游戏搬到函数上，只需换一样东西：数列只能沿着 <MathInline tex="n = 1, 2, 3, \ldots" /> 往前走，
      所以应答的是"从第几项起"；函数的 x 可以从两边贴近一个点 a，所以应答的是<strong>"距离 a 多近以内"</strong>。
      于是"位置 N"换成"半径 δ"：<strong>对手给一个纵向容差 ε，我回答一个横向半径 δ</strong>，
      保证 x 落在 a 左右 δ 以内时，f(x) 就落在 L 上下 ε 以内。下面这个函数是最经典的陪练对象：
    </p>
    <MathBlock tex="f(x) = \frac{x^2 - 1}{x - 1} \qquad (x \neq 1)" />
    <p>
      它在 <MathInline tex="x = 1" /> 处分母为零，<strong>压根没有定义</strong>；
      可只要 <MathInline tex="x \neq 1" />，约分就得 <MathInline tex="f(x) = x + 1" />，
      x 贴近 1 时它明明白白地贴近 2。<strong>"函数在某点没有定义"与"函数在该点有极限"
      完全可以同时成立</strong>——这正是极限这个概念最值得买的地方。
    </p>
    <QuizBox
      quiz-id="limit-q1"
      question="贰节回应贝克莱时说「o 从头到尾都不是零」。那么在求 $y=x^2$ 变化率的那局游戏里，增量 $o$ 到底是什么身份？"
      hint="回想那个插曲：第一步除以 o 为什么合法，最后一步的「扔掉」被换成了什么动作。"
      :options="[
        { t: '一个不等于零的普通实数；游戏问的是差商 $2x+o$ 逼近的目标', why: '对。o 一直是普通非零实数，所以除法合法；最后一步不是把 o 扔掉，而是问差商随 o 逼近谁——答案 2x 是极限值，不是代入 o=0 的结果。' },
        { t: '一个「无穷小」：比任何正数都小，但又不是零', why: '这正是贝克莱攻击的靶子——实数里根本没有「比任何正数都小的正数」。ε-δ 方案的全部意义，就是不再需要这种可疑的量。' },
        { t: '先当非零数用，算完再当零扔掉', why: '你复述的是 17 世纪的原始算法，也就是被贝克莱抓住的把柄：同一个量不能一会儿非零、一会儿是零。新方案里 o 从头到尾非零。' },
      ]"
      :answer="0"
    />

    <h2><span class="sec-no">叁</span>亲手打两局 ε 挑战</h2>
    <p>
      道理讲完了，不如自己当一次应战方。下面两个动画就是刚才那两局游戏：
      第一局出招的是数列，第二局出招的是函数。
      （上面的折叠框如果跳过了也不要紧，但那道"部分和"的拆解是这一讲的地基，回头补上更划算。）
    </p>
    <LimitSequenceDemo />
    <p>
      第二局：把"从第几项起"换成"离 a 多近以内"。拖动 δ 到超标，绿色曲线会变红——
      那就是对手赢了这一回合。
    </p>
    <EpsilonDeltaDemo />

    <h2><span class="sec-no">肆</span>严格定义</h2>
    <p>
      读定义之前，先把三样装备认齐——它们你其实都见过：<MathInline tex="\{a_n\}" />
      是贰节那串<strong>编了号的数</strong>；<MathInline tex="|a_n - L|" /> 是
      <strong>第 n 个数与 L 在数轴上的距离</strong>；而"任意 / 存在"这对词，
      就是把贰节的攻防游戏誊写成书面语——<strong>"任意"是对手随便出，"存在"是我总能应答</strong>。
      带着这三样再读，下面这段话就不是天书，而是一份战报：
    </p>
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
      只有静态的不等式和有限的数。幽灵被驱散的方式，就是把"运动的过程"改写成了"能兑现的承诺"。
      函数极限也是同一个思路：
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
      与函数在该点有没有定义、值是多少完全无关。上面那个
      <MathInline tex="(x^2-1)/(x-1)" /> 就是靠这一条才谈得上极限。
    </p>
    <p>
      定义里的 δ 是"存在"出来的，可它究竟怎么找？这是初学时最卡人的一关，
      而办法其实只有一句话：<strong>把 <MathInline tex="|f(x)-L|" /> 用
      <MathInline tex="|x-a|" /> 反过来估计一遍</strong>。
    </p>
    <RevealBox
      title="🔍 δ 到底怎么找：一个白送的例子，一个要动手的例子"
      label="对答案 / 看完整拆解"
    >
      <template #hint>
        先自己试：① 对 <MathInline tex="f(x)=(x^2-1)/(x-1)" />、<MathInline tex="a=1" />、
        <MathInline tex="L=2" />，把 <MathInline tex="|f(x)-2|" /> 化简成只含
        <MathInline tex="|x-1|" /> 的样子；② 再对 <MathInline tex="f(x)=x^2" />、
        <MathInline tex="a=2" />、<MathInline tex="L=4" /> 试同一招，你会发现多出一个碍事的因子，
        想想拿它怎么办。两个 δ，写完再点开。
      </template>
      <p>
        <strong>例一：白送的那种。</strong><MathInline tex="x \neq 1" /> 时约分得
        <MathInline tex="f(x) = x+1" />，于是
      </p>
      <MathBlock tex="|f(x) - 2| = |(x+1) - 2| = |x - 1|" />
      <p>
        左边就是右边。对手给 ε，我<strong>取 <MathInline tex="\delta = \varepsilon" /></strong>：
        只要 <MathInline tex="0<|x-1|<\delta" />，就有 <MathInline tex="|f(x)-2| = |x-1| < \varepsilon" />。
        一步到位——上面动画里"只要 δ ≤ ε 就行"这句话，出处就在这里。
      </p>
      <p>
        <strong>例二：要动手的那种。</strong>取 <MathInline tex="f(x)=x^2" />、
        <MathInline tex="a=2" />，先照搬第一招：
      </p>
      <MathBlock tex="|x^2 - 4| = |x-2|\,|x+2|" />
      <p>
        麻烦来了：右边除了想要的 <MathInline tex="|x-2|" />，还挂着一个
        <MathInline tex="|x+2|" />，它随 x 变，没法直接当系数用。
        <strong>办法是先把 x 圈起来</strong>：反正 δ 是我自己挑的，那就<strong>先规定
        <MathInline tex="\delta \le 1" /></strong>。这样 x 一定落在 <MathInline tex="(1,3)" /> 里，
        于是 <MathInline tex="|x+2| < 5" />，碍事的因子被换成了一个常数：
      </p>
      <MathBlock tex="|x^2 - 4| = |x-2|\,|x+2| < 5\,|x-2|" />
      <p>
        现在只要让 <MathInline tex="5|x-2| < \varepsilon" />，即
        <MathInline tex="|x-2| < \varepsilon/5" />。两个要求一起满足，
        <strong>取 <MathInline tex="\delta = \min\{1,\ \varepsilon/5\}" /></strong> 即可。
      </p>
      <p>
        验一验：<MathInline tex="\varepsilon = 0.1" /> 时 <MathInline tex="\delta = 0.02" />，
        而 <MathInline tex="|x-2|<0.02" /> 范围内 <MathInline tex="|x^2-4|" /> 始终小于
        <MathInline tex="2.02^2-4 = 0.0804" />，确实小于 0.1，还留了余量——
        <strong>δ 不必是最优的，够用就行</strong>，
        定义只要求"存在"，从不要求"最好"。
      </p>
      <p>
        <strong>两个例子的共同套路</strong>：把 <MathInline tex="|f(x)-L|" /> 拆成
        "<MathInline tex="|x-a|" /> × 一个碍事的东西"，再用一个预设的粗糙范围（这里是 δ ≤ 1）
        把碍事的东西压成常数。你在习题里遇到的绝大多数 ε-δ 证明，用的都是这一招。
      </p>
    </RevealBox>
    <QuizBox
      quiz-id="limit-q2"
      question="把定义里的「对<strong>任意</strong> $\varepsilon>0$，都<strong>存在</strong> $N$」换成「<strong>存在</strong> $N$，对<strong>任意</strong> $\varepsilon>0$」，意思变了吗？"
      hint="用游戏语言想：两种说法里，先出招的分别是谁？"
      :options="[
        { t: '变了：换序后要求一个 N 通吃所有 ε，苛刻得多', why: '对。量词顺序就是出招顺序：原定义是对手先出 ε、我再挑 N（N 可以随 ε 换）；换序后我要先亮出 N、还得应付之后的一切 ε——那等于要求从第 N 项起每个 aₙ 与 L 的距离小于所有正数，也就是全都恰好等于 L。' },
        { t: '没变，只是换了个说法', why: '把「你先出招我再应答」换成「我先亮底牌你随便打」，是两场完全不同的比赛。数学句子里量词的先后就是出招的先后，交换不得——这是读一切严格定义的第一条纪律。' },
        { t: '变了，但只是稍微严了一点', why: '不是稍微：与所有正数的距离都更小的量只能是 0，所以换序后逼出的结论是「从第 N 项起 aₙ 恒等于 L」——比「逼近 L」苛刻了无穷多倍，绝大多数收敛数列都会被判不合格。' },
      ]"
      :answer="0"
    />

    <h2><span class="sec-no">伍</span>买到了什么：整座大厦的地基</h2>
    <p>有了极限这块基石，微积分里所有"懵懵懂懂"的概念都能落地了：</p>
    <ul>
      <li>
        <strong>连续</strong>不再是"笔不离纸"，而是
        <MathInline tex="\lim_{x \to a} f(x) = f(a)" /> —— 趋势值恰好等于实际值；
      </li>
      <li>
        <strong>导数</strong>是差商的极限（<router-link to="/calculus/derivative">第二讲</router-link>），
        <strong>积分</strong>是黎曼和的极限（<router-link to="/calculus/integral">第三讲</router-link>）——
        两大主角都是极限的化身；
      </li>
      <li>
        <strong>无穷级数求和</strong>终于有了定义：它<em>被规定为</em>部分和数列
        <MathInline tex="S_n" /> 的极限。壹节里那个欠着的等号，到这一刻才算兑现——
        <MathInline tex="S_n = \tfrac{10}{9}(1-10^{-n})" />，对任意 ε 取 N 使
        <MathInline tex="\tfrac{10}{9}10^{-N} < \varepsilon" /> 即可，所以那个和<strong>就是</strong> 10/9。
      </li>
    </ul>
    <div class="insight">
      <div class="insight-title">🏁 芝诺悖论正式结案</div>
      <p>
        知道了总路程是 10/9 里，悖论就散了：<strong>无穷多个阶段，占用的却是有限的路程和有限的时间</strong>。
        芝诺的推理每一步都对，错在最后那句没说出口的话——"无穷多个阶段"被他默认成了"永远走不完"。
      </p>
      <p>
        而且这个 10/9 不必靠级数才能得到，用初中代数就能独立验一遍：设阿基里斯追上乌龟时跑了
        s 里，那么乌龟跑了 s − 1 里，两者用时相同。阿基里斯速度是乌龟的 10 倍，所以
      </p>
      <MathBlock tex="\frac{s}{10v} = \frac{s-1}{v} \quad\Longrightarrow\quad s = 10(s-1) \quad\Longrightarrow\quad s = \frac{10}{9}" />
      <p>
        <strong>两条路殊途同归。</strong>这正是级数求和该有的样子：它不该给出新答案，
        而该跟老办法算出同一个答案——只是它还能对付那些没有老办法可用的场合。
      </p>
    </div>
    <p>
      还有一个例子值得单独说，因为它凭空造出了一个数学常数：银行复利的结算次数 n 越来越多时，
      本息 <MathInline tex="(1 + \frac{1}{n})^n" /> 会不会涨到无穷？答案是不会，它收敛到
      <MathInline tex="e \approx 2.71828" />（上面动画的第二个数列就是它）。
      "涨但涨不过头"这件事，正是极限理论最经典的一条判据在起作用。
    </p>
    <RevealBox
      title="🔍 复利为什么涨不过头：单调递增 + 上界 3"
      label="对答案 / 看完整拆解"
    >
      <template #hint>
        先自己想想：<MathInline tex="(1+\tfrac1n)^n" /> 按二项式定理展开，第 k 项长什么样？
        把 <MathInline tex="\binom{n}{k}\tfrac{1}{n^k}" /> 里的 <MathInline tex="n" /> 尽量约掉，
        看看剩下的因子是不是都不超过 1。写出通项，再点开。
      </template>
      <p>
        <strong>第一步：展开。</strong>二项式定理给出
        <MathInline tex="\left(1+\tfrac1n\right)^n = \sum_{k=0}^{n} \binom{n}{k}\frac{1}{n^k}" />，
        把组合数写开并把 <MathInline tex="n^k" /> 逐个分给分子：
      </p>
      <MathBlock tex="\binom{n}{k}\frac{1}{n^k} = \frac{n(n-1)\cdots(n-k+1)}{k!\; n^k} = \frac{1}{k!}\Bigl(1-\frac1n\Bigr)\Bigl(1-\frac2n\Bigr)\cdots\Bigl(1-\frac{k-1}{n}\Bigr)" />
      <p>
        <strong>第二步：为什么单调递增。</strong>n 变大时，每个括号
        <MathInline tex="(1-\tfrac{j}{n})" /> 都变大（分掉的份额变小），所以<em>每一项都在变大</em>；
        而且项数从 n+1 变成 n+2，<em>还多出一项正的</em>。两头都涨，和当然递增。
      </p>
      <p>
        <strong>第三步：为什么涨不过头。</strong>那些括号统统小于 1，所以第 k 项
        <MathInline tex="\le \frac{1}{k!}" />。而 <MathInline tex="k \ge 1" /> 时
        <MathInline tex="k! = 1\cdot2\cdot3\cdots k \ge 2^{k-1}" />（把 3 以后的因子都换成 2，只会变小），于是
      </p>
      <MathBlock tex="\Bigl(1+\frac1n\Bigr)^n \le 1 + \sum_{k=1}^{n}\frac{1}{k!} \le 1 + \sum_{k=1}^{\infty}\frac{1}{2^{\,k-1}} = 1 + 2 = 3" />
      <p>
        <strong>第四步：收口。</strong>一个<strong>递增</strong>又<strong>有上界</strong>的数列必定收敛
        （这条"单调有界定理"是实数完备性的直接推论），所以极限存在。数学家把这个极限
        <em>命名</em>为 e——注意它是被这样定义出来的，不是先有 e 再发现它等于这个极限。
      </p>
      <p>
        顺带一提，第三步那个 <MathInline tex="\sum 1/k!" /> 的和恰好也是 e（2.71828…），
        上界 3 只是我们为了论证方便故意放粗的。这条级数会在
        <router-link to="/calculus/taylor">第五讲</router-link>以泰勒展开的身份正式登场。
      </p>
    </RevealBox>

    <h3>0.999… 到底等不等于 1：一场吵了三十年的网络论战</h3>
    <p>
      最后来结一桩你多半亲眼见过的公案。从上世纪九十年代的新闻组 sci.math，
      到后来的各大论坛和贴吧，"0.999… 是不是等于 1"大概是被吵得最多的数学问题：
      一方咬定"后面拖着无穷多个 9，总归差那么一丁点"，另一方拿
      <MathInline tex="\tfrac{1}{3} = 0.333\ldots" /> 两边乘 3 反击，谁也说服不了谁。
      2004 年 4 月 1 日，游戏公司暴雪甚至专门发了一份愚人节公告，
      以"官方裁定"的口吻宣布 0.999… = 1——拿自家论坛上绵延数月的口水战开涮。
    </p>
    <p>
      为什么这一架吵不出结果？因为双方都在拿直觉打直觉，而<strong>那串点点点从头到尾没被定义过</strong>——
      这正是壹节那个"没兑现的等号"的翻版。0.999… 不是一个现成的数摆在那里等你测量，
      它是一串记号；要谈它等于几，得先说清它<em>指</em>什么。而本讲已经准备好了唯一说得通的定义：
      <strong>0.999… 表示部分和数列 0.9, 0.99, 0.999, … 的极限</strong>。
    </p>
    <p>写出第 n 个部分和，游戏三行就打完：</p>
    <MathBlock tex="S_n = 0.\underbrace{99\cdots9}_{n\ \text{个}} = 1 - 10^{-n}, \qquad |S_n - 1| = 10^{-n}" />
    <p>
      对手出任意 <MathInline tex="\varepsilon" />，我取一个使 <MathInline tex="10^{-N} < \varepsilon" />
      的 N 应答（比如 ε = 0.001 就取 N = 4：从 <MathInline tex="S_4 = 0.9999" /> 起距离只有
      0.0001，达标）。对手出招再狠都接得住，所以极限是 1——于是
      <strong>0.999… = 1 不是"约等于"，不是"取整"，而是定义的直接后果，等号一分不打折</strong>。
      顺带一个机器视角：计算机的双精度小数（float64）能存下的最后一格差别在第 16 个 9——
      <MathInline tex="1 - 10^{-16}" /> 还能和 1 区分开，而 <MathInline tex="1 - 10^{-17}" />
      存进去就<em>是</em> 1。机器比论坛更早认输。
    </p>
    <p>
      那"总归差一点"的直觉就全无立足之地吗？也不是——数学里真有一套"非标准分析"，
      它扩充实数、允许"无穷小"合法存在，在那套数系里确实能造出与 1 差一个无穷小的数。
      但那得<strong>先换数系、并重新定义那串点点点</strong>。可见这场论战争的从来不是计算，
      而是定义：定义一换，结论就换；而在同一个定义下，等号没有商量的余地。
      吵了三十年的架，病根和芝诺、贝克莱是同一个——<strong>用一个没定义的记号，去打一场关于它的官司</strong>。
    </p>
    <QuizBox
      quiz-id="limit-q3"
      question="有人说：「0.999… 和 1 之间还差一个 0.000…1。」这句话的毛病出在哪？"
      hint="小数点后的每一位都得有个编号：第 1 位、第 2 位……那个 1 排在第几位？"
      :options="[
        { t: '「0.000…1」不是任何实数：无穷多个 0 之后再放一个 1，这串记号没有定义', why: '对。小数的每一位都要有确定的编号，而「无穷多个 0 之后」的那个 1 落不到任何一位上——它没有位置，所以这串记号不指任何实数。整场论战的病根就在这类想当然的记号上。' },
        { t: '毛病在算错了：那个差其实应该是 0.000…9', why: '换个末位数字救不了一串本来就没定义的记号——问题不在末位是 1 还是 9，在「无穷多个 0 之后还有一位」这件事本身就没有意义。' },
        { t: '没毛病，0.999… 确实比 1 小那么一丁点', why: '正文刚刚三行算完：0.999… 被定义为部分和数列 0.9, 0.99, 0.999, … 的极限，而这个极限恰好是 1。觉得「差一点」，其实是拿某个部分和 Sₙ 冒充了极限本身——每个 Sₙ 都小于 1，但极限不是任何一个 Sₙ。' },
      ]"
      :answer="0"
    />
    <div class="insight">
      <div class="insight-title">🔗 这块地基上盖着什么：站内连一连</div>
      <p>
        <strong>数值分析</strong>：<router-link to="/numerical/root-finding">牛顿迭代</router-link>
        算的就是数列极限，那里说的"收敛阶"衡量的正是本讲那个 N 随 ε 变大的速度有多快；
        <strong>概率论</strong>：<router-link to="/probability/lln">大数定律</router-link>说"频率趋于概率"，
        用的就是数列极限的变体（把"必然小于 ε"放宽成"以极大概率小于 ε"）；
        <strong>复变函数</strong>：幂级数的<router-link to="/complex/continuation">收敛半径</router-link>，
        是本讲的 ε-N 语言搬到复平面后的产物；
        <strong>数学物理方程</strong>：傅里叶级数"收敛到"一个函数是什么意思，
        答案还是本讲这套语言（<router-link to="/mathphys/heat">热传导讲</router-link>）。
        这些课全都在本站，而且都从零讲起——顺着首页的学习路径走过去，
        每到一处你都会重新撞见本讲这套 ε 语言。极限不是第一章的过路考点，
        它是后面所有数学的公共地基。
      </p>
    </div>
  </ConceptPage>
</template>
