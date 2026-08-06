<script setup>
import ConceptPage from '../../components/ConceptPage.vue'
import MathBlock from '../../components/MathBlock.vue'
import MathInline from '../../components/MathInline.vue'
import RevealBox from '../../components/RevealBox.vue'
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
      那个 0.34 秒不是估的，是<strong>可以一步步算出来的</strong>——
      而且算完你会明白一件更要紧的事：<strong>这套系统在短部署里一直工作正常</strong>，
      它的失效是被"连续开机时长"这个谁也没在意的变量慢慢喂大的：
    </p>
    <RevealBox
      title="🔍 把爱国者那 0.34 秒一步步算出来"
      label="对答案 / 看完整拆解"
    >
      <template #hint>
        先自己动笔：把 1/10 写成二进制小数（做法和十进制长除法一样，
        只是每次乘 2 而不是乘 10，取整数部分当作那一位）。
        算前十位就够了——你会看到什么？
        再想：如果寄存器只存得下有限位，每一次"加 0.1"会差多少？
        这个差在一百小时里会被加多少次？
      </template>
      <p>
        <strong>第一步：1/10 在二进制里除不尽。</strong>
      </p>
      <MathBlock tex="\tfrac{1}{10} = 0.0001100110011001100110011\ldots_{(2)}" />
      <p>
        从第二位起 <strong>0011 无限循环</strong>——就像 1/3 在十进制里是 0.333…。
        原因很简单：十进制下分母只含因子 2 和 5 的分数才除得尽，
        <strong>二进制下只有分母是 2 的幂的才行</strong>，而 10 = 2×5 里那个 5 是过不去的坎。
        所以"0.1"这个人类眼里最干净的数，<strong>在任何二进制机器里都存不准</strong>，
        这跟寄存器多长没关系——加长只是把误差推后几位。
      </p>
      <p>
        <strong>第二步：截断一次，差多少。</strong>爱国者用的是定点寄存器，
        把这个无限循环小数<strong>砍掉</strong>（不是四舍五入，是直接砍）。
        按当年调查报告（GAO，1992）给出的数，每记一次 0.1 秒会少算
      </p>
      <MathBlock tex="\delta \approx 9.5367 \times 10^{-8}\ \text{秒}" />
      <p>
        一亿分之一秒。<strong>单看这个数，没有任何人会担心。</strong>
      </p>
      <p>
        <strong>第三步：乘以次数。</strong>要命的地方在于这个误差<strong>不抵消</strong>——
        砍断永远朝同一个方向，所以它是<strong>线性累积</strong>的，
        每 0.1 秒攒一份。开机时间越长，攒得越多：
      </p>
      <MathBlock tex="\begin{array}{c|ccc} \text{连续开机} & \text{计时偏差} & \text{目标位移误差} \\ \hline 1\ \text{小时} & 0.0034\ \text{秒} & 6\ \text{米} \\ 8\ \text{小时} & 0.0275\ \text{秒} & 46\ \text{米} \\ 20\ \text{小时} & 0.0687\ \text{秒} & 115\ \text{米} \\ 100\ \text{小时} & \mathbf{0.3433}\ \text{秒} & \mathbf{575}\ \text{米} \end{array}" />
      <p>
        （最后一列按飞毛腿飞行速度约 1676 米/秒折算——雷达按错误的时刻去预测目标位置，
        算出的落点就偏这么远，早已飞出了拦截窗口。）
      </p>
      <p>
        <strong>第四步：读这张表，才读懂这次事故。</strong>
        开机 8 小时时偏差只有 46 米，在拦截窗口之内——
        <strong>系统在演习和短期部署里从来没出过问题</strong>，
        测试也测不出来。出事那个连队已经<strong>连续开机约 100 小时</strong>。
        换句话说，这个 bug 的触发条件不是"输入了什么"，
        而是"你已经开了多久"——<strong>一个在任何单次测试里都不会出现的变量</strong>。
      </p>
      <p>
        <strong>回味：整件事没有一步是"算错了"。</strong>
        每一次运算都精确到硬件规格允许的最好水平，
        错的是<strong>系统设计者默认"很小的误差一直很小"</strong>。
        本讲要装进你脑子里的正是这句话的反面：
        <strong>误差会不会长大，取决于它被怎样反复使用</strong>——
        这条线索会一路贯穿到<router-link to="/numerical/linear-system">第 5 讲</router-link>的条件数。
      </p>
    </RevealBox>
    <p>
      你可能觉得这是老古董的毛病。那么打开任何一门语言的控制台，输入
      <MathInline tex="0.1 + 0.2" />：
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

    <h2><span class="sec-no">叁</span>亲眼看着 float64 当场算崩</h2>
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

    <h3>三个必须绕开浮点的地方：收银台、开放世界、神经网络</h3>
    <p>
      本讲的结论听着像"小心点就好"，其实它在工程上是<strong>硬约束</strong>：
      有些场合根本不能用浮点，有些场合必须换个用法。三个例子，
      分别来自你的钱包、你玩的游戏和你用的 AI，数字全部现算。
    </p>
    <p>
      <strong>一、钱不能用浮点存。</strong>这是 <MathInline tex="0.1 + 0.2 \ne 0.3" /> 最直接的后果。
      一分钱在浮点里存不准，而账目要求<strong>分毫不差</strong>——
      不是"误差小到可以忽略"，是<strong>必须精确相等</strong>，否则对账对不平。
      试着把一分钱加一千万次：
    </p>
    <MathBlock tex="\underbrace{0.01 + 0.01 + \cdots + 0.01}_{10^7\ \text{次}} = 99999.999986 \quad (\text{真值 } 100000)" />
    <p>
      差了一分四厘。金额不大，但<strong>它是"错"而不是"约等于"</strong>——
      任何一家银行的日终对账都会因此报警。
      所以金融系统的通行做法是：<strong>金额一律用整数存"分"</strong>（或用十进制定点类型），
      整数加减法没有舍入，多少笔都精确。
      你在数据库里见到的 <code>DECIMAL(18,2)</code>、
      在代码里见到的"以分为单位的 int64"，都是本讲这条结论的产物。
    </p>
    <p>
      <strong>二、开放世界游戏为什么要"浮动原点"。</strong>
      第肆节说过浮点数<strong>不是均匀分布的</strong>：越远离 0 越稀疏。
      这句话在游戏里有个非常具体的后果。游戏引擎的坐标普遍用 float32（尾数 23 位），
      相邻两个可表示数的间距是 <MathInline tex="2^{\,e-23}" />，随坐标指数增长：
    </p>
    <MathBlock tex="\begin{array}{c|c} \text{距原点} & \text{相邻两个 float32 之间的距离} \\ \hline 1\ \text{公里} & 0.06\ \text{毫米} \\ 100\ \text{公里} & 7.8\ \text{毫米} \\ 1000\ \text{公里} & 6.3\ \text{厘米} \\ 1\ \text{万公里} & \mathbf{1\ \text{米}} \end{array}" />
    <p>
      <strong>在离原点一万公里处，float32 能分辨的最小位移是整整一米。</strong>
      角色的位置只能落在一米一格的栅格上，物理引擎每帧算出的微小位移直接被舍掉，
      画面就开始<strong>抖动、穿模、镜头发癫</strong>——这就是老玩家熟悉的"远离出生点会抖"。
      解法不是提高精度（float64 太慢且到处都要改），
      而是<strong>把原点搬到玩家脚下</strong>：玩家永远在坐标 0 附近，
      每走出一定距离就把整个世界平移回来。
      <strong>浮点数在 0 附近最密，那就一直待在 0 附近</strong>——
      这个叫"浮动原点"的技术，整条思路就是本讲那句"越靠近 0 越密"。
    </p>
    <p>
      <strong>三、神经网络反其道而行：故意用更差的浮点。</strong>
      前两个例子是躲开浮点的坑，这个例子是<strong>主动跳进去</strong>。
      深度学习训练大量使用 float16 甚至 bfloat16：
    </p>
    <MathBlock tex="\begin{array}{c|cc} & \text{尾数位数} & \varepsilon_{\text{mach}} \\ \hline \text{float64} & 52 & 2.2\times10^{-16} \\ \text{float32} & 23 & 1.2\times10^{-7} \\ \text{float16} & 10 & 9.8\times10^{-4} \\ \text{bfloat16} & 7 & 7.8\times10^{-3} \end{array}" />
    <p>
      bfloat16 只有<strong>两位多十进制有效数字</strong>——按本讲的标准这简直不能叫计算。
      可它能用，原因在于<strong>梯度下降本身是一个容错的过程</strong>：
      每一步只要方向大致对，走错一点下一步会纠回来，
      误差不像爱国者那样单向累积。而换来的是显存减半、算得快几倍。
      <strong>但坑还在原地</strong>：float16 能表示的最小正规数约
      <MathInline tex="6.1\times10^{-5}" />，比它更小的梯度会直接变成 0（下溢），
      那一层就再也学不动了。工程上的对策叫<strong>损失缩放</strong>——
      先把损失乘上一个大数（比如 1024）再反向传播，
      让梯度抬进 float16 表示得了的区间，更新参数前再除回去。
      <strong>这个操作的全部理由，就是本讲第肆节那句"浮点数越靠近 0 越密、但密到某处就没有了"。</strong>
    </p>
    <div class="insight">
      <div class="insight-title">💡 三个例子，一条共同的判断准则</div>
      <p>
        什么时候必须防浮点、什么时候可以放心用？把三个例子并排看，规律很清楚：
        <strong>看误差会不会单向累积，以及结果是否要求精确相等</strong>。
      </p>
      <p>
        钱：要求精确相等 ⟹ <strong>不能用</strong>，改整数。
        坐标：不要求精确，但精度随位置系统性退化 ⟹ <strong>能用，但要控制取值范围</strong>。
        梯度：不要求精确，误差随机且会被后续步骤纠正 ⟹ <strong>能用，甚至可以更粗</strong>。
        爱国者：不要求精确，可误差<strong>单向累积且没有任何环节纠正它</strong> ⟹ 灾难。
      </p>
      <p>
        <strong>所以真正该问的从来不是"误差有多大"，而是"这个误差接下来会被怎么对待"</strong>——
        是被摊平、被纠正，还是被一遍遍加起来、被放大。
        这句话就是整门数值分析的主线，
        下面各讲无非是在不同场合把它算清楚。
      </p>
    </div>

    <h3>还买到了什么</h3>
    <ul>
      <li>
        <strong>会改写公式了</strong>：最经典的例子是求根公式。当 <MathInline tex="b^2\gg 4ac" /> 时，
        <MathInline tex="\tfrac{-b+\sqrt{b^2-4ac}}{2a}" /> 里 <MathInline tex="-b" /> 与
        <MathInline tex="\sqrt{\cdots}" /> 几乎相等，相减即灾难性抵消；
        分子分母同乘 <MathInline tex="(-b-\sqrt{\cdots})" /> 改写成等价的
        <MathInline tex="\tfrac{2c}{-b-\sqrt{b^2-4ac}}" />，加法就代替了减法。
        <strong>拿 float64 实测一次</strong>（取 <MathInline tex="a=1,\ b=10^8,\ c=1" />，
        真值约 <MathInline tex="-1.0000\times10^{-8}" />）：
        朴素写法给出 <MathInline tex="-7.4506\times10^{-9}" />，
        <strong>相对误差 25%——第一位有效数字就错了</strong>；
        改写后给出 <MathInline tex="-1.0000\times10^{-8}" />，相对误差
        <MathInline tex="1.6\times10^{-16}" />。
        <strong>同一个根、同一台机器、同样的输入，一个 16 位准，一个 0 位准</strong>；
      </li>
      <li>
        <strong>会控制求和顺序了</strong>：把一亿个小数相加，naive 地从头加到尾，
        后面那些小数会被越来越大的部分和"吃掉"（大数加小数时，小数的低位直接被舍掉）。
        对策一是<strong>从小到大加</strong>，让量级相近的数先合并；
        对策二是 <strong>Kahan 补偿求和</strong>——用一个额外变量专门记住每次被舍掉的那点渣，
        下一轮再补回去，几乎不增加成本却能把累积误差压回单步量级。
        壹节那枚爱国者的账，本质就是"同一个方向的舍入被加了三百六十万次"没人补偿；
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
        <strong>微积分</strong>：截断误差的鼻祖就是<router-link to="/calculus/taylor">泰勒余项</router-link>——
        凡是"取前几项、丢掉尾巴"的近似（<router-link to="/numerical/root-finding">下一讲</router-link>的牛顿法、
        <router-link to="/numerical/quadrature">第 4 讲</router-link>的求积公式），
        误差分析用的都是泰勒展开这台引擎；
        <strong>概率论</strong>：海量运算里的舍入误差常被建模为独立随机扰动，
        累积误差的量级按 <MathInline tex="\sqrt{n}" /> 而非 <MathInline tex="n" /> 增长——
        这正是<router-link to="/probability/clt">中心极限定理</router-link>的地盘，
        也正说明爱国者那次为什么格外糟糕：<strong>它的舍入是单向砍断而非随机四舍五入</strong>，
        误差老老实实按 n 线性长，一点抵消都没有；<strong>本课后续</strong>：这一讲的舍入误差看似渺小，可到了
        <router-link to="/numerical/linear-system">第五讲</router-link>会遇到"条件数"这个放大器——
        病态问题能把 <MathInline tex="10^{-16}" /> 的小误差顶成答案前几位的错误。全课首尾，就用这条误差链串起来。
      </p>
    </div>
  </ConceptPage>
</template>
