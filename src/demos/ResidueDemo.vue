<script setup>
import { ref, computed } from 'vue'
import { usePlot, makeSquareView, drawLabel, C, fmt } from './plot.js'
import DemoFrame from '../components/DemoFrame.vue'
import ControlSlider from '../components/ControlSlider.vue'

// f(z) = 1/(z−1) + 2/(z+1) − 1/(z−i)：三个一阶极点及其留数
const POLES = [
  { x: 1, y: 0, res: 1, label: 'z=1，留数 1' },
  { x: -1, y: 0, res: 2, label: 'z=−1，留数 2' },
  { x: 0, y: 1, res: -1, label: 'z=i，留数 −1' },
]

const cx = ref(0)
const cy = ref(0)
const R = ref(1.5)

function fval(x, y) {
  let u = 0
  let v = 0
  for (const p of POLES) {
    const dx = x - p.x
    const dy = y - p.y
    const d = dx * dx + dy * dy
    u += (p.res * dx) / d
    v += (-p.res * dy) / d
  }
  return [u, v]
}

// 沿圆周数值积分，除以 2πi
const measured = computed(() => {
  const N = 3000
  let re = 0
  let im = 0
  let px = cx.value + R.value
  let py = cy.value
  let [fu, fv] = fval(px, py)
  for (let k = 1; k <= N; k++) {
    const t = (k / N) * Math.PI * 2
    const qx = cx.value + R.value * Math.cos(t)
    const qy = cy.value + R.value * Math.sin(t)
    const [gu, gv] = fval(qx, qy)
    const dx = qx - px
    const dy = qy - py
    const mu = (fu + gu) / 2
    const mv = (fv + gv) / 2
    re += mu * dx - mv * dy
    im += mu * dy + mv * dx
    ;[px, py] = [qx, qy]
    ;[fu, fv] = [gu, gv]
  }
  // ∫f dz / (2πi)：除以 2πi 即 (re+im·i)/(2πi) = im/(2π) − re/(2π)·i
  return [im / (2 * Math.PI), -re / (2 * Math.PI)]
})

const inside = computed(() =>
  POLES.filter((p) => Math.hypot(p.x - cx.value, p.y - cy.value) < R.value),
)
const expected = computed(() => inside.value.reduce((s, p) => s + p.res, 0))
const nearEdge = computed(() =>
  POLES.some((p) => Math.abs(Math.hypot(p.x - cx.value, p.y - cy.value) - R.value) < 0.12),
)

const canvas = ref(null)
usePlot(
  canvas,
  (ctx, w, h) => {
    const view = makeSquareView(w, h, 2.4)

    ctx.save()
    ctx.strokeStyle = '#b9b3a6'
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(view.pad.l, view.Y(0))
    ctx.lineTo(view.pad.l + view.iw, view.Y(0))
    ctx.moveTo(view.X(0), view.pad.t)
    ctx.lineTo(view.X(0), view.pad.t + view.ih)
    ctx.stroke()
    ctx.restore()

    // 回路（内部着色）
    ctx.save()
    const pr = view.X(cx.value + R.value) - view.X(cx.value)
    ctx.beginPath()
    ctx.arc(view.X(cx.value), view.Y(cy.value), pr, 0, Math.PI * 2)
    ctx.fillStyle = C.greenSoft
    ctx.fill()
    ctx.strokeStyle = C.green
    ctx.lineWidth = 2.4
    ctx.stroke()
    // 逆时针方向箭头
    ctx.fillStyle = C.green
    const ax = view.X(cx.value)
    const ay = view.Y(cy.value) - pr
    ctx.beginPath()
    ctx.moveTo(ax - 9, ay)
    ctx.lineTo(ax + 3, ay - 6)
    ctx.lineTo(ax + 3, ay + 6)
    ctx.closePath()
    ctx.fill()
    ctx.restore()

    // 极点
    for (const p of POLES) {
      const isIn = Math.hypot(p.x - cx.value, p.y - cy.value) < R.value
      ctx.save()
      ctx.strokeStyle = isIn ? C.accent : C.soft
      ctx.lineWidth = 2.6
      const px = view.X(p.x)
      const py = view.Y(p.y)
      ctx.beginPath()
      ctx.moveTo(px - 7, py - 7)
      ctx.lineTo(px + 7, py + 7)
      ctx.moveTo(px - 7, py + 7)
      ctx.lineTo(px + 7, py - 7)
      ctx.stroke()
      ctx.restore()
      drawLabel(ctx, px + 10, py - 8, p.label, { color: isIn ? C.accent : C.soft, size: 12 })
    }

    drawLabel(
      ctx,
      view.pad.l + 12,
      view.pad.t + 22,
      `圈内留数和 = ${expected.value}`,
      { color: C.ink, size: 14 },
    )
  },
  { height: 380, watchSources: [cx, cy, R] },
)
</script>

<template>
  <DemoFrame title="留数定理：回路积分 = 2πi ×（圈进来的留数之和）">
    <canvas ref="canvas" class="demo-canvas"></canvas>
    <template #controls>
      <ControlSlider label="回路中心 x" v-model="cx" :min="-2" :max="2" :step="0.05" />
      <ControlSlider label="回路中心 y" v-model="cy" :min="-1.6" :max="1.6" :step="0.05" />
      <ControlSlider label="回路半径 R" v-model="R" :min="0.3" :max="2.2" :step="0.05" />
    </template>
    <template #readout>
      数值积分 ∮f(z)dz ÷ 2πi ≈ <b>{{ fmt(measured[0], 3) }} {{ measured[1] >= 0 ? '+' : '−' }} {{ fmt(Math.abs(measured[1]), 3) }}i</b>
      &nbsp;&nbsp;圈内留数和 = <b>{{ expected }}</b>
      <template v-if="nearEdge">&nbsp;（回路快擦到极点了，数值误差会变大）</template>
    </template>
    <template #note>
      f 有三个极点（打叉处），各自带一个"留数"。拖动绿色回路：不管它是大是小、中心在哪，
      <b>沿它一圈的积分永远等于 2πi 乘以圈内留数之和</b>——数值积分与右边的整数和实时对账。
      圈住 z=1 和 z=−1 得 3；把半径缩小到只剩 z=i，答案变 −1；谁也不圈，恒等于 0（这正是柯西定理）。
      被积函数在回路上千变万化，但它"值多少钱"只看圈进了哪几张"账单"——
      无穷多个函数值的积分信息，全部浓缩在有限几个点上。这就是"把积分变成数圈圈"。
    </template>
  </DemoFrame>
</template>
