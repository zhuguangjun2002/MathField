<script setup>
import ConceptPage from '../../components/ConceptPage.vue'
import MathBlock from '../../components/MathBlock.vue'
import MathInline from '../../components/MathInline.vue'
import RevealBox from '../../components/RevealBox.vue'
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
        （<MathInline tex="u_t = 0" />）时，剩下的正是 <MathInline tex="\Delta u = 0" />——稳态温度分布。
      </li>
    </ul>
    <p>
      引力、静电、稳态温度——物理机制风马牛不相及，方程一模一样。这不是巧合能打发的：
      <strong>这个方程到底在说什么，让万物"静止"时都得服从它？</strong>
      （记号：<MathInline tex="\Delta u = u_{xx} + u_{yy}" /> 称拉普拉斯算子，其解称<strong>调和函数</strong>。）
    </p>

    <h2><span class="sec-no">贰</span>破局：Δu 是"你与邻居平均值的差距"</h2>
    <p>
      钥匙是给 Δu 一个物理直觉。一维时 <MathInline tex="u_{xx}" /> 是弯曲度——"邻居平均比我高还是低"：
      对 <MathInline tex="u_{xx}" /> 用泰勒展开（微积分的老手艺）立刻可验：
    </p>
    <MathBlock tex="\frac{u(x+h) + u(x-h)}{2} - u(x) = \frac{h^2}{2} u_{xx} + O(h^4)" />
    <p>
      左边正是"两邻居的平均减去我自己"。二维同理：<strong>Δu ∝（周围一圈的平均值 − 中心值）</strong>。
      这句"同理"值得当场兑现一次——它只用到泰勒展开，而且推完你会发现，
      <strong>动画里那条迭代规则其实是被这个式子直接写出来的</strong>：
    </p>
    <RevealBox
      title="🔍 两次泰勒展开：Δu 的真身，以及松弛法那条规则的出处"
      label="对答案 / 看完整拆解"
    >
      <template #hint>
        先自己动笔：把 <MathInline tex="u(x+h)" /> 和 <MathInline tex="u(x-h)" />
        各展开到四阶，然后<strong>相加</strong>。哪些项会成对消掉？
        （提示：奇次项的符号相反。）二维时把左右、上下两对邻居<strong>四个一起加</strong>，
        看看能凑出什么。
      </template>
      <p><strong>第一步：一维，相加消掉奇次项。</strong></p>
      <MathBlock tex="\begin{aligned} u(x+h) &= u + h u' + \tfrac{h^2}{2}u'' + \tfrac{h^3}{6}u''' + \tfrac{h^4}{24}u'''' + \cdots \\ u(x-h) &= u - h u' + \tfrac{h^2}{2}u'' - \tfrac{h^3}{6}u''' + \tfrac{h^4}{24}u'''' - \cdots \end{aligned}" />
      <p>
        一加，所有<strong>奇次</strong>项成对抵消（这正是"取两侧邻居"而不是只取一侧的好处），
        剩下 <MathInline tex="u(x+h)+u(x-h) = 2u + h^2 u'' + O(h^4)" />。
        移项除以 2，就是上面那条式子。
      </p>
      <p>
        <strong>第二步：二维，四个邻居一起加。</strong>左右一对给出
        <MathInline tex="2u + h^2 u_{xx}" />，上下一对给出
        <MathInline tex="2u + h^2 u_{yy}" />，四个加起来：
      </p>
      <MathBlock tex="u(x{+}h,y) + u(x{-}h,y) + u(x,y{+}h) + u(x,y{-}h) = 4u + h^2\bigl(u_{xx} + u_{yy}\bigr) + O(h^4)" />
      <p>除以 4 再减去 <MathInline tex="u" />：</p>
      <MathBlock tex="\underbrace{\frac{1}{4}\sum_{\text{四邻}} u}_{\text{邻居平均}} - \ u(x,y) = \frac{h^2}{4}\,\Delta u + O(h^4)" />
      <p>
        <strong>这一行就是本讲的全部。</strong>左边是"邻居平均减自己"，右边是
        <MathInline tex="\Delta u" /> 乘一个正数。所以
      </p>
      <MathBlock tex="\Delta u = 0 \quad\Longleftrightarrow\quad u(x,y) = \text{四邻的平均}" />
      <p>
        （更准确地说是"到 <MathInline tex="h^2" /> 阶为止相等"，
        <MathInline tex="h \to 0" /> 时成为严格的平均值性质。）
        <strong>而右边那句话，逐字就是动画里的迭代规则</strong>：
        把每个点改成四邻的平均，反复做，就是在把 <MathInline tex="\Delta u" /> 往 0 上赶。
        松弛法不是另发明的算法，它就是<strong>把方程的意思直接当成动作</strong>。
      </p>
      <p>
        顺带看清了 <MathInline tex="O(h^4)" /> 这个尾巴的意义：网格越细（h 越小），
        "离散的调和"与"真正的调和"差得越少，误差按 <MathInline tex="h^2" /> 缩小
        （因为两边同除以 <MathInline tex="h^2/4" /> 后余项是 <MathInline tex="O(h^2)" />）。
        <router-link to="/mathphys/pde-intro">第 1 讲</router-link>说的差分法，
        精度阶数就是这么数出来的。
      </p>
    </RevealBox>
    <p>于是三大场景瞬间通了：</p>
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
        <strong>狄利克雷问题</strong>：给定边界 <MathInline tex="\partial D" /> 上的函数 g，求 D 内调和、边界上等于 g 的 u。
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

    <h3>相册里那个"消除路人"：它在解一个狄利克雷问题</h3>
    <p>
      手机相册里有个按钮，圈住照片上不想要的东西（一根电线、一个路人、脸上一颗痘），
      一点就没了，而且填回来的那块看不出破绽。
      这个功能最经典的那套算法，做的<strong>就是本讲第肆节那个狄利克雷问题</strong>，
      一字不差。
    </p>
    <p>
      <strong>翻译过来只有一句话。</strong>你圈住的那块区域，就是"内部 D"；
      紧挨着它一圈的、没被圈住的完好像素，就是"边界 <MathInline tex="\partial D" />"
      和边界值 g。要填的内容<strong>一个字节的信息都没有</strong>——原来那里是什么，
      已经被你亲手抹掉了。于是问题变成：<strong>给定边界上的亮度，
      求内部一个调和函数</strong>。而本讲第肆节说过，这个问题的解<strong>存在且唯一</strong>——
      所以"该填什么"根本没有第二种可能，算法只要老老实实解出来就行。
      解法也现成：把动画里那条"每点改成四邻平均"的迭代，
      在被圈住的区域上跑几百轮，边界像素钉死不动。
      <strong>你按下的那个按钮，跑的就是上面那块金属板。</strong>
    </p>
    <p>
      <strong>效果可以量。</strong>取一块 16×16 的图，挖掉正中 6×6 共 36 个像素，
      再用上面的办法从边界填回来，逐像素跟原图比对（灰度 0–255）：
    </p>
    <MathBlock tex="\text{平缓渐变（墙面 / 天空）：最大误差 } 1.2,\quad \text{均方根 } 0.6" />
    <p>
      三十六个像素凭空造出来，最坏的一个只差 1.2 级灰度——<strong>肉眼绝无可能看出</strong>。
      电线横在天空上、污点落在墙面上，这类修复之所以天衣无缝，
      靠的正是"天空和墙面本来就是调和的"：它们本来就没有内部极值，
      本来就等于邻居平均，算法猜的和真相是同一个东西。
    </p>
    <div class="insight">
      <div class="insight-title">💡 反过来读：最大值原理直接说明了它<strong>必然</strong>在哪儿翻车</div>
      <p>
        同样的实验，换两块难对付的图：
      </p>
      <MathBlock tex="\text{跨过一条锐利边缘：最大误差 } 73.6;\qquad \text{带周期纹理（砖墙）：最大误差 } 69.8" />
      <p>
        误差从 1.2 跳到七十几——修复区糊成一片，一眼假。
        而这<strong>不是算法不够聪明，是数学上就不可能</strong>，理由就是本讲的
        <strong>最大值原理</strong>：调和函数的极值只能在边界上取，
        所以填出来的那块<strong>永远不会比它周围更亮或更暗</strong>，
        <strong>它天生长不出任何细节</strong>——只会是一片从边界平滑过渡进去的糊状物。
      </p>
      <p>
        砖墙的纹理、草地的杂乱、人脸的五官，全都要求"内部有自己的起伏"，
        而这恰恰是调和函数被禁止做的事。
        <strong>一条纯数学的定理，划出了这类修复算法能力的绝对上限</strong>。
        所以后来的算法必须换路子：从图像别处<strong>搬</strong>一块相似的纹理过来贴上
        （纹理合成、PatchMatch），或者干脆让神经网络<strong>猜</strong>那里本该长什么
        （生成模型）——它们放弃了"内部无信息、全由边界定"这个前提，
        改成从别处引入信息。
        你手机上"消除"效果的这十几年进步史，本质是<strong>一路在逃离最大值原理</strong>。
      </p>
    </div>

    <h3>还买到了什么</h3>
    <ul>
      <li>
        <strong>物理的半壁江山</strong>：静电场设计（电容器、屏蔽罩——
        <router-link to="/complex/cauchy-integral">复变第 3 讲</router-link>用平均值性质
        算过的法拉第笼就是这一条）、不可压缩流体的势流
        （<router-link to="/complex/holomorphic">复变第 2 讲</router-link>那个机翼升力，
        第一步就是解它）、渗流、稳态扩散——凡是"源在边界、内部自洽"的静态问题，
        都是狄利克雷问题换皮；
      </li>
      <li>
        <strong>概率论的惊喜客串</strong>：让一个粒子从内部某点出发，
        每步等概率地朝上下左右挪一格，<strong>撞到边界就停下</strong>。那么
        <strong>板上任一点的温度，等于"从该点出发的随机游走最终撞到各条边的概率"
        对各边温度的加权平均</strong>。这不是比喻，是等式——下面那个框推给你看，
        并用五十万次模拟验过；
      </li>
      <li>
        <strong>格林函数：现代物理的日常工具</strong>：格林那本无人问津的小册子给出的"点源响应"方法，
        今天是量子场论（传播子）、电路分析（冲激响应）、地震勘探的标准语言；
      </li>
      <li>
        <strong>只剩一步</strong>：三大方程都认识了，波动与热还各自欠一个"为什么解长那样"的统一交代——
        <router-link to="/mathphys/separation">最后一讲</router-link>把三者一网打尽，
        也把整个网站的概念大会师。
      </li>
    </ul>
    <p>
      上面那条"温度 = 随机游走撞到各边的概率"是本讲最不像真的一句，
      可它的证明只有<strong>一行</strong>，而且这一行你已经会了：
    </p>
    <RevealBox
      title="🔍 一行证明温度就是随机游走撞界的概率，外加五十万次模拟对答案"
      label="对答案 / 看完整拆解"
    >
      <template #hint>
        先自己想：设 <MathInline tex="p(i,j)" /> 是"从格点 (i,j) 出发的游走，
        最终<strong>先撞到上边</strong>"的概率。第一步它等概率地走向四个邻居之一，
        走完之后<strong>它就成了一个从那个邻居出发的新游走</strong>。
        把这句话写成一个关于 <MathInline tex="p" /> 的等式——再和本讲第贰节那条结论比一比。
      </template>
      <p>
        <strong>第一步：对第一步做全概率分解。</strong>
        从 <MathInline tex="(i,j)" /> 出发有四种等可能的去向；一旦到了某个邻居，
        此后的命运<strong>只取决于新位置</strong>（游走没有记忆）。于是
      </p>
      <MathBlock tex="p(i,j) = \tfrac14\Bigl[p(i{-}1,j) + p(i{+}1,j) + p(i,j{-}1) + p(i,j{+}1)\Bigr]" />
      <p>
        <strong>看看这是什么——"自己 = 四邻的平均"</strong>，
        逐字就是第贰节推出来的离散调和方程。再看边界：
        站在上边界上，游走已经结束、撞的就是上边，所以 <MathInline tex="p = 1" />；
        站在其余三条边上 <MathInline tex="p = 0" />。
        <strong>所以 p 是一个调和函数，边界值为"上边取 1、其余取 0"。</strong>
      </p>
      <p>
        <strong>第二步：叠加。</strong>对四条边各做一次，得到四个概率函数。
        方程是线性的，按各边温度加权相加：
      </p>
      <MathBlock tex="u = T_{\text{上}}\,p_{\text{上}} + T_{\text{右}}\,p_{\text{右}} + T_{\text{下}}\,p_{\text{下}} + T_{\text{左}}\,p_{\text{左}}" />
      <p>
        它调和（调和函数的线性组合还是调和），且在每条边上恰好取到该边的温度。
        由第肆节的<strong>唯一性</strong>，它<strong>就是</strong>那个温度分布。证毕。
      </p>
      <p>
        <strong>第三步：真跑一遍。</strong>拿动画那块板（41×41，上 100°、右 50°、下 0°、左 0°），
        从板心放随机游走，统计撞到四条边的频率：
      </p>
      <MathBlock tex="\begin{aligned} 1{,}000\ \text{次} &: 23.7\%,\ 24.7\%,\ 27.4\%,\ 24.2\% \ \Rightarrow\ 36.05^\circ \\ 500{,}000\ \text{次} &: 25.07\%,\ 25.08\%,\ 24.89\%,\ 24.97\% \ \Rightarrow\ 37.61^\circ \end{aligned}" />
      <p>
        真值 <MathInline tex="37.50^\circ" />。四个概率各自趋近 25%——
        方板正中对四条边完全对称，本该如此，这也又一次给出"板心 = 四边平均"。
        换两个偏心点再验：(行 10, 列 30) 蒙特卡洛 64.89 对松弛法 64.80；
        (行 30, 列 10) 是 10.28 对 10.20。
      </p>
      <p>
        <strong>这为什么有用？</strong>注意上面只从<strong>一个点</strong>放游走，
        就得到了<strong>那个点</strong>的答案——全程没有解整块板。
        松弛法必须把 41×41 = 1681 个点一起算，而三维、更高维问题的格点数会指数爆炸
        （<router-link to="/mathphys/pde-intro">第 1 讲</router-link>算过天气预报那笔账）。
        <strong>随机游走的代价却与维数无关</strong>——它只关心你问的那一个点，
        误差按 <MathInline tex="1/\sqrt{N}" /> 下降。
        <router-link to="/probability/lln">概率论大数定律讲</router-link>那条
        "蒙特卡洛的收敛速度与维数无关"，在这里兑现成了一个解偏微分方程的办法。
        <strong>概率与位势论在深处是同一门学问，而它们的接头暗号就是"等于邻居平均"这一句。</strong>
      </p>
    </RevealBox>
    <div class="insight">
      <div class="insight-title">🔗 与你学过的课程连一连</div>
      <p>
        <strong>复变函数</strong>：调和 ⟺ <router-link to="/complex/holomorphic">解析函数</router-link>实部；
        平均值性质 ⟺ <router-link to="/complex/cauchy-integral">柯西积分公式</router-link>；
        保角映射是解二维位势问题的工程工具（复变第 2 讲那个机翼就是这么算的）；
        <strong>概率论</strong>：随机游走的撞界概率就是调和函数，而蒙特卡洛那条
        <MathInline tex="1/\sqrt{N}" /> 收敛率出自
        <router-link to="/probability/lln">大数定律讲</router-link>；
        <strong>数值分析</strong>：松弛法是<router-link to="/numerical/linear-system">迭代法</router-link>
        解大型稀疏线性方程组的鼻祖，收敛快慢由迭代矩阵的谱半径决定，
        <router-link to="/linear-algebra/eigen">线代第 5 讲</router-link>的特征值又一次现身；
        而本讲动画里"残差小 ≠ 误差小"那条教训，正是那一讲的正题。
      </p>
    </div>
  </ConceptPage>
</template>
