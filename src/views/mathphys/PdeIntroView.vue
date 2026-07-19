<script setup>
import ConceptPage from '../../components/ConceptPage.vue'
import MathBlock from '../../components/MathBlock.vue'
import MathInline from '../../components/MathInline.vue'
import PartialDerivDemo from '../../demos/PartialDerivDemo.vue'
</script>

<template>
  <ConceptPage slug="pde-intro">
    <h2><span class="sec-no">壹</span>困境：牛顿的方程管不了一根弦</h2>
    <p>
      你在微积分里见过的微分方程，未知量都是<strong>一个</strong>随时间变化的量。单摆是标准样板：
      摆角 θ(t) 一个函数，一条方程 <MathInline tex="\theta'' = -\frac{g}{l}\sin\theta" /> 就管住了它的一生。
      行星、炮弹、弹簧——18 世纪初的力学处理的都是这类"<strong>质点</strong>"：状态用有限几个数就能记全。
    </p>
    <p>
      可世界上大多数东西不是质点。绷紧的琴弦被拨动后，<strong>弦上每一点都在动</strong>，
      而且各动各的：中点甩得最凶，靠近端点的地方几乎不动。想记录弦在某一刻的状态，
      得记下<strong>每个位置的位移</strong>——不是几个数，是<strong>一整个函数</strong>。
      再让它随时间演化，未知量就成了双变量函数：
    </p>
    <MathBlock tex="u(x, t) = \text{时刻 } t \text{ 时，弦上位置 } x \text{ 处的位移}" />
    <p>
      这类"每一点都有值"的量，物理上叫<strong>场</strong>——温度场（屋里每一点各有温度）、
      压强场、引力场都是。质点力学的工具在场面前直接失灵：牛顿第二定律 F = ma 是写给一个质点的，
      弦上有无穷多个"质点"，难道写无穷多条方程？
    </p>
    <div class="story">
      <div class="story-title">📜 1690 — 1746 年 · 从悬链线到弦振动</div>
      <p>
        过渡是渐进的。1690 年代，约翰·伯努利与莱布尼茨解悬链线（铁链自然下垂的形状）——
        那还是"静止的场"，一个单变量函数。真正的门槛在 1746 年被<strong>达朗贝尔</strong>跨过：
        他给<strong>运动中的弦</strong>写下了历史上第一个偏微分方程。关键的思想装备此前刚刚配齐——
        <strong>欧拉</strong>在 1734 年左右定型了偏导数的记号与演算规则（∂ 这个弯尾巴的 d，
        正是为了提醒你"还有别的变量被我冻结了"）。
      </p>
    </div>

    <h2><span class="sec-no">贰</span>破局：切片！多变量退回单变量</h2>
    <p>
      面对 u(x, t) 这张"函数地毯"，18 世纪的答案朴素而有效：<strong>一次只看一刀切片</strong>。
    </p>
    <div class="insight">
      <div class="insight-title">💡 核心直觉：偏导数 = 冻结其余变量后的普通导数</div>
      <p>
        <strong>固定时刻 t₀</strong>，让 x 变——得到那一瞬间整根弦的形状，一张<strong>照片</strong>；
        照片是单变量函数，微积分全套工具直接可用，它的导数记作 <MathInline tex="\partial u/\partial x" />（弦形斜率）。
        <strong>固定位置 x₀</strong>，让 t 变——得到那一点的完整振动史，一张<strong>心电图</strong>；
        它的导数记作 <MathInline tex="\partial u/\partial t" />（该点速度）。
        偏导数没有任何新运算——<strong>新的只是"切之前先声明按哪个方向切"这个动作</strong>。
        二阶偏导同理：<MathInline tex="\partial^2 u/\partial x^2" /> 是照片的弯曲程度（凹凸），
        <MathInline tex="\partial^2 u/\partial t^2" /> 是那一点的加速度。
      </p>
    </div>
    <p>
      于是"无穷多条方程"的困境有了出路：不必给每个点单独立法，只需写<strong>一条对所有 (x, t) 同时成立的、
      连接各方向偏导数的等式</strong>——它在每一点各自兑现，一条顶无穷条。这样的等式就叫
      <strong>偏微分方程</strong>（PDE）。比如下一讲将推出的弦方程
      <MathInline tex="u_{tt} = c^2 u_{xx}" />（下标是偏导的简写），翻译成人话是：
      <strong>"每一点的加速度，正比于弦形在该点的弯曲程度"</strong>——凹下去的地方被往上拽，
      凸起来的地方被往下拉。物理内容如此平实，符号却常把人吓住；这门课的任务就是反复做这种翻译。
    </p>

    <h2><span class="sec-no">叁</span>亲手切一切 u(x, t)</h2>
    <PartialDerivDemo />

    <h2><span class="sec-no">肆</span>严格定义</h2>
    <div class="definition">
      <div class="def-title">📐 定义（偏导数）</div>
      <p>设 u(x, t) 为二元函数。u 关于 x 的<strong>偏导数</strong>为</p>
      <MathBlock tex="\frac{\partial u}{\partial x}(x_0, t_0) = \lim_{h \to 0} \frac{u(x_0 + h,\ t_0) - u(x_0,\ t_0)}{h}" />
      <p>
        即固定 t = t₀ 后对 x 的普通导数；<MathInline tex="\partial u/\partial t" /> 同理。
        含未知函数偏导数的等式称为<strong>偏微分方程</strong>，其中最高偏导的阶数称为方程的<strong>阶</strong>。
      </p>
    </div>
    <p>几处要点：</p>
    <ul>
      <li>
        <strong>极限式里只有一个变量在动</strong>：t₀ 原封不动地抄了两遍——"冻结"不是比喻，是定义的字面内容。
        所以你会算普通导数就会算偏导数：对 x 求偏导时把 t 当常数即可，
        如 <MathInline tex="\partial(x^2 t^3)/\partial x = 2xt^3" />；
      </li>
      <li>
        <strong>方程要"处处成立"</strong>：PDE 的一个解是一个<strong>函数</strong> u(x,t)，
        它得让等式在定义域每一点都兑现——检验解只需代入求偏导，但<strong>找</strong>解是另一回事，
        这门课后面全在讲怎么找；
      </li>
      <li>
        <strong>光有方程不够，还要"初始 + 边界"</strong>：常微分方程定一个解要初值（单摆的初始角度与角速度）；
        PDE 同理但更多——弦要给<strong>初始形状和初始速度</strong>（两个函数！因为方程对 t 是二阶的），
        还要给<strong>边界条件</strong>（两端钉死：u(0,t) = u(L,t) = 0）。
        "方程 + 初始条件 + 边界条件"合称定解问题，三者缺一，解就不唯一；
      </li>
      <li>
        <strong>混合偏导可交换</strong>：<MathInline tex="\partial_x \partial_t u = \partial_t \partial_x u" />
        （函数足够光滑时）——先沿哪个方向切不影响结果，后面推导会反复默用这一条。
      </li>
    </ul>

    <h2><span class="sec-no">伍</span>买到了什么：一门课的语言，三大主角的名片</h2>
    <p>语言已备齐，先把即将登场的三位主角的名片发给你——它们长得像，秉性迥异：</p>
    <ul>
      <li>
        <strong>波动方程</strong> <MathInline tex="u_{tt} = c^2 u_{xx}" />：加速度 ∝ 弯曲度。
        时间上二阶 ⇒ 时间可逆（倒放录像照样合法）、能量守恒、扰动以有限速度 c 传播。琴弦、声波、光都是它；
      </li>
      <li>
        <strong>热传导方程</strong> <MathInline tex="u_t = a^2 u_{xx}" />：变化率 ∝ 弯曲度。
        时间上<strong>一阶</strong>——就差这一阶，性情剧变：不可逆（热不会自己聚回去）、抹平一切、瞬时传播。
        热扩散、墨水扩散、（你在概率论见过的）布朗运动的密度演化都是它；
      </li>
      <li>
        <strong>拉普拉斯方程</strong> <MathInline tex="u_{xx} + u_{yy} = 0" />：没有时间——
        它管的是一切尘埃落定后的<strong>稳态</strong>。引力势、静电势、稳定温度分布。
        复变课已剧透：解析函数的实虚部都是它的解。
      </li>
    </ul>
    <div class="insight">
      <div class="insight-title">🔗 与你学过的课程连一连</div>
      <p>
        <strong>微积分</strong>：偏导数就是"切片 + 求导"，多元函数的方向导数、梯度是它的直系亲属；
        <strong>线性代数</strong>：注意三大方程都是<strong>线性</strong>的（解的叠加还是解）——
        向量空间讲说过"解集构成向量空间"，这将是整门课最锋利的武器；
        <strong>计算数学</strong>：动画里用差商近似偏导（(u(x+h)−2u(x)+u(x−h))/h²），
        正是数值解 PDE 的差分法的第一步。
      </p>
    </div>
  </ConceptPage>
</template>
