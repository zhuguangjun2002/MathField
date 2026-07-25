<script setup>
import { ref, computed } from 'vue'
import { usePlot, makeFitView, clipView, drawLabel, C, fmt } from './plot.js'
import DemoFrame from '../components/DemoFrame.vue'
import ControlSlider from '../components/ControlSlider.vue'

const RE = 6371 // 地球半径 km
const D = Math.PI / 180

const latB = ref(50) // 终点纬度
const lonB = ref(120) // 终点经度（起点取 0°，赤道上）
const camLon = ref(55) // 地球转动

// 墨卡托的纵坐标：把纬度按 1/cos φ 累积拉伸，才换来保角
const yOf = (phi) => Math.log(Math.tan(Math.PI / 4 + phi / 2))
const phiOf = (y) => 2 * Math.atan(Math.exp(y)) - Math.PI / 2

const phiB = computed(() => latB.value * D)
const lamB = computed(() => lonB.value * D)
const yB = computed(() => yOf(phiB.value))
// 恒向线：λ 与 y 成正比，斜率就是舵向的正切
const slope = computed(() => lamB.value / yB.value)
const beta = computed(() => Math.atan(slope.value)) // 舵向（从正北量起）

// 恒向线：给一段 y，返回球面上的 (φ, λ)
function rhumb(y) {
  return [phiOf(y), slope.value * y]
}
const rhumbPath = computed(() => {
  const out = []
  for (let i = 0; i <= 300; i++) out.push(rhumb((yB.value * i) / 300))
  return out
})
// 舵向不改，一直开下去：绕着极点转无穷多圈也到不了极点
const rhumbTail = computed(() => {
  const out = []
  for (let i = 0; i <= 1400; i++) out.push(rhumb(yB.value + ((4.6 - yB.value) * i) / 1400))
  return out
})
// 恒向线穿过每条 30° 经线的地方：每一处的交角都相同
const crossings = computed(() => {
  const out = []
  for (let k = 1; k * 30 * D <= lamB.value + 1e-9; k++) out.push(rhumb((k * 30 * D) / slope.value))
  return out
})

// 大圆（最短航线）：球面上两点间的球面线性插值
const greatPath = computed(() => {
  const a = [1, 0, 0]
  const b = [
    Math.cos(phiB.value) * Math.cos(lamB.value),
    Math.cos(phiB.value) * Math.sin(lamB.value),
    Math.sin(phiB.value),
  ]
  const dot = a[0] * b[0] + a[1] * b[1] + a[2] * b[2]
  const om = Math.acos(Math.max(-1, Math.min(1, dot)))
  const out = []
  for (let i = 0; i <= 240; i++) {
    const t = i / 240
    const s1 = Math.sin((1 - t) * om) / Math.sin(om)
    const s2 = Math.sin(t * om) / Math.sin(om)
    const p = [a[0] * s1 + b[0] * s2, a[1] * s1 + b[1] * s2, a[2] * s1 + b[2] * s2]
    out.push([Math.asin(Math.max(-1, Math.min(1, p[2]))), Math.atan2(p[1], p[0])])
  }
  return { pts: out, omega: om }
})

// 沿路径某处的舵向（正北为 0，顺时针为正）
function bearingAt(pts, i) {
  const [p1, l1] = pts[i]
  const [p2, l2] = pts[i + 1]
  const b = Math.atan2((l2 - l1) * Math.cos((p1 + p2) / 2), p2 - p1) / D
  return (b + 360) % 360
}
const gcBearing0 = computed(() => bearingAt(greatPath.value.pts, 0))
const gcBearing1 = computed(() => bearingAt(greatPath.value.pts, 238))
const rhumbKm = computed(() => (RE * phiB.value) / Math.cos(beta.value))
const greatKm = computed(() => RE * greatPath.value.omega)
const extraPct = computed(() => ((rhumbKm.value / greatKm.value - 1) * 100))

// —— 地球：正交投影（从 25°N 上空看），Z > 0 才是朝向我们这一面
const CAMLAT = 25 * D
function globe(phi, lam) {
  const dl = lam - camLon.value * D
  const cp = Math.cos(phi)
  return [
    cp * Math.sin(dl),
    Math.cos(CAMLAT) * Math.sin(phi) - Math.sin(CAMLAT) * cp * Math.cos(dl),
    Math.sin(CAMLAT) * Math.sin(phi) + Math.cos(CAMLAT) * cp * Math.cos(dl),
  ]
}
function strokeGlobe(ctx, v, pts, { color, width = 2, dash = [] }) {
  ctx.save()
  ctx.strokeStyle = color
  ctx.lineWidth = width
  ctx.setLineDash(dash)
  ctx.beginPath()
  let pen = false
  for (const [phi, lam] of pts) {
    const [X, Y, Z] = globe(phi, lam)
    if (Z <= 0) {
      pen = false
      continue
    }
    pen ? ctx.lineTo(v.X(X), v.Y(Y)) : ctx.moveTo(v.X(X), v.Y(Y))
    pen = true
  }
  ctx.stroke()
  ctx.restore()
}
function dotGlobe(ctx, v, phi, lam, color, r = 4.5) {
  const [X, Y, Z] = globe(phi, lam)
  if (Z <= 0) return
  ctx.beginPath()
  ctx.arc(v.X(X), v.Y(Y), r, 0, Math.PI * 2)
  ctx.fillStyle = color
  ctx.fill()
}

function meridian(lam) {
  const out = []
  for (let i = 0; i <= 120; i++) out.push([(-85 + (170 * i) / 120) * D, lam])
  return out
}
function parallel(phi) {
  const out = []
  for (let i = 0; i <= 180; i++) out.push([phi, (360 * i * D) / 180])
  return out
}

const canvas = ref(null)
usePlot(
  canvas,
  (ctx, w, h) => {
    const half = w * 0.42
    const vg = makeFitView(w, h, 0, 0, 2.3, 2.3, { l: 8, r: w - half + 6, t: 28, b: 8 })
    const vm = makeFitView(w, h, lamB.value / 2, yB.value / 2, lamB.value + 0.85, yB.value + 1.1, {
      l: half + 10,
      r: 8,
      t: 28,
      b: 8,
    })

    ctx.save()
    ctx.strokeStyle = '#ddd8cb'
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(half + 2, 6)
    ctx.lineTo(half + 2, h - 6)
    ctx.stroke()
    ctx.restore()

    drawLabel(ctx, 10, 20, '真实球面：等角航线是螺旋', { color: C.ink, size: 13 })
    drawLabel(ctx, half + 12, 20, '墨卡托海图：同一条线，成了直线', { color: C.ink, size: 13 })

    // —— 左：地球
    ctx.save()
    clipView(ctx, vg)
    const cx = vg.X(0)
    const cy = vg.Y(0)
    const rad = vg.X(1) - vg.X(0)
    ctx.beginPath()
    ctx.arc(cx, cy, rad, 0, Math.PI * 2)
    ctx.fillStyle = 'rgba(51, 81, 143, 0.06)'
    ctx.fill()
    ctx.strokeStyle = '#c9c3b5'
    ctx.lineWidth = 1.2
    ctx.stroke()
    for (let k = 0; k < 12; k++) strokeGlobe(ctx, vg, meridian(k * 30 * D), { color: '#c9c3b5', width: 1 })
    for (const p of [-60, -30, 0, 30, 60])
      strokeGlobe(ctx, vg, parallel(p * D), { color: p === 0 ? '#a9a294' : '#d5cfc1', width: p === 0 ? 1.4 : 1 })
    strokeGlobe(ctx, vg, rhumbTail.value, { color: 'rgba(176, 125, 43, 0.45)', width: 1.4, dash: [3, 3] })
    strokeGlobe(ctx, vg, greatPath.value.pts, { color: C.indigo, width: 2.4, dash: [6, 4] })
    strokeGlobe(ctx, vg, rhumbPath.value, { color: C.gold, width: 3 })
    for (const [p, l] of crossings.value) dotGlobe(ctx, vg, p, l, C.gold, 3)
    dotGlobe(ctx, vg, 0, 0, C.accent)
    dotGlobe(ctx, vg, phiB.value, lamB.value, C.accent)
    ctx.restore()

    // —— 右：墨卡托
    ctx.save()
    clipView(ctx, vm)
    ctx.strokeStyle = '#ddd8cb'
    ctx.lineWidth = 1
    for (let k = 0; k * 30 * D < vm.x1; k++) {
      const px = vm.X(k * 30 * D)
      ctx.beginPath()
      ctx.moveTo(px, vm.pad.t)
      ctx.lineTo(px, vm.pad.t + vm.ih)
      ctx.stroke()
    }
    for (let p = 0; p <= 80; p += 15) {
      const py = vm.Y(yOf(p * D))
      if (py < vm.pad.t || py > vm.pad.t + vm.ih) continue
      ctx.beginPath()
      ctx.moveTo(vm.pad.l, py)
      ctx.lineTo(vm.pad.l + vm.iw, py)
      ctx.stroke()
      drawLabel(ctx, vm.pad.l + 4, py - 4, p === 0 ? '赤道' : `${p}°N`, { color: C.soft, size: 11 })
    }
    const strokeMerc = (pts, opt) => {
      ctx.save()
      ctx.strokeStyle = opt.color
      ctx.lineWidth = opt.width
      ctx.setLineDash(opt.dash || [])
      ctx.beginPath()
      pts.forEach(([p, l], i) => {
        const px = vm.X(l)
        const py = vm.Y(yOf(p))
        i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py)
      })
      ctx.stroke()
      ctx.restore()
    }
    strokeMerc(greatPath.value.pts, { color: C.indigo, width: 2.4, dash: [6, 4] })
    strokeMerc(rhumbPath.value, { color: C.gold, width: 3 })
    for (const [p, l] of crossings.value) {
      ctx.beginPath()
      ctx.arc(vm.X(l), vm.Y(yOf(p)), 3, 0, Math.PI * 2)
      ctx.fillStyle = C.gold
      ctx.fill()
    }
    for (const [p, l] of [
      [0, 0],
      [phiB.value, lamB.value],
    ]) {
      ctx.beginPath()
      ctx.arc(vm.X(l), vm.Y(yOf(p)), 4.5, 0, Math.PI * 2)
      ctx.fillStyle = C.accent
      ctx.fill()
    }
    ctx.restore()

    drawLabel(ctx, vm.pad.l + 6, vm.pad.t + vm.ih - 8, '金 = 恒向线（罗盘直开）  蓝虚 = 大圆（最短）', {
      color: C.ink,
      size: 12,
    })
  },
  { height: 400, watchSources: [latB, lonB, camLon] },
)
</script>

<template>
  <DemoFrame title="墨卡托投影：为什么航海图非得保角不可">
    <canvas ref="canvas" class="demo-canvas"></canvas>
    <template #controls>
      <ControlSlider label="终点纬度 °N" v-model="latB" :min="10" :max="70" :step="1" />
      <ControlSlider label="终点经度 °E" v-model="lonB" :min="30" :max="170" :step="1" />
      <ControlSlider label="转动地球 °" v-model="camLon" :min="-60" :max="180" :step="1" />
    </template>
    <template #readout>
      恒向线：舵向<b>恒为 {{ fmt(beta / (Math.PI / 180), 1) }}°</b
      >，航程 <b>{{ Math.round(rhumbKm) }} km</b>
      <br />
      大圆：舵向 <b>{{ fmt(gcBearing0, 1) }}° → {{ fmt(gcBearing1, 1) }}°</b
      >（一路都在变），航程 <b>{{ Math.round(greatKm) }} km</b>，恒向线多走 <b>{{ fmt(extraPct, 1) }}%</b>
    </template>
    <template #note>
      从赤道上的红点开航，去另一个红点。<b>金线</b>是"罗盘锁死一个方向一直开"的航线（恒向线）：
      金点标出它穿过每条经线的地方——每一处交角都一模一样，这正是船长要的：舵向不用改。
      虚金线是把这个舵向<b>一直保持下去</b>的样子：它绕着北极转无穷多圈也到不了极点，
      这条螺旋就是恒向线的真身。而到了右边的墨卡托图上，
      螺旋<b>成了一条直尺画得出的直线</b>。1569 年墨卡托要的就是这个：
      <b>在图上用直尺连起两港，量一次角，照着开就到</b>。
      代价看右图的纬线间距——同样是 15° 一格，越往北在图上越宽，格陵兰因此被吹成了非洲大小。
      面积全毁了，角度一分未失。<b>蓝虚线</b>是同两点间真正的最短航线（大圆）：读数里它总更短，
      但它的舵向一路在变（{{ fmt(gcBearing0, 0) }}° 变到 {{ fmt(gcBearing1, 0) }}°），
      六分仪时代没人开得了——所以人类花了三百年走那条"多绕一点但不用动脑"的金线。
    </template>
  </DemoFrame>
</template>
