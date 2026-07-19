<script setup>
import { ref, computed } from 'vue'
import { usePlot, makeSquareView, drawPoint, drawLabel, C, fmt } from './plot.js'
import DemoFrame from '../components/DemoFrame.vue'
import ControlSlider from '../components/ControlSlider.vue'

// f(z) = 1/(1−z)，唯一奇点 z = 1。
// 圆盘链：c₀ = 0（原级数 Σzⁿ 的圆盘），之后沿绕奇点的圆弧行进，
// 每个圆盘的收敛半径 = 圆心到奇点的距离。
const steps = ref(0)

const ORBIT_R = 1.2 // 后续圆心距奇点的距离
const centers = computed(() => {
  const out = [[0, 0]]
  for (let k = 1; k <= steps.value; k++) {
    const a = Math.PI - (k * Math.PI) / 4 // 从奇点左侧出发，逆时针每步 45°
    out.push([1 + ORBIT_R * Math.cos(a), ORBIT_R * Math.sin(a)])
  }
  return out
})

// 演示点：看延拓后能在哪里取值。取 z = 2（原级数发散的地方）
const probe = [2, 0.0001]
const probeCovered = computed(() =>
  centers.value.some(([x, y]) => Math.hypot(probe[0] - x, probe[1] - y) < Math.hypot(x - 1, y) - 0.02),
)

const canvas = ref(null)
usePlot(
  canvas,
  (ctx, w, h) => {
    const view = makeSquareView(w, h, 2.5, { cy: 0.35 })

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

    // 圆盘链
    centers.value.forEach(([x, y], k) => {
      const r = Math.hypot(x - 1, y)
      const pr = view.X(x + r) - view.X(x)
      ctx.save()
      ctx.beginPath()
      ctx.arc(view.X(x), view.Y(y), pr, 0, Math.PI * 2)
      ctx.fillStyle = k === 0 ? 'rgba(51, 81, 143, 0.16)' : 'rgba(176, 125, 43, 0.12)'
      ctx.fill()
      ctx.strokeStyle = k === 0 ? C.indigo : C.gold
      ctx.lineWidth = k === 0 ? 2 : 1.4
      ctx.setLineDash(k === 0 ? [] : [5, 4])
      ctx.stroke()
      ctx.restore()
      drawPoint(ctx, view, x, y, { color: k === 0 ? C.indigo : C.gold, r: 3.5 })
    })
    // 圆心之间的行进路线
    if (centers.value.length > 1) {
      ctx.save()
      ctx.strokeStyle = 'rgba(176, 125, 43, 0.7)'
      ctx.lineWidth = 1.4
      ctx.beginPath()
      centers.value.forEach(([x, y], k) => {
        k ? ctx.lineTo(view.X(x), view.Y(y)) : ctx.moveTo(view.X(x), view.Y(y))
      })
      ctx.stroke()
      ctx.restore()
    }

    // 奇点
    ctx.save()
    ctx.strokeStyle = C.accent
    ctx.lineWidth = 2.6
    const sx = view.X(1)
    const sy = view.Y(0)
    ctx.beginPath()
    ctx.moveTo(sx - 7, sy - 7)
    ctx.lineTo(sx + 7, sy + 7)
    ctx.moveTo(sx - 7, sy + 7)
    ctx.lineTo(sx + 7, sy - 7)
    ctx.stroke()
    ctx.restore()
    drawLabel(ctx, sx + 10, sy + 18, '奇点 z=1', { color: C.accent, size: 12 })

    // 探测点 z=2
    drawPoint(ctx, view, probe[0], probe[1], {
      color: probeCovered.value ? C.green : C.soft,
      r: 5,
      hollow: !probeCovered.value,
    })
    drawLabel(ctx, view.X(2) + 8, view.Y(0) - 10, probeCovered.value ? 'z=2：已被延拓覆盖！' : 'z=2：级数在此发散', {
      color: probeCovered.value ? C.green : C.soft,
      size: 12,
    })

    drawLabel(ctx, view.pad.l + 12, view.pad.t + 22, '蓝盘：原级数 Σzⁿ 的地盘（|z|<1）；金盘：一步步重新展开', {
      color: C.soft,
      size: 12,
    })
  },
  { height: 380, watchSources: [steps] },
)
</script>

<template>
  <DemoFrame title="解析延拓：拿圆盘当脚印，绕过奇点走出去">
    <canvas ref="canvas" class="demo-canvas"></canvas>
    <template #controls>
      <ControlSlider label="延拓步数" v-model="steps" :min="0" :max="8" :step="1" />
    </template>
    <template #readout>
      当前共 {{ steps + 1 }} 个圆盘；每个圆盘的半径恰好 = 圆心到奇点 z=1 的距离
      <template v-if="steps >= 8">——绕满一圈，回到出发地，函数值严丝合缝对上（无分支）</template>
    </template>
    <template #note>
      几何级数 Σzⁿ 只在蓝色单位圆盘内收敛，可它的和 1/(1−z) 明明在 z=2 处好端端有值（等于 −1）。
      怎么"走"过去？<b>在蓝盘边缘附近选个新中心，把函数重新泰勒展开</b>——新级数的收敛盘（金色）
      伸出旧盘之外；再在金盘里选点、再展开……一步一个脚印。注意每个圆盘的半径都<b>顶到奇点为止</b>
      ——收敛半径 = 到最近奇点的距离，上一讲的谜底在图上直接可见。拖满 8 步：
      圆盘链绕过奇点一整圈，覆盖 z=2，也回到了出发地。而且延拓的结果是<b>唯一</b>的——
      解析函数"一小段决定全体"，这是黎曼把 ζ 函数从半平面推向全平面的通行证。
    </template>
  </DemoFrame>
</template>
