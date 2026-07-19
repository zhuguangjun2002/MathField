<script setup>
import { ref, computed } from 'vue'
import { usePlot, makeSquareView, drawPoint, drawLabel, C, fmt } from './plot.js'
import DemoFrame from '../components/DemoFrame.vue'
import ControlSlider from '../components/ControlSlider.vue'

// 解两条直线的交点 = 解一个 2×2 线性方程组。
// L1: y = m1 x        （固定）
// L2: y = m2 x + b2   （m2 = m1 − d，d 越小两线越平行；b2 = δ 是给数据的微小扰动）
const m1 = 0.6
const d = ref(0.6) // 两线斜率差（分离度）：小 = 近乎平行 = 病态
const delta = ref(0) // 对 L2 的扰动（相当于系数/右端只动一点点）

const m2 = computed(() => m1 - d.value)

// 交点：m1 x = m2 x + b2 → x = b2 / (m1 − m2) = b2 / d
const intersect = (b2) => {
  const x = b2 / d.value
  return { x, y: m1 * x }
}
const p0 = computed(() => intersect(0)) // 名义交点（原点）
const pPerturbed = computed(() => intersect(delta.value)) // 扰动后交点

// 2×2 系数矩阵 A = [[m1,−1],[m2,−1]] 的条件数 κ₂ = σmax/σmin
const kappa = computed(() => {
  const a = m1,
    b = -1,
    c = m2.value,
    dd = -1
  // AᵀA = [[a²+c², ab+cd],[ab+cd, b²+d²]]
  const p = a * a + c * c
  const q = a * b + c * dd
  const r = b * b + dd * dd
  const tr = p + r
  const det = p * r - q * q
  const disc = Math.sqrt(Math.max(0, (tr * tr) / 4 - det))
  const l1 = tr / 2 + disc
  const l2 = tr / 2 - disc
  return Math.sqrt(l1 / Math.max(l2, 1e-30))
})

const moved = computed(() => Math.hypot(pPerturbed.value.x - p0.value.x, pPerturbed.value.y - p0.value.y))

const canvas = ref(null)
usePlot(
  canvas,
  (ctx, w, h) => {
    const v = makeSquareView(w, h, 4)

    // 网格 + 轴
    ctx.save()
    ctx.strokeStyle = C.grid
    ctx.lineWidth = 1
    for (let i = Math.ceil(v.x0); i <= v.x1; i++) {
      ctx.beginPath()
      ctx.moveTo(v.X(i), v.pad.t)
      ctx.lineTo(v.X(i), v.pad.t + v.ih)
      ctx.stroke()
    }
    for (let j = Math.ceil(v.y0); j <= v.y1; j++) {
      ctx.beginPath()
      ctx.moveTo(v.pad.l, v.Y(j))
      ctx.lineTo(v.pad.l + v.iw, v.Y(j))
      ctx.stroke()
    }
    ctx.strokeStyle = '#b9b3a6'
    ctx.beginPath()
    ctx.moveTo(v.pad.l, v.Y(0))
    ctx.lineTo(v.pad.l + v.iw, v.Y(0))
    ctx.moveTo(v.X(0), v.pad.t)
    ctx.lineTo(v.X(0), v.pad.t + v.ih)
    ctx.stroke()
    ctx.restore()

    const line = (slope, b, color, width, dash = []) => {
      ctx.save()
      ctx.strokeStyle = color
      ctx.lineWidth = width
      ctx.setLineDash(dash)
      ctx.beginPath()
      ctx.moveTo(v.X(v.x0), v.Y(slope * v.x0 + b))
      ctx.lineTo(v.X(v.x1), v.Y(slope * v.x1 + b))
      ctx.stroke()
      ctx.restore()
    }

    line(m1, 0, C.ink, 2.2) // L1
    line(m2.value, 0, 'rgba(139,132,148,0.75)', 1.8, [6, 4]) // L2 名义
    if (delta.value !== 0) line(m2.value, delta.value, C.accent, 2.2) // L2 扰动后

    // 名义交点（绿）与扰动后交点（红）
    drawPoint(ctx, v, p0.value.x, p0.value.y, { color: C.green, r: 5.5 })
    if (delta.value !== 0) {
      const inView =
        pPerturbed.value.x >= v.x0 && pPerturbed.value.x <= v.x1 && pPerturbed.value.y >= v.y0 && pPerturbed.value.y <= v.y1
      if (inView) {
        drawPoint(ctx, v, pPerturbed.value.x, pPerturbed.value.y, { color: C.accent, r: 5.5 })
      } else {
        drawLabel(ctx, v.pad.l + 12, v.pad.t + v.ih - 14, '⚠ 扰动后的交点已飞出画面！', { color: C.accent, size: 13 })
      }
    }
    drawLabel(ctx, v.pad.l + 12, v.pad.t + 18, d.value < 0.15 ? '两线近乎平行 → 病态' : '两线夹角明显 → 良态', {
      color: d.value < 0.15 ? C.accent : C.green,
      size: 13,
    })
  },
  { height: 380, watchSources: [d, delta] },
)
</script>

<template>
  <DemoFrame title="条件数：同样的扰动，为什么有的方程组稳如磐石，有的一碰就飞">
    <canvas ref="canvas" class="demo-canvas"></canvas>
    <template #controls>
      <ControlSlider
        label="两条线的分离度 d（小 = 近乎平行）"
        v-model="d"
        :min="0.03"
        :max="1.4"
        :step="0.01"
        :display="(v) => fmt(v, 2)"
      />
      <ControlSlider
        label="给第二条线一个微小扰动 δ"
        v-model="delta"
        :min="-0.2"
        :max="0.2"
        :step="0.01"
        :display="(v) => fmt(v, 2)"
      />
    </template>
    <template #readout>
      条件数 κ(A) ≈ <b :style="{ color: kappa > 20 ? '#b23a2f' : '#2f7d4f' }">{{ kappa < 100 ? fmt(kappa, 1) : Math.round(kappa) }}</b>
      　|　扰动 δ = {{ fmt(delta, 2) }} 让交点移动了 <b>{{ moved < 100 ? fmt(moved, 2) : moved.toExponential(1) }}</b>
      （δ 放大了约 <b>{{ delta === 0 ? '—' : fmt(moved / Math.abs(delta), 0) }}</b> 倍）
    </template>
    <template #note>
      解 2×2 方程组，就是求两条直线的交点。先把分离度 d 拖大（两线交角明显），
      再拖动扰动 δ 给第二条线挪一点点——绿点（真解）和红点（扰动后的解）几乎黏在一起，<b>稳</b>。
      现在把 d 拖到很小，让两条线<b>近乎平行</b>：同样大小的 δ，红点却猛地窜出老远，甚至飞出画面。
      方程组没变难解，输入也只动了千分之几，答案却面目全非——<b>病根在问题本身，不在算法</b>。
      右上角的 <b>条件数 κ</b> 就是这个"敏感度"的度量（图灵 1948 年提出）：它近似告诉你<b>输入的相对误差会被放大多少倍</b>。
      良态时 κ 是几，病态时 κ 冲到成百上千。这解释了第一讲那个悬案的下半场——
      舍入误差本身只有 10⁻¹⁶ 那么小，可一旦喂给病态问题，被 κ 一乘，就能污染最终答案的前几位。
      <b>κ 是舍入误差的放大器</b>，数值分析的首尾在这里接上了。
    </template>
  </DemoFrame>
</template>
