export const calculusConcepts = [
  {
    slug: 'limit',
    path: '/calculus/limit',
    title: '极限',
    subtitle: '一切的地基：如何驯服"无穷"',
    question: '芝诺说阿基里斯永远追不上乌龟，错在哪里？',
    era: '公元前 450 — 1861',
    figures: '芝诺 · 阿基米德 · 柯西 · 魏尔斯特拉斯',
  },
  {
    slug: 'derivative',
    path: '/calculus/derivative',
    title: '导数',
    subtitle: '"此刻的速度"是什么意思？',
    question: '炮弹在最高点的那一瞬间，速度到底是多少？',
    era: '1629 — 1684',
    figures: '费马 · 牛顿 · 莱布尼茨',
  },
  {
    slug: 'integral',
    path: '/calculus/integral',
    title: '积分',
    subtitle: '无限细分再加起来：面积问题两千年',
    question: '曲线围成的面积，怎么用直边图形算出来？',
    era: '公元前 250 — 1854',
    figures: '阿基米德 · 开普勒 · 黎曼',
  },
  {
    slug: 'ftc',
    path: '/calculus/ftc',
    title: '微积分基本定理',
    subtitle: '求切线与求面积，竟然是互逆运算',
    question: '为什么求导的"反操作"恰好能算出面积？',
    era: '1666 — 1693',
    figures: '牛顿 · 莱布尼茨 · 巴罗',
  },
  {
    slug: 'taylor',
    path: '/calculus/taylor',
    title: '泰勒展开',
    subtitle: '用多项式"冒充"任何函数',
    question: '计算器没有 sin 键的电路，它是怎么算出 sin 0.3 的？',
    era: '1715 — 1837',
    figures: '泰勒 · 麦克劳林 · 拉格朗日 · 柯西',
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
  },
  {
    slug: 'determinant',
    path: '/linear-algebra/determinant',
    title: '行列式',
    subtitle: '别背展开式：它是"面积的缩放因子"',
    question: '为什么 ad − bc = 0 的那一刻，方程组恰好出问题？',
    era: '1683 — 1750',
    figures: '关孝和 · 莱布尼茨 · 克莱姆',
  },
  {
    slug: 'linear-map',
    path: '/linear-algebra/linear-map',
    title: '矩阵与线性变换',
    subtitle: '矩阵不是数表，是变换的名片',
    question: '矩阵乘法"行乘列"这么别扭的规则，是谁规定的？',
    era: '1858 — 1878',
    figures: '凯莱 · 西尔维斯特',
  },
  {
    slug: 'vector-space',
    path: '/linear-algebra/vector-space',
    title: '向量空间与线性无关',
    subtitle: '抽象不是玄学，是批发定理的方式',
    question: '函数、多项式、数列，凭什么也算"向量"？',
    era: '1844 — 1888',
    figures: '格拉斯曼 · 皮亚诺',
  },
  {
    slug: 'eigen',
    path: '/linear-algebra/eigen',
    title: '特征值与特征向量',
    subtitle: '变换的"骨架"：不改方向的特殊方向',
    question: '斐波那契数列的通项里，为什么会冒出黄金比例？',
    era: '1743 — 1904',
    figures: '欧拉 · 拉格朗日 · 柯西',
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
  },
  {
    slug: 'bayes',
    path: '/probability/bayes',
    title: '条件概率与贝叶斯',
    subtitle: '新信息来了，"可能性"怎么更新',
    question: '检测呈阳性，患病概率却不到一成——哪里出了错？',
    era: '1763 — 1812',
    figures: '贝叶斯 · 普莱斯 · 拉普拉斯',
  },
  {
    slug: 'distribution',
    path: '/probability/distribution',
    title: '随机变量与分布',
    subtitle: '单点概率为零之后，概率住进了"面积"里',
    question: '身高恰好等于 1.75000… 米的概率是 0，那"身高的分布"说的是什么？',
    era: '1733 — 1933',
    figures: '棣莫弗 · 拉普拉斯 · 柯尔莫哥洛夫',
  },
  {
    slug: 'lln',
    path: '/probability/lln',
    title: '期望与大数定律',
    subtitle: '频率凭什么趋于概率',
    question: '扔一万次骰子，平均点数为什么总在 3.5 附近？"总"是多总？',
    era: '1657 — 1713',
    figures: '惠更斯 · 雅各布·伯努利',
  },
  {
    slug: 'clt',
    path: '/probability/clt',
    title: '中心极限定理与正态分布',
    subtitle: '为什么误差、身高、噪声都长成钟形',
    question: '骰子的分布是平的，可 100 个骰子的平均数为什么是钟形的？',
    era: '1733 — 1810',
    figures: '棣莫弗 · 拉普拉斯 · 高斯',
  },
]

export const complexConcepts = [
  {
    slug: 'imaginary',
    path: '/complex/imaginary',
    title: '虚数的诞生',
    subtitle: '不是为了解 x²+1=0，是被三次方程逼出来的',
    question: '明明在求一个实数根，中途为什么必须穿过 √−121？',
    era: '1545 — 1831',
    figures: '卡尔达诺 · 邦贝利 · 韦塞尔 · 高斯',
  },
  {
    slug: 'holomorphic',
    path: '/complex/holomorphic',
    title: '复函数与复可导',
    subtitle: '同一个导数定义，搬到复数上苛刻得惊人',
    question: '复可导的函数为什么自动无穷次可导？实函数怎么没这种好事？',
    era: '1748 — 1851',
    figures: '欧拉 · 柯西 · 黎曼',
  },
  {
    slug: 'cauchy-integral',
    path: '/complex/cauchy-integral',
    title: '柯西积分定理',
    subtitle: '解析函数是"全息"的',
    question: '复平面上从 A 到 B 路径千万条，积分值凭什么不变？',
    era: '1814 — 1900',
    figures: '柯西 · 古萨',
  },
  {
    slug: 'residue',
    path: '/complex/residue',
    title: '留数定理',
    subtitle: '把积分变成数圈圈',
    question: '∫dx/(1+x⁴) 硬算是酷刑，为什么数几个点就出答案？',
    era: '1826 — 1846',
    figures: '柯西',
  },
  {
    slug: 'continuation',
    path: '/complex/continuation',
    title: '解析延拓与黎曼的遗产',
    subtitle: '一小段决定全体',
    question: '「1+2+3+… = −1/12」这句"胡话"，严格的说法是什么？',
    era: '1859 — 1900',
    figures: '黎曼 · 魏尔斯特拉斯',
  },
]

export const courses = [
  {
    slug: 'calculus',
    path: '/calculus',
    title: '微积分',
    subtitle: '从芝诺悖论到 ε-δ：驯服无穷的两千年',
    available: true,
    concepts: calculusConcepts,
    intro:
      '微积分只回答两个几何问题：<strong>曲线在一点有多陡</strong>（导数），<strong>曲线下方围了多大面积</strong>（积分）。让它难学的从来不是这两个问题本身，而是回答它们必须动用「无穷」—— 无穷细分、无穷逼近。整部微积分史，就是人类学会与无穷安全打交道的历史。',
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
        text: '独立发明并给出沿用至今的记号 dy/dx 与 ∫。求导与求积分被基本定理焊接为一体。',
      },
      {
        era: '1734 年',
        title: '贝克莱主教的攻击',
        text: '「无穷小是消失量的幽灵！」——微积分好用但逻辑漏洞百出，第二次数学危机爆发。',
      },
      {
        era: '1821 — 1861 年',
        title: '柯西与魏尔斯特拉斯的严格化',
        text: '用 ε-δ 语言重建极限，无穷小被彻底逐出定义。你教科书上的那些定义，就是这场大扫除的成果。',
      },
    ],
    tocNote:
      '建议按顺序读：极限是地基，导数和积分是两座塔，基本定理是塔间的桥，泰勒展开是桥上的风景。',
  },
  {
    slug: 'linear-algebra',
    path: '/linear-algebra',
    title: '线性代数',
    subtitle: '从解方程组到向量空间：抽象是怎么长出来的',
    available: true,
    concepts: linearAlgebraConcepts,
    intro:
      '线性代数的教科书上来就是行列式和矩阵的运算规则，却不说这些规则为什么长这样。历史的顺序恰好相反：先有<strong>解方程组的记账技巧</strong>（消元），记账表用得多了才有了名字（矩阵），研究记账表才发现它的真身是<strong>变换</strong>，最后才把"能相加、能数乘"这件事本身抽象成<strong>向量空间</strong>。抽象不是从天而降的，是一层层被逼出来的。',
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
    concepts: probabilityConcepts,
    intro:
      '几千年来人类一直在掷骰子，却始终认为"运气"属于神明，不属于数学——直到 1654 年两个法国人为一场没赌完的赌局通了几封信。概率论是数学史上罕见的<strong>出生证齐全</strong>的分支：我们确切知道它诞生在哪一年、为了什么问题。这门课从那张赌桌讲起，看"运气"如何一步步变成可计算的对象，你教科书里那些测度味十足的定义（分布函数、期望、依概率收敛）各自是被什么麻烦逼出来的。',
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
        text: '为逼近二项分布的系数，棣莫弗算出了 e^{-x²} 型曲线——正态分布悄然登场，当时无人在意。',
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
    concepts: complexConcepts,
    intro:
      '√−1 在数学里住了三百年"黑户"：人人都用它算题，人人都不承认它存在——笛卡尔给它起的蔑称"虚数"沿用至今。这门课讲它的平反史：它如何被三次方程<strong>逼</strong>进数学（不是请进来的），如何在复平面上获得肉身，以及一件教科书很少直说的怪事——把实分析搬到复数上，非但没有变难，反而处处出现<strong>实函数享受不到的奇迹</strong>：可导一次就无穷可导、函数值由边界全息决定、算不动的实积分数几个点就出答案。',
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
        text: '工程师邦贝利硬着头皮给 √−1 立了运算规则，让它在计算中途出现又消掉，最后吐出正确的实根。',
      },
      {
        era: '1748 年',
        title: '欧拉的恒等式',
        text: 'e^{iθ} = cos θ + i sin θ——指数、三角、虚数在一行里合流。欧拉用 i 大杀四方，但仍称其为"不可能的数"。',
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
    title: '数学物理方程',
    subtitle: '弦振动、热传导、引力场：三大方程的物理起源',
    available: false,
  },
]

const numerals = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十']

export function courseByPath(path) {
  return courses.find((c) => c.path === path)
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
