<script setup>
import ConceptPage from '../../components/ConceptPage.vue'
import MathBlock from '../../components/MathBlock.vue'
import MathInline from '../../components/MathInline.vue'
import RevealBox from '../../components/RevealBox.vue'
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
      把 <MathInline tex="f(x + iy) = u(x, y) + i\,v(x, y)" /> 拆成实部虚部，只比较两个最容易的方向。
      沿实轴（Δz = Δx）与沿虚轴（Δz = iΔy）的差商分别是：
    </p>
    <MathBlock tex="\frac{\partial u}{\partial x} + i \frac{\partial v}{\partial x} \qquad \text{与} \qquad \frac{\partial v}{\partial y} - i \frac{\partial u}{\partial y}" />
    <p>两者必须相等，实部对实部、虚部对虚部：</p>
    <MathBlock tex="\frac{\partial u}{\partial x} = \frac{\partial v}{\partial y}, \qquad \frac{\partial u}{\partial y} = -\frac{\partial v}{\partial x}" />
    <p>
      这就是<strong>柯西-黎曼方程</strong>。它的几何翻译是本讲的心脏。回忆线代第三讲：
      二元映射 (u, v) 在一点的局部行为由雅可比矩阵决定。柯西-黎曼方程恰好说：这个矩阵必须长成
    </p>
    <MathBlock tex="J = \begin{bmatrix} \partial_x u & \partial_y u \\ \partial_x v & \partial_y v \end{bmatrix} = \begin{bmatrix} a & -b \\ b & a \end{bmatrix}" />
    <div class="insight">
      <div class="insight-title">💡 核心直觉：复可导 = 局部只做"旋转 + 伸缩"</div>
      <p>
        <MathInline tex="\begin{bmatrix} a & -b \\ b & a \end{bmatrix}" /> 正是上一讲的复数乘法矩阵！
        所以复可导的真义是：<strong>函数在每一点的局部，行为恰好是"乘一个复数 f′(z)"</strong>——
        纯旋转加纯伸缩，不许剪切、不许各方向不同比例拉伸。
        旋转伸缩不改变角度，所以解析函数处处<strong>保角</strong>；
        而 z̄ 的雅可比是翻转矩阵、z+z̄/2 的是不等比拉伸——形状不对，当场出局。
        "各方向导数一致"这个分析条件，与"局部是旋转伸缩"这个几何条件，是同一句话。
      </p>
    </div>

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
    <RevealBox
      title="🔍 从「水不打转、水不凭空冒出来」两句话，推出柯西-黎曼方程"
      hint="先自己想想：一个二维速度场 (V₁, V₂) 满足「无旋」和「无源」，各自写成偏导数是什么样的等式？再把它们和第贰节那两条方程摆在一起比一比。"
      label="对答案 / 看完整拆解"
    >
      <p>
        考虑一个定常的二维流场，速度是 <MathInline tex="\vec V = (V_1, V_2)" />。物理上有两句大白话：
      </p>
      <p>
        <strong>第一句：水不打转（无旋）。</strong>
        <MathInline tex="\partial_x V_2 - \partial_y V_1 = 0" />。
        这个条件（在单连通区域上）保证存在一个<strong>速度势</strong> <MathInline tex="\varphi" />，使
        <MathInline tex="\vec V = \nabla\varphi = (\partial_x\varphi,\ \partial_y\varphi)" />——
        这正是微积分课里"旋度为零的场是某个函数的梯度"。
      </p>
      <p>
        <strong>第二句：水不凭空冒出来（无源）。</strong>
        <MathInline tex="\partial_x V_1 + \partial_y V_2 = 0" />。
        同样的定理换个方向用，保证存在一个<strong>流函数</strong> <MathInline tex="\psi" />，使
        <MathInline tex="\vec V = (\partial_y\psi,\ -\partial_x\psi)" />。
        （<MathInline tex="\psi" /> 的等值线就是流线：沿 <MathInline tex="\psi" /> 不变的方向走，
        走的正好是速度的方向。）
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
    <PotentialFlowDemo />
    <p>
      同一套方程换个名词，就换了一门学科：<MathInline tex="\varphi" /> 读作电势，流线就是电力线；
      读作温度，流线就是热流方向；读作重力势、渗流压力，同理。
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
