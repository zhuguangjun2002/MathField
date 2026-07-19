<script setup>
import ConceptPage from '../../components/ConceptPage.vue'
import MathBlock from '../../components/MathBlock.vue'
import MathInline from '../../components/MathInline.vue'
import BayesDemo from '../../demos/BayesDemo.vue'
</script>

<template>
  <ConceptPage slug="bayes">
    <h2><span class="sec-no">壹</span>困境：概率是死的，信息是活的</h2>
    <p>
      上一讲的概率是"开赌前"算好的。可现实中的不确定性从来不是一锤子买卖：
      医生看到检测结果、法官听到新证词、天文学家收到新观测——<strong>拿到新信息之后，
      原来算的概率还作数吗？该怎么改？</strong>
    </p>
    <p>
      18 世纪的说法把这叫"逆概率"问题：正向的概率好算——已知袋里黑白球各半，摸出黑球的概率是 1/2；
      难的是<strong>反向</strong>——摸了五次全是黑球，袋子里的配比该信什么？
      从"原因推结果"到"结果猜原因"，方向一倒，整个 18 世纪的概率论都不会算了。
    </p>
    <div class="story">
      <div class="story-title">📜 1763 年 · 一份死后才发表的遗稿</div>
      <p>
        英国长老会牧师<strong>托马斯·贝叶斯</strong>生前几乎没发表过数学著作。他去世后，
        朋友<strong>理查德·普莱斯</strong>在他的遗物里翻出一篇论文，整理后提交皇家学会——
        《机会学说中一个问题的解》，里面正是"看到结果后如何回推原因"的算法。
        贝叶斯本人可能都没觉得它多重要。半个世纪后，<strong>拉普拉斯</strong>独立重建并大规模应用了这套方法：
        估计彗星轨道、判断陪审团误判率、甚至计算"太阳明天升起的概率"。
        今天它的名字刻在整个机器学习行业的门楣上。
      </p>
    </div>

    <h2><span class="sec-no">贰</span>破局：新信息 = 换一个更小的样本空间</h2>
    <p>
      钥匙藏在一个不起眼的动作里。"已知 B 发生了"意味着什么？意味着<strong>所有 B 之外的结局都被划掉了</strong>——
      世界从整个 Ω 缩小成了 B。概率要在这个缩小的世界里<strong>重新归一</strong>：
    </p>
    <div class="insight">
      <div class="insight-title">💡 核心直觉：条件概率就是"缩圈重算"</div>
      <p>
        原来 A 的概率是"A 的面积占全图的比例"；得知 B 发生后，图缩成了 B，
        A 只剩下与 B 重叠的部分——新概率 = <strong>重叠面积 ÷ B 的面积</strong>。
        这就是 <MathInline tex="P(A \mid B) = P(AB)/P(B)" /> 的全部含义：分母 P(B) 不是凭空出现的，
        它是"新世界的总面积"，除以它是在新世界里重新校准量尺。
      </p>
    </div>
    <p>
      "逆概率"随之破解。想知道 P(原因 | 结果)，而手里只有 P(结果 | 原因)？
      两个条件概率共享同一块重叠面积 P(结果 且 原因)，所以它们能互相换算——换算式就是贝叶斯公式。
      直觉上更简单：<strong>把一千个人摆出来数一数</strong>。下面这个例子曾让无数医生翻车：
      检测灵敏度 90%，你拿到阳性报告，患病概率是多少？绝大多数人脱口而出"九成"。来数数看。
    </p>

    <h2><span class="sec-no">叁</span>亲手数一数一千个人</h2>
    <BayesDemo />

    <h2><span class="sec-no">肆</span>严格定义</h2>
    <div class="definition">
      <div class="def-title">📐 定义（条件概率）</div>
      <p>设 <MathInline tex="P(B) > 0" />，在 B 发生的条件下 A 的条件概率定义为</p>
      <MathBlock tex="P(A \mid B) = \frac{P(AB)}{P(B)}" />
      <p><strong>贝叶斯公式</strong>：把分子按乘法公式展开、分母按全概率公式展开，得</p>
      <MathBlock tex="P(A \mid B) = \frac{P(B \mid A)\, P(A)}{P(B \mid A)\, P(A) + P(B \mid \bar{A})\, P(\bar{A})}" />
    </div>
    <p>逐词拆解：</p>
    <ul>
      <li>
        <strong>为什么是"定义"不是"定理"</strong>：缩圈重算是我们<strong>选择</strong>的更新规则，
        数学里它被采纳为定义——因为在等可能模型里它恰好等于"在 B 里数 A"，与直觉严丝合缝；
      </li>
      <li>
        <strong>P(B) &gt; 0 的小字</strong>：零面积的世界没法做分母。连续情形"已知 X 恰好等于 x"
        条件概率照样有意义（密度版条件化），但那需要极限来救场——又是微积分的地盘；
      </li>
      <li>
        <strong>贝叶斯公式无一多余</strong>：分子 <MathInline tex="P(B|A)P(A)" /> 是"经由 A 产生证据 B"的流量，
        分母是"所有渠道产生 B"的总流量——后验概率就是<strong>你这条渠道占的流量份额</strong>。
        动画里深红除以（深红+金色），就是这个式子的人数版；
      </li>
      <li>
        <strong>先验 P(A) 无处可逃</strong>：想从 P(B|A) 换算出 P(A|B)，必须掏出 P(A)。
        检测准不准是实验室的事，患病率高不高是流行病学的事，两者缺一不可——
        这也是贝叶斯方法三百年来争议的焦点：先验从哪来？（拉普拉斯的回答：没有信息时就均匀分。）
      </li>
    </ul>

    <h2><span class="sec-no">伍</span>买到了什么：一台信念更新的机器</h2>
    <ul>
      <li>
        <strong>垃圾邮件过滤</strong>：P(垃圾 | 出现"中奖"二字) ∝ P(出现"中奖" | 垃圾) × P(垃圾)——
        上世纪 90 年代末拯救了整个电子邮件生态的朴素贝叶斯分类器，就是这一行公式；
      </li>
      <li>
        <strong>机器学习的底层语法</strong>：把"原因"换成模型参数、"结果"换成数据，
        贝叶斯公式就是"用数据更新模型信念"的通用法则——后验 ∝ 似然 × 先验，整个统计推断的一半建在上面；
      </li>
      <li>
        <strong>独立性有了精确说法</strong>：若 <MathInline tex="P(A|B) = P(A)" />（知道 B 不改变对 A 的判断），
        称 A、B 独立，等价于 <MathInline tex="P(AB) = P(A)P(B)" />。
        下一讲起"独立"将是每个定理的标配假设——它的含义就在这里：<strong>信息互不相通</strong>；
      </li>
      <li>
        <strong>基率谬误疫苗</strong>：法庭上"DNA 匹配概率百万分之一"≠"无辜概率百万分之一"，
        安检、风控、筛查同理——凡是"命中率"和"命中后是真的概率"被混为一谈的地方，都是这一讲的用武之地。
      </li>
    </ul>
    <div class="insight">
      <div class="insight-title">🔗 与你学过的课程连一连</div>
      <p>
        <strong>计算数学</strong>：贝叶斯公式的分母（全概率）在高维模型里是个积分，算不动它催生了
        MCMC、变分推断等一大家族数值方法；<strong>线性代数</strong>：马尔可夫链的转移矩阵每一行都是条件概率，
        "长期停留在哪"由它的特征向量决定——PageRank 那一幕的概率论出身在此。
      </p>
    </div>
  </ConceptPage>
</template>
