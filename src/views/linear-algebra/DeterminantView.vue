<script setup>
import ConceptPage from '../../components/ConceptPage.vue'
import MathBlock from '../../components/MathBlock.vue'
import MathInline from '../../components/MathInline.vue'
import RevealBox from '../../components/RevealBox.vue'
import DeterminantDemo from '../../demos/DeterminantDemo.vue'
import DetAreaCutDemo from '../../demos/DetAreaCutDemo.vue'
</script>

<template>
  <ConceptPage slug="determinant">
    <h2><span class="sec-no">壹</span>困境：能不能不消元，先知道有没有解</h2>
    <p>
      <router-link to="/linear-algebra/elimination">上一讲</router-link>结尾留了个雷：
      消元做到一半可能蹦出"0 = −6"，宣告方程组无解。
      对手工计算的年代来说这很恼火——<strong>辛苦半天才发现是死局</strong>。
      于是 17、18 世纪的数学家开始追问：能不能只看一眼系数，就预判方程组的命运？
    </p>
    <p>
      办法很朴素：<strong>拿最小的情形硬解一遍，看看解长什么样。</strong>
      二元方程组只有两个未知数，完全可以把答案用系数直接写出来——
    </p>
    <MathBlock tex="\begin{cases} ax + by = e \\ cx + dy = f \end{cases} \quad\Longrightarrow\quad x = \frac{ed - bf}{ad - bc}, \qquad y = \frac{af - ec}{ad - bc}" />
    <RevealBox
      title="🔍 这两个公式是怎么解出来的（就是上一讲那套消元，只是系数用字母写）"
      label="对答案 / 看完整拆解"
    >
      <template #hint>
        先自己动笔：要单独解出 x，就得把 y 消掉。<strong>两个方程各乘以什么，才能让 y 的系数变得一样？</strong>
        （提示：第一式的 y 系数是 b，第二式是 d。）乘完相减，x 就孤立了。
        两个公式，推完再点开。
      </template>
      <p>
        <strong>第一步：把 y 的系数配平。</strong>第一式乘 d、第二式乘 b，两式的 y 项就都变成
        <MathInline tex="bd\,y" />：
      </p>
      <MathBlock tex="\begin{aligned} d \times (1): &\quad ad\,x + bd\,y = ed \\ b \times (2): &\quad bc\,x + bd\,y = bf \end{aligned}" />
      <p><strong>第二步：相减，y 整条消失。</strong></p>
      <MathBlock tex="(ad - bc)\,x = ed - bf \quad\Longrightarrow\quad x = \frac{ed - bf}{ad - bc}" />
      <p>
        <strong>第三步：换个配平方式解 y。</strong>这回配平 x 的系数——第一式乘 c、第二式乘 a：
      </p>
      <MathBlock tex="\begin{aligned} c \times (1): &\quad ac\,x + bc\,y = ec \\ a \times (2): &\quad ac\,x + ad\,y = af \end{aligned}" />
      <p>用第二式减第一式：</p>
      <MathBlock tex="(ad - bc)\,y = af - ec \quad\Longrightarrow\quad y = \frac{af - ec}{ad - bc}" />
      <p>
        <strong>回味：注意最后一步做了什么。</strong>我们<strong>除以了 <MathInline tex="ad-bc" /></strong>——
        而这一步只有在它不为零时才合法。所以这个数不是被"发现"的，
        它是<strong>被除法的合法性逼出来的</strong>：整套推导在它为零的那一刻整个作废。
        这就是它凭什么掌管方程组生死的第一层解释（还有更深的一层，在贰节）。
      </p>
    </RevealBox>
    <p>
      两个解共用同一个分母 <MathInline tex="ad - bc" />。<strong>它不为零，方程组就有唯一解；
      它一为零，解就出事</strong>（无解或无穷多解）。系数们交叉相乘再相减，竟然浓缩出一个"命运判别数"。
    </p>
    <div class="story">
      <div class="story-title">📜 一个概念，两个大陆，先于矩阵 170 年</div>
      <p>
        1683 年，日本江户的<strong>关孝和</strong>在《解伏题之法》中给出了从方程组系数算判别式的方法；
        十年后（1693），<strong>莱布尼茨</strong>在给洛必达的信里独立写下了同样的东西，
        还为此发明了双下标记号 <MathInline tex="a_{ij}" />。1750 年<strong>克莱姆</strong>发表用行列式直接写解的公式
        （即"克莱姆法则"），行列式从此成为 18 世纪代数的头号明星。
        注意时间线的怪事：<strong>行列式比矩阵概念早了约 170 年</strong>——先有判别数，后有那张表的名分。
      </p>
    </div>
    <p>
      但一个尴尬始终悬着：三阶行列式 6 项、四阶 24 项、n 阶 <MathInline tex="n!" /> 项，
      展开式越写越像咒语（<MathInline tex="10" /> 阶就是三百六十多万项）。
      <strong>这个数到底"是"什么？为什么它恰好掌管方程组的生死？</strong>
      教科书直接给展开式，等于只发了咒语不给解释。
    </p>

    <h2><span class="sec-no">贰</span>破局：它不是算式，是面积的缩放因子</h2>
    <p>
      钥匙是换一双眼睛。把矩阵的两列看成平面上的两个向量
      <MathInline tex="\boldsymbol{u} = (a, c)" />、<MathInline tex="\boldsymbol{v} = (b, d)" />，
      它们张成一个平行四边形。用初中几何硬算这块面积（大矩形减去四周的边角料），得到的正是
    </p>
    <MathBlock tex="S = ad - bc" />
    <p>
      "大矩形减去四周的边角料"这句话是关键，可它得当真做一遍才算数——
      六块边角料到底是哪六块、凭什么正好铺满？下面这张图把它拆给你看，
      拖滑杆能把边角料整体推出去。
    </p>
    <DetAreaCutDemo />
    <p>
      合上时六块严丝合缝，拆开时中间剩下的红色平行四边形就是答案。逐项对账：
    </p>
    <RevealBox
      title="🔍 六块边角料是哪六块：把割补法逐块算一遍"
      label="对答案 / 看完整拆解"
    >
      <template #hint>
        先自己想：把 <MathInline tex="\boldsymbol{u}=(a,c)" /> 和
        <MathInline tex="\boldsymbol{v}=(b,d)" /> 张成的平行四边形塞进一个
        <MathInline tex="(a+b)\times(c+d)" /> 的大矩形里（四个顶点分别贴住四条边）。
        <strong>剩下的空隙一共几块、各是什么形状？</strong>
        画个草图数一数，再把总面积加起来。六块，数完再点开。
      </template>
      <p>
        <strong>第一步：把平行四边形放进外接矩形。</strong>四个顶点是
        <MathInline tex="(0,0)" />、<MathInline tex="\boldsymbol{u}=(a,c)" />、
        <MathInline tex="\boldsymbol{u}+\boldsymbol{v}=(a+b,\ c+d)" />、
        <MathInline tex="\boldsymbol{v}=(b,d)" />。
        最小的外接矩形就是 <MathInline tex="[0,a+b]\times[0,c+d]" />，面积
      </p>
      <MathBlock tex="(a+b)(c+d) = ac + ad + bc + bd" />
      <p>
        <strong>第二步：数空隙。</strong>四个角各有一块，另有两块夹在中间，一共六块：
      </p>
      <ul>
        <li>
          <strong>两个直角三角形，直角边 a 与 c</strong>（图上金色）——
          它们是 <MathInline tex="\boldsymbol{u}" /> 这条边"斜"出来的空隙，
          上下各一个，各占 <MathInline tex="\tfrac12 ac" />，合计 <MathInline tex="ac" />；
        </li>
        <li>
          <strong>两个直角三角形，直角边 b 与 d</strong>（靛蓝）——同理由
          <MathInline tex="\boldsymbol{v}" /> 造成，合计 <MathInline tex="bd" />；
        </li>
        <li>
          <strong>两个长方形，边长 b 与 c</strong>（绿色）——这是两条斜边"交叉"处多出来的，
          合计 <MathInline tex="2bc" />。
        </li>
      </ul>
      <p><strong>第三步：相减。</strong></p>
      <MathBlock tex="\begin{aligned} S &= (a+b)(c+d) - ac - bd - 2bc \\ &= (ac + ad + bc + bd) - ac - bd - 2bc \\ &= ad - bc \end{aligned}" />
      <p>
        <strong>四项里有三项被抵消掉了</strong>，只剩下这个交叉相减的形状。
      </p>
      <p>
        <strong>第四步：拿动画里的具体数字核一遍。</strong>那张图取的是
        <MathInline tex="\boldsymbol{u}=(3,1)" />、<MathInline tex="\boldsymbol{v}=(1,2)" />，于是
        大矩形 <MathInline tex="4\times 3 = 12" />；六块边角料是
        <MathInline tex="1.5+1.5+1+1+1+1 = 7" />；相减得 <strong>5</strong>。
        而 <MathInline tex="ad - bc = 3\cdot 2 - 1\cdot 1 = 5" />，对上了。
      </p>
      <p>
        <strong>回味：那个"交叉相乘再相减"的怪异写法，其实是一次减法留下的疤。</strong>
        它长得不像面积，是因为它是<em>差</em>——所以它才可能是负的，
        而"负面积"这件怪事，正是下面要讲的"有向"。
      </p>
    </RevealBox>
    <div class="insight">
      <div class="insight-title">💡 核心直觉：det = 有向面积</div>
      <p>
        行列式就是两个列向量张成的<strong>平行四边形面积</strong>（三阶就是平行六面体体积），
        还附赠一个符号：从 u 转到 v 是逆时针为正、顺时针为负——所以叫"有向"面积。
        这一眼看穿全部谜团：<strong>det = 0 意味着平行四边形被压扁成线段</strong>，
        两列共线，两条方程说的是同一件事（或矛盾的事）——这就是它掌管方程组生死的原因。
        "奇异矩阵"的"奇异"，指的就是这场压扁事故。
      </p>
    </div>
    <p>
      "det = 0 就是两列共线"这句话，代数上一行就能验：若
      <MathInline tex="\boldsymbol{v} = k\boldsymbol{u}" />，即
      <MathInline tex="(b,d) = (ka, kc)" />，那么
    </p>
    <MathBlock tex="ad - bc = a(kc) - (ka)c = 0" />
    <p>
      反过来，若 <MathInline tex="ad = bc" /> 而 <MathInline tex="\boldsymbol{u} \neq \boldsymbol{0}" />，
      两列的分量之比 <MathInline tex="b/a = d/c" /> 相等，同样共线。
      <strong>几何上的"压扁"与代数上的"分母为零"，是同一件事的两种说法。</strong>
    </p>
    <p>
      那 <MathInline tex="n!" /> 项的展开式呢？它只是这块"体积"在坐标下的计算公式，
      是仆人不是主人。真正定义行列式的是三条朴素的几何常识——见第肆节。
    </p>

    <h2><span class="sec-no">叁</span>亲手压扁一个平行四边形</h2>
    <p>
      这个动画<strong>没有滑杆</strong>：两个箭头本身就是控件，用鼠标抓住箭头尖直接拖。
      拖的时候盯住读数区那个 det——它会跟着变号、跟着归零。
    </p>
    <DeterminantDemo />

    <h2><span class="sec-no">肆</span>严格定义</h2>
    <div class="definition">
      <div class="def-title">📐 定义（行列式的公理刻画）</div>
      <p>
        行列式是唯一一个满足以下三条的函数 <MathInline tex="\det: (\boldsymbol{v}_1, \dots, \boldsymbol{v}_n) \mapsto \mathbb{R}" />
        （把矩阵看作 n 个列向量）：
      </p>
      <p>
        ① <strong>多重线性</strong>：固定其余列，det 对每一列都是线性的；<br />
        ② <strong>交替性</strong>：两列相同时 <MathInline tex="\det = 0" />（由此可推出交换两列变号）；<br />
        ③ <strong>归一化</strong>：<MathInline tex="\det(I) = 1" />。
      </p>
    </div>
    <p>三条公理没有一条是凭空立法，全是"有向体积"的翻译：</p>
    <ul>
      <li><strong>多重线性</strong>——某条边拉长 2 倍，体积翻倍；某条边是两向量之和，体积可拆开分别算；</li>
      <li><strong>交替性</strong>——两条边重合，体积当然是 0；交换两条边，定向翻转，符号改变；</li>
      <li><strong>归一化</strong>——单位正方体的体积规定为 1，这是"度量衡"。</li>
    </ul>
    <p>
      教科书接着往往写一句"由这三条可推出全部性质，包括那个
      <MathInline tex="n!" /> 项展开式"就走人了。可这句话才是全讲最值钱的地方——
      <strong>它意味着那条咒语般的展开式不是定义，是三条常识的必然后果</strong>。
      二阶的情形只要五行就能推完，而推的过程会顺手告诉你 <MathInline tex="n!" /> 是从哪来的。
    </p>
    <RevealBox
      title="🔍 从三条公理推出 ad − bc，顺便看清 n 的阶乘从哪冒出来"
      label="对答案 / 看完整拆解"
    >
      <template #hint>
        先自己动笔：把两个列向量按标准基拆开——
        <MathInline tex="\boldsymbol{u} = a\boldsymbol{e}_1 + c\boldsymbol{e}_2" />、
        <MathInline tex="\boldsymbol{v} = b\boldsymbol{e}_1 + d\boldsymbol{e}_2" />。
        用公理 ① 把 <MathInline tex="\det(\boldsymbol{u},\boldsymbol{v})" /> 逐列展开，
        你会得到<strong>四项</strong>。再用公理 ② 看看哪几项当场死掉。
        四项，写完再点开。
      </template>
      <p>
        <strong>第一步：对第一列用线性。</strong>
      </p>
      <MathBlock tex="\det(\boldsymbol{u},\boldsymbol{v}) = a\det(\boldsymbol{e}_1,\boldsymbol{v}) + c\det(\boldsymbol{e}_2,\boldsymbol{v})" />
      <p><strong>第二步：对第二列再用一次线性。</strong>四项全出来了：</p>
      <MathBlock tex="= ab\det(\boldsymbol{e}_1,\boldsymbol{e}_1) + ad\det(\boldsymbol{e}_1,\boldsymbol{e}_2) + cb\det(\boldsymbol{e}_2,\boldsymbol{e}_1) + cd\det(\boldsymbol{e}_2,\boldsymbol{e}_2)" />
      <p>
        <strong>第三步：交替性开始杀人。</strong>第一项和第四项的两列相同，
        由公理 ② <strong>直接归零</strong>：
      </p>
      <MathBlock tex="\det(\boldsymbol{e}_1,\boldsymbol{e}_1) = \det(\boldsymbol{e}_2,\boldsymbol{e}_2) = 0" />
      <p>
        <strong>第四步：剩下两项，用归一化和变号定值。</strong>
        <MathInline tex="\det(\boldsymbol{e}_1,\boldsymbol{e}_2) = \det(I) = 1" />（公理 ③），
        而交换两列变号给出 <MathInline tex="\det(\boldsymbol{e}_2,\boldsymbol{e}_1) = -1" />。代回去：
      </p>
      <MathBlock tex="\det(\boldsymbol{u},\boldsymbol{v}) = ad\cdot 1 + cb\cdot(-1) = ad - bc" />
      <p>
        <strong>那个减号不是人为规定的，是交替性逼出来的。</strong>
      </p>
      <p>
        <strong>第五步：现在看 <MathInline tex="n!" /> 从哪来。</strong>
        同样的动作搬到 n 阶：每一列都拆成 n 个基向量，n 列全展开就是
        <MathInline tex="n^n" /> 项，每一项形如
        <MathInline tex="\det(\boldsymbol{e}_{i_1},\boldsymbol{e}_{i_2},\ldots,\boldsymbol{e}_{i_n})" />。
        但交替性规定：<strong>只要有两个下标重复，这一项就是 0</strong>。
        活下来的只有下标互不相同的那些——也就是
        <MathInline tex="1,2,\ldots,n" /> 的一个<strong>排列</strong>，
        而排列恰好有 <MathInline tex="n!" /> 个。每一项的符号则由"把这个排列换回自然顺序要交换几次"决定
        （偶数次为正、奇数次为负）。
      </p>
      <MathBlock tex="\det A = \sum_{\sigma} \operatorname{sgn}(\sigma)\, a_{1\sigma(1)}a_{2\sigma(2)}\cdots a_{n\sigma(n)}" />
      <p>
        <strong>回味：教科书开篇甩给你的那条咒语，其实是"排列"两个字的伪装。</strong>
        <MathInline tex="n!" /> 不是某个人拍脑袋规定的项数，
        它是"n 个位置放 n 个互不相同的下标"的方案数；那些正负号也不是记忆口诀，
        是交替性一次次交换留下的账。<strong>先有几何常识，后有展开式</strong>——
        顺序反过来，这个概念就只能靠背。
      </p>
    </RevealBox>
    <p>
      从公理还能白捡一个教科书里最"神秘"的定理：
      <MathInline tex="\det(AB) = \det A \cdot \det B" />。
      用体积的语言说它平淡如水——<strong>先缩放 <MathInline tex="\det B" /> 倍、
      再缩放 <MathInline tex="\det A" /> 倍，总缩放当然是两者相乘</strong>。
      拿数字验一下就有感觉：<MathInline tex="A" /> 把面积放大 3 倍、
      <MathInline tex="B" /> 放大 −2 倍（放大 2 倍且翻转定向），
      连着做完面积就是 −6 倍。至于"矩阵为什么能先后作用"、
      为什么矩阵乘法非得定义成那副别扭的行乘列样子，
      <router-link to="/linear-algebra/linear-map">下一讲</router-link>正式揭晓。
    </p>

    <h2><span class="sec-no">伍</span>买到了什么：一个到处出现的缩放因子</h2>
    <ul>
      <li>
        <strong>叉积</strong>：<MathInline tex="|\boldsymbol{u} \times \boldsymbol{v}|" />
        是 u、v 张成的平行四边形面积——叉积的行列式记忆法不是巧合，它就是行列式的三维分身；
      </li>
      <li>
        <strong>克莱姆法则</strong>：理论上优雅，数值上却是灾难——n 阶要算
        <MathInline tex="n+1" /> 个行列式（一个分母、n 个分子）。
        实际软件全部用<router-link to="/linear-algebra/elimination">上一讲的消元</router-link>；
      </li>
      <li>
        <strong>下下讲的伏笔</strong>：特征值方程
        <MathInline tex="\det(A - \lambda I) = 0" /> 之所以用 det，
        正是因为"det = 0 ⟺ 空间被压扁 ⟺ 存在非零向量被送进原点"。
        到<router-link to="/linear-algebra/eigen">第五讲</router-link>回来看这句话。
      </li>
    </ul>
    <p>
      顺带回答一个很多人学完整章还没想过的问题：<strong>那台计算机到底怎么算行列式？</strong>
      真按 <MathInline tex="n!" /> 项展开的话，20 阶就要两百多万亿项，算到宇宙热寂也算不完。
      答案藏在上一讲。
    </p>
    <RevealBox
      title="🔍 计算机算行列式：其实还是在消元，而且顺手白捡"
      label="对答案 / 看完整拆解"
    >
      <template #hint>
        先自己想：<router-link to="/linear-algebra/elimination">上一讲</router-link>的第三种行变换是
        "某一行加上另一行的倍数"。<strong>用公理 ① ② 想想，这种变换会不会改变行列式的值？</strong>
        （提示：把新行拆成两项，其中一项的两行成比例。）想清楚了，消元就成了算行列式的工具。
      </template>
      <p>
        <strong>第一步：关键性质——"加另一行的倍数"完全不改变行列式。</strong>
        设新的第 i 行是 <MathInline tex="r_i + k\,r_j" />，用多重线性拆成两块：
      </p>
      <MathBlock tex="\det(\ldots, r_i + k\,r_j, \ldots) = \det(\ldots, r_i, \ldots) + k\det(\ldots, r_j, \ldots)" />
      <p>
        后面那一块里，第 i 行和第 j 行<strong>都是 <MathInline tex="r_j" /></strong>——两行相同，
        由交替性它是 0。所以整个式子等于原来的行列式，<strong>一分不差</strong>。
      </p>
      <p>
        <strong>第二步：另外两种变换的账也要记。</strong>交换两行变号；某行乘 k 则行列式乘 k。
        标准高斯消元只用第三种（外加必要时的换行），所以代价只是<strong>数一数换了几次行</strong>。
      </p>
      <p>
        <strong>第三步：消成三角形后直接读。</strong>上三角矩阵的行列式就是对角线相乘
        （按上面那条展开式，非对角的排列项里必定撞上某个对角线以下的 0）。于是
      </p>
      <MathBlock tex="\det A = (-1)^{\text{换行次数}} \times u_{11}u_{22}\cdots u_{nn}" />
      <p>
        <strong>第四步：用上一讲那道九章题验一次。</strong>那里把
        <MathInline tex="A = \begin{pmatrix}3&2&1\\2&3&1\\1&2&3\end{pmatrix}" />
        消成了 <MathInline tex="U" />，对角线是 <MathInline tex="3,\ \tfrac53,\ \tfrac{12}{5}" />，
        中途一次行都没换。相乘：
      </p>
      <MathBlock tex="\det A = 3 \times \tfrac53 \times \tfrac{12}{5} = 12" />
      <p>
        按余子式展开核对：<MathInline tex="3(9-2) - 2(6-1) + 1(4-3) = 21 - 10 + 1 = 12" />，一致。
      </p>
      <p>
        <strong>回味：这是<router-link to="/linear-algebra/elimination">上一讲</router-link>白送的红利。</strong>
        你为解方程组做的那 <MathInline tex="n^3/3" /> 次乘法，
        <strong>顺手就把行列式也算出来了</strong>——代价从 <MathInline tex="n!" /> 级降到
        <MathInline tex="n^3" /> 级。20 阶的情形，从"两百多万亿项"变成"两千多次乘法"。
        这也再次说明克莱姆法则为什么只活在课本里：它要做 <MathInline tex="n+1" /> 次这样的消元，
        而直接解方程组只要一次。
      </p>
    </RevealBox>
    <p>
      最后是这个概念在别的课里最重要的一次现身。你在多元微积分里换元时，
      积分号下总会莫名其妙冒出一个因子——极坐标是 <MathInline tex="r" />、球坐标是
      <MathInline tex="\rho^2\sin\varphi" />。那些因子不是背下来的口诀，<strong>它们就是本讲这个 det</strong>。
    </p>
    <RevealBox
      title="🔍 极坐标那个凭空出现的 r，就是本讲的行列式"
      label="对答案 / 看完整拆解"
    >
      <template #hint>
        先自己想：换元 <MathInline tex="x = r\cos\theta" />、
        <MathInline tex="y = r\sin\theta" /> 把
        <MathInline tex="(r,\theta)" /> 平面上一个小方块映成 <MathInline tex="(x,y)" /> 平面上一小块。
        <strong>这一小块被放大了多少倍？</strong>
        （提示：<router-link to="/calculus/derivative">导数那一讲</router-link>说过，
        局部就是线性的——所以只要算那个线性变换的面积倍率。）一个数，算完再点开。
      </template>
      <p>
        <strong>第一步：局部线性化。</strong>在 <MathInline tex="(r,\theta)" /> 处给一对小增量
        <MathInline tex="(\mathrm{d}r, \mathrm{d}\theta)" />，映过去的位移近似是两列向量的组合，
        这两列就是各自的偏导数：
      </p>
      <MathBlock tex="\frac{\partial(x,y)}{\partial(r,\theta)} = \begin{pmatrix} \dfrac{\partial x}{\partial r} & \dfrac{\partial x}{\partial \theta} \\[8pt] \dfrac{\partial y}{\partial r} & \dfrac{\partial y}{\partial \theta} \end{pmatrix} = \begin{pmatrix} \cos\theta & -r\sin\theta \\ \sin\theta & \ \ r\cos\theta \end{pmatrix}" />
      <p>
        第一列是"只让 r 变"的方向（径向单位向量），第二列是"只让 θ 变"的方向
        （切向，长度 <MathInline tex="r" />——转过同样的角度，离原点越远走得越长）。
      </p>
      <p><strong>第二步：算它的行列式，就是面积倍率。</strong></p>
      <MathBlock tex="\det = \cos\theta \cdot r\cos\theta - (-r\sin\theta)\cdot\sin\theta = r(\cos^2\theta + \sin^2\theta) = r" />
      <p>
        <strong>第三步：所以换元公式里必须补上这个 r。</strong>
      </p>
      <MathBlock tex="\iint f(x,y)\,\mathrm{d}x\,\mathrm{d}y = \iint f(r\cos\theta,\, r\sin\theta)\ \boldsymbol{r}\ \mathrm{d}r\,\mathrm{d}\theta" />
      <p>
        <strong>第四步：为什么直觉上也该是 r。</strong>那两列向量互相垂直（径向与切向），
        所以平行四边形就是个矩形，边长分别是 <MathInline tex="\mathrm{d}r" /> 和
        <MathInline tex="r\,\mathrm{d}\theta" />，面积
        <MathInline tex="r\,\mathrm{d}r\,\mathrm{d}\theta" />——
        这正是你在教科书插图上看到的那个"小扇形近似成小矩形"。
        <strong>行列式只是把这张插图变成了一个能算的公式，而且对任何换元都管用</strong>，
        不必每换一次坐标就重画一次图。
      </p>
      <p>
        （附带一提：在原点 <MathInline tex="r=0" /> 处 det 为零——极坐标在那里把一整条
        <MathInline tex="\theta" /> 轴压成了一个点，正是本讲说的"压扁"。
        这就是极坐标在原点附近总要小心处理的原因。）
      </p>
    </RevealBox>
    <div class="insight">
      <div class="insight-title">🔗 与你学过的课程连一连</div>
      <p>
        <strong>微积分</strong>：二重积分换元的雅可比行列式就是本讲的 det（上面刚算过），
        而它成立的前提——<router-link to="/calculus/derivative">局部即线性</router-link>——
        是导数那一讲的核心观点；
        <strong>概率论</strong>：多维随机变量做变量替换时，
        <router-link to="/probability/distribution">密度函数</router-link>要除以同一个雅可比行列式
        （面积被放大 k 倍，单位面积上的概率就得摊薄 k 倍，总概率才还是 1）；
        <strong>复变函数</strong>：<router-link to="/complex/holomorphic">解析函数</router-link>
        在一点的局部伸缩率是 <MathInline tex="|f'(z)|" />，
        而把它当二维实变换看，雅可比行列式恰好是 <MathInline tex="|f'(z)|^2" />——
        面积倍率是长度倍率的平方，一点不奇怪；
        <strong>数值分析</strong>：det 接近 0 说明矩阵接近压扁，
        方程组会变得<router-link to="/numerical/linear-system">病态</router-link>——
        不过那一讲会告诉你一件扫兴的事：<strong>det 的大小其实不是好的病态指标</strong>
        （把矩阵整体乘以 0.1，det 会缩小 <MathInline tex="10^{-n}" /> 倍，方程组却一点没变难），
        真正该看的是条件数。
      </p>
    </div>
  </ConceptPage>
</template>
