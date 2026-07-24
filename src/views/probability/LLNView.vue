<script setup>
import ConceptPage from '../../components/ConceptPage.vue'
import MathBlock from '../../components/MathBlock.vue'
import MathInline from '../../components/MathInline.vue'
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
      <MathInline tex="1/\sqrt{n}" /> 缩小。切比雪夫后来用三行不等式把这个直觉变成了证明。亲眼看看：
    </p>

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
    <ul>
      <li>
        <strong>保险与赌场的商业模式</strong>：单笔保单是赌博，十万笔保单是大数定律——
        频率被钉死在概率附近，赔付率成了可预算的成本。赌场同理：对单个赌客是运气，对赌场是营业额；
      </li>
      <li>
        <strong>蒙特卡洛方法</strong>：想算一个算不动的积分？把它写成某个期望，扔随机数模拟取均值——
        大数定律保证收敛，误差按 <MathInline tex="1/\sqrt{n}" /> 缩小且<strong>与维数无关</strong>，
        高维积分的救命稻草（计算数学的老熟人）；
      </li>
      <li>
        <strong>圣彼得堡悖论的警钟</strong>：掷硬币直到出正面，第 k 次才出就赔 <MathInline tex="2^k" />——这游戏期望无穷大，
        你却绝不肯出 1000 块入场。尼古拉·伯努利 1713 年的这个悖论提醒后人：
        期望无穷时大数定律失去前提（均值不收敛），而人对风险的态度还需要方差、效用等更多维度来刻画——
        经济学的期望效用理论由此发端；
      </li>
      <li>
        <strong>只差一问</strong>：均值收敛进 ε 带，但<strong>带内的涨落长什么形状</strong>？
        <MathInline tex="1/\sqrt{n}" /> 尺度上放大看，答案是一条举世通用的曲线——最后一讲，钟形登场。
      </li>
    </ul>
    <div class="insight">
      <div class="insight-title">🔗 与你学过的课程连一连</div>
      <p>
        <strong>微积分</strong>：本讲从头到尾是极限理论的随机翻版——期望是积分、大数定律是 ε-N 攻防、
        "依概率收敛"是收敛概念的新成员；<strong>计算数学</strong>：数值积分的蒙特卡洛路线、
        随机算法的误差分析，理论根基全在这一页。
      </p>
    </div>
  </ConceptPage>
</template>
