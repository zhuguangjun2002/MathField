<script setup>
import ConceptPage from '../../components/ConceptPage.vue'
import MathBlock from '../../components/MathBlock.vue'
import MathInline from '../../components/MathInline.vue'
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
        <strong>竖直方向</strong>，每端拉力的竖直分量 ≈ T × 该端斜率（小角度时 sin ≈ tan = 斜率 = ∂u/∂x）。
        于是竖直合力 = 右端拉力竖直分量 − 左端的 =
        <MathInline tex="T\left[u_x(x + \Delta x) - u_x(x)\right]" />。
        牛顿第二定律：合力 = 质量 × 加速度 = <MathInline tex="(\rho \Delta x) \cdot u_{tt}" />。
        两边除以 Δx、令 Δx → 0（左边正是 u_x 的差商，取极限得 u_xx）：
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
      <strong>达朗贝尔（1747）：换元的魔术。</strong>令 ξ = x − ct、η = x + ct，方程化为
      <MathInline tex="\partial^2 u / \partial\xi\,\partial\eta = 0" />——它的解一眼可见：
    </p>
    <MathBlock tex="u(x, t) = f(x - ct) + g(x + ct)" />
    <p>
      f(x − ct) 是"形状 f 以速度 c 向右平移"（t 增大时，同一个函数值出现在更大的 x 处），
      g 同理向左。<strong>任何解都是一列右行波加一列左行波</strong>——波速 c 的含义至此落地。
    </p>
    <p>
      <strong>丹尼尔·伯努利（1753）：音乐家的答案。</strong>他从泛音出发主张：弦的任何振动都是
      <strong>驻波</strong>的叠加——形如 <MathInline tex="\sin\frac{n\pi x}{L}\cos\frac{n\pi c t}{L}" />
      的"原地站桩"模式，第 n 个模式有 n−1 个不动的节点、频率是基频的 n 倍（这正是泛音列，
      吉他 12 品泛音、小提琴人工泛音全是它）。
    </p>
    <div class="insight">
      <div class="insight-title">💡 核心直觉：叠加原理——线性方程的超能力</div>
      <p>
        两个答案都靠同一根支柱：方程是<strong>线性</strong>的——u、v 是解，则 au + bv 也是解
        （代入即验，求导对加法分配）。这就是<strong>叠加原理</strong>，向量空间讲"解集是向量空间"的物理版。
        伯努利的主张于是变成一个纯数学问题：<strong>驻波模式们能"张成"所有可能的初始形状吗？</strong>
        欧拉、拉格朗日激烈反对：拨弦的初始形状是带尖角的折线，一堆光滑正弦怎么加得出尖角？
        这场架从 1753 年吵到世纪末，谁也说服不了谁——胜负要等下一讲的傅里叶来判。
      </p>
    </div>

    <h2><span class="sec-no">叁</span>两种视角亲手切换</h2>
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
        （动能 + 弹性势能），对 t 求导、用方程化简，得 E′(t) = 0——弦永远荡下去（理想无阻尼）。
        下一讲的热方程将在同一测试下给出完全相反的答案，请留意这个对照。
      </li>
    </ul>

    <h2><span class="sec-no">伍</span>买到了什么：从琴房到光</h2>
    <ul>
      <li>
        <strong>乐器设计的物理</strong>：音高 = <MathInline tex="\frac{c}{2L} = \frac{1}{2L}\sqrt{T/\rho}" />——调音旋钮改 T，粗细弦改 ρ，品丝改 L；
        音色 = 各泛音的配比，而配比由<strong>拨弦位置</strong>决定（在 1/5 处拨，第 5 泛音缺席——
        分离变量讲会算给你看）；
      </li>
      <li>
        <strong>同一方程满宇宙</strong>：声波（空气密度的 u）、水波、电磁波——麦克斯韦 1865 年从方程组推出
        E、B 各满足三维波动方程，波速算出来恰是光速，于是写下"光就是电磁波"。
        一条从琴弦上推出来的方程，最后统一了光学与电学；
      </li>
      <li>
        <strong>行波解的现代日常</strong>：光纤里的脉冲、地震波的 P 波 S 波、示波器上的信号——
        工程师默认"波形平移不变形"，用的就是达朗贝尔的 f(x − ct)；
      </li>
      <li>
        <strong>悬案移交</strong>：伯努利的驻波叠加要成立，必须回答"任意形状能否展成正弦级数"。
        半个世纪后，一个研究<strong>热</strong>的人给出了肯定答案、系数公式和一场地震——下一讲。
      </li>
    </ul>
    <div class="insight">
      <div class="insight-title">🔗 与你学过的课程连一连</div>
      <p>
        <strong>线性代数</strong>：叠加原理 = 解空间是向量空间；驻波模式将被证明是一组"正交基"（下下讲）；
        <strong>微积分</strong>：达朗贝尔公式对积分限求导要用莱布尼茨法则——基本定理的老手艺；
        <strong>复变函数</strong>：行波 f(x−ct) 与 g(x+ct) 的双变量结构，正是复变里 ξ、η 换元
        （以及全纯/反全纯分解）的实数影子。
      </p>
    </div>
  </ConceptPage>
</template>
