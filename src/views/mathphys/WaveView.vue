<script setup>
import ConceptPage from '../../components/ConceptPage.vue'
import MathBlock from '../../components/MathBlock.vue'
import MathInline from '../../components/MathInline.vue'
import RevealBox from '../../components/RevealBox.vue'
import QuizBox from '../../components/QuizBox.vue'
import WaveDemo from '../../demos/WaveDemo.vue'
</script>

<template>
  <ConceptPage slug="wave">
    <h2><span class="sec-no">壹</span>困境：琴弦为什么会唱歌</h2>
    <p>
      弦乐器伴随人类几千年，毕达哥拉斯早就发现弦长减半音高八度。但"弦被拨动后<strong>究竟怎么动</strong>"，
      直到 18 世纪都没人能回答——因为回答它需要上一讲的全部装备：场、偏导数、以及"给连续体写运动定律"的胆量。
      1746 年，<strong>达朗贝尔</strong>迈出了这一步。我们放慢镜头把他的推导走一遍——
      <strong>这是历史上第一次有人从牛顿定律推出一个偏微分方程</strong>，值得逐帧观看。
    </p>
    <div class="story">
      <div class="story-title">📜 推导：对一小段弦用 F = ma</div>
      <p>
        取弦上 x 到 x+Δx 的一小段，横向位移 u(x,t)，弦中张力 T（拉紧程度），线密度 ρ（每米质量）。
        小段两端都被张力沿切线方向拉着。<strong>水平方向</strong>两端拉力近似抵消（小振动，弦不横跑）；
        <strong>竖直方向</strong>，每端拉力的竖直分量 ≈ T × 该端斜率（小角度时 sin ≈ tan = 斜率 = <MathInline tex="\partial u/\partial x" />）。
        于是竖直合力 = 右端拉力竖直分量 − 左端的 =
        <MathInline tex="T\left[u_x(x + \Delta x) - u_x(x)\right]" />。
        牛顿第二定律：合力 = 质量 × 加速度 = <MathInline tex="(\rho \Delta x) \cdot u_{tt}" />。
        两边除以 Δx、令 Δx → 0（左边正是 <MathInline tex="u_x" /> 的差商，取极限得 <MathInline tex="u_{xx}" />）：
      </p>
      <MathBlock tex="\rho\, u_{tt} = T\, u_{xx} \quad\Longrightarrow\quad u_{tt} = c^2 u_{xx}, \qquad c = \sqrt{T / \rho}" />
      <p>
        全程只用了牛顿第二定律和"斜率之差 ÷ 间隔 → 二阶导"。常数 c 有量纲、有内容：
        <strong>张力越大、弦越轻，c 越大</strong>——调紧琴弦音变高的原因已经写在里面了。
      </p>
    </div>
    <p>
      方程的直觉读法（上一讲预告过）：<strong>每一点的加速度 ∝ 该处弦形的弯曲度</strong>。
      直的地方不受力；凹的地方被两侧拽着往上加速，凸的地方往下——弦的每一小段都在"努力变直"，
      却因为惯性一次次冲过头。振动由此而来。
    </p>

    <h2><span class="sec-no">贰</span>破局：两个都对的答案，一场半世纪的争吵</h2>
    <p>方程写出来了，怎么解？两大阵营给出两种气质迥异的答案。</p>
    <p>
      <strong>达朗贝尔（1747）：换元的魔术。</strong>令
      <MathInline tex="\xi = x - ct" />、<MathInline tex="\eta = x + ct" />，方程化为
      <MathInline tex="\partial^2 u / \partial\xi\,\partial\eta = 0" />——它的解一眼可见：
    </p>
    <MathBlock tex="u(x, t) = f(x - ct) + g(x + ct)" />
    <p>
      <MathInline tex="f(x - ct)" /> 是"形状 f 以速度 c 向右平移"（t 增大时，同一个函数值出现在更大的
      x 处），g 同理向左。<strong>任何解都是一列右行波加一列左行波</strong>——波速 c 的含义至此落地。
    </p>
    <p>
      不过"方程化为 <MathInline tex="u_{\xi\eta} = 0" />"这一句是跳步的：
      凭什么这么换元、换完为什么会这么干净？其实只用链式法则，
      而且那个换元并不神秘——<MathInline tex="x - ct" /> 和 <MathInline tex="x + ct" />
      正是"跟着波一起跑"的两个坐标。下面这个框把它连同达朗贝尔公式一次推完：
    </p>
    <RevealBox
      title="🔍 换元为什么这么灵，以及达朗贝尔公式是怎么被逼出来的"
      label="对答案 / 看完整拆解"
    >
      <template #hint>
        先自己动笔：令 <MathInline tex="\xi = x - ct" />、<MathInline tex="\eta = x + ct" />，
        用链式法则写出 <MathInline tex="u_x" /> 和 <MathInline tex="u_t" />
        （注意对 t 求导时会掉出 <MathInline tex="\mp c" />）。再各求一次导得
        <MathInline tex="u_{xx}" />、<MathInline tex="u_{tt}" />，
        然后算 <MathInline tex="u_{tt} - c^2 u_{xx}" />——看看哪几项活到了最后。
      </template>
      <p>
        <strong>第一步：两个新坐标是什么意思。</strong>
        <MathInline tex="\xi = x - ct" /> 对一个以速度 c 向右跑的观察者是<strong>不变的</strong>
        （他的位置 <MathInline tex="x = x_0 + ct" />，代进去 <MathInline tex="\xi \equiv x_0" />）。
        同理 <MathInline tex="\eta" /> 对向左跑的观察者不变。
        换元不是凑出来的技巧，是<strong>换了两个跟着波跑的坐标</strong>。
      </p>
      <p><strong>第二步：链式法则。</strong>因为 <MathInline tex="\xi_x = \eta_x = 1" />、<MathInline tex="\xi_t = -c,\ \eta_t = c" />：</p>
      <MathBlock tex="u_x = u_\xi + u_\eta, \qquad u_t = c\,(u_\eta - u_\xi)" />
      <p>再各求一次（注意 <MathInline tex="u_\xi" /> 本身仍是 ξ、η 的函数，要再用一次链式法则）：</p>
      <MathBlock tex="u_{xx} = u_{\xi\xi} + 2u_{\xi\eta} + u_{\eta\eta}, \qquad u_{tt} = c^2\bigl(u_{\xi\xi} - 2u_{\xi\eta} + u_{\eta\eta}\bigr)" />
      <p>
        <strong>第三步：一减，只剩一项。</strong>两式相减时
        <MathInline tex="u_{\xi\xi}" /> 和 <MathInline tex="u_{\eta\eta}" /> 成对消掉，
        中间项的符号却相反，于是不但不消、还翻了一倍：
      </p>
      <MathBlock tex="u_{tt} - c^2 u_{xx} = -4c^2\, u_{\xi\eta}" />
      <p>
        所以 <MathInline tex="u_{tt} = c^2u_{xx}" /> 与 <MathInline tex="u_{\xi\eta} = 0" />
        是<strong>同一句话</strong>。魔术的机械部分就是那两个符号相反的中间项。
      </p>
      <p>
        <strong>第四步：解它。</strong><MathInline tex="\partial_\eta(u_\xi) = 0" /> 说的是
        <MathInline tex="u_\xi" /> 不含 η，所以 <MathInline tex="u_\xi = F(\xi)" />；
        再对 ξ 积分，积分"常数"可以是 η 的任意函数：
        <MathInline tex="u = f(\xi) + g(\eta)" />。两个任意函数，正对应方程是二阶的。
      </p>
      <p>
        <strong>第五步：用初始条件把 f、g 钉死</strong>（这就是达朗贝尔公式的来历）。
        设初始形状 <MathInline tex="u(x,0) = \varphi(x)" />、初速
        <MathInline tex="u_t(x,0) = \psi(x)" />：
      </p>
      <MathBlock tex="f(x) + g(x) = \varphi(x), \qquad c\bigl(g'(x) - f'(x)\bigr) = \psi(x)" />
      <p>第二式积分得 <MathInline tex="g(x) - f(x) = \frac{1}{c}\int_0^x \psi + K" />，与第一式联立：</p>
      <MathBlock tex="f(x) = \frac{\varphi(x)}{2} - \frac{1}{2c}\int_0^x\! \psi - \frac{K}{2}, \qquad g(x) = \frac{\varphi(x)}{2} + \frac{1}{2c}\int_0^x\! \psi + \frac{K}{2}" />
      <p>
        代回 <MathInline tex="u = f(x-ct) + g(x+ct)" />，常数 K 自相抵消，两个积分并成一个：
      </p>
      <MathBlock tex="u(x,t) = \frac{\varphi(x - ct) + \varphi(x + ct)}{2} + \frac{1}{2c}\int_{x-ct}^{x+ct}\!\psi(s)\,ds" />
      <p>
        <strong>回味</strong>：这是本课少有的、能写出<strong>显式解</strong>的场合——
        给什么初始条件，答案当场就有，不需要级数也不需要数值。
        下一讲的热方程就没这个待遇了，那也正是傅里叶非出场不可的原因。
      </p>
    </RevealBox>
    <p>
      <strong>丹尼尔·伯努利（1753）：音乐家的答案。</strong>他从泛音出发主张：弦的任何振动都是
      <strong>驻波</strong>的叠加——形如 <MathInline tex="\sin\frac{n\pi x}{L}\cos\frac{n\pi c t}{L}" />
      的"原地站桩"模式：波形不跑，只是整体幅度按各自的频率伸缩。
      第 n 个模式有 n−1 个<strong>节点</strong>（始终不动的点），频率是基频的 n 倍。
      这一串整数倍频率就叫<strong>泛音列</strong>——它是同一根弦能同时发出的所有音的清单，
      也是你能分辨小提琴和长笛奏同一个音的原因（基频相同，泛音配比不同）。
      吉他上"在弦长一半处轻轻一搭再拨"能得到高八度的清亮音，
      就是把基频那一档掐死、只留下节点落在那里的偶数号模式。
    </p>
    <div class="insight">
      <div class="insight-title">💡 核心直觉：叠加原理——线性方程的超能力</div>
      <p>
        两个答案都靠同一根支柱：方程是<strong>线性</strong>的——u、v 是解，则 au + bv 也是解
        （代入即验，求导对加法分配）。这就是<strong>叠加原理</strong>，
        <router-link to="/linear-algebra/vector-space">向量空间讲</router-link>"齐次方程的解集是向量空间"的物理版。
        伯努利的主张于是变成一个纯数学问题：<strong>驻波模式们能"张成"所有可能的初始形状吗？</strong>
        欧拉、拉格朗日激烈反对：拨弦的初始形状是带尖角的折线，一堆光滑正弦怎么加得出尖角？
        这场架从 1753 年吵到世纪末，谁也说服不了谁——胜负要等<router-link
          to="/mathphys/heat"
          >下一讲</router-link
        >的傅里叶来判。
      </p>
    </div>

    <QuizBox
      quiz-id="wave-q1"
      question="达朗贝尔和伯努利给出了两个长得完全不同的答案，欧拉、拉格朗日为此跟伯努利吵了半个世纪。这场架的争点究竟是什么？"
      hint="两个答案本身都被验证过是对的。想想伯努利多主张了一件达朗贝尔没主张的事——他说「任何」振动都是驻波的叠加，这个「任何」有多大胆？"
      :options="[
        { t: '一堆光滑的正弦函数叠加起来，能不能得出拨弦时那种带尖角的折线', why: '对：这是纯数学问题，不是物理问题。伯努利的「任何振动都是驻波叠加」等于宣称正弦族能张成所有初始形状；欧拉、拉格朗日觉得光滑的东西加不出尖角。胜负要等傅里叶。' },
        { t: '波速 c 到底等于多少', why: '这不是争点。c 由弦的张力和线密度定死（$c = \\sqrt{T/\\rho}$），两派都不怀疑；伍节那把吉他就是把这个式子拧了一遍。' },
        { t: '达朗贝尔那个换元合不合法', why: '换元只是链式法则的机械应用，折叠框里四步就推完了，没人质疑过它。真正惹争议的是伯努利那一边多出来的那句「任何」。' },
        { t: '波动方程到底是不是线性的', why: '你把两派的共同支柱当成了分歧。线性（因而叠加原理成立）恰恰是两个答案都依赖的前提——达朗贝尔的左行波加右行波、伯努利的驻波叠加，都是在用它。' },
      ]"
      :answer="0"
    />

    <h2><span class="sec-no">叁</span>亲手切换两种视角</h2>
    <WaveDemo />

    <h2><span class="sec-no">肆</span>严格定义</h2>
    <div class="definition">
      <div class="def-title">📐 定解问题（两端固定弦的振动）与达朗贝尔公式</div>
      <MathBlock tex="\begin{cases} u_{tt} = c^2 u_{xx}, & 0 < x < L,\ t > 0 \\ u(0, t) = u(L, t) = 0 & \text{（边界：两端钉死）} \\ u(x, 0) = \varphi(x),\quad u_t(x, 0) = \psi(x) & \text{（初始：形状与速度）} \end{cases}" />
      <p>无界弦（不考虑端点）时解有显式公式（达朗贝尔 1747）：</p>
      <MathBlock tex="u(x,t) = \frac{\varphi(x - ct) + \varphi(x + ct)}{2} + \frac{1}{2c} \int_{x - ct}^{x + ct} \psi(s)\, ds" />
    </div>
    <p>拆读：</p>
    <ul>
      <li>
        <strong>为什么要两个初始条件</strong>：方程对 t 二阶——如同抛物运动需要初位置和初速度。
        只给形状不给速度，"往哪边开始动"就没定；
      </li>
      <li>
        <strong>达朗贝尔公式的读法</strong>：初始形状劈成两半各自跑（动画所见），初速度的贡献是一段积分——
        注意积分限：<strong>u(x,t) 只依赖初始数据在区间 [x−ct, x+ct] 里的值</strong>。
        换句话说：扰动传播不超过速度 c，此刻影响你的只有"过去光锥"内的事——
        这个结构在相对论里原样重现（把 c 换成光速）；
      </li>
      <li>
        <strong>能量守恒</strong>：定义 <MathInline tex="E(t) = \frac12\int_0^L (\rho u_t^2 + T u_x^2)\,dx" />
        （动能 + 弹性势能），可以证明 <MathInline tex="E'(t) = 0" />——弦永远荡下去（理想无阻尼）。
        下一讲的热方程将在同一测试下给出完全相反的答案，请留意这个对照。
      </li>
    </ul>
    <p>
      最后那条"对 t 求导、用方程化简"只有四行，而且它是本课<strong>反复要用的一个套路</strong>
      （能量法：不解方程，只盯着一个积分量的升降）。值得亲手走一遍：
    </p>
    <RevealBox
      title="🔍 四行证明弦永远荡下去，而且看清边界条件在哪一步救了场"
      label="对答案 / 看完整拆解"
    >
      <template #hint>
        先自己动笔：对 <MathInline tex="E(t)" /> 求导，被积式会出现
        <MathInline tex="u_x u_{xt}" /> 这一项——它里头混着对 x 和对 t 的导数，很碍事。
        想想<strong>分部积分</strong>能不能把它变成对 x 的二阶导；
        再想想分部积分留下的那个边界项，为什么恰好是零。
      </template>
      <p><strong>第一步：求导挪进积分号。</strong></p>
      <MathBlock tex="E'(t) = \int_0^L \bigl(\rho\, u_t u_{tt} + T\, u_x u_{xt}\bigr)\,dx" />
      <p>
        <strong>第二步：把碍事的那项分部积分。</strong>
        注意 <MathInline tex="u_{xt} = (u_t)_x" />，于是第二项是
        <MathInline tex="\int T u_x (u_t)_x dx" />，正好是分部积分的标准形状：
      </p>
      <MathBlock tex="\int_0^L T u_x (u_t)_x\, dx = \Bigl[T u_x u_t\Bigr]_0^L - \int_0^L T u_{xx} u_t\, dx" />
      <p>
        <strong>第三步：边界项为零——这是边界条件唯一出场的地方。</strong>
        两端钉死意味着 <MathInline tex="u(0,t) = u(L,t) = 0" /> 对<strong>所有</strong> t 成立，
        既然端点的位移恒等于 0，它的时间导数当然也是 0：<MathInline tex="u_t(0,t) = u_t(L,t) = 0" />。
        中括号那一项于是整个消失。
        （<strong>反过来读这一步很有价值</strong>：要是端点没钉死、而是被人拿着上下抖，
        这一项就不为零——那正是"外界在对弦做功"，能量当然不守恒。
        边界条件不是形式主义，它就是"能量能不能进出"这件事。）
      </p>
      <p><strong>第四步：方程收工。</strong>剩下的两项合并，提出公因子 <MathInline tex="u_t" />：</p>
      <MathBlock tex="E'(t) = \int_0^L u_t\,\bigl(\rho\, u_{tt} - T\, u_{xx}\bigr)\,dx = \int_0^L u_t \cdot 0\, dx = 0" />
      <p>
        因为括号里正是方程本身（<MathInline tex="\rho u_{tt} = T u_{xx}" />）。
        <strong>E 是个常数，弦一旦拨响就永远荡下去。</strong>
      </p>
      <p>
        现实里琴声当然会停——那是因为真实的弦有内摩擦、还要把能量交给空气和琴箱
        （<strong>正是这份"损耗"让你听得见声音</strong>：能量若真守恒，弦振动就一点也传不出来）。
        方程里补一项阻尼 <MathInline tex="\gamma u_t" /> 就能描述它，
        那时上面第四步的括号不再为零，<MathInline tex="E'(t) < 0" />。
        <router-link to="/complex/residue">复变第 4 讲</router-link>那个"敲一下钟"的例子算的正是这种带阻尼的情形，
        算出来的余音包络 <MathInline tex="e^{-\gamma t/2}" /> 就是这里 E 在往下掉。
      </p>
    </RevealBox>

    <QuizBox
      quiz-id="wave-q2"
      question="达朗贝尔公式里那个积分的上下限是 $x-ct$ 到 $x+ct$。这个细节在说什么？"
      hint="问自己一句：如果我改动初始形状上一个离 x 很远的点，此刻的 u(x, t) 会不会跟着变？远到多远就不会了？"
      :options="[
        { t: '此刻此地的值只由初始数据在这一段上的取值决定——扰动传播的速度不超过 c', why: '对：这一段之外的初始数据，无论怎么改，都影响不到 $u(x,t)$。换句话说此刻影响你的只有「过去光锥」内的事——同一个结构在相对论里原样重现，只是把 c 换成光速。' },
        { t: '解只在这一段区间上有定义，区间外没有解', why: '你把「依赖区域」当成了「定义域」。$u(x,t)$ 对所有 x 都有定义、都算得出来；积分限说的是算它时要用到哪一段初始数据，不是它自己活在哪儿。' },
        { t: '波在 t 时刻只走到了 $x \\pm ct$，这段之外的初始形状已经消失了', why: '你把「影响不到」当成了「消失了」。初始形状哪儿也没去——它劈成两半各自以速度 c 往两边跑，此刻正在别处。只是它还没跑到 x 这儿来。' },
        { t: '这样取积分限才能保证积分收敛', why: '跟收敛没有关系。初速度 $\\psi$ 是连续函数，在任何有限区间上积分都收敛，换成别的有限限也照样收敛——只是那样算出来的就不是解了。' },
      ]"
      :answer="0"
    />

    <h2><span class="sec-no">伍</span>买到了什么：从琴房到光</h2>

    <h3>一把吉他：公式里那三个字母，就是琴上那三个旋钮</h3>
    <p>
      两端固定的弦，基频（也就是你听到的那个音高）是
    </p>
    <MathBlock tex="f_1 = \frac{c}{2L} = \frac{1}{2L}\sqrt{\frac{T}{\rho}}" />
    <p>
      右边只有三个字母，而<strong>吉他上恰好只有三种改变音高的办法</strong>，一一对应，
      没有第四种。这不是巧合——这一节就是把这条公式在一把真吉他上拧一遍，
      数字全部现算，你可以拿手边的琴对。
    </p>
    <p>
      <strong>旋钮一：<MathInline tex="L" />，按品。</strong>手指按在品丝上，
      等于把振动段截短。第 12 品正好在弦长的一半处，
      <MathInline tex="L" /> 减半、频率翻倍——<strong>高八度</strong>。
      毕达哥拉斯两千五百年前就发现的"弦长减半音高八度"，
      在这条公式里只是 <MathInline tex="L" /> 在分母上。
      而相邻两品的频率比是十二平均律的
      <MathInline tex="2^{1/12} \approx 1.05946" />，
      所以品丝的间距越往高音越密——它们是按等比数列排的，不是等距。
    </p>
    <p>
      <strong>旋钮二：<MathInline tex="T" />，拧弦钮。</strong>调音就是改张力。
      注意公式里是<strong>平方根</strong>，所以张力的效果比你想象的迟钝：
      想把音升高一个半音（频率 ×1.05946），张力要乘
      <MathInline tex="1.05946^2 \approx 1.1225" />，也就是<strong>多拧出 12% 的力</strong>。
      顺手算一下这力有多大：高音 E 弦（<MathInline tex="f_1 = 329.63" /> Hz）
      的有效弦长约 <MathInline tex="L = 0.648" /> 米，
      弦是直径 0.254 毫米（0.010 英寸，高音 E 弦的标准规格）的钢丝（钢的密度 7850 kg/m³，所以线密度
      <MathInline tex="\rho = \pi (d/2)^2 \times 7850 \approx 3.98\times10^{-4}" /> kg/m）。
      先由公式反推波速，再反推张力：
    </p>
    <MathBlock tex="c = 2Lf_1 \approx 427\ \text{m/s}, \qquad T = \rho c^2 \approx 72.6\ \text{N} \approx 7.4\ \text{kgf}" />
    <p>
      一根细得几乎看不见的钢丝，绷着<strong>七公斤半</strong>；六根加起来四十多公斤，
      长年累月挂在那块木头上。吉他为什么必须有加固的琴颈、
      为什么长时间不弹要松弦，答案就是这个数。
      （顺带一提：波速 427 m/s 比空气中的声速还快——但那是<strong>横波在弦上跑</strong>的速度，
      跟它发出的声音在空气里传播的速度是两回事，别弄混。）
    </p>
    <p>
      <strong>旋钮三：<MathInline tex="\rho" />，换弦。</strong>这一条最有意思，
      因为它能解释一个人人见过、却没人想过为什么的现象：
      <strong>为什么低音弦是缠绕的，而高音弦是光的？</strong>
      最低的 E 弦比最高的 E 弦低两个八度，频率只有 1/4。
      弦长一样、张力也不能差太多（否则琴颈受力不均），
      那就只能靠 <MathInline tex="\rho" />——而公式里 <MathInline tex="\rho" /> 开了平方根，
      所以线密度要变成 <strong>16 倍</strong>，实心钢丝的直径就得变成 4 倍，约 1 毫米。
    </p>
    <p>
      一根 1 毫米的实心钢丝有多硬？<strong>它已经不是弦，是铁丝了</strong>——
      按都按不下去，而且它自身的抗弯刚度会严重破坏本讲的整个推导
      （第壹节那步"拉力只沿切线方向"就不成立了）。
      所以真实的低音弦换了个做法：<strong>细芯外面缠一圈软金属</strong>。
      缠绕只增加质量，几乎不增加刚度——<MathInline tex="\rho" /> 上去了，
      弦还是软的。你手里那根粗糙的、缠着丝的低音弦，
      是这条公式和"弦必须软"这个前提谈判出来的产物。
    </p>
    <div class="insight">
      <div class="insight-title">💡 反过来读：这条公式在哪儿会失灵</div>
      <p>
        本讲第壹节的推导用了两处近似，它们各自对应一个真实可听的现象：
      </p>
      <p>
        <strong>① 小振动（<MathInline tex="\sin\theta \approx \tan\theta = u_x" />）。</strong>
        用力猛拨时弦被拉长，张力瞬间变大，音高会<strong>先偏高再落回来</strong>。
        弹吉他的人都知道大力扫弦的一瞬间音是"冲"的，
        电吉他手甚至专门利用它。这不是琴不准，是方程的前提被你拨破了。
      </p>
      <p>
        <strong>② 弦完全柔软（不计抗弯刚度）。</strong>真实的弦有一点硬度，
        高次泛音会被它顶得<strong>略高于</strong>整数倍频率，这叫<strong>非谐性</strong>。
        钢琴的弦又粗又短（尤其立式钢琴），非谐性明显，
        于是调音师会故意把高音区调得比理论值更高、低音区更低——
        这叫<strong>拉伸调音</strong>，是全世界钢琴调律的标准做法。
        <strong>一台按"正确"频率调的钢琴，听起来反而是走音的</strong>；
        而这份偏差的根源，就是本讲第壹节被丢掉的那一项。
      </p>
    </div>

    <QuizBox
      quiz-id="wave-q3"
      question="上面算出高音 E 弦上的波速约 427 m/s，比空气中的声速（约 340 m/s）还快。这件事说明了什么？"
      hint="先分清两样东西：在弦上跑来跑去的是什么，传到你耳朵里的又是什么。它们走的是同一种介质吗？"
      :options="[
        { t: '什么也不说明——427 m/s 是横波沿着钢丝跑的速度，跟声音在空气里传播是两码事', why: '对：波速由介质定，$c = \\sqrt{T/\\rho}$ 里的 T 和 ρ 都是这根钢丝的属性。弦振动带动空气产生声波之后，声波在空气里仍以约 340 m/s 传播。' },
        { t: '说明吉他的声音传到听众耳朵里比一般的声音快', why: '你把弦上的波速当成了声音传播的速度。听众听到的是空气里的声波，速度只跟空气有关（温度、湿度），跟弦绷得多紧毫无关系——不然调一下音就能让声音先到了。' },
        { t: '说明算错了，波速不可能超过声速', why: '你把空气的声速当成了普适上限。它只是空气这一种介质的性质而已；同样是声波，在钢里跑的纵波有 5000 m/s 量级，在水里也有 1500 m/s。' },
        { t: '说明弦振动时会产生音爆', why: '音爆是物体在空气中运动得比空气声速还快时产生的。这里跑得快的是弦上的横波形状，它压根不在空气里跑；弦上每一点自己的横向运动速度，则比这慢好几个数量级。' },
      ]"
      :answer="0"
    />

    <h3>还买到了什么</h3>
    <ul>
      <li>
        <strong>音色是泛音的配比，而配比由拨弦位置决定</strong>：
        在弦长 1/5 处拨，第 5 号泛音的节点正好在你手指下面，它<strong>根本被拨不起来</strong>，
        于是音色里就缺了这一档。上面动画的读数区已经把这件事演了一半——
        鼓包打在正中央，2、4 号模式的系数是 0，因为正中央正是它们的节点。
        古典吉他靠近琴桥拨（亮、泛音多）还是靠近音孔拨（暖、泛音少），
        调的就是这张配比表。<router-link to="/mathphys/separation">第 5 讲</router-link>把系数算了出来——
        结论是 <MathInline tex="b_n \\propto \\sin(n\\pi p)/n^2" />，在 <MathInline tex="x = 1/k" /> 处拨，
        第 k、2k、3k… 号泛音全部缺席；
      </li>
      <li>
        <strong>同一方程满宇宙</strong>：声波（空气密度的 u）、水波、电磁波。
        麦克斯韦 1865 年从他那组方程推出 E、B 各自满足三维波动方程，
        而波速<strong>不是量出来的，是从两个电磁学常数算出来的</strong>：
        <MathInline tex="c = 1/\sqrt{\varepsilon_0\mu_0} \approx 2.998\times10^8" /> m/s。
        这个数和当时已经测得的光速对上了，于是他写下"光就是电磁波"。
        <strong>一条从琴弦上推出来的方程，最后统一了光学与电学</strong>——
        而"波速 = 某个恢复力除以某个惯性，再开根号"这个结构，
        和本节 <MathInline tex="c = \sqrt{T/\rho}" /> 是同一个模子；
      </li>
      <li>
        <strong>地震定位：两种波不一样快，于是地球自带一把尺</strong>。
        地震同时发出两种波：一种靠"压缩—回弹"传播（跑得快，先到，叫 P 波），
        一种靠"横向剪切"传播（慢一些，后到，叫 S 波）。
        两者都满足波动方程，只是恢复力不同，代进
        <MathInline tex="c = \sqrt{\text{恢复力}/\text{惯性}}" /> 得到不同的 c。
        于是一台地震仪只要量出"P 波和 S 波到达的<strong>时间差</strong>"，
        就能算出震源有多远——差得越久，说明跑得越远。三台仪器各画一个圆，交点就是震中。
        这就是新闻里几分钟内就能报出震中位置的原理，用的只有"两个不同的 c"；
      </li>
      <li>
        <strong>行波解的现代日常</strong>：光纤里的脉冲、示波器上的信号——
        工程师默认"波形平移不变形"，用的就是达朗贝尔的
        <MathInline tex="f(x - ct)" />。反过来，光纤通信真正的敌人叫<strong>色散</strong>：
        不同频率的分量 c 略有不同，脉冲跑着跑着就摊平了，
        相邻两个脉冲糊在一起就误码了——那正是"<MathInline tex="c" /> 是常数"这个前提被破坏的后果；
      </li>
      <li>
        <strong>悬案移交</strong>：伯努利的驻波叠加要成立，必须回答"任意形状能否展成正弦级数"。
        半个世纪后，一个研究<strong>热</strong>的人给出了肯定答案、系数公式和一场地震——<router-link
          to="/mathphys/heat"
          >下一讲</router-link
        >。
      </li>
    </ul>
    <div class="insight">
      <div class="insight-title">🔗 与你学过的课程连一连</div>
      <p>
        <strong>线性代数</strong>：叠加原理 = 解空间是向量空间
        （<router-link to="/linear-algebra/vector-space">向量空间讲</router-link>那条结论的物理版）；
        驻波模式将被证明是一组"正交基"，而
        <router-link to="/linear-algebra/eigen">特征值讲</router-link>说的
        "在特征基下各过各的日子"，就是<router-link to="/mathphys/separation">第 5 讲</router-link>整套解法；
        <strong>微积分</strong>：达朗贝尔公式对积分限求导要用莱布尼茨法则——
        <router-link to="/calculus/ftc">基本定理</router-link>的老手艺；
        能量守恒那四行用的是分部积分，也出自那一讲；
        <strong>复变函数</strong>：行波 <MathInline tex="f(x-ct)" /> 与
        <MathInline tex="g(x+ct)" /> 的双变量结构，
        正是<router-link to="/complex/holomorphic">复变第 2 讲</router-link>里
        "一个函数只依赖 z、另一个只依赖 z̄"那种分家的实数影子；
        而<router-link to="/complex/residue">复变第 4 讲</router-link>算过的带阻尼振子，
        正是本讲那根弦被加上摩擦之后的样子；
        <strong>数值分析</strong>：本讲能写出显式解是极少数的幸运，
        真实工程里的波（三维、变系数、复杂边界）只能靠差分或有限元求解——
        <router-link to="/mathphys/pde-intro">上一讲</router-link>说的 CFL 条件
        <MathInline tex="\Delta t \le \Delta x/c" /> 里那个 c，就是本讲的 c。
      </p>
    </div>
  </ConceptPage>
</template>
