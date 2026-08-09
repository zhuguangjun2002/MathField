<script setup>
import ConceptPage from '../../components/ConceptPage.vue'
import MathBlock from '../../components/MathBlock.vue'
import MathInline from '../../components/MathInline.vue'
import RevealBox from '../../components/RevealBox.vue'
import QuizBox from '../../components/QuizBox.vue'
import FourierHeatDemo from '../../demos/FourierHeatDemo.vue'
</script>

<template>
  <ConceptPage slug="heat">
    <h2><span class="sec-no">壹</span>困境：拿破仑的科学院收到一篇危险的论文</h2>
    <p>
      1807 年，巴黎科学院收到一篇《固体中的热传播》。作者<strong>傅里叶</strong>不是科班数学家：
      他随拿破仑远征过埃及、正当着伊泽尔省省长，业余痴迷一个问题——<strong>热在固体里怎么流动</strong>。
      当时这是前沿实用问题（炮管散热、地球内部温度），却没有数学理论。
    </p>
    <p>论文做了两件事。第一件：像达朗贝尔对弦那样，给热流写方程。我们照样放慢镜头。</p>
    <div class="story">
      <div class="story-title">📜 推导：给一小段铁棒记热账</div>
      <p>
        一根细铁棒，u(x,t) 是位置 x 在时刻 t 的温度。两条实验事实（牛顿与毕奥早已测明）：
        ① 热量从高温流向低温，流量正比于温度的<strong>斜率</strong>：<MathInline tex="q = -k\, u_x" />（负号：往低处流）；
        ② 一段棒升温多少，正比于它净收到的热量。对 x 到 x+Δx 这一小段记账：
        流入 = 左端进来的 − 右端出去的 = <MathInline tex="k[u_x(x{+}\Delta x) - u_x(x)]" />。
        净流入使温度上升：<MathInline tex="(\text{热容} \cdot \Delta x)\, u_t = k[u_x(x{+}\Delta x) - u_x(x)]" />。
        除以 Δx 取极限——右边又是熟悉的"斜率之差 → 二阶导"：
      </p>
      <MathBlock tex="u_t = a^2 u_{xx}" />
      <p>
        与波动方程只差一处：<strong>时间导数是一阶</strong>。读法：温度的变化率 ∝ 温度曲线的弯曲度——
        凹处（比邻居冷）升温、凸处（比邻居热）降温，<strong>处处向邻居看齐</strong>。没有惯性项，
        所以不会"冲过头"：只有趋同，没有振荡。
      </p>
    </div>
    <p>
      第二件事捅了马蜂窝。解这个方程时，傅里叶宣称：<strong>任意初始温度分布——包括带跳变、带尖角的——
      都能展成三角级数</strong>，并给出了系数的明确公式。评审人拉格朗日（弦振动之争的老将，
      驻波派的死敌）拒绝了这篇论文。傅里叶不改一字地坚持了十五年，1822 年以专著《热的解析理论》出版——
      这本书后来被开尔文称为"一首数学的诗"。
    </p>

    <h2><span class="sec-no">贰</span>破局：系数公式——正交性的第一次胜利</h2>
    <p>
      傅里叶比伯努利多迈出的关键一步：他不空谈"能展开"，他<strong>算出了系数</strong>。
      设 <MathInline tex="\varphi(x) = \sum b_n \sin\frac{n\pi x}{L}" />，怎么把某个 <MathInline tex="b_m" /> 单独抠出来？
      傅里叶的招数：两边同乘 <MathInline tex="\sin\frac{m\pi x}{L}" /> 再积分。奇迹发生——
    </p>
    <MathBlock tex="\int_0^L \sin\frac{n\pi x}{L}\, \sin\frac{m\pi x}{L}\, dx = \begin{cases} 0, & n \neq m \\ L/2, & n = m \end{cases}" />
    <p>
      "奇迹发生"这四个字得兑现——<strong>这条积分不是运气，是三行三角恒等式</strong>，
      而且看清它为什么成立，才能明白傅里叶那一招凭什么总是奏效。
      顺手也把系数公式推出来（它就是上式的直接后果）：
    </p>
    <RevealBox
      title="🔍 三行算出那条正交性积分，再一步得到系数公式"
      label="对答案 / 看完整拆解"
    >
      <template #hint>
        先自己动笔：两个正弦相乘不好积，可<strong>两个余弦相加</strong>好积。
        回忆积化和差 <MathInline tex="\sin A \sin B = \tfrac12[\cos(A-B) - \cos(A+B)]" />，
        代进去看看两项各自积出什么。特别留意 <MathInline tex="n = m" /> 时
        第一项会发生什么<strong>特殊情况</strong>——那正是 <MathInline tex="L/2" /> 的来源。
      </template>
      <p><strong>第一步：积化和差。</strong></p>
      <MathBlock tex="\sin\frac{n\pi x}{L}\sin\frac{m\pi x}{L} = \frac12\left[\cos\frac{(n-m)\pi x}{L} - \cos\frac{(n+m)\pi x}{L}\right]" />
      <p>
        <strong>第二步：<MathInline tex="n \ne m" /> 时两项都归零。</strong>
        对任意<strong>非零整数</strong> k，
      </p>
      <MathBlock tex="\int_0^L \cos\frac{k\pi x}{L}\,dx = \frac{L}{k\pi}\left[\sin\frac{k\pi x}{L}\right]_0^L = \frac{L}{k\pi}\bigl(\sin k\pi - 0\bigr) = 0" />
      <p>
        因为 <MathInline tex="\sin(k\pi) = 0" />——<strong>整数圈，回到原地</strong>。
        <MathInline tex="n \ne m" /> 时 <MathInline tex="n-m" /> 与 <MathInline tex="n+m" />
        都是非零整数，两项各自为零，相减还是零。
      </p>
      <p>
        <strong>第三步：<MathInline tex="n = m" /> 时第一项破例。</strong>
        这时 <MathInline tex="k = n - m = 0" />，被积式变成
        <MathInline tex="\cos 0 = 1" />，积出来是 <MathInline tex="L" /> 而不是 0；
        第二项的 <MathInline tex="k = 2n \ne 0" /> 照旧归零。于是
        <MathInline tex="\frac12(L - 0) = L/2" />。
        <strong>整个正交性的全部机关，就是"只有 k = 0 那一项积不掉"</strong>——
        和<router-link to="/complex/residue">复变第 4 讲</router-link>里
        "绕小圈只有 −1 次幂积不掉"是同一种结构：一族函数里恰好有一个特殊成员幸存，
        于是它就成了提取信息的探针。
      </p>
      <p>
        <strong>第四步：系数公式白送。</strong>把
        <MathInline tex="\varphi(x) = \sum_n b_n \sin\frac{n\pi x}{L}" /> 两边同乘
        <MathInline tex="\sin\frac{m\pi x}{L}" /> 再积分，右边求和号里
        <strong>只有 n = m 那一项活下来</strong>：
      </p>
      <MathBlock tex="\int_0^L \varphi(x)\sin\frac{m\pi x}{L}dx = \sum_n b_n \cdot \begin{cases}0\\ L/2\end{cases} = b_m\cdot\frac{L}{2}" />
      <p>
        移项即得 <MathInline tex="b_m = \frac{2}{L}\int_0^L \varphi(x)\sin\frac{m\pi x}{L}dx" />。
        <strong>一个积分，把无穷多项里的第 m 项单独钓了出来</strong>——
        这就是傅里叶比伯努利多出来的那一步，也是整个频域思维的技术核心。
      </p>
    </RevealBox>
    <div class="insight">
      <div class="insight-title">💡 核心直觉：正弦函数族互相"垂直"</div>
      <p>
        <router-link to="/linear-algebra/vector-space">向量空间讲</router-link>埋的伏笔在此兑现：把
        <MathInline tex="\int fg\,dx" /> 看作函数版的内积（点积），
        上式说的就是<strong>不同频率的正弦互相正交</strong>——像坐标系里的 x 轴、y 轴。
        于是求系数与"求向量在正交基下的坐标"一模一样：拿基向量做内积、除以基向量长度平方：
        <MathInline tex="b_n = \frac{2}{L}\int_0^L \varphi(x)\sin\frac{n\pi x}{L}\,dx" />。
        无穷维函数空间里的"投影"，操作起来不过是一个定积分。
        任意波形是无穷多正弦的叠加不再是玄学：<strong>它就是一个向量在一组正交基上的展开</strong>。
      </p>
    </div>
    <p>
      至于"光滑正弦怎么加出尖角"——答案是<strong>无穷项</strong>加得出（有限项永远加不出，
      所以欧拉、拉格朗日的质疑对有限和是对的）。狄利克雷 1829 年给出第一个严格收敛判据，
      顺带发现"函数"的概念本身需要重修——傅里叶级数逼着 19 世纪重建了函数、收敛乃至积分的定义
      （黎曼积分、康托尔集合论都是这场余震的产物）。
    </p>

    <QuizBox
      quiz-id="heat-q1"
      question="傅里叶把等式两边同乘 $\sin(m\pi x/L)$ 再积分，第 m 个系数就单独掉了出来。这一招凭什么奏效？"
      hint="关键在折叠框里那条积分：两个不同号的正弦相乘，在整根棒上积出来是多少？是「很小」还是「正好是零」？"
      :options="[
        { t: '不同号的两个正弦相乘、在 $[0,L]$ 上积分正好等于 0，所以求和里只有 m = n 那一项活了下来', why: '对：这叫正交性。它给的是精确的 0（积化和差之后 $\\sin(k\\pi) = 0$，整数圈回到原地），所以无穷多项一下子塌缩成一项，$b_m$ 就被抠出来了。' },
        { t: '级数收敛得很快，其余各项小到可以忽略', why: '你把「精确等于零」当成了「小到可以忽略」。正交性给的是严格的 0，跟收敛快慢一点关系都没有——哪怕级数收敛得极慢，这一招照样精确成立。' },
        { t: '因为正弦是奇函数，积分自然为零', why: '你把奇偶性搬错了地方。两个奇函数相乘得到的是偶函数，而且积分区间 $[0,L]$ 也不关于原点对称。真正让它归零的是积化和差之后那个 $\\sin(k\\pi)$。' },
        { t: '因为傅里叶事先假定了 φ 只是有限个正弦的和', why: '恰恰相反：傅里叶主张的是任意函数都能这样展开，这正是欧拉、拉格朗日当年不肯接受的那句大话。他若只处理有限和，这一讲就没什么可讲的了。' },
      ]"
      :answer="0"
    />

    <h2><span class="sec-no">叁</span>亲手拼方波，再看热抹平它</h2>
    <FourierHeatDemo />

    <h2><span class="sec-no">肆</span>严格定义</h2>
    <div class="definition">
      <div class="def-title">📐 定义（傅里叶正弦级数）与定解问题的解</div>
      <p>
        <MathInline tex="[0, L]" /> 上的函数 φ 的<strong>正弦级数</strong>为
        <MathInline tex="\sum_{n=1}^{\infty} b_n \sin\frac{n\pi x}{L}" />，其中
        <MathInline tex="b_n = \frac{2}{L}\int_0^L \varphi(x)\sin\frac{n\pi x}{L}dx" />。
        （狄利克雷判据：φ 分段光滑时级数收敛，间断点处收敛到左右极限的平均。）
      </p>
      <p>两端保持 0 度、初始温度 φ 的铁棒，其温度演化为</p>
      <MathBlock tex="u(x, t) = \sum_{n=1}^{\infty} b_n\, e^{-\left(\frac{n\pi a}{L}\right)^2 t}\, \sin\frac{n\pi x}{L}" />
    </div>
    <p>
      这个解是<strong>从哪儿冒出来的</strong>？上面只把它摆了出来，没说来历。
      其实来历只有两行，而且它解释了本讲最要紧的那个 <MathInline tex="n^2" />
      ——那个指数不是抄来的常数，是被方程逼出来的：
    </p>
    <RevealBox
      title="🔍 两行：为什么每个正弦模式非得配一个 e 的负 n² 次方衰减不可"
      label="对答案 / 看完整拆解"
    >
      <template #hint>
        先自己动笔：单看一个模式，猜它长成
        <MathInline tex="u_n(x,t) = T(t)\sin\frac{n\pi x}{L}" />——
        空间形状不变，只是整体幅度随时间涨落（这正是动画里"驻波原地伸缩"那个画面）。
        把它代进 <MathInline tex="u_t = a^2u_{xx}" />，看 <MathInline tex="T(t)" />
        被逼着满足什么方程。（提示：对 x 求两次导，正弦会掉出什么因子？）
      </template>
      <p>
        <strong>第一步：代入。</strong>设 <MathInline tex="u_n = T(t)\sin\frac{n\pi x}{L}" />。
        对 x 求两次导，正弦每次都掉出一个 <MathInline tex="n\pi/L" />，两次之后连符号一起：
      </p>
      <MathBlock tex="\partial_t u_n = T'(t)\sin\frac{n\pi x}{L}, \qquad \partial_{xx} u_n = -\Bigl(\frac{n\pi}{L}\Bigr)^2 T(t)\sin\frac{n\pi x}{L}" />
      <p>
        <strong>第二步：正弦被约掉，只剩关于 T 的常微分方程。</strong>
        代进 <MathInline tex="u_t = a^2 u_{xx}" />，两边的
        <MathInline tex="\sin\frac{n\pi x}{L}" /> 完全一样，除掉：
      </p>
      <MathBlock tex="T'(t) = -a^2\Bigl(\frac{n\pi}{L}\Bigr)^2 T(t) \quad\Longrightarrow\quad T(t) = T(0)\, e^{-\left(\frac{n\pi a}{L}\right)^2 t}" />
      <p>
        （最后一步是微积分里最熟的那条：<strong>变化率正比于自身，解必是指数</strong>。）
        <strong>关键在那个平方。</strong>求两次导，<MathInline tex="n" /> 就出来两次，
        所以衰减率是 <MathInline tex="n^2" /> 而不是 <MathInline tex="n" />：
        5 号模式不是衰减快 5 倍，而是<strong>快 25 倍</strong>；
        10 号模式快 100 倍。动画里方波的尖角"唰"地一下就圆掉、
        而整体拱形能赖很久，全是这个平方在起作用。
      </p>
      <p>
        <strong>第三步：叠加收工。</strong>方程是线性的，
        所以把每个模式各自的演化按初始系数 <MathInline tex="b_n" /> 加起来，
        仍然是解；而 <MathInline tex="t = 0" /> 时它恰好还原成
        <MathInline tex="\sum b_n \sin\frac{n\pi x}{L} = \varphi(x)" />，初始条件也对上了。
        <strong>方程解完了。</strong>
      </p>
      <p>
        回头看这套路子：<strong>先猜"空间形状 × 时间幅度"的分家形式，
        代进去让偏微分方程塌成常微分方程，再用叠加拼回来。</strong>
        这就是<router-link to="/mathphys/separation">第 5 讲</router-link>要正式登场的
        <strong>分离变量法</strong>，本讲已经偷偷用了一次。
        而"为什么正弦是对的那一族形状"——因为它们是
        <MathInline tex="\partial_{xx}" /> 的<strong>特征函数</strong>
        （求两次导回到自己、只差个常数倍），这正是
        <router-link to="/linear-algebra/eigen">线代特征值讲</router-link>
        那套"在特征基下各过各的日子"，搬到了无穷维。
      </p>
    </RevealBox>
    <p>解的每个部件都会说话：</p>
    <ul>
      <li>
        <strong>衰减因子里的 n²</strong>：第 n 个模式衰减快 n² 倍——高频细节先消失，曲线越来越圆润。
        动画里方波尖角先圆、后塌、终成拱形，就是 n² 在工作。倒放这段录像立刻穿帮
        （细节会无中生有）——<strong>时间之箭</strong>写在指数上；
      </li>
      <li>
        <strong>与<router-link to="/mathphys/wave">波动方程</router-link>的对照</strong>：同一套正弦模式，波动配 cos（转圈，能量守恒），
        热配 <MathInline tex="e^{-\lambda t}" />（滑坡，能量耗散）——时间导数差一阶，宇宙观差一个热力学第二定律；
      </li>
      <li>
        <strong>瞬时传播的代价</strong>：t 取任意小正数，解已是无穷光滑函数——初始尖角瞬间被磨掉，
        且扰动"立即"波及全棒（振幅指数小但非零）。与波动方程的有限速度 c 相反——
        这是热方程作为宏观近似的边界——微观上热是分子一次次随机碰撞传下去的，
        每次碰撞走的距离有限，所以真实的热并不瞬移；
        方程之所以说"瞬时"，是因为它把无穷多次微小碰撞的<strong>统计结果</strong>直接写成了连续的场
        （这条通往<router-link to="/probability/clt">概率论第 5 讲</router-link>，下面还会说）；
      </li>
      <li>
        <strong>吉布斯现象</strong>：间断点旁的过冲<strong>不随项数消失</strong>，只是越挤越窄。
        动画的读数区可以量：目标值是 1，可部分和的峰值 3 项时 1.188、60 项时仍是 1.179，
        极限是 <MathInline tex="\tfrac{2}{\pi}\mathrm{Si}(\pi) = 1.17898\ldots" />——
        超出台阶高度 17.9%，也就是整个跳跃（高度 2）的 <strong>8.95%</strong>，
        教科书说的"约 9%"用的是后一种口径。
        于是"逐点收敛"与"均匀收敛"的差别第一次有了肉眼可见的形象
        （<router-link to="/calculus/limit">微积分极限讲</router-link>里这两个概念的区分，历史动机正在此处）；
        伍节会看到它在 JPEG 里的真身。
      </li>
    </ul>

    <QuizBox
      quiz-id="heat-q2"
      question="解里每个模式都配着一个衰减因子，指数上写的是 $n^2$ 而不是 $n$。这个平方是从哪儿来的？"
      hint="把单个模式代进方程时，对 x 求了几次导？每求一次，正弦前面会掉出什么？"
      :options="[
        { t: '热方程右边是对 x 的二阶导，求两次导就掉出两个 $n\\pi/L$，乘在一起就是平方', why: '对：它是被方程逼出来的，代入即得，没有任何选择余地。后果很实在——5 号模式不是衰减快 5 倍而是 25 倍，所以方波的尖角唰地就圆掉，整体拱形却能赖很久。' },
        { t: '是为了让级数收敛才人为加上去的', why: '你把物理推论当成了数学补丁。这个指数不是谁挑的，是把模式代进方程后 $T(t)$ 被迫满足的方程解出来的结果。收敛是它带来的好处，不是它的动机。' },
        { t: '因为能量正比于振幅的平方', why: '你把上一讲波动方程那条能量式挪过来了。本讲从头到尾没有用到能量——热方程根本不守恒能量式那一套，它是单向抹平的。' },
        { t: '因为傅里叶系数 $b_n$ 本身就带一个 $1/n^2$ 的因子', why: '你把系数和衰减因子搞混了。$b_n$ 只由初始形状决定（方波那档是 $4/(n\\pi)$，还是一次方），它跟时间无关；而衰减因子跟初始形状毫无关系，只由方程决定。两者是解里各管一头的两个部件。' },
      ]"
      :answer="0"
    />

    <h2><span class="sec-no">伍</span>买到了什么：一副拆解万物的眼镜</h2>

    <h3>JPEG：为什么一张照片能小二十倍，而你看不出来</h3>
    <p>
      傅里叶的真正遗产是一种世界观：<strong>任何信号都可以按频率拆开处理</strong>。
      这句话太抽象，所以直接拆一个你手机里有几千个的东西——一张 .jpg 照片。
      整套压缩用的就是本讲这一招，而且每一步都能算给你看。
    </p>
    <p>
      <strong>第一步：把图像也看成"温度分布"。</strong>
      一张灰度图无非是给平面上每个像素一个数（亮度），
      这和本讲那根铁棒给每个位置一个温度是同一件事，只是从一维变成了二维。
      JPEG 把图切成 <strong>8×8 的小块</strong>，每块 64 个数，
      然后对每块做一次二维的傅里叶式展开（用的是余弦版，叫 DCT，
      因为图像块没有"两端为零"这种边界条件，正弦不合适）。
      展开之后还是 64 个数，<strong>一个都没少</strong>——变的只是这 64 个数的<strong>含义</strong>：
      从"64 个像素各自多亮"，变成"64 种花纹各占多少"，
      从左上角的"整块的平均亮度"，一路排到右下角的"最细密的棋盘格"。
    </p>
    <p>
      <strong>第二步：自然图像的能量，几乎全挤在左上角。</strong>
      这才是压缩能成立的原因，而它是可以量的。取一块 8×8 的"天空"
      （亮度从 140 缓缓渐变，外加 ±1.5 的轻微噪声），做一次 DCT 之后
      <strong>只保留左上角 3×3 那 9 个数、其余 55 个全部扔掉</strong>，
      再把图还原回来，逐像素比对：
    </p>
    <MathBlock tex="\text{平缓天空块：}\ 64 \to 9 \ \text{个数，最大像素误差 } 3.6\ \text{（灰度 0–255），均方根 } 1.7" />
    <p>
      <strong>扔掉了 86% 的数据，最坏的一个像素只差 3.6 级灰度</strong>——
      人眼根本看不出来。这就是"小二十倍你却看不出来"的全部秘密：
      不是算法聪明，是<strong>真实照片本来就以低频为主</strong>
      （大片天空、墙面、皮肤都是缓慢变化的），
      高频那一堆系数本来就接近 0，四舍五入成 0 之后还能连成一长串，
      而一长串 0 是压缩算法最爱的东西。
      JPEG 的"质量"滑块调的就是这个四舍五入有多粗。
    </p>
    <div class="insight">
      <div class="insight-title">💡 反过来读：JPEG 什么时候会翻车，以及吉布斯现象在这里的真身</div>
      <p>
        既然压缩靠的是"高频可以扔"，那么<strong>高频本来就是主角的图，就该翻车</strong>。
        把上面同样的实验换一块<strong>带锐利边缘</strong>的图
        （左半边亮度 30、右半边 230，中间一刀切）：
      </p>
      <MathBlock tex="\text{锐利边缘块：}\ 64 \to 9\ \text{个数，最大像素误差 } 75.0;\qquad 64 \to 25\ \text{个数，仍有 } 50.0" />
      <p>
        同样的处理，误差从 3.6 暴涨到 <strong>75</strong>——差了二十倍，
        而且即使多留一倍多的系数（25 个）也还有 50。
        这个误差在图上长什么样？<strong>就是边缘旁边一圈明暗交替的鬼影</strong>，
        工程上叫<strong>振铃</strong>。
      </p>
      <p>
        而它正是本讲第肆节说的<strong>吉布斯现象</strong>本人：
        用有限个光滑余弦去逼近一条跳变，跳变两侧必然过冲，
        <strong>过冲的幅度不随项数减少，只是越挤越窄</strong>——
        上面动画的读数区已经让你量过那个 1.179 了。
        JPEG 把这条一维的结论原样搬到了二维，于是过冲变成了边缘旁的鬼影。
      </p>
      <p>
        这条推理有一个非常实际的推论，而且是你每天都会碰到的：
        <strong>用 JPEG 存文字截图、图表、线稿是错的</strong>——
        它们通篇都是锐利边缘，正是这套方法最不擅长的东西，
        存出来字的边上会糊一圈脏东西，而且文件还不见得小。
        这类图该用 PNG（它走的是完全不同的路子：无损、专治大片纯色）。
        <strong>"截图存 PNG、照片存 JPG"这条经验法则，
        它的数学理由就写在本讲的吉布斯现象里。</strong>
      </p>
    </div>

    <QuizBox
      quiz-id="heat-q3"
      question="上面那块 8×8 的天空，扔掉 86% 的系数后最坏的像素只差 3.6 级灰度。这件事真正说明的是什么？"
      hint="问自己：同样扔掉右下角那 55 个数，如果原图不是天空，而是一块细密的格子布，结果还会这么好看吗？"
      :options="[
        { t: '真实照片本来就以低频为主，高频系数原本就接近 0——省下来的是本来就没什么内容的那部分', why: '对：压缩能成立的原因在图像自己身上，不在算法有多聪明。大片天空、墙面、皮肤都是缓慢变化的，所以能量几乎全挤在左上角；而一长串 0 正是压缩算法最爱的东西。' },
        { t: 'DCT 变换本身就把数据变少了', why: '变换一个数都没少：64 个像素进去，64 个系数出来，完全可逆。少掉的数据是在下一步「扔掉右下角」时才丢的——变换只是把内容重新排队，让该扔的排到一起。' },
        { t: '人眼分辨不出高频，所以任何图扔掉高频都看不出来', why: '你把结论推得太远了。一块细密格子布的能量恰恰全在高频，同样扔法会糊成一片——这正是 JPEG 在文字、线稿、细网格上出现难看噪点的原因。前提是「自然图像」，不是「任何图」。' },
        { t: '因为原图带着 ±1.5 的噪声，本来就不精确', why: '你把噪声当成了压缩的理由。噪声只是让这块天空更真实一点；把噪声去掉、换成完全平滑的渐变，低频集中的现象只会更明显，结论不变。' },
      ]"
      :answer="0"
    />

    <h3>还买到了什么</h3>
    <ul>
      <li>
        <strong>弦振动之争结案</strong>：伯努利的驻波叠加成立，因为正弦族确实张满整个（合理的）函数空间——
        音乐家的直觉领先数学证明七十年（<router-link to="/mathphys/wave">上一讲</router-link>那场吵了半个世纪的架，到此判决）；
      </li>
      <li>
        <strong>同一副眼镜的其他戴法</strong>：MP3 与 AAC 丢掉人耳听不见的频率分量
        （还利用"响的声音会盖住旁边频率的轻声"这条心理声学，把更多系数量化成 0）；
        降噪耳机测出环境噪声的频谱，再放出反相的同频信号去抵消；
        核磁共振成像干脆是<strong>直接在频域采集</strong>，机器量到的原始数据就是傅里叶系数，
        做一次反变换才得到你看到的那张断层图；
        5G 的 OFDM 调制把数据分摊到几千个互相正交的载波上——
        <strong>"正交"这个词的含义，和本讲第贰节那条积分一模一样</strong>；
      </li>
      <li>
        <strong>快速傅里叶变换</strong>：计算数学的老朋友 FFT 把求系数的代价从 n² 降到 n log n——
        被称为二十世纪最重要的算法，没有它上面那串应用都跑不动；
      </li>
      <li>
        <strong>两大逼近哲学对照</strong>（微积分会师）：泰勒展开用多项式冒充函数——
        在一点上无限贴身，走远就失效（局部视角）；傅里叶用正弦冒充函数——处处不完美、整体均方最优
        （全局视角）。一个放大镜，一个棱镜，此后你解题时永远多一个选择：<strong>在时域算，还是去频域算？</strong>
      </li>
    </ul>
    <div class="insight">
      <div class="insight-title">🔗 与你学过的课程连一连</div>
      <p>
        <strong>线性代数</strong>：系数公式 = 正交投影，帕塞瓦尔等式 = 勾股定理的无穷维版；
        <strong>概率论</strong>：特征函数就是分布的傅里叶变换（中心极限定理的证明引擎）；
        热方程的基本解是方差随时间线性增长的正态密度——<strong>扩散就是无数分子各自随机行走的中心极限定理</strong>，
        两门课在此严丝合缝；<strong>复变函数</strong>：傅里叶反演的积分靠留数计算——第四讲的收割机在此上岗。
      </p>
    </div>
  </ConceptPage>
</template>
