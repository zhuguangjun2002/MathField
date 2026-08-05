<script setup>
import { ref, computed } from 'vue'
import { usePlot, makeFitView, clipView, drawArrow, drawLabel, C, fmt } from './plot.js'
import DemoFrame from '../components/DemoFrame.vue'
import ControlSlider from '../components/ControlSlider.vue'
import MathInline from '../components/MathInline.vue'

// 这张图只干一件事：把墨卡托推导里那几个符号，一个一个指出来在哪儿。
// 两个滑杆给终点纬度 φ 与舵向 β，经度 λ 反倒是被它们定出来的 —— λ = (tan β)·y
// 正是推导第三步那条式子，滑杆一拖就等于在验算它
const D = Math.PI / 180
const latDeg = ref(45)
const betaDeg = ref(45)

const phi = computed(() => latDeg.value * D)
const beta = computed(() => betaDeg.value * D)
const tanB = computed(() => Math.tan(beta.value))
// 墨卡托纵坐标：把纬度按 1/cos φ 累积拉伸的结果，无量纲
const yP = computed(() => Math.log(Math.tan(Math.PI / 4 + phi.value / 2)))
const lam = computed(() => tanB.value * yP.value)

// —— 球面的正交投影（从 20°N 上空看），Z > 0 才是朝我们这一面
const CAMLAT = 20 * D
const camLon = computed(() => lam.value / 2)
function globe(p, l) {
  const dl = l - camLon.value
  const cp = Math.cos(p)
  return [
    cp * Math.sin(dl),
    Math.cos(CAMLAT) * Math.sin(p) - Math.sin(CAMLAT) * cp * Math.cos(dl),
    Math.sin(CAMLAT) * Math.sin(p) + Math.cos(CAMLAT) * cp * Math.cos(dl),
  ]
}
function strokeGlobe(ctx, v, pts, { color, width = 1, dash = [] }) {
  ctx.save()
  ctx.strokeStyle = color
  ctx.lineWidth = width
  ctx.setLineDash(dash)
  ctx.beginPath()
  let pen = false
  for (const [p, l] of pts) {
    const [X, Y, Z] = globe(p, l)
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
function dotGlobe(ctx, v, p, l, color, r = 4.5) {
  const [X, Y, Z] = globe(p, l)
  if (Z <= 0) return
  ctx.beginPath()
  ctx.arc(v.X(X), v.Y(Y), r, 0, Math.PI * 2)
  ctx.fillStyle = color
  ctx.fill()
}
// 纬线：纬度不动、经度扫过去（λ 就是沿它量的）
const parallelArc = (p, l0, l1) => {
  const out = []
  for (let i = 0; i <= 120; i++) out.push([p, l0 + ((l1 - l0) * i) / 120])
  return out
}
// 经线：经度不动、纬度扫过去（φ 就是沿它量的）
const meridianArc = (l, p0, p1) => {
  const out = []
  for (let i = 0; i <= 120; i++) out.push([p0 + ((p1 - p0) * i) / 120, l])
  return out
}

const canvas = ref(null)
usePlot(
  canvas,
  (ctx, w, h) => {
    const xA = w * 0.33 // 面板分界
    const xB = w * 0.63

    ctx.save()
    ctx.strokeStyle = '#ddd8cb'
    ctx.lineWidth = 1
    for (const x of [xA, xB]) {
      ctx.beginPath()
      ctx.moveTo(x, 6)
      ctx.lineTo(x, h - 6)
      ctx.stroke()
    }
    ctx.restore()

    drawLabel(ctx, 8, 18, '① 球面上：φ 纬度、λ 经度', { color: C.ink, size: 12.5 })
    drawLabel(ctx, xA + 10, 18, '② 走一小段：β 舵向', { color: C.ink, size: 12.5 })
    drawLabel(ctx, xB + 10, 18, '③ 纸上：横 λ、纵 y', { color: C.ink, size: 12.5 })

    // ———————————————— ① 球面
    const vg = makeFitView(w, h, 0, 0, 2.35, 2.35, { l: 6, r: w - xA + 6, t: 26, b: 24 })
    ctx.save()
    clipView(ctx, vg)
    const cx = vg.X(0)
    const cy = vg.Y(0)
    const rad = vg.X(1) - vg.X(0)
    ctx.beginPath()
    ctx.arc(cx, cy, rad, 0, Math.PI * 2)
    ctx.fillStyle = 'rgba(51, 81, 143, 0.05)'
    ctx.fill()
    ctx.strokeStyle = '#c9c3b5'
    ctx.lineWidth = 1.2
    ctx.stroke()
    for (let k = 0; k < 12; k++)
      strokeGlobe(ctx, vg, meridianArc(k * 30 * D, -85 * D, 85 * D), { color: '#dcd6c8' })
    for (const p of [-60, -30, 30, 60])
      strokeGlobe(ctx, vg, parallelArc(p * D, 0, 2 * Math.PI), { color: '#dcd6c8' })
    strokeGlobe(ctx, vg, parallelArc(0, 0, 2 * Math.PI), { color: '#a9a294', width: 1.5 }) // 赤道
    strokeGlobe(ctx, vg, meridianArc(0, -85 * D, 85 * D), { color: '#a9a294', width: 1.5 }) // 本初子午线
    // 纬线圈：半径只有 R cos φ —— 一度经度在这里缩短的全部原因
    strokeGlobe(ctx, vg, parallelArc(phi.value, 0, 2 * Math.PI), { color: C.gold, width: 1.6, dash: [4, 3] })
    // λ = 沿赤道量的角；φ = 沿经线量的角
    strokeGlobe(ctx, vg, parallelArc(0, 0, lam.value), { color: C.gold, width: 3.4 })
    strokeGlobe(ctx, vg, meridianArc(lam.value, 0, phi.value), { color: C.indigo, width: 3.4 })
    // 半径 R：轮廓圆的圆心到边，就是一条真半径
    ctx.save()
    ctx.setLineDash([4, 3])
    ctx.strokeStyle = C.soft
    ctx.lineWidth = 1.2
    ctx.beginPath()
    ctx.moveTo(cx, cy)
    ctx.lineTo(cx - rad, cy)
    ctx.stroke()
    ctx.restore()
    drawLabel(ctx, cx - rad * 0.55, cy - 6, 'R', { color: C.soft, size: 12 })
    dotGlobe(ctx, vg, 0, 0, C.accent, 4)
    dotGlobe(ctx, vg, phi.value, lam.value, C.accent, 5)
    // 标签贴在两段弧的中点上
    const [lx, ly, lz] = globe(0, lam.value / 2)
    if (lz > 0) drawLabel(ctx, vg.X(lx), vg.Y(ly) + 16, 'λ', { color: C.gold, size: 15, align: 'center' })
    const [px, py, pz] = globe(phi.value / 2, lam.value)
    if (pz > 0) drawLabel(ctx, vg.X(px) + 8, vg.Y(py) + 5, 'φ', { color: C.indigo, size: 15 })
    // 纬线圈的标签贴在正对镜头那一侧，保证永远看得见
    const [qx, qy] = globe(phi.value, camLon.value)
    // 贴在纬线圈上方：φ 小的时候纬线圈紧挨赤道，标签放下面会压到 λ 那段弧
    drawLabel(ctx, vg.X(qx), vg.Y(qy) - 8, 'R cos φ', { color: C.gold, size: 11.5, align: 'center' })
    ctx.restore()
    drawLabel(ctx, 8, h - 8, '金弧 = λ，蓝弧 = φ，虚线圈半径 = R cos φ', { color: C.soft, size: 11 })

    // ———————————————— ② 球面上走一小段：直角三角形
    const a = 1 // 北向边（R dφ）
    const b = tanB.value // 东向边（R cos φ dλ）：两边之比就是 tan β
    const vt = makeFitView(w, h, b / 2, a / 2, b + 1.15, a + 1.05, {
      l: xA + 8,
      r: w - xB + 8,
      t: 30,
      b: 26,
    })
    ctx.save()
    clipView(ctx, vt)
    const S = [0, 0]
    const N = [0, a]
    const E = [b, a]
    // 斜边 = 航线
    ctx.strokeStyle = C.accent
    ctx.lineWidth = 3
    ctx.beginPath()
    ctx.moveTo(vt.X(S[0]), vt.Y(S[1]))
    ctx.lineTo(vt.X(E[0]), vt.Y(E[1]))
    ctx.stroke()
    drawArrow(ctx, vt, S[0], S[1], N[0], N[1], { color: C.indigo, width: 2.2, head: 8 })
    drawArrow(ctx, vt, N[0], N[1], E[0], E[1], { color: C.gold, width: 2.2, head: 8 })
    // 直角记号
    ctx.strokeStyle = C.soft
    ctx.lineWidth = 1.2
    const q = 9
    ctx.beginPath()
    ctx.moveTo(vt.X(0) + q, vt.Y(a))
    ctx.lineTo(vt.X(0) + q, vt.Y(a) + q)
    ctx.lineTo(vt.X(0), vt.Y(a) + q)
    ctx.stroke()
    // β：航线与正北的夹角，画在起点
    ctx.strokeStyle = C.accent
    ctx.lineWidth = 1.6
    const rArc = Math.max(16, Math.min(34, (vt.Y(0) - vt.Y(a)) * 0.55))
    ctx.beginPath()
    ctx.arc(vt.X(0), vt.Y(0), rArc, -Math.PI / 2, -Math.PI / 2 + beta.value)
    ctx.stroke()
    ctx.restore()
    // 文字放在裁剪之外画：三角形被压扁时，贴边的标签才不会被切掉
    drawLabel(ctx, vt.X(0) + rArc * 0.55, vt.Y(0) - rArc - 4, 'β', { color: C.accent, size: 15 })
    drawLabel(ctx, vt.X(0) - 6, vt.Y(a / 2) + 4, 'R dφ', { color: C.indigo, size: 12, align: 'right' })
    drawLabel(ctx, vt.X(b / 2), vt.Y(a) - 10, 'R cos φ dλ', { color: C.gold, size: 12, align: 'center' })
    // 贴在斜边中点右侧：β 小的时候斜边几乎竖直，标在下端会和 β 撞上
    drawLabel(ctx, vt.X(b / 2) + 12, vt.Y(a / 2) + 4, '航线', { color: C.accent, size: 12 })
    drawLabel(ctx, xA + 10, h - 8, '蓝 = 往北走，金 = 往东走', { color: C.soft, size: 11 })

    // ———————————————— ③ 纸上：λ 与 y
    const vm = makeFitView(w, h, lam.value / 2, yP.value / 2, lam.value * 1.18, yP.value * 1.45, {
      l: xB + 34,
      r: 10,
      t: 30,
      b: 30,
    })
    ctx.save()
    clipView(ctx, vm)
    ctx.strokeStyle = '#e6e1d4'
    ctx.lineWidth = 1
    for (let k = 0; k * 30 * D <= vm.x1; k++) {
      const px2 = vm.X(k * 30 * D)
      ctx.beginPath()
      ctx.moveTo(px2, vm.pad.t)
      ctx.lineTo(px2, vm.pad.t + vm.ih)
      ctx.stroke()
    }
    ctx.restore()
    // 纬线：等纬度间隔在纸上越往北越宽 —— 这就是 y 的全部内容
    for (let p = 0; p <= 75; p += 15) {
      const yy = Math.log(Math.tan(Math.PI / 4 + (p * D) / 2))
      if (yy > vm.y1) continue
      const py2 = vm.Y(yy)
      ctx.save()
      ctx.strokeStyle = '#e6e1d4'
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(vm.pad.l, py2)
      ctx.lineTo(vm.pad.l + vm.iw, py2)
      ctx.stroke()
      ctx.restore()
      drawLabel(ctx, vm.pad.l - 5, py2 + 4, p === 0 ? '赤道' : `${p}°N`, {
        color: C.soft,
        size: 10.5,
        align: 'right',
      })
    }
    ctx.save()
    clipView(ctx, vm)
    // 恒向线：在这套坐标里就是一条直线
    ctx.strokeStyle = C.accent
    ctx.lineWidth = 3
    ctx.beginPath()
    ctx.moveTo(vm.X(0), vm.Y(0))
    ctx.lineTo(vm.X(lam.value), vm.Y(yP.value))
    ctx.stroke()
    // 线上截一小段：竖直 dy、水平 dλ，夹角还是 β
    const t0 = 0.34
    const dy = 0.3 * yP.value
    const Ax = t0 * lam.value
    const Ay = t0 * yP.value
    drawArrow(ctx, vm, Ax, Ay, Ax, Ay + dy, { color: C.indigo, width: 2, head: 7 })
    drawArrow(ctx, vm, Ax, Ay + dy, Ax + dy * tanB.value, Ay + dy, { color: C.gold, width: 2, head: 7 })
    ctx.strokeStyle = C.accent
    ctx.lineWidth = 1.6
    const rArc2 = Math.max(14, Math.min(26, (vm.Y(Ay) - vm.Y(Ay + dy)) * 0.6))
    ctx.beginPath()
    ctx.arc(vm.X(Ax), vm.Y(Ay), rArc2, -Math.PI / 2, -Math.PI / 2 + beta.value)
    ctx.stroke()
    ctx.beginPath()
    ctx.arc(vm.X(lam.value), vm.Y(yP.value), 5, 0, Math.PI * 2)
    ctx.fillStyle = C.accent
    ctx.fill()
    ctx.beginPath()
    ctx.arc(vm.X(0), vm.Y(0), 4, 0, Math.PI * 2)
    ctx.fillStyle = C.accent
    ctx.fill()
    ctx.restore()
    // 同样把文字挪出裁剪区
    drawLabel(ctx, vm.X(Ax) + rArc2 * 0.5, vm.Y(Ay) - rArc2 - 3, 'β', { color: C.accent, size: 14 })
    drawLabel(ctx, vm.X(Ax) - 5, vm.Y(Ay + dy / 2) + 4, 'dy', {
      color: C.indigo,
      size: 11.5,
      align: 'right',
    })
    drawLabel(ctx, vm.X(Ax + (dy * tanB.value) / 2), vm.Y(Ay + dy) - 8, 'dλ', {
      color: C.gold,
      size: 11.5,
      align: 'center',
    })
    drawLabel(ctx, vm.pad.l + vm.iw, vm.pad.t + vm.ih + 20, 'λ →', {
      color: C.soft,
      size: 11.5,
      align: 'right',
    })
    drawLabel(ctx, xB + 10, 34, 'y ↑', { color: C.soft, size: 11.5 })
    drawLabel(ctx, xB + 10, h - 8, '纬线越往北越稀 —— 这就是 y', { color: C.soft, size: 11 })
  },
  { height: 380, watchSources: [latDeg, betaDeg] },
)
</script>

<template>
  <DemoFrame title="先认符号：φ、λ、β、y 各是什么">
    <canvas ref="canvas" class="demo-canvas"></canvas>
    <template #controls>
      <ControlSlider label="终点纬度 φ（°N）" v-model="latDeg" :min="10" :max="55" :step="1" />
      <ControlSlider label="舵向 β（° 从正北量）" v-model="betaDeg" :min="15" :max="65" :step="1" />
    </template>
    <template #readout>
      纸上纵坐标 <MathInline tex="y = \ln\tan(\pi/4 + \varphi/2)" /> = <b>{{ fmt(yP, 3) }}</b>
      <br />
      到达经度 <MathInline tex="\lambda = (\tan\beta)\,y" /> = <b>{{ fmt(lam, 3) }}</b> rad =
      <b>{{ fmt(lam / D, 1) }}°E</b>
    </template>
    <template #note>
      <p><b>四个符号，一个一个认</b>：</p>
      <ul>
        <li>
          <MathInline tex="\varphi" />（读 fai，<b>纬度</b>）——从赤道往北量的角，图①里那段<b>蓝弧</b>。
          单位是角度（弧度）。赤道是 0°，北极是 90°。
        </li>
        <li>
          <MathInline tex="\lambda" />（读 lambda，<b>经度</b>）——沿赤道往东量的角，图①里那段<b>金弧</b>。
        </li>
        <li>
          <MathInline tex="R" />——<b>地球半径</b>。留意图①那个金色虚线圈：纬度
          <MathInline tex="\varphi" /> 处的纬线圈半径只有 <MathInline tex="R\cos\varphi" />，
          所以"东移一度经度"在那里走的实际距离是 <MathInline tex="R\cos\varphi\,d\lambda" />，
          比赤道上短。<MathInline tex="\cos\varphi" /> 这个因子，全部来历就在这儿。
        </li>
        <li>
          <MathInline tex="\beta" />（读 beta，<b>舵向</b>）——航线与<b>正北</b>的夹角，也就是罗盘上锁死的那个读数。
          图②把航线上一小段拆成两条直角边：往北走 <MathInline tex="R\,d\varphi" />（蓝）、
          往东走 <MathInline tex="R\cos\varphi\,d\lambda" />（金）。<b>对边比邻边</b>就是
          <MathInline tex="\tan\beta" />——推导里那个式子不过是这张小三角形的读数。
        </li>
        <li>
          <MathInline tex="y" />——<b>纸上的纵坐标，不是纬度</b>。它是个没有单位的纯数，
          由"经线画等距 + 要保角"逼出来的（<MathInline tex="dy = d\varphi/\cos\varphi" /> 积起来）。
          图③左边那排纬线标尺就是它：<b>同样 15° 一格，越往北在纸上越宽</b>。
        </li>
      </ul>
      <p>
        对着图②和图③看同一个 <MathInline tex="\beta" />：球面上那一小段的舵向角，搬到纸上<b>一分没变</b>
        （这正是保角），可两条直角边的长度换了人——
        <MathInline tex="R\,d\varphi" /> 变成 <MathInline tex="dy" />、
        <MathInline tex="R\cos\varphi\,d\lambda" /> 变成 <MathInline tex="d\lambda" />。
        地球半径 <MathInline tex="R" /> 两边都有，一相除就消了，所以纸上根本见不到它。
        于是同一个 <MathInline tex="\tan\beta" /> 有了两种写法，一联立，
        <MathInline tex="y" /> 该长什么样就再没得选。
      </p>
      <p>
        两个滑杆给的是<b>你锁死的舵向</b> <MathInline tex="\beta" /> 和<b>打算北上到哪条纬度</b>
        <MathInline tex="\varphi" />——到达的经度 <MathInline tex="\lambda" /> 不用你选，
        是被算出来的：读数区那行 <MathInline tex="\lambda = (\tan\beta)\,y" />
        就是推导第三步的结论本身，拖着它等于在验算。拖 <MathInline tex="\beta" />
        看图②③里两个角一起转（永远相等，这就是保角）；拖 <MathInline tex="\varphi" />
        看图③纬线标尺怎么被越拉越开，而<b>那条航线始终是直的</b>——船长要的就是这一件事。
      </p>
    </template>
  </DemoFrame>
</template>
