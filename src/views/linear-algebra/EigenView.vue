<script setup>
import ConceptPage from '../../components/ConceptPage.vue'
import MathBlock from '../../components/MathBlock.vue'
import MathInline from '../../components/MathInline.vue'
import EigenDemo from '../../demos/EigenDemo.vue'
</script>

<template>
  <ConceptPage slug="eigen">
    <h2><span class="sec-no">壹</span>困境：变换一遍看得清，变换一万遍怎么办</h2>
    <p>
      前两讲把矩阵看成变换，一次作用还算直观。但 18 世纪的大问题偏偏都是<strong>反复作用</strong>型的：
    </p>
    <div class="story">
      <div class="story-title">📜 1743 — 1829 年 · 太阳系会散架吗</div>
      <p>
        行星彼此摄动，轨道参数一年年缓慢漂移。<strong>拉格朗日</strong>把摄动方程线性化后发现，
        太阳系的命运取决于一个矩阵反复作用下的长期行为——他称相应的代数方程为
        <strong>"世纪方程"</strong>（équation séculaire，"世纪"指以百年计的长期演化，这名字今天还留在术语里）。
        振动问题同样如此：<strong>欧拉</strong>研究刚体旋转时发现，任何刚体都藏着三根互相垂直的"主轴"，
        绕主轴转最省心——转轴方向在旋转中保持不变。后来<strong>柯西</strong>把这些线索统一成对称矩阵的谱理论。
        天体、振动、转轴，三个问题指向同一个数学核心。
      </p>
    </div>
    <p>
      困难的本质一句话可说尽：矩阵 A 描述"一步演化"，我们要的却是
      <MathInline tex="A^{100}" />、<MathInline tex="A^{1000}" /> 之后的世界。
      硬乘一百次矩阵？既算不动，也看不出任何规律。<strong>需要一副能看穿"长期命运"的眼镜。</strong>
    </p>

    <h2><span class="sec-no">贰</span>破局：顺着变换的"纹理"看</h2>
    <p>
      换个问法：变换 A 这么折腾平面，有没有<strong>方向</strong>是它折腾不动的——
      向量被作用后<strong>方向不变，只是长度伸缩</strong>？
    </p>
    <MathBlock tex="A\boldsymbol{v} = \lambda \boldsymbol{v}" />
    <p>
      如果有这样的方向 v（特征向量）和伸缩倍数 λ（特征值），那么在这个方向上，
      矩阵这头猛兽退化成一个<strong>普通数字</strong>：作用一次是乘 λ，作用一百次就是乘
      <MathInline tex="\lambda^{100}" />。矩阵的幂算不动，数字的幂小学生都会。
    </p>
    <div class="insight">
      <div class="insight-title">💡 核心直觉：特征基下，矩阵原形毕露</div>
      <p>
        若能找到一整组基都由特征向量组成，把任意初始状态按这组基拆开：
        <MathInline tex="\boldsymbol{x} = c_1\boldsymbol{v}_1 + c_2\boldsymbol{v}_2" />，
        则演化 n 步后就是 <MathInline tex="A^n\boldsymbol{x} = c_1\lambda_1^n\boldsymbol{v}_1 + c_2\lambda_2^n\boldsymbol{v}_2" />——
        各方向<strong>各过各的日子，互不打扰</strong>（术语叫"解耦"或"对角化"）。
        长期命运一眼可见：|λ| 最大的那个方向最终独霸天下，|λ|&lt;1 的方向逐渐消亡。
        特征向量是变换的"纹理"，顺着纹理看，一切复杂运动都是几个独立伸缩的叠加。
      </p>
    </div>
    <p>
      开篇那个问题现在能兑现了。斐波那契数列"一步演化"是矩阵
      <MathInline tex="\begin{bmatrix} 1 & 1 \\ 1 & 0 \end{bmatrix}" />，它的特征值是
      <MathInline tex="\lambda_{1,2} = \frac{1 \pm \sqrt{5}}{2}" />——大的那个正是黄金比例
      φ ≈ 1.618。通项公式里冒出黄金比例，是因为<strong>φ 是这个矩阵的最大特征值，
      主宰了数列的长期命运</strong>：相邻两项之比趋于 φ，就是"最大特征方向独霸天下"的实况转播。
    </p>

    <h2><span class="sec-no">叁</span>亲手扫描出特征方向</h2>
    <EigenDemo />

    <h2><span class="sec-no">肆</span>严格定义</h2>
    <div class="definition">
      <div class="def-title">📐 定义(特征值与特征向量)</div>
      <p>
        设 A 为 n 阶方阵。若存在<strong>非零</strong>向量 <MathInline tex="\boldsymbol{v}" /> 与数
        <MathInline tex="\lambda" />，使得 <MathInline tex="A\boldsymbol{v} = \lambda\boldsymbol{v}" />，
        则称 λ 为 A 的<strong>特征值</strong>，v 为属于 λ 的<strong>特征向量</strong>。
        λ 是特征值当且仅当它满足<strong>特征方程</strong>：
      </p>
      <MathBlock tex="\det(A - \lambda I) = 0" />
    </div>
    <p>两处细节都值得逐词咀嚼：</p>
    <ul>
      <li>
        <strong>为什么坚持 v ≠ 0</strong>：零向量对任何矩阵、任何 λ 都满足
        <MathInline tex="A\boldsymbol{0} = \lambda\boldsymbol{0}" />——它是个万能马屁精，提供不了任何信息。
        排除它，"特征"二字才名副其实；
      </li>
      <li>
        <strong>特征方程为什么长这样</strong>：把定义式移项得
        <MathInline tex="(A - \lambda I)\boldsymbol{v} = \boldsymbol{0}" />。要它有<strong>非零</strong>解，
        矩阵 <MathInline tex="A - \lambda I" /> 必须把某个非零向量压进原点——即把空间<strong>压扁</strong>。
        而第二讲说过，"压扁"的判据正是行列式为零。三讲之前埋的伏笔，在此严丝合缝地扣上；
      </li>
      <li>
        特征方程是 λ 的 n 次多项式，可能出现<strong>复根</strong>——动画里"旋转矩阵等不到绿色"就是这情形：
        它的特征值是 <MathInline tex="\pm i" />。实平面上找不到不变方向，到了复数世界依然井井有条
        （这也是复变函数课的一张门票）。
      </li>
    </ul>

    <h2><span class="sec-no">伍</span>买到了什么：长期行为的水晶球</h2>
    <ul>
      <li>
        <strong>微分方程组解耦</strong>：<MathInline tex="\boldsymbol{x}' = A\boldsymbol{x}" />
        在特征基下拆成 n 个互不相干的一维方程 <MathInline tex="y_i' = \lambda_i y_i" />，
        解就是 <MathInline tex="e^{\lambda_i t}" /> 的叠加——特征值的实部正负当场判定系统稳不稳定。
        拉格朗日问"太阳系会不会散架"，问的就是世纪方程的根；
      </li>
      <li>
        <strong>主成分分析（PCA）</strong>：数据云的协方差矩阵（概率论！）的特征向量指向数据"最伸展"的方向，
        特征值就是该方向的方差——降维就是只保留大特征值方向。二次型化主轴、椭圆的长短轴，都是同一件事；
      </li>
      <li>
        <strong>谷歌 PageRank</strong>：把网页链接关系写成转移矩阵，网页的重要性排序就是它最大特征值
        （λ = 1）对应的特征向量——幂迭代算出来的，和斐波那契趋于黄金比例是同一个原理；
      </li>
      <li>
        <strong>计算数学的谱半径</strong>：迭代法 <MathInline tex="\boldsymbol{x}_{k+1} = B\boldsymbol{x}_k + \boldsymbol{c}" />
        收敛当且仅当 B 的特征值全部满足 |λ| &lt; 1——每个方向都在收缩，误差才会灭绝。
        你课上背的"谱半径小于 1"，就是这句话。
      </li>
    </ul>
    <div class="insight">
      <div class="insight-title">🔗 通往后面课程的桥</div>
      <p>
        本讲是全课收官，也是两座重要桥梁的桥头堡：<strong>复变函数</strong>——实矩阵的复特征值揭示"旋转"藏在实数世界里，
        复数是把它请出来的语言；<strong>数学物理方程</strong>——将来解弦振动、热传导时用的"分离变量法"，
        本质是在无穷维函数空间里找特征向量（驻波模式就是特征向量、频率就是特征值），
        整套解法是本讲在函数空间的重演。学到那里时，请务必回来重读"破局"一节。
      </p>
    </div>
  </ConceptPage>
</template>
