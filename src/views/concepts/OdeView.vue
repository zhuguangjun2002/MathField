<script setup>
import ConceptPage from '../../components/ConceptPage.vue'
import MathBlock from '../../components/MathBlock.vue'
import MathInline from '../../components/MathInline.vue'
import RevealBox from '../../components/RevealBox.vue'
import QuizBox from '../../components/QuizBox.vue'
import SlopeFieldDemo from '../../demos/SlopeFieldDemo.vue'
</script>

<template>
  <ConceptPage slug="ode">
    <h2><span class="sec-no">壹</span>困境：物理定律给的从来不是答案，是方程</h2>
    <p>
      翻开任何一本物理书，你会发现一件怪事：<strong>那些著名的定律，没有一条直接告诉你
      "东西在哪儿"</strong>。它们说的都是<em>变化率</em>。
    </p>
    <ul>
      <li>
        <strong>牛顿第二定律</strong> <MathInline tex="F=ma" />：给的是加速度，
        也就是位置的<strong>二阶导数</strong>；
      </li>
      <li>
        <strong>放射性衰变</strong>：每一刻减少的原子数<strong>正比于现存的原子数</strong>；
      </li>
      <li>
        <strong>牛顿冷却定律</strong>：物体降温的速度<strong>正比于它和环境的温差</strong>；
      </li>
      <li>
        <strong>马尔萨斯人口论（1798）</strong>：人口增长率<strong>正比于当前人口</strong>。
      </li>
    </ul>
    <p>
      四句话有同一个形状：<strong>"某个量的导数，等于关于这个量自己的一个表达式"</strong>。
      写成式子就是
    </p>
    <MathBlock tex="y' = f(t,\,y)" />
    <p>
      这叫<strong>微分方程</strong>。它和你解过的所有方程都不一样——
    </p>
    <div class="insight">
      <div class="insight-title">💡 困境的确切形状：未知的不是一个数，是一整条曲线</div>
      <p>
        解 <MathInline tex="x^2-5x+6=0" /> 时，未知的是<strong>一个数</strong>，
        答案是 2 和 3；解 <MathInline tex="y'=0.8y" /> 时，
        未知的是<strong>一个函数</strong>——答案是"所有满足这条关系的曲线"。
      </p>
      <p>
        更别扭的是：<strong>方程里同时出现未知函数和它的导数</strong>。
        你不能像中学那样"把 y 移到一边"，因为 <MathInline tex="y'" /> 不是 y 乘以什么，
        它是对 y 做的一次<em>操作</em>。
      </p>
      <p>
        <router-link to="/calculus/derivative">第二讲</router-link>末尾其实已经埋过这个词：
        那里说复利的本质是 <MathInline tex="y'=y" />，并且说"这个方程的解正是
        <MathInline tex="e^x" />"——<strong>可解方程的手法一直没给。这一讲补上。</strong>
      </p>
    </div>
    <div class="story">
      <div class="story-title">📜 1671 — 1690 年 · 微积分刚会走，就被推去解方程</div>
      <p>
        牛顿在 1671 年的《流数法》里就把问题分成两类：
        <strong>已知流量求流数</strong>（今天叫求导），和
        <strong>已知流数求流量</strong>（今天叫解微分方程）。
        他很清楚后者才是物理需要的那一半，也很清楚它难得多——
        他的办法是<strong>把解展开成幂级数，逐项定系数</strong>
        （<router-link to="/calculus/series">上一讲</router-link>的技术，
        至今仍是解方程的标准招法之一）。
      </p>
      <p>
        1690 年，雅各布·伯努利在《教师学报》上<strong>公开挑战</strong>：
        一条柔软的链子两端挂起来，自然下垂是什么形状？
        伽利略猜是抛物线，<strong>猜错了</strong>。一年之内，惠更斯、莱布尼茨与
        约翰·伯努利各自解出：那是<MathInline tex="y=a\cosh(x/a)" />，
        今天叫<strong>悬链线</strong>。他们用的正是新出炉的微分方程——
        <strong>这是微积分第一次解决一个"猜不出来"的问题</strong>，
        也是它从"求切线的技巧"变成"世界的语言"的转折点。
      </p>
    </div>

    <h2><span class="sec-no">贰</span>破局：两条路——把变量分开，或者干脆不解</h2>
    <h3>路一：分离变量（把 dy 和 dx 各归各家）</h3>
    <p>
      拿最重要的那个方程开刀：<MathInline tex="y' = ky" />
      （变化率正比于当前量，k 是比例常数）。写成莱布尼茨记号并
      <strong>把含 y 的搬到左边、含 t 的搬到右边</strong>：
    </p>
    <MathBlock tex="\frac{\mathrm{d}y}{\mathrm{d}t} = ky \quad\Longrightarrow\quad \frac{\mathrm{d}y}{y} = k\,\mathrm{d}t" />
    <p>
      两边分别积分——<strong>左边正是<router-link to="/calculus/integration-methods">换元那一讲</router-link>
      里最常用的那个 <MathInline tex="\int \mathrm{d}y/y=\ln|y|" /></strong>：
    </p>
    <MathBlock tex="\ln|y| = kt + C_1 \quad\Longrightarrow\quad |y| = e^{kt+C_1} = e^{C_1}e^{kt} \quad\Longrightarrow\quad y = C\,e^{kt}" />
    <p>
      最后一步把 <MathInline tex="\pm e^{C_1}" /> 合并记作 C（可正可负，
      <MathInline tex="C=0" /> 对应恒零解，也确实满足方程）。
      代初值 <MathInline tex="y(0)=y_0" /> 得 <MathInline tex="C=y_0" />：
    </p>
    <MathBlock tex="\boxed{\;y(t) = y_0\,e^{kt}\;}" />
    <p>
      <strong>这就是复利、衰变、冷却、繁殖共用的那条曲线</strong>，
      也终于兑现了第二讲那句"<MathInline tex="y'=y" /> 的解是 <MathInline tex="e^t" />"。
    </p>
    <p>
      <strong>但"把 dy 搬过去"合法吗？</strong>
      <MathInline tex="\mathrm{d}y/\mathrm{d}t" /> 不是分数，这件事说过两次了。
      这里的正当性还是来自<strong>换元法</strong>：严格写法是在等式
      <MathInline tex="\frac{1}{y}\frac{\mathrm{d}y}{\mathrm{d}t}=k" /> 两边对 t 积分，
      左边用 <MathInline tex="u=y(t)" /> 换元就成了 <MathInline tex="\int\mathrm{d}u/u" />。
      <strong>"分离变量"是这套操作的速记，不是新原理。</strong>
    </p>
    <h3>路二：斜率场（不解方程，先看解长什么样）</h3>
    <p>
      绝大多数微分方程<strong>解不出来</strong>——比 <router-link to="/calculus/integration-methods">
      积不出来</router-link>还普遍得多。好在有一件事永远做得到：
    </p>
    <p>
      方程 <MathInline tex="y'=f(t,y)" /> 的意思是"<strong>经过点
      <MathInline tex="(t,y)" /> 的解曲线，在那儿的斜率必须是
      <MathInline tex="f(t,y)" /></strong>"。那就在平面上<strong>每一点画一小段
      那个斜率的短线</strong>——得到一张"风向图"。
      <strong>解曲线就是顺着风向走出来的路。</strong>
    </p>
    <p>
      这张图叫<strong>斜率场</strong>。它不需要你解出任何东西，
      却能一眼看出解的<em>定性</em>行为：往上跑还是往下掉、有没有平台、
      从不同地方出发会不会汇到一起。叁节的动画就是干这个的。
    </p>
    <h3>一个更真实的例子：增长总会撞上天花板</h3>
    <p>
      <MathInline tex="y'=ky" /> 说人口按指数涨到无穷，这显然不对——
      资源有限。1838 年韦吕勒把方程改了一个字：
    </p>
    <MathBlock tex="y' = k\,y\Bigl(1-\frac{y}{M}\Bigr)" />
    <p>
      <strong>读这个式子</strong>：y 很小时括号约等于 1，退化成指数增长；
      y 接近上限 M 时括号趋于 0，增长熄火。<strong>它自带刹车。</strong>
      这叫<strong>逻辑斯蒂方程</strong>，它同样能分离变量解出来
      （要用一次部分分式，见折叠框），解是一条 S 形曲线。
      2020 年各国疫情早期的"累计确诊曲线"，媒体天天在画的就是它。
    </p>
    <RevealBox title="🔍 把逻辑斯蒂方程解到底：一次部分分式" label="对答案 / 看完整拆解">
      <template #hint>
        分离变量后你会面对
        <MathInline tex="\int\frac{\mathrm{d}y}{y(1-y/M)}" />。
        直接积不出来，但分母是<strong>两个一次因式的乘积</strong>——
        试试把它拆成 <MathInline tex="\frac{A}{y}+\frac{B}{M-y}" /> 的形式
        （通分回去比对分子，就能定出 A、B）。
      </template>
      <p><strong>第一步：分离变量。</strong>把 M 乘进括号，</p>
      <MathBlock tex="\frac{\mathrm{d}y}{\mathrm{d}t} = \frac{k}{M}\,y\,(M-y) \quad\Longrightarrow\quad \frac{M\,\mathrm{d}y}{y(M-y)} = k\,\mathrm{d}t" />
      <p><strong>第二步：拆分式。</strong>注意到一个恒等式（通分即验）：</p>
      <MathBlock tex="\frac{M}{y(M-y)} = \frac{1}{y} + \frac{1}{M-y}" />
      <p>
        （凑法：<MathInline tex="\frac1y+\frac1{M-y} = \frac{(M-y)+y}{y(M-y)} = \frac{M}{y(M-y)}" />
        ——分子恰好凑成常数 M，这正是"部分分式"想要的效果。）
      </p>
      <p><strong>第三步：两边积分。</strong>注意右边那项积分要带负号（里层导数是 −1）：</p>
      <MathBlock tex="\ln|y| - \ln|M-y| = kt + C_1 \quad\Longrightarrow\quad \frac{y}{M-y} = C\,e^{kt}" />
      <p><strong>第四步：解出 y。</strong>交叉相乘、把 y 收到一边：</p>
      <MathBlock tex="y = \frac{M\,C e^{kt}}{1 + Ce^{kt}} = \frac{M}{1 + \frac{1}{C}e^{-kt}}" />
      <p>
        代初值 <MathInline tex="y(0)=y_0" /> 得 <MathInline tex="C = \frac{y_0}{M-y_0}" />，
        于是
      </p>
      <MathBlock tex="y(t) = \frac{M\,y_0}{y_0 + (M-y_0)e^{-kt}}" />
      <p>
        <strong>验算</strong>（demo 的解析解那一栏用的就是它）：
        取 <MathInline tex="M=4,\ k=1,\ y_0=0.5" />，
        <MathInline tex="t=3" /> 时得 <MathInline tex="y=2.9662" />。
        <strong>读一读这个解</strong>：<MathInline tex="t\to\infty" /> 时
        <MathInline tex="e^{-kt}\to 0" />，<MathInline tex="y\to M" />——
        <strong>不管从哪儿出发，都爬向同一条天花板</strong>；
        而 <MathInline tex="y_0=0" /> 时解恒为 0，<MathInline tex="y_0>M" /> 时从上方压下来。
        这三句话在动画的斜率场里一眼看得见。
      </p>
    </RevealBox>
    <QuizBox
      quiz-id="ode-q1"
      question="解代数方程得到的是几个数，解微分方程 $y'=ky$ 得到的是什么？"
      hint="试着验算：$y=e^{kt}$ 满足方程吗？$y=5e^{kt}$ 呢？$y=-2e^{kt}$ 呢？"
      :options="[
        { t: '一整族函数 $y=Ce^{kt}$（C 任意），要再给一个初值才能挑出唯一的那一条', why: '对。这就是「通解 + 初值条件 = 特解」的结构：微分方程只约束了曲线的<b>形状</b>，没约束它的<b>高度</b>，而初值把它钉住。动画里拖 $y_0$ 时红线换一条、蓝色斜率场纹丝不动，画的就是这件事。' },
        { t: '一个函数 $y=e^{kt}$', why: '漏了常数倍：$5e^{kt}$、$-2e^{kt}$ 代进去同样成立（两边都乘 5 或 −2）。少了那个 C，你就没法回答「初始有 3 克还是 300 克」这种最基本的问题。' },
        { t: '几个数，就像解 $x^2=4$ 得到 ±2 一样', why: '未知量的<b>类型</b>变了：这里要求的是一条随时间变化的曲线，不是某个固定的数。「$y$ 等于几」这个问句本身在微分方程里就不成立——$y$ 每时每刻都不一样。' },
      ]"
      :answer="0"
    />

    <h2><span class="sec-no">叁</span>亲手顺着风向走一条解</h2>
    <p>
      下面这张图把方程本身画了出来：<strong>蓝色小短线组成的斜率场</strong>——
      每一点上短线的斜率就是方程规定的 <MathInline tex="y'" />。
      红色曲线是从你选的那个初值出发、处处顺着短线方向走出来的解。
    </p>
    <p>
      三个"照着做一遍"分别演示：<strong>初值只挑一条解、不改变场</strong>；
      <strong>数值解与解析解对账</strong>；以及逻辑斯蒂那两条
      <strong>平衡线</strong>——一条把附近的解全吸过去，另一条把它们全推开。
    </p>
    <SlopeFieldDemo />

    <h2><span class="sec-no">肆</span>严格定义：阶、通解，以及"解唯一吗"</h2>
    <div class="definition">
      <div class="def-title">📐 定义（常微分方程）</div>
      <p>
        含有未知函数 <MathInline tex="y(t)" /> 及其导数的等式，叫<strong>常微分方程</strong>
        （"常"是指只有一个自变量；若未知函数有多个自变量，就是
        <router-link to="/mathphys/pde-intro">偏微分方程</router-link>）。
        方程中出现的<strong>最高阶导数的阶数</strong>叫它的<strong>阶</strong>。
      </p>
      <p>
        含任意常数的解族叫<strong>通解</strong>；指定初始条件
        <MathInline tex="y(t_0)=y_0" /> 后定出的那一条叫<strong>特解</strong>。
        <strong>n 阶方程的通解含 n 个任意常数</strong>——所以牛顿第二定律
        （二阶）要给<strong>初位置和初速度</strong>两个条件，才能定下轨迹。
      </p>
    </div>
    <p>
      "n 阶要 n 个条件"这句话值得停一下：<strong>它正是"预测未来需要知道什么"的数学回答</strong>。
      抛出一块石头，只知道它现在在哪里<strong>不够</strong>——还得知道它现在多快。
      而知道了这两样，此后每一刻的位置就<strong>完全定死了</strong>。
      拉普拉斯 1814 年那个著名的"妖"——只要知道此刻宇宙中每个粒子的位置和速度，
      就能算出全部过去与未来——说的就是这条数学事实
      （虽然量子力学和<router-link to="/numerical/float-error">混沌</router-link>后来各给了它一记重击）。
    </p>
    <div class="definition">
      <div class="def-title">📐 存在唯一性定理（皮卡–林德勒夫）</div>
      <p>
        若 <MathInline tex="f(t,y)" /> 在点 <MathInline tex="(t_0,y_0)" /> 附近连续，
        且关于 y 满足<strong>李普希茨条件</strong>——存在常数 L 使
      </p>
      <MathBlock tex="|f(t,y_1)-f(t,y_2)| \le L\,|y_1-y_2|" />
      <p>
        ——则初值问题 <MathInline tex="y'=f(t,y),\ y(t_0)=y_0" />
        在 <MathInline tex="t_0" /> 附近<strong>存在唯一</strong>的解。
      </p>
    </div>
    <p>
      那个李普希茨条件不是凭空冒出来的：<router-link to="/calculus/extremum">中值定理那一讲</router-link>
      说过，<strong>只要 <MathInline tex="\partial f/\partial y" /> 有界，它就自动成立</strong>。
      所以对绝大多数"写得出来的"方程，唯一性是白给的。
      <strong>可一旦它不成立，事情会立刻失控</strong>：
    </p>
    <MathBlock tex="y' = 2\sqrt{|y|}, \qquad y(0)=0" />
    <p>
      这个方程有一个显然的解 <MathInline tex="y\equiv 0" />；
      但 <MathInline tex="y=t^2" />（<MathInline tex="t\ge0" />）也是解
      （验算：<MathInline tex="y'=2t" />，而 <MathInline tex="2\sqrt{t^2}=2t" /> ✓）；
      更过分的是，<strong>可以先趴在 0 上待任意久，再突然起飞</strong>——
      每一个起飞时刻给一条不同的解，<strong>解有无穷多条</strong>。
      毛病出在 <MathInline tex="\sqrt{|y|}" /> 在 <MathInline tex="y=0" /> 处的斜率是无穷大，
      李普希茨条件当场失效。<strong>"物理系统的未来被现在唯一决定"这句信念，
      是有数学前提的。</strong>
    </p>
    <QuizBox
      quiz-id="ode-q2"
      question="牛顿第二定律 $F=m\ddot{x}$ 是二阶方程，所以要两个初始条件。为什么「只知道现在的位置」不足以预测未来？"
      hint="两块石头此刻在同一位置，一块正往上飞、一块正往下落，它们下一秒会在同一位置吗？"
      :options="[
        { t: '因为二阶方程的通解含两个任意常数，位置只能定一个；剩下那个要靠初速度', why: '对，而且这就是「n 阶要 n 个条件」的物理含义：加速度由力给定，但「现在多快」是方程管不着的自由度。拉普拉斯妖要的正是位置<b>和</b>速度这一对。' },
        { t: '因为测量总有误差，位置测不准', why: '这是另一回事（混沌系统对误差敏感）。即使位置测得<b>绝对精确</b>，缺了速度照样算不出未来——上抛与下落的石头此刻可以在同一点。' },
        { t: '因为力 F 也可能随时间变化', why: '就算 F 是常数（自由落体）也一样需要初速度：$x=x_0+v_0t-\\frac12gt^2$ 里的 $v_0$ 没法从 $x_0$ 推出来。缺的是方程的阶数所要求的那个自由度。' },
      ]"
      :answer="0"
    />

    <h2><span class="sec-no">伍</span>买到了什么：给一具五千年前的尸体定年</h2>

    <h3>冰人奥兹死于什么时候</h3>
    <p>
      <strong>画面。</strong>1991 年 9 月，两名德国登山者在意大利与奥地利边境的
      冰川上发现一具冻僵的男尸。起初警方以为是山难遇难者，
      直到考古学家看见他随身的<strong>铜斧</strong>——那是新石器时代的东西。
      这具后来被称为"<strong>冰人奥兹</strong>"的遗体，成了欧洲最著名的考古发现之一。
      问题来了：<strong>他死于多久之前？</strong>
    </p>
    <p>
      <strong>为什么绕道微分方程。</strong>大气里有极少量的放射性碳
      <MathInline tex="^{14}\text{C}" />，活着的生物通过呼吸和进食
      不断与大气交换，体内比例与大气一致；<strong>一死，交换停止，
      <MathInline tex="^{14}\text{C}" /> 只减不增</strong>。
      而衰变的规律正是本讲第一个例子：
      <strong>每一刻减少的量正比于现存的量</strong>——
      因为每个原子的衰变是独立随机的，原子越多、单位时间衰变的就越多。
    </p>
    <p>
      <strong>推导。</strong>设 <MathInline tex="N(t)" /> 为剩余的
      <MathInline tex="^{14}\text{C}" /> 原子数，衰变常数 <MathInline tex="\lambda>0" />：
    </p>
    <MathBlock tex="\frac{\mathrm{d}N}{\mathrm{d}t} = -\lambda N \quad\Longrightarrow\quad N(t) = N_0\,e^{-\lambda t}" />
    <p>
      <MathInline tex="\lambda" /> 由<strong>半衰期</strong>定出：
      <MathInline tex="^{14}\text{C}" /> 的半衰期是 5730 年，即
      <MathInline tex="N(5730)=N_0/2" />，代入得
    </p>
    <MathBlock tex="e^{-5730\lambda} = \tfrac12 \quad\Longrightarrow\quad \lambda = \frac{\ln 2}{5730} = 1.20968\times 10^{-4}\ \text{年}^{-1}" />
    <p>
      反过来，测出剩余比例 <MathInline tex="N/N_0" />，就能解出时间：
    </p>
    <MathBlock tex="t = -\frac{1}{\lambda}\ln\frac{N}{N_0}" />
    <p>
      <strong>读出物理。</strong>奥兹的组织测得
      <MathInline tex="^{14}\text{C}" /> 剩余约 <strong>53%</strong>，代进去：
      <MathInline tex="t = -\ln(0.53)/1.20968\times10^{-4} = 5248" /> 年。
      经过树轮校正后的公布结论是<strong>距今约 5300 年</strong>
      （公元前 3350–3100 年）——反过来验算：5300 年对应剩余
      <MathInline tex="e^{-\lambda\cdot 5300} = 52.7\%" />，与实测吻合。
      <strong>一个一阶微分方程，把一具尸体的死亡时间精确到了几十年之内。</strong>
      1949 年利比发明这套方法，1960 年拿了诺贝尔化学奖，
      它至今是考古学的标尺。
    </p>
    <p>
      <strong>条件不成立会怎样——三条都是真实存在的坑。</strong>
    </p>
    <ul>
      <li>
        <strong>大气 <MathInline tex="^{14}\text{C}" /> 浓度并非恒定。</strong>
        推导里默认了"生前体内的比例 = 今天大气的比例"，
        可太阳活动与地磁场会让宇宙射线的产率波动。
        解决办法很硬核：用<strong>树木年轮</strong>逐年测定过去一万多年的真实浓度，
        做成校正曲线（所以论文里会写"校正后年代"）。
      </li>
      <li>
        <strong>1950 年代的核试验把大气 <MathInline tex="^{14}\text{C}" /> 抬高了近一倍。</strong>
        这条"炸弹脉冲"让 1955 年后的样本无法用常规方法定年——
        但它也变成了一件礼物：法医靠它判断牙釉质的形成年份，
        <strong>能推断出一个人的出生年份</strong>。
      </li>
      <li>
        <strong>方法有射程。</strong>约 5 万年后剩余量不到 0.3%，
        测量误差就压过信号了。<strong>再古老的样本要换半衰期更长的钟</strong>
        （铀-铅、钾-氩），但方程一字不改——<strong>换的只是 λ</strong>。
      </li>
    </ul>

    <h3>顺带一提：法医推断死亡时间用的是同一个方程</h3>
    <p>
      牛顿冷却定律说降温速率正比于温差：
      <MathInline tex="T' = -k\,(T - T_{\text{环境}})" />。
      令 <MathInline tex="u = T-T_{\text{环境}}" />，它就变回
      <MathInline tex="u'=-ku" />——<strong>同一个方程</strong>。
      设室温 20 °C、体温从 37 °C 开始，若测得一小时后降到 33.5 °C，
      则 <MathInline tex="k = \ln\frac{13.5}{17} = 0.2305" /> 每小时；
      当尸温降到 30.5 °C 时，<MathInline tex="t = \frac{1}{k}\ln\frac{17}{10.5} = 2.09" /> 小时。
      <strong>推理剧里法医摸一下额头就说"死了大约两小时"，
      背后是这条一阶线性方程。</strong>
      （当然现实中要修正衣物、体型、通风、初始体温个体差异——
      同样是"模型的前提有多牢"的问题。）
    </p>
    <div class="insight">
      <div class="insight-title">🔗 这一讲往后通到哪：站内连一连</div>
      <p>
        <strong>数理方程</strong>：把一个自变量换成两个（时间 + 空间），常微分方程就变成
        <router-link to="/mathphys/pde-intro">偏微分方程</router-link>；
        而<router-link to="/mathphys/separation">分离变量法</router-link>那一讲的核心动作
        ——把偏微分方程劈成两条常微分方程——正是为了退回到本讲的地盘；
        <strong>线性代数</strong>：一组互相耦合的微分方程写成
        <MathInline tex="\boldsymbol{y}'=A\boldsymbol{y}" />，
        解法是把 A <router-link to="/linear-algebra/eigen">对角化</router-link>，
        让每个特征方向各自按 <MathInline tex="e^{\lambda t}" /> 独立演化——
        <strong>本讲的 <MathInline tex="e^{kt}" /> 在那里变成一整套解耦机制</strong>；
        <strong>数值分析</strong>：解不出来时就数值积分（动画里那条红线用的四阶龙格-库塔，
        正是<router-link to="/numerical/quadrature">求积那一讲</router-link>思想的推广）；
        <strong>概率论</strong>：<router-link to="/probability/distribution">指数分布</router-link>
        的"无记忆性"与本讲的 <MathInline tex="y'=-\lambda y" /> 是一件事的两种说法。
      </p>
    </div>
  </ConceptPage>
</template>
