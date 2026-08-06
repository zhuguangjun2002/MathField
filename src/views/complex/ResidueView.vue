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
    <p>
      不过那道题终究是个体检题——<MathInline tex="\arctan" /> 也做得出来，
      流水线只是"也能做"。真正该端上来的是开头三道噩梦里的<strong>第三道</strong>：
    </p>
    <MathBlock tex="\int_0^{\infty} \frac{\sin x}{x}\, dx" />
    <p>
      这一道，微积分课上教过的招数<strong>一条都不管用</strong>——不是难，是<strong>没有</strong>：
      <MathInline tex="\sin x / x" /> 的原函数不存在初等形式，
      数学家索性给它单独起了个名字叫正弦积分 <MathInline tex="\mathrm{Si}(x)" />，
      承认它是一个新函数。而这条流水线照样开工，答案是 <MathInline tex="\pi/2" />。
      代价是它比上一道多两个坎，也正是这两个坎让人看清流水线的真实工况。
    </p>
    <RevealBox
      title="🔍 硬骨头：算出开篇那道原函数根本不存在的积分"
      label="对答案 / 看完整拆解"
    >
      <template #hint>
        先自己想两步：① 把 <MathInline tex="\sin z / z" /> 直接拿去围道会出事——
        写 <MathInline tex="\sin z = \frac{e^{iz} - e^{-iz}}{2i}" />，
        再想想 <MathInline tex="z" /> 跑到上半平面很高处时，这两项分别有多大？
        ② 这个被积函数在 <MathInline tex="z = 0" /> 到底炸不炸？
        （<MathInline tex="x \to 0" /> 时 <MathInline tex="\sin x / x \to 1" />，
        可换成 <MathInline tex="e^{iz}/z" /> 呢？）
      </template>
      <p>
        <strong>第一坎：不能直接积 <MathInline tex="\sin z / z" />。</strong>
        写 <MathInline tex="z = x + iy" />，两个指数的大小是
      </p>
      <MathBlock tex="\bigl|e^{iz}\bigr| = e^{-y}, \qquad \bigl|e^{-iz}\bigr| = e^{\,y}" />
      <p>
        上半平面 <MathInline tex="y > 0" />：前者指数级<strong>衰减</strong>，
        后者指数级<strong>爆炸</strong>。而 <MathInline tex="\sin z" /> 是这两项的差，
        所以它在上半平面高处大得没边，大半圆那段永远扔不掉。
        办法是<strong>只带衰减的那一半上路</strong>：改积
        <MathInline tex="e^{iz}/z" />，最后取虚部——因为实轴上
        <MathInline tex="e^{ix}/x = \frac{\cos x}{x} + i\,\frac{\sin x}{x}" />，
        我们要的东西正躺在虚部里。
      </p>
      <p>
        <strong>第二坎：极点压在积分路径上。</strong>
        <MathInline tex="e^{iz}/z" /> 在 <MathInline tex="z = 0" /> 有一阶极点，
        而 <MathInline tex="z=0" /> 就在实轴上，不偏不倚挡在路中间
        （<MathInline tex="\sin x / x" /> 在 0 处好端端的，是换成
        <MathInline tex="e^{iz}/z" /> 之后才冒出来的麻烦——代价总要付在某处）。
        办法是<strong>绕过去</strong>：在原点处挖一个半径 <MathInline tex="\varepsilon" />
        的小半圆 <MathInline tex="C_\varepsilon" />，从 <MathInline tex="-\varepsilon" />
        贴着上方绕到 <MathInline tex="+\varepsilon" />。整条回路是四段：
      </p>
      <MathBlock tex="[-R,\, -\varepsilon] \;\to\; C_\varepsilon \;\to\; [\varepsilon,\, R] \;\to\; C_R" />
      <p>
        这么一挖，原点被留在了<strong>回路外面</strong>，
        回路内部一个奇点也没有——上一讲的柯西定理直接判整圈为零。
        这道题的全部工作，于是变成"把另外两段算掉"。
      </p>
      <p>
        <strong>第三步：大半圆没了。</strong>上一道题靠的是分母大过分子；
        这一道靠的不一样，是<strong>被积函数自己在上半平面被压扁</strong>：
        <MathInline tex="|e^{iz}| = e^{-y}" />，只要离开实轴一点点就急剧变小。
        半圆上除了贴着实轴的那两小段，其余部分早被 <MathInline tex="e^{-y}" /> 压没了，
        而那两小段本身又很短。严格的版本叫<strong>约当引理</strong>，结论是
        <MathInline tex="\int_{C_R} \to 0" />。
      </p>
      <p>
        <strong>第四步：小半圆给出 <MathInline tex="-i\pi" />。</strong>
        这是全题唯一的新东西。参数化 <MathInline tex="z = \varepsilon e^{i\theta}" />，
        <MathInline tex="\theta" /> 从 <MathInline tex="\pi" /> 走到 <MathInline tex="0" />
        （<strong>顺时针</strong>，因为要从 <MathInline tex="-\varepsilon" /> 绕到
        <MathInline tex="+\varepsilon" />）：
      </p>
      <MathBlock tex="\int_{C_\varepsilon}\!\frac{e^{iz}}{z}dz = \int_{\pi}^{0}\frac{e^{i\varepsilon e^{i\theta}}}{\varepsilon e^{i\theta}}\, i\varepsilon e^{i\theta} d\theta = i\!\int_{\pi}^{0}\! e^{i\varepsilon e^{i\theta}} d\theta \;\xrightarrow[\varepsilon \to 0]{}\; i\!\int_{\pi}^{0}\! d\theta = -i\pi" />
      <p>
        一句话记住它：绕奇点走<strong>整</strong>圈得
        <MathInline tex="2\pi i \times" />留数，走<strong>半</strong>圈就得一半
        <MathInline tex="\pi i" />，顺时针再添个负号。这里留数是 1，所以是
        <MathInline tex="-i\pi" />。
      </p>
      <p><strong>第五步：合账。</strong>四段相加等于零，中间两段已经算出，于是</p>
      <MathBlock tex="\lim_{\substack{R \to \infty \\ \varepsilon \to 0}} \Biggl( \int_{-R}^{-\varepsilon} + \int_{\varepsilon}^{R} \Biggr) \frac{e^{ix}}{x}\, dx \;=\; i\pi" />
      <p>
        （这种"对称地挖掉奇点再取极限"的值叫<strong>主值</strong>，记作
        <MathInline tex="\mathrm{P.V.}" />；对 <MathInline tex="\sin x / x" />
        这一半其实没挖什么，因为它在 0 处根本不炸。）
        两边取虚部，就得到要的答案；顺带白拿一条实部的结论：
      </p>
      <MathBlock tex="\int_{-\infty}^{\infty}\frac{\sin x}{x}dx = \pi, \qquad \mathrm{P.V.}\!\int_{-\infty}^{\infty}\frac{\cos x}{x}dx = 0" />
      <p>
        （后者本来也该是 0——<MathInline tex="\cos x / x" /> 是奇函数。
        白送的这一条正好当验算。）
        <MathInline tex="\sin x/x" /> 是偶函数，折一半：
      </p>
      <MathBlock tex="\int_0^{\infty}\frac{\sin x}{x}\,dx = \frac{\pi}{2} \approx 1.5708" />
      <p>
        <strong>回头看这道题用掉了什么。</strong>全程没有出现过一次原函数，
        因为它不存在。用到的只有：极点在哪（<MathInline tex="z=0" />）、
        留数是几（1）、以及两段该扔的路怎么扔。
        <strong>这就是"杂技变成流水线"的真正含义</strong>——欧拉、拉普拉斯当年为这一道题
        各自发明过一套一次性的技巧，而这里它和上一道题走的是同一条路，
        只是路上多了两个标准动作（换成衰减的那一半、绕开路上的极点），
        而这两个动作在后面每一道含 <MathInline tex="\sin" />、<MathInline tex="\cos" />
        的积分里会反复出现。
      </p>
    </RevealBox>

    <h2><span class="sec-no">伍</span>买到了什么：一台实积分收割机，和一个谜底</h2>

    <h3>敲一下钟：极点在哪儿，决定余音有多长</h3>
    <p>
      上面那两道题还是"数学题"。这一节换个东西：一个每天都在被算的工程问题，
      而它的答案会<strong>整个</strong>由留数给出——而且给出的不只是一条公式，
      是一句工程师天天挂在嘴边的话。
    </p>
    <p>
      <strong>先给画面。</strong>敲一下钟、拨一下吉他弦、汽车轧过一道减速带——
      都是同一件事：<strong>给系统一记瞬间的踢，然后听它自己怎么响</strong>。
      响出来的那条曲线（钟的嗡鸣、弦的振动、车身的上下起伏）叫这个系统的
      <strong>冲激响应</strong>，记作 <MathInline tex="h(t)" />。
      它是系统的身份证：知道了 <MathInline tex="h(t)" />，
      任何输入下的输出都能算出来（把输入拆成一串瞬间的踢，各自的响应叠加即可）。
      所以"求 <MathInline tex="h(t)" />"是一切振动、电路、控制问题的第一步。
    </p>
    <p>
      <strong>为什么要绕道复平面。</strong>阻尼振子的方程是
      <MathInline tex="x'' + \gamma x' + \omega_0^2 x = f(t)" />——
      <MathInline tex="\omega_0" /> 是它<strong>不受阻力时</strong>会有的固有频率，
      <MathInline tex="\gamma" /> 是阻力的大小（空气、内摩擦、电阻）。
      硬解这个微分方程当然也行，但工程上从来不这么干，因为
      <router-link to="/complex/imaginary">第 1 讲</router-link>那条结论摆在那儿：
      <strong>代进 <MathInline tex="e^{-i\omega t}" />，求导就等于乘
      <MathInline tex="-i\omega" /></strong>——微分方程当场塌成一个代数式。
      解出来只有一行：
    </p>
    <MathBlock tex="H(\omega) = \frac{1}{\omega_0^2 - \omega^2 - i\gamma\omega}" />
    <p>
      这一行就是全部物理了，工程上叫<strong>频率响应</strong>：
      拿频率为 <MathInline tex="\omega" /> 的正弦去推它，它就按
      <MathInline tex="H(\omega)" /> 这个复数放大并错开相位（模是放大倍数、
      辐角是相位差，还是第 1 讲那套相量记账）。代价也很清楚：
      <strong>现在一切都在频率域里，必须变回时间域</strong>。而变回去那一步，就是
    </p>
    <MathBlock tex="h(t) = \frac{1}{2\pi}\int_{-\infty}^{\infty} H(\omega)\, e^{-i\omega t}\, d\omega" />
    <p>
      这一步叫<strong>反变换</strong>，是整套方法的最后一公里——
      而它的长相你已经很熟了：
      一个从 <MathInline tex="-\infty" /> 到 <MathInline tex="+\infty" /> 的实积分，
      被积函数带着一个指数因子——<strong>正是刚才那道
      <MathInline tex="\sin x / x" /> 的同款客户</strong>。
      补回路、数留数、乘 <MathInline tex="2\pi i" />，三步。
      <MathInline tex="H" /> 的分母是 <MathInline tex="\omega" /> 的二次式，
      两个根就是两个极点，位置是
    </p>
    <MathBlock tex="\omega_\pm = \pm\,\omega_d - \frac{i\gamma}{2}, \qquad \omega_d = \sqrt{\omega_0^2 - \tfrac{\gamma^2}{4}}" />
    <p>
      注意它们的虚部都是 <MathInline tex="-\gamma/2" />：只要有阻力，
      <strong>两个极点就都躺在下半平面</strong>。记住这句话，它马上要还债。
      推导在下面的框里，先看结论：
    </p>
    <MathBlock tex="h(t) = \begin{cases} \dfrac{e^{-\gamma t/2}}{\omega_d}\,\sin(\omega_d t), & t > 0 \\[6pt] 0, & t < 0 \end{cases}" />
    <RevealBox
      title="🔍 三步走完：从频率响应算出钟声的波形"
      label="对答案 / 看完整拆解"
    >
      <template #hint>
        先自己想一步：被积函数里的 <MathInline tex="e^{-i\omega t}" />，
        在 <MathInline tex="\omega = a + bi" /> 处的大小是
        <MathInline tex="e^{\,bt}" />。那么<strong>要它衰减</strong>，
        回路该往上半平面闭合还是下半平面闭合？——注意答案取决于
        <MathInline tex="t" /> 的正负，而这道题的全部玄机就在这里。
      </template>
      <p>
        <strong>第一步：往哪边闭合，由 <MathInline tex="t" /> 说了算。</strong>
        写 <MathInline tex="\omega = a + bi" />，则
        <MathInline tex="\bigl|e^{-i\omega t}\bigr| = e^{\,bt}" />。
        大半圆要能扔掉，就得让它衰减，即 <MathInline tex="bt < 0" />：
      </p>
      <ul>
        <li><MathInline tex="t > 0" />（敲了之后）：需要 <MathInline tex="b < 0" />，
          往<strong>下</strong>半平面闭合；</li>
        <li><MathInline tex="t < 0" />（敲之前）：需要 <MathInline tex="b > 0" />，
          往<strong>上</strong>半平面闭合。</li>
      </ul>
      <p>
        这跟 <MathInline tex="\sin x/x" /> 那道题是同一个动作
        （那里 <MathInline tex="|e^{iz}| = e^{-y}" /> 逼着我们走上半平面），
        只是这里多了个可正可负的 <MathInline tex="t" />，于是<strong>两边都得走一趟</strong>。
      </p>
      <p>
        <strong>第二步：<MathInline tex="t > 0" />，圈住两个极点。</strong>
        把分母因式分解，<MathInline tex="H(\omega) = \dfrac{-1}{(\omega - \omega_+)(\omega - \omega_-)}" />。
        两个都是一阶极点，用"划掉因子"的公式：
      </p>
      <MathBlock tex="\operatorname{Res}_{\omega_+} = \frac{-e^{-i\omega_+ t}}{\omega_+ - \omega_-} = \frac{-e^{-i\omega_+ t}}{2\omega_d}, \qquad \operatorname{Res}_{\omega_-} = \frac{+e^{-i\omega_- t}}{2\omega_d}" />
      <p>
        代入 <MathInline tex="e^{-i\omega_\pm t} = e^{\mp i\omega_d t}\, e^{-\gamma t/2}" />
        （极点的实部管转、虚部管衰减，这一步就看出来了），两个留数相加：
      </p>
      <MathBlock tex="\sum \operatorname{Res} = \frac{e^{-\gamma t/2}}{2\omega_d}\Bigl(e^{\,i\omega_d t} - e^{-i\omega_d t}\Bigr) = \frac{i\,e^{-\gamma t/2}}{\omega_d}\,\sin(\omega_d t)" />
      <p>
        往下半平面闭合是<strong>顺时针</strong>，所以要乘
        <MathInline tex="-2\pi i" /> 而不是 <MathInline tex="+2\pi i" />：
      </p>
      <MathBlock tex="h(t) = \frac{1}{2\pi}\cdot(-2\pi i)\cdot \frac{i\,e^{-\gamma t/2}}{\omega_d}\sin(\omega_d t) = \frac{e^{-\gamma t/2}}{\omega_d}\,\sin(\omega_d t)" />
      <p>
        两个 <MathInline tex="i" /> 撞出 <MathInline tex="-i^2 = 1" />，
        结果<strong>是个实数</strong>——本来就该是，钟声的位移不可能是复数。
        这也是一次免费的验算：<strong>凡是算完发现留下了虚部的，一定是哪里错了</strong>。
      </p>
      <p>
        <strong>第三步：<MathInline tex="t < 0" />，圈了个寂寞。</strong>
        往上半平面闭合，可上半平面<strong>一个极点都没有</strong>
        （两个极点的虚部都是 <MathInline tex="-\gamma/2 < 0" />）。
        留数之和是零，于是 <MathInline tex="h(t) = 0" />。
      </p>
      <p>
        独立验算：取 <MathInline tex="\omega_0 = 2" />、<MathInline tex="\gamma = 0.3" />
        （于是 <MathInline tex="\omega_d = 1.99437" />），
        直接对上面那个 <MathInline tex="H(\omega)e^{-i\omega t}" /> 做数值积分，
        <MathInline tex="t = 1" /> 得 0.39343，公式给 0.39343；
        <MathInline tex="t = 3" /> 得 −0.09451，公式给 −0.09451；
        <MathInline tex="t = -1" /> 与 <MathInline tex="t = -3" /> 数值上都是
        <MathInline tex="10^{-17}" /> 量级，也就是零。
      </p>
    </RevealBox>
    <p>
      <strong>现在读这个答案。</strong>它是一条<strong>按指数衰减的正弦</strong>——
      正是敲钟之后你听到的那个东西：一个音高，音量慢慢消下去。
      要紧的是这条曲线的两个特征，<strong>恰好就是极点的虚部和实部</strong>：
    </p>
    <ul>
      <li>
        <strong>虚部 <MathInline tex="-\gamma/2" /> ⟶ 包络
        <MathInline tex="e^{-\gamma t/2}" />，管余音多长</strong>。
        极点离实轴越远，衰减越快。铜钟的极点几乎贴着实轴，一敲响半分钟；
        拿手按住钟壁再敲，你把 <MathInline tex="\gamma" /> 加大了，
        极点掉得远远的，声音"噗"一下就没了；
      </li>
      <li>
        <strong>实部 <MathInline tex="\pm\omega_d" /> ⟶
        <MathInline tex="\sin(\omega_d t)" />，管音高</strong>。
        而且顺带看见一件平时不会注意的事：
        <MathInline tex="\omega_d = \sqrt{\omega_0^2 - \gamma^2/4} < \omega_0" />——
        <strong>有阻尼的钟，音比它"本该"的略低一点</strong>，阻尼越大跑调越多。
        阻尼大到 <MathInline tex="\gamma \ge 2\omega_0" /> 时根号里翻负，
        两个极点先撞在一起、再<strong>沿着负虚轴一上一下分开</strong>
        （取 <MathInline tex="\omega_0 = 1,\ \gamma = 3" /> 就是
        <MathInline tex="-0.382i" /> 与 <MathInline tex="-2.618i" />），
        实部归零，<MathInline tex="\sin" /> 也就变成了实指数——<strong>不响了</strong>，
        系统只是慢慢趴回原位。这就是汽车减震器要调到的状态
        （压过减速带你希望车身一次归位，而不是弹三下）。
      </li>
    </ul>
    <p>
      所以工程师拿到一个系统，第一件事是<strong>把极点画到复平面上看一眼</strong>：
      离实轴多远（衰减多快）、实部多大（振多快）、有没有跑到上半平面去（下面就说）。
      （旁注：控制课画的是"<MathInline tex="s" /> 平面"，
      那是本讲这张图顺时针转 90° 后的样子，
      所以那边的口头禅是"极点必须在<strong>左</strong>半平面"——
      说的是同一件事，只是坐标轴换了个装。）
      滤波器设计、控制系统、结构抗震、音箱调音，做的全是"把极点摆到该在的位置"这一件事。
      而"极点"这个词的全部含义，就是本讲第贰节那个洛朗展开炸掉的地方。
    </p>
    <div class="insight">
      <div class="insight-title">💡 白拿的一条：因果律 = "上半平面没有极点"</div>
      <p>
        上面第三步那个"圈了个寂寞"值得单拎出来说。
        <MathInline tex="h(t) = 0\ (t<0)" /> 翻译成人话是：<strong>敲之前没有回声</strong>。
        这在物理上天经地义，可我们并没有把它作为假设写进任何地方——
        它是<strong>算出来的</strong>，而且算出来的理由只有一条：
        两个极点都在下半平面，所以往上闭合时圈不到任何东西。
      </p>
      <p>
        于是一条物理原理和一条纯数学性质划上了等号：
        <strong>系统是因果的 ⟺ 它的频率响应
        <MathInline tex="H(\omega)" /> 在上半平面处处解析</strong>。
        这不是文字游戏，它有直接后果——
        既然 <MathInline tex="H" /> 在上半平面解析，
        <router-link to="/complex/cauchy-integral">上一讲</router-link>的柯西积分公式
        就适用，于是 <MathInline tex="H" /> 的实部和虚部<strong>不能各自随便取</strong>，
        一个由另一个通过积分完全定死。物理上这叫
        <strong>克拉默斯-克勒尼希关系</strong>：测出一块材料对各频率的<strong>吸收</strong>，
        就能算出它对各频率的<strong>折射</strong>，反之亦然，一次实验顶两次。
        光学、声学、材料的介电谱天天在用它。
      </p>
      <p>
        <strong>反过来读，就是稳定性判据。</strong>假如哪个系统的极点跑到了
        <strong>上</strong>半平面（<MathInline tex="\gamma < 0" />，也就是"负阻尼"——
        比如反馈接反了的功放、被风激起来的桥面），
        那么 <MathInline tex="h(t)" /> 里的包络变成 <MathInline tex="e^{+|\gamma| t/2}" />：
        没有任何人踢它，它自己越振越大。
        这就是啸叫、共振、塔科马海峡大桥。工程上一整套"稳定性判据"，
        判的就是这一件事：<strong>所有极点都待在该待的那半个平面里没有</strong>。
      </p>
    </div>

    <h3>还买到了什么</h3>
    <ul>
      <li>
        <strong>不只是振子</strong>：上面那条"变到频率域解掉、再靠留数变回来"的流水线，
        换个名字在各门课里反复出现——傅里叶反演、拉普拉斯反变换、
        格林函数、传播子。被积函数各不相同，最后一公里全是同一个动作：
        补回路、数留数、乘 <MathInline tex="2\pi i" />。
        所以留数不是复分析的内部消遣，它是<strong>一大批工程方法的收尾工序</strong>；
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
