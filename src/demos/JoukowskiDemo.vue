<script setup>
import { ref, computed } from 'vue'
import { usePlot, makeFitView, clipView, contourSegments, sampleGrid, drawLabel, C, fmt } from './plot.js'
import DemoFrame from '../components/DemoFrame.vue'
import ControlSlider from '../components/ControlSlider.vue'
import MathInline from '../components/MathInline.vue'

// 茹科夫斯基构型：圆心 μ、半径 R = |1 − μ|，圆必过 z = 1（那里映出尖锐后缘）
const thick = ref(12) // 厚度 %：μ 往左挪
const camber = ref(8) // 弯度 %：μ 往上挪
const alphaDeg = ref(4) // 迎角（度）
const morph = ref(100) // 变形进度 %：w = z + t/z 的 t

const mux = computed(() => -thick.value / 100)
const muy = computed(() => camber.value / 100)
const R = computed(() => Math.hypot(1 - mux.value, muy.value))
const thetaTE = computed(() => Math.atan2(-muy.value, 1 - mux.value)) // 后缘在圆上的辐角
const alpha = computed(() => (alphaDeg.value * Math.PI) / 180)
// 库塔条件：环量取"让后缘恰好是驻点"的那一个值，升力 = ρ·U·Γ
const Gamma = computed(() => 4 * Math.PI * R.value * Math.sin(alpha.value - thetaTE.value))

// 绕圆柱流的复势 F(ζ) = U(ζe^{-iα} + R²e^{iα}/ζ) + (iΓ/2π)ln ζ，
// 流函数就是它的虚部（复数运算就地展开成实虚部）。ψ 的等值线 = 流线。
function psi(x, y) {
  const zx = x - mux.value
  const zy = y - muy.value
  const r2 = zx * zx + zy * zy
  if (r2 < 1e-9) return NaN
  const ca = Math.cos(alpha.value)
  const sa = Math.sin(alpha.value)
  return (
    zy * ca - zx * sa +
    (R.value * R.value * (sa * zx - ca * zy)) / r2 +
    (Gamma.value / (4 * Math.PI)) * Math.log(r2)
  )
}
// 圆周本身是一条流线，把等值层级对齐到它，物体轮廓才不会被流线切开
const psiBody = computed(() => (Gamma.value / (2 * Math.PI)) * Math.log(R.value))

// w = z + t/z：t 从 0 拖到 1，圆连续地长成翼型（每个中途的 t 也都是解析映射）
function joukowski(x, y) {
  const t = morph.value / 100
  const r2 = x * x + y * y
  if (r2 < 1e-9) return [x, y]
  return [x + (t * x) / r2, y - (t * y) / r2]
}

// 圆周上等分的一圈标记点：看着它们被映射拉成什么样
const MARKS = 12
const marks = computed(() => {
  const out = []
  for (let k = 0; k < MARKS; k++) {
    const th = thetaTE.value + (2 * Math.PI * k) / MARKS
    out.push([mux.value + R.value * Math.cos(th), muy.value + R.value * Math.sin(th)])
  }
  return out
})

function bodyPath(map) {
  const pts = []
  for (let k = 0; k <= 240; k++) {
    const th = (2 * Math.PI * k) / 240
    pts.push(map(mux.value + R.value * Math.cos(th), muy.value + R.value * Math.sin(th)))
  }
  return pts
}

const canvas = ref(null)
usePlot(
  canvas,
  (ctx, w, h) => {
    const half = w / 2
    // 两个面板给同样的 span，像素比例才一致，morph 才像"同一张图在变形"
    const vz = makeFitView(w, h, -0.1, 0, 7.8, 6.2, { l: 8, r: half + 6, t: 30, b: 8 })
    const vw = makeFitView(w, h, 0.1, 0, 7.8, 6.2, { l: half + 6, r: 8, t: 30, b: 8 })

    ctx.save()
    ctx.strokeStyle = '#ddd8cb'
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(half, 6)
    ctx.lineTo(half, h - 6)
    ctx.stroke()
    ctx.restore()

    drawLabel(ctx, 10, 20, 'z 平面：绕圆柱的流动（课本例题）', { color: C.indigo, size: 13 })
    drawLabel(ctx, half + 8, 20, `w 平面：绕翼型的流动（真问题）`, { color: C.accent, size: 13 })

    // 流线只在 z 平面上算一次（marching squares 求 ψ 的等值线），
    // 每一小段的两个端点各自过一遍映射，就同时画出了两个平面里的同一族流线
    const GN = 260
    const gx0 = vz.x0 - 0.6
    const gx1 = vz.x1 + 0.6
    const gy0 = vz.y0 - 0.4
    const gy1 = vz.y1 + 0.4
    const grid = sampleGrid(psi, GN, gx0, gx1, gy0, gy1)
    const inBody = (x, y) => Math.hypot(x - mux.value, y - muy.value) < R.value * 1.002

    for (const [v, map, tint] of [
      [vz, (x, y) => [x, y], 'rgba(51, 81, 143, 0.6)'],
      [vw, joukowski, 'rgba(178, 58, 47, 0.55)'],
    ]) {
      ctx.save()
      clipView(ctx, v)

      // 流线
      ctx.strokeStyle = tint
      ctx.lineWidth = 1.3
      ctx.beginPath()
      contourSegments(
        grid, GN, gx0, gx1, gy0, gy1, 0.26,
        (ax, ay, bx, by) => {
          const A = map(ax, ay)
          const B = map(bx, by)
          ctx.moveTo(v.X(A[0]), v.Y(A[1]))
          ctx.lineTo(v.X(B[0]), v.Y(B[1]))
        },
        { base: psiBody.value, skip: inBody, jump: 1.6 },
      )
      ctx.stroke()

      // 物体
      const body = bodyPath(map)
      ctx.beginPath()
      for (let i = 0; i < body.length; i++) {
        const [px, py] = body[i]
        i === 0 ? ctx.moveTo(v.X(px), v.Y(py)) : ctx.lineTo(v.X(px), v.Y(py))
      }
      ctx.closePath()
      ctx.fillStyle = 'rgba(38, 35, 44, 0.12)'
      ctx.fill()
      ctx.strokeStyle = C.ink
      ctx.lineWidth = 2
      ctx.stroke()

      // 圆上等分点的像：看清映射把哪里拉长、哪里挤扁
      for (let k = 0; k < marks.value.length; k++) {
        const [px, py] = map(marks.value[k][0], marks.value[k][1])
        ctx.beginPath()
        ctx.arc(v.X(px), v.Y(py), k === 0 ? 4.5 : 3, 0, Math.PI * 2)
        ctx.fillStyle = k === 0 ? C.gold : C.soft
        ctx.fill()
      }
      ctx.restore()
    }

    drawLabel(ctx, vz.pad.l + 6, vz.pad.t + vz.ih - 8, '金点 = 圆上的 z = 1', {
      color: C.gold,
      size: 12,
    })
    drawLabel(ctx, vw.pad.l + 6, vw.pad.t + vw.ih - 8, '金点 = 尖锐的后缘', {
      color: C.gold,
      size: 12,
    })
  },
  { height: 400, watchSources: [thick, camber, alphaDeg, morph] },
)
</script>

<template>
  <DemoFrame title="茹科夫斯基变换：把机翼的绕流问题，搬回圆柱上去解">
    <canvas ref="canvas" class="demo-canvas"></canvas>
    <template #controls>
      <ControlSlider label="厚度 %" v-model="thick" :min="0" :max="30" :step="1" />
      <ControlSlider label="弯度 %" v-model="camber" :min="-15" :max="20" :step="1" />
      <ControlSlider label="迎角 °" v-model="alphaDeg" :min="-6" :max="14" :step="0.5" />
      <ControlSlider label="变形进度 %" v-model="morph" :min="0" :max="100" :step="1" />
    </template>
    <template #readout>
      圆心 <MathInline tex="\mu" /> = <b>{{ fmt(mux, 2) }} + {{ fmt(muy, 2) }}i</b
      >，半径 R = <b>{{ fmt(R, 3) }}</b>
      <br />
      库塔条件定出环量 <MathInline tex="\Gamma" /> = <b>{{ fmt(Gamma, 2) }}</b
      >，升力 <MathInline tex="L = \rho U \Gamma" /> 方向<b>{{
        Gamma > 0.05 ? '向上' : Gamma < -0.05 ? '向下（失速侧）' : '为零'
      }}</b>
    </template>
    <template #note>
      1902 年茹科夫斯基要算机翼受力，可翼型那个尖后缘的钝头轮廓，方程根本解不动；而<b>绕圆柱的流动</b>是
      课本上的标准例题（均匀流 + 偶极子 + 涡，一行公式）。他的招数是：找一个解析函数
      <MathInline tex="w = z + 1/z" />，把一个<b>偏心的圆</b>整个映成翼型——先把变形进度拖到 0，
      两边是同一个圆；再慢慢拖到 100，看圆怎么鼓成机翼，而流线<b>一根都没有打结、没有相交</b>。
      能这样搬运的唯一理由就是保角：解析映射在每一点只做旋转 + 伸缩，
      所以"流线与物体表面相切""流线之间不相交"这些物理约束，映过去以后一条不少。
      拖<b>迎角</b>看读数里的 <MathInline tex="\Gamma" />：它不是随便取的，
      是由"后缘不许有流体绕着尖角拐弯"（库塔条件）唯一定死的，而升力恰好
      <MathInline tex="L = \rho U \Gamma" />。再把<b>弯度</b>拖大，迎角归零——环量依然为正：
      这就是为什么机翼要做成上凸下平，平飞时也有升力。
    </template>
  </DemoFrame>
</template>
