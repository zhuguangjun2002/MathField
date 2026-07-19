<script setup>
import ConceptPage from '../../components/ConceptPage.vue'
import MathBlock from '../../components/MathBlock.vue'
import MathInline from '../../components/MathInline.vue'
import EliminationDemo from '../../demos/EliminationDemo.vue'
</script>

<template>
  <ConceptPage slug="elimination">
    <h2><span class="sec-no">壹</span>困境：没有字母 x 的年代，怎么解方程组</h2>
    <p>
      公元前 1 世纪成书的《九章算术》第八章叫「方程」，开篇就是一道三元一次方程组：
      上等禾三捆、中等禾二捆、下等禾一捆，共打粮三十九斗……三种搭配、三个总量，
      问每捆各打多少粮。用今天的记号就是
    </p>
    <MathBlock tex="\begin{cases} 3x + 2y + z = 39 \\ 2x + 3y + z = 34 \\ x + 2y + 3z = 26 \end{cases}" />
    <p>
      麻烦在于：<strong>那时既没有字母代数，也没有等号</strong>。未知数、加号、等式统统写不出来，
      这题按理说根本没法"列式"。中国算学家的对策漂亮得惊人——既然未知数没法写，
      那就<strong>干脆不写</strong>。
    </p>
    <div class="story">
      <div class="story-title">📜 算筹方阵：矩阵的第一次登场</div>
      <p>
        他们把算筹（小竹棍）在地上摆成一个数字方阵：每列代表一个搭配方案，从上到下依次是
        上禾数、中禾数、下禾数、总斗数——<strong>只摆系数，不摆未知数</strong>。
        「方程」的本义就是"方形的程式"。然后按口诀「遍乘直除」：把一列整体放大若干倍，
        减去另一列，让某个位置出现空位（零）……逐列做下去，答案自己浮出来。
        这套操作，与今天教科书里的高斯消元法<strong>一步不差</strong>。
      </p>
    </div>
    <p>
      一千八百年后，同样的麻烦砸到了高斯头上。1801 年起，他先为追踪谷神星、后为汉诺威大地测量
      处理堆积如山的观测数据：几十个未知量、上百个方程。零敲碎打的代入法在这种规模下毫无指望，
      高斯把消去未知数的过程整理成一套<strong>机械的、可以交给助手照章执行的程序</strong>——
      这就是"高斯消元法"名字的由来。他本人若知道《九章算术》，大概会心一笑。
    </p>

    <h2><span class="sec-no">贰</span>破局：把未知数抽走，只对系数记账</h2>
    <p>
      两段相隔近两千年的历史，指向同一个思想转折：解方程组时，字母
      <MathInline tex="x, y, z" /> 只是<strong>占位符</strong>，
      真正参与运算的自始至终只有系数。既然如此，何不把方程组"脱水"成一张纯数字表？
    </p>
    <MathBlock tex="\begin{cases} x + 2y = 8 \\ 3x + 2y = 12 \end{cases} \quad\leadsto\quad \left[\begin{array}{cc|c} 1 & 2 & 8 \\ 3 & 2 & 12 \end{array}\right]" />
    <p>
      这张表就是<strong>增广矩阵</strong>——矩阵在历史上的第一重身份，不多不少就是一张记账表。
      对方程组做的每一步合法操作（把某个方程加减到另一个上、给方程两边同乘一个非零数、交换两个方程），
      都变成了对表格<strong>行</strong>的操作。关键问题只有一个：这些操作凭什么不会把解改掉？
    </p>
    <div class="insight">
      <div class="insight-title">💡 核心直觉：换说法，不换事实</div>
      <p>
        每个方程是一条关于未知数的"证词"。把第二条证词减去第一条的 3 倍，得到的新证词没有增加信息、
        也没有丢失信息——因为这一步<strong>可以原样倒回去</strong>（再加回 3 倍就还原了）。
        可逆的改写只是换一种说法，被描述的那个事实——解——纹丝不动。
        消元的全部策略就是：反复换说法，直到换成"x = 2，y = 3"这种一眼能读出答案的说法。
      </p>
    </div>

    <h2><span class="sec-no">叁</span>亲手做一遍消元</h2>
    <EliminationDemo />

    <h2><span class="sec-no">肆</span>严格定义</h2>
    <div class="definition">
      <div class="def-title">📐 定义（初等行变换）</div>
      <p>对矩阵的行可施行三种<strong>初等行变换</strong>：</p>
      <p>
        ① 交换两行（<MathInline tex="r_i \leftrightarrow r_j" />）；
        ② 某一行乘以非零常数（<MathInline tex="r_i \to k\, r_i,\ k \neq 0" />）；
        ③ 某一行加上另一行的倍数（<MathInline tex="r_i \to r_i + k\, r_j" />）。
      </p>
      <p>
        <strong>定理</strong>：对增广矩阵施行初等行变换，方程组的解集不变。
      </p>
    </div>
    <p>逐条拆开看，每个限制都不是白写的：</p>
    <ul>
      <li>
        ② 里的 <strong>k ≠ 0</strong> 是命门：乘以 0 会把一整条方程抹成 0 = 0，信息被销毁、
        操作没法倒回去——解集就可能变大。三种变换都必须<strong>可逆</strong>，这是"解集不变"的全部原因；
      </li>
      <li>
        变换的对象是<strong>整行</strong>（系数连同右端一起动），对应"方程两边同时操作"——
        只动左边不动右边，等式就毁了；
      </li>
      <li>
        消元的终点叫<strong>行阶梯形</strong>：每行的第一个非零元严格右移、零行沉底。
        到了这个形状，解的一切信息——唯一解、无穷多解还是无解——都摆在明面上。
      </li>
    </ul>

    <h2><span class="sec-no">伍</span>买到了什么：一门课的种子全在这里</h2>
    <ul>
      <li>
        <strong>矩阵有了出生证</strong>：它最初不是什么神秘对象，就是方程组脱水后的系数表。
        下一讲会看到，从这张表里能榨出一个判别数（行列式）；再往后会发现这张表还有第二重身份（变换），
        那是矩阵真正的成年礼；
      </li>
      <li>
        <strong>计算数学的 LU 分解</strong>：你学过的 <MathInline tex="A = LU" />，
        其实就是把消元的全过程记账——U 是消元的结果（上三角），L 存的是"每步减了几倍"的乘数。
        数值软件解方程组，跑的正是高斯这套程序，代价约 <MathInline tex="n^3/3" /> 次乘法；
      </li>
      <li>
        <strong>无解与多解的伏笔</strong>：动画里"0 = −6"那声惊叫说明系数表可能<strong>退化</strong>。
        什么时候退化？能否不做消元、直接从系数看出来？——这正是行列式被发明的原因，下一讲揭晓。
      </li>
    </ul>
    <div class="insight">
      <div class="insight-title">🔗 与你学过的课程连一连</div>
      <p>
        <strong>计算数学</strong>：LU 分解、选主元（避免小数除大数放大误差）都是本讲的直系后代；
        <strong>微积分</strong>：牛顿迭代解非线性方程组时，每一步就是解一个线性方程组——
        线性问题是一切非线性问题被"局部化"后的样子。会解线性方程组，是数值世界的通行证。
      </p>
    </div>
  </ConceptPage>
</template>
