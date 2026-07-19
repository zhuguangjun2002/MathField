<script setup>
import { ref, computed } from 'vue'
import { usePlot, makeView, drawAxes, plotFn, drawPoint, drawLabel, C, fmt } from './plot.js'
import DemoFrame from '../components/DemoFrame.vue'
import ControlSlider from '../components/ControlSlider.vue'

// u(x,t) = sin(πx)·cos(πt) + 0.3·sin(2πx)·cos(2πt)：一根两端固定弦的真实振动
const u = (x, t) => Math.sin(Math.PI * x) * Math.cos(Math.PI * t) + 0.3 * Math.sin(2 * Math.PI * x) * Math.cos(2 * Math.PI * t)

const x0 = ref(0.3) // 固定的观察点位置
const t0 = ref(0.2) // 固定的观察时刻

const canvas1 = ref(null) // 左：固定 t，看 x 切片（弦形）
const canvas2 = ref(null) // 右：固定 x，看 t 切片（一点的历史）

usePlot(
  canvas1,
  (ctx, w, h) => {
    const v = makeView(w, h, 0, 1, -1.45, 1.45)
    drawAxes(ctx, v, { xTicks: [0, 0.5, 1], yTicks: [-1, 1], xLabel: 'x（弦上位置）', yLabel: 'u' })
    // 淡画几个其他时刻，显示"这是随时间翻动的一册照片"
    for (const dt of [-0.12, -0.06, 0.06, 0.12]) {
      plotFn(ctx, v, (x) => u(x, t0.value + dt), { color: 'rgba(139, 132, 148, 0.25)', width: 1.2 })
    }
    plotFn(ctx, v, (x) => u(x, t0.value), { color: C.accent, width: 2.8 })
    drawPoint(ctx, v, x0.value, u(x0.value, t0.value), { color: C.indigo, r: 6 })
    drawLabel(ctx, v.pad.l + 8, v.pad.t + 18, `t = ${fmt(t0.value)} 时刻的弦形（照片）`, { color: C.accent })
  },
  { height: 300, watchSources: [x0, t0] },
)

usePlot(
  canvas2,
  (ctx, w, h) => {
    const v = makeView(w, h, 0, 2, -1.45, 1.45)
    drawAxes(ctx, v, { xTicks: [0, 1, 2], yTicks: [-1, 1], xLabel: 't（时间）', yLabel: 'u' })
    plotFn(ctx, v, (t) => u(x0.value, t), { color: C.indigo, width: 2.8 })
    // 当前时刻竖线
    ctx.save()
    ctx.strokeStyle = C.accent
    ctx.lineWidth = 1.6
    ctx.setLineDash([5, 4])
    ctx.beginPath()
    ctx.moveTo(v.X(t0.value), v.pad.t)
    ctx.lineTo(v.X(t0.value), v.pad.t + v.ih)
    ctx.stroke()
    ctx.restore()
    drawPoint(ctx, v, t0.value, u(x0.value, t0.value), { color: C.indigo, r: 6 })
    drawLabel(ctx, v.pad.l + 8, v.pad.t + 18, `x = ${fmt(x0.value)} 这一点的振动史（心电图）`, { color: C.indigo })
  },
  { height: 300, watchSources: [x0, t0] },
)

const uxx = computed(() => {
  const e = 0.001
  return (u(x0.value + e, t0.value) - 2 * u(x0.value, t0.value) + u(x0.value - e, t0.value)) / (e * e)
})
const utt = computed(() => {
  const e = 0.001
  return (u(x0.value, t0.value + e) - 2 * u(x0.value, t0.value) + u(x0.value, t0.value - e)) / (e * e)
})
</script>

<template>
  <DemoFrame title="偏导数：同一张 u(x,t)，两种切法">
    <canvas ref="canvas1" class="demo-canvas"></canvas>
    <canvas ref="canvas2" class="demo-canvas" style="margin-top: 10px"></canvas>
    <template #controls>
      <ControlSlider label="观察点位置 x₀" v-model="x0" :min="0.02" :max="0.98" :step="0.01" />
      <ControlSlider label="观察时刻 t₀" v-model="t0" :min="0" :max="2" :step="0.01" />
    </template>
    <template #readout>
      在 (x₀, t₀) 处沿两个方向各求二阶导：∂²u/∂x² ≈ <b>{{ fmt(uxx, 1) }}</b>（弦形的弯曲度）
      &nbsp;&nbsp;∂²u/∂t² ≈ <b>{{ fmt(utt, 1) }}</b>（该点的加速度）&nbsp;&nbsp;两者之比 ≈
      <b>{{ fmt(utt / (uxx || 1e-9), 2) }}</b>
    </template>
    <template #note>
      同一个函数 u(x,t)，切法不同，看到的东西完全不同：<b>固定时刻 t₀ 沿 x 切</b>，
      得到上图——那一瞬间整根弦的形状（照片）；<b>固定位置 x₀ 沿 t 切</b>，得到下图——
      那一个点上下振动的历史（心电图）。<b>偏导数就是"切片后的普通导数"</b>：∂u/∂x 是照片的斜率，
      ∂u/∂t 是心电图的斜率——没有任何新运算，只是"求导前先约定按哪个变量切、其余全冻结"。
      读数区里那个比值始终在 1 附近（本例波速 c = 1）不是巧合：弯曲度与加速度锁在一起，
      正是下一讲波动方程 u_tt = c²u_xx 说的事——这两张图已经偷偷在演示它了。
    </template>
  </DemoFrame>
</template>
