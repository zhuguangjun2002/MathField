<script setup>
import ConceptPage from '../../components/ConceptPage.vue'
import MathBlock from '../../components/MathBlock.vue'
import MathInline from '../../components/MathInline.vue'
import RevealBox from '../../components/RevealBox.vue'
import QuizBox from '../../components/QuizBox.vue'
import CLTDemo from '../../demos/CLTDemo.vue'
</script>

<template>
  <ConceptPage slug="clt">
    <h2><span class="sec-no">壹</span>困境：算不动的组合数，合不拢的观测值</h2>
    <p>两条毫不相干的战线，被同一条曲线终结。</p>
    <p>
      <strong>战线一：赌桌上的算术灾难。</strong>掷 1000 次硬币，正面在 490 到 510 之间的概率是多少？
      按第 1 讲那套二项权重硬算，要对付 <MathInline tex="\binom{1000}{500}" />
      这种组合数——它写出来有三百位，手工时代这是不可能完成的任务。
      <strong>棣莫弗</strong>（流亡伦敦、靠给赌徒算牌谋生的法国胡格诺教徒）
      在 1733 年硬啃这个问题时，借一条阶乘的近似公式（"斯特林公式"，
      本讲只需知道它存在）打开缺口，算出二项分布的轮廓竟趋向一条光滑曲线
      （先看形状，别管系数——分母那个 <MathInline tex="\sqrt{2\pi}" /> 的出处肆节交代）：
    </p>
    <MathBlock tex="\varphi(z) = \frac{1}{\sqrt{2\pi}}\, e^{-z^2/2}" />
    <p>钟形曲线第一次现身，当时无人喝彩——它看起来只是个求近似的计算技巧。</p>
    <p>
      <strong>战线二：天文台的观测烦恼。</strong>翻开任何一本 18 世纪的观测记录册：
      同一颗星，十个晚上测出十个不同位置——仪器抖、大气晃、眼睛花。
      哪个是真的？该怎么合并？误差服从什么规律？天文学家为"误差曲线"提了各种候选，谁也说服不了谁。
    </p>
    <div class="story">
      <div class="story-title">📜 1809 — 1810 年 · 两条战线会师</div>
      <p>
        <strong>高斯</strong>在《天体运动论》里反推：若"取算术平均"是合并观测的最佳方案，
        误差必须服从 <MathInline tex="e^{-z^2/2}" /> 型分布——并据此奠定最小二乘法。
        几个月后<strong>拉普拉斯</strong>补上惊人的一环：他推广棣莫弗的结果证明，
        <strong>大量独立小误差之和，不管每个误差什么分布，总和都趋向这条曲线</strong>。
        赌桌的近似技巧与天文台的误差律，原是同一条定理的两张面孔。"正态分布"从此接管世界。
      </p>
    </div>

    <h2><span class="sec-no">贰</span>破局：放大 ε 带，看清涨落的形状</h2>
    <p>
      接着上一讲的剧情。大数定律说样本均值收敛进期望的 ε 带，但它是粗线条的——只说"进带"，
      不说带内长什么样。现在换上显微镜：涨落的典型尺寸是 <MathInline tex="\sigma/\sqrt{n}" />
      （<router-link to="/probability/lln">上一讲</router-link>刚算出
      <MathInline tex="\mathrm{Var}(\bar X_n) = \sigma^2/n" />，开个根号就是它），
      那就按这个尺度放大——
    </p>
    <MathBlock tex="Z_n = \frac{\bar{X}_n - \mu}{\sigma / \sqrt{n}}" />
    <p>
      减去 μ 是对准中心，除以 <MathInline tex="\sigma/\sqrt{n}" /> 是把镜头倍率调到涨落的量级
      （这个两步动作叫<strong>标准化</strong>：把任何随机量换算成"离中心几个典型涨落"的无量纲读数）。
      中心极限定理的断言是：这样放大之后，<strong>无论原料是什么分布</strong>，
      看到的形状都趋向同一条标准正态曲线。
    </p>
    <div class="insight">
      <div class="insight-title">💡 核心直觉：细节在叠加中互相抹平</div>
      <p>
        为什么万物归一？因为<strong>求和是一台粉碎细节的机器</strong>：把 n 个独立小随机量加起来，
        单个量的个性（偏斜——不对称、双峰——两座山头、离散——只取几个孤立值）在互相抵消中被磨掉，只有两个量存活下来——均值与方差。
        存活信息只有两个数，极限形状自然只有一种。正态分布不是大自然偏爱钟形，
        而是<strong>"由大量独立小因素叠加而成"这种出身</strong>的必然长相——身高、噪声、测量误差，全是这种出身。
      </p>
    </div>
    <QuizBox
      quiz-id="clt-q1"
      question="「世界上的数据大多是正态的」——中心极限定理是这么说的吗？到底是谁在趋向钟形？"
      hint="demo 里 n = 1 那一档，直方图长什么样？"
      :options="[
        { t: '不是。趋向钟形的是「大量独立小量的和（或均值）」；单个数据爱什么样就什么样', why: '对。骰子的分布永远是平的，收入分布是重尾的，都不会自己变正态。CLT 管的是求和这台机器的输出——demo 里 n = 1 档就是原料的本来面目，n 拖大后钟形才浮现。「正态无处不在」的正确解读是：由许多小因素叠加而成的量无处不在。' },
        { t: '是的，样本够多时，数据的直方图就会变成钟形', why: '把「样本多」和「求和的项多」混在一起了：多抽几个骰子点数，直方图只会越来越像那个平顶的原分布（这恰是大数定律式的频率稳定）。要看到钟形，得把若干个点数加起来当一个数据——变形发生在加法里，不在样本量里。' },
        { t: '是的，不然统计课怎么到处假设正态', why: '统计课的正态假设大多恰恰是借 CLT 撑腰的：检验统计量是均值型的量，所以近似正态——假设落在「和」上，不在原始数据上。把它读成「数据都正态」，正是误用检验的第一步。' },
      ]"
      :answer="0"
    />

    <h2><span class="sec-no">叁</span>亲手把歪原料平均成钟形</h2>
    <CLTDemo />

    <h2><span class="sec-no">肆</span>严格定义</h2>
    <div class="definition">
      <div class="def-title">📐 定理（中心极限定理，林德伯格-莱维形式）</div>
      <p>
        设 <MathInline tex="X_1, X_2, \dots" /> 独立同分布，期望 μ、方差 <MathInline tex="\sigma^2" /> 有限且非零。则对任意实数 z，
      </p>
      <MathBlock tex="\lim_{n \to \infty} P\!\left( \frac{\bar{X}_n - \mu}{\sigma/\sqrt{n}} \le z \right) = \Phi(z) = \int_{-\infty}^{z} \frac{1}{\sqrt{2\pi}} e^{-t^2/2}\, dt" />
    </div>
    <p>条款拆解：</p>
    <ul>
      <li>
        <strong>收敛的是分布函数</strong>：断言是"<MathInline tex="P(Z_n \le z) \to \Phi(z)" /> 对每个 z"——第三讲备好的分布函数语言
        在此正式上岗（术语叫"依分布收敛"，比大数定律的"依概率"更弱、也更普适）。
        大小写认清楚：小写 <MathInline tex="\varphi" /> 是壹节那条钟形<strong>密度</strong>，
        大写 <MathInline tex="\Phi" /> 是它的<strong>分布函数</strong>——曲线下从左端累积到 z 的面积，
        正是第三讲 f 与 F 的关系；
      </li>
      <li>
        <strong>方差有限不是废话</strong>：柯西分布——一个著名的"重尾"钉子户，
        尾巴厚到连期望都算不出来，长相用下面那行反函数法一行就能造——
        它的样本均值不管 n 多大<strong>都还是同一个柯西分布</strong>，永不变钟形。
        这可以当场验：用<router-link to="/probability/distribution">上一讲</router-link>的反函数法
        造柯西样本（<MathInline tex="\tan(\pi(U - 1/2))" />），
        各二十万次重复，看 <MathInline tex="|\bar X_n| > 1" /> 的频率：
        <MathInline tex="n = 1" /> 时 0.5003、<MathInline tex="n = 100" /> 时 0.5007、
        <MathInline tex="n = 10000" /> 时 0.4998——<strong>平均一万个，和只取一个一模一样</strong>
        （理论值恰好 0.5）。作为对照，方差有限的均匀分布同一个指标从 0.4997 一路掉到
        <MathInline tex="n = 100" /> 时的 0.0000。
        <strong>"细节被抹平"的前提是没有谁的嗓门无穷大</strong>——
        柯西的尾巴太重，任何时候都有一个样本大到能独自绑架整个平均值；
      </li>
      <li>
        <strong><MathInline tex="\sqrt{n}" /> 是唯一正确的倍率</strong>：除以 n（大数定律的镜头）涨落缩成一个点，除以 1 涨落炸到无穷——
        只有 <MathInline tex="\sqrt{n}" /> 尺度恰好让画面稳定成曲线。三个课程的极限概念在此各就各位：
        点（大数定律）、曲线（中心极限定理）、发散，全看镜头倍率；
      </li>
      <li>
        <strong>2π 从哪来</strong>：归一化常数来自 <MathInline tex="\int e^{-x^2} dx = \sqrt{\pi}" />。
        这个积分正是<router-link to="/calculus/ftc">基本定理讲</router-link>说的
        "原函数存在却写不出"那一族；妙在<strong>从负无穷到正无穷的总面积却能精确求出</strong>——
        经典技巧是升到二维换极坐标，两行漂亮账，站内暂未展开，此处当结论收下。
        密度里那个 <MathInline tex="\sqrt{2\pi}" />，就是拿它换元凑出来的"总面积必须等于 1"的量尺。
      </li>
    </ul>

    <p>
      定理为什么成立？现代标准证明用的是<strong>特征函数</strong>，
      而它短得出奇——<strong>三行</strong>，还顺带把"细节被抹平"那句直觉的机械原理
      一字不差地显示出来（你会亲眼看到三阶以上的信息是<strong>在哪一步</strong>死掉的）。
      <strong>预警</strong>：这个折叠框要动用复数指数 <MathInline tex="e^{itX}" />——
      欧拉公式的地盘，属于学习路径后面的<router-link to="/complex/imaginary">复变课</router-link>。
      还没读过的话<strong>整块跳过，不影响本讲其余内容</strong>；读过的会看到一场漂亮的会师：
    </p>
    <RevealBox
      title="🔍 三行证明中心极限定理，并看清细节究竟死在哪一步"
      label="对答案 / 看完整拆解"
    >
      <template #hint>
        先自己想：想比较两个随机变量的分布，直接比密度很难
        （卷积一层层套）。可如果给每个分布配一个<strong>函数</strong>作为它的"指纹"，
        而且这个指纹有"<strong>独立变量相加 ⟹ 指纹相乘</strong>"的好性质，
        那么"n 个相加"就变成了"指纹的 n 次方"——加法难题变成乘法。
        什么函数能做到？（提示：<MathInline tex="e^{a+b} = e^a e^b" />。）
      </template>
      <p>
        <strong>第零步：指纹是什么。</strong>定义
        <MathInline tex="\varphi_X(t) = E[e^{itX}]" />，叫<strong>特征函数</strong>。
        它的关键性质只有一条：X、Y 独立时
      </p>
      <MathBlock tex="\varphi_{X+Y}(t) = E\bigl[e^{it(X+Y)}\bigr] = E\bigl[e^{itX}\bigr]E\bigl[e^{itY}\bigr] = \varphi_X(t)\,\varphi_Y(t)" />
      <p>
        （中间那一步正是独立性——独立随机变量的乘积期望等于期望的乘积。）
        <strong>加法变成了乘法</strong>，这就是全部动机。
        <MathInline tex="e^{itX}" /> 里的虚指数是
        <router-link to="/complex/imaginary">复变第 1 讲</router-link>的欧拉公式，
        而"把一个分布换成它的指纹"这个动作，
        换个名字就是<router-link to="/mathphys/heat">傅里叶变换</router-link>——
        本讲和数理方程在这里用的是同一件工具。
      </p>
      <p>
        <strong>第一行：把单个变量的指纹展开到二阶。</strong>
        先标准化，令 <MathInline tex="Y_i = (X_i - \mu)/\sigma" />，
        于是 <MathInline tex="E[Y] = 0" />、<MathInline tex="E[Y^2] = 1" />。
        把 <MathInline tex="e^{itY}" /> 按 t 泰勒展开再取期望：
      </p>
      <MathBlock tex="\begin{aligned} \varphi_Y(t) &= E\Bigl[1 + itY + \tfrac{(it)^2Y^2}{2} + \cdots\Bigr] \\ &= 1 + it\underbrace{E[Y]}_{=\,0} - \frac{t^2}{2}\underbrace{E[Y^2]}_{=\,1} + o(t^2) \;=\; 1 - \frac{t^2}{2} + o(t^2) \end{aligned}" />
      <p>
        <strong>看清这一行：分布的全部个性都在那些高阶项里</strong>
        （三阶矩管偏斜、四阶矩管尖峰），可它们全被打包进了
        <MathInline tex="o(t^2)" />（这个记号<router-link to="/calculus/derivative">导数讲</router-link>
        定义过：除以 <MathInline tex="t^2" /> 后仍趋于零的尾巴）。
        <strong>活到台面上的只有 0 和 1 两个数。</strong>
      </p>
      <p>
        <strong>第二行：n 个相加，指纹取 n 次方。</strong>
        <MathInline tex="Z_n = \frac{1}{\sqrt n}\sum_{i=1}^n Y_i" />，
        每个 <MathInline tex="Y_i" /> 的指纹在 <MathInline tex="t/\sqrt n" /> 处取值：
      </p>
      <MathBlock tex="\varphi_{Z_n}(t) = \Bigl[\varphi_Y\Bigl(\frac{t}{\sqrt n}\Bigr)\Bigr]^n = \Bigl[1 - \frac{t^2}{2n} + o\Bigl(\frac1n\Bigr)\Bigr]^n" />
      <p>
        <strong>细节就死在这里。</strong>三阶项本来是
        <MathInline tex="t^3/\sqrt n^{\,3} = t^3 n^{-3/2}" />，
        乘上 n 次方带来的因子 n 之后仍是 <MathInline tex="n^{-1/2} \to 0" />；
        而二阶项 <MathInline tex="t^2/(2n)" /> 乘 n 恰好<strong>不多不少地活下来</strong>。
        <strong><MathInline tex="\sqrt n" /> 这个倍率的全部意义就在这儿</strong>：
        它是唯一能让二阶项存活、三阶以上全灭的缩放。
        除以 n 的话二阶项也死光（塌成一个点，那是大数定律）；
        不除的话二阶项炸到无穷。
      </p>
      <p>
        <strong>第三行：取极限。</strong>用微积分里最熟的那条
        <MathInline tex="(1 + x/n)^n \to e^x" />：
      </p>
      <MathBlock tex="\varphi_{Z_n}(t) \;\longrightarrow\; e^{-t^2/2}" />
      <p>
        而 <MathInline tex="e^{-t^2/2}" /> 正是标准正态分布的特征函数
        （正态的指纹还是个正态形状，这是它独有的自恋性质）。
        指纹相同则分布相同，<strong>证毕</strong>。
      </p>
      <p>
        <strong>回味：这条证明把"为什么万物归一"讲成了一句机械的话。</strong>
        原料分布的信息全在它的各阶矩里，而
        <MathInline tex="\sqrt n" /> 缩放 + n 次方这台机器
        <strong>只放行前两阶，其余一律碾碎</strong>。
        既然幸存信息只有均值和方差两个数，极限形状当然只有一种。
        这也顺带解释了动画里那件事：<strong>原料越偏（三阶矩越大），
        需要越大的 n 才能把它压下去</strong>——
        教科书那句"n ≥ 30 即可"说的是三阶项已经小到看不出来，
        而不是它真的等于零。
      </p>
    </RevealBox>
    <QuizBox
      quiz-id="clt-q2"
      question="教科书说「n ≥ 30 就可以用正态近似」。这个 30 是定理给的门槛吗？"
      hint="定理的结论里有没有出现任何具体的 n？"
      :options="[
        { t: '不是——定理只说 n → ∞；30 是条经验法则，原料越偏，需要的 n 越大', why: '对。收敛速度由被打包进 o(t²) 的三阶项决定：对称的均匀分布 n = 5 就很钟形，重偏的分布 n = 100 还拖着尾巴（demo 可直接对比）。30 只是「常见分布到这就看不出差别」的行业默契——而柯西分布 n 取多大都没用，方差有限这条前提比 30 重要得多。' },
        { t: '是——30 是推导出来的临界值，过了它定理开始生效', why: '定理的表述里根本没有 30 这个数：结论是极限式，对一切 n 只字未提「多大算够」。任何有限门槛都推不出来，因为不同原料的收敛速度天差地别——「临界值」是把经验口诀误当成了定理条款。' },
        { t: '差不多——反正超过 30 就绝对安全了', why: '重偏或重尾的原料在 n = 30 时误差还大得很，做显著性检验足以翻车；而对称轻尾的原料 n = 10 已绰绰有余。「安全」取决于原料的偏斜程度和你要的精度，不取决于某个一刀切的数——这正是折叠框末尾那句话的分量。' },
      ]"
      :answer="0"
    />

    <h2><span class="sec-no">伍</span>买到了什么：全课收官，三门课会师</h2>

    <h3>民调的"±3 个百分点"：那个 3 是算出来的</h3>
    <p>
      每逢大选，新闻里必有一句"本次调查样本 1000 人，
      抽样误差 ±3 个百分点，置信水平 95%"。
      这三个数不是行业惯例，是<strong>本讲的公式直接算出来的</strong>，
      而且算完你会顺带明白一件几乎所有人都想错的事。
    </p>
    <p>
      <strong>先算那个 3。</strong>问 n 个人支持谁，每人的回答是 0 或 1，
      支持率的真值记作 p。单个回答的方差是 <MathInline tex="p(1-p)" />
      （<router-link to="/probability/lln">上一讲</router-link>保险那段刚推过的 0-1 变量方差），
      最大值在 <MathInline tex="p = 0.5" /> 时取到 0.25（民调机构一律按最坏情况估）。
      样本比例的标准差按本讲的 <MathInline tex="\sigma/\sqrt n" />：
    </p>
    <MathBlock tex="\frac{\sigma}{\sqrt n} = \frac{0.5}{\sqrt{1000}} \approx 1.58\% \quad\Longrightarrow\quad \pm 1.96\,\frac{\sigma}{\sqrt n} \approx \pm 3.10\%" />
    <p>
      <strong>那个 ±3 就是这么来的</strong>，而 1.96 是标准正态的 97.5% 分位数
      （<router-link to="/probability/distribution">上一讲</router-link>见过），
      对应"95% 置信"。注意整条推理<strong>只用到 CLT</strong>：
      投票意向不是正态分布（它只有 0 和 1 两个值），
      可一千个 0-1 加起来除以 1000，<strong>就是钟形</strong>。
    </p>
    <p>
      <strong>再看误差条随 n 怎么变——这是决定调查预算的那张表：</strong>
    </p>
    <MathBlock tex="\begin{array}{c|ccccc} n & 100 & 400 & 1000 & 4000 & 10000 \\ \hline \pm\ \text{百分点} & 9.80 & 4.90 & 3.10 & 1.55 & 0.98 \end{array}" />
    <p>
      <strong>要把误差减半，样本量必须翻四倍</strong>（因为分母是
      <MathInline tex="\sqrt n" />）。从 ±3% 做到 ±1% 要 9604 人，
      做到 ±0.5% 要 38415 人——成本涨了近四十倍，精度只提高六倍。
      <strong>1000 这个数字是"够用"与"太贵"之间的拐点</strong>，
      不是什么神秘传统。
    </p>
    <div class="insight">
      <div class="insight-title">💡 那件几乎所有人都想错的事：误差跟总人口<strong>无关</strong></div>
      <p>
        "调查全国要 1000 人，那调查一个县是不是几十人就够了？
        调查全世界是不是得几百万？"——<strong>都不对</strong>。
        上面那个公式里<strong>压根没有总体大小 N</strong>。
        严格说来有限总体要乘一个修正因子
        <MathInline tex="\sqrt{(N-n)/(N-1)}" />（来自"不放回抽样"的方差公式，
        抽样理论的标准结果，此处直接引用；要点只有一条——n 远小于 N 时它几乎就是 1），代进去看看：
      </p>
      <MathBlock tex="\begin{array}{c|ccc} \text{总体 } N & 10^4 & 10^6 & 1.4\times10^9 \\ \hline \text{误差条} & \pm2.94\% & \pm3.10\% & \pm3.10\% \end{array}" />
      <p>
        <strong>总人口从一万涨到十四亿，误差条纹丝不动。</strong>
        （总体小到与样本可比时反而更准，因为你抽走的是其中相当大一块。）
        直觉上很难接受，但道理不难：<strong>你尝汤咸不咸，
        跟锅有多大没关系，只跟你舀了多少勺、以及汤搅匀了没有有关</strong>。
        "搅匀"就是随机抽样——而它才是真正致命的那个前提。
      </p>
    </div>
    <div class="story">
      <div class="story-title">📜 1936 年 · 二百四十万份问卷，输给了五万份</div>
      <p>
        美国《文学文摘》杂志此前四届大选预测全中，1936 年它寄出一千万份问卷，
        收回 <strong>240 万份</strong>——史上最大规模的民调之一，
        预测共和党的兰登将以 57% 大胜。
        结果罗斯福赢了 46 个州中的 46 个，兰登的真实得票约 <strong>36.5%</strong>。
        <strong>偏了大约 20 个百分点。</strong>
      </p>
      <p>
        用本讲的公式算一下 240 万份问卷"应该"有多准：
        <MathInline tex="1.96 \times 0.5/\sqrt{2.4\times10^6} \approx \pm 0.06" /> 个百分点。
        <strong>实际偏差是理论误差条的三百多倍。</strong>
        与此同时，刚出道的<strong>盖洛普</strong>只用了约 5 万份样本，预测正确，
        一战成名；《文学文摘》则在两年后关门。
      </p>
      <p>
        错在哪儿？名单。他们的问卷寄给电话簿、汽车登记册和自家订户——
        在 1936 年的美国，这些都是<strong>富裕阶层</strong>的名录，
        而那一届恰好是穷人与富人投票倾向严重分裂的一届。
        再加上愿意回寄问卷的人本身就偏向对现状不满的一方。
      </p>
    </div>
    <p>
      <strong>这个故事是本讲最重要的一条注脚。</strong>
      中心极限定理保证的是<strong>随机</strong>抽样的涨落形状，
      它对"抽样有系统偏差"这件事<strong>一个字都没说</strong>。
      而误差条只统计前者。所以：
    </p>
    <MathBlock tex="\underbrace{\pm 0.06\%}_{\text{公式算的抽样误差}} \quad \text{vs.} \quad \underbrace{20\%}_{\text{名单选错造成的偏差}}" />
    <p>
      <strong>样本量再大，也救不了一个歪掉的名单</strong>——
      更糟的是，样本量越大，那个 ±0.06% 越小，
      <strong>报告看上去越可信</strong>。
      这不是历史故事：今天的网络问卷、App 内评分、社交媒体舆情，
      面对的是同一个陷阱，而且名单歪得更隐蔽。
      <strong>本讲教你算误差条，也请你记住误差条没在算什么。</strong>
    </p>
    <QuizBox
      quiz-id="clt-q3"
      question="「样本 240 万人，误差 ±0.06%」——1936 年这句报告错在哪？"
      hint="那个 ±0.06% 是用什么假设算出来的？名单满足这个假设吗？"
      :options="[
        { t: '±0.06% 只统计「随机抽样的涨落」；名单系统性偏向富裕阶层，这份偏差公式碰都没碰', why: '对。CLT 的前提是随机抽样，误差条量的只是运气造成的抖动；名单歪了属于系统偏差，样本再大也不缩小——实际偏了 20 个百分点，是误差条的三百多倍。更阴险的是样本越大误差条越小，报告反而显得越可信。' },
        { t: '错在样本还不够大，再多收些问卷就准了', why: '方向全反：按公式 240 万份对应 ±0.06%，「够大」得不能再够。问题在名单本身歪——从歪名单里抽样，抽多少都是歪的平均值。五万份的盖洛普赢了两百四十万份的文摘，赢在名单不在数量。' },
        { t: '错在没乘有限总体修正因子', why: '那枚因子在 n 远小于 N 时几乎等于 1，对结论毫无影响（美国选民几千万，240 万还算小样本）。把 20 个百分点的塌方归给一个万分位级的修正项，量级差了三个数量级。' },
      ]"
      :answer="0"
    />

    <h3>还买到了什么</h3>
    <ul>
      <li>
        <strong>不止民调</strong>：几乎所有实验科学的显著性检验，引擎都是这条定理——
        药物试验的疗效、A/B 测试的转化率、物理实验的置信区间，
        用的都是"把涨落除以 <MathInline tex="\sigma/\sqrt n" /> 再查正态表"这一套；
      </li>
      <li>
        <strong>最小二乘的正当性</strong>（与站内线代第 1 讲谷神星一节会师，读过的自然认得）：
        误差正态时，"挑误差平方和最小的答案"就是最合理的参数估计——高斯当年正是这样论证的；
        解它的方程组是<router-link to="/linear-algebra/elimination">消元法</router-link>的日常工作，
        病态时的救法在<router-link to="/numerical/linear-system">数值分析第 5 讲</router-link>；
      </li>
      <li>
        <strong>逼近哲学的对照</strong>（微积分会师）：<router-link to="/calculus/taylor">泰勒展开</router-link>
        用多项式冒充函数，靠的是"局部信息足够多"；
        中心极限定理用正态冒充分布，靠的是"个体信息足够少"。一个放大细节、一个抹平细节，
        棣莫弗当年恰好是用前者（斯特林/泰勒式渐近）证出了后者；
      </li>
      <li>
        <strong>通往下一门课的桥</strong>：上面那个折叠框里的特征函数
        <MathInline tex="E[e^{itX}]" /> 就是分布的<router-link to="/mathphys/heat">傅里叶变换</router-link>，
        e 的虚指数出自<router-link to="/complex/imaginary">复变第 1 讲</router-link>；
        而从特征函数<strong>反推回密度</strong>要靠围道积分，
        那是<router-link to="/complex/residue">复变第 4 讲</router-link>那台收割机的活。
        另一头，<router-link to="/mathphys/heat">热传导方程</router-link>的基本解恰是方差随时间增长的正态密度——
        扩散就是无数分子随机碰撞的中心极限定理
        （<router-link to="/mathphys/pde-intro">数学物理方程</router-link>见）。
        钟形曲线是几门课共同的路标。
      </li>
    </ul>
    <div class="insight">
      <div class="insight-title">🔗 课程总结：三次收敛，三种强度</div>
      <p>
        这门课的主线是把"运气"逐层驯服：<router-link to="/probability/points-problem">古典概型</router-link><strong>数</strong>出概率，
        <router-link to="/probability/bayes">条件概率</router-link>让概率<strong>更新</strong>，
        <router-link to="/probability/distribution">分布函数</router-link>让概率<strong>连续化</strong>，
        <router-link to="/probability/lln">大数定律</router-link>让频率<strong>兑现</strong>概率，
        中心极限定理给涨落<strong>定形</strong>。三种收敛（依概率、以概率 1、依分布）强度不同、分工明确，
        全都建立在<router-link to="/calculus/limit">微积分的极限</router-link>地基上——
        概率论不是一门孤立的课，它是极限理论在不确定世界的殖民地。
      </p>
    </div>
  </ConceptPage>
</template>
