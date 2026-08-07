<script setup>
import ConceptPage from '../../components/ConceptPage.vue'
import MathBlock from '../../components/MathBlock.vue'
import MathInline from '../../components/MathInline.vue'
import RevealBox from '../../components/RevealBox.vue'
import QuizBox from '../../components/QuizBox.vue'
import RiemannSumDemo from '../../demos/RiemannSumDemo.vue'
</script>

<template>
  <ConceptPage slug="integral">
    <h2><span class="sec-no">壹</span>困境：直边的尺子，量不了曲边的地</h2>
    <p>
      三角形、多边形的面积，古人早就会算。但只要边界弯了——圆、抛物线弓形、酒桶的容积——
      "长 × 宽"立刻失效。<strong>曲边图形的面积怎么定义、怎么计算？</strong>
      这个问题比切线问题还古老两千年。
    </p>
    <div class="story">
      <div class="story-title">📜 公元前 250 年 · 阿基米德的穷竭法</div>
      <p>
        阿基米德求抛物线弓形（一条弦与抛物线围出的那块地）的面积：先在里面内接一个大三角形，
        再在剩下的两条缝里各塞一个小三角形，再在新缝里塞四个更小的……
        每一轮新增的面积恰好是上一轮的 1/4。于是他证明了弓形面积等于第一个三角形的
        <MathInline tex="1 + \frac{1}{4} + \frac{1}{16} + \cdots = \frac{4}{3}" /> 倍。
      </p>
      <p>
        这几乎就是无穷级数求和，但出于对"无穷"的忌惮，他全程用有限步骤 + 反证法表述。
        1800 多年后，开普勒为了计算葡萄酒桶的容积重拾"无限细分"的思路
        （他的著作就叫《酒桶的新立体几何》），这条线索最终汇入牛顿与莱布尼茨之手。
      </p>
    </div>
    <p>
      故事里有两个数是白给的：<strong>为什么每一轮恰好是 1/4？那个 4/3 又是怎么加出来的？</strong>
      这两问才是阿基米德的真本事所在，而且都能当场算给你看。
    </p>
    <RevealBox
      title="🔍 那个 1/4 与那个 4/3：阿基米德到底算了什么"
      label="对答案 / 看完整拆解"
    >
      <template #hint>
        先自己动笔：取抛物线 <MathInline tex="y = x^2" />，弦从 <MathInline tex="(0,0)" /> 拉到
        <MathInline tex="(2,4)" />。阿基米德塞三角形的规矩是——第三个顶点取<strong>切线与弦平行</strong>的那一点。
        求出这个顶点，再算出三角形的面积。一个点、一个面积，算完再点开。
      </template>
      <p>
        <strong>第一步：找那个顶点。</strong>弦的斜率是
        <MathInline tex="(4-0)/(2-0) = 2" />；抛物线在 x 处的切线斜率是
        <MathInline tex="2x" />（<router-link to="/calculus/derivative">上一讲</router-link>的成果）。
        令 <MathInline tex="2x = 2" /> 得 <MathInline tex="x = 1" />，顶点是
        <MathInline tex="C = (1, 1)" />。
      </p>
      <p>
        <strong>第二步：算第一个三角形。</strong>弦在 <MathInline tex="x=1" /> 处的高度是 2，
        而 C 的高度是 1，两者竖直相差 <MathInline tex="d = 1" />。
        一个顶点离对边竖直距离为 d、对边水平跨度为 w 的三角形，面积就是
        <MathInline tex="\tfrac12 wd" />，所以
      </p>
      <MathBlock tex="T = \tfrac12 \cdot 2 \cdot 1 = 1" />
      <p>
        <strong>第三步：换成任意一段弦，找出规律。</strong>弦从 a 拉到 b 时，同样的算法给出顶点
        <MathInline tex="m = \frac{a+b}{2}" />，而竖直距离是
      </p>
      <MathBlock tex="d = \frac{a^2+b^2}{2} - \Bigl(\frac{a+b}{2}\Bigr)^{2} = \frac{(b-a)^2}{4}" />
      <p>于是三角形面积为</p>
      <MathBlock tex="T(a,b) = \frac12 (b-a) \cdot \frac{(b-a)^2}{4} = \frac{(b-a)^3}{8}" />
      <p>
        <strong>秘密全在这个三次方上：三角形的面积正比于它那段弦的宽度的三次方。</strong>
      </p>
      <p>
        <strong>第四步：1/4 从哪来。</strong>下一轮的两条缝，各自的宽度<strong>只有上一轮的一半</strong>。
        宽度减半，面积就变成 <MathInline tex="(\tfrac12)^3 = \tfrac18" />；可这样的三角形
        <strong>有两个</strong>。所以新增面积是
      </p>
      <MathBlock tex="2 \times \frac18 = \frac14" />
      <p>
        每一轮都是同一笔账（宽度再减半、个数再翻倍），所以比例永远是 1/4。
        代回具体数字核一下：首个三角形面积 1，第二轮两个合计 0.25，第三轮四个合计 0.0625——正是 1/4 的等比。
      </p>
      <p>
        <strong>第五步：那个 4/3。</strong>就是<router-link to="/calculus/limit">第一讲</router-link>
        那招错位相减，只是公比从 1/10 换成 1/4：
      </p>
      <MathBlock tex="S_n = 1 + \frac14 + \cdots + \frac{1}{4^{\,n-1}} = \frac43\Bigl(1 - \frac{1}{4^{\,n}}\Bigr)" />
      <p>
        差距 <MathInline tex="\tfrac43 \cdot 4^{-n}" /> 要多小有多小，所以弓形面积是首个三角形的 4/3 倍。
        在我们这个例子里就是 <MathInline tex="4/3" />。
      </p>
      <p>
        <strong>回头验一次。</strong>这块弓形夹在弦 <MathInline tex="y = 2x" /> 与抛物线
        <MathInline tex="y = x^2" /> 之间，用本讲末尾就会有的工具去算，答案是
        <MathInline tex="4 - \tfrac83 = \tfrac43" />——<strong>与阿基米德分毫不差</strong>。
        他没有积分，只有三角形、一个等比数列和极大的耐心；
        而这一讲要做的，就是把"极大的耐心"变成一台谁都能用的机器。
      </p>
    </RevealBox>

    <h2><span class="sec-no">贰</span>破局：切成条，用矩形冒充，再让条数飙升</h2>
    <p>
      办法其实只有一个，从阿基米德到黎曼一脉相承：<strong>把曲边图形切成 n 个细条，
      每个细条用矩形近似（高度取条内某点的函数值），加总，然后让 n 趋于无穷</strong>。
      阿基米德用的是三角形、要因图形而异地设计；换成矩形之后，同一套动作对任何函数都能做。
    </p>
    <p>
      但立刻有个尴尬：矩形的高该取在哪？取左端点、右端点还是中点，
      算出来的数<strong>明显不一样</strong>。拿 <MathInline tex="f(x)=x^2" /> 在
      <MathInline tex="[0,2]" /> 上切 8 条试试，三种取法分别给出 2.1875、2.6563、3.1875——
      彼此差着十几个百分点。既然连结果都对不齐，凭什么说其中哪个是"面积"？
    </p>
    <p>
      转机在于：<strong>把 n 加大，这三个数会互相靠拢</strong>。切 150 条时它们变成
      2.6401、2.6666、2.6934，全都挤向同一个数 <MathInline tex="8/3" /> 附近。
      所以"面积"该被定义成<strong>所有取法共同的那个极限</strong>——
      如果这个共同极限真的存在的话。下面就来亲手把 n 拖上去看看。
    </p>
    <QuizBox
      quiz-id="integral-q1"
      question="用左端点矩形算 $x^2$ 在 $[0,2]$ 的面积：切 8 条误差约 0.48。把条数翻倍到 16 条，误差大约变成多少？"
      hint="想想左端点矩形「亏」在哪：每一条里它都少算了一块三角形状的边角料，边角料的底和高各随条宽怎么变？"
      :options="[
        { t: '约 0.24——减半', why: '对（实测 0.2448）。每条里少算的边角料近似一个小三角形，底是条宽 h、高是这条里函数爬升的量（也随 h 缩），单块面积 ~h²；可条数是 2/h 块，总账 ~h。条宽减半，误差就减半——一次只赚一倍，这叫一阶收敛。' },
        { t: '约 0.12——变成四分之一', why: '四分之一是「中点」那档的待遇（实测 0.0104 → 0.0026）：中点矩形在每条里左右两半的亏和赚几乎相抵，剩下的误差 ~h²。动画读数区的「误差指数」显示的正是这两种档次的差别——取点位置不影响极限，但影响奔向极限的速度。' },
        { t: '基本不变——反正都是近似', why: '拖一下动画就能推翻：n 从 8 拖到 150，三种取法全都明显收紧。「近似」不等于「差不多就行」，误差随 n 缩小的规律（一阶还是二阶）恰恰是数值分析整门课的主线。' },
      ]"
      :answer="0"
    />

    <h2><span class="sec-no">叁</span>亲手切条</h2>
    <p>
      三个控件分别管"切哪条曲线""高取在哪""切多少条"。
      建议先固定取样点、只拖 n，看三种取法各自怎么收敛；再回头对比它们收敛得有多快。
    </p>
    <RiemannSumDemo />

    <h2><span class="sec-no">肆</span>严格定义</h2>
    <p>
      定义要用到一个新记号 <MathInline tex="\Sigma" />（希腊字母，读"西格玛"），
      它只是把"连加"写紧凑：<MathInline tex="\sum_{i=1}^{3} i^2" /> 读作
      "让 i 从 1 数到 3，把每个 <MathInline tex="i^2" /> 加起来"，展开就是
      <MathInline tex="1^2 + 2^2 + 3^2 = 14" />——没有任何新运算，只有一套速记。
      角标 i 是"第几条"的编号：<MathInline tex="\Delta x_i" /> 读作"第 i 条的宽"
      （<MathInline tex="\Delta" /> 历来当"一小段"讲），<MathInline tex="\xi_i" />
      （希腊字母，读"克西"）是"在第 i 条里挑出的那个代表点"。
      于是贰节干的事可以拆成四个动作，每个动作一句人话：
      <strong>分割</strong>（把地皮切成 n 条）、<strong>取点</strong>（每条里挑个代表，量出高度）、
      <strong>求和</strong>（矩形面积 高×宽 逐条加总，这就是 Σ 干的活）、
      <strong>取极限</strong>（让最宽的条也趋于零，问总和停向哪里）。定义只是把这四个动作誊写成书面语：
    </p>
    <div class="definition">
      <div class="def-title">📐 定义（定积分，黎曼 1854）</div>
      <p>
        把 [a, b] 任意分割为 n 段，第 i 段宽 <MathInline tex="\Delta x_i" />，在其中任取一点
        <MathInline tex="\xi_i" />，作黎曼和 <MathInline tex="\sum_{i=1}^{n} f(\xi_i)\,\Delta x_i" />。
        若当最宽的一段 <MathInline tex="\lambda = \max \Delta x_i \to 0" /> 时，
        黎曼和的极限存在，且<strong>与分割方式、取点方式都无关</strong>，则称 f 在 [a,b] 上可积，记
      </p>
      <MathBlock tex="\int_a^b f(x)\,\mathrm{d}x = \lim_{\lambda \to 0} \sum_{i=1}^{n} f(\xi_i)\,\Delta x_i" />
    </div>
    <p>读定义时最值得注意的三件事：</p>
    <ul>
      <li>
        <strong>记号本身就是定义的速写</strong>：<MathInline tex="\int" /> 是莱布尼茨把拉丁文
        Summa（求和）的首字母 S 拉长；<MathInline tex="f(x)\,\mathrm{d}x" /> 读作
        "高 f(x) × 无穷细的宽 dx"。整条记号就是"无限细分再求和"的象形文字；
      </li>
      <li>
        <strong>定义里完全没有"原函数"三个字</strong>：积分的本义是面积的极限，
        与求导没有任何先天关系。"积分 = 找原函数"是<router-link to="/calculus/ftc">下一讲</router-link>
        那个了不起的定理带来的<em>福利</em>，不是定义；
      </li>
      <li>
        <strong>"与分割、取点无关"是关键门槛</strong>：注意它比"极限存在"要强得多——
        每一种切法、每一种取点法各自都收敛还不够，它们还必须<em>收敛到同一个数</em>。
        贰节里那三条线挤向同一处，正是这道门槛在过关。
      </li>
    </ul>
    <p>
      那么哪些函数过得了这道门槛？教科书总是一句"连续函数都可积"就带过，
      可这句话并不显然——它凭什么？
    </p>
    <RevealBox
      title="🔍 连续函数为什么一定可积：把所有取法一次性夹住"
      label="对答案 / 看完整拆解"
    >
      <template #hint>
        先自己想想这个策略：在每一小段上，与其纠结取点取在哪，不如<strong>取两个极端</strong>——
        一次全取该段的最大值，一次全取最小值。这两个和有什么用？
        任何别的取点法算出来的和，跟它们是什么关系？想清楚再点开。
      </template>
      <p>
        <strong>第一步：造两个包夹用的和。</strong>固定一种分割，在第 i 段上记
        <MathInline tex="M_i" /> 为函数的最大值、<MathInline tex="m_i" /> 为最小值，作
      </p>
      <MathBlock tex="U = \sum_i M_i\,\Delta x_i \quad(\text{上和}), \qquad L = \sum_i m_i\,\Delta x_i \quad(\text{下和})" />
      <p>
        <strong>不管取点 <MathInline tex="\xi_i" /> 怎么挑</strong>，都有
        <MathInline tex="m_i \le f(\xi_i) \le M_i" />，所以任何黎曼和都被夹在
        <MathInline tex="L" /> 和 <MathInline tex="U" /> 之间。于是只要能证明
        <strong><MathInline tex="U - L \to 0" /></strong>，所有取法就被挤成了一个数——
        定义里那道"与取点无关"的门槛，一次性全过。
      </p>
      <p>
        <strong>第二步：把 <MathInline tex="U-L" /> 写开。</strong>
      </p>
      <MathBlock tex="U - L = \sum_i (M_i - m_i)\,\Delta x_i" />
      <p>
        <MathInline tex="M_i - m_i" /> 就是函数在第 i 段上<strong>上下起伏的幅度</strong>（叫作<em>振幅</em>）。
        所以问题变成一句人话：<strong>能不能把每一小段上的起伏都压得很小？</strong>
        如果每段振幅都小于某个数 <MathInline tex="\eta" />，那么
      </p>
      <MathBlock tex="U - L \le \eta \sum_i \Delta x_i = \eta\,(b-a)" />
      <p>
        只要 <MathInline tex="\eta" /> 能随分割变细而任意小，右边就任意小，收工。
      </p>
      <p>
        <strong>第三步：这里有个真的坑。</strong>"连续"给的承诺是<em>逐点</em>的：
        每个点 x 各有各的 δ。可不同的点，δ 可能差得极远——
        函数在某处特别陡，那里的 δ 就得特别小。而我们需要的是<strong>一个对整段都管用的 δ</strong>，
        否则"每一小段振幅都小"这句话就落空了。
      </p>
      <p>
        这个加强版叫<strong>一致连续</strong>：存在一个<em>公用</em>的 δ，使得区间内<em>任意</em>两点
        只要相距不到 δ，函数值就相差不到给定的量。它确实比连续强——
        <strong>反例</strong>：<MathInline tex="f(x)=1/x" /> 在 <MathInline tex="(0,1]" /> 上处处连续，
        但越靠近 0 越陡，任你把 δ 取得多小，总能在更靠近 0 的地方找到相距不到 δ、
        函数值却差出天际的两点。所以它<strong>不</strong>一致连续。
      </p>
      <p>
        <strong>第四步：闭区间是免费的午餐。</strong>上面那个反例的病根是区间
        <MathInline tex="(0,1]" /> <em>不闭</em>——出事的地方 0 被排除在外，函数得以无限逃逸。
        把区间换成闭的，这种逃逸就不可能了：<strong>闭区间上的连续函数一定一致连续</strong>
        （康托尔定理）。这正是定积分总写成 <MathInline tex="[a,b]" /> 而不是
        <MathInline tex="(a,b)" /> 的深层原因之一。
      </p>
      <p>
        <strong>收口。</strong>给定 ε，先用一致连续找出公用的 δ，使得相距不到 δ 的两点函数值相差不到
        <MathInline tex="\varepsilon/(b-a)" />；再取任何细度 <MathInline tex="\lambda < \delta" />
        的分割，每段的振幅就都不到 <MathInline tex="\varepsilon/(b-a)" />，于是
      </p>
      <MathBlock tex="U - L \le \frac{\varepsilon}{b-a}\cdot(b-a) = \varepsilon" />
      <p>
        <strong>连续函数因此都可积。</strong>回头看，这条证明真正花力气的地方不在积分，
        而在"逐点的承诺能否升级成整段的承诺"——闭区间那一步才是它的骨头。
      </p>
    </RevealBox>
    <p>
      反过来，也确实有函数过不了这道门槛。<strong>狄利克雷函数</strong>（有理数处取 1、无理数处取 0）
      在每一小段上都同时取到 1 和 0，振幅恒等于 1，<MathInline tex="U-L" /> 永远等于
      <MathInline tex="b-a" />，怎么切都压不下去：取点全取有理数得
      <MathInline tex="b-a" />，全取无理数得 0，两个极限对不上，故黎曼不可积。
    </p>
    <p>
      这类"病态函数"逼出了 20 世纪的<strong>勒贝格积分</strong>。它换了个切法——
      黎曼是<em>竖着</em>切自变量（把 [a,b] 分成小段），勒贝格是<em>横着</em>切函数值
      （把"函数值落在 0.3 到 0.4 之间的那些 x"归成一堆，再量这堆 x 有多"大"）。
      对狄利克雷函数，横着切立刻有答案：有理数那一堆"总长度"是 0，
      所以积分是 0。<strong>"一堆散点的总长度"该怎么定义</strong>，就是测度论的起点，
      也是<router-link to="/probability/distribution">现代概率论</router-link>里
      "概率"二字的严格出身——概率就是一种测度。
    </p>
    <QuizBox
      quiz-id="integral-q2"
      question="定义要求「与取点方式无关」——可取法有无穷多种，一种一种去验永远验不完。折叠框里那个证明是靠什么一次管住所有取法的？"
      hint="与其追着每种取法算，不如给它们全体上一副夹子。"
      :options="[
        { t: '造出上和 U 与下和 L：任何取法都被夹在两者之间，再证 U − L → 0', why: '对。每段里不管挑哪个点，函数值都不出该段的最大值和最小值之间，所以一切黎曼和都被 L 和 U 夹住；两片夹板一合拢（U − L → 0），无穷多种取法就被一起挤到了同一个数上。「造一对极端把全体夹住」是分析学里反复出现的招式。' },
        { t: '因为 n 很大时每条都很窄，取哪个点数值都几乎一样', why: '方向对但不成句：「几乎一样」每段差多少、加总后会不会积少成多？狄利克雷函数每段也「都很窄」，可每段里 1 和 0 照样同时取到、总差恒为 b − a。把这句直觉变成不等式，正需要上和下和与「振幅 × 宽度」那笔账。' },
        { t: '验有限种代表性取法（左、右、中点）一致就够了', why: '三种对齐挡不住第四种捣乱——狄利克雷函数「全取有理数」和「全取无理数」两种取法就各奔东西。门槛是对一切取法设的，所以证明也必须一次覆盖一切取法。' },
      ]"
      :answer="0"
    />

    <h2><span class="sec-no">伍</span>买到了什么：凡是"累积"，皆是积分</h2>
    <p>
      面积只是幌子。积分真正的身份是<strong>"变化率已知时，把总量累积回来"的万能机器</strong>：
      每个小段上"变化率 × 小段长"是小贡献，积分把无穷多个小贡献加总。
      最顺手的例子在你的仪表盘上：车速表读数一路起伏，<strong>里程表</strong>却稳稳地涨——
      里程就是速度的累积，速度曲线下的"面积"。（速度是路程的导数、路程又是速度的积分，
      这一来一回像是互逆的两台机器——是不是巧合，<router-link to="/calculus/ftc">下一讲</router-link>专门审这桩案。）
      下面把这台机器开进一个性命攸关的地方。
    </p>

    <h3>药盒上"一天两次"是怎么算出来的：血药浓度的曲线下面积</h3>
    <p>
      吃下一片药，有效成分溶进血液：浓度先冲上一个峰值，然后肝肾开始清除，曲线一路衰减。
      药效好不好、毒性大不大，看的<strong>不是峰值，而是这条曲线下面的面积</strong>——
      医学上叫 AUC（area under the curve，曲线下面积），它衡量的是身体
      <strong>"浓度 × 时间"的总暴露量</strong>：每一小段时间里，组织受到的作用是
      "当时的浓度 × 这段时长"，全程加总，正是本讲的黎曼和。
      新药说明书上"一天两次、一次一片"的用法，背后就是把 AUC 控制在有效而不中毒的窗口里。
    </p>
    <p>
      可麻烦和阿基米德当年一模一样：这条曲线<strong>没有现成的公式可以套面积</strong>，
      而且医生手里只有离散的点——血液一小时才能抽一管。切条机器该上场了。
      拿一组典型数字：静脉给药后初始浓度 <MathInline tex="C_0 = 10" /> mg/L，
      身体按比例清除，每过一小时浓度剩下约 82%（临床叫"一级消除"）。
      按一小时一条切成矩形、高取每条中点的浓度，加总得
    </p>
    <MathBlock tex="\text{AUC} \approx \sum_i C(\xi_i)\,\Delta t_i = 49.92 \ \text{mg·h/L}" />
    <p>
      把条切细到 0.1 小时，读数变成 49.9989——一串黎曼和稳稳挤向 <strong>50</strong>。
      这不是巧合：对这种按比例衰减的曲线，AUC 恰好等于 <MathInline tex="C_0 / k" />
      （k 是清除速率，这里 0.2/小时，<MathInline tex="10/0.2 = 50" />，与切条结果对上）。
      这条现在只能靠切条逼近出来的公式，<router-link to="/calculus/ftc">下一讲</router-link>的机器一行就能算出——
      又是一笔记在下一讲头上的账。
    </p>
    <p>
      <strong>读出药理</strong>：AUC = C₀/k 说明总暴露量只由"进多少"和"清多快"两个数定死。
      于是剂量翻倍、AUC 翻倍；而<strong>清除速率 k 减半时，同一片药的 AUC 直接翻倍到 100</strong>——
      这正是肾功能减退的病人和老人吃药要减量的数学原因：药片没变，是分母变了。
      <strong>条件不成立会怎样？</strong>"按比例清除"不是人人适用——酒精走的是另一条路：
      清除它的酶一饱和就只能恒速工作，曲线变成直线下坡，AUC 随剂量按平方增长，
      所以"多喝一倍"远不止"醉一倍"。临床上实测 AUC 也从不套公式，
      而是抽血得离散点后用梯形法加总——那正是
      <router-link to="/numerical/quadrature">数值分析第四讲</router-link>的开场白。
    </p>

    <p>这台累积机器还有几处马上要用到的去处：</p>
    <ul>
      <li>
        <strong>路程</strong>：速度曲线下的"面积"就是路程
        <MathInline tex="s = \int_0^T v(t)\,\mathrm{d}t" />
        —— 这正是<router-link to="/calculus/derivative">导数</router-link>的逆问题，
        也是<router-link to="/calculus/ftc">下一讲</router-link>的主角；
      </li>
      <li>
        <strong>变力做功</strong>：<MathInline tex="W = \int_a^b F(x)\,\mathrm{d}x" />；
        水压、引力、电场的总效果都这么算；
      </li>
      <li>
        <strong>概率论</strong>：连续型随机变量落在 [a,b] 的概率是密度曲线下的面积
        <MathInline tex="P(a \le X \le b) = \int_a^b p(x)\,\mathrm{d}x" />，
        期望 <MathInline tex="E[X] = \int x\,p(x)\,\mathrm{d}x" /> 是"取值 × 权重"的连续加权平均——
        没有积分就没有<router-link to="/probability/distribution">连续型分布</router-link>；
      </li>
      <li>
        <strong>数值分析</strong>：当被积函数没有初等原函数时（比如正态分布的
        <MathInline tex="e^{-x^2}" />），就只能退回本讲的定义去逼近。
        <router-link to="/numerical/quadrature">梯形公式、辛普森公式、高斯求积</router-link>
        本质都是"聪明地取点的黎曼和"——所谓聪明，就是不再傻傻地等分区间、
        用矩形凑数，而是<strong>用抛物线代替矩形</strong>（辛普森），
        或者<strong>连取点位置都拿来当未知数解一遍</strong>（高斯求积）。
        本讲的动画里"中点"那一档比左右端点准得多，就是这条路的第一步。
      </li>
    </ul>
    <div class="insight">
      <div class="insight-title">💡 一句话总结</div>
      <p>
        导数是"无限放大看局部"，积分是"无限细分后加总"。它们看起来毫不相干——
        一个是除法的极限，一个是加法的极限。它们之间竟然互为逆运算，
        这件事完全不显然，值得专门用<router-link to="/calculus/ftc">下一讲</router-link>来讲。
      </p>
    </div>
  </ConceptPage>
</template>
