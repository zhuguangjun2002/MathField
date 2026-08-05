<script setup>
import { ref, computed } from 'vue'
import { usePlot, makeView, drawAxes, plotFn, C } from './plot.js'
import DemoFrame from '../components/DemoFrame.vue'
import ControlSlider from '../components/ControlSlider.vue'
import MathInline from '../components/MathInline.vue'

const FNS = {
  parabola: {
    label: 'f(x) = x²，区间 [0, 2]',
    f: (x) => x * x,
    a: 0,
    b: 2,
    exact: 8 / 3,
    exactTex: '8/3 ≈ 2.6667',
    y1: 4.4,
  },
  sin: {
    label: 'f(x) = sin x，区间 [0, π]',
    f: Math.sin,
    a: 0,
    b: Math.PI,
    exact: 2,
    exactTex: '2',
    y1: 1.25,
  },
}

const canvas = ref(null)
const fnKey = ref('parabola')
const n = ref(8)
const method = ref('left')

const cfg = computed(() => FNS[fnKey.value])

const sum = computed(() => {
  const { f, a, b } = cfg.value
  const dx = (b - a) / n.value
  let total = 0
  for (let i = 0; i < n.value; i++) {
    const x =
      method.value === 'left'
        ? a + i * dx
        : method.value === 'right'
          ? a + (i + 1) * dx
          : a + (i + 0.5) * dx
    total += f(x) * dx
  }
  return total
})

usePlot(
  canvas,
  (ctx, w, h) => {
    const { f, a, b, y1 } = cfg.value
    const v = makeView(w, h, a - (b - a) * 0.06, b + (b - a) * 0.06, -y1 * 0.06, y1)
    drawAxes(ctx, v, { xTicks: [a, b], yTicks: [], xLabel: 'x', yLabel: 'f(x)' })

    // 矩形
    const dx = (b - a) / n.value
    ctx.fillStyle = C.greenSoft
    ctx.strokeStyle = C.green
    ctx.lineWidth = 1
    for (let i = 0; i < n.value; i++) {
      const xL = a + i * dx
      const xs =
        method.value === 'left' ? xL : method.value === 'right' ? xL + dx : xL + dx / 2
      const y = f(xs)
      const px = v.X(xL)
      const pw = v.X(xL + dx) - px
      const py = v.Y(Math.max(y, 0))
      const ph = Math.abs(v.Y(0) - v.Y(y))
      ctx.fillRect(px, py, pw, ph)
      ctx.strokeRect(px, py, pw, ph)
    }

    plotFn(ctx, v, f, { color: C.ink, width: 2.6 })
  },
  { height: 340, watchSources: [n, method, fnKey] },
)
</script>

<template>
  <DemoFrame title="黎曼和：用矩形围剿曲边面积">
    <canvas ref="canvas" class="demo-canvas"></canvas>
    <template #controls>
      <label class="ctrl">
        <span class="ctrl-label">函数</span>
        <select v-model="fnKey" class="ctrl-select">
          <option v-for="(c, k) in FNS" :key="k" :value="k">{{ c.label }}</option>
        </select>
      </label>
      <label class="ctrl">
        <span class="ctrl-label">取样点（矩形的高取在哪）</span>
        <select v-model="method" class="ctrl-select">
          <option value="left">左端点</option>
          <option value="mid">中点</option>
          <option value="right">右端点</option>
        </select>
      </label>
      <ControlSlider label="矩形个数 n（区间等分数）" v-model="n" :min="1" :max="150" :step="1" />
    </template>
    <template #readout>
      {{ n }} 个矩形的面积和 = <b>{{ sum.toFixed(5) }}</b>
      &nbsp;&nbsp;真实面积 = <b>{{ cfg.exactTex }}</b>
      &nbsp;&nbsp;误差 = {{ Math.abs(sum - cfg.exact).toExponential(2) }}
    </template>
    <template #note>
      <p><b>三个旋钮分别是什么</b></p>
      <ul>
        <li>
          <b>函数</b>（下拉）：切哪条曲线。<strong>区间是随函数一起定死的</strong>——
          <MathInline tex="x^2" /> 配 <MathInline tex="[0,2]" />，
          <MathInline tex="\sin x" /> 配 <MathInline tex="[0,\pi]" />，没有单独的区间旋钮。
        </li>
        <li>
          <b>取样点</b>（下拉）：每个细条的矩形，<strong>高度取在条内的哪个位置</strong>——
          左端、中点还是右端。这是定义里那个"任取一点 <MathInline tex="\xi_i" />"的三种具体选法。
        </li>
        <li>
          <b>矩形个数 n</b>：把区间<strong>等分</strong>成多少条，所以每条宽
          <MathInline tex="(b-a)/n" />。定义里说的"最宽一段趋于 0"，在等分的情形就是 n 趋于无穷。
        </li>
      </ul>
      <p>
        <b>读数区的"真实面积"从哪来</b>：不是算出来的，是<strong>事先手算好写死在代码里的定值</strong>
        （<MathInline tex="\int_0^2 x^2 dx = 8/3" />、<MathInline tex="\int_0^\pi \sin x\,dx = 2" />，
        两条都能用<router-link to="/calculus/ftc">下一讲</router-link>的公式两秒算出）。
        它在这里只当标尺用，好让你看清误差怎么随 n 缩小。
      </p>
      <p>
        <b>照着做一遍</b>：选 <MathInline tex="x^2" />，把 n 固定在 8，然后在三种取样点之间来回切——
        左端点给 <b>2.18750</b>、中点给 <b>2.65625</b>、右端点给 <b>3.18750</b>，
        彼此差着十几个百分点。再把 n 拖到 150：三个数变成 <b>2.64006</b>、<b>2.66664</b>、
        <b>2.69339</b>，全都挤向 8/3。<strong>这就是"所有取法共同的极限"，也就是定积分的定义。</strong>
      </p>
      <p>
        <b>两处值得多看一眼</b>：① 这条曲线单调上升，所以左端点<strong>必定偏小</strong>、
        右端点<strong>必定偏大</strong>（矩形分别整个缩在曲线下方、探出曲线上方）——
        但这是这条曲线的性质，换成先升后降的 <MathInline tex="\sin x" /> 就不成立了：
        那时左和与右和因为对称<strong>恒等</strong>（n = 8 时都是 1.97423）。
        ② 中点法始终准得多，n = 150 时它的误差只有左右端点的千分之一——
        它多出来的那点精度不是运气，而是<router-link to="/numerical/quadrature">数值积分</router-link>
        整门学问的起点。
      </p>
    </template>
  </DemoFrame>
</template>
