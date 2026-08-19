<script setup>
import { ref, computed } from 'vue'
import { usePlot, makeView, drawAxes, plotFn, drawPoint, drawLabel, C, fmt } from './plot.js'
import DemoFrame from '../components/DemoFrame.vue'
import ControlSlider from '../components/ControlSlider.vue'
import MathInline from '../components/MathInline.vue'

const FUNCS = {
  cubic: {
    label: 'f(x) = x³/3 − x  （光滑，常常有两条平行切线）',
    f: (x) => (x * x * x) / 3 - x,
    fp: (x) => x * x - 1,
    smooth: true,
    xMin: -2.4,
    xMax: 2.4,
    yMin: -2.2,
    yMax: 2.2,
    a: -1.8,
    b: 1.2,
  },
  sine: {
    label: 'f(x) = sin x  （周期函数，区间一长 c 就成串）',
    f: (x) => Math.sin(x),
    fp: (x) => Math.cos(x),
    smooth: true,
    xMin: -1,
    xMax: 8,
    yMin: -1.6,
    yMax: 1.6,
    a: 0.4,
    b: 5.2,
  },
  kink: {
    label: 'f(x) = |x| − 0.5  （在 0 处有尖点：反例档）',
    f: (x) => Math.abs(x) - 0.5,
    fp: (x) => (x < 0 ? -1 : 1),
    smooth: false,
    xMin: -2.2,
    xMax: 2.2,
    yMin: -1.2,
    yMax: 2.2,
    a: -1.5,
    b: 1.5,
  },
  cusp: {
    label: 'f(x) = ∛(x²)  （0 处是个尖峰：另一种反例）',
    f: (x) => Math.cbrt(x * x),
    fp: (x) => (Math.abs(x) < 1e-12 ? Infinity : 2 / (3 * Math.cbrt(x))),
    smooth: false,
    xMin: -2.2,
    xMax: 2.2,
    yMin: -0.6,
    yMax: 2.0,
    a: -1.0,
    b: 1.0,
  },
}

const fKey = ref('cubic')
const a = ref(-1.8)
const b = ref(1.2)

// ―― 挑战模式：五道"先猜有几个 c"的预判题 ――
// 三个固定选项：0 = 一个都没有；1 = 恰好一个；2 = 两个或更多。
// 每题的 c 个数都用本文件下面那套 cs() 算法（1600 点扫变号 + 二分 + 1e-6 复核）
// 在 node 里逐题跑过一遍，轨迹见 #note 的分题列表。
const CHALLENGE = [
  // 割线斜率 −0.2652；cos x = −0.2652 在 (0.4, 5.2) 里有两解
  { fKey: 'sine', a: 0.4, b: 5.2, ans: 2, why: '割线斜率 −0.265，cos x 取到它两次：1.839 与 4.444。' },
  // 两端不等高，斜率 0.5，可 f′ 只有 ±1 两个值
  { fKey: 'kink', a: -0.5, b: 1.5, ans: 0, why: 'f′ 只取 ±1，永远等不到 0.5；0 处是尖点，没有切线。' },
  // x² − 1 = 0.0533 的两根是 ±1.0263，可 +1.0263 落在 b = 0.6 右边
  { fKey: 'cubic', a: -2.0, b: 0.6, ans: 1, why: 'x²−1=0.0533 有两根 ±1.026，可 +1.026 在 b=0.6 之外。' },
  // f′ = 2/(3∛x) = 0.1958 解出 c = 39.5，远在区间之外
  { fKey: 'cusp', a: -1.0, b: 2.0, ans: 0, why: 'f′=0.1958 解得 c=39.5，远在区间外；0 处又是尖峰。' },
  // 区间整段避开了 0，尖峰根本不在里面，定理照常成立
  { fKey: 'cusp', a: 0.3, b: 2.0, ans: 1, why: '区间避开了 0，这段上它光滑，定理照常成立：c=0.985。' },
]
const challenge = ref(false)
const round = ref(0)
const picked = ref(null) // 本题已选的答案（null = 未答）
const score = ref(0)
// 未答题时不许把 c 画出来、也不许在读数区报个数——那本来就是答案
const revealed = computed(() => !challenge.value || picked.value !== null)

function loadRound() {
  const r = CHALLENGE[round.value]
  fKey.value = r.fKey
  a.value = r.a
  b.value = r.b
}

function startChallenge() {
  challenge.value = true
  round.value = 0
  picked.value = null
  score.value = 0
  loadRound()
}

function quitChallenge() {
  challenge.value = false
  picked.value = null
}

function answer(n) {
  if (picked.value !== null) return
  picked.value = n
  if (n === CHALLENGE[round.value].ans) score.value += 1
}

function nextRound() {
  if (round.value < CHALLENGE.length - 1) {
    round.value += 1
    picked.value = null
    loadRound()
  }
}

const F = computed(() => FUNCS[fKey.value])

function onFuncChange() {
  a.value = F.value.a
  b.value = F.value.b
}

const slope = computed(() => {
  const p = F.value
  if (b.value - a.value < 1e-9) return NaN
  return (p.f(b.value) - p.f(a.value)) / (b.value - a.value)
})

// 扫描 f′(x) − 割线斜率 的变号点，再二分定位；最后逐个复核 |f′(c) − 斜率| 是否真的很小
// （尖点处 f′ 会从 −1 直接跳到 +1，扫描能看到"变号"，但那里并没有 c，这一步把它挡掉）
const cs = computed(() => {
  const p = F.value
  const m = slope.value
  if (!Number.isFinite(m)) return []
  const N = 1600
  const out = []
  const g = (x) => p.fp(x) - m
  let prev = g(a.value)
  for (let i = 1; i <= N; i++) {
    const x1 = a.value + ((b.value - a.value) * (i - 1)) / N
    const x2 = a.value + ((b.value - a.value) * i) / N
    const cur = g(x2)
    if (Number.isFinite(prev) && Number.isFinite(cur) && prev === 0) out.push(x1)
    if (Number.isFinite(prev) && Number.isFinite(cur) && prev * cur < 0) {
      let lo = x1
      let hi = x2
      for (let k = 0; k < 60; k++) {
        const mid = (lo + hi) / 2
        if (g(lo) * g(mid) <= 0) hi = mid
        else lo = mid
      }
      const c = (lo + hi) / 2
      if (Math.abs(p.fp(c) - m) < 1e-6) out.push(c)
    }
    prev = cur
  }
  return out.filter((c) => c > a.value + 1e-9 && c < b.value - 1e-9).slice(0, 4)
})

// 避免读数区出现"−0.0000"这种残渣（奇函数对称区间上斜率是 1e-17 量级的负数）
const show = (x, d = 4) => (Math.abs(x) < 0.5 * Math.pow(10, -d) ? (0).toFixed(d) : x.toFixed(d))

const canvas = ref(null)
usePlot(
  canvas,
  (ctx, w, hh) => {
    const p = F.value
    const v = makeView(w, hh, p.xMin, p.xMax, p.yMin, p.yMax)
    drawAxes(ctx, v, {
      xTicks: [-2, -1, 0, 1, 2, 3, 4, 5, 6, 7].filter((t) => t > p.xMin && t < p.xMax),
      yTicks: [-1, 1],
      xLabel: 'x',
      yLabel: 'f(x)',
    })

    const A = a.value
    const B = b.value
    const m = slope.value

    // 区间 [a, b] 底色
    ctx.save()
    ctx.fillStyle = 'rgba(176, 125, 43, 0.10)'
    ctx.fillRect(v.X(A), v.pad.t, v.X(B) - v.X(A), v.ih)
    ctx.restore()

    // 平行切线（先画，压在曲线下面）——挑战未答时它就是答案，不画
    for (const c of revealed.value ? cs.value : []) {
      plotFn(ctx, v, (x) => p.f(c) + m * (x - c), { color: C.green, width: 1.8, dash: [7, 5] })
    }

    // 割线
    plotFn(ctx, v, (x) => p.f(A) + m * (x - A), { color: C.accent, width: 2.2 })
    // 曲线
    plotFn(ctx, v, p.f, { color: C.ink, width: 2.6 })

    drawPoint(ctx, v, A, p.f(A), { color: C.accent })
    drawPoint(ctx, v, B, p.f(B), { color: C.accent })
    drawLabel(ctx, v.X(A), v.Y(p.f(A)) - 12, `a=${fmt(A, 2)}`, { color: C.accent, align: 'center' })
    drawLabel(ctx, v.X(B), v.Y(p.f(B)) - 12, `b=${fmt(B, 2)}`, { color: C.accent, align: 'center' })

    for (const c of revealed.value ? cs.value : []) {
      drawPoint(ctx, v, c, p.f(c), { color: C.green })
      drawLabel(ctx, v.X(c), v.Y(p.f(c)) + 20, `c=${fmt(c, 2)}`, { color: C.green, align: 'center' })
    }

    drawLabel(ctx, v.pad.l + 10, v.pad.t + 20, '— 割线（两端连线）', { color: C.accent, size: 12 })
    drawLabel(ctx, v.pad.l + 10, v.pad.t + 38, '- - 与它平行的切线', { color: C.green, size: 12 })
    if (!revealed.value) {
      drawLabel(ctx, v.pad.l + 10, v.pad.t + 60, '先猜：这段区间上有几个 c？', { color: C.indigo, size: 13 })
    } else if (cs.value.length === 0) {
      drawLabel(ctx, v.pad.l + 10, v.pad.t + 60, '这个区间上一条也找不到', { color: C.accent, size: 13 })
    }
  },
  { height: 380, watchSources: [fKey, a, b, challenge, picked] },
)
</script>

<template>
  <DemoFrame title="中值定理：割线一定平行于某条切线">
    <canvas ref="canvas" class="demo-canvas"></canvas>
    <template #controls>
      <label class="ctrl">
        <span class="ctrl-label">函数</span>
        <select v-model="fKey" class="ctrl-select" :disabled="challenge" @change="onFuncChange">
          <option v-for="(f, k) in FUNCS" :key="k" :value="k">{{ f.label }}</option>
        </select>
      </label>
      <ControlSlider
        label="左端点 a"
        v-model="a"
        :min="F.xMin + 0.1"
        :max="F.xMax - 0.3"
        :step="0.05"
        :display="(x) => x.toFixed(2)"
        :disabled="challenge"
      />
      <ControlSlider
        label="右端点 b"
        v-model="b"
        :min="F.xMin + 0.3"
        :max="F.xMax - 0.1"
        :step="0.05"
        :display="(x) => x.toFixed(2)"
        :disabled="challenge"
      />
      <div class="ctrl">
        <button v-if="!challenge" class="challenge-btn" type="button" @click="startChallenge">
          ⚔️ 开始挑战（5 题）
        </button>
        <template v-else>
          <template v-if="picked === null">
            <button class="challenge-btn" type="button" @click="answer(0)">甲 · 一个都没有</button>
            <button class="challenge-btn" type="button" @click="answer(1)">乙 · 恰好一个</button>
            <button class="challenge-btn" type="button" @click="answer(2)">丙 · 两个或更多</button>
          </template>
          <button
            v-else-if="round < CHALLENGE.length - 1"
            class="challenge-btn is-on"
            type="button"
            @click="nextRound"
          >
            下一题 →
          </button>
          <button class="challenge-btn" type="button" @click="quitChallenge">退出挑战</button>
        </template>
      </div>
    </template>
    <template #readout>
      <template v-if="challenge">
        <span class="challenge-badge">第 {{ round + 1 }}/5 题 · 已对 {{ score }}</span><br />
        <template v-if="picked === null">
          割线斜率 <b>{{ show(slope) }}</b> · 这段区间上有几个 c？（图上暂不画出）
        </template>
        <template v-else-if="picked === CHALLENGE[round].ans">
          ✅ 对！有 <b>{{ cs.length }}</b> 个。{{ CHALLENGE[round].why }}
        </template>
        <template v-else>
          ❌ 实际有 <b>{{ cs.length }}</b> 个。{{ CHALLENGE[round].why }}
        </template>
      </template>
      <template v-else-if="b - a < 0.15"> 区间太窄（b 必须明显大于 a），把两个端点拉开一点 </template>
      <template v-else>
        割线斜率 <MathInline tex="\frac{f(b)-f(a)}{b-a}" /> = <b>{{ show(slope) }}</b> ·
        找到 <b>{{ cs.length }}</b> 个 c<br />
        <template v-if="cs.length">
          <span v-for="(c, i) in cs" :key="i">
            c<sub>{{ i + 1 }}</sub> = <b>{{ c.toFixed(4) }}</b
            >（f′ = {{ show(F.fp(c)) }}）<template v-if="i < cs.length - 1"> · </template>
          </span>
        </template>
        <template v-else> 一个都没有 —— 定理的"处处可导"这个前提在本区间上不成立 </template>
      </template>
    </template>
    <template #note>
      <p><b>三个旋钮分别是什么</b></p>
      <ul>
        <li>
          <b>函数</b>（下拉）：前两条<strong>处处可导</strong>，后两条各有一个"坏点"——
          <MathInline tex="|x|-0.5" /> 在 0 处是<strong>尖点</strong>（左右斜率 −1 和 +1 对不上），
          <MathInline tex="\sqrt[3]{x^2}" /> 在 0 处是<strong>尖峰</strong>
          （两侧切线都竖起来，斜率一个 −∞ 一个 +∞）。两者都在 0 处不可导，是拿来打破定理的。
        </li>
        <li><b>左端点 a</b> / <b>右端点 b</b>：考察区间的两头。割线就是连接这两点的那条红线。</li>
      </ul>
      <p>
        <b>画面在说什么</b>：黑色是函数曲线，红色是<strong>割线</strong>（两端点连线，
        它的斜率就是这段区间上的"平均变化率"），绿色虚线是<strong>与割线平行的切线</strong>，
        绿点标出切点 c。定理断言：只要函数在区间上连续、内部处处可导，
        <strong>这样的 c 至少有一个</strong>——图上可能出现两条甚至更多。
      </p>
      <p>
        <b>照着做一遍（一）：验一次定理。</b>选第一个函数
        <MathInline tex="f(x)=x^3/3-x" />，把 a 拖到 <b>−1.80</b>、b 拖到 <b>1.20</b>。
        读数区给割线斜率 <b>−0.1600</b>，并找到<strong>两个</strong> c：
        <b>−0.9165</b> 与 <b>0.9165</b>，两处的 <MathInline tex="f'" /> 都精确等于 −0.16
        （因为 <MathInline tex="f'(x)=x^2-1=-0.16" /> 解出
        <MathInline tex="x=\pm\sqrt{0.84}=\pm 0.9165" />）。
        <strong>定理只保证"至少一个"，从不保证唯一。</strong>
      </p>
      <p>
        <b>照着做一遍（二）：把它变成罗尔定理。</b>保持同一个函数，
        把 a 拖到 <b>−1.00</b>、b 拖到 <b>2.00</b>。这两点<strong>一样高</strong>
        （都等于 <MathInline tex="2/3" />，不信看曲线），割线斜率于是变成 <b>0.0000</b>，
        平行切线就是<strong>水平</strong>切线：读数给出<strong>一个</strong> c = <b>1.0000</b>，
        正是这条曲线的极小点。
        <strong>罗尔定理就是中值定理"两端等高"的特例</strong>，它说的正是"山谷或山顶那里切线是平的"。
        <br />顺带留意一处细节：<MathInline tex="f'(x)=x^2-1" /> 的另一个根 <MathInline tex="x=-1" />
        <strong>恰好是左端点 a</strong>，而定理要的 c 必须落在<strong>开区间</strong>
        <MathInline tex="(a,b)" /> <em>内部</em>，所以它不算数，读数区也没把它列出来。
      </p>
      <p>
        <b>照着做一遍（三）：亲手打破它。</b>换到第三个函数
        <MathInline tex="|x|-0.5" />，a = <b>−1.50</b>、b = <b>1.50</b>。
        两端等高，割线斜率是 <b>0</b>——按罗尔定理，中间该有一处水平切线。
        可读数区说<strong>一个都没有</strong>：这条折线的斜率<strong>非 −1 即 +1，永远取不到 0</strong>，
        中间那个"该水平"的位置恰恰是尖点，那里根本没有切线。
        <strong>"处处可导"这个前提不是装饰品</strong>，去掉它结论立刻崩塌。
        第四个函数 <MathInline tex="\sqrt[3]{x^2}" /> 是另一种坏法：a = <b>−1.00</b>、b = <b>1.00</b>
        时两端同高（都是 1），割线斜率也是 <b>0</b>，可
        <MathInline tex="f'(x)=\frac{2}{3\sqrt[3]{x}}" /> <strong>永远不等于零</strong>
        （分子是常数 2），中间那个"该水平"的位置又正好是它的尖峰——<strong>同样一个 c 都没有</strong>。
        换个不对称的区间也一样：a = −1、b = 2 时斜率 0.1958，
        解出来的 <MathInline tex="c = (2/(3\times 0.1958))^3 = 39.5" /> <strong>远在区间之外</strong>。
      </p>
      <p>
        <b>挑战模式的规则。</b>点「开始挑战」后连出五道预判题（<b>题目写死在程序里，谁玩都是同样五道、
        同样顺序</b>）。每题<b>替你锁定函数与区间</b>——挑战期间函数下拉和两根端点滑杆
        <b>都是禁用的</b>；更要紧的是，<b>答题前图上不画绿色切线、不标 c，读数区也不报个数</b>，
        否则点开就是抄答案。你手里只有曲线、红色割线和它的斜率。答完立刻揭晓，图和读数一起回来对账。
        三个选项每题相同：<b>甲</b> 一个都没有、<b>乙</b> 恰好一个、<b>丙</b> 两个或更多。
      </p>
      <p>
        <b>五道题的门道</b>（想自己先玩就别往下看）：
      </p>
      <ul>
        <li>
          <b>① sin x，[0.4, 5.2]</b> → <b>两个</b>。割线斜率 −0.2652，而
          <MathInline tex="\cos x = -0.2652" /> 在这段里有两解（1.8392 与 4.4440）。
          <b>定理只保证"至少一个"，从不保证唯一</b>——这一题就是拿来打这个的。
        </li>
        <li>
          <b>② |x| − 0.5，[−0.5, 1.5]</b> → <b>一个都没有</b>。这题故意让两端<em>不</em>等高
          （斜率 0.5，不是 0），好挡住"哦这是罗尔那一档"的条件反射。可
          <MathInline tex="f'" /> 只有 −1 和 +1 两个值，<b>永远等不到 0.5</b>；
          中间那个"该斜 0.5"的位置正是 0 处的尖点，那里根本没有切线。
        </li>
        <li>
          <b>③ x³/3 − x，[−2.0, 0.6]</b> → <b>恰好一个</b>。这题最阴：函数光滑、
          方程 <MathInline tex="x^2-1=0.0533" /> 老老实实解出<b>两个</b>根 ±1.0263——
          可 <b>+1.0263 落在右端点 0.6 的外面</b>，不算数。
          <b>"方程有几个根"和"区间里有几个 c"是两件事。</b>
        </li>
        <li>
          <b>④ ∛(x²)，[−1.0, 2.0]</b> → <b>一个都没有</b>。斜率 0.1958，
          而 <MathInline tex="f'(x)=\frac{2}{3\sqrt[3]{x}}=0.1958" /> 解出 c = 39.5，
          <b>远在区间之外</b>；区间内唯一可疑的 0 处又是尖峰。<b>和 ③ 正好配成一对</b>：
          ③ 是两根出界一个，④ 是唯一的根整个出界。
        </li>
        <li>
          <b>⑤ ∛(x²)，[0.3, 2.0]</b> → <b>恰好一个</b>（c = 0.9845）。这题是全组的落点：
          同一个"反例函数"，只把区间挪得<b>整段避开 0</b>，尖峰就不在里面了，
          这段上它光滑得很，<b>定理照常成立</b>。
          <b>坏的从来不是函数，是函数与区间的搭配</b>——
          "不满足条件"和"结论不成立"是两回事，条件只是<em>充分</em>的。
        </li>
      </ul>
      <p>
        （<b>两个诚实的小注</b>：① 程序找 c 的办法是把
        <MathInline tex="f'(x)-\text{割线斜率}" /> 沿区间扫 1600 个点找变号，再二分定位到
        <MathInline tex="10^{-9}" /> 量级，最后<strong>复核</strong>
        <MathInline tex="|f'(c)-\text{斜率}|<10^{-6}" />——尖点处 <MathInline tex="f'" />
        从 −1 直接跳到 +1，扫描也会看到"变号"，是这一步复核把它挡掉的。
        ② 最多只显示 4 个 c：正弦那一档把区间拉长会有更多，读数区放不下。）
      </p>
    </template>
  </DemoFrame>
</template>
