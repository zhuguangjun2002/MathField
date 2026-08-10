<script setup>
import ConceptPage from '../../components/ConceptPage.vue'
import MathBlock from '../../components/MathBlock.vue'
import MathInline from '../../components/MathInline.vue'
import RevealBox from '../../components/RevealBox.vue'
import QuizBox from '../../components/QuizBox.vue'
import EigenDemo from '../../demos/EigenDemo.vue'
</script>

<template>
  <ConceptPage slug="eigen">
    <h2><span class="sec-no">壹</span>困境：变换一遍看得清，变换一万遍怎么办</h2>
    <p>
      先从一个中学生都会背的数列进门。1202 年，斐波那契在《计算之书》里用一对兔子出题，
      题目催生的数列流传至今：1, 1, 2, 3, 5, 8, 13, 21, 34, …——
      <strong>每一项是前两项之和</strong>，规则加法到不能再加法。可拿相邻两项做个除法：
      <MathInline tex="13/8 = 1.625" />、<MathInline tex="21/13 \approx 1.615" />、
      <MathInline tex="34/21 \approx 1.619" />……这串比值死死咬住一个<strong>无理数</strong>
      <MathInline tex="\varphi = (1+\sqrt5)/2 \approx 1.618" />——黄金比例。
      一条纯加法、纯整数的规则，凭什么吐出一个带根号的常数？目录页挂的那句悬念，本讲结案。
    </p>
    <p>
      这个小谜题和 18 世纪最重的大问题，形状竟然相同。
      <router-link to="/linear-algebra/linear-map">第三讲</router-link>把矩阵看成变换，
      一次作用还算直观；但真正要命的问题偏偏都是<strong>反复作用</strong>型的
      （斐波那契"再走一步"是反复，行星"再转一年"也是反复）：
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
      （<MathInline tex="\lambda" /> 读"拉姆达"，它就是一个<strong>普通的数</strong>——
      用希腊字母只是提醒你它身份特殊，不是什么新数学对象。）
      如果有这样的方向 v（特征向量）和伸缩倍数 λ（特征值），那么在这个方向上，
      矩阵这头猛兽退化成一个<strong>普通数字</strong>：作用一次是乘 λ，作用一百次就是乘
      <MathInline tex="\lambda^{100}" />。矩阵的幂算不动，数字的幂小学生都会。
    </p>
    <div class="insight">
      <div class="insight-title">💡 核心直觉：特征基下，矩阵原形毕露</div>
      <p>
        若能找到一整组基都由特征向量组成，把任意初始状态按这组基拆开：
        <MathInline tex="\boldsymbol{x} = c_1\boldsymbol{v}_1 + c_2\boldsymbol{v}_2" />，
        则演化 n 步后就是 <MathInline tex="A^n\boldsymbol{x} = c_1\lambda_1^n\boldsymbol{v}_1 + c_2\lambda_2^n\boldsymbol{v}_2" />
        （中间用了"A 作用在和上 = 分别作用再相加"——正是
        <router-link to="/linear-algebra/linear-map">第三讲</router-link>线性变换的定义本身）——
        各方向<strong>各过各的日子，互不打扰</strong>。术语叫"解耦"或"<strong>对角化</strong>"：
        换到特征基下，A 的表只剩对角线上的 <MathInline tex="\lambda_1, \lambda_2" />、其余全零——
        这种表叫<strong>对角矩阵</strong>，矩阵里最老实的一种。
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
        <MathInline tex="\lambda^2 - (\operatorname{tr}A)\lambda + \det A = 0" />。
        <MathInline tex="\operatorname{tr}A" /> 读"A 的<strong>迹</strong>"，定义极简：
        对角线元素之和。这里迹是 <MathInline tex="1+0=1" />、行列式是
        <MathInline tex="1\cdot 0 - 1\cdot 1 = -1" />，正好对上；
        这条规律本身会在肆节的折叠框里当场推出来。）
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
        <MathInline tex="c_1\boldsymbol{v}_1 + c_2\boldsymbol{v}_2" />。逐分量写开是个二元一次方程组：
        第二分量给出 <MathInline tex="c_1 + c_2 = 0" />，第一分量给出
        <MathInline tex="c_1\varphi + c_2\psi = 1" />；代入 <MathInline tex="c_2 = -c_1" /> 得
        <MathInline tex="c_1(\varphi - \psi) = 1" />，而 <MathInline tex="\varphi - \psi = \sqrt5" />，
        所以 <MathInline tex="c_1 = -c_2 = 1/\sqrt5" />。走 n 步：
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
    <QuizBox
      quiz-id="eigen-q1"
      question="一个特征值 λ 配的特征向量，是唯一的一个向量吗？"
      hint="拿定义验：v 满足 「A 作用后等于 λ 倍的 v」，那 2v 呢？-v 呢？"
      :options="[
        { t: '不唯一：拉长、缩短、反向都还满足定义——「特征」的其实是一整条过原点的直线', why: '对。A(2v) = 2Av = 2λv = λ(2v)，任何非零倍数都合格。所以说「特征方向」比「特征向量」更贴切；demo 里长度固定 1.4 只转方向、且 225° 与 45° 同样变绿（同一条直线的反向），都是这件事。' },
        { t: '唯一：一个 λ 恰好配一个 v，否则「特征」二字就不特殊了', why: '特殊的是「方向」不是「那支箭」：同一条直线上的向量全体（除零向量）都属于 λ。真正稀有的是方向本身——demo 扫一整圈通常只逮到两条线，这才是「特征」的分量。' },
        { t: '不唯一，而且可以偏离原方向一点点，差不多就行', why: '不行，共线是硬要求：偏离哪怕 1°，Av 与 v 就不再平行，定义立刻不满足。demo 的绿色判定留了 0.035 的数值容差，那是浮点世界的工程让步，不是数学定义松了口。' },
      ]"
      :answer="0"
    />

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
        特征方程是 λ 的 n 次多项式，所以<strong>特征值最多 n 个</strong>
        （n 次多项式至多 n 个根——中学对二次方程的经验，推广到高次照样成立），
        而且可能出现<strong>复根</strong>——要动用虚数
        <MathInline tex="i" />（约定 <MathInline tex="i^2 = -1" /> 的那个新数）才写得出的根。
        还没读过复变课不要紧，此处只需知道：实数里无解 ≠ 无解。
        动画里"旋转矩阵等不到绿色"就是这情形。
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
        A 是<strong>对称矩阵</strong>——沿主对角线翻折不变、即
        <MathInline tex="a_{ij} = a_{ji}" /> 的矩阵，本例两个 1 正好互为镜像——
        而对称矩阵的特征值必为实数、特征向量必可取成正交的。
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
    <QuizBox
      quiz-id="eigen-q2"
      question="特征方程解出一个二重根（根有两个但相等）。特征方向也一定能凑出两条吗？"
      hint="剪切矩阵刚在折叠框里演过它的结局。"
      :options="[
        { t: '不一定：剪切矩阵 $(\lambda-1)^2=0$ 根的重数是 2，特征方向却只有一条', why: '对。「根够了、方向不够」正是不可对角化的病灶：代数上数出来的重数，几何上未必配得齐同样多的独立方向。判据要一个特征值一个特征值地查：解空间维数（上一讲的 n − r）加总够不够 n。' },
        { t: '一定：n 个根（按重数数）就配 n 条方向', why: '这正是最值得拆掉的想当然。剪切矩阵 (1 1; 0 1) 的重根是 2，可 (A−I)v=0 的解空间只有 1 维——demo 里选「剪切」扫一整圈只闪一次绿，就是亲眼看这个反例。' },
        { t: '重根意味着根本没有特征方向', why: '方向不是没有，是不够：剪切矩阵好歹有 (1,0) 那一条。「一条都没有」是旋转矩阵的结局（实数里连根都没有），和重根的「有根缺方向」是两种不同的病。' },
      ]"
      :answer="0"
    />

    <h2><span class="sec-no">伍</span>买到了什么：长期行为的水晶球</h2>

    <h3>谷歌的第一桶金：把整个互联网排成一个特征向量</h3>
    <p>
      1998 年，斯坦福两个博士生佩奇和布林盯上了当时搜索引擎的死穴：按"关键词出现次数"排序，
      垃圾网页只要拼命堆砌关键词就能霸榜。他们的替代方案只有一句话：
      <strong>重要性由链接投票——被重要网页链接的网页，才重要</strong>。
      这话听着在绕圈子（定义"重要"用到了"重要"），可正是这个圈，把问题送进了本讲的地盘。
    </p>
    <p>
      <strong>为什么绕到特征向量？</strong>想象一个永不疲倦的网虫随机点链接闲逛。
      "下一步他在哪"的分布，等于"转移矩阵 M 乘以当前分布"——
      又是<strong>反复作用</strong>型问题，和壹节的形状一模一样。
      一个网页的重要性，就定义为网虫<strong>长期</strong>停留在它上面的频率；
      而"长期分布"意味着再走一步也不变：<MathInline tex="M\boldsymbol{x} = \boldsymbol{x}" />——
      <strong>这恰是 λ = 1 的特征向量</strong>。绕圈子的定义，翻译成数学是一句不动点方程。
    </p>
    <p>
      拿四个网页手算一遍。链接关系：A 链向 B、C；B 链向 C；C 链向 A；D 链向 A、C
      （每页把"一票"均分给它链出的页面）。从均匀分布
      <MathInline tex="(0.25,\ 0.25,\ 0.25,\ 0.25)" /> 出发反复乘 M：
      第一步 <MathInline tex="(0.375,\ 0.125,\ 0.5,\ 0)" />，第二步
      <MathInline tex="(0.5,\ 0.1875,\ 0.3125,\ 0)" />……来回震荡二十几步后，稳稳停在
    </p>
    <MathBlock tex="\boldsymbol{x}^* = (0.4,\ 0.2,\ 0.4,\ 0), \qquad M\boldsymbol{x}^* = \boldsymbol{x}^*\ \text{（代回去验：不动）}" />
    <p>
      排名出炉：A 与 C 并列第一，B 次之，<strong>D 得零分——因为没有任何网页链接它</strong>，
      网虫永远流不进去。注意算法自动识破了"自吹"：D 自己链出去两票拉关系，一分都换不回来。
    </p>
    <p>
      <strong>读出工程</strong>：真实互联网几十亿页，特征方程是几十亿次的多项式、
      行列式有 <MathInline tex="n!" /> 项——想都别想。可行的只有刚才那招笨办法：
      <strong>反复相乘，硬"迭"出来</strong>（术语叫幂迭代）。它管用的原因本讲已经讲过：
      次要方向按 <MathInline tex="|\lambda_2/\lambda_1|^n" /> 的速度消亡，剩下的就是主特征向量——
      和斐波那契比值趋于 φ 是同一台机器（那里消亡速度是
      <MathInline tex="0.382^n" />，20 步就七位小数准）。
      <strong>条件不成立会怎样？</strong>若网络裂成互不相通的几块、或存在"只进不出"的死循环区，
      网虫会被困住，λ = 1 的方向不止一条，排名失去唯一性。
      谷歌的对策写在原始论文里：让网虫每一步有 15% 的概率无视链接、随机跳到任意页面
      （"阻尼因子 0.85"）——这一改保证了主特征方向唯一，迭代必收敛。
      一门 18 世纪为行星轨道发明的数学，一百七十年后成了搜索引擎的地基。
    </p>
    <QuizBox
      quiz-id="eigen-q3"
      question="谷歌为什么不老老实实解特征方程，而要几十次「矩阵乘向量」硬迭代？"
      hint="几十亿阶的行列式有多少项？"
      :options="[
        { t: '因为几十亿阶的特征方程根本写不出来；幂迭代每步只需「矩阵乘向量」，还自动挑出 λ 最大的方向', why: '对。行列式 n! 项、高次方程无求根公式，正面进攻在 n 巨大时全线不通；而链接矩阵极稀疏，乘一次向量只花「链接总数」的功夫。幂迭代以退为进——不求全部特征值，只让时间替它筛出老大。' },
        { t: '因为解方程不够精确，迭代能算得更准', why: '账算反了：解特征方程（若能解）给的是精确答案，迭代才是逐步逼近。迭代胜出靠的不是精度，是可行性——n 巨大时它是唯一进得了场的选手。' },
        { t: '随便选的，两种方法成本差不多', why: '差得天远：特征方程路线的成本随 n 爆炸（行列式 n! 项起步），幂迭代一步只要一次稀疏矩阵乘向量，几十步收工。规模一大，「能算」与「不能算」就是全部区别——数值分析整门课都在算这种账。' },
      ]"
      :answer="0"
    />

    <ul>
      <li>
        <strong>微分方程组解耦</strong>（写给已读过微积分的读者，没读过跳过这条即可）：
        <MathInline tex="\boldsymbol{x}' = A\boldsymbol{x}" />
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
        而<router-link to="/mathphys/heat">傅里叶展开</router-link>就是"按特征基拆开、各过各的日子"。
        整套解法是本讲在函数空间的重演——那两讲都在站内、都从零讲起，
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
