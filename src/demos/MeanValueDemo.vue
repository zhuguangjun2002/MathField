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

    // 平行切线（先画，压在曲线下面）
    for (const c of cs.value) {
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

    for (const c of cs.value) {
      drawPoint(ctx, v, c, p.f(c), { color: C.green })
      drawLabel(ctx, v.X(c), v.Y(p.f(c)) + 20, `c=${fmt(c, 2)}`, { color: C.green, align: 'center' })
    }

    drawLabel(ctx, v.pad.l + 10, v.pad.t + 20, '— 割线（两端连线）', { color: C.accent, size: 12 })
    drawLabel(ctx, v.pad.l + 10, v.pad.t + 38, '- - 与它平行的切线', { color: C.green, size: 12 })
    if (cs.value.length === 0) {
      drawLabel(ctx, v.pad.l + 10, v.pad.t + 60, '这个区间上一条也找不到', { color: C.accent, size: 13 })
    }
  },
  { height: 380, watchSources: [fKey, a, b] },
)
</script>

<template>
  <DemoFrame title="中值定理：割线一定平行于某条切线">
    <canvas ref="canvas" class="demo-canvas"></canvas>
    <template #controls>
      <label class="ctrl">
        <span class="ctrl-label">函数</span>
        <select v-model="fKey" class="ctrl-select" @change="onFuncChange">
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
      />
      <ControlSlider
        label="右端点 b"
        v-model="b"
        :min="F.xMin + 0.3"
        :max="F.xMax - 0.1"
        :step="0.05"
        :display="(x) => x.toFixed(2)"
      />
    </template>
    <template #readout>
      <template v-if="b - a < 0.15"> 区间太窄（b 必须明显大于 a），把两个端点拉开一点 </template>
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
