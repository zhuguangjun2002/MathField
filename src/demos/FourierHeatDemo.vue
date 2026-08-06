<script setup>
import { computed, ref } from 'vue'
import { usePlot, makeView, drawAxes, plotFn, drawLabel, C, fmt } from './plot.js'
import DemoFrame from '../components/DemoFrame.vue'
import ControlSlider from '../components/ControlSlider.vue'
import MathInline from '../components/MathInline.vue'

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

// 吉布斯现象要能被"量到"：报出部分和在左半棒上的峰值（目标是 1）。
// 项数 3 时 1.188、15 时 1.179、60 时 1.179——过冲不随项数消失，只是越挤越窄。
const peak = computed(() => {
  let m = -Infinity
  for (let i = 0; i <= 4000; i++) m = Math.max(m, partial((i / 4000) * 0.5, nTerms.value, tau.value))
  return m
})

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
      衰减因子：n = 1 → <b>{{ fmt(Math.exp(-Math.PI * Math.PI * tau), 3) }}</b>&nbsp;&nbsp;n = 5 →
      <b>{{ fmt(Math.exp(-25 * Math.PI * Math.PI * tau), 4) }}</b>&nbsp;&nbsp;左半棒峰值 ≈
      <b>{{ fmt(peak, 3) }}</b>（目标 1）
    </template>
    <template #note>
      <b>两个旋钮，一个管"拼得像不像"，一个管"过了多久"。</b>
      <b>级数项数</b>：部分和取到第几个奇次谐波（1 表示只用 sin πx，2 表示再加 sin 3πx，如此类推；
      偶次项的系数本来就是 0，因为方波是奇对称的）。它不是物理量，是<b>近似的精细程度</b>。
      <b>热时间 τ</b>：真时间被折算过——棒长取 1、扩散系数取 a = 1，所以 τ 是无量纲的
      "热已经走了多远"，滑杆标的 ×10⁻³ 只是为了拖得动（拖到底 τ = 0.03）。
      判断尺子看读数区：基频衰减到 <b>0.744</b> 时，5 次谐波已经只剩 <b>0.0006</b>。
      <br /><br />
      <b>第一步（τ = 0 时拖项数）</b>：一项正弦只是个圆滑波浪，但 3 项、15 项、60 项逐次叠加，
      红线越来越贴近灰色方波——"任意形状 = 正弦之和"不是空话，是可以亲眼看着拼出来的。
      <b>注意跳变点旁那两个甩不掉的小尖角，这就是吉布斯现象</b>，而且它能在读数区量到：
      盯住"左半棒峰值"，目标值是 1，可它<b>怎么加项都下不来</b>——
      3 项时 1.188、15 项时 1.179、60 项时还是 1.179。
      过冲不随项数消失，只是越挤越窄（60 项时那个尖峰已经缩到 x ≈ 0.008 附近）。
      这个 1.179 是有极限值的：它等于 <MathInline tex="\frac{2}{\pi}\mathrm{Si}(\pi) = 1.17898\ldots" />，
      也就是超出台阶高度 17.9%；教科书常说的"过冲 9%"是拿<b>整个跳跃</b>（从 −1 到 1，高度 2）
      当分母的说法，同一件事两种口径，别被绕晕。
      <b>收敛是逐点的，不是均匀的</b>——这正是当年严格化要啃的硬骨头。
      <b>第二步（拖热时间 τ）</b>：热方程下每个模式按 <MathInline tex="e^{-n^2\pi^2\tau}" /> 独立衰减——指数上有 <b>n²</b>，
      高频死得极快：先是尖角圆掉，再是细节褪去，最后只剩一个懒洋洋的基频拱形。
      热传导 = 一台"高频粉碎机"，这就是为什么烫手的东西摸起来先失去纹理、后失去温度。
    </template>
  </DemoFrame>
</template>
