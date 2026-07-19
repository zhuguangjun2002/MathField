<script setup>
import ConceptPage from '../../components/ConceptPage.vue'
import MathBlock from '../../components/MathBlock.vue'
import MathInline from '../../components/MathInline.vue'
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
      「班底的人数」叫<strong>维数</strong>——而且可以证明：不管怎么选班底，人数都一样，
      所以维数是空间本身的属性，不是选法的属性。
    </p>

    <h2><span class="sec-no">叁</span>亲手看"张成"如何跳变</h2>
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
        但"没人能被其他人拼出"要对每个 i 分别陈述，而零组合的版本<strong>一条不等式对全体一视同仁</strong>，
        还顺带优雅处理了"单个零向量自己就相关"这类边角情形。教科书选绕口的那句，是为了好用，不是为了难懂；
      </li>
      <li>
        8 条公理同理：每一条都是从箭头、多项式、函数的共同行为里<strong>抄</strong>下来的，
        没有一条是发明——公理化是整理笔记，不是立法。
      </li>
    </ul>

    <h2><span class="sec-no">伍</span>买到了什么：整栋大楼的产权证</h2>
    <ul>
      <li>
        <strong>解集的形状定理</strong>：齐次方程组 <MathInline tex="A\boldsymbol{x} = \boldsymbol{0}" />
        的解集是向量空间（解的叠加还是解），维数 = 未知数个数 − 秩。第一讲里"无穷多解"的模糊说法，
        现在有了精确刻画：解集是一条 k 维的"平面"；
      </li>
      <li>
        <strong>微分方程的免费定理</strong>：二阶线性齐次方程的解空间是 2 维向量空间——
        所以通解一定是"两个独立特解的组合"。你在微积分课上背的这个事实，是向量空间定理的会员福利；
      </li>
      <li>
        <strong>函数空间</strong>：全体连续函数构成（无穷维）向量空间。在这个空间里还能引入"垂直"
        （内积 <MathInline tex="\int f g\, dx" />），于是<strong>傅里叶级数的真身</strong>浮现：
        正弦余弦函数族是函数空间里的一组<strong>正交基</strong>，傅里叶系数就是函数在这组基下的坐标。
        这是将来数学物理方程课的主武器，产权证在本讲办好；
      </li>
      <li>
        <strong>秩的真身</strong>：动画里"张成维数只能是 1、2、3"对应矩阵的秩——
        列向量们张成空间的维数。消元不改变它，这就是"初等变换不改变秩"的几何原因。
      </li>
    </ul>
    <div class="insight">
      <div class="insight-title">🔗 与你学过的课程连一连</div>
      <p>
        <strong>概率论</strong>：随机变量能加、能数乘，全体方差有限的随机变量构成向量空间，
        协方差就是内积、相关系数就是夹角余弦——"不相关"字面意思就是"垂直"；
        <strong>计算数学</strong>：多项式插值、最小二乘拟合都是"在某个函数子空间里找最近点"——
        没有向量空间的语言，这些方法只能各说各话。
      </p>
    </div>
  </ConceptPage>
</template>
