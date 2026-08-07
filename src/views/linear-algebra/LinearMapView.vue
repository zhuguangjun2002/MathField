<script setup>
import ConceptPage from '../../components/ConceptPage.vue'
import MathBlock from '../../components/MathBlock.vue'
import MathInline from '../../components/MathInline.vue'
import RevealBox from '../../components/RevealBox.vue'
import QuizBox from '../../components/QuizBox.vue'
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
      （先把记号读出声：<MathInline tex="(AB)_{ij}" /> 是乘积表里第 i 行第 j 列的那个数；
      <MathInline tex="\Sigma_k" /> 是"连加"速记——让 k 从 1 数到头，把每个
      <MathInline tex="a_{ik}b_{kj}" /> 加起来。读得出声，也照样不解气。）
      为什么不学加法那样对应元素相乘（那多自然）？谁规定的行乘列？
      而且这条规则还带着一身怪癖：<strong>顺序不能换</strong>（<MathInline tex="AB \neq BA" />）、
      <strong>形状还得对得上</strong>（<MathInline tex="m\times n" /> 只能乘
      <MathInline tex="n\times p" />）、<strong>两个非零矩阵相乘居然可能得零</strong>。
      教科书通常一声不吭地给出规则，仿佛这是天经地义。
      <strong>但历史上没有任何定义是天经地义的——古怪的规则背后一定藏着一个让它变得必然的问题。</strong>
    </p>
    <div class="story">
      <div class="story-title">📜 1858 年 · 凯莱给记账表发身份证</div>
      <p>
        英国律师出身的数学家<strong>凯莱</strong>研究坐标变换（形如
        <MathInline tex="x' = ax + by,\ y' = cx + dy" /> 的"替换"——
        这里的撇号只是"新坐标"的记号，跟导数毫无关系）时，
        决定把替换的系数抽出来当作<strong>一个独立的对象</strong>来运算，
        写出了《矩阵论回忆录》。他定义两个矩阵的乘积时没有丝毫犹豫地选择了"行乘列"——
        因为他要的根本不是"两张数表相乘"，而是<strong>两次替换先后执行的合成结果</strong>。
        规则不是设计出来的，是被这个需求<strong>算</strong>出来的。
      </p>
      <p>
        注意这个时间点：<router-link to="/linear-algebra/elimination">第一讲</router-link>那张记账表
        早在两千年前就有了，<router-link to="/linear-algebra/determinant">第二讲</router-link>的行列式
        也早了 170 年——<strong>矩阵是这门课里最晚拿到身份证的那个</strong>。
        先有表、先有判别数，最后才有人说"这张表本身是个东西"。
        连名字都带着这段历史：matrix（矩阵）一词是凯莱的挚友<strong>西尔维斯特</strong>
        1850 年造的，取拉丁语"母体"之意——在他眼里这张表是"能生出行列式的母体"，
        名字里就刻着第二讲的胎记。
      </p>
    </div>

    <h2><span class="sec-no">贰</span>破局：矩阵不是数表，是变换的名片</h2>
    <p>
      第一讲里矩阵是方程组的记账表，那只是它的童年。成年的矩阵是另一种东西：
      <strong>一条把整张平面搬来搬去的指令</strong>。指令内容极简——你甚至不用记住每个点去哪，
      只需记住两个基向量的去向（<MathInline tex="\boldsymbol{e}_1=(1,0)" />、
      <MathInline tex="\boldsymbol{e}_2=(0,1)" /> 就是上一讲认过的<strong>标准基</strong>：
      横、竖两支单位箭头。记号也先认好：方括号里<strong>竖着写的一列数就是一个向量的坐标</strong>，
      竖写只为看清"它是矩阵的一列"；箭头 <MathInline tex="\mapsto" /> 读作"被送到"）：
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
      有了这副眼镜，就可以正面解开乘法之谜了。<strong>设先做变换 B、再做变换 A</strong>，
      合起来仍然是一个把平面搬来搬去的动作，所以它也该有一张名片——
      而名片上只需写两个基向量的最终去向。把这笔账算完，答案会自己长成"行乘列"的样子。
    </p>
    <RevealBox
      title="🔍 把行乘列算出来：跟着一个基向量走完两步"
      label="对答案 / 看完整拆解"
    >
      <template #hint>
        先自己动笔：<MathInline tex="B = \begin{bmatrix} b_{11} & b_{12} \\ b_{21} & b_{22}\end{bmatrix}" />
        先作用，<MathInline tex="A = \begin{bmatrix} a_{11} & a_{12} \\ a_{21} & a_{22}\end{bmatrix}" /> 后作用。
        <strong>跟着 <MathInline tex="\boldsymbol{e}_1" /> 走：B 先把它送到哪？</strong>
        然后 A 再把那个向量送到哪？（提示：用上面那句"A 作用 = 用分量去组合 A 的两列"。）
        算出合成后 <MathInline tex="\boldsymbol{e}_1" /> 的最终去向，两个分量，写完再点开。
      </template>
      <p>
        <strong>第一步：B 先动手。</strong>按名片法则，B 把
        <MathInline tex="\boldsymbol{e}_1" /> 送到它的第一列：
      </p>
      <MathBlock tex="\boldsymbol{e}_1 \;\xrightarrow{\ B\ }\; \begin{bmatrix} b_{11} \\ b_{21} \end{bmatrix}" />
      <p>
        <strong>第二步：A 接着动手。</strong>现在要把上面那个向量交给 A。
        它的两个分量是 <MathInline tex="b_{11}" /> 和 <MathInline tex="b_{21}" />，
        所以按同一条法则——<strong>用分量去组合 A 的两列</strong>：
      </p>
      <MathBlock tex="\begin{bmatrix} b_{11} \\ b_{21} \end{bmatrix} \;\xrightarrow{\ A\ }\; b_{11}\begin{bmatrix} a_{11} \\ a_{21} \end{bmatrix} + b_{21}\begin{bmatrix} a_{12} \\ a_{22} \end{bmatrix} = \begin{bmatrix} a_{11}b_{11} + a_{12}b_{21} \\ a_{21}b_{11} + a_{22}b_{21} \end{bmatrix}" />
      <p>
        <strong>第三步：认出来。</strong>这就是合成变换名片上的<strong>第一列</strong>。
        盯住上面那个分子：<MathInline tex="a_{11}b_{11} + a_{12}b_{21}" />——
        <strong>A 的第一<em>行</em>，配 B 的第一<em>列</em></strong>。
        第二个分量是 A 的第二行配 B 的第一列。
      </p>
      <p>
        <strong>第四步：对 <MathInline tex="\boldsymbol{e}_2" /> 重来一遍</strong>（B 把它送到第二列
        <MathInline tex="(b_{12}, b_{22})" />，其余一模一样），得到第二列。合起来：
      </p>
      <MathBlock tex="AB = \begin{bmatrix} a_{11}b_{11} + a_{12}b_{21} & a_{11}b_{12} + a_{12}b_{22} \\ a_{21}b_{11} + a_{22}b_{21} & a_{21}b_{12} + a_{22}b_{22} \end{bmatrix}, \qquad (AB)_{ij} = \sum_k a_{ik}b_{kj}" />
      <p>
        <strong>回味：「行乘列」是「变换复合」的账单，一个符号都不多。</strong>
        那个求和号 <MathInline tex="\sum_k" /> 记的是"中转站有几个方向"——
        B 把输入拆成 k 个基方向送出去，A 再把这 k 份各自加工后汇总。
        <strong>它不是规定，是走完两步之后剩下的账。</strong>
      </p>
      <p>
        顺带看清"接口"那条规矩：中转站的方向数必须两边一致，
        所以 B 的输出维数得等于 A 的输入维数。
        <strong>"维数不匹配不能相乘"不是禁令，是接线接不上</strong>。
      </p>
    </RevealBox>
    <p>
      开篇那三个怪癖，现在也都有了答案——而且都不需要展开一个求和号。
    </p>
    <ul>
      <li>
        <strong>为什么 <MathInline tex="AB \neq BA" /></strong>：动作有先后。
        先旋转再拉伸，和先拉伸再旋转，本来就是两回事——
        下面这个折叠框里有个只用两个整数矩阵的具体反例；
      </li>
      <li>
        <strong>为什么结合律成立</strong>：<MathInline tex="(AB)C" /> 和
        <MathInline tex="A(BC)" /> 都是"依次做 C、B、A"这同一串动作，
        加括号只是记账的分组方式。<strong>动作串本身没变，结果当然一样</strong>；
      </li>
      <li>
        <strong>为什么两个非零矩阵能乘出零</strong>：因为变换会<em>丢信息</em>。
        B 先把整个平面压扁到一条直线上（<router-link to="/linear-algebra/determinant">上一讲</router-link>
        说的 det = 0），A 再把那条直线压成一个点，合起来当然把一切送进原点。
        普通数字乘法里没有这种事，是因为一个非零数不会"压扁"任何东西。
      </li>
    </ul>
    <RevealBox
      title="🔍 一个具体反例：旋转和拉伸换个顺序，结果差在哪"
      label="对答案 / 看完整拆解"
    >
      <template #hint>
        先自己动笔：取 <MathInline tex="A" /> = 逆时针旋转 90°（它把
        <MathInline tex="\boldsymbol{e}_1" /> 送到 <MathInline tex="\boldsymbol{e}_2" />、
        把 <MathInline tex="\boldsymbol{e}_2" /> 送到 <MathInline tex="-\boldsymbol{e}_1" />），
        <MathInline tex="B" /> = 只把 x 方向拉长 2 倍。<strong>先写出这两个矩阵</strong>
        （用名片法则，两列就是两个基向量的去向），再把 <MathInline tex="AB" /> 和
        <MathInline tex="BA" /> 都乘出来。两个矩阵，算完再点开。
      </template>
      <p><strong>第一步：写出这两张名片。</strong></p>
      <MathBlock tex="A = \begin{bmatrix} 0 & -1 \\ 1 & \ \ 0 \end{bmatrix} \quad(\text{旋转 }90^\circ), \qquad B = \begin{bmatrix} 2 & 0 \\ 0 & 1 \end{bmatrix} \quad(x\ \text{方向拉长 }2\text{ 倍})" />
      <p><strong>第二步：先拉伸后旋转。</strong></p>
      <MathBlock tex="AB = \begin{bmatrix} 0 & -1 \\ 1 & \ \ 0 \end{bmatrix}\begin{bmatrix} 2 & 0 \\ 0 & 1 \end{bmatrix} = \begin{bmatrix} 0 & -1 \\ 2 & \ \ 0 \end{bmatrix}" />
      <p><strong>第三步：先旋转后拉伸。</strong></p>
      <MathBlock tex="BA = \begin{bmatrix} 2 & 0 \\ 0 & 1 \end{bmatrix}\begin{bmatrix} 0 & -1 \\ 1 & \ \ 0 \end{bmatrix} = \begin{bmatrix} 0 & -2 \\ 1 & \ \ 0 \end{bmatrix}" />
      <p>
        <strong>第四步：读出差别在哪。</strong>看第一列——它就是
        <MathInline tex="\boldsymbol{e}_1" /> 的最终去向：
      </p>
      <ul>
        <li>
          <MathInline tex="AB" />：<MathInline tex="\boldsymbol{e}_1 \mapsto (0, 2)" />。
          先被拉成长度 2，<strong>然后</strong>整根转上去——<strong>长度 2 的竖直向量</strong>；
        </li>
        <li>
          <MathInline tex="BA" />：<MathInline tex="\boldsymbol{e}_1 \mapsto (0, 1)" />。
          先转成竖直的，<strong>然后</strong>才拉伸——可拉伸只作用于 x 方向，
          而它此刻已经站得笔直，<strong>一点没被拉长</strong>。
        </li>
      </ul>
      <p>
        <strong>回味：两次的"拉伸"作用在了不同的方向上。</strong>
        矩阵不交换，不是代数上的怪癖，是"先做什么"这件事在现实里本来就有区别——
        先穿袜子再穿鞋，和先穿鞋再穿袜子，结果确实不同。
        （<MathInline tex="\det" /> 倒是不受影响：两边都是
        <MathInline tex="2" />，正合<router-link to="/linear-algebra/determinant">上一讲</router-link>
        那条 <MathInline tex="\det(AB) = \det A \cdot \det B" />——
        面积倍率与顺序无关，形状却大不相同。）
      </p>
    </RevealBox>
    <QuizBox
      quiz-id="linear-map-q1"
      question="矩阵乘法为什么不交换（$AB \neq BA$）？根子在哪？"
      hint="矩阵乘法是在给什么东西记账？"
      :options="[
        { t: '因为乘法记的是「动作的先后合成」，而动作有先后之分', why: '对。AB 读作「先做 B、再做 A」——先拉伸再旋转与先旋转再拉伸，本来就是两套动作（折叠框里那个 (0,2) 对 (0,1) 的反例）。不交换不是代数怪癖，是现实世界「先穿袜子还是先穿鞋」的忠实记录。' },
        { t: '因为「行乘列」这个算法碰巧不对称，换个更好的定义就交换了', why: '方向反了：算法长这样，恰恰因为它必须给「动作合成」记账——那笔账是从需求里算出来的（贰节折叠框全程推过），不是设计者的口味。任何忠实记录动作合成的乘法都不可能交换，因为动作合成本身不交换。' },
        { t: '只是教科书没找到好记号，本质上还是交换的', why: '不是记号问题：AB 与 BA 可以是两个实实在在不同的矩阵，作用在同一个向量上给出不同的点——(0,2) 和 (0,1) 谁也变不成谁。有些矩阵对碰巧交换（比如两个旋转），但那是例外不是规则。' },
      ]"
      :answer="0"
    />

    <h2><span class="sec-no">叁</span>亲眼看指令如何变形整张平面</h2>
    <p>
      下面这个动画有六个控件：一个预设下拉、一个"变形进度"，
      外加四个直接控制矩阵四个元素的滑杆。
      <strong>建议先只用预设 + 变形进度看整体，再回头拖那四个数看每一列各管什么。</strong>
    </p>
    <MatrixTransformDemo />

    <h2><span class="sec-no">肆</span>严格定义</h2>
    <div class="definition">
      <div class="def-title">📐 定义（线性变换及其矩阵表示）</div>
      <p>
        映射 <MathInline tex="T: \mathbb{R}^n \to \mathbb{R}^m" /> 称为<strong>线性变换</strong>
        （<MathInline tex="\mathbb{R}^n" /> 指"n 个坐标凑成的向量"的全体；
        长箭头 <MathInline tex="\to" /> 标明"吃哪种向量、吐哪种向量"，
        与前面单个向量去向的短箭头 <MathInline tex="\mapsto" /> 分工不同），
        若对任意向量 <MathInline tex="\boldsymbol{u}, \boldsymbol{v}" /> 与数 <MathInline tex="k" />：
      </p>
      <MathBlock tex="T(\boldsymbol{u} + \boldsymbol{v}) = T(\boldsymbol{u}) + T(\boldsymbol{v}), \qquad T(k\boldsymbol{u}) = k\, T(\boldsymbol{u})" />
      <p>
        <strong>定理</strong>：每个线性变换唯一对应一个 <MathInline tex="m \times n" /> 矩阵，其第 j 列为
        <MathInline tex="T(\boldsymbol{e}_j)" />；且变换的复合对应矩阵的乘积：
        <MathInline tex="T_A \circ T_B = T_{AB}" />
        （<MathInline tex="\circ" /> 读"复合"——先做右边的 <MathInline tex="T_B" />、
        再做左边的 <MathInline tex="T_A" />，跟矩阵乘积的读法一致，都从右往左）。
      </p>
    </div>
    <p>两条公理逐词拆解：</p>
    <ul>
      <li>
        <strong>保持加法、保持数乘</strong>——合起来就是"保持线性组合"。
        动画里网格变形后仍是"平行四边形网格"，就是这两条在起作用；
      </li>
      <li>
        定理里的"<strong>唯一对应</strong>"是重点：矩阵和线性变换是同一事物的两套写法，
        一个几何、一个坐标。教科书先给矩阵后给变换，历史和逻辑的顺序恰好相反；
      </li>
      <li>
        <strong>注意定义里没有"平移"的位置</strong>。这不是疏漏，下面就会看到，
        平移被这两条公理明确地排除在外了。
      </li>
    </ul>
    <p>
      定义只给条件，不给感觉。要真懂这两行，最快的办法是<strong>看它把谁挡在了门外</strong>——
      下面三个例子，一个是标准的线性变换，另外两个看着很"正常"却统统不合格。
    </p>
    <RevealBox
      title="🔍 三个例子：谁是线性变换，谁被挡在门外"
      label="对答案 / 看完整拆解"
    >
      <template #hint>
        先自己判断这三个映射哪些是线性的：
        ① <MathInline tex="T(x,y) = (2x + y,\ x - y)" />；
        ② <MathInline tex="T(x,y) = (x + 1,\ y)" />（整张平面右移一格）；
        ③ <MathInline tex="T(x) = x^2" />（一维）。
        <strong>拿定义里那两条去验，别凭感觉。</strong>
        三个判断，想完再点开。
      </template>
      <p>
        <strong>① 是线性的。</strong>验加法（这里的下标 1、2 给"两个不同的向量"编号，
        与基向量 <MathInline tex="\boldsymbol{e}_1, \boldsymbol{e}_2" /> 的下标不是一回事）：
      </p>
      <MathBlock tex="T\bigl((x_1,y_1)+(x_2,y_2)\bigr) = \bigl(2(x_1{+}x_2)+(y_1{+}y_2),\ (x_1{+}x_2)-(y_1{+}y_2)\bigr)" />
      <p>
        把括号拆开重排，正是 <MathInline tex="T(x_1,y_1) + T(x_2,y_2)" />。
        数乘同理。它的矩阵按名片法则一眼可得——
        <MathInline tex="\boldsymbol{e}_1 = (1,0) \mapsto (2,1)" />、
        <MathInline tex="\boldsymbol{e}_2 = (0,1) \mapsto (1,-1)" />，所以
        <MathInline tex="A = \begin{bmatrix}2 & 1\\ 1 & -1\end{bmatrix}" />。
      </p>
      <p>
        <strong>② 平移<em>不是</em>线性变换。</strong>这一条最反直觉——
        平移明明是最"规矩"的动作，直线仍是直线、平行线仍平行、连长度都不变。
        可它过不了数乘那一关。取 <MathInline tex="k = 2" />、
        <MathInline tex="\boldsymbol{u} = (1,0)" />：
      </p>
      <MathBlock tex="T(2\boldsymbol{u}) = T(2,0) = (3,\,0), \qquad 2\,T(\boldsymbol{u}) = 2\,(2,0) = (4,\,0)" />
      <p>
        <MathInline tex="3 \neq 4" />，不合格。<strong>更根本的理由只有一行</strong>：
        任何线性变换都必须把原点送回原点，因为
        （注意式中粗体 <MathInline tex="\boldsymbol{0}" /> 是零<em>向量</em>、细体 0 是数零）
      </p>
      <MathBlock tex="T(\boldsymbol{0}) = T(0 \cdot \boldsymbol{0}) = 0 \cdot T(\boldsymbol{0}) = \boldsymbol{0}" />
      <p>
        而平移把原点挪走了。<strong>"原点不动"不是线性变换的一条附加性质，
        它是定义的直接推论</strong>——这也是动画里网格无论怎么变形，
        中心那个交点始终钉在原地的原因。
      </p>
      <p>
        （那计算机图形学里天天在做的平移怎么办？答案是把二维点升到三维、
        末位补 1，平移就变成了三维里的一个线性变换——那叫<strong>齐次坐标</strong>，
        是个漂亮的绕道，但它绕的正是这里这道门槛。）
      </p>
      <p>
        <strong>③ <MathInline tex="x^2" /> 更不用说。</strong>
        <MathInline tex="T(2x) = 4x^2" />，而 <MathInline tex="2T(x) = 2x^2" />。
        <strong>"线性"和中学说的"一次函数"也不是一回事</strong>：
        <MathInline tex="y = kx + b" /> 在 <MathInline tex="b \neq 0" /> 时同样不线性
        （它是②那种平移的一维版）。真正的线性只有 <MathInline tex="y = kx" />。
      </p>
      <p>
        <strong>回味：这两条公理挡掉的，恰好是"会挪动原点"和"会弯曲"的那些。</strong>
        留下来的世界干净得可以用两列数完全描述——
        代价是它<em>那么</em>小，而收获是它<em>完全</em>可算。
        这门课后面所有的力气，都花在把不线性的问题<strong>局部地</strong>
        变成线性问题（<router-link to="/calculus/derivative">导数</router-link>就是最著名的那次）。
      </p>
    </RevealBox>
    <QuizBox
      quiz-id="linear-map-q2"
      question="中学的一次函数 $y = kx + b$（$b \neq 0$），是不是线性变换？"
      hint="拿定义的两条去验，别凭「名字里有个线」下结论。"
      :options="[
        { t: '不是：它过不了数乘关——本质上是「y = kx 再平移」，而平移挪动了原点', why: '对。验一下：T(2x) = 2kx + b，而 2T(x) = 2kx + 2b，b ≠ 0 时两者不等。「线性」这个数学名词比中学的「一次函数」严格：必须过原点。名字撞车是历史遗留，别让它骗了你。' },
        { t: '是：它的图象是一条直线，这不就是「线性」吗', why: '图象是直线只保证「不弯曲」，可线性变换还要求「不挪原点」——T(0) = 0 是定义的直接推论。y = kx + b 在 x = 0 处给出 b ≠ 0，第一关就倒下。图形学里的平移要靠齐次坐标绕道，绕的正是这道门槛。' },
        { t: '是不是取决于 k：k ≠ 0 就是线性的', why: 'k 管的是「压不压扁」（可逆性），跟线性无关。真正的分水岭在 b：b = 0 时 y = kx 对任何 k（包括 0）都是线性的；b ≠ 0 时对任何 k 都不是。' },
      ]"
      :answer="0"
    />

    <h2><span class="sec-no">伍</span>买到了什么：一副看变换的眼镜</h2>

    <h3>浏览器每一帧动画背后：CSS transform 就是这一讲</h3>
    <p>
      在网页上写一句 <code>transform: rotate(30deg)</code>，元素就转了 30 度；
      手机相册里双指旋转照片、游戏里镜头一转——屏幕上千万个点整齐地挪去新位置。
      逐个点去记"该去哪"显然不可能，浏览器和显卡用的正是本讲的名片法则：
      <strong>只存两个基向量的去向，一切点的去向自动锁死</strong>。
    </p>
    <p>
      具体到 <code>rotate(30deg)</code>：按刚才和角公式折叠框里的旋转名片，
      <MathInline tex="\boldsymbol{e}_1 \mapsto (\cos 30^\circ, \sin 30^\circ) = (0.866,\ 0.5)" />、
      <MathInline tex="\boldsymbol{e}_2 \mapsto (-0.5,\ 0.866)" />。
      元素上任何一个点，比如 <MathInline tex="(2, 0)" />，去向就是
      <MathInline tex="2 \times (0.866, 0.5) = (1.732,\ 1)" />——一次"用分量组合两列"。
      浏览器内部把一切写成 <code>matrix(a, b, c, d, e, f)</code>：
      前四个数正是本讲的矩阵（按列排放），后两个是平移量——
      肆节说平移不是线性变换，工程师的对策就是把它单独挂在车尾。
    </p>
    <p>
      <strong>真正的性能戏法在"复合 = 乘积"。</strong>一个元素往往叠着好几层动作：
      先转 30°、再横向拉长 2 倍、外面容器又转了一下……
      笨办法是让每个点挨个经历每层动作；浏览器的做法是<strong>先把几张名片乘成一张</strong>——
      比如"转 30° 再横向拉 2 倍"合成为
      <MathInline tex="\begin{bmatrix} 1.732 & -1 \\ 0.5 & 0.866 \end{bmatrix}" />
      （拿 <MathInline tex="(2,0)" /> 验算：直接乘这张合成名片得
      <MathInline tex="(3.464,\ 1)" />，与先转后拉两步走的结果一致）——
      然后千万个点<strong>每个只乘一次</strong>。动作再多，每点的开销恒定。
      3D 游戏引擎每帧对几百万顶点做的正是同一件事，只是矩阵升到了 4×4。
    </p>
    <p>
      <strong>条件不成立会怎样？</strong>试试 <code>transform: matrix(1, 1, 1, 1, 0, 0)</code>——
      两列相同，det = 0，整个元素被压扁成一条 45° 的细线。浏览器不报错、照样执行：
      <router-link to="/linear-algebra/determinant">上一讲</router-link>的"压扁事故"，
      你可以在任何网页的开发者工具里亲手复现。而被压扁的元素再也"拉不回来"——
      压扁丢掉的信息谁也还原不了，这正是可逆性从第一讲一路讲到这里的原因。
    </p>
    <QuizBox
      quiz-id="linear-map-q3"
      question="写下乘积 $R(\alpha)R(\beta)$ 作用在一个向量上。先转的是 α 还是 β？"
      hint="矩阵挨着向量的那一个先动手。"
      :options="[
        { t: '先转 β——写在右边的矩阵先作用，因为它离向量最近', why: '对。R(α)R(β)v 从右往左读：v 先交给 R(β)，结果再交给 R(α)。旋转碰巧交换（转椅子先 30° 后 40° 与先 40° 后 30° 一样），所以这里顺序错了也看不出来——可一旦混进拉伸，写反顺序就是实打实的 bug，图形代码里最常见的一类。' },
        { t: '先转 α——公式从左往右读，左边的先做', why: '恰好相反：矩阵作用写成 Av，矩阵在向量左边，所以一串乘积里「挨着向量的」（最右）先动手。这跟函数复合 f(g(x)) 先算 g 是同一个约定——∘ 和矩阵乘法都从右往左读。' },
        { t: '无所谓，反正结果一样', why: '对纯旋转碰巧成立（旋转彼此交换），但这是特权不是通则：把其中一个换成拉伸，AB 与 BA 立刻分家——贰节那个 (0,2) 对 (0,1) 的反例就是证据。约定「从右往左」正是为了在不交换的世界里不出错。' },
      ]"
      :answer="0"
    />

    <ul>
      <li>
        <strong>微积分的导数，本质是一个矩阵</strong>（写给已读过微积分的读者；还没读的记一句就够：
        那门课的核心动作"局部用直线冒充曲线"，到多元时冒充者正是本讲的矩阵）：
        多元函数 <MathInline tex="f: \mathbb{R}^n \to \mathbb{R}^m" /> 在一点的导数，
        就是"局部把 f 看成线性变换"的那个矩阵——雅可比矩阵。
        <router-link to="/linear-algebra/determinant">上一讲</router-link>的雅可比行列式，
        正是这个矩阵的 det；
      </li>
      <li>
        <strong>下一讲的跳板</strong>：既然矩阵的本事是"作用在向量上"，那么"向量"一定得是坐标数组吗？
        函数能不能被变换作用？——这一问，问出了<router-link to="/linear-algebra/vector-space">向量空间</router-link>。
      </li>
    </ul>
    <p>
      还有一件事最能说明"换个视角有多值钱"：你在中学背了好几年的和角公式，
      其实是矩阵乘法的一行账。
    </p>
    <RevealBox
      title="🔍 和角公式的免费证明：把两次旋转乘起来"
      label="对答案 / 看完整拆解"
    >
      <template #hint>
        先自己动笔：写出旋转角 <MathInline tex="\theta" /> 的矩阵
        （用名片法则——<MathInline tex="\boldsymbol{e}_1" /> 转到
        <MathInline tex="(\cos\theta, \sin\theta)" />，
        <MathInline tex="\boldsymbol{e}_2" /> 转到哪？）。然后想一件显然的事：
        <strong>先转 β 再转 α，就是转 α+β</strong>。把这句话写成矩阵等式，
        对比两边的元素。四个等式，写完再点开。
      </template>
      <p>
        <strong>第一步：旋转矩阵。</strong><MathInline tex="\boldsymbol{e}_1" /> 转过 θ 到
        <MathInline tex="(\cos\theta, \sin\theta)" />；
        <MathInline tex="\boldsymbol{e}_2" /> 比它超前 90°，转到
        <MathInline tex="(-\sin\theta, \cos\theta)" />。两列一摆：
      </p>
      <MathBlock tex="R(\theta) = \begin{bmatrix} \cos\theta & -\sin\theta \\ \sin\theta & \ \ \cos\theta \end{bmatrix}" />
      <p>
        <strong>第二步：写下那句显然的话。</strong>先转 β 再转 α，总共就是转
        <MathInline tex="\alpha+\beta" />——这件事<strong>不需要任何三角学</strong>，
        转椅子转两次就是这个道理。翻译成矩阵：
      </p>
      <MathBlock tex="R(\alpha)\,R(\beta) = R(\alpha+\beta)" />
      <p><strong>第三步：把左边乘出来。</strong>老老实实行乘列：</p>
      <MathBlock tex="R(\alpha)R(\beta) = \begin{bmatrix} \cos\alpha\cos\beta - \sin\alpha\sin\beta & -(\sin\alpha\cos\beta + \cos\alpha\sin\beta) \\ \sin\alpha\cos\beta + \cos\alpha\sin\beta & \ \ \cos\alpha\cos\beta - \sin\alpha\sin\beta \end{bmatrix}" />
      <p><strong>第四步：和右边对号入座。</strong>右边是</p>
      <MathBlock tex="R(\alpha+\beta) = \begin{bmatrix} \cos(\alpha{+}\beta) & -\sin(\alpha{+}\beta) \\ \sin(\alpha{+}\beta) & \ \ \cos(\alpha{+}\beta) \end{bmatrix}" />
      <p>两个矩阵相等就是四个元素分别相等，而它们只给出两条独立的信息：</p>
      <MathBlock tex="\begin{aligned} \cos(\alpha+\beta) &= \cos\alpha\cos\beta - \sin\alpha\sin\beta \\ \sin(\alpha+\beta) &= \sin\alpha\cos\beta + \cos\alpha\sin\beta \end{aligned}" />
      <p>
        数值核一次：取 <MathInline tex="\alpha = 0.7" />、<MathInline tex="\beta = 0.4" />，
        两边算出来都是 <MathInline tex="0.45359612\ldots" /> 与
        <MathInline tex="0.89120736\ldots" />，小数点后八位一致。
      </p>
      <p>
        <strong>回味：那两条公式背了多年，其实只是"转两次等于转一次"这句废话的坐标写法。</strong>
        换个角度还能顺手多拿几条——把 β 换成 −β 得差角公式，
        令 <MathInline tex="\alpha = \beta" /> 得倍角公式，
        而 <MathInline tex="\det R(\theta) = \cos^2\theta + \sin^2\theta = 1" />
        当场就是勾股恒等式（旋转不改变面积，det 当然是 1）。
        <router-link to="/complex/imaginary">复变第一讲</router-link>用复数乘法做过同一件事——
        那不是巧合，下面就说。
      </p>
    </RevealBox>
    <div class="insight">
      <div class="insight-title">🔗 这副眼镜往后看向哪：站内连一连</div>
      <p>
        以下几处全在站内、全部从零讲起：
        <strong>复变函数</strong>：复数乘法 <MathInline tex="z \mapsto wz" /> 是"旋转 + 伸缩"
        （<router-link to="/complex/imaginary">第一讲</router-link>），
        写成实矩阵恰是 <MathInline tex="\begin{bmatrix} a & -b \\ b & a \end{bmatrix}" /> 这种特殊形状——
        上面那个旋转矩阵正是它取 <MathInline tex="a=\cos\theta,\ b=\sin\theta" /> 的样子。
        以后你会看到，<router-link to="/complex/holomorphic">"复可导"</router-link>就是要求雅可比矩阵
        长成这个形状，那就是柯西-黎曼方程的几何真身；
        <strong>数值分析</strong>：迭代法收敛与否，取决于每步那个变换矩阵是"拉伸"还是"收缩"——
        <router-link to="/linear-algebra/eigen">第五讲</router-link>会把这件事说清楚，
        <router-link to="/numerical/linear-system">数值分析第五讲</router-link>再把它变成能算的判据；
        <strong>数学物理方程</strong>：<router-link to="/mathphys/separation">分离变量法</router-link>
        之所以管用，是因为求导本身就是个线性变换（<MathInline tex="(f+g)' = f' + g'" />），
        而解方程就是在找这个变换的特殊方向。
      </p>
    </div>
  </ConceptPage>
</template>
