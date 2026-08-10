<script setup>
import ConceptPage from '../../components/ConceptPage.vue'
import MathBlock from '../../components/MathBlock.vue'
import MathInline from '../../components/MathInline.vue'
import RevealBox from '../../components/RevealBox.vue'
import QuizBox from '../../components/QuizBox.vue'
import ArcLengthDemo from '../../demos/ArcLengthDemo.vue'
</script>

<template>
  <ConceptPage slug="arc-length">
    <h2><span class="sec-no">壹</span>困境：1615 年，开普勒觉得酒商在骗他</h2>
    <div class="story">
      <div class="story-title">📜 1613 年 · 一场婚礼上的量酒纠纷</div>
      <p>
        1613 年，天文学家<strong>开普勒</strong>在林茨再婚，为婚宴买了几桶葡萄酒。
        酒商的定价方式让他很不舒服：<strong>把一根标尺从桶身侧面的口斜插进去，
        一直捅到对面的桶底边缘，看杆子湿了多长</strong>，按这个长度算钱。
      </p>
      <p>
        开普勒是搞天文的，一眼看出问题：<strong>同样的斜插长度，桶可以又矮又胖，
        也可以又高又瘦，容积能差出一大截</strong>。他当场怀疑自己被宰了。
        于是这位刚算完行星轨道的人，转头写了一本
        《<em>酒桶新立体几何</em>》（1615），把九十多种旋转体的体积一一算了出来。
      </p>
      <p>
        <strong>结局出人意料</strong>：他算完发现，奥地利酒桶的惯常形状
        <em>恰好</em>落在"同样的斜插长度下容积最大"的那个比例附近——
        而在最大值附近，<strong>形状偏一点，容积几乎不变</strong>。
        换句话说，那个看着不靠谱的量法，<strong>恰恰是在最不敏感的地方量的</strong>。
        酒商没骗他，几百年的经验替他们找到了极值点。
        （<router-link to="/calculus/extremum">极值那一讲</router-link>说过"极值附近是平的"，
        这就是它在 1615 年的第一次实战。伍节会把这笔账算给你看。）
      </p>
    </div>
    <p>
      开普勒面对的困境，正是<router-link to="/calculus/integral">积分那一讲</router-link>之后
      立刻要面对的：<strong>我们只学会了算"曲线下的面积"，可现实要量的东西远不止面积</strong>。
    </p>
    <ul>
      <li><strong>体积</strong>：一个酒桶、一个灯泡、一颗炮弹装得下多少？</li>
      <li>
        <strong>长度</strong>：一条曲线有多长？——注意这个问题<strong>特别别扭</strong>，
        因为长度<em>不是</em>"下面的面积"，看不出该拿什么去积。
      </li>
      <li>
        <strong>弯曲程度</strong>：怎么用一个数说清"这里弯得厉害、那里几乎是直的"？
        高铁的弯道该怎么设计，取决于能不能量它。
      </li>
    </ul>
    <p>
      这一讲要说的是：<strong>这三样东西用的是同一把刀</strong>，
      而且这把刀你在积分那一讲已经拿到手了。
    </p>

    <h2><span class="sec-no">贰</span>破局：切碎、拿简单形状冒充、求和、取极限</h2>
    <div class="insight">
      <div class="insight-title">💡 积分不是"面积"，是"累积"</div>
      <p>
        积分那一讲的动作是：把区间切碎 → 每小段用<strong>矩形</strong>冒充 → 求和 → 取极限。
        换个东西要量，只需换掉中间那一步的"冒充物"：
      </p>
      <ul>
        <li>量<strong>面积</strong>：每小段用一个<strong>矩形</strong>冒充，面积 <MathInline tex="f(x)\,\Delta x" />；</li>
        <li>量<strong>长度</strong>：每小段用一条<strong>直线段（弦）</strong>冒充，长度 <MathInline tex="\sqrt{\Delta x^2+\Delta y^2}" />；</li>
        <li>量<strong>体积</strong>：每小片用一个<strong>圆盘</strong>冒充，体积 <MathInline tex="\pi f(x)^2\,\Delta x" />。</li>
      </ul>
      <p>
        <strong>"积分号"从来不是面积的专利</strong>——它只是"把无穷多个小量加起来"的记号。
        谁被加起来，由你放进去的那个冒充物决定。
      </p>
    </div>
    <h3>弧长：一条勾股定理，走到底</h3>
    <p>
      把曲线 <MathInline tex="y=f(x)" /> 在 <MathInline tex="[a,b]" /> 上切成 n 段，
      每段两端连一条弦。这一小段弦长由<strong>勾股定理</strong>给出——
      这是全节唯一用到的几何知识：
    </p>
    <MathBlock tex="\Delta s = \sqrt{\Delta x^2 + \Delta y^2} = \sqrt{1 + \Bigl(\frac{\Delta y}{\Delta x}\Bigr)^2}\;\Delta x" />
    <p>
      第二个等号只是把 <MathInline tex="\Delta x" /> 从根号里提出来
      （<MathInline tex="\Delta x>0" />）。而括号里那个
      <MathInline tex="\Delta y/\Delta x" /> 是<strong>差商</strong>——
      <router-link to="/calculus/derivative">第二讲</router-link>的老朋友，
      切碎到极限就是 <MathInline tex="f'(x)" />。全部加起来再取极限：
    </p>
    <MathBlock tex="L = \int_a^b \sqrt{1 + f'(x)^2}\;\mathrm{d}x" />
    <p>
      <strong>这个式子里那个碍事的根号，正是弧长难算的全部原因。</strong>
      圆是幸运的特例（<MathInline tex="f=\sqrt{1-x^2}" /> 时根号里恰好化得开，
      用<router-link to="/calculus/integration-methods">上一讲</router-link>的三角换元一步到位）；
      而椭圆 <MathInline tex="\frac{x^2}{4}+y^2=1" /> 代进去会得到
      <MathInline tex="\int\sqrt{1+\ldots}" /> 这种<strong>积不出来</strong>的形状——
      这就是"圆的周长有公式、椭圆的周长没有"的确切原因，
      也是"椭圆积分"这个名字的来历。
    </p>
    <h3>体积：切成薄片，每片当圆盘</h3>
    <p>
      把 <MathInline tex="y=f(x)" /> 绕 x 轴转一圈得到一个旋转体（酒桶、灯泡、炮弹都是）。
      在 x 处切一片薄的，这片近似是一个<strong>圆盘</strong>：半径 <MathInline tex="f(x)" />、
      厚 <MathInline tex="\Delta x" />，体积 <MathInline tex="\pi f(x)^2\Delta x" />。加起来：
    </p>
    <MathBlock tex="V = \int_a^b \pi\,f(x)^2\,\mathrm{d}x" />
    <p>
      拿它验一个人人都会背的公式：半球是 <MathInline tex="f=\sqrt{R^2-x^2}" /> 绕轴转，
    </p>
    <MathBlock tex="V_{\text{半球}} = \int_0^R \pi (R^2-x^2)\,\mathrm{d}x = \pi\Bigl[R^2x - \frac{x^3}{3}\Bigr]_0^R = \frac{2}{3}\pi R^3" />
    <p>
      于是整球 <MathInline tex="\frac{4}{3}\pi R^3" />。<strong>小学背的公式，第一次被推出来了</strong>，
      而且只用了一次"切片求和"。
      顺带说一句：阿基米德在公元前 3 世纪就得到了这个结果——用的是杠杆平衡法，
      而卡瓦列里在 1635 年给出了它的"不可分量"版本
      （<strong>两个立体若在每个高度上的截面积都相等，则体积相等</strong>），
      那正是这套切片法的前身。
    </p>
    <h3>曲率：用"最贴合的那个圆"来量弯</h3>
    <p>
      "弯得厉害"该怎么变成一个数？直觉的答案很妙：
      <strong>在这一点上放一个圆，让它尽可能贴合曲线；圆越小，说明弯得越厉害</strong>。
      这个圆叫<strong>密切圆</strong>，它的半径 R 叫曲率半径，而<strong>曲率</strong>定义为
      <MathInline tex="\kappa = 1/R" />。直线的密切圆是无穷大的，曲率为 0，正合直觉。
    </p>
    <p>用导数把它写出来（推导见折叠框）：</p>
    <MathBlock tex="\kappa = \frac{|f''(x)|}{\bigl(1+f'(x)^2\bigr)^{3/2}}" />
    <p>
      分子是二阶导数——<strong>"弯"本质上是斜率在变</strong>（<router-link to="/calculus/extremum">
      极值那一讲</router-link>说二阶导数管凹凸，这里给出它的定量版）。
      分母那一坨是在做一件容易被忽略的修正：<MathInline tex="f''" /> 量的是
      "<em>纵坐标</em>的弯"，而曲率要的是"<em>沿着曲线走</em>的弯"，
      曲线越陡，两者差得越多。
    </p>
    <p>
      验一下圆：<MathInline tex="f=\sqrt{R^2-x^2}" /> 在顶点 <MathInline tex="x=0" /> 处
      <MathInline tex="f'=0" />、<MathInline tex="f''=-1/R" />，于是
      <MathInline tex="\kappa = 1/R" />——<strong>半径为 R 的圆，曲率处处是 1/R</strong>，
      定义自洽。
    </p>
    <QuizBox
      quiz-id="arc-length-q1"
      question="弧长公式 $L=\int_a^b\sqrt{1+f'^2}\,\mathrm{d}x$ 里的根号是从哪来的？"
      hint="把一小段曲线放大看，它近似是一条斜线段。这条斜线段的长度怎么算？"
      :options="[
        { t: '勾股定理：每小段弦长 $\\sqrt{\\Delta x^2+\\Delta y^2}$，提出 $\\Delta x$ 就成了 $\\sqrt{1+(\\Delta y/\\Delta x)^2}\\,\\Delta x$', why: '对，整条公式只用了这一条中学几何。也正因为是根号，弧长积分才普遍积不出初等形式——圆是碰巧化得开的幸运儿，椭圆就不行。' },
        { t: '因为要保证长度是正的，所以加了根号', why: '取正号的办法多的是（比如取绝对值）。这里的根号有确切出处：它是斜边长度，来自勾股定理，不是为了修正符号硬加的。' },
        { t: '因为 $f^{\\prime}$ 可能是负的，平方之后再开方等于取绝对值', why: '这解释不了那个 $1+$。$\\sqrt{1+f^{\\prime 2}}$ 恒 ≥ 1，正说明「斜着走总比横着走长」——它是斜边比水平边长多少的倍数，跟符号无关。' },
      ]"
      :answer="0"
    />
    <RevealBox title="🔍 曲率公式是怎么冒出来的：让圆和曲线「贴合到二阶」" label="对答案 / 看完整拆解">
      <template #hint>
        先想清楚"贴合"该要求到什么程度：两条曲线在一点相交（<strong>零阶</strong>贴合）太弱；
        再要求切线相同（<strong>一阶</strong>）还是不够——所有半径的圆都能与曲线相切。
        那就<strong>再加一条：二阶导数也相同</strong>。
        试着写出圆的方程、算出它在顶点的二阶导数，再与 <MathInline tex="f''" /> 对上。
      </template>
      <p>
        <strong>第一步：先在最简单的位置算。</strong>把坐标系转到让考察点位于原点、
        且切线水平（<MathInline tex="f(0)=0,\ f'(0)=0" />）。
        半径 R、圆心在 <MathInline tex="(0,R)" /> 的圆，下半部分是
      </p>
      <MathBlock tex="y = R - \sqrt{R^2 - x^2}" />
      <p>
        <strong>第二步：算它的二阶导数。</strong>直接算或用
        <router-link to="/calculus/taylor">泰勒展开</router-link>都行，
        后者更快：<MathInline tex="\sqrt{R^2-x^2} = R\sqrt{1-x^2/R^2} \approx R - \frac{x^2}{2R}" />，
        所以 <MathInline tex="y \approx \frac{x^2}{2R}" />，于是
        <MathInline tex="y''(0) = 1/R" />。
      </p>
      <p>
        <strong>第三步：让它与曲线的二阶导数相等。</strong>要圆"贴合到二阶"，
        就要 <MathInline tex="1/R = |f''(0)|" />，即
        <MathInline tex="\kappa = |f''(0)|" />。
        <strong>在切线水平的位置上，曲率就是二阶导数的绝对值</strong>——干净利落。
      </p>
      <p>
        <strong>第四步：把坐标系转回去。</strong>一般位置上切线不水平，
        <MathInline tex="f''" /> 量的是"竖直方向的弯"，而我们要的是"垂直于曲线方向的弯"。
        设切线与 x 轴夹角 <MathInline tex="\theta" />，则
        <MathInline tex="\tan\theta = f'" />。真正的曲率定义是
        <strong>转角对弧长的变化率</strong>：
      </p>
      <MathBlock tex="\kappa = \Bigl|\frac{\mathrm{d}\theta}{\mathrm{d}s}\Bigr| = \Bigl|\frac{\mathrm{d}\theta/\mathrm{d}x}{\mathrm{d}s/\mathrm{d}x}\Bigr|" />
      <p>
        分子：对 <MathInline tex="\theta=\arctan f'" /> 求导（
        <router-link to="/calculus/chain-rule">链式法则</router-link>），得
        <MathInline tex="\frac{f''}{1+f'^2}" />；
        分母：正是本讲的弧长微元 <MathInline tex="\sqrt{1+f'^2}" />。相除即得
      </p>
      <MathBlock tex="\kappa = \frac{|f''|}{(1+f'^2)^{3/2}}" />
      <p>
        <strong>回味：那个 3/2 次方不是凑出来的</strong>——它是"1 次来自转角的修正、
        1/2 次来自弧长"两笔账的合并。而 <MathInline tex="\mathrm{d}\theta/\mathrm{d}s" />
        这个定义本身也值得记住：<strong>曲率 = 每走一米，方向转了多少弧度</strong>。
        高速上转方向盘的手感，量化之后就是它。
      </p>
    </RevealBox>

    <h2><span class="sec-no">叁</span>亲手拿折线量一条曲线</h2>
    <p>
      弧长的定义不是那个积分公式，而是<strong>"拿折线去量，段数越来越多"</strong>——
      公式只是这个过程的结果。下面的动画让你亲手拖段数，
      看折线怎么一步步爬向真值。
    </p>
    <p>
      读数区特意多给了一栏"<strong>差 × n²</strong>"：拖动 n 时它会稳定在一个常数，
      这说明误差不是随便变小，而是<strong>精确地按 <MathInline tex="1/n^2" /> 变小</strong>。
      说明里的"照着做一遍"给了整串数字，可以逐档核对。
    </p>
    <ArcLengthDemo />

    <h2><span class="sec-no">肆</span>严格定义：弧长其实是个上确界</h2>
    <div class="definition">
      <div class="def-title">📐 定义（曲线的弧长）</div>
      <p>
        设曲线 <MathInline tex="C" /> 由 <MathInline tex="y=f(x),\ x\in[a,b]" /> 给出。
        对 <MathInline tex="[a,b]" /> 的任一分割
        <MathInline tex="a=x_0<x_1<\cdots<x_n=b" />，作内接折线，其长度为
      </p>
      <MathBlock tex="\ell(\text{分割}) = \sum_{i=1}^{n}\sqrt{(x_i-x_{i-1})^2 + \bigl(f(x_i)-f(x_{i-1})\bigr)^2}" />
      <p>
        若所有这些折线长度的集合<strong>有上界</strong>，则称 C
        <strong>可求长</strong>，并定义弧长 <MathInline tex="L" /> 为这些长度的
        <strong>上确界</strong>（即最小的上界）。
      </p>
    </div>
    <p>逐词看这个定义，它比公式讲究得多：</p>
    <ul>
      <li>
        <strong>为什么是上确界而不是极限？</strong>因为内接折线<strong>永远比曲线短</strong>
        （两点之间直线最短），加密分割只会让它变长。
        一个只增不减、又有上界的量，取"最小的上界"最自然——
        这一步靠的还是<router-link to="/calculus/limit">第一讲</router-link>那条
        "实数没有洞"。动画里"差"那一栏始终为正，就是这句话的实测。
      </li>
      <li>
        <strong>为什么要先假设"有上界"？</strong>因为<strong>真有曲线长度是无穷的</strong>。
        它们连续、画得出来、圈住的面积有限，可周长要多长有多长——
        海岸线、雪花曲线、股价走势都是这一类。
        <strong>本课倒数第二讲会亲手把这样一条曲线放大给你看。</strong>
      </li>
      <li>
        <strong>公式是定理，不是定义。</strong>只有当 <MathInline tex="f'" /> 连续时，
        才能证明上确界等于 <MathInline tex="\int\sqrt{1+f'^2}" />——
        中间那一步用的正是<router-link to="/calculus/extremum">中值定理</router-link>：
        每一小段上 <MathInline tex="\Delta y = f'(\xi_i)\Delta x" />，
        代进勾股定理就凑出了黎曼和。
      </li>
    </ul>
    <div class="definition">
      <div class="def-title">📐 旋转体体积：圆盘法与壳层法</div>
      <p>
        <MathInline tex="y=f(x)" /> 绕 <strong>x 轴</strong>旋转，
        <MathInline tex="V = \int_a^b \pi f(x)^2\,\mathrm{d}x" />（切成<strong>圆盘</strong>）。
      </p>
      <p>
        同一块区域绕 <strong>y 轴</strong>旋转，则
        <MathInline tex="V = \int_a^b 2\pi x\,f(x)\,\mathrm{d}x" />（切成<strong>薄圆筒</strong>：
        周长 <MathInline tex="2\pi x" /> × 高 <MathInline tex="f(x)" /> × 厚
        <MathInline tex="\mathrm{d}x" />）。
      </p>
    </div>
    <p>
      两个公式的差别只在"<strong>切法</strong>"：一个横着切成饼，一个竖着卷成筒。
      <strong>选哪种切法，取决于哪种切法下每一片的形状最简单</strong>——
      这是所有积分应用题的通用心法，而不是两条要背的公式。
    </p>
    <QuizBox
      quiz-id="arc-length-q2"
      question="弧长的严格定义为什么要说「内接折线长度的上确界」，而不直接说「分段加密时折线长度的极限」？"
      hint="想想动画里「差」那一栏的符号——它有没有变过号？再想想有没有曲线让这个上界根本不存在。"
      :options="[
        { t: '因为折线长度只增不减且恒小于弧长，用上确界最贴切；而且有些曲线根本没有上界，这个定义能一并说清它们「不可求长」', why: '对。上确界的说法一举两得：既避免了「极限存在吗」这个额外负担（单调有上界自动收敛），又给「不可求长曲线」留了位置——海岸线、雪花曲线都属于这一类，倒数第二讲会亲手放大一条给你看。' },
        { t: '因为极限不存在，折线长度会来回震荡', why: '不会震荡：加密分割只会让折线变长（两点之间直线最短），是单调的。真正的问题是它可能一路涨到无穷，而不是震荡。' },
        { t: '两种说法完全等价，只是习惯用上确界', why: '对可求长的曲线确实等价，但对<b>不可求长</b>的曲线不等价：那时没有有限的上确界，「极限」说法只能说「等于无穷」，而定义要能干脆地判定「这条曲线不可求长」。' },
      ]"
      :answer="0"
    />

    <h2><span class="sec-no">伍</span>买到了什么：高铁的弯道不能是圆弧</h2>

    <h3>为什么曲率不能突变：一段你身体感受得到的数学</h3>
    <p>
      <strong>画面。</strong>你坐高铁，列车从直线段进入一个弯道。
      如果设计者偷懒，让<strong>直线直接接上圆弧</strong>，会发生什么？
      在接缝那一点之前，你受到的横向力是 <strong>0</strong>；
      跨过接缝的<em>一瞬间</em>，横向加速度<strong>突然跳到</strong>
      <MathInline tex="v^2/R" />。
    </p>
    <p>
      <strong>为什么绕道曲率。</strong>横向加速度
      <MathInline tex="a = v^2/R = v^2\kappa" />——<strong>它正比于曲率</strong>。
      直线的曲率是 0，圆弧的曲率是 <MathInline tex="1/R" />，两者硬接，
      曲率就是一个<strong>跳跃间断</strong>。而人体感觉到的不适，
      主要不是加速度本身，而是<strong>加速度的变化率</strong>（工程上叫
      <em>jerk</em>，中文常译"加加速度"）。曲率突变意味着 jerk 在那一瞬是<strong>无穷大</strong>。
    </p>
    <p>
      <strong>推导与数字。</strong>取一条高铁线：时速 350 km/h（<MathInline tex="v=97.22" /> m/s），
      弯道半径 <MathInline tex="R=7000" /> 米。圆弧段上的横向加速度是
    </p>
    <MathBlock tex="a = \frac{v^2}{R} = \frac{97.22^2}{7000} = 1.350\ \text{m/s}^2" />
    <p>
      如果直线直接接圆弧，这 1.350 要在<strong>零距离</strong>内建立起来。
      解决办法叫<strong>缓和曲线</strong>：在直线与圆弧之间插一段曲线，
      让<strong>曲率从 0 线性地涨到 <MathInline tex="1/R" /></strong>。
      能做到这件事的曲线有个名字——<strong>回旋线</strong>（也叫欧拉螺线），
      它的定义就是"<MathInline tex="\kappa" /> 正比于已走过的弧长 s"。
      取缓和段长 <MathInline tex="L=300" /> 米，列车通过它要
      <MathInline tex="t = 300/97.22 = 3.09" /> 秒，于是
    </p>
    <MathBlock tex="\text{jerk} = \frac{\Delta a}{\Delta t} = \frac{1.350}{3.09} = 0.438\ \text{m/s}^3" />
    <p>
      <strong>读出物理。</strong>各国铁路规范对未被超高抵消的 jerk 通常限制在
      0.3–0.6 m/s³ 量级，0.438 正落在里面——<strong>这就是缓和曲线长度是怎么被算出来的</strong>：
      不是拍脑袋定的 300 米，而是由"人能接受多大的 jerk"反解出来的。
      下次坐高铁过弯时留意一下：<strong>你会感到侧向力"缓缓地长出来"，
      而不是被猛推一下</strong>——那几秒钟里，列车正走在一条曲率线性增长的欧拉螺线上。
      （公路的高速匝道、过山车的入弯，用的是同一条曲线；早期过山车用圆形回环
      导致乘客颈部受伤，正是因为曲率突变，后来才改成"泪滴形"的回旋线回环。）
    </p>
    <p>
      <strong>条件不成立会怎样。</strong>上面把 jerk 当成了均匀的，
      前提是<strong>曲率<em>线性</em>增长且车速恒定</strong>。
      进站减速时车速在变，<MathInline tex="a=v^2\kappa" /> 的两个因子同时动，
      实际 jerk 要按乘积法则算（<router-link to="/calculus/chain-rule">链式法则那一讲</router-link>）；
      而列车有长度，车头在缓和段、车尾还在直线段，车厢会被"扭"一下——
      所以规范里还有一条"扭曲率"限制。<strong>模型越贴近现实，
      需要控制的导数阶数就越高</strong>：位置、速度、加速度、jerk，一路往上。
    </p>

    <h3>开普勒的酒桶：把那笔账算完</h3>
    <p>
      回到壹节。把酒桶理想化成<strong>圆柱</strong>：直径 D、高 H。
      酒商量的是那根斜插的杆长 <MathInline tex="s" />，
      它是"底面直径 + 高"构成的直角三角形的斜边：
      <MathInline tex="s^2 = H^2 + D^2" />。问：<strong>给定 s，什么形状的桶容积最大？</strong>
    </p>
    <MathBlock tex="V = \frac{\pi D^2 H}{4} = \frac{\pi (s^2-H^2)H}{4}, \qquad \frac{\mathrm{d}V}{\mathrm{d}H} = \frac{\pi (s^2-3H^2)}{4} = 0" />
    <p>
      解得 <MathInline tex="H = s/\sqrt{3}" />，此时
      <MathInline tex="D = s\sqrt{2/3}" />，也就是
      <MathInline tex="D/H = \sqrt{2} = 1.4142" />——<strong>最优的桶，直径是高的 1.414 倍</strong>。
      取 <MathInline tex="s=1" /> 米算具体的数：<MathInline tex="H=0.5774" />、
      <MathInline tex="D=0.8165" />、<MathInline tex="V=0.30230" /> 立方米。
    </p>
    <p>
      <strong>现在算开普勒真正发现的那件事。</strong>把高<strong>偏离最优 10%</strong>
      （H 拖到 0.6351，D 相应变化以保持 s 不变），容积变成 <b>0.29761</b>——
      <strong>只少了 1.55%</strong>；往另一边偏 10%（H = 0.5196），少 1.45%。
      <strong>杆长一样、形状差了一成，酒少了不到一成的六分之一。</strong>
      所以酒商那根杆子测出来的价格，误差小得可以接受——
      前提是桶的形状确实在最优附近，而奥地利桶匠们的手艺恰好如此。
    </p>
    <p>
      这当然又是<router-link to="/calculus/extremum">极值那一讲</router-link>那条道理
      （驻点处一阶项消失，代价从二阶起算）的实例，
      但它值得单独说一次：<strong>开普勒是历史上第一个明确写下"极大值附近函数变化极慢"
      这个观察的人</strong>，比费马的方法早，比牛顿莱布尼茨早半个世纪。
      他没有导数，靠的是逐个计算九十多种形状<em>列表比较</em>——
      <strong>而这本为了买酒写成的小书，被公认是积分学的先声之一。</strong>
    </p>
    <div class="insight">
      <div class="insight-title">🔗 这一讲往后通到哪：站内连一连</div>
      <p>
        <strong>悬链线</strong>：一条铁链自然下垂是什么形状？伽利略猜是抛物线，<strong>猜错了</strong>；
        1690 年雅各布·伯努利公开挑战，一年内惠更斯、莱布尼茨、约翰·伯努利各自解出
        <MathInline tex="y = a\cosh(x/a)" />（demo 里第四条就是它）。
        这类"从所有曲线里挑出一条"的问题要用<strong>变分法</strong>，是本课最后一讲的主题；
        圣路易斯的大拱门就是一条倒过来的悬链线——<strong>因为它只受压不受弯</strong>。
        <strong>泰勒展开</strong>：曲率折叠框里那步
        <MathInline tex="\sqrt{1-x^2/R^2}\approx 1-\frac{x^2}{2R^2}" /> 就是
        <router-link to="/calculus/taylor">泰勒展开</router-link>；
        <strong>数值分析</strong>：折线逼近的 <MathInline tex="1/n^2" /> 收敛，
        与<router-link to="/numerical/quadrature">复合梯形法</router-link>的阶是同一笔账；
        <strong>数理方程</strong>：弦振动方程推导里那句"小振幅时
        <MathInline tex="\sqrt{1+u_x^2}\approx 1" />"，
        丢掉的正是本讲的弧长微元——<router-link to="/mathphys/wave">波动方程那一讲</router-link>
        的线性化就发生在这一步；
        <strong>相对论</strong>（站外）：把 <MathInline tex="\sqrt{1+f'^2}" /> 换成带负号的版本，
        弧长就成了时空里的"固有时"，测地线取极值——同一把刀，换了个度量。
      </p>
    </div>
  </ConceptPage>
</template>
