<script setup>
import ConceptPage from '../../components/ConceptPage.vue'
import MathBlock from '../../components/MathBlock.vue'
import MathInline from '../../components/MathInline.vue'
import RevealBox from '../../components/RevealBox.vue'
import QuizBox from '../../components/QuizBox.vue'
import WeierstrassDemo from '../../demos/WeierstrassDemo.vue'
</script>

<template>
  <ConceptPage slug="rigor">
    <h2><span class="sec-no">壹</span>困境：一个主教说，你们算的东西根本讲不通</h2>
    <p>
      到这一讲为止，这门课已经用微积分算了很多东西：速度、面积、级数、方程、梯度。
      每一次都算对了。<strong>可有一件事一直被含糊过去</strong>——
      <router-link to="/calculus/limit">第一讲</router-link>提过它的名字，
      <router-link to="/calculus/extremum">费马那一讲</router-link>又撞见一次：
    </p>
    <div class="story">
      <div class="story-title">📜 1734 年 · 《分析学家：致一位不信神的数学家》</div>
      <p>
        作者是<strong>贝克莱主教</strong>，爱尔兰哲学家。副标题里那位"不信神的数学家"
        一般认为指的是天文学家哈雷——据说他曾嘲笑宗教教义不可理喻。
        贝克莱的还击很聪明：<strong>他不谈神学，他去查数学家自己的账。</strong>
      </p>
      <p>
        牛顿算 <MathInline tex="x^2" /> 的流数时是这么做的：让 x 增加一个"瞬" o，
        得 <MathInline tex="(x+o)^2 - x^2 = 2xo + o^2" />，<strong>除以 o</strong> 得
        <MathInline tex="2x + o" />，然后<strong>把 o 扔掉</strong>，答案 <MathInline tex="2x" />。
      </p>
      <p>
        贝克莱指出：<strong>第一步除以 o，要求 o ≠ 0；最后一步扔掉 o，等于说 o = 0。
        同一个量在同一段推理里，先是非零、后是零。</strong>他写下了数学史上最著名的挖苦：
      </p>
      <p style="padding-left: 1.2em; border-left: 3px solid var(--accent)">
        <em>"这些消失的量究竟是什么？它们既不是有限量，也不是无穷小量，更不是零。
        难道我们不能把它们称为<strong>逝去量的幽灵</strong>吗？"</em>
      </p>
      <p>
        更狠的是他接下来那句：他承认这套方法<strong>给出的结果是对的</strong>，
        但那是因为<strong>"两个错误互相抵消"</strong>。
        <strong>所以真正的问题不是"答案对不对"，而是"凭什么对"。</strong>
      </p>
    </div>
    <div class="insight">
      <div class="insight-title">💡 困境的确切形状：能用，但说不清</div>
      <p>
        此后<strong>一百多年</strong>，微积分处在一种奇特的状态：
        <strong>它是当时最有力的工具，也是逻辑上最站不住的工具。</strong>
        欧拉这样的巨匠照用不误，还敢写下
        <MathInline tex="1-1+1-1+\cdots = \tfrac12" /> 这种今天看来毫无意义的式子
        （<router-link to="/calculus/series">级数那一讲</router-link>已经说清为什么它不成立）。
        当时的辩护词大意是"结果经得起检验"——<strong>这是工程师的标准，不是数学家的。</strong>
      </p>
      <p>
        <strong>要还清这笔债，得回答三个问题</strong>，而且每一个都比看上去难：
      </p>
      <ul>
        <li><strong>①</strong> "无限接近"到底是什么意思？（不能再用"越来越近"这种文学描述）</li>
        <li><strong>②</strong> 实数是什么？（"数轴上没有洞"——凭什么？）</li>
        <li>
          <strong>③</strong> 我们凭直觉相信的那些事，真的成立吗？——比如
          <strong>"连续的曲线总该在大部分地方有切线"</strong>。
          <strong>这一条的答案，会是本讲最大的意外。</strong>
        </li>
      </ul>
    </div>

    <h2><span class="sec-no">贰</span>破局：三代人，三步，把地基重浇一遍</h2>
    <h3>第一步：柯西（1821）——把"无穷小"降格为"趋于零的变量"</h3>
    <p>
      柯西在《分析教程》里做了一个关键的手术：<strong>不再把无穷小当成一种神秘的"数"</strong>
      （既非零又比任何正数小），而是把它定义成<strong>一个趋于零的变量</strong>。
      于是 <MathInline tex="\mathrm{d}y/\mathrm{d}x" /> 不是两个幽灵相除，
      而是一个<strong>差商的极限</strong>。他还用极限定义了连续、收敛与积分。
      <strong>贝克莱的诘难被绕开了：从头到尾没有任何量既是零又不是零。</strong>
    </p>
    <p>
      但柯西的"极限"仍靠文字描述：<em>"当同一变量逐次取的值无限接近一个固定值，
      最终与之相差任意小时……"</em>——<strong>"无限接近""任意小"仍然是形容词。</strong>
    </p>
    <h3>第二步：魏尔斯特拉斯（1860 年代）——把形容词换成不等式</h3>
    <p>
      解决办法就是<router-link to="/calculus/limit">第一讲</router-link>那套
      <MathInline tex="\varepsilon" />–<MathInline tex="\delta" /> 语言：
    </p>
    <MathBlock tex="\forall \varepsilon>0,\ \exists \delta>0,\ \ 0<|x-a|<\delta \Rightarrow |f(x)-L|<\varepsilon" />
    <p>
      <strong>整句话里没有一个动词表示"运动"</strong>——没有"趋近"、没有"最终"、没有时间。
      只有两个量词和两个不等式。<strong>"无限接近"被彻底翻译成了有限的、可检验的语言</strong>，
      这就是第一讲那场"你出 ε、我答 δ"攻防的历史来历。
    </p>
    <h3>第三步：戴德金与康托尔（1872）——先把实数造出来</h3>
    <p>
      还剩最后一个漏洞：上面那套语言里的 <MathInline tex="\varepsilon,\delta" /> 是<em>实数</em>，
      可实数是什么？<router-link to="/calculus/limit">第一讲</router-link>算 e 时用过
      "单调有界必收敛"，<router-link to="/calculus/extremum">中值定理那一讲</router-link>
      用过"闭区间上连续函数取得到最值"——<strong>这两条都依赖"数轴没有洞"</strong>，
      而这件事在有理数世界里<strong>是假的</strong>（<MathInline tex="\sqrt2" /> 那个位置就是个洞）。
    </p>
    <p>
      1872 年，戴德金用"<strong>分割</strong>"、康托尔用"<strong>基本列</strong>"，
      各自从有理数出发把实数<strong>构造</strong>了出来，
      完备性从此是<em>定理</em>而非信念。<strong>至此，从自然数到微积分的整条链子，
      每一环都有了交代。</strong>（同一年，魏尔斯特拉斯扔出了下面那个炸弹。）
    </p>
    <QuizBox
      quiz-id="rigor-q1"
      question="贝克莱说牛顿的方法「两个错误互相抵消」。按今天的眼光，牛顿的推理错在哪一步？"
      hint="$(x+o)^2-x^2=2xo+o^2$，除以 o 得 $2x+o$，再扔掉 o。这两步各自要求 o 是什么？"
      :options="[
        { t: '两步对 o 的要求自相矛盾：除法要求 o≠0，扔掉要求 o=0。正确做法是把「扔掉」换成「取极限」，全程 o≠0', why: '对。极限的定义从不代入 o=0，它问的是「o 缩小途中 2x+o 停向哪里」。所以现代写法里 0/0 从未发生——第二讲和第一讲反复强调的正是这一点。' },
        { t: '错在 $(x+o)^2$ 的展开，应该用二项式定理的完整形式', why: '展开完全正确，$2xo+o^2$ 一项不多一项不少。贝克莱质疑的不是代数，是逻辑：同一个 o 前后被赋予了矛盾的身份。' },
        { t: '没有错，因为 o 是无穷小，无穷小本来就可以忽略', why: '这正是被质疑的说法——「无穷小」在当时没有定义，「可以忽略」也没有标准。柯西之后的答案是：不存在这样的数，只有<b>趋于零的变量</b>和<b>极限</b>。' },
      ]"
      :answer="0"
    />

    <h2><span class="sec-no">叁</span>亲眼看一条永远不肯变直的曲线</h2>
    <p>
      1872 年，魏尔斯特拉斯给出了一个让整个数学界不安的例子：
      一个<strong>处处连续、却处处不可导</strong>的函数。
    </p>
    <MathBlock tex="W(x) = \sum_{n=0}^{\infty} a^{\,n}\cos\bigl(b^{\,n}\pi x\bigr), \qquad 0\lt a\lt 1,\ b \text{ 为奇整数},\ ab\gt 1+\tfrac{3\pi}{2}" />
    <p>
      它画得出来、连得上、没有断点也没有尖角——<strong>可它在每一点上都没有切线</strong>。
      当时的主流意见是"这种怪物不该被允许存在"（埃尔米特称之为"令人痛心的疫病"）。
    </p>
    <p>
      为什么难以置信？因为<router-link to="/calculus/derivative">第二讲</router-link>给过一个
      朴素的图像：<strong>可导 = 放大之后越来越像直线</strong>。
      下面的动画就拿这条标准去量：读数区的
      <strong>"偏离 ÷ 窗宽"</strong> 趋于 0，才算"放大后变直"。
      抛物线一放大就乖乖变直；<strong>W 不但不变直，这个比值反而一路涨上去</strong>。
    </p>
    <WeierstrassDemo />

    <h2><span class="sec-no">肆</span>严格定义：连续与可导，差着一整个世界</h2>
    <div class="definition">
      <div class="def-title">📐 连续与可导（并列着看）</div>
      <p>
        <strong>连续</strong>：<MathInline tex="\forall\varepsilon>0,\ \exists\delta>0,\ |x-a|<\delta\Rightarrow|f(x)-f(a)|<\varepsilon" />
        ——<em>输入变一点点，输出也只变一点点</em>。
      </p>
      <p>
        <strong>可导</strong>：极限
        <MathInline tex="\lim_{h\to0}\frac{f(a+h)-f(a)}{h}" /> 存在
        ——<em>输出的变化量，与输入的变化量成正比（差一个高阶小量）</em>。
      </p>
    </div>
    <p>
      两者的关系，本讲之前只知道半句：<strong>可导 ⇒ 连续</strong>
      （证明一行：<MathInline tex="f(a+h)-f(a) = \frac{f(a+h)-f(a)}{h}\cdot h \to f'(a)\cdot 0 = 0" />）。
      反过来呢？<router-link to="/calculus/derivative">第二讲</router-link>给过
      <MathInline tex="|x|" />：连续但在 0 处不可导——<strong>一个坏点</strong>。
      于是很自然会猜：<em>坏点总是零零星星的，连续函数大体上还是可导的。</em>
    </p>
    <p>
      <strong>魏尔斯特拉斯的函数把这个猜想彻底打死了：坏点可以是全部。</strong>
      而且这不是孤例——20 世纪的结果更狠：<strong>在"所有连续函数"这个空间里，
      可导的那些反而是极其罕见的例外</strong>（巴拿赫 1931：
      "几乎所有"连续函数都处处不可导）。
      <strong>我们的直觉恰好把普遍与例外搞反了。</strong>
    </p>
    <RevealBox title="🔍 为什么它不可导：两个尺度在打架" label="对答案 / 看完整拆解">
      <template #hint>
        想估计差商 <MathInline tex="\frac{W(x+h)-W(x)}{h}" />。
        级数里第 n 项是 <MathInline tex="a^n\cos(b^n\pi x)" />：
        它的<strong>振幅</strong>是 <MathInline tex="a^n" />（越来越小），
        <strong>波长</strong>是 <MathInline tex="2/b^n" />（越来越短）。
        对给定的 h，想一想哪些项还"来得及"完成一次振荡。
      </template>
      <p>
        <strong>第一步：把项分成两类。</strong>取 <MathInline tex="h \approx b^{-N}" />。
        对 <MathInline tex="n<N" /> 的项（低频、长波），在 h 这么短的一段里它几乎是直的，
        贡献一个有限的斜率；对 <MathInline tex="n\ge N" /> 的项（高频），
        它在 h 内已经振荡了整整一个周期以上。
      </p>
      <p>
        <strong>第二步：看第 N 项贡献的差商。</strong>它的振幅是
        <MathInline tex="a^N" />，而它在长度 h 内走完一次振荡，所以差商量级是
      </p>
      <MathBlock tex="\frac{a^{N}}{h} \approx \frac{a^{N}}{b^{-N}} = (ab)^{N}" />
      <p>
        <strong>条件 <MathInline tex="ab>1" /> 在这里兑现</strong>：
        <MathInline tex="(ab)^N \to \infty" />。也就是说，
        <strong>h 每缩小一档，就有一个更高频的项跳出来，
        贡献一个更大的差商</strong>——差商不收敛，导数不存在。
        （原文那个更强的条件 <MathInline tex="ab\gt 1+\frac{3\pi}{2}" />
        是为了保证低频项的贡献压不住这个爆炸。）
      </p>
      <p>
        <strong>第三步：与动画对账。</strong>demo 里量的
        "偏离 ÷ 窗宽"正是这个差商的量级。理论预言它按
        <MathInline tex="h^{-(1-\alpha)}" /> 发散，其中
        <MathInline tex="\alpha=\ln(1/a)/\ln b = \ln2/\ln13 = 0.27" />；
        换算成"每放大十倍涨多少"是 <MathInline tex="10^{0.73}\approx 5.4" /> 倍。
        <strong>动画实测的 1.42 → 11.8 → 41.9 → 354，正是这个节奏。</strong>
      </p>
      <p>
        <strong>回味：连续与可导的差别，说到底是"尺度"的差别。</strong>
        连续只要求"h 小 ⇒ 变化小"；可导要求"变化<em>正比于</em> h"。
        <MathInline tex="W" /> 的变化量约是 <MathInline tex="h^{0.27}" />——
        它确实随 h 变小（所以连续），但<strong>小得远不够快</strong>（所以不可导）。
        这个指数 0.27 后来有了名字，叫<strong>赫尔德指数</strong>，
        也直接关联到伍节要讲的<strong>分形维数</strong>。
      </p>
    </RevealBox>
    <QuizBox
      quiz-id="rigor-q2"
      question="「连续」和「可导」之间到底差了什么？"
      hint="两个定义都在说「输入变一点，输出变一点」。差别在「变多少」这句话的精确程度上。"
      :options="[
        { t: '连续只要求「h 小则变化小」，可导还要求「变化正比于 h」——$W$ 的变化约是 $h^{0.27}$，够连续但不够可导', why: '对。这就是为什么 $W$ 这种怪物存在：它把「变化随 h 缩小」和「变化与 h 成正比」这两件事拆开了。可导比连续强得多，强到在所有连续函数里都算稀罕。' },
        { t: '没差多少：连续函数最多在有限个点不可导', why: '这正是 1872 年被打死的直觉。$W$ 处处连续、<b>处处</b>不可导；巴拿赫 1931 更进一步：在合适的意义下，「几乎所有」连续函数都是这样。' },
        { t: '可导是几何性质（有切线），连续是代数性质，两者不可比', why: '两者是同一套 ε–δ 语言下的两个条件，完全可比：可导严格强于连续（可导 ⇒ 连续，反之不然）。「有切线」也不是几何专属，它就是差商极限存在的几何说法。' },
      ]"
      :answer="0"
    />

    <h2><span class="sec-no">伍</span>买到了什么：怪物后来成了主力</h2>

    <h3>英国的海岸线有多长：一个"没有答案"的问题</h3>
    <p>
      <strong>画面。</strong>1967 年，曼德博在《科学》上发表了一篇标题古怪的短文：
      <em>《英国的海岸线有多长？》</em>。他注意到一件被所有人忽略的事：
      <strong>不同国家的百科全书给出的同一段边界长度，能差出百分之二十</strong>。
      不是有人测错了——<strong>是这个问题本身就没有唯一答案。</strong>
    </p>
    <p>
      <strong>为什么绕道本讲。</strong>用长为 <MathInline tex="\epsilon" /> 的尺子
      去量海岸线，得到的总长是 <MathInline tex="L(\epsilon)" />。
      对一条<router-link to="/calculus/arc-length">可求长的光滑曲线</router-link>，
      尺子越短，测得的长度<strong>收敛到一个定值</strong>——那才是"弧长"。
      可实测的海岸线不是这样：
    </p>
    <MathBlock tex="L(\epsilon) \approx K\,\epsilon^{\,1-D}, \qquad D>1" />
    <p>
      <strong>尺子越短，量出来越长，而且没有上限。</strong>
      理查森测得英国西海岸的 <MathInline tex="D\approx 1.25" />，
      挪威峡湾约 1.52，南非较平直的海岸约 1.05。
      这个 D 就是<strong>分形维数</strong>：它不是 1（曲线）也不是 2（面），
      而是卡在中间——<strong>正如魏尔斯特拉斯函数卡在"连续"与"可导"之间</strong>。
      （事实上 <MathInline tex="W" /> 的图像本身就是分形，
      它的维数是 <MathInline tex="2-\alpha = 1.73" />。）
    </p>
    <p>
      <strong>读出物理。</strong>把尺子从 100 公里换成 1 公里（缩小 100 倍），
      测得的英国西海岸长度会涨到
      <MathInline tex="100^{\,0.25}=3.16" /> 倍。<strong>这解释了那 20% 的分歧</strong>：
      两国的地图比例尺不同而已。
      <strong>所以正确的说法不是"海岸线长 X 公里"，而是"在 ε 尺度下长 X 公里"</strong>——
      <router-link to="/calculus/arc-length">弧长那一讲</router-link>里
      "所有内接折线长度的上确界"，在这里<strong>等于无穷</strong>，
      而定义早就为这种情况留了位置：<strong>它不可求长。</strong>
    </p>
    <p>
      <strong>条件不成立会怎样——反过来说才对：这里是"光滑"这个条件不成立。</strong>
      现实世界里<strong>不光滑才是常态</strong>：山脉的剖面、云的边缘、
      肺里的支气管分叉、血管网络、闪电的路径、股价曲线、
      <router-link to="/probability/clt">布朗运动</router-link>的轨迹——
      <strong>它们全都是"处处连续、处处不可导"的</strong>。
      1900 年前后被视为病态的怪物，一百年后成了描述自然的标准工具。
    </p>
    <p>
      而这件事对本课有个直接的后果：<strong>金融模型里不能对股价路径求导</strong>。
      布朗运动的路径在每一点都没有切线，
      <MathInline tex="\mathrm{d}S/\mathrm{d}t" /> 根本不存在。
      于是 20 世纪重造了一套微积分——<strong>伊藤积分</strong>（1944），
      它的核心修正项 <MathInline tex="\tfrac12\sigma^2 S^2 f''" />
      正是因为 <MathInline tex="(\mathrm{d}W)^2 = \mathrm{d}t" /> 而不是
      <MathInline tex="o(\mathrm{d}t)" />——<strong>本课里被反复"扔掉"的那个二阶小量，
      在不可导的世界里扔不得了</strong>。布莱克-舒尔斯期权定价公式就建在它上面。
    </p>
    <div class="insight">
      <div class="insight-title">🔗 这一讲回望与前瞻：站内连一连</div>
      <p>
        <strong>回望</strong>：<router-link to="/calculus/limit">第一讲</router-link>的
        ε–δ 与实数完备性、<router-link to="/calculus/derivative">第二讲</router-link>的
        "放大后像直线"、<router-link to="/calculus/series">级数那一讲</router-link>的
        黎曼重排、<router-link to="/calculus/arc-length">弧长那一讲</router-link>的
        "不可求长曲线"——<strong>本讲是它们共同的地基与共同的边界</strong>；
        <strong>数值分析</strong>：<router-link to="/numerical/float-error">浮点误差</router-link>
        那一讲说"h 取太小反而更不准"，是同一件事在计算机里的版本——
        <strong>理想的极限与可执行的算法，中间永远隔着一层</strong>；
        <strong>概率论</strong>：布朗运动是<router-link to="/probability/clt">中心极限定理</router-link>
        的连续版，而它的路径正是本讲这种怪物；
        <strong>复变函数</strong>：有趣的反差——把导数搬到复数上，
        <router-link to="/complex/holomorphic">复可导</router-link>反而苛刻到
        "一次可导就无穷次可导"。<strong>实数轴上遍地怪物，复平面上却是天堂。</strong>
      </p>
    </div>
  </ConceptPage>
</template>
