<script setup>
import ConceptPage from '../../components/ConceptPage.vue'
import MathBlock from '../../components/MathBlock.vue'
import MathInline from '../../components/MathInline.vue'
import RevealBox from '../../components/RevealBox.vue'
import QuizBox from '../../components/QuizBox.vue'
import EliminationDemo from '../../demos/EliminationDemo.vue'
</script>

<template>
  <ConceptPage slug="elimination">
    <h2><span class="sec-no">壹</span>困境：没有字母 x 的年代，怎么解方程组</h2>
    <p>
      公元前 1 世纪成书的《九章算术》第八章叫「方程」，开篇就是一道三元一次方程组：
      上等禾三捆、中等禾二捆、下等禾一捆，共打粮三十九斗；上禾二捆、中禾三捆、下禾一捆，三十四斗；
      上禾一捆、中禾二捆、下禾三捆，二十六斗。问每捆各打多少粮。用今天的记号就是
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
        他们把算筹（小竹棍）在地上摆成一个数字方阵：每<strong>列</strong>代表一个搭配方案，从上到下依次是
        上禾数、中禾数、下禾数、总斗数——<strong>只摆系数，不摆未知数</strong>。
        「方程」的本义就是"方形的程式"。然后按口诀「遍乘直除」：把一列整体放大若干倍，
        再反复减去另一列，直到某个位置出现空位（零）……逐列做下去，答案自己浮出来。
      </p>
      <p>
        （注意方向：《九章》把一个方程摆成一<em>列</em>，今天的增广矩阵把一个方程写成一<em>行</em>。
        这只是纸面排版转了个 90 度，算法本身一模一样。下面为了对照方便，一律用现代的行写法。）
      </p>
    </div>
    <p>
      "算法本身一模一样"这句话不该白说。这道两千年前的题，我们现在就用《九章》的原法做一遍——
      而且会得到一个惊人的巧合：<strong>算到最后一步冒出来的那两个数，《九章》原文里白纸黑字地写着。</strong>
    </p>
    <RevealBox
      title="🔍 用「遍乘直除」真解一遍两千年前那道题"
      label="对答案 / 看完整拆解"
    >
      <template #hint>
        先自己动笔：把三个方程写成三行 <MathInline tex="[\,3\ 2\ 1\mid 39\,]" />、
        <MathInline tex="[\,2\ 3\ 1\mid 34\,]" />、<MathInline tex="[\,1\ 2\ 3\mid 26\,]" />。
        要把第二行的首项 2 消成 0，直觉是减去第一行的 2/3 倍——但古人不用分数。
        <strong>想想怎样只用整数乘减做到同一件事</strong>，然后把三行都消完。
        三个答案（每种禾各打几斗），算完再点开。
      </template>
      <p>
        <strong>第一步：不许出分数，就先放大再相减。</strong>记号先说好：
        <MathInline tex="r_1, r_2, r_3" /> 指第一、二、三行（r 取自英文 row），
        <MathInline tex="3r_2 - 2r_1" /> 读作"第二行乘 3，减去第一行乘 2"。
        要消掉第二行的首项 2，把第二行整体<strong>乘 3</strong>（这是"遍乘"），
        第一行乘 2，再相减（这是"直除"，古汉语的"除"就是"减去"）：
      </p>
      <MathBlock tex="3\,r_2 - 2\,r_1:\quad [\,6\ 9\ 3\mid 102\,] - [\,6\ 4\ 2\mid 78\,] = [\,0\ 5\ 1\mid 24\,]" />
      <p>同样处理第三行（乘 3，减去第一行的 1 倍）：</p>
      <MathBlock tex="3\,r_3 - 1\,r_1:\quad [\,3\ 6\ 9\mid 78\,] - [\,3\ 2\ 1\mid 39\,] = [\,0\ 4\ 8\mid 39\,]" />
      <p>
        <strong>全程只有整数。</strong>这正是"遍乘"存在的理由——先放大到能整除，就绕开了分数。
        （代价是数字会变大，所以这一招在手算时用，机器算反而更愿意直接除。）
      </p>
      <p><strong>第二步：再消一次，把第三行的中禾也除掉。</strong></p>
      <MathBlock tex="5\,r_3' - 4\,r_2':\quad [\,0\ 20\ 40\mid 195\,] - [\,0\ 20\ 4\mid 96\,] = [\,0\ 0\ 36\mid 99\,]" />
      <p>
        于是 <MathInline tex="36z = 99" />。
        <strong>停一下看这两个数。</strong>《九章算术》这道题的原文答案写的是
        "下禾秉实三十六，实九十九斗"——<strong>36 和 99，一字不差</strong>。
        两千年前那位算学家在地上摆算筹，摆出的就是我们刚刚这两行。
      </p>
      <p><strong>第三步：回代。</strong></p>
      <MathBlock tex="z = \frac{99}{36} = \frac{11}{4} = 2\tfrac34" />
      <MathBlock tex="5y + z = 24 \;\Longrightarrow\; y = \frac{24 - 11/4}{5} = \frac{17}{4} = 4\tfrac14" />
      <MathBlock tex="3x + 2y + z = 39 \;\Longrightarrow\; x = \frac{39 - 17/2 - 11/4}{3} = \frac{37}{4} = 9\tfrac14" />
      <p>
        上禾每捆 <MathInline tex="9\tfrac14" /> 斗、中禾 <MathInline tex="4\tfrac14" /> 斗、
        下禾 <MathInline tex="2\tfrac34" /> 斗。代回三个原方程验一遍：
        39、34、26，全中。
      </p>
      <p>
        <strong>回味一下：这套动作里没有一个字母、没有一个等号，也没有任何"技巧"。</strong>
        它是一套可以照着做的<em>程序</em>——正因如此，它才能穿过两千年、跨过欧亚大陆，
        原封不动地变成今天计算机里跑的代码。
      </p>
    </RevealBox>
    <p>
      一千八百年后，同样的麻烦砸到了高斯头上。1801 年起，他先为追踪谷神星、后为汉诺威大地测量
      处理堆积如山的观测数据：几十个未知量、上百个方程。此前的解法都是"看情况随机应变"——
      哪个方程系数好看就先动哪个，全靠经验，一步走错满盘皆输，而且<strong>没法交给别人做</strong>。
      高斯要的不是更巧的技巧，而是一套<strong>不需要灵感、可以交给助手照章执行的固定程序</strong>：
      永远先用第一个方程消掉所有其余方程的第一个未知数，再用第二个消第二个……
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
      中间那道竖线只是提醒："左边是系数，右边是常数项"，它不参与任何运算。
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
    <p>
      这个直觉待会儿要变成一条定理，而"可以倒回去"这五个字会是证明的全部承重墙。
      先去动画里亲眼看一次"事实纹丝不动"是什么样子。
    </p>
    <QuizBox
      quiz-id="elimination-q1"
      question="行可以随便加减、缩放、交换。那把增广矩阵的两<strong>列</strong>交换一下，方程组的解会怎样？"
      hint="行是什么、列是什么？交换一列等于对方程组做了件什么事？"
      :options="[
        { t: '解的各分量跟着换位——相当于把 x 和 y 的身份对调了', why: '对。行是方程、列是未知数：换两行只是换两句证词的朗读顺序，换两列却是把两位当事人的名字互换。不是不能做，是做了就得记住「我换过」，最后再换回来——肆节会正式立这条规矩。' },
        { t: '解不变——行和列都只是排版，怎么摆都行', why: '行和列的身份完全不对称：每一行是一句完整的证词（方程），每一列却只是某个未知数的「专属座位」。座位一换，读出来的 (x, y) 就串位了——拿贰节那个小例子亲手换一次列再解，立刻见分晓。' },
        { t: '解被彻底破坏，再也找不回来', why: '没那么严重：列交换是可逆的（再换回来就是了），信息并没有销毁，只是答案的读法变了。真正销毁信息的是「某行乘 0」那种不可逆操作——马上肆节的证明就要拿它开刀。' },
      ]"
      :answer="0"
    />

    <h2><span class="sec-no">叁</span>亲手做一遍消元</h2>
    <p>
      两个方程各画成一条直线，方程组的解就是<strong>交点</strong>。
      每拖一步，你会看到直线换姿势而交点不动——所谓"换说法不换事实"，
      在图上就是这么一件具体的事。
    </p>
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
    <p>
      这条定理是整套方法的许可证——没有它，消元就只是在乱涂乱画。
      它的证明不长，但有一处特别容易被略过，而那一处恰好解释了定义里为什么非写
      <MathInline tex="k \neq 0" /> 不可。
    </p>
    <RevealBox
      title="🔍 证明解集不变：为什么只证一半是不够的"
      label="对答案 / 看完整拆解"
    >
      <template #hint>
        先自己想：设 <MathInline tex="(x_0,y_0,z_0)" /> 是原方程组的解，
        证明它也满足变换后的方程组——这一步很容易，试试看。
        <strong>然后问自己一个更要紧的问题：这样就证完了吗？</strong>
        "新方程组的解集不会更小"和"不会更大"，你证的是哪一个？想清楚再点开。
      </template>
      <p>
        <strong>第一步：容易的那一半。</strong>先认识一个今后要反复出现的词：
        把几行各乘一个数再加起来，得到的新行就叫这些行的<strong>线性组合</strong>——
        壹节的 <MathInline tex="3r_2 - 2r_1" /> 就是 <MathInline tex="r_1, r_2" />
        的一个线性组合（乘的数是 −2 和 3）。现在观察三种变换的共同点——
        <strong>变换后的每一行，都是变换前那些行的线性组合</strong>
        （交换只是换位置；<MathInline tex="k\,r_i" /> 是 1 项组合；
        <MathInline tex="r_i + k\,r_j" /> 是 2 项组合）。
        而线性组合有个好性质：若 <MathInline tex="(x_0,\ldots)" /> 让每个原方程的
        "左边 − 右边"都等于 0，那么它让这些式子的任何线性组合也等于 0。所以
      </p>
      <MathBlock tex="\text{解}(S) \;\subseteq\; \text{解}(S')" />
      <p>
        （记号也认一下：<MathInline tex="\text{解}(S)" /> 指"方程组 S 的全部解凑成的集合"；
        <MathInline tex="\subseteq" /> 读作"包含于"——左边集合的每个成员都在右边集合里。）
      </p>
      <p>
        <strong>第二步：为什么这还不够。</strong>上面只说明"原来的解一个都没丢"，
        可完全有可能<strong>凭空多出新解</strong>。举个反例就明白了：把方程
        <MathInline tex="x = 1" /> 两边乘以 0，得到 <MathInline tex="0 = 0" />。
        原来的解 <MathInline tex="x=1" /> 当然还满足它——第一步照样成立——
        但新方程组的解集变成了<strong>整条实数轴</strong>。信息被销毁了。
      </p>
      <p>
        <strong>这就是 <MathInline tex="k \neq 0" /> 的命门所在。</strong>
        它不是排版好看的小字，是防止上面那种事故的唯一屏障。
      </p>
      <p>
        <strong>第三步：另一半靠可逆性补上。</strong>三种变换都能原样倒回去，
        而且<strong>倒回去用的还是同一类变换</strong>：
      </p>
      <ul>
        <li>① 交换两行 → 再交换一次；</li>
        <li>
          ② 乘以 k → 乘以 <MathInline tex="1/k" />。<strong>这里用到
          <MathInline tex="k \neq 0" /></strong>，否则 <MathInline tex="1/k" /> 根本不存在；
        </li>
        <li>③ 加上 k 倍 → 减去 k 倍。</li>
      </ul>
      <p>
        所以从 <MathInline tex="S'" /> 也能一步变回 <MathInline tex="S" />。
        把第一步的结论套在这个反方向上，就得到
      </p>
      <MathBlock tex="\text{解}(S') \;\subseteq\; \text{解}(S)" />
      <p><strong>第四步：两个包含关系合起来，解集相等。</strong></p>
      <MathBlock tex="\text{解}(S) = \text{解}(S')" />
      <p>
        <strong>回味：这条证明的骨头不是"线性组合"，而是"可逆"。</strong>
        线性组合只保证解不会丢，是可逆性保证了解不会凭空多出来。
        以后你会一次次撞见这个模式——<router-link to="/linear-algebra/determinant">下一讲</router-link>
        用一个数来判断矩阵可不可逆，
        <router-link to="/linear-algebra/linear-map">第三讲</router-link>把可逆解释成"变换能不能倒着做"，
        而<router-link to="/linear-algebra/vector-space">第四讲</router-link>会告诉你不可逆时到底丢了什么。
        <strong>"可逆"是这门课真正的主角，本讲是它第一次出场。</strong>
      </p>
    </RevealBox>
    <QuizBox
      quiz-id="elimination-q2"
      question="定义里「某一行乘以非零常数」的 $k \neq 0$，删掉行不行？"
      hint="拿方程 x = 1 试试：两边乘 0 之后，解集变成了什么？"
      :options="[
        { t: '不行：乘 0 把一行抹成 0 = 0，信息被销毁，解集会凭空变大', why: '对。x = 1 两边乘 0 得 0 = 0，原来的解还在（第一步的「不丢解」照样成立），可解集从一个点膨胀成整条实数轴。k ≠ 0 是可逆性的命门：乘 k 要靠乘 1/k 才能倒回去，而 1/0 不存在。' },
        { t: '行：乘 0 之后原来的解照样满足新方程，一个解都没丢', why: '「没丢解」只是证明的一半——另一半是「没多解」。乘 0 恰恰在这一半上翻车：新方程 0 = 0 谁都满足，解集凭空膨胀。只检查一半就放行，正是折叠框里警告的那个陷阱。' },
        { t: '不行，但原因是乘 0 后整行变成 0，数字太难看', why: '数学不管难看不难看——整行为 0 的真正罪状是「回不去了」：这一步没有逆操作，被抹掉的证词再也无法恢复。判断一个操作合不合法，标准从来只有一条：可逆吗？' },
      ]"
      :answer="0"
    />
    <p>再看定义里另外两处容易滑过去的限制：</p>
    <ul>
      <li>
        变换的对象是<strong>整行</strong>（系数连同右端一起动），对应"方程两边同时操作"——
        只动左边不动右边，等式就毁了；
      </li>
      <li>
        变换只作用于<strong>行</strong>，不能对列乱来。行是方程，列是未知数：
        交换两行只是把两个方程换个书写顺序，无伤大雅；
        而交换两列等于把 x 和 y 的身份对调，答案会跟着串位
        （真要这么做就得同时记住"我换过了"，得不偿失）。
      </li>
    </ul>
    <p>
      消元的终点叫<strong>行阶梯形</strong>：每行的第一个非零元（叫<strong>主元</strong>）严格右移、零行沉底。
      教科书常说"到了这个形状，解的一切信息都摆在明面上"——这话是对的，但"摆在明面上"
      具体长什么样，值得当场看三个例子。
    </p>
    <RevealBox
      title="🔍 三种命运长什么样：同一个系数表，改一个数就换一种结局"
      label="对答案 / 看完整拆解"
    >
      <template #hint>
        先自己动手消一遍这个方程组：<MathInline tex="x+y+z=3" />、
        <MathInline tex="x+2y+3z=6" />、<MathInline tex="x+3y+5z=9" />。
        （提示：第二、三行各减去第一行，再让第三行减去新第二行的 2 倍。）
        你会得到一个意外的结果。<strong>然后把最后一个方程的右端 9 改成 10，再消一次。</strong>
        两个阶梯形，写完再点开。
      </template>
      <p>
        <strong>情形一：唯一解。</strong>贰节那个例子消到底是
      </p>
      <MathBlock tex="\left[\begin{array}{cc|c} 1 & 0 & 2 \\ 0 & 1 & 3 \end{array}\right]" />
      <p>
        每一列都有主元，每个未知数都被单独钉死，直接读出
        <MathInline tex="x=2,\ y=3" />。这是最舒服的情形。
      </p>
      <p>
        <strong>情形二：无穷多解。</strong>拿提示里那个方程组消元：
      </p>
      <MathBlock tex="\left[\begin{array}{ccc|c} 1&1&1&3 \\ 1&2&3&6 \\ 1&3&5&9 \end{array}\right] \;\longrightarrow\; \left[\begin{array}{ccc|c} 1&1&1&3 \\ 0&1&2&3 \\ 0&0&0&0 \end{array}\right]" />
      <p>
        第三行整个塌成 <MathInline tex="0=0" />——它是一句<strong>废话</strong>，
        没有任何约束力（说明第三个方程本来就是前两个的组合，白给的）。
        剩下两个方程管三个未知数，<MathInline tex="z" /> 没人管，
        它是<strong>自由变量</strong>：随便取 <MathInline tex="z=t" />，t 可以是任何实数
        （下式尾巴上的 <MathInline tex="t \in \mathbb{R}" /> 说的就是这句话：
        <MathInline tex="\in" /> 读"属于"，<MathInline tex="\mathbb{R}" /> 是全体实数的记号），
        回代得 <MathInline tex="y = 3-2t" />、<MathInline tex="x = t" />。
      </p>
      <MathBlock tex="(x,y,z) = (t,\ 3-2t,\ t), \qquad t \in \mathbb{R}" />
      <p>
        取 <MathInline tex="t=1" /> 得 <MathInline tex="(1,1,1)" />、
        <MathInline tex="t=0" /> 得 <MathInline tex="(0,3,0)" />、
        <MathInline tex="t=2" /> 得 <MathInline tex="(2,-1,2)" />——代回原方程组都是 3、6、9，全中。
        <strong>解不是一个点，是一条直线。</strong>
      </p>
      <p>
        <strong>情形三：无解。</strong>现在只把最后那个 9 改成 10，系数一个不动：
      </p>
      <MathBlock tex="\left[\begin{array}{ccc|c} 1&1&1&3 \\ 1&2&3&6 \\ 1&3&5&10 \end{array}\right] \;\longrightarrow\; \left[\begin{array}{ccc|c} 1&1&1&3 \\ 0&1&2&3 \\ 0&0&0&1 \end{array}\right]" />
      <p>
        最后一行读出来是 <MathInline tex="0 = 1" />——<strong>一句胡话</strong>。
        胡话意味着假设不成立，方程组无解。这正是动画"出事情形"里那声
        <MathInline tex="0 = -6" /> 的惊叫。
      </p>
      <p>
        <strong>回味：三种命运的分水岭在最后一行。</strong>
        <MathInline tex="0=0" /> 是废话（多解），<MathInline tex="0=1" /> 是胡话（无解），
        而两者的<em>系数部分完全一样</em>——差别只在右端。
        换句话说，<strong>系数表决定了"能有几个解"，右端决定了"到底有没有"</strong>。
        这个分工是<router-link to="/linear-algebra/vector-space">第四讲</router-link>的主线：
        系数表管的那件事叫<em>秩</em>，右端管的那件事叫<em>相容性</em>。
      </p>
    </RevealBox>
    <QuizBox
      quiz-id="elimination-q3"
      question="消到最后一行只剩 $0 = 0$。这个方程组是无解，还是有无穷多解？"
      hint="废话和胡话，哪个是哪个？"
      :options="[
        { t: '无穷多解（或至少不是因为这一行无解）——0 = 0 是句废话，谁都满足', why: '对。0 = 0 没有任何约束力，它只说明有个方程本来就是其余方程的组合、白给的。方程比未知数少了，多出来的未知数成为自由变量，解是一整条直线（或更高维的一片）。真正宣判无解的是 0 = 1 那种胡话。' },
        { t: '无解——都变成 0 = 0 了，说明方程组垮掉了', why: '恰恰反了。0 = 0 恒成立，它不排除任何取值；把「一句方程失去约束力」误当成「整个方程组失效」，是本讲最高频的错。垮掉的标志是 0 = 1：一个不可能成立的等式，才让所有候选解集体出局。' },
        { t: '要看运气，两种都有可能', why: '不靠运气，就看这一行说的是废话还是胡话：0 = 0（废话）→ 约束变少、解变多；0 = 1（胡话）→ 假设崩塌、无解。同一张系数表、只动右端就能在两种命运间切换——折叠框里那对例子演的正是这个。' },
      ]"
      :answer="0"
    />

    <h2><span class="sec-no">伍</span>买到了什么：一门课的种子全在这里</h2>

    <h3>1801 年，被算回来的行星：谷神星</h3>
    <p>
      1801 年元旦夜，巴勒莫天文台的皮亚齐发现一个在恒星间缓缓移动的光点——后来命名为谷神星，
      人类找到的第一颗小行星。他追踪了 41 天，光点便没入太阳的光辉。等它应该再次现身时，
      全欧洲的天文学家都找不到它：41 天的短弧太短，谁也算不准它的轨道。
      接手这道难题的是 24 岁的高斯。当年 11 月他交出预测轨道，12 月 31 日夜，
      天文学家冯·扎克在预测位置附近重新捕获谷神星——<strong>一颗丢失的行星，被纸上的计算找了回来</strong>。
      高斯一夜成名。
    </p>
    <p>
      <strong>为什么这事绕不开线性方程组？</strong>轨道由几个参数定死，而观测记录有几十条，
      每条都带着测量误差——<strong>方程比未知数多，而且彼此矛盾</strong>（误差让它们不可能同时严格成立）。
      "解方程"三个字在这里失效了：根本没有严格解。高斯的回答是换问题——
      不求"全对"，只求<strong>总误差最小</strong>。误差怎么算总账？他选平方和。
      拿一个一年级的例子看这一招的全部味道：同一个量测了三次，读数 39、41、40，该信哪个数？
      找让误差平方和最小的 x：
    </p>
    <MathBlock tex="(x-39)^2 + (x-41)^2 + (x-40)^2 = 3x^2 - 240x + 4802 = 3(x-40)^2 + 2" />
    <p>
      中学的配方法立刻给出答案：<MathInline tex="x = 40" /> 时取最小值 2——
      恰好是三个读数的<strong>平均值</strong>。"测多次取平均"这个人人都会的动作，
      原来是"误差平方和最小"的严格推论。未知数有多个时，同一招的系统化版本
      会把又多又矛盾的观测方程<strong>压缩成一组恰好解得动的线性方程</strong>
      （高斯称之为"法方程"）——然后交给谁？交给消元，照章执行。
      这正是壹节那段动机的下半场：高斯需要"不靠灵感的固定程序"，
      因为谷神星之后，汉诺威大地测量把几十个未知量、上百条观测的方程组
      一摞一摞地堆上了他的书桌。
    </p>
    <p>
      <strong>条件不成立会怎样？</strong>短弧的病根在于：41 天里各条观测长得太像，
      压缩出来的方程组"病态"——系数抖动一丝，解就天翻地覆。
      高斯靠着手上数据勉强够用才赌赢；而"一个方程组天生有多敏感"后来被量化成<strong>条件数</strong>，
      是<router-link to="/numerical/linear-system">数值分析第五讲</router-link>的正题——
      那一讲会给你看，同一套消元，遇上病态系数表能错到什么地步。
    </p>

    <ul>
      <li>
        <strong>矩阵有了出生证</strong>：它最初不是什么神秘对象，就是方程组脱水后的系数表。
        <router-link to="/linear-algebra/determinant">下一讲</router-link>会看到，
        从这张表里能榨出一个判别数（行列式）；
        <router-link to="/linear-algebra/linear-map">再往后</router-link>会发现这张表还有第二重身份
        （它是一个<em>变换</em>），那才是矩阵真正的成年礼；
      </li>
      <li>
        <strong>无解与多解的伏笔</strong>：动画里"0 = −6"那声惊叫说明系数表可能<strong>退化</strong>。
        什么时候退化？能否不做消元、直接从系数看出来？——这正是行列式被发明的原因；
      </li>
      <li>
        <strong>“可逆”这个主角登场了</strong>：本讲的定理全靠它。
        <router-link to="/linear-algebra/eigen">第五讲</router-link>之前的每一讲，
        本质上都在从不同角度回答"这个矩阵可不可逆、不可逆时坏在哪"。
      </li>
    </ul>
    <p>
      还有一件事值得单独展开：消元不只是解题手法，它还<strong>顺手把矩阵拆成了两块</strong>——
      这就是你在数值分析课上见过的 <MathInline tex="A = LU" />。
      它不是另一套理论，就是刚才那套动作的记账单。
    </p>
    <RevealBox
      title="🔍 LU 分解就是消元的记账单：把刚才那道九章题再拆一次"
      label="对答案 / 看完整拆解"
    >
      <template #hint>
        先自己想：消元时你对第二行做的是"减去第一行的 2/3 倍"。
        <strong>这个 2/3 被丢掉了吗？</strong>如果把每一步的"减了几倍"都记在一张表上，
        这张表会长什么样？（提示：一共只有三个这样的乘数。）
        写出这三个数，再点开。
      </template>
      <p>
        <strong>第一步：这次允许出分数，走标准高斯消元。</strong>
        还是 <MathInline tex="A = \begin{pmatrix}3&2&1\\2&3&1\\1&2&3\end{pmatrix}" />
        （九章那道题的系数表——这里只关心系数、不带右端，竖线就不必画了；
        圆括号方括号都只是包装，没有区别）。第一轮：
      </p>
      <MathBlock tex="r_2 \to r_2 - \tfrac23 r_1, \qquad r_3 \to r_3 - \tfrac13 r_1" />
      <p>得到</p>
      <MathBlock tex="\begin{pmatrix}3&2&1\\[2pt] 0&\tfrac53&\tfrac13\\[2pt] 0&\tfrac43&\tfrac83\end{pmatrix}" />
      <p>第二轮只剩一步：</p>
      <MathBlock tex="r_3 \to r_3 - \tfrac45 r_2 \qquad\Longrightarrow\qquad \begin{pmatrix}3&2&1\\[2pt] 0&\tfrac53&\tfrac13\\[2pt] 0&0&\tfrac{12}{5}\end{pmatrix} = U" />
      <p>
        <strong>第二步：把丢掉的乘数捡回来。</strong>整个过程只用了三个乘数：
        <MathInline tex="\tfrac23" />、<MathInline tex="\tfrac13" />、<MathInline tex="\tfrac45" />。
        把它们按"谁减了谁"摆进一个下三角表，对角线填 1：
      </p>
      <MathBlock tex="L = \begin{pmatrix}1&0&0\\[2pt] \tfrac23&1&0\\[2pt] \tfrac13&\tfrac45&1\end{pmatrix}" />
      <p>
        <MathInline tex="L_{21} = \tfrac23" /> 读作"第 2 行减了第 1 行的 2/3 倍"，其余同理。
        <strong>L 里没有一个新数字，全是消元过程中本来就算出来过、然后被扔掉的那些。</strong>
      </p>
      <p>
        <strong>第三步：乘回去。</strong>把 L 和 U 相乘——矩阵乘法的正式定义要到
        <router-link to="/linear-algebra/linear-map">第三讲</router-link>才登场，
        此处先照下面括号里的验算方式"逐格对账"即可：
      </p>
      <MathBlock tex="LU = \begin{pmatrix}1&0&0\\ \tfrac23&1&0\\ \tfrac13&\tfrac45&1\end{pmatrix} \begin{pmatrix}3&2&1\\ 0&\tfrac53&\tfrac13\\ 0&0&\tfrac{12}{5}\end{pmatrix} = \begin{pmatrix}3&2&1\\2&3&1\\1&2&3\end{pmatrix} = A" />
      <p>
        （验一个元素就有感觉了：第 3 行第 2 列 =
        <MathInline tex="\tfrac13\cdot 2 + \tfrac45\cdot\tfrac53 + 1\cdot 0 = \tfrac23 + \tfrac43 = 2" />，
        正是 A 的那个 2。）
      </p>
      <p>
        <strong>回味：为什么值得这么记账？</strong>因为消元的代价全在把 A 变成 U 这一步；
        一旦 L、U 存下来，<strong>换一个右端重解就几乎不要钱</strong>——
        只需两次回代（先解 <MathInline tex="Ly = b" />，再解 <MathInline tex="Ux = y" />），
        代价从 <MathInline tex="n^3" /> 量级掉到 <MathInline tex="n^2" /> 量级。
        工程上常常是同一个 A 配上千个不同的 b（同一个结构、上千种载荷），这笔账极其划算。
        <router-link to="/numerical/linear-system">数值分析第五讲</router-link>接着讲这件事，
        并补上一个本讲回避了的麻烦：万一某一步的主元恰好是 0（或者小得可怕），除法就崩了，
        得先换行——那叫<strong>选主元</strong>。
      </p>
    </RevealBox>
    <p>
      最后算一笔账：消元到底要做多少次乘法？这个数字决定了"多大的方程组算得动"。
      推导路上会撞见一条经典求和公式——不需要任何先修，公式本身下面白给。
    </p>
    <RevealBox
      title="🔍 消元的代价：为什么是 n 的三次方除以 3"
      label="对答案 / 看完整拆解"
    >
      <template #hint>
        先自己数：处理第 1 列时，下面有 <MathInline tex="n-1" /> 行要被消，
        每消一行要在剩下的 <MathInline tex="n-1" /> 列上各做一次乘法。
        <strong>这一列一共多少次？</strong>然后对所有列求和。
        （提示：你会撞见一个熟悉的求和。）
      </template>
      <p>
        <strong>第一步：数第 k 列。</strong>轮到第 k 个主元时，它下面还有
        <MathInline tex="n-k" /> 行要消。消每一行时，要把主元行的后
        <MathInline tex="n-k" /> 个系数各乘以那个乘数再减掉。所以这一列的乘法次数是
      </p>
      <MathBlock tex="(n-k) \times (n-k) = (n-k)^2" />
      <p>
        <strong>第二步：所有列加起来。</strong>（记号 <MathInline tex="\Sigma" />
        读"西格玛"，是"连加"的速记：让 k 从 1 数到 n−1，把每个
        <MathInline tex="(n-k)^2" /> 加起来——第一项 k=1 是 <MathInline tex="(n-1)^2" />，
        最后一项 k=n−1 是 <MathInline tex="1^2" />。）
      </p>
      <MathBlock tex="\sum_{k=1}^{n-1}(n-k)^2 = (n-1)^2 + (n-2)^2 + \cdots + 2^2 + 1^2 = \sum_{j=1}^{n-1} j^2" />
      <p>
        <strong>第三步：这个和有现成公式。</strong>它在数学里到处出现
        （本站<router-link to="/calculus/ftc">微积分第四讲</router-link>用裂项法从零推过一遍，
        想看再去；此处直接拿结论用，并当场核个数）：
      </p>
      <MathBlock tex="\sum_{j=1}^{n-1} j^2 = \frac{(n-1)n(2n-1)}{6}" />
      <p>
        <strong>第四步：n 很大时看主项。</strong>分子展开后最高次是
        <MathInline tex="2n^3" />，除以 6 得
      </p>
      <MathBlock tex="\frac{(n-1)n(2n-1)}{6} \;\approx\; \frac{2n^3}{6} = \frac{n^3}{3}" />
      <p>
        核一下：<MathInline tex="n = 100" /> 时精确值是 328350，而
        <MathInline tex="n^3/3 \approx 333333" />，差不到 1.5%。
      </p>
      <p>
        <strong>回味：这个三次方是有分量的。</strong>未知数翻一倍，工作量涨八倍。
        <MathInline tex="n = 1000" /> 要三亿次乘法（现代 CPU 零点几秒），
        <MathInline tex="n = 10^6" /> 就要 <MathInline tex="3\times 10^{17}" /> 次——
        直接消元彻底不可行。所以真实世界里的超大方程组从不硬消，
        而是改用<strong>迭代法</strong>（猜一个解，反复修正到够准就停），
        那正是<router-link to="/numerical/linear-system">数值分析第五讲</router-link>的下半场。
        <strong>算法的复杂度不是学究气的标签，它直接决定哪些问题人类做得了、哪些做不了。</strong>
      </p>
    </RevealBox>
    <div class="insight">
      <div class="insight-title">🔗 这颗种子往后长成什么：站内连一连</div>
      <p>
        <strong>数值分析</strong>：<router-link to="/numerical/linear-system">LU 分解与选主元</router-link>
        是本讲的直系后代——那里会告诉你，为什么"数学上等价"的两种消元顺序，
        在浮点数里可能一个准一个全错（小数当除数会把
        <router-link to="/numerical/float-error">舍入误差</router-link>放大成灾难）；
        <strong>微积分</strong>：<router-link to="/numerical/root-finding">牛顿迭代</router-link>
        解非线性方程组时，每一步就是解一个线性方程组——
        <router-link to="/calculus/derivative">导数讲</router-link>说的"局部用线性函数冒充自己"，
        兑现出来就是本讲这张表。会解线性方程组，是数值世界的通行证；
        <strong>数学物理方程</strong>：把一根弦、一块板离散成上万个格点后，
        <router-link to="/mathphys/laplace">拉普拉斯方程</router-link>就变成一个上万阶的线性方程组——
        这也是"为什么大方程组值得研究"最常见的来源。
        这些课全在站内、全部从零讲起，顺着学习路径走到便是。
      </p>
    </div>
  </ConceptPage>
</template>
