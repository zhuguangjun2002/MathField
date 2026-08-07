<script setup>
import ConceptPage from '../../components/ConceptPage.vue'
import MathBlock from '../../components/MathBlock.vue'
import MathInline from '../../components/MathInline.vue'
import RevealBox from '../../components/RevealBox.vue'
import QuizBox from '../../components/QuizBox.vue'
import FTCDemo from '../../demos/FTCDemo.vue'
</script>

<template>
  <ConceptPage slug="ftc">
    <h2><span class="sec-no">壹</span>困境：两门手艺，各自为战两千年</h2>
    <p>
      到 1665 年为止，人类其实<strong>两样都已经会了</strong>：求切线有费马那套系统方法
      （<router-link to="/calculus/derivative">第二讲</router-link>提过，他比牛顿还早三十多年）；
      求面积的手艺更是从阿基米德传下来两千年
      （<router-link to="/calculus/integral">第三讲</router-link>刚看过他的穷竭法）。
      可在当时所有人眼里，这是<strong>两门互不相识的手艺</strong>：
      一门盯着"这一点有多陡"，一门盯着"这一块有多大"，问题不同、方法不同，
      连擅长的人都不怎么重叠。没人想到它们是同一枚硬币的两面。
    </p>
    <div class="story">
      <div class="story-title">📜 1670 年 · 差一步的巴罗</div>
      <p>
        剑桥的巴罗——牛顿的老师——在《几何讲义》里用纯几何语言证明了一件事：
        切线问题与面积问题<strong>互为逆运算</strong>。这几乎就是本讲的定理！
        但巴罗把它当作书里几十条几何命题中的一条，没看出自己摸到的是整座大厦的枢纽。
        真正"发明微积分"的是他的学生辈：切线与面积的具体结果大多是前人的，
        牛顿和莱布尼茨的功绩是<strong>看穿并证明了这两个问题互逆，并据此把零散的天才技巧
        改造成一套任何人都能学会的算法</strong>（求导法则 + 反查）。本讲要讲的，就是那座桥。
      </p>
    </div>
    <p>
      桥为什么值钱？得先看看没有桥的日子有多苦。切线那边好歹有章可循；
      面积那边则是英雄的战场——<router-link to="/calculus/integral">上一讲</router-link>的
      黎曼和定义漂亮而严格，但拿它<em>计算</em>就是灾难。试试按定义算最简单的
      <MathInline tex="\int_0^1 x^2\,\mathrm{d}x" />：把 [0,1] 等分成 n 段、取右端点，
      黎曼和是
    </p>
    <MathBlock tex="\sum_{i=1}^{n} \Bigl(\frac{i}{n}\Bigr)^{2}\cdot\frac1n = \frac{1}{n^3}\sum_{i=1}^{n} i^2" />
    <p>
      到这一步为止全是机械动作。可接下来你会被卡住：<strong>那个
      <MathInline tex="\sum i^2" /> 等于多少？</strong>要往下走，
      你得先变出一条求和公式来——而这正是"按定义算积分"真正难的地方。
    </p>
    <RevealBox
      title="🔍 走完这条英雄之路：先变出求和公式，再取一次极限"
      label="对答案 / 看完整拆解"
    >
      <template #hint>
        先自己动笔：把 <MathInline tex="(i+1)^3 - i^3" /> 展开（结果是个关于 i 的二次式），
        然后把 <MathInline tex="i = 1, 2, \ldots, n" /> 全部加起来——左边会大面积对消。
        由此解出 <MathInline tex="\sum i^2" />。一条公式，推完再点开。
      </template>
      <p><strong>第一步：找一个会自己对消的式子。</strong></p>
      <MathBlock tex="(i+1)^3 - i^3 = 3i^2 + 3i + 1" />
      <p>
        <strong>第二步：从 1 加到 n。</strong>左边是一串首尾相接的差，中间全部对消
        （<MathInline tex="2^3" /> 减完又加回来，如此一路），只剩两头：
      </p>
      <MathBlock tex="(n+1)^3 - 1 \;=\; 3\sum_{i=1}^n i^2 \;+\; 3\sum_{i=1}^n i \;+\; n" />
      <p>
        <strong>第三步：解出来。</strong>代入已知的
        <MathInline tex="\sum i = \frac{n(n+1)}{2}" />，整理即得那条著名公式：
      </p>
      <MathBlock tex="\sum_{i=1}^{n} i^2 = \frac{n(n+1)(2n+1)}{6}" />
      <p>
        代 n = 10 核一下：<MathInline tex="10\cdot11\cdot21/6 = 385" />，
        与逐个平方相加的结果一致。
      </p>
      <p><strong>第四步：这才轮到取极限。</strong>把公式塞回黎曼和：</p>
      <MathBlock tex="\frac{1}{n^3}\cdot\frac{n(n+1)(2n+1)}{6} = \frac{(n+1)(2n+1)}{6n^2} \;\xrightarrow[\;n \to \infty\;]{}\; \frac{2n^2}{6n^2} = \frac13" />
      <p>
        （n = 10 时它是 0.385，n = 1000 时 0.33383——确实在往 1/3 走。）
      </p>
      <p>
        <strong>回味一下：为了算一个 <MathInline tex="x^2" /> 的面积，我们发明了一条求和公式。</strong>
        那么 <MathInline tex="x^3" /> 呢？得再发明一条 <MathInline tex="\sum i^3" />。
        <MathInline tex="\sin x" />、<MathInline tex="e^x" /> 呢？连"发明什么"都无从下手。
        阿基米德算一个抛物线弓形就足以名垂青史，正是因为每换一条曲线，
        这套技巧就得从头重来一遍。
      </p>
    </RevealBox>
    <p>
      <strong>面积问题需要的不是更多技巧，而是一台通用机器。</strong>
      而机器的图纸，就压在巴罗那条没人细看的几何命题里。
    </p>

    <h2><span class="sec-no">贰</span>破局：别盯着一块面积，看面积怎么"生长"</h2>
    <p>
      转机来自一个视角切换：不要问"0 到 1 的面积是多少"，而是<strong>把右端点松开变成变量</strong>。
      这个动作会造出一个新函数，它是本讲从头到尾的主角，所以先把它定义清楚：
    </p>
    <div class="definition">
      <div class="def-title">📐 两个先说好的名词</div>
      <p>
        <strong>面积函数</strong>：固定左端 a，让右端 x 自由移动，把扫过的面积记作
        <MathInline tex="A(x) = \int_a^x f(t)\,\mathrm{d}t" />。
        注意积分号里的字母换成了 t——因为 x 已经被征用去当上限了，
        这两个角色必须分开（<MathInline tex="t" /> 只是个哑变量，换成别的字母不影响结果）。
        由定义立刻有 <MathInline tex="A(a) = 0" />：从 a 扫到 a，还没扫出任何面积。
      </p>
      <p>
        <strong>原函数</strong>：若 <MathInline tex="F' = f" />，就称 F 是 f 的一个原函数。
        注意是"<em>一个</em>"——把 F 加上任何常数，导数不变，所以原函数从来都是<strong>一整族</strong>。
        这个"一整族"待会儿会变成关键。
      </p>
    </div>
    <p>
      为什么要把一块死面积变成一个活函数？因为<strong>函数才谈得上变化率</strong>——
      我们的全部家当（<router-link to="/calculus/derivative">第二讲</router-link>的求导术）
      只对函数有效。把 A 想成一幅<strong>从左往右拉开的窗帘</strong>：拉到哪，
      A 就记下已经罩住的面积；x 是窗帘杆上滑环的位置，A(x) 随它一路增长。
    </p>
    <p>
      先拿最笨的例子踩踩实：f 恒等于 2（一条水平线）时，从 a 拉到 x 罩住的是矩形，
      <MathInline tex="A(x) = 2(x-a)" />——一条<strong>斜率为 2</strong> 的直线。
      注意这个"巧合"：A 的斜率 2，恰好是 f 的高度 2。
    </p>
    <p>
      这不是巧合。<strong>面积函数 A 长什么样？</strong>直觉上，让 x 向右挪一点点 h，
      面积就新增一窄条；窄条细得像矩形，宽 h、
      高约等于当地的曲线高度 f(x)，所以 <MathInline tex="\Delta A \approx f(x)\,h" />，
      两边除以 h 就得到 <MathInline tex="A'(x) = f(x)" />。
    </p>
    <p>
      <strong>但请停一下：这段话里有个"约等于"，而结论里是个等号。</strong>
      窄条并不真是矩形——它的上边是弯的；"高约等于 f(x)"里的"约"到底有多约？
      <router-link to="/calculus/limit">第一讲</router-link>花了整整一讲建立 ε-δ 语言，
      为的就是不再靠"约"字过日子。这一步值得老实走一遍。
    </p>
    <RevealBox
      title="🔍 把那个约等号变成等号：用两个矩形把窄条夹住"
      label="对答案 / 看完整拆解"
    >
      <template #hint>
        先自己想想这个办法：那一窄条的上边是弯的，不好算。但你可以造两个<strong>真正的矩形</strong>——
        一个矮到肯定装得进去，一个高到肯定罩得住。它们的高该取什么？
        造出来之后，三者的面积有什么关系？想清楚再点开。
      </template>
      <p>
        <strong>第一步：把"新增的面积"写成积分。</strong>按定义，
      </p>
      <MathBlock tex="\Delta A = A(x+h) - A(x) = \int_a^{x+h} f - \int_a^{x} f = \int_x^{x+h} f(t)\,\mathrm{d}t" />
      <p>就是那一窄条的面积，一点没多也一点没少。</p>
      <p>
        <strong>第二步：造两个矩形夹住它。</strong>f 连续，所以它在闭区间
        <MathInline tex="[x,\,x+h]" /> 上取得到最小值 <MathInline tex="m_h" /> 和最大值
        <MathInline tex="M_h" />。以 <MathInline tex="m_h" /> 为高的矮矩形整个装在窄条里面，
        以 <MathInline tex="M_h" /> 为高的高矩形把窄条整个罩住（设 <MathInline tex="h > 0" />）：
      </p>
      <MathBlock tex="m_h \cdot h \;\le\; \Delta A \;\le\; M_h \cdot h" />
      <p>
        <strong>第三步：除以 h，凑出差商。</strong>
      </p>
      <MathBlock tex="m_h \;\le\; \frac{\Delta A}{h} \;\le\; M_h" />
      <p>
        中间那一项<strong>正是 A 的差商</strong>——导数定义里要取极限的那个东西。
      </p>
      <p>
        <strong>第四步：让 h 缩小，看两边。</strong>区间
        <MathInline tex="[x,\,x+h]" /> 塌向单点 x，而 f 在 x 处<strong>连续</strong>，
        所以区间上的最小值和最大值<em>都</em>被挤向 <MathInline tex="f(x)" />：
      </p>
      <MathBlock tex="m_h \to f(x), \qquad M_h \to f(x) \qquad (h \to 0)" />
      <p>
        两边都奔向同一个数，中间的差商没有别处可去（这就是<strong>夹逼</strong>）：
      </p>
      <MathBlock tex="A'(x) = \lim_{h\to 0}\frac{\Delta A}{h} = f(x)" />
      <p>
        （<MathInline tex="h < 0" /> 时窄条在左侧，两个不等号一起掉头，除以负数再掉一次，
        结论原样成立。）
      </p>
      <p>
        <strong>回味：这条证明真正付费的地方是"f 连续"。</strong>
        假如 f 在 x 处有个跳跃，那么无论 h 多小，区间上的最大值和最小值都隔着那道坎，
        <MathInline tex="m_h" /> 与 <MathInline tex="M_h" /> 永远挤不到一起，
        夹逼就失效了——A 在那一点确实不可导（左右导数分别等于跳跃的两侧值）。
        所以定理里"f 连续"不是排版好看的装饰，它就是这一步的通行费。
      </p>
    </RevealBox>
    <p>
      结论值得念一遍：<strong>面积函数的导数，就是曲线本身。</strong>
      求面积（积分）与求变化率（求导）竟是互逆的操作！
      上一讲末尾仪表盘上那对"车速表 / 里程表"，正是这案子的原告和被告：
      里程是速度的积分，速度是里程的导数——现在有了正式判词。
    </p>
    <QuizBox
      quiz-id="ftc-q1"
      question="窗帘再往右拉一点点（x 挪动 h），罩住的面积 A 大约增加多少？由什么决定？"
      hint="盯着新增的那一窄条：它的宽是多少，高约是多少？"
      :options="[
        { t: '约 f(x)·h——新增窄条近似矩形，高是「当地」的曲线高度', why: '对。所以 A 的变化率恰是 f 在当地的取值：曲线高的地方面积涨得快，曲线贴地的地方面积几乎不涨。整条定理的直觉就浓缩在这一窄条里。' },
        { t: '约 A(x)·h——已经积累的面积越大，涨得越快', why: '这混淆了存量和增量：窗帘已经拉开多宽，不影响下一寸新罩住多少布。新增量只看「当地这一条」的高度 f(x)，与已有面积 A(x) 无关——利滚利那是别的函数的故事。' },
        { t: '说不准——窄条上边是弯的，矩形近似靠不住', why: '弯没关系：折叠框里用一高一矮两个真矩形把窄条夹住，h → 0 时两者同奔 f(x)，「约」被夹逼兑现成了等号。可靠与否不靠感觉裁定，靠 ε-δ。' },
      ]"
      :answer="0"
    />

    <h2><span class="sec-no">叁</span>亲手扫一遍面积函数</h2>
    <p>
      上面这条 <MathInline tex="A' = f" /> 值不值得信，拖一次就知道。
      动画把两张图叠在一起：上图是曲线 f 和它被扫过的面积，下图就是面积函数 A 本身。
    </p>
    <FTCDemo />

    <h2><span class="sec-no">肆</span>严格定义：定理与它带来的计算革命</h2>
    <div class="definition">
      <div class="def-title">📐 微积分基本定理</div>
      <p>
        <strong>第一部分</strong>：若 f 连续，则面积函数
        <MathInline tex="A(x) = \int_a^x f(t)\,\mathrm{d}t" /> 可导，且
        <MathInline tex="A'(x) = f(x)" />。（换句话说，<strong>连续函数一定有原函数</strong>，
        而且现成就有一个——它自己的面积函数。）
      </p>
      <p>
        <strong>第二部分（牛顿–莱布尼茨公式）</strong>：若 F 是 f 的<strong>任意一个</strong>原函数（即
        <MathInline tex="F' = f" />），则
      </p>
      <MathBlock tex="\int_a^b f(x)\,\mathrm{d}x = F(b) - F(a)" />
    </div>
    <p>
      两部分之间有一道坎，值得当心：<strong>第一部分说的是那个特定的 A，
      第二部分说的却是随便哪个 F。</strong>凭什么随便找来的原函数，代两个端点一减，
      就等于那块面积？这道桥不搭上，这一讲的标题问题（"为什么求导的反操作恰好能算出面积"）
      就还没有被回答。
    </p>
    <RevealBox
      title="🔍 从第一部分到第二部分：那道桥只有三行，但少不得"
      label="对答案 / 看完整拆解"
    >
      <template #hint>
        先自己想：第一部分已经给了你一个原函数 A。现在手里又有一个别人的原函数 F。
        <strong>两个原函数之间能差多少？</strong>先算一算
        <MathInline tex="(F - A)'" /> 是什么，再想想"导数恒为零"能不能推出"函数是常数"
        ——这一步真的显然吗？想清楚再点开。
      </template>
      <p>
        <strong>第一步：A 也是原函数。</strong>由第一部分，
        <MathInline tex="A' = f" />。所以 A 和 F 是同一个 f 的两个原函数。
      </p>
      <p>
        <strong>第二步：两者只差一个常数。</strong>令 <MathInline tex="G = F - A" />，则
      </p>
      <MathBlock tex="G' = F' - A' = f - f = 0 \qquad \text{（处处为零）}" />
      <p>
        "导数恒为零 ⟹ 函数是常数"看着显然，其实<strong>要靠一条定理</strong>——
        <strong>拉格朗日中值定理</strong>：可导函数在任意两点间的平均变化率，
        总能被<em>某一点</em>的瞬时变化率取到。对任意 <MathInline tex="x_1 < x_2" />，
      </p>
      <MathBlock tex="G(x_2) - G(x_1) = G'(\xi)\,(x_2 - x_1) = 0 \cdot (x_2-x_1) = 0" />
      <p>
        任意两点的值都相等，所以 G 是常数。记作
        <MathInline tex="F(x) = A(x) + C" />。
        （为什么这一步不显然？因为"导数"只是逐点的局部信息，
        而"函数是常数"是整体结论——中值定理正是把局部信息搬运到整体的那台机器。）
      </p>
      <p>
        <strong>第三步：定出那个 C。</strong>代 <MathInline tex="x = a" />，用上
        <MathInline tex="A(a) = 0" />：
      </p>
      <MathBlock tex="F(a) = A(a) + C = C" />
      <p>
        <strong>第四步：收网。</strong>再代 <MathInline tex="x = b" /> 并相减：
      </p>
      <MathBlock tex="F(b) - F(a) = \bigl(A(b) + C\bigr) - C = A(b) = \int_a^b f(x)\,\mathrm{d}x" />
      <p>
        <strong>为什么"任意一个"原函数都合法？</strong>答案就在第四步：
        那个未知的常数 C <strong>在相减时被抵消掉了</strong>。换一个原函数只是换一个 C，
        而 C 从不出现在最终答案里。这也顺手解释了一个记号上的老困惑——
        不定积分要写 <MathInline tex="+\,C" />，定积分却完全不用管它，因为它注定要被减掉。
      </p>
    </RevealBox>
    <p>
      第二部分就是那台梦寐以求的通用机器：<strong>算面积不必再切条求和，
      只需逆向查一张求导表</strong>。回头看壹节那道题——想算
      <MathInline tex="\int_0^1 x^2\,\mathrm{d}x" />？谁的导数是
      <MathInline tex="x^2" />？—— <MathInline tex="x^3/3" />。代入两端：
      <MathInline tex="\frac{1}{3} - 0 = \frac{1}{3}" />。
      <strong>刚才那条求和公式加取极限的全部工作，被两秒钟取代了。</strong>
      这就是"积分表""不定积分技巧"存在的意义：它们都是在<strong>反查求导表</strong>。
    </p>
    <p>
      上一讲赊的另一笔账也能当场结清。血药浓度那个 AUC，切条挤了半天才挤出 50；
      现在只需反查：谁的导数是 <MathInline tex="C_0 e^{-kt}" />？求导表里有
      <MathInline tex="(e^{-kt})' = -k\,e^{-kt}" />，所以
      <MathInline tex="F(t) = -\tfrac{C_0}{k} e^{-kt}" /> 就是原函数。代两端：
      t = 0 时 <MathInline tex="e^{0}=1" />，t 拖到很久以后 <MathInline tex="e^{-kt}" /> 归零，于是
    </p>
    <MathBlock tex="\text{AUC} = F(\infty) - F(0) = 0 - \Bigl(-\frac{C_0}{k}\Bigr) = \frac{C_0}{k} = \frac{10}{0.2} = 50" />
    <p>
      与切条逼近的 49.9989 分毫不差。<strong>切条三百下，反查一行字</strong>——
      药理学家口袋里的 AUC 公式，全是这台机器批发的。
    </p>
    <QuizBox
      quiz-id="ftc-q2"
      question="基本定理说「连续函数都有原函数」。那 $e^{-x^2}$ 的原函数存在吗？写得出来吗？"
      hint="「存在」由谁保证？「写出来」又是指用什么写？这两件事是一回事吗？"
      :options="[
        { t: '存在（它的面积函数就是），但写不成初等函数——「存在」和「写得出」是两码事', why: '对。第一部分白送一个原函数 $A(x) = \\int_0^x e^{-t^2}\\,dt$——可导、导数恰是被积函数；但刘维尔在 1835 年证明了它不能用有限个初等符号拼出来。正态分布表只能数值造，查表查的就是这个「存在却写不出」的函数。' },
        { t: '不存在——要是存在，教科书早就印出来了', why: '存在性是定理白送的：$e^{-x^2}$ 连续，面积函数就是现成的原函数。教科书给不出的是它的「初等表达式」，不是原函数本身——书架上没有某人的照片，不等于此人不存在。' },
        { t: '存在而且总能写出来，只是换元、分部的技巧还没学到家', why: '不是技巧问题，是被证明了的不可能（刘维尔定理）：无论怎样组合初等函数，导数都不会恰好等于 $e^{-x^2}$。承认写不出，正是数值积分（数值分析第四讲）存在的理由。' },
      ]"
      :answer="0"
    />

    <h2><span class="sec-no">伍</span>买到了什么：更深远的馈赠</h2>

    <h3>没有 GPS 的潜艇怎么知道自己在哪：惯性导航</h3>
    <p>
      核潜艇一潜几个月，水下收不到 GPS，也不能上浮暴露行踪——可它必须时刻知道自己在哪。
      艇上能测的只有一样东西：<strong>加速度</strong>（惯性会把每一次加减速、转向如实压在传感器上）。
      要的却是<strong>位置</strong>。从"变化率"重建"总量"——这正是本讲这台机器的活，而且要连开两遍：
    </p>
    <MathBlock tex="a(t) \;\xrightarrow{\ \int\ }\; v(t) = v_0 + \int_0^t a \;\xrightarrow{\ \int\ }\; x(t) = x_0 + \int_0^t v" />
    <p>
      基本定理保证这两步累积是合法的、结果是唯一的——<strong>只要再交出两个初值</strong>
      （出发时的速度和位置，这正是原函数"一整族差个常数"在物理里的回声：
      不给初值，机器只能告诉你"走了多远"，不能告诉你"在哪"）。
      这套装置叫惯性导航，阿波罗飞船、洲际导弹、你手机里的计步器都是它的亲戚。
    </p>
    <p>
      <strong>但有一笔账躲不掉。</strong>传感器总有一点点系统性偏差（零偏）。
      设加速度计恒定多报 <MathInline tex="b = 0.01\ \text{m/s}^2" />（手机里那颗芯片的量级，
      约千分之一个重力加速度）——静止的艇会被算成在匀加速，误差按
      <MathInline tex="\tfrac12 b t^2" /> 增长：十分钟后偏 1.8 公里，
      <strong>一小时后偏 64.8 公里</strong>。这就是手机做不了惯导的原因：
      积分是台放大器，<strong>恒定的小错，积两次就按 t² 疯长</strong>。
      军用级陀螺与加速度计把零偏压小几个数量级——同一条公式，零偏小一万倍，
      一小时的漂移就从 64.8 公里缩到 6.5 米——但 t² 增长不饶人，
      所以核潜艇仍要定期用天文、地形或短暂上浮来校准，把积分的"常数"重新钉住。
    </p>
    <p>
      <strong>条件不成立会怎样？</strong>本讲的机器吃的是连续函数，而传感器每毫秒才吐一个数——
      工程上真正跑的是离散版的累积（数值积分），每一步都再添一份截断误差。
      误差怎么控制、步长怎么选，是<router-link to="/numerical/quadrature">数值分析第四讲</router-link>的正题；
      而"小误差被系统性放大"这出戏的血泪版——爱国者导弹 0.34 秒的时钟漂移——
      在<router-link to="/numerical/float-error">数值分析第一讲</router-link>等你。
    </p>

    <p>除了导航这件大事，这座桥还有几件更深远的馈赠：</p>
    <ul>
      <li>
        <strong>不定积分与定积分的和解</strong>：教科书先讲"不定积分 = 原函数族"，
        再讲"定积分 = 面积极限"，两者字面上风马牛不相及——是基本定理把它们焊在一起，
        所以才共用一个 ∫ 记号；
      </li>
      <li>
        <strong>制造新函数的工厂</strong>：有些函数的原函数不是初等函数，
        但基本定理第一部分保证"面积函数"总是存在且可导——于是数学家干脆用积分<em>定义</em>新函数。
        最经典的是对数：<MathInline tex="\ln x := \int_1^x \frac{1}{t}\,\mathrm{d}t" />。
        凭什么这样定出来的东西就是你认识的那个 ln？<strong>验一次它的看家本领即可</strong>——
        在 <MathInline tex="\int_1^{ab}" /> 的后半段 <MathInline tex="\int_a^{ab}" /> 里换元
        <MathInline tex="t = a u" />（于是 <MathInline tex="\mathrm{d}t = a\,\mathrm{d}u" />，
        <MathInline tex="\mathrm{d}t/t = \mathrm{d}u/u" />，上下限变成 1 到 b），立刻得到
        <MathInline tex="\ln(ab) = \ln a + \ln b" />。"把乘法变成加法"这条对数的灵魂，
        就这样从一个积分里长了出来；
      </li>
      <li>
        <strong>查表查的就是它</strong>：正态分布的分布函数
        <MathInline tex="\Phi(x) = \frac{1}{\sqrt{2\pi}}\int_{-\infty}^x e^{-t^2/2}\,\mathrm{d}t" />
        同样没有初等原函数，所以只能靠数值方法造表——
        <router-link to="/probability/distribution">概率论那一讲</router-link>翻的表，
        本质上是本讲第一部分开的工厂生产的；
      </li>
      <li>
        <strong>微分方程的总开关</strong>：知道变化率求原量，是"解微分方程"的最简形式。
        牛顿力学、电路方程、人口模型……整个用
        <router-link to="/mathphys/pde-intro">微分方程</router-link>描述世界的范式，
        都从这里出发（站内数理方程课就从这里接棒）；
      </li>
      <li>
        <strong>它还会长大</strong>：格林公式、斯托克斯公式、高斯散度定理（多元微积分），
        本质都是基本定理的高维推广——一句话概括就是
        <strong>"区域内部的累积 = 边界上的取值"</strong>。牛顿-莱布尼茨是一维版
        （内部导数的累积 = 两个端点之差），格林公式是二维版
        （内部旋转的累积 = 绕边界一圈）。
        <router-link to="/complex/cauchy-integral">复变函数的柯西积分定理</router-link>
        也是这个家族的成员——那一讲把格林公式的直觉讲得最细，
        而它的结论"解析函数绕回路积分为零"，正是这个家族在复平面上的分支。
      </li>
    </ul>
    <div class="insight">
      <div class="insight-title">🔗 这座桥往后通到哪：站内连一连</div>
      <p>
        <strong>数值分析</strong>：本定理只在"能找到原函数"时才省力，
        而绝大多数被积函数找不到——于是又得退回
        <router-link to="/calculus/integral">上一讲</router-link>的定义去逼近，
        这就是<router-link to="/numerical/quadrature">数值积分</router-link>那一讲的全部动机；
        <strong>下一讲</strong>：<router-link to="/calculus/taylor">泰勒展开</router-link>
        会给出另一条出路——既然多项式好积分，那就先把函数换成多项式；
        <strong>复变函数</strong>：把这里的"两个端点之差"换成"绕一圈的回路"，
        就得到<router-link to="/complex/cauchy-integral">柯西积分定理</router-link>，
        再往前一步就是"数几个点就出答案"的<router-link to="/complex/residue">留数定理</router-link>。
      </p>
    </div>
  </ConceptPage>
</template>
