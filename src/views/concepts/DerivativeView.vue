<script setup>
import ConceptPage from '../../components/ConceptPage.vue'
import MathBlock from '../../components/MathBlock.vue'
import MathInline from '../../components/MathInline.vue'
import RevealBox from '../../components/RevealBox.vue'
import QuizBox from '../../components/QuizBox.vue'
import SecantTangentDemo from '../../demos/SecantTangentDemo.vue'
</script>

<template>
  <ConceptPage slug="derivative">
    <h2><span class="sec-no">壹</span>困境："此刻的速度"是个病句</h2>
    <p>
      伽利略确认了自由落体的规律：下落距离 <MathInline tex="s = 5t^2" />（米，取
      <MathInline tex="g \approx 10\,\text{m/s}^2" />）。求一段时间里的<strong>平均速度</strong>人人都会：
      路程差除以时间差。但 17 世纪的物理学需要回答一个新问题——
      <strong>石头在 t = 1 秒这一个瞬间，速度是多少？</strong>
    </p>
    <p>
      按定义，速度 = 路程 ÷ 时间。可"一瞬间"里，路程是 0，时间也是 0，速度 = 0/0？！
      "瞬时速度"这个词，在当时的数学里根本不合法。同一时期还有另一个几何版本的难题：
      如何求曲线在某点的<strong>切线</strong>？（望远镜镜片的打磨、光线折射的计算都等着它。）
      两个问题殊途同归：都卡在"点"上——一个点定不出斜率，一个瞬间定不出速度。
    </p>
    <div class="story">
      <div class="story-title">📜 1665 年 · 瘟疫成就的奇迹年</div>
      <p>
        伦敦大瘟疫爆发，剑桥停课，23 岁的牛顿回乡下老家躲了 18 个月。就在这段"居家隔离"里，
        他发明了流数术（微积分）、发现了万有引力和光的色散。牛顿把变量看成流动的量（fluent），
        把变化率称为"流数"（fluxion），记作 <MathInline tex="\dot{x}" /> —— 物理学至今还在用这个点记号。
        几乎同时，莱布尼茨在德国独立发明了同样的方法，并留下了更好用的记号
        <MathInline tex="\mathrm{d}y/\mathrm{d}x" />。两人的追随者为"谁先发明"吵了上百年。
      </p>
    </div>

    <h2><span class="sec-no">贰</span>破局：不问"瞬间"，问"逼近的目标"</h2>
    <p>
      先把记号备好。<MathInline tex="s(t)" /> 读作"t 时刻的下落距离"——括号不是乘法，
      是"给我一个时刻，我还你一个距离"的取值动作；于是 <MathInline tex="s(1+h)" />
      就是"<MathInline tex="1+h" /> 时刻的下落距离"，h 是从 1 秒再往后数的一小段时间。
      两个时刻的<strong>平均速度</strong>就是路程差除以时间差：
      <MathInline tex="\frac{s(1+h) - s(1)}{h}" />。若把 s 随 t 的变化画成一条曲线，
      这个比值恰好是<strong>连接曲线上两点的那条直线的斜率</strong>——中学坐标系里
      "纵坐标差除以横坐标差"的老朋友。
    </p>
    <p>
      解决方案漂亮地绕开了 0/0：<strong>不直接算瞬时速度，而是用一串越来越短的时间段的平均速度去围剿它</strong>。
      算一下 [1, 1.1] 秒的平均速度、[1, 1.01] 的、[1, 1.001] 的……这串数会稳稳地停在 10 m/s 上：
    </p>
    <MathBlock tex="\begin{aligned} h = 1: &\ 15 \qquad & h = 0.1: &\ 10.5 \\ h = 0.01: &\ 10.05 \qquad & h = 0.001: &\ 10.005 \end{aligned}" />
    <p>
      而且这串数<strong>不是试出来的，是算出来的</strong>——把区间 <MathInline tex="[1,\,1+h]" />
      的平均速度化简一次，规律就全在脸上了。
    </p>
    <RevealBox
      title="🔍 把那串数真的算一次：平均速度恰好是 10 + 5h"
      label="对答案 / 看完整拆解"
    >
      <template #hint>
        先自己动笔：用 <MathInline tex="s(t) = 5t^2" /> 写出区间
        <MathInline tex="[1,\,1+h]" /> 上的平均速度 <MathInline tex="\frac{s(1+h)-s(1)}{h}" />，
        把分子展开、约掉 h。你会得到一个<strong>关于 h 的一次式</strong>——
        写出它，再想想为什么这一步里 h 绝不能等于 0。
      </template>
      <p><strong>第一步：照定义写出来，分子展开。</strong></p>
      <MathBlock tex="\frac{s(1+h) - s(1)}{h} = \frac{5(1+h)^2 - 5}{h} = \frac{5 + 10h + 5h^2 - 5}{h} = \frac{10h + 5h^2}{h}" />
      <p>
        <strong>第二步：约掉 h。</strong>这一步<strong>要求 <MathInline tex="h \neq 0" /></strong>——
        而这个要求完全合理，因为我们从头到尾谈的都是一段<em>有长度</em>的时间：
      </p>
      <MathBlock tex="\frac{10h + 5h^2}{h} = 10 + 5h \qquad (h \neq 0)" />
      <p>
        <strong>第三步：读这个式子。</strong>代 h = 0.1 得 10.5、h = 0.01 得 10.05、
        h = 0.001 得 10.005——上面那串数一个不差。更要紧的是，
        <strong>平均速度与 10 的差<em>正好</em>是 5h</strong>：
        你要误差小于 0.001，我就把 h 取到 0.0002 以下。这句话的形状，
        跟<router-link to="/calculus/limit">上一讲</router-link>那场"你出 ε、我答 δ"的攻防一模一样。
      </p>
      <p>
        <strong>第四步：换个时刻再算一遍。</strong>把 1 换成任意 <MathInline tex="t_0" />：
      </p>
      <MathBlock tex="\frac{5(t_0+h)^2 - 5t_0^2}{h} = \frac{10t_0h + 5h^2}{h} = 10\,t_0 + 5h \qquad (h \neq 0)" />
      <p>
        所以逼近的目标是 <MathInline tex="10\,t_0" />——这正是中学物理里
        <MathInline tex="v = gt" /> 那条公式，现在它是被推出来的，不是被背下来的。
      </p>
      <p>
        <strong>回味一下：整个过程里 <MathInline tex="h" /> 一次都没有等于 0</strong>，
        所以 0/0 从未发生。我们只是问了"h 缩小时这串数停在哪里"，
        而这个问句上一讲已经有了严格的写法。<strong>把这个"停在哪里"定义成瞬时速度</strong>，
        病句就治好了。
      </p>
    </RevealBox>
    <p>
      于是干脆<strong>把这个逼近的目标值定义为瞬时速度</strong>。几何上看是同一件事：
      连接曲线上两点的<strong>割线</strong>，当第二个点滑向第一个点时，
      割线转动着趋于一个极限位置——这个极限位置就是<strong>切线</strong>，它的斜率就是导数。
      "瞬时速度"和"切线斜率"原来是同一个数学对象。
    </p>
    <QuizBox
      quiz-id="derivative-q1"
      question="算瞬时速度时，为什么不干脆一开始就令 $h = 0$，而要绕一大圈「先算差商、再取极限」？"
      hint="回想上一讲贝克莱的责难：o 到底是不是零？"
      :options="[
        { t: '因为 h = 0 时差商是 0/0 没有意义；极限问的是 h 缩小途中差商停向哪里，全程 h ≠ 0', why: '对。整个流程里 h 一次都没等于零，0/0 从未发生；「瞬时速度」被定义为逼近的目标值，而不是某次代入的结果。这正是治好「此刻的速度」这个病句的方法。' },
        { t: '因为 h = 0 算不了，正确做法是代一个很小但非零的 h，比如 0.0001', why: '代任何非零 h 得到的都只是一段平均速度（本例是 10 + 5h），不是瞬时速度。瞬时速度是这串数的停靠点 10——它不由任何一次代入给出，而由极限给出。' },
        { t: '其实可以：先约分再代 h = 0，取极限只是走个形式', why: '「先约分」要求 h ≠ 0，「再代 h = 0」代的其实是极限值——这两步合起来恰恰就是取极限，不是绕开它。当年被贝克莱骂「消失量的幽灵」的，正是把这两步含糊过去的人。' },
      ]"
      :answer="0"
    />

    <h2><span class="sec-no">叁</span>亲手把割线压成切线</h2>
    <p>
      上面那条 <MathInline tex="10 + 5h" /> 值不值得信，自己拖一次最清楚。
      （折叠框里那四步是这一讲的地基，跳过了也能玩，但回头补上更划算。）
    </p>
    <SecantTangentDemo />

    <h2><span class="sec-no">肆</span>严格定义</h2>
    <div class="definition">
      <div class="def-title">📐 定义（导数）</div>
      <p>设 f 在 a 的邻域内有定义。若极限</p>
      <MathBlock tex="f'(a) = \lim_{h \to 0} \frac{f(a+h) - f(a)}{h}" />
      <p>
        存在，则称 f 在 a 处<strong>可导</strong>，该极限称为 f 在 a 处的<strong>导数</strong>。
      </p>
    </div>
    <p>
      定义里那个 <MathInline tex="\lim_{h \to 0}" /> 用的就是上一讲的函数极限，
      连"排除 h = 0 这一点"都是现成的（那里的条件正是 <MathInline tex="0 < |h| < \delta" />）。
      刚才那个例子代进来：差商是 <MathInline tex="10t_0 + 5h" />，与 <MathInline tex="10t_0" />
      的差是 <MathInline tex="5|h|" />，对手给 ε 我取 <MathInline tex="\delta = \varepsilon/5" /> 即可，
      所以 <MathInline tex="s'(t_0) = 10\,t_0" />。
    </p>
    <p>几个当年让人（现在让你）困惑的点，其实定义里都写清楚了：</p>
    <ul>
      <li>
        <strong>导数本身又是函数</strong>：每一点 a 都对应一个数 f′(a)，于是 f′ 是个新函数，
        还可以继续求导得 f″ —— 加速度就是位置的二阶导数；
      </li>
      <li>
        <strong>可导比连续更苛刻</strong>：<MathInline tex="|x|" /> 在 0 处连续，差商却是
        <MathInline tex="\frac{|0+h| - 0}{h} = \frac{|h|}{h}" />——
        h 从右边来（h &gt; 0）它恒等于 <strong>+1</strong>，h 从左边来（h &lt; 0）
        <MathInline tex="|h| = -h" /> 它恒等于 <strong>−1</strong>。
        两侧各自稳稳地停在不同的数上，<strong>没有共同的"逼近目标"</strong>，
        所以极限不存在、切线定不下来。尖点、竖直切线处都是这么不可导的。
      </li>
    </ul>
    <p>
      还有一个记号问题值得单独说，因为它是全微积分最容易被误解的一处：
      <MathInline tex="\mathrm{d}y/\mathrm{d}x" /> <strong>不是分数，却长得像分数</strong>——
      它是差商 <MathInline tex="\Delta y / \Delta x" /> 取极限后的<em>整体</em>记号，
      分子分母各自并不代表某个数。既然如此，为什么莱布尼茨偏要设计成这副样子？
    </p>
    <MathBlock tex="\frac{\mathrm{d}y}{\mathrm{d}x} = \frac{\mathrm{d}y}{\mathrm{d}u}\cdot\frac{\mathrm{d}u}{\mathrm{d}x}" />
    <p>
      这就是<strong>链式法则</strong>。盯着它看：右边两个"分数"相乘，中间的
      <MathInline tex="\mathrm{d}u" /> 像是被约掉了，于是法则本身<strong>不必记，看一眼就能写对</strong>。
      但请当心——<strong>这不是真的约分</strong>，因为 <MathInline tex="\mathrm{d}u" />
      在这里根本不是一个数；法则的证明要老老实实拆成两个差商相乘再取极限，
      记号只是把结论摆成了容易记住的形状。<strong>好记号是生产力，前提是知道它在替你记住什么。</strong>
    </p>
    <div class="insight">
      <div class="insight-title">💡 更现代的读法：导数 = 最佳线性近似</div>
      <p>
        把定义变形一下，导数会露出另一副面孔：<MathInline tex="f(a+h) \approx f(a) + f'(a)\,h" />。
        意思是<strong>在显微镜下，任何可导函数局部都是直线</strong>，f′(a) 就是那条直线的斜率。
        不过这个 <MathInline tex="\approx" /> 有多准，得说清楚才算数——下面这个折叠框把它化成等号。
      </p>
    </div>
    <RevealBox
      title="🔍 把那个约等号变成等号：误差到底小到什么程度"
      label="对答案 / 看完整拆解"
    >
      <template #hint>
        先自己动笔：把误差记作 <MathInline tex="r(h) = f(a+h) - f(a) - f'(a)h" />，
        然后计算 <MathInline tex="r(h)/h" /> 当 <MathInline tex="h \to 0" /> 时的极限。
        提示：整理一下你会发现它就是"差商减去导数"。一个极限，算完再点开。
      </template>
      <p>
        <strong>第一步：给误差起个名字。</strong>近似式两边一减，把差额单独拎出来：
      </p>
      <MathBlock tex="r(h) \;=\; f(a+h) - f(a) - f'(a)\,h" />
      <p>
        <strong>第二步：除以 h 看看它多大。</strong>
      </p>
      <MathBlock tex="\frac{r(h)}{h} = \frac{f(a+h)-f(a)}{h} - f'(a) \;\xrightarrow[\;h \to 0\;]{}\; f'(a) - f'(a) = 0" />
      <p>
        最后那一步用的正是导数的定义本身——<strong>可导这个假设，此处一次付清</strong>。
      </p>
      <p>
        <strong>第三步：读懂这个 0 的分量。</strong>它说的不只是"误差趋于零"（那太廉价了，
        h 趋于零时几乎什么都趋于零），而是<strong>误差除以 h 之后<em>还是</em>趋于零</strong>——
        误差比 h 本身小一个数量级。这种量记作 <MathInline tex="o(h)" />，读作"h 的高阶无穷小"，
        它是一句<em>缩写</em>，展开就是刚才那个极限等于 0。于是约等号可以升级成等号：
      </p>
      <MathBlock tex="f(a+h) = f(a) + f'(a)\,h + o(h)" />
      <p>
        <strong>第四步：微分是什么。</strong>右边的 <MathInline tex="f'(a)h" /> 这一项——
        近似式里<em>唯一</em>随 h 线性变化的部分——就叫 <strong>f 在 a 处的微分</strong>，记作
        <MathInline tex="\mathrm{d}y = f'(x)\,\mathrm{d}x" />（这里 <MathInline tex="\mathrm{d}x" />
        就是我们自己挑的那个增量 h）。所以 <MathInline tex="\mathrm{d}y" /> 不是什么"无穷小的一小段"，
        它是<strong>一个正大光明的线性函数</strong>：给它一个增量，它还你一个近似的高度变化。
        而 <MathInline tex="\mathrm{d}y/\mathrm{d}x" /> 之所以敢写成分数样，
        正是因为在这个层面上它确实是两个量的比。
      </p>
      <p>
        这个观点比"切线斜率"走得远得多：多元函数的全微分、
        <router-link to="/linear-algebra/linear-map">雅可比矩阵</router-link>，
        都是把这里的"乘以一个数"换成"乘以一个矩阵"——
        <strong>局部用线性函数冒充自己</strong>，一句话贯穿此后所有的微积分。
      </p>
    </RevealBox>
    <QuizBox
      quiz-id="derivative-q2"
      question="「f 在 a 处可导」保证了「局部像直线」。那么用切线预测 $f(a+h)$ 时，可导到底把预测误差 $r(h)$ 压到了什么程度？"
      hint="回想折叠框里那句「那太廉价了」——h 趋于零时几乎什么都趋于零。"
      :options="[
        { t: '误差除以 h 之后仍趋于 0——误差比 h 本身还小一个数量级', why: '对。这就是 o(h) 的含义，也是「可导」全部的含金量所在：不只误差消失，而且消失得比 h 更快，所以 h 减半时误差远不止减半。第五讲的泰勒展开会把这句话一路升级到「比 hⁿ 还小」。' },
        { t: '误差趋于 0 就是全部保证', why: '太廉价了：只要 f 连续，h → 0 时误差就趋于 0——连尖点处的 |x| 都做得到，可它在 0 处根本没有切线。可导多给的那一句是「误差 ÷ h 仍趋于 0」，这才把直线钉成唯一的最佳近似。' },
        { t: '误差恰好等于 0，切线就是函数本身', why: '那只有 f 本来就是直线才办得到。可导说的是「冒充得越来越像」，不是「就是」——误差 r(h) 一般非零，只是小到除以 h 都还趋于零。' },
      ]"
      :answer="0"
    />

    <h2><span class="sec-no">伍</span>买到了什么：只要有"变化率"，就有导数</h2>

    <h3>车速表量的其实不是瞬时速度</h3>
    <p>
      本讲从头到尾在算的"瞬时速度"，你的车里就有一个仪器天天在报——车速表。
      可有个少有人知的实情：<strong>车速表量不到瞬时速度，它量的恰恰是本讲开头那个差商</strong>。
      轮轴上装着一圈齿的转速传感器，每转过一个齿发一个脉冲；车载电脑数的是
      <strong>一小段固定时间窗 h 里进来了多少个脉冲</strong>，换算成这段时间的路程，再除以 h——
      这就是 <MathInline tex="\frac{s(t+h)-s(t)}{h}" />，如假包换的平均速度。
      "瞬时"是极限里的理想；仪器只能取一个小而有限的 h。
    </p>
    <p>
      那它差多少？拿匀加速当标尺算一遍就知道。设当前速度 <MathInline tex="v" />、加速度
      <MathInline tex="a" />，则窗口 <MathInline tex="[t,\ t+h]" /> 里的路程是
      <MathInline tex="vh + \tfrac{1}{2}ah^2" />（中学运动学），于是
    </p>
    <MathBlock tex="\text{表显速度} = \frac{vh + \tfrac{1}{2}ah^2}{h} = v + \frac{ah}{2}" />
    <p>
      误差恰好是 <MathInline tex="ah/2" />——跟贰节里那个 <MathInline tex="10+5h" />
      的尾巴 <MathInline tex="5h" /> 是同一张脸（那里 <MathInline tex="a=10" />，
      <MathInline tex="10h/2=5h" />，对得上）。代进日常数字：时间窗
      <MathInline tex="h = 0.1" /> 秒、一脚地板油加速度 <MathInline tex="a = 3\ \text{m/s}^2" />，
      误差只有 <MathInline tex="0.15\ \text{m/s} = 0.54\ \text{km/h}" />——
      不到表针一格的宽度。<strong>这就是"h 足够小时，平均速度就是瞬时速度的合格替身"</strong>：
      导数定义反过来用，就是全世界仪表的设计原理——它同时告诉你该做多准，以及做到多准就够了。
    </p>
    <p>
      <strong>条件不成立会怎样？</strong>急刹车轮胎抱死的那一瞬间，轮速曲线出现一个"尖点"——
      正如肆节里 <MathInline tex="|x|" /> 在 0 处那样，<strong>这一点上导数不存在</strong>，
      差商在两侧奔向完全不同的值。ABS 防抱死系统盯的就是这个信号：
      它以每秒上百次的频率监测各轮的差商（轮速变化率），一旦某个轮子的减速率
      异常地陡——远超车身可能的减速——就判定该轮即将抱死，立刻松一下刹车再夹紧。
      你脚下咔哒咔哒的那串震动，是一台差商计算器在一秒钟里打赢的几十场官司。
    </p>

    <h3>为什么偏偏是 e：一个自己是自己导数的函数</h3>
    <p>
      <router-link to="/calculus/limit">第一讲</router-link>末尾留了一句话没兑现：
      复利那个数 <MathInline tex="e \approx 2.71828" /> 的真身不在银行里，
      要学了导数才看得清。工具现在齐了，当场兑现。
    </p>
    <p>
      问题是：<strong>指数函数</strong> <MathInline tex="a^x" />（a 是任意正的底数，
      比如 <MathInline tex="2^x" />、<MathInline tex="3^x" />）的导数是什么？
      别急着查表，就拿肆节那个定义硬算。先写出分子：
    </p>
    <MathBlock tex="a^{x+h} - a^{x} = a^{x}a^{h} - a^{x} = a^{x}\bigl(a^{h}-1\bigr)" />
    <p>
      只用到中学的幂运算法则 <MathInline tex="a^{x+h} = a^x \cdot a^h" />（底数相同、指数相加），
      再把公因子 <MathInline tex="a^x" /> 提出来。除以 h，得到差商：
    </p>
    <MathBlock tex="\frac{f(x+h)-f(x)}{h} = a^{x}\cdot\frac{a^{h}-1}{h}" />
    <p>
      <strong>停在这里看一眼，最要紧的事已经发生了。</strong>右边裂成了两块：
      左边那块 <MathInline tex="a^x" /> 就是函数<em>自己</em>，
      右边那块 <MathInline tex="(a^h-1)/h" /> <strong>一个 x 都不含</strong>——
      它只跟底数 a 和窗口 h 有关。所以让 h → 0 的时候，只有右边那块在动，
      它收敛到一个<strong>只由底数 a 决定的常数</strong>，我们叫它 <MathInline tex="M(a)" />：
    </p>
    <MathBlock tex="(a^{x})' = M(a)\cdot a^{x}, \qquad M(a) = \lim_{h\to 0}\frac{a^{h}-1}{h}" />
    <p>
      <strong>注意我们还完全不知道 M(a) 等于多少，结论却已经到手了</strong>：
      不管底数取几，指数函数的导数<strong>都正比于它自己</strong>。
      这在整个函数世界里是很罕见的性质——<MathInline tex="x^2" /> 的导数是
      <MathInline tex="2x" />，换了个物种；而 <MathInline tex="a^x" /> 求导之后
      还是它自己，只是前面多了个系数。
    </p>
    <p>
      那 <MathInline tex="M(a)" /> 到底是多少？先认清它的身份：把 x = 0 代进上式，
      <MathInline tex="a^0 = 1" />，所以 <strong>M(a) 就是 <MathInline tex="a^x" /> 在 x = 0
      处的斜率</strong>——曲线穿过 (0, 1) 时有多陡。拿 h 取很小的数试算两个底：
    </p>
    <MathBlock tex="M(2) = 0.693147\ldots \qquad M(3) = 1.098612\ldots" />
    <p>
      一个小于 1，一个大于 1。而底数从 2 连续地涨到 3 时，这个斜率也连续地涨——
      <strong>那么中间必定有一个底数，恰好让 <MathInline tex="M(a) = 1" /></strong>。
      对这个底数来说，系数消失了，导数就是它自己。
    </p>
    <p>
      这个底数不用挨个试，能直接解出来。要让
      <MathInline tex="(a^h-1)/h \to 1" />，就是要 <MathInline tex="a^h \approx 1 + h" />；
      两边开 h 次方（也就是取 <MathInline tex="1/h" /> 次方）：
    </p>
    <MathBlock tex="a \approx (1+h)^{1/h} \quad\xrightarrow{\;h\,=\,1/n\;}\quad a = \Bigl(1+\frac1n\Bigr)^{n}" />
    <p>
      <strong>兜回来了——这正是第一讲那个复利数列。</strong>数字也对得上：
      h = 0.1 时 <MathInline tex="(1.1)^{10} = 2.593742" />，h = 0.01 时
      <MathInline tex="(1.01)^{100} = 2.704814" />，就是
      <router-link to="/calculus/limit">第一讲</router-link>里 <MathInline tex="a_{10}" /> 和
      <MathInline tex="a_{100}" /> 那两个数，一位不差。所以：
    </p>
    <div class="definition">
      <div class="def-title">📐 e 的真正定义</div>
      <p>
        e 是使 <MathInline tex="M(a) = 1" /> 的那个唯一底数。等价地说，
        <MathInline tex="y = e^x" /> 是<strong>唯一一个（相差常数倍以外的）自己等于自己导数</strong>的函数：
      </p>
      <MathBlock tex="\bigl(e^{x}\bigr)' = e^{x}" />
    </div>
    <p>
      于是复利那件事的因果关系反过来了：<strong>不是复利造出了 e，而是 e 的这条性质在复利里露了个头</strong>。
      银行按本息总额计息，说的就是"增长速度正比于当前拥有的量"；写成式子是
      <MathInline tex="y' = y" />——一个<router-link to="/mathphys/pde-intro">微分方程</router-link>
      （未知的不是一个数，而是一整个函数）。结算越频繁，越接近这个理想，
      而这个方程的解正是 <MathInline tex="e^x" />。同样的道理，凡是
      <strong>变化率正比于当前量</strong>的东西——放射性衰变、细菌繁殖、电容充放电、
      热咖啡凉下来——背后都是同一个 e。
    </p>
    <p>
      <strong>别的底数被淘汰了吗？</strong>没有，它们只是"时钟"快慢不同。
      <MathInline tex="2^x" /> 的导数是 <MathInline tex="0.6931\cdot 2^x" />，
      照样正比于自己，只是系数不是 1；而且
      <MathInline tex="2^x = e^{0.6931x}" />（代 x = 5 验一下：两边都是 32），
      所有指数函数都不过是 <MathInline tex="e^x" /> 换了个时间刻度。
      最后一句：那个系数 <MathInline tex="M(a)" /> 有个你多半见过的名字——
      <strong>自然对数 <MathInline tex="\ln a" /></strong>（<MathInline tex="M(2) = 0.693147" />
      正是 <MathInline tex="\ln 2" />）。"自然"二字就是从这儿来的：
      <strong>只有以 e 为底，求导时那个碍事的系数才会正好消失</strong>。
    </p>
    <QuizBox
      quiz-id="derivative-q3"
      question="上面算 $a^x$ 的导数时，还没求出 $M(a)$ 的值，就已经断定「指数函数的导数正比于它自己」。这个结论凭什么这么早就能下？"
      hint="回头看差商裂成的那两块，问自己：哪一块跟 x 有关，哪一块无关？"
      :options="[
        { t: '因为 $(a^h-1)/h$ 这一块完全不含 x，整块可以当成常数提到外面', why: '对：正是「与 x 无关」这一点，让极限值哪怕未知也不影响结论——它只是个待定的比例系数。' },
        { t: '因为指数函数的导数本来就等于它自己', why: '你把 e 的特权当成了所有底数的通性。$2^x$ 的导数是 $0.6931\\cdot 2^x$，并不等于它自己；「等于自己」只在 $a=e$ 时成立，而这恰恰是本节要找的那个特殊底数。' },
        { t: '因为 h→0 时 $a^h-1$ 趋于 0，所以那一块也趋于 0', why: '分子确实趋于 0，可分母 h 同时也趋于 0——这是 0/0 型，不能直接说商是 0。真算出来 $M(2)=0.693$，离 0 远着呢。' },
        { t: '因为指数函数增长得特别快', why: '「增长快」是对图象的形容，不是推导。快慢跟「导数是否正比于自身」没有关系——$x^{100}$ 涨得也很快，但它的导数是 $100x^{99}$，换了个物种。' },
      ]"
      :answer="0"
    />

    <p>除了车速表和 e 这两件事，"变化率"这把刀还有几处马上要用到的去处：</p>
    <ul>
      <li>
        <strong>物理</strong>：速度是位置对时间的导数，加速度是速度的导数，电流是电荷量的导数，
        功率是做功的导数——物理定律天然用导数写成。牛顿第二定律
        <MathInline tex="F = m\ddot{x}" /> 就是个<router-link to="/mathphys/pde-intro">微分方程</router-link>
        （站内数理方程课开篇就从它讲起）；
      </li>
      <li>
        <strong>求极值（费马 1629，比牛顿还早）</strong>（<router-link to="/calculus/extremum">专讲在这里</router-link>）：山顶处切线必水平，所以极值点满足
        <MathInline tex="f'(x) = 0" />。这句话不必靠图说服——设 a 是内部的极大值点，
        那么 <MathInline tex="f(a+h) \le f(a)" /> 对两侧都成立，于是差商
        <MathInline tex="\frac{f(a+h)-f(a)}{h}" /> 在 h &gt; 0 时分子非正、分母正，<strong>恒 ≤ 0</strong>；
        在 h &lt; 0 时分母也变号，<strong>恒 ≥ 0</strong>。可导意味着两侧奔向<em>同一个</em>数，
        一个 ≤ 0 一个 ≥ 0，那就只能是 0。今天所有优化问题——从利润最大化到机器学习的梯度下降——
        都从这一句出发；
      </li>
      <li>
        <strong>牛顿迭代法</strong>：解方程 f(x) = 0 时，在猜测点 <MathInline tex="x_n" />
        处用切线冒充曲线。切线方程就是上面那条最佳线性近似
        <MathInline tex="y = f(x_n) + f'(x_n)(x - x_n)" />，令 <MathInline tex="y = 0" />
        解出 x，就是下一个更好的猜测：
        <MathInline tex="x_{n+1} = x_n - f(x_n)/f'(x_n)" />。
        拿它算 <MathInline tex="\sqrt{2}" />（即解 <MathInline tex="x^2 - 2 = 0" />），
        从 1.5 出发只要三步就精确到小数点后 11 位——
        <router-link to="/numerical/root-finding">数值分析第二讲</router-link>专门算这笔账；
      </li>
      <li>
        <strong>经济学</strong>：边际成本、边际收益，就是成本函数、收益函数的导数——
        "边际"是"导数"的经济学方言。
      </li>
    </ul>
    <div class="insight">
      <div class="insight-title">🔗 这把刀往后通到哪：站内连一连</div>
      <p>
        <strong>下一讲</strong>：光有定义还算不动 <MathInline tex="\sin(x^2)" /> 这种套娃函数，
        <router-link to="/calculus/chain-rule">链式法则那一讲</router-link>把定义变成一套算法
        （上面那句"证明要老老实实拆成两个差商相乘"，在那里兑现）；
        紧接着<router-link to="/calculus/extremum">极值与中值定理</router-link>会把
        上面这条"山顶处切线必水平"补成完整证明，并回答"局部凭什么管得住全局"；
        <strong>极限</strong>：导数从头到尾就是一个极限，<router-link to="/calculus/limit">第一讲</router-link>
        那套 ε-δ 语言在这里第一次真正派上用场；
        <strong>积分</strong>：<router-link to="/calculus/integral">第三讲</router-link>会从完全相反的方向
        （细分求和）造出另一个概念，而<router-link to="/calculus/ftc">第四讲</router-link>会证明两者互逆；
        <strong>线性代数</strong>：把"乘以 f′(a)"换成"乘以一个矩阵"，导数就升级成
        <router-link to="/linear-algebra/linear-map">线性映射</router-link>——多元微积分的全部技术内容；
        <strong>数值分析</strong>：<router-link to="/numerical/root-finding">牛顿法</router-link>用切线找根，
        而差商本身又是<router-link to="/numerical/float-error">数值求导</router-link>的公式，
        那里会看到 h 取得太小反而更不准（舍入误差反扑）——
        <strong>本讲说"h 越小越好"，那是在实数里；到了浮点数里，这句话会被打脸</strong>；
        <strong>复变函数</strong>：把 h 换成复数，同一个定义会苛刻到令人吃惊，
        <router-link to="/complex/holomorphic">复可导</router-link>因此成了一张至尊会员卡。
      </p>
    </div>
  </ConceptPage>
</template>
