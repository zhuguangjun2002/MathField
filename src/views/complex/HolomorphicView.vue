<script setup>
import ConceptPage from '../../components/ConceptPage.vue'
import MathBlock from '../../components/MathBlock.vue'
import MathInline from '../../components/MathInline.vue'
import RevealBox from '../../components/RevealBox.vue'
import QuizBox from '../../components/QuizBox.vue'
import ConformalDemo from '../../demos/ConformalDemo.vue'
import JoukowskiDemo from '../../demos/JoukowskiDemo.vue'
import MercatorDemo from '../../demos/MercatorDemo.vue'
import MercatorVarsDemo from '../../demos/MercatorVarsDemo.vue'
import PotentialFlowDemo from '../../demos/PotentialFlowDemo.vue'
</script>

<template>
  <ConceptPage slug="holomorphic">
    <h2><span class="sec-no">壹</span>困境：把导数定义搬到复数上，会发生什么</h2>
    <p>数系扩到复数之后，下一步顺理成章：把微积分也搬过去。导数定义照抄：</p>
    <MathBlock tex="f'(z_0) = \lim_{\Delta z \to 0} \frac{f(z_0 + \Delta z) - f(z_0)}{\Delta z}" />
    <p>
      看起来平淡无奇，但藏着一头猛兽。实数轴上，<MathInline tex="\Delta x \to 0" /> 只有左右两条路；
      复平面上，<MathInline tex="\Delta z \to 0" /> 可以<strong>从任何方向、沿任何路径</strong>逼近——
      上下左右、螺旋着来都行。定义要求极限存在，就是要求<strong>所有这些方向算出来的"变化率"全部相等</strong>。
    </p>
    <p>
      这是个苛刻得惊人的条件。看个体面的反例：<MathInline tex="f(z) = \bar{z}" />（共轭，把 a+bi 变 a−bi）。
      沿实轴方向逼近，差商是 1；沿虚轴方向逼近，差商是 −1。两个方向答案不同——
      这个再"光滑"不过的函数（不过是上下翻转平面），竟然<strong>处处不可导</strong>。
      实分析的直觉在这里集体失灵：复可导筛掉的函数，比想象中多得多。
    </p>
    <div class="story">
      <div class="story-title">📜 1821 — 1851 年 · 从"形式演算"到看清本质</div>
      <p>
        18 世纪的欧拉、达朗贝尔在流体力学里就撞见过那两条关键方程，但只当计算副产品。
        <strong>柯西</strong>在 1820 年代把复可导立为理论基石，系统展开；
        <strong>黎曼</strong> 1851 年的博士论文则赋予它几何灵魂——复可导的函数是<strong>保角映射</strong>。
        那两条方程今天叫<strong>柯西-黎曼方程</strong>。魏尔斯特拉斯又从幂级数角度第三路杀入——
        三条路（积分、几何、级数）殊途同归，说明这个概念确实是"对的"。
      </p>
    </div>

    <h2><span class="sec-no">贰</span>破局："各方向一致"翻译出两条方程</h2>
    <p>
      往下走会反复出现一个记号，先花三句话交代清楚——它并不需要什么新本事。
      <MathInline tex="u(x, y)" /> 是<strong>两个输入、一个输出</strong>的函数：给一个横坐标、
      一个纵坐标，还你一个数（比如一块铁板上每一点的温度）。
      记号 <MathInline tex="\partial u/\partial x" /> 读作"u 对 x 的偏导数"，
      它的动作只有一个：<strong>把 y 冻住不动、当成常数，剩下的就是一元的普通导数</strong>。
      拿最低的例子走一遍，<MathInline tex="u = x^2 y" />：求 <MathInline tex="\partial u/\partial x" /> 时
      把 y 看成常数，<MathInline tex="u" /> 就是"常数 y 乘 <MathInline tex="x^2" />"，
      导数是 <MathInline tex="2xy" />；求 <MathInline tex="\partial u/\partial y" /> 时反过来把 x 冻住，
      <MathInline tex="u" /> 是"常数 <MathInline tex="x^2" /> 乘 y"，导数就是 <MathInline tex="x^2" />。
      在 <MathInline tex="(x, y) = (3, 2)" /> 这一点，两个数分别是 12 和 9。
      所以<strong>偏导数没有任何新运算，新的只是"切之前先声明按哪个方向切"这个动作</strong>——
      恰好是本讲开头那句"复平面上可以从任何方向逼近"的一次小小预演。
      站内<router-link to="/mathphys/pde-intro">数学物理方程第 1 讲</router-link>会把它从零细讲
      （那门课不需要先修），本讲只需要上面这一句。
    </p>
    <p>
      把 <MathInline tex="f(x + iy) = u(x, y) + i\,v(x, y)" /> 拆成实部虚部，只比较两个最容易的方向。
      沿实轴（Δz = Δx）与沿虚轴（Δz = iΔy）的差商分别是：
    </p>
    <MathBlock tex="\frac{\partial u}{\partial x} + i \frac{\partial v}{\partial x} \qquad \text{与} \qquad \frac{\partial v}{\partial y} - i \frac{\partial u}{\partial y}" />
    <p>两者必须相等，实部对实部、虚部对虚部：</p>
    <MathBlock tex="\frac{\partial u}{\partial x} = \frac{\partial v}{\partial y}, \qquad \frac{\partial u}{\partial y} = -\frac{\partial v}{\partial x}" />
    <p>
      这就是<strong>柯西-黎曼方程</strong>。它的几何翻译是本讲的心脏，而翻译要借一样东西，
      现在正式请出来：把 (u, v) 对 (x, y) 的依赖在<strong>一点的近旁</strong>摆成一个 2×2 的方阵——
      四个格子分别是四个偏导数（第一行放 u 对 x、对 y 的偏导，第二行放 v 的），
      这个方阵叫<strong>雅可比矩阵</strong>。它就是<router-link to="/linear-algebra/linear-map">线代第 3 讲</router-link>
      那句"局部用线性变换冒充自己"的二元版：函数整体弯弯曲曲，
      但在一点的小邻域里，它对微小位移 (Δx, Δy) 的作用可以由这一个矩阵代劳。
      柯西-黎曼方程恰好说：这个矩阵必须长成
    </p>
    <MathBlock tex="J = \begin{bmatrix} \partial_x u & \partial_y u \\ \partial_x v & \partial_y v \end{bmatrix} = \begin{bmatrix} a & -b \\ b & a \end{bmatrix}" />
    <div class="insight">
      <div class="insight-title">💡 核心直觉：复可导 = 局部只做"旋转 + 伸缩"</div>
      <p>
        <MathInline tex="\begin{bmatrix} a & -b \\ b & a \end{bmatrix}" /> 正是<router-link
          to="/complex/imaginary"
          >上一讲</router-link
        >那个复数乘法矩阵！
        所以复可导的真义是：<strong>函数在每一点的局部，行为恰好是"乘一个复数 f′(z)"</strong>——
        纯旋转加纯伸缩，不许剪切、不许各方向不同比例拉伸。
        旋转伸缩不改变角度，所以解析函数处处<strong>保角</strong>；
        而 z̄ 的雅可比是翻转矩阵、z+z̄/2 的是不等比拉伸——形状不对，当场出局。
        "各方向导数一致"这个分析条件，与"局部是旋转伸缩"这个几何条件，是同一句话。
      </p>
    </div>

    <QuizBox
      quiz-id="holomorphic-q1"
      question="同样是「差商取极限」，为什么复可导比实可导苛刻得多？"
      hint="数一数：实轴上让增量趋于零有几条路可走，复平面上又有几条？"
      :options="[
        { t: '实轴上只有左、右两个方向要对齐；复平面上「所有方向」逼近算出的差商，都得等于同一个复数', why: '对。极限的定义不挑路径，所以沿实轴来、沿虚轴来、沿 45° 来、螺旋着来，全都得交出同一个 $f^{\\prime}(z_0)$。$\\bar z$ 就是最著名的落榜者：沿实轴差商是 1，沿虚轴是 −1，沿 45° 方向是 $-i$——它光滑得无可挑剔（不过是把平面上下翻转），却处处不可导。' },
        { t: '因为要同时管住实部 u 和虚部 v 两个函数，两个总比一个难', why: '难点不在「函数变多了」。$\\bar z$ 的 $u = x$、$v = -y$ 各自要多光滑有多光滑，照样当场出局——真正卡人的是柯西-黎曼把这四个偏导数锁死成一张只许旋转伸缩的方阵，不许有一丝剪切。' },
        { t: '只是把「左右两个方向」换成了「上下左右四个方向」，四个方向都测过就稳了', why: '方向有连续无穷多个，不是四个。而且只让两条轴上的差商一致，逼出来的仅仅是柯西-黎曼那两条方程，那只是必要条件——肆节定义框里的定理还多要一句「u、v 在该点实可微」，两条合起来才等价于复可导。' },
      ]"
      :answer="0"
    />

    <h2><span class="sec-no">叁</span>亲眼看保角性</h2>
    <ConformalDemo />

    <h2><span class="sec-no">肆</span>严格定义</h2>
    <div class="definition">
      <div class="def-title">📐 定义（解析函数）</div>
      <p>
        若 f 在区域 D 内<strong>每一点</strong>都复可导，称 f 在 D 内<strong>解析</strong>（analytic，或全纯 holomorphic）。
      </p>
      <p>
        <strong>定理</strong>：f = u + iv 在一点复可导 ⟺ u、v 在该点实可微，且满足柯西-黎曼方程。
        <strong>定理（奇迹）</strong>：f 在 D 内解析 ⟹ f 在 D 内<strong>无穷次</strong>可导，
        且在每点邻域内幂级数展开收敛于自身。
      </p>
    </div>
    <p>逐条咀嚼，重点在"奇迹"：</p>
    <ul>
      <li>
        <strong>解析是区域性质</strong>：单点可导没什么用（|z|² 只在原点可导），
        整个开区域可导才触发全部魔法——所以定义强调"每一点"；
      </li>
      <li>
        <strong>实函数没有的奇迹</strong>：实分析里可导一次未必可导两次，
        无穷次可导也未必泰勒展开收敛回自身（经典反例 <MathInline tex="e^{-1/x^2}" />：
        在 0 处各阶导数全为 0，泰勒级数是 0，函数却不是 0）。复分析里这些病态<strong>一个都不存在</strong>：
        可导一次 = 无穷可导 = 泰勒展开成立。一个条件买断全部正则性；
      </li>
      <li>
        <strong>为什么这么好？</strong>直觉：复可导是"二维方向全体一致"的极强约束，
        相当于给函数上了刑具——能活下来的都是极度规整的函数。严格的原因藏在下一讲的柯西积分公式里
        （导数可以写成积分，积分想求几次导都行）；
      </li>
      <li>
        <strong>调和的赠品</strong>：对柯西-黎曼方程再求一次导并交叉相消，得
        <MathInline tex="\partial_{xx} u + \partial_{yy} u = 0" />——解析函数的实部虚部都满足<strong>拉普拉斯方程</strong>。
        这个方程是数学物理方程课的三大主角之一（描述稳态温度、静电势），此处先记下这份赠品。
      </li>
    </ul>

    <h2><span class="sec-no">伍</span>买到了什么：一张苛刻条件换来的至尊会员卡</h2>
    <p>
      "各方向导数一致"听着像个纯粹的洁癖条款，但它换来的东西非常具体。
      下面三样都不是比喻：一样让飞机飞起来，一样让帆船不迷路，一样让整个二维物理学换了母语。
    </p>

    <h3>1 · 机翼：把不会解的问题，搬到会解的问题上</h3>
    <p>
      20 世纪初，莱特兄弟刚把飞机抬离地面，俄国人<strong>茹科夫斯基</strong>（1847—1921）
      要算一件当时没人算得出的事：空气绕过机翼时，机翼受多大的力。
      障碍不在物理——二维理想流体的方程早就写好了——而在<strong>形状</strong>。
      翼型那种前圆后尖、上凸下平的轮廓，边界条件根本没法在上面解方程。
      与此同时，另一个问题却是流体课本第一章的例题：<strong>空气绕过一根圆柱</strong>，
      解是三行公式（均匀流 + 偶极子 + 涡）。
    </p>
    <p>
      茹科夫斯基的招数，是本讲这套理论最直白的一次兑现：既然解析函数保角，
      那就<strong>找一个解析函数把圆变成翼型，把圆柱那个现成的解整个搬过去</strong>。他找到的是
    </p>
    <MathBlock tex="w = z + \frac{1}{z}" />
    <p>
      为什么保角是这里的关键？因为要搬运的不只是一堆曲线，还有<strong>物理约束</strong>：
      流体不能穿过物体表面（物体边界必须是一条流线）、流线彼此不能相交、
      流线与等压线的夹角决定受力方向。这些全是<strong>角度条件</strong>。
      保角映射一条都不动，所以圆柱上的解映过去，仍然是一个合法的流场——
      换成任何一个不保角的变形（哪怕它把圆变成了一模一样的翼型轮廓），得到的都是一堆没有物理意义的乱线。
    </p>
    <RevealBox
      title="🔍 z + 1/z 凭什么能把一个圆变出尖后缘？"
      hint="先自己算一步：把单位圆 z = cos θ + i·sin θ 代进 w = z + 1/z，看看圆被压成了什么。再想想，圆周本来处处光滑，哪来的尖角？"
      label="对答案 / 看完整拆解"
    >
      <p><strong>第一步：单位圆被压成一条线段。</strong>在单位圆上 <MathInline tex="1/z = \bar z" />，所以</p>
      <MathBlock tex="w = z + \bar z = 2\cos\theta \in [-2,\, 2]" />
      <p>
        整个圆周被压扁成实轴上的一根线段——一块"零厚度的平板"。这就是最原始的翼型：平板机翼。
      </p>
      <p>
        <strong>第二步：尖角从哪儿来。</strong>圆周处处光滑，映过去却在两端出现了折返点，
        这不是和"保角"矛盾吗？不矛盾，而且正是保角定理的<strong>例外条款</strong>在起作用：
      </p>
      <MathBlock tex="f'(z) = 1 - \frac{1}{z^2} = 0 \quad \Longleftrightarrow \quad z = \pm 1" />
      <p>
        保角性靠的是"局部等于乘 <MathInline tex="f'(z)" />"，可一旦
        <MathInline tex="f'(z_0) = 0" />，这个乘法退化，局部主项变成二阶的
        <MathInline tex="\tfrac{1}{2}f''(z_0)(z-z_0)^2" />——平方会<strong>把角度加倍</strong>。
        圆周在 <MathInline tex="z = 1" /> 处的内角是 180°（光滑），加倍成 360°，
        也就是折回去：<strong>尖点</strong>。机翼那道锋利的后缘，就是这么造出来的。
      </p>
      <p>
        <strong>第三步：把平板吹成机翼。</strong>不用单位圆，改用<strong>圆心挪到 <MathInline tex="\mu" />、
        半径取 <MathInline tex="R = |1-\mu|" /></strong> 的圆——这个圆仍然穿过
        <MathInline tex="z = 1" />（所以后缘照样是尖的），但把另一个临界点
        <MathInline tex="z = -1" /> 裹在了肚子里（那里的角度加倍发生在内部，外面看不见）。于是：
      </p>
      <ul>
        <li>圆心往<strong>左</strong>挪（<MathInline tex="\mu" /> 的实部为负）——圆比线段"胖"出去，出来的是<strong>厚度</strong>；</li>
        <li>圆心往<strong>上</strong>挪（<MathInline tex="\mu" /> 的虚部为正）——上下不再对称，出来的是<strong>弯度</strong>（上凸下平）。</li>
      </ul>
      <p>两个滑杆调出的整族翼型，至今叫<strong>茹科夫斯基翼型</strong>。</p>
    </RevealBox>
    <QuizBox
      quiz-id="holomorphic-q2"
      question="「解析函数保角」——这条性质是不是在整个定义域里处处成立、没有例外？"
      hint="保角靠的是「局部等于乘那个导数值」这一句。要是那个乘数本身是零呢？"
      :options="[
        { t: '有例外：在 $f^{\\prime}(z_0) = 0$ 的点上保角失效，那里的角度会被成倍放大', why: '对。乘法一退化，局部主项就变成平方项，角度加倍：$z^2$ 在原点把两条夹 90° 的射线撑成 180°（0° 那条仍去 0°，90° 那条被送到 180°），也就是折成了一条直线。茹科夫斯基映射的 $f^{\\prime}(z) = 1 - 1/z^2$ 恰在 $z = \\pm 1$ 处为零，机翼那道锋利的尖后缘正是靠这个「故障」造出来的。' },
        { t: '处处成立——解析是区域性质，整个区域都可导，保角当然也整个区域都有', why: '解析确实保证了逐点可导，可保角还多要一个条件：局部那个乘数不能是 0。$z^2$ 在整个复平面上都解析，角度却偏偏在原点被加倍——解析保证的是「局部等于乘一个复数」，从没保证那个复数非零。' },
        { t: '只在 $f^{\\prime}(z_0)$ 是实数时成立，导数一带虚部就会把角度转歪', why: '转歪的是整幅图，不是图里的角。乘一个复数等于整体旋转加整体伸缩，交于一点的两条曲线的切线一起转过同样的角度，夹角一分不差。导数的辐角只决定「转多少」，唯一能破坏夹角的情形是它等于 0。' },
      ]"
      :answer="0"
    />
    <p>
      下面这张图有四个旋钮，别被名字唬住：<strong>厚度、弯度、迎角</strong>是机翼真正的三个参数，
      前两个就是上面说的"把圆心往左挪、往上挪"（数字是挪动的距离，尺子取成"原点到临界点
      <MathInline tex="z = 1" /> 为 1"）；<strong>变形进度</strong>则根本不是机翼参数，
      只是这张图的动画进度条——把 <MathInline tex="w = z + 1/z" /> 里的 1 换成
      <MathInline tex="t" />，从 0 拖到 1，好让你看清圆是怎么一步步长成机翼的。
      每个旋钮的确切含义与换算，图下面逐条写了。
    </p>
    <JoukowskiDemo />
    <p>
      顺带还能白拿一个结果。绕圆柱的解里有一个自由参数——<strong>环量</strong>
      <MathInline tex="\Gamma" />（绕物体转一圈的速度积分）。数学上它可以取任何值，
      物理上却只有一个值合理：<strong>流体不可能以无穷大速度绕过那个尖锐的后缘</strong>。
      把这一条写下来（1902 年德国人<strong>库塔</strong>提出，人称<strong>库塔条件</strong>），
      <MathInline tex="\Gamma" /> 就被唯一钉死了，而升力恰好是
      <MathInline tex="L = \rho U \Gamma" />（<strong>库塔-茹科夫斯基定理</strong>）。
      注意这中间没有一处用到"机翼形状"的细节：<strong>形状的全部影响，都被那个解析映射榨成了一个数
      <MathInline tex="\Gamma" /></strong>。拖一拖上面的迎角与弯度，
      你手里那两个滑杆正是一百年来机翼设计的两个主旋钮；
      把厚度、弯度、迎角全归零，右边的"翼型"退化成一条线段、流线变回一片平行直线、
      <MathInline tex="\Gamma" /> 归零——升力也就没了。
    </p>

    <h3>2 · 墨卡托海图：拿面积换角度的一笔生意</h3>
    <p>
      1569 年，<strong>墨卡托</strong>要解决的是一件性命攸关的事：船长在海图上用直尺连起出发港和目的港，
      量出这条线与经线的夹角，然后<strong>把舵锁死在这个角度一直开</strong>，能不能到？
      在此之前所有海图上都不能——直线量出来的角度，开着开着就不对了。
    </p>
    <p>
      "舵向不变"的航线叫<strong>恒向线</strong>：它与每一条经线的交角处处相同。
      要让这种线在图上成为直线，海图必须<strong>保角</strong>——把球面上的角度一分不差地搬到纸上。
      墨卡托没有微积分（那还要一百年才被发明），他是用航海表凑出纵坐标的；
      但这个投影的真身，正是本讲讲的东西。
    </p>
    <p>
      下面的推导会用到四个符号：<MathInline tex="\varphi" />（纬度）、<MathInline tex="\lambda" />（经度）、
      <MathInline tex="\beta" />（舵向，从正北量起的角）、<MathInline tex="y" />（纸上的纵坐标）。
      它们分别指着地球和海图上的哪个东西，先在下面这张图里对一遍，再往下看会轻松得多。
    </p>
    <MercatorVarsDemo />
    <RevealBox
      title="🔍 墨卡托的纵坐标为什么非得那么怪"
      hint="先自己推一步：地图把所有经线画成等距的竖线，那么在纬度 φ 处，东西方向被放大了几倍？要保角，南北方向该怎么配合？"
      label="对答案 / 看完整拆解"
    >
      <p>
        <strong>第一步：东西方向被迫放大了 <MathInline tex="1/\cos\varphi" /> 倍。</strong>
        地球上纬度 <MathInline tex="\varphi" /> 处，一度经度的实际长度只有赤道上的
        <MathInline tex="\cos\varphi" /> 倍（越靠近极点，经线挨得越近）。
        而墨卡托坚持把经线画成<strong>等距的竖直线</strong>（这才能让"正北"永远是纸面向上）。
        于是高纬度的东西向距离在图上被拉大了 <MathInline tex="1/\cos\varphi" /> 倍。
      </p>
      <p>
        <strong>第二步：保角只剩一条路。</strong>保角就是"局部各方向按同一倍数缩放"（本讲第贰节那句话）。
        东西向已经被放大 <MathInline tex="1/\cos\varphi" /> 倍，南北向就必须<strong>放大同样的倍数</strong>：
      </p>
      <MathBlock tex="\frac{dy}{d\varphi} = \frac{1}{\cos\varphi} \quad \Longrightarrow \quad y = \int_0^{\varphi}\sec t\,dt = \ln\tan\!\left(\frac{\pi}{4} + \frac{\varphi}{2}\right)" />
      <p>
        没有任何自由度可选——这个丑陋的对数正切，是"经线等距 + 保角"逼出来的唯一答案。
        微积分课上那个不知为何要背的积分 <MathInline tex="\int \sec t\,dt" />，出处就在这儿。
      </p>
      <p>
        <strong>第三步：恒向线果然成了直线。</strong>设舵向为 <MathInline tex="\beta" />（从正北量起），
        沿航线走一小段，北向位移是 <MathInline tex="R\,d\varphi" />，东向位移是
        <MathInline tex="R\cos\varphi\,d\lambda" />（就是上面那张图②的两条直角边），于是
      </p>
      <MathBlock tex="\tan\beta = \frac{\cos\varphi\,d\lambda}{d\varphi} = \frac{d\lambda}{dy} \quad \Longrightarrow \quad \lambda = (\tan\beta)\, y + C" />
      <p>
        在图上的坐标 <MathInline tex="(\lambda,\, y)" /> 里，这是一条<strong>斜率固定的直线</strong>。
        舵向恒定 ⟺ 图上是直线，正是船长要的那句话。
      </p>
      <p>
        <strong>第四步：它其实是两个解析映射的复合。</strong>把球面先<strong>球极投影</strong>到复平面
        ——从<strong>北极</strong>出发，作一条穿过球面上某点的直线，落到赤道平面上的交点就是它的像
        （赤道原地不动落在单位圆上，南极缩到原点，北极自己跑去无穷远）。这是个古典的保角映射：
      </p>
      <MathBlock tex="\zeta = \tan\!\left(\frac{\pi}{4}+\frac{\varphi}{2}\right)e^{i\lambda}" />
      <p>再取对数——一个如假包换的解析函数：</p>
      <MathBlock tex="\ln\zeta = \underbrace{\ln\tan\!\left(\frac{\pi}{4}+\frac{\varphi}{2}\right)}_{\text{墨卡托的 } y} + \; i\,\lambda" />
      <p>
        <strong>墨卡托投影 = 对数 ∘ 球极投影</strong>。它保角，是因为它是两个保角映射接起来的；
        而 <MathInline tex="\ln" /> 把"绕原点转一圈"拉直成"横着平移一格"，
        正是它把球极投影里绕着极点盘旋的螺线，捋成了纸上的直线。
      </p>
    </RevealBox>
    <MercatorDemo />
    <p>
      这笔生意的代价也一并看见了：<MathInline tex="1/\cos\varphi" /> 在高纬度会爆炸，
      格陵兰被吹成非洲那么大。<strong>面积全赔进去，角度一分未失</strong>——
      而航海要的从来不是面积。所有对墨卡托"骗人"的指控，都漏掉了它是为谁画的。
    </p>

    <h3>3 · 势函数与流函数：二维物理原本就写在复平面上</h3>
    <p>
      前两个例子是"用"解析函数。第三个例子性质不同：它说的是二维物理里那些方程，
      <strong>本来就是柯西-黎曼方程</strong>，只是换了套记号写着。
    </p>
    <p>
      不过这一段要用到三个词——<strong>场</strong>、<strong>势</strong>、<strong>流函数</strong>。
      教科书往往默认读者早就会了，这里从零讲一遍；用到的工具只有偏导数一样。
    </p>

    <p>
      <strong>场：给平面上每一点挂一个量。</strong>挂一个<strong>数</strong>，叫标量场——
      房间里每一点的温度、一座山每一点的海拔、每一点的气压；挂一个<strong>箭头</strong>，
      叫向量场——河面上每一点水流的方向与快慢、每一点的风。本节说的<strong>流场</strong>就是后者。
      想象一条平缓的河，河心立着一根圆形桥墩，水从左边来、绕过桥墩、在右边合拢。
      给河面照一张俯视相片，在每一点画上"这里的水往哪个方向、有多快"这个箭头，画满整张相片——
      这一整张箭头图就叫一个流场。（下面动画里"绕圆柱的流动"那一档，画的正是这根桥墩。）
    </p>
    <p>
      两个限定词也一并说清。<strong>二维</strong>是说只看一个平面就够：河面俯视图、
      长管道的一个横截面、无限长导线周围的一个切片——沿着第三个方向情形都一样，
      所以画一张顶一沓。<strong>定常</strong>是说这张图<strong>不随时间变</strong>：
      水一直在流，但流的样子始终是那个样子（桥墩后面永远是那两道分岔，不会一会儿这样一会儿那样）。
    </p>

    <p>
      <strong>势：用一个数的函数，记住整张箭头图。</strong>先看一件你早就见过的事。
      一座山，每一点有个海拔 <MathInline tex="h(x, y)" />——这是标量场，每点一个数。
      往山坡上倒一桶水，水往哪儿流？往<strong>最陡的下坡方向</strong>。
      也就是说：只要给出海拔这<strong>一个数</strong>的函数，"水在每一点往哪流、流多急"
      那整张<strong>箭头图</strong>就已经被定死了，用不着另外再给一遍。
      数学上把"最陡上坡的方向、陡度多少"这个箭头记作
      <MathInline tex="\nabla h = (\partial_x h,\ \partial_y h)" />，叫<strong>梯度</strong>；
      水流的方向就是 <MathInline tex="-\nabla h" />。
    </p>
    <p>
      这就是<strong>势</strong>的全部含义：<strong>一个标量函数，一求梯度就还原出整个向量场</strong>。
      名字来自"势能"——重力势能 <MathInline tex="mgh" /> 是每点一个数，
      而 <MathInline tex="-\nabla(mgh) = (0,\, -mg)" /> 正是重力那个箭头。
      好处非常实在：平面上一个向量场每点要记两个数，势只要记一个数；
      两个未知函数压成一个，方程少一半。<strong>电势</strong>就是这么用的——
      你家插座上标的 220 V 是每点一个数（势），电场才是箭头；
      没人去背电场的两个分量，因为记住电势就够了。热学里记温度、渗流里记压力、
      天体力学里记引力势，全是同一个套路。
    </p>
    <p>
      <strong>等势线就是等高线。</strong>地图上的等高线你见过：沿一条等高线走，海拔不变；
      而水流总是<strong>垂直</strong>穿过等高线往下淌——因为"最陡"的方向必然垂直于"不升不降"的方向。
      下面动画里靛蓝的<strong>等势线</strong>与朱红的<strong>流线</strong>处处成 90°，
      物理上就是这一件事（它在数学上还有第二重来历，等会儿说）。
    </p>
    <p>
      <strong>但不是每个向量场都配有势。</strong>想象一个绕着中心打转的场：
      每点的箭头都沿圆周的切线方向，像浴缸放水时的那个漩涡。
      假设它有势 <MathInline tex="\varphi" />，那么沿一个圆走整整一圈：
      每一步都在"顺着箭头走"，<MathInline tex="\varphi" /> 就该一路只增不减；
      可走完一圈你回到了出发点，<MathInline tex="\varphi" /> 又必须回到原值——矛盾。
      <strong>所以漩涡场没有全局的势</strong>。有没有势取决于一个条件，物理上叫<strong>无旋</strong>：
      往流场里丢一个小风车，它可以随波漂走，但自己不转。
      （这个"绕一圈对不上"的漏洞不是本节的败笔，它正是<router-link
        to="/complex/cauchy-integral"
        >下一讲</router-link
      >的主角。）
    </p>

    <p>
      <strong>流函数：势记的是"高度"，它记的是"流量"。</strong>在河面上任取两点 A、B，
      从 B 到 A 随手拉一条线，数一数<strong>每秒有多少水从这条线上横穿过去</strong>。
      要紧的是：只要水不凭空冒出来也不凭空消失（这一条叫<strong>无源</strong>），
      这个流量就<strong>只跟两个端点有关，跟你把线拉成什么形状无关</strong>——
      否则形状不同的两条线之间就得藏着一个水龙头。既然只跟端点有关，
      那就可以给每一点记一个数 <MathInline tex="\psi" />，让"横穿 B → A 那条线的流量"恰好等于
      <MathInline tex="\psi(A) - \psi(B)" />。这个账本就是<strong>流函数</strong>。
    </p>
    <p>
      它立刻送出一个漂亮结论：若 A、B 两点的 <MathInline tex="\psi" /> 相等，
      那么连接它们的线上<strong>净流量为零</strong>。把 <MathInline tex="\psi" /> 相等的点连成曲线，
      就得到一条<strong>没有任何水穿过去的线</strong>——水只能沿着它走。
      这样的线就叫<strong>流线</strong>，也就是你往水里滴一滴墨水，它自己划出来的那道痕。
      所以 <MathInline tex="\psi" /> 的等值线 = 流线，一个流函数等于一次画出整幅流动图案；
      桥墩的表面也必然是其中一条（水不可能穿进桥墩里去）。
    </p>
    <p>
      到这里，两个标量函数各就各位：<MathInline tex="\varphi" /> 管"势"，
      <MathInline tex="\psi" /> 管"流量"。下面这一步是本讲的高潮——
      它俩其实是<strong>同一个复函数的实部与虚部</strong>。
    </p>
    <RevealBox
      title="🔍 从「水不打转、水不凭空冒出来」两句话，推出柯西-黎曼方程"
      hint="先自己动笔：在流场里画一个边长 dx、dy 的小方块，数一数四条边上每秒流进流出多少水，「不凭空冒水」写成偏导数是什么等式？再把结果和第贰节那两条方程摆在一起比一比。"
      label="对答案 / 看完整拆解"
    >
      <p>
        考虑一个定常的二维流场，速度是 <MathInline tex="\vec V = (V_1, V_2)" />
        （<MathInline tex="V_1" /> 是往东那一格有多快，<MathInline tex="V_2" /> 是往北）。
        物理上有两句大白话，先把它们翻译成式子。
      </p>
      <p>
        <strong>第零步：在流场里划一个小方块。</strong>边长取 <MathInline tex="dx" />、
        <MathInline tex="dy" />，小到里面的速度可以当成线性变化。
      </p>
      <p>
        <strong>水不凭空冒出来（无源）</strong>：左边界每秒流进
        <MathInline tex="V_1(x)\,dy" />，右边界每秒流出 <MathInline tex="V_1(x+dx)\,dy" />，
        左右两面的净流出是
        <MathInline tex="[V_1(x+dx) - V_1(x)]\,dy = (\partial_x V_1)\,dx\,dy" />；
        上下两面同理给出 <MathInline tex="(\partial_y V_2)\,dx\,dy" />。
        方块里既然没藏水龙头，进出必须相抵：
      </p>
      <MathBlock tex="\partial_x V_1 + \partial_y V_2 = 0" />
      <p>
        <strong>水不打转（无旋）</strong>：沿方块的四条边绕一圈，把"速度顺着边走的那个分量"
        累加起来（这个和叫<strong>环量</strong>，正是"转不转"的度量，也正是小风车转不转）。
        下边贡献 <MathInline tex="V_1(y)\,dx" />、上边贡献 <MathInline tex="-V_1(y+dy)\,dx" />、
        右边贡献 <MathInline tex="V_2(x+dx)\,dy" />、左边贡献 <MathInline tex="-V_2(x)\,dy" />，
        合计 <MathInline tex="(\partial_x V_2 - \partial_y V_1)\,dx\,dy" />。要它不转：
      </p>
      <MathBlock tex="\partial_x V_2 - \partial_y V_1 = 0" />
      <p>
        <strong>第一句：无旋 ⇒ 速度势存在。</strong>
        上面第二条式子（在单连通区域上）保证存在一个<strong>速度势</strong>
        <MathInline tex="\varphi" />，使
        <MathInline tex="\vec V = \nabla\varphi = (\partial_x\varphi,\ \partial_y\varphi)" />——
        这正是那句"旋度为零的场是某个函数的梯度"，
        也正是前面"山坡与水流"的一般版本：<MathInline tex="\varphi" /> 就是那张地形图。
        （这是多元微积分的一条定理，站内暂未展开——本框把它当已知用。
        直觉版本正文已经给过：绕任何一个小圈的环流都为零，一路记账就攒得出一个单值的势；
        哪怕有一个圈对不上账，势就凑不齐了。）
      </p>
      <p>
        <strong>第二句：无源 ⇒ 流函数存在。</strong>
        同一个定理换个方向用在第一条式子上，保证存在<strong>流函数</strong>
        <MathInline tex="\psi" />，使
        <MathInline tex="\vec V = (\partial_y\psi,\ -\partial_x\psi)" />。
        这个写法看着古怪，其实就是把前面"流量账本"翻译过来：
        <MathInline tex="\psi" /> 沿某方向的变化率，等于垂直于该方向穿过去的流量。
        顺带兑现前面那句话——沿 <MathInline tex="\psi" /> 不变的方向走，
        走的正好是速度方向，所以等值线就是流线。
      </p>
      <p><strong>合起来。</strong>同一个 <MathInline tex="\vec V" /> 的两种写法必须一致：</p>
      <MathBlock tex="\partial_x\varphi = V_1 = \partial_y\psi, \qquad \partial_y\varphi = V_2 = -\partial_x\psi" />
      <p>
        把这两条与第贰节的柯西-黎曼方程逐字对照——<strong>一模一样</strong>。
        所以 <MathInline tex="f = \varphi + i\psi" /> 是一个解析函数，人称<strong>复势</strong>。
        反过来读更惊人：<strong>随便写一个解析函数，它的实部虚部自动就是某个无旋无源流场的势与流函数</strong>，
        一个物理上不合法的流场你根本写不出来。
      </p>
      <p>
        再顺一句：速度可以直接从复势求导拿到，<MathInline tex="V_1 - iV_2 = f'(z)" />；
        而两族等值线正交，是因为 <MathInline tex="f" /> 把它们映成 <MathInline tex="w" /> 平面上的
        横线族与竖线族，而保角映射不改变那个直角。
      </p>
    </RevealBox>
    <p>
      下面的动画把这件事变成可以拖的：下拉框里换一个解析函数，图上就换一整个物理场景。
      五档分别是——
    </p>
    <ul>
      <li>
        <MathInline tex="f(z) = z" />——<strong>匀速流</strong>：笔直河道里各处一样快的水。
        换成电学，就是平行板电容器里的匀强电场。
      </li>
      <li>
        <MathInline tex="f(z) = z^2" />——<strong>墙角流</strong>：水撞上一面直角墙拐弯，
        河岸拐角处的水就是这个样子。
      </li>
      <li>
        <MathInline tex="f(z) = \ln z" />——<strong>点源</strong>：原点插着一根往外冒水的管子，
        水沿半径向四面八方辐射（朱红的流线就是那些射线，靛蓝的等势线是一圈圈同心圆）。
        换成电学，就是一个点电荷的电场。
      </li>
      <li>
        <MathInline tex="f(z) = -i\ln z" />——<strong>涡旋</strong>：刚才说的那个"没有全局势"的漩涡，
        流线是一圈圈同心圆。换成电学，就是一根通电导线周围的磁场。
      </li>
      <li>
        <MathInline tex="f(z) = z + 1/z" />——<strong>绕圆柱的流动</strong>：开头那根桥墩。
        它也正是本节第 1 个例子里茹科夫斯基整个搬去机翼上的那个课本例题——
        同一个 <MathInline tex="z + 1/z" />，那边当映射用，这边当流场读。
      </li>
    </ul>
    <QuizBox
      quiz-id="holomorphic-q3"
      question="是不是每一个二维流场背后，都藏着一个速度势 $\varphi$？"
      hint="回想那个绕圈的漩涡：沿一个圆走整整一圈，势会回到原来的读数吗？"
      :options="[
        { t: '不是。只有「无旋」（绕任何一个小圈的环流都为零）才保证势存在且单值——点涡绕一圈就对不上账', why: '对。势的本事是「沿路把箭头累加起来记账」，可这本账要成立，就得保证绕回原点时读数回到原值。点涡每一步都在顺着箭头走，转完一圈 $\\varphi$ 只增不减，却又必须等于出发时的值，账当场崩掉。所以势是一种特权，不是标配——下面动画里 $f(z) = -i\\ln z$ 那一档画的正是这个流场。' },
        { t: '是。任何流场都能沿一条路径把速度积起来，积出来的那个函数就是势', why: '沿路径积分确实能算出一个数，但这个数会不会依赖你走的路，是另一回事。无旋恰好就是「同起点同终点的任意两条路给出同一个数」这条保证；缺了它，同一点会被记上无穷多个不同读数，那就不成其为函数了。' },
        { t: '只要流场是定常的（不随时间变），势就一定存在', why: '定常管的是「随时间变不变」，势存不存在管的是「在空间里绕圈对不对得上」，两件事互不相干。点涡就是一个定常得不能再定常的流场——图像一秒都不变，照样没有单值的势。' },
      ]"
      :answer="0"
    />
    <p>
      拖两个探针滑杆在图上走一圈，盯住读数区：<strong>夹角那一栏永远是 90°</strong>
      （等势线与流线处处垂直，就是"水垂直穿过等高线"那句话）；
      后面两个拉普拉斯读数<strong>永远是 0</strong>——那是下面要说的"调和"。
    </p>
    <PotentialFlowDemo />
    <p>
      最后一件值得说的事：<strong>同一套方程换个名词，就换了一门学科</strong>。
      同一张图，<MathInline tex="\varphi" /> 读作<strong>电势</strong>，朱红线就成了电力线，
      算的是电容器与屏蔽罩；读作<strong>温度</strong>，朱红线就是热量流动的方向，
      算的是一块金属板上的<router-link to="/mathphys/heat">稳态温度分布</router-link>；
      读作<strong>地下水的压力</strong>，算的是渗流；读作<strong>引力势</strong>，
      算的是天体。这几门课里的图看着像四回事，方程一列，是同一条。
      本讲第肆节那份"调和的赠品"（<MathInline tex="\partial_{xx}u + \partial_{yy}u = 0" />）
      在这里现了原形——它就是数学物理方程课里的
      <router-link to="/mathphys/laplace">拉普拉斯方程</router-link>，
      而复分析等于白送了一整座解的仓库：任取解析函数，实部虚部各是一个解。
    </p>

    <h3>还有两张票</h3>
    <ul>
      <li>
        <strong>"解析"一词的正名</strong>：微积分课上"解析函数"似乎只是"有公式的函数"的雅称，
        现在它有了精确含义——局部幂级数收敛于自身。<router-link to="/calculus/taylor">泰勒讲</router-link>的疑问
        （什么函数配得上展开）在复世界有了干净答案：
        复可导的都配，且必然成功；
      </li>
      <li>
        <strong>下一讲的入场券</strong>：解析函数这么规整，它的<strong>积分</strong>会规整到什么程度？
        答案是本课最深的定理：沿闭合回路的积分恒等于零——而这条定理将反过来解释本讲的一切奇迹。
      </li>
    </ul>
    <div class="insight">
      <div class="insight-title">🔗 与你学过的课程连一连</div>
      <p>
        <strong>线性代数</strong>：柯西-黎曼方程 = "雅可比矩阵是旋转伸缩型"——
        <router-link to="/linear-algebra/linear-map">线性映射讲</router-link>埋的伏笔在此兑现；
        <strong>微积分</strong>：多元函数的"可微 = 局部线性"在这里升级为"复可导 = 局部乘复数"，
        而当年不知为何要背的 <MathInline tex="\int\sec t\,dt" /> 原来是墨卡托海图的纵坐标；
        <strong>数学物理方程</strong>：解析函数的实部虚部都是
        <router-link to="/mathphys/laplace">拉普拉斯方程</router-link>的解——
        复分析是这门课的一座免费解库（本站那一讲从零讲起，不需要先修）；
        <strong>计算数学</strong>：保角映射数值化（Schwarz-Christoffel 变换）至今是求解区域问题的实用工具。
      </p>
    </div>
  </ConceptPage>
</template>
