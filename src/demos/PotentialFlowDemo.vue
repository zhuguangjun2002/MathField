<script setup>
import { ref, computed } from 'vue'
import { usePlot, makeFitView, clipView, contourSegments, sampleGrid, drawLabel, C, fmt } from './plot.js'
import DemoFrame from '../components/DemoFrame.vue'
import ControlSlider from '../components/ControlSlider.vue'
import MathInline from '../components/MathInline.vue'

// 每个场景都是一个解析函数 f = φ + iψ：实部当速度势，虚部当流函数
const SCENES = {
  uniform: {
    label: 'f(z) = z（匀速流 / 匀强电场）',
    phi: (x) => x,
    psi: (x, y) => y,
    dphi: 0.4,
    dpsi: 0.4,
    span: 4.8,
  },
  corner: {
    label: 'f(z) = z²（直角墙角里的流动）',
    phi: (x, y) => x * x - y * y,
    psi: (x, y) => 2 * x * y,
    dphi: 1.3,
    dpsi: 1.3,
    span: 4.4,
  },
  source: {
    label: 'f(z) = ln z（点源 / 点电荷）',
    phi: (x, y) => 0.5 * Math.log(x * x + y * y),
    psi: (x, y) => Math.atan2(y, x),
    dphi: 0.3,
    dpsi: Math.PI / 10,
    span: 4.8,
    hole: 0.13,
  },
  vortex: {
    label: 'f(z) = −i·ln z（涡旋 / 通电导线）',
    phi: (x, y) => Math.atan2(y, x),
    psi: (x, y) => -0.5 * Math.log(x * x + y * y),
    dphi: Math.PI / 10,
    dpsi: 0.3,
    span: 4.8,
    hole: 0.13,
  },
  cylinder: {
    label: 'f(z) = z + 1/z（绕圆柱的流动）',
    phi: (x, y) => x * (1 + 1 / (x * x + y * y)),
    psi: (x, y) => y * (1 - 1 / (x * x + y * y)),
    dphi: 0.5,
    dpsi: 0.5,
    span: 5.6,
    body: 1,
  },
}

const key = ref('cylinder')
const px = ref(0.9)
const py = ref(1.3)
const sc = computed(() => SCENES[key.value])

const N = 132
let cache = { key: '' }
function grids(v) {
  const id = `${key.value}|${fmt(v.x0, 4)}|${fmt(v.y0, 4)}|${fmt(v.x1, 4)}`
  if (cache.key === id) return cache
  cache = {
    key: id,
    P: sampleGrid(sc.value.phi, N, v.x0, v.x1, v.y0, v.y1),
    S: sampleGrid(sc.value.psi, N, v.x0, v.x1, v.y0, v.y1),
  }
  return cache
}

function contours(ctx, v, g, step, color, width) {
  const hole = sc.value.hole || sc.value.body || 0
  ctx.save()
  ctx.strokeStyle = color
  ctx.lineWidth = width
  ctx.beginPath()
  contourSegments(
    g, N, v.x0, v.x1, v.y0, v.y1, step,
    (ax, ay, bx, by) => {
      ctx.moveTo(v.X(ax), v.Y(ay))
      ctx.lineTo(v.X(bx), v.Y(by))
    },
    { skip: hole ? (x, y) => Math.hypot(x, y) < hole : null },
  )
  ctx.stroke()
  ctx.restore()
}

// —— 探针处全用 float64 现算：梯度、夹角、两个拉普拉斯
const probe = computed(() => {
  const x = px.value
  const y = py.value
  const h = 1e-3
  const f = sc.value.phi
  const g = sc.value.psi
  const gp = [(f(x + h, y) - f(x - h, y)) / (2 * h), (f(x, y + h) - f(x, y - h)) / (2 * h)]
  const gs = [(g(x + h, y) - g(x - h, y)) / (2 * h), (g(x, y + h) - g(x, y - h)) / (2 * h)]
  const H = 1e-2
  const lap = (u) => (u(x + H, y) + u(x - H, y) + u(x, y + H) + u(x, y - H) - 4 * u(x, y)) / (H * H)
  const np = Math.hypot(gp[0], gp[1])
  const ns = Math.hypot(gs[0], gs[1])
  const cos = (gp[0] * gs[0] + gp[1] * gs[1]) / (np * ns || 1)
  return {
    gp,
    gs,
    speed: np,
    angle: (Math.acos(Math.max(-1, Math.min(1, cos))) * 180) / Math.PI,
    lapPhi: lap(f),
    lapPsi: lap(g),
    inside: Math.hypot(x, y) < (sc.value.hole || sc.value.body || 0) * 1.02,
  }
})

const canvas = ref(null)
usePlot(
  canvas,
  (ctx, w, h) => {
    const v = makeFitView(w, h, 0, 0, sc.value.span, sc.value.span, { l: 10, r: 10, t: 26, b: 10 })
    const G = grids(v)

    ctx.save()
    clipView(ctx, v)
    contours(ctx, v, G.P, sc.value.dphi, 'rgba(51, 81, 143, 0.55)', 1.2) // 等势线
    contours(ctx, v, G.S, sc.value.dpsi, 'rgba(178, 58, 47, 0.8)', 1.6) // 流线

    if (sc.value.body) {
      ctx.beginPath()
      ctx.arc(v.X(0), v.Y(0), v.X(sc.value.body) - v.X(0), 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(38, 35, 44, 0.14)'
      ctx.fill()
      ctx.strokeStyle = C.ink
      ctx.lineWidth = 2
      ctx.stroke()
    }
    if (sc.value.hole) {
      ctx.beginPath()
      ctx.arc(v.X(0), v.Y(0), 5, 0, Math.PI * 2)
      ctx.fillStyle = C.ink
      ctx.fill()
    }

    // 探针：画出两族曲线在该点的切向，看它们是不是永远垂直
    if (!probe.value.inside) {
      const p = probe.value
      const seg = (dir, color) => {
        const n = Math.hypot(dir[0], dir[1]) || 1
        const ux = (dir[0] / n) * 0.55
        const uy = (dir[1] / n) * 0.55
        ctx.save()
        ctx.strokeStyle = color
        ctx.lineWidth = 3
        ctx.beginPath()
        ctx.moveTo(v.X(px.value - ux), v.Y(py.value - uy))
        ctx.lineTo(v.X(px.value + ux), v.Y(py.value + uy))
        ctx.stroke()
        ctx.restore()
      }
      seg(p.gp, C.accent) // 流线切向 = 速度方向 = ∇φ
      seg(p.gs, C.indigo) // 等势线切向 = ∇ψ
      ctx.beginPath()
      ctx.arc(v.X(px.value), v.Y(py.value), 4.5, 0, Math.PI * 2)
      ctx.fillStyle = C.green
      ctx.fill()
    }
    ctx.restore()

    drawLabel(ctx, 10, 18, '朱红 = 流线（ψ = 常数）', { color: C.accent, size: 13 })
    drawLabel(ctx, w - 10, 18, '靛蓝 = 等势线（φ = 常数）', { color: C.indigo, size: 13, align: 'right' })
  },
  { height: 400, watchSources: [key, px, py] },
)
</script>

<template>
  <DemoFrame title="势函数与流函数：一个解析函数就是一整个二维流场">
    <canvas ref="canvas" class="demo-canvas"></canvas>
    <template #controls>
      <label class="ctrl">
        <span class="ctrl-label">复势 f(z)</span>
        <select v-model="key" class="ctrl-select">
          <option v-for="(s, k) in SCENES" :key="k" :value="k">{{ s.label }}</option>
        </select>
      </label>
      <ControlSlider label="探针 x" v-model="px" :min="-2.2" :max="2.2" :step="0.05" />
      <ControlSlider label="探针 y" v-model="py" :min="-2.2" :max="2.2" :step="0.05" />
    </template>
    <template #readout>
      探针处流速 <MathInline tex="|\nabla\varphi|" /> = <b>{{ fmt(probe.speed, 3) }}</b
      >，两族夹角实测 <b>{{ fmt(probe.angle, 2) }}°</b>
      <br />
      现算拉普拉斯：<MathInline tex="\Delta\varphi" /> = <b>{{ probe.lapPhi.toExponential(1) }}</b
      >，<MathInline tex="\Delta\psi" /> = <b>{{ probe.lapPsi.toExponential(1) }}</b
      >（都是数值噪声级别的 0）
    </template>
    <template #note>
      随便挑一个解析函数，把它的<b>实部当电势/速度势 φ、虚部当流函数 ψ</b>，画出两族等值线——
      得到的从来不是一团乱麻，而总是一幅像模像样的物理图：均匀流、墙角流、点电荷的辐射场、
      涡旋、绕圆柱的流动。拖探针在图上走一圈，读数里那个夹角<b>钉死在 90°</b>：
      流线与等势线处处正交（因为 f 保角，而它在 w 平面的原像就是横线族与竖线族）。
      更要紧的是后两个读数：<MathInline tex="\Delta\varphi = \Delta\psi = 0" /> 处处成立。
      <b>无旋</b>（流体不打转）保证速度势 φ 存在，<b>无源</b>（不凭空冒出流体）保证流函数 ψ 存在，
      而"φ 与 ψ 来自同一个 f"这件事，展开就是柯西-黎曼方程本身。
      所以不是复分析恰好能用于二维流场——是二维无旋无源场<b>本来就是解析函数写的</b>。
      静电场同理：把 φ 读作电势，朱红线就是电力线。
      单挑<b>涡旋</b>那一档看一眼：它的 <MathInline tex="\varphi = \theta" /> 绕原点走一圈会多出
      <MathInline tex="2\pi" />，回不到原值——所以那里的势只在"挖掉原点"的区域里局部成立。
      这个"绕一圈对不上"的缺口不是瑕疵，它正是下一讲闭合回路积分不为零的源头。
    </template>
  </DemoFrame>
</template>
