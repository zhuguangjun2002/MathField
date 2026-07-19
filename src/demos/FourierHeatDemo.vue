<script setup>
import { ref } from 'vue'
import { usePlot, makeView, drawAxes, plotFn, drawLabel, C, fmt } from './plot.js'
import DemoFrame from '../components/DemoFrame.vue'
import ControlSlider from '../components/ControlSlider.vue'

// 初始温度：方波（左半棒 1 度、右半棒 −1 度），傅里叶系数 bₙ = 4/(nπ)（n 奇数）
const nTerms = ref(3) // 部分和取到第几个奇数项
const tau = ref(0) // 热时间：每个模式按 e^{−n²π²τ} 衰减

const square = (x) => (x < 0.5 ? 1 : -1)

function partial(x, terms, tt) {
  let s = 0
  for (let k = 0; k < terms; k++) {
    const n = 2 * k + 1
    s += ((4 / (n * Math.PI)) * Math.sin(n * Math.PI * x)) * Math.exp(-n * n * Math.PI * Math.PI * tt)
  }
  return s
}

const canvas = ref(null)
usePlot(
  canvas,
  (ctx, w, h) => {
    const v = makeView(w, h, 0, 1, -1.5, 1.5)
    drawAxes(ctx, v, { xTicks: [0, 0.5, 1], yTicks: [-1, 1], xLabel: 'x（棒上位置）', yLabel: '温度 u' })

    // 初始方波（目标）
    ctx.save()
    ctx.strokeStyle = 'rgba(139, 132, 148, 0.55)'
    ctx.lineWidth = 1.6
    ctx.setLineDash([6, 4])
    ctx.beginPath()
    ctx.moveTo(v.X(0), v.Y(1))
    ctx.lineTo(v.X(0.5), v.Y(1))
    ctx.moveTo(v.X(0.5), v.Y(-1))
    ctx.lineTo(v.X(1), v.Y(-1))
    ctx.stroke()
    ctx.restore()

    // 各奇次谐波（衰减后）
    for (let k = 0; k < Math.min(nTerms.value, 4); k++) {
      const n = 2 * k + 1
      plotFn(ctx, v, (x) => ((4 / (n * Math.PI)) * Math.sin(n * Math.PI * x)) * Math.exp(-n * n * Math.PI * Math.PI * tau.value), {
        color: ['rgba(51,81,143,0.5)', 'rgba(176,125,43,0.5)', 'rgba(47,125,79,0.5)', 'rgba(122,74,143,0.5)'][k],
        width: 1.2,
        dash: [4, 4],
      })
    }
    // 部分和
    plotFn(ctx, v, (x) => partial(x, nTerms.value, tau.value), { color: C.accent, width: 2.6, samples: 800 })

    drawLabel(ctx, v.pad.l + 8, v.pad.t + 18, tau.value === 0 ? '灰虚线：初始方波　红：傅里叶部分和' : '红：热方程演化中的温度分布', {
      color: C.soft,
      size: 12,
    })
  },
  { height: 340, watchSources: [nTerms, tau] },
)
</script>

<template>
  <DemoFrame title="傅里叶的两步棋：先拼出方波，再看热把它抹平">
    <canvas ref="canvas" class="demo-canvas"></canvas>
    <template #controls>
      <ControlSlider label="级数项数（奇次谐波个数）" v-model="nTerms" :min="1" :max="60" :step="1" />
      <ControlSlider label="热时间 τ（×10⁻³）" :model-value="tau * 1000" @update:model-value="(v) => (tau = v / 1000)" :min="0" :max="30" :step="0.2" />
    </template>
    <template #readout>
      u(x, τ) = Σ (4/nπ)·sin(nπx)·e^(−n²π²τ)（n 取奇数）：n = 1 衰减因子 e^(−π²τ) ≈
      <b>{{ fmt(Math.exp(-Math.PI * Math.PI * tau), 3) }}</b>，n = 5 已衰到
      <b>{{ fmt(Math.exp(-25 * Math.PI * Math.PI * tau), 4) }}</b>
    </template>
    <template #note>
      <b>第一步（τ = 0 时拖项数）</b>：一项正弦只是个圆滑波浪，但 3 项、15 项、60 项逐次叠加，
      红线越来越贴近灰色方波——"任意形状 = 正弦之和"不是空话，是可以亲眼看着拼出来的。
      注意跳变点旁那两个甩不掉的小尖角（吉布斯现象）：部分和在间断点附近永远过冲约 9%——
      收敛是逐点的，不是均匀的，这正是当年严格化要啃的硬骨头。
      <b>第二步（拖热时间 τ）</b>：热方程下每个模式按 e^(−n²π²τ) 独立衰减——指数上有 <b>n²</b>，
      高频死得极快：先是尖角圆掉，再是细节褪去，最后只剩一个懒洋洋的基频拱形。
      热传导 = 一台"高频粉碎机"，这就是为什么烫手的东西摸起来先失去纹理、后失去温度。
    </template>
  </DemoFrame>
</template>
