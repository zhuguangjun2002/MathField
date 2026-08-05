<script setup>
import ConceptPage from '../../components/ConceptPage.vue'
import MathBlock from '../../components/MathBlock.vue'
import MathInline from '../../components/MathInline.vue'
import RevealBox from '../../components/RevealBox.vue'
import EigenDemo from '../../demos/EigenDemo.vue'
</script>

<template>
  <ConceptPage slug="eigen">
    <h2><span class="sec-no">壹</span>困境：变换一遍看得清，变换一万遍怎么办</h2>
    <p>
      <router-link to="/linear-algebra/linear-map">第三讲</router-link>把矩阵看成变换，
      一次作用还算直观。但 18 世纪的大问题偏偏都是<strong>反复作用</strong>型的：
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
      本讲开篇那个问题（"斐波那契的通项里为什么会冒出黄金比例"）现在能兑现了。
      而且它值得从头到尾算一遍——因为这条路上的每一步，
      都是<router-link to="/linear-algebra/elimination">前四讲</router-link>的直接兑现。
    </p>
    <RevealBox
      title="🔍 黄金比例是怎么钻进斐波那契数列的"
      label="对答案 / 看完整拆解"
    >
      <template #hint>
        先自己动笔：斐波那契的规矩是 <MathInline tex="F_{n+1} = F_n + F_{n-1}" />。
        <strong>把"相邻两项"打包成一个向量 <MathInline tex="(F_{n+1},\ F_n)" />，
        那么"走一步"是个什么矩阵？</strong>（提示：新的第一个分量是旧的两个分量之和，
        新的第二个分量就是旧的第一个。）写出这个 2×2 矩阵，再点开。
      </template>
      <p>
        <strong>第一步：把递推写成矩阵。</strong>状态取
        <MathInline tex="\boldsymbol{x}_n = \begin{pmatrix} F_{n+1} \\ F_n\end{pmatrix}" />，
        那么走一步就是
      </p>
      <MathBlock tex="\begin{pmatrix} F_{n+2} \\ F_{n+1} \end{pmatrix} = \begin{pmatrix} 1 & 1 \\ 1 & 0 \end{pmatrix}\begin{pmatrix} F_{n+1} \\ F_{n} \end{pmatrix}, \qquad A = \begin{pmatrix} 1 & 1 \\ 1 & 0 \end{pmatrix}" />
      <p>
        第一行说的是 <MathInline tex="F_{n+2} = F_{n+1} + F_n" />（就是递推式本身），
        第二行说的是 <MathInline tex="F_{n+1} = F_{n+1} + 0\cdot F_n" />（把旧的头挪到新的尾）。
        <strong>于是"算第 n 项"变成了"把 A 作用 n 次"。</strong>
      </p>
      <p>
        <strong>第二步：解特征方程。</strong>按定义要
        <MathInline tex="\det(A - \lambda I) = 0" />：
      </p>
      <MathBlock tex="\det\begin{pmatrix} 1-\lambda & 1 \\ 1 & -\lambda\end{pmatrix} = (1-\lambda)(-\lambda) - 1 = \lambda^2 - \lambda - 1 = 0" />
      <p>
        （顺手记一个好用的规律：二阶的特征方程永远是
        <MathInline tex="\lambda^2 - (\operatorname{tr}A)\lambda + \det A = 0" />，
        这里迹是 <MathInline tex="1+0=1" />、行列式是
        <MathInline tex="1\cdot 0 - 1\cdot 1 = -1" />，正好对上。）
      </p>
      <MathBlock tex="\lambda_{1,2} = \frac{1 \pm \sqrt5}{2}, \qquad \varphi = \frac{1+\sqrt5}{2} \approx 1.6180,\quad \psi = \frac{1-\sqrt5}{2} \approx -0.6180" />
      <p>
        <strong>黄金比例不是被"发现"在数列里的，它是这个 2×2 行列式方程的根。</strong>
      </p>
      <p>
        <strong>第三步：求特征向量。</strong>解
        <MathInline tex="(A-\lambda I)\boldsymbol{v} = \boldsymbol{0}" />，
        第二行给出 <MathInline tex="v_1 = \lambda v_2" />，所以取
        <MathInline tex="\boldsymbol{v} = (\lambda,\ 1)" /> 即可。验一下 <MathInline tex="\varphi" /> 那个：
      </p>
      <MathBlock tex="A\begin{pmatrix} \varphi \\ 1\end{pmatrix} = \begin{pmatrix} \varphi + 1 \\ \varphi \end{pmatrix} = \begin{pmatrix} \varphi^2 \\ \varphi \end{pmatrix} = \varphi \begin{pmatrix} \varphi \\ 1 \end{pmatrix}" />
      <p>
        中间那一步用了 <MathInline tex="\varphi^2 = \varphi + 1" />——
        <strong>那正是特征方程本身</strong>，也正是黄金比例最著名的那条性质
        （"整体与较大部分之比 = 较大部分与较小部分之比"）。数值上
        <MathInline tex="1.618034^2 = 2.618034" />，两边都是
        <MathInline tex="(2.618034,\ 1.618034)" />。
      </p>
      <p>
        <strong>第四步：把初始状态按特征基拆开。</strong>
        <MathInline tex="\boldsymbol{x}_0 = (F_1, F_0) = (1, 0)" /> 拆成
        <MathInline tex="c_1\boldsymbol{v}_1 + c_2\boldsymbol{v}_2" />，
        解出 <MathInline tex="c_1 = -c_2 = 1/\sqrt5" />。走 n 步：
      </p>
      <MathBlock tex="A^n \boldsymbol{x}_0 = \frac{1}{\sqrt5}\varphi^n\begin{pmatrix}\varphi\\1\end{pmatrix} - \frac{1}{\sqrt5}\psi^n\begin{pmatrix}\psi\\1\end{pmatrix}" />
      <p>取第二个分量，就是那条著名的<strong>比内公式</strong>：</p>
      <MathBlock tex="F_n = \frac{\varphi^n - \psi^n}{\sqrt5}" />
      <p>
        代 n = 0…9 算出来是 0, 1, 1, 2, 3, 5, 8, 13, 21, 34——
        <strong>一个无理数的幂，居然逐项给出整数</strong>。
      </p>
      <p>
        <strong>第五步：长期命运。</strong><MathInline tex="|\psi| \approx 0.618 < 1" />，
        所以 <MathInline tex="\psi^n" /> 迅速消亡（n = 20 时已不到万分之一），
        只剩 <MathInline tex="\varphi^n" /> 独霸天下。于是
      </p>
      <MathBlock tex="\frac{F_{n+1}}{F_n} \;\longrightarrow\; \varphi" />
      <p>
        核一下：<MathInline tex="F_{10}/F_9 = 55/34 = 1.61765" />，
        <MathInline tex="F_{20}/F_{19} = 6765/4181 = 1.6180340" />，
        而 <MathInline tex="\varphi = 1.6180340" />——七位小数一致。
      </p>
      <p>
        <strong>回味：这五步把全课串了一遍。</strong>
        第一步用的是<router-link to="/linear-algebra/linear-map">第三讲</router-link>的"矩阵即变换"；
        第二步的 <MathInline tex="\det = 0" /> 是<router-link to="/linear-algebra/determinant">第二讲</router-link>
        的"压扁判据"；第三步解齐次方程组是
        <router-link to="/linear-algebra/elimination">第一讲</router-link>；
        第四步"按基拆开、各过各的日子"是<router-link to="/linear-algebra/vector-space">第四讲</router-link>。
        <strong>一个中学生都会背的数列，把这门课的五讲全用上了。</strong>
      </p>
    </RevealBox>

    <h2><span class="sec-no">叁</span>亲手扫描出特征方向</h2>
    <p>
      道理讲完了，不如自己把一个向量转一整圈，看看"方向不变"这件事到底多稀有。
      读数区会实时给出 v 与 Av 的偏差，对齐时会变绿。
    </p>
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
        特征方程是 λ 的 n 次多项式，所以<strong>特征值最多 n 个</strong>，
        而且可能出现<strong>复根</strong>——动画里"旋转矩阵等不到绿色"就是这情形。
      </li>
    </ul>
    <p>
      不过第贰节那句核心直觉是带前提的：<strong>"若能找到一整组基都由特征向量组成"</strong>。
      万一找不到呢？动画里那三个矩阵恰好演了三种不同的结局，值得逐个算一遍。
    </p>
    <RevealBox
      title="🔍 三种结局：两个方向、只有一个方向、一个实方向都没有"
      label="对答案 / 看完整拆解"
    >
      <template #hint>
        先自己动笔算动画里那三个矩阵的特征值：
        <MathInline tex="\begin{pmatrix}2&1\\1&2\end{pmatrix}" />、
        <MathInline tex="\begin{pmatrix}1&1\\0&1\end{pmatrix}" />、
        <MathInline tex="\begin{pmatrix}0&-1\\1&\ \ 0\end{pmatrix}" />。
        （用 <MathInline tex="\lambda^2 - (\operatorname{tr}A)\lambda + \det A = 0" /> 最快。）
        <strong>第二个会给你一个惊喜：它有两个相同的根，可特征方向只有一条。</strong>
        三组特征值，算完再点开。
      </template>
      <p>
        <strong>先备一件工具：二阶特征方程的现成形状。</strong>
        对 <MathInline tex="A = \begin{pmatrix}a&b\\c&d\end{pmatrix}" /> 展开
        <MathInline tex="\det(A-\lambda I)" />：
      </p>
      <MathBlock tex="(a-\lambda)(d-\lambda) - bc = \lambda^2 - (a+d)\lambda + (ad - bc) = \lambda^2 - (\operatorname{tr}A)\lambda + \det A" />
      <p>
        所以<strong>两个特征值之和是迹、之积是行列式</strong>。这既是速算工具，也是验算工具。
      </p>
      <p>
        <strong>结局一：<MathInline tex="\begin{pmatrix}2&1\\1&2\end{pmatrix}" />——两个方向，最理想。</strong>
        迹 4、行列式 3，方程 <MathInline tex="\lambda^2 - 4\lambda + 3 = 0" />，根是
        <MathInline tex="3" /> 和 <MathInline tex="1" />（和为 4、积为 3，对）。
        特征向量：<MathInline tex="\lambda=3" /> 时解
        <MathInline tex="\begin{pmatrix}-1&1\\1&-1\end{pmatrix}\boldsymbol{v}=\boldsymbol{0}" />
        得 <MathInline tex="(1,1)" />（45° 方向）；<MathInline tex="\lambda=1" /> 时得
        <MathInline tex="(1,-1)" />（135° 方向）。
        验算：<MathInline tex="A(1,1) = (3,3) = 3(1,1)" />，
        <MathInline tex="A(1,-1) = (1,-1)" />。
        <strong>两个方向线性无关、够成一组基，可以对角化</strong>——第贰节那句直觉完全适用。
        （注意这两个方向<strong>互相垂直</strong>，这不是巧合：
        A 是<strong>对称矩阵</strong>，而对称矩阵的特征值必为实数、特征向量必可取成正交的。
        主成分分析、二次型化主轴、刚体的三根主轴，全靠这条。）
      </p>
      <p>
        <strong>结局二：<MathInline tex="\begin{pmatrix}1&1\\0&1\end{pmatrix}" />——只有一个方向，不可对角化。</strong>
        迹 2、行列式 1，方程 <MathInline tex="\lambda^2-2\lambda+1 = (\lambda-1)^2 = 0" />，
        <strong>根是 1，重数 2</strong>。可解特征向量时：
      </p>
      <MathBlock tex="(A - I)\boldsymbol{v} = \begin{pmatrix}0&1\\0&0\end{pmatrix}\begin{pmatrix}v_1\\v_2\end{pmatrix} = \begin{pmatrix}v_2\\0\end{pmatrix} = \boldsymbol{0} \;\Longrightarrow\; v_2 = 0" />
      <p>
        解集只有 <MathInline tex="(1,0)" /> 这一条线，<strong>1 维</strong>——
        根有两个，方向却只凑出一个。二维平面配不齐一组特征基，
        <strong>这个矩阵不可对角化</strong>。动画里选"剪切"扫一整圈只闪一次绿，就是这件事。
        遇到它，第贰节那套"各方向各过各的日子"失效，得改用别的工具
        （教科书里叫若尔当标准形，本讲不展开）。
      </p>
      <p>
        <strong>结局三：<MathInline tex="\begin{pmatrix}0&-1\\1&\ \ 0\end{pmatrix}" />——实方向一个都没有。</strong>
        迹 0、行列式 1，方程 <MathInline tex="\lambda^2 + 1 = 0" />，
        <strong>在实数里无解</strong>。这在几何上一目了然：它把每个向量硬转 90°，
        <strong>任何方向都保不住</strong>，扫一整圈也等不到共线。
      </p>
      <p>
        但换到复数里，<MathInline tex="\lambda = \pm i" /> 好端端地存在，
        对应的特征向量是 <MathInline tex="(1, \mp i)" />。
        <strong>"旋转"和"乘以 i"是同一件事</strong>——
        <router-link to="/complex/imaginary">复变第一讲</router-link>正是从这里出发的，
        而<router-link to="/linear-algebra/linear-map">上一讲</router-link>说过
        复数乘法写成实矩阵就是 <MathInline tex="\begin{pmatrix}a&-b\\b&\ \ a\end{pmatrix}" /> 这种形状。
        三条线索在这里合流。
      </p>
      <p>
        <strong>回味：能不能对角化，是这门课最后一道分水岭。</strong>
        结局一是最好的情形（尤其对称矩阵，总是这样），结局三只是<em>需要换个数域</em>，
        真正棘手的是结局二——<strong>根够了，方向不够</strong>。
        判据是：每个特征值对应的特征向量空间维数之和，够不够 n。
        （那个"维数"正是<router-link to="/linear-algebra/vector-space">上一讲</router-link>
        的 <MathInline tex="n - r" />，这里 <MathInline tex="A - I" /> 的秩是 1，
        所以解空间 <MathInline tex="2-1=1" /> 维，差了一维。）
      </p>
    </RevealBox>

    <h2><span class="sec-no">伍</span>买到了什么：长期行为的水晶球</h2>
    <ul>
      <li>
        <strong>微分方程组解耦</strong>：<MathInline tex="\boldsymbol{x}' = A\boldsymbol{x}" />
        在特征基下拆成 n 个互不相干的一维方程 <MathInline tex="y_i' = \lambda_i y_i" />，
        解就是 <MathInline tex="e^{\lambda_i t}" /> 的叠加——特征值的实部正负当场判定系统稳不稳定。
        拉格朗日问"太阳系会不会散架"，问的就是世纪方程的根；
      </li>
      <li>
        <strong>主成分分析（PCA）</strong>：数据云的<router-link to="/probability/clt">协方差矩阵</router-link>
        是<strong>对称</strong>的，所以由上面"结局一"那条，它的特征向量必定互相垂直、
        特征值必定是实数。这些方向指向数据"最伸展"的方位，特征值就是该方向的方差——
        降维就是只保留大特征值的那几个方向。二次型化主轴、椭圆的长短轴、
        欧拉那三根刚体主轴，都是这同一条定理的不同马甲；
      </li>
      <li>
        <strong>谷歌 PageRank</strong>：把网页链接关系写成转移矩阵，网页的重要性排序就是它最大特征值
        （λ = 1）对应的特征向量。它不是解特征方程解出来的（网页有几十亿个，
        <MathInline tex="n!" /> 项的行列式想都别想），而是<strong>反复相乘</strong>硬"迭"出来的——
        随便取个初始向量，乘上几十次转移矩阵，
        <strong>次要方向按 <MathInline tex="|\lambda_2/\lambda_1|^n" /> 的速度消亡</strong>，
        剩下的就是主特征向量。这叫<strong>幂迭代</strong>，
        和斐波那契的比值趋于 φ 是同一台机器（那里的消亡速度是
        <MathInline tex="|\psi/\varphi|^n \approx 0.382^n" />，所以 20 步就七位小数准）；
      </li>
      <li>
        <strong>数值分析的谱半径</strong>：迭代法
        <MathInline tex="\boldsymbol{x}_{k+1} = B\boldsymbol{x}_k + \boldsymbol{c}" />
        收敛当且仅当 B 的特征值全部满足 |λ| &lt; 1——把误差按特征基拆开，
        每个分量各自按 <MathInline tex="\lambda_i^k" /> 演化，
        <strong>每个方向都在收缩，误差才会灭绝</strong>；只要有一个方向 |λ| ≥ 1，
        那个方向的误差就永不消失甚至爆炸。
        <router-link to="/numerical/linear-system">数值分析第五讲</router-link>背的
        "谱半径小于 1"，就是这句话；
      </li>
      <li>
        <strong>回望第一讲</strong>：<MathInline tex="\lambda = 0" /> 是特征值，
        当且仅当存在非零向量被送进原点，也就是
        <router-link to="/linear-algebra/determinant">det A = 0</router-link>、
        矩阵不可逆、<router-link to="/linear-algebra/elimination">方程组出事</router-link>。
        <strong>"可逆"这个从第一讲追到现在的主角，最后被写成了一句关于特征值的话</strong>：
        A 可逆 ⟺ 0 不是它的特征值。
      </li>
    </ul>
    <div class="insight">
      <div class="insight-title">🔗 通往后面课程的桥</div>
      <p>
        本讲是全课收官，也是两座重要桥梁的桥头堡。
        <strong>复变函数</strong>：实矩阵的复特征值揭示"旋转"一直藏在实数世界里，
        复数只是把它请出来的语言——<router-link to="/complex/imaginary">复变第一讲</router-link>
        从三次方程出发也走到了同一个地方，而
        <router-link to="/complex/holomorphic">第二讲</router-link>的柯西-黎曼方程
        说的正是"雅可比矩阵长成旋转伸缩那种形状"。
        <strong>数学物理方程</strong>：解弦振动、热传导时用的
        <router-link to="/mathphys/separation">分离变量法</router-link>，
        本质是在无穷维<router-link to="/linear-algebra/vector-space">函数空间</router-link>里找特征向量——
        <strong>驻波模式就是特征向量，频率就是特征值</strong>，
        而<router-link to="/mathphys/heat">傅里叶展开</router-link>就是"按特征基拆开、各过各的日子"
        （<b>本站那两讲都从零讲起，不需要先修</b>）。整套解法是本讲在函数空间的重演。
        学到那里时，请务必回来重读"破局"一节。
      </p>
      <p>
        <strong>微积分</strong>：把 <MathInline tex="\boldsymbol{x}' = A\boldsymbol{x}" />
        按特征基拆开后得到的 <MathInline tex="y' = \lambda y" />，解是
        <MathInline tex="e^{\lambda t}" />——而<router-link to="/calculus/taylor">泰勒讲</router-link>
        那条 <MathInline tex="e^{i\theta} = \cos\theta + i\sin\theta" /> 在这里兑现了它的用处：
        <strong>复特征值的虚部就是振荡的频率，实部就是包络的增长或衰减</strong>。
        拉格朗日问"太阳系会不会散架"，问的正是那些实部是正是负。
      </p>
    </div>
  </ConceptPage>
</template>
