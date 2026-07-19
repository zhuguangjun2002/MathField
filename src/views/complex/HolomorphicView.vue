<script setup>
import ConceptPage from '../../components/ConceptPage.vue'
import MathBlock from '../../components/MathBlock.vue'
import MathInline from '../../components/MathInline.vue'
import ConformalDemo from '../../demos/ConformalDemo.vue'
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
    <ul>
      <li>
        <strong>保角映射的工程价值</strong>：飞机翼型设计（茹科夫斯基变换把圆映成翼型）、
        地图投影（墨卡托投影保角，所以罗盘航线是直线）、电场磁场问题换坐标——
        把难区域保角映成圆盘，解完再映回来；
      </li>
      <li>
        <strong>流体与电磁的势函数</strong>：无旋无源的二维流场，其势函数与流函数恰好组成一个解析函数的实虚部——
        复分析成了二维物理的原生语言；
      </li>
      <li>
        <strong>"解析"一词的正名</strong>：微积分课上"解析函数"似乎只是"有公式的函数"的雅称，
        现在它有了精确含义——局部幂级数收敛于自身。泰勒讲的疑问（什么函数配得上展开）在复世界有了干净答案：
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
        <strong>线性代数</strong>：柯西-黎曼方程 = "雅可比矩阵是旋转伸缩型"——第三讲埋的伏笔在此兑现；
        <strong>微积分</strong>：多元函数的"可微 = 局部线性"在这里升级为"复可导 = 局部乘复数"；
        <strong>计算数学</strong>：保角映射数值化（Schwarz-Christoffel 变换）至今是求解区域问题的实用工具。
      </p>
    </div>
  </ConceptPage>
</template>
