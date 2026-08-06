<script setup>
import ConceptPage from '../../components/ConceptPage.vue'
import MathBlock from '../../components/MathBlock.vue'
import MathInline from '../../components/MathInline.vue'
import RevealBox from '../../components/RevealBox.vue'
import QuadratureDemo from '../../demos/QuadratureDemo.vue'
</script>

<template>
  <ConceptPage slug="quadrature">
    <h2><span class="sec-no">壹</span>困境：统计表上那个 0.9750，到底是谁算出来的</h2>
    <p>
      翻开任何一本概率论课本的最后几页，都有一张标准正态分布表。表里有一行你一定见过：
      <MathInline tex="z=1.96" /> 处的值是 <strong>0.9750</strong>。所有"95% 置信区间"、
      所有民调新闻末尾那句"抽样误差 ±3 个百分点"，用的都是这个数。
    </p>
    <p>
      先把这个数是什么说清楚。<MathInline tex="\Phi(z)" /> 是标准正态分布的<strong>累积分布函数</strong>，
      定义为钟形曲线从最左端到 <MathInline tex="z" /> 之间的面积：
    </p>
    <MathBlock tex="\Phi(z)=\int_{-\infty}^{z}\frac{1}{\sqrt{2\pi}}e^{-t^2/2}\,\mathrm{d}t" />
    <p>
      钟形曲线关于 <MathInline tex="t=0" /> 对称、总面积为 1，所以左半边正好是 <MathInline tex="0.5" />，
      于是 <MathInline tex="\Phi(1.96)=0.5+\int_0^{1.96}\varphi(t)\,\mathrm{d}t" />，
      其中 <MathInline tex="\varphi(t)=e^{-t^2/2}/\sqrt{2\pi}" />。
      问题就落在那个积分上——<strong>它算不出来</strong>。
    </p>
    <p>
      注意这句"算不出来"的分量。不是"暂时没人找到"，而是 1835 年<strong>刘维尔</strong>证明了：
      <MathInline tex="e^{-t^2}" /> 的原函数<strong>不可能</strong>写成初等函数（多项式、指数、对数、三角函数的有限次组合）。
      同样被判了死刑的还有 <MathInline tex="\dfrac{\sin x}{x}" />、<MathInline tex="\sqrt{1-k^2\sin^2\theta}" />（椭圆积分，
      算单摆大幅摆动的周期就撞上它）、<MathInline tex="\dfrac{1}{\ln x}" />（数素数用的对数积分）……
      比比皆是。这意味着<router-link to="/calculus/ftc">微积分基本定理</router-link>那套无往不利的招数——
      "先找原函数 <MathInline tex="F" />，再代端点作差 <MathInline tex="F(b)-F(a)" />"——在这里<strong>整个失效</strong>。
    </p>
    <p>
      可 0.9750 就白纸黑字印在表上，工程和科学天天在用。既然找不到 <MathInline tex="F" />，那它是怎么被算出来的？
    </p>
    <div class="story">
      <div class="story-title">📜 退回积分最原始的含义：面积</div>
      <p>
        出路藏在积分的<router-link to="/calculus/integral">出生地</router-link>里。基本定理是<strong>后来</strong>才发现的捷径，
        积分本身的定义从头到尾只有一句话：<strong>曲线下方的面积</strong>，是黎曼和的极限。
        而面积压根不需要原函数——只需要把曲边图形<strong>拆成一堆算得出面积的简单形状</strong>再加起来。
      </p>
      <p>
        最朴素的做法：把区间切成 <MathInline tex="N" /> 条竖直细条，每条近似成矩形，高取小区间中点处的函数值
        （<strong>中点矩形法</strong>）。这一定出得了数。于是问题从"能不能算"变成了
        <strong>"要多细才够准"</strong>——而这一问，正是整门"求积公式"（quadrature，这个词的字面意思是"化成正方形"，
        古希腊人化圆为方的那个梦）要回答的。
      </p>
    </div>

    <h2><span class="sec-no">贰</span>破局：别把细条切得更多，把每条的"顶"凑得更聪明</h2>
    <p>
      先看笨路。中点矩形每块的顶是<strong>平的</strong>，直觉上很粗糙。把 <MathInline tex="N" /> 加大一倍，
      细条窄一半，误差降到多少？实测（动画里"三次多项式"那一档，比值稳稳停在 4.00）：
      <strong>降到 1/4</strong>。误差按步长 <MathInline tex="h^2" /> 走。
    </p>
    <p>
      这条路不是不能走，只是不划算：想再多要三位有效数字，得把块数乘以 30 多倍。
      要提速，得换个思路——<strong>不是把块切得更细，而是让每一块的"顶"更贴合曲线</strong>。
      顶从平线换成斜直线，就是<strong>梯形法</strong>。
    </p>
    <p>
      可梯形法一算，误差还是 <MathInline tex="h^2" />，甚至比中点矩形<em>更大</em>（同样 <MathInline tex="N=8" />，
      中点 <MathInline tex="1.4\times10^{-3}" />，梯形 <MathInline tex="2.9\times10^{-3}" />）。
      "更贴合"竟然更差？看上去这条路走死了。
    </p>
    <div class="insight">
      <div class="insight-title">💡 转折：两个失败的方法，误差正好反着来</div>
      <p>
        把两者的误差<strong>带上符号</strong>摆在一起，事情立刻不一样了。对
        <MathInline tex="\int_{-2}^{2}e^{-x^2}\mathrm{d}x" /> 实算：
      </p>
      <MathBlock tex="\begin{aligned} N=8:&\quad M-I=+1.415\times10^{-3},\quad T-I=-2.926\times10^{-3}\\ N=16:&\quad M-I=+3.746\times10^{-4},\quad T-I=-7.552\times10^{-4}\\ N=32:&\quad M-I=+9.496\times10^{-5},\quad T-I=-1.903\times10^{-4} \end{aligned}" />
      <p>
        三行里，梯形的误差都是中点误差的 <MathInline tex="-2" /> 倍（比值 <MathInline tex="-2.067,\,-2.016,\,-2.004" />，
        <MathInline tex="N" /> 越大越干净）。中点矩形<strong>系统性地低估</strong>，梯形<strong>系统性地高估</strong>，
        而且高估的量恰好是低估的两倍。
      </p>
      <p>
        既然两个误差反号，就该<strong>让它们互相抵消</strong>。按 <MathInline tex="2:1" /> 加权平均——
        <MathInline tex="S=\dfrac{2M+T}{3}" />——二阶误差项就当场归零。这不是"再猜一个更贴的形状"，
        而是<strong>拿两个粗结果做代数消去</strong>：真正被消掉的不是形状的误差，是误差的<strong>主项</strong>。
      </p>
    </div>
    <p>
      而这个 <MathInline tex="(2M+T)/3" />，展开之后就是 1743 年<strong>辛普森</strong>那条著名公式，
      也正是"每块的顶换成抛物线"的结果。两条完全不同的思路撞到了同一个式子上。
      下面这个折叠框把两件事一次做完：泰勒展开算出那个 <MathInline tex="-2" /> 是怎么来的，
      以及 <MathInline tex="(2M+T)/3" /> 为什么恰好是抛物线公式。
    </p>
    <RevealBox title="那个 −2 从哪来，以及 2:1 加权为什么就是辛普森" label="对答案">
      <template #hint>
        动笔提示：在一个小区间上把 <MathInline tex="f" /> 在<strong>中点</strong>处展开成泰勒级数
        （不是在端点！），分别算出真值 <MathInline tex="I" />、中点值 <MathInline tex="M" />、
        梯形值 <MathInline tex="T" /> 的前两项，再比一比 <MathInline tex="M-I" /> 和 <MathInline tex="T-I" />。
      </template>
      <p>
        取一个小区间 <MathInline tex="[c-\frac{h}{2},\,c+\frac{h}{2}]" />（宽 <MathInline tex="h" />，中点 <MathInline tex="c" />），
        把 <MathInline tex="f" /> 在中点展开：
      </p>
      <MathBlock tex="f(x)=f(c)+f'(c)(x-c)+\tfrac{1}{2}f''(c)(x-c)^2+\tfrac{1}{6}f'''(c)(x-c)^3+\cdots" />
      <p>
        <strong>第一步，真值。</strong>逐项积分。奇次项 <MathInline tex="(x-c)" />、<MathInline tex="(x-c)^3" />
        在对称区间上积出来是 0，只剩偶次项：
      </p>
      <MathBlock tex="I=\int f=hf(c)+\tfrac{1}{2}f''(c)\cdot\frac{h^3}{12}+O(h^5)=hf(c)+\frac{f''(c)h^3}{24}+O(h^5)" />
      <p>
        （用到 <MathInline tex="\int_{-h/2}^{h/2}u^2\,\mathrm{d}u=h^3/12" />。）
      </p>
      <p>
        <strong>第二步，中点法。</strong>它就是拿 <MathInline tex="f(c)" /> 当整块的高：
        <MathInline tex="M=hf(c)" />。直接相减：
      </p>
      <MathBlock tex="M-I=-\frac{f''(c)}{24}h^3+O(h^5)" />
      <p>
        <strong>第三步，梯形法。</strong>把两个端点值展开再取平均——奇次项在两端<strong>反号相消</strong>：
      </p>
      <MathBlock tex="\frac{f(c-\frac h2)+f(c+\frac h2)}{2}=f(c)+\tfrac{1}{2}f''(c)\cdot\frac{h^2}{4}+O(h^4)" />
      <MathBlock tex="\begin{aligned} T&=h\Big(f(c)+\frac{f''(c)h^2}{8}\Big)=hf(c)+\frac{f''(c)h^3}{8}\\ T-I&=\frac{f''(c)h^3}{8}-\frac{f''(c)h^3}{24}=+\frac{f''(c)}{12}h^3 \end{aligned}" />
      <p>
        <strong>对上了。</strong><MathInline tex="\dfrac{1/12}{-1/24}=-2" />——梯形误差正是中点误差的 <MathInline tex="-2" /> 倍，
        而且这个比值<strong>与 <MathInline tex="f" /> 是什么无关</strong>（<MathInline tex="f''(c)" /> 在上下同时出现，约掉了）。
        上面那三行实测数据不是巧合。
      </p>
      <p>
        <strong>第四步，配平。</strong>要让 <MathInline tex="h^3" /> 项消失，权重
        <MathInline tex="\alpha M+\beta T" /> 需满足 <MathInline tex="\alpha+\beta=1" />（保证常数积分对）与
        <MathInline tex="-\alpha/24+\beta/12=0" />，解得 <MathInline tex="\alpha=2/3,\ \beta=1/3" />：
      </p>
      <MathBlock tex="\begin{aligned} S&=\frac{2M+T}{3}\\ S-I&=\frac{2(M-I)+(T-I)}{3}=\frac{1}{3}\Big(-\frac{2f''h^3}{24}+\frac{f''h^3}{12}\Big)=0+O(h^5) \end{aligned}" />
      <p>
        <strong>第五步，展开看它长什么样。</strong>记区间两端为 <MathInline tex="a,b" />，中点为 <MathInline tex="c" />：
      </p>
      <MathBlock tex="\frac{2M+T}{3}=\frac{1}{3}\Big(2hf(c)+\frac{h}{2}\big(f(a)+f(b)\big)\Big)=\frac{h}{6}\big(f(a)+4f(c)+f(b)\big)" />
      <p>
        再记子区间步长 <MathInline tex="h'=h/2" />（辛普森是两个子区间配一条抛物线，所以它的 <MathInline tex="h" />
        是这里的一半），上式就是
        <MathInline tex="\frac{h'}{3}\big(f(a)+4f(c)+f(b)\big)" />——<strong>一字不差是辛普森公式</strong>，
        那个来路不明的 <MathInline tex="\tfrac13" /> 和 <MathInline tex="4" /> 到此有了出处：
        它们是"让 2 号误差吃掉 1 号误差"配出来的权重。
      </p>
      <p>
        动画里可以当场核对这个恒等式：三种方法各记下一个读数，
        <MathInline tex="(2M+T)/3" /> 会和辛普森在 <MathInline tex="2N" /> 处的读数逐位相同。
      </p>
    </RevealBox>
    <p>
      消掉了 <MathInline tex="h^3" />，下一项本该是 <MathInline tex="h^4" />。可辛普森的误差是
      <MathInline tex="O(h^5)" />（复合起来是 <MathInline tex="h^4" />）——中间<strong>白跳了一级</strong>。
      代价是：<MathInline tex="N" /> 翻倍，误差降到 <strong>1/16</strong> 而不是 1/4。
    </p>
    <div class="insight">
      <div class="insight-title">💡 白捡的那一阶：抛物线为什么对三次也精确</div>
      <p>
        抛物线只有三个自由度，按理只该对<strong>二次</strong>多项式精确。但它<strong>对三次也精确</strong>，
        白赚一档。原因在上面的推导里已经露头了：三次项 <MathInline tex="(x-c)^3" /> 关于中点<strong>反对称</strong>，
        它在真值里积出来是 0，在辛普森的加权和里也恰好被 <MathInline tex="f(a)" /> 与 <MathInline tex="f(b)" />
        的一正一负抵掉——<strong>两边同时是 0，误差自然为 0</strong>。
      </p>
      <p>
        这不是文字游戏，是可以一眼验的。在 <MathInline tex="[-1,1]" /> 上取 <MathInline tex="f(x)=x^3" />：
        辛普森给 <MathInline tex="\tfrac13(f(-1)+4f(0)+f(1))=\tfrac13(-1+0+1)=0" />，真值也是 0，
        <strong>分毫不差</strong>；换成 <MathInline tex="f(x)=x^4" />，辛普森给
        <MathInline tex="\tfrac13(1+0+1)=\tfrac23\approx0.667" />，真值是 <MathInline tex="\tfrac25=0.4" />，这才开始出错。
        所以它"恰好"精确到三次，一分不多一分不少。
      </p>
      <p>
        动画里把被积函数切到<strong>三次多项式</strong>那一档，选辛普森，然后把 <MathInline tex="N" />
        从 2 一路拖到 200——误差读数始终是 <strong>≈ 0（机器精度）</strong>。
        连 <MathInline tex="N=2" />（整个区间只铺一条抛物线）都是准的。
      </p>
    </div>
    <p>
      看懂了"消误差主项"这件事，就能顺着往下推。既然梯形误差是
      <MathInline tex="T(h)-I=ch^2+O(h^4)" />，那么把步长砍半得到的
      <MathInline tex="T(h/2)-I=ch^2/4+O(h^4)" />——两个式子、一个未知数 <MathInline tex="c" />，
      当然可以把它<strong>解掉</strong>。这就是<strong>理查森外推</strong>。
    </p>
    <RevealBox title="理查森外推：用两个粗结果，白捡高两阶" label="对答案">
      <template #hint>
        动笔提示：把 <MathInline tex="T(h)-I=ch^2" /> 和 <MathInline tex="T(h/2)-I=ch^2/4" />
        当成关于 <MathInline tex="c" /> 和 <MathInline tex="I" /> 的<strong>二元一次方程组</strong>，
        消去 <MathInline tex="c" /> 解出 <MathInline tex="I" />。解完再和辛普森公式对一眼。
      </template>
      <p>第二式乘 4 减第一式，<MathInline tex="c" /> 应声消失：</p>
      <MathBlock tex="4\big(T(\tfrac h2)-I\big)-\big(T(h)-I\big)=ch^2-ch^2=0\ \Longrightarrow\ I\approx\frac{4T(\frac h2)-T(h)}{3}" />
      <p>
        左边全是<strong>已经算出来的数</strong>，不需要多算一次函数值（<MathInline tex="T(h)" /> 的节点是
        <MathInline tex="T(h/2)" /> 节点的子集）。也就是说，这一步高两阶的精度是<strong>白拿的</strong>。
      </p>
      <p>
        更有意思的是，它和上面那条路是同一件事。实算 <MathInline tex="\int_{-2}^{2}e^{-x^2}" />：
      </p>
      <MathBlock tex="\begin{aligned} T(N{=}4)&=1.754074521,\qquad T(N{=}8)=1.761237268\\ \frac{4T(N{=}8)-T(N{=}4)}{3}&=1.76362485059 \end{aligned}" />
      <p>
        而直接用辛普森公式算 <MathInline tex="N=8" />，得到的是
        <MathInline tex="1.76362485059" />——<strong>十二位逐位相同</strong>。
        梯形法外推一次，就<em>是</em>辛普森。
      </p>
      <p>
        既然一次外推能消掉 <MathInline tex="h^2" />，那把外推的结果<strong>再外推一次</strong>去消
        <MathInline tex="h^4" />，然后消 <MathInline tex="h^6" />……这张不断加深的三角表就是
        <strong>龙贝格积分</strong>。它的第一列是梯形，第二列是辛普森，第三列往后已经没有名字了，
        但精度一列比一列高——而每一列都没有多算过一次 <MathInline tex="f" />。
      </p>
    </RevealBox>
    <p>
      到这里，"往哪儿取点"一直是固定的：均匀网格。<strong>高斯 1814 年</strong>连这个也不肯让步。
      他的问题是：如果<strong>节点位置也算待定的自由度</strong>，<MathInline tex="n" /> 个点最多能榨出多少精度？
    </p>
    <RevealBox title="两点高斯求积：两个点做到四个点的活" label="看完整拆解">
      <template #hint>
        动笔提示：在 <MathInline tex="[-1,1]" /> 上写
        <MathInline tex="\int_{-1}^{1}f\approx w_1f(x_1)+w_2f(x_2)" />，四个待定量
        <MathInline tex="w_1,w_2,x_1,x_2" />。要求它对 <MathInline tex="1,x,x^2,x^3" /> 四个函数<strong>全部精确</strong>，
        列出四个方程再解。（提示：先猜对称。）
      </template>
      <p>四个条件写出来：</p>
      <MathBlock tex="\begin{aligned} f=1:&\quad w_1+w_2=\textstyle\int_{-1}^{1}1=2\\ f=x:&\quad w_1x_1+w_2x_2=0\\ f=x^2:&\quad w_1x_1^2+w_2x_2^2=\tfrac23\\ f=x^3:&\quad w_1x_1^3+w_2x_2^3=0 \end{aligned}" />
      <p>
        非线性方程组，但被积函数和区间都关于原点对称，猜一个对称解：
        <MathInline tex="w_1=w_2=w" />，<MathInline tex="x_2=-x_1=t" />。
        第 2、4 式自动满足（一正一负相消），第 1 式给 <MathInline tex="2w=2" /> 即
        <MathInline tex="w=1" />，第 3 式给 <MathInline tex="2t^2=\tfrac23" />：
      </p>
      <MathBlock tex="t=\frac{1}{\sqrt3}\approx0.577350269,\qquad \int_{-1}^{1}f\approx f\!\left(-\tfrac{1}{\sqrt3}\right)+f\!\left(\tfrac{1}{\sqrt3}\right)" />
      <p>
        <strong>两个点、两次函数求值</strong>，就精确到三次多项式——和辛普森打平，而辛普森要三个点。
        再验一下它到此为止：<MathInline tex="f=x^4" /> 时公式给
        <MathInline tex="2\cdot\tfrac19=\tfrac29\approx0.222" />，真值 <MathInline tex="\tfrac25=0.4" />，错了。
        所以 <MathInline tex="n=2" /> 的代数精度恰好是 <MathInline tex="3=2n-1" />。
      </p>
      <p>
        一般地：<MathInline tex="n" /> 个节点带来 <MathInline tex="2n" /> 个自由度（<MathInline tex="n" /> 个位置 +
        <MathInline tex="n" /> 个权重），恰好能定死 <MathInline tex="2n" /> 个条件，
        于是代数精度 <MathInline tex="2n-1" />——<strong>把节点位置也交出去当自由度，精度就翻了一番</strong>。
        那些最优节点是<strong>勒让德多项式的根</strong>（<MathInline tex="\pm1/\sqrt3" /> 正是
        <MathInline tex="P_2(x)=\tfrac12(3x^2-1)" /> 的两个根），这也是它叫"高斯-勒让德求积"的原因。
      </p>
      <p>
        但要留神，节点不均匀是有代价的：函数值必须能<strong>按需在任意点求</strong>。
        如果你手上只有实验仪器等距采回来的一串数据，高斯节点落在采样点之间，
        这套公式就用不上了——那时候还得请回牛顿-柯特斯。
      </p>
    </RevealBox>

    <h2><span class="sec-no">叁</span>亲手切块，对比三种形状的误差数量级</h2>
    <p>
      上面几个折叠框是留给动笔核对的，先跳过也不影响下面动手。这个动画有三个旋钮
      （被积函数、形状、块数 <MathInline tex="N" />），要看的是<strong>读数区第二行</strong>：
      它拿块数减半那一档的误差来除当前误差，把"翻倍后降到 1/4 还是 1/16"直接量成一个数。
      三次多项式那一档尤其值得多待一会儿——辛普森在那里的误差恒等于 0。
    </p>
    <QuadratureDemo />

    <h2><span class="sec-no">肆</span>严格定义</h2>
    <div class="definition">
      <div class="def-title">📐 牛顿-柯特斯公式与代数精度</div>
      <p>
        把 <MathInline tex="[a,b]" /> <MathInline tex="n" /> 等分，步长 <MathInline tex="h=(b-a)/n" />，
        节点 <MathInline tex="x_i=a+ih" />，记 <MathInline tex="f_i=f(x_i)" />。
        所谓<strong>复合</strong>公式，就是"在每个小块上用低次公式，再把结果加起来"——
        注意<strong>不是</strong>"在整个大区间上用一条高次曲线"，这个区别在下一段会要命。常用两条：
      </p>
      <MathBlock tex="\text{梯形：}\ \int_a^b f \approx h\Big(\tfrac{f_0}{2}+f_1+\cdots+f_{n-1}+\tfrac{f_n}{2}\Big),\quad \text{误差}=-\tfrac{(b-a)h^2}{12}f''(\xi)" />
      <MathBlock tex="\text{辛普森：}\ \int_a^b f \approx \tfrac{h}{3}\big(f_0+4f_1+2f_2+\cdots+4f_{n-1}+f_n\big),\quad \text{误差}=-\tfrac{(b-a)h^4}{180}f^{(4)}(\xi)" />
      <p>
        两条误差式各有一处要逐词读。<MathInline tex="h^2" /> 与 <MathInline tex="h^4" /> 是<strong>阶</strong>，
        决定"加密一倍能赚多少"；而 <MathInline tex="f''(\xi)" />、<MathInline tex="f^{(4)}(\xi)" />
        是<strong>前提</strong>——公式默认这些导数<strong>存在且有界</strong>。
        <MathInline tex="\xi" /> 是区间内某个说不出具体位置的点（中值定理给的），
        所以这两条式子从来不用来算出精确误差，只用来<strong>预言阶</strong>。
        动画的 <MathInline tex="\sqrt{x+2}" /> 那一档就是前提破产的样子：
        它在左端点的导数是无穷大，<MathInline tex="f^{(4)}(\xi)" /> 无从谈起，
        于是三种方法的收敛比一起塌到 2.8 左右（阶只剩 1.5），辛普森的四阶优势<strong>完全消失</strong>。
      </p>
      <p>
        <strong>代数精度</strong>：若一个求积公式对所有次数 <MathInline tex="\le m" /> 的多项式给出<em>精确</em>结果，
        而对某个 <MathInline tex="m+1" /> 次多项式不精确，则称其代数精度为 <MathInline tex="m" />。
        在 <MathInline tex="[0,2]" /> 上把 <MathInline tex="n=2" /> 的三条公式逐项验一遍
        （<strong>粗体</strong>表示与真值不符）：
      </p>
      <div class="tbl-wrap">
        <table class="mini-tbl">
          <thead>
            <tr><th><MathInline tex="f" /></th><th>真值</th><th>梯形</th><th>中点</th><th>辛普森</th></tr>
          </thead>
          <tbody>
            <tr><td><MathInline tex="1" /></td><td>2</td><td>2</td><td>2</td><td>2</td></tr>
            <tr><td><MathInline tex="x" /></td><td>2</td><td>2</td><td>2</td><td>2</td></tr>
            <tr><td><MathInline tex="x^2" /></td><td>2.6667</td><td><b>3</b></td><td><b>2.5</b></td><td>2.6667</td></tr>
            <tr><td><MathInline tex="x^3" /></td><td>4</td><td><b>5</b></td><td><b>3.5</b></td><td>4</td></tr>
            <tr><td><MathInline tex="x^4" /></td><td>6.4</td><td><b>9</b></td><td><b>5.125</b></td><td><b>6.6667</b></td></tr>
          </tbody>
        </table>
      </div>
      <p>
        读出来的结论：梯形与中点在 <MathInline tex="x^2" /> 处首次失手，代数精度为
        <strong>1</strong>；辛普森一路精确到 <MathInline tex="x^3" />、在 <MathInline tex="x^4" /> 处首次失手，
        代数精度为 <strong>3</strong>（"越级"的来源）；<MathInline tex="n" /> 点高斯求积高达
        <MathInline tex="2n-1" />。顺带看清一件事：中点法虽然和梯形同为 1 级，但它的误差<strong>符号相反、只有一半</strong>
        （<MathInline tex="x^2" /> 那行 <MathInline tex="-0.167" /> 对 <MathInline tex="+0.333" />），
        第贰节那个 <MathInline tex="2:1" /> 配平在这张表里又露了一次脸。
      </p>
    </div>

    <h2><span class="sec-no">伍</span>买到了什么：那张表上的每一个数</h2>
    <div class="story">
      <div class="story-title">🩺 亲手把 0.9750 算出来：五个函数值就够</div>
      <p>
        <strong>先说画面。</strong>体检报告上写着"参考区间 3.5–5.5"，新闻里说"支持率 47%，抽样误差 ±3 个百分点"，
        论文里写着"<MathInline tex="p<0.05" />"。这三句话背后是同一个数：
        <router-link to="/probability/clt">中心极限定理</router-link>说样本均值近似服从正态分布，
        而"95% 的把握"要求找到那个 <MathInline tex="z" />，使得钟形曲线中间部分的面积占 95%——
        两侧各留 2.5%，于是需要 <MathInline tex="\Phi(z)=0.975" />，查表得 <MathInline tex="z=1.96" />。
        <strong>民调新闻末尾那个 ±3%，就是 1.96 乘出来的。</strong>
      </p>
      <p>
        <strong>为什么非绕道数值积分不可。</strong>因为第壹节说过，
        <MathInline tex="\int e^{-t^2/2}\mathrm{d}t" /> 没有初等原函数，
        基本定理这条路被刘维尔堵死了。表上的数只能"数"出来。
      </p>
      <p>
        <strong>动手。</strong>要算 <MathInline tex="\Phi(1.96)=0.5+\int_0^{1.96}\varphi(t)\,\mathrm{d}t" />，
        取 <MathInline tex="n=4" />（步长 <MathInline tex="h=1.96/4=0.49" />），只需五个函数值：
      </p>
      <MathBlock tex="\begin{aligned} \varphi(0)&=0.398942,\quad \varphi(0.49)=0.353812,\quad \varphi(0.98)=0.246809\\ \varphi(1.47)&=0.135418,\quad \varphi(1.96)=0.058441 \end{aligned}" />
      <p>按辛普森的 <MathInline tex="1,4,2,4,1" /> 配权：</p>
      <MathBlock tex="\begin{aligned} \Sigma&=0.398942+4(0.353812)+2(0.246809)\\ &\quad +4(0.135418)+0.058441=2.907924\\ \int_0^{1.96}\varphi&\approx\frac{h}{3}\Sigma=\frac{0.49}{3}\times2.907924=0.4749609\\ \Phi(1.96)&\approx0.5+0.4749609=\mathbf{0.9749609} \end{aligned}" />
      <p>
        <strong>读出结果。</strong>四舍五入到表格的四位小数：<strong>0.9750</strong>。
        和课本表上那个数<strong>一模一样</strong>——用五个函数值、一支笔、大约两分钟。
        高精度参考值是 <MathInline tex="0.97500210" />，所以 <MathInline tex="n=4" /> 的误差是
        <MathInline tex="4.1\times10^{-5}" />；把 <MathInline tex="n" /> 加到 8（九个函数值），
        结果变成 <MathInline tex="0.9750000" />，误差降到 <MathInline tex="2.1\times10^{-6}" />——
        比 <MathInline tex="n=4" /> 又准了 <strong>20 倍</strong>（四阶的渐近预言是 16 倍，
        <MathInline tex="h" /> 还不算小，实际稍稍超额）。
        对比一下用梯形法：同样 <MathInline tex="n=8" /> 只能给到 <MathInline tex="0.974430" />，
        连第四位都不对——四阶和二阶的差距，在这张表上是"能不能印"的差距。
      </p>
      <p>
        十九世纪那些统计表就是这么造出来的：一屋子人拿着对数表和辛普森公式手算，
        一格一格填。今天 Python 里 <code>scipy.stats.norm.cdf(1.96)</code> 一行返回 0.975002104851…，
        底下跑的仍是同一套思路（换成了更精巧的有理逼近），只是快了一亿倍。
      </p>
      <p>
        <strong>条件不成立会怎样。</strong>把 <MathInline tex="z" /> 换成 5，想算"超过 5 个标准差"的尾概率
        <MathInline tex="1-\Phi(5)" />，照上面的路子走就会栽跟头：先算
        <MathInline tex="\int_0^5\varphi=0.49999971331501" />（这个数本身准到 12 位），
        再用 <MathInline tex="0.5" /> 去减，得 <MathInline tex="2.86685\times10^{-7}" />；
        而真值是 <MathInline tex="2.86652\times10^{-7}" />——<strong>只剩四位准</strong>。
        积分本身一位没错，错在最后那一步减法：两个几乎相等的数相减，
        <strong>绝对误差纹丝不动，相对误差被放大了一百多万倍</strong>。
        这正是<router-link to="/numerical/float-error">第 1 讲那个抵消陷阱</router-link>换了身衣服又来了一次。
        解药也是老一套——<strong>别去减，直接积尾巴</strong>：算
        <MathInline tex="\int_5^{20}\varphi\,\mathrm{d}t" /> 得 <MathInline tex="2.8665157\times10^{-7}" />，
        相对误差 <MathInline tex="10^{-8}" />，比绕道减法准了四个数量级。
        <strong>同一个积分，换个写法，精度差四个数量级</strong>——这是数值分析每一讲都在重复的那句话。
      </p>
    </div>
    <p>正态分布表只是最眼熟的那个出口。同一套公式还撑着这些事：</p>
    <ul>
      <li>
        <strong>仿真的引擎</strong>：有限元分析（造桥、算机翼受力、算手机跌落）与计算流体力学，
        内核都是在成千上万个小单元上做数值积分再拼起来——每个单元上算的都是几点高斯求积，
        用的正是上面那个 <MathInline tex="\pm1/\sqrt3" />；
      </li>
      <li>
        <strong>金融与工程里的"面积"</strong>：期权定价（<MathInline tex="\Phi" /> 在布莱克-斯科尔斯公式里出现两次）、
        可靠性工程里的失效概率、剂量学里的累积照射量，问的都是"某条曲线下方的面积"；
      </li>
      <li>
        <strong>高维的另一条路</strong>：维度一高，切网格的块数按 <MathInline tex="N^d" /> 指数爆炸
        （"维数灾难"：10 维每边切 10 段就是 100 亿块）。这时改用<strong>蒙特卡洛积分</strong>——
        随机撒点、取平均，误差按 <MathInline tex="1/\sqrt N" /> 下降，<strong>与维度无关</strong>。
        它慢得多（要多 100 倍的点才多一位准），但在高维是唯一能走的路，
        今天的金融衍生品定价、电影渲染里的光线追踪、以及贝叶斯推断里的采样，全靠它。
      </li>
    </ul>
    <div class="insight">
      <div class="insight-title">🔗 与你学过的课程连一连</div>
      <p>
        <strong>微积分</strong>：数值积分就是<router-link to="/calculus/integral">黎曼和</router-link>的精装升级版，
        而误差公式里那些 <MathInline tex="f''(\xi)" />、<MathInline tex="f^{(4)}(\xi)" />
        全部来自<router-link to="/calculus/taylor">泰勒展开</router-link>——第贰节那个折叠框里，
        真正干活的就是泰勒余项；它也顺手标出了<router-link to="/calculus/ftc">基本定理</router-link>的适用边界：
        原函数存在时用它最省事，一旦刘维尔说"不存在"，就轮到求积公式上场。
      </p>
      <p>
        <strong>概率论</strong>：蒙特卡洛积分是<router-link to="/probability/lln">大数定律</router-link>的直接兑现
        （撒点取平均收敛到期望），它那个 <MathInline tex="1/\sqrt N" /> 的误差率
        正是<router-link to="/probability/clt">中心极限定理</router-link>给的；
        反过来，本讲开头那个 <MathInline tex="\Phi(1.96)=0.975" /> 又是
        <router-link to="/probability/distribution">正态分布</router-link>这一整套的入口——
        <strong>两门课在这里互为对方的计算器</strong>。
      </p>
      <p>
        <strong>复变函数</strong>：<router-link to="/complex/residue">留数定理</router-link>提供了一条截然不同的出路——
        它能把 <MathInline tex="\int_{-\infty}^{\infty}\frac{\sin x}{x}\mathrm{d}x" /> 这类
        "实轴上算不出来"的积分，绕到复平面上一圈精确解出 <MathInline tex="\pi" />。
        两条路的分工很清楚：留数给的是<strong>精确值但挑函数</strong>（要解析、要能围出闭合围道），
        求积公式给的是<strong>近似值但通吃</strong>（只要函数值算得出来就行，哪怕它是一张实验数据表）。
        真实工作里两者常常合作：能用留数解析解决的部分先解掉，剩下的塞给辛普森。
      </p>
      <p>
        <strong>本课呼应</strong>，三笔账：① 牛顿-柯特斯次数一高就会犯
        <router-link to="/numerical/interpolation">龙格现象</router-link>——八次以上的公式权重开始出现负数、
        剧烈震荡，所以实战宁可用低次的<strong>复合</strong>辛普森，绝不用一根高次公式，
        和插值讲"宁可分段样条"是同一个教训；
        ② <router-link to="/numerical/float-error">第 1 讲</router-link>预告过"截断误差的鼻祖是泰勒余项"，
        本讲的 <MathInline tex="h^2/h^4" /> 就是那句话的兑现；
        ③ 第 1、2 讲反复出现的那条<strong>误差 U 形曲线</strong>（<MathInline tex="h" /> 太大截断误差大、
        <MathInline tex="h" /> 太小舍入误差大），在这里变成了一条 <strong>L 形</strong>：
        实测辛普森算 <MathInline tex="\int_{-2}^2 e^{-x^2}" />，误差一路降到
        <MathInline tex="N\approx1024" /> 处的 <MathInline tex="2\times10^{-13}" />，
        之后就<strong>撞上地板不再下降</strong>（<MathInline tex="N" /> 加到四百万也还是
        <MathInline tex="2\times10^{-12}" />），但也<strong>不像数值微分那样暴涨回去</strong>。
        差别在于：<router-link to="/numerical/root-finding">数值微分</router-link>做的是<strong>减法</strong>，
        小步长把灾难性抵消放大成 U 形；求积做的是<strong>加法</strong>，被积函数为正时各项同号，
        舍入误差只会互相平均、不会互相放大。<strong>同样是"步长不能无限小"，
        一个是悬崖，一个只是地板</strong>——运算做的是加还是减，决定了误差是被放大还是被摊平。
      </p>
    </div>
  </ConceptPage>
</template>

<style scoped>
.tbl-wrap {
  overflow-x: auto;
  margin: 0.9rem 0;
}
.mini-tbl {
  border-collapse: collapse;
  font-size: 0.92rem;
  min-width: 22rem;
}
.mini-tbl th,
.mini-tbl td {
  border: 1px solid var(--line, #e6e1d8);
  padding: 0.32rem 0.7rem;
  text-align: center;
  white-space: nowrap;
}
.mini-tbl thead th {
  background: rgba(0, 0, 0, 0.04);
  font-weight: 600;
}
.mini-tbl td b {
  color: var(--accent, #b23a2f);
}
</style>
