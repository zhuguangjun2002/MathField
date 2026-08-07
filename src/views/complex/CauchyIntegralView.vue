<script setup>
import ConceptPage from '../../components/ConceptPage.vue'
import MathBlock from '../../components/MathBlock.vue'
import MathInline from '../../components/MathInline.vue'
import RevealBox from '../../components/RevealBox.vue'
import QuizBox from '../../components/QuizBox.vue'
import PathIntegralDemo from '../../demos/PathIntegralDemo.vue'
</script>

<template>
  <ConceptPage slug="cauchy-integral">
    <h2><span class="sec-no">壹</span>困境：路径千万条，积分值听谁的</h2>
    <p>
      开讲之前先说清楚一件事：<MathInline tex="\int_\Gamma f(z)\,dz" /> 到底在算什么。
      这个记号长得跟实数积分一模一样，含义却换了人。
    </p>
    <p>
      <strong>实数积分是把区间切碎。</strong><MathInline tex="\int_a^b f(x)\,dx" /> 的做法是：
      把 <MathInline tex="[a, b]" /> 切成许多小段，每段取一个样点，算
      <MathInline tex="\sum f(x_k)\,\Delta x_k" />，再让段数趋于无穷。
      这里 <MathInline tex="\Delta x_k" /> 是一个正的小数（段长），乘上去等于"把高度按宽度摊开"，
      所以结果读作面积。
    </p>
    <p>
      <strong>复积分是把曲线切碎。</strong>做法一模一样：在复平面上指定一条曲线 Γ，
      把它切成许多小段，每段取一个样点 <MathInline tex="z_k" />，算
      <MathInline tex="\sum f(z_k)\,\Delta z_k" />，再让段数趋于无穷。
      变的只有一处，但这一处改变了一切：<strong><MathInline tex="\Delta z_k" /> 是个复数</strong>——
      它是"从这一小段的头指向尾"的那个箭头，既有长度也有<strong>方向</strong>。
      于是 <MathInline tex="f(z_k)\,\Delta z_k" /> 是一次<strong>复数乘法</strong>，
      而<router-link to="/complex/imaginary">第 1 讲</router-link>讲过，
      复数乘法 = 旋转 + 伸缩。所以复积分不是在摊面积，它是在把一串"转一下、缩一下"的小箭头首尾接起来，
      看最后落到哪儿。结果自然也是个复数。
    </p>
    <p>
      <strong>实际怎么算？把曲线参数化。</strong>给 Γ 写一个参数方程
      <MathInline tex="z(t)" />（<MathInline tex="t" /> 从 <MathInline tex="\alpha" /> 走到
      <MathInline tex="\beta" />），那么 <MathInline tex="\Delta z \approx z'(t)\,\Delta t" />，
      求和的极限就变成一个普通的、对实变量 <MathInline tex="t" /> 的积分：
    </p>
    <MathBlock tex="\int_\Gamma f(z)\,dz = \int_\alpha^\beta f\bigl(z(t)\bigr)\, z'(t)\, dt" />
    <p>
      这就是复积分的全部操作说明：<strong>选一条路，把路写成参数方程，代进去积</strong>。
      注意"选一条路"这四个字——它正是麻烦的开端。
    </p>
    <p>
      实数轴上的定积分 <MathInline tex="\int_a^b" /> 没有歧义：从 a 到 b 只有一条路。
      复平面上麻烦来了：从 A 到 B 有<strong>无穷多条路径</strong>，
      每条路径都给出一个积分值。于是一个尴尬的问题横在所有人面前：
      <strong>换条路径，积分值变不变？</strong>
    </p>
    <p>
      这个问题不能靠猜，得真算一次。下面这个例子同时给出了两种答案——
      而分水岭恰好是<router-link to="/complex/holomorphic">上一讲</router-link>的解析性。
    </p>
    <RevealBox
      title="🔍 同样两条路径，一个函数给同一个答案，另一个给两个答案"
      label="对答案 / 看完整拆解"
    >
      <template #hint>
        先自己动笔：从 0 走到 1+i，走两条路——① 直线；② 先沿实轴到 1，再竖直上到 1+i。
        分别算 <MathInline tex="\int z\,dz" /> 与 <MathInline tex="\int \bar z\,dz" /> 这两个积分
        （<MathInline tex="\bar z" /> 是共轭，把 <MathInline tex="a+bi" /> 变
        <MathInline tex="a-bi" />）。四个数，算完再点开。
      </template>
      <p>
        <strong>先算 <MathInline tex="f(z) = z" />。</strong>
        路径①：<MathInline tex="z(t) = t(1+i)" />，<MathInline tex="t \in [0,1]" />，
        于是 <MathInline tex="z'(t) = 1+i" />，
      </p>
      <MathBlock tex="\int_0^1 t(1+i)\cdot(1+i)\,dt = (1+i)^2\int_0^1 t\,dt = 2i \cdot \tfrac12 = i" />
      <p>
        路径②分两段。实轴那段 <MathInline tex="z = t" />、<MathInline tex="dz = dt" />，
        给出 <MathInline tex="\int_0^1 t\,dt = \tfrac12" />；竖直那段
        <MathInline tex="z = 1 + it" />、<MathInline tex="dz = i\,dt" />，给出
      </p>
      <MathBlock tex="\int_0^1 (1+it)\, i\,dt = i + i^2\!\int_0^1 t\,dt = i - \tfrac12" />
      <p>两段相加：<MathInline tex="\tfrac12 + (i - \tfrac12) = i" />。<strong>两条路同一个答案。</strong></p>
      <p>
        <strong>再算 <MathInline tex="f(z) = \bar z" />。</strong>路径①上
        <MathInline tex="\bar z = t(1-i)" />，
      </p>
      <MathBlock tex="\int_0^1 t(1-i)\cdot(1+i)\,dt = (1-i)(1+i)\int_0^1 t\,dt = 2\cdot\tfrac12 = 1" />
      <p>
        路径②：实轴那段 <MathInline tex="\bar z = t" />，仍给 <MathInline tex="\tfrac12" />；
        竖直那段 <MathInline tex="\bar z = 1 - it" />、<MathInline tex="dz = i\,dt" />，给出
      </p>
      <MathBlock tex="\int_0^1 (1-it)\, i\,dt = i - i^2\!\int_0^1 t\,dt = i + \tfrac12" />
      <p>
        两段相加：<MathInline tex="\tfrac12 + (i + \tfrac12) = 1 + i" />。
        <strong>两条路两个答案</strong>：<MathInline tex="1" /> 和 <MathInline tex="1+i" />。
      </p>
      <p>
        差别在哪？<MathInline tex="z" /> 处处解析，而 <MathInline tex="\bar z" /> 正是上一讲开篇那个
        <strong>处处不可导</strong>的反例。所以"路径无关"不是复积分的通性，
        它是<strong>解析函数独有的特权</strong>——这一讲要做的，就是把这句话变成定理。
      </p>
    </RevealBox>
    <p>
      若积分值依赖路径，复积分就是一门"曲线簿记学"，每条路各记各账，理论价值有限；
      若不依赖路径，那"从 A 积到 B"就是良定义的——整套微积分基本定理的框架才搬得过来。
      18 世纪的欧拉、拉普拉斯已经在用"换路径算积分"的技巧偷偷解实积分（算得对，但不知道为什么对），
      这门"实验数学"急需一个定理来兜底。
    </p>
    <div class="story">
      <div class="story-title">📜 1814 — 1825 年 · 柯西的兜底定理</div>
      <p>
        <strong>柯西</strong>1814 年的论文还在小心翼翼地把复积分拆成两个实的线积分处理；
        到 1825 年《关于积分限为虚数的定积分的报告》，他给出了干净的断言：
        <strong>被积函数在回路内处处解析，则回路积分为零</strong>。
        （后来古萨在 1900 年去掉了"导数连续"的多余假设，所以教科书叫"柯西-古萨定理"。）
        有趣的是柯西本人对"复数是什么"长期心存疑虑——他建大厦时，地基的哲学问题还没解决。
      </p>
    </div>

    <h2><span class="sec-no">贰</span>破局：回路积分为零 ⟺ 路径无关</h2>
    <p>
      先看两句话怎么等价。取两条同起点同终点的路径 <MathInline tex="\Gamma_1" />、
      <MathInline tex="\Gamma_2" />：正着走完 <MathInline tex="\Gamma_1" />，
      再<strong>倒着</strong>走 <MathInline tex="\Gamma_2" /> 回来，就拼成了一条闭合回路。
      而倒着走一条路径，每一小段的 <MathInline tex="\Delta z" /> 都掉头，积分整体变号，所以这条回路的积分是
      <MathInline tex="\int_{\Gamma_1} f\,dz - \int_{\Gamma_2} f\,dz" />。
      它为零，正好就是两条路径同值。反过来也一样（任一回路都能从中间切成两条同端点的路径）。于是
    </p>
    <MathBlock tex="\oint f\,dz = 0 \ \text{（一切回路）} \quad\Longleftrightarrow\quad \int_{\Gamma_1} f\,dz = \int_{\Gamma_2} f\,dz \ \text{（同端点的一切路径）}" />
    <p>
      式子里那个 <MathInline tex="\oint" /> 是这一讲起会一直用的记号，先念一遍：
      它<strong>就是普通的复积分</strong> <MathInline tex="\int_\Gamma f\,dz" />，
      算法一模一样（参数化再积），圈上加那一笔只是<strong>特别标明"沿一条闭合回路积一整圈"</strong>——
      提醒你起点和终点是同一个点。往下凡见到它，都可以直接读成"绕一圈的积分"。
    </p>
    <p>
      为什么解析函数的回路积分是零？只要两把工具，先请出第一把：<strong>格林公式</strong>。
      <strong>这一段是选读</strong>：它要借一件站外的工具——格林公式属于<strong>多元微积分</strong>，
      站内目前没有一门课覆盖它。还没学过多元微积分的话，把这一段当黑箱路过完全不影响本讲：
      本讲的结论在叁节的动画里可以亲手实测，肆节那条积分公式也另有独立的支撑
      （把回路缩到奇点身上，只用到本讲后面自己动手算出来的那个 2πi）。
      格林公式是"把回路积分换成面积分"的定理，说的是对平面上一条闭回路 Γ 与它围住的区域 D，
    </p>
    <MathBlock tex="\oint_\Gamma \bigl(P\,dx + Q\,dy\bigr) = \iint_D \Bigl(\frac{\partial Q}{\partial x} - \frac{\partial P}{\partial y}\Bigr)\, dA" />
    <p>
      右边两个陌生记号也各念一句。<MathInline tex="\iint_D \cdots\, dA" /> 读作
      "<strong>把被积的量在整块区域 D 上逐小块加总</strong>"——
      一元积分是把一条线段切成小段、每段量一个长度，
      二重积分是把一整块面积切成小方块、每块量一个面积，道理一层不变，只是切的东西从线变成了面。
      而 <MathInline tex="dA" /> 就是"<strong>一小块面积</strong>"（A 取自 area），
      它扮演的角色跟一元积分里的 <MathInline tex="dx" /> 完全一样：
      括号里那一坨是每小块贡献的量，<MathInline tex="dA" /> 是这一小块有多大，两者相乘再全部加起来。
    </p>
    <p>
      直觉是这样的：把 D 切成无数小方块，每个小方块自己绕一圈（这一圈的值就是右边那个被积式，
      正是<router-link to="/complex/holomorphic">上一讲</router-link>算过的<strong>环量</strong>），
      再把所有小方块的圈加起来——相邻两块共用的边被走了两遍、方向相反，<strong>全部抵消</strong>，
      只剩最外圈那条没人配对的边界。所以"内部所有微元的旋转之和 = 边界上绕一圈"。
      牛顿-莱布尼茨也是这个套路（内部导数的累积 = 两端点之差），只是升了一维。
    </p>
    <p>
      第二把工具是<router-link to="/complex/holomorphic">上一讲</router-link>那两条方程。
      它待会儿要被反复代入，这里先原地请回来一次，不必翻回去。
      把 <MathInline tex="f" /> 按实部虚部拆开写成
      <MathInline tex="f(x + iy) = u(x, y) + i\,v(x, y)" />（<MathInline tex="u" />、
      <MathInline tex="v" /> 是两个普通的二元实函数），"复可导"要求差商
      <MathInline tex="\bigl(f(z+\Delta z) - f(z)\bigr)/\Delta z" /> 沿<strong>任何</strong>方向趋近，
      都收敛到同一个复数。只挑最省事的两个方向比一比，就已经很致命了：
    </p>
    <ul>
      <li>
        沿实轴走（<MathInline tex="\Delta z = \Delta x" />，分母是个实数）：
        差商极限是 <MathInline tex="u_x + i\,v_x" />；
      </li>
      <li>
        沿虚轴走（<MathInline tex="\Delta z = i\,\Delta y" />）：分母多出一个
        <MathInline tex="i" />，而 <MathInline tex="1/i = -i" />，
        它把实虚部对调并带一个负号，于是极限是 <MathInline tex="v_y - i\,u_y" />。
      </li>
    </ul>
    <p>
      （这里 <MathInline tex="u_x" /> 是偏导数 <MathInline tex="\partial u/\partial x" /> 的简写，
      其余同理。）两个结果必须是同一个复数，实部对实部、虚部对虚部，就逼出两条等式：
    </p>
    <MathBlock tex="\underbrace{u_x = v_y}_{\text{第一条}} \qquad\qquad \underbrace{u_y = -v_x}_{\text{第二条}}" />
    <p>
      这就是<strong>柯西-黎曼方程</strong>（常简称 C-R 方程）。要紧的是它的身份：
      它<strong>不是额外添的假设，而是"f 解析"这句话的逐点翻译</strong>——
      说 f 在区域 D 内解析，就等于说 <MathInline tex="u" />、<MathInline tex="v" /> 在 D 的
      每一点都满足这两条。上一讲还给了它一个几何读法：这两条等式说的是
      <MathInline tex="(u, v)" /> 的雅可比矩阵必须长成
      <MathInline tex="\begin{bmatrix} a & -b \\ b & a \end{bmatrix}" /> 的形状，
      而那正是"乘一个复数"的矩阵——局部只许旋转加伸缩，不许剪切。
      下面的证明只用到这两条等式本身，把它们当成两句随时可代入的换算规则就够了。
    </p>
    <p>
      两把工具凑齐，柯西定理的证明只有四行——而且两条柯西-黎曼方程各消掉一半，干净得不像话：
    </p>
    <RevealBox
      title="🔍 四行：把 f dz 拆开，格林公式一套，两条 C-R 方程各消一半"
      label="对答案 / 看完整拆解"
    >
      <template #hint>
        先自己动笔：写 <MathInline tex="f = u + iv" />、<MathInline tex="dz = dx + i\,dy" />，
        把 <MathInline tex="f\,dz" /> 乘开，分成实部与虚部两个
        <MathInline tex="P\,dx + Q\,dy" /> 形式的线积分。再对每个套一次格林公式，
        看看被积式能不能被 <MathInline tex="u_x = v_y,\ u_y = -v_x" /> 打成零。
      </template>
      <p><strong>第一步：乘开。</strong></p>
      <MathBlock tex="f\,dz = (u + iv)(dx + i\,dy) = \underbrace{(u\,dx - v\,dy)}_{\text{实部}} + \; i\underbrace{(v\,dx + u\,dy)}_{\text{虚部}}" />
      <p>
        <strong>第二步：实部套格林公式。</strong>这里
        <MathInline tex="P = u" />、<MathInline tex="Q = -v" />，所以被积式是
        <MathInline tex="\partial_x(-v) - \partial_y u = -v_x - u_y" />。
        代入柯西-黎曼的第二条 <MathInline tex="u_y = -v_x" />：
      </p>
      <MathBlock tex="-v_x - u_y = -v_x - (-v_x) = 0" />
      <p>
        <strong>第三步：虚部套格林公式。</strong>这里
        <MathInline tex="P = v" />、<MathInline tex="Q = u" />，被积式是
        <MathInline tex="\partial_x u - \partial_y v = u_x - v_y" />。
        代入第一条 <MathInline tex="u_x = v_y" />：
      </p>
      <MathBlock tex="u_x - v_y = v_y - v_y = 0" />
      <p>
        <strong>第四步：收工。</strong>两个面积分的被积式<strong>逐点</strong>为零，
        面积分自然为零，于是 <MathInline tex="\oint_\Gamma f\,dz = 0 + i\cdot 0 = 0" />。
      </p>
      <p>
        值得回味的是分工：柯西-黎曼有两条方程，这里<strong>一条管实部、一条管虚部</strong>，
        一条不多一条不少。上一讲那个"各方向导数必须一致"的苛刻要求，在积分层面兑现成了
        "整体无账可记"。（严格地说这套证明还借用了"导数连续"，古萨 1900 年用另一条路把这个多余假设去掉了，
        结论不变。）
      </p>
    </RevealBox>
    <div class="insight">
      <div class="insight-title">💡 核心直觉：无源的场，绕一圈白绕</div>
      <p>
        <router-link to="/complex/holomorphic">上一讲</router-link>说过，
        一个解析函数就是一整个<strong>无源无旋的流场</strong>：
        柯西-黎曼方程保证它每一点既不冒水（无源）也不打旋（无旋）。
        沿闭合回路积分，就是沿途把这个流场的账收一遍——场里没有源头也没有旋涡，
        <strong>绕一圈收支必然平衡</strong>。这跟重力场做功只看高度差是同一个逻辑。
      </p>
      <p>
        而且这里不止是比喻，是<strong>等号</strong>。把上面拆开的两半读一遍就看见了。
        写 <MathInline tex="f = u + iv" />，取向量场 <MathInline tex="\vec V = (u,\, -v)" />——
        也就是把 <MathInline tex="f" /> 的共轭直接当速度场读（上一讲是另一种读法：把
        <MathInline tex="f" /> 当复势，速度藏在 <MathInline tex="f'" /> 里；两种读法算的是同一件事，
        因为上一讲那个速度场正是 <MathInline tex="f'" /> 的共轭）。此时
        <MathInline tex="\oint(u\,dx - v\,dy)" /> 正是 <MathInline tex="\vec V" /> 沿 Γ 的
        <strong>环量</strong>（转了多少），<MathInline tex="\oint(v\,dx + u\,dy)" /> 正是它穿过 Γ 的
        <strong>净流量</strong>（漏出去多少）。而
        <MathInline tex="\vec V" /> 无旋无源这两条，展开正好就是柯西-黎曼那两条方程。于是
      </p>
      <MathBlock tex="\oint_\Gamma f(z)\,dz = \underbrace{(\text{环量})}_{\text{实部}} + \; i\underbrace{(\text{净流量})}_{\text{虚部}}" />
      <p>
        柯西定理于是有了一句物理翻译：<strong>无旋 ⇒ 实部为零，无源 ⇒ 虚部为零</strong>。
        一个复数等式，装的是两条物理守恒。
      </p>
      <p>
        反过来，一旦回路里包进一个<strong>奇点</strong>（函数在那里不再解析的点，
        比如 <MathInline tex="1/z" /> 的 <MathInline tex="z=0" />、
        <MathInline tex="1/(z-2)^3" /> 的 <MathInline tex="z=2" />），
        它就是场里的一眼泉眼或一个旋涡芯——绕它一圈收集到的账不再是零。
        <strong>奇点是复平面上唯一"存账"的地方</strong>。
      </p>
    </div>
    <p>
      奇点存的账能精确算出来，而且只用刚才那条"参数化再积"的操作说明。
      最重要的样本是 <MathInline tex="f(z) = 1/z" />，回路取绕原点的单位圆。
      <strong>先约定方向</strong>：回路一律按<strong>逆时针</strong>走算正方向
      （倒着走一遍，每个 <MathInline tex="\Delta z" /> 都反向，积分整体变号——所以方向必须先说定）。
      逆时针的单位圆写成参数方程就是 <MathInline tex="z(\theta) = e^{i\theta}" />，
      <MathInline tex="\theta" /> 从 0 走到 <MathInline tex="2\pi" />。
    </p>
    <p>
      于是 <MathInline tex="z'(\theta) = i\,e^{i\theta}" />（<MathInline tex="e^{i\theta}" /> 对
      <MathInline tex="\theta" /> 求导多掉一个 <MathInline tex="i" /> 出来，
      这是<router-link to="/complex/imaginary">第 1 讲</router-link>欧拉公式那条），代进公式：
    </p>
    <MathBlock tex="\oint \frac{dz}{z} = \int_0^{2\pi} \frac{1}{e^{i\theta}}\cdot i\,e^{i\theta}\, d\theta = \int_0^{2\pi} i\, d\theta = 2\pi i" />
    <p>
      分子分母那个 <MathInline tex="e^{i\theta}" /> 抵消得如此干脆，值得停一秒：
      被积式化成了常数 <MathInline tex="i" />，剩下的只是"<MathInline tex="\theta" /> 走了多长"。
      也就是说这个 <MathInline tex="2\pi" /> 不是算出来的长度或面积，
      <strong>它就是绕原点转过的角度</strong>——转一圈是 <MathInline tex="2\pi" />，
      转两圈就是 <MathInline tex="4\pi" />。积分值在数<strong>圈数</strong>。
    </p>
    <p>
      更值得注意的是：不管圆多大、甚至不管什么形状，答案永远是 <strong>2πi</strong>。
      理由就是上面那条定理——把两条不同的回路正走一条、倒走一条拼起来，
      得到的闭合回路<strong>把奇点夹在了外面</strong>，它围住的区域里 f 处处解析，
      所以这个拼出来的回路积分为零，两条回路的积分因此相等。换句话说：
      <strong>回路可以随意拉扯变形，只要变形过程中不跨过奇点，积分值一动不动</strong>。
      这个"变形不变性"就是下面动画让你亲手玩的东西，也是整个复分析最常用的一招。
    </p>
    <QuizBox
      quiz-id="cauchy-integral-q1"
      question="柯西定理说解析函数的回路积分为零。那么只要 f 解析，任何回路的积分就都是零吗？"
      hint="函数 1/z 在原点以外的每一点都解析——可它绕原点一圈给的是多少？"
      :options="[
        { t: '不总是：要看这条回路「围住的那块区域里」有没有奇点，把奇点圈进来就不是零了', why: '对。定理的条件是「f 在回路及其内部处处解析」，这句话是对回路围住的那一整块地方说的，不是对回路那条线说的。$1/z$ 在原点以外处处解析，可绕原点一圈给的是 $2\\pi i$——奇点被圈在了肚子里。奇点是复平面上唯一存账的地方。' },
        { t: '都是零：柯西定理没有别的附加条件，函数解析就够了', why: '漏掉了定理里最要紧的半句：「在回路『及其内部』解析」。$1/z$ 正是现成的反例——它在原点以外的每一点都解析，绕原点的回路却给出 $2\\pi i$。数学结论的适用范围写在假设里，把结论从假设里拆出来单读，就会得到这个错觉。' },
        { t: '不总是：积分值还取决于回路的形状和大小，圆和长方形会给出不同的数', why: '恰好相反，这正是本节末尾那条最想让你记住的话：回路可以随意拉扯变形，只要变形过程中不跨过奇点，积分值一动不动。圆、长方形、歪歪扭扭的圈，只要都绕原点一圈，$\\oint dz/z$ 一律是 $2\\pi i$。下面的动画就是让你拖着路径鼓来鼓去，盯着读数看它纹丝不动。' },
      ]"
      :answer="0"
    />

    <h2><span class="sec-no">叁</span>亲手变形一条积分路径</h2>
    <p>
      动画里两个端点 <MathInline tex="A = -2" />、<MathInline tex="B = 2" /> 钉死不动，
      中间那条红色路径可以鼓起来：滑杆<strong>路径隆起高度</strong>给的是路径中点被抬高多少
      （单位就是复平面上的长度，即路径最高处的虚部；取负值就是往下鼓）。
      路径的方程是 <MathInline tex="z(s) = (-2 + 4s) + i\,h\sin(\pi s)" />，
      <MathInline tex="s" /> 从 0 到 1、<MathInline tex="h" /> 就是那根滑杆。
      读数区里的积分值是<strong>当场数值算的</strong>（把路径切成 2000 段求和），不是查表来的。
    </p>
    <PathIntegralDemo />

    <h2><span class="sec-no">肆</span>严格定义</h2>
    <div class="definition">
      <div class="def-title">📐 定理（柯西-古萨积分定理，1825 / 1900）</div>
      <p>
        设 f 在<strong>单连通</strong>区域 D 内解析，Γ 是 D 内任一分段光滑闭合曲线，则
      </p>
      <MathBlock tex="\oint_\Gamma f(z)\, dz = 0" />
    </div>
    <p>
      定理里那句"<strong>分段光滑</strong>"只是把病态曲线挡在门外：
      曲线可以有几个拐角（比如一个长方形回路），但每一段都要有切线、能写出参数方程，
      否则前面那条"<MathInline tex="\int f(z(t))z'(t)dt" />"根本没法写。日常见到的回路都合格。
    </p>
    <div class="definition">
      <div class="def-title">📐 定理（柯西积分公式，1831）</div>
      <p>设 f 在闭回路 Γ 及其内部解析，z₀ 为 Γ 内任一点，则</p>
      <MathBlock tex="f(z_0) = \frac{1}{2\pi i} \oint_\Gamma \frac{f(z)}{z - z_0}\, dz" />
    </div>
    <p>
      第二个框比第一个更该问一句"凭什么"：为什么偏要除以
      <MathInline tex="z - z_0" />？那个 <MathInline tex="1/2\pi i" /> 又是从哪冒出来的？
      其实它不是猜出来的公式，是<strong>前面两个结论一撞就掉下来的</strong>——
      用的正是刚才那招"回路随便变形"，加上 <MathInline tex="\oint dz/z = 2\pi i" />。
    </p>
    <RevealBox
      title="🔍 把回路缩到奇点身上，积分公式自己掉出来"
      label="对答案 / 看完整拆解"
    >
      <template #hint>
        先自己想一步：<MathInline tex="g(z) = f(z)/(z - z_0)" /> 在 Γ 内部只有一个地方不解析，
        是哪儿？既然回路可以随意变形而不改积分值，那把 Γ 缩成一个<strong>紧贴
        <MathInline tex="z_0" /> 的小圆</strong>会发生什么——小圆上的 <MathInline tex="f(z)" />
        大约等于多少？
      </template>
      <p>
        <strong>第一步：找出唯一的奇点。</strong>被积函数
        <MathInline tex="g(z) = \dfrac{f(z)}{z - z_0}" /> 里，分子 <MathInline tex="f" /> 按假设处处解析，
        唯一出问题的地方是分母为零处，即 <MathInline tex="z = z_0" /> 这一个点。
      </p>
      <p>
        <strong>第二步：把回路缩成小圆。</strong>Γ 与"圆心 <MathInline tex="z_0" />、
        半径 <MathInline tex="\varepsilon" /> 的小圆 <MathInline tex="C_\varepsilon" />"之间的那圈区域里，
        <MathInline tex="g" /> 处处解析（奇点被挖在小圆里面了）。按变形不变性，
        两条回路的积分相等——而且 <MathInline tex="\varepsilon" /> 要多小有多小：
      </p>
      <MathBlock tex="\oint_\Gamma \frac{f(z)}{z - z_0}\, dz = \oint_{C_\varepsilon} \frac{f(z)}{z - z_0}\, dz" />
      <p>
        <strong>第三步：小圆上把 f 当常数提出去。</strong>
        <MathInline tex="f" /> 解析当然也连续，小圆缩得够小时圆周上的
        <MathInline tex="f(z)" /> 与 <MathInline tex="f(z_0)" /> 要多接近有多接近，于是
      </p>
      <MathBlock tex="\oint_{C_\varepsilon} \frac{f(z)}{z - z_0}\, dz \;\longrightarrow\; f(z_0) \oint_{C_\varepsilon} \frac{dz}{z - z_0}" />
      <p>
        <strong>第四步：剩下那个积分我们刚算过。</strong>把变量挪一下
        （<MathInline tex="w = z - z_0" />，小圆就变回绕原点的圆），它就是
        <MathInline tex="\oint dw/w = 2\pi i" />。所以整个积分等于
        <MathInline tex="2\pi i\, f(z_0)" />，两边除以 <MathInline tex="2\pi i" /> 就是公式。
      </p>
      <p>
        回头看那两个"凭什么"：除以 <MathInline tex="z - z_0" /> 是为了<strong>在
        <MathInline tex="z_0" /> 处人为制造一个奇点</strong>，好让回路能缩到它身上把
        <MathInline tex="f(z_0)" /> 逼出来；<MathInline tex="1/2\pi i" /> 则纯粹是
        <strong>除掉转一圈那个 <MathInline tex="2\pi i" /></strong> 的归一化因子，没有别的深意。
      </p>
    </RevealBox>
    <p>逐词拆解：</p>
    <ul>
      <li>
        <strong>"单连通"不是官样文章</strong>：它要求区域没有洞。1/z 在圆环区域（挖掉原点）里处处解析，
        回路积分却是 2πi——因为回路绕着洞，没法在区域内缩成一点。拓扑第一次在分析里刷存在感：
        <strong>积分值看的是回路绕了洞几圈</strong>（这个"圈数"观点直通下一讲）；
      </li>
      <li>
        <strong>积分公式是"全息原理"</strong>：只要知道 f 在边界 Γ 上的值，圆内<strong>每一点</strong>的值都被公式定死。
        解析函数没有隐私——边界数据决定内部一切。对比实函数：边界值对内部毫无约束力；
      </li>
      <li>
        <strong>上一讲的奇迹在此结案</strong>：积分公式的右边，<MathInline tex="z_0" /> 只出现在
        分母 <MathInline tex="z - z_0" /> 里，而积分是对 <MathInline tex="z" /> 做的、
        跟 <MathInline tex="z_0" /> 无关。所以要对 <MathInline tex="z_0" /> 求导，
        <strong>只需对那个分母求导</strong>——积分号照抄不误。
        <MathInline tex="\partial_{z_0}(z-z_0)^{-1} = (z-z_0)^{-2}" />，再求一次得
        <MathInline tex="2(z-z_0)^{-3} " />，如此下去：
        <MathInline tex="f^{(n)}(z_0) = \frac{n!}{2\pi i}\oint \frac{f(z)}{(z-z_0)^{n+1}}dz" />。
        右边对任意 <MathInline tex="n" /> 都写得出来、都收敛，所以左边对任意 <MathInline tex="n" />
        都存在。<strong>"可导一次就无穷可导"这个魔法，机关就是导数可以写成积分</strong>——
        求导本来是"作差取极限"的危险动作，改写成积分之后，麻烦全被推给了那个规规矩矩的分母；
      </li>
      <li>
        <strong>泰勒级数免费到货</strong>：把被积式里的 <MathInline tex="\frac{1}{z - z_0}" /> 改写成
        <MathInline tex="\frac{1}{(z-a) - (z_0-a)}" />，再提出 <MathInline tex="\frac{1}{z-a}" />，
        剩下的正是中学那个等比数列求和公式
        <MathInline tex="\frac{1}{1-q} = 1 + q + q^2 + \cdots" />（这里
        <MathInline tex="q = \frac{z_0-a}{z-a}" />）。逐项积分，就得到 f 在 a 附近的幂级数展开。
        而这一步要成立必须 <MathInline tex="|q| < 1" />，也就是
        <strong><MathInline tex="z_0" /> 到 a 的距离小于 a 到回路的距离</strong>——
        回路又能撑到最近的奇点为止。<strong>收敛半径 = 到最近奇点的距离</strong>，
        <router-link to="/calculus/taylor">微积分泰勒讲</router-link>那个"收敛半径之谜"，
        谜底就是这一行不等式。
      </li>
    </ul>
    <QuizBox
      quiz-id="cauchy-integral-q2"
      question="柯西积分公式说：知道 f 在边界上的值，内部每一点的值就被定死了。那么任何函数，只要知道边界上的值，都能这样定出内部吗？"
      hint="在一条线段的两个端点上钉死取值，中间那段可以画成几种样子？"
      :options="[
        { t: '不能：这是解析函数独有的特权，一般的函数边界值取得一样，内部照样可以千变万化', why: '对。举个一眼就能看穿的：区间 $[0,1]$ 上两端都取 0 的实函数要多少有多少——$x(1-x)$、$\\sin(\\pi x)$、恒等于 0、还有画得歪七扭八的那些，边界数据完全相同，内部毫无关系。是解析性把自由度压没了：柯西-黎曼那两条方程要在每一点都成立，这个约束强到只剩边界那一圈还能自由选。' },
        { t: '能：只要函数在内部连续，边界值就把内部夹住了', why: '连续差得远。上面那一串两端取 0 的函数个个连续，内部却各走各的。连续只管住「不许突然跳」，管不住「往哪儿走」；而复可导要求差商沿任何方向趋近都收敛到同一个复数，这是完全不同量级的要求。' },
        { t: '能，但只对可导的函数成立', why: '实的可导仍然不够：$x(1-x)$ 与 $\\sin(\\pi x)$ 要多光滑有多光滑，边界值一样、内部不一样。差距藏在「可导」这个词的两种含义里，而那正是本课前两讲的全部内容——实可导只要求沿一个方向的差商收敛，复可导要求所有方向收敛到同一个数。前者随处可见，后者是特权。' },
      ]"
      :answer="0"
    />

    <h2><span class="sec-no">伍</span>买到了什么：从"全息"到刘维尔</h2>

    <h3>法拉第笼：车里被雷劈中的人为什么没事</h3>
    <p>
      本讲到此全是纸上的东西——回路、路径、积分为零。
      下面这一件事却是你每天都在用的，而且它的<strong>全部证明</strong>就是本讲的柯西积分公式，
      三行，没有一步用到电学。
    </p>
    <p>
      <strong>先给画面。</strong>汽车被雷击中，车里的人毫发无伤；
      微波炉门上那层扎着密密小孔的金属网，把里面的微波全挡在炉内，
      你却能透过它看见食物；电梯里手机没有信号；
      医院做核磁的房间四壁包着铜皮。这些是同一件事，叫<strong>静电屏蔽</strong>——
      1836 年法拉第把一间屋子糊上金属箔，让静电起电机对着它猛放电，
      屋里的验电器<strong>一动不动</strong>。他把这间屋子的名字留给了后世：法拉第笼。
    </p>
    <p>
      <strong>它凭什么跟复变有关系。</strong>
      <router-link to="/complex/holomorphic">上一讲</router-link>末尾送过一份赠品：
      解析函数的实部与虚部都满足拉普拉斯方程
      <MathInline tex="\varphi_{xx} + \varphi_{yy} = 0" />，这样的函数叫<strong>调和函数</strong>。
      而没有电荷的地方，<strong>电势正好就是这样一个函数</strong>——
      这不是类比，是同一个方程。
      所以"金属壳围出的空腔里，电势长什么样"这个电学问题，
      在数学上就是"边界值给定的调和函数长什么样"。
    </p>
    <p>
      <strong>三步。</strong>第一步是第肆节那个柯西积分公式的直接推论，叫<strong>平均值性质</strong>：
      调和函数在任一点的值，等于它绕这点画一个圆、在圆周上取的平均值。多大的圆都行。
      （把公式里的回路取成一个圆，<MathInline tex="R" /> 和
      <MathInline tex="e^{i\theta}" /> 会全部约光，只剩一个平均——
      三行推导写在下面「还买到了什么」的第一条里。）
    </p>
    <p>
      第二步，从它立刻推出<strong>最大值原理</strong>：
      <strong>调和函数不可能在内部取到最大值</strong>（除非它是常数）。
      理由一句话——假设内部某点 P 比周围一圈都高，
      那么绕 P 画个小圆取平均，得到的数必定<strong>小于</strong> P 处的值；
      可平均值性质说它必须<strong>等于</strong> P 处的值。矛盾。
      所以最大值只能待在边界上。把不等号反过来同样成立：最小值也只能在边界上。
    </p>
    <p>
      第三步，把这条用在笼子上。金属壳是导体，导体内部电荷可以自由跑，
      跑到不再受力为止——所以<strong>整个壳是一个等势体</strong>，
      腔的边界上电势处处等于同一个数 <MathInline tex="V_0" />。
      腔内的电势是调和函数，它的最大值和最小值都只能在边界取到，
      而边界上最大值 = 最小值 = <MathInline tex="V_0" />。于是腔内每一点都被夹在
      <MathInline tex="V_0" /> 和 <MathInline tex="V_0" /> 之间：
    </p>
    <MathBlock tex="V_0 \;\le\; \varphi(\text{腔内任一点}) \;\le\; V_0 \quad\Longrightarrow\quad \varphi \equiv V_0 \quad\Longrightarrow\quad \vec E = -\nabla\varphi = \vec 0" />
    <p>
      <strong>电场严格为零。</strong>请注意这个结论有多不讲道理：
      它跟外面那道雷有多猛<strong>完全无关</strong>，跟笼子是什么形状无关，
      跟腔有多大也无关。外面天翻地覆，里面不是"衰减得很厉害"，
      是数学上恒等于零。而支撑它的全部东西，就是"每点的值等于周围一圈的平均"这一句话——
      也就是把柯西积分公式的回路取成一个圆之后剩下的那个式子。
    </p>
    <p>
      <strong>三个条件，缺一个就不灵</strong>（也正好解释了几个常见的"怎么不管用"）：
    </p>
    <ul>
      <li>
        <strong>腔内不能有电荷</strong>。有电荷的地方拉普拉斯方程不成立，电势不再调和，
        整套推理垮掉。所以笼子挡的是<strong>外面</strong>的场——
        在车里打开一台高压设备，车外照样测得到，屏蔽是单向的；
      </li>
      <li>
        <strong>壳得导电、且不能有大洞</strong>。"等势体"这一条是导体给的。
        微波炉门上那层网有孔，孔的尺寸远小于微波波长（约 12 厘米）时，
        近似仍然成立；孔一旦大到可与波长相比就开始漏。
        可见光的波长比孔小几千倍（孔径一两毫米对波长零点几微米），穿网而过毫无压力——
        <strong>所以你看得见炉内，微波却出不来</strong>，同一张网对两种波待遇不同，
        分界线就是"孔与波长谁大"；
      </li>
      <li>
        <strong>这是<em>静</em>电的结论</strong>。交变场要用完整的麦克斯韦方程，
        屏蔽效果随频率而变；低频磁场其实相当穿得过去
        （所以核磁共振的屏蔽室不能只靠一层铜皮了事）。
        本讲的工具管的是静态那一档——而绝大多数"屏蔽"场合正好在这一档里。
      </li>
    </ul>
    <p>
      最后值得说一句：上面三步<strong>一次电学都没用到</strong>，
      用的只有"值 = 周围的平均"。所以同一条推理换个名词就换一门学科——
      一块金属板，边缘整圈焊在 100 °C 的水浴里，稳态下板内不可能出现 120 °C 的热点，
      也不可能出现 80 °C 的冷点，整块板<strong>恰好 100 °C</strong>；
      一张肥皂膜绷在一个平面框上，只能是平的；地下水在等压边界里的稳态压力同理。
      （复分析给的是二维版本；三维的证明走的不是复变这条路，
      但用的是同一条"值 = 球面上的平均"，结论一字不差。）
    </p>
    <QuizBox
      quiz-id="cauchy-integral-q3"
      question="那么金属笼是一个能屏蔽一切电磁影响的万能罩吗？"
      hint="回头看那三个条件里的「静」字——本讲的推导管的是哪一档情形？"
      :options="[
        { t: '不是：本讲证的只是「静」电这一档，而且还得壳导电闭合、腔内无源；随时间变化的电磁场是另一笔账', why: '对，三个条件缺一个都不灵。变化的场要用完整的麦克斯韦方程重算，能不能钻进来主要看孔径与波长谁大：微波炉 2.45 GHz 的波长约 12.2 厘米，炉门那层网的小孔比它小几个数量级，于是微波出不去；而手机常用频段的波长在 11 到 33 厘米之间（900 MHz 约 33.3 厘米、2.6 GHz 约 11.5 厘米），电梯门缝和轿厢上的孔洞跟它已经不再是「远小于」的关系，信号于是时有时无。同一个笼子，对不同的波待遇完全不同。' },
        { t: '是：外面套一层金属，里面的电场就严格为零，这是本讲刚刚证明过的', why: '证出来的那句话前面挂着三个假设，抽掉任何一个结论都不再成立：腔内一有电荷，电势就不再是调和函数，平均值性质垮掉；壳上开个大洞，「等势体」也就无从谈起。数学结论的适用范围写在假设里、不写在结论里——把结论单独拎出来当口号，是定理被用错的最常见方式。' },
        { t: '不是，因为现实的金属总有电阻，屏蔽只能衰减、不可能真的归零', why: '怀疑的方向对，抓到的原因却不对。在本讲的三个条件下，腔内电场是严格的零而不是「衰减得很厉害」——推导给出的是 $\\varphi \\equiv V_0$ 这个恒等式，跟外面那道雷有多猛完全无关，也不依赖金属有多好。真正会让它失效的是另外三件事：腔内有源、壳上有大洞、以及场随时间变化。' },
      ]"
      :answer="0"
    />

    <h3>还买到了什么</h3>
    <ul>
      <li>
        <strong>平均值性质</strong>：把积分公式的 Γ 取成"圆心 <MathInline tex="z_0" />、半径 R"的圆，
        参数化 <MathInline tex="z = z_0 + Re^{i\theta}" />，则
        <MathInline tex="dz = iRe^{i\theta}d\theta" />、
        <MathInline tex="z - z_0 = Re^{i\theta}" />，两者一约，
        <MathInline tex="R" /> 和 <MathInline tex="e^{i\theta}" /> 全部消光，只剩
        <MathInline tex="f(z_0) = \frac{1}{2\pi}\int_0^{2\pi} f(z_0 + Re^{i\theta})\,d\theta" />——
        右边正是"绕圆一圈取平均"。<strong>解析函数在圆心的值 = 圆周上值的平均</strong>，
        而且对任意半径都成立。实部虚部各自也如此，这正是调和函数"每点 = 邻域平均"的来源
        （<router-link to="/mathphys/laplace">数理方程拉普拉斯讲</router-link>的核心直觉，提前到账）；
      </li>
      <li>
        <strong>刘维尔定理，几行推出代数基本定理</strong>：全平面解析且有界的函数必是常数。
        由它可以推出"n 次方程必有根"——上上讲许诺过的事，被一个积分不等式兑现。
        推法见下面的折叠框；
      </li>
      <li>
        <strong>数值反差萌</strong>：理论上积分"只看端点"，数值上沿不同路径算出来的稳定性却天差地别。
        道理不难想：被积函数在某些路径上剧烈振荡（正负项互相抵消，浮点数一减就
        <router-link to="/numerical/float-error">灾难性抵消</router-link>），
        换一条路径却可能一路平缓、只在很短一段里贡献主要的值。
        既然变形不改结果，那就<strong>专挑好算的那条路走</strong>——
        这是计算数学里一门实打实的手艺；
      </li>
      <li>
        <strong>"全息"是一门生意</strong>：边界值定死内部——这句话反过来读，
        就是"<strong>只在表面测，也能知道里面</strong>"，而这正是一大批技术的生存前提。
        地球物理勘探只能在地表布测线，却要说出几千米下有没有油；
        医学的电阻抗成像只能在皮肤上贴电极；无损探伤只能在工件表面扫。
        它们能成立，靠的都是"场在内部满足拉普拉斯方程（或它的近亲），
        于是边界数据原则上已经含有内部的全部信息"。
        代价也一并写在这条定理里：柯西公式里那个
        <MathInline tex="\frac{1}{z - z_0}" /> 让远处的边界贡献衰减得很快，
        所以埋得越深的东西，在地表留下的痕迹越糊——
        <strong>信息在原则上全都在，实际上却被压得几乎读不出来</strong>。
        这就是反问题"不适定"的由来，也是这些技术为什么个个都要配一套正则化算法；
      </li>
      <li>
        <strong>唯一的悬念</strong>：回路里有奇点时积分不为零——那到底等于多少？
        1/z 给出 2πi，一般的奇点呢？答案是一套惊人好用的演算，下一讲。
      </li>
    </ul>
    <RevealBox
      title="🔍 刘维尔怎么推出「n 次方程必有 n 个根」"
      label="对答案 / 看完整拆解"
    >
      <template #hint>
        先自己想两步：① 用上面那个高阶导数公式（<MathInline tex="n=1" />），
        把 <MathInline tex="|f'(z_0)|" /> 用"<MathInline tex="f" /> 的上界 M"和"圆的半径 R"估一估，
        R 推到无穷会怎样？② 假设多项式 <MathInline tex="p" /> 一个根都没有，
        那 <MathInline tex="1/p" /> 有什么好性质？
      </template>
      <p>
        <strong>第一步：估计导数。</strong>设 <MathInline tex="f" /> 全平面解析、
        且处处满足 <MathInline tex="|f| \le M" />。取以 <MathInline tex="z_0" /> 为心、
        半径 R 的圆，用 <MathInline tex="n = 1" /> 的导数公式。圆周上被积式的大小不超过
        <MathInline tex="M/R^2" />，而圆周总长是 <MathInline tex="2\pi R" />，于是
      </p>
      <MathBlock tex="|f'(z_0)| \;\le\; \frac{1}{2\pi}\cdot\frac{M}{R^2}\cdot 2\pi R \;=\; \frac{M}{R}" />
      <p>
        <strong>第二步：把 R 推到无穷。</strong><MathInline tex="f" /> 在全平面解析，
        所以 R 想取多大取多大，而 <MathInline tex="M" /> 是固定的。
        右边 <MathInline tex="M/R \to 0" />，于是 <MathInline tex="f'(z_0) = 0" />。
        <MathInline tex="z_0" /> 是随便挑的，所以 <MathInline tex="f' \equiv 0" />，
        <MathInline tex="f" /> 是常数。这就是<strong>刘维尔定理</strong>。
      </p>
      <p>
        <strong>第三步：反证多项式必有根。</strong>设
        <MathInline tex="p(z) = a_n z^n + \cdots + a_0" />（<MathInline tex="n \ge 1" />，
        <MathInline tex="a_n \ne 0" />），假设它一个根都没有。那么
        <MathInline tex="1/p" /> 分母永不为零，<strong>全平面解析</strong>。
      </p>
      <p>
        它还<strong>有界</strong>：<MathInline tex="|z|" /> 很大时最高次项压倒一切，
        <MathInline tex="|p(z)| \to \infty" />，所以 <MathInline tex="|1/p| \to 0" />——
        在某个大圆之外它小于 1；而大圆之内是个闭区域，连续函数在上面本来就有界。
        内外一合，<MathInline tex="1/p" /> 全平面有界。
      </p>
      <p>
        刘维尔于是判它是<strong>常数</strong>，那 <MathInline tex="p" /> 也是常数——
        与 <MathInline tex="n \ge 1" /> 矛盾。所以 <MathInline tex="p" /> 至少有一个根
        <MathInline tex="z_1" />。把 <MathInline tex="(z - z_1)" /> 除掉，
        剩下 <MathInline tex="n-1" /> 次多项式，再来一遍……<strong>n 次方程恰好 n 个根</strong>，
        <router-link to="/complex/imaginary">第 1 讲</router-link>为了解三次方程才请出虚数，
        绕了两讲，账在这里结清。
      </p>
      <p>
        值得留意这条证明的气质：它<strong>没有解出任何一个根</strong>，
        只是证明"无根"会导致矛盾。代数折腾了三百年的问题，被一个关于积分大小的不等式解决了。
      </p>
    </RevealBox>
    <div class="insight">
      <div class="insight-title">🔗 与你学过的课程连一连</div>
      <p>
        <strong>微积分</strong>：本定理是"微积分基本定理"家族的复平面成员——"内部的累积由边界决定"，
        与牛顿-莱布尼茨（线段）、格林（平面区域）、斯托克斯（曲面）一脉相承；
        <strong>数学物理方程</strong>（预告）：柯西积分公式 ⟺ 调和函数平均值性质 ⟺ 稳态温度分布的物理直觉——
        三门课在同一个事实上会师，到时候回来看这一段。
      </p>
    </div>
  </ConceptPage>
</template>
