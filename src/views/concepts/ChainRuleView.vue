<script setup>
import ConceptPage from '../../components/ConceptPage.vue'
import MathBlock from '../../components/MathBlock.vue'
import MathInline from '../../components/MathInline.vue'
import RevealBox from '../../components/RevealBox.vue'
import QuizBox from '../../components/QuizBox.vue'
import ChainRuleDemo from '../../demos/ChainRuleDemo.vue'
</script>

<template>
  <ConceptPage slug="chain-rule">
    <h2><span class="sec-no">壹</span>困境：定义能算，可它算不动</h2>
    <p>
      <router-link to="/calculus/derivative">上一讲</router-link>把导数定义好了，还当场用定义算了两个例子：
      <MathInline tex="s = 5t^2" /> 的导数是 <MathInline tex="10t" />，
      <MathInline tex="a^x" /> 的导数是 <MathInline tex="M(a)\,a^x" />。两次都很顺——
      顺是因为那两个函数<strong>恰好化得开</strong>：分子里的 h 提得出来、约得掉。
    </p>
    <p>
      现在换几个真会遇到的函数试试。它们的共同特征是<strong>"套娃"</strong>：
      一个函数塞进另一个函数的肚子里。
    </p>
    <ul>
      <li>
        <MathInline tex="y = \sin(x^2)" />——先把 x 平方，再取正弦。
        （相机快门、声波调频里到处是它。）
      </li>
      <li>
        <MathInline tex="y = e^{-x^2/2}" />——先算 <MathInline tex="-x^2/2" />，再取指数。
        这条曲线你见过：<router-link to="/probability/clt">概率论第 5 讲</router-link>那口"钟"。
      </li>
      <li>
        <MathInline tex="y = \sqrt{1+x^2}" />——先算 <MathInline tex="1+x^2" />，再开方。
        它是"曲线有多长"这个问题的芯（本课后面专门有一讲）。
      </li>
      <li>
        <MathInline tex="y = (1+x)^{100}" />——一百次方。银行、人口、复利，指数一多就长这样。
      </li>
    </ul>
    <p>
      拿定义硬上第一个。差商是
    </p>
    <MathBlock tex="\frac{\sin\bigl((x+h)^2\bigr) - \sin\bigl(x^2\bigr)}{h}" />
    <p>
      然后就<strong>卡住了</strong>。h 被关在正弦函数的<em>里面</em>——
      分子是两个正弦值之差，你没法像上一讲那样"提出公因式、约掉 h"。
      死磕的话得先用和差化积公式把分子拆开，再对付一个新的极限，
      而每换一个函数，这套挣扎就要从头来一遍。
    </p>
    <p>
      最后那个 <MathInline tex="(1+x)^{100}" /> 更能说明问题：它<strong>不是算不出来，是算不动</strong>。
      按定义，你要把 <MathInline tex="(1+x+h)^{100}" /> 用二项式定理展开成
      <strong>101 项</strong>，跟 <MathInline tex="(1+x)^{100}" /> 的 101 项逐项相消，
      再除以 h、再取极限。理论上没有任何障碍，实际上没人会这么干。
    </p>
    <div class="insight">
      <div class="insight-title">💡 困境的确切形状：定义是"验收标准"，不是"生产流程"</div>
      <p>
        上一讲那个定义完美地回答了"导数<strong>是什么</strong>"——它是一个极限，
        存不存在、等于几，都说得一清二楚。可它<strong>没有告诉你怎么把它算出来</strong>。
        每遇到一个新函数，就要重新设计一次极限的化简技巧，全凭灵机一动。
      </p>
      <p>
        17 世纪需要的不是又一个漂亮定义，而是一套<strong>连不懂几何的人也能照着执行的规则</strong>：
        看见加法怎么办、看见乘法怎么办、看见"套娃"怎么办。
        这一讲要造的就是这套规则——而其中最重要的一条，
        <router-link to="/calculus/derivative">上一讲</router-link>末尾其实已经露过脸了：
        它写下了 <MathInline tex="\frac{\mathrm{d}y}{\mathrm{d}x} = \frac{\mathrm{d}y}{\mathrm{d}u}\cdot\frac{\mathrm{d}u}{\mathrm{d}x}" />，
        并且承认"<strong>法则的证明要老老实实拆成两个差商相乘再取极限</strong>"。
        这笔账现在还。
      </p>
    </div>
    <div class="story">
      <div class="story-title">📜 1675 年 11 月 11 日 · 莱布尼茨算错的那一天</div>
      <p>
        微积分的两位发明者性格截然不同。牛顿把变化率叫"流数"、记作
        <MathInline tex="\dot{x}" />，关心的是物理；莱布尼茨则一门心思要造
        <strong>一台能自动运转的符号机器</strong>——他一生的梦想是发明一种"普遍文字"，
        让思考变成计算。
      </p>
      <p>
        1675 年秋天，他在巴黎的手稿里定下了两个用到今天的记号：10 月 29 日写下了
        积分号 <MathInline tex="\int" />（拉长的 S，summa 的首字母），
        11 月 11 日写下了微分号 <MathInline tex="\mathrm{d}" />。
        <strong>就在写下 d 的那一天，他顺手问了自己一个问题：</strong>
        <MathInline tex="\mathrm{d}(xy)" /> 会不会就等于
        <MathInline tex="\mathrm{d}x \cdot \mathrm{d}y" />？
      </p>
      <p>
        多顺眼啊——"微分"作用到乘积上，结果就是两个微分的乘积。
        <strong>可它是错的</strong>，而莱布尼茨当场就自己否掉了（贰节会看到正确答案长什么样，
        以及错在哪里）。这件小事值得记住两点：第一，
        <strong>好记号会诱惑你按记号的样子去猜规律，而猜错是常态</strong>；
        第二，这位发明者本人在记号问世的第一天就摔了一跤，
        所以你今天觉得这些法则"不那么显然"，完全正常。
      </p>
      <p>
        九年后的 1684 年 10 月，莱布尼茨在《教师学报》上发表了微积分史上
        <strong>第一篇公开出版物</strong>，标题长得吓人：《一种求极大值、极小值与切线的新方法，
        它也适用于分式与无理量，以及这种方法的奇妙类型的计算》。正文只有
        <strong>六页</strong>，通篇就是本讲这几条法则——
        标题里"适用于分式与无理量"说的正是商法则和根式（链式法则）。
        证明？一行也没有。他要的是先把这台机器交到人们手上。
      </p>
    </div>

    <h2><span class="sec-no">贰</span>破局：导数是"放大倍数"，套娃就是放大两次</h2>
    <p>
      要造规则，先换一种看导数的眼光。<router-link to="/calculus/derivative">上一讲</router-link>末尾
      推过一条式子，这里把它原地请回来（它是本讲全部内容的发动机）：
    </p>
    <MathBlock tex="f(a+h) = f(a) + f'(a)\,h + o(h)" />
    <p>
      读法：<strong>在 a 附近，函数干的事就是"把输入的增量 h 乘上 f′(a)"</strong>，
      剩下那点误差 <MathInline tex="o(h)" /> 比 h 本身还小一个数量级（这是"可导"这个假设买到的东西，
      不是随便什么函数都有）。
    </p>
    <div class="insight">
      <div class="insight-title">💡 把函数想成一台"放大镜"</div>
      <p>
        别再盯着整条曲线看了，只看一个点附近极小的一段。函数把
        <strong>输入轴上长为 <MathInline tex="h" /> 的一小段</strong>，
        映成<strong>输出轴上长约 <MathInline tex="f'(a)\,h" /> 的一小段</strong>。
        于是 <MathInline tex="f'(a)" /> 就是这台放大镜在 a 点的<strong>放大倍数</strong>：
      </p>
      <ul>
        <li>倍数 3，输入动 0.01，输出就动约 0.03；</li>
        <li>倍数 0.2，输入动 0.01，输出只动约 0.002（其实是"缩小镜"）；</li>
        <li>
          倍数为<strong>负</strong>，比如 −3：输入往右动，输出<strong>往左</strong>动，
          幅度是 3 倍。负号管方向，绝对值管倍数。
        </li>
      </ul>
      <p>
        这不是比喻，是上面那条式子的字面意思。而一旦这么看，
        <strong>套娃函数的答案几乎是自明的</strong>。
      </p>
    </div>
    <p>
      考虑 <MathInline tex="y = f(g(x))" />：先用 g 加工 x 得到 u，再用 f 加工 u 得到 y。
      这就是<strong>两台放大镜串起来</strong>——第一台把 <MathInline tex="\Delta x" /> 放大成
      <MathInline tex="\Delta u \approx g'(x)\,\Delta x" />，
      第二台再把 <MathInline tex="\Delta u" /> 放大成
      <MathInline tex="\Delta y \approx f'(u)\,\Delta u" />。串起来：
    </p>
    <MathBlock tex="\Delta y \;\approx\; f'(u)\cdot g'(x)\cdot \Delta x \qquad\Longrightarrow\qquad \frac{\Delta y}{\Delta x} \;\approx\; f'(u)\cdot g'(x)" />
    <p>
      <strong>总放大倍数 = 两级倍数相乘。</strong>这就是链式法则。
      拿望远镜打比方：两片镜片各放大 3 倍和 5 倍，串起来是 15 倍——没人会去猜是 8 倍。
    </p>
    <p>
      更妙的是，<strong>如果不取极限、只看有限的一小步，这件事根本不需要"约等于"</strong>。
      只要 <MathInline tex="\Delta u \neq 0" />，下面这个式子是<strong>不折不扣的恒等式</strong>，
      因为中间那个 <MathInline tex="\Delta u" /> 是同一个数，真的约得掉：
    </p>
    <MathBlock tex="\frac{\Delta y}{\Delta x} = \frac{\Delta y}{\Delta u}\cdot\frac{\Delta u}{\Delta x}" />
    <p>
      所以链式法则的"内容"在有限差商这一层<strong>白给</strong>，
      全部的技术难度都在最后一步——取极限，而且还有个坑（叁节会亲手撞一次，肆节补上）。
    </p>
    <h3>乘积法则：莱布尼茨那天错在哪</h3>
    <p>
      回到 1675 年 11 月 11 日那个错猜。设 <MathInline tex="P = u\,v" />，
      两个因子各自随 x 变化。想知道 P 变多快，就看 x 动了一点点之后 P 变了多少。
      <strong>把 P 画成一个矩形</strong>：长 u、宽 v，面积就是 P。
      现在长增加 <MathInline tex="\Delta u" />、宽增加 <MathInline tex="\Delta v" />，
      新增的面积由三块拼成：
    </p>
    <MathBlock tex="\Delta P = \underbrace{v\,\Delta u}_{\text{右边一条}} + \underbrace{u\,\Delta v}_{\text{上边一条}} + \underbrace{\Delta u\,\Delta v}_{\text{右上角小方块}}" />
    <p>
      莱布尼茨那句错猜 <MathInline tex="\mathrm{d}(uv) = \mathrm{d}u\,\mathrm{d}v" />，
      正是<strong>只要了那个右上角的小方块，把两条长边全扔了</strong>——
      而那两条长边才是增量的主体。除以 <MathInline tex="\Delta x" /> 看看：
    </p>
    <MathBlock tex="\frac{\Delta P}{\Delta x} = v\,\frac{\Delta u}{\Delta x} + u\,\frac{\Delta v}{\Delta x} + \Delta u\,\frac{\Delta v}{\Delta x}" />
    <p>
      前两项各自趋于 <MathInline tex="v\,u'" /> 与 <MathInline tex="u\,v'" />；
      第三项里 <MathInline tex="\Delta v/\Delta x" /> 趋于 <MathInline tex="v'" />（有限的数），
      而 <MathInline tex="\Delta u" /> 自己趋于 0（u 可导必连续），
      所以整项<strong>趋于 0</strong>——那个小方块确实小到可以不要，
      但它小的是"<strong>相对于 <MathInline tex="\Delta x" /> 而言</strong>"，
      不是小到能代表整个增量。于是
    </p>
    <MathBlock tex="(uv)' = u'v + uv'" />
    <p>
      检验一下：取 <MathInline tex="u = v = x" />，则 <MathInline tex="P = x^2" />。
      公式给 <MathInline tex="1\cdot x + x\cdot 1 = 2x" />，对；
      而莱布尼茨的错猜会给 <MathInline tex="1 \cdot 1 = 1" />，错得离谱。
      <strong>一个例子就能毙掉一个猜想，这是最便宜的自查手段。</strong>
    </p>
    <QuizBox
      quiz-id="chain-rule-q1"
      question="链式法则说「两级放大倍数相乘」。那么 $y=\sin(x^2)$ 在 $x=0$ 处的导数是多少？"
      hint="两级分别是「先平方」和「再取正弦」。先想想 x=0 处「平方」这台放大镜的倍数是几。"
      :options="[
        { t: '0，因为里层 $u=x^2$ 在 $x=0$ 处的放大倍数 $2x$ 恰好是 0，串联总倍数就是 0', why: '对。第一台镜子把增量压成了零（$x=0$ 是抛物线的底，左右都往上走，一阶完全不动），后面那台再怎么放大也是零。链式法则的价值正在于：只要有一级为零，整条链就断了。' },
        { t: '1，因为 $\\cos(x^2)$ 在 $x=0$ 处等于 $\\cos 0 = 1$', why: '你只用了外层那台镜子，把里层漏了——这是链式法则最经典的一种漏项。正确答案是两级相乘 $2x\\cos(x^2)$，在 $x=0$ 处第一级是 0。' },
        { t: '不存在，因为 $x=0$ 处曲线是平的，切线定不下来', why: '「平」恰恰意味着导数存在且等于 0，不是不存在。定不下切线的是尖点（如 $|x|$ 在 0 处，左右差商奔向不同的数），而 $\\sin(x^2)$ 在 0 附近光滑得很。' },
        { t: '2，因为里层导数 $2x$ 的系数是 2', why: '你把系数 2 当成了导数值。$2x$ 是一个随 x 变的函数，在 $x=0$ 处它的值是 0 而不是 2；放大倍数要在<b>那一点</b>上取值。' },
      ]"
      :answer="0"
    />

    <h2><span class="sec-no">叁</span>亲手看两次放大</h2>
    <p>
      "倍数相乘"值不值得信，自己拖一次最清楚。下面这个动画把
      <MathInline tex="x" />、<MathInline tex="u" />、<MathInline tex="y" /> 三条轴
      各做成一把<strong>局部放大镜</strong>，而且<strong>三把尺子的刻度完全相同</strong>——
      所以三根彩条的长短可以直接比，第二根比第一根长几倍，就是第一级放大倍数。
    </p>
    <p>
      动画下方的说明里有三个"照着做一遍"，其中第三个会带你<strong>亲手撞上</strong>
      本讲唯一的技术难点（<MathInline tex="\Delta u = 0" /> 时，中间那个比值除以了零），
      肆节的折叠框专门补这个洞。
    </p>
    <ChainRuleDemo />

    <h2><span class="sec-no">肆</span>严格定义：四条法则</h2>
    <div class="definition">
      <div class="def-title">📐 求导法则</div>
      <p>设 u = u(x)、v = v(x) 在 x 处可导，c 是常数。则：</p>
      <MathBlock tex="\begin{aligned} &\text{(1) 线性：} && (c\,u \pm v)' = c\,u' \pm v' \\[2pt] &\text{(2) 乘积：} && (uv)' = u'v + uv' \\[2pt] &\text{(3) 商：} && \Bigl(\frac{u}{v}\Bigr)' = \frac{u'v - uv'}{v^2} \quad (v \neq 0) \\[2pt] &\text{(4) 链式：} && \bigl(f(g(x))\bigr)' = f'\bigl(g(x)\bigr)\cdot g'(x) \end{aligned}" />
      <p>
        第 (4) 条要求 g 在 x 处可导、f 在 <MathInline tex="g(x)" /> 处可导。
      </p>
    </div>
    <p>
      第 (4) 条的写法值得逐字拆，因为<strong>初学者的错几乎全出在这一行的两个位置</strong>：
    </p>
    <ul>
      <li>
        <strong><MathInline tex="f'" /> 是在 <MathInline tex="g(x)" /> 处取值，不是在 x 处。</strong>
        算 <MathInline tex="\sin(x^2)" /> 时，外层导数是 <MathInline tex="\cos" />，
        它要吃的是<em>里层的输出</em> <MathInline tex="x^2" />，所以写
        <MathInline tex="\cos(x^2)" /> 而不是 <MathInline tex="\cos x" />。
        用放大镜的话说：<strong>第二台镜子架在 u 轴上，它的倍数当然要在 u 的那个位置上量。</strong>
      </li>
      <li>
        <strong>后面那个 <MathInline tex="g'(x)" /> 不能忘。</strong>
        它就是第一级倍数。忘了它，等于假定第一台镜子的倍数永远是 1
        ——只有 <MathInline tex="g(x) = x + c" /> 这种"原样传递"的函数才是。
        所以 <MathInline tex="(\sin x^2)' = 2x\cos(x^2)" />，不是 <MathInline tex="\cos(x^2)" />。
      </li>
    </ul>
    <p>
      莱布尼茨记号把这两件事一次说清：
      <MathInline tex="\frac{\mathrm{d}y}{\mathrm{d}x} = \frac{\mathrm{d}y}{\mathrm{d}u}\cdot\frac{\mathrm{d}u}{\mathrm{d}x}" />
      ——<MathInline tex="\mathrm{d}y/\mathrm{d}u" /> 这个写法自带"在 u 那一层量"的提示，
      而两个因子摆在那儿，你也漏不掉第二个。<strong>这就是记号的生产力。</strong>
      但请记住上一讲的警告：这不是真的约分，
      <MathInline tex="\mathrm{d}u" /> 不是一个数——下面的证明会看到，
      "约掉 <MathInline tex="\Delta u" />"这一步恰恰是全证明<em>唯一</em>会出事的地方。
    </p>
    <RevealBox title="🔍 链式法则的严格证明：补上那个「除以零」的洞" label="对答案 / 看完整拆解">
      <template #hint>
        先自己想：贰节那个恒等式
        <MathInline tex="\frac{\Delta y}{\Delta x}=\frac{\Delta y}{\Delta u}\cdot\frac{\Delta u}{\Delta x}" />
        只在 <MathInline tex="\Delta u \neq 0" /> 时成立。可 h 再小，也<strong>不能保证</strong>
        <MathInline tex="\Delta u \neq 0" />（demo 里你已经撞见过）。
        想一想：能不能造一个函数，把"除以 <MathInline tex="\Delta u" />"这个动作
        <strong>改写成乘法</strong>，从而根本不需要除？
      </template>
      <p>
        <strong>第一步：把漏洞摆明。</strong>记 <MathInline tex="u_0 = g(x_0)" />、
        <MathInline tex="\Delta u = g(x_0+h) - u_0" />。天真的证明是
      </p>
      <MathBlock tex="\frac{f(g(x_0+h)) - f(g(x_0))}{h} = \frac{f(u_0+\Delta u) - f(u_0)}{\Delta u}\cdot\frac{\Delta u}{h}" />
      <p>
        再让 h → 0。问题在于：<MathInline tex="\Delta u" /> 完全可能<strong>正好等于 0</strong>，
        这时右边第一个分式没有意义。而且这种情形<strong>要多少有多少</strong>——
        demo 里取 <MathInline tex="g(x)=x^2" />、<MathInline tex="x_0=-0.05" />、
        <MathInline tex="h=0.1" /> 就撞上了；更极端地，若 g 是常值函数，
        那么<em>每一个</em> h 都让 <MathInline tex="\Delta u = 0" />。
      </p>
      <p>
        <strong>第二步：把除法改写成乘法。</strong>关键的一招：
        专门造一个函数 <MathInline tex="\varphi" />，让它在 0 处也有定义——
      </p>
      <MathBlock tex="\varphi(t) = \begin{cases} \dfrac{f(u_0+t) - f(u_0)}{t}, & t \neq 0 \\[8pt] f'(u_0), & t = 0 \end{cases}" />
      <p>
        它就是"f 在 <MathInline tex="u_0" /> 处的差商"，只不过在 t = 0 这个空洞上
        <strong>按连续性把值补了进去</strong>——补的正是导数
        <MathInline tex="f'(u_0)" />，而"f 在 <MathInline tex="u_0" /> 可导"这句话，
        字面意思就是 <MathInline tex="t\to 0" /> 时差商趋于 <MathInline tex="f'(u_0)" />。
        所以 <strong><MathInline tex="\varphi" /> 在 t = 0 处连续</strong>，这是它唯一的用处。
      </p>
      <p>
        <strong>第三步：一个对所有 t 都成立的等式。</strong>把 <MathInline tex="\varphi" />
        的定义两边乘以 t：
      </p>
      <MathBlock tex="f(u_0+t) - f(u_0) = \varphi(t)\cdot t \qquad \text{（对一切 } t \text{ 成立，包括 } t = 0\text{）}" />
      <p>
        <MathInline tex="t \neq 0" /> 时这是把分母乘回去；<MathInline tex="t = 0" /> 时
        两边都是 0，也对。<strong>除法消失了，洞就此堵上。</strong>
      </p>
      <p>
        <strong>第四步：代入并取极限。</strong>令 <MathInline tex="t = \Delta u" />：
      </p>
      <MathBlock tex="\frac{f(g(x_0+h)) - f(g(x_0))}{h} = \varphi(\Delta u)\cdot\frac{\Delta u}{h}" />
      <p>
        右边两个因子分别看：<MathInline tex="\Delta u/h" /> 按定义趋于
        <MathInline tex="g'(x_0)" />；至于 <MathInline tex="\varphi(\Delta u)" />，
        因为 g 可导必连续，h → 0 时 <MathInline tex="\Delta u \to 0" />，
        而 <MathInline tex="\varphi" /> 在 0 处<em>连续</em>（第二步就是为这一句准备的），
        所以 <MathInline tex="\varphi(\Delta u) \to \varphi(0) = f'(u_0)" />。两者相乘：
      </p>
      <MathBlock tex="\bigl(f(g(x))\bigr)'\big|_{x_0} = f'\bigl(g(x_0)\bigr)\cdot g'(x_0)" />
      <p>
        <strong>回味：这个证明和天真版本的差别只有一处</strong>——
        天真版本在 <MathInline tex="\Delta u = 0" /> 时把"<MathInline tex="\Delta y/\Delta u" />"
        写了出来（非法），而这里写的是 <MathInline tex="\varphi(\Delta u)" />，
        它在那一刻取值 <MathInline tex="f'(u_0)" />，完全合法。
        <strong>同一个式子，一个除、一个乘，天壤之别。</strong>
        顺带一提：这一招（把差商补成连续函数）在
        <router-link to="/calculus/taylor">泰勒展开</router-link>、
        多元微积分的链式法则里会反复出现，值得记住。
      </p>
    </RevealBox>
    <p>
      有了四条法则，壹节那几个"算不动"的例子现在是<strong>一眼就写出来的事</strong>：
    </p>
    <MathBlock tex="\begin{aligned} \bigl(\sin x^2\bigr)' &= \cos(x^2)\cdot 2x \\ \bigl(e^{-x^2/2}\bigr)' &= e^{-x^2/2}\cdot(-x) \\ \bigl(\sqrt{1+x^2}\bigr)' &= \frac{1}{2\sqrt{1+x^2}}\cdot 2x = \frac{x}{\sqrt{1+x^2}} \\ \bigl((1+x)^{100}\bigr)' &= 100(1+x)^{99}\cdot 1 \end{aligned}" />
    <p>
      最后那个尤其解气：<strong>101 项的二项式展开被一行取代了。</strong>
      顺便看第二条——<MathInline tex="e^{-x^2/2}" /> 的导数在
      <MathInline tex="x=0" /> 处等于 0（钟形曲线的顶），在 <MathInline tex="x>0" /> 处为负
      （往右下降）：钟形的对称与单峰，从这一行里直接读得出来。
    </p>
    <QuizBox
      quiz-id="chain-rule-q2"
      question="上面折叠框里为什么要费劲造一个分段函数 $\varphi$？直接说「$\Delta u \to 0$ 时 $\Delta y/\Delta u \to f'(u_0)$」不行吗？"
      hint="想想 demo 第三个「照着做一遍」：那时中间那把尺子上的横条缩没了，读数区显示什么？"
      :options="[
        { t: '不行：$\\Delta u$ 可能恰好等于 0，那一刻 $\\Delta y/\\Delta u$ 根本不存在，「趋于」无从谈起', why: '对。而且这不是罕见的病态情形——$g(x)=x^2$ 在 0 附近、任何常值函数，都让 $\\Delta u=0$ 出现无穷多次。$\\varphi$ 的作用就是把「除以 $\\Delta u$」换成「乘以 $\\varphi(\\Delta u)$」，除法一消失，洞就没了。' },
        { t: '不行：因为 $\\Delta u \\to 0$ 的速度可能比 h 慢，极限会算错', why: '快慢不影响这里的结论——$\\Delta u/h$ 自己会收敛到 $g^{\\prime}(x_0)$，无论 $\\Delta u$ 趋于 0 有多快。真正的毛病不是「慢」，是「可能精确等于 0」，那时式子直接非法。' },
        { t: '可以，$\\varphi$ 只是把同一件事写得更漂亮，属于形式上的严谨', why: '不是形式问题。天真写法在 $\\Delta u = 0$ 的那些 h 上<b>没有定义</b>，等式左边却好端端存在——两边定义域都不一样，谈不上「同一件事」。' },
        { t: '不行：$f$ 在 $u_0$ 处可能不可导', why: '可导是链式法则的前提，已经假设了。$\\varphi$ 要对付的不是 f 不可导，恰恰相反——它用的正是「f 在 $u_0$ 可导」这个假设，把差商在 0 处补成连续。' },
      ]"
      :answer="0"
    />

    <h2><span class="sec-no">伍</span>买到了什么：链式法则在替今天的世界算什么</h2>

    <h3>你手机里的每一次「学习」，都是链式法则在连乘</h3>
    <p>
      <strong>画面。</strong>神经网络听着玄，骨架却简单得像一串管道：
      数据从左边灌进去，经过一层、又一层，每层做一次"乘上权重，再过一个非线性函数"，
      最后从右边吐出一个预测值。训练，就是不停地问一句话：
      <strong>如果我把第一层里的某个权重稍微调大一点点，最后的误差会变大还是变小、变多少？</strong>
    </p>
    <p>
      <strong>为什么非得绕道链式法则。</strong>因为那个权重和最终误差之间隔着好几层——
      它是彻头彻尾的<strong>套娃函数</strong>。改动 <MathInline tex="w_1" /> 会改变第一层的输出，
      第一层输出的改变会改变第二层的输入……一路传到误差。这正是
      "<MathInline tex="f(g(h(\cdots)))" />"的形状，而链式法则是唯一系统的算法。
    </p>
    <p>
      <strong>推导：把最小的一个网络算到底。</strong>取一个只有两层、每层一个数的迷你网络。
      输入 <MathInline tex="x = 2" />（比如标准化后的房屋面积），目标值
      <MathInline tex="y = 2" />：
    </p>
    <MathBlock tex="a = w_1 x \;\to\; z = \sigma(a) \;\to\; \hat{y} = w_2 z \;\to\; L = \tfrac{1}{2}(\hat{y}-y)^2" />
    <p>
      其中 <MathInline tex="\sigma(a) = 1/(1+e^{-a})" /> 是把任何数压进 (0,1) 的
      "S 形函数"（sigmoid），它的导数有个漂亮的形式
      <MathInline tex="\sigma' = \sigma(1-\sigma)" />；
      <MathInline tex="L" /> 是<strong>损失</strong>，即"预测差了多少"的平方的一半
      （加个 <MathInline tex="\tfrac12" /> 纯粹是为了求导时把 2 消掉）。
      取初始权重 <MathInline tex="w_1 = 0.5" />、<MathInline tex="w_2 = 1.5" />，正着算一遍：
    </p>
    <MathBlock tex="a = 1,\quad z = \sigma(1) = 0.731059,\quad \hat{y} = 1.096588,\quad L = \tfrac12(-0.903412)^2 = 0.408077" />
    <p>
      现在问：<MathInline tex="L" /> 对 <MathInline tex="w_1" /> 的导数是多少？
      链式法则说，把沿途<strong>每一级的放大倍数乘起来</strong>就行：
    </p>
    <MathBlock tex="\frac{\partial L}{\partial w_1} = \underbrace{(\hat{y}-y)}_{\partial L/\partial \hat{y}} \cdot \underbrace{w_2}_{\partial \hat{y}/\partial z} \cdot \underbrace{z(1-z)}_{\partial z/\partial a} \cdot \underbrace{x}_{\partial a/\partial w_1}" />
    <p>
      代数：<MathInline tex="(-0.903412)\times 1.5 \times 0.196612 \times 2 = -0.532865" />。
      （四个数依次是：预测偏低了 0.903，第二层权重 1.5，S 形函数在这里的斜率 0.197，输入 2。）
    </p>
    <p>
      <strong>读出物理。</strong>负号说：<MathInline tex="w_1" /> 调大，损失会<em>下降</em>。
      那就往那个方向挪一小步——取步长 0.1，
      <MathInline tex="w_1 \leftarrow 0.5 + 0.1\times 0.532865 = 0.553286" />。
      重算一遍：<MathInline tex="a = 1.106573" />、<MathInline tex="z = 0.751490" />、
      <MathInline tex="\hat{y} = 1.127234" />、
      <MathInline tex="L = 0.380860" />——<strong>从 0.408077 掉到了 0.380860，真的降了。</strong>
      把这套动作在几百万个权重、几十亿条数据上重复上亿次，就是"训练一个大模型"的全部内容。
      名字叫<strong>反向传播</strong>：所谓"反向"，就是这条乘积链从最外层的
      <MathInline tex="(\hat y - y)" /> 起，一层层往里乘回去。
    </p>
    <p>
      <strong>条件不成立会怎样：两种真实的翻车。</strong>
    </p>
    <ul>
      <li>
        <strong>梯度消失。</strong>注意那个因子 <MathInline tex="z(1-z)" />：
        无论 z 取多少，它<strong>最大也只有 0.25</strong>（z = 0.5 时取到）。
        层数一多，这些小于 1 的因子连乘——10 层就是
        <MathInline tex="0.25^{10} \approx 9.54\times 10^{-7}" />，
        20 层是 <MathInline tex="9.09\times 10^{-13}" />。传到最前面几层时梯度已经小到
        <strong>浮点数都快存不下</strong>（<router-link to="/numerical/float-error">数值分析第 1 讲</router-link>
        讲过这种量级会发生什么），那几层就基本不学习了。深度网络卡了二十多年，
        这是主因之一；今天普遍改用 ReLU（<MathInline tex="\max(0,a)" />）正是因为它在正半轴的
        导数恒为 1，连乘不衰减。
      </li>
      <li>
        <strong>ReLU 在 0 处不可导。</strong><MathInline tex="\max(0,a)" /> 的图象在原点是个
        <strong>尖点</strong>——和<router-link to="/calculus/derivative">上一讲</router-link>里
        <MathInline tex="|x|" /> 在 0 处的情形一模一样，左右差商奔向不同的数，
        链式法则的前提当场失效。工程上的做法很诚实：在那一点<strong>人为规定</strong>
        导数取 0（或 1），反正随机初始化下恰好落在 0 的概率几乎为零。
        <strong>这不是数学，是绕开数学——知道自己在绕开什么，才是会用工具的样子。</strong>
      </li>
    </ul>

    <h3>梯子滑下来的时候，顶端比底端跑得快</h3>
    <p>
      再看一件用得着、也算得动的小事。一架 5 米长的梯子靠着墙，底端被人不小心往外拖，
      速度是 0.6 m/s。问：<strong>当底端离墙 3 米时，梯子顶端沿墙下滑有多快？</strong>
    </p>
    <p>
      设底端离墙 <MathInline tex="x" />、顶端离地 <MathInline tex="y" />，勾股定理给出一条
      <strong>时时刻刻都成立</strong>的关系：<MathInline tex="x^2 + y^2 = 25" />。
      要害在于 x 和 y <em>都是时间的函数</em>，所以整个式子可以<strong>对时间求导</strong>——
      左边两项各用一次链式法则（外层是平方，里层是"x 随时间变"）：
    </p>
    <MathBlock tex="2x\,\frac{\mathrm{d}x}{\mathrm{d}t} + 2y\,\frac{\mathrm{d}y}{\mathrm{d}t} = 0 \qquad\Longrightarrow\qquad \frac{\mathrm{d}y}{\mathrm{d}t} = -\frac{x}{y}\cdot\frac{\mathrm{d}x}{\mathrm{d}t}" />
    <p>
      x = 3 时 y = 4（3-4-5 直角三角形），代入得
      <MathInline tex="\mathrm{d}y/\mathrm{d}t = -\tfrac{3}{4}\times 0.6 = -0.45" /> m/s：
      顶端以 0.45 m/s 下滑，<strong>比底端慢</strong>。可再往后看——x = 4.8、y = 1.4 时，
      顶端速度是 <MathInline tex="-\tfrac{4.8}{1.4}\times 0.6 = -2.057" /> m/s，
      已经是底端的三倍多；<strong>而 y → 0 时这个速度趋于无穷大</strong>。
      当然真实梯子会在此之前脱离墙面自由下落——
      <strong>公式失效的地方，恰恰是物理假设（顶端始终贴墙）先失效的地方</strong>。
      这类"一个变量的变化率推另一个变量的变化率"的问题叫<strong>相关变化率</strong>，
      是链式法则最日常的用法：气球充气时半径涨多快、雷达测出的接近速度换算成真实航速，
      全是同一招。
    </p>
    <div class="insight">
      <div class="insight-title">🔗 这套法则往后通到哪：站内连一连</div>
      <p>
        <strong>下一讲</strong>用它做<router-link to="/calculus/extremum">极值与最优化</router-link>：
        法则一旦齐备，"令导数为零"才真的成了可执行的解题步骤；
        <strong>积分</strong>：本课后面那讲<strong>换元与分部积分</strong>，
        就是把链式法则和乘积法则<strong>倒过来读</strong>——本讲每多一条求导法则，
        那里就多一种积分技巧；
        <strong>数值分析</strong>：<router-link to="/numerical/root-finding">牛顿法</router-link>
        每步都要算 <MathInline tex="f'" />，而复杂函数的 <MathInline tex="f'" /> 正是靠这套法则写出来的；
        <strong>数理方程</strong>：<router-link to="/mathphys/wave">波动方程</router-link>那个
        达朗贝尔换元，整段推导就是二元版的链式法则；
        <strong>线性代数</strong>：多元函数的链式法则长成<router-link to="/linear-algebra/linear-map">矩阵乘法</router-link>
        （雅可比矩阵相乘）——"倍数相乘"升级成"变换复合"，而
        <router-link to="/linear-algebra/linear-map">矩阵乘法为什么是行乘列</router-link>那一讲说的正是这件事。
      </p>
    </div>
    <div class="story">
      <div class="story-title">📜 1712 — 1812 年 · 一场记号之争，让英国数学落后了一百年</div>
      <p>
        本讲反复夸莱布尼茨的记号好用，这在历史上是有代价的。1699 年起，
        牛顿的支持者公开指控莱布尼茨剽窃；1712 年英国皇家学会成立"中立委员会"裁决，
        报告《书信通鉴》判牛顿胜——<strong>而报告是牛顿本人匿名起草的</strong>
        （他当时正是皇家学会主席）。1716 年莱布尼茨在冷落中去世，争论仍未平息。
      </p>
      <p>
        今天的共识是<strong>两人各自独立发明</strong>：牛顿更早（1665—66 的"奇迹年"），
        莱布尼茨更早发表（1684）且记号更好。但当年的英国数学界出于民族感情，
        坚持只用牛顿的点记号 <MathInline tex="\dot{x}" />，拒绝
        <MathInline tex="\mathrm{d}y/\mathrm{d}x" />。点记号写"对时间的导数"很顺手，
        可一旦要表达"y 对 u、u 对 x"这种<strong>分层</strong>关系就笨拙不堪——
        链式法则在那套记号里根本看不出形状。结果是整整一个世纪里，
        欧拉、拉格朗日、拉普拉斯在欧陆把分析学推向纵深，英国却在原地打转。
      </p>
      <p>
        1812 年，剑桥的几个年轻人（其中就有后来设计计算机的<strong>巴贝奇</strong>）
        成立"分析学会"，公开宣称要推行"<strong>纯粹的 d 主义，对抗这所大学的点时代</strong>"
        ——原文 <em>the principles of pure D-ism in opposition to the Dot-age of the University</em>，
        一句双关骂了两代人（dotage 意为"老糊涂"）。他们赢了，英国数学也从此重新接上世界。
        <strong>记号不是装饰。</strong>本讲那句
        <MathInline tex="\frac{\mathrm{d}y}{\mathrm{d}x} = \frac{\mathrm{d}y}{\mathrm{d}u}\cdot\frac{\mathrm{d}u}{\mathrm{d}x}" />
        之所以看一眼就记得住，是有人替我们付过学费的。
      </p>
    </div>
    <QuizBox
      quiz-id="chain-rule-q3"
      question="反向传播里那个「梯度消失」，用本讲的语言说，本质是什么？"
      hint="每一层贡献一个放大倍数，整条链是它们的乘积。倍数普遍小于 1 会怎样？"
      :options="[
        { t: '一串小于 1 的放大倍数连乘，指数级衰减——$0.25^{10}$ 已不到百万分之一', why: '对。链式法则是乘法，而乘法对「普遍小于 1」这件事极其敏感：加法里一百个 0.25 是 25，乘法里是 $10^{-60}$。ReLU 之所以有效，正是把正半轴的倍数钉在 1 上，连乘不再衰减。' },
        { t: '层数太多，累计的舍入误差把梯度淹没了', why: '舍入误差确实存在，但不是主因：即使用无穷精度算，$0.25^{10}$ 也还是那么小。这里衰减的是<b>数学上的真值</b>，不是它的浮点表示。' },
        { t: '因为损失函数太小了，求导之后更小', why: '损失的大小和梯度的大小是两回事——损失很大时梯度照样可以极小（预测差得远，但每层斜率都接近 0）。衰减来自链上的因子，不是来自损失的数值。' },
      ]"
      :answer="0"
    />
  </ConceptPage>
</template>
