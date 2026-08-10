<script setup>
import ConceptPage from '../../components/ConceptPage.vue'
import MathBlock from '../../components/MathBlock.vue'
import MathInline from '../../components/MathInline.vue'
import RevealBox from '../../components/RevealBox.vue'
import QuizBox from '../../components/QuizBox.vue'
import MeanValueDemo from '../../demos/MeanValueDemo.vue'
</script>

<template>
  <ConceptPage slug="extremum">
    <h2><span class="sec-no">壹</span>困境：1629 年，一个没有导数的人在求极值</h2>
    <p>
      牛顿和莱布尼茨的微积分要到 1660 年代才出现。可早在
      <strong>1629 年</strong>，图卢兹的一位法官<strong>费马</strong>（数学是他的业余爱好）
      就已经会解这类题了：
    </p>
    <div class="story">
      <div class="story-title">📜 费马的题目：把一根木棍折成两段</div>
      <p>
        一根长 10 的木棍，从某处折断成 x 和 <MathInline tex="10-x" /> 两段。
        <strong>怎么折，才能让两段长度的乘积最大？</strong>
      </p>
      <p>
        答案人人猜得到——对半折，各 5，乘积 25。但"猜得到"不等于"证得出"，
        更不等于"换个题还能算"。费马要的是一套<strong>方法</strong>。
      </p>
    </div>
    <p>
      他的做法今天读起来相当怪异，叫作 <em>adequality</em>（可以译成"准等式"）。
      推理是这样的：<strong>假设最大值在 x 处取到。那么把折点挪动一丁点（记作 e），
      乘积应该"几乎没变"</strong>——因为山顶附近是平的。于是他写下一个"准等式"
      （用 <MathInline tex="\approx" /> 表示"几乎相等"）：
    </p>
    <MathBlock tex="x(10-x) \;\approx\; (x+e)\bigl(10-(x+e)\bigr)" />
    <p>两边展开、把相同的项消掉：</p>
    <MathBlock tex="10x - x^2 \;\approx\; 10x + 10e - x^2 - 2xe - e^2 \quad\Longrightarrow\quad 0 \;\approx\; 10e - 2xe - e^2" />
    <p>
      然后是<strong>最关键、也最可疑的两步</strong>：先<strong>除以 e</strong>
      （所以这时 e 不能是 0），得 <MathInline tex="0 \approx 10 - 2x - e" />；
      再<strong>令 e = 0</strong>，把准等式改判成真等式：
    </p>
    <MathBlock tex="0 = 10 - 2x \quad\Longrightarrow\quad x = 5" />
    <p>
      答案完全正确。可你一定注意到了那个要命的地方：
      <strong>e 先被当作非零（否则不能作除数），转眼又被当作零</strong>。
      这正是一百年后<router-link to="/calculus/limit">第一讲</router-link>里贝克莱主教
      嘲笑的"消失量的鬼魂"。费马自己也说不清 e 到底是什么——同时代的
      <strong>笛卡尔</strong>就抓住这一点猛烈攻击他的方法（1638 年两人为此吵得很凶），
      尽管笛卡尔后来不得不承认：这招算什么都对。
    </p>
    <div class="insight">
      <div class="insight-title">💡 困境的确切形状：三个问句</div>
      <p>
        费马这招（以及它的现代版"<strong>令导数等于零</strong>"）背后压着三个没回答的问题。
        这一讲就是逐个回答它们：
      </p>
      <ul>
        <li>
          <strong>凭什么？</strong>"极值处两侧几乎相等"为什么能救出正确答案——
          它是巧合，还是定理？（贰节：<strong>费马定理</strong>，而且证明只用差商的符号。）
        </li>
        <li>
          <strong>够吗？</strong>解出 <MathInline tex="f'(x)=0" /> 就万事大吉了吗？
          <MathInline tex="f(x)=x^3" /> 在 0 处导数为零，可那儿既不是山顶也不是山谷。
          （贰节：三个陷阱。）
        </li>
        <li>
          <strong>凭什么敢说"最大"？</strong>导数是<em>一个点附近</em>的信息，
          而"最大值"是<em>整条区间</em>的事。局部凭什么管得住全局？
          （贰节：<strong>中值定理</strong>——本讲真正的主角，也是全微积分最被低估的一条定理。）
        </li>
      </ul>
    </div>

    <h2><span class="sec-no">贰</span>破局：先钉住一个点，再让导数管住整条区间</h2>
    <h3>第一步：费马定理——山顶处切线必水平</h3>
    <p>
      <router-link to="/calculus/derivative">第二讲</router-link>末尾其实已经把这件事的骨架给过了，
      这里原地补完整。设 a 是区间<strong>内部</strong>的一个极大值点，即在 a 附近总有
      <MathInline tex="f(a+h) \le f(a)" />。看差商的<strong>符号</strong>：
    </p>
    <MathBlock tex="\frac{f(a+h)-f(a)}{h}\;:\qquad h \gt 0 \Rightarrow \frac{\le 0}{\gt 0} \le 0, \qquad h \lt 0 \Rightarrow \frac{\le 0}{\lt 0} \ge 0" />
    <p>
      分子在两侧都 ≤ 0（a 是最高点），分母却在两侧变号。于是右侧的差商<strong>恒 ≤ 0</strong>、
      左侧的差商<strong>恒 ≥ 0</strong>。而"f 在 a 可导"这句话的意思是
      <strong>两侧奔向同一个数</strong>——一个 ≤ 0、一个 ≥ 0 的数，只能是 0：
    </p>
    <MathBlock tex="f'(a) = 0" />
    <p>
      <strong>这就是费马那招的现代版，而且证明里没有任何"鬼魂"。</strong>
      对照着看，费马的 e 就是我们的 h；他的"除以 e 再令 e = 0"是<em>两步操作</em>，
      我们的"取极限"是<em>一步定义</em>。<strong>他做对了事，只是没有词汇为它辩护。</strong>
    </p>
    <h3>三个陷阱：<MathInline tex="f'=0" /> 远远不够</h3>
    <ul>
      <li>
        <strong>陷阱一：导数为零的点未必是极值。</strong><MathInline tex="f(x)=x^3" /> 在 0 处
        <MathInline tex="f'=0" />，可它左边更小、右边更大，一路上升，那儿只是"歇了一下"
        （叫<strong>拐点</strong>）。所以 <MathInline tex="f'=0" /> 是极值的<strong>必要</strong>条件，
        不是充分条件。
      </li>
      <li>
        <strong>陷阱二：极值未必在导数为零处。</strong>费马定理有"<strong>内部</strong>"两个字。
        <MathInline tex="f(x)=x" /> 在 [0, 1] 上的最大值在 x = 1 取到，
        那里 <MathInline tex="f'=1\neq 0" />——因为它是<strong>端点</strong>，
        右边没有"另一侧"可以夹它。找最值时，<strong>端点必须单独检查</strong>。
      </li>
      <li>
        <strong>陷阱三：还可能压根没有导数。</strong><MathInline tex="f(x)=|x|" /> 在 0 处取到最小值，
        可那里是尖点、导数不存在（<router-link to="/calculus/derivative">第二讲</router-link>算过）。
      </li>
    </ul>
    <p>
      把三种情形合起来，就得到求最值的标准清单：<strong>候选点 = 驻点（f′=0）+ 不可导点 + 端点</strong>，
      逐个算出函数值再比大小。这份清单叫作<strong>临界点</strong>法，
      它是今天所有优化算法的祖宗。
    </p>
    <h3>第二步：中值定理——让局部信息管住整条区间</h3>
    <p>
      现在处理第三个、也是最深的一问。想象你在高速上开了 2 小时、跑了 240 公里，
      平均时速 120。<strong>能不能断定：某个瞬间你的车速表正好指着 120？</strong>
      直觉说当然（不可能全程都低于 120，也不可能全程都高于 120）。
      但这是个需要证明的断言——而它一旦被证明，
      <strong>"平均"和"瞬时"之间就架起了一座桥</strong>。这座桥就是中值定理。
    </p>
    <p>
      先看它的特例，由<strong>罗尔</strong>在 1691 年给出（有趣的是，罗尔本人是无穷小方法的
      <em>反对者</em>，他这条定理原本是用代数方法证的）：
    </p>
    <div class="definition">
      <div class="def-title">📐 罗尔定理（1691）</div>
      <p>
        若 f 在闭区间 <MathInline tex="[a,b]" /> 上连续、在开区间 <MathInline tex="(a,b)" /> 内可导，
        且<strong>两端一样高</strong>（<MathInline tex="f(a)=f(b)" />），
        则存在 <MathInline tex="c \in (a,b)" /> 使 <MathInline tex="f'(c)=0" />。
      </p>
    </div>
    <p>
      <strong>为什么它是对的？</strong>两句话：① 闭区间上的连续函数一定<strong>取得到</strong>
      它的最大值和最小值（这条叫最值定理，它靠的是实数<strong>没有洞</strong>——
      <router-link to="/calculus/limit">第一讲</router-link>讲过的完备性）；
      ② 如果最大最小都在两个端点上取到，那 f 是常数，中间随便挑个点导数都是 0；
      否则最大值或最小值必在<strong>内部</strong>取到，对那个点用费马定理即可。
    </p>
    <p>
      一般情形只要把图<strong>"扳平"</strong>：既然两端不等高，那就减去那条割线，
      让它变得等高，再用罗尔。这一步是全讲最巧的一招，值得自己先试试。
    </p>
    <RevealBox title="🔍 从罗尔到中值定理：减去割线这一招" label="对答案 / 看完整拆解">
      <template #hint>
        先自己动笔：你手上只有"两端等高"版本的罗尔定理，而现在
        <MathInline tex="f(a) \neq f(b)" />。想造一个新函数
        <MathInline tex="g" />，让它<strong>两端等高</strong>、并且它的导数为零
        恰好翻译成你想要的结论。提示：把 f 减去<strong>那条割线</strong>试试，
        算一算 <MathInline tex="g(a)" /> 和 <MathInline tex="g(b)" /> 各等于多少。
      </template>
      <p>
        <strong>第一步：写出那条割线。</strong>过两个端点的直线是
      </p>
      <MathBlock tex="L(x) = f(a) + \frac{f(b)-f(a)}{b-a}\,(x-a)" />
      <p>
        它的斜率记作 <MathInline tex="m = \frac{f(b)-f(a)}{b-a}" />，这正是"平均变化率"。
      </p>
      <p>
        <strong>第二步：造 g，把图扳平。</strong>令
        <MathInline tex="g(x) = f(x) - L(x)" />，即"曲线高出割线多少"。代两个端点：
      </p>
      <MathBlock tex="g(a) = f(a) - f(a) = 0, \qquad g(b) = f(b) - \Bigl[f(a) + \frac{f(b)-f(a)}{b-a}(b-a)\Bigr] = 0" />
      <p>
        <strong>两端都是 0，等高了。</strong>而 g 显然也在
        <MathInline tex="[a,b]" /> 连续、<MathInline tex="(a,b)" /> 可导
        （直线要多光滑有多光滑，减去它不破坏任何性质）。
      </p>
      <p><strong>第三步：对 g 用罗尔。</strong>存在 <MathInline tex="c \in (a,b)" /> 使</p>
      <MathBlock tex="g'(c) = 0 \quad\Longleftrightarrow\quad f'(c) - m = 0 \quad\Longleftrightarrow\quad f'(c) = \frac{f(b)-f(a)}{b-a}" />
      <p>
        <strong>回味：这一招的名字叫"化归"</strong>——不去硬证一般情形，
        而是造一个辅助对象，把一般情形<em>搬运</em>到已经证好的特例上。
        几何上，<MathInline tex="g" /> 就是"以割线为水平线重新量高度"，
        <strong>扳平之后，山顶山谷还在原处，切线的平行关系也没变</strong>。
        这类"减去一个已知的东西，让边界条件变干净"的手法，
        在<router-link to="/mathphys/laplace">数理方程</router-link>里会以"齐次化"的名义再次出现。
      </p>
    </RevealBox>
    <div class="definition">
      <div class="def-title">📐 拉格朗日中值定理（1797 年定型）</div>
      <p>
        若 f 在 <MathInline tex="[a,b]" /> 上连续、在 <MathInline tex="(a,b)" /> 内可导，
        则存在 <MathInline tex="c \in (a,b)" /> 使
      </p>
      <MathBlock tex="f(b) - f(a) = f'(c)\,(b-a)" />
      <p>
        等价写法：<MathInline tex="\dfrac{f(b)-f(a)}{b-a} = f'(c)" />——
        <strong>平均变化率总能被某一点的瞬时变化率精确命中</strong>。
      </p>
    </div>
    <h3>为什么说它是全微积分最被低估的定理</h3>
    <p>
      因为它是<strong>从导数反推函数的唯一通道</strong>。导数是局部的、瞬时的；
      函数值之差是整体的。上面那个等式是<strong>唯一</strong>把两者用等号连起来的工具。
      三条几乎天天在用的结论，全都是它的直接推论：
    </p>
    <ul>
      <li>
        <strong>导数恒为零 ⇒ 函数是常数。</strong>这听着像废话，其实一点也不显然——
        "每一点的变化率都是 0"是无穷多条<em>局部</em>信息，凭什么拼出"整体不变"？
        中值定理一行搞定：任取两点，<MathInline tex="f(y)-f(x)=f'(c)(y-x)=0" />，
        所以处处相等。<strong>这条推论是<router-link to="/calculus/ftc">微积分基本定理</router-link>
        里"任意两个原函数只差一个常数"的全部依据</strong>，而那句话又是"不定积分要加 C"的来历。
      </li>
      <li>
        <strong>导数为正 ⇒ 函数递增。</strong>同样一行：<MathInline tex="y>x" /> 时
        <MathInline tex="f(y)-f(x)=f'(c)(y-x)>0" />。于是"看导数的符号判单调"这件天天做的事，
        底下垫着的是中值定理。
      </li>
      <li>
        <strong>导数有界 ⇒ 函数变化不会太快。</strong>若 <MathInline tex="|f'| \le M" />，
        则 <MathInline tex="|f(y)-f(x)| \le M|y-x|" />。这条叫<strong>李普希茨条件</strong>，
        是<router-link to="/numerical/root-finding">数值分析</router-link>里几乎所有
        "迭代会不会收敛"的判据的出发点。
      </li>
    </ul>
    <QuizBox
      quiz-id="extremum-q1"
      question="「$f'(x_0)=0$」和「$x_0$ 是极值点」，这两句话是什么关系？"
      hint="想想 $f(x)=x^3$ 在 0 处，以及 $f(x)=|x|$ 在 0 处。两个例子各打破一个方向。"
      :options="[
        { t: '前者是后者的必要条件，且只在「$x_0$ 是内部点且 f 在那儿可导」时才必要', why: '对，两个方向都要小心：$x^3$ 说明「导数为零」推不出极值（那是拐点）；$|x|$ 在 0 处取极小却不可导，端点极值也不要求导数为零——所以连「必要」都得加上两个前提。求最值的正确做法是列出驻点、不可导点、端点三类候选再逐个比。' },
        { t: '两者等价：导数为零就是极值，极值处导数必为零', why: '两个方向都错。$x^3$ 在 0 处导数为零却不是极值；$|x|$ 在 0 处是极小值却没有导数。这个「等价」的错觉是解题时漏掉端点和尖点的根源。' },
        { t: '前者是后者的充分条件：只要导数为零就一定是极值', why: '$x^3$ 一个例子就毙掉了：$f^{\\prime}(0)=0$，可它在 0 附近严格递增，既非极大也非极小。要判定还得看二阶导数，或者看一阶导数在两侧有没有变号。' },
        { t: '没有关系，极值要看函数值，导数管的是斜率', why: '关系恰恰是本讲的核心：费马定理说内部可导极值点处斜率必为零——证明只用了「分子在两侧同号、分母变号」。正因为有这层关系，「求极值」才化归成了「解方程 $f^{\\prime}=0$」。' },
      ]"
      :answer="0"
    />

    <h2><span class="sec-no">叁</span>亲手拖出那条平行的切线</h2>
    <p>
      中值定理断言的那个 c 到底存不存在、有几个、什么时候会失踪，拖一次最清楚。
      下面的动画里：红线是<strong>割线</strong>（把两个端点连起来，斜率 = 平均变化率），
      绿色虚线是<strong>与它平行的切线</strong>，绿点就是定理保证的那个 c。
    </p>
    <p>
      说明里有三个"照着做一遍"：先验一次定理，再把它<strong>退化成罗尔定理</strong>
      （把两端拖到一样高），最后<strong>亲手把定理弄坏</strong>——
      换到有尖点的那两档，割线还在，平行切线却一条也找不到。
    </p>
    <MeanValueDemo />

    <h2><span class="sec-no">肆</span>严格定义：极值、驻点与两个判别法</h2>
    <div class="definition">
      <div class="def-title">📐 定义（极值与驻点）</div>
      <p>
        设 f 定义在区间 I 上，<MathInline tex="x_0 \in I" />。
      </p>
      <ul>
        <li>
          若存在 <MathInline tex="\delta>0" />，使得对一切满足
          <MathInline tex="|x-x_0|<\delta" /> 的 <MathInline tex="x \in I" /> 都有
          <MathInline tex="f(x) \le f(x_0)" />，称 <MathInline tex="x_0" /> 是
          <strong>局部极大值点</strong>（把 ≤ 换成 ≥ 就是局部极小）；
        </li>
        <li>
          若上式对 I 上<strong>所有</strong> x 成立，称为<strong>全局最大值点</strong>；
        </li>
        <li>
          若 <MathInline tex="f'(x_0)=0" />，称 <MathInline tex="x_0" /> 为<strong>驻点</strong>；
          驻点、不可导点、端点合称<strong>临界点</strong>。
        </li>
      </ul>
    </div>
    <p>
      定义里那个 <MathInline tex="\delta" /> 值得多看一眼：<strong>"局部"两个字全靠它</strong>。
      它说的是"只要你别走出 <MathInline tex="\delta" /> 这么远，我就是最高的"——
      至于更远处有没有更高的山，这个定义<strong>不管</strong>。
      而"全局"就是把 <MathInline tex="\delta" /> 撤掉、对整个 I 发话。
      现实中的优化算法几乎都只能找到局部极值，深度学习里"陷进局部极小"这句抱怨，
      抱怨的正是这个 <MathInline tex="\delta" />。
    </p>
    <p>判别一个驻点到底是山顶还是山谷，有两套办法：</p>
    <div class="definition">
      <div class="def-title">📐 一阶判别法与二阶判别法</div>
      <p>
        <strong>一阶：</strong>若 <MathInline tex="f'" /> 在 <MathInline tex="x_0" /> 左侧为正、
        右侧为负，则 <MathInline tex="x_0" /> 是局部极大（先升后降）；反之为极小；
        <strong>两侧同号则不是极值</strong>。
      </p>
      <p>
        <strong>二阶：</strong>若 <MathInline tex="f'(x_0)=0" /> 且
        <MathInline tex="f''(x_0)<0" />，则 <MathInline tex="x_0" /> 是局部极大；
        若 <MathInline tex="f''(x_0)>0" />，则是局部极小；
        <MathInline tex="f''(x_0)=0" /> 时<strong>本判别法失效</strong>，退回一阶判别法。
      </p>
    </div>
    <p>
      为什么二阶导数管凹凸？因为 <MathInline tex="f''" /> 是
      <MathInline tex="f'" /> 的变化率：<MathInline tex="f''<0" /> 意味着斜率在
      <strong>持续下降</strong>——从正变到负，那正是"先升后降"，山顶的形状。
      （<strong>而"持续下降 ⇒ 从正变负"这一步用的又是中值定理</strong>，
      本讲的定理确实在替所有人打工。）
      至于 <MathInline tex="f''(x_0)=0" /> 为什么会失效，
      <MathInline tex="x^3" />（不是极值）、<MathInline tex="x^4" />（是极小）
      在 0 处的二阶导数都等于 0，结论却相反——<strong>一个数据点区分不了两种命运</strong>。
    </p>
    <QuizBox
      quiz-id="extremum-q2"
      question="中值定理要求「$[a,b]$ 上连续，$(a,b)$ 内可导」。为什么两个区间一个是闭的、一个是开的——直接要求「$[a,b]$ 上可导」不是更省事？"
      hint="想想半圆 $f(x)=\sqrt{1-x^2}$ 在 [−1, 1] 上：它在两个端点处的切线是什么样的？"
      :options="[
        { t: '为了让定理管得更宽：端点处只要连得上就行，切线竖着也没关系——半圆就是这样', why: '对。$\\sqrt{1-x^2}$ 在 ±1 处切线竖直、导数不存在，但它在 [−1,1] 上连续、在 (−1,1) 内可导，定理照样适用（这里割线斜率为 0，c = 0 处切线水平）。要求「闭区间可导」会把这类完全正常的函数排除在外。' },
        { t: '因为端点处的导数本来就没有定义，函数在那儿断了', why: '端点处函数并没有断——「连续」正是要求它接得上。端点导数只能算单侧的，定理干脆不要它，这是放宽而不是回避。' },
        { t: '只是习惯写法，写成 $[a,b]$ 上可导也等价', why: '不等价：半圆那种例子会被排除掉。定理的条件是精心裁剪的——闭区间连续保证「最值取得到」（罗尔的证明需要它），开区间可导保证「内部能用费马定理」，各司其职。' },
      ]"
      :answer="0"
    />

    <h2><span class="sec-no">伍</span>买到了什么：光会自己解优化题</h2>

    <h3>救生员该在哪里下水：一条被光走了三亿年的路</h3>
    <p>
      <strong>画面。</strong>你是海滩救生员，站在沙滩上。有人在水里呼救。
      你在沙滩上能跑 <strong>4 m/s</strong>，可在水里只能游 <strong>1 m/s</strong>。
      问题很实在：<strong>朝哪儿跑？</strong>
    </p>
    <p>
      具体点：你离水边 50 米，落水者在水中离岸 30 米，你们沿着海岸方向相距 100 米。
      设你从正对自己的岸点往右跑 x 米下水，总时间是
    </p>
    <MathBlock tex="T(x) = \frac{\sqrt{50^2+x^2}}{4} + \frac{\sqrt{30^2+(100-x)^2}}{1}" />
    <p>
      <strong>为什么非得绕道微积分。</strong>直觉给三个方案，全都不对：
      <strong>直线冲过去</strong>（x = 62.5，两段连成一条直线）要 <b>68.03 秒</b>；
      <strong>先直着跑到水边再游</strong>（x = 0）要 <b>116.90 秒</b>；
      <strong>贴着岸跑到正对落水者再下水</strong>（x = 100）要 <b>57.95 秒</b>。
      三个方案差着一倍，而且看不出哪个方向还能再改进——
      <strong>"选一条最好的路"是个连续无穷多选项的问题，只能交给导数。</strong>
    </p>
    <p>
      <strong>推导。</strong>对 T 求导，两项都要用<router-link to="/calculus/chain-rule">上一讲</router-link>的
      链式法则（外层是根号，里层是平方和）：
    </p>
    <MathBlock tex="T'(x) = \frac{x}{4\sqrt{50^2+x^2}} \;-\; \frac{100-x}{\sqrt{30^2+(100-x)^2}}" />
    <p>
      令它等于零。这个方程<strong>没有初等解法</strong>（整理后是个四次方程），
      于是交给数值方法——用二分法解出
    </p>
    <MathBlock tex="x^{*} = 93.2241\ \text{米}, \qquad T(x^{*}) = 57.2023\ \text{秒}" />
    <p>
      比"贴岸跑到底"快 0.75 秒，比"走直线"快<strong>整整 10.8 秒</strong>。
      <strong>顺带看一眼这里发生了什么：解不出闭式，我们就求数值解</strong>——
      <router-link to="/numerical/root-finding">数值分析第 2 讲</router-link>那一整讲讲的就是这件事，
      而它的主角牛顿法，用的正是本讲的"临界点"思路。
    </p>
    <p>
      <strong>读出物理：这条方程其实是一条物理定律。</strong>把
      <MathInline tex="T'(x^*)=0" /> 里的两块各自认一下——
      <MathInline tex="\frac{x}{\sqrt{50^2+x^2}}" /> 正是奔跑段与"岸的法线"夹角的
      <strong>正弦</strong> <MathInline tex="\sin\theta_1" />，
      另一块是游泳段的 <MathInline tex="\sin\theta_2" />。于是方程变成
    </p>
    <MathBlock tex="\frac{\sin\theta_1}{v_1} = \frac{\sin\theta_2}{v_2} \qquad\Longleftrightarrow\qquad \frac{\sin\theta_1}{\sin\theta_2} = \frac{v_1}{v_2}" />
    <p>
      代入刚才的数：<MathInline tex="\sin\theta_1 = 0.8812" />（<MathInline tex="\theta_1=61.79^\circ" />）、
      <MathInline tex="\sin\theta_2 = 0.2203" />（<MathInline tex="\theta_2=12.73^\circ" />），
      比值 <strong>4.0000</strong>——正好等于 <MathInline tex="v_1/v_2 = 4" />，一位不差。
    </p>
    <p>
      <strong>而这条式子有个名字：斯涅尔折射定律。</strong>1621 年斯涅尔从
      <em>实验</em>里量出了它（光从空气进入水中，入射角 30° 对应折射角 22.08°，
      正弦之比恒为 1.33，也就是水的折射率）。
      <strong>1662 年，费马用他那套求极值的方法，把这条实验定律<em>推</em>了出来</strong>——
      前提只有一句"光走用时最短的路径"，即<strong>费马原理</strong>。
      光在水里比在空气里慢（慢 1.33 倍），所以它会像救生员一样，
      <strong>在快的介质里多走一点，在慢的介质里少走一点</strong>。
      你在游泳池边看到的"腿变短了"、插进水里的筷子看着折了，都是这一条式子在起作用。
    </p>
    <p>
      <strong>条件不成立会怎样。</strong>费马原理说的是"取<strong>极值</strong>"，
      而不是"取最小"——这个区别在很多情形下会真的显形：
    </p>
    <ul>
      <li>
        <strong>介质连续变化时，路径会弯。</strong>沙漠里的海市蜃楼、夏天柏油路上的"水洼"，
        都是因为贴地空气热、光速略快，光线于是弯成弧形而不是折线。
        这时"分成两段"的模型失效，要用变分法（本课最后一讲）。
      </li>
      <li>
        <strong>有时最快路径是极大而非极小。</strong>凹面镜里某些反射路径是"用时最长"的驻点。
        所以严谨的说法是"<strong>光程取驻值</strong>"——
        <MathInline tex="f'=0" /> 而已，正是本讲反复强调的那件事：<strong>驻点不等于最值。</strong>
      </li>
      <li>
        <strong>更彻底的解释里，光并不"选"路。</strong>费恩曼的量子电动力学说：
        光把所有路径都走了，只是在最短路径附近相位一致、相互加强，别处相互抵消。
        <strong>"极值"在那里的含义变成了"相位驻定"</strong>——
        <MathInline tex="f'=0" /> 换了个物理身份，公式一字未改。
      </li>
    </ul>

    <h3>可乐罐为什么不是"最省铝"的形状</h3>
    <p>
      再算一件天天见的东西。做一个容积 330 毫升的圆柱形罐子，
      <strong>怎样的高和直径最省材料</strong>？设底面半径 r、高 h，则
      <MathInline tex="V=\pi r^2 h = 330" />，而表面积（上下两个圆 + 侧面）是
    </p>
    <MathBlock tex="A(r) = 2\pi r^2 + 2\pi r h = 2\pi r^2 + \frac{2V}{r}" />
    <p>
      （第二步把 <MathInline tex="h=V/(\pi r^2)" /> 代进去，
      把两个变量化成一个——<strong>这一步"消元"往往比求导本身更关键</strong>。）
      求导并令其为零：
    </p>
    <MathBlock tex="A'(r) = 4\pi r - \frac{2V}{r^2} = 0 \quad\Longrightarrow\quad r^3 = \frac{V}{2\pi} \quad\Longrightarrow\quad r = 3.7449\ \text{cm}" />
    <p>
      此时 <MathInline tex="h = V/(\pi r^2) = 7.4899" /> cm，正好是
      <MathInline tex="2r" />——<strong>最省材料的罐子，高度等于直径</strong>
      （从正面看是个正方形）。用料 <MathInline tex="A = 264.36\ \text{cm}^2" />。
      顺带用二阶判别法确认这确实是极小：
      <MathInline tex="A'' = 4\pi + 4V/r^3 > 0" />，恒正，山谷无疑。
    </p>
    <p>
      <strong>可你手上的可乐罐明明是细高的</strong>：直径约 6.6 cm、高约 11.5 cm。
      按同样容积算，半径 3.3 cm 的罐子表面积是 <b>268.42 cm²</b>——
      比理论最优多用 <strong>1.54%</strong> 的铝。
      为什么厂家不改？答案分两半，两半都有意思：
    </p>
    <ul>
      <li>
        <strong>一半是模型不够全。</strong>罐子的顶盖要承受开启拉环的力，
        比侧壁厚得多（实际厚度差三倍以上），所以真实的"成本函数"里顶盖的权重更大，
        最优解自然会偏向<strong>缩小顶面、拉高罐身</strong>。还有握持手感、货架陈列、
        与瓶装饮料的视觉对比——这些也都是约束，只是写不进 <MathInline tex="A(r)" />。
      </li>
      <li>
        <strong>另一半是更有意思的数学事实：极值点附近，函数是平的。</strong>
        半径偏离最优值 12%（3.7449 → 3.3），用料只多了 1.54%。
        这不是巧合——<strong>在驻点处一阶项消失了</strong>，误差只能从二阶项开始算起，
        所以<MathInline tex="\text{偏差}^2" />级别的量才决定代价。
        这条性质是工程上的巨大福音：<strong>你不必把最优解算得很准，
        差不多就已经差不多了</strong>。（也是为什么厂家有余裕拿这 1.5% 去换别的好处。）
      </li>
    </ul>
    <QuizBox
      quiz-id="extremum-q3"
      question="上面说「半径偏离最优 12%，用料只多 1.54%」。这个「偏得多、亏得少」是这道题的巧合，还是所有极值问题共有的？"
      hint="在驻点处，$A'(r^*)=0$。把 $A(r^*+\delta)$ 按「函数值 + 一阶项 + 二阶项」展开，看看哪一项没了。"
      :options="[
        { t: '所有极值点都这样：一阶项含 $A^{\\prime}(r^*)=0$ 而消失，代价从二阶项 $\\delta^2$ 起算', why: '对。这正是「驻点」的几何含义——曲线在那里是平的。偏差 $\\delta$ 缩小到十分之一，代价就缩小到百分之一。工程上「最优解不必算太准」的底气全在这里，后面泰勒展开那一讲会把这句话写成精确的公式。' },
        { t: '是这道题的巧合，因为表面积公式里有 $r^2$ 这样的平方项', why: '与公式里有没有平方项无关。换成任何在最优处可导的成本函数，结论都一样：一阶项被 $A^{\\prime}=0$ 抹掉了，剩下的最低阶就是二阶。' },
        { t: '因为 12% 本来就不算大，换成偏离 50% 就不成立了', why: '「平」是局部性质，偏得太远确实会失效（r = 3.0 时已多用 4.61%）。但要点不是「12% 小」，而是<b>代价随偏差的平方增长</b>——偏差减半，代价降到四分之一，这在任何尺度上都是驻点的标志。' },
      ]"
      :answer="0"
    />
    <div class="insight">
      <div class="insight-title">🔗 这一讲往后通到哪：站内连一连</div>
      <p>
        <strong>微积分基本定理</strong>：<router-link to="/calculus/ftc">那一讲</router-link>里
        "两个原函数只差一个常数"、"不定积分要加 C"，靠的就是本讲那条
        "导数恒为零 ⇒ 函数是常数"；
        <strong>泰勒展开</strong>：<router-link to="/calculus/taylor">泰勒那一讲</router-link>的
        拉格朗日余项 <MathInline tex="\frac{f^{(n+1)}(\xi)}{(n+1)!}h^{n+1}" /> 里那个神秘的
        <MathInline tex="\xi" />，正是中值定理里的 c——余项定理是中值定理的 n 阶推广；
        <strong>数值分析</strong>：<router-link to="/numerical/root-finding">牛顿法</router-link>
        的收敛性证明、<router-link to="/numerical/interpolation">插值误差</router-link>公式，
        都要在关键一步请出中值定理；
        <strong>概率论</strong>：<router-link to="/probability/lln">大数定律</router-link>那一带的
        不等式估计，反复用"导数有界 ⇒ 函数变化不会太快"；
        <strong>线性代数与机器学习</strong>：多元版的"令导数为零"就是
        <MathInline tex="\nabla f = 0" />，本课后面讲梯度时会看到，
        而<router-link to="/linear-algebra/eigen">特征值</router-link>那一讲的
        "二次型主轴"正是多元版的二阶判别法。
      </p>
    </div>
  </ConceptPage>
</template>
