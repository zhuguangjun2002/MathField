<script setup>
import ConceptPage from '../../components/ConceptPage.vue'
import MathBlock from '../../components/MathBlock.vue'
import MathInline from '../../components/MathInline.vue'
import RevealBox from '../../components/RevealBox.vue'
import LLNDemo from '../../demos/LLNDemo.vue'
</script>

<template>
  <ConceptPage slug="lln">
    <h2><span class="sec-no">壹</span>困境：概率是算出来的，世界认不认账</h2>
    <p>
      前三讲的概率全是<strong>算</strong>出来的：数结局、缩样本空间、量面积。但赌徒和保险商关心的是另一件事：
      这些纸上的数字，和真实世界掷出来的骰子<strong>对得上吗</strong>？
      人人都"感觉"骰子掷得越多，六点的频率越靠近 1/6——可"感觉"不是数学。
      而且这个说法本身就可疑：第 1000 次和第 1 次一样，谁也不欠谁——<strong>凭什么次数一多就必须收敛？</strong>
    </p>
    <div class="story">
      <div class="story-title">📜 1713 年 · 磨了二十年的定理</div>
      <p>
        瑞士巴塞尔的<strong>雅各布·伯努利</strong>把这个问题磨了二十年，临终未及出版，
        遗著《猜度术》由侄子整理，1713 年面世。他把那条"人人都感觉对"的经验，
        证明成了一条定理——史上第一个<strong>大数定律</strong>。伯努利自己深知其分量，
        称之为"黄金定理"：有了它，概率论才走得出赌场——观测频率可以代替未知概率，
        于是死亡率表、保险费、司法误判率都成了可计算之物。<strong>统计学在这一页出生。</strong>
      </p>
    </div>
    <p>
      但在证明它之前得先回答：频率该收敛到的那个"靶心"用什么公式写？
      这就轮到 1657 年惠更斯那本小册子出场了。
    </p>

    <h2><span class="sec-no">贰</span>破局：先立靶心（期望），再证命中（大数定律）</h2>
    <p>
      <strong>靶心：期望。</strong>惠更斯问：一张彩票 1/2 概率赢 100、1/2 概率赢空，公平价格几何？
      答案是各结果按概率加权平均：<MathInline tex="100 \times \tfrac12 + 0 \times \tfrac12 = 50" />。
      他称之为"赌局的价值"，今天叫<strong>数学期望</strong>。注意它是<strong>先验的重心</strong>，
      不是承诺——单次抽奖你永远拿不到 50。期望说的是：如果这场赌局"值"一个数，只能是这个数。
    </p>
    <div class="insight">
      <div class="insight-title">💡 核心直觉：ε-N 攻防的随机变奏</div>
      <p>
        "频率趋于概率"怎么严格化？照搬极限定义会翻车：理论上存在次次都掷出 6 的邪门序列，
        "必然收敛"这句话根本许不出口。
      </p>
      <p>
        伯努利的修正很精妙——他不许诺必然，只许诺<strong>概率</strong>。
        你先开出精度 ε 和把握要求（比如 99.99%），他还你一个 N：掷够 N 次，
        均值落进期望 ±ε 的<strong>概率</strong>就超过你要的把握。
        极限讲的那场 ε-N 攻防在这里原样上演，只是"保证达标"退让成"以任意高的把握达标"。
        对一切实际用途，这已经够了。
      </p>
    </div>
    <p>
      直觉上为什么次数多了会稳？因为<strong>涨落互相抵消</strong>：单次骰子的偏差可达 ±2.5，
      但 n 次平均的方差是单次的 1/n（独立性在此发力）——偏差的典型尺寸按
      <MathInline tex="1/\sqrt{n}" /> 缩小。
    </p>
    <p>
      "切比雪夫用三行不等式把这个直觉变成了证明"——<strong>这三行值得看</strong>，
      因为整个大数定律的严格性全压在它身上，而它用到的技巧
      <strong>只有"把一部分非负的东西扔掉"</strong>，一个高深工具都没有：
    </p>
    <RevealBox
      title="🔍 切比雪夫的三行，以及大数定律怎么从它掉出来"
      label="对答案 / 看完整拆解"
    >
      <template #hint>
        先自己动笔：方差 <MathInline tex="\sigma^2 = \int (x-\mu)^2 f(x)\,dx" />
        是对<strong>整条实轴</strong>积的，而被积式处处非负。
        如果我只在"离 μ 远于 ε"的那部分区域上积，结果会变大还是变小？
        再想想：在那片区域上，<MathInline tex="(x-\mu)^2" /> 至少有多大？
      </template>
      <p>
        <strong>第一行：只留远处，扔掉近处。</strong>
        被积式非负，所以缩小积分区域只会让结果变小：
      </p>
      <MathBlock tex="\sigma^2 = \int_{-\infty}^{\infty} (x-\mu)^2 f(x)\,dx \;\ge\; \int_{|x-\mu| \ge \varepsilon} (x-\mu)^2 f(x)\,dx" />
      <p>
        <strong>第二行：在剩下的区域里，把 <MathInline tex="(x-\mu)^2" /> 换成它的下界。</strong>
        那片区域上处处有 <MathInline tex="|x-\mu| \ge \varepsilon" />，
        所以 <MathInline tex="(x-\mu)^2 \ge \varepsilon^2" />，换掉只会更小：
      </p>
      <MathBlock tex="\int_{|x-\mu| \ge \varepsilon} (x-\mu)^2 f\,dx \;\ge\; \varepsilon^2 \int_{|x-\mu| \ge \varepsilon} f\,dx \;=\; \varepsilon^2\, P\bigl(|X-\mu| \ge \varepsilon\bigr)" />
      <p>
        最后那个等号是本讲上一讲的家当：<strong>密度在一片区域上的积分就是落在那里的概率</strong>。
      </p>
      <p><strong>第三行：把两头接起来，移项。</strong></p>
      <MathBlock tex="P\bigl(|X - \mu| \ge \varepsilon\bigr) \;\le\; \frac{\sigma^2}{\varepsilon^2}" />
      <p>
        这就是<strong>切比雪夫不等式</strong>。它说的是一件很朴素的事：
        <strong>方差小，就不可能经常离期望很远</strong>——而且这句话
        <strong>对任何分布都成立</strong>，不需要知道它长什么样，
        这正是它的价值所在（代价是相当保守，下面就会看到）。
      </p>
      <p>
        <strong>第四步：大数定律白送。</strong>先算样本均值的方差。
        独立变量的方差可加，而常数提出求和号要平方：
      </p>
      <MathBlock tex="\mathrm{Var}(\bar X_n) = \mathrm{Var}\Bigl(\frac1n\sum_{i=1}^n X_i\Bigr) = \frac{1}{n^2}\sum_{i=1}^n \mathrm{Var}(X_i) = \frac{1}{n^2}\cdot n\sigma^2 = \frac{\sigma^2}{n}" />
      <p>
        <strong>这一行就是"涨落互相抵消"的全部数学内容</strong>：
        分母的 <MathInline tex="n^2" /> 来自"除以 n 再平方"，
        分子的 n 来自"n 个方差相加"，一除只剩 <MathInline tex="1/n" />。
        （请留意<strong>独立性正是在"方差可加"这一步用掉的</strong>——
        不独立时会多出协方差项，这一步就塌了。）
        把 <MathInline tex="\bar X_n" /> 代进切比雪夫：
      </p>
      <MathBlock tex="P\bigl(|\bar X_n - \mu| \ge \varepsilon\bigr) \;\le\; \frac{\sigma^2}{n\,\varepsilon^2} \;\xrightarrow[n\to\infty]{}\; 0" />
      <p>
        <strong>弱大数定律证毕。</strong>伯努利磨了二十年的"黄金定理"，
        今天从切比雪夫不等式出发只要四行——
        当然，这是因为方差、独立性这些概念是他之后才被造出来的。
      </p>
      <p>
        <strong>顺带把 N 算出来，看看这个界有多松。</strong>
        上式给出"要多少次"的答案：
        <MathInline tex="n \ge \sigma^2/(\varepsilon^2\delta)" />
        （δ 是允许的失败概率）。掷骰子 <MathInline tex="\sigma^2 = 35/12 \approx 2.92" />，
        要求均值落进 <MathInline tex="3.5 \pm 0.1" /> 的把握达到 99%，
        切比雪夫说要掷 <strong>29167</strong> 次。可实际模拟表明
        <strong>1937 次</strong>就够了（二十万次重复实验，达标频率 98.98%）——
        <strong>切比雪夫的估计保守了约 15 倍</strong>。
        它松，是因为它对分布一无所知还硬要给保证；
        想要那个真正的 1937，得知道<strong>涨落的具体形状</strong>——
        那正是<router-link to="/probability/clt">下一讲</router-link>的事。
      </p>
    </RevealBox>
    <p>亲眼看看：</p>

    <h2><span class="sec-no">叁</span>亲眼看六条轨迹归队</h2>
    <LLNDemo />

    <h2><span class="sec-no">肆</span>严格定义</h2>
    <div class="definition">
      <div class="def-title">📐 定义（期望与方差）</div>
      <MathBlock tex="E[X] = \sum_i x_i\, p_i \quad\text{（离散）}, \qquad E[X] = \int_{-\infty}^{\infty} x\, f(x)\, dx \quad\text{（连续）}" />
      <p>
        方差 <MathInline tex="\mathrm{Var}(X) = E[(X - E[X])^2]" /> 度量围绕期望的典型涨落（的平方）。
      </p>
    </div>
    <div class="definition">
      <div class="def-title">📐 定理（弱大数定律）</div>
      <p>
        设 <MathInline tex="X_1, X_2, \dots" /> 独立同分布，期望为 μ。则样本均值
        <MathInline tex="\bar{X}_n = \frac1n \sum_{i=1}^n X_i" /> <strong>依概率</strong>收敛于 μ：对任意
        <MathInline tex="\varepsilon > 0" />，
      </p>
      <MathBlock tex="\lim_{n \to \infty} P\big( |\bar{X}_n - \mu| > \varepsilon \big) = 0" />
    </div>
    <p>拆开这份合同的条款：</p>
    <ul>
      <li>
        <strong>"依概率"三个字是灵魂</strong>：极限套在<strong>概率</strong>外面，不套在轨迹上。
        邪门序列没被开除出宇宙，只是它们的总概率被压到零——动画注脚里"以概率 1"的强化版（强大数定律）
        由博雷尔、柯尔莫哥洛夫在 20 世纪补齐；
      </li>
      <li>
        <strong>期望是积分</strong>：连续版的 <MathInline tex="\int x f(x) dx" /> 就是"位置 × 质量密度"的总和——
        期望是分布的<strong>质心</strong>。密度讲搬来的家当立即开工；
      </li>
      <li>
        <strong>独立不是装饰</strong>：方差按 1/n 消减靠的是独立变量方差可加。
        若骰子之间互相"传染"（比如都受同一阵风影响），涨落不抵消，大数定律可以失效——
        金融市场"分散投资失灵"的时刻，就是独立性假设塌方的时刻。
      </li>
    </ul>

    <h2><span class="sec-no">伍</span>买到了什么：期望不是全部，但几乎是全部</h2>

    <h3>同一条定律，保险公司靠它活着，赌客被它杀死</h3>
    <p>
      伯努利说有了这条定理"概率论才走得出赌场"。有意思的是，
      走出赌场之后它做的第一件大事——保险——
      和它留在赌场里做的事，<strong>是同一个公式的两面</strong>。
      把两边并排算一遍，比任何比喻都说明问题。
    </p>
    <p>
      <strong>先看保险公司。</strong>设某种事故一年内发生的概率是 1%，
      发生就赔 100 万；保费定为 1.2 万（期望赔付 1 万，加两成）。
      <strong>单看一张保单，这是彻头彻尾的赌博</strong>：
      公司要么赚 1.2 万（99%），要么亏 98.8 万（1%）。
      期望利润 0.2 万，可这笔生意的标准差是
    </p>
    <MathBlock tex="\sqrt{0.01 \times 0.99} \times 100\ \text{万} \approx 9.95\ \text{万} \quad\Longrightarrow\quad \frac{\text{标准差}}{\text{期望}} \approx 50" />
    <p>
      <strong>波动是期望的五十倍</strong>——这种生意没人敢做。
      但卖 n 张之后，期望按 n 涨，标准差只按
      <MathInline tex="\sqrt n" /> 涨，两者的比值按
      <MathInline tex="50/\sqrt n" /> 掉：
    </p>
    <MathBlock tex="\begin{array}{c|ccccc} n & 1 & 100 & 10^4 & 2.5\times10^5 & 10^6 \\ \hline \text{标准差}/\text{期望} & 49.7 & 4.98 & 0.50 & 0.099 & 0.050 \end{array}" />
    <p>
      <strong>要让波动降到期望的十分之一，需要大约 25 万张保单。</strong>
      这个数字就是保险业的准入门槛，它解释了为什么这一行天然是大公司的生意、
      为什么新险种要拼命扩规模、为什么小公司必须找再保险公司分摊。
      <strong>保险公司的安全从来不来自"每一单都赚"，只来自"单够多"</strong>——
      而"够多"这两个字的定量含义，就写在 <MathInline tex="1/\sqrt n" /> 里。
    </p>
    <p>
      直接算破产风险也是同一回事。把上面的参数代进去（出险数服从二项分布，
      赔付超过保费即亏损），逐档算下来：
    </p>
    <MathBlock tex="\begin{array}{c|cccc} n & 1000 & 10^4 & 10^5 \\ \hline \text{年度亏损概率} & 20.8\% & 2.2\% & \approx 10^{-8} \end{array}" />
    <p>
      （<strong>一个诚实的小字</strong>：n 更小时这个概率反而不高——
      比如只卖 1 张，亏损概率就是出险概率 1%。
      那不是更安全，而是<strong>"亏损概率"这个指标在小 n 时会骗人</strong>：
      它没告诉你亏起来会亏掉 98.8 万，是保费的八十倍。
      保险业真正盯的是<strong>偿付能力</strong>——赔得起还是赔不起，
      而那正是上面那个"标准差/期望"在管的事。）
    </p>
    <div class="insight">
      <div class="insight-title">💡 同一条定律，在赌桌另一侧</div>
      <p>
        现在换到赌场。欧式轮盘 37 个格（1–36 加一个 0），押红黑赢的概率是 18/37：
      </p>
      <MathBlock tex="E[\text{每次押 1 元}] = \frac{18}{37} - \frac{19}{37} = -\frac{1}{37} \approx -2.70\%" />
      <p>
        <strong>大数定律对赌场是一份保证书，对赌客是一份判决书</strong>——
        玩得越多，平均每局的结果越贴近 −2.70%。
        赌场每天几十万局，它就是那个"卖 25 万张保单"的角色，
        收益稳如自来水；赌客一晚上几百局，还站在负号那一侧。
      </p>
      <p>
        <strong>但真正致命的不是那 2.7%，是本金有限。</strong>
        赌客等不到"长期"——他会先归零。带 100 元、每次押 1 元红黑，
        想赢到某个目标再走，成功概率是（赌徒破产问题的经典结果）：
      </p>
      <MathBlock tex="\begin{array}{c|ccc} \text{目标} & 101\ \text{元} & 110\ \text{元} & 200\ \text{元} \\ \hline \text{成功概率} & 94.7\% & 58.1\% & 0.45\% \end{array}" />
      <p>
        最后一列是全节最值得盯着看的数字：
        <strong>如果赌局绝对公平，"带 100 想翻倍"的成功率恰好是 50%</strong>
        （对称性使然）。而<strong>仅仅 2.7% 的单局劣势，把它压到了 0.45%</strong>——
        <strong>掉了一百多倍</strong>。
      </p>
      <p>
        道理是这样的：要把本金翻倍，你得净赢 100 次；
        而每一次押注平均要交出 2.7% 的"过路费"，
        走到那么远的路上，累计交出去的钱早就超过你的本金了。
        <strong>小小的系统性劣势，在"必须走很远"的任务面前会被指数级放大。</strong>
        这也解释了那个人人都有的体验：<strong>"我明明只是一点点一点点地输"，
        最后却是归零</strong>——你输掉的不是运气，是时间。
        赌场不需要每一局都赢，它只需要你一直玩下去。
      </p>
    </div>

    <h3>还买到了什么</h3>
    <ul>
      <li>
        <strong>蒙特卡洛方法</strong>：想算一个算不动的积分？把它写成某个期望，扔随机数模拟取均值——
        大数定律保证收敛，误差按 <MathInline tex="1/\sqrt{n}" /> 缩小且<strong>与维数无关</strong>。
        这是高维积分的救命稻草，也直接变成了解偏微分方程的一种办法：
        <router-link to="/mathphys/laplace">数理方程第 4 讲</router-link>用它算过一块金属板的温度
        （从一个点放五十万次随机游走，结果与解方程逐位相符）；
        <router-link to="/numerical/quadrature">数值分析求积讲</router-link>说的"维数灾难"，
        正是它的用武之地；
      </li>
      <li>
        <strong>圣彼得堡悖论的警钟</strong>：掷硬币直到出正面，第 k 次才出就赔 <MathInline tex="2^k" />——这游戏期望无穷大，
        你却绝不肯出 1000 块入场。尼古拉·伯努利 1713 年的这个悖论提醒后人：
        期望无穷时大数定律失去前提（均值不收敛），而人对风险的态度还需要方差、效用等更多维度来刻画——
        经济学的期望效用理论由此发端；
      </li>
      <li>
        <strong>只差一问</strong>：均值收敛进 ε 带，但<strong>带内的涨落长什么形状</strong>？
        上面那个"切比雪夫说要 29167 次、实际 1937 次就够"的落差，
        缺的正是这个形状。<MathInline tex="1/\sqrt{n}" /> 尺度上放大看，
        答案是一条举世通用的曲线——<router-link to="/probability/clt">最后一讲</router-link>，钟形登场。
      </li>
    </ul>
    <div class="insight">
      <div class="insight-title">🔗 与你学过的课程连一连</div>
      <p>
        <strong>微积分</strong>：本讲从头到尾是<router-link to="/calculus/limit">极限理论</router-link>的随机翻版——
        期望是<router-link to="/calculus/integral">积分</router-link>、大数定律是 ε-N 攻防、
        "依概率收敛"是收敛概念的新成员；
        <strong>上一讲</strong>：切比雪夫那三行的最后一步（"密度在一片区域上的积分就是概率"）
        直接用的是<router-link to="/probability/distribution">分布函数讲</router-link>的家当；
        <strong>数值分析</strong>：<router-link to="/numerical/quadrature">数值积分</router-link>的
        蒙特卡洛路线、随机算法的误差分析，理论根基全在这一页；
        <strong>线性代数</strong>：那句"独立性正是在方差可加这一步用掉的"，
        几何上就是"正交向量的长度平方可加"——勾股定理的概率版
        （不相关的随机变量在 <MathInline tex="L^2" /> 里真的互相垂直）。
      </p>
    </div>
  </ConceptPage>
</template>
