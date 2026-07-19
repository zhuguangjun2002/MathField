<script setup>
import ConceptPage from '../../components/ConceptPage.vue'
import MathBlock from '../../components/MathBlock.vue'
import MathInline from '../../components/MathInline.vue'
import ConditionNumberDemo from '../../demos/ConditionNumberDemo.vue'
</script>

<template>
  <ConceptPage slug="linear-system">
    <h2><span class="sec-no">壹</span>困境：消元法你早就会，可计算机为什么算出两个答案</h2>
    <p>
      解线性方程组 <MathInline tex="A\mathbf{x}=\mathbf{b}" />，你在
      <router-link to="/linear-algebra/elimination">线性代数第一讲</router-link>就学了高斯消元，
      手算能得出漂亮的分数精确解。可一旦把同一个方程组交给计算机，用有限精度的浮点去跑，怪事就来了——
      有时算得又快又准，有时却给出<strong>面目全非的答案</strong>，甚至换个求解顺序结果都不一样。
      科学计算里超过一半的时间都花在解 <MathInline tex="A\mathbf{x}=\mathbf{b}" /> 上，这个"看起来早就解决"的问题，
      恰恰是舍入误差最凶险的战场。麻烦分两种：
    </p>
    <div class="story">
      <div class="story-title">📜 麻烦一：小主元当除数，误差被自己放大</div>
      <p>
        消元时要拿主元（对角线上的数）去除别的行。万一某个主元<strong>很接近 0</strong>，
        除法就会把它携带的那点舍入误差放大成巨浪，顺着后续每一步污染整个解。
        经典教训：解 <MathInline tex="\begin{cases}10^{-17}x+y=1\\ x+y=2\end{cases}" />，
        若老老实实拿 <MathInline tex="10^{-17}" /> 当主元，浮点下会算出 <MathInline tex="x=0" /> 这种离谱结果——
        方程组本身好好的，是算法踩了雷。
      </p>
    </div>
    <p>
      麻烦二更深，也更无解：有些方程组<strong>天生就敏感</strong>——输入的系数只动了千分之一，
      真正的解就翻天覆地。最著名的坏典型是<strong>希尔伯特矩阵</strong>
      <MathInline tex="H_{ij}=\tfrac{1}{i+j-1}" />，看着人畜无害，却病入膏肓：
      10 阶希尔伯特系统，数据里 <MathInline tex="10^{-16}" /> 的舍入误差能被放大成解里 100% 的错误。
      这种病<strong>不怪算法，怪问题自己</strong>。要治，先得能<strong>度量</strong>它。
    </p>

    <h2><span class="sec-no">贰</span>破局：换个大主元，再给"敏感度"装上刻度</h2>
    <p>
      第一种麻烦好治：既然小主元危险，那每一步消元前，就在这一列里<strong>挑绝对值最大的元</strong>
      换到主元位置——这叫<strong>部分主元选取（partial pivoting）</strong>。除数不再接近 0，误差就传不开。
      <strong>威尔金森</strong>在 1960 年代用"后向误差分析"证明了：带部分主元的高斯消元，
      算出的解恰好是<em>某个被微小扰动过的</em>方程组的精确解——所以它是稳的。这几乎是所有数值线性代数库的默认做法。
    </p>
    <div class="insight">
      <div class="insight-title">💡 核心直觉：条件数是"误差放大器"</div>
      <p>
        第二种麻烦要靠<strong>图灵 1948 年</strong>提出的<strong>条件数</strong>
        <MathInline tex="\kappa(A)=\|A\|\,\|A^{-1}\|" />。它衡量的是问题<strong>天生</strong>有多敏感，
        近似关系是：<strong>解的相对误差 ≲ κ(A) × 数据的相对误差</strong>。
        换句话说，喂进去 <MathInline tex="10^{-16}" /> 的舍入误差，出来的解可能带着
        <MathInline tex="\kappa\times10^{-16}" /> 的误差——<MathInline tex="\kappa" /> 就是那个放大倍数。
      </p>
      <p>
        几何图像最直白：解 <MathInline tex="2\times2" /> 方程组 = 求两条直线的交点。两线交角明显时，
        交点被钉得死死的，你把某条线挪一点点，交点几乎不动——<strong>良态</strong>，<MathInline tex="\kappa" /> 小。
        可当两条线<strong>近乎平行</strong>，交点就变得极其游移，线稍微一动，交点窜出老远——<strong>病态</strong>，
        <MathInline tex="\kappa" /> 飙到成百上千。希尔伯特矩阵，就是无数行"几乎平行"叠在一起的极端。下面这个动画，让你亲手把良态拧成病态。
      </p>
    </div>

    <h2><span class="sec-no">叁</span>亲手把方程组从良态拧成病态</h2>
    <ConditionNumberDemo />

    <h2><span class="sec-no">肆</span>严格定义</h2>
    <div class="definition">
      <div class="def-title">📐 条件数与误差放大不等式</div>
      <p>
        取一种向量范数及其诱导的矩阵范数 <MathInline tex="\|A\|=\max_{\mathbf{x}\ne0}\tfrac{\|A\mathbf{x}\|}{\|\mathbf{x}\|}" />。
        非奇异矩阵 <MathInline tex="A" /> 的<strong>条件数</strong>定义为
      </p>
      <MathBlock tex="\kappa(A)=\|A\|\,\|A^{-1}\| \;\ge\; 1" />
      <p>
        对 2-范数，它等于<strong>最大奇异值与最小奇异值之比</strong>
        <MathInline tex="\kappa_2(A)=\sigma_{\max}/\sigma_{\min}" />。若 <MathInline tex="A\mathbf{x}=\mathbf{b}" />，
        数据扰动 <MathInline tex="\mathbf{b}\to\mathbf{b}+\delta\mathbf{b}" /> 引起解扰动 <MathInline tex="\delta\mathbf{x}" />，则
      </p>
      <MathBlock tex="\frac{\|\delta\mathbf{x}\|}{\|\mathbf{x}\|} \;\le\; \kappa(A)\,\frac{\|\delta\mathbf{b}\|}{\|\mathbf{b}\|}" />
      <p>
        <MathInline tex="\kappa\approx1" /> 为良态；<MathInline tex="\kappa" /> 很大为<strong>病态</strong>。
        当 <MathInline tex="\det A\to0" />（矩阵趋于奇异）时 <MathInline tex="\sigma_{\min}\to0" />，
        <MathInline tex="\kappa\to\infty" />——这与<router-link to="/linear-algebra/determinant">行列式讲</router-link>的
        "det = 0 即压扁成奇异"正好接上：病态就是"离奇异有多近"。
      </p>
    </div>

    <h2><span class="sec-no">伍</span>买到了什么：整个科学计算的底座与一副诊断眼光</h2>
    <ul>
      <li>
        <strong>一切都归结为解 Ax=b</strong>：结构受力、电路网络、流体仿真、经济模型，离散化到最后都是一个（往往巨大的）线性方程组。
        它是科学计算当之无愧的核心，而条件数决定了你能不能<strong>信任</strong>算出来的解；
      </li>
      <li>
        <strong>大而稀疏就换迭代法</strong>：几百万未知数时，直接消元太贵，改用<strong>雅可比 / 高斯-赛德尔</strong>等迭代法
        反复逼近。它们收敛快慢由迭代矩阵的<strong>谱半径（最大特征值模）</strong>决定——
        <router-link to="/linear-algebra/eigen">特征值讲</router-link>在这里第三次决定"长期命运"；
      </li>
      <li>
        <strong>机器学习也在治病态</strong>：最小二乘的法方程 <MathInline tex="A^{\top}A\mathbf{x}=A^{\top}\mathbf{b}" /> 常常病态
        （条件数被平方！），于是改用 QR、SVD 分解；<strong>岭回归</strong>加的那个正则项
        <MathInline tex="+\lambda I" />，数值上正是在<strong>压低条件数、把病态问题拉回良态</strong>——
        你调的每一个正则化系数，背后都是这一讲的道理；
      </li>
    </ul>
    <div class="insight">
      <div class="insight-title">🔗 与你学过的课程连一连，也与本课首尾呼应</div>
      <p>
        <strong>线性代数</strong>：高斯消元 = <router-link to="/linear-algebra/elimination">LU 分解</router-link>的浮点版；
        <router-link to="/linear-algebra/determinant">det ≈ 0 ↔ 病态</router-link>；条件数
        <MathInline tex="\sigma_{\max}/\sigma_{\min}" /> 和迭代法收敛都由<router-link to="/linear-algebra/eigen">特征值 / 奇异值</router-link>掌控——
        这门课学过的每一件武器，在数值世界里都被重新称量了一遍；<strong>概率论</strong>：最小二乘本就出自
        <router-link to="/probability/clt">高斯的误差理论</router-link>，测量噪声越像病态方向，估计越不可靠；
        <strong>与第一讲首尾呼应</strong>：<router-link to="/numerical/float-error">第一讲</router-link>说舍入误差只有
        <MathInline tex="10^{-16}" /> 那么小、看着无害——它到底何时会酿成大祸？答案就是这一讲的
        <strong>条件数</strong>：κ 是把渺小舍入误差放大成致命错误的那只手。数值分析的一头一尾，就此扣合。
      </p>
    </div>
  </ConceptPage>
</template>
