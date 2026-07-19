<script setup>
import ConceptPage from '../../components/ConceptPage.vue'
import MathBlock from '../../components/MathBlock.vue'
import MathInline from '../../components/MathInline.vue'
import CancellationDemo from '../../demos/CancellationDemo.vue'
</script>

<template>
  <ConceptPage slug="float-error">
    <h2><span class="sec-no">壹</span>困境：一枚导弹、一次坠机，都栽在小数点后第几位</h2>
    <p>
      1991 年海湾战争，一枚爱国者导弹没能拦住来袭的飞毛腿，28 名美军士兵丧生。事后调查发现的元凶
      荒诞得可怕：系统用<strong>浮点数</strong>记录开机时间，每 0.1 秒累积一次，可 0.1 在二进制里是个
      <strong>无限循环小数</strong>——就像 1/3 写成十进制永远除不尽。连续运行 100 小时后，累积的舍入误差
      让计时偏了约 0.34 秒，足够让高速飞行的目标错过拦截窗口。
    </p>
    <p>
      你可能觉得这是老古董的毛病。那么打开任何一门语言的控制台，输入 <MathInline tex="0.1 + 0.2" />：
    </p>
    <div class="story">
      <div class="story-title">🖥 亲手一试</div>
      <p>
        <code>&gt;&gt;&gt; 0.1 + 0.2</code><br />
        <code>0.30000000000000004</code>
      </p>
      <p>
        不是 Bug，是所有现代计算机的<strong>标准行为</strong>。0.1、0.2、0.3 这几个人类眼里再干净不过的数，
        在二进制浮点里全都存不准，一相加，误差就从第 17 位探出头来。这不是某台机器坏了——
        这是<strong>用有限位数表示无限精度</strong>这件事的宿命。数值分析的第一课，就是认清你脚下的地板本身是有缝的。
      </p>
    </div>

    <h2><span class="sec-no">贰</span>破局：认清两种误差，和那个专门吃掉有效数字的陷阱</h2>
    <p>
      计算机存的不是实数，是<strong>浮点数</strong>——本质是二进制版的科学计数法：
      <MathInline tex="\pm\, 1.d_1d_2\cdots d_{52} \times 2^{e}" />。尾数只有有限位（双精度 52 位），
      所以每个实数落进机器时都要就近"归档"到最近的浮点数上，产生一次<strong>舍入</strong>：
    </p>
    <MathBlock tex="\text{fl}(x) = x\,(1+\delta), \qquad |\delta| \le \varepsilon_{\text{mach}} = 2^{-52} \approx 2.2\times 10^{-16}" />
    <p>
      这个 <MathInline tex="\varepsilon_{\text{mach}}" /> 叫<strong>机器精度</strong>，是"计算机能分辨的最小相对差距"，
      对应大约 16 位十进制有效数字。数值计算里的误差就两个来源：
    </p>
    <ul>
      <li><strong>舍入误差</strong>：存不准、算不准，每一步都掉一点渣（就是上面的 δ）；</li>
      <li>
        <strong>截断误差</strong>：算法本身是"无限过程截成有限步"留下的（下节的泰勒近似、后面各讲的迭代与求和都属此类）——
        这是"该算的没算完"，与机器精度无关。
      </li>
    </ul>
    <div class="insight">
      <div class="insight-title">💡 核心直觉：真正的杀手不是误差本身，是"相近数相减"</div>
      <p>
        单个 δ 只有 <MathInline tex="10^{-16}" /> 那么小，看着人畜无害。可有一种操作能把它瞬间放大成灾难——
        <strong>两个几乎相等的数相减</strong>。设 <MathInline tex="a=1.234567890123456" />、
        <MathInline tex="b=1.234567890123001" />，各自有 16 位有效数字；相减得
        <MathInline tex="a-b=0.000000000000455" />——只剩<strong>3 位</strong>有效数字，前面 13 位全在相减中湮灭了，
        而末尾那几位本就是被 δ 污染过的垃圾。这叫<strong>灾难性抵消（catastrophic cancellation）</strong>：
        不是算错了，是"相减"这个动作把好数字吃掉、把坏数字顶到了台前。下面这个动画，让你亲眼看着一台好端端的机器算崩。
      </p>
    </div>

    <h2><span class="sec-no">叁</span>看着 float64 当场算崩</h2>
    <CancellationDemo />

    <h2><span class="sec-no">肆</span>严格定义</h2>
    <div class="definition">
      <div class="def-title">📐 浮点数系、机器精度与灾难性抵消</div>
      <p>
        <strong>浮点数系</strong> <MathInline tex="\mathbb{F}" /> 是形如
        <MathInline tex="\pm (1.b_1\cdots b_t)_2 \times 2^{e}" />（<MathInline tex="e_{\min}\le e\le e_{\max}" />）的有限数集。
        舍入映射 <MathInline tex="\text{fl}:\mathbb{R}\to\mathbb{F}" /> 取最近的浮点数，满足
        <MathInline tex="\text{fl}(x)=x(1+\delta),\ |\delta|\le u" />，其中<strong>单位舍入</strong>
        <MathInline tex="u=\tfrac12\,2^{1-t}" />（双精度 <MathInline tex="t=52" />，<MathInline tex="u\approx 1.1\times10^{-16}" />）。
      </p>
      <p>
        四则运算满足 <strong>fl 模型</strong>：<MathInline tex="\text{fl}(x\circ y)=(x\circ y)(1+\delta)" />。
        单步误差虽小，但对减法 <MathInline tex="x-y" />，其<strong>相对</strong>误差界含因子
        <MathInline tex="\dfrac{|x|+|y|}{|x-y|}" />——当 <MathInline tex="x\approx y" /> 时该因子爆炸，
        即<strong>灾难性抵消</strong>。
      </p>
    </div>
    <p>逐词读这个定义，能读出三条实战规矩：</p>
    <ul>
      <li>
        <strong>误差是相对的，不是绝对的</strong>：机器保的是"有效数字位数"，不是"小数点后几位"。
        算 <MathInline tex="10^{20}" /> 时，能表示的最近浮点数之间隔着上万，别指望精确到个位；
      </li>
      <li>
        <strong>浮点数不是均匀分布的</strong>：越靠近 0 越密、越远越疏（因为那个 <MathInline tex="\times 2^e" />）。
        所以判断两个浮点数是否相等要用相对容差，绝不能写 <code>if (a == b)</code>；
      </li>
      <li>
        <strong>抵消因子藏在分母里</strong>：只要式子里出现"大减大得小"，就该警惕，并想办法用代数恒等式改写掉那个减法
        （动画里 <MathInline tex="1-\cos x" /> 改写成 <MathInline tex="2\sin^2\tfrac{x}{2}" /> 就是范例）。
      </li>
    </ul>

    <h2><span class="sec-no">伍</span>买到了什么：一副能预判翻车的眼睛</h2>
    <ul>
      <li>
        <strong>会改写公式了</strong>：最经典的例子是求根公式。当 <MathInline tex="b^2\gg 4ac" /> 时，
        <MathInline tex="\tfrac{-b+\sqrt{b^2-4ac}}{2a}" /> 里 <MathInline tex="-b" /> 与 <MathInline tex="\sqrt{\cdots}" />
        灾难性抵消；改用等价的 <MathInline tex="\tfrac{2c}{-b-\sqrt{b^2-4ac}}" /> 就避开了。同一个根，两种写法，精度差几个数量级；
      </li>
      <li>
        <strong>会控制求和顺序了</strong>：把一亿个小数相加，从小到大加、或用<strong>Kahan 补偿求和</strong>，
        能把累积舍入压下去——爱国者导弹的悲剧本质就是求和策略没做对；
      </li>
      <li>
        <strong>历史注脚</strong>：1994 年 Intel 奔腾芯片的 FDIV 除法 Bug 让公司召回损失约 4.75 亿美元；
        1996 年阿丽亚娜 5 号火箭因一次浮点转整型溢出，发射 37 秒后自毁。浮点从来不是小事。
        1985 年<strong>卡亨</strong>主持的 IEEE 754 标准统一了全世界的浮点行为，他为此获图灵奖；
      </li>
    </ul>
    <div class="insight">
      <div class="insight-title">🔗 与你学过 / 将学的课程连一连</div>
      <p>
        <strong>微积分</strong>：截断误差的鼻祖就是泰勒余项——凡是"取前几项、丢掉尾巴"的近似（下一讲的牛顿法、
        第四讲的求积公式），误差分析用的都是泰勒展开这台引擎；<strong>概率论</strong>：海量运算里的舍入误差常被建模为
        独立随机扰动，累积误差的量级用<em>随机游走</em>估计（<MathInline tex="\sqrt{n}" /> 而非 <MathInline tex="n" />）——
        这正是中心极限定理的地盘；<strong>本课后续</strong>：这一讲的舍入误差看似渺小，可到了
        <router-link to="/numerical/linear-system">第五讲</router-link>会遇到"条件数"这个放大器——
        病态问题能把 <MathInline tex="10^{-16}" /> 的小误差顶成答案前几位的错误。全课首尾，就用这条误差链串起来。
      </p>
    </div>
  </ConceptPage>
</template>
