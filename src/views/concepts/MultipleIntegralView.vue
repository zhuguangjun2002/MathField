<script setup>
import ConceptPage from '../../components/ConceptPage.vue'
import MathBlock from '../../components/MathBlock.vue'
import MathInline from '../../components/MathInline.vue'
import RevealBox from '../../components/RevealBox.vue'
import QuizBox from '../../components/QuizBox.vue'
import JacobianDemo from '../../demos/JacobianDemo.vue'
</script>

<template>
  <ConceptPage slug="multiple-integral">
    <h2><span class="sec-no">壹</span>困境：那个"积不出来"的积分，偏偏必须算出来</h2>
    <p>
      <router-link to="/calculus/integration-methods">换元与分部那一讲</router-link>
      末尾留下一句硬话：<MathInline tex="\int e^{-x^2}\mathrm{d}x" /> <strong>没有初等原函数</strong>，
      这是刘维尔 1835 年证明的定理，不是没人想出来。
    </p>
    <p>
      可这件事有个让人极不舒服的后果。<router-link to="/probability/clt">概率论第 5 讲</router-link>
      那条钟形曲线，写成公式是
    </p>
    <MathBlock tex="\varphi(x) = \frac{1}{\sqrt{2\pi}}\,e^{-x^2/2}" />
    <p>
      前面那个 <MathInline tex="1/\sqrt{2\pi}" /> 是<strong>归一化常数</strong>——
      它必须让整条曲线下的面积<strong>恰好等于 1</strong>（概率的总和是 1）。
      也就是说，有人算出过
    </p>
    <MathBlock tex="\int_{-\infty}^{+\infty} e^{-x^2}\,\mathrm{d}x = \sqrt{\pi} = 1.7724539\ldots" />
    <p>
      <strong>这就怪了：原函数写不出来，定积分的值却是个漂亮的闭式，还带着 π。</strong>
      每一个学过统计的人都见过那个 <MathInline tex="\sqrt{2\pi}" />，
      <strong>而几乎没有人被告知它是从哪来的。</strong>
    </p>
    <div class="insight">
      <div class="insight-title">💡 困境的确切形状：一维里没有出路</div>
      <p>
        在一维里，你手上只有<router-link to="/calculus/integration-methods">那一讲</router-link>
        的三招：换元、分部、三角换元。三招轮流试一遍，全部失败——而且刘维尔的定理
        <strong>保证了它们必然失败</strong>。
      </p>
      <p>
        本讲的出路是一句听着很怪的话：<strong>把问题搬到二维去，反而变简单。</strong>
        为此需要两样新东西：
        <strong>①</strong> 二重积分是什么、怎么算；
        <strong>②</strong> 二维里的"换元"长什么样——
        一维换元只要乘一个 <MathInline tex="g'(x)" />，
        二维要乘的是一个<strong>行列式</strong>。
      </p>
    </div>

    <h2><span class="sec-no">贰</span>破局：切成小方块，再换一套坐标</h2>
    <h3>二重积分：还是那把刀</h3>
    <p>
      <router-link to="/calculus/arc-length">弧长那一讲</router-link>说过，
      积分号只是"把无穷多个小量加起来"。二重积分照抄：
      把平面区域 D 切成小方块，每块面积 <MathInline tex="\Delta A" />，
      在块内取一点算 <MathInline tex="f" />，乘起来求和，取极限：
    </p>
    <MathBlock tex="\iint_D f(x,y)\,\mathrm{d}A = \lim \sum f(x_i,y_i)\,\Delta A_i" />
    <p>
      几何上，若 <MathInline tex="f>0" />，它就是<strong>以 D 为底、以曲面
      <MathInline tex="z=f(x,y)" /> 为顶的柱体体积</strong>。
    </p>
    <p>
      <strong>怎么真的算出来？</strong>答案是<strong>富比尼定理</strong>：
      切成薄片，一层层加——先固定 y 对 x 积（得到那一片的面积），再对 y 积：
    </p>
    <MathBlock tex="\iint_D f\,\mathrm{d}A = \int_{c}^{d}\Bigl[\int_{a(y)}^{b(y)} f(x,y)\,\mathrm{d}x\Bigr]\mathrm{d}y" />
    <p>
      <strong>二重积分于是退化成两次单变量积分</strong>——本课前面的全部技术都能用上。
      （这正是<router-link to="/calculus/arc-length">卡瓦列里原理</router-link>的现代版：
      按截面一片片累加。<strong>而"先对谁积"可以自己选，
      换个次序常常让一个死题变活</strong>。）
    </p>
    <h3>二维换元：一维的 <MathInline tex="g'" /> 变成了行列式</h3>
    <p>
      一维换元的心法（<router-link to="/calculus/integration-methods">那一讲</router-link>
      的动画演过）：换尺子时，小段被拉宽 <MathInline tex="g'(x)" /> 倍，
      所以要乘上这个倍数才能保住面积。
    </p>
    <p>
      二维里，"一小块"被变换搬过去之后<strong>既可能被拉伸，也可能被扭转</strong>。
      面积放大了多少倍？<router-link to="/linear-algebra/determinant">线代第 2 讲</router-link>
      已经回答过这个问题：<strong>线性变换的面积缩放因子就是行列式的绝对值</strong>。
      而一个光滑变换在<em>局部</em>就是线性的
      （<router-link to="/calculus/gradient">上一讲</router-link>的"局部线性近似"），
      那个局部线性变换的矩阵由四个偏导数组成：
    </p>
    <div class="definition">
      <div class="def-title">📐 雅可比行列式</div>
      <MathBlock tex="J = \frac{\partial(x,y)}{\partial(u,v)} = \begin{vmatrix} \dfrac{\partial x}{\partial u} & \dfrac{\partial x}{\partial v} \\[6pt] \dfrac{\partial y}{\partial u} & \dfrac{\partial y}{\partial v} \end{vmatrix}, \qquad \mathrm{d}A = |J|\,\mathrm{d}u\,\mathrm{d}v" />
    </div>
    <p>算一次极坐标（<MathInline tex="x=r\cos\theta,\ y=r\sin\theta" />）：</p>
    <MathBlock tex="J = \begin{vmatrix}\cos\theta & -r\sin\theta\\ \sin\theta & r\cos\theta\end{vmatrix} = r\cos^2\theta + r\sin^2\theta = r" />
    <p>
      <strong>所以 <MathInline tex="\mathrm{d}A = r\,\mathrm{d}r\,\mathrm{d}\theta" /></strong>——
      极坐标积分里那个"莫名其妙多出来的 r"，就是这么来的。
      叁节的动画会让你<strong>不靠公式、直接量出</strong>这个 r：
      同一个格子搬到 xy 平面后面积变成几倍，读数当场告诉你。
    </p>
    <QuizBox
      quiz-id="multiple-integral-q1"
      question="极坐标下面积微元是 $r\,\mathrm{d}r\,\mathrm{d}\theta$ 而不是 $\mathrm{d}r\,\mathrm{d}\theta$。那个 r 是什么？"
      hint="想想扇形：同样张开 1° 的角，离圆心 10 米处扫过的弧比离圆心 1 米处长多少？"
      :options="[
        { t: '它是局部的面积放大倍数——同样的 $\\Delta r\\Delta\\theta$，离原点越远扫出的实际面积越大', why: '对，而且这个倍数恰好等于半径本身：小块的两条边是 $\\Delta r$ 与 $r\\Delta\\theta$（弧长 = 半径 × 弧度），面积就是 $r\\Delta r\\Delta\\theta$。动画里「面积比 = 中点半径」是精确成立的，不是近似。' },
        { t: '为了把角度从弧度换成长度单位，是个单位换算因子', why: '量纲上确实对得上（$r\\Delta\\theta$ 是长度），但它的身份不是「换算常数」——它随位置变，是个函数。真正的说法是：坐标变换在每一点的<b>面积缩放因子</b>，即雅可比行列式。' },
        { t: '习惯写法，可以省略，不影响积分值', why: '省了就错。算单位圆面积：$\\int_0^{2\\pi}\\int_0^1 r\\,\\mathrm{d}r\\,\\mathrm{d}\\theta=\\pi$（对），而 $\\int_0^{2\\pi}\\int_0^1\\mathrm{d}r\\,\\mathrm{d}\\theta=2\\pi$（错）。差了整整一倍。' },
      ]"
      :answer="0"
    />

    <h2><span class="sec-no">叁</span>亲手量一量小块被放大了几倍</h2>
    <p>
      下面这张图左边是 <MathInline tex="(r,\theta)" /> 平面上一张<strong>普通方格纸</strong>
      （格子一样大），右边是同样这些格子搬到 xy 平面之后的样子——
      <strong>它们变成了扇环块，越靠外越大</strong>。
    </p>
    <p>
      读数区直接给出<strong>面积比</strong>，而三个"照着做一遍"会让你发现：
      这个比值<strong>精确等于那一圈的中点半径</strong>，
      切得越细就越接近"那一点的 r"——
      <MathInline tex="\mathrm{d}A=r\,\mathrm{d}r\,\mathrm{d}\theta" /> 是量出来的，不是背下来的。
    </p>
    <JacobianDemo />

    <h2><span class="sec-no">肆</span>严格定义：换元公式与它的两个前提</h2>
    <div class="definition">
      <div class="def-title">📐 二重积分的换元公式</div>
      <p>
        设变换 <MathInline tex="T:(u,v)\mapsto(x,y)" /> 把区域
        <MathInline tex="D'" /> 一一对应地映到 <MathInline tex="D" />，
        且 <MathInline tex="T" /> 有连续偏导数、雅可比行列式
        <MathInline tex="J\neq 0" />。则
      </p>
      <MathBlock tex="\iint_D f(x,y)\,\mathrm{d}x\,\mathrm{d}y = \iint_{D'} f\bigl(x(u,v),\,y(u,v)\bigr)\,|J|\,\mathrm{d}u\,\mathrm{d}v" />
    </div>
    <p>两个前提各说一句，它们都不是摆设：</p>
    <ul>
      <li>
        <strong>"一一对应"</strong>：否则同一块面积会被数两遍。
        极坐标其实在两个地方破了这一条——<MathInline tex="r=0" /> 时
        <MathInline tex="\theta" /> 取什么都映到原点，<MathInline tex="\theta" /> 相差
        <MathInline tex="2\pi" /> 也映到同一点。
        <strong>好在这些是零面积的集合，不影响积分</strong>（严格处理要用极限，
        或者干脆把它们挖掉）。
      </li>
      <li>
        <strong><MathInline tex="J\neq 0" /></strong>：<MathInline tex="J=0" /> 的地方，
        变换把一小块<strong>压扁成了线或点</strong>——正如
        <router-link to="/linear-algebra/determinant">行列式那一讲</router-link>
        说的"det = 0 就是压扁"。动画里选最内圈可以看到：越靠近原点，
        面积比越小，趋于 0。
      </li>
    </ul>
    <p>
      至于<strong>为什么是行列式而不是别的什么</strong>：把小方块的两条边
      <MathInline tex="(\Delta u,0)" /> 与 <MathInline tex="(0,\Delta v)" />
      用局部线性近似送过去，得到两个向量
      <MathInline tex="(x_u,y_u)\Delta u" /> 与 <MathInline tex="(x_v,y_v)\Delta v" />，
      它们张成一个<strong>平行四边形</strong>，
      而<router-link to="/linear-algebra/determinant">平行四边形的面积就是行列式的绝对值</router-link>。
      <strong>三讲的内容在这一步合流：线性近似（微积分）+ 面积缩放（线代）+ 切碎求和（积分）。</strong>
    </p>
    <RevealBox title="🔍 把 √π 变出来：泊松的那一招" label="对答案 / 看完整拆解">
      <template #hint>
        记 <MathInline tex="I=\int_{-\infty}^{\infty}e^{-x^2}\mathrm{d}x" />。
        一维里没有出路，那就<strong>算 <MathInline tex="I^2" /></strong>——
        两个一模一样的积分相乘，但把第二个的积分变量换个名字叫 y。
        想一想：两个单积分相乘，能不能合成一个二重积分？合成之后被积函数长什么样？
      </template>
      <p><strong>第一步：平方，合成二重积分。</strong></p>
      <MathBlock tex="I^2 = \Bigl(\int_{-\infty}^{\infty}e^{-x^2}\mathrm{d}x\Bigr)\Bigl(\int_{-\infty}^{\infty}e^{-y^2}\mathrm{d}y\Bigr) = \iint_{\mathbb{R}^2} e^{-x^2}e^{-y^2}\,\mathrm{d}x\,\mathrm{d}y" />
      <p>
        这一步是富比尼定理反着用：两个各自独立的单积分之积，
        <strong>就是被积函数为它们乘积的那个二重积分</strong>。
        而 <MathInline tex="e^{-x^2}e^{-y^2}=e^{-(x^2+y^2)}" />——
        <strong>指数上冒出了 <MathInline tex="x^2+y^2" />，
        这正是"到原点的距离的平方"。</strong>
      </p>
      <p>
        <strong>第二步：换极坐标。</strong>整个平面对应
        <MathInline tex="r\in[0,\infty),\ \theta\in[0,2\pi)" />，
        且 <MathInline tex="x^2+y^2=r^2" />、
        <MathInline tex="\mathrm{d}A=r\,\mathrm{d}r\,\mathrm{d}\theta" />：
      </p>
      <MathBlock tex="I^2 = \int_0^{2\pi}\!\!\int_0^{\infty} e^{-r^2}\,r\,\mathrm{d}r\,\mathrm{d}\theta" />
      <p>
        <strong>关键的一刻到了。</strong>看里层那个积分：
        <MathInline tex="\int_0^\infty e^{-r^2}\,r\,\mathrm{d}r" />——
        <strong>它前面正好多了一个 r！</strong>而这个 r 不是我们凑的，
        是雅可比自己带来的。有了它，
        <router-link to="/calculus/integration-methods">换元法</router-link>
        立刻可用（令 <MathInline tex="u=r^2,\ \mathrm{d}u=2r\,\mathrm{d}r" />）：
      </p>
      <MathBlock tex="\int_0^{\infty}e^{-r^2}r\,\mathrm{d}r = \frac12\int_0^{\infty}e^{-u}\mathrm{d}u = \frac12" />
      <p><strong>第三步：外层积分。</strong></p>
      <MathBlock tex="I^2 = \int_0^{2\pi}\frac12\,\mathrm{d}\theta = \frac{2\pi}{2} = \pi \quad\Longrightarrow\quad I = \sqrt{\pi}" />
      <p>
        （取正号，因为被积函数恒正。）
      </p>
      <p>
        <strong>回味：π 是从哪冒出来的？</strong>从
        <MathInline tex="\int_0^{2\pi}\mathrm{d}\theta" />——
        <strong>转了一整圈</strong>。而 <MathInline tex="e^{-x^2}" /> 里本来看不出任何圆的影子；
        是"把两个一维问题拼成一个二维问题"这一步，
        <strong>让隐藏的旋转对称性显了形</strong>（<MathInline tex="e^{-(x^2+y^2)}" />
        只依赖到原点的距离，它是一口<em>轴对称</em>的钟）。
      </p>
      <p>
        <strong>这也是"升维反而变简单"的经典范例</strong>：
        一维里三招全废（而且注定失败），二维里三行搞定。
        代价是你得先有二重积分和雅可比——本讲前两节做的正是这件事。
        <em>顺带说一句，这一招常被称作泊松的技巧，
        而这类"换个空间就化难为易"的思路，
        在<router-link to="/complex/residue">留数定理</router-link>那里还会以更彻底的形式出现
        （把实轴上的积分搬到复平面上绕一圈）。</em>
      </p>
    </RevealBox>
    <QuizBox
      quiz-id="multiple-integral-q2"
      question="上面那个证明里，最关键的一步是什么？"
      hint="从「一维积不出来」到「二维三行搞定」，中间那个转折点上出现了什么原本没有的东西？"
      :options="[
        { t: '换极坐标时雅可比自带的那个 r——正是它让 $\\int e^{-r^2}r\\,\\mathrm{d}r$ 变成一步换元', why: '对。$\\int e^{-x^2}\\mathrm{d}x$ 积不出来，而 $\\int e^{-r^2}r\\,\\mathrm{d}r$ 一步就出来，差别只在那个 r；而这个 r 不是凑的，是坐标变换的面积缩放因子<b>自己带来的</b>。「升维」之所以有用，正是因为它免费送来了这个因子。' },
        { t: '把 I 平方这一步，因为平方消掉了根号', why: '平方不是为了消根号（原式里没有根号）。它的作用是把两个一维积分<b>拼成一个二维积分</b>，从而让 $x^2+y^2$ 出现——没有这一步就换不了极坐标。但真正解题的临门一脚是那个 r。' },
        { t: '富比尼定理，因为它把二重积分拆成了两次单积分', why: '富比尼在这里只是记账工具（两处都用到），它本身不产生新东西。如果只用富比尼不换坐标，你会回到 $\\int e^{-x^2}\\mathrm{d}x$ 原地打转。' },
      ]"
      :answer="0"
    />

    <h2><span class="sec-no">伍</span>买到了什么：统计表上那个神秘常数的来历</h2>

    <h3>为什么每一张正态分布表前面都挂着 <MathInline tex="1/\sqrt{2\pi}" /></h3>
    <p>
      <strong>画面。</strong>打开任何一本统计教材、任何一个数据分析库的文档，
      正态分布的密度函数都长这样：
    </p>
    <MathBlock tex="\varphi(x)=\frac{1}{\sigma\sqrt{2\pi}}\exp\Bigl(-\frac{(x-\mu)^2}{2\sigma^2}\Bigr)" />
    <p>
      <strong>那个 <MathInline tex="\sqrt{2\pi}=2.5066" /> 是从哪来的？</strong>
      教材通常一句"归一化常数"带过。它其实就是本讲刚算出来的东西。
    </p>
    <p>
      <strong>为什么绕道多重积分。</strong>概率密度必须满足
      <MathInline tex="\int_{-\infty}^{\infty}\varphi = 1" />。
      所以那个常数 <strong>= 曲线下面积的倒数</strong>，
      而这块面积的被积函数正是刘维尔判过死刑的
      <MathInline tex="e^{-x^2/2}" />——<strong>一维里算不出来</strong>。
    </p>
    <p>
      <strong>推导。</strong>拿折叠框的结果，只差一次简单换元。令
      <MathInline tex="x=\sqrt{2}\,t" />（于是 <MathInline tex="\mathrm{d}x=\sqrt2\,\mathrm{d}t" />）：
    </p>
    <MathBlock tex="\int_{-\infty}^{\infty} e^{-x^2/2}\,\mathrm{d}x = \sqrt2\int_{-\infty}^{\infty}e^{-t^2}\,\mathrm{d}t = \sqrt2\cdot\sqrt{\pi} = \sqrt{2\pi} = 2.5066" />
    <p>
      <strong>所以密度前面必须除以 <MathInline tex="\sqrt{2\pi}" /></strong>，
      面积才等于 1。再带上标准差 σ（做一次伸缩换元
      <MathInline tex="x\to(x-\mu)/\sigma" />，又是<router-link to="/calculus/integration-methods">
      换元那一讲</router-link>的活），就得到上面那条完整公式。
    </p>
    <p>
      <strong>读出物理：这个数一直在你身边。</strong>
      "68–95–99.7 法则"里的每一个百分比，都是
      <MathInline tex="\frac{1}{\sqrt{2\pi}}\int_{-k}^{k}e^{-x^2/2}\mathrm{d}x" /> 算出来的；
      体检报告上的参考区间、工厂的六西格玛、民调的"±3 个百分点"，
      全都要先除以这个 2.5066。<strong>一个连原函数都写不出来的函数，
      靠着"升到二维转一圈"，给出了现代统计学最常用的那个常数。</strong>
    </p>
    <p>
      <strong>条件不成立会怎样。</strong>这套推导用了两个前提：
      ① <strong>积分区间是整条实轴</strong>——正因为覆盖整个平面，
      极坐标才能干净地转满 <MathInline tex="2\pi" />。
      要是只积到有限区间（比如 <MathInline tex="\int_0^1e^{-x^2}" />），
      <strong>这一招立刻失效</strong>，只能回去做数值积分
      （<router-link to="/numerical/quadrature">数值分析第 4 讲</router-link>），
      或者查那张著名的 <MathInline tex="\Phi" /> 表——
      <strong>那张表存在的理由，正是这里的失效</strong>。
      ② <strong>被积函数必须可积</strong>：<MathInline tex="e^{-x^2}" /> 衰减极快（比任何
      <MathInline tex="1/x^n" /> 都快），积分才收敛；换成柯西分布那种重尾的家伙，
      连期望都不存在（<router-link to="/probability/clt">中心极限定理</router-link>
      在那里当场失灵）。
    </p>

    <h3>还买到了什么：三个顺手的去处</h3>
    <ul>
      <li>
        <strong>质心与转动惯量。</strong>一块形状古怪的板子，
        重心在哪、绕轴转起来有多"沉"，都是二重积分：
        <MathInline tex="\bar{x}=\frac{1}{A}\iint x\,\mathrm{d}A" />、
        <MathInline tex="I=\iint \rho\,r^2\,\mathrm{d}A" />。
        花样滑冰运动员收臂加速，收的就是这个 <MathInline tex="r^2" />。
      </li>
      <li>
        <strong>球坐标下的 <MathInline tex="r^2\sin\varphi" />。</strong>
        三维换元的雅可比同样算得出来，
        而它正是<router-link to="/mathphys/laplace">拉普拉斯方程</router-link>
        在球对称问题里那些系数的来历。
      </li>
      <li>
        <strong>换元不止极坐标。</strong>算一块被斜切的平行四边形区域上的积分时，
        换一个"把它拉直"的线性变换，雅可比就是个常数——
        这时本讲的公式退化成<router-link to="/linear-algebra/determinant">线代那一讲</router-link>
        的"面积乘以 |det|"，一字不差。
      </li>
    </ul>
    <div class="insight">
      <div class="insight-title">🔗 这一讲往后通到哪：站内连一连</div>
      <p>
        <strong>概率论</strong>：多维随机变量的联合密度、边缘分布，全是本讲的二重积分；
        <router-link to="/probability/clt">中心极限定理</router-link>里那条极限曲线的合法性，
        依赖本讲算出的归一化常数；
        <strong>数理方程</strong>：<router-link to="/mathphys/heat">热核</router-link>
        <MathInline tex="\frac{1}{\sqrt{4\pi a^2 t}}e^{-x^2/4a^2t}" /> 前面的系数
        又是同一个 <MathInline tex="\sqrt{\pi}" />——它保证"总热量不变"；
        <strong>复变函数</strong>：<router-link to="/complex/residue">留数定理</router-link>
        是"换个空间算积分"的另一种更彻底的版本；
        <strong>线性代数</strong>：<router-link to="/linear-algebra/determinant">行列式</router-link>
        在这里第一次以"局部"的身份出场——每一点一个行列式，连成一片就是雅可比。
      </p>
    </div>
  </ConceptPage>
</template>
