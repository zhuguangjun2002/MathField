<script setup>
import ConceptPage from '../../components/ConceptPage.vue'
import MathBlock from '../../components/MathBlock.vue'
import MathInline from '../../components/MathInline.vue'
import RevealBox from '../../components/RevealBox.vue'
import QuizBox from '../../components/QuizBox.vue'
import TaylorDemo from '../../demos/TaylorDemo.vue'
</script>

<template>
  <ConceptPage slug="taylor">
    <h2><span class="sec-no">壹</span>困境：sin 0.3 到底是怎么算出来的？</h2>
    <p>
      人类的双手（以及计算机的电路）只会四则运算。多项式只用加减乘，所以能直接算；可
      <MathInline tex="\sin x" />、<MathInline tex="e^x" />、<MathInline tex="\ln x" />
      这些"超越函数"呢？几百年来天文和航海离不开三角函数表与对数表——
      船开到大洋中央，纬度全靠查表算；表上一个数字印错，就可能是一船人的命。
      而造表人手里并没有 sin 键：表上几十万个数，每一个都得<strong>用人手、只靠四则运算</strong>算出来。
      这件事在 18 世纪末被推到了登峰造极的地步。
    </p>
    <div class="story">
      <div class="story-title">📜 1791 年 · 普罗尼的"人肉计算工厂"</div>
      <p>
        法国大革命后改行公制，工程师普罗尼奉命重造全套对数与三角函数表，规模空前
        （对数表要算到小数点后十四位、二十万个数）。他刚读过亚当·斯密论分工的章节，
        于是把"计算"本身流水线化，编成三层：顶层两三位数学家（勒让德在列）
        <strong>挑选公式</strong>；中层七八个人把公式换算成"每一格该加多少"的作业单；
        底层雇了六十到八十名计算员，<strong>每人每天只做加减法</strong>——
        其中不少是大革命后失业的理发师（贵族倒了，假发没人做了）。
        这座工厂能开工的数学前提只有一个：<strong>顶层挑出的公式必须是多项式</strong>——
        因为只有多项式（配上差分技巧）能拆成纯加减的流水作业。
        换句话说，普罗尼的整座工厂，就建立在"用多项式冒充超越函数"这一步之上。
        四十年后，巴贝奇正是看着这套流水线想到：既然已经拆成机械动作，何不干脆造台机器？——
        差分机、进而现代计算机的思想源头之一，就在这批理发师的账页里。
      </p>
    </div>
    <p>
      <strong>唯一的出路：找一个多项式来"冒充"目标函数</strong>——
      冒充得够像，算多项式就等于算函数。可"冒充"该怎么冒充？像到什么程度才敢印进表里？
      这两个问题，一个由泰勒回答，另一个要再等八十年。
    </p>

    <h2><span class="sec-no">贰</span>破局：一层一层地模仿导数</h2>
    <p>
      下面要反复用到<router-link to="/calculus/derivative">第二讲</router-link>的导数，
      先把台阶搭好：<MathInline tex="f'" /> 量的是斜率，<MathInline tex="f''" />
      是"斜率的变化率"（弯曲程度），每多求一次导，就多问一层"变化的变化"——
      记号 <MathInline tex="f^{(k)}" /> 表示"连求 k 次导"。
      怎样让多项式 P 在 x = 0 附近长得像 f？让它们的"各阶信息"逐层对齐：
    </p>
    <ul>
      <li><strong>0 阶</strong>：起点一样高，<MathInline tex="P(0) = f(0)" /> —— 水平线；</li>
      <li><strong>1 阶</strong>：起步方向一样，<MathInline tex="P'(0) = f'(0)" /> —— 这就是切线；</li>
      <li><strong>2 阶</strong>：弯曲程度一样，<MathInline tex="P''(0) = f''(0)" /> —— 抛物线开始"抱"住曲线；</li>
      <li><strong>逐层加码</strong>……模仿的导数阶数越多，贴合得越久。</li>
    </ul>
    <p>
      这几条要求听着含糊，其实<strong>足以把多项式的每一个系数唯一定死</strong>。
      设 <MathInline tex="P(x) = c_0 + c_1 x + c_2 x^2 + \cdots" />，
      把"逐层对齐导数"当方程解一遍，答案是
    </p>
    <MathBlock tex="c_k = \frac{f^{(k)}(0)}{k!}" />
    <p>
      （新记号 <MathInline tex="k!" /> 读作"k 的阶乘"，就是从 1 连乘到 k：
      <MathInline tex="5! = 1\times2\times3\times4\times5 = 120" />。它从哪冒出来的，下面的推导现场抓获。）
      <strong>系数不是猜的，是被那几条要求逼出来的</strong>。
      这是本讲唯一需要动笔的地方，而它只要三行。
    </p>
    <RevealBox
      title="🔍 三行解出全部系数：那个 k 的阶乘是从哪冒出来的"
      label="对答案 / 看完整拆解"
    >
      <template #hint>
        先自己动笔：把 <MathInline tex="P(x) = c_0 + c_1x + c_2x^2 + c_3x^3 + \cdots" />
        求一次导、代 x = 0，看看剩下谁；再求一次导、再代 0……
        做到第三次你就该看出规律了。<strong>三个系数</strong>，写完再点开。
      </template>
      <p>
        <strong>第一步：代 x = 0，只有常数项活下来。</strong>其余每一项都带着 x，代 0 全灭：
      </p>
      <MathBlock tex="P(0) = c_0 \quad\Longrightarrow\quad c_0 = f(0)" />
      <p><strong>第二步：先求一次导再代 0。</strong></p>
      <MathBlock tex="P'(x) = c_1 + 2c_2x + 3c_3x^2 + \cdots \quad\Longrightarrow\quad P'(0) = c_1" />
      <p>
        常数项被求导干掉了，而更高次的项<em>还带着 x</em>，代 0 又全灭——
        <strong>每求一次导代一次 0，就正好把一个系数单独"筛"出来。</strong>
      </p>
      <p><strong>第三步：再来两次，规律就出来了。</strong></p>
      <MathBlock tex="\begin{aligned} P''(x) &= 2c_2 + (3\cdot 2)c_3x + \cdots &&\Longrightarrow\quad P''(0) = 2c_2 \\ P'''(x) &= (3\cdot 2\cdot 1)c_3 + \cdots &&\Longrightarrow\quad P'''(0) = 6c_3 \end{aligned}" />
      <p>
        看那些冒出来的数：2、6……它们是<MathInline tex="x^k" />
        被连续求导 k 次时，指数一次次掉下来相乘的结果：
        <MathInline tex="k\cdot(k-1)\cdots 2\cdot 1 = k!" />。所以一般地
        <MathInline tex="P^{(k)}(0) = k!\,c_k" />，而我们要求它等于
        <MathInline tex="f^{(k)}(0)" />，于是
      </p>
      <MathBlock tex="c_k = \frac{f^{(k)}(0)}{k!}" />
      <p>
        <strong>那个阶乘不是修正因子，是求导自己掉出来的。</strong>
        顺手验一个：<MathInline tex="f = \sin x" /> 的各阶导数在 0 处依次是
        0, 1, 0, −1, 0, 1, …，代进去就得到
        <MathInline tex="\sin x = x - \frac{x^3}{3!} + \frac{x^5}{5!} - \cdots" />——
        偶数次项全为零，正是因为 sin 是奇函数。
      </p>
    </RevealBox>
    <p>
      这条系数公式就是布鲁克·泰勒 1715 年在《增量法》里发表的（笛卡尔坐标之后英国数学最重要的一书，
      当时却几乎无人喝彩）；1742 年麦克劳林把 <MathInline tex="x_0 = 0" />
      的特例用得太顺手，以致这个特例至今挂着他的名字。
      但要当心：<strong>泰勒给出公式时，对"冒充得有多像"一个字都没说</strong>——
      多项式无穷加下去等不等于原函数、切掉尾巴误差多大，他不知道，也没人问。
      壹节说的那"另一个问题"，就悬在这里。
    </p>

    <h2><span class="sec-no">叁</span>亲手加阶数</h2>
    <p>
      系数定死之后，"加一阶"到底买到了什么，拖一次最清楚。
      读数区第二行会把余项当场算成一个数——那正是下一节的主角。
    </p>
    <TaylorDemo />

    <h2><span class="sec-no">肆</span>严格定义</h2>
    <div class="definition">
      <div class="def-title">📐 泰勒公式（带拉格朗日余项）</div>
      <p>若 f 在含 x₀ 的区间上 n+1 阶可导，则</p>
      <MathBlock
        tex="f(x) = \sum_{k=0}^{n} \frac{f^{(k)}(x_0)}{k!}(x - x_0)^k + \underbrace{\frac{f^{(n+1)}(\xi)}{(n+1)!}(x - x_0)^{n+1}}_{\text{余项 } R_n}"
      />
      <p>
        其中 ξ 介于 x₀ 与 x 之间。x₀ = 0 的特例叫麦克劳林公式。
      </p>
    </div>
    <p>
      <strong>余项 Rₙ 才是定理的灵魂</strong>——它精确回答"冒充得有多像"。
      这一项等了八十二年：泰勒 1715 年给出公式，直到 1797 年拉格朗日才补上余项——
      <strong>没有余项的泰勒公式只是愿望</strong>，有了余项它才成为可以签字担保的合同
      （普罗尼工厂 1791 年开工时其实还没有这份担保，顶层数学家靠的是逐格差分对账这类土办法自查）。
      余项的样子值得端详一下：它<strong>长得跟"下一项"一模一样</strong>，
      只是把导数的取值点从 x₀ 换成了某个说不清在哪的 ξ（希腊字母，读"克西"——
      积分那讲用它当"代表点"，这里同样是"区间里某处"的意思）。这不是巧合，也不是凑出来的。
    </p>
    <RevealBox
      title="🔍 那个说不清在哪的 ξ 是从哪来的"
      label="对答案 / 看完整拆解"
    >
      <template #hint>
        先自己想：取 n = 0 试试。这时 <MathInline tex="P_0(x) = f(x_0)" />，
        公式变成 <MathInline tex="f(x) = f(x_0) + f'(\xi)(x-x_0)" />。
        <strong>这条定理在基本定理那讲"搭桥"的折叠框里刚出过场，它叫什么？</strong>
        想起来了，再点开看它怎么被推到高阶。
      </template>
      <p>
        <strong>第一步：n = 0 就是老朋友。</strong>把 n 取 0，公式退化成
      </p>
      <MathBlock tex="f(x) - f(x_0) = f'(\xi)\,(x - x_0)" />
      <p>
        这正是<strong>拉格朗日中值定理</strong>——"两点间的平均变化率，总被中间某一点的瞬时变化率取到"。
        那个神秘的 ξ 从来就不是泰勒公式的发明，<strong>它是中值定理自带的</strong>。
        所以泰勒的余项，本质是<strong>中值定理的高阶版本</strong>。
      </p>
      <p>
        <strong>第二步：余项在 x₀ 处"平"到什么程度。</strong>记
        <MathInline tex="R_n = f - P_n" />。多项式 <MathInline tex="P_n" /> 是照着对齐
        f 的前 n 阶导数造出来的，所以
      </p>
      <MathBlock tex="R_n(x_0) = R_n'(x_0) = \cdots = R_n^{(n)}(x_0) = 0" />
      <p>
        也就是说余项在 <MathInline tex="x_0" /> 处<strong>被压平了 n+1 层</strong>。
        而 <MathInline tex="(x-x_0)^{n+1}" /> 恰好也是这样被压平 n+1 层的——
        这就提示了拿谁去比谁。
      </p>
      <p>
        <strong>第三步：反复用中值定理，把点一次次往里挪。</strong>
        对这两个"同样平"的量作比，每用一次柯西中值定理（中值定理的分式版），
        就把分子分母同时求一次导、把考察点从 x 往 <MathInline tex="x_0" /> 挪近一步。
        用满 n+1 次之后落在某个 ξ 上：
      </p>
      <MathBlock tex="\frac{R_n(x)}{(x-x_0)^{n+1}} = \frac{R_n^{(n+1)}(\xi)}{(n+1)!}" />
      <p>
        <strong>第四步：收口。</strong><MathInline tex="P_n" /> 只是个 n 次多项式，
        求 n+1 次导就成了 0，所以 <MathInline tex="R_n^{(n+1)} = f^{(n+1)}" />。代回去即得
      </p>
      <MathBlock tex="R_n(x) = \frac{f^{(n+1)}(\xi)}{(n+1)!}(x-x_0)^{n+1}" />
      <p>
        <strong>回味：余项之所以长得像"下一项"，是因为它本来就是被下一项的模子压出来的。</strong>
        代价是那个 ξ——中值定理只保证它存在，从不说它在哪。
        所以余项公式在实践中<strong>从不用来算准确值，只用来估上界</strong>：
        把 <MathInline tex="|f^{(n+1)}|" /> 在整段上的最大值填进去就行，ξ 在哪反而不重要了。
      </p>
    </RevealBox>
    <p>
      估上界怎么估，拿开篇那个 <MathInline tex="\sin 0.3" /> 当场走一遍最实在。
      sin 的各阶导数无非是 <MathInline tex="\pm\sin" />、<MathInline tex="\pm\cos" /> 轮流坐庄，
      <strong>模长永远不超过 1</strong>。把这个 1 填进余项公式，就得到
    </p>
    <MathBlock tex="|R_n(x)| = \left|\frac{f^{(n+1)}(\xi)}{(n+1)!}x^{\,n+1}\right| \le \frac{|x|^{\,n+1}}{(n+1)!}" />
    <p>
      分母的阶乘碾压分子的幂，所以阶数够高时误差要多小有多小。代 x = 0.3 数一数：取到
      <MathInline tex="x^7" /> 那项（一共 4 项）时上界已是 <MathInline tex="1.6\times10^{-9}" />；
      取到 <MathInline tex="x^{11}" />（<strong>一共 6 项</strong>）时上界降到
      <MathInline tex="1.1\times10^{-15}" />，实测算出来的值已经和标准库的 sin
      <strong>一位不差</strong>。这份"误差预算表"怎么变成你计算器里真实的流水线，伍节结案。
    </p>
    <p>
      但"冒充"并不总能得逞。先把词备好：项数无穷加下去的和叫<strong>级数</strong>
      （<router-link to="/calculus/limit">第一讲</router-link>0.999… 那桩公案里打过照面——
      它的值被<em>定义</em>为部分和的极限）。麻烦一：级数可能<strong>根本不收敛</strong>。
      动画里 <MathInline tex="\ln(1+x)" /> 在检验点 x = 2 处的溃败触目惊心：
      阶数越高余项越大，n = 15 时多项式给出 1424，而真值只有 1.0986。
      每个幂级数都有自己的<strong>收敛半径</strong>，出了圈，加再多项都是帮倒忙。
    </p>
    <p>
      麻烦二更阴险：<strong>级数收敛，也未必收敛到原函数</strong>。柯西 1823 年造出的反例是
      <MathInline tex="f(x) = e^{-1/x^2}" />（在 x = 0 处补定义 f(0) = 0）：
      这个函数在 0 附近平坦得出奇——趋近 0 时它比任何 <MathInline tex="x^n" /> 都更快地贴向零，
      结果<strong>各阶导数在 0 处全部等于 0</strong>。于是它的泰勒级数是
      <MathInline tex="0 + 0x + 0x^2 + \cdots" />，处处收敛、收敛得不能再好——
      却恒等于 0，<strong>除了原点外没有一个点等于 f</strong>。
      冒充者交出的各阶"体检报告"全是零，本人却不是零函数：
      泰勒展开只看得见 x₀ 处的各阶导数，而这份档案<strong>不足以锁定一个函数</strong>。
      余项才是唯一的裁判：这例子里 Rₙ 根本不随 n 变小，合同从未签成。
    </p>
    <QuizBox
      quiz-id="taylor-q1"
      question="余项公式里那个 ξ，是一个能解出来的数吗？用它估误差时该拿它怎么办？"
      hint="回想中值定理给的承诺是哪种承诺：「有这么一点」，还是「这一点在这儿」？"
      :options="[
        { t: '解不出来也不用解：中值定理只保证它存在；实用时拿导数在整段上的最大值顶替它', why: '对。ξ 的下落是「存在但不指名」，所以余项公式从不用来算准确值，只用来估上界——把 |f⁽ⁿ⁺¹⁾| 的最大值填进去，ξ 在哪就不重要了。刚才 sin 0.3 的误差预算（模长不超过 1）正是这么做的。' },
        { t: '能：把余项公式当方程，反解出 ξ 即可', why: '要解这个方程你得先知道 Rₙ 的准确值，而 Rₙ 的准确值恰恰等于「f 的真值减多项式」——真值要是知道，还展开干什么？循环了。ξ 生来就不是拿来解的。' },
        { t: 'ξ 就是区间中点，代中点算就行', why: '中值定理说的是「介于 x₀ 与 x 之间的某处」，从没说是中点——不同的函数、不同的 n，ξ 落点各不相同。把它当中点用，估出来的就不再是保证成立的上界，合同就不作数了。' },
      ]"
      :answer="0"
    />

    <h2><span class="sec-no">伍</span>买到了什么：现代分析的瑞士军刀</h2>

    <h3>按下 sin 键之后：计算器和 CPU 里真实发生的事</h3>
    <p>
      开篇的问题现在可以完整结案了。你按下 sin 键，芯片里没有查表的仙人，
      只有一条两百年前普罗尼就认得的流水线，如今浓缩成两步：
    </p>
    <p>
      <strong>第一步：区间归约。</strong>多项式只在展开中心附近冒充得像（余项里有
      <MathInline tex="|x|^{n+1}" /> 在，x 越大越吃亏），所以先用三角函数自己的周期性和对称性，
      把任意的 x 折回 <MathInline tex="[-\pi/4,\ \pi/4]" /> 这一小段——
      sin 差个整数倍周期不变、差半个周期变个号、和 cos 还能互换，折来折去总能落进这段。
      <strong>第二步：算一个写死的多项式。</strong>肆节的误差预算说了，在这么小的区间上
      6 项就能压到 float64 的精度底（实测与标准库一位不差）。
      所以 glibc 里那个千万人每天调用的 sin，核心就是<strong>十几个写死的系数</strong>——
      现代库还会用逼近论的办法（雷梅兹算法）把系数微调到"最大误差最小"，
      比泰勒系数再赚零点几位，但思想仍是本讲这句话：<strong>用多项式冒充</strong>。
    </p>
    <p>
      <strong>不做第一步会怎样？</strong>拿 x = 100 直接套麦克劳林级数试试：
      级数依然收敛（阶乘终究碾压幂），但<strong>中途项要冲到 10⁴² 量级</strong>（最大项在 n = 99 附近），
      而最终答案的绝对值不超过 1——要靠正负项把 42 个数量级精确抵消掉，
      可 float64 只有 16 位有效数字，账本早就糊了；再往后算，
      项本身都超出浮点上限溢出成无穷大，程序直接吐出 NaN。
      "数学上收敛"与"机器上能算"隔着一整门课——
      这类灾难性抵消正是<router-link to="/numerical/float-error">数值分析第一讲</router-link>的开场白。
    </p>
    <p>
      顺带一笔：早期的袖珍计算器（如 1972 年的 HP-35）走的是另一条路 CORDIC——
      不用乘法器，只靠移位和加减反复旋转一个向量，把角度"转"到目标上去。
      路线不同，纲领相同：<strong>把超越函数降格为四则运算</strong>。
      从普罗尼的六十个理发师到你手机里每秒几十亿次的 sin，
      两百年间换的只是工人，没换过图纸。
    </p>

    <p>这把军刀的其他几个刀刃：</p>
    <ul>
      <li>
        <strong>近似计算与物理建模</strong>：<MathInline tex="\sin x \approx x" />
        （<router-link to="/mathphys/wave">单摆与弦振动</router-link>由此变成线性方程，
        站内那一讲从物理零基础讲起）、
        <MathInline tex="(1+x)^\alpha \approx 1 + \alpha x" />（相对论低速展开回牛顿力学）——
        物理学里遍地都是"泰勒展开取前两项"，而<strong>取前两项合不合法，靠的正是余项估计</strong>；
      </li>
      <li>
        <strong>算极限</strong>：像 <MathInline tex="\lim_{x \to 0} \frac{\sin x - x}{x^3}" />
        这类题，洛必达要连求三次导，泰勒只要代一次。把
        <MathInline tex="\sin x = x - \frac{x^3}{6} + o(x^3)" /> 塞进分子，
        <MathInline tex="x" /> 与 <MathInline tex="-x" /> 当场对消：
        <MathBlock tex="\frac{\sin x - x}{x^3} = \frac{-\dfrac{x^3}{6} + o(x^3)}{x^3} = -\frac16 + \frac{o(x^3)}{x^3} \;\xrightarrow[\;x\to 0\;]{}\; -\frac16" />
        最后一步用的就是 <MathInline tex="o(x^3)" /> 的定义（除以
        <MathInline tex="x^3" /> 后趋于 0），<router-link to="/calculus/derivative">第二讲</router-link>
        已经把这个记号拆开过。<strong>"等价无穷小替换"背后的真相，就是这一步截断</strong>——
        也顺带说明了为什么替换不能乱用：分子上两个主项一旦对消，你就得展到更高阶才行；
      </li>
      <li>
        <strong>数值方法的根</strong>：欧拉法解微分方程是"展开保留一阶"，
        龙格–库塔是"凑出更高阶"；有限差分格式的精度阶数，全靠泰勒展开来分析。
        <router-link to="/numerical/float-error">数值分析第一讲</router-link>说的
        <strong>截断误差</strong>，定义就是本讲这个余项——
        而那一讲还会告诉你另一半故事：截断误差随步长变小而变小，
        舍入误差却随之变大，两者在某个步长处打成平手，那才是实际能达到的最好精度；
      </li>
      <li>
        <strong>最美的意外（通向复变函数）</strong>：把 <MathInline tex="e^x" /> 的级数里每个 x
        大胆换成虚数 <MathInline tex="i\theta" />，再把结果按"带不带 i"分成两堆，会撞出这个等式：
      </li>
    </ul>
    <MathBlock tex="e^{i\theta} = \cos\theta + i\sin\theta" />
    <p>
      指数函数与三角函数——一个来自复利、一个来自几何——竟是同一枚硬币的两面（欧拉 1748）。
      取 <MathInline tex="\theta = \pi" /> 就得到 <MathInline tex="e^{i\pi} + 1 = 0" />。
    </p>
    <RevealBox
      title="🧮 这一步到底怎么算出来的？（顺便回答：它算推导，还是算定义）"
      label="看逐项整理的全过程（含那个必须交代的漏洞）"
      close-label="收起这段推导"
    >
      <template #hint>
        先自己试三分钟：把 <MathInline tex="e^x" /> 的级数里每个 x 换成 <MathInline tex="i\theta" />，
        用 <MathInline tex="i^2 = -1" /> 逐项化简，再把带 i 的项和不带 i 的项分成两堆，
        看看这两堆各自像什么。
      </template>
      <p>
        <strong>① 先把三张底牌摆上桌</strong>——都是本讲那条
        <MathInline tex="c_k = f^{(k)}(0)/k!" /> 现算出来的，没有新东西：
      </p>
      <MathBlock tex="\begin{aligned} e^x &= 1 + x + \frac{x^2}{2!} + \frac{x^3}{3!} + \frac{x^4}{4!} + \frac{x^5}{5!} + \cdots \\ \cos x &= 1 \phantom{{}+ x} - \frac{x^2}{2!} \phantom{{}+ \frac{x^3}{3!}} + \frac{x^4}{4!} - \cdots \\ \sin x &= \phantom{1 + {}} x \phantom{{}+ \frac{x^2}{2!}} - \frac{x^3}{3!} \phantom{{}+ \frac{x^4}{4!}} + \frac{x^5}{5!} - \cdots \end{aligned}" />
      <p>
        这样竖着摆是为了看清一件事：<strong>cos 只占偶次项，sin 只占奇次项，
        两人加起来刚好铺满 <MathInline tex="e^x" /> 的所有项</strong>，一个不多一个不少。
        这个"分工"就是下面能对上号的全部原因。
      </p>
      <p>
        <strong>② i 的幂四步一循环</strong>——魔术的机械部分只有这一条：
      </p>
      <MathBlock tex="i^0 = 1, \quad i^1 = i, \quad i^2 = -1, \quad i^3 = -i, \quad i^4 = 1, \quad i^5 = i, \ \cdots" />
      <p>
        <strong>③ 代进去，逐项化简</strong>（θ 的幂次一动不动，变的只是前面的系数）：
      </p>
      <MathBlock tex="\begin{aligned} e^{i\theta} &= 1 + i\theta + \frac{(i\theta)^2}{2!} + \frac{(i\theta)^3}{3!} + \frac{(i\theta)^4}{4!} + \frac{(i\theta)^5}{5!} + \cdots \\ &= 1 + i\theta - \frac{\theta^2}{2!} - i\frac{\theta^3}{3!} + \frac{\theta^4}{4!} + i\frac{\theta^5}{5!} - \cdots \end{aligned}" />
      <p>
        系数被 <MathInline tex="1, i, -1, -i" /> 循环"染色"，于是<strong>偶次项一律不带 i、
        奇次项一律带 i</strong>——正好对上 ① 里的那个分工。
      </p>
      <p>
        <strong>④ 按有没有 i 分成两堆</strong>：
      </p>
      <MathBlock tex="e^{i\theta} = \underbrace{\left(1 - \frac{\theta^2}{2!} + \frac{\theta^4}{4!} - \cdots\right)}_{\cos\theta} + i\,\underbrace{\left(\theta - \frac{\theta^3}{3!} + \frac{\theta^5}{5!} - \cdots\right)}_{\sin\theta}" />
      <p>
        两堆抬头一看，正是 ① 里 cos 与 sin 的级数，<strong>连正负号都分毫不差</strong>：
        偶次项的系数按 <MathInline tex="i^0, i^2, i^4, \ldots = +, -, +, \ldots" /> 排列，
        这恰好是 cos 级数的符号规律；奇次项同理给出 sin。
        <strong>欧拉公式的全部内容，就是这一次分堆。</strong>
      </p>
      <p>
        <strong>⑤ 现在补那个漏洞：凭什么能把虚数代进一个为实数造的级数？</strong>
        严格说<strong>不能</strong>——在实分析里 <MathInline tex="e^{i\theta}" /> 根本还没有意义，
        "代入"等于给一个尚未定义的符号强行赋值。所以正规做法是<strong>把整件事倒过来</strong>：
        不去"推导"，而是直接把这条级数<strong>当作定义</strong>——
      </p>
      <MathBlock tex="e^{z} \;:=\; 1 + z + \frac{z^2}{2!} + \frac{z^3}{3!} + \cdots \qquad (z\ \text{为任意复数})" />
      <p>
        这个定义站得住脚：各项的模是 <MathInline tex="|z|^k/k!" />，加起来就是收敛的实级数
        <MathInline tex="e^{|z|}" />，所以它对每个复数都绝对收敛；而且逐项求导仍得自己、
        相乘仍满足 <MathInline tex="e^{z+w} = e^z e^w" />，
        是实指数函数<strong>唯一</strong>不别扭的推广（这就是复变里
        <router-link to="/complex/continuation">解析延续</router-link>的头一个例子）。
        定义这么一落，<strong>欧拉公式立刻降格为 ③④ 两步的算术结论</strong>，不再需要任何胆量。
        换句话说：欧拉当年"大胆代入"欠的账，是后人用定义替他补上的。
      </p>
      <p>
        <strong>⑥ 自查两下再走</strong>：取 <MathInline tex="\theta = 0" /> 得
        <MathInline tex="e^{0} = 1" />，对得上；算模长
        <MathInline tex="|e^{i\theta}|^2 = \cos^2\theta + \sin^2\theta = 1" />，
        说明 <MathInline tex="e^{i\theta}" /> 永远落在单位圆上——所以乘它"只转不伸缩"，
        与<router-link to="/complex/imaginary">复变函数 · 虚数的诞生</router-link>里
        "乘法即旋转"那句话严丝合缝。
      </p>
    </RevealBox>
    <p>
      最后回到那个悬着的问题：<strong>收敛半径为什么叫"半径"？</strong>
      明明在实轴上看，<MathInline tex="\ln(1+x)" /> 的地盘是个<em>区间</em>
      <MathInline tex="(-1, 1)" />，哪来的圆？
    </p>
    <p>
      线索是 <MathInline tex="x = -1" />：那里 <MathInline tex="\ln(1+x)" /> 掉到负无穷，
      函数<strong>彻底崩坏</strong>。这种让函数无法维持良好性质的点叫<strong>奇点</strong>
      （本讲不再深究，先当"函数在此处出事"的代称即可）。
      而级数的地盘边界，恰好就卡在离展开中心最近的那个奇点上：中心 0 到奇点 −1 的距离是 1，
      收敛半径就是 1。
    </p>
    <p>
      为什么是"半径"而不是"到左边那个点的距离"？因为<strong>一旦把 x 换成复数，
      定义域就从一条线变成一整个平面</strong>，"离中心不超过 1"画出来就是一个<strong>圆盘</strong>。
      实轴不过是这个圆盘被切出来的一条直径，我们一直以来看到的区间，是圆的影子。
      这句话在这里只能当结论收下，它的完整证明要等到
      <router-link to="/complex/cauchy-integral">复变函数的柯西积分定理</router-link>——
      那一讲会真的推出"收敛半径 = 到最近奇点的距离"这条不等式。
      <strong>复变函数——泰勒级数的老家——就在站内等你。</strong>
    </p>
    <QuizBox
      quiz-id="taylor-q2"
      question="一个函数无穷次可导，它的泰勒级数也处处收敛。这下总能放心写 $f(x) = $ 级数了吧？"
      hint="肆节那位「体检报告全是零」的冒充者还记得吗？"
      :options="[
        { t: '不能：柯西的 $e^{-1/x^2}$ 无穷可导、级数处处收敛，可级数恒为 0，除原点外处处不等于 f', why: '对。可导 + 收敛都不够，唯一的裁判是余项 Rₙ 是否趋于 0——那才是「级数等于函数」的定义本身。能通过这道关的函数叫「解析函数」，它们是复变函数课的主角。' },
        { t: '能——级数都收敛了，不等于 f 还能等于谁？', why: '收敛只保证「和存在」，没保证「和是 f」。泰勒级数只用到 f 在一个点的各阶导数，而柯西的反例表明：一份点上的档案可以被两个不同的函数共用（$e^{-1/x^2}$ 与零函数在 0 处档案完全相同）。' },
        { t: '只要再加上「f 连续」就能保证', why: '$e^{-1/x^2}$ 岂止连续，它无穷次可导、光滑得无可挑剔，照样冒充失败。缺的不是光滑度，是「余项趋于零」这条独立的检验——光滑是必要条件，远非充分。' },
      ]"
      :answer="0"
    />
    <div class="insight">
      <div class="insight-title">🔗 五讲的终点，也是下一段旅程的起点</div>
      <p>
        <router-link to="/calculus/limit">极限</router-link>给了我们安全使用无穷的语言；
        <router-link to="/calculus/derivative">导数</router-link>和
        <router-link to="/calculus/integral">积分</router-link>用它回答了"多陡"与"多大"；
        <router-link to="/calculus/ftc">基本定理</router-link>证明二者互逆；
        泰勒展开则把一切光滑函数化归为多项式。沿着这条路继续走：
        多元微积分（<router-link to="/linear-algebra/linear-map">线性代数</router-link>接管局部近似，
        导数升级成雅可比矩阵）、<router-link to="/mathphys/pde-intro">微分方程</router-link>
        （把导数之间的关系当方程解，数学物理方程的正门）、
        <router-link to="/complex/imaginary">复变函数</router-link>（幂级数的完全体，
        本讲那个欧拉公式就是它的门票）——欢迎随时回来，这个网站会继续陪你把它们一一讲清楚。
      </p>
    </div>
  </ConceptPage>
</template>
