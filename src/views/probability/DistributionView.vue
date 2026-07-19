<script setup>
import ConceptPage from '../../components/ConceptPage.vue'
import MathBlock from '../../components/MathBlock.vue'
import MathInline from '../../components/MathInline.vue'
import DensityDemo from '../../demos/DensityDemo.vue'
</script>

<template>
  <ConceptPage slug="distribution">
    <h2><span class="sec-no">壹</span>困境：结局数不清的时候，概率数什么</h2>
    <p>
      古典概率的家底是"数个数"：结局有限、机会均等，数一数就有答案。可这套办法出了赌场就处处碰壁——
      等一班公交的耗时、一发炮弹的落点、一个人的身高，可能的结果<strong>连成一片、无穷无尽</strong>，
      而且没有哪两个"等可能"。更要命的是一个当面耍流氓的悖论：
    </p>
    <div class="insight">
      <div class="insight-title">🤔 单点概率为零的僵局</div>
      <p>
        身高"恰好"等于 1.75000000…米（无穷多位全对上）的概率是多少？只能是 0——可每个人总归有个身高，
        <strong>无数个概率为零的事件，合起来却必然发生</strong>。"逐点给概率"这条路在连续世界里彻底堵死。
        （0 概率却可能发生，这味道像极了微积分里"无穷小"的幽灵——解决它的招数也将如出一辙。）
      </p>
    </div>
    <div class="story">
      <div class="story-title">📜 1900 年 · 希尔伯特的第六问题</div>
      <p>
        两百多年里概率论战果累累（棣莫弗、拉普拉斯的巨著都已问世），但"概率到底是什么"始终没有严格答案，
        各派吵成一团：是长期频率？是相信程度？伯特兰 1889 年还火上浇油——"在圆里随机画一条弦"，
        三种听起来都合理的算法给出三个不同答案（1/2、1/3、1/4）！希尔伯特在 1900 年著名的 23 个问题里，
        把"给概率论建立公理"列为第六问——<strong>一门学科被逼到要重新回答"我是谁"</strong>。
      </p>
    </div>

    <h2><span class="sec-no">贰</span>破局：别问一点的概率，问一段的概率</h2>
    <p>解法分两步，每步都是观念的腾挪。</p>
    <p>
      <strong>第一步：把结局变成数。</strong>掷三枚硬币，你关心的往往不是"正反反"这个具体花色，
      而是"几个正面"这个<strong>数</strong>。于是引入<strong>随机变量</strong> X：
      一个把每个结局 ω 翻译成数字 X(ω) 的<strong>函数</strong>。别被名字骗了——它不是"变量"，是函数；
      不"随机"，随机的是输入。翻译成数之后，全部微积分武器库才对概率敞开。
    </p>
    <p>
      <strong>第二步：概率从"点"搬家到"段"。</strong>单点概率全是 0，但"身高落在 1.70 到 1.80 之间"
      的概率实实在在。所以别再逐点记账，改记<strong>累积账</strong>：
    </p>
    <MathBlock tex="F(x) = P(X \le x)" />
    <p>
      对每个 x 记"不超过 x 的概率"，一条曲线通吃一切：任何一段的概率都是两次查账之差
      <MathInline tex="P(a < X \le b) = F(b) - F(a)" />。而所谓"密度"，
      不过是这本账<strong>每单位长度的增速</strong>——F 的导数。是不是似曾相识？
      <strong>这正是微积分基本定理的剧情重演</strong>：面积函数是本体，被积函数是它的变化率。
      概率 = 密度曲线下的面积，第三讲积分埋的伏笔在此兑现。
    </p>

    <h2><span class="sec-no">叁</span>亲手把直方图磨成密度曲线</h2>
    <DensityDemo />

    <h2><span class="sec-no">肆</span>严格定义</h2>
    <div class="definition">
      <div class="def-title">📐 定义（分布函数与密度）</div>
      <p>
        随机变量 X 的<strong>分布函数</strong>为 <MathInline tex="F(x) = P(X \le x),\ x \in \mathbb{R}" />。
        它单调不减、右连续，且 <MathInline tex="F(-\infty) = 0,\ F(+\infty) = 1" />。
        若存在非负函数 f 使
      </p>
      <MathBlock tex="F(x) = \int_{-\infty}^{x} f(t)\, dt" />
      <p>则称 X 为连续型，f 为其<strong>概率密度函数</strong>。</p>
    </div>
    <p>教科书这几行小字，每处都是有来头的：</p>
    <ul>
      <li>
        <strong>为什么用 ≤ 而不是 &lt;</strong>：为了让 F 把"恰好等于 x"的概率也收进账本，
        离散型的跳跃点才记在正确的一侧——这个选择顺带决定了 F 是<strong>右</strong>连续。
        对连续型两者无差别（单点为 0），对掷骰子这种跳跃账本就见分晓了；
      </li>
      <li>
        <strong>密度不是概率</strong>：f(x) 可以大于 1（把一段账压缩到很短的区间，增速自然超过 1），
        它是概率的"变化率"，量纲是每单位长度。只有<strong>面积</strong> f·dx 才是概率——
        动画里柱子的高度公式（频数÷总数÷组距）就是在凑这个量纲；
      </li>
      <li>
        <strong>柯尔莫哥洛夫的收官（1933）</strong>：他给出的公理干脆利落——概率就是一种<strong>测度</strong>：
        给事件（集合）指定非负数，全空间记 1，互斥事件可数可加。至于"哪些集合有资格当事件"、
        随机变量必须"可测"，都是为无穷世界立的安全护栏。伯特兰悖论同时破案：
        三种答案对应三种不同的"随机"（三个不同的测度），题目没说清用哪个，本来就不该有唯一答案。
        频率派与信念派也得以停战：<strong>公理只管演算规则，不管概率"是"什么</strong>——像几何公理不回答"点是什么"。
      </li>
    </ul>

    <h2><span class="sec-no">伍</span>买到了什么：概率与微积分正式合流</h2>
    <ul>
      <li>
        <strong>一切计算变成积分</strong>：从此算概率就是算面积，算期望就是算加权积分（下一讲），
        微积分的全套技术——换元、分部、极限定理——整编进概率论。教科书里那些正态、指数、均匀分布表，
        本质是一张张"常用面积速查表"；
      </li>
      <li>
        <strong>雅可比行列式再上岗</strong>：随机变量做变换 Y = g(X) 时密度要乘 |g′| 的倒数，
        多维时乘雅可比行列式——线性代数第二讲的"面积缩放因子"在概率世界的分店；
      </li>
      <li>
        <strong>伪随机数的工作原理</strong>：本讲动画生成指数分布样本用的"反函数法"——
        对均匀随机数 U 取 <MathInline tex="X = F^{-1}(U)" />——是所有模拟软件造随机数的标准姿势。
        分布函数不只是理论道具，它是造样本的模具；
      </li>
      <li>
        <strong>"依概率收敛"的语言备好了</strong>：有了分布函数，"一列随机变量趋向何方"才能严格表述——
        下一讲大数定律、下下讲中心极限定理，说的分别是两种不同强度的"随机收敛"。
      </li>
    </ul>
    <div class="insight">
      <div class="insight-title">🔗 与你学过的课程连一连</div>
      <p>
        <strong>微积分</strong>：F 与 f 的关系就是微积分基本定理；"单点概率为零但事件可发生"
        与"单点长度为零但线段有长度"是同一件事——测度论正是把"长度"概念公理化后的产物；
        <strong>复变函数</strong>：特征函数 <MathInline tex="E[e^{itX}]" />（分布的傅里叶变换）
        是证明中心极限定理的头号工具——两讲之后它会在幕后出场。
      </p>
    </div>
  </ConceptPage>
</template>
