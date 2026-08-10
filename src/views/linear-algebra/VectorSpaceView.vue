<script setup>
import ConceptPage from '../../components/ConceptPage.vue'
import MathBlock from '../../components/MathBlock.vue'
import MathInline from '../../components/MathInline.vue'
import RevealBox from '../../components/RevealBox.vue'
import QuizBox from '../../components/QuizBox.vue'
import SpanDemo from '../../demos/SpanDemo.vue'
</script>

<template>
  <ConceptPage slug="vector-space">
    <h2><span class="sec-no">壹</span>困境：一套把戏，到处都在重演</h2>
    <p>
      19 世纪的数学家陆续注意到一件怪事：完全不同的领域里，反复上演着同一套剧情。
    </p>
    <ul>
      <li>几何里，两个箭头可以相加（首尾相接）、可以拉长缩短——前三讲一直在用；</li>
      <li>
        代数里，两个多项式可以相加、可以乘常数：
        <MathInline tex="(x^2+1) + (2x-3) = x^2+2x-2" />，规矩和数字加法一模一样；
      </li>
      <li>
        声音里，两个波形叠在一起还是波形——和弦是几个音的叠加，
        降噪耳机放出反相的波把噪声抵消，都是"函数相加"这一个动作；
      </li>
      <li>
        方程里也有同样的剧情：很多方程的两个解加起来还是解、解乘常数还是解
        （物理书上叫"叠加原理"——现在不必懂它，站内数理方程课会正面撞上；此处只需认出剧情又重演了）。
      </li>
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
        （提示：右端全为零的方程组叫<strong>齐次</strong>方程组。
        用<router-link to="/linear-algebra/elimination">第一讲</router-link>的消元想一想：
        齐次方程组里方程比未知数<em>少</em>时，消完元是不是必定剩下自由变量？
        自由变量取个非零值，会得到什么样的解？）想清楚再点开。
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
        （中间那步"交换求和次序"没有任何魔法：一共 <MathInline tex="m \times n" />
        个小项，先按 j 归堆再加、还是先按 i 归堆再加，总和当然一样——
        就像一张表格按行数一遍和按列数一遍，数出的总数相同。）
        重排后括号里正是 <MathInline tex="A\boldsymbol{c}" /> 的第 i 个分量，等于 0。
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
        而论证的发动机，是刚才第三步用消元当场证出的朴素事实——
        <em>齐次方程组里方程比未知数少，就一定有非零解</em>。
        <strong>整座抽象大厦的第一块承重砖，是那张两千年前的算筹方阵。</strong>
        （顺带回答提示里的问题：平面上确实不可能有三个线性无关的向量，
        取 <MathInline tex="m=2,\ n=3" /> 代进去即可。）
      </p>
    </RevealBox>
    <QuizBox
      quiz-id="vector-space-q1"
      question="一个函数，凭什么也能叫「向量」？"
      hint="会员资格清单上查的是什么——长相，还是本事？"
      :options="[
        { t: '因为资格审查只查运算：函数能相加、能乘常数，且守那 8 条规矩——够格入会', why: '对。「向量」从此不是一种东西而是一种资格，跟长不长得像箭头无关。这个身份转换买到的是批发价定理：凡是只用加法、数乘和 8 条规矩证出的结论，函数版自动成立——伍节的傅里叶级数就是最大的一笔分红。' },
        { t: '因为函数的图象也可以想象成一支很长的箭头', why: '不需要这种想象，想象也帮不上忙——数列、多项式、随机变量都长得不像箭头，照样入会。入会条件是白纸黑字的运算检查，不是形象类比；靠类比理解抽象，走两步就会摔。' },
        { t: '只是个方便的比喻，严格说函数不是向量', why: '不是比喻，是定义的字面含义：在「全体连续函数 + 逐点加法 + 数乘」这个空间里，每个函数就是一个向量。伍节里「傅里叶系数 = 函数在一组正交基下的坐标」这句话，全靠这个字面含义撑腰——比喻可撑不起定理。' },
      ]"
      :answer="0"
    />

    <h2><span class="sec-no">叁</span>亲手看"张成"如何跳变</h2>
    <p>
      抽象的话说了不少，不如亲眼看一次"维数"这件事有多硬：它<strong>只会跳，不会滑</strong>。
      三个向量、四个旋钮——前两个拖动向量本身，后两个只是绕着换个角度看。
      慢慢拖前两个，看读数在 1、2、3 之间跳变。
    </p>
    <p>
      拖完再玩一件更要紧的事：<strong>把读数遮住，光凭眼睛能不能断定三根向量共不共面？</strong>
      屏幕是平的，三根箭头在画面上永远画得出一张"平面图"，所以<strong>看着散开什么也证明不了</strong>。
      但反过来有一条铁律——<strong>共面，当且仅当存在某个视角让它们叠成同一条直线</strong>
      （共面就是都住在一张纸上，那就一定能侧着看这张纸）。
      动画下方的说明给了找这个视角的固定招法，以及一个五关的挑战模式：
      向量写死、读数藏起，只剩你和两个视角旋钮。
    </p>
    <SpanDemo />

    <h2><span class="sec-no">肆</span>严格定义</h2>
    <div class="definition">
      <div class="def-title">📐 定义（向量空间，皮亚诺 1888）</div>
      <p>
        集合 V 配上加法 <MathInline tex="\boldsymbol{u} + \boldsymbol{v}" /> 与数乘
        <MathInline tex="k\boldsymbol{u}" />，若两种运算不出界（结果仍在 V 中），
        且满足 8 条公理，则称 V 为<strong>向量空间</strong>。8 条逐一写开（u, v, w 是任意成员，k, l 是任意数）：
      </p>
      <p>
        ① 加法交换 <MathInline tex="\boldsymbol{u}+\boldsymbol{v} = \boldsymbol{v}+\boldsymbol{u}" />；
        ② 加法结合 <MathInline tex="(\boldsymbol{u}+\boldsymbol{v})+\boldsymbol{w} = \boldsymbol{u}+(\boldsymbol{v}+\boldsymbol{w})" />；
        ③ 有零向量 <MathInline tex="\boldsymbol{u}+\boldsymbol{0} = \boldsymbol{u}" />；
        ④ 有负向量 <MathInline tex="\boldsymbol{u}+(-\boldsymbol{u}) = \boldsymbol{0}" />；
        ⑤ 数乘结合 <MathInline tex="k(l\boldsymbol{u}) = (kl)\boldsymbol{u}" />；
        ⑥ 单位数乘 <MathInline tex="1\cdot\boldsymbol{u}=\boldsymbol{u}" />；
        ⑦ 分配律一 <MathInline tex="k(\boldsymbol{u}+\boldsymbol{v}) = k\boldsymbol{u}+k\boldsymbol{v}" />；
        ⑧ 分配律二 <MathInline tex="(k+l)\boldsymbol{u} = k\boldsymbol{u}+l\boldsymbol{u}" />。
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
        先自己判断这三个集合是不是向量空间（用通常的加法与数乘；
        记号 <MathInline tex="\{(x,y) : \text{条件}\}" /> 读作"满足冒号后条件的所有点组成的集合"）：
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
        <MathInline tex="\boldsymbol{v}_i = \sum_{j \neq i} a_j \boldsymbol{v}_j" />
        （下标 <MathInline tex="j \neq i" /> 表示"对除 i 之外的全部编号求和"）。移项即得一个
        <strong>系数不全为零</strong>的零组合——两种说法完全等价；
      </li>
      <li>
        但"没人能被其他人拼出"要对每个 i 分别陈述，而零组合的版本<strong>一条式子对全体一视同仁</strong>，
        还顺带优雅处理了"单个零向量自己就相关"这类边角情形。教科书选绕口的那句，是为了好用，不是为了难懂。
      </li>
    </ul>
    <QuizBox
      quiz-id="vector-space-q2"
      question="三个向量线性相关，是不是说其中必有两个互成倍数（共线）？"
      hint="试试 (1,0)、(0,1)、(1,1) 这三个：两两共线吗？相关吗？"
      :options="[
        { t: '不是：可能两两都不共线，但第三个落进了前两个张成的平面', why: '对。(1,0)、(0,1)、(1,1) 两两方向都不同，可 v₃ = v₁ + v₂——集体有冗余。「相关」查的是全体有没有多余的人，不是两两之间有没有重影。demo 里三根看着散开的箭头共面，正是这一幕：换个视角才露馅。' },
        { t: '是：相关就是有人跟别人方向重合', why: '只在两个向量时才对——两向量相关确实等价于共线。三个及以上，冗余可以「摊」在所有人身上：谁也不跟谁重合，但有一位是其余人的组合。把两向量的经验推广到多向量，是本讲最常见的翻车点。' },
        { t: '是，向量越多越是如此', why: '恰恰相反：向量越多，「集体冗余而两两清白」的方式越多。平面里随便抓三个向量必相关（维数只有 2），可它们通常两两都不共线——反例俯拾即是。' },
      ]"
      :answer="0"
    />

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

    <h3>屏幕上的一千六百万色：RGB 就是一个三维向量空间</h3>
    <p>
      打开任何取色器：一个颜色就是三个数，比如橙色是 <MathInline tex="(255, 128, 0)" />。
      屏幕的每个像素里躺着红、绿、蓝三盏小灯，这三个数是各自的亮度。
      现在拿会员资格清单来审查"颜色"：<strong>能加吗？</strong>能——两束光叠在一起，
      分量各自相加（舞台上红光叠绿光得黄光，物理事实）。<strong>能数乘吗？</strong>能——
      调亮一倍就是分量同乘 2。八条规矩逐条成立。<strong>颜色够格入会：
      它们构成一个向量空间，纯红 (1,0,0)、纯绿 (0,1,0)、纯蓝 (0,0,1) 是一组基，
      你的 RGB 值就是颜色在这组基下的坐标。</strong>
      连"维数是 3"都不是工程师拍脑袋：人眼恰好有三种视锥细胞——
      "颜色空间是三维的"是一条生理事实的数学表述。
    </p>
    <p>
      这套语言立刻能干活。<strong>换基</strong>：广色域屏幕（P3）和普通屏幕（sRGB）
      选的三种基色不同——同一个颜色换屏显示时，系统内部用一个 3×3 矩阵把坐标换算过去，
      正是"同一空间、两组基"的换算。<strong>压扁</strong>：把彩色照片转黑白，用的是加权和
      <MathInline tex="Y = 0.299R + 0.587G + 0.114B" />（权重和恰为 1）——
      一个把三维压到一维的线性变换；不同颜色可以有相同的灰度，
      信息真的丢了，这是<router-link to="/linear-algebra/determinant">第二讲</router-link>压扁事故的日常版。
      <strong>降维</strong>：红绿色盲少一类视锥细胞，三维颜色被投到二维——
      正常人分得清的红与绿，在那张二维投影上坐标几乎重合，
      "线性相关"的生理版；色盲测试图挑的正是"三维里分得开、投影后挤在一起"的颜色对。
    </p>
    <p>
      <strong>条件不成立会怎样？</strong>屏幕每个分量只有 0 到 255：两个亮橙
      <MathInline tex="(200,180,0) + (100,100,0) = (300,280,0)" />，出界了。
      所以严格说，屏幕能显示的只是颜色空间里一个有界的"盒子"——
      加法会捅破天花板，肆节"运算不出界"那行小字在这里天天出事。
      工程对策是 HDR 流程：先回到不设上限的线性空间把账算完，最后一步才压回盒子，
      否则亮部叠加处处削顶变形。第一象限那个反例，原来是每台手机里的日常。
    </p>
    <QuizBox
      quiz-id="vector-space-q3"
      question="两个合法颜色相加冒出了 $(300, 280, 0)$，超出 255。这说明什么？"
      hint="出问题的是「运算」，还是「地盘」？"
      :options="[
        { t: '屏幕颜色只是向量空间里一个有界盒子——加法出界，「运算不出界」的检查在盒子上失败', why: '对。数学模型（任意亮度组合的三维空间）资格完好，出事的是工程限制 [0,255]³ 这个盒子。所以图像算法先在不设上限的线性空间里算，最后才截断——把「模型」和「盒子」分开，正是抽象定义的用处。' },
        { t: '说明颜色的加法定义错了，应该改成取平均', why: '取平均是另一种有用的运算（调色刷子干的事），但它不是光的物理叠加——两束光同时打在墙上，能量就是相加。运算没定义错，是承载它的盒子有边界；改运算去迁就盒子，物理就不认账了。' },
        { t: '说明颜色根本不构成向量空间，伍节这段白讲了', why: '构成空间的是理想化的「全体光强组合」（分量不设上限），审查通过的是它；0–255 是显示器的工程围栏。模型合格与盒子有界是两件事——混为一谈，就等于因为教室坐不下就宣布「学生的全体」不存在。' },
      ]"
      :answer="0"
    />
    <p>接下来是几张更远的产权证：</p>
    <ul>
      <li>
        <strong>秩的真身</strong>：动画里"张成维数只能是 1、2、3"对应矩阵的秩——
        列向量们张成空间的维数。
        <router-link to="/linear-algebra/elimination">初等变换</router-link>不改变它，
        这就是"初等变换不改变秩"的几何原因：换说法不换事实，够到的地方当然还是那些；
      </li>
      <li>
        <strong>微分方程的免费定理</strong>（写给已读过微积分的读者，没读过跳过这条即可）：二阶线性齐次方程
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
        在这里还能引入"垂直"，于是傅里叶级数露出真身——下面单独讲
        （那个折叠框要动用积分：还没读过微积分课的话先跳过，
        修完<router-link to="/calculus/integral">积分讲</router-link>再回来收这份大礼）。
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
        产权证在本讲办好。
      </p>
    </RevealBox>
    <div class="insight">
      <div class="insight-title">🔗 这张会员卡还能在哪刷：站内连一连</div>
      <p>
        以下几处全在站内、全部从零讲起：
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
