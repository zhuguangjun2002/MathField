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
    <p>
      两个动画都带一个 <strong>⚔️ 开始挑战</strong> 按钮：点下去，对手会<strong>连出五招</strong>，
      同时锁住它那一侧的滑杆，剩下的活交给你——
      数列这局你要报出<strong>最小</strong>的 N，函数那局你要交出一个<strong>够小</strong>的 δ。
      先随便拖着玩明白了再开挑战，不着急。
    </p>
    <LimitSequenceDemo />
    <p>
      读数区那个 N，是程序<strong>从第 1 项一路试到第 400 项</strong>试出来的，给的是<strong>最小</strong>的那个 N。
      这里要提醒一句最容易误会的事：<strong>定义只要求"存在一个 N"，从没要求它最小</strong>。
      复利那档 ε = 0.05 时答 27 对，答 28、答 100 也一样对，只是没那么精打细算。
      而且真要应答时也不必像程序这样逐项试——这个数列可以<strong>直接从 ε 算出一个够用的 N</strong>，
      用的还是中学不等式。本讲最后一节把复利数列拆开时，会当场反算一次。
    </p>
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
    <p>
      刚才那一路，靠的是把 <MathInline tex="(1+\tfrac1n)^n" /> 整个拆开逐项比较。
      它胜在一次把<strong>递增</strong>和<strong>有上界</strong>两件事一起办了，
      但也确实笨重。这两件事各还有一条短得多的路，而且第二条路会白送一个很有用的副产品。
      先把要用的两把工具认一下——名字唬人，其实都是中学不等式。
    </p>
    <p>
      <strong>第一把：均值不等式</strong>（也叫 AM-GM，A 是 arithmetic 算术，G 是 geometric 几何）。
      一堆正数有两种"平均"：<strong>算术平均</strong>是加起来除以个数，
      <strong>几何平均</strong>是乘起来再开相应次方根。拿 1 和 9 试：算术平均
      <MathInline tex="(1+9)/2 = 5" />，几何平均 <MathInline tex="\sqrt{1\times 9} = 3" />。
      不等式说的就是这个现象永远成立：
    </p>
    <MathBlock tex="\frac{x_1 + x_2 + \cdots + x_m}{m} \;\ge\; \sqrt[m]{x_1 x_2 \cdots x_m}" />
    <p>
      <strong>而且等号只在这 m 个数全相等时才成立</strong>——这一条待会儿要用来把"≥"升级成严格的"＞"。
      两个数的情形一行就能验：<MathInline tex="a + b - 2\sqrt{ab} = (\sqrt a - \sqrt b)^2 \ge 0" />。
      几何画面是：周长固定的长方形里，<strong>正方形的面积最大</strong>（越"不平均"，乘积越吃亏）。
      一般 m 个数的证法有好几套（数学归纳、凸函数），这里就把它当一件已知工具用。
    </p>
    <p>
      <strong>第二把：伯努利不等式。</strong>对任意 <MathInline tex="x \ge -1" /> 和正整数 m，
    </p>
    <MathBlock tex="(1+x)^m \;\ge\; 1 + mx" />
    <p>
      人话：<strong>把一个 m 次方压扁成一次式，而且压扁后只会更小</strong>。
      试一下 <MathInline tex="1.02^3 = 1.061208" />，右边 <MathInline tex="1 + 3\times 0.02 = 1.06" />，
      确实大于。它的来历也不神秘：<MathInline tex="x \ge 0" /> 时把左边按二项式展开，
      <MathInline tex="1 + mx" /> 只是前两项，后面丢掉的全是非负的。
      我们要证的东西恰好是"n 次方 vs 一次式"，所以这把工具方向正好。
    </p>
    <p>
      两把工具就位。下面这个框里有三段推导，结论先摆在外面：
    </p>
    <ul>
      <li>
        <strong>AM-GM 一行证出递增</strong>——诀窍是拿 n 个
        <MathInline tex="(1+\tfrac1n)" /> 再<strong>配上一个 1</strong>，
        把 n 次方和 n+1 次方拉到同一个平台上比。
      </li>
      <li>
        <strong>同一招用第二次，证出上界。</strong>给 <MathInline tex="a_n" /> 配一个搭档
        <MathInline tex="b_n = (1+\tfrac1n)^{n+1}" />（就是多乘一个 <MathInline tex="1+\tfrac1n" />），
        它是<strong>递减</strong>的。于是 e 被两头夹住：
      </li>
    </ul>
    <MathBlock tex="a_n \;<\; e \;<\; b_n, \qquad b_n \le b_1 = \Bigl(1+\tfrac11\Bigr)^{2} = 4" />
    <p>
      上界 4 比前面的 3 松，但这条路白送两样东西：一是<strong>双边夹逼</strong>——
      n = 100 时 <MathInline tex="a_{100} = 2.704814" />、<MathInline tex="b_{100} = 2.731862" />，
      e 就夹在中间，这是不靠计算器也能框住 e 的办法；
      二是两者之差 <MathInline tex="b_n - a_n = a_n/n < e/n" />，
      这正是下面反算 N 时要用的那个误差上界的粗糙版。
    </p>
    <ul>
      <li>
        <strong>伯努利不等式给出第三条路</strong>，而且更精确：相邻两项之比
        <MathInline tex="a_n/a_{n-1} \ge (n^3+1)/n^3" />，
        右边明摆着大于 1，递增当场成立。收尾那个 <MathInline tex="n^3+1" /> 是白捡的巧合。
      </li>
    </ul>
    <RevealBox
      title="🔍 两条更短的路：均值不等式与伯努利不等式"
      label="对答案 / 看完整拆解"
    >
      <template #hint>
        先自己试第一条：把 n 个 <MathInline tex="(1+\tfrac1n)" /> 和一个 1 摆在一起，
        一共 n+1 个数，对它们用 AM-GM——左边的几何平均是什么？右边的算术平均能不能化简成
        <MathInline tex="1 + \tfrac{1}{n+1}" />？动笔算一下右边那个分数再点开。
      </template>
      <p>
        <strong>路线一：AM-GM 证递增。</strong>取 n 个
        <MathInline tex="(1+\tfrac1n)" />，外加一个 1，一共 n+1 个数。
        几何平均是这 n+1 个数的乘积开 n+1 次方，算术平均是它们的和除以 n+1：
      </p>
      <MathBlock tex="\Bigl[\Bigl(1+\tfrac1n\Bigr)^{n}\cdot 1\Bigr]^{\frac{1}{n+1}} \;\le\; \frac{n\bigl(1+\tfrac1n\bigr) + 1}{n+1} = \frac{n+2}{n+1} = 1 + \frac{1}{n+1}" />
      <p>
        右边的化简只用到 <MathInline tex="n(1+\tfrac1n) = n + 1" />，加上那个配来的 1 就是 n+2。
        现在两边同时取 n+1 次方（两边都是正数，不等号方向不变）：
      </p>
      <MathBlock tex="\Bigl(1+\frac1n\Bigr)^{n} \;\le\; \Bigl(1+\frac{1}{n+1}\Bigr)^{n+1}, \qquad \text{即}\quad a_n \le a_{n+1}" />
      <p>
        而且这 n+1 个数<strong>不全相等</strong>（配来的那个 1 和其余的
        <MathInline tex="1+\tfrac1n" /> 不一样），所以 AM-GM 取严格不等号，
        <MathInline tex="a_n < a_{n+1}" /> 是<strong>严格</strong>递增。一步到位，不用展开。
      </p>
      <p>
        <strong>路线二：同一招证搭档递减。</strong>令
        <MathInline tex="b_n = \bigl(1+\tfrac1n\bigr)^{n+1}" />。直接看它不方便，
        改看它的倒数——因为倒数的形状和 <MathInline tex="a_n" /> 几乎一模一样，只是加号变减号：
      </p>
      <MathBlock tex="\frac{1}{b_n} = \Bigl(\frac{n}{n+1}\Bigr)^{n+1} = \Bigl(1-\frac{1}{n+1}\Bigr)^{n+1}" />
      <p>
        要证 <MathInline tex="b_n" /> 递减，只需证这个倒数<strong>递增</strong>。照抄路线一：
        取 n+1 个 <MathInline tex="(1-\tfrac{1}{n+1})" />，再配一个 1，一共 n+2 个数，
      </p>
      <MathBlock tex="\Bigl[\Bigl(1-\tfrac{1}{n+1}\Bigr)^{n+1}\Bigr]^{\frac{1}{n+2}} \;\le\; \frac{(n+1)\bigl(1-\tfrac{1}{n+1}\bigr) + 1}{n+2} = \frac{n+1}{n+2} = 1 - \frac{1}{n+2}" />
      <p>
        右边那步化简是 <MathInline tex="(n+1)(1-\tfrac{1}{n+1}) = n" />，再加配来的 1 得 n+1。
        两边取 n+2 次方，得到的正是下一项：
      </p>
      <MathBlock tex="\Bigl(1-\frac{1}{n+1}\Bigr)^{n+1} \;\le\; \Bigl(1-\frac{1}{n+2}\Bigr)^{n+2}, \qquad \text{即}\quad \frac{1}{b_n} \le \frac{1}{b_{n+1}}" />
      <p>
        倒数递增，本身就递减。于是对任意 n 都有
        <MathInline tex="a_n < b_n \le b_1 = 4" />——<strong>上界到手</strong>。
        （<MathInline tex="a_n < b_n" /> 是显然的：<MathInline tex="b_n" /> 就是
        <MathInline tex="a_n" /> 多乘了一个大于 1 的数。）
        而且因为 <MathInline tex="a_n" /> 递增、<MathInline tex="b_n" /> 递减、两者之差
        <MathInline tex="b_n - a_n = a_n\cdot\tfrac1n \to 0" />，
        它们从上下两侧同时收拢到同一个数——那个数就是 e。
      </p>
      <p>
        <strong>路线三：伯努利不等式，纯代数。</strong>直接算相邻两项的比，
        关键是把它凑成"1 减一个小量"的形状：
      </p>
      <MathBlock tex="\frac{a_n}{a_{n-1}} = \frac{\bigl(\frac{n+1}{n}\bigr)^{n}}{\bigl(\frac{n}{n-1}\bigr)^{n-1}} = \Bigl(\frac{n^2-1}{n^2}\Bigr)^{n-1}\cdot\frac{n+1}{n} = \Bigl(1-\frac{1}{n^2}\Bigr)^{n-1}\cdot\frac{n+1}{n}" />
      <p>
        中间那步是把分子拆出一个 <MathInline tex="\frac{n+1}{n}" /> 留在外面，
        剩下的 <MathInline tex="\frac{n+1}{n}\cdot\frac{n-1}{n} = \frac{n^2-1}{n^2}" /> 正好配成 n−1 次方。
        现在对前一半用伯努利（取 <MathInline tex="x = -1/n^2" />，
        <MathInline tex="m = n-1" />）：
      </p>
      <MathBlock tex="\Bigl(1-\frac{1}{n^2}\Bigr)^{n-1} \ge 1 - \frac{n-1}{n^2} = \frac{n^2-n+1}{n^2}" />
      <p>合起来，分子上会出现一个漂亮的巧合：</p>
      <MathBlock tex="\frac{a_n}{a_{n-1}} \;\ge\; \frac{n^2-n+1}{n^2}\cdot\frac{n+1}{n} = \frac{(n^2-n+1)(n+1)}{n^3} = \frac{n^3+1}{n^3} \;>\; 1" />
      <p>
        <MathInline tex="(n^2-n+1)(n+1)" /> 展开后中间四项两两抵消，只剩
        <MathInline tex="n^3+1" />（这正是立方和公式
        <MathInline tex="a^3+b^3=(a+b)(a^2-ab+b^2)" /> 在 <MathInline tex="b=1" /> 时的样子）。
        比值大于 1，递增。三条路殊途同归。
      </p>
    </RevealBox>
    <p>
      回到<strong>最前面那个二项式展开</strong>（不是刚才这两条捷径）——它还能顺手还掉叁节欠的一笔账：<strong>ε 挑战里的 N，不逐项试也能直接算出来</strong>。
      把展开再往下压一步，就得到一个干净的误差上界
    </p>
    <MathBlock tex="e - \Bigl(1+\frac1n\Bigr)^{n} \;<\; \frac{e}{2n}" />
    <p>
      于是只要取 <MathInline tex="N = \lceil\, e/(2\varepsilon) \,\rceil" />，应答就<strong>保证</strong>合格。
      ε = 0.05 时它给 N = 28，而动画从第 1 项硬扫到第 400 项，得到的最小值是 27——
      <strong>反算只多报了一个，却一项都不用算</strong>。
      这条上界还顺带量出了收敛有多慢：误差按 <MathInline tex="1/n" /> 掉，
      精度每要多一位，项数就得乘以 10（ε 从 0.1 收到 0.01，N 从 14 涨到 136）。
    </p>
    <RevealBox
      title="🔍 从 ε 反算 N：不逐项试，也能应答"
      label="对答案 / 看完整拆解"
    >
      <template #hint>
        接着上一个框的通项往下想：<MathInline tex="a_n" /> 的第 k 项，比 e 的第 k 项
        <MathInline tex="1/k!" /> 少了一个折扣因子
        <MathInline tex="(1-\tfrac1n)(1-\tfrac2n)\cdots(1-\tfrac{k-1}{n})" />。
        试着估一估"打掉的这部分"最多有多大——提示：一个不超过 1 的数再乘上
        <MathInline tex="(1-x)" />，最多只会再少 x。
      </template>
      <p>
        <strong>第一步：把两个和摆在一起对齐。</strong>上一个框末尾说过
        <MathInline tex="e = \sum_{k\ge 0} 1/k!" />，而同一个框第一步算出
      </p>
      <MathBlock tex="\Bigl(1+\frac1n\Bigr)^{n} = \sum_{k=0}^{n} \frac{1}{k!}\underbrace{\Bigl(1-\frac1n\Bigr)\cdots\Bigl(1-\frac{k-1}{n}\Bigr)}_{\text{折扣因子}}" />
      <p>
        逐项对照，<MathInline tex="a_n" /> 比 e 少的东西只有两笔：
        <strong>①</strong> 第 k ≤ n 的那些项都被折扣因子打了折；
        <strong>②</strong> 第 k > n 的项 <MathInline tex="a_n" /> 干脆没有。
        分头估这两笔就行。
      </p>
      <p>
        <strong>第二步：第一笔——每项最多打多少折。</strong>折扣因子是一串
        <MathInline tex="(1-\tfrac{j}{n})" /> 连乘。每乘一个，因为前面乘出来的数不超过 1，
        所以最多再少 <MathInline tex="j/n" />（人话：<MathInline tex="P \le 1" /> 时
        <MathInline tex="P(1-x) = P - Px \ge P - x" />）。把 j 从 1 加到 k−1：
      </p>
      <MathBlock tex="1 - \Bigl(1-\frac1n\Bigr)\cdots\Bigl(1-\frac{k-1}{n}\Bigr) \;\le\; \frac{1+2+\cdots+(k-1)}{n} = \frac{k(k-1)}{2n}" />
      <p>
        所以第 k 项少掉的量不超过 <MathInline tex="\frac{1}{k!}\cdot\frac{k(k-1)}{2n}" />。
        这里有个漂亮的约分：<MathInline tex="\frac{k(k-1)}{k!} = \frac{1}{(k-2)!}" />
        （分子的 k 和 k−1 正好消掉阶乘最前面两个因子）。把 k 从 2 加到 n：
      </p>
      <MathBlock tex="\sum_{k=2}^{n} \frac{1}{k!}\cdot\frac{k(k-1)}{2n} = \frac{1}{2n}\sum_{k=2}^{n}\frac{1}{(k-2)!} \;\le\; \frac{1}{2n}\sum_{m=0}^{\infty}\frac{1}{m!} = \frac{e}{2n}" />
      <p>
        <strong>第三步：第二笔——缺掉的尾巴小到可以忽略。</strong>
        <MathInline tex="\sum_{k>n} 1/k!" /> 里每往后一项至少除以 n+2，所以它比
        <MathInline tex="2/(n+1)!" /> 还小：n = 10 时约 <MathInline tex="5\times 10^{-8}" />，
        和第二步那个 <MathInline tex="e/20 \approx 0.136" /> 完全不是一个量级。
      </p>
      <p>
        <strong>第四步：合起来。</strong>严格写是
        <MathInline tex="e - a_n < \frac{e}{2n} + \frac{2}{(n+1)!}" />；
        由于第二步的估计本身放粗了不少（放粗掉的余量比那条尾巴大得多），
        直接用 <MathInline tex="e - a_n < e/(2n)" /> 也成立——n 从 1 到十万逐个验过，无一例外
        （n = 27：真实误差 0.048688，上界 <MathInline tex="e/54 = 0.050339" />）。
      </p>
      <p>
        <strong>第五步：反解 N。</strong>要让误差小于 ε，只需让上界小于 ε：
      </p>
      <MathBlock tex="\frac{e}{2n} \le \varepsilon \iff n \ge \frac{e}{2\varepsilon} \quad\Longrightarrow\quad N = \left\lceil \frac{e}{2\varepsilon} \right\rceil" />
      <p>
        ε = 0.05 代进去是 <MathInline tex="e/0.1 = 27.18" />，向上取整得 N = 28，
        实测 <MathInline tex="|a_{28} - e| = 0.047" />，确实进带；
        ε = 0.01 得 N = 136，动画硬扫的答案是 135。
        动画上 ε 滑杆的全部 99 个档位都这么核对过：<strong>这个公式档档合格</strong>，
        其中 13 档正好就是最小的 N，另外 86 档只多报 1。
      </p>
    </RevealBox>
    <p>
      最后提一个坑，你要是自己写个程序把上面这张误差表打出来，多半会撞上：
      把 n 一路调大，误差<strong>不会</strong>老老实实照 <MathInline tex="e/(2n)" /> 继续往下掉，
      n 到几万时就开始乱跳、甚至变号。毛病不在数学，在计算机——
      <MathInline tex="1 + \tfrac1n" /> 这一步加法会把 <MathInline tex="1/n" /> 末尾的有效数字挤掉，
      再被 n 次方原样放大回来。这正是<router-link to="/numerical/float-error">数值分析第一讲</router-link>
      要讲的那件事：<strong>数学上等价的两个式子，交给浮点数算可以差出十万八千里</strong>。
    </p>

    <h3>e 的水有多深：这个数列还牵着四条线</h3>
    <p>
      复利这个数列看着朴素，往下挖每一层都还有东西。四件事顺带看清，也正好把这一讲的地基再夯一遍。
    </p>
    <p>
      <strong>一、"单调有界必收敛"不是逻辑上白给的，它是实数的一条性质。</strong>
      先注意一件事：上面每一个 <MathInline tex="a_n" /> 都是<strong>有理数</strong>——
      <MathInline tex="(1+\tfrac1n)^n" /> 是分数的整数次方，算出来还是分数，
      比如 <MathInline tex="a_3 = (4/3)^3 = 64/27" />。可它们挤向的那个 e，偏偏不是分数（下一条就证）。
    </p>
    <p>
      这意味着，前面那句"递增又有上界，所以极限存在"，靠的并不是纯逻辑，
      而是实数的一条性质：<strong>完备性</strong>。人话就是——<strong>数轴上没有洞</strong>，
      任何一群越挤越紧的数，它们挤向的那个位置<em>一定有个实数坐在那里</em>。
      这件事听着像废话，但它恰恰是有理数<strong>不</strong>具备的。
    </p>
    <p>
      反过来验一遍就明白了（这是这条性质的反例）：假设你只活在有理数的世界里，
      数轴上所有无理数的位置都是空的。那么 <MathInline tex="a_n" /> 照样单调、照样有界，
      <strong>却根本没有极限可言</strong>——它想去的那个位置在那个世界里是个洞。
      更眼熟的例子是 1, 1.4, 1.41, 1.414, 1.4142, …：每一项都是有理数，单调递增，
      上界 2 摆在那儿，可它想去的地方是 <MathInline tex="\sqrt2" />，
      而古希腊人早就证明了这个数不是分数。
    </p>
    <p>
      所以极限理论真正的地基有两块：ε-N 这套语言（本讲肆节），
      加上"实数把所有洞都填满了"这个构造。后者拖到 1872 年才由<strong>戴德金</strong>（用"分割"）
      和<strong>康托尔</strong>（用"基本列"）各自补上——比柯西写下 ε-N 晚了半个世纪。
      微积分的地基工程，是从上往下打的。
    </p>
    <p>
      <strong>二、同一个 e，两种写法，快慢差着几个数量级。</strong>
      上面那个上界证明里出现过 <MathInline tex="\sum 1/k!" />，它的和恰好也是 e。
      于是你手上有了 e 的两种表达式，而它们的收敛速度天差地别：
    </p>
    <MathBlock tex="a_{10} = 2.593742\ldots \qquad\text{vs}\qquad \sum_{k=0}^{10}\frac{1}{k!} = 2.718281801\ldots" />
    <p>
      同样取 10 项，前者连小数点后第一位都没对上，后者已经准到第 7 位有效数字
      （e = 2.718281828…）。原因在衰减速度：数列的误差按 <MathInline tex="1/n" /> 掉，
      级数的误差按 <MathInline tex="1/n!" /> 掉。要把 e 算准到小数点后 6 位，
      <strong>数列要摊到约 270 万项，级数只要 10 项</strong>。
      "同一个数、换个写法就快上百万倍"这件事，正是
      <router-link to="/numerical/float-error">数值分析</router-link>整门课的出发点——
      也说明<strong>历史上第一个被发现的表达式，往往不是最好用的那个</strong>。
    </p>
    <p>
      <strong>三、e 不是分数，而证明要走级数那条路。</strong>
      1737 年<strong>欧拉</strong>用连分数首次证明了 e 是无理数；后来<strong>傅里叶</strong>给出一个
      只用 <MathInline tex="\sum 1/k!" /> 的短证明，短到可以完整放进下面这个框。
      值得留意的是：这个证明<strong>用不上</strong> <MathInline tex="(1+\tfrac1n)^n" /> 这个形式——
      它的余项估不紧，几乎无从下手；而级数的余项能被
      <MathInline tex="1/(n\cdot n!)" /> 死死卡住，一卡就出矛盾。
      <strong>同一个数的两种写法，好用的场合也不一样。</strong>
    </p>
    <RevealBox
      title="🔍 傅里叶的反证法：e 不是分数"
      label="对答案 / 看完整拆解"
    >
      <template #hint>
        先想一步：假设 <MathInline tex="e = p/q" />，那么
        <MathInline tex="q!\cdot e" /> 是不是整数？再看
        <MathInline tex="q!" /> 乘进级数的前 q+1 项，每一项
        <MathInline tex="q!/k!\;(k \le q)" /> 是不是也都是整数？两边一减，剩下的那截被夹在哪两个数之间？
      </template>
      <p>
        <strong>第一步：把级数从第 n 项截断，估一估剩下的尾巴。</strong>记
        <MathInline tex="r_n = e - \sum_{k=0}^{n} 1/k!" />，把尾巴的每一项都放大——
        分母 <MathInline tex="(n+2), (n+3), \ldots" /> 统统换成更小的 <MathInline tex="(n+1)" />，
        尾巴就被一个等比级数罩住：
      </p>
      <MathBlock tex="r_n = \frac{1}{(n+1)!}\Bigl[1 + \frac{1}{n+2} + \cdots\Bigr] < \frac{1}{(n+1)!}\cdot\frac{1}{1-\frac{1}{n+1}} = \frac{1}{n\cdot n!}" />
      <p>
        并且 <MathInline tex="r_n > 0" />（尾巴每一项都是正的）。所以
        <MathInline tex="0 < r_n < 1/(n\cdot n!)" />——n = 5 时这个界是 0.001667，实际
        <MathInline tex="r_5 = 0.001615" />，卡得相当紧。
      </p>
      <p>
        <strong>第二步：反证。</strong>假设 e 是分数，写成
        <MathInline tex="e = p/q" />（p、q 是正整数）。因为 2 &lt; e &lt; 3，e 不可能是整数，所以
        <MathInline tex="q \ge 2" />。现在取 n = q，两边同乘 <MathInline tex="q!" />：
      </p>
      <MathBlock tex="q!\,e = \underbrace{q!\sum_{k=0}^{q}\frac{1}{k!}}_{\text{每一项都是整数}} + \;q!\,r_q" />
      <p>
        逐块看它们是不是整数：
      </p>
      <ul>
        <li>
          左边 <MathInline tex="q!\,e = q!\cdot p/q = (q-1)!\,p" />，<strong>是整数</strong>；
        </li>
        <li>
          右边第一块的每一项是 <MathInline tex="q!/k!" />，而 <MathInline tex="k \le q" />，
          所以它等于 <MathInline tex="(k+1)(k+2)\cdots q" />，<strong>也是整数</strong>；
        </li>
        <li>
          两个整数一减，<MathInline tex="q!\,r_q" /> <strong>只能是整数</strong>。
        </li>
      </ul>
      <p>
        <strong>第三步：撞墙。</strong>可是把第一步的界乘上 <MathInline tex="q!" />：
      </p>
      <MathBlock tex="0 \;<\; q!\,r_q \;<\; q!\cdot\frac{1}{q\cdot q!} = \frac{1}{q} \;\le\; \frac12" />
      <p>
        一个整数，被夹在 0 和 1/2 之间——<strong>没有这样的整数</strong>。矛盾。
        所以 e 写不成分数。整个证明的力气全花在第一步那个余项估计上，
        而那一步之所以做得到，是因为级数的分母是<strong>阶乘</strong>，掉得够快。
      </p>
    </RevealBox>
    <p>
      <strong>四、复利只是 e 的一个化身，它的真身在别处。</strong>
      同样的证法能推广：把 <MathInline tex="(1+\tfrac1n)^n" /> 换成
      <MathInline tex="(1+\tfrac{x}{n})^n" />，n 趋于无穷时收敛到 <MathInline tex="e^x" />。
      但 e 真正的身份，要到<router-link to="/calculus/derivative">第二讲</router-link>学了导数
      （"一个量变化得多快"）之后才看得清：<strong>在所有可能的底数里，
      只有 e 这一个，让指数函数的增长速度<em>恰好等于它自己当下的大小</em></strong>。
    </p>
    <p>
      而这句话，正是复利的原话。银行按本息总额算利息——你现在有多少，就按多少的比例往上长；
      结算越频繁，越接近"每时每刻都在按当下的量增长"。
      <strong>所以复利能凭空造出 e，根本不是巧合：它就是这条性质的日常版本。</strong>
      这也解释了为什么 e 会在放射性衰变、细菌繁殖、电容充放电里反复出现——
      凡是"变化率正比于当前量"的东西，背后都是同一个 e。
      至于 <MathInline tex="e^x" /> 为什么等于 <MathInline tex="\sum x^k/k!" />（本讲用过的那个级数在
      <MathInline tex="x=1" /> 的样子），要到<router-link to="/calculus/taylor">第五讲</router-link>才讲透。
    </p>

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

    <h3>空调什么时候算"到了 26 度"：工程师每天在用的 ε-N</h3>
    <p>
      <strong>画面。</strong>夏天进屋，室温 34 ℃，你把空调设成 26 ℃ 按下开关。
      温度开始往下掉：34、32.8、31.8……可越接近 26 掉得越慢。
      道理不难想：房间和冷风之间的温差就是驱动力，温差缩小了，降温的本事也跟着缩小。
      现在问一个空调厂家每天都要回答的问题——<strong>什么时候算"到了 26 度"？</strong>
    </p>
    <p>
      麻烦正在这里：按这个规律，温度<strong>永远到不了</strong> 26。
      每分钟只缩掉温差的一个固定比例，剩下的那一点，缩到天荒地老也不是零。
      可说明书上要印制冷时间，检测机构要判合格不合格，"到了"这两个字必须有个说法。
      这和芝诺那道题是同一种为难：一个过程明明"越来越接近"，却没有哪一刻能说"到了"。
    </p>
    <p>
      <strong>为什么绕道极限。</strong>工程界的解法和柯西一模一样，像是照抄的：
      不问"到没到"，改问<strong>"离得有多近，以及从什么时候起一直那么近"</strong>。
      控制工程给这件事起了个名字，叫<strong>整定时间</strong>（settling time）：
      温度进入设定值上下一条窄带，<strong>并且从此不再出来</strong>，那一刻就叫"到了"。
      带子多窄是人定的，最常用的是初始温差的 ±2%。
      把这句话和肆节那个定义并排放着看：
      <MathInline tex="\varepsilon" /> 就是那条带的半宽，<MathInline tex="N" /> 就是那一刻，
      "从此不再出来"就是那句"对一切 <MathInline tex="n > N" />"。一字不差。
    </p>
    <p>
      还有一件事正好对得上。数字温控器并非时时刻刻盯着温度，它每隔一小段时间采一次样。
      所以它眼里的室温本来就是一串数——<MathInline tex="T_1,\ T_2,\ T_3,\ \ldots" />，
      一个如假包换的数列。本讲这套 ε-N 语言直接就能用在它身上，一个字都不用改。
      （下面按每分钟采一次样来算。）
    </p>
    <p>
      <strong>推导。</strong>把第 k 分钟的温差记作
      <MathInline tex="d_k = (\text{第 } k \text{ 分钟的室温}) - 26" />，开机那一刻
      <MathInline tex="d_0 = 34 - 26 = 8" /> ℃。"每分钟缩掉固定比例"这句话写成式子就是
      <MathInline tex="d_{k+1} = r\,d_k" />；取一台常见家用机的
      <MathInline tex="r = 0.85" />（每分钟温差还剩 85%）。一层层套下去：
    </p>
    <MathBlock tex="d_k = r\,d_{k-1} = r^2 d_{k-2} = \cdots = 8 \times 0.85^{\,k}" />
    <p>
      这就是一个等比数列，而且 <MathInline tex="d_k \to 0" />。
      2% 带的半宽是 <MathInline tex="\varepsilon = 0.02 \times 8 = 0.16" /> ℃，
      于是"进带"这个要求写出来是：
    </p>
    <MathBlock tex="8 \times 0.85^{\,k} < 0.16 \quad\Longleftrightarrow\quad 0.85^{\,k} < 0.02" />
    <p>
      k 蹲在指数的位置上，要把它解出来就得请对数出场——对数的看家本领正是
      <strong>把指数搬下来</strong>：<MathInline tex="\ln(a^k) = k\ln a" />。两边取对数：
    </p>
    <MathBlock tex="k \ln 0.85 < \ln 0.02" />
    <p>
      接下来有个坑：<MathInline tex="\ln 0.85" /> 是个<strong>负数</strong>（因为 0.85 小于 1），
      拿它去除两边，<strong>不等号要翻个向</strong>：
    </p>
    <MathBlock tex="k \gt \frac{\ln 0.02}{\ln 0.85} = \frac{-3.912}{-0.1625} = 24.07" />
    <p>
      分钟只能取整，所以 <strong>N = 25</strong>。核对一下刀刃两侧：第 24 分钟温差还有
      0.162 ℃，刚好还在带外；第 25 分钟是 0.138 ℃，进带了，而且此后再也没出来过。
      说明书上那个"制冷时间约 25 分钟"，就是这么算出来的。
    </p>
    <p>
      <strong>读出物理：把带子收紧一格，要多等多久。</strong>
      这是本讲那个"ε 与 N 的对局"在现实里的样子。把 ε 从 2% 收紧到 0.2%（精度提高 10 倍），
      同一条式子给 <MathInline tex="k > \ln 0.002 / \ln 0.85 = 38.24" />，即 N = 39——
      <strong>只多等 14 分钟</strong>。再提高 10 倍，还是多 14 分钟：因为多出来的那一截是
      <MathInline tex="\ln 10 / (-\ln 0.85) = 14.2" />，一个和 ε 无关的常数。
      <strong>精度每提高 10 倍，时间只是加上一个固定数。</strong>
    </p>
    <p>
      拿它对照本讲那个复利数列，差别就刺眼了：那里误差按
      <MathInline tex="e/(2n)" /> 掉，ε 从 0.1 收到 0.01，N 从 14 涨到 136——是<strong>乘以 10</strong>。
      同样叫"越来越接近"，一个是加法，一个是乘法。
      这正是工程上最怕撞见 <MathInline tex="1/n" /> 这类慢收敛的原因：
      多要一位精度，等待不是多一截，是翻十倍。
      （机器越弱、屋子越大，r 越贴近 1，等得越久：<MathInline tex="r = 0.95" /> 时，
      同一条 2% 带要等 77 分钟。）
    </p>
    <p>
      <strong>条件不成立会怎样：温度并不总是一路往下掉。</strong>
      上面那条曲线单调下降，于是"第一次进带"和"从此不再出来"恰好是同一分钟——
      这个巧合把定义里最要紧的那半句话遮住了。
      可真实的变频空调为了快，往往会<strong>冲过头</strong>：制冷太猛，一路掉到 25.5 ℃，
      再回升，来回荡几次才稳。把这种带超调的温差写成
      <MathInline tex="d_k = 8 \times 0.85^{\,k}\cos(0.6k)" />（正负号表示比 26 高还是低），
      逐分钟算一遍，故事就完全不一样了：
    </p>
    <p>
      第 13 分钟温差只有 0.052 ℃，<strong>第一次进带</strong>；可第 14 分钟就冲到 −0.427 ℃，出去了；
      第 18、19 分钟再进，第 20 分钟又出……一直到<strong>第 23 分钟</strong>才真正不再出来。
      整定时间取的是 23，不是 13——<strong>差了整整十分钟</strong>。
      （顺带一提，23 比刚才那台不超调的机器还快 2 分钟。超调换来的正是速度，
      这是控制工程里天天在做的取舍。）
    </p>
    <p>
      这也解释了叁节那个动画里一件很容易看漏的事。读数区那个 N，程序并不是"从头找第一个进带的项"，
      而是把 400 项<strong>全部</strong>扫一遍、记下<strong>最后一个</strong>越界的项，再加 1。
      在单调的数列上，两种算法给出同一个数，看不出区别；可一旦换成动画里的
      <strong>"振荡逼近"</strong>那一档（红点会一上一下地冒出来，挑战模式第 ③ 关的坑就在这里），
      两者立刻分家——正如上面那台变频空调。
      定义里"对一切 <MathInline tex="n > N" />"的那个<strong>一切</strong>，价钱就在这儿。
    </p>
    <p>
      最后交代一句这条模型的出处：温差按固定比例缩小，正是<strong>牛顿冷却定律</strong>
      的逐分钟版本——降温速度正比于温差。它的连续时间版本要用到微分方程，
      本课<router-link to="/calculus/ode">微分方程入门那一讲</router-link>会把它解出来；
      那一讲还拿同一条冷却定律做了另一件事——法医靠尸体的温度反推死亡时间，
      用的和你家空调是同一个式子。
    </p>
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
        答案还是本讲这套语言（<router-link to="/mathphys/heat">热传导讲</router-link>）；
        <strong>本课内部</strong>：<router-link to="/calculus/series">无穷级数那一讲</router-link>
        把"加无穷多项"直接定义成本讲的数列极限，而
        <router-link to="/calculus/rigor">严格化那一讲</router-link>会交代
        ε–δ 这套语言到底是被什么逼出来的——以及它换来的能力：
        看懂一条<strong>处处连续却处处没有切线</strong>的曲线。
        这些课全都在本站，而且都从零讲起——顺着首页的学习路径走过去，
        每到一处你都会重新撞见本讲这套 ε 语言。极限不是第一章的过路考点，
        它是后面所有数学的公共地基。
      </p>
    </div>
  </ConceptPage>
</template>
