<script setup>
import ConceptPage from '../../components/ConceptPage.vue'
import MathBlock from '../../components/MathBlock.vue'
import MathInline from '../../components/MathInline.vue'
import RevealBox from '../../components/RevealBox.vue'
import ResidueDemo from '../../demos/ResidueDemo.vue'
</script>

<template>
  <ConceptPage slug="residue">
    <h2><span class="sec-no">壹</span>困境：物理里到处是算不动的实积分</h2>
    <p>18、19 世纪的物理学家有一抽屉共同的噩梦，长这样：</p>
    <MathBlock tex="\int_0^{\infty} \frac{dx}{1 + x^4}, \qquad \int_0^{\infty} \frac{\cos x}{1 + x^2}\, dx, \qquad \int_0^{\infty} \frac{\sin x}{x}\, dx" />
    <p>
      波的衍射、热的传导、概率的特征函数……处处冒出这类积分。它们的原函数要么写不出初等形式，
      要么求出来也没法代无穷限。<strong>欧拉、拉普拉斯各显神通逐个击破过一些</strong>（换积分次序、引参数求导、
      形式代入虚数……），但全是一题一策的杂技，没有通法，而且常常"算得对却说不清为什么可以这么算"。
    </p>
    <div class="story">
      <div class="story-title">📜 1826 — 1846 年 · 柯西把杂技变成流水线</div>
      <p>
        <strong>柯西</strong>接着上一讲的线索追问：回路里有奇点时，积分到底等于多少？
        1826 年他给这笔账起了名字——résidu（<strong>留数</strong>，字面义"残余物"）：
        函数在奇点附近展开后，唯一"积分积不掉"的那一项的系数。到 1846 年，完整的留数定理成形，
        实积分的攻略从此变成三步流水线：<strong>补一条回路把实轴围起来 → 数圈内奇点的留数 → 乘 2πi</strong>。
        一抽屉的噩梦，变成了口算题。
      </p>
    </div>

    <h2><span class="sec-no">贰</span>破局：奇点附近，只有一项"积不掉"</h2>
    <p>
      <strong>先说清楚"在奇点附近展开"是什么意思。</strong>
      <router-link to="/complex/cauchy-integral">上一讲</router-link>末尾说过，解析函数在解析点附近可以展成幂级数
      <MathInline tex="a_0 + a_1(z-z_0) + a_2(z-z_0)^2 + \cdots" />——这就是泰勒展开，
      每一项都是非负次幂，所以整个级数在 <MathInline tex="z_0" /> 处是个规规矩矩的有限值
      <MathInline tex="a_0" />。可奇点处函数<strong>本来就是无穷大</strong>，
      非负次幂再怎么加也加不出无穷大，泰勒展开从根上就不够用。
    </p>
    <p>
      <strong>洛朗</strong>（1843）的做法是把限制松掉一格：<strong>允许出现负次幂</strong>。
      负次幂在 <MathInline tex="z \to z_0" /> 时分母趋于零、整项趋于无穷，正好能描述"炸掉"的那部分。
      于是奇点附近的展开长这样，人称<strong>洛朗展开</strong>：
    </p>
    <MathBlock tex="f(z) = \cdots + \frac{a_{-2}}{(z - z_0)^2} + \frac{a_{-1}}{z - z_0} + a_0 + a_1 (z - z_0) + \cdots" />
    <p>
      这不是凭空规定，找个函数算一下就看见了。取
      <MathInline tex="f(z) = e^z / z^2" />，它在 <MathInline tex="z = 0" /> 显然炸了。
      把分子按泰勒展开
      <MathInline tex="e^z = 1 + z + \tfrac{z^2}{2} + \tfrac{z^3}{6} + \cdots" />，
      再逐项除以 <MathInline tex="z^2" />：
    </p>
    <MathBlock tex="\frac{e^z}{z^2} = \frac{1}{z^2} + \frac{1}{z} + \frac{1}{2} + \frac{z}{6} + \cdots" />
    <p>
      负幂项自己冒出来了，而且只冒出<strong>有限个</strong>（这里两个）。
      负幂最多有限个的奇点叫<strong>极点</strong>；最高的那个负次幂是几，就叫<strong>几阶极点</strong>
      （上式是二阶极点）。这一讲打交道的基本都是极点——它们是最温和、也最常见的一类奇点。
    </p>
    <p>
      <strong>现在沿绕 <MathInline tex="z_0" /> 的一个小圈把这个级数逐项积分</strong>，
      奇迹出现：<strong>除了一项，其余全部积出零</strong>。
      这不需要什么高深工具，把上一讲那套"参数化再积"对
      <MathInline tex="(z-z_0)^n" /> 做一遍就全出来了——而且一次算尽所有整数
      <MathInline tex="n" />（正的、负的、零）：
    </p>
    <RevealBox
      title="🔍 三行算尽：绕小圈积 (z − z₀) 的 n 次幂，每个整数 n 各得多少"
      label="对答案 / 看完整拆解"
    >
      <template #hint>
        先自己动笔：把小圈参数化成 <MathInline tex="z = z_0 + \varepsilon e^{i\theta}" />，
        <MathInline tex="\theta" /> 从 0 到 <MathInline tex="2\pi" />，代进
        <MathInline tex="\oint (z-z_0)^n dz" />。化简之后，被积式长什么样？
        它在什么情况下积得出零、什么情况下积不出零？
      </template>
      <p>
        <strong>第一步：代进去。</strong><MathInline tex="z - z_0 = \varepsilon e^{i\theta}" />，
        <MathInline tex="dz = i\varepsilon e^{i\theta} d\theta" />，于是
      </p>
      <MathBlock tex="\oint (z - z_0)^n dz = \int_0^{2\pi} \varepsilon^n e^{in\theta} \cdot i\varepsilon e^{i\theta}\, d\theta = i\,\varepsilon^{\,n+1}\!\int_0^{2\pi} e^{i(n+1)\theta} d\theta" />
      <p>
        <strong>第二步：只剩一个问题——那个积分等于几。</strong>
        记 <MathInline tex="k = n+1" />（它是整数）。若 <MathInline tex="k \ne 0" />，
        <MathInline tex="e^{ik\theta}" /> 的原函数是 <MathInline tex="e^{ik\theta}/(ik)" />，代上下限：
      </p>
      <MathBlock tex="\int_0^{2\pi} e^{ik\theta} d\theta = \left[\frac{e^{ik\theta}}{ik}\right]_0^{2\pi} = \frac{e^{2\pi i k} - 1}{ik} = 0" />
      <p>
        （因为 <MathInline tex="k" /> 是整数，<MathInline tex="e^{2\pi i k} = 1" />——
        转了整数圈，回到原地。）若 <MathInline tex="k = 0" />，被积式变成常数 1，积分就是
        <MathInline tex="2\pi" />。
      </p>
      <p><strong>第三步：合起来。</strong></p>
      <MathBlock tex="\oint (z - z_0)^n dz = \begin{cases} 2\pi i, & n = -1 \\[2pt] 0, & n \ne -1 \end{cases}" />
      <p>
        注意 <MathInline tex="\varepsilon" /> 在 <MathInline tex="n = -1" /> 时恰好被
        <MathInline tex="\varepsilon^{\,n+1} = \varepsilon^0 = 1" /> 消掉了——
        <strong>圈多小都一样</strong>，这正是上一讲"变形不变性"的又一次现身。
      </p>
      <p>
        <strong>为什么偏偏是 −1 次幂？</strong>换个说法就懂了：其余每一项都有<strong>单值的原函数</strong>
        （<MathInline tex="(z-z_0)^n" /> 的原函数是 <MathInline tex="\frac{(z-z_0)^{n+1}}{n+1}" />），
        绕一圈回到起点，首尾一减当然为零。唯独 <MathInline tex="n = -1" /> 时这个公式分母为零、失效——
        它的原函数是<strong>对数</strong>，而对数是多值的：绕一圈辐角加了 <MathInline tex="2\pi" />，
        回不到原值，差额恰是 <MathInline tex="2\pi i" />。
        <strong>整个级数里，只有这一项"绕一圈对不上账"。</strong>
      </p>
    </RevealBox>
    <p>
      于是逐项积分的结果一目了然：非负幂项全零，<MathInline tex="-2" /> 次及更负的幂也全零，
      <strong>唯独 <MathInline tex="\frac{a_{-1}}{z-z_0}" /> 这一项幸存</strong>，积出
      <MathInline tex="a_{-1} \cdot 2\pi i" />。
    </p>
    <div class="insight">
      <div class="insight-title">💡 核心直觉：留数 = 奇点的"账户余额"</div>
      <p>
        整个无穷级数里，只有 −1 次幂那一项在回路积分下"幸存"，它的系数 a₋₁ 就叫<strong>留数</strong>——
        奇点存的全部账。回路积分于是变成纯粹的记账：<strong>绕一圈 = 把圈内每个奇点的余额加起来、乘 2πi</strong>。
        上一讲"1/z 绕一圈得 2πi"不是特例，是通式的最简样本（它的留数恰是 1）。
        大回路可以在解析区域里自由变形、缩成各奇点旁的小圈——这就是"账目守恒"的几何原因。
      </p>
    </div>

    <h2><span class="sec-no">叁</span>亲手圈奇点</h2>
    <ResidueDemo />

    <h2><span class="sec-no">肆</span>严格定义</h2>
    <div class="definition">
      <div class="def-title">📐 定理（留数定理，柯西 1846）</div>
      <p>
        设 f 在闭回路 Γ 上及其内部除有限个奇点 <MathInline tex="z_1, \dots, z_n" /> 外解析，Γ 逆时针取向，则
      </p>
      <MathBlock tex="\oint_\Gamma f(z)\, dz = 2\pi i \sum_{k=1}^{n} \operatorname{Res}(f, z_k)" />
      <p>
        其中 <MathInline tex="\operatorname{Res}(f, z_k)" /> 为 f 在 <MathInline tex="z_0 = z_k" /> 处洛朗展开的 a₋₁ 系数。
      </p>
    </div>
    <p>
      实际算题时没人真去展洛朗级数。<strong>一阶极点</strong>（洛朗展开最负只到 <MathInline tex="-1" /> 次）
      有一个一步到位的公式，而且它的来历只有一行：把展开式两边同乘 <MathInline tex="(z - z_0)" />，
    </p>
    <MathBlock tex="(z - z_0)f(z) = a_{-1} + a_0 (z-z_0) + a_1 (z-z_0)^2 + \cdots" />
    <p>
      右边除了 <MathInline tex="a_{-1}" /> 每一项都带着 <MathInline tex="(z-z_0)" /> 的正次幂，
      让 <MathInline tex="z \to z_0" /> 全部趋于零。于是
      <strong>剩下的就是留数本人</strong>：
    </p>
    <MathBlock tex="\operatorname{Res}(f, z_0) = \lim_{z \to z_0} (z - z_0)\, f(z) \qquad \text{（一阶极点）}" />
    <p>
      这个公式好用到什么程度：像 <MathInline tex="\frac{1}{(z-i)(z+i)}" /> 这种，
      乘上 <MathInline tex="(z-i)" /> 就是把那个因子<strong>划掉</strong>，剩下的代
      <MathInline tex="z = i" /> 即可——真的是口算。
    </p>
    <p>几处小字都有故事：</p>
    <ul>
      <li>
        <strong>"逆时针取向"</strong>：方向反了差个负号——积分是"带方向的记账"，
        与线代行列式的"定向面积"是同一种讲究；
      </li>
      <li>
        <strong>"有限个奇点"</strong>：奇点若堆积（如 1/sin(1/z) 在原点附近），圈法就失去意义——定理的边界清清楚楚；
      </li>
      <li>
        <strong>2πi 从哪来</strong>：来自"绕一圈辐角走过 2π"——它是圆周的周长（辐角版）。
        物理书里神出鬼没的 2π 因子，十有八九是某个回路积分的这枚指纹；
      </li>
    </ul>
    <p>
      光看定理还感觉不到它有多好使。把开头那抽屉噩梦里最简单的一道端上来，
      从头到尾走一遍这条流水线——你会发现<strong>整道题没有一步是"技巧"</strong>：
    </p>
    <RevealBox
      title="🔍 走一遍流水线：用留数算开头那道 1/(1+x²) 的无穷积分"
      label="对答案 / 看完整拆解"
    >
      <template #hint>
        先自己想三步：① 实轴不是闭回路，要补一条什么曲线才能围成一圈？
        ② 补上的那条曲线上，被积函数有多大、曲线有多长，两者一乘会怎样？
        ③ 围出来的区域里，<MathInline tex="\frac{1}{1+z^2}" /> 在哪儿炸？
        （提示：<MathInline tex="1 + z^2" /> 能因式分解。）
      </template>
      <p>
        <strong>第一步：把实轴补成闭回路。</strong>我们要的是
        <MathInline tex="\int_{-\infty}^{\infty}\frac{dx}{1+x^2}" />，
        可留数定理只认<strong>闭</strong>回路。那就取实轴上从 <MathInline tex="-R" /> 到
        <MathInline tex="R" /> 的一段，再从 <MathInline tex="R" /> 出发画一个上半平面的大半圆
        <MathInline tex="C_R" /> 绕回 <MathInline tex="-R" />——两段一拼，闭合了。于是
      </p>
      <MathBlock tex="\oint = \int_{-R}^{R}\frac{dx}{1+x^2} + \int_{C_R}\frac{dz}{1+z^2}" />
      <p>
        <strong>第二步：证明半圆那段可以扔掉。</strong>这是整道题唯一需要动点脑筋的地方。
        半圆上 <MathInline tex="|z| = R" />，由三角不等式
        <MathInline tex="|1+z^2| \ge |z|^2 - 1 = R^2 - 1" />，所以被积函数的大小不超过
        <MathInline tex="\frac{1}{R^2-1}" />；而半圆的长度是 <MathInline tex="\pi R" />。
        积分的大小不超过"最大值 × 长度"：
      </p>
      <MathBlock tex="\left|\int_{C_R}\frac{dz}{1+z^2}\right| \;\le\; \frac{\pi R}{R^2 - 1} \;\xrightarrow[R \to \infty]{}\; 0" />
      <p>
        分母是 <MathInline tex="R" /> 的二次、分子只有一次，<strong>半圆自己消失了</strong>。
        所以 <MathInline tex="R \to \infty" /> 时，回路积分就等于我们要的那个实积分。
      </p>
      <p>
        <strong>第三步：数圈内的奇点。</strong>
        <MathInline tex="1 + z^2 = (z-i)(z+i)" />，所以两个一阶极点在
        <MathInline tex="z = \pm i" />。回路围的是<strong>上</strong>半平面，
        只圈进了 <MathInline tex="z = i" /> 一个。用刚才那个"划掉因子"的公式：
      </p>
      <MathBlock tex="\operatorname{Res}\Bigl(\frac{1}{1+z^2},\, i\Bigr) = \lim_{z\to i}\,(z-i)\cdot\frac{1}{(z-i)(z+i)} = \frac{1}{2i}" />
      <p><strong>第四步：乘 2πi 收工。</strong></p>
      <MathBlock tex="\int_{-\infty}^{\infty}\frac{dx}{1+x^2} = 2\pi i \cdot \frac{1}{2i} = \pi" />
      <p>
        这道题用 <MathInline tex="\arctan" /> 也能做，答案一样，所以它是个好体检题。
        但请注意这套流水线用到的全部信息只有<strong>"极点在哪、留数是几"</strong>——
        它压根不关心原函数存不存在。开头那三道噩梦里
        <MathInline tex="\int_0^\infty \frac{\sin x}{x}dx" /> 的原函数根本写不出初等形式，
        这条流水线照样开工。<strong>杂技变成了流水线，说的就是这件事。</strong>
      </p>
    </RevealBox>

    <h2><span class="sec-no">伍</span>买到了什么：一台实积分收割机，和一个谜底</h2>
    <ul>
      <li>
        <strong>物理与工程的日常</strong>：很多方法是先把难解的问题"变换"到另一个域里解掉
        （比如把时间 t 的函数换成频率的函数，微分方程当场变成代数方程），
        解完必须<strong>变回来</strong>——而变回来那一步几乎总是一个形如
        <MathInline tex="\int f(\omega)e^{i\omega t} d\omega" /> 的积分。
        它正好是这条流水线的标准客户：补一条回路、数留数、乘 2πi。
        所以留数不是复分析的内部消遣，它是<strong>一大批工程方法的最后一公里</strong>；
      </li>
      <li>
        <strong>概率论的伏笔兑现</strong>：<router-link to="/probability/clt">中心极限定理讲</router-link>提过，
        证明它的现代工具是<strong>特征函数</strong> <MathInline tex="E[e^{itX}]" />——
        本质上就是把概率密度做一次上面说的那种变换。
        从特征函数反推回密度，同样是一个围道积分，同样靠留数落地；
      </li>
      <li>
        <strong>收敛半径之谜正式结案</strong>：泰勒讲的悬案——<MathInline tex="1/(1+x^2)" />
        在实轴上处处光滑，展开却只活在 (−1, 1)。真相：它在 ±i 有极点，
        幂级数的收敛盘<strong>顶到最近奇点为止</strong>，半径 = 到 ±i 的距离 = 1。
        实轴上的"无端翻车"，是复平面上奇点的投影——<strong>"收敛半径"的"半径"，是复平面上一个真实圆盘的半径</strong>；
      </li>
      <li>
        <strong>还剩最后一问</strong>：奇点挡住了幂级数的去路——那函数本身能不能绕过奇点、活到盘外去？
        能。这就是最后一讲：解析延拓。
      </li>
    </ul>
    <div class="insight">
      <div class="insight-title">🔗 与你学过的课程连一连</div>
      <p>
        <strong>微积分</strong>：<router-link to="/calculus/taylor">泰勒展开</router-link>的收敛半径在此拿到几何解释；
        <strong>概率论</strong>：<router-link to="/probability/clt">特征函数</router-link>反推回密度靠的就是围道积分；
        <strong>计算数学</strong>：像 <MathInline tex="\int \sin x/x\,dx" /> 这种被积函数一路正负振荡的积分，
        直接<router-link to="/numerical/quadrature">数值求积</router-link>会很吃力
        （正负项相消，有效位数被吃掉）；而积分路径可以变形，
        换一条走进复平面的路，被积函数常常变得一路平缓、只在很短一段里贡献主要的值，
        数值上立刻乖顺——<strong>理论出自本讲，技巧用在数值课</strong>。
      </p>
    </div>
  </ConceptPage>
</template>
