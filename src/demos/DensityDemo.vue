<script setup>
import { ref, computed } from 'vue'
import { usePlot, makeView, drawAxes, plotFn, drawLabel, C, fmt, rng } from './plot.js'
import DemoFrame from '../components/DemoFrame.vue'
import ControlSlider from '../components/ControlSlider.vue'
import MathInline from '../components/MathInline.vue'

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
      绿色阴影面积 F(b) = <b>{{ fmt(cdf(b), 4) }}</b>
      &nbsp;&nbsp;样本中 X ≤ b 的频率 = <b>{{ fmt(freqLeB, 4) }}</b>
      &nbsp;&nbsp;全部柱子的面积之和恒为 <b>1</b>
    </template>
    <template #note>
      <b>两个旋钮。</b><b>直方图组数</b>不是数据的性质，是<b>你看数据的粗细</b>——
      把同一批样本切成几档来数；<b>区间右端 b</b> 是查账的位置，
      绿色阴影画的是 <MathInline tex="P(X \le b)" />，读数区同时给出理论值 F(b) 与样本频率，
      两者该贴得很近（4000 个样本，全程最大差 0.008，出现在 b ≈ 0.95）。
      样本是<b>固定的一批</b>（固定种子生成，可复现），拖组数不会换数据。
      <br /><br />
      这是 4000 次观测（比如"等公交的耗时"）。柱子的<b>高度不是概率</b>——
      它是"频数 ÷ (总数 × 组距)"，为的是让<b>面积</b>等于频率。把组数从 4 拖到 100：
      柱子越来越细，轮廓越来越贴近蓝色的密度曲线 f(x)——直方图的极限就是密度。
      于是"X 落在某区间的概率"= 该区间下的<b>面积</b>（拖动 b 看绿色阴影与 F(b) 同步变化）。
      单点概率为 0 一点也不吓人：一条竖线段的面积本来就是 0。这正是积分讲"面积由累积函数掌管"的重演：
      F 是本体，密度 f 只是它的导数。
      <br /><br />
      <b>两处值得亲手对照的地方。</b>① 把组数拖到最小的 4：柱子粗得看不出形状，
      可<b>所有柱子的面积之和仍然是 1</b>，读数区的样本频率也仍然贴着 F(b)——
      <b>直方图画得粗不粗，不影响它记的账</b>，只影响你能看出多少细节。
      ② 把组数拖到 100：轮廓开始发毛、上下抖动——这不是密度真的在抖，
      而是每根柱子里只剩四十来个样本，随机涨落显了形。
      <b>组数太少看不出形状、太多被噪声淹没</b>，中间那一段才是能看的。
      <br /><br />
      顺带一提：这 4000 个样本是怎么造出来的？用的正是伍节那条
      <MathInline tex="X = F^{-1}(U)" />——对均匀随机数取一次对数，一行代码。
    </template>
  </DemoFrame>
</template>
