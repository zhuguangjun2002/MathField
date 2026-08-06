<script setup>
import ConceptPage from '../../components/ConceptPage.vue'
import MathBlock from '../../components/MathBlock.vue'
import MathInline from '../../components/MathInline.vue'
import RevealBox from '../../components/RevealBox.vue'
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
        ——先沿哪个方向切不影响结果，后面推导会反复默用这一条。
        为什么？把两边都摊成差商就看见了：两者算的<strong>都是同一个东西</strong>——
        以 <MathInline tex="(x_0,t_0)" /> 为角、边长 h 和 k 的小矩形上，
        四个角的值按"对角加、反对角减"组合起来
        （<MathInline tex="u(x_0{+}h,t_0{+}k) - u(x_0{+}h,t_0) - u(x_0,t_0{+}k) + u(x_0,t_0)" />），
        再除以 <MathInline tex="hk" />。这个式子对 h、k 完全对称，
        先让谁趋于零自然不影响结果。括注里那句"函数足够光滑"管的是极限交换是否合法；
        真存在反例（二阶偏导存在但不连续的病态函数），只是这门课遇不到。
      </li>
    </ul>

    <h2><span class="sec-no">伍</span>买到了什么：一门课的语言，三大主角的名片</h2>

    <h3>天气预报：全世界最贵的一台偏微分方程求解器</h3>
    <p>
      在讲三大方程之前，先看一件你每天都要看一眼的东西——手机上那个降水概率。
      它不是统计出来的（"历史上这天下雨的比例"那种），也不是谁看云识天气看出来的：
      <strong>它是一个偏微分方程组被数值求解的结果</strong>，
      而这件事之所以可能，靠的正是本讲这一个动作——切片。
    </p>
    <p>
      <strong>为什么天气非得是 PDE。</strong>大气不是质点：它的每一点都有自己的温度、气压、
      湿度和风速，这正是本讲第壹节说的<strong>场</strong>。
      牛顿定律当然仍然管用，可它得写成"对每一小团空气都成立"的形式——
      一小团空气的加速度，取决于它<strong>周围</strong>的气压差多大，
      而"周围的气压差"正是气压对空间的偏导数。同理，
      这一点的温度会不会升高（对 t 的偏导），取决于风把多少热量吹进来（对 x、y 的偏导）。
      每一条物理定律都变成一条"把时间偏导和空间偏导连起来"的等式，一条顶无穷条。
      <strong>这就是天气预报的全部原理</strong>：写下这几条方程，给出今天的观测当初值，
      让方程往前走。
    </p>
    <div class="story">
      <div class="story-title">📜 1922 年 · 一个人，六个星期，一场错得离谱的预报</div>
      <p>
        英国人<strong>理查森</strong>是第一个真干这件事的人。他在一战的战场救护车上算完了手稿，
        1922 年出版《用数值方法做天气预报》。做法就是本讲那个切片的极端版：
        把欧洲切成一格格方块，每格记下气压、温度、风速，
        再把方程里所有偏导数换成<strong>差商</strong>——
        也就是上面动画里算 <MathInline tex="\partial^2 u/\partial x^2" /> 用的那种
        "左邻 − 2×自己 + 右邻，再除以格距的平方"。偏导数一旦变成加减乘除，
        剩下的就只是算得完算不完的问题了。
      </p>
      <p>
        他为 1910 年 5 月 20 日算了一个<strong>六小时</strong>的预报，手算了<strong>约六个星期</strong>。
        结果是：气压将在六小时内变化 <strong>145 百帕</strong>。
        而当天的实际情况是——气压几乎<strong>纹丝不动</strong>。
        这是气象史上最有名的一次失败：一个方法完全正确、数字全部算对的预报，
        错得像个笑话。
      </p>
      <p>
        理查森自己并不气馁，他在书里设想了一座<strong>"预报工厂"</strong>：
        一个巨大的圆形大厅，六万四千人各自负责地图上的一小格，
        中央有个人像指挥乐队一样打拍子协调进度——这样就能算得比天气本身快。
        这个幻想在 1950 年成真了，只是执行者不是六万四千人，
        而是一台叫 ENIAC 的机器：冯·诺依曼等人在上面做出了第一次<strong>成功</strong>的数值天气预报。
      </p>
    </div>
    <p>
      <strong>理查森究竟栽在哪儿——两个坑，别混为一谈。</strong>
      这两条正好是这门课与数值课交界处最要紧的两句话：
    </p>
    <ul>
      <li>
        <strong>坑一：初值里混进了不该有的东西（理查森栽的是这个）。</strong>
        他只往前走了一步，所以"越算越炸"来不及发生。
        真正的毛病在起点：真实大气里，气压和风速时刻精确地互相平衡着，
        而观测数据带着误差，喂进方程的初始场就是一张<strong>轻微失衡</strong>的图。
        方程忠实地把这份失衡演化成了剧烈的快速振荡（物理上真的存在，只是平时幅度极小），
        六小时外推出去就成了 145 百帕。<strong>方程没错，数值也没错，是初值不"干净"</strong>——
        今天的业务预报为此专门有一道工序叫"初始化"，就是把这份失衡先滤掉；
      </li>
      <li>
        <strong>坑二：格子多大，步长就只能多小（这是所有人都躲不掉的）。</strong>
        1928 年库朗、弗里德里希斯、卢伊三人证明了一条硬约束，人称
        <strong>CFL 条件</strong>：时间步长必须满足
        <MathInline tex="\Delta t \le \Delta x / c" />，其中 c 是这套方程里<strong>跑得最快</strong>的那种信号的速度。
        道理很朴素——差商只让每个格点跟它的左邻右舍说话，
        一步之内信息只能传一格；要是真实的波一步之内能跑过好几格，
        数值解就永远追不上物理，误差每一步翻倍，几十步后满屏都是垃圾。
        大气里跑得最快的是声波和重力波，约 300 米/秒。代进去算一下就很直观：
      </li>
    </ul>
    <MathBlock tex="\Delta x = 200\ \text{km} \Rightarrow \Delta t \le \frac{200000}{300} \approx 667\ \text{s} \approx 11\ \text{min}, \qquad \Delta x = 10\ \text{km} \Rightarrow \Delta t \le 33\ \text{s}" />
    <p>
      理查森当年用的时间步长是 <strong>3 小时</strong>——超出 200 公里格距的上限约 <strong>16 倍</strong>。
      他只走一步所以没被这一条咬到，但任何想连着走几百步的人都会。
      顺带这也解释了天气预报为什么这么费机器：
      把格距从 200 公里加密到 10 公里，水平格点数从两万涨到八百万（涨 400 倍），
      而 CFL 逼着步长也缩短 20 倍——<strong>总计算量涨了约八千倍，只为把分辨率提高 20 倍</strong>。
      分辨率每前进一步都要拿超级计算机去换，原因就写在上面那个不等式里。
    </p>
    <p>
      <strong>那为什么预报只能报到一周左右？</strong>这是第三件事，
      而且它跟前两条的性质完全不同——它不是算力不够，也不是方法不好。
      1961 年，气象学家<strong>洛伦兹</strong>重跑一次模拟时图省事，
      把中途的一组数据按打印稿重新输入，只保留了三位小数（0.506，而机器里存的是 0.506127）。
      他本以为结果只会差一点点，回来一看：<strong>两条曲线在几个"月"之后已经毫无关系</strong>。
      这就是后来人人都会说的<strong>蝴蝶效应</strong>。
      它意味着初始观测里那点无法消除的误差会指数式放大，
      而放大到淹没预报所需的时间，对大气来说大约就是<strong>两周</strong>。
      <strong>这是物理定律给天气预报划的天花板，不是工程问题</strong>——
      再快一万倍的计算机也搬不动它。所以你手机上的预报越往后越含糊，
      七天以后干脆只给个概率，理由不在气象台，在方程本身。
    </p>
    <p>
      回头看这一整节用到的数学：只有"把场切片、把偏导数换成差商"这一个动作。
      本讲讲完的东西，已经足够让你看懂全世界最大的那几台超级计算机每天在算什么了。
    </p>

    <h3>三位主角的名片</h3>
    <p>语言已备齐，先把即将登场的三位主角的名片发给你——它们长得像，秉性迥异：</p>
    <ul>
      <li>
        <strong>波动方程</strong> <MathInline tex="u_{tt} = c^2 u_{xx}" />：加速度 ∝ 弯曲度。
        时间上二阶 ⇒ 时间可逆（倒放录像照样合法）、能量守恒、扰动以有限速度 c 传播。琴弦、声波、光都是它；
      </li>
      <li>
        <strong>热传导方程</strong> <MathInline tex="u_t = a^2 u_{xx}" />：变化率 ∝ 弯曲度。
        时间上<strong>一阶</strong>——就差这一阶，性情剧变：不可逆（热不会自己聚回去）、抹平一切、瞬时传播。
        热扩散、墨水在水里散开、一杯咖啡凉下去都是它；而且
        <router-link to="/probability/clt">概率论第 5 讲</router-link>那条钟形曲线会在这里再次出现——
        它正是这个方程最基本的一个解（<router-link to="/mathphys/heat">第 3 讲</router-link>见分晓）；
      </li>
      <li>
        <strong>拉普拉斯方程</strong> <MathInline tex="u_{xx} + u_{yy} = 0" />：没有时间——
        它管的是一切尘埃落定后的<strong>稳态</strong>。引力势、静电势、稳定温度分布。
        <router-link to="/complex/holomorphic">复变第 2 讲</router-link>已剧透：
        解析函数的实虚部都是它的解，而
        <router-link to="/complex/cauchy-integral">复变第 3 讲</router-link>用它算了法拉第笼。
      </li>
    </ul>
    <p>
      上面每张名片都写着"时间可逆 / 不可逆"，这话听着玄，其实<strong>三行就能验</strong>——
      而且验的办法只用到本讲刚学的偏导数。先自己想想：
      "倒放录像"翻译成数学，无非是把方程里的 <MathInline tex="t" /> 换成
      <MathInline tex="-t" />，再看方程还成不成立。
    </p>
    <RevealBox
      title="🔍 把录像倒放：一个减号，就分出了可逆与不可逆"
      label="对答案 / 看完整拆解"
    >
      <template #hint>
        先自己动笔：设 <MathInline tex="v(x,t) = u(x,-t)" />（这就是"倒放的录像"）。
        用链式法则算 <MathInline tex="v_t" /> 和 <MathInline tex="v_{tt}" />，
        各自会冒出几个负号？再把它们分别代进两个方程，看哪个还认得出自己。
      </template>
      <p>
        <strong>第一步：倒放一次，导数各挨几个负号。</strong>
        令 <MathInline tex="v(x,t) = u(x,-t)" />，对 t 求导时内层的 <MathInline tex="-t" />
        每求一次导就掉出一个 <MathInline tex="-1" />：
      </p>
      <MathBlock tex="v_t(x,t) = -\,u_t(x,-t), \qquad v_{tt}(x,t) = (-1)^2 u_{tt}(x,-t) = +\,u_{tt}(x,-t)" />
      <p>
        关键就在这个平方：<strong>求两次导，两个负号自己抵消了</strong>；
        求一次导，负号留在那儿赖着不走。
        而对 x 求导跟 t 无关，<MathInline tex="v_{xx}(x,t) = u_{xx}(x,-t)" />，一个负号都没有。
      </p>
      <p><strong>第二步：代进波动方程。</strong>设 u 是解，即 <MathInline tex="u_{tt} = c^2 u_{xx}" />，那么</p>
      <MathBlock tex="v_{tt} = u_{tt}(x,-t) = c^2 u_{xx}(x,-t) = c^2 v_{xx}" />
      <p>
        <strong>v 也是解，一字不差。</strong>所以把一段琴弦振动的录像倒过来放，
        放出来的东西<strong>照样是一根合法的琴弦</strong>，物理上挑不出毛病。
        （这也是为什么把一段音频倒放，听起来仍然像某种正常的声音。）
      </p>
      <p><strong>第三步：代进热传导方程。</strong>设 <MathInline tex="u_t = a^2 u_{xx}" />，那么</p>
      <MathBlock tex="v_t = -\,u_t(x,-t) = -\,a^2 u_{xx}(x,-t) = -\,a^2 v_{xx}" />
      <p>
        得到的是 <MathInline tex="v_t = -a^2 v_{xx}" />——<strong>多了个负号，这不是原来那个方程</strong>。
        倒放的热传导录像不满足热传导方程，也就是说它<strong>在物理上根本不可能发生</strong>：
        一杯凉了的咖啡不会自己热回去，房间角落散开的烟不会自己聚回烟头。
      </p>
      <p>
        <strong>回味：全部区别只是"时间上几阶"。</strong>
        二阶 ⇒ 负号平方掉 ⇒ 时间没有方向；一阶 ⇒ 负号留下 ⇒ 时间有了箭头。
        物理学里那个宏大的"时间之箭"问题，在方程层面就是这么一个小小的指数
        （顺带说明为什么<strong>倒着解</strong>热方程是出了名的困难——
        "从现在的温度反推一小时前的温度"这件事，方程本身就不欢迎你，
        它属于所谓的<strong>不适定问题</strong>）。
      </p>
    </RevealBox>
    <div class="insight">
      <div class="insight-title">🔗 与你学过的课程连一连</div>
      <p>
        <strong>微积分</strong>：偏导数就是"切片 + 求导"，
        用的还是<router-link to="/calculus/derivative">第 2 讲</router-link>那个差商极限，
        一个新符号都没有——多元函数的方向导数、梯度是它的直系亲属；
        <strong>线性代数</strong>：注意三大方程都是<strong>线性</strong>的（解的叠加还是解）——
        <router-link to="/linear-algebra/vector-space">向量空间讲</router-link>说过
        "齐次方程的解集构成向量空间"，这将是整门课最锋利的武器：
        <router-link to="/mathphys/separation">第 5 讲</router-link>的分离变量法整个建立在它上面；
        <strong>数值分析</strong>：动画里用差商近似偏导
        （<MathInline tex="(u(x+h) - 2u(x) + u(x-h))/h^2" />），
        正是数值解 PDE 的差分法的第一步；而上面理查森那两个坑，
        一个是<router-link to="/numerical/float-error">第 1 讲</router-link>说的
        "小误差怎么被放大"，一个是<router-link to="/numerical/linear-system">第 5 讲</router-link>
        条件数与稳定性那套话的 PDE 版本；
        <strong>概率论</strong>：热传导方程的基本解正是
        <router-link to="/probability/clt">中心极限定理讲</router-link>那条钟形曲线——
        扩散与"无数次随机小碰撞的叠加"是同一件事的两种记账法。
      </p>
    </div>
  </ConceptPage>
</template>
