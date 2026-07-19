<script setup>
import ConceptPage from '../../components/ConceptPage.vue'
import MathBlock from '../../components/MathBlock.vue'
import MathInline from '../../components/MathInline.vue'
import RelaxationDemo from '../../demos/RelaxationDemo.vue'
</script>

<template>
  <ConceptPage slug="laplace">
    <h2><span class="sec-no">壹</span>困境：三个不相干的问题，同一张面孔</h2>
    <p>18 世纪末到 19 世纪中叶，三拨人马在三个战场分别撞见了同一个方程。</p>
    <ul>
      <li>
        <strong>天上</strong>：<strong>拉普拉斯</strong>研究行星引力，引入"势函数" u——
        一个标量场，它的梯度给出引力（比直接算三分量的力省事得多）。1782 — 1787 年间他发现，
        在没有物质的空间里，u 满足 <MathInline tex="u_{xx} + u_{yy} + u_{zz} = 0" />；
      </li>
      <li>
        <strong>地上</strong>：静电学照方抓药——库仑力与万有引力同为平方反比，电势在无电荷处满足同一方程。
        自学成才的磨坊主之子<strong>格林</strong>1828 年自费出版小册子，建立了完整的势论
        （"格林函数"由此得名，那本小册子直到他死后才被人发现价值）；
      </li>
      <li>
        <strong>手边</strong>：上一讲的热方程 <MathInline tex="u_t = a^2 \Delta u" />，等到温度不再变化
        （u_t = 0）时，剩下的正是 <MathInline tex="\Delta u = 0" />——稳态温度分布。
      </li>
    </ul>
    <p>
      引力、静电、稳态温度——物理机制风马牛不相及，方程一模一样。这不是巧合能打发的：
      <strong>这个方程到底在说什么，让万物"静止"时都得服从它？</strong>
      （记号：<MathInline tex="\Delta u = u_{xx} + u_{yy}" /> 称拉普拉斯算子，其解称<strong>调和函数</strong>。）
    </p>

    <h2><span class="sec-no">贰</span>破局：Δu 是"你与邻居平均值的差距"</h2>
    <p>
      钥匙是给 Δu 一个物理直觉。一维时 u_xx 是弯曲度——"邻居平均比我高还是低"：
      对 u_xx 用泰勒展开（微积分的老手艺）立刻可验：
    </p>
    <MathBlock tex="\frac{u(x+h) + u(x-h)}{2} - u(x) = \frac{h^2}{2} u_{xx} + O(h^4)" />
    <p>
      左边正是"两邻居的平均减去我自己"。二维同理：<strong>Δu ∝（周围一圈的平均值 − 中心值）</strong>。
      于是三大场景瞬间通了：
    </p>
    <div class="insight">
      <div class="insight-title">💡 核心直觉：调和 = 处处等于邻居平均 = 无处特殊</div>
      <p>
        热平衡时每点温度必须恰等于邻域平均——否则热量还会流动，就不叫稳态；
        引力势、电势在真空里同理（没有源，就没有理由比邻居特殊）。
        所以 Δu = 0 的真义是：<strong>"这个场里没有任何一点搞特殊化"</strong>——没有局部热斑，
        没有凭空的势阱。立刻白捡两条大定理：<strong>平均值性质</strong>（调和函数在任一圆心的值 =
        圆周上的平均——复变第三讲柯西积分公式的实数版，那时埋的伏笔在此兑现）；
        <strong>最大值原理</strong>（最大最小只能出现在边界上——内部若有峰，峰顶就比邻居平均高，矛盾）。
      </p>
    </div>
    <p>
      "处处等于邻居平均"还直接送来一个解法：既然解在每点都该是邻居平均，那就<strong>拿这句话当迭代规则</strong>——
      给内部随便赋初值，反复把每点改成邻居平均，直到不再变化。这就是<strong>松弛法</strong>
      （数值解拉普拉斯方程至今的入门算法，高斯当年手算大地测量平差用的就是这类思想）。下面亲手跑一块板。
    </p>

    <h2><span class="sec-no">叁</span>亲手把一块板"松弛"到稳态</h2>
    <RelaxationDemo />

    <h2><span class="sec-no">肆</span>严格定义</h2>
    <div class="definition">
      <div class="def-title">📐 定义（调和函数）与狄利克雷问题</div>
      <p>
        区域 D 上二阶连续可微的 u 若满足
        <MathInline tex="\Delta u = u_{xx} + u_{yy} = 0" />，称 u 在 D 内<strong>调和</strong>。
      </p>
      <p>
        <strong>狄利克雷问题</strong>：给定边界 ∂D 上的函数 g，求 D 内调和、边界上等于 g 的 u。
        （解存在且<strong>唯一</strong>，并连续依赖于边界数据。）
      </p>
    </div>
    <p>拆读：</p>
    <ul>
      <li>
        <strong>没有初始条件</strong>：波动、热都在"演化"，拉普拉斯方程没有时间——它不问"怎么到这来的"，
        只问"边界定死后内部长什么样"。定解数据从"初始 + 边界"变成只剩边界；
      </li>
      <li>
        <strong>唯一性一行可证</strong>：两个解之差 w 调和且边界为零；由最大值原理，w 的最大最小都在边界上取，
        都是 0，故 w ≡ 0。动画里"改边界，整幅图都变"的另一面：<strong>边界不变，内部绝无第二种可能</strong>；
      </li>
      <li>
        <strong>与复变的精确关系</strong>：二维调和函数恰好是解析函数的实部（局部）——
        复变课"实部虚部都调和"是一个方向，反过来每个调和函数也能配上"共轭调和"的虚部凑成解析函数。
        于是复变的整套工具（保角映射！）成了解二维拉普拉斯方程的杀手锏：把怪区域映成圆盘，解完映回去；
      </li>
      <li>
        <strong>三兄弟的族谱</strong>：数学上把二阶线性 PDE 按判别式分成三型——<strong>双曲</strong>（波动：
        有限速度传播、保留奇性）、<strong>抛物</strong>（热：瞬时抹平、不可逆）、<strong>椭圆</strong>
        （拉普拉斯：无时间、内部无限光滑、全由边界定）。三大方程不是随便挑的三个例子，
        是三种类型各自的原型——学会它们，就摸清了整个版图。
      </li>
    </ul>

    <h2><span class="sec-no">伍</span>买到了什么：静止世界的通用语法</h2>
    <ul>
      <li>
        <strong>物理的半壁江山</strong>：静电场设计（电容器、屏蔽罩）、不可压缩流体的势流（机翼升力计算的第一步）、
        渗流、稳态扩散——凡是"源在边界、内部自洽"的静态问题，都是狄利克雷问题换皮；
      </li>
      <li>
        <strong>概率论的惊喜客串</strong>：让一个粒子从内部某点开始随机游走，撞到边界即停——
        <strong>"游走首次撞到高温边的概率"恰好就是该点的调和函数值</strong>。
        直觉：随机游走下一步的期望位置就是邻居平均，与调和的定义逐字重合。
        蒙特卡洛解 PDE（计算数学）的理论根据就在这里——概率与位势论在深处是一门学问；
      </li>
      <li>
        <strong>格林函数：现代物理的日常工具</strong>：格林那本无人问津的小册子给出的"点源响应"方法，
        今天是量子场论（传播子）、电路分析（冲激响应）、地震勘探的标准语言；
      </li>
      <li>
        <strong>只剩一步</strong>：三大方程都认识了，波动与热还各自欠一个"为什么解长那样"的统一交代——
        最后一讲把三者一网打尽，也把整个网站的概念大会师。
      </li>
    </ul>
    <div class="insight">
      <div class="insight-title">🔗 与你学过的课程连一连</div>
      <p>
        <strong>复变函数</strong>：调和 ⟺ 解析函数实部；平均值性质 ⟺ 柯西积分公式；保角映射是解二维位势问题的工程工具；
        <strong>概率论</strong>：随机游走的撞界概率就是调和函数（期望 = 邻居平均）；
        <strong>计算数学</strong>：松弛法是迭代法解大型稀疏线性方程组的鼻祖——它收敛快慢由迭代矩阵的
        谱半径决定，线代第五讲的特征值又一次现身。
      </p>
    </div>
  </ConceptPage>
</template>
