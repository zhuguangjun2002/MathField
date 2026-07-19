<script setup>
import ConceptPage from '../../components/ConceptPage.vue'
import MathBlock from '../../components/MathBlock.vue'
import MathInline from '../../components/MathInline.vue'
import CLTDemo from '../../demos/CLTDemo.vue'
</script>

<template>
  <ConceptPage slug="clt">
    <h2><span class="sec-no">壹</span>困境：算不动的组合数，合不拢的观测值</h2>
    <p>两条毫不相干的战线，被同一条曲线终结。</p>
    <p>
      <strong>战线一：赌桌上的算术灾难。</strong>掷 1000 次硬币，正面在 490 到 510 之间的概率是多少？
      按二项分布硬算要对付 <MathInline tex="\binom{1000}{500}" /> 这种天文数字——
      手工时代这是不可能完成的任务。<strong>棣莫弗</strong>（流亡伦敦、靠给赌徒算牌谋生的法国胡格诺教徒）
      在 1733 年硬啃这个问题时，借斯特林公式逼近阶乘，算出二项分布的轮廓竟趋向一条光滑曲线：
    </p>
    <MathBlock tex="\varphi(z) = \frac{1}{\sqrt{2\pi}}\, e^{-z^2/2}" />
    <p>钟形曲线第一次现身，当时无人喝彩——它看起来只是个求近似的计算技巧。</p>
    <p>
      <strong>战线二：天文台的观测烦恼。</strong>同一颗星，十个晚上测出十个不同位置——仪器抖、大气晃、眼睛花。
      哪个是真的？该怎么合并？误差服从什么规律？18 世纪的天文学家为"误差曲线"提了各种候选，谁也说服不了谁。
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
      不说带内长什么样。现在换上显微镜：涨落的典型尺寸是 <MathInline tex="\sigma/\sqrt{n}" />，
      那就按这个尺度放大——
    </p>
    <MathBlock tex="Z_n = \frac{\bar{X}_n - \mu}{\sigma / \sqrt{n}}" />
    <p>
      减去 μ 是对准中心，除以 <MathInline tex="\sigma/\sqrt{n}" /> 是把镜头倍率调到涨落的量级。
      中心极限定理的断言是：这样放大之后，<strong>无论原料是什么分布</strong>，
      看到的形状都趋向同一条标准正态曲线。
    </p>
    <div class="insight">
      <div class="insight-title">💡 核心直觉：细节在叠加中互相抹平</div>
      <p>
        为什么万物归一？因为<strong>求和是一台粉碎细节的机器</strong>：把 n 个独立小随机量加起来，
        单个量的个性（偏斜、离散、双峰）在互相抵消中被磨掉，只有两个量存活下来——均值与方差。
        存活信息只有两个数，极限形状自然只有一种。正态分布不是大自然偏爱钟形，
        而是<strong>"由大量独立小因素叠加而成"这种出身</strong>的必然长相——身高、噪声、测量误差，全是这种出身。
      </p>
    </div>

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
        <strong>收敛的是分布函数</strong>：断言是"P(Z_n ≤ z) → Φ(z) 对每个 z"——第三讲备好的分布函数语言
        在此正式上岗（术语叫"依分布收敛"，比大数定律的"依概率"更弱、也更普适）；
      </li>
      <li>
        <strong>方差有限不是废话</strong>：柯西分布（重尾到方差无穷）就是钉子户——
        它的样本均值不管 n 多大都还是柯西分布，永不变钟形。"细节被抹平"的前提是没有谁的嗓门无穷大；
      </li>
      <li>
        <strong>√n 是唯一正确的倍率</strong>：除以 n（大数定律的镜头）涨落缩成一个点，除以 1 涨落炸到无穷——
        只有 √n 尺度恰好让画面稳定成曲线。三个课程的极限概念在此各就各位：
        点（大数定律）、曲线（中心极限定理）、发散，全看镜头倍率；
      </li>
      <li>
        <strong>2π 从哪来</strong>：归一化常数来自 <MathInline tex="\int e^{-x^2} dx = \sqrt{\pi}" />——
        那个"没有初等原函数"的著名积分。微积分课绕不过去的钉子，在这里是量尺。
      </li>
    </ul>

    <h2><span class="sec-no">伍</span>买到了什么：全课收官，三门课会师</h2>
    <ul>
      <li>
        <strong>统计推断的通用误差条</strong>：民调"±3 个百分点、95% 置信"哪来的？
        样本比例的涨落按 CLT 近似正态，± 两个 <MathInline tex="\sigma/\sqrt{n}" /> 就是那根误差条。
        几乎所有实验科学的显著性检验，引擎都是这条定理；
      </li>
      <li>
        <strong>最小二乘的正当性</strong>（线性代数会师）：误差正态时，最小二乘解就是最大可能的参数估计——
        高斯当年正是这样论证的。而解最小二乘的正规方程，是线代第一讲消元法的日常工作；
      </li>
      <li>
        <strong>逼近哲学的对照</strong>（微积分会师）：泰勒展开用多项式冒充函数，靠的是"局部信息足够多"；
        中心极限定理用正态冒充分布，靠的是"个体信息足够少"。一个放大细节、一个抹平细节，
        棣莫弗当年恰好是用前者（斯特林/泰勒式渐近）证出了后者；
      </li>
      <li>
        <strong>通往下一门课的桥</strong>：证明中心极限定理的现代标准工具是特征函数
        <MathInline tex="E[e^{itX}]" />——分布的傅里叶变换，e 的虚指数在此现身（复变函数的地盘）；
        而热传导方程的基本解恰是方差随时间增长的正态密度——扩散就是无数分子随机碰撞的中心极限定理
        （数学物理方程见）。钟形曲线是几门课共同的路标。
      </li>
    </ul>
    <div class="insight">
      <div class="insight-title">🔗 课程总结：三次收敛，三种强度</div>
      <p>
        这门课的主线是把"运气"逐层驯服：古典概型<strong>数</strong>出概率，条件概率让概率<strong>更新</strong>，
        分布函数让概率<strong>连续化</strong>，大数定律让频率<strong>兑现</strong>概率，
        中心极限定理给涨落<strong>定形</strong>。三种收敛（依概率、以概率 1、依分布）强度不同、分工明确，
        全都建立在微积分的极限地基上——概率论不是一门孤立的课，它是极限理论在不确定世界的殖民地。
      </p>
    </div>
  </ConceptPage>
</template>
