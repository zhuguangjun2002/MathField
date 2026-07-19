<script setup>
import { ref, computed } from 'vue'
import { usePlot, makeSquareView, drawPoint, drawLabel, C, fmt } from './plot.js'
import DemoFrame from '../components/DemoFrame.vue'
import ControlSlider from '../components/ControlSlider.vue'

const FNS = {
  entire: {
    label: 'f(z) = z²（处处解析）',
    f: (x, y) => [x * x - y * y, 2 * x * y],
    pole: null,
  },
  pole: {
    label: 'f(z) = 1/z（z = 0 是奇点）',
    f: (x, y) => {
      const d = x * x + y * y
      return [x / d, -y / d]
    },
    pole: [0, 0],
  },
}

const fnKey = ref('pole')
const bulge = ref(1) // 路径峰值高度：>0 从奇点上方走，<0 从下方

const cfg = computed(() => FNS[fnKey.value])

// 路径：z(s) = (−2+4s) + i·bulge·sin(πs)，s∈[0,1]，端点固定 −2 与 2
const path = (s) => [-2 + 4 * s, bulge.value * Math.sin(Math.PI * s)]

// 数值线积分 ∫f(z)dz（复数梯形法）
const integral = computed(() => {
  const N = 2000
  let re = 0
  let im = 0
  let [px, py] = path(0)
  let [fu, fv] = cfg.value.f(px, py)
  for (let k = 1; k <= N; k++) {
    const [qx, qy] = path(k / N)
    const [gu, gv] = cfg.value.f(qx, qy)
    const dx = qx - px
    const dy = qy - py
    const mu = (fu + gu) / 2
    const mv = (fv + gv) / 2
    re += mu * dx - mv * dy
    im += mu * dy + mv * dx
    ;[px, py] = [qx, qy]
    ;[fu, fv] = [gu, gv]
  }
  return [re, im]
})

const canvas = ref(null)
usePlot(
  canvas,
  (ctx, w, h) => {
    const view = makeSquareView(w, h, 2.3)

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

    // 供对比的直线路径（淡）
    ctx.save()
    ctx.strokeStyle = C.grid
    ctx.lineWidth = 1.6
    ctx.setLineDash([5, 4])
    ctx.beginPath()
    ctx.moveTo(view.X(-2), view.Y(0))
    ctx.lineTo(view.X(2), view.Y(0))
    ctx.stroke()
    ctx.restore()

    // 当前路径
    ctx.save()
    ctx.strokeStyle = C.accent
    ctx.lineWidth = 2.6
    ctx.beginPath()
    for (let k = 0; k <= 120; k++) {
      const [x, y] = path(k / 120)
      k ? ctx.lineTo(view.X(x), view.Y(y)) : ctx.moveTo(view.X(x), view.Y(y))
    }
    ctx.stroke()
    // 方向箭头（路径中点）
    const [mx, my] = path(0.5)
    const [nx, ny] = path(0.52)
    const ang = Math.atan2(view.Y(ny) - view.Y(my), view.X(nx) - view.X(mx))
    ctx.fillStyle = C.accent
    ctx.beginPath()
    ctx.moveTo(view.X(mx) + 10 * Math.cos(ang), view.Y(my) + 10 * Math.sin(ang))
    ctx.lineTo(view.X(mx) + 10 * Math.cos(ang + 2.6), view.Y(my) + 10 * Math.sin(ang + 2.6))
    ctx.lineTo(view.X(mx) + 10 * Math.cos(ang - 2.6), view.Y(my) + 10 * Math.sin(ang - 2.6))
    ctx.closePath()
    ctx.fill()
    ctx.restore()

    // 端点与奇点
    drawPoint(ctx, view, -2, 0, { color: C.ink, r: 5 })
    drawPoint(ctx, view, 2, 0, { color: C.ink, r: 5 })
    drawLabel(ctx, view.X(-2) - 6, view.Y(0) + 20, 'A = −2', { color: C.ink, align: 'right' })
    drawLabel(ctx, view.X(2) + 6, view.Y(0) + 20, 'B = 2', { color: C.ink })
    if (cfg.value.pole) {
      const [ax, ay] = cfg.value.pole
      ctx.save()
      ctx.strokeStyle = C.indigo
      ctx.lineWidth = 2.4
      const px = view.X(ax)
      const py = view.Y(ay)
      ctx.beginPath()
      ctx.moveTo(px - 6, py - 6)
      ctx.lineTo(px + 6, py + 6)
      ctx.moveTo(px - 6, py + 6)
      ctx.lineTo(px + 6, py - 6)
      ctx.stroke()
      ctx.restore()
      drawLabel(ctx, px + 10, py - 8, '奇点', { color: C.indigo })
    }
  },
  { height: 340, watchSources: [fnKey, bulge] },
)
</script>

<template>
  <DemoFrame title="路径不重要（直到你跨过奇点）">
    <canvas ref="canvas" class="demo-canvas"></canvas>
    <template #controls>
      <label class="ctrl">
        <span class="ctrl-label">被积函数</span>
        <select v-model="fnKey" class="ctrl-select">
          <option v-for="(c, k) in FNS" :key="k" :value="k">{{ c.label }}</option>
        </select>
      </label>
      <ControlSlider label="路径隆起高度" v-model="bulge" :min="-1.8" :max="1.8" :step="0.05" />
    </template>
    <template #readout>
      沿红色路径数值积分：∫f(z)dz ≈ <b>{{ fmt(integral[0], 3) }} {{ integral[1] >= 0 ? '+' : '−' }} {{ fmt(Math.abs(integral[1]), 3) }}i</b>
      <template v-if="fnKey === 'entire'">（理论值：z³/3 在端点之差 = 16/3 ≈ 5.333）</template>
      <template v-else>（上方走 = −πi ≈ −3.1416i，下方走 = +πi）</template>
    </template>
    <template #note>
      先看 z²：把隆起从 −1.8 拖到 1.8，路径的形状千变万化，<b>积分值一位小数都不动</b>——
      处处解析时，积分只认两个端点，像重力做功只认高度差。这就是柯西定理的日常表述。
      再切到 1/z：只要不越过奇点，上方的各条路径彼此仍然同值——但把隆起从正拖到负、
      <b>跨过奇点的一瞬间，积分值从 −πi 跳到 +πi</b>，差恰好 2πi。
      整个复平面上，只有奇点那一个点"存着账"——这笔 2πi 的账，就是下一讲留数定理的全部本钱。
    </template>
  </DemoFrame>
</template>
