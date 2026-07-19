<script setup>
import { ref, computed } from 'vue'
import { usePlot, makeView, drawAxes, plotFn, drawLabel, C, fmt, rng } from './plot.js'
import DemoFrame from '../components/DemoFrame.vue'
import ControlSlider from '../components/ControlSlider.vue'

// 目标分布：截断在 [0,4] 的指数分布（刻意选个不对称的，别让"钟形"抢戏）
const Z = 1 - Math.exp(-4)
const pdf = (x) => (x >= 0 && x <= 4 ? Math.exp(-x) / Z : 0)
const cdf = (x) => (x <= 0 ? 0 : x >= 4 ? 1 : (1 - Math.exp(-x)) / Z)

// 固定一批样本（可复现），比如 4000 次"等公交的耗时"观测
const N = 4000
const samples = (() => {
  const r = rng(20260719)
  const arr = []
  for (let i = 0; i < N; i++) arr.push(-Math.log(1 - r() * Z))
  return arr
})()

const bins = ref(8)
const b = ref(1.5) // 区间右端：看 P(X ≤ b) = 面积

const hist = computed(() => {
  const k = bins.value
  const bw = 4 / k
  const counts = new Array(k).fill(0)
  for (const x of samples) counts[Math.min(k - 1, Math.floor(x / bw))]++
  // 归一化成密度：柱高 = 频数 / (N·组距)，保证柱面积之和恒等于 1
  return { bw, heights: counts.map((c) => c / (N * bw)) }
})

const freqLeB = computed(() => samples.filter((x) => x <= b.value).length / N)

const canvas = ref(null)
usePlot(
  canvas,
  (ctx, w, h) => {
    const v = makeView(w, h, -0.15, 4.15, -0.04, 1.12)
    drawAxes(ctx, v, { xTicks: [0, 1, 2, 3, 4], yTicks: [0.5, 1], xLabel: 'x', yLabel: '密度' })

    const { bw, heights } = hist.value
    for (let i = 0; i < heights.length; i++) {
      const x0 = i * bw
      const x1 = x0 + bw
      const inShade = x1 <= b.value
      const part = !inShade && x0 < b.value // 被 b 切在中间的柱
      const px = v.X(x0)
      const pw = v.X(x1) - px
      const py = v.Y(heights[i])
      const ph = v.Y(0) - py
      ctx.fillStyle = inShade ? C.greenSoft : 'rgba(178, 58, 47, 0.14)'
      ctx.fillRect(px, py, pw, ph)
      if (part) {
        ctx.fillStyle = C.greenSoft
        ctx.fillRect(px, py, v.X(b.value) - px, ph)
      }
      ctx.strokeStyle = inShade || part ? C.green : C.accent
      ctx.lineWidth = 1
      ctx.strokeRect(px, py, pw, ph)
    }

    plotFn(ctx, v, pdf, { color: C.indigo, width: 2.6 })

    // b 处的竖线
    ctx.save()
    ctx.strokeStyle = C.green
    ctx.lineWidth = 1.6
    ctx.setLineDash([5, 4])
    ctx.beginPath()
    ctx.moveTo(v.X(b.value), v.pad.t)
    ctx.lineTo(v.X(b.value), v.Y(0))
    ctx.stroke()
    ctx.restore()
    drawLabel(ctx, v.X(b.value) + 6, v.pad.t + 16, `b = ${fmt(b.value, 2)}`, { color: C.green })
    drawLabel(ctx, v.X(2.4), v.Y(pdf(2.4)) - 12, '真实密度 f(x)', { color: C.indigo })
  },
  { height: 340, watchSources: [bins, b] },
)
</script>

<template>
  <DemoFrame title="从直方图到密度曲线：概率住进面积里">
    <canvas ref="canvas" class="demo-canvas"></canvas>
    <template #controls>
      <ControlSlider label="直方图组数" v-model="bins" :min="4" :max="100" :step="1" />
      <ControlSlider label="区间右端 b" v-model="b" :min="0" :max="4" :step="0.05" />
    </template>
    <template #readout>
      绿色阴影面积（理论值）F(b) = <b>{{ fmt(cdf(b), 4) }}</b>
      &nbsp;&nbsp;样本中 X ≤ b 的频率 = <b>{{ fmt(freqLeB, 4) }}</b>
      &nbsp;&nbsp;全部柱子的面积之和恒为 <b>1</b>
    </template>
    <template #note>
      这是 4000 次观测（比如"等公交的耗时"）。柱子的<b>高度不是概率</b>——
      它是"频数 ÷ (总数 × 组距)"，为的是让<b>面积</b>等于频率。把组数从 4 拖到 100：
      柱子越来越细，轮廓越来越贴近蓝色的密度曲线 f(x)——直方图的极限就是密度。
      于是"X 落在某区间的概率"= 该区间下的<b>面积</b>（拖动 b 看绿色阴影与 F(b) 同步变化）。
      单点概率为 0 一点也不吓人：一条竖线段的面积本来就是 0。这正是积分讲"面积由累积函数掌管"的重演：
      F 是本体，密度 f 只是它的导数。
    </template>
  </DemoFrame>
</template>
