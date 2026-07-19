<script setup>
import { ref, computed } from 'vue'
import { usePlot, makeView, drawAxes, plotFn, drawLabel, C, rng } from './plot.js'
import DemoFrame from '../components/DemoFrame.vue'
import ControlSlider from '../components/ControlSlider.vue'

const DISTS = {
  dice: {
    label: '骰子（平的）',
    mu: 3.5,
    sigma: Math.sqrt(35 / 12),
    draw: (r) => Math.floor(r() * 6) + 1,
  },
  uniform: {
    label: '均匀 U(0,1)（平的）',
    mu: 0.5,
    sigma: 1 / Math.sqrt(12),
    draw: (r) => r(),
  },
  exp: {
    label: '指数分布（严重右偏）',
    mu: 1,
    sigma: 1,
    draw: (r) => -Math.log(1 - r()),
  },
  coin: {
    label: '不均匀硬币 P(1)=0.1（极偏）',
    mu: 0.1,
    sigma: 0.3,
    draw: (r) => (r() < 0.1 ? 1 : 0),
  },
}

const distKey = ref('dice')
const n = ref(1) // 每个样本包含 n 次抽取
const M = 3000 // 样本个数

const stdNormal = (z) => Math.exp(-z * z / 2) / Math.sqrt(2 * Math.PI)

// M 个"n 次抽取的均值"，标准化成 z = (x̄ − μ)/(σ/√n)
const zs = computed(() => {
  const d = DISTS[distKey.value]
  const r = rng(31 + n.value * 7)
  const arr = new Float64Array(M)
  for (let j = 0; j < M; j++) {
    let s = 0
    for (let i = 0; i < n.value; i++) s += d.draw(r)
    arr[j] = (s / n.value - d.mu) / (d.sigma / Math.sqrt(n.value))
  }
  return arr
})

const BINS = 56
const hist = computed(() => {
  const bw = 8 / BINS // z ∈ [-4, 4]
  const counts = new Array(BINS).fill(0)
  let clipped = 0
  for (const z of zs.value) {
    const i = Math.floor((z + 4) / bw)
    if (i >= 0 && i < BINS) counts[i]++
    else clipped++
  }
  return { bw, heights: counts.map((c) => c / (M * bw)), clipped }
})

const canvas = ref(null)
usePlot(
  canvas,
  (ctx, w, h) => {
    const v = makeView(w, h, -4, 4, -0.02, 0.62)
    drawAxes(ctx, v, { xTicks: [-3, -2, -1, 0, 1, 2, 3], yTicks: [0.2, 0.4], xLabel: 'z（标准化后的样本均值）', yLabel: '密度' })

    const { bw, heights } = hist.value
    ctx.save()
    ctx.fillStyle = 'rgba(178, 58, 47, 0.2)'
    ctx.strokeStyle = C.accent
    ctx.lineWidth = 1
    for (let i = 0; i < BINS; i++) {
      if (!heights[i]) continue
      const px = v.X(-4 + i * bw)
      const pw = v.X(-4 + (i + 1) * bw) - px
      const py = v.Y(Math.min(heights[i], 0.62))
      ctx.fillRect(px, py, pw, v.Y(0) - py)
      ctx.strokeRect(px, py, pw, v.Y(0) - py)
    }
    ctx.restore()

    plotFn(ctx, v, stdNormal, { color: C.indigo, width: 2.6 })
    drawLabel(ctx, v.X(1.3), v.Y(stdNormal(1.3)) - 10, '标准正态曲线', { color: C.indigo })
  },
  { height: 340, watchSources: [distKey, n] },
)
</script>

<template>
  <DemoFrame title="中心极限定理：不管原料多歪，平均出来都是钟形">
    <canvas ref="canvas" class="demo-canvas"></canvas>
    <template #controls>
      <label class="ctrl">
        <span class="ctrl-label">原始分布</span>
        <select v-model="distKey" class="ctrl-select">
          <option v-for="(d, k) in DISTS" :key="k" :value="k">{{ d.label }}</option>
        </select>
      </label>
      <ControlSlider label="每个样本的抽取次数 n" v-model="n" :min="1" :max="64" :step="1" />
    </template>
    <template #readout>
      红色：3000 个"n 次抽取的平均值"（已标准化）的直方图；蓝色：标准正态密度。
      n = <b>{{ n }}</b>
    </template>
    <template #note>
      n = 1 时，直方图就是原始分布本来的样子：骰子是六根平柱，指数分布歪向一边，硬币只有两根孤柱。
      现在拖大 n：<b>无论原料多么不像钟形，平均值的分布都固执地趋向同一条蓝色曲线</b>。
      这就是中心极限定理——大量独立小随机量的叠加，细节被互相抵消，只留下"钟形"这个公共形状。
      测量误差是无数小干扰之和、身高是无数基因与环境因素之和，所以它们都是正态的。
      也注意反例的分寸：换"极偏硬币"，n = 30 时钟形还很勉强——教科书那句"n ≥ 30 即可"是经验话术，
      <b>原料越偏，需要的 n 越大</b>。
    </template>
  </DemoFrame>
</template>
