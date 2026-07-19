<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { usePlot, makeSquareView, drawArrow, drawLabel, C, fmt } from './plot.js'
import DemoFrame from '../components/DemoFrame.vue'

// 列向量 u = (a, c)，v = (b, d)；矩阵 [a b; c d]
const ux = ref(2)
const uy = ref(0.4)
const vx = ref(0.6)
const vy = ref(1.6)

const det = computed(() => ux.value * vy.value - uy.value * vx.value)

let view = null
let dragging = null // 'u' | 'v' | null

const canvas = ref(null)
const { render } = usePlot(
  canvas,
  (ctx, w, h) => {
    const v = makeSquareView(w, h, 3.1)
    view = v

    // 淡网格 + 轴
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
    ctx.lineWidth = 1.4
    ctx.beginPath()
    ctx.moveTo(v.pad.l, v.Y(0))
    ctx.lineTo(v.pad.l + v.iw, v.Y(0))
    ctx.moveTo(v.X(0), v.pad.t)
    ctx.lineTo(v.X(0), v.pad.t + v.ih)
    ctx.stroke()
    ctx.restore()

    const d = det.value
    const a = ux.value
    const c = uy.value
    const b = vx.value
    const dd = vy.value

    // 平行四边形：0, u, u+v, v。正定向填暖红、反定向填靛蓝、接近 0 变灰
    ctx.save()
    ctx.beginPath()
    ctx.moveTo(v.X(0), v.Y(0))
    ctx.lineTo(v.X(a), v.Y(c))
    ctx.lineTo(v.X(a + b), v.Y(c + dd))
    ctx.lineTo(v.X(b), v.Y(dd))
    ctx.closePath()
    ctx.fillStyle = Math.abs(d) < 0.08 ? 'rgba(139,132,148,0.25)' : d > 0 ? C.accentSoft : C.indigoSoft
    ctx.fill()
    ctx.strokeStyle = Math.abs(d) < 0.08 ? C.soft : d > 0 ? C.accent : C.indigo
    ctx.lineWidth = 1.2
    ctx.setLineDash([4, 4])
    ctx.stroke()
    ctx.restore()

    drawArrow(ctx, v, 0, 0, a, c, { color: C.accent, width: 2.8 })
    drawArrow(ctx, v, 0, 0, b, dd, { color: C.indigo, width: 2.8 })
    drawLabel(ctx, v.X(a) + 10, v.Y(c) + 4, `u = (${fmt(a, 1)}, ${fmt(c, 1)}) 拖我`, { color: C.accent })
    drawLabel(ctx, v.X(b) + 10, v.Y(dd) - 8, `v = (${fmt(b, 1)}, ${fmt(dd, 1)}) 拖我`, { color: C.indigo })

    if (Math.abs(d) < 0.08) {
      drawLabel(ctx, v.pad.l + 12, v.pad.t + 24, 'det ≈ 0：平行四边形被压扁成一条线（矩阵"奇异"）', {
        color: C.accent,
        size: 14,
      })
    }
  },
  { height: 360, watchSources: [ux, uy, vx, vy] },
)

function pointerPos(e) {
  const rect = canvas.value.getBoundingClientRect()
  return [e.clientX - rect.left, e.clientY - rect.top]
}

function onDown(e) {
  if (!view) return
  const [px, py] = pointerPos(e)
  const du = Math.hypot(px - view.X(ux.value), py - view.Y(uy.value))
  const dv = Math.hypot(px - view.X(vx.value), py - view.Y(vy.value))
  if (Math.min(du, dv) > 28) return
  dragging = du <= dv ? 'u' : 'v'
  canvas.value.setPointerCapture(e.pointerId)
  e.preventDefault()
}

function onMove(e) {
  if (!dragging || !view) return
  const [px, py] = pointerPos(e)
  const x = Math.round(view.invX(px) * 10) / 10
  const y = Math.round(view.invY(py) * 10) / 10
  if (dragging === 'u') {
    ux.value = x
    uy.value = y
  } else {
    vx.value = x
    vy.value = y
  }
}

function onUp() {
  dragging = null
}

onMounted(() => {
  const el = canvas.value
  el.addEventListener('pointerdown', onDown)
  el.addEventListener('pointermove', onMove)
  el.addEventListener('pointerup', onUp)
  el.style.touchAction = 'none'
  el.style.cursor = 'grab'
})

onBeforeUnmount(() => {
  const el = canvas.value
  if (!el) return
  el.removeEventListener('pointerdown', onDown)
  el.removeEventListener('pointermove', onMove)
  el.removeEventListener('pointerup', onUp)
})
</script>

<template>
  <DemoFrame title="行列式：拖动两个列向量，看有向面积">
    <canvas ref="canvas" class="demo-canvas"></canvas>
    <template #readout>
      矩阵
      <code>［{{ fmt(ux, 1) }} {{ fmt(vx, 1) }}；{{ fmt(uy, 1) }} {{ fmt(vy, 1) }}］</code>
      &nbsp;det = {{ fmt(ux, 1) }}×{{ fmt(vy, 1) }} − {{ fmt(uy, 1) }}×{{ fmt(vx, 1) }} =
      <b :style="{ color: det > 0.08 ? '#b23a2f' : det < -0.08 ? '#33518f' : '#8b8494' }">{{ fmt(det) }}</b>
      &nbsp;&nbsp;平行四边形面积 = |det| = <b>{{ fmt(Math.abs(det)) }}</b>
    </template>
    <template #note>
      抓住箭头尖拖一拖：det 的绝对值始终等于两个列向量张成的平行四边形面积。
      把 v 拖过 u 的另一侧，颜色由红变蓝——det 变负了，这是"定向翻转"（左手系/右手系）的信号。
      再把两个向量拖到<b>共线</b>：平行四边形被压扁，det = 0——这正是上一讲"两条方程平行、消元露馅"的几何真相，
      也是"奇异矩阵"一词的含义。行列式从来不是那个展开式，展开式只是这块面积的计算方法。
    </template>
  </DemoFrame>
</template>
