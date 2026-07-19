<script setup>
import ConceptPage from '../../components/ConceptPage.vue'
import MathBlock from '../../components/MathBlock.vue'
import MathInline from '../../components/MathInline.vue'
import DeterminantDemo from '../../demos/DeterminantDemo.vue'
</script>

<template>
  <ConceptPage slug="determinant">
    <h2><span class="sec-no">壹</span>困境：能不能不消元，先知道有没有解</h2>
    <p>
      上一讲结尾留了个雷：消元做到一半可能蹦出"0 = −6"，宣告方程组无解。
      对手工计算的年代来说这很恼火——<strong>辛苦半天才发现是死局</strong>。
      于是 17、18 世纪的数学家开始追问：能不能只看一眼系数，就预判方程组的命运？
    </p>
    <p>以二元方程组为例，硬解一遍：</p>
    <MathBlock tex="\begin{cases} ax + by = e \\ cx + dy = f \end{cases} \quad\Longrightarrow\quad x = \frac{ed - bf}{ad - bc}, \qquad y = \frac{af - ec}{ad - bc}" />
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
      展开式越写越像咒语。<strong>这个数到底"是"什么？为什么它恰好掌管方程组的生死？</strong>
      教科书直接给展开式，等于只发了咒语不给解释。
    </p>

    <h2><span class="sec-no">贰</span>破局：它不是算式，是面积的缩放因子</h2>
    <p>
      钥匙是换一双眼睛。把矩阵的两列看成平面上的两个向量
      <MathInline tex="\boldsymbol{u} = (a, c)" />、<MathInline tex="\boldsymbol{v} = (b, d)" />，
      它们张成一个平行四边形。用初中几何硬算这块面积（大矩形减去四周的三角形），得到的正是
    </p>
    <MathBlock tex="S = ad - bc" />
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
      那 <MathInline tex="n!" /> 项的展开式呢？它只是这块"体积"在坐标下的计算公式，
      是仆人不是主人。真正定义行列式的是三条朴素的几何常识——见第肆节。
    </p>

    <h2><span class="sec-no">叁</span>亲手压扁一个平行四边形</h2>
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
        ② <strong>交替性</strong>：两列相同时 <MathInline tex="\det = 0" />（交换两列变号）；<br />
        ③ <strong>归一化</strong>：<MathInline tex="\det(I) = 1" />。
      </p>
      <p>由这三条可推出全部性质，包括那个 <MathInline tex="n!" /> 项展开式。</p>
    </div>
    <p>三条公理没有一条是凭空立法，全是"有向体积"的翻译：</p>
    <ul>
      <li><strong>多重线性</strong>——某条边拉长 2 倍，体积翻倍；某条边是两向量之和，体积可拆开分别算；</li>
      <li><strong>交替性</strong>——两条边重合，体积当然是 0；交换两条边，定向翻转，符号改变；</li>
      <li><strong>归一化</strong>——单位正方体的体积规定为 1，这是"度量衡"。</li>
    </ul>
    <p>
      从公理还能白捡一个教科书里最"神秘"的定理：<MathInline tex="\det(AB) = \det A \cdot \det B" />。
      用体积的语言说它平淡如水——<strong>先缩放 detB 倍、再缩放 detA 倍，总缩放当然是两者相乘</strong>。
      （矩阵为什么能"先后作用"？下一讲正式揭晓。）
    </p>

    <h2><span class="sec-no">伍</span>买到了什么：一个到处出现的缩放因子</h2>
    <ul>
      <li>
        <strong>微积分的雅可比行列式</strong>：二重积分换元时冒出来的
        <MathInline tex="|J| = \left| \frac{\partial(x, y)}{\partial(u, v)} \right|" />
        就是本讲的 det——换坐标时每个"小面积元"被局部线性变换缩放，缩放因子必须补进积分里。
        极坐标那个凭空出现的 <MathInline tex="r" />，就是雅可比行列式；
      </li>
      <li>
        <strong>叉积</strong>：<MathInline tex="|\boldsymbol{u} \times \boldsymbol{v}|" />
        是 u、v 张成的平行四边形面积——叉积的行列式记忆法不是巧合，它就是行列式的三维分身；
      </li>
      <li>
        <strong>克莱姆法则</strong>：理论上优雅，数值上却是灾难——n 阶要算 n+1 个行列式。
        实际软件全部用上一讲的消元（顺便说，<strong>行列式本身也是用消元算的</strong>：
        化成三角阵后对角线相乘，代价 <MathInline tex="n^3" /> 级而不是 <MathInline tex="n!" /> 级）；
      </li>
      <li>
        <strong>下下讲的伏笔</strong>：特征值方程 <MathInline tex="\det(A - \lambda I) = 0" />
        之所以用 det，正是因为"det = 0 ⟺ 空间被压扁 ⟺ 存在非零向量被送进原点"。到时候回来看这句话。
      </li>
    </ul>
    <div class="insight">
      <div class="insight-title">🔗 与你学过的课程连一连</div>
      <p>
        <strong>概率论</strong>：多维随机变量做变量替换时，密度函数要乘雅可比行列式——同一个缩放因子；
        <strong>复变函数</strong>：解析函数在一点的局部伸缩率 <MathInline tex="|f'(z)|^2" />，
        正是它作为二维实变换的雅可比行列式。一个"面积倍率"，串起你学过的三门课。
      </p>
    </div>
  </ConceptPage>
</template>
