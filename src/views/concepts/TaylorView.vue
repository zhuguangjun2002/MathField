<script setup>
import ConceptPage from '../../components/ConceptPage.vue'
import MathBlock from '../../components/MathBlock.vue'
import MathInline from '../../components/MathInline.vue'
import RevealBox from '../../components/RevealBox.vue'
import TaylorDemo from '../../demos/TaylorDemo.vue'
</script>

<template>
  <ConceptPage slug="taylor">
    <h2><span class="sec-no">壹</span>困境：sin 0.3 到底是怎么算出来的？</h2>
    <p>
      人类的双手（以及计算机的电路）只会四则运算。多项式只用加减乘，所以能直接算；可
      <MathInline tex="\sin x" />、<MathInline tex="e^x" />、<MathInline tex="\ln x" />
      这些"超越函数"呢？几百年来天文和航海离不开三角函数表与对数表，
      而造表人手里并没有 sin 键。<strong>唯一的出路：找一个多项式来"冒充"目标函数</strong>——
      冒充得够像，算多项式就等于算函数。
    </p>

    <h2><span class="sec-no">贰</span>破局：一层一层地模仿导数</h2>
    <p>怎样让多项式 P 在 x = 0 附近长得像 f？让它们的"各阶信息"逐层对齐：</p>
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
      但这个余项的样子值得端详一下：它<strong>长得跟"下一项"一模一样</strong>，
      只是把导数的取值点从 x₀ 换成了某个说不清在哪的 ξ。这不是巧合，也不是凑出来的。
    </p>
    <RevealBox
      title="🔍 那个说不清在哪的 ξ 是从哪来的"
      label="对答案 / 看完整拆解"
    >
      <template #hint>
        先自己想：取 n = 0 试试。这时 <MathInline tex="P_0(x) = f(x_0)" />，
        公式变成 <MathInline tex="f(x) = f(x_0) + f'(\xi)(x-x_0)" />。
        <strong>这条你在上一学期见过，它叫什么？</strong>想起来了，再点开看它怎么被推到高阶。
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
      <strong>一位不差</strong>。这就是计算器的实际算法：
      先用周期性把 x 折到 0 附近，再算六七项多项式，收工。
    </p>
    <p>
      但"冒充"并不总能得逞——动画里 <MathInline tex="\ln(1+x)" /> 在检验点 x = 2 处的溃败
      触目惊心：阶数越高余项越大，n = 15 时多项式给出 1424，而真值只有 1.0986。
      每个幂级数都有自己的<strong>收敛半径</strong>，出了圈，加再多项都是帮倒忙。
    </p>

    <h2><span class="sec-no">伍</span>买到了什么：现代分析的瑞士军刀</h2>
    <ul>
      <li>
        <strong>近似计算与物理建模</strong>：<MathInline tex="\sin x \approx x" />
        （<router-link to="/mathphys/wave">单摆与弦振动</router-link>由此变成线性方程，
        <b>本站那一讲从零讲起，不需要先修</b>）、
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
      <strong>你学过的复变函数，正是泰勒级数的老家。</strong>
    </p>
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
