<script setup>
import ConceptPage from '../../components/ConceptPage.vue'
import MathBlock from '../../components/MathBlock.vue'
import MathInline from '../../components/MathInline.vue'
import RevealBox from '../../components/RevealBox.vue'
import QuizBox from '../../components/QuizBox.vue'
import DensityDemo from '../../demos/DensityDemo.vue'
</script>

<template>
  <ConceptPage slug="distribution">
    <h2><span class="sec-no">壹</span>困境：结局数不清的时候，概率数什么</h2>
    <p>
      古典概率的家底是"数个数"：结局有限、机会均等，数一数就有答案。可这套办法出了赌场就处处碰壁——
      等一班公交的耗时、一发炮弹的落点、一个人的身高，可能的结果<strong>连成一片、无穷无尽</strong>，
      而且没有哪两个"等可能"。更要命的是一个当面耍流氓的悖论：
    </p>
    <div class="insight">
      <div class="insight-title">🤔 单点概率为零的僵局</div>
      <p>
        身高"恰好"等于 1.75000000…米（无穷多位全对上）的概率是多少？只能是 0——可每个人总归有个身高，
        <strong>无数个概率为零的事件，合起来却必然发生</strong>。"逐点给概率"这条路在连续世界里彻底堵死。
        （0 概率却可能发生，这味道像极了微积分里"无穷小"的幽灵——解决它的招数也将如出一辙。）
      </p>
    </div>
    <div class="story">
      <div class="story-title">📜 1900 年 · 希尔伯特的第六问题</div>
      <p>
        两百多年里概率论战果累累（棣莫弗、拉普拉斯的巨著都已问世），但"概率到底是什么"始终没有严格答案，
        各派吵成一团：是长期频率？是相信程度？伯特兰 1889 年还火上浇油——"在圆里随机画一条弦"，
        三种听起来都合理的算法给出三个不同答案（1/2、1/3、1/4）！希尔伯特在 1900 年著名的 23 个问题里，
        把"给概率论建立公理"列为第六问——<strong>一门学科被逼到要重新回答"我是谁"</strong>。
      </p>
    </div>

    <p>
      伯特兰那三个答案值得当场看一遍——<strong>因为"同一道题算出三个答案"听着像在胡说，
      而实际上三种算法每一步都无可指摘</strong>。看清它们的分歧点在哪儿，
      才知道公理化到底要修补什么：
    </p>
    <RevealBox
      title="🔍 伯特兰悖论：三种都挑不出毛病的算法，三个不同的答案"
      label="对答案 / 看完整拆解"
    >
      <template #hint>
        题目：在单位圆里"随机"画一条弦，它比圆内接正三角形的边
        （长度 <MathInline tex="\sqrt3" />）更长的概率是多少？
        先自己想一想——<strong>"随机画一条弦"这个动作，你会怎么实现？</strong>
        （能想出两种不同的实现方式，你就已经看到问题所在了。）
      </template>
      <p>
        <strong>算法一：随机取两个端点。</strong>弦由圆周上两点决定，
        那就在圆周上<strong>均匀</strong>地取两个点（"均匀"是"随机"最朴素的实现：
        不偏不倚，任何两段等长的弧被选中的机会相同）。由对称性可以先把第一个点钉在正三角形的一个顶点上，
        再看第二个点落在哪儿。弦长超过 <MathInline tex="\sqrt3" />，
        当且仅当第二点落在<strong>对面那段弧</strong>上——而那段弧正好是圆周的三分之一：
      </p>
      <MathBlock tex="P_1 = \frac{1}{3}" />
      <p>
        <strong>算法二：随机取半径上的一点当中点。</strong>先随机挑一条半径，
        再在这条半径上均匀地取一点，作过该点且垂直于半径的弦。
        中点距圆心 d 时弦长是 <MathInline tex="2\sqrt{1-d^2}" />，
        它超过 <MathInline tex="\sqrt3" /> 当且仅当 <MathInline tex="d < 1/2" />——
        而 d 在 <MathInline tex="[0,1]" /> 上均匀：
      </p>
      <MathBlock tex="P_2 = \frac{1}{2}" />
      <p>
        <strong>算法三：随机取圆内一点当中点。</strong>弦也由它的中点唯一决定
        （除了圆心），那就让中点在整个圆盘上均匀分布。
        还是 <MathInline tex="d < 1/2" /> 这个条件，但这次要比的是<strong>面积</strong>：
      </p>
      <MathBlock tex="P_3 = \frac{\pi (1/2)^2}{\pi \cdot 1^2} = \frac{1}{4}" />
      <p>
        三种算法各模拟两百万次，实测分别是
        <strong>0.3328 / 0.4993 / 0.2496</strong>——
        <strong>它们不是谁算错了，是三台机器造出来的弦本来就不是同一批弦。</strong>
      </p>
      <p>
        <strong>分歧点在哪儿？</strong>"均匀"这两个字被用了三次，
        每次的<strong>对象都不同</strong>：算法一让<strong>端点</strong>均匀，
        算法二让<strong>中点到圆心的距离</strong>均匀，
        算法三让<strong>中点的位置</strong>均匀。
        而这三种"均匀"互不等价——把中点在圆盘上均匀撒，
        它到圆心的距离就<strong>不</strong>均匀（外圈面积大，点更多）。
      </p>
      <p>
        <strong>所以这道题从一开始就没问清楚。</strong>
        "随机画一条弦"听着像个完整的问题，其实少了最要紧的一句：
        <strong>按什么分布随机</strong>。
        这正是本讲要立的规矩——概率不是事件本身的属性，
        而是你<strong>先指定了一个测度</strong>之后才有的东西。
        第肆节柯尔莫哥洛夫的公理干的就是这件事：
        <strong>先把"概率分布"摆到台面上当作前提，再谈计算</strong>。
        题目没说清用哪个分布，本来就不该有唯一答案——
        悖论不在数学里，在那句没说完的话里。
      </p>
    </RevealBox>
    <QuizBox
      quiz-id="distribution-q1"
      question="伯特兰的三个答案 1/2、1/3、1/4，到底哪个是对的？"
      hint="三种算法有谁算错了一步吗？"
      :options="[
        { t: '都对，也都不对——题目没说按哪种「随机」画弦，三个答案对应三台不同的造弦机器', why: '对。每种算法都无懈可击，分歧在「均匀」二字每次落在不同对象上（端点 / 中点距离 / 中点位置），而这三种均匀互不等价。教训被柯尔莫哥洛夫写进公理：先指定分布，再谈概率——概率不是事件自带的属性。' },
        { t: '1/2 对——第二种算法最对称、最自然', why: '「自然」救不了场：三种算法各有各的对称性，谁也不比谁更天然。两百万次模拟三台机器各自吻合各自的答案（0.4993 / 0.3328 / 0.2496）——它们造出的本来就不是同一批弦，没有裁判可请。' },
        { t: '肯定有一个对，只是数学家还没找出另外两个的错', why: '一百多年了，错永远找不出来，因为不存在：每一步推理都严格成立。毛病出在题面——「随机画一条弦」是句没说完的话。数学能做的不是选出正确答案，而是指出问题不完整，这正是公理化的动机。' },
      ]"
      :answer="0"
    />

    <h2><span class="sec-no">贰</span>破局：别问一点的概率，问一段的概率</h2>
    <p>解法分两步，每步都是观念的腾挪。</p>
    <p>
      <strong>第一步：把结局变成数。</strong>掷三枚硬币，你关心的往往不是"正反反"这个具体花色，
      而是"几个正面"这个<strong>数</strong>。于是引入<strong>随机变量</strong> X：
      一个把每个结局 ω 翻译成数字 X(ω) 的<strong>函数</strong>。别被名字骗了——它不是"变量"，是函数；
      不"随机"，随机的是输入。翻译成数之后，全部微积分武器库才对概率敞开。
    </p>
    <p>
      <strong>第二步：概率从"点"搬家到"段"。</strong>单点概率全是 0，但"身高落在 1.70 到 1.80 之间"
      的概率实实在在。所以别再逐点记账，改记<strong>累积账</strong>：
    </p>
    <MathBlock tex="F(x) = P(X \le x)" />
    <p>
      （大小写从此有分工：<strong>大写 X 是那台"翻译机"本身，小写 x 是数轴上一个具体刻度</strong>。
      <MathInline tex="F(x) = P(X \le x)" /> 读作"X 的取值不超过刻度 x 的概率"。）
      对每个 x 记"不超过 x 的概率"，一条曲线通吃一切：任何一段的概率都是两次查账之差
      <MathInline tex="P(a < X \le b) = F(b) - F(a)" />。而所谓"密度"，
      不过是这本账<strong>每单位长度的增速</strong>——F 的导数。是不是似曾相识？
      <strong>这正是<router-link to="/calculus/ftc">微积分基本定理</router-link>的剧情重演</strong>：
      面积函数是本体，被积函数是它的变化率。
      概率 = 密度曲线下的面积，<router-link to="/calculus/integral">第三讲积分</router-link>埋的伏笔在此兑现。
    </p>

    <QuizBox
      quiz-id="distribution-q2"
      question="「身高恰好 1.75000… 米」的概率是 0。这是否意味着这件事不可能发生？"
      hint="每个人总归有个身高——而每个具体身高的概率都是 0。"
      :options="[
        { t: '不是：连续世界里「概率为零」与「不可能」分了家——零概率事件天天在发生', why: '对。总得有个身高，而无论落在哪个值上，那个值的单点概率都是 0。这正是「逐点记账」破产的原因，也是账本改记「一段的概率」的原因。类比微积分：一个点的长度是 0，线段却有长度——概率从「数点」升级成了「量长度」。' },
        { t: '是：概率为零就是不会发生，这是概率的基本含义', why: '在有限的古典世界里两者确实重合，但连续世界把它们拆开了：0 只表示「在无穷多可能里占不到正份额」，不表示被排除。反过来「概率为 1」也不再是「必然」——术语里那些「几乎必然」的「几乎」，就是为这道裂缝准备的。' },
        { t: '题目本身有毛病：真实身高量不到无穷多位', why: '测量精度是物理限制，不是数学回应：数学模型里 X 就是可以取任何实数值。而且这个「毛病」躲不开——只要模型是连续的（等车时间、炮弹落点），单点概率为零就必然出现，必须正面处理而不是否认题目。' },
      ]"
      :answer="0"
    />

    <h2><span class="sec-no">叁</span>亲手把直方图磨成密度曲线</h2>
    <DensityDemo />

    <h2><span class="sec-no">肆</span>严格定义</h2>
    <div class="definition">
      <div class="def-title">📐 定义（分布函数与密度）</div>
      <p>
        随机变量 X 的<strong>分布函数</strong>为 <MathInline tex="F(x) = P(X \le x),\ x \in \mathbb{R}" />
        （<MathInline tex="x \in \mathbb{R}" /> 读"x 取遍全体实数"）。
        它单调不减、右连续，且 <MathInline tex="F(-\infty) = 0,\ F(+\infty) = 1" />
        （这是简写：x 拖向最左端时账本归零，拖向最右端时记满全部概率 1）。
        若存在非负函数 f 使
      </p>
      <MathBlock tex="F(x) = \int_{-\infty}^{x} f(t)\, dt" />
      <p>则称 X 为连续型，f 为其<strong>概率密度函数</strong>。</p>
    </div>
    <p>教科书这几行小字，每处都是有来头的：</p>
    <ul>
      <li>
        <strong>为什么用 ≤ 而不是 &lt;</strong>：为了让 F 把"恰好等于 x"的概率也收进账本，
        离散型的跳跃点才记在正确的一侧——这个选择顺带决定了 F 是<strong>右</strong>连续。
        对连续型两者无差别（单点为 0），对掷骰子这种跳跃账本就见分晓了；
      </li>
      <li>
        <strong>密度不是概率</strong>：f(x) 可以大于 1（把一段账压缩到很短的区间，增速自然超过 1），
        它是概率的"变化率"，量纲是每单位长度。只有<strong>面积</strong> f·dx 才是概率——
        动画里柱子的高度公式（频数÷总数÷组距）就是在凑这个量纲；
      </li>
      <li>
        <strong>柯尔莫哥洛夫的收官（1933）</strong>：他给出的公理干脆利落——概率就是一种<strong>测度</strong>
        （可以理解成"广义的面积"：给事件指定非负数，全空间记 1，互斥事件的账可以相加）。
        随后那串行话——"可数可加""哪些集合有资格当事件""随机变量必须可测"——
        <strong>在本课先记个脸就行</strong>，它们是数学系高年级实变函数课的正题，
        都是为无穷世界立的安全护栏，护栏内侧的日常计算完全不受影响。伯特兰悖论同时破案：
        三种答案对应三种不同的"随机"（三个不同的测度），题目没说清用哪个，本来就不该有唯一答案。
        频率派与信念派也得以停战：<strong>公理只管演算规则，不管概率"是"什么</strong>——像几何公理不回答"点是什么"。
      </li>
    </ul>

    <QuizBox
      quiz-id="distribution-q3"
      question="密度曲线在某处高达 f(x) = 3。一个概率怎么能是 3？"
      hint="f 的量纲是什么？概率藏在 f 的什么运算里？"
      :options="[
        { t: 'f(x) 本来就不是概率，是概率的「每单位长度增速」——只有面积 f·dx 才是概率', why: '对。把全部概率压进很短的区间，增速自然可以超过 1（比如 [0, 1/3] 上的均匀分布密度恒为 3）。约束是曲线下的总面积等于 1，不是曲线高度不超过 1。demo 里柱高公式「频数÷总数÷组距」凑的正是这个量纲。' },
        { t: '不能，密度超过 1 说明模型出错了', why: '完全合法：区间 [0, 1/3] 上的均匀分布，密度恒等于 3，总面积 3 × 1/3 = 1 分毫不差。把「密度 ≤ 1」当约束，是把 f 误认成概率的直接后果——这是连续分布最高频的误读。' },
        { t: '是印刷习惯：密度默认要除以最大值归一', why: '没有这种归一：密度的归一条件是「总面积为 1」，跟最大值无关。指数分布 λ 很大时密度起点就是 λ，可以任意高——高度换来的是宽度变窄，面积守恒。' },
      ]"
      :answer="0"
    />

    <h2><span class="sec-no">伍</span>买到了什么：概率与微积分正式合流</h2>

    <h3>把 F 正着读：体检报告上那条"参考范围"</h3>
    <p>
      <MathInline tex="F" /> 是"给定一个值，问它左边占多少"。
      把这个问题倒过来问——"给定一个比例，问它对应哪个值"——就是
      <MathInline tex="F^{-1}" />，叫<strong>分位数函数</strong>。
      一正一反两种读法，撑起了两件你每天都在接触的事，各占一节。
    </p>
    <p>
      <strong>一切"百分位"都是 <MathInline tex="F" />。</strong>
      儿科体检本上那几条生长曲线，说"孩子身高在第 75 百分位"，
      意思就是 <MathInline tex="F(\text{身高}) = 0.75" />——同龄孩子里有 75% 比他矮。
      成人体检报告上每项指标后面那个<strong>参考范围</strong>，
      则是把 <MathInline tex="F^{-1}" /> 用了两次：取 2.5% 和 97.5% 两个分位数，
      中间恰好圈住健康人群的 95%。
      （顺便跟一个著名常数打个照面：<strong>1.96</strong>——它就是第 5 讲那个"标准正态分布"的
      <MathInline tex="F^{-1}(0.975)" />。学过统计的人对它背得滚瓜烂熟，
      而用本讲的记号一写，它到底是什么一目了然。）
    </p>
    <div class="insight">
      <div class="insight-title">💡 这个"95%"有个直接后果：完全健康的人，也大概率会有一项"超标"</div>
      <p>
        参考范围既然只圈住 95% 的健康人，
        那么<strong>每一项指标，天生就有 5% 的健康人会落在范围外</strong>——
        他们没病，只是站在了分布的尾巴上。
        一份体检查的可不止一项。假设各项大致独立，
        至少有一项"飘红"的概率是：
      </p>
      <MathBlock tex="1 - 0.95^{\,n} \ : \quad \begin{array}{cccc} n = 5 & n = 10 & n = 20 & n = 40 \\ 22.6\% & 40.1\% & 64.2\% & 87.1\% \end{array}" />
      <p>
        <strong>查二十项，一个健康人有六成四的可能至少红一项。</strong>
        这不是仪器不准，也不是身体有事——
        <strong>它是"参考范围"这个定义自带的产物</strong>。
        这也解释了为什么医生看到孤零零一项轻微异常时往往不慌，
        而会看它是否<strong>和别的指标一起</strong>指向同一个方向：
        单项异常的<router-link to="/probability/bayes">似然比</router-link>太低，
        撬不动先验（<router-link to="/probability/bayes">上一讲</router-link>那台机器在这里直接开工）。
      </p>
      <p>
        <strong>条件不成立会怎样？</strong>"各项大致独立"是这笔账最软的一环——
        实际上血脂几项、肝功几项高度相关：一项偏高，同组的往往一起偏高。
        相关会让"至少一项飘红"的真实概率<strong>低于</strong>表中值
        （红是成团地红，而不是各自独立地抽签），所以那张表该读作上界。
        但方向不受影响：<strong>查的项数越多，纯属统计的假警报就越多</strong>——
        这也是"没事别做全身筛查"这条医学建议背后的算术。
      </p>
    </div>
    <h3>把 F 反着读：你游戏里抽到的每张卡，都出自同一个模具</h3>
    <p>
      <strong><MathInline tex="F^{-1}" /> 是造随机的模具。</strong>
      计算机其实只会做一件事：吐出 <MathInline tex="[0,1]" /> 上均匀分布的随机数。
      可模拟要用到的分布五花八门——等车时间、故障间隔、伤害数值、光子散射角。
      怎么把"均匀"变成"想要的样子"？答案短得惊人：
    </p>
    <MathBlock tex="X = F^{-1}(U), \qquad U \sim \text{均匀}[0,1]" />
    <p>
      （记号 <MathInline tex="\sim" /> 读"<strong>服从</strong>"：
      <MathInline tex="U \sim \text{均匀}[0,1]" /> 就是"U 按 [0,1] 上的均匀分布取值"。）
    </p>
    <p>
      这就得到一个分布函数恰好是 <MathInline tex="F" /> 的随机变量。
      为什么对？只有一行，见下面的框——而<strong>上面那个动画里的 4000 个样本，
      正是这么造出来的</strong>。
    </p>
    <RevealBox
      title="🔍 一行证明反函数法，再用两百万个样本验一遍"
      label="对答案 / 看完整拆解"
    >
      <template #hint>
        先自己动笔：要证 <MathInline tex="X = F^{-1}(U)" /> 的分布函数是 F，
        就是要算 <MathInline tex="P(X \le x)" />。
        把 <MathInline tex="X" /> 换成 <MathInline tex="F^{-1}(U)" />，
        再对不等式两边同时作用 <MathInline tex="F" />——
        <strong>F 是单调不减的，所以不等号方向不变</strong>。
        最后你会碰到一个形如 <MathInline tex="P(U \le \text{某个数})" /> 的东西，
        而均匀分布的这种概率是多少？
      </template>
      <p><strong>证明（真的只有一行）：</strong></p>
      <MathBlock tex="P(X \le x) = P\bigl(F^{-1}(U) \le x\bigr) = P\bigl(U \le F(x)\bigr) = F(x)" />
      <p>
        第二个等号用了 F 单调（两边同时作用 F，不等号不翻）；
        第三个等号用了均匀分布的定义——<MathInline tex="U" /> 落在
        <MathInline tex="[0, u]" /> 里的概率就是 <MathInline tex="u" /> 本身。
        <strong>结论：X 的分布函数正是 F，证毕。</strong>
        这条证明的漂亮之处在于它<strong>对任何 F 都成立</strong>，
        不管那个分布长什么样。
      </p>
      <p>
        <strong>现场用一次。</strong>指数分布 <MathInline tex="F(x) = 1 - e^{-\lambda x}" />，
        解出反函数：
      </p>
      <MathBlock tex="u = 1 - e^{-\lambda x} \ \Longrightarrow\ X = -\frac{\ln(1-U)}{\lambda}" />
      <p>
        取 <MathInline tex="\lambda = 1.5" />，按这个式子造两百万个样本，实测：
        样本均值 <strong>0.6668</strong>（理论 <MathInline tex="1/\lambda = 0.6667" />），
        <MathInline tex="P(X \le 1)" /> 实测 <strong>0.7768</strong>
        （理论 <MathInline tex="1 - e^{-1.5} = 0.7769" />）。
        上面动画那 4000 个"等公交耗时"样本用的就是这一行代码。
      </p>
      <p>
        <strong>它什么时候不好使——这才是这套方法真正的边界。</strong>
        整个办法卡在"能不能写出 <MathInline tex="F^{-1}" />"上。
        指数、均匀、柯西这些运气好，反函数有初等表达式；
        可<strong>最常用的正态分布偏偏没有</strong>——它的
        <MathInline tex="F" /> 本身就是个写不出初等原函数的积分
        （<router-link to="/calculus/ftc">微积分基本定理讲</router-link>说过，
        那正是"用积分定义新函数"的经典例子）。
        所以造正态随机数不能走这条路，得另想办法
        （比如一次造一对、借极坐标绕开求逆的 Box-Muller 变换），
        <strong>"如何生成正态随机数"因此成了一个独立的课题</strong>。
        另一个边界是离散分布：F 有平台段，严格意义上不可逆，
        要改用"广义逆"（取满足 <MathInline tex="F(x) \ge u" /> 的最小 x），
        实现出来就是"按累积概率查表"——抽卡游戏的掉落判定就是这么写的。
      </p>
    </RevealBox>
    <p>
      于是一条线串起来了：<strong>你在游戏里抽到的每一张卡、
      天气预报里跑的每一次集合模拟、金融风控里的每一条压力测试路径、
      三维渲染里每一束光的散射方向</strong>——
      背后都是同一个动作：<strong>掷一个均匀随机数，再把它喂进某个 <MathInline tex="F^{-1}" /></strong>。
      分布函数不只是理论道具，它是整个模拟世界的模具。
    </p>

    <h3>还买到了什么</h3>
    <ul>
      <li>
        <strong>一切计算变成积分</strong>：从此算概率就是算面积，
        算期望就是算加权积分（<router-link to="/probability/lln">下一讲</router-link>），
        微积分的全套技术——换元、分部、极限定理——整编进概率论。教科书里那些正态、指数、均匀分布表，
        本质是一张张"常用面积速查表"；
      </li>
      <li>
        <strong>换坐标时密度要跟着换算</strong>（后半句写给已读过站内线代课的读者）：
        随机变量做变换 <MathInline tex="Y = g(X)" /> 时
        密度要乘 <MathInline tex="|g'|" /> 的倒数——多维时乘的那个因子，
        正是<router-link to="/linear-algebra/determinant">线代第 2 讲</router-link>的
        "面积缩放因子"（雅可比行列式）在概率世界的分店。道理其实就是上面反函数法的一般版：
        <strong>换个坐标，概率这块"面积"总量不变，所以密度必须按拉伸倍数反向缩放</strong>；
      </li>
      <li>
        <strong>"依概率收敛"的语言备好了</strong>：有了分布函数，"一列随机变量趋向何方"才能严格表述——
        <router-link to="/probability/lln">下一讲大数定律</router-link>、
        <router-link to="/probability/clt">下下讲中心极限定理</router-link>，
        说的分别是两种不同强度的"随机收敛"。
      </li>
    </ul>
    <div class="insight">
      <div class="insight-title">🔗 合流之后通向哪：站内连一连</div>
      <p>
        <strong>微积分</strong>：F 与 f 的关系就是<router-link to="/calculus/ftc">微积分基本定理</router-link>；
        "单点概率为零但事件可发生"与"单点长度为零但线段有长度"是同一件事——
        测度论正是把"长度"概念公理化后的产物；而
        <router-link to="/calculus/integral">积分讲</router-link>那句"凡是累积，皆是积分"，
        在这里换了个名字叫分布函数；
        <strong>上一讲</strong>：条件概率要求分母 <MathInline tex="P(B) > 0" />，
        而连续世界里"恰好等于某值"的概率是 0——
        <router-link to="/probability/bayes">贝叶斯</router-link>那套东西要搬到连续情形，
        靠的正是本讲的密度（把"缩到 B 里再归一"换成"把密度限制到一条线上再归一"）；
        <strong>复变函数</strong>（学习路径后面的课，先埋个伏笔）：每个分布都有一张复数世界的"指纹"
        <MathInline tex="E[e^{itX}]" />（术语叫特征函数），它是证明
        <router-link to="/probability/clt">中心极限定理</router-link>的头号工具——
        两讲之后它会在幕后出场，而看懂它的全部家当，要等你读到
        <router-link to="/complex/imaginary">复变课</router-link>。
      </p>
    </div>
  </ConceptPage>
</template>
