<script setup>
import ConceptPage from '../../components/ConceptPage.vue'
import MathBlock from '../../components/MathBlock.vue'
import MathInline from '../../components/MathInline.vue'
import RevealBox from '../../components/RevealBox.vue'
import QuizBox from '../../components/QuizBox.vue'
import BrachistochroneDemo from '../../demos/BrachistochroneDemo.vue'
</script>

<template>
  <ConceptPage slug="variational">
    <h2><span class="sec-no">壹</span>困境：1696 年那道公开挑战题</h2>
    <div class="story">
      <div class="story-title">📜 1696 年 6 月 · 一封写给"全世界最杰出数学家"的挑战书</div>
      <p>
        约翰·伯努利在《教师学报》上登出一道题，抬头写着"致全世界最杰出的数学家"：
      </p>
      <p style="padding-left: 1.2em; border-left: 3px solid var(--accent)">
        <em>"在竖直平面内给定两点 A 与 B（B 不在 A 的正下方）。
        求一条连接它们的曲线，使得一个小球仅在重力作用下从 A 静止滑到 B 时，
        <strong>用时最短</strong>。"</em>
      </p>
      <p>
        他给了半年期限，后来在莱布尼茨的请求下延长到一年半，
        并特意寄了一份给英国的牛顿——当时两派正为微积分的发明权吵得不可开交。
      </p>
      <p>
        1697 年 1 月 29 日下午 4 点，牛顿从造币厂下班回家（他当时任皇家造币厂监理），
        看到这道题。<strong>据他的外甥女记载，他熬了一个通宵，次日凌晨 4 点解出</strong>，
        随后<strong>匿名</strong>寄给了皇家学会。
        伯努利读到那份匿名解答时说了一句流传至今的话：
        <strong>"从爪印认得出狮子。"</strong>
      </p>
      <p>
        最终有五个人给出了解答：约翰·伯努利、雅各布·伯努利、莱布尼茨、洛必达、牛顿。
        答案出人意料：<strong>那条最快的滑道是一段<em>摆线</em></strong>
        ——一个圆沿直线滚动时，圆周上一点划出的轨迹。
      </p>
    </div>
    <p>
      这道题为什么值得单独讲一讲？因为它的<strong>问法</strong>和这门课前面的一切都不同。
    </p>
    <div class="insight">
      <div class="insight-title">💡 困境的确切形状：未知量是一整条曲线</div>
      <p>
        <router-link to="/calculus/extremum">极值那一讲</router-link>解决的问题是：
        <strong>在一条数轴上挑一个数 x，让 f(x) 最小</strong>。
        <router-link to="/calculus/gradient">梯度那一讲</router-link>升级到：
        <strong>在平面（或 n 维空间）里挑一个点</strong>。
      </p>
      <p>
        现在的问题是：<strong>在"所有连接 A 与 B 的曲线"里挑一条</strong>。
        这个候选集合<em>无穷维</em>——一条曲线要用无穷多个数才描述得清。
        <strong>"令导数为零"这句话，在这里连"对谁求导"都说不清楚。</strong>
      </p>
      <p>
        而且这不是一道孤立的智力题。同一种问法支配着物理学的半壁江山：
        <strong>肥皂膜为什么取那个形状</strong>（面积最小）、
        <strong>光走哪条路</strong>（<router-link to="/calculus/extremum">费马原理</router-link>，
        时间最短）、<strong>行星怎么运行</strong>（作用量最小）、
        <strong>铁链怎么垂</strong>（<router-link to="/calculus/ode">悬链线</router-link>，
        重心最低）。<strong>它们都在问：从一整族形状里，自然挑中了哪一个？</strong>
      </p>
    </div>

    <h2><span class="sec-no">贰</span>破局：两条路——伯努利的类比，与欧拉的方程</h2>
    <h3>路一：约翰·伯努利的光学类比（1697）</h3>
    <p>
      伯努利自己的解法极其聪明，而且<strong>本课的读者已经具备全部工具</strong>。
      他的想法是：<strong>这道题和光的折射是同一道题。</strong>
    </p>
    <p>
      能量守恒给出小球在下落深度 y 处的速率：
      <MathInline tex="\tfrac12 mv^2 = mgy \Rightarrow v=\sqrt{2gy}" />
      ——<strong>速率只取决于当前深度</strong>。
      现在把介质想成<strong>一层层水平的薄片</strong>，第 k 层里的"光速"就是
      <MathInline tex="\sqrt{2gy_k}" />。
      <router-link to="/calculus/extremum">费马原理那一节</router-link>已经证明：
      光在分层介质里走最快路径时，每一层的入射角满足
    </p>
    <MathBlock tex="\frac{\sin\theta}{v} = \text{常数}" />
    <p>
      （那里是救生员在沙滩与水之间的最优上岸点，推出了斯涅尔定律。）
      把 <MathInline tex="v=\sqrt{2gy}" /> 代进去，
      再用 <MathInline tex="\sin\theta = 1/\sqrt{1+y'^2}" />（θ 是切线与竖直方向的夹角）：
    </p>
    <MathBlock tex="\frac{1}{\sqrt{2gy}\,\sqrt{1+y'^2}} = \text{常数} \quad\Longleftrightarrow\quad y\,(1+y'^2) = C" />
    <p>
      <strong>这就是最速降线的微分方程</strong>，而它的解正是摆线
      （代入验证见折叠框）。<strong>伯努利把一个无穷维的挑选问题，
      翻译成了一条一阶微分方程</strong>——用的全是本课已有的东西：
      能量守恒、费马原理、<router-link to="/calculus/ode">解微分方程</router-link>。
    </p>
    <h3>路二：欧拉-拉格朗日方程（1744 / 1755）——把它变成一门方法</h3>
    <p>
      伯努利那招漂亮，但<strong>只对这一道题管用</strong>（换个泛函就没有光学类比了）。
      真正的突破在半个世纪后：欧拉（1744）与拉格朗日（1755，当时 19 岁）
      给出了<strong>通用</strong>的办法。
    </p>
    <p>
      要最小化的对象长这样——它吃进一整条曲线，吐出一个数，叫<strong>泛函</strong>：
    </p>
    <MathBlock tex="J[y] = \int_{a}^{b} F\bigl(x,\ y(x),\ y'(x)\bigr)\,\mathrm{d}x" />
    <p>
      （最速降线里 <MathInline tex="F=\sqrt{(1+y'^2)/(2gy)}" />；
      弧长里 <MathInline tex="F=\sqrt{1+y'^2}" />；面积、能量都能写成这个形状。）
    </p>
    <p>
      <strong>关键的一招叫"变分"</strong>：既然没法对"一条曲线"求导，
      那就<strong>把无穷维压回一维</strong>——在候选曲线 y 上叠加一个<strong>任意的小扰动</strong>
      <MathInline tex="\eta(x)" />（两端固定为零，因为端点不许动），
      考察<strong>一族</strong>曲线 <MathInline tex="y+\epsilon\eta" />。
      于是 <MathInline tex="J[y+\epsilon\eta]" /> 变成了<strong>关于一个数
      <MathInline tex="\epsilon" /> 的普通函数</strong>！
      <strong>y 是最优的，必须意味着 <MathInline tex="\epsilon=0" /> 是这个普通函数的驻点</strong>
      ——<router-link to="/calculus/extremum">费马定理</router-link>照搬。
    </p>
    <p>
      <strong>叁节的动画演的就是这一步</strong>：它把一整族曲线压缩成一个滑杆
      （<MathInline tex="s=0" /> 是直线，<MathInline tex="s=1" /> 是摆线），
      于是"从无穷多条曲线里挑一条"变成了"在一根滑杆上找最低点"。
    </p>
    <QuizBox
      quiz-id="variational-q1"
      question="变分法的核心手法是什么？"
      hint="没法对「一条曲线」求导，那就想办法把候选集合从无穷维压成一维。怎么压？"
      :options="[
        { t: '给候选曲线叠加一个任意小扰动 $\\epsilon\\eta(x)$，把泛函变成关于数 $\\epsilon$ 的普通函数，再令 $\\epsilon=0$ 处导数为零', why: '对。这一招把无穷维问题压回一维，从而可以照搬费马定理。而「$\\eta$ 任意」这个条件在最后一步至关重要：正因为对任何扰动都成立，才能得出被积式必须逐点为零（欧拉-拉格朗日方程）。' },
        { t: '把曲线离散成 n 个点，对 n 个变量求偏导，再令 n→∞', why: '这是个可行的近似思路（今天的有限元法就是这么干的），欧拉最初也用过折线逼近。但它作为<b>推导</b>不干净——极限的合法性要另证。拉格朗日的变分法绕开了离散化，直接在函数空间里做。' },
        { t: '猜出答案的形状，再代进去验证', why: '那是验算不是方法。伯努利的光学类比虽然巧，也只对这一道题管用；欧拉-拉格朗日方程的价值正在于它<b>不需要猜</b>。' },
      ]"
      :answer="0"
    />

    <h2><span class="sec-no">叁</span>亲手把一族滑道试一遍</h2>
    <p>
      下面的动画把"所有曲线"这个无穷维的候选集合，压成了<strong>一根滑杆</strong>：
      <MathInline tex="s=0" /> 是直线，<MathInline tex="s=1" /> 恰好是摆线，
      中间是两者的混合。拖动它，读数区当场给出小球的<strong>下滑用时</strong>。
    </p>
    <p>
      三个"照着做一遍"会依次让你看到：<strong>直线确实不是最快的</strong>（慢 20%）、
      <strong>最优点附近极其平坦</strong>（形状偏 10%，用时只多 0.07%）、
      以及<strong>过了头也会变慢</strong>——摆线是个真正的极小。
    </p>
    <BrachistochroneDemo />

    <h2><span class="sec-no">肆</span>严格定义：欧拉-拉格朗日方程</h2>
    <div class="definition">
      <div class="def-title">📐 欧拉-拉格朗日方程</div>
      <p>
        若 <MathInline tex="y(x)" /> 使泛函
        <MathInline tex="J[y]=\int_a^b F(x,y,y')\,\mathrm{d}x" /> 取到极值
        （端点值固定），则 y 必须满足
      </p>
      <MathBlock tex="\frac{\partial F}{\partial y} - \frac{\mathrm{d}}{\mathrm{d}x}\Bigl(\frac{\partial F}{\partial y'}\Bigr) = 0" />
    </div>
    <p>
      <strong>这条方程是"令导数为零"的无穷维版本</strong>：左边那一坨叫
      <em>变分导数</em>，它扮演的角色正是单变量里的
      <MathInline tex="f'(x)" />。<strong>解一个"挑曲线"的问题，
      于是变成了解一个<router-link to="/calculus/ode">微分方程</router-link></strong>——
      注意方程里出现了 <MathInline tex="y'" /> 的导数，所以一般是<strong>二阶</strong>的，
      恰好需要两个条件，而两个端点正好提供。
    </p>
    <RevealBox title="🔍 欧拉-拉格朗日方程是怎么推出来的：一次分部积分" label="对答案 / 看完整拆解">
      <template #hint>
        写出 <MathInline tex="g(\epsilon)=J[y+\epsilon\eta]" />，
        对 <MathInline tex="\epsilon" /> 求导并令 <MathInline tex="\epsilon=0" />。
        你会得到一个含 <MathInline tex="\eta" /> 和 <MathInline tex="\eta'" /> 的积分。
        想一想：<strong>怎么把 <MathInline tex="\eta'" /> 那一项也变成含 <MathInline tex="\eta" /> 的</strong>？
        （提示：<router-link to="/calculus/integration-methods">分部积分</router-link>，
        而且端点上 <MathInline tex="\eta=0" />。）
      </template>
      <p>
        <strong>第一步：压成一维再求导。</strong>取任意光滑扰动
        <MathInline tex="\eta" />，满足 <MathInline tex="\eta(a)=\eta(b)=0" />（端点不许动）：
      </p>
      <MathBlock tex="g(\epsilon) = \int_a^b F\bigl(x,\ y+\epsilon\eta,\ y'+\epsilon\eta'\bigr)\mathrm{d}x" />
      <p>
        对 <MathInline tex="\epsilon" /> 求导（求导与积分交换次序，
        再用<router-link to="/calculus/chain-rule">链式法则</router-link>），
        在 <MathInline tex="\epsilon=0" /> 处：
      </p>
      <MathBlock tex="g'(0) = \int_a^b\Bigl(\frac{\partial F}{\partial y}\,\eta + \frac{\partial F}{\partial y'}\,\eta'\Bigr)\mathrm{d}x = 0" />
      <p>
        <strong>第二步：把 <MathInline tex="\eta'" /> 消掉。</strong>
        对第二项用<router-link to="/calculus/integration-methods">分部积分</router-link>
        （把导数从 <MathInline tex="\eta" /> 转移到另一个因子上）：
      </p>
      <MathBlock tex="\int_a^b \frac{\partial F}{\partial y'}\eta'\,\mathrm{d}x = \Bigl[\frac{\partial F}{\partial y'}\eta\Bigr]_a^b - \int_a^b \frac{\mathrm{d}}{\mathrm{d}x}\Bigl(\frac{\partial F}{\partial y'}\Bigr)\eta\,\mathrm{d}x" />
      <p>
        <strong>边界项当场消失</strong>——因为 <MathInline tex="\eta(a)=\eta(b)=0" />。
        （<router-link to="/calculus/integration-methods">那一讲</router-link>说过
        "边界项不能丢"，这里正是它<em>被条件杀死</em>的典型场合，
        和<router-link to="/mathphys/separation">数理方程证正交性</router-link>时如出一辙。）
      </p>
      <p><strong>第三步：合并。</strong>于是对<em>一切</em>这样的 <MathInline tex="\eta" />，</p>
      <MathBlock tex="\int_a^b\Bigl[\frac{\partial F}{\partial y} - \frac{\mathrm{d}}{\mathrm{d}x}\Bigl(\frac{\partial F}{\partial y'}\Bigr)\Bigr]\eta(x)\,\mathrm{d}x = 0" />
      <p>
        <strong>第四步：从"积分为零"到"被积式为零"。</strong>
        这一步叫<strong>变分法基本引理</strong>，值得说清楚，因为它是全推导唯一有技术含量的地方：
        若一个连续函数 <MathInline tex="M(x)" /> 与<em>所有</em>这样的 <MathInline tex="\eta" />
        相乘后积分都为零，则 <MathInline tex="M\equiv 0" />。
        <strong>理由是反证</strong>：假若某点 <MathInline tex="M(x_0)>0" />，
        由连续性它在一个小区间上都为正；<strong>那就专门挑一个只在这个小区间上鼓包、
        别处为零的 <MathInline tex="\eta" /></strong>，积分立刻为正——矛盾。
      </p>
      <p>
        <strong>回味："扰动任意"这个条件在这里一次付清。</strong>
        推导的每一步都很浅（求导、分部积分、反证），
        <strong>而它的产出是一条把无穷维极值问题变成微分方程的通用机器</strong>。
        顺带看一眼最速降线：
        <MathInline tex="F=\sqrt{(1+y'^2)/(2gy)}" /> 不显含 x，
        这种情形有个守恒量（贝尔特拉米恒等式）
        <MathInline tex="F - y'\,\partial F/\partial y' = \text{常数}" />，
        化简后正是贰节那条 <MathInline tex="y(1+y'^2)=C" />——
        <strong>与伯努利用光学类比得到的完全一致</strong>。
      </p>
    </RevealBox>
    <p>
      最后验一下摆线确实是解。取
      <MathInline tex="x=a(\theta-\sin\theta),\ y=a(1-\cos\theta)" />（这里 y 向下为正），则
    </p>
    <MathBlock tex="y' = \frac{\mathrm{d}y/\mathrm{d}\theta}{\mathrm{d}x/\mathrm{d}\theta} = \frac{\sin\theta}{1-\cos\theta} \;\Longrightarrow\; 1+y'^2 = \frac{2}{1-\cos\theta} \;\Longrightarrow\; y(1+y'^2) = 2a" />
    <p>
      <strong>常数，验证通过。</strong>（中间用到
      <MathInline tex="\sin^2\theta=(1-\cos\theta)(1+\cos\theta)" />。）
      而 demo 里那条摆线的参数就是这么解出来的：让它过
      <MathInline tex="B=(1,-0.6)" /> 定出 <MathInline tex="a=0.3006" />、
      <MathInline tex="\theta_B=3.2340" />，理论用时
      <MathInline tex="T=\theta_B\sqrt{a/g}=0.566432" /> 秒——
      <strong>与动画读数在小数点后六位上一致</strong>。
    </p>
    <QuizBox
      quiz-id="variational-q2"
      question="推导欧拉-拉格朗日方程时，分部积分产生的边界项 $[\,\partial F/\partial y'\cdot\eta\,]_a^b$ 为什么可以扔掉？"
      hint="扰动 η 是任意的，但有一个限制。这个限制是从哪来的？"
      :options="[
        { t: '因为端点固定，所有候选曲线都必须过 A 和 B，所以扰动在两端必须为零', why: '对——这不是数学上的方便，而是问题本身的约束（滑道两头钉死）。反过来说：如果端点<b>不固定</b>（比如「滑到那条竖直线上任意一点即可」），边界项就不能扔，令它为零会给出额外的条件，叫<b>自然边界条件</b>——这正是变分法处理自由端点问题的方式。' },
        { t: '因为 $\\partial F/\\partial y^{\\prime}$ 在端点处总是零', why: '毫无理由——它是 F 对 $y^{\\prime}$ 的偏导数，在端点通常不为零。真正为零的是 $\\eta(a)$ 与 $\\eta(b)$。' },
        { t: '因为边界项是高阶小量，取极限时自动消失', why: '它一点也不小：$\\eta$ 本身是有限大小的函数。它之所以消失，纯粹是因为被端点条件<b>钉死为零</b>。' },
      ]"
      :answer="0"
    />

    <h2><span class="sec-no">伍</span>买到了什么：物理学后来用这一招重写了一遍</h2>

    <h3>最小作用量：从"力推着走"到"路径被选中"</h3>
    <p>
      <strong>画面。</strong>牛顿力学的世界观是<em>因果链</em>：此刻的力决定此刻的加速度，
      一步步推着物体走。可 1744 年之后，物理学有了另一种说法——
      <strong>物体从 A 到 B 的整条轨迹，是从所有可能的轨迹里被"挑"出来的那一条</strong>，
      挑选标准是一个叫<strong>作用量</strong>的数取极值。
    </p>
    <p>
      <strong>为什么绕道变分法。</strong>因为"从所有轨迹里挑一条"正是本讲的问法。
      定义拉格朗日量 <MathInline tex="L = T - V" />（动能减势能），作用量是
    </p>
    <MathBlock tex="S[q] = \int_{t_1}^{t_2} L\bigl(q,\ \dot q,\ t\bigr)\,\mathrm{d}t" />
    <p>
      <strong>推导：把欧拉-拉格朗日方程原样套上去</strong>，什么新东西都不需要：
    </p>
    <MathBlock tex="\frac{\partial L}{\partial q} - \frac{\mathrm{d}}{\mathrm{d}t}\Bigl(\frac{\partial L}{\partial \dot q}\Bigr) = 0" />
    <p>
      拿一维自由落体试试：<MathInline tex="T=\tfrac12 m\dot y^2" />、
      <MathInline tex="V=mgy" />，于是 <MathInline tex="L=\tfrac12m\dot y^2-mgy" />。
      代入：<MathInline tex="\partial L/\partial y = -mg" />，
      <MathInline tex="\partial L/\partial\dot y = m\dot y" />，方程给出
    </p>
    <MathBlock tex="-mg - \frac{\mathrm{d}}{\mathrm{d}t}(m\dot y) = 0 \quad\Longrightarrow\quad m\ddot y = -mg" />
    <p>
      <strong>牛顿第二定律，一字不差地掉了出来。</strong>
    </p>
    <p>
      <strong>读出物理：这不只是换个写法，它买到了三样东西。</strong>
    </p>
    <ul>
      <li>
        <strong>坐标随便挑。</strong>牛顿方程写在极坐标、球坐标里要重新推一遍受力分解，
        很容易出错；而 <MathInline tex="L=T-V" /> 是个<strong>标量</strong>，
        换坐标只需把 T、V 用新坐标写出来，方程形式<strong>一字不改</strong>。
        单摆、双摆、滚动的球——这套方法让它们变成机械化的计算。
      </li>
      <li>
        <strong>对称性直接换来守恒律。</strong>诺特定理（1918）：
        <strong>作用量在某个连续变换下不变，就必然对应一个守恒量</strong>——
        时间平移不变 ⇒ 能量守恒；空间平移不变 ⇒ 动量守恒；旋转不变 ⇒ 角动量守恒。
        <strong>这是二十世纪物理学最深刻的结论之一，而它只在变分的语言里说得出来。</strong>
      </li>
      <li>
        <strong>它能推广到牛顿力学之外。</strong>电磁场、广义相对论（爱因斯坦-希尔伯特作用量）、
        粒子物理的标准模型，全都是"写下一个作用量，再取变分"。
        <strong>今天写一个新理论，就是写一个新的 L。</strong>
      </li>
    </ul>
    <p>
      <strong>条件不成立会怎样。</strong>
      ① 变分只给<strong>驻点</strong>，不保证最小——所以严谨的名字是"<strong>稳定作用量原理</strong>"
      （和<router-link to="/calculus/extremum">费马原理那一节</router-link>说光程"取驻值"是同一件事）；
      ② 有摩擦、有耗散的系统写不出 <MathInline tex="L=T-V" />，
      这套框架<strong>直接不适用</strong>（要另作推广）；
      ③ 更深的一层：为什么自然界会"挑"路径？
      <strong>费恩曼 1948 年给出的答案是：它不挑</strong>——
      量子力学里粒子把所有路径都走了，只是在作用量驻定的那条附近<strong>相位一致、互相加强</strong>，
      别处互相抵消。<strong>经典的"最小作用量"是量子叠加的一个极限现象</strong>，
      而这个解释同样是<router-link to="/calculus/extremum">费马原理</router-link>那一节
      提过的那句"光并不选路"的完整版。
    </p>

    <h3>还有几件你见得到的东西</h3>
    <ul>
      <li>
        <strong>肥皂膜</strong>：表面张力让它取<strong>面积最小</strong>的形状，
        这是泛函 <MathInline tex="J=\iint\sqrt{1+u_x^2+u_y^2}\,\mathrm{d}A" /> 的极值问题，
        欧拉-拉格朗日方程给出<em>极小曲面方程</em>。两个圆环之间的肥皂膜是<strong>悬链面</strong>
        ——正是<router-link to="/calculus/ode">悬链线</router-link>绕轴旋转而成。
      </li>
      <li>
        <strong>大圆航线</strong>：球面上两点间最短路径（测地线）也是变分问题。
        飞北京到纽约要往北绕经北极圈附近，不是航空公司绕远，
        <strong>而是球面上"直"的意思就是这样</strong>。
        广义相对论把这一条搬到弯曲时空：<strong>行星绕日不是被力拉着，
        是在弯曲时空里走测地线</strong>——同一个变分原理。
      </li>
      <li>
        <strong>等时性的意外之喜</strong>：摆线还有一个惠更斯 1673 年发现的性质——
        沿摆线滑下，<strong>无论从哪一点静止释放，到达最低点的时间都相同</strong>。
        他据此设计过摆线摆钟，想解决海上经度测量的世纪难题
        （可惜摩擦让它不如普通摆钟实用）。
        <strong>最快与等时，两个性质落在同一条曲线上，是纯粹的巧合吗？
        ——不是，两者都源自 <MathInline tex="y(1+y'^2)=C" /> 这一条方程。</strong>
      </li>
    </ul>
    <div class="insight">
      <div class="insight-title">🔗 全课收尾：这十五讲连成了什么</div>
      <p>
        从<router-link to="/calculus/limit">第一讲</router-link>驯服"无穷"开始，
        本课造了两把刀（<router-link to="/calculus/derivative">导数</router-link>与
        <router-link to="/calculus/integral">积分</router-link>）、
        证明了它们<router-link to="/calculus/ftc">互为逆运算</router-link>、
        给两把刀都配上了<router-link to="/calculus/chain-rule">算法</router-link>与
        <router-link to="/calculus/integration-methods">技巧</router-link>，
        再用它们去量<router-link to="/calculus/arc-length">长度与体积</router-link>、
        <router-link to="/calculus/taylor">冒充函数</router-link>、
        <router-link to="/calculus/series">加无穷多项</router-link>、
        <router-link to="/calculus/ode">解世界的方程</router-link>、
        <router-link to="/calculus/gradient">在多维山地里找路</router-link>、
        <router-link to="/calculus/multiple-integral">换一套坐标</router-link>，
        又回头把地基<router-link to="/calculus/rigor">重浇了一遍</router-link>。
      </p>
      <p>
        而这最后一讲把"极值"这个念头推到了尽头：
        <strong>候选者从一个数、一个点，变成了一整条曲线、一整个场</strong>。
        <router-link to="/mathphys/pde-intro">数学物理方程</router-link>那门课里的三大方程，
        每一条都能从某个作用量的变分导出；
        <router-link to="/numerical/quadrature">数值分析</router-link>里的有限元法，
        做的正是"把无穷维的变分问题离散回有限维"。
        <strong>微积分从一根切线开始，最后成了描述整个物理世界的语法。</strong>
      </p>
    </div>
  </ConceptPage>
</template>
