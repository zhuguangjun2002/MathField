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

export const courses = [
  {
    slug: 'calculus',
    path: '/calculus',
    title: '微积分',
    subtitle: '从芝诺悖论到 ε-δ：驯服无穷的两千年',
    available: true,
    concepts: calculusConcepts,
  },
  {
    slug: 'linear-algebra',
    title: '线性代数',
    subtitle: '从解方程组到向量空间：抽象是怎么长出来的',
    available: false,
  },
  {
    slug: 'probability',
    title: '概率论',
    subtitle: '从赌桌纠纷到测度论：给"运气"建立数学',
    available: false,
  },
  {
    slug: 'complex',
    title: '复变函数',
    subtitle: '从"不可能的数"到最优雅的分析学',
    available: false,
  },
  {
    slug: 'mathphys',
    title: '数学物理方程',
    subtitle: '弦振动、热传导、引力场：三大方程的物理起源',
    available: false,
  },
]

export function conceptNeighbors(slug) {
  const i = calculusConcepts.findIndex((c) => c.slug === slug)
  return {
    prev: i > 0 ? calculusConcepts[i - 1] : null,
    next: i >= 0 && i < calculusConcepts.length - 1 ? calculusConcepts[i + 1] : null,
  }
}
