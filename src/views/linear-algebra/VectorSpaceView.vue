<script setup>
import ConceptPage from '../../components/ConceptPage.vue'
import MathBlock from '../../components/MathBlock.vue'
import MathInline from '../../components/MathInline.vue'
import RevealBox from '../../components/RevealBox.vue'
import SpanDemo from '../../demos/SpanDemo.vue'
</script>

<template>
  <ConceptPage slug="vector-space">
    <h2><span class="sec-no">壹</span>困境：一套把戏，到处都在重演</h2>
    <p>
      19 世纪的数学家陆续注意到一件怪事：完全不同的领域里，反复上演着同一套剧情。
    </p>
    <ul>
      <li>几何里，两个箭头可以相加（平行四边形法则）、可以拉长缩短；</li>
      <li>
        代数里，两个多项式可以相加、可以乘常数；解微分方程时，两个解加起来还是解、
        解乘常数还是解（"叠加原理"）；
      </li>
      <li>分析里，两个函数、两个数列，同样能加、能数乘——傅里叶还发现波形可以像配菜一样叠加。</li>
    </ul>
    <p>
      每个领域都在各自证明几乎一样的定理：什么时候几个对象"互相独立"、最少需要几个对象才能拼出全体、
      换一组"基本对象"时系数怎么换算……<strong>同样的证明写了一遍又一遍，只是把"箭头"换成"多项式"再换成"函数"</strong>。
      数学家最痛恨的就是重复劳动。
    </p>
    <div class="story">
      <div class="story-title">📜 1844 年 · 一本没人读得懂的天书</div>
      <p>
        中学教师<strong>格拉斯曼</strong>出版《扩张论》，把 n 维空间、线性无关、基与维数一口气全部建立——
        比同时代人超前了半个世纪。代价是全欧洲几乎没人能读懂：概念太抽象、术语全是自造的，
        这本书<strong>沉寂了三十多年</strong>，格拉斯曼郁郁转行去研究梵文（并成了著名语言学家）。
        直到 1888 年，<strong>皮亚诺</strong>才把这套思想提炼成干净的公理清单——
        今天教科书上那 8 条向量空间公理，基本就是皮亚诺那份清单。
      </p>
    </div>

    <h2><span class="sec-no">贰</span>破局：不问"是什么"，只问"会什么"</h2>
    <p>
      公理化的思想转折在于一次彻底的换位：<strong>别再问"向量是什么东西"，改问"向量会做什么运算"</strong>。
      箭头、多项式、函数、数列，长相毫无共同点，但它们都会两件事：相加、数乘，
      而且这两种运算都守同样的规矩（交换律、结合律、有零元……）。那就干脆规定：
    </p>
    <div class="insight">
      <div class="insight-title">💡 核心直觉：向量空间是一张"会员资格"清单</div>
      <p>
        凡是配了加法和数乘、且满足那 8 条规矩的集合，一律称为<strong>向量空间</strong>，其成员一律称为"向量"。
        从此"向量"不再是一种东西，而是一种<strong>资格</strong>。
        这买到的是批发价的定理：凡是只用"加法、数乘、8 条规矩"证出来的结论，
        <strong>一次证明，全体会员通用</strong>——箭头版、多项式版、函数版、数列版同时成立。
        抽象不是故弄玄虚，是数学界的"一次编写，到处运行"。
      </p>
    </div>
    <p>
      在这套语言里，那些重演的剧情各就各位：「拼出全体」叫<strong>张成</strong>，
      「互相独立、没人多余」叫<strong>线性无关</strong>，「无关又能张成全体的最小班底」叫<strong>基</strong>，
      「班底的人数」叫<strong>维数</strong>。
    </p>
    <p>
      最后这一条藏着一个不该跳过的问题：<strong>凭什么"人数"是个确定的数？</strong>
      同一个空间可以有无穷多组基（平面上任意两个不共线的向量都能当基），
      万一有人挑出一组 2 个的、另一个人挑出一组 3 个的，"维数"这个词就没意义了。
      所以在用它之前，得先证明这种事不会发生。
    </p>
    <RevealBox
      title="🔍 维数为什么是良定义的：任何两组基，人数必定相同"
      label="对答案 / 看完整拆解"
    >
      <template #hint>
        先自己想一个更基本的问题：平面上能不能找到<strong>三个线性无关</strong>的向量？
        直觉说不能。<strong>但理由是什么？</strong>
        （提示：假设有三个，把其中一个用另外两个的坐标写出来，会得到一个几个方程、几个未知数的齐次方程组？
        再想想<router-link to="/linear-algebra/elimination">第一讲</router-link>说过，
        方程比未知数少的齐次方程组必有非零解。）想清楚再点开。
      </template>
      <p>
        <strong>第一步：核心引理——"能张成的人少，无关的人就不能多"。</strong>
        设 <MathInline tex="\boldsymbol{u}_1,\ldots,\boldsymbol{u}_m" /> 能张成整个空间 V，
        而 <MathInline tex="\boldsymbol{w}_1,\ldots,\boldsymbol{w}_n" /> 线性无关。断言：
      </p>
      <MathBlock tex="n \le m" />
      <p>
        <strong>第二步：证明它。</strong>因为那 m 个能张成全体，所以每个
        <MathInline tex="\boldsymbol{w}_j" /> 都能被它们拼出来：
      </p>
      <MathBlock tex="\boldsymbol{w}_j = \sum_{i=1}^{m} a_{ij}\,\boldsymbol{u}_i \qquad (j = 1,\ldots,n)" />
      <p>
        这些系数排成一个 <MathInline tex="m \times n" /> 的矩阵 A。
        现在考虑齐次方程组 <MathInline tex="A\boldsymbol{c} = \boldsymbol{0}" />：
        它有 <strong>m 个方程、n 个未知数</strong>。
      </p>
      <p>
        <strong>第三步：反设 <MathInline tex="n > m" />，方程比未知数少。</strong>
        <router-link to="/linear-algebra/elimination">第一讲</router-link>消完元后，
        主元最多 m 个，而未知数有 n 个，所以<strong>至少有 n − m 个自由变量</strong>——
        必定存在<strong>非零</strong>解 <MathInline tex="\boldsymbol{c} \neq \boldsymbol{0}" />。
        拿这组非零系数去组合那些 w：
      </p>
      <MathBlock tex="\sum_j c_j \boldsymbol{w}_j = \sum_j c_j \sum_i a_{ij}\boldsymbol{u}_i = \sum_i \Bigl(\underbrace{\sum_j a_{ij}c_j}_{=\,0}\Bigr)\boldsymbol{u}_i = \boldsymbol{0}" />
      <p>
        中间那个括号正是 <MathInline tex="A\boldsymbol{c}" /> 的第 i 个分量，等于 0。
        于是我们用<strong>不全为零</strong>的系数拼出了零向量——
        这与"w 线性无关"直接矛盾。所以 <MathInline tex="n \le m" />。
      </p>
      <p>
        <strong>第四步：收网。</strong>设 <MathInline tex="B_1" /> 与 <MathInline tex="B_2" />
        是同一个空间的两组基，人数分别为 <MathInline tex="n_1, n_2" />。
        基既张成又无关，所以引理可以<strong>两个方向各用一次</strong>：
      </p>
      <MathBlock tex="n_1 \le n_2 \quad\text{且}\quad n_2 \le n_1 \qquad\Longrightarrow\qquad n_1 = n_2" />
      <p>
        <strong>回味：维数之所以配得上"空间的属性"这个说法，靠的是这条两头夹的论证。</strong>
        而论证的发动机，是第一讲那句朴素的观察——<em>方程比未知数少，就一定有非零解</em>。
        <strong>整座抽象大厦的第一块承重砖，是那张两千年前的算筹方阵。</strong>
        （顺带回答提示里的问题：平面上确实不可能有三个线性无关的向量，
        取 <MathInline tex="m=2,\ n=3" /> 代进去即可。）
      </p>
    </RevealBox>

    <h2><span class="sec-no">叁</span>亲手看"张成"如何跳变</h2>
    <p>
      抽象的话说了不少，不如亲眼看一次"维数"这件事有多硬：它<strong>只会跳，不会滑</strong>。
      三个向量、三个角度旋钮，慢慢拖，看读数在 1、2、3 之间跳变。
    </p>
    <SpanDemo />

    <h2><span class="sec-no">肆</span>严格定义</h2>
    <div class="definition">
      <div class="def-title">📐 定义（向量空间，皮亚诺 1888）</div>
      <p>
        集合 V 配上加法 <MathInline tex="\boldsymbol{u} + \boldsymbol{v}" /> 与数乘
        <MathInline tex="k\boldsymbol{u}" />，若两种运算不出界（结果仍在 V 中），且满足 8 条公理——
        加法交换、加法结合、有零向量、有负向量、数乘结合、单位数乘 <MathInline tex="1\cdot\boldsymbol{u}=\boldsymbol{u}" />、
        两条分配律——则称 V 为<strong>向量空间</strong>。
      </p>
    </div>
    <p>
      8 条公理每一条都是从箭头、多项式、函数的共同行为里<strong>抄</strong>下来的，
      没有一条是发明——公理化是整理笔记，不是立法。不过定义里还有一句更容易被略过的话：
      <strong>"两种运算不出界"</strong>。这一句才是实战中最常出事的地方。
    </p>
    <RevealBox
      title="🔍 谁不是向量空间：三个看着挺像、其实不合格的例子"
      label="对答案 / 看完整拆解"
    >
      <template #hint>
        先自己判断这三个集合是不是向量空间（用通常的加法与数乘）：
        ① 平面上第一象限的全体点 <MathInline tex="\{(x,y) : x \ge 0,\ y \ge 0\}" />；
        ② 全体<strong>次数恰好等于 2</strong> 的多项式；
        ③ 平面上一条不过原点的直线，比如 <MathInline tex="\{(x,y) : x + y = 1\}" />。
        <strong>不合格的，请指出具体是哪一条出界了。</strong>三个判断，想完再点开。
      </template>
      <p>
        <strong>① 第一象限：不合格，数乘出界。</strong>
        <MathInline tex="(1,1)" /> 在里面，可 <MathInline tex="(-1)\cdot(1,1) = (-1,-1)" />
        跑到第三象限去了。<strong>加法其实是封闭的</strong>（两个第一象限的点相加还在第一象限）——
        所以这个例子专门说明：<strong>两种运算得分别检查，过了一条不算数</strong>。
      </p>
      <p>
        <strong>② 次数恰为 2 的多项式：不合格，加法出界。</strong>
      </p>
      <MathBlock tex="(x^2 + x) + (-x^2 + 1) = x + 1" />
      <p>
        两个二次多项式相加，<MathInline tex="x^2" /> 项对消，结果只有一次。
        而且这个集合里<strong>连零多项式都没有</strong>（零的次数不是 2），
        第三条公理"有零向量"直接落空。
        <strong>把"恰好等于 2"改成"不超过 2"，它立刻就合格了</strong>——
        这个改动看着微不足道，却正是"子空间"这个概念存在的理由。
      </p>
      <p>
        <strong>③ 不过原点的直线：不合格。</strong>
        <MathInline tex="(1,0)" /> 与 <MathInline tex="(0,1)" /> 都在上面，
        但它们的和 <MathInline tex="(1,1)" /> 满足 <MathInline tex="x+y=2 \neq 1" />，出界。
        <strong>更快的判法：零向量 <MathInline tex="(0,0)" /> 不在上面</strong>，
        一眼出局。
      </p>
      <p>
        <strong>回味：③ 和<router-link to="/linear-algebra/linear-map">上一讲</router-link>
        "平移不是线性变换"是同一件事的两面。</strong>
        向量空间必须<strong>包含原点</strong>——因为
        <MathInline tex="0 \cdot \boldsymbol{u} = \boldsymbol{0}" /> 逼着它在里面。
        所以你在这门课里遇到的一切"空间"都是穿过原点的：过原点的直线、过原点的平面，
        而不过原点的那些叫<strong>仿射</strong>子集，它们是空间被平移之后的影子。
        <strong>第一讲那个"无穷多解"的解集，正是这样一个影子</strong>——下面就算给你看。
      </p>
    </RevealBox>
    <div class="definition">
      <div class="def-title">📐 定义（线性无关）</div>
      <p>
        向量组 <MathInline tex="\boldsymbol{v}_1, \dots, \boldsymbol{v}_k" /> 称为<strong>线性无关</strong>，若
      </p>
      <MathBlock tex="c_1 \boldsymbol{v}_1 + c_2 \boldsymbol{v}_2 + \cdots + c_k \boldsymbol{v}_k = \boldsymbol{0} \quad\Longrightarrow\quad c_1 = c_2 = \cdots = c_k = 0" />
      <p>即：拼出零向量的方式只有"全体系数为零"这一种。</p>
    </div>
    <p>这个定义初看绕口——"想说没人多余，为什么扯上零向量？"逐层拆开：</p>
    <ul>
      <li>
        "有人多余"的直接说法是：某个 <MathInline tex="\boldsymbol{v}_i" /> 能被其他人拼出来，
        <MathInline tex="\boldsymbol{v}_i = \sum_{j \neq i} a_j \boldsymbol{v}_j" />。移项即得一个
        <strong>系数不全为零</strong>的零组合——两种说法完全等价；
      </li>
      <li>
        但"没人能被其他人拼出"要对每个 i 分别陈述，而零组合的版本<strong>一条式子对全体一视同仁</strong>，
        还顺带优雅处理了"单个零向量自己就相关"这类边角情形。教科书选绕口的那句，是为了好用，不是为了难懂。
      </li>
    </ul>

    <h2><span class="sec-no">伍</span>买到了什么：整栋大楼的产权证</h2>
    <p>
      第一笔红利立刻兑现：<router-link to="/linear-algebra/elimination">第一讲</router-link>
      那个含含糊糊的"无穷多解"，现在能被说成一句精确的话。
    </p>
    <RevealBox
      title="🔍 把第一讲的「无穷多解」说清楚：解集是一个空间被平移之后的影子"
      label="对答案 / 看完整拆解"
    >
      <template #hint>
        先自己动手：<router-link to="/linear-algebra/elimination">第一讲</router-link>那个多解的例子是
        <MathInline tex="x+y+z=3" />、<MathInline tex="x+2y+3z=6" />、
        <MathInline tex="x+3y+5z=9" />，通解是 <MathInline tex="(t,\ 3-2t,\ t)" />。
        现在<strong>把右端全换成 0</strong>（齐次化），再解一次。
        <strong>两个解集长得像吗？</strong>算完再点开。
      </template>
      <p>
        <strong>第一步：齐次的那个。</strong>系数不变，右端改成 0，消元后阶梯形是
        <MathInline tex="[\,1\ 1\ 1\mid 0\,]" />、<MathInline tex="[\,0\ 1\ 2\mid 0\,]" />、
        <MathInline tex="[\,0\ 0\ 0\mid 0\,]" />。取 <MathInline tex="z=t" /> 回代得
      </p>
      <MathBlock tex="(x,y,z) = t\,(1,\,-2,\,1)" />
      <p>
        代回三式验一遍：<MathInline tex="1-2+1=0" />、<MathInline tex="1-4+3=0" />、
        <MathInline tex="1-6+5=0" />，全中。
        <strong>这个解集是个货真价实的向量空间</strong>：两个解相加还是解、解乘常数还是解
        （因为 <MathInline tex="A\boldsymbol{x}_1 = A\boldsymbol{x}_2 = \boldsymbol{0}" /> 就有
        <MathInline tex="A(\boldsymbol{x}_1+\boldsymbol{x}_2)=\boldsymbol{0}" />），
        而且它<strong>过原点</strong>（<MathInline tex="t=0" />）。它是一条 1 维的直线。
      </p>
      <p>
        <strong>第二步：和非齐次的那个对照。</strong>把原来的通解拆一下：
      </p>
      <MathBlock tex="(t,\ 3-2t,\ t) = \underbrace{(0,\,3,\,0)}_{\text{某一个特解}} + \underbrace{t\,(1,\,-2,\,1)}_{\text{齐次解集}}" />
      <p>
        <strong>形状一模一样，只是整体被搬走了一段。</strong>
        非齐次解集是<em>一条不过原点的直线</em>——按上面那个折叠框的判定，
        它<strong>不是</strong>向量空间，而是齐次解空间被平移后的影子。
      </p>
      <p>
        <strong>第三步：维数从哪来。</strong>自由变量有几个，解空间就是几维。
        而消元后主元的个数就是<strong>秩</strong> r，自由变量个数是 <MathInline tex="n - r" />。所以
      </p>
      <MathBlock tex="\dim(\text{齐次解空间}) = n - r" />
      <p>
        本例 <MathInline tex="n=3" />、<MathInline tex="r=2" />，解空间 1 维，正是那条直线。
      </p>
      <p>
        <strong>回味：一句话统一了第一讲那三种命运。</strong>
        <MathInline tex="r = n" /> 时齐次解空间是 0 维（只有原点），所以非齐次<strong>至多一个解</strong>；
        <MathInline tex="r < n" /> 时齐次解空间有正维数，所以只要有一个解，就有<strong>一整族</strong>。
        至于到底有没有那个特解——那是右端说了算的事，也就是第一讲说的"相容性"。
        <strong>系数表管形状，右端管有无</strong>，两句话现在都有了精确含义。
      </p>
    </RevealBox>
    <p>接下来是几张更远的产权证：</p>
    <ul>
      <li>
        <strong>秩的真身</strong>：动画里"张成维数只能是 1、2、3"对应矩阵的秩——
        列向量们张成空间的维数。
        <router-link to="/linear-algebra/elimination">初等变换</router-link>不改变它，
        这就是"初等变换不改变秩"的几何原因：换说法不换事实，够到的地方当然还是那些；
      </li>
      <li>
        <strong>微分方程的免费定理</strong>：二阶线性齐次方程
        <MathInline tex="y'' + p y' + q y = 0" /> 的解空间恰好是 <strong>2 维</strong>——
        所以通解一定是"两个独立特解的组合"，一个不多一个不少。
        为什么正好是 2？因为解由初值 <MathInline tex="\bigl(y(0),\,y'(0)\bigr)" /> 唯一决定
        （存在唯一性定理），而"解 ↦ 它的初值"这个映射是线性的、又是一一对应的——
        <strong>解空间与 <MathInline tex="\mathbb{R}^2" /> 长得一模一样</strong>，
        所以维数照抄 2。你在微积分课上背的"通解 = 两个特解的线性组合"，
        是这条会员福利的直接兑现；
      </li>
      <li>
        <strong>函数空间</strong>：全体连续函数构成一个（无穷维）向量空间。
        在这里还能引入"垂直"，于是傅里叶级数露出真身——下面单独讲。
      </li>
    </ul>
    <RevealBox
      title="🔍 傅里叶级数的真身：正弦函数是一组互相垂直的基"
      label="对答案 / 看完整拆解"
    >
      <template #hint>
        先自己想一个类比：在平面上，要求出向量 <MathInline tex="\boldsymbol{v}" /> 在正交基
        <MathInline tex="\boldsymbol{e}_1" /> 方向的坐标，你会做点积
        <MathInline tex="\boldsymbol{v}\cdot\boldsymbol{e}_1" />。
        <strong>现在把"向量"换成"函数"，点积该换成什么？</strong>
        （提示：点积是"逐个分量相乘再求和"，而函数有无穷多个"分量"。）
        想出那个替代品，再点开。
      </template>
      <p>
        <strong>第一步：把点积搬到函数上。</strong>向量的点积是逐分量相乘再<em>求和</em>；
        函数的"分量"是每一点的取值，有无穷多个，所以求和换成<em>积分</em>：
      </p>
      <MathBlock tex="\langle f,\, g \rangle \;=\; \int_0^L f(x)\,g(x)\,\mathrm{d}x" />
      <p>
        这叫<strong>内积</strong>。它守着点积的全部规矩（对称、线性、自己和自己非负），
        所以"长度"和"垂直"这两个词可以原样搬过来：
        <MathInline tex="\langle f,g\rangle = 0" /> 就读作 <strong>f 与 g 垂直</strong>。
      </p>
      <p>
        <strong>第二步：算一次，看正弦函数族是不是互相垂直。</strong>取
        <MathInline tex="f = \sin\frac{n\pi x}{L}" />、<MathInline tex="g = \sin\frac{m\pi x}{L}" />，
        用积化和差把乘积拆开：
      </p>
      <MathBlock tex="\sin A \sin B = \tfrac12\bigl[\cos(A-B) - \cos(A+B)\bigr]" />
      <p>
        于是积分变成两个余弦的积分。当 <MathInline tex="n \neq m" /> 时，
        两个余弦的周期都在 <MathInline tex="[0,L]" /> 上跑了整数个整周期，
        <strong>正负面积精确抵消，积分为零</strong>；当 <MathInline tex="n = m" /> 时，
        第一项的 <MathInline tex="\cos 0 = 1" /> 不再振荡，积出
        <MathInline tex="L/2" />。合起来：
      </p>
      <MathBlock tex="\int_0^L \sin\frac{n\pi x}{L}\sin\frac{m\pi x}{L}\,\mathrm{d}x = \begin{cases} 0, & n \neq m \\[4pt] L/2, & n = m \end{cases}" />
      <p>
        （数值核一次：取 <MathInline tex="L=\pi" />，
        <MathInline tex="(n,m)=(1,2),(1,3),(2,3)" /> 的积分都是 0，
        <MathInline tex="(1,1),(2,2),(3,3)" /> 都是 <MathInline tex="\pi/2 = 1.5708" />。）
      </p>
      <p>
        <strong>第三步：所以傅里叶系数就是坐标。</strong>假设一个函数能写成
      </p>
      <MathBlock tex="f(x) = \sum_{m=1}^{\infty} b_m \sin\frac{m\pi x}{L}" />
      <p>
        两边同时与 <MathInline tex="\sin\frac{n\pi x}{L}" /> 做内积。右边无穷多项里，
        <strong>除了 <MathInline tex="m=n" /> 那一项，其余全部垂直、全部归零</strong>，于是
      </p>
      <MathBlock tex="\langle f,\,\sin\tfrac{n\pi x}{L}\rangle = b_n \cdot \frac{L}{2} \qquad\Longrightarrow\qquad b_n = \frac{2}{L}\int_0^L f(x)\sin\frac{n\pi x}{L}\,\mathrm{d}x" />
      <p>
        <strong>回味：这条公式在数理方程课上通常是"两边同乘再积分，奇迹发生"。</strong>
        奇迹的名字叫<strong>正交</strong>，而它不过是"求 v 在 e₁ 方向的坐标就做一次点积"
        这件中学几何常识，被搬进了函数空间。
        正弦函数族是这个空间里的一组正交基，傅里叶系数就是函数在这组基下的坐标——
        <router-link to="/mathphys/heat">数理方程热传导讲</router-link>的主武器，
        产权证在本讲办好（<b>本站那一讲从零讲起，不需要先修</b>）。
      </p>
    </RevealBox>
    <div class="insight">
      <div class="insight-title">🔗 与你学过的课程连一连</div>
      <p>
        <strong>概率论</strong>：随机变量能加、能数乘，全体方差有限的随机变量构成一个向量空间。
        在里面把内积定义成 <MathInline tex="\langle X, Y\rangle = \mathrm{Cov}(X,Y)" />，
        于是"长度"就是标准差、"夹角余弦"就是
        <router-link to="/probability/clt">相关系数</router-link>
        <MathInline tex="\rho = \mathrm{Cov}(X,Y)/(\sigma_X\sigma_Y)" />——
        <strong>"不相关"的字面意思就是"垂直"</strong>，而
        <MathInline tex="|\rho| \le 1" /> 不是什么概率定理，就是内积空间里的柯西-施瓦茨不等式
        （夹角余弦不能超过 1）；
        <strong>数值分析</strong>：<router-link to="/numerical/interpolation">多项式插值</router-link>
        与最小二乘拟合都是"在某个函数子空间里找离目标最近的点"——
        而"最近"意味着误差与整个子空间垂直，这正是上面那个内积说了算的事；
        <strong>数学物理方程</strong>：<router-link to="/mathphys/separation">分离变量法</router-link>
        之所以能把偏微分方程劈成一串常微分方程，靠的就是本讲这套"函数空间 + 正交基"的语言；
        <strong>复变函数</strong>：<router-link to="/complex/continuation">解析延拓</router-link>
        那种"一小段决定全体"的刚性，说到底也是在说某个函数空间小得出奇。
      </p>
    </div>
  </ConceptPage>
</template>
