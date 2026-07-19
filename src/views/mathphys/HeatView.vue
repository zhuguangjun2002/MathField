<script setup>
import ConceptPage from '../../components/ConceptPage.vue'
import MathBlock from '../../components/MathBlock.vue'
import MathInline from '../../components/MathInline.vue'
import FourierHeatDemo from '../../demos/FourierHeatDemo.vue'
</script>

<template>
  <ConceptPage slug="heat">
    <h2><span class="sec-no">壹</span>困境：拿破仑的科学院收到一篇危险的论文</h2>
    <p>
      1807 年，巴黎科学院收到一篇《固体中的热传播》。作者<strong>傅里叶</strong>不是科班数学家：
      他随拿破仑远征过埃及、正当着伊泽尔省省长，业余痴迷一个问题——<strong>热在固体里怎么流动</strong>。
      当时这是前沿实用问题（炮管散热、地球内部温度），却没有数学理论。
    </p>
    <p>论文做了两件事。第一件：像达朗贝尔对弦那样，给热流写方程。我们照样放慢镜头。</p>
    <div class="story">
      <div class="story-title">📜 推导：给一小段铁棒记热账</div>
      <p>
        一根细铁棒，u(x,t) 是位置 x 在时刻 t 的温度。两条实验事实（牛顿与毕奥早已测明）：
        ① 热量从高温流向低温，流量正比于温度的<strong>斜率</strong>：q = −k·u_x（负号：往低处流）；
        ② 一段棒升温多少，正比于它净收到的热量。对 x 到 x+Δx 这一小段记账：
        流入 = 左端进来的 − 右端出去的 = <MathInline tex="k[u_x(x{+}\Delta x) - u_x(x)]" />。
        净流入使温度上升：<MathInline tex="(\text{热容} \cdot \Delta x)\, u_t = k[u_x(x{+}\Delta x) - u_x(x)]" />。
        除以 Δx 取极限——右边又是熟悉的"斜率之差 → 二阶导"：
      </p>
      <MathBlock tex="u_t = a^2 u_{xx}" />
      <p>
        与波动方程只差一处：<strong>时间导数是一阶</strong>。读法：温度的变化率 ∝ 温度曲线的弯曲度——
        凹处（比邻居冷）升温、凸处（比邻居热）降温，<strong>处处向邻居看齐</strong>。没有惯性项，
        所以不会"冲过头"：只有趋同，没有振荡。
      </p>
    </div>
    <p>
      第二件事捅了马蜂窝。解这个方程时，傅里叶宣称：<strong>任意初始温度分布——包括带跳变、带尖角的——
      都能展成三角级数</strong>，并给出了系数的明确公式。评审人拉格朗日（弦振动之争的老将，
      驻波派的死敌）拒绝了这篇论文。傅里叶不改一字地坚持了十五年，1822 年以专著《热的解析理论》出版——
      这本书后来被开尔文称为"一首数学的诗"。
    </p>

    <h2><span class="sec-no">贰</span>破局：系数公式——正交性的第一次胜利</h2>
    <p>
      傅里叶比伯努利多迈出的关键一步：他不空谈"能展开"，他<strong>算出了系数</strong>。
      设 <MathInline tex="\varphi(x) = \sum b_n \sin\frac{n\pi x}{L}" />，怎么把某个 b_m 单独抠出来？
      傅里叶的招数：两边同乘 <MathInline tex="\sin\frac{m\pi x}{L}" /> 再积分。奇迹发生——
    </p>
    <MathBlock tex="\int_0^L \sin\frac{n\pi x}{L}\, \sin\frac{m\pi x}{L}\, dx = \begin{cases} 0, & n \neq m \\ L/2, & n = m \end{cases}" />
    <div class="insight">
      <div class="insight-title">💡 核心直觉：正弦函数族互相"垂直"</div>
      <p>
        向量空间讲埋的伏笔在此兑现：把 <MathInline tex="\int fg\,dx" /> 看作函数版的内积（点积），
        上式说的就是<strong>不同频率的正弦互相正交</strong>——像坐标系里的 x 轴、y 轴。
        于是求系数与"求向量在正交基下的坐标"一模一样：拿基向量做内积、除以基向量长度平方：
        <MathInline tex="b_n = \frac{2}{L}\int_0^L \varphi(x)\sin\frac{n\pi x}{L}\,dx" />。
        无穷维函数空间里的"投影"，操作起来不过是一个定积分。
        任意波形是无穷多正弦的叠加不再是玄学：<strong>它就是一个向量在一组正交基上的展开</strong>。
      </p>
    </div>
    <p>
      至于"光滑正弦怎么加出尖角"——答案是<strong>无穷项</strong>加得出（有限项永远加不出，
      所以欧拉、拉格朗日的质疑对有限和是对的）。狄利克雷 1829 年给出第一个严格收敛判据，
      顺带发现"函数"的概念本身需要重修——傅里叶级数逼着 19 世纪重建了函数、收敛乃至积分的定义
      （黎曼积分、康托尔集合论都是这场余震的产物）。
    </p>

    <h2><span class="sec-no">叁</span>亲手拼方波，再看热抹平它</h2>
    <FourierHeatDemo />

    <h2><span class="sec-no">肆</span>严格定义</h2>
    <div class="definition">
      <div class="def-title">📐 定义（傅里叶正弦级数）与定解问题的解</div>
      <p>
        <MathInline tex="[0, L]" /> 上的函数 φ 的<strong>正弦级数</strong>为
        <MathInline tex="\sum_{n=1}^{\infty} b_n \sin\frac{n\pi x}{L}" />，其中
        <MathInline tex="b_n = \frac{2}{L}\int_0^L \varphi(x)\sin\frac{n\pi x}{L}dx" />。
        （狄利克雷判据：φ 分段光滑时级数收敛，间断点处收敛到左右极限的平均。）
      </p>
      <p>两端保持 0 度、初始温度 φ 的铁棒，其温度演化为</p>
      <MathBlock tex="u(x, t) = \sum_{n=1}^{\infty} b_n\, e^{-\left(\frac{n\pi a}{L}\right)^2 t}\, \sin\frac{n\pi x}{L}" />
    </div>
    <p>解的每个部件都会说话：</p>
    <ul>
      <li>
        <strong>衰减因子里的 n²</strong>：第 n 个模式衰减快 n² 倍——高频细节先消失，曲线越来越圆润。
        动画里方波尖角先圆、后塌、终成拱形，就是 n² 在工作。倒放这段录像立刻穿帮
        （细节会无中生有）——<strong>时间之箭</strong>写在指数上；
      </li>
      <li>
        <strong>与波动方程的对照</strong>：同一套正弦模式，波动配 cos（转圈，能量守恒），
        热配 e^(−λt)（滑坡，能量耗散）——时间导数差一阶，宇宙观差一个热力学第二定律；
      </li>
      <li>
        <strong>瞬时传播的代价</strong>：t 取任意小正数，解已是无穷光滑函数——初始尖角瞬间被磨掉，
        且扰动"立即"波及全棒（振幅指数小但非零）。与波动方程的有限速度 c 相反——
        这是热方程作为宏观近似的边界（微观上它是概率论布朗运动的极限，分子并不真的瞬移）；
      </li>
      <li>
        <strong>吉布斯现象</strong>：间断点旁 9% 的过冲不随项数消失，只是变窄——"逐点收敛"与"均匀收敛"
        的差别第一次有了肉眼可见的形象（微积分里这两个概念的区分，历史动机正在此处）。
      </li>
    </ul>

    <h2><span class="sec-no">伍</span>买到了什么：一副拆解万物的眼镜</h2>
    <ul>
      <li>
        <strong>弦振动之争结案</strong>：伯努利的驻波叠加成立，因为正弦族确实张满整个（合理的）函数空间——
        音乐家的直觉领先数学证明七十年；
      </li>
      <li>
        <strong>频域思维</strong>：傅里叶的真正遗产是一种世界观——<strong>任何信号都可以按频率拆开处理</strong>。
        JPEG 压缩（丢掉人眼不敏感的高频）、MP3（丢掉人耳听不见的分量）、降噪耳机、核磁共振成像、
        5G 调制——现代信息文明的半壁江山建立在这次展开上；
      </li>
      <li>
        <strong>快速傅里叶变换</strong>：计算数学的老朋友 FFT 把求系数的代价从 n² 降到 n log n——
        被称为二十世纪最重要的算法，没有它上面那串应用都跑不动；
      </li>
      <li>
        <strong>两大逼近哲学对照</strong>（微积分会师）：泰勒展开用多项式冒充函数——
        在一点上无限贴身，走远就失效（局部视角）；傅里叶用正弦冒充函数——处处不完美、整体均方最优
        （全局视角）。一个放大镜，一个棱镜，此后你解题时永远多一个选择：<strong>在时域算，还是去频域算？</strong>
      </li>
    </ul>
    <div class="insight">
      <div class="insight-title">🔗 与你学过的课程连一连</div>
      <p>
        <strong>线性代数</strong>：系数公式 = 正交投影，帕塞瓦尔等式 = 勾股定理的无穷维版；
        <strong>概率论</strong>：特征函数就是分布的傅里叶变换（中心极限定理的证明引擎）；
        热方程的基本解是方差随时间线性增长的正态密度——<strong>扩散就是无数分子各自随机行走的中心极限定理</strong>，
        两门课在此严丝合缝；<strong>复变函数</strong>：傅里叶反演的积分靠留数计算——第四讲的收割机在此上岗。
      </p>
    </div>
  </ConceptPage>
</template>
