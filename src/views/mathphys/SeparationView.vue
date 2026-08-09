<script setup>
import ConceptPage from '../../components/ConceptPage.vue'
import MathBlock from '../../components/MathBlock.vue'
import MathInline from '../../components/MathInline.vue'
import RevealBox from '../../components/RevealBox.vue'
import QuizBox from '../../components/QuizBox.vue'
import SeparationDemo from '../../demos/SeparationDemo.vue'
</script>

<template>
  <ConceptPage slug="separation">
    <h2><span class="sec-no">壹</span>困境：三大方程各有解法，有没有一把万能钥匙</h2>
    <p>
      回望前三讲：<router-link to="/mathphys/wave">波动方程</router-link>靠达朗贝尔换元，<router-link to="/mathphys/heat">热方程</router-link>靠傅里叶级数，<router-link to="/mathphys/laplace">拉普拉斯方程</router-link>靠松弛迭代或复变魔法——
      三套兵器各自为战。但你可能已经嗅到共同的气息：<strong>正弦函数在每一讲都出现了</strong>。
      弦的驻波是正弦，热的衰减模式是正弦，圆盘上的调和函数展开还是三角函数。
      这不是巧合。而历史上更有意思的一点是：<strong>这套流程被人用了八十多年，
      才终于有人回过头去问它凭什么灵</strong>。
    </p>
    <div class="story">
      <div class="story-title">📜 1753 — 1837 年 · 一招用了八十年，才有人问它为什么灵</div>
      <p>
        <strong>1753 年，丹尼尔·伯努利</strong>猜弦的振动可以写成"空间形状 × 时间节奏"，
        得到一族正弦驻波（<router-link to="/mathphys/wave">第 2 讲</router-link>那场吵了半个世纪的架，
        争的就是这族驻波够不够用）。
      </p>
      <p>
        <strong>1780 年代，勒让德与拉普拉斯</strong>算行星的引力势，
        把同一招搬到球面坐标下——这一次分离出来的<strong>不是正弦</strong>，
        而是一族多项式（今天叫勒让德多项式）。它们照样彼此"不打架"，照样能把任意形状展开。
        这是第一个暗示：<strong>主角也许根本不是正弦，而是某种"这个问题自带的固有形状"</strong>。
      </p>
      <p>
        <strong>1807 年、1822 年，傅里叶</strong>把这招用在热方程上，
        并且比伯努利多做了一件事：<router-link to="/mathphys/heat">把系数算了出来</router-link>。
        到这时，三个完全不同的物理问题——弦、行星、热——被同一个套路各个击破。
      </p>
      <p>
        <strong>可是凭什么？</strong>每次都是先"猜"一个乘积形状，猜完居然还真能解出来；
        每次分离出来的那族函数，居然都恰好彼此正交、恰好够用。
        八十年间这些都是<strong>一个方程一个方程碰出来的运气</strong>，没人证明过下一个方程也会这么听话。
      </p>
      <p>
        <strong>1836 — 1837 年，斯图姆与刘维尔</strong>在刘维尔刚创办的那本
        《纯粹与应用数学杂志》上连发数文，一次性回答了这个问题：
        只要方程能写成某个统一的形状，那些"运气"就<strong>全部是定理</strong>——
        不必再逐个去碰。这一讲要拆的就是这台机器。
      </p>
    </div>
    <div class="story">
      <div class="story-title">📜 方法：一个"自私"的猜测</div>
      <p>
        以两端固定的弦为例。猜解具有"变量分离"的形状：<MathInline tex="u(x,t) = X(x)\,T(t)" />
        ——空间形状与时间节奏各管各的、只以乘积相遇。代入 <MathInline tex="u_{tt} = c^2 u_{xx}" />：
      </p>
      <MathBlock tex="X(x)\,T''(t) = c^2 X''(x)\,T(t) \quad\Longrightarrow\quad \frac{T''(t)}{c^2\,T(t)} = \frac{X''(x)}{X(x)}" />
      <p>
        妙处在等号：左边只含 t，右边只含 x——<strong>一个纯粹关于时间的量恒等于一个纯粹关于空间的量，
        两边就只能都等于同一个常数</strong>（记作 −λ）。一条偏微分方程当场劈成两条常微分方程：
        <MathInline tex="X'' = -\lambda X" /> 与 <MathInline tex="T'' = -\lambda c^2 T" />。
        偏微分的"无穷维恐惧"退回到了微积分课的舒适区。
      </p>
    </div>
    <p>
      但常数 λ 不是自由的。X 还要满足边界条件 X(0) = X(L) = 0——解
      <MathInline tex="X'' = -\lambda X" /> 得正弦，要它在两端归零，波长必须"卡"进弦长：
    </p>
    <MathBlock tex="\lambda_n = \left(\frac{n\pi}{L}\right)^2, \qquad X_n(x) = \sin\frac{n\pi x}{L}, \qquad n = 1, 2, 3, \dots" />
    <p>
      这一步写得太快了：<strong>"解 X″ = −λX 得正弦"其实只对 λ &gt; 0 成立</strong>。
      λ 是我们随手引进的一个常数，凭什么它不能是 0、不能是负的？
      把三种情况各试一遍只要几行，而且这几行正是"<strong>为什么频率必须是离散的</strong>"
      ——也就是量子力学里"能级"的原型——的全部内容：
    </p>
    <RevealBox
      title="🔍 三种 λ 各试一遍：负的和零都当场出局，离散性是被边界逼出来的"
      label="对答案 / 看完整拆解"
    >
      <template #hint>
        先自己动笔：<MathInline tex="X'' = -\lambda X" /> 是微积分学过的常系数二阶方程。
        <MathInline tex="\lambda > 0" /> 时通解是三角函数，
        <MathInline tex="\lambda = 0" /> 时是什么，<MathInline tex="\lambda < 0" /> 时又是什么？
        每一种都代进 <MathInline tex="X(0) = X(L) = 0" /> 试试，
        看有没有<strong>非零</strong>解活下来。
      </template>
      <p>
        <strong>情况一：<MathInline tex="\lambda < 0" />。</strong>记
        <MathInline tex="\lambda = -\mu^2" />，方程成 <MathInline tex="X'' = \mu^2 X" />，
        通解是<strong>实指数</strong>（不是三角函数）：
        <MathInline tex="X = A e^{\mu x} + B e^{-\mu x}" />。代边界：
      </p>
      <MathBlock tex="A + B = 0, \qquad A e^{\mu L} + B e^{-\mu L} = 0" />
      <p>
        由第一式 <MathInline tex="B = -A" />，代入第二式得
        <MathInline tex="A(e^{\mu L} - e^{-\mu L}) = 0" />。括号里是
        <MathInline tex="2\sinh(\mu L)" />，而 <MathInline tex="\mu L \ne 0" /> 时它<strong>绝不为零</strong>
        （双曲正弦只在原点取零）。于是只能 <MathInline tex="A = B = 0" />，
        <MathInline tex="X \equiv 0" />——<strong>出局</strong>。
        物理上也说得通：实指数是单调涨或单调落的，一头钉在 0 之后，
        另一头再想回到 0 就非得中途拐弯不可，而它不会拐。
      </p>
      <p>
        <strong>情况二：<MathInline tex="\lambda = 0" />。</strong>方程成
        <MathInline tex="X'' = 0" />，通解是直线 <MathInline tex="X = Ax + B" />。
        两端都为零的直线只有一条：<MathInline tex="X \equiv 0" />。<strong>又出局。</strong>
      </p>
      <p>
        <strong>情况三：<MathInline tex="\lambda > 0" />。</strong>记
        <MathInline tex="\lambda = k^2" />，通解
        <MathInline tex="X = A\sin kx + B\cos kx" />。
        <MathInline tex="X(0) = 0" /> 逼着 <MathInline tex="B = 0" />；
        再要 <MathInline tex="X(L) = A\sin kL = 0" />，而我们不许 <MathInline tex="A = 0" />
        （那又是零解），所以只能
      </p>
      <MathBlock tex="\sin kL = 0 \quad\Longrightarrow\quad kL = n\pi \quad\Longrightarrow\quad \lambda_n = \Bigl(\frac{n\pi}{L}\Bigr)^2" />
      <p>
        <strong>这就是离散性的出处</strong>，而且值得看清是<strong>哪一步</strong>造成的：
        方程本身对 λ 毫无意见（任何正数都给得出正弦），
        是<strong>第二个边界条件</strong>——"另一端也必须回到零"——
        把连续的 λ 筛成了一串孤立的值。
        少一个边界条件，λ 就是连续的；多了这一条，弦就只能唱可数多个音。
      </p>
      <p>
        <strong>回味：这几行就是"量子化"的全部机械原理。</strong>
        <MathInline tex="\lambda &lt; 0" /> 出局对应量子力学里
        "波函数在无穷远必须衰减到零"这个要求，
        而它同样把能量筛成一串离散值。
        课本上"能量只能取某些值"听着神秘，
        在数学上就是本框第三步那句 <MathInline tex="\sin kL = 0" />：
        <strong>被两头堵住的波，只有整数个半波长装得下</strong>。
      </p>
    </RevealBox>
    <p>
      <strong>边界条件把 λ 筛成了离散的一串</strong>——能"住进"这根弦的形状只有可数多个。
      每个 λₙ 再去驱动自己的 T 方程：波动方程给出 cos(nπct/L)（振荡），热方程给出
      <MathInline tex="e^{-\lambda_n a^2 t}" />（衰减）。剩下的交给叠加原理与傅里叶系数——任意初始条件按 <MathInline tex="\\{X_n\\}" /> 分解，
      各模式独立演化，再加回来。
    </p>

    <h2><span class="sec-no">贰</span>破局：这不是技巧，是无穷维的对角化</h2>
    <div class="insight">
      <div class="insight-title">💡 核心直觉：正弦模式是算子的特征向量</div>
      <p>
        把"求两次空间导数"看成一个变换 <MathInline tex="A = -\partial^2/\partial x^2" />
        （吃进一个函数，吐出一个函数——<router-link to="/linear-algebra/linear-map">线代第 4 讲</router-link>说过，函数空间里的线性变换）。
        刚才的 <MathInline tex="X'' = -\lambda X" /> 就是 <MathInline tex="A X = \lambda X" />——
        <strong>不折不扣的特征值问题</strong>！Xₙ 是特征向量，λₙ 是特征值，
        "边界条件筛出离散 λₙ"对应矩阵只有有限个特征值。整套解法于是与<router-link to="/linear-algebra/eigen">线代第 5 讲</router-link>逐字对应：
        <strong>按特征向量分解初始状态 → 每个特征方向按自己的 λ 独立演化 → 叠加回来</strong>。
        分离变量法 = 在函数空间里把微分算子对角化。傅里叶级数的正交性也不再是奇迹：
        对称算子的不同特征值对应的特征向量必正交——协方差矩阵特征向量正交是同一条定理。
      </p>
    </div>
    <p>
      最后那句"对称算子的特征向量必正交"值得当场证一遍，因为它一举回答了
      <router-link to="/mathphys/heat">上上讲</router-link>那个问题：
      <strong>正弦们凭什么恰好互相正交？</strong>那里是硬算积分算出来的，
      看着像巧合；从这个视角看，它是<strong>必然</strong>，而且证明对一切
      斯图姆-刘维尔问题通用，不必逐个去算：
    </p>
    <RevealBox
      title="🔍 为什么正弦一定正交：两次分部积分，和一个非零的差"
      label="对答案 / 看完整拆解"
    >
      <template #hint>
        先自己动笔：设 <MathInline tex="X_m'' = -\lambda_m X_m" />、
        <MathInline tex="X_n'' = -\lambda_n X_n" />，两端都为零。
        算 <MathInline tex="\int_0^L (X_m'' X_n - X_m X_n'')\,dx" />——
        一边用方程代换，另一边用<strong>分部积分</strong>。两个结果一对照会得到什么？
      </template>
      <p>
        <strong>第一步：用方程算它。</strong>把两个方程分别代进去：
      </p>
      <MathBlock tex="\int_0^L \bigl(X_m'' X_n - X_m X_n''\bigr) dx = \int_0^L \bigl(-\lambda_m X_m X_n + \lambda_n X_m X_n\bigr) dx = (\lambda_n - \lambda_m)\!\int_0^L\! X_m X_n\, dx" />
      <p>
        <strong>第二步：换个办法再算一次——分部积分。</strong>
        对第一项分部一次：<MathInline tex="\int X_m'' X_n = [X_m' X_n] - \int X_m' X_n'" />；
        第二项同理。两者相减时，中间那两个
        <MathInline tex="\int X_m' X_n'" /> <strong>形状完全相同，直接抵消</strong>，只剩边界项：
      </p>
      <MathBlock tex="\int_0^L \bigl(X_m'' X_n - X_m X_n''\bigr) dx = \Bigl[X_m' X_n - X_m X_n'\Bigr]_0^L" />
      <p>
        <strong>第三步：边界条件把它抹平。</strong>两端都有
        <MathInline tex="X_m = X_n = 0" />，中括号里每一项都带着一个
        <MathInline tex="X" /> 因子，<strong>整个边界项为零</strong>。
      </p>
      <p><strong>第四步：两次结果一对照。</strong></p>
      <MathBlock tex="(\lambda_n - \lambda_m)\int_0^L X_m X_n\, dx = 0" />
      <p>
        <MathInline tex="m \ne n" /> 时 <MathInline tex="\lambda_m \ne \lambda_n" />，
        括号非零，只能是<strong>积分为零</strong>——这就是正交性，
        <strong>一次三角公式都没用到</strong>。
      </p>
      <p>
        <strong>回味：正交性的真正来源是边界条件，不是正弦。</strong>
        第三步是全证明的枢纽，而它用的只是"两端为零"。
        所以换一种边界条件（比如两端<strong>绝热</strong>，
        <MathInline tex="X'(0) = X'(L) = 0" />），
        边界项照样为零，特征函数换成余弦，<strong>正交性一字不改地成立</strong>；
        换一根粗细不均的弦（系数随 x 变），特征函数变成谁也认不出的怪函数，
        正交性<strong>依然成立</strong>——壹节里勒让德那族多项式就是这么冒出来的：
        换到球面上，"固有形状"不再是正弦，可它们照样两两正交。
        这就是斯图姆-刘维尔理论的分量：
        它保证了"分解 → 独立演化 → 叠加"这套流程<strong>在远比正弦宽广的场合都能用</strong>，
        而不只是在教科书那根均匀弦上。
        <router-link to="/linear-algebra/eigen">线代第 5 讲</router-link>那条
        "实对称矩阵的特征向量必正交"，证明的骨架与上面四步<strong>逐行对应</strong>——
        那里是 <MathInline tex="A^T = A" />，这里是分部积分后边界项为零，
        两者是同一句话在有限维与无穷维的两种写法。
      </p>
    </RevealBox>
    <p>
      壹节说的 1836 — 1837 年那几篇文章，系统化的正是这个视角（一般系数、一般边界条件下
      特征值仍离散、特征函数仍正交完备）。而它一百年后成了量子力学的现成语言：
      薛定谔方程 <MathInline tex="\hat{H}\psi = E\psi" /> 正是特征值问题，
      "能级离散"与"弦只能发整数倍泛音"是同一个数学事实——<strong>量子化 = 边界条件筛选特征值</strong>。
    </p>

    <QuizBox
      quiz-id="separation-q1"
      question="本节说分离变量法「不是技巧，是无穷维的对角化」。这句话的确切内容是什么？"
      hint="把「求两次空间导数」整个看成一台机器：吃进一个函数，吐出一个函数。对正弦用这台机器，吐出来的和吃进去的是什么关系？"
      :options="[
        { t: '「求两次空间导数」是个线性算子，正弦是它的特征向量、$-\\lambda$ 是特征值，于是解法与线代里「按特征向量分解、各自演化、再叠加」逐字对应', why: '对：所以它奏效不是运气。$X^{\\prime\\prime} = -\\lambda X$ 就是不折不扣的特征值问题，边界条件的作用相当于「矩阵只有有限个特征值」——把连续的 λ 筛成一串离散的。' },
        { t: '因为解可以写成 X(x) 乘 T(t) 这种乘积形式', why: '你说的是方法的外形（「分离」这个名字就是这么来的），不是它为什么奏效。乘积形式只是「某个特征方向按自己的 λ 独立演化」这件事的写法；换个不是特征向量的形状，乘积假设立刻失败。' },
        { t: '因为它把一个偏微分方程降成了两个常微分方程', why: '这是过程中的一步好处，可它没回答「凭什么降得下来」。降得下来正是因为空间那一侧存在一族特征函数，把偏导数换成了一个数 λ。' },
        { t: '因为傅里叶级数的正交性保证了展开系数唯一', why: '因果反了。正交性本身就是对角化的推论——对称算子的不同特征值对应的特征向量必正交，折叠框里两次分部积分就证完了。它是结论，不是前提。' },
      ]"
      :answer="0"
    />

    <h2><span class="sec-no">叁</span>亲手看一份初始条件的两种命运</h2>
    <SeparationDemo />

    <h2><span class="sec-no">肆</span>严格定义</h2>
    <div class="definition">
      <div class="def-title">📐 定理（斯图姆-刘维尔特征值问题，1836-1837）</div>
      <p>
        边值问题 <MathInline tex="X'' + \lambda X = 0,\ X(0) = X(L) = 0" /> 仅当
        <MathInline tex="\lambda = \lambda_n = (n\pi/L)^2" /> 时有非零解
        <MathInline tex="X_n = \sin(n\pi x/L)" />。特征值单调趋于无穷，特征函数系
        <MathInline tex="\{X_n\}" /> 两两正交且在 <MathInline tex="L^2[0, L]" /> 中<strong>完备</strong>
        （任何平方可积函数都可按其展开）。
      </p>
    </div>
    <p>读小字：</p>
    <ul>
      <li>
        <strong>"非零解"三个字</strong>：X ≡ 0 永远满足边值问题但毫无用处——与线代"特征向量必须非零"
        一字不差，零向量提供不了任何信息；
      </li>
      <li>
        <strong>"完备"是伯努利-傅里叶之争的最终判决书</strong>：特征函数不多不少恰好张满整个函数空间——
        任意（合理的）初始条件都展得开，一个不漏。这是"驻波叠加万能"的严格版；
      </li>
      <li>
        <strong>方法的边界</strong>：分离变量依赖两点——方程线性、区域"规整"（矩形、圆、球等坐标面）。
        怪形状区域没有现成特征函数表，得靠数值——<router-link to="/mathphys/laplace">上一讲</router-link>
        那块金属板的松弛法就是最朴素的一种，而有限元法的本质是在无数小单元上各自近似这套理论；
        非线性方程干脆没有叠加原理——那是 20 世纪的另一部史诗；
      </li>
      <li>
        <strong>三大方程一表收官</strong>：同一组特征模式，配不同的时间因子——
        波动配 <MathInline tex="\cos(\sqrt{\lambda_n}\,ct)" />（双曲：振荡不衰），
        热配 <MathInline tex="e^{-\lambda_n a^2 t}" />（抛物：指数遗忘），
        拉普拉斯无时间因子、直接由边界定系数（椭圆：一步到位）。
        <strong>三种物理，一套骨架，差别全在特征值怎么被使用。</strong>
      </li>
    </ul>

    <QuizBox
      quiz-id="separation-q2"
      question="定理说特征函数系「两两正交<b>且完备</b>」。「完备」这两个字单独承担了什么？去掉它会缺什么？"
      hint="把两件事分开想：一件是「展开式里的系数能不能唯一地抠出来」，另一件是「到底展不展得开」。哪一件是正交管的？"
      :options="[
        { t: '它保证这族函数不多不少恰好张满整个函数空间——任意合理的初始条件都展得开，一个不漏', why: '对：这正是伯努利-傅里叶之争的最终判决书。欧拉他们质疑的从来不是系数算不算得出来，而是「光滑正弦到底够不够用」——完备性回答的就是这一问。' },
        { t: '它是正交性的另一种说法', why: '两回事，而且管的方向相反。正交管的是「展开式里的系数唯一、能一项项抠出来」；完备管的是「到底展不展得开」。只正交不完备的例子是现成的：把正弦族里删掉一个，剩下的照样两两正交，却再也表示不出被删掉的那个。' },
        { t: '它保证级数在每一点都收敛到函数值', why: '完备是均方（$L^2$）意义上的，逐点收敛要另外的判据。上上讲那条狄利克雷判据说得很清楚：间断点处级数收敛到的是左右极限的平均，而不是函数值。' },
        { t: '它保证特征值有无穷多个', why: '「特征值单调趋于无穷」是定理里另一句话，跟完备不是一回事。有无穷多个也未必够用——数量无穷和「张满整个空间」之间还差着一步，那一步正是完备。' },
      ]"
      :answer="0"
    />

    <h2><span class="sec-no">伍</span>买到了什么：全站大会师</h2>

    <h3>还一笔债：拨在哪儿，决定了这把琴是什么音色</h3>
    <p>
      <router-link to="/mathphys/wave">第 2 讲</router-link>结尾欠了一句话：
      "在弦长 1/5 处拨，第 5 泛音缺席——分离变量讲会算给你看。"
      现在工具齐了，这就算。而且这一算会顺手解释吉他手、钢琴设计师、
      电吉他拾音器工程师各自的一条经验法则——它们其实是同一个公式。
    </p>
    <p>
      <strong>先把初始形状写下来。</strong>拨弦就是把弦在某一点
      <MathInline tex="x = p" /> 提起来再放手：初始形状是一个<strong>三角形</strong>，
      顶点在 <MathInline tex="p" />，两端落回 0（弦长取 1）。
      按傅里叶系数公式积一次（分两段积，都是初等的），得到
    </p>
    <MathBlock tex="b_n = \frac{2}{n^2\pi^2}\cdot\frac{1}{p(1-p)}\cdot\sin(n\pi p)" />
    <p>
      这个式子有<strong>两个因子在管两件不同的事</strong>，分开读它就全懂了：
    </p>
    <ul>
      <li>
        <MathInline tex="1/n^2" />：<strong>泛音天生随号数衰减</strong>，
        跟你怎么拨没关系。这就是为什么弦乐器听上去是"一个音"而不是一团噪声——
        基频永远最响。也解释了<router-link to="/mathphys/heat">上上讲</router-link>
        动画里方波要几十项才拼得像，而拨弦只要三五项就已经很准：
        方波的系数只按 <MathInline tex="1/n" /> 掉，拨弦按 <MathInline tex="1/n^2" />，
        <strong>初始形状越光滑，高频衰减得越快</strong>；
      </li>
      <li>
        <MathInline tex="\sin(n\pi p)" />：<strong>这一项才由你的手指说了算</strong>。
        它在 <MathInline tex="n p" /> 取整数时归零。所以
        <strong>在 <MathInline tex="x = 1/k" /> 处拨，第 k、2k、3k… 号泛音全部缺席</strong>——
        因为 <MathInline tex="\sin(k\pi\cdot\tfrac1k) = \sin\pi = 0" />。
      </li>
    </ul>
    <p>
      第 2 讲那句话于是兑现了：<MathInline tex="p = 1/5" /> 时
      <MathInline tex="\sin(5\pi/5) = 0" />，第 5 泛音<strong>确实</strong>缺席。
      理由也不神秘——<strong>你的手指正按在第 5 号模式的节点上</strong>，
      那个点本来就不动，你根本拨不动它。
      把上面的动画的时间归零、拖那根"拨弦位置"滑杆，读数区会把这张表直接印出来：
    </p>
    <MathBlock tex="\begin{array}{c|ccccc} p & n{=}1 & 2 & 3 & 4 & 5 \\ \hline 0.50 & 100 & 0 & 11 & 0 & 4 \\ 0.20 & 100 & 40 & 18 & 6 & 0 \\ 0.05 & 100 & 49 & 32 & 23 & 18 \end{array}" />
    <p>
      （数字是各泛音相对基频的强度百分比。）一眼就读得出三件事：
      <strong>正中间拨（p = 0.5）所有偶数号全灭</strong>，音色最单薄——
      所以没有人在弦正中拨弦；<strong>越靠近端点，高次泛音留得越全</strong>，
      p = 0.05 时前五个泛音一个不缺，声音明亮甚至发尖。
      古典吉他"靠音孔拨暖、靠琴桥拨亮"，调的就是这张表。
      钢琴的击弦点被设计在弦长的 1/8 到 1/7 处也是同一笔账：
      正好干掉听感上最刺耳的 7 号泛音（它与十二平均律差得最远），
      <strong>这个位置是拿这个公式选出来的，一百多年没怎么变过</strong>。
    </p>
    <div class="insight">
      <div class="insight-title">💡 同一个公式的另一次现身：电吉他为什么有两个拾音器</div>
      <p>
        电吉他的拾音器是一块装在弦下方某个固定位置
        <MathInline tex="x_{\text{拾}}" /> 的磁铁，它感应的是<strong>那一点</strong>的弦振动。
        第 n 号模式在该点的幅度是 <MathInline tex="\sin(n\pi x_{\text{拾}})" />——
        <strong>和拨弦那一项一模一样的形状</strong>。于是同一条结论再来一遍：
        <strong>拾音器装在 <MathInline tex="x = 1/k" /> 处，第 k、2k… 号泛音它一点都听不见</strong>，
        因为它正蹲在那些模式的节点上。
      </p>
      <p>
        这就是为什么电吉他普遍装两个甚至三个拾音器：
        靠琴桥那个（<MathInline tex="x_{\text{拾}}" /> 很小）什么泛音都收得到，声音尖利、
        适合独奏；靠琴颈那个大约在 1/4 处，4、8 号泛音被它自己的位置抹掉，
        声音圆润温暖，适合和弦伴奏。
        <strong>吉他上那个来回拨的小开关，切换的不是音量也不是滤波器，
        是本讲那个 <MathInline tex="\sin(n\pi x)" /> 的取值点。</strong>
      </p>
      <p>
        <strong>再反过来读一次，看这套理论的边界在哪。</strong>
        上面整张表都建立在"初始形状是一个理想三角形"之上，而这不完全真：
        真实的手指有宽度，提起来的是一段圆弧而不是尖角，
        于是高次泛音比公式算的还要弱一些（越尖的角越需要高频，
        这正是<router-link to="/mathphys/heat">上上讲</router-link>吉布斯那一段的道理）；
        用拨片就比用指腹尖得多，所以拨片的声音更亮——
        <strong>"换个拨片音色就变"这件事，变的是初始条件的光滑程度</strong>。
        再加上<router-link to="/mathphys/wave">第 2 讲</router-link>说过的弦刚度（泛音频率略高于整数倍），
        真实乐器与这套理论的差距，恰好就是乐器听起来"有味道"的那部分。
      </p>
    </div>

    <QuizBox
      quiz-id="separation-q3"
      question="在弦长 1/5 处拨弦，第 5、10、15 号泛音全部缺席。这是系数公式里哪个因子干的？"
      hint="那个系数是两个因子相乘。一个跟你的手指落在哪儿完全无关，另一个才由拨点说了算——哪个能等于零？"
      :options="[
        { t: '$\\sin(n\\pi d)$ 那一项：$d = 1/5$ 时，n 取 5 的倍数它就正好归零', why: '对：$n = 5$ 时 $\\sin(5\\pi/5) = \\sin\\pi = 0$，振幅精确为零。吉他手避开第 12 品正上方拨弦、钢琴槌击弦点选在 1/7 到 1/9 之间，用的都是这一条。' },
        { t: '$1/n^2$ 那一项', why: '它管的是「泛音天生随号数衰减」，跟你在哪儿拨毫无关系，而且对任何有限的 n 都不等于零——它只会让高号泛音变弱，永远不会让它缺席。' },
        { t: '因为第 5 泛音的频率太高，人耳听不见了', why: '不是听不见，是压根没被激发出来。基频若是 330 Hz，第 5 泛音才 1650 Hz，稳稳在听觉范围内；它的振幅是精确的 0，不是小到听不见。' },
        { t: '因为手指按在 1/5 处，把弦分成了两段', why: '你把「拨」当成了「按」。按住是改变边界条件（振动段真的被截短了，这是伍节讲品丝的事）；拨只是给弦一个三角形的初始形状，松手之后两端仍然是原来那两个钉死点。' },
      ]"
      :answer="0"
    />

    <h3>全站大会师</h3>
    <p>这门课至此收官，也是整个网站的收官。清点一下你现在手里的地图：</p>
    <ul>
      <li>
        <strong>微积分</strong>给了语言：<router-link to="/calculus/limit">极限</router-link>定义了
        <router-link to="/calculus/derivative">导数</router-link>与
        <router-link to="/calculus/integral">积分</router-link>，偏导数是"切片求导"，
        <router-link to="/calculus/taylor">泰勒</router-link>与傅里叶是两大逼近哲学——
        局部放大镜与全局棱镜；本讲那两个 RevealBox 用的分部积分，
        出自<router-link to="/calculus/ftc">基本定理</router-link>那一讲；
      </li>
      <li>
        <strong>线性代数</strong>给了骨架：叠加原理 =
        <router-link to="/linear-algebra/vector-space">解空间是向量空间</router-link>；
        分离变量 = <router-link to="/linear-algebra/eigen">特征值</router-link>解耦；
        傅里叶系数 = 正交投影。"抽象是批发定理"的承诺，在函数空间全额兑付；
      </li>
      <li>
        <strong>概率论</strong>给了另一双眼睛：热方程的基本解正是
        <router-link to="/probability/clt">中心极限定理</router-link>那条钟形曲线——
        扩散是无数分子各自随机走一步的统计结果，宏观的连续方程与微观的随机碰撞
        算的是同一件事；<router-link to="/mathphys/laplace">上一讲</router-link>更进一步：
        调和函数<strong>就是</strong>随机游走的撞界概率，
        于是解偏微分方程可以改成撒随机点（那里用五十万次模拟验过）。
        <strong>决定论的 PDE 与随机的粒子，是同一实在的两套记账法</strong>；
      </li>
      <li>
        <strong>复变函数</strong>给了利器：调和 ⟺
        <router-link to="/complex/holomorphic">解析函数</router-link>实部，
        保角映射搬运区域（那一讲的机翼），
        <router-link to="/complex/residue">留数</router-link>收割反演积分，
        <router-link to="/complex/continuation">解析延拓</router-link>喂饱特殊函数；
      </li>
      <li>
        <strong>数值分析</strong>给了退路：本讲这套办法只在"规整区域 + 线性方程"里灵，
        而现实里的区域从来不规整。那时就退回
        <router-link to="/mathphys/pde-intro">第 1 讲</router-link>的差商，
        用<router-link to="/numerical/linear-system">迭代法</router-link>去解一个巨大的线性方程组
        （<router-link to="/mathphys/laplace">上一讲</router-link>那块金属板就是最小的样本，
        连"残差小 ≠ 误差小"这个坑都一并见过了）；
      </li>
      <li>
        <strong>数学物理方程</strong>把它们拧成一股绳：三大方程——振荡的、遗忘的、静止的——
        用同一套"特征模式 + 叠加"讲完。而这套语言再往前一步就是量子力学、信号处理与数值仿真的今天。
      </li>
    </ul>
    <div class="insight">
      <div class="insight-title">🔗 终点，也是起点</div>
      <p>
        回到网站首页的那句话：概念不是从天上掉下来的。你现在亲眼看过了——极限是为了驯服芝诺的无穷，
        矩阵是方程组的记账表，概率生于一场没赌完的赌局，虚数被三次方程逼进数学，
        傅里叶级数是一篇被拒稿的论文。<strong>每一个让你"懵懵懂懂"的定义背后，都有一个具体的麻烦、
        一群具体的人和一段真实的挣扎。</strong>教科书从压缩包开始，这里给了你解压后的源代码。
        往后再遇到新概念，愿你的第一反应不再是"背下来"，而是——<strong>"它当年是被什么问题逼出来的？"</strong>
      </p>
    </div>
  </ConceptPage>
</template>
