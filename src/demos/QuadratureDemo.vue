<script setup>
import { ref, computed } from 'vue'
import { usePlot, makeView, drawAxes, plotFn, drawLabel, C, fmt } from './plot.js'
import DemoFrame from '../components/DemoFrame.vue'
import ControlSlider from '../components/ControlSlider.vue'
import MathInline from '../components/MathInline.vue'

// 被积函数 f(x)=e^{−x²}（没有初等原函数！正态分布表就靠数值积分算），区间 [−2,2]。
const f = (x) => Math.exp(-x * x)
const A = -2
const B = 2

const N = ref(8) // 子区间个数（保持偶数，辛普森需要）
const method = ref('mid') // mid 中点矩形 | trap 梯形 | simp 辛普森

// 高精度参考值（细网格辛普森）
const REF = (() => {
  const m = 2000
  const h = (B - A) / m
  let s = f(A) + f(B)
  for (let i = 1; i < m; i++) s += (i % 2 ? 4 : 2) * f(A + i * h)
  return (s * h) / 3
})()

const approx = computed(() => {
  const n = N.value
  const h = (B - A) / n
  let s = 0
  if (method.value === 'mid') {
    for (let i = 0; i < n; i++) s += f(A + (i + 0.5) * h)
    return s * h
  } else if (method.value === 'trap') {
    s = 0.5 * (f(A) + f(B))
    for (let i = 1; i < n; i++) s += f(A + i * h)
    return s * h
  } else {
    s = f(A) + f(B)
    for (let i = 1; i < n; i++) s += (i % 2 ? 4 : 2) * f(A + i * h)
    return (s * h) / 3
  }
})
const err = computed(() => Math.abs(approx.value - REF))

const canvas = ref(null)
usePlot(
  canvas,
  (ctx, w, h) => {
    const v = makeView(w, h, -2.15, 2.15, -0.08, 1.12)
    drawAxes(ctx, v, { xTicks: [-2, -1, 0, 1, 2], yTicks: [0.5, 1], xLabel: 'x', yLabel: 'e^(−x²)' })

    const n = N.value
    const step = (B - A) / n
    ctx.save()
    ctx.fillStyle = C.accentSoft
    ctx.strokeStyle = C.accent
    ctx.lineWidth = 1.3

    if (method.value === 'mid') {
      for (let i = 0; i < n; i++) {
        const xl = A + i * step
        const mid = xl + step / 2
        const yy = f(mid)
        ctx.beginPath()
        ctx.rect(v.X(xl), v.Y(yy), v.X(xl + step) - v.X(xl), v.Y(0) - v.Y(yy))
        ctx.fill()
        ctx.stroke()
      }
    } else if (method.value === 'trap') {
      for (let i = 0; i < n; i++) {
        const xl = A + i * step
        const xr = xl + step
        ctx.beginPath()
        ctx.moveTo(v.X(xl), v.Y(0))
        ctx.lineTo(v.X(xl), v.Y(f(xl)))
        ctx.lineTo(v.X(xr), v.Y(f(xr)))
        ctx.lineTo(v.X(xr), v.Y(0))
        ctx.closePath()
        ctx.fill()
        ctx.stroke()
      }
    } else {
      // 辛普森：每两个子区间用一段抛物线
      for (let k = 0; k < n; k += 2) {
        const x0 = A + k * step
        const x2 = x0 + 2 * step
        ctx.beginPath()
        ctx.moveTo(v.X(x0), v.Y(0))
        for (let t = 0; t <= 24; t++) {
          const x = x0 + (t / 24) * (x2 - x0)
          // 过 x0,x1,x2 三点的抛物线（拉格朗日）
          const x1 = x0 + step
          const L0 = ((x - x1) * (x - x2)) / ((x0 - x1) * (x0 - x2))
          const L1 = ((x - x0) * (x - x2)) / ((x1 - x0) * (x1 - x2))
          const L2 = ((x - x0) * (x - x1)) / ((x2 - x0) * (x2 - x1))
          const y = f(x0) * L0 + f(x1) * L1 + f(x2) * L2
          ctx.lineTo(v.X(x), v.Y(y))
        }
        ctx.lineTo(v.X(x2), v.Y(0))
        ctx.closePath()
        ctx.fill()
        ctx.stroke()
      }
    }
    ctx.restore()

    // 真曲线
    plotFn(ctx, v, f, { color: C.ink, width: 2.4 })
    drawLabel(ctx, v.pad.l + 10, v.pad.t + 16, '色块：近似用的形状　黑线：真函数', { color: C.soft, size: 12 })
  },
  { height: 340, watchSources: [N, method] },
)

const methodName = computed(() =>
  ({ mid: '中点矩形', trap: '梯形', simp: '辛普森（抛物线）' }[method.value]),
)
</script>

<template>
  <DemoFrame title="用有限个形状去逼近曲边面积：形状越聪明，收敛越快">
    <canvas ref="canvas" class="demo-canvas"></canvas>
    <template #controls>
      <ControlSlider label="子区间个数 N" v-model="N" :min="2" :max="40" :step="2" />
      <label class="ctrl">
        <span class="ctrl-label">用什么形状去凑</span>
        <select v-model="method" class="ctrl-select">
          <option value="mid">中点矩形（顶是平的）</option>
          <option value="trap">梯形（顶是斜直线）</option>
          <option value="simp">辛普森（顶是抛物线）</option>
        </select>
      </label>
    </template>
    <template #readout>
      {{ methodName }}用 {{ N }} 块得 <b>{{ approx.toPrecision(9) }}</b>，
      真值 <b>{{ REF.toPrecision(9) }}</b>，误差
      <b :style="{ color: err < 1e-6 ? '#2f7d4f' : '#b23a2f' }">{{ err < 1e-14 ? '≈ 0' : err.toExponential(2) }}</b>
    </template>
    <template #note>
      <b><MathInline tex="\int e^{-x^2}\,\mathrm{d}x" /> 没有初等原函数</b>——微积分基本定理在这里失灵，牛顿-莱布尼茨那套"找原函数再代端点"彻底用不上。
      可正态分布表、误差函数 erf 里的每个数都实实在在存在，它们全是这么<b>数出来</b>的：回到积分最原始的含义——面积，
      用一堆算得出的简单形状去填。中点矩形顶是平的，误差随步长 <b>h²</b> 缩小（N 翻倍误差降到 1/4）；
      梯形顶改成斜线，同样 h² 但更贴；辛普森最妙——顶换成<b>抛物线</b>，三个点却能精确到三次多项式，
      误差骤降到 <b>h⁴</b>（N 翻倍误差降到 1/16！）。你亲手拖 N 对比三种方法的误差数量级：
      同样 8 块，辛普森往往比矩形准上千倍。<b>这就是"求积公式"的全部智慧：不是分得更细，而是每一块凑得更聪明。</b>
    </template>
  </DemoFrame>
</template>
