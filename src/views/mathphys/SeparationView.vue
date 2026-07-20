<script setup>
import ConceptPage from '../../components/ConceptPage.vue'
import MathBlock from '../../components/MathBlock.vue'
import MathInline from '../../components/MathInline.vue'
import SeparationDemo from '../../demos/SeparationDemo.vue'
</script>

<template>
  <ConceptPage slug="separation">
    <h2><span class="sec-no">壹</span>困境：三大方程各有解法，有没有一把万能钥匙</h2>
    <p>
      回望前三讲：波动方程靠达朗贝尔换元，热方程靠傅里叶级数，拉普拉斯方程靠松弛迭代或复变魔法——
      三套兵器各自为战。但你可能已经嗅到共同的气息：<strong>正弦函数在每一讲都出现了</strong>。
      弦的驻波是正弦，热的衰减模式是正弦，圆盘上的调和函数展开还是三角函数。
      这不是巧合——18 世纪的解法背后藏着一个统一的机械流程，傅里叶把它用成了体系，
      19 世纪的斯图姆与刘维尔看清了它为什么灵。这一讲把这台机器拆给你看。
    </p>
    <div class="story">
      <div class="story-title">📜 方法：一个"自私"的猜测</div>
      <p>
        以两端固定的弦为例。猜解具有"变量分离"的形状：<MathInline tex="u(x,t) = X(x)\,T(t)" />
        ——空间形状与时间节奏各管各的、只以乘积相遇。代入 <MathInline tex="u_{tt} = c^2 u_{xx}" />：
      </p>
      <MathBlock tex="X(x)\,T''(t) = c^2 X''(x)\,T(t) \quad\Longrightarrow\quad \frac{T''(t)}{c^2\,T(t)} = \frac{X''(x)}{X(x)}" />
      <p>
        妙处在等号：左边只含 t，右边只含 x——<strong>一个纯粹关于时间的量恒等于一个纯粹关于空间的量，
        两边就只能都等于同一个常数</strong>（记作 −λ）。一条偏微分方程当场劈成两条常微分方程：
        <MathInline tex="X'' = -\lambda X" /> 与 <MathInline tex="T'' = -\lambda c^2 T" />。
        偏微分的"无穷维恐惧"退回到了微积分课的舒适区。
      </p>
    </div>
    <p>
      但常数 λ 不是自由的。X 还要满足边界条件 X(0) = X(L) = 0——解
      <MathInline tex="X'' = -\lambda X" /> 得正弦，要它在两端归零，波长必须"卡"进弦长：
    </p>
    <MathBlock tex="\lambda_n = \left(\frac{n\pi}{L}\right)^2, \qquad X_n(x) = \sin\frac{n\pi x}{L}, \qquad n = 1, 2, 3, \dots" />
    <p>
      <strong>边界条件把 λ 筛成了离散的一串</strong>——能"住进"这根弦的形状只有可数多个。
      每个 λₙ 再去驱动自己的 T 方程：波动方程给出 cos(nπct/L)（振荡），热方程给出
      <MathInline tex="e^{-\lambda_n a^2 t}" />（衰减）。剩下的交给叠加原理与傅里叶系数——任意初始条件按 {Xₙ} 分解，
      各模式独立演化，再加回来。
    </p>

    <h2><span class="sec-no">贰</span>破局：这不是技巧，是无穷维的对角化</h2>
    <div class="insight">
      <div class="insight-title">💡 核心直觉：正弦模式是算子的特征向量</div>
      <p>
        把"求两次空间导数"看成一个变换 <MathInline tex="A = -\partial^2/\partial x^2" />
        （吃进一个函数，吐出一个函数——线代第四讲说过，函数空间里的线性变换）。
        刚才的 <MathInline tex="X'' = -\lambda X" /> 就是 <MathInline tex="A X = \lambda X" />——
        <strong>不折不扣的特征值问题</strong>！Xₙ 是特征向量，λₙ 是特征值，
        "边界条件筛出离散 λₙ"对应矩阵只有有限个特征值。整套解法于是与线代第五讲逐字对应：
        <strong>按特征向量分解初始状态 → 每个特征方向按自己的 λ 独立演化 → 叠加回来</strong>。
        分离变量法 = 在函数空间里把微分算子对角化。傅里叶级数的正交性也不再是奇迹：
        对称算子的不同特征值对应的特征向量必正交——协方差矩阵特征向量正交是同一条定理。
      </p>
    </div>
    <p>
      这个视角在 1830 年代由<strong>斯图姆</strong>与<strong>刘维尔</strong>系统化（一般系数、一般边界条件下
      特征值仍离散、特征函数仍正交完备），一百年后成为量子力学的现成语言：
      薛定谔方程 <MathInline tex="\hat{H}\psi = E\psi" /> 正是特征值问题，
      "能级离散"与"弦只能发整数倍泛音"是同一个数学事实——<strong>量子化 = 边界条件筛选特征值</strong>。
    </p>

    <h2><span class="sec-no">叁</span>亲手看一份初始条件的两种命运</h2>
    <SeparationDemo />

    <h2><span class="sec-no">肆</span>严格定义</h2>
    <div class="definition">
      <div class="def-title">📐 定理（斯图姆-刘维尔特征值问题，1836-1837）</div>
      <p>
        边值问题 <MathInline tex="X'' + \lambda X = 0,\ X(0) = X(L) = 0" /> 仅当
        <MathInline tex="\lambda = \lambda_n = (n\pi/L)^2" /> 时有非零解
        <MathInline tex="X_n = \sin(n\pi x/L)" />。特征值单调趋于无穷，特征函数系
        <MathInline tex="\{X_n\}" /> 两两正交且在 <MathInline tex="L^2[0, L]" /> 中<strong>完备</strong>
        （任何平方可积函数都可按其展开）。
      </p>
    </div>
    <p>读小字：</p>
    <ul>
      <li>
        <strong>"非零解"三个字</strong>：X ≡ 0 永远满足边值问题但毫无用处——与线代"特征向量必须非零"
        一字不差，零向量提供不了任何信息；
      </li>
      <li>
        <strong>"完备"是伯努利-傅里叶之争的最终判决书</strong>：特征函数不多不少恰好张满整个函数空间——
        任意（合理的）初始条件都展得开，一个不漏。这是"驻波叠加万能"的严格版；
      </li>
      <li>
        <strong>方法的边界</strong>：分离变量依赖两点——方程线性、区域"规整"（矩形、圆、球等坐标面）。
        怪形状区域没有现成特征函数表，得靠数值（有限元法的本质：在小单元上近似这套理论）；
        非线性方程干脆没有叠加原理——那是 20 世纪的另一部史诗；
      </li>
      <li>
        <strong>三大方程一表收官</strong>：同一组特征模式，配不同的时间因子——
        波动配 <MathInline tex="\cos(\sqrt{\lambda_n}\,ct)" />（双曲：振荡不衰），
        热配 <MathInline tex="e^{-\lambda_n a^2 t}" />（抛物：指数遗忘），
        拉普拉斯无时间因子、直接由边界定系数（椭圆：一步到位）。
        <strong>三种物理，一套骨架，差别全在特征值怎么被使用。</strong>
      </li>
    </ul>

    <h2><span class="sec-no">伍</span>买到了什么：全站大会师</h2>
    <p>这门课至此收官，也是整个网站的收官。清点一下你现在手里的地图：</p>
    <ul>
      <li>
        <strong>微积分</strong>给了语言：极限定义了导数与积分，偏导数是"切片求导"，
        泰勒与傅里叶是两大逼近哲学——局部放大镜与全局棱镜；
      </li>
      <li>
        <strong>线性代数</strong>给了骨架：叠加原理 = 解空间是向量空间；分离变量 = 特征值解耦；
        傅里叶系数 = 正交投影。"抽象是批发定理"的承诺，在函数空间全额兑付；
      </li>
      <li>
        <strong>概率论</strong>给了另一双眼睛：热方程是布朗运动的宏观影子（扩散 = 分子随机行走的中心极限定理），
        调和函数是随机游走的撞界概率——决定论的 PDE 与随机的粒子，是同一实在的两套记账法；
      </li>
      <li>
        <strong>复变函数</strong>给了利器：调和 ⟺ 解析实部，保角映射搬运区域，留数收割反演积分，
        解析延拓喂饱特殊函数；
      </li>
      <li>
        <strong>数学物理方程</strong>把它们拧成一股绳：三大方程——振荡的、遗忘的、静止的——
        用同一套"特征模式 + 叠加"讲完。而这套语言再往前一步就是量子力学、信号处理与数值仿真的今天。
      </li>
    </ul>
    <div class="insight">
      <div class="insight-title">🔗 终点，也是起点</div>
      <p>
        回到网站首页的那句话：概念不是从天上掉下来的。你现在亲眼看过了——极限是为了驯服芝诺的无穷，
        矩阵是方程组的记账表，概率生于一场没赌完的赌局，虚数被三次方程逼进数学，
        傅里叶级数是一篇被拒稿的论文。<strong>每一个让你"懵懵懂懂"的定义背后，都有一个具体的麻烦、
        一群具体的人和一段真实的挣扎。</strong>教科书从压缩包开始，这里给了你解压后的源代码。
        往后再遇到新概念，愿你的第一反应不再是"背下来"，而是——<strong>"它当年是被什么问题逼出来的？"</strong>
      </p>
    </div>
  </ConceptPage>
</template>
