<script setup>
import { ref, computed } from 'vue'
import { usePlot, makeSquareView, drawArrow, drawPoint, drawLabel, C, fmt } from './plot.js'
import DemoFrame from '../components/DemoFrame.vue'
import ControlSlider from '../components/ControlSlider.vue'

const theta = ref(90) // w 的辐角（度）
const r = ref(1) // w 的模
const N = 10 // 画多少个幂

const w = computed(() => {
  const t = (theta.value * Math.PI) / 180
  return [r.value * Math.cos(t), r.value * Math.sin(t)]
})

// w 的 0..N 次幂
const powers = computed(() => {
  const out = [[1, 0]]
  for (let k = 1; k <= N; k++) {
    const [a, b] = out[k - 1]
    const [c, d] = w.value
    out.push([a * c - b * d, a * d + b * c])
  }
  return out
})

const canvas = ref(null)
usePlot(
  canvas,
  (ctx, v0, h) => {
    const view = makeSquareView(v0, h, 2.4)

    // 坐标轴 + 单位圆
    ctx.save()
    ctx.strokeStyle = '#b9b3a6'
    ctx.lineWidth = 1.2
    ctx.beginPath()
    ctx.moveTo(view.pad.l, view.Y(0))
    ctx.lineTo(view.pad.l + view.iw, view.Y(0))
    ctx.moveTo(view.X(0), view.pad.t)
    ctx.lineTo(view.X(0), view.pad.t + view.ih)
    ctx.stroke()
    ctx.strokeStyle = C.grid
    ctx.setLineDash([4, 4])
    ctx.beginPath()
    ctx.arc(view.X(0), view.Y(0), view.X(1) - view.X(0), 0, Math.PI * 2)
    ctx.stroke()
    ctx.restore()
    drawLabel(ctx, view.X(1) + 4, view.Y(0) + 16, '1', { color: C.soft, size: 12 })
    drawLabel(ctx, view.X(0) + 6, view.Y(1) - 6, 'i', { color: C.soft, size: 12 })

    // 幂螺线：连线 + 点，颜色渐深
    ctx.save()
    ctx.beginPath()
    ctx.rect(view.pad.l, view.pad.t, view.iw, view.ih)
    ctx.clip()
    ctx.strokeStyle = 'rgba(178, 58, 47, 0.35)'
    ctx.lineWidth = 1.4
    ctx.beginPath()
    powers.value.forEach(([x, y], k) => {
      const px = view.X(x)
      const py = view.Y(y)
      k ? ctx.lineTo(px, py) : ctx.moveTo(px, py)
    })
    ctx.stroke()
    powers.value.forEach(([x, y], k) => {
      drawPoint(ctx, view, x, y, { color: k === 0 ? C.ink : C.accent, r: k === 1 ? 6 : 3.6 })
      if (k <= 4 || k === N)
        drawLabel(ctx, view.X(x) + 7, view.Y(y) - 6, k === 0 ? '1' : k === 1 ? 'w' : `w^${k}`, {
          color: k === 0 ? C.ink : C.accent,
          size: 12,
        })
    })
    ctx.restore()

    // w 的箭头 + 辐角弧
    drawArrow(ctx, view, 0, 0, w.value[0], w.value[1], { color: C.indigo, width: 2.6 })
    ctx.save()
    ctx.strokeStyle = C.gold
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.arc(view.X(0), view.Y(0), 26, 0, (-theta.value * Math.PI) / 180, theta.value > 0)
    ctx.stroke()
    ctx.restore()
  },
  { height: 360, watchSources: [theta, r] },
)
</script>

<template>
  <DemoFrame title="复数乘法 = 旋转 + 伸缩：看 w 的幂走出螺线">
    <canvas ref="canvas" class="demo-canvas"></canvas>
    <template #controls>
      <ControlSlider label="w 的辐角 θ" v-model="theta" :min="0" :max="180" :step="1" :display="(x) => x + '°'" />
      <ControlSlider label="w 的模 |w|" v-model="r" :min="0.7" :max="1.3" :step="0.01" />
    </template>
    <template #readout>
      w = {{ fmt(w[0]) }} + {{ fmt(w[1]) }}i　—　每乘一次 w：辐角 +{{ theta }}°，长度 ×{{ fmt(r) }}
    </template>
    <template #note>
      黑点是 1，往后依次是 w、w²、w³……<b>每乘一次 w，就逆时针转 θ 度、长度乘 |w|</b>——
      复数乘法的全部几何内容就这一句。把 θ 调到 90°、|w| 调到 1：幂序列走出 1 → i → −1 → −i 的方阵——
      <b>i² = −1 不再神秘：转 90° 再转 90°，当然是掉头</b>。"乘 i"就是"逆时针转直角"这个动作的名字。
      把 |w| 拨离 1，螺线立即盘进（|w|&lt;1）或甩出（|w|&gt;1）——两讲之后，这个"盘进还是甩出"将决定积分的命运。
      邦贝利当年硬算 (2+i)³ = 2+11i 而不明其义；在这张图上它只是"转三次、伸三次"的普通行程。
    </template>
  </DemoFrame>
</template>
