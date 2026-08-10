export const calculusConcepts = [
  {
    slug: 'limit',
    path: '/calculus/limit',
    title: '极限',
    subtitle: '一切的地基：如何驯服"无穷"',
    question: '芝诺说阿基里斯永远追不上乌龟，错在哪里？',
    era: '公元前 450 — 1861',
    figures: '芝诺 · 阿基米德 · 柯西 · 魏尔斯特拉斯',
    prereqs: [],
    baseline: '中学的数轴、绝对值，会解 $1/n < 0.001$ 这种不等式',
  },
  {
    slug: 'derivative',
    path: '/calculus/derivative',
    title: '导数',
    subtitle: '"此刻的速度"是什么意思？',
    question: '炮弹在最高点的那一瞬间，速度到底是多少？',
    era: '1629 — 1684',
    figures: '费马 · 牛顿 · 莱布尼茨',
    prereqs: [{ slug: 'limit', why: '导数就是一个极限' }],
    baseline: '中学的直线斜率、函数图象与幂运算法则（$a^{x+h} = a^x a^h$）',
  },
  {
    slug: 'chain-rule',
    path: '/calculus/chain-rule',
    title: '求导的算法：链式法则',
    subtitle: '从"能算"到"算得动"：一套机械可执行的规则',
    question: '$\\sin(x^2)$ 的导数为什么是 $2x\\cos(x^2)$，而不是 $\\cos(x^2)$？',
    era: '1675 — 1812',
    figures: '莱布尼茨 · 牛顿 · 巴贝奇',
    prereqs: [
      { slug: 'derivative', why: '本讲是在给上一讲那台"定义机器"配算法，处处要用最佳线性近似' },
    ],
    baseline: '中学的函数复合记号 $f(g(x))$、矩形面积、勾股定理',
  },
  {
    slug: 'extremum',
    path: '/calculus/extremum',
    title: '极值与中值定理',
    subtitle: '"令导数为零"能走多远：从费马的怪招到最优化',
    question: '费马 1629 年就会求极值，可那时导数还没被发明——他怎么做到的？',
    era: '1629 — 1797',
    figures: '费马 · 笛卡尔 · 罗尔 · 拉格朗日',
    prereqs: [
      { slug: 'derivative', why: '费马定理是从差商的符号夹出来的，全靠导数的定义' },
      { slug: 'chain-rule', why: '救生员与易拉罐两道最优化题，求导时都要用链式法则' },
    ],
    baseline: '中学的二次函数顶点、勾股定理、正弦的定义',
  },
  {
    slug: 'integral',
    path: '/calculus/integral',
    title: '积分',
    subtitle: '无限细分再加起来：面积问题两千年',
    question: '曲线围成的面积，怎么用直边图形算出来？',
    era: '公元前 250 — 1854',
    figures: '阿基米德 · 开普勒 · 黎曼',
    prereqs: [{ slug: 'limit', why: '"无限细分再加起来"的最后一步就是取极限' }],
    baseline: '中学的矩形面积、简单的连加',
  },
  {
    slug: 'ftc',
    path: '/calculus/ftc',
    title: '微积分基本定理',
    subtitle: '求切线与求面积，竟然是互逆运算',
    question: '为什么求导的"反操作"恰好能算出面积？',
    era: '1666 — 1693',
    figures: '牛顿 · 莱布尼茨 · 巴罗',
    prereqs: [
      { slug: 'derivative', why: '定理的一半在讲变化率' },
      { slug: 'integral', why: '另一半在讲面积' },
    ],
  },
  {
    slug: 'integration-methods',
    path: '/calculus/integration-methods',
    title: '积分的算法：换元与分部',
    subtitle: '把每一条求导法则倒过来读',
    question: '基本定理说"找到原函数就行"，可原函数到底怎么找？',
    era: '1684 — 1835',
    figures: '莱布尼茨 · 约翰·伯努利 · 洛必达 · 刘维尔',
    prereqs: [
      { slug: 'ftc', why: '"找原函数"这个任务是基本定理派下来的' },
      { slug: 'chain-rule', why: '换元法就是链式法则倒过来读，分部积分就是乘积法则倒过来读' },
    ],
    baseline: '中学的三角恒等式（含降幂公式 $\\cos^2\\theta=\\frac{1+\\cos 2\\theta}{2}$）、对数的定义',
  },
  {
    slug: 'arc-length',
    path: '/calculus/arc-length',
    title: '弧长、体积与曲率',
    subtitle: '同一把刀：切碎、拿简单形状冒充、求和、取极限',
    question: '圆的周长有公式，椭圆的周长为什么没有？',
    era: '1615 — 1673',
    figures: '开普勒 · 卡瓦列里 · 惠更斯',
    prereqs: [
      { slug: 'integral', why: '"切碎—求和—取极限"这把刀是那一讲造的，本讲只换冒充物' },
      { slug: 'integration-methods', why: '弧长积分里那个根号，靠三角换元才算得动' },
    ],
    baseline: '勾股定理、圆的周长与面积公式、相似三角形',
  },
  {
    slug: 'taylor',
    path: '/calculus/taylor',
    title: '泰勒展开',
    subtitle: '用多项式"冒充"任何函数',
    question: '计算器没有 sin 键的电路，它是怎么算出 sin 0.3 的？',
    era: '1715 — 1823',
    figures: '泰勒 · 麦克劳林 · 拉格朗日 · 柯西',
    prereqs: [{ slug: 'derivative', why: '整讲都在反复求导' }],
  },

  {
    slug: 'series',
    path: '/calculus/series',
    title: '无穷级数',
    subtitle: '加不完的和：什么时候"加到底"是有意义的',
    question: '$1+\\frac12+\\frac13+\\cdots$ 一直加下去，会不会超过 100？',
    era: '1350 — 1854',
    figures: '奥雷姆 · 欧拉 · 柯西 · 黎曼',
    prereqs: [
      { slug: 'limit', why: '"无穷和"被定义成部分和数列的极限，全部搬回第一讲那套语言' },
      { slug: 'taylor', why: '泰勒展开已经在用无穷和了，本讲补上它的许可证' },
      { slug: 'integration-methods', why: '积分判别法要算 $\\int_1^\\infty x^{-p}$ 这类反常积分' },
    ],
    baseline: '中学的等比数列求和公式、对数的定义',
  },

  {
    slug: 'ode',
    path: '/calculus/ode',
    title: '微分方程入门',
    subtitle: '未知的不是一个数，是一整条曲线',
    question: '牛顿第二定律 $F=ma$ 本身就是个方程，"解"出来是什么？',
    era: '1671 — 1838',
    figures: '牛顿 · 伯努利兄弟 · 马尔萨斯 · 韦吕勒',
    prereqs: [
      { slug: 'integration-methods', why: '分离变量就是两边积分，$\\int\\mathrm{d}y/y$ 是那一讲最常用的换元' },
      { slug: 'derivative', why: '第二讲埋的"复利的本质是 $y\'=y$"，本讲才真正解出来' },
    ],
    baseline: '指数与对数的运算法则、"半衰期"这个词',
  },

  {
    slug: 'gradient',
    path: '/calculus/gradient',
    title: '多元函数与梯度',
    subtitle: '山坡上往哪边走最陡',
    question: '温度 $T(x,y)$ 有两个自变量，它的"导数"该是几个数？',
    era: '1743 — 1847',
    figures: '欧拉 · 柯西 · 哈密顿',
    prereqs: [
      { slug: 'chain-rule', why: '方向导数是把复合函数沿一条直线切一刀，靠链式法则算出来的' },
      { slug: 'extremum', why: '多元极值就是把"令导数为零"换成"令梯度为零"，陷阱只多不少' },
    ],
    baseline: '等高线地图怎么看、向量的点积 $\\boldsymbol{a}\\cdot\\boldsymbol{b}=|\\boldsymbol{a}||\\boldsymbol{b}|\\cos\\varphi$',
  },

  {
    slug: 'multiple-integral',
    path: '/calculus/multiple-integral',
    title: '多重积分与换元',
    subtitle: '把 $\\sqrt{\\pi}$ 变出来：换一套坐标，积不动的就积得动',
    question: '$\\int e^{-x^2}\\mathrm{d}x$ 没有初等原函数，为什么它在整条实轴上的积分反而算得出来？',
    era: '1769 — 1841',
    figures: '欧拉 · 拉普拉斯 · 泊松 · 雅可比',
    prereqs: [
      { slug: 'integration-methods', why: '二维换元是一维换元的升级版，最后一步仍要用 $u=r^2$ 那种换元' },
      { slug: 'gradient', why: '雅可比矩阵由四个偏导数组成，靠的是"局部线性近似"' },
      { slug: 'determinant', why: '面积放大倍数就是行列式的绝对值，这条结论直接拿来用' },
    ],
    baseline: '极坐标（半径与角度）、弧长 = 半径 × 弧度',
  },

  {
    slug: 'rigor',
    path: '/calculus/rigor',
    title: '严格化：贝克莱的幽灵',
    subtitle: '一百五十年间，微积分是"对的但说不清"',
    question: '"无穷小"到底是不是零？如果不是，凭什么可以扔掉？',
    era: '1734 — 1872',
    figures: '贝克莱 · 柯西 · 魏尔斯特拉斯 · 戴德金',
    prereqs: [
      { slug: 'limit', why: '本讲要讲的正是那套 ε–δ 语言是被什么逼出来的' },
      { slug: 'derivative', why: '"可导 = 放大后像直线"这个图像，本讲拿它当量尺' },
      { slug: 'series', why: '魏尔斯特拉斯的反例是一个无穷级数，收敛性要用那一讲的判据' },
    ],
    baseline: '无需新知识；这是一讲回头算总账的课',
  },

  {
    slug: 'variational',
    path: '/calculus/variational',
    title: '变分法与最速降线',
    subtitle: '从所有曲线里挑出最好的那一条',
    question: '1696 年那道让牛顿熬了一夜的题：小球沿什么形状的滑道下落最快？',
    era: '1696 — 1755',
    figures: '约翰·伯努利 · 牛顿 · 欧拉 · 拉格朗日',
    prereqs: [
      { slug: 'extremum', why: '整套方法就是把"令导数为零"搬到无穷维；费马原理那一节还直接被伯努利的解法用上' },
      { slug: 'integration-methods', why: '推欧拉-拉格朗日方程的枢纽是一次分部积分（边界项被端点条件杀死）' },
      { slug: 'ode', why: '变分把"挑曲线"化成解一个二阶微分方程' },
    ],
    baseline: '能量守恒 $\\tfrac12mv^2=mgh$、圆滚动划出的轨迹叫摆线',
  },
]

export const linearAlgebraConcepts = [
  {
    slug: 'elimination',
    path: '/linear-algebra/elimination',
    title: '线性方程组与消元法',
    subtitle: '矩阵的前身：一张两千年前的记账表',
    question: '《九章算术》没有字母 x、y，凭什么能解三元方程组？',
    era: '公元前 1 世纪 — 1810',
    figures: '《九章算术》 · 高斯',
    prereqs: [],
    baseline: '中学的二元一次方程组、加减消元',
  },
  {
    slug: 'determinant',
    path: '/linear-algebra/determinant',
    title: '行列式',
    subtitle: '别背展开式：它是"面积的缩放因子"',
    question: '为什么 ad − bc = 0 的那一刻，方程组恰好出问题？',
    era: '1683 — 1750',
    figures: '关孝和 · 莱布尼茨 · 克莱姆',
    prereqs: [{ slug: 'elimination', why: '行列式生来就是为了预判消元的结局' }],
  },
  {
    slug: 'linear-map',
    path: '/linear-algebra/linear-map',
    title: '矩阵与线性变换',
    subtitle: '矩阵不是数表，是变换的名片',
    question: '矩阵乘法"行乘列"这么别扭的规则，是谁规定的？',
    era: '1858 — 1878',
    figures: '凯莱 · 西尔维斯特',
    prereqs: [{ slug: 'determinant', why: '"压扁"与面积倍率在本讲兑现成 $\\det(AB)=\\det A\\cdot\\det B$' }],
  },
  {
    slug: 'vector-space',
    path: '/linear-algebra/vector-space',
    title: '向量空间与线性无关',
    subtitle: '抽象不是玄学，是批发定理的方式',
    question: '函数、多项式、数列，凭什么也算"向量"？',
    era: '1844 — 1888',
    figures: '格拉斯曼 · 皮亚诺',
    prereqs: [
      { slug: 'elimination', why: '"维数配得齐"的证明，发动机是"方程比未知数少必有非零解"' },
      { slug: 'linear-map', why: '"不过原点的直线不是空间"与"平移不是线性变换"是同一件事' },
    ],
  },
  {
    slug: 'eigen',
    path: '/linear-algebra/eigen',
    title: '特征值与特征向量',
    subtitle: '变换的"骨架"：不改方向的特殊方向',
    question: '斐波那契数列的通项里，为什么会冒出黄金比例？',
    era: '1743 — 1904',
    figures: '欧拉 · 拉格朗日 · 柯西',
    prereqs: [
      { slug: 'linear-map', why: '特征向量就是"被变换后方向不变"的方向' },
      { slug: 'determinant', why: '$\\det(A-\\lambda I)=0$ 用的正是"压扁"判据' },
      { slug: 'vector-space', why: '配不配得齐一组特征基，问的是维数' },
    ],
  },
]

export const probabilityConcepts = [
  {
    slug: 'points-problem',
    path: '/probability/points-problem',
    title: '概率的诞生：点数分配问题',
    subtitle: '一场没赌完的赌局，怎么分钱才公平',
    question: '赌局中途散场，赌注按什么比例分给两个赌徒？',
    era: '1654 — 1657',
    figures: '帕斯卡 · 费马 · 惠更斯',
    prereqs: [],
    baseline: '中学的分数运算，会画树状图数路',
  },
  {
    slug: 'bayes',
    path: '/probability/bayes',
    title: '条件概率与贝叶斯',
    subtitle: '新信息来了，"可能性"怎么更新',
    question: '检测呈阳性，患病概率却不到一成——哪里出了错？',
    era: '1763 — 1812',
    figures: '贝叶斯 · 普莱斯 · 拉普拉斯',
    prereqs: [{ slug: 'points-problem', why: '条件概率就是把费马那棵树剪掉不合已知战况的枝' }],
  },
  {
    slug: 'distribution',
    path: '/probability/distribution',
    title: '随机变量与分布',
    subtitle: '单点概率为零之后，概率住进了"面积"里',
    question: '身高恰好等于 1.75000… 米的概率是 0，那"身高的分布"说的是什么？',
    era: '1733 — 1933',
    figures: '棣莫弗 · 拉普拉斯 · 柯尔莫哥洛夫',
    prereqs: [
      { slug: 'points-problem', why: '"数个数"在无穷多结局面前失灵，才逼出"量面积"' },
      { slug: 'bayes', why: '伍节的体检案例要用似然比说话' },
    ],
  },
  {
    slug: 'lln',
    path: '/probability/lln',
    title: '期望与大数定律',
    subtitle: '频率凭什么趋于概率',
    question: '扔一万次骰子，平均点数为什么总在 3.5 附近？"总"是多总？',
    era: '1657 — 1713',
    figures: '惠更斯 · 雅各布·伯努利',
    prereqs: [{ slug: 'distribution', why: '切比雪夫那三行的最后一步，就是"密度在一片区域上的积分等于概率"' }],
  },
  {
    slug: 'clt',
    path: '/probability/clt',
    title: '中心极限定理与正态分布',
    subtitle: '为什么误差、身高、噪声都长成钟形',
    question: '骰子的分布是平的，可 100 个骰子的平均数为什么是钟形的？',
    era: '1733 — 1810',
    figures: '棣莫弗 · 拉普拉斯 · 高斯',
    prereqs: [
      { slug: 'lln', why: '本讲的动作就是把大数定律的 ε 带按 $\\sigma/\\sqrt{n}$ 放大了看' },
      { slug: 'distribution', why: '"依分布收敛"要用分布函数的语言表述' },
    ],
  },
]

export const complexConcepts = [
  {
    slug: 'imaginary',
    path: '/complex/imaginary',
    title: '虚数的诞生',
    subtitle: '不是为了解 $x^2+1=0$，是被三次方程逼出来的',
    question: '明明在求一个实数根，中途为什么必须穿过 $\\sqrt{-121}$？',
    era: '1545 — 1831',
    figures: '卡尔达诺 · 邦贝利 · 韦塞尔 · 高斯',
    prereqs: [],
    baseline: '中学的平方根、坐标系，以及三角函数的"名字"',
  },
  {
    slug: 'holomorphic',
    path: '/complex/holomorphic',
    title: '复函数与复可导',
    subtitle: '同一个导数定义，搬到复数上苛刻得惊人',
    question: '复可导的函数为什么自动无穷次可导？实函数怎么没这种好事？',
    era: '1748 — 1851',
    figures: '欧拉 · 柯西 · 黎曼',
    prereqs: [
      { slug: 'imaginary', why: '复可导的核心直觉，就是第 1 讲"乘复数 = 旋转 + 伸缩"' },
      { slug: 'derivative', why: '差商取极限的定义原样搬来，只是 h 换成了复数' },
    ],
  },
  {
    slug: 'cauchy-integral',
    path: '/complex/cauchy-integral',
    title: '柯西积分定理',
    subtitle: '解析函数是"全息"的',
    question: '复平面上从 A 到 B 路径千万条，积分值凭什么不变？',
    era: '1814 — 1900',
    figures: '柯西 · 古萨',
    prereqs: [{ slug: 'holomorphic', why: '证明的两把工具之一，就是上一讲的柯西-黎曼方程' }],
  },
  {
    slug: 'residue',
    path: '/complex/residue',
    title: '留数定理',
    subtitle: '把积分变成数圈圈',
    question: '$\\int \\mathrm{d}x/(1+x^4)$ 硬算是酷刑，为什么数几个点就出答案？',
    era: '1826 — 1846',
    figures: '柯西',
    prereqs: [{ slug: 'cauchy-integral', why: '洛朗展开与"绕圈积分"全部建立在上一讲的积分公式上' }],
  },
  {
    slug: 'continuation',
    path: '/complex/continuation',
    title: '解析延拓与黎曼的遗产',
    subtitle: '一小段决定全体',
    question: '「1+2+3+… = −1/12」这句"胡话"，严格的说法是什么？',
    era: '1859 — 1900',
    figures: '黎曼 · 魏尔斯特拉斯',
    prereqs: [{ slug: 'residue', why: '圆盘接力的每一步，靠上一讲"收敛半径顶到最近奇点"来判盘' }],
  },
]

export const mathphysConcepts = [
  {
    slug: 'pde-intro',
    path: '/mathphys/pde-intro',
    title: '预备：从常微分到偏微分',
    subtitle: '未知数不再是一个函数，而是一整张"函数的地毯"',
    question: '弦上每一点都在动——一个方程怎么同时管住无穷多个点？',
    era: '1690 — 1746',
    figures: '莱布尼茨 · 欧拉',
  },
  {
    slug: 'wave',
    path: '/mathphys/wave',
    title: '波动方程',
    subtitle: '弦振动之争：吵了半个世纪的一根琴弦',
    question: '拨一下吉他弦，那个波形是怎么"决定"接下来怎么动的？',
    era: '1746 — 1755',
    figures: '达朗贝尔 · 欧拉 · 丹尼尔·伯努利',
  },
  {
    slug: 'heat',
    path: '/mathphys/heat',
    title: '热传导方程与傅里叶级数',
    subtitle: '一篇被拒稿的论文，改写了整个分析学',
    question: '烧红的铁棒各处温度怎么随时间变平？"任意波形都是正弦之和"凭什么？',
    era: '1807 — 1822',
    figures: '傅里叶 · 拉格朗日 · 狄利克雷',
  },
  {
    slug: 'laplace',
    path: '/mathphys/laplace',
    title: '拉普拉斯方程',
    subtitle: '稳态与调和：万物静止时的公共形状',
    question: '引力势、静电场、稳态温度，为什么服从同一个方程？',
    era: '1782 — 1850',
    figures: '拉普拉斯 · 泊松 · 格林',
  },
  {
    slug: 'separation',
    path: '/mathphys/separation',
    title: '分离变量法',
    subtitle: '三大方程的统一解法：在函数空间里对角化',
    question: '一个偏微分方程，怎么劈成一串各自为政的常微分方程？',
    era: '1753 — 1837',
    figures: '伯努利 · 傅里叶 · 斯图姆 · 刘维尔',
  },
]

export const numericalConcepts = [
  {
    slug: 'float-error',
    path: '/numerical/float-error',
    title: '浮点数与两种误差',
    subtitle: '为什么计算机眼里 0.1 + 0.2 ≠ 0.3',
    question: '明明用了双精度、十几位有效数字，为什么算着算着答案全错了？',
    era: '公元前 1700 — 1991',
    figures: '巴比伦人 · 卡亨 · IEEE 754',
    prereqs: [],
    baseline: '中学的小数与科学计数法，知道计算器会"舍入"',
  },
  {
    slug: 'root-finding',
    path: '/numerical/root-finding',
    title: '方程求根：二分法与牛顿法',
    subtitle: '五次方程没有求根公式，那根到底怎么算出来',
    question: '计算器按下 $\\sqrt{2}$，芯片里那一瞬间到底在做什么？',
    era: '公元前 1700 — 1690',
    figures: '巴比伦人 · 牛顿 · 拉夫森',
    prereqs: [{ slug: 'float-error', why: '差商的最优步长与"雷神之锤"案例，直接用第 1 讲的机器精度与灾难性抵消' }],
  },
  {
    slug: 'interpolation',
    path: '/numerical/interpolation',
    title: '插值与龙格现象',
    subtitle: '"过的点越多越准"——这个直觉会把你带进坑',
    question: '用 11 个点插一条平滑曲线，为什么两端反而甩出巨大的波浪？',
    era: '1795 — 1901',
    figures: '拉格朗日 · 牛顿 · 龙格',
    prereqs: [],
    baseline: '中学的"两点定一条直线、三点定一条抛物线"',
  },
  {
    slug: 'quadrature',
    path: '/numerical/quadrature',
    title: '数值积分：从数格子到高斯求积',
    subtitle: '大多数积分没有原函数，面积却照样要算',
    question: '$\\int e^{-x^2}\\,\\mathrm{d}x$ 算不出原函数，正态分布表里的数是从哪来的？',
    era: '1668 — 1814',
    figures: '牛顿 · 辛普森 · 高斯',
    prereqs: [{ slug: 'float-error', why: '算尾概率时会正面撞上第 1 讲的抵消陷阱' }],
  },
  {
    slug: 'linear-system',
    path: '/numerical/linear-system',
    title: '线性方程组的数值解：主元与条件数',
    subtitle: '消元你会，但为什么同一个方程组能算出天壤之别的答案',
    question: '系数只动了千分之一，解却翻了个底朝天——是谁在放大误差？',
    era: '1809 — 1948',
    figures: '高斯 · 图灵 · 威尔金森',
    prereqs: [
      { slug: 'float-error', why: '条件数是第 1 讲那桩舍入误差悬案的最终解答，首尾呼应' },
      { slug: 'interpolation', why: '岭回归与范德蒙病态，是第 3 讲白纸黑字留下的欠账' },
    ],
  },
]

export const courses = [
  {
    slug: 'calculus',
    path: '/calculus',
    title: '微积分',
    subtitle: '从芝诺悖论到最小作用量：驯服无穷的两千年',
    available: true,
    order: 1,
    stage: '地基',
    difficulty: 1,
    prereqCourses: [],
    concepts: calculusConcepts,
    intro:
      '微积分只回答两个几何问题：<strong>曲线在一点有多陡</strong>（导数），<strong>曲线下方围了多大面积</strong>（积分）。这门课<strong>不假设你学过微积分</strong>——只要会中学的代数和函数图象就能读，每个新符号第一次出现都会当场交代它怎么读、从哪来。真正难的从来不是那两个几何问题本身，而是回答它们必须动用「无穷」—— 无穷细分、无穷逼近。整部微积分史，就是人类学会与无穷安全打交道的历史。全课 15 讲：前 9 讲把两把刀（导数、积分）造出来、配上算法、证明它们互逆；后 6 讲把它们推向无穷级数、微分方程、多元与多重积分，最后回头把地基重浇一遍，并把「求极值」推到极致——从所有曲线里挑出最好的那一条。',
    timelineTitle: '两千年时间线',
    timeline: [
      {
        era: '约公元前 450 年',
        title: '芝诺抛出四个悖论',
        text: '「飞矢不动」「阿基里斯追不上乌龟」——无穷第一次显露獠牙，希腊人选择绕着走。',
      },
      {
        era: '约公元前 250 年',
        title: '阿基米德的穷竭法',
        text: '用内接多边形一步步"穷竭"曲边图形，算出抛物线弓形面积——积分思想的最早雏形。',
      },
      {
        era: '1629 — 1665 年',
        title: '费马求极值，牛顿算流数',
        text: '解析几何登场后，切线和瞬时速度成了迫切问题。牛顿在瘟疫假期里发明了"流数术"。',
      },
      {
        era: '1684 年',
        title: '莱布尼茨发表微积分',
        text: '独立发明并给出沿用至今的记号 $\\mathrm{d}y/\\mathrm{d}x$ 与 $\\int$。求导与求积分被基本定理焊接为一体。',
      },
      {
        era: '1734 年',
        title: '贝克莱主教的攻击',
        text: '「无穷小是消失量的幽灵！」——微积分好用但逻辑漏洞百出，第二次数学危机爆发。',
      },
      {
        era: '1696 — 1755 年',
        title: '最速降线与变分法',
        text: '约翰·伯努利公开挑战"哪条滑道最快"，牛顿一夜解出。欧拉与拉格朗日随后把它变成通法——从此"未知量是一整条曲线"也能求极值。',
      },
      {
        era: '1821 — 1861 年',
        title: '柯西与魏尔斯特拉斯的严格化',
        text: '用 ε-δ 语言重建极限，无穷小被彻底逐出定义。你教科书上的那些定义，就是这场大扫除的成果。',
      },
      {
        era: '1872 年',
        title: '怪物登场，地基封顶',
        text: '魏尔斯特拉斯给出"处处连续、处处不可导"的函数；同年戴德金与康托尔构造出实数。直觉被推翻，而地基终于砌到底。',
      },
    ],
    tocNote:
      '建议按顺序读。前六讲是主干：极限是地基，导数与积分是两座塔，第 3、4 讲给导数配上算法与判据，第 6 讲的基本定理是塔间的桥；第 7—9 讲把桥修宽（积分技巧、量长度体积、用多项式冒充函数）；第 10—13 讲走向无穷与多维（级数、微分方程、梯度、多重积分）；最后两讲回头看地基（严格化）、再把「求极值」推到尽头（变分法）。'
  },
  {
    slug: 'linear-algebra',
    path: '/linear-algebra',
    title: '线性代数',
    subtitle: '从解方程组到向量空间：抽象是怎么长出来的',
    available: true,
    order: 2,
    stage: '主干',
    difficulty: 1,
    prereqCourses: [],
    concepts: linearAlgebraConcepts,
    intro:
      '这门课<strong>不假设你学过线性代数，也不需要微积分</strong>——会解中学的二元一次方程组，就能从第一讲一路读到特征值；矩阵、向量这些词都会在它们该出场的地方现场介绍。教科书上来就是行列式和矩阵的运算规则，却不说这些规则为什么长这样。历史的顺序恰好相反：先有<strong>解方程组的记账技巧</strong>（消元），记账表用得多了才有了名字（矩阵），研究记账表才发现它的真身是<strong>变换</strong>，最后才把"能相加、能数乘"这件事本身抽象成<strong>向量空间</strong>。抽象不是从天而降的，是一层层被逼出来的。',
    timelineTitle: '两千年时间线',
    timeline: [
      {
        era: '约公元前 1 世纪',
        title: '《九章算术》的方程术',
        text: '中国算学家把系数摆成算筹方阵，「遍乘直除」逐列消去——这就是高斯消元法，早了一千八百年。',
      },
      {
        era: '1683 — 1693 年',
        title: '行列式先于矩阵诞生',
        text: '日本的关孝和与欧洲的莱布尼茨各自发现：方程组有没有解，取决于系数交叉相乘的一个判别式。',
      },
      {
        era: '1750 年',
        title: '克莱姆法则',
        text: '克莱姆给出用行列式直接写出方程组解的公式，行列式成为 18 世纪代数的主角。',
      },
      {
        era: '1801 — 1810 年',
        title: '高斯：测量大地逼出的消元法',
        text: '为处理天文与大地测量的成堆观测方程，高斯把消元整理成系统程序——今天数值软件里跑的仍是它。',
      },
      {
        era: '1844 — 1858 年',
        title: '格拉斯曼与凯莱的抽象化',
        text: '格拉斯曼写出无人能懂的 n 维「扩张论」；凯莱让矩阵脱离方程组独立成对象，用「变换复合」定义了矩阵乘法。',
      },
      {
        era: '1888 年',
        title: '皮亚诺公理化向量空间',
        text: '「凡是能相加、能数乘的东西都是向量」——函数、多项式、数列一并入伙，线性代数成为通用语言。',
      },
    ],
    tocNote:
      '建议按顺序读：消元法是起点，行列式和线性变换回答"运算规则为什么长这样"，向量空间把舞台抽象化，特征值是全课的收官——也是后面复变、数理方程要反复用的武器。',
  },
  {
    slug: 'probability',
    path: '/probability',
    title: '概率论',
    subtitle: '从赌桌纠纷到测度论：给"运气"建立数学',
    available: true,
    order: 3,
    stage: '主干',
    difficulty: 2,
    prereqCourses: ['calculus'],
    concepts: probabilityConcepts,
    intro:
      '几千年来人类一直在掷骰子，却始终认为"运气"属于神明，不属于数学——直到 1654 年两个法国人为一场没赌完的赌局通了几封信。概率论是数学史上罕见的<strong>出生证齐全</strong>的分支：我们确切知道它诞生在哪一年、为了什么问题。这门课<strong>不假设你学过概率统计</strong>——前两讲只用中学的分数和数数，第三讲起会用到站内微积分课的积分。从那张赌桌讲起，看"运气"如何一步步变成可计算的对象，教科书里那些定义（分布函数、期望、依概率收敛）各自是被什么麻烦逼出来的。',
    timelineTitle: '三百年时间线',
    timeline: [
      {
        era: '1654 年',
        title: '帕斯卡与费马的通信',
        text: '赌徒德·梅雷提问：赌局中途散场，赌注怎么分？两位数学家往来数信，把"未来的可能性"第一次算成了数。',
      },
      {
        era: '1657 年',
        title: '惠更斯《论赌博中的计算》',
        text: '第一本概率论著作。核心概念"赌局的价值"——就是今天的数学期望。',
      },
      {
        era: '1713 年',
        title: '雅各布·伯努利《猜度术》',
        text: '死后出版的遗著证明了第一个大数定律：频率必然趋于概率——概率论从赌桌走向整个经验世界。',
      },
      {
        era: '1733 年',
        title: '棣莫弗发现钟形曲线',
        text: '为逼近二项分布的系数，棣莫弗算出了 $e^{-x^2}$ 型曲线——正态分布悄然登场，当时无人在意。',
      },
      {
        era: '1763 — 1812 年',
        title: '贝叶斯与拉普拉斯',
        text: '贝叶斯的遗稿给出"看到证据后如何更新信念"；拉普拉斯集大成，把概率论用到天文、司法与人口。',
      },
      {
        era: '1933 年',
        title: '柯尔莫哥洛夫公理化',
        text: '用测度论三条公理终结"概率是什么"的百年争论——你教科书的第一章，就是这份苏联小册子的后代。',
      },
    ],
    tocNote:
      '建议按顺序读：点数分配问题是全部概念的胚胎，条件概率讲"信息如何改变可能性"，随机变量与分布是从赌桌到函数的关键一跃，大数定律兑现"频率≈概率"的承诺，中心极限定理解释钟形曲线为何无处不在。',
  },
  {
    slug: 'complex',
    path: '/complex',
    title: '复变函数',
    subtitle: '从"不可能的数"到最优雅的分析学',
    available: true,
    order: 4,
    stage: '进阶',
    difficulty: 3,
    prereqCourses: ['calculus', 'linear-algebra'],
    concepts: complexConcepts,
    intro:
      '$\\sqrt{-1}$ 在数学里住了三百年"黑户"：人人都用它算题，人人都不承认它存在——笛卡尔给它起的蔑称"虚数"沿用至今。这门课讲它的平反史（<strong>不假设你学过复变</strong>，只需先修过站内的微积分与线代课）：它如何被三次方程<strong>逼</strong>进数学（不是请进来的），如何在复平面上获得肉身，以及一件教科书很少直说的怪事——把微积分搬到复数上，非但没有变难，反而处处出现<strong>实函数享受不到的奇迹</strong>：可导一次就无穷可导、函数值由边界全息决定、算不动的实积分数几个点就出答案。',
    timelineTitle: '三百年时间线',
    timeline: [
      {
        era: '1545 年',
        title: '卡尔达诺《大术》',
        text: '三次方程求根公式发表。公式没错，可某些方程明明有实根，代入公式却要对负数开平方——赖不掉了。',
      },
      {
        era: '1572 年',
        title: '邦贝利"狂野的想法"',
        text: '工程师邦贝利硬着头皮给 $\\sqrt{-1}$ 立了运算规则，让它在计算中途出现又消掉，最后吐出正确的实根。',
      },
      {
        era: '1748 年',
        title: '欧拉的恒等式',
        text: '$e^{i\\theta} = \\cos\\theta + i\\sin\\theta$——指数、三角、虚数在一行里合流。欧拉用 $i$ 大杀四方，但仍称其为"不可能的数"。',
      },
      {
        era: '1797 — 1831 年',
        title: '复平面：虚数获得肉身',
        text: '挪威测量员韦塞尔、巴黎书商阿尔冈先后画出复平面，高斯一锤定音：复数就是平面上的点，乘 i 就是旋转 90°。',
      },
      {
        era: '1814 — 1831 年',
        title: '柯西建立复积分',
        text: '回路积分为零、积分公式、留数演算——柯西几乎凭一人之力把复分析盖成大厦。',
      },
      {
        era: '1851 — 1859 年',
        title: '黎曼的几何视角',
        text: '博士论文引入保角观点与黎曼面；1859 年那篇八页短文把 ζ 函数解析延拓到全平面，留下黎曼猜想。',
      },
    ],
    tocNote:
      '建议按顺序读：先看虚数怎么被逼出来、怎么"看得见"，再看复可导这个条件多苛刻（柯西-黎曼方程），然后是三级火箭——柯西定理、留数定理、解析延拓，一级比一级离谱，一级比一级好用。',
  },
  {
    slug: 'mathphys',
    path: '/mathphys',
    title: '数学物理方程',
    subtitle: '弦振动、热传导、引力场：三大方程的物理起源',
    available: true,
    order: 6,
    stage: '收官',
    difficulty: 3,
    prereqCourses: ['calculus', 'linear-algebra', 'probability', 'complex'],
    concepts: mathphysConcepts,
    intro:
      '这门课大学里一般到高年级才开，我们照样从零铺。它研究的是三个看得见摸得着的问题：<strong>琴弦怎么振动、热量怎么扩散、引力场长什么形状</strong>。三个问题各自凝成一个方程（波动、热传导、拉普拉斯），合称"三大方程"——大学里这门课的全部内容就是围着它们转。对你来说它还有另一层身份：<strong>全站的收官</strong>。微积分给的导数与级数、线性代数给的特征值与函数空间、概率论给的扩散直觉、复变给的调和函数——四门课埋的伏笔，都在这里兑现。',
    timelineTitle: '一百五十年时间线',
    timeline: [
      {
        era: '1746 — 1748 年',
        title: '达朗贝尔与欧拉：弦振动方程',
        text: '第一次有人为"连续体的运动"写下方程 —— 未知量是一整个函数 u(x,t)。行波解 f(x−ct)+g(x+ct) 同时问世。',
      },
      {
        era: '1753 年',
        title: '丹尼尔·伯努利的驻波叠加',
        text: '"任何振动都是正弦驻波的叠加"——音乐家听得懂（基音+泛音），数学家不买账：任意形状怎么可能是圆滑正弦之和？',
      },
      {
        era: '1782 — 1787 年',
        title: '拉普拉斯方程登场',
        text: '拉普拉斯研究天体引力势，写下 Δu = 0。后来发现静电、稳态温度、流体全在排队用同一个方程。',
      },
      {
        era: '1807 年',
        title: '傅里叶的论文被拒',
        text: '傅里叶宣称任意温度分布都能展成三角级数，并给出系数公式。评审人拉格朗日拒稿——这个断言太离经叛道。',
      },
      {
        era: '1822 年',
        title: '《热的解析理论》出版',
        text: '傅里叶不改初衷十五年，终成专著。热传导方程 + 傅里叶级数 + 分离变量法一整套武器公之于世。',
      },
      {
        era: '1829 — 1837 年',
        title: '狄利克雷补上严格性',
        text: '傅里叶级数何时真的收敛？狄利克雷给出第一个严格判据——顺便逼着数学家重新回答"函数是什么"。',
      },
    ],
    tocNote:
      '必须按顺序读：第一讲补齐偏导数和"场"的语言（你没学过，这讲是地基），然后三大方程各一讲——波动（能量守恒的振荡）、热（不可逆的抹平）、拉普拉斯（万物静止后的形状），最后分离变量法把三者一网打尽，也把全站的概念大会师。',
  },
  {
    slug: 'numerical',
    path: '/numerical',
    title: '数值分析',
    subtitle: '当公式失效：用有限步、有限精度算出够用的答案',
    available: true,
    order: 5,
    stage: '进阶',
    difficulty: 2,
    prereqCourses: ['calculus', 'linear-algebra'],
    concepts: numericalConcepts,
    intro:
      '教科书里的数学默认一切都能"精确算出来"：根有求根公式、积分有原函数、方程组能解出漂亮的分数。可真实世界几乎处处相反——<strong>五次以上方程没有求根公式</strong>、<strong>大多数积分没有初等原函数</strong>、计算机连 0.1 都存不准。数值分析研究的正是这件被纯数学"看不起"、却撑起整个科学计算的事：<strong>怎么用有限的步骤、有限的精度，算出一个误差可控、够用的近似答案</strong>。它从头到尾跟两个对手周旋——算不完带来的<strong>截断误差</strong>、存不准带来的<strong>舍入误差</strong>；也反复请出同一位英雄——<strong>迭代逼近 + 误差分析</strong>。这门课<strong>不假设你学过数值分析</strong>——只需先修过站内的微积分与线代。公式一大堆的课最怕不知道每个公式在跟哪种误差较劲；我们一开始就把这条暗线挑明。',
    timelineTitle: '一部"逼近"的历史',
    timeline: [
      {
        era: '约公元前 1700 年',
        title: '巴比伦泥板上的 $\\sqrt{2}$',
        text: 'YBC 7289 号泥板把 $\\sqrt{2}$ 算到小数点后近六位。他们没有求根公式，靠的是"猜一个、和它的商取平均、再猜"——这就是牛顿法开方的雏形，早了三千多年。',
      },
      {
        era: '1669 — 1690 年',
        title: '牛顿与拉夫森的切线求根',
        text: '牛顿用切线一步步逼近方程的根，拉夫森写成沿用至今的递推式。收敛快得惊人（每步正确位数翻倍），却也可能一脚踩空、越迭代越远。',
      },
      {
        era: '1743 — 1814 年',
        title: '求积公式成型',
        text: '辛普森用抛物线代替直线去算曲边面积，三个点竟能精确到三次多项式；高斯更狠，连取点的位置都当成待优化的自由度，n 个点精确积分 2n−1 次多项式。',
      },
      {
        era: '1901 年',
        title: '龙格的当头一棒',
        text: '龙格发现：用次数越来越高的多项式去插等距数据，非但不越来越准，反而在两端剧烈震荡、误差发散。"次数越高越精确"原来是错觉——这个反例逼出了整套现代逼近理论。',
      },
      {
        era: '1947 — 1948 年',
        title: '数值分析成为一门学科',
        text: '图灵、冯·诺依曼研究舍入误差如何在消元里累积、放大；图灵提出"条件数"，第一次量化了一个问题<em>天生</em>有多敏感——有些方程组的病，不怪算法，怪它自己。',
      },
      {
        era: '1985 年',
        title: 'IEEE 754 统一浮点数',
        text: '卡亨主持制定浮点标准，"0.1 + 0.2 到底等于几"第一次有了全世界一致的答案。此后每台计算机的算术都建立在这份标准上，他也因此获图灵奖。',
      },
    ],
    tocNote:
      '建议按顺序读：第一讲讲清楚"计算机怎么算数、误差从哪来"——这是全课的地基和世界观；后面四讲是数值分析的四大战场——解方程、插值、积分、线性方程组，每一战都在同一个母题下展开：如何把误差摁住。第一讲的舍入误差会在第五讲被"条件数"放大，首尾正好呼应。',
  },
]

const numerals = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十']

export function courseByPath(path) {
  return courses.find((c) => c.path === path)
}

/** 概念 slug -> { course, concept } 里的 concept（跨课查找，slug 全站唯一） */
export function conceptBySlug(slug) {
  const ctx = conceptContext(slug)
  return ctx ? ctx.concept : null
}

/** 课程 slug -> course 对象 */
export function courseBySlug(slug) {
  return courses.find((c) => c.slug === slug)
}

/** 概念 slug -> { course, concept, index(1 起), prev, next } */
export function conceptContext(slug) {
  for (const course of courses) {
    if (!course.concepts) continue
    const i = course.concepts.findIndex((c) => c.slug === slug)
    if (i >= 0) {
      return {
        course,
        concept: course.concepts[i],
        index: i + 1,
        numeral: numerals[i],
        prev: i > 0 ? course.concepts[i - 1] : null,
        next: i < course.concepts.length - 1 ? course.concepts[i + 1] : null,
      }
    }
  }
  return null
}

export function conceptNeighbors(slug) {
  const ctx = conceptContext(slug)
  return ctx ? { prev: ctx.prev, next: ctx.next } : { prev: null, next: null }
}

export { numerals }
