<script setup>
import ConceptPage from '../../components/ConceptPage.vue'
import MathBlock from '../../components/MathBlock.vue'
import MathInline from '../../components/MathInline.vue'
import RevealBox from '../../components/RevealBox.vue'
import QuizBox from '../../components/QuizBox.vue'
import GradientDemo from '../../demos/GradientDemo.vue'
</script>

<template>
  <ConceptPage slug="gradient">
    <h2><span class="sec-no">壹</span>困境：站在山坡上，"斜率"这个词不够用了</h2>
    <p>
      到目前为止，这门课里的函数都只吃一个数：给它 x，还你 <MathInline tex="f(x)" />。
      可现实里的量几乎都不止依赖一件事：
    </p>
    <ul>
      <li>屋里的温度 <MathInline tex="T(x,y,z)" />——取决于你站在哪；</li>
      <li>地形的海拔 <MathInline tex="h(x,y)" />——经度纬度各一个；</li>
      <li>
        一个神经网络的误差 <MathInline tex="L(w_1,w_2,\dots,w_n)" />——
        <MathInline tex="n" /> 可以是几千亿。
      </li>
    </ul>
    <p>
      现在把<router-link to="/calculus/derivative">导数</router-link>那一讲的问题
      原样搬过来：<strong>在某一点，函数变化得有多快？</strong>
      麻烦立刻出现了——
    </p>
    <div class="insight">
      <div class="insight-title">💡 困境的确切形状：一个点上有无穷多个方向</div>
      <p>
        单变量时，站在数轴上的一点，只有<strong>左和右</strong>两个方向，
        而且它们是同一条直线的两头，一个数（导数）就说尽了。
      </p>
      <p>
        可站在山坡上，你可以朝<strong>任意方位</strong>迈步：往东是上坡，往北可能是下坡，
        往东北则介于两者之间。<strong>"这里有多陡"这个问题，
        在没有指定方向之前根本没有答案。</strong>
      </p>
      <p>
        于是问题分成两个：<strong>①</strong> 给定一个方向，怎么算出沿它走的变化率？
        <strong>②</strong> 无穷多个方向里，<strong>哪一个最陡</strong>，最陡是多陡？
        这一讲的主角——<strong>梯度</strong>——一次回答了这两问。
      </p>
    </div>
    <p>
      先把已有的工具请回来。<router-link to="/mathphys/pde-intro">数理方程第 1 讲</router-link>
      介绍过<strong>偏导数</strong>：<MathInline tex="\partial f/\partial x" /> 读作"偏 f 偏 x"，
      意思是<strong>把 y 当成常数、只让 x 变</strong>时的变化率
      （那一讲的比喻很好：<em>照片</em>是把时间冻住只看空间，<em>心电图</em>是把地点钉死只看时间）。
      算法上它没有任何新东西——<strong>把别的字母当数字，照常求导</strong>：
    </p>
    <MathBlock tex="f(x,y)=x^2+2y^2 \;\Longrightarrow\; \frac{\partial f}{\partial x}=2x \ \ (\text{把 } y \text{ 当常数}), \qquad \frac{\partial f}{\partial y}=4y \ \ (\text{把 } x \text{ 当常数})" />
    <p>
      <strong>但偏导数只回答了两个特定方向</strong>（正东、正北）。
      "往东北走多陡"它答不上来。这就是困境的落点。
    </p>

    <h2><span class="sec-no">贰</span>破局：任意方向的斜率，是两个偏导数的线性组合</h2>
    <p>
      取一个<strong>单位向量</strong> <MathInline tex="\boldsymbol{u}=(u_1,u_2)" />
      （长度为 1，代表"朝哪个方位"）。从点 <MathInline tex="(a,b)" /> 沿它走出一小步 t，
      到达 <MathInline tex="(a+tu_1,\ b+tu_2)" />。仿照导数的定义：
    </p>
    <MathBlock tex="D_{\boldsymbol{u}}f(a,b) = \lim_{t\to 0}\frac{f(a+tu_1,\ b+tu_2) - f(a,b)}{t}" />
    <p>
      这叫<strong>方向导数</strong>。定义写得出来，可怎么算？
      <strong>把它看成一个单变量函数</strong> <MathInline tex="g(t)=f(a+tu_1,b+tu_2)" />
      ——沿着那条直线走时海拔随 t 的变化——那么
      <MathInline tex="D_{\boldsymbol{u}}f = g'(0)" />，
      而 <MathInline tex="g'" /> 用<router-link to="/calculus/chain-rule">链式法则</router-link>
      就能算（多元版：两条路径的贡献相加）：
    </p>
    <MathBlock tex="D_{\boldsymbol{u}}f = \frac{\partial f}{\partial x}u_1 + \frac{\partial f}{\partial y}u_2" />
    <p>
      <strong>盯住这个式子的形状：它是两个向量的点积。</strong>
      于是给右边那个由偏导数组成的向量起个名字：
    </p>
    <div class="definition">
      <div class="def-title">📐 梯度</div>
      <MathBlock tex="\nabla f = \Bigl(\frac{\partial f}{\partial x},\ \frac{\partial f}{\partial y}\Bigr), \qquad D_{\boldsymbol{u}}f = \nabla f \cdot \boldsymbol{u}" />
      <p>
        记号 <MathInline tex="\nabla" /> 读作"nabla"或"del"，
        是哈密顿引入的（形状取自一种古希腊竖琴）。
      </p>
    </div>
    <h3>一行三个结论</h3>
    <p>
      点积有个中学就学过的写法：<MathInline tex="\boldsymbol{a}\cdot\boldsymbol{b}=|\boldsymbol{a}||\boldsymbol{b}|\cos\varphi" />。
      由于 <MathInline tex="\boldsymbol{u}" /> 是单位向量（<MathInline tex="|\boldsymbol{u}|=1" />），
    </p>
    <MathBlock tex="D_{\boldsymbol{u}}f = |\nabla f|\,\cos\varphi \qquad (\varphi = \boldsymbol{u} \text{ 与 } \nabla f \text{ 的夹角})" />
    <p>
      <strong>这一行把开头那两个问题一次答完，而且白送第三条：</strong>
    </p>
    <ul>
      <li>
        <strong>最陡的方向就是梯度方向。</strong><MathInline tex="\cos\varphi" /> 在
        <MathInline tex="\varphi=0" /> 时取最大值 1——朝梯度走，涨得最快；
      </li>
      <li>
        <strong>最陡有多陡？就是 <MathInline tex="|\nabla f|" />。</strong>
        梯度的<em>长度</em>不是随便的装饰，它<strong>就是那个最大变化率</strong>；
      </li>
      <li>
        <strong>梯度垂直于等高线。</strong>沿等高线走海拔不变，即
        <MathInline tex="D_{\boldsymbol{u}}f=0" />，即
        <MathInline tex="\cos\varphi=0" />，即<strong>夹角 90°</strong>。
        <em>所以看等高线地图找最陡下山路，垂直于线走就对了。</em>
      </li>
    </ul>
    <p>
      顺带把<router-link to="/calculus/extremum">极值那一讲</router-link>升级到多元：
      内部极值点处，<strong>沿任何方向的变化率都必须为零</strong>，
      于是 <MathInline tex="\nabla f = \boldsymbol{0}" />——
      单变量的 <MathInline tex="f'=0" /> 原样搬来，只是变成了一组方程。
      <strong>而"驻点未必是极值"这个陷阱在多元里变得更严重</strong>：
      多出了一种全新的情形叫<strong>鞍点</strong>——沿一个方向是极小、
      沿另一个方向却是极大（马鞍的正中央）。叁节的动画里可以亲手站上去。
    </p>
    <QuizBox
      quiz-id="gradient-q1"
      question="「梯度指向最陡上升方向」——这句话是定义，还是推出来的？"
      hint="梯度的定义只是「把偏导数排成一个向量」。从 $D_u f=\nabla f\cdot u$ 到「最陡」，中间用了什么？"
      :options="[
        { t: '推出来的：梯度的定义只是把偏导数排成向量，「最陡」来自 $D_uf=|\\nabla f|\\cos\\varphi$ 在 $\\varphi=0$ 时最大', why: '对。这条链子很值得记住：定义（排成向量）→ 方向导数是点积（链式法则）→ 点积写成 $|a||b|\\cos\\varphi$（中学几何）→ 余弦在 0° 最大。三步都很浅，合起来给出一条极强的结论，还白送「模长就是最大变化率」和「垂直于等高线」。' },
        { t: '是定义：梯度就被定义为最陡上升方向', why: '有些教材确实这么引入（几何式定义），但本讲走的是计算式定义：$\\nabla f=(f_x,f_y)$。两种定义等价，而「等价」这件事本身正是要证的东西——不能既当定义又当结论。' },
        { t: '既非定义也非定理，只是一个好用的直觉', why: '它是有严格证明的定理：证明只有一行 $D_uf=\\nabla f\\cdot u=|\\nabla f|\\cos\\varphi$，取最大即得。凡是能一行证出来的，就别把它降格成「直觉」。' },
      ]"
      :answer="0"
    />

    <h2><span class="sec-no">叁</span>亲手在等高线图上转一圈</h2>
    <p>
      下面这张图把 <MathInline tex="f(x,y)" /> 画成一片<strong>地形</strong>：
      蓝色圈是等高线，黑点是你站的位置，<strong>红箭头是梯度</strong>，
      <strong>绿箭头是你选的方向</strong>。拖动方向角，读数区会给出沿绿箭头的方向导数，
      并告诉你它占最大值的百分之几。
    </p>
    <p>
      三个"照着做一遍"分别验证上面那三条结论：
      <strong>方向导数按余弦变化</strong>、<strong>梯度垂直于等高线</strong>、
      以及三种驻点（谷底、鞍点、山顶）各长什么样。
    </p>
    <GradientDemo />

    <h2><span class="sec-no">肆</span>严格定义：可微、全微分与二阶判别</h2>
    <div class="definition">
      <div class="def-title">📐 定义（可微与全微分）</div>
      <p>
        称 <MathInline tex="f" /> 在 <MathInline tex="(a,b)" /> 处<strong>可微</strong>，
        若存在向量 <MathInline tex="\boldsymbol{g}" /> 使
      </p>
      <MathBlock tex="f(a+h,\,b+k) = f(a,b) + \boldsymbol{g}\cdot(h,k) + o\bigl(\sqrt{h^2+k^2}\bigr)" />
      <p>
        此时 <MathInline tex="\boldsymbol{g}=\nabla f(a,b)" />，而
        <MathInline tex="\mathrm{d}f = f_x\,\mathrm{d}x + f_y\,\mathrm{d}y" /> 叫<strong>全微分</strong>。
      </p>
    </div>
    <p>
      这个定义是<router-link to="/calculus/derivative">第二讲</router-link>那条
      <MathInline tex="f(a+h)=f(a)+f'(a)h+o(h)" /> 的<strong>逐字翻译</strong>：
      "乘一个数"换成了"点乘一个向量"，<strong>局部用线性函数冒充自己</strong>这句话一字未改。
      （再往前走一步，把向量换成矩阵，就是
      <router-link to="/linear-algebra/linear-map">线性映射</router-link>那一讲说的雅可比矩阵。）
    </p>
    <p>
      有一处<strong>多元特有的陷阱</strong>值得点破：<strong>两个偏导数都存在，
      并不保证可微</strong>。偏导数只看了正东与正北两条线上的情况，
      而可微要求<strong>从任何方向逼近都对</strong>。经典反例：
    </p>
    <MathBlock tex="f(x,y)=\begin{cases}\dfrac{xy}{x^2+y^2}, & (x,y)\neq(0,0)\\[4pt] 0, & (x,y)=(0,0)\end{cases}" />
    <p>
      它在原点的两个偏导数都是 0（沿 x 轴、y 轴上 f 恒为 0），
      可沿 <MathInline tex="y=x" /> 方向趋近时 <MathInline tex="f\equiv 1/2" />——
      <strong>它在原点连<em>连续</em>都做不到</strong>。
      单变量里"可导 ⇒ 连续"是白给的，多元里<strong>这条要重新买</strong>：
      需要偏导数<em>连续</em>才能保证可微。
    </p>
    <RevealBox title="🔍 多元的二阶判别法：为什么要看一个矩阵" label="对答案 / 看完整拆解">
      <template #hint>
        单变量里，驻点是极大还是极小看 <MathInline tex="f''" /> 的符号。
        多元里有 <MathInline tex="f_{xx},\ f_{yy},\ f_{xy}" /> 三个二阶导数——
        想一想：<MathInline tex="f=x^2-y^2" /> 的 <MathInline tex="f_{xx}=2>0" />、
        <MathInline tex="f_{yy}=-2<0" />，<strong>该信谁</strong>？
      </template>
      <p>
        <strong>第一步：沿一条直线切一刀。</strong>在驻点
        （<MathInline tex="\nabla f=\boldsymbol{0}" />）附近沿单位方向
        <MathInline tex="\boldsymbol{u}" /> 走，用二元<router-link to="/calculus/taylor">泰勒展开</router-link>
        到二阶：
      </p>
      <MathBlock tex="f(a+tu_1,\,b+tu_2) \approx f(a,b) + \frac{t^2}{2}\bigl(f_{xx}u_1^2 + 2f_{xy}u_1u_2 + f_{yy}u_2^2\bigr)" />
      <p>
        一阶项没了（驻点），<strong>命运全交给括号里那个二次式</strong>。
      </p>
      <p>
        <strong>第二步：把它写成矩阵。</strong>那个括号正是
      </p>
      <MathBlock tex="\boldsymbol{u}^{T} H \boldsymbol{u}, \qquad H = \begin{pmatrix} f_{xx} & f_{xy}\\ f_{xy} & f_{yy}\end{pmatrix}" />
      <p>
        H 叫<strong>黑塞矩阵</strong>，它是<strong>对称的</strong>
        （<MathInline tex="f_{xy}=f_{yx}" />，混合偏导与求导次序无关）。
      </p>
      <p>
        <strong>第三步：请出特征值。</strong><router-link to="/linear-algebra/eigen">线代第 5 讲</router-link>
        说过，对称矩阵有一组<strong>相互正交的特征方向</strong>，
        沿第 i 个特征方向 <MathInline tex="\boldsymbol{u}^TH\boldsymbol{u}=\lambda_i" />。于是：
      </p>
      <ul>
        <li>两个特征值<strong>都正</strong> → 沿任何方向都上凸 → <strong>极小值</strong>；</li>
        <li>两个<strong>都负</strong> → <strong>极大值</strong>；</li>
        <li>
          <strong>一正一负</strong> → 沿一个特征方向上坡、另一个下坡 → <strong>鞍点</strong>
          （<MathInline tex="x^2-y^2" /> 的 H 是 <MathInline tex="\mathrm{diag}(2,-2)" />，
          正是这一档）；
        </li>
        <li>有零特征值 → <strong>判别失效</strong>，要看更高阶（与单变量 <MathInline tex="f''=0" /> 时一样）。</li>
      </ul>
      <p>
        <strong>回味：单变量的"看 <MathInline tex="f''" /> 的符号"，多元版是"看 H 的特征值的符号"。</strong>
        而"沿哪些方向最陡地弯"这个问题的答案，正是 H 的特征方向——
        <router-link to="/linear-algebra/eigen">二次型主轴</router-link>在这里第二次出场。
        机器学习里说某个极小点"病态"（沿一个方向陡、另一个方向平），
        说的就是 H 的两个特征值相差悬殊，
        与<router-link to="/numerical/linear-system">数值分析第 5 讲</router-link>的条件数是同一个量。
      </p>
    </RevealBox>
    <QuizBox
      quiz-id="gradient-q2"
      question="某点两个偏导数都存在且都等于 0。能断定这一点是极值点吗？"
      hint="想想马鞍的正中央：沿 x 轴是谷底，沿 y 轴是山顶。再想想那个连连续都做不到的反例。"
      :options="[
        { t: '不能：它可能是鞍点，甚至函数在这点连可微都不一定', why: '两层都要小心。第一层：$\\nabla f=0$ 只说明「一阶项消失」，$x^2-y^2$ 在原点就是鞍点；第二层更隐蔽——偏导数只看了两条坐标线，$xy/(x^2+y^2)$ 那个反例的两个偏导数都是 0，可它在原点连连续都不是。' },
        { t: '能：梯度为零就是极值点的定义', why: '梯度为零定义的是<b>驻点</b>，不是极值点。单变量里 $x^3$ 已经打破过这个错觉，多元里还多出鞍点这一整类。' },
        { t: '能，但要先确认函数连续', why: '连续也不够：$x^2-y^2$ 处处连续、处处可微，原点仍是鞍点。判定要看二阶——黑塞矩阵的特征值同号才是极值。' },
      ]"
      :answer="0"
    />

    <h2><span class="sec-no">伍</span>买到了什么：所有"训练模型"都是在下山</h2>

    <h3>梯度下降：把学习变成一次次沿最陡方向迈步</h3>
    <p>
      <strong>画面。</strong>你被蒙上眼睛放在一片山地里，任务是走到最低处。
      你看不见全局，<strong>但脚下的坡度是感觉得到的</strong>。
      最朴素的策略：<strong>摸出脚下最陡的下坡方向，朝那儿迈一小步，
      然后重新摸一次</strong>。
    </p>
    <p>
      <strong>为什么这就是机器学习。</strong>训练一个模型，就是调整参数
      <MathInline tex="\boldsymbol{w}" /> 让损失 <MathInline tex="L(\boldsymbol{w})" /> 最小。
      参数动辄上亿，<strong>"损失的地形"是一个上亿维的山地，永远看不见全局</strong>；
      可<router-link to="/calculus/chain-rule">链式法则那一讲</router-link>的反向传播
      能在一次计算里<strong>算出全部偏导数</strong>——也就是那一点的梯度。
      有了梯度，就有了"脚下最陡的方向"。
    </p>
    <p>
      <strong>推导与算法。</strong>本讲已经证明：<MathInline tex="-\nabla L" />
      是下降最快的方向。于是
    </p>
    <MathBlock tex="\boldsymbol{w}_{k+1} = \boldsymbol{w}_k - \eta\,\nabla L(\boldsymbol{w}_k)" />
    <p>
      <MathInline tex="\eta" /> 叫<strong>学习率</strong>，就是"每次迈多大一步"。
      拿本讲 demo 里那只碗 <MathInline tex="L=x^2+2y^2" /> 走一遍，
      从 <MathInline tex="(1.1,\ 0.8)" /> 出发、<MathInline tex="\eta=0.15" />：
      梯度是 <MathInline tex="(2.2,\ 3.2)" />，于是
    </p>
    <MathBlock tex="(1.1,\,0.8) \to (0.77,\,0.32) \to (0.539,\,0.128) \to (0.377,\,0.051) \to \cdots \to (0,0)" />
    <p>
      （每步：<MathInline tex="x \leftarrow x-0.15\cdot 2x = 0.7x" />，
      <MathInline tex="y \leftarrow y-0.15\cdot 4y = 0.4y" />。）
      <strong>注意 y 掉得比 x 快得多</strong>——因为这只碗在 y 方向更陡。
      这是真实训练里最常见的现象：<strong>不同参数收敛速度差着数量级</strong>。
    </p>
    <p>
      <strong>读出物理：学习率是一把双刃剑，而且刃口算得出来。</strong>
      对 <MathInline tex="x\leftarrow(1-2\eta)x" /> 这一路，收敛要求
      <MathInline tex="|1-2\eta|<1" />，即 <MathInline tex="\eta<1" />；
      对 y 那一路是 <MathInline tex="|1-4\eta|<1" />，即
      <MathInline tex="\eta<0.5" />。<strong>两条一起管，学习率必须小于 0.5</strong>；
      一旦取 <MathInline tex="\eta=0.6" />，y 方向的系数变成
      <MathInline tex="1-2.4=-1.4" />，<strong>每步放大 1.4 倍并左右横跳，直接发散</strong>。
      调参时"loss 突然变成 NaN"，十有八九就是这么来的——
      <strong>而临界值 <MathInline tex="\eta=2/\lambda_{\max}" /> 里的
      <MathInline tex="\lambda_{\max}" />，正是折叠框里那个黑塞矩阵的最大特征值。</strong>
    </p>
    <p>
      <strong>条件不成立会怎样——三条都是这行当里天天在打的仗。</strong>
    </p>
    <ul>
      <li>
        <strong>局部极小与鞍点。</strong>梯度只知道脚下，不知道远方。
        demo 的"双峰"档里，从不同位置出发会滑向不同的山谷。
        高维空间里更麻烦的其实是<strong>鞍点</strong>（上亿个方向，
        要全部同号才是真极值，概率极低），
        梯度在那里几乎为零，训练会"卡住"很久。
      </li>
      <li>
        <strong>病态地形。</strong>如果碗在一个方向极扁、另一个方向极陡
        （黑塞的特征值相差上千倍），能用的学习率被最陡那个方向卡死，
        而最平的方向就慢得令人绝望——<strong>这正是条件数大的代价</strong>
        （<router-link to="/numerical/linear-system">数值分析第 5 讲</router-link>算过同一笔账）。
        动量法、Adam 这些优化器，做的就是给不同方向配不同的步长。
      </li>
      <li>
        <strong>算不动全部数据。</strong>真实的 L 是几百万条样本的平均，
        每步都算全量梯度太贵。于是改成<strong>随机抽一小批算梯度</strong>
        （随机梯度下降）——用一个<router-link to="/probability/lln">大数定律</router-link>
        意义下的<em>估计</em>代替真梯度。<strong>方向不再精确，但便宜了几千倍，
        而且噪声反倒有助于跳出鞍点。</strong>
      </li>
    </ul>
    <div class="insight">
      <div class="insight-title">🔗 这一讲往后通到哪：站内连一连</div>
      <p>
        <strong>下一讲</strong>把积分也搬进多元：
        <strong>多重积分与雅可比行列式</strong>——一维换元里"拉宽 <MathInline tex="g'" /> 倍"
        在那里变成"面积放大 <MathInline tex="|\det J|" /> 倍"；
        <strong>数理方程</strong>：<router-link to="/mathphys/heat">热方程</router-link>
        里的 <MathInline tex="\nabla^2 u" />（拉普拉斯算子）就是梯度的散度，
        而<router-link to="/mathphys/laplace">拉普拉斯方程</router-link>那一讲的
        "板心温度等于四边平均"正是它的离散版；
        <strong>线性代数</strong>：黑塞矩阵的<router-link to="/linear-algebra/eigen">特征值</router-link>
        决定驻点的类型与收敛速度；
        <strong>复变函数</strong>：<router-link to="/complex/holomorphic">柯西-黎曼方程</router-link>
        说的正是两个偏导数之间的一组苛刻约束——那里的"解析"，
        在本讲的语言里是对梯度提了极强的要求。
      </p>
    </div>
  </ConceptPage>
</template>
