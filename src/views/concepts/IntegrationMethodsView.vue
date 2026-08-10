<script setup>
import ConceptPage from '../../components/ConceptPage.vue'
import MathBlock from '../../components/MathBlock.vue'
import MathInline from '../../components/MathInline.vue'
import RevealBox from '../../components/RevealBox.vue'
import QuizBox from '../../components/QuizBox.vue'
import SubstitutionDemo from '../../demos/SubstitutionDemo.vue'
</script>

<template>
  <ConceptPage slug="integration-methods">
    <h2><span class="sec-no">壹</span>困境：基本定理把球踢给了"找原函数"</h2>
    <p>
      <router-link to="/calculus/ftc">上一讲</router-link>的胜利来得太轻松，
      轻松到藏起了一个大问题。基本定理说：
    </p>
    <MathBlock tex="\int_a^b f(x)\,\mathrm{d}x = F(b) - F(a), \qquad \text{只要 } F' = f" />
    <p>
      于是"算面积"变成了"<strong>找一个求导之后等于 f 的函数</strong>"。
      对 <MathInline tex="f = x^2" /> 这种，一眼看出 <MathInline tex="F = x^3/3" />。
      可下面这几个呢——它们都不是刁难，全是物理、概率、几何里天天出现的：
    </p>
    <MathBlock tex="\int x\cos x\,\mathrm{d}x, \qquad \int 2x\,e^{-x^2}\,\mathrm{d}x, \qquad \int \sqrt{1-x^2}\,\mathrm{d}x, \qquad \int e^{x}\sin x\,\mathrm{d}x" />
    <p>
      盯着看半天也"看不出来"。这就是本讲要面对的<strong>不对称</strong>：
    </p>
    <div class="insight">
      <div class="insight-title">💡 求导是照章办事，求原函数是认形状</div>
      <p>
        <router-link to="/calculus/chain-rule">链式法则那一讲</router-link>造出的四条法则，
        构成一套<strong>算法</strong>：任何由加减乘除、幂、三角、指数、对数拼出来的函数，
        照着法则机械地拆，一定能在有限步内写出导数。<strong>不需要灵感。</strong>
      </p>
      <p>
        反过来就完全不同。给你一个 <MathInline tex="f" />，要找 <MathInline tex="F" /> 使
        <MathInline tex="F'=f" />——<strong>没有这样的算法</strong>。你只能反过来问：
        "这个式子看着像是谁求导之后的样子？"这是<strong>逆问题</strong>，
        和"乘法容易、因式分解难""煮鸡蛋容易、还原生鸡蛋难"是同一类困境。
      </p>
      <p>
        更糟的是——本讲末尾会看到——有些函数的原函数<strong>根本不在初等函数里</strong>，
        比如那个只比上面第二个式子少一个 <MathInline tex="x" /> 的
        <MathInline tex="\int e^{-x^2}\mathrm{d}x" />。<strong>这不是你笨，是刘维尔 1835 年证明的定理。</strong>
      </p>
    </div>
    <div class="story">
      <div class="story-title">📜 1696 年 · 第一本微积分教科书，作者其实不是作者</div>
      <p>
        求导法则问世（1684）之后，欧洲数学家花了十几年时间干一件事：
        <strong>把这些法则一条条倒过来读，攒出一本"积分手册"</strong>。
        这项工作的主力是瑞士人<strong>约翰·伯努利</strong>——
        他和哥哥雅各布（<router-link to="/probability/lln">概率论第 4 讲</router-link>那位）
        是莱布尼茨最早的两个学生，也是一对吵了一辈子的兄弟。
      </p>
      <p>
        1691 年，约翰·伯努利在巴黎给一位年轻贵族<strong>洛必达侯爵</strong>讲授新发明的微积分。
        随后两人签下一纸<strong>合同</strong>：洛必达按年付酬，
        伯努利把自己的数学发现<strong>优先寄给他，并允许他随意使用</strong>。
        1696 年，洛必达出版了《阐明曲线的无穷小分析》——
        <strong>历史上第一本微积分教科书</strong>，风行欧洲半个世纪。
        书里那条著名的"洛必达法则"（<MathInline tex="0/0" /> 型极限可以上下同时求导），
        实际出自伯努利之手。
      </p>
      <p>
        平心而论，洛必达在序言里确实致谢了伯努利兄弟；但真相直到 1922 年
        两人的通信被发现才完全大白。<strong>这段公案留下的教训与本讲有关</strong>：
        求导法则是"发明"，而积分技巧是<strong>一代人一条条攒出来的经验</strong>——
        它更像一本菜谱，而不是一条定理。你今天在习题册上做的每一道积分，
        背后都站着 17 世纪某个人的一次灵光。
      </p>
    </div>

    <h2><span class="sec-no">贰</span>破局：把每一条求导法则倒过来读</h2>
    <p>
      既然求导是算法、积分是逆问题，那最省力的办法就是<strong>把已有的每条求导法则
      反过来抄一遍</strong>——每抄一条，就得到一种积分技巧。
      <router-link to="/calculus/chain-rule">上上讲</router-link>造了两条主要法则，
      于是这里就有两种主要技巧。
    </p>
    <h3>链式法则倒过来读：换元积分</h3>
    <p>链式法则说，复合函数求导要乘上里层的导数：</p>
    <MathBlock tex="\bigl(F(g(x))\bigr)' = F'\bigl(g(x)\bigr)\cdot g'(x)" />
    <p>
      把这行字从右往左读：<strong>如果你看见的被积函数长着
      "<MathInline tex="f(g(x))" /> 乘以 <MathInline tex="g'(x)" />" 这副样子</strong>，
      那它的原函数就是 <MathInline tex="F(g(x))" />（这里 <MathInline tex="F'=f" />）：
    </p>
    <MathBlock tex="\int f\bigl(g(x)\bigr)\,g'(x)\,\mathrm{d}x = F\bigl(g(x)\bigr) + C" />
    <p>
      莱布尼茨的记号把这件事变得像做菜一样简单：<strong>令</strong>
      <MathInline tex="u = g(x)" />，<strong>写</strong>
      <MathInline tex="\mathrm{d}u = g'(x)\,\mathrm{d}x" />，代进去，
      整个式子就变成 <MathInline tex="\int f(u)\,\mathrm{d}u" />。
      举个例：算 <MathInline tex="\int 2x\cos(x^2)\,\mathrm{d}x" />，
      令 <MathInline tex="u=x^2" />、<MathInline tex="\mathrm{d}u=2x\,\mathrm{d}x" />，
      于是它就是 <MathInline tex="\int\cos u\,\mathrm{d}u = \sin u + C = \sin(x^2)+C" />。
      求导验一下：<MathInline tex="(\sin x^2)' = 2x\cos(x^2)" /> ✓。
    </p>
    <p>
      <strong>但 <MathInline tex="\mathrm{d}u = g'(x)\mathrm{d}x" /> 凭什么能这么"约"？</strong>
      <router-link to="/calculus/derivative">第二讲</router-link>说得很清楚：
      <MathInline tex="\mathrm{d}u/\mathrm{d}x" /> 不是分数。这里之所以能这么写，
      不是因为约分合法，而是因为<strong>上面那条链式法则替你把账算好了</strong>——
      记号只是把结论摆成了容易操作的形状。叁节的动画会让你看见这笔账
      <strong>在几何上</strong>是怎么平的：横向拉宽多少倍，纵向就压矮多少倍。
    </p>
    <h3>乘积法则倒过来读：分部积分</h3>
    <p>乘积法则说：</p>
    <MathBlock tex="(uv)' = u'v + uv'" />
    <p>
      两边同时积分（左边的原函数显然是 <MathInline tex="uv" />），再把一项挪到另一边：
    </p>
    <MathBlock tex="\int u\,v'\,\mathrm{d}x = uv - \int u'\,v\,\mathrm{d}x" />
    <p>
      <strong>这个公式没有"算出"任何东西，它只是做了一次交换</strong>：
      把"u 不动、v 求导"的积分，换成了"u 求导、v 不动"的积分。
      <strong>什么时候这笔买卖划算？当求导让一个因子变简单、而积分不让另一个因子变复杂。</strong>
      最典型的组合是"多项式 × 三角/指数"：多项式求几次导就没了，
      而 <MathInline tex="\sin, \cos, e^x" /> 积分之后还是它们自己。
    </p>
    <p>算壹节那个 <MathInline tex="\int x\cos x\,\mathrm{d}x" />：取 u = x、v′ = cos x，则 v = sin x，</p>
    <MathBlock tex="\int x\cos x\,\mathrm{d}x = x\sin x - \int 1\cdot\sin x\,\mathrm{d}x = x\sin x + \cos x + C" />
    <p>
      <strong>验算</strong>（每次积分完都该做这一步，它是免费的）：
      <MathInline tex="(x\sin x + \cos x)' = \sin x + x\cos x - \sin x = x\cos x" /> ✓。
      定积分版顺手也有了：<MathInline tex="\int_0^{\pi/2} x\cos x\,\mathrm{d}x = \frac{\pi}{2} - 1 = 0.570796" />。
    </p>
    <p>
      要是<strong>求导也不变简单、积分也不变简单</strong>呢？比如
      <MathInline tex="\int e^x\sin x\,\mathrm{d}x" />，两个因子都"打不死"。
      这时有一招很漂亮的把戏：分部两次，让式子<strong>转回它自己</strong>，
      然后把它当未知数解方程。先自己试试。
    </p>
    <RevealBox title="🔍 分部两次，把积分当未知数解出来" label="对答案 / 看完整拆解">
      <template #hint>
        记 <MathInline tex="I = \int e^x\sin x\,\mathrm{d}x" />。
        对它做一次分部（取 <MathInline tex="u=\sin x" />、<MathInline tex="v'=e^x" />），
        你会得到一个新的积分；<strong>对这个新积分再做一次同样的分部</strong>。
        看看第二次之后右边冒出来的是什么——如果它长得和 I 一模一样，你就该想到：
        这是一个关于 I 的<strong>方程</strong>。
      </template>
      <p><strong>第一次分部：</strong>取 <MathInline tex="u=\sin x,\ v'=e^x" />，则 <MathInline tex="v=e^x" />：</p>
      <MathBlock tex="I = e^x\sin x - \int e^x\cos x\,\mathrm{d}x" />
      <p>
        右边那个积分并不比原来简单（<MathInline tex="\sin" /> 换成了
        <MathInline tex="\cos" /> 而已）。但别灰心，<strong>照做第二次</strong>：
        取 <MathInline tex="u=\cos x,\ v'=e^x" />，注意
        <MathInline tex="(\cos x)' = -\sin x" />：
      </p>
      <MathBlock tex="\int e^x\cos x\,\mathrm{d}x = e^x\cos x + \int e^x\sin x\,\mathrm{d}x = e^x\cos x + I" />
      <p><strong>I 自己回来了。</strong>代回第一式：</p>
      <MathBlock tex="I = e^x\sin x - \bigl(e^x\cos x + I\bigr) \quad\Longrightarrow\quad 2I = e^x(\sin x - \cos x)" />
      <MathBlock tex="\int e^x\sin x\,\mathrm{d}x = \frac{e^x(\sin x - \cos x)}{2} + C" />
      <p>
        <strong>验算：</strong>对右边求导，
        <MathInline tex="\frac{1}{2}\bigl[e^x(\sin x-\cos x) + e^x(\cos x+\sin x)\bigr] = e^x\sin x" /> ✓。
        代一组数：<MathInline tex="\int_0^{\pi} e^x\sin x\,\mathrm{d}x = \frac{e^{\pi}+1}{2} = 12.070346" />，
        数值积分给出的也是 12.070346。
      </p>
      <p>
        <strong>回味：这一招的名字是"自指"。</strong>你没有把 I 算出来，
        你是<strong>造了一个关于 I 的方程再解它</strong>——
        和解 <MathInline tex="x = 3 - x/2" /> 是同一种动作。
        数学里凡是"绕一圈回到自己"的场合都值得高兴：
        <router-link to="/calculus/limit">第一讲</router-link>里的
        <MathInline tex="0.999\ldots" />、
        <router-link to="/complex/residue">留数定理</router-link>里的绕圈积分，
        用的都是这个念头。<strong>回到原点不是白走，是收网。</strong>
      </p>
    </RevealBox>
    <h3>为什么积分注定比求导难：一句话的解释</h3>
    <p>
      求导时，"复合"这件事被<strong>翻译成了乘法</strong>（乘上 <MathInline tex="g'" />）；
      积分时，你拿到的是一个<em>已经乘好了的</em>式子，
      必须<strong>反过来认出它是从哪个复合来的</strong>——
      而"认出"没有机械流程。这就是为什么求导可以交给计算器，
      而积分要靠一本菜谱加一点眼力。
    </p>
    <QuizBox
      quiz-id="integration-methods-q1"
      question="$\int 2x\,e^{-x^2}\mathrm{d}x$ 用换元一步就算得出来（$= -e^{-x^2}+C$），可 $\int e^{-x^2}\mathrm{d}x$ 却写不出初等原函数。差别到底在哪？"
      hint="换元法要求被积函数长成「外层函数 乘以 里层的导数」。数一数第二个式子里，那个「配套的里层导数」在不在。"
      :options="[
        { t: '第一个式子里恰好有配套的 $g^{\\prime}(x)=2x$，换元能把 dx 换成 du；第二个缺这个因子，换元换不动', why: '对。换元不是「随便令 u 等于什么」，而是要求被积函数里<b>本来就带着</b>里层的导数。缺了那个 2x，$\\mathrm{d}u=2x\\,\\mathrm{d}x$ 就换不过去——而刘维尔 1835 年更进一步证明：任何初等函数都当不了它的原函数。' },
        { t: '因为 $e^{-x^2}$ 衰减太快，积分发散', why: '恰恰相反，$\\int_{-\\infty}^{\\infty}e^{-x^2}\\mathrm{d}x$ 收敛得很好，值是 $\\sqrt{\\pi}$（本课后面用极坐标算得出来）。「积分值存在」和「原函数写不写得出初等形式」是两件完全不同的事。' },
        { t: '第二个式子只是还没有人找到原函数，将来也许有', why: '这正是刘维尔定理要否掉的想法：它证明的不是「找不到」，而是「<b>不存在</b>」——在初等函数这个范围里根本没有。这跟「三等分角作图不可能」是同一类结论。' },
        { t: '因为第二个式子没有乘 x，不是偶函数', why: '奇偶性与能否积出初等原函数无关。$e^{-x^2}$ 确实是偶函数，而 $2xe^{-x^2}$ 是奇函数，可决定命运的是有没有那个配套的 $g^{\\prime}$。' },
      ]"
      :answer="0"
    />

    <h2><span class="sec-no">叁</span>亲手把同一块面积换把尺子量</h2>
    <p>
      换元法在符号上像"约分"，在几何上是<strong>换一把尺子量同一块面积</strong>。
      下面的动画左右两块画的是同一个积分的两种写法：
      左边在 x 的尺子上量 <MathInline tex="f(g(x))g'(x)" />，
      右边在 u 的尺子上量 <MathInline tex="f(u)" />。
    </p>
    <p>
      重点看<strong>同色的一对细条</strong>：右边那根横向被拉宽了
      <MathInline tex="g'" /> 倍，同时纵向被压矮了 <MathInline tex="g'" /> 倍——
      <strong>一拉一压，面积分毫不差</strong>。读数区的两个数是各自独立算出来的，
      可以当场对账。
    </p>
    <SubstitutionDemo />

    <h2><span class="sec-no">肆</span>严格定义：两条公式与它们的前提</h2>
    <div class="definition">
      <div class="def-title">📐 换元积分公式</div>
      <p>
        设 <MathInline tex="g" /> 在 <MathInline tex="[a,b]" /> 上有连续导数，
        <MathInline tex="f" /> 在 <MathInline tex="g" /> 的值域上连续。则
      </p>
      <MathBlock tex="\int_a^b f\bigl(g(x)\bigr)\,g'(x)\,\mathrm{d}x = \int_{g(a)}^{g(b)} f(u)\,\mathrm{d}u" />
    </div>
    <div class="definition">
      <div class="def-title">📐 分部积分公式</div>
      <p>设 <MathInline tex="u, v" /> 在 <MathInline tex="[a,b]" /> 上有连续导数。则</p>
      <MathBlock tex="\int_a^b u\,v'\,\mathrm{d}x = \Bigl[\,u\,v\,\Bigr]_a^b - \int_a^b u'\,v\,\mathrm{d}x" />
    </div>
    <p>两条公式各有一个容易被忽略的要点，逐个说清：</p>
    <ul>
      <li>
        <strong>定积分换元，必须同时换积分限。</strong>右边的上下限是
        <MathInline tex="g(a)" /> 与 <MathInline tex="g(b)" />，不是 a 和 b。
        道理很朴素：<strong>换了尺子，刻度当然要跟着换</strong>。
        动画里左边的区间是 [0.20, 1.60]，右边就自动变成 [0.04, 2.56]。
        换完限就<strong>不必再换回 x</strong>——这是定积分换元比不定积分省事的地方。
      </li>
      <li>
        <strong>g 不必单调，但不单调时要小心。</strong>公式本身对
        <MathInline tex="g(a) > g(b)" /> 也成立（上限比下限小，积分变号，正好抵消）。
        真正会出错的是<strong>反着用</strong>的时候（令 <MathInline tex="x = \varphi(u)" />
        把 x 换成 u）：那时需要 <MathInline tex="\varphi" /> 可逆，
        否则同一个 u 对应好几个 x，"换尺子"就成了"把纸对折"。
      </li>
      <li>
        <strong>分部积分里的 <MathInline tex="[uv]_a^b" /> 项不能丢。</strong>
        它是"边界上的账"。有意思的是，在<router-link to="/mathphys/separation">数理方程</router-link>
        里证明正交性时，用的正是分部积分，而<strong>整个证明的枢纽恰恰是让这个边界项等于零</strong>
        ——边界条件在那里第一次显出威力。
      </li>
    </ul>
    <h3>第三种常用技巧：三角换元</h3>
    <p>
      壹节还剩一个 <MathInline tex="\int\sqrt{1-x^2}\,\mathrm{d}x" /> 没解决。
      它的形状让人想起单位圆 <MathInline tex="x^2+y^2=1" />，那就<strong>反着换元</strong>：
      令 <MathInline tex="x=\sin\theta" />，于是
      <MathInline tex="\sqrt{1-x^2}=\cos\theta" />、
      <MathInline tex="\mathrm{d}x=\cos\theta\,\mathrm{d}\theta" />：
    </p>
    <MathBlock tex="\int\sqrt{1-x^2}\,\mathrm{d}x = \int\cos^2\theta\,\mathrm{d}\theta = \int\frac{1+\cos 2\theta}{2}\,\mathrm{d}\theta = \frac{\theta}{2} + \frac{\sin 2\theta}{4} + C" />
    <p>
      换回 x（<MathInline tex="\theta=\arcsin x" />，
      <MathInline tex="\sin 2\theta = 2x\sqrt{1-x^2}" />）得
      <MathInline tex="\frac{1}{2}\bigl(\arcsin x + x\sqrt{1-x^2}\bigr)+C" />。
      取 <MathInline tex="[-1,1]" /> 上的定积分，得到 <MathInline tex="\pi/2" />——
      <strong>正好是半径为 1 的半圆面积</strong>。绕这么大一圈，
      算出的是小学就知道的答案；但这一次，<strong>圆的面积公式是被推出来的，不是被告知的</strong>。
      （中间那步 <MathInline tex="\cos^2\theta = \frac{1+\cos 2\theta}{2}" /> 是中学的降幂公式，
      也是三角换元最常用的一块垫脚石。）
    </p>
    <QuizBox
      quiz-id="integration-methods-q2"
      question="分部积分 $\int uv' = uv - \int u'v$ 看着只是把式子搬来搬去，凭什么它能算出原本算不出的积分？"
      hint="想想「x 乘 cos x」那道题：交换之后，两个因子各自发生了什么变化？"
      :options="[
        { t: '因为交换之后新积分可能更简单：求导让多项式降次，而三角/指数积分之后不变复杂', why: '对。公式本身不产生信息，它只是「把求导的负担从一个因子转移到另一个」。这笔买卖赚不赚，全看你把谁选作 u——选错了（比如让 $\\cos x$ 去求导、$x$ 去积分）会得到 $x^2$，越算越糟。' },
        { t: '因为它把定积分变成了不定积分，绕开了积分限', why: '恰恰相反，定积分版里那个 $[uv]_a^b$ 边界项正是积分限的产物，一步也绕不开——数理方程里让边界项归零，还是整个证明的关键。' },
        { t: '因为乘积的积分等于积分的乘积，公式把它写清楚了', why: '「乘积的积分等于积分的乘积」是错的（$\\int x\\cdot x \\neq \\frac{x^2}{2}\\cdot\\frac{x^2}{2}$）。分部积分之所以存在，正是因为没有这种好事——它是乘积法则倒过来读的结果，不是什么乘法分配律。' },
      ]"
      :answer="0"
    />

    <h2><span class="sec-no">伍</span>买到了什么：从火箭到"算不出来"的定理</h2>

    <h3>火箭为什么必须扔掉自己：一条积分算出来的天花板</h3>
    <p>
      <strong>画面。</strong>一枚火箭在真空里飞。它没有别的办法加速，
      只能<strong>把自己的一部分（燃料）以很高的速度向后扔出去</strong>，
      靠反冲往前走。问题是：<strong>烧完全部燃料，它总共能加速多少？</strong>
    </p>
    <p>
      <strong>为什么非得绕道积分。</strong>因为火箭<strong>越飞越轻</strong>。
      同样扔出 1 千克燃料，满载时推动的是几百吨的家伙，快空了时推动的只有几吨——
      <strong>每一小口燃料的贡献都不一样</strong>。这正是"变化的量累积起来"，
      只能积分。
    </p>
    <p>
      <strong>推导。</strong>设某时刻火箭总质量 m、速度 v，
      发动机把燃料以相对速度 <MathInline tex="v_e" />（喷气速度）向后喷出。
      动量守恒给出：扔掉 <MathInline tex="-\mathrm{d}m" /> 的质量
      （<MathInline tex="\mathrm{d}m<0" />，因为质量在减少），火箭获得
    </p>
    <MathBlock tex="m\,\mathrm{d}v = -v_e\,\mathrm{d}m \qquad\Longrightarrow\qquad \mathrm{d}v = -v_e\,\frac{\mathrm{d}m}{m}" />
    <p>
      两边积分。右边正是本讲的<strong>换元</strong>形状——分子恰好是分母的导数
      （<MathInline tex="\int\frac{\mathrm{d}m}{m} = \ln m" />，这是最常用的一个换元）：
    </p>
    <MathBlock tex="\Delta v = -v_e\int_{m_0}^{m_1}\frac{\mathrm{d}m}{m} = -v_e\bigl[\ln m\bigr]_{m_0}^{m_1} = v_e\ln\frac{m_0}{m_1}" />
    <p>
      <strong>读出物理：这就是齐奥尔科夫斯基火箭方程（1903）</strong>，
      航天工程的第一条公式。它说的事情相当残酷——
      <strong>速度增量只跟"起飞质量 ÷ 关机质量"的<em>对数</em>有关</strong>。
      对数意味着：想让 <MathInline tex="\Delta v" /> 翻倍，质量比要<strong>平方</strong>。
    </p>
    <p>
      代真实数字。液氧煤油发动机的喷气速度约
      <MathInline tex="v_e \approx 3.05" /> km/s。要进入近地轨道，
      火箭需要约 <strong>9.4 km/s</strong> 的速度增量（7.8 km/s 是环绕速度，
      其余是重力损失和空气阻力）。反解质量比：
    </p>
    <MathBlock tex="\frac{m_0}{m_1} = e^{\Delta v/v_e} = e^{9.4/3.05} = e^{3.082} \approx 21.8" />
    <p>
      也就是说：<strong>起飞时的 21.8 份质量里，只有 1 份能在关机时剩下</strong>——
      而这 1 份还要包括发动机、油箱、结构和有效载荷。
      油箱本身的干重通常就占燃料的 5–10%，所以<strong>单级火箭几乎不可能入轨</strong>。
      这就是为什么所有运载火箭都要<strong>分级</strong>：
      把烧空的油箱和发动机整个扔掉，让后面的级从一个小得多的
      <MathInline tex="m_0" /> 重新开始算这条对数。<strong>火箭必须扔掉自己，
      是这条积分逼出来的结论。</strong>
    </p>
    <p>
      <strong>条件不成立会怎样。</strong>推导里悄悄假设了两件事：
      ① <MathInline tex="v_e" /> 恒定——真实发动机在稠密大气里喷口效率低，
      海平面比高空低约 10%；② 没有外力——而起飞头一分钟里，
      重力每秒白白吃掉 9.8 m/s 的速度增量（叫<strong>重力损失</strong>，
      总计约 1.5 km/s），空气阻力再吃掉几百米每秒。
      上面那个"9.4 而不是 7.8"就是把这些损失<strong>塞进等号右边</strong>的做法——
      <strong>工程师的诚实之处在于：他们不假装模型完美，而是给它加一个量化的补丁。</strong>
    </p>

    <h3>"我算不出来"很可能不是你的错：刘维尔定理</h3>
    <p>
      本讲教了三套技巧，但你迟早会撞上一个用尽所有技巧也积不出来的式子。
      到那时请记住 1835 年的一条定理，它由法国数学家<strong>刘维尔</strong>证明
      （<router-link to="/mathphys/separation">数理方程最后一讲</router-link>那位
      刘维尔，也是创办《纯粹与应用数学杂志》的那位）：
    </p>
    <div class="definition">
      <div class="def-title">📐 刘维尔的结论（1835，通俗版）</div>
      <p>
        下面这些函数的原函数，<strong>不可能</strong>写成初等函数
        （多项式、根式、指数、对数、三角函数及其反函数的有限次组合）：
      </p>
      <MathBlock tex="e^{-x^2}, \qquad \frac{\sin x}{x}, \qquad \frac{e^x}{x}, \qquad \frac{1}{\ln x}, \qquad \sqrt{1+x^4}" />
    </div>
    <p>
      注意这是一条<strong>不可能性定理</strong>，与"三等分角尺规作图不可能""五次方程没有根式解"
      同属一类：<strong>它证明的不是"没人找到"，而是"不存在"</strong>。
      这件事的后果处处可见：
    </p>
    <ul>
      <li>
        <strong>概率论只好给它起个名字。</strong>正态分布的累积概率就是
        <MathInline tex="\int e^{-t^2/2}\mathrm{d}t" />，写不出初等形式，
        于是数学家干脆定义 <MathInline tex="\Phi(z)" /> 与误差函数
        <MathInline tex="\mathrm{erf}" /> 作为新函数，再造表查——
        <router-link to="/probability/clt">概率论第 5 讲</router-link>里那张正态分布表，
        它的存在理由就是这条定理。
      </li>
      <li>
        <strong>数值积分因此成了一门手艺。</strong>积不出来但值仍然要算，
        于是有了<router-link to="/numerical/quadrature">数值分析第 4 讲</router-link>
        那一整套梯形法、辛普森法、高斯求积——
        <strong>本讲教的是"能不能绕开数值方法"，那一讲教的是"绕不开时怎么办"</strong>。
      </li>
      <li>
        <strong>最后那个 <MathInline tex="\sqrt{1+x^4}" /> 尤其扎心</strong>：
        它是"椭圆有多长"这个问题的被积函数（本课下一讲会算弧长）。
        <strong>圆的周长是 <MathInline tex="2\pi r" />，而椭圆的周长写不成初等式子</strong>——
        19 世纪的数学家为它专门发明了"椭圆积分"，
        而椭圆积分的反函数又长出了椭圆函数，
        最终通向<router-link to="/complex/continuation">复变函数</router-link>里最漂亮的一片风景。
        <strong>一个积不出来的积分，孵出了整整一门学科。</strong>
      </li>
    </ul>
    <div class="insight">
      <div class="insight-title">🔗 这一讲往后通到哪：站内连一连</div>
      <p>
        <strong>下一讲</strong>用这套技巧算<strong>弧长、体积与曲率</strong>——
        那里 <MathInline tex="\int\sqrt{1+f'(x)^2}\,\mathrm{d}x" /> 里的根式，
        正是三角换元的主场；
        <strong>无穷级数</strong>：积不出来的函数可以<em>展开成级数再逐项积</em>，
        这是刘维尔定理之后最常用的出路，泰勒展开那一讲的技术在那里变现；
        <strong>微分方程</strong>：本讲的"分离变量 + 两边积分"就是解
        <MathInline tex="y'=ky" /> 的全部手法；
        <strong>多重积分</strong>：换元法升级成<router-link to="/linear-algebra/determinant">雅可比行列式</router-link>
        ——一维的"拉宽 <MathInline tex="g'" /> 倍"变成二维的"面积放大 <MathInline tex="|\det J|" /> 倍"，
        而 <MathInline tex="\int e^{-x^2}" /> 这个初等积不出来的家伙，
        到了二维极坐标下<strong>反而算得出来</strong>（答案是 <MathInline tex="\sqrt{\pi}" />）；
        <strong>数理方程</strong>：<router-link to="/mathphys/heat">傅里叶系数</router-link>
        那个 <MathInline tex="\frac{2}{L}\int_0^L f\sin\frac{n\pi x}{L}\mathrm{d}x" />，
        算的时候用的就是本讲的分部积分。
      </p>
    </div>
  </ConceptPage>
</template>
