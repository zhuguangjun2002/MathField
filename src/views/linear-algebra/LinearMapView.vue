<script setup>
import ConceptPage from '../../components/ConceptPage.vue'
import MathBlock from '../../components/MathBlock.vue'
import MathInline from '../../components/MathInline.vue'
import MatrixTransformDemo from '../../demos/MatrixTransformDemo.vue'
</script>

<template>
  <ConceptPage slug="linear-map">
    <h2><span class="sec-no">壹</span>困境：世界上最别扭的乘法</h2>
    <p>
      每个学线性代数的人都在同一个地方摔过跤：矩阵乘法。加法老老实实对应元素相加，
      乘法却要"第 i <strong>行</strong>"去对"第 j <strong>列</strong>"，
      挨个相乘再求和：
    </p>
    <MathBlock tex="(AB)_{ij} = \sum_{k} a_{ik} \, b_{kj}" />
    <p>
      为什么不学加法那样对应元素相乘（那多自然）？谁规定的行乘列？
      教科书通常一声不吭地给出规则，仿佛这是天经地义。<strong>但历史上没有任何定义是天经地义的
      ——古怪的规则背后一定藏着一个让它变得必然的问题。</strong>
    </p>
    <div class="story">
      <div class="story-title">📜 1858 年 · 凯莱给记账表发身份证</div>
      <p>
        英国律师出身的数学家<strong>凯莱</strong>研究坐标变换（形如
        <MathInline tex="x' = ax + by,\ y' = cx + dy" /> 的"替换"）时，
        决定把替换的系数抽出来当作<strong>一个独立的对象</strong>来运算，
        写出了《矩阵论回忆录》。他定义两个矩阵的乘积时没有丝毫犹豫地选择了"行乘列"——
        因为他要的根本不是"两张数表相乘"，而是<strong>两次替换先后执行的合成结果</strong>。
        规则不是设计出来的，是被这个需求<strong>算</strong>出来的。
      </p>
    </div>

    <h2><span class="sec-no">贰</span>破局：矩阵不是数表，是变换的名片</h2>
    <p>
      第一讲里矩阵是方程组的记账表，那只是它的童年。成年的矩阵是另一种东西：
      <strong>一条把整张平面搬来搬去的指令</strong>。指令内容极简——你甚至不用记住每个点去哪，
      只需记住两个基向量的去向：
    </p>
    <MathBlock tex="\boldsymbol{e}_1 = \begin{bmatrix}1\\0\end{bmatrix} \mapsto \begin{bmatrix}a\\c\end{bmatrix}, \quad \boldsymbol{e}_2 = \begin{bmatrix}0\\1\end{bmatrix} \mapsto \begin{bmatrix}b\\d\end{bmatrix} \quad\Longrightarrow\quad A = \begin{bmatrix} a & b \\ c & d \end{bmatrix}" />
    <div class="insight">
      <div class="insight-title">💡 核心直觉：两列 = 两个基向量的去向</div>
      <p>
        任何向量都是基向量的组合：<MathInline tex="\boldsymbol{v} = x\boldsymbol{e}_1 + y\boldsymbol{e}_2" />。
        线性变换保持"组合关系"不变，所以 v 的去向被基向量的去向<strong>完全锁死</strong>：
        <MathInline tex="A\boldsymbol{v} = x \cdot (\text{第一列}) + y \cdot (\text{第二列})" />。
        矩阵乘向量的公式，不过是这句话的坐标翻译。整张平面的变形，信息量只有两列数——
        这就是矩阵这张"名片"上写的全部内容。
      </p>
    </div>
    <p>
      现在解开乘法之谜。设先做变换 B、再做变换 A，问合成后 <MathInline tex="\boldsymbol{e}_1" /> 去了哪：
      B 先把它送到 B 的第一列；A 再作用上去——按刚才的法则，就是用 B 第一列的各分量去组合 A 的各列。
      把这笔账算完，得到的恰好是：
    </p>
    <MathBlock tex="(AB)_{ij} = \sum_k a_{ik} b_{kj}" />
    <p>——「行乘列」就是「变换复合」的账单，一个符号都不多。</p>
    <p>
      顺手还能白捡两个"怪癖"的解释：<strong>为什么 AB ≠ BA</strong>——先旋转再拉伸，和先拉伸再旋转，
      本来就是两回事，动作的先后不能交换；<strong>为什么矩阵乘法结合律成立</strong>——
      三个动作接连做，怎么加括号都是同一串动作。不用展开一个求和号，全在几何里。
    </p>

    <h2><span class="sec-no">叁</span>亲眼看指令如何变形整张平面</h2>
    <MatrixTransformDemo />

    <h2><span class="sec-no">肆</span>严格定义</h2>
    <div class="definition">
      <div class="def-title">📐 定义（线性变换及其矩阵表示）</div>
      <p>
        映射 <MathInline tex="T: \mathbb{R}^n \to \mathbb{R}^m" /> 称为<strong>线性变换</strong>，若对任意向量
        <MathInline tex="\boldsymbol{u}, \boldsymbol{v}" /> 与数 <MathInline tex="k" />：
      </p>
      <MathBlock tex="T(\boldsymbol{u} + \boldsymbol{v}) = T(\boldsymbol{u}) + T(\boldsymbol{v}), \qquad T(k\boldsymbol{u}) = k\, T(\boldsymbol{u})" />
      <p>
        <strong>定理</strong>：每个线性变换唯一对应一个 <MathInline tex="m \times n" /> 矩阵，其第 j 列为
        <MathInline tex="T(\boldsymbol{e}_j)" />；且变换的复合对应矩阵的乘积：
        <MathInline tex="T_A \circ T_B = T_{AB}" />。
      </p>
    </div>
    <p>两条公理逐词拆解：</p>
    <ul>
      <li>
        <strong>保持加法、保持数乘</strong>——合起来就是"保持线性组合"。几何后果：直线仍是直线、
        原点不动、平行线保持平行、等距刻度保持等距。动画里网格变形后仍是"平行四边形网格"，就是这两条在起作用；
      </li>
      <li>
        定理里的"<strong>唯一对应</strong>"是重点：矩阵和线性变换是同一事物的两套写法，
        一个几何、一个坐标。教科书先给矩阵后给变换，历史和逻辑的顺序恰好相反；
      </li>
      <li>
        注意 <MathInline tex="m \times n" /> 矩阵乘 <MathInline tex="n \times p" /> 矩阵的"接口匹配"要求：
        B 的输出维数必须等于 A 的输入维数——因为复合就是把 B 的输出喂给 A，接口对不上就没法接线。
        "维数不匹配不能相乘"不是禁令，是物理事实。
      </li>
    </ul>

    <h2><span class="sec-no">伍</span>买到了什么：一副看变换的眼镜</h2>
    <ul>
      <li>
        <strong>微积分的导数，本质是一个矩阵</strong>：一元函数的导数是"局部把曲线看成直线"的斜率；
        多元函数 <MathInline tex="f: \mathbb{R}^n \to \mathbb{R}^m" /> 在一点的导数，
        就是"局部把 f 看成线性变换"的那个矩阵——雅可比矩阵。上一讲的雅可比行列式，正是这个矩阵的 det；
      </li>
      <li>
        <strong>三角恒等式的免费证明</strong>：旋转 α 再旋转 β = 旋转 α+β。把两边写成旋转矩阵的乘积，
        对比矩阵元素，<MathInline tex="\cos(\alpha+\beta) = \cos\alpha\cos\beta - \sin\alpha\sin\beta" />
        等公式自动掉出来——背了多年的公式原来是矩阵乘法的一行账；
      </li>
      <li>
        <strong>计算机图形学</strong>：屏幕上每一次旋转、缩放、投影都是矩阵作用；连续动作合成一个矩阵，
        千万个顶点只需各乘一次——"复合 = 乘积"直接变成了性能优化；
      </li>
      <li>
        <strong>下一讲的跳板</strong>：既然矩阵的本事是"作用在向量上"，那么"向量"一定得是坐标数组吗？
        函数能不能被变换作用？——这一问，问出了向量空间。
      </li>
    </ul>
    <div class="insight">
      <div class="insight-title">🔗 与你学过的课程连一连</div>
      <p>
        <strong>复变函数</strong>：复数乘法 <MathInline tex="z \mapsto wz" /> 是"旋转+伸缩"，
        写成实矩阵恰是 <MathInline tex="\begin{bmatrix} a & -b \\ b & a \end{bmatrix}" /> 这种特殊形状——
        以后你会看到，"复可导"就是要求雅可比矩阵长成这个形状（柯西-黎曼方程的几何真身）；
        <strong>计算数学</strong>：迭代法收敛与否，取决于每步那个变换矩阵是"拉伸"还是"收缩"——谱半径的故事，两讲之后见。
      </p>
    </div>
  </ConceptPage>
</template>
