<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { usePlot, makeSquareView, drawArrow, drawLabel, C, fmt } from './plot.js'
import DemoFrame from '../components/DemoFrame.vue'
import MathInline from '../components/MathInline.vue'

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
      <code>［{{ fmt(ux, 1) }} {{ fmt(vx, 1) }}；{{ fmt(uy, 1) }} {{ fmt(vy, 1) }}］</code><br />
      det = {{ fmt(ux, 1) }}×{{ fmt(vy, 1) }} − {{ fmt(uy, 1) }}×{{ fmt(vx, 1) }} =
      <b :style="{ color: det > 0.08 ? '#b23a2f' : det < -0.08 ? '#33518f' : '#8b8494' }">{{ fmt(det) }}</b>
      &nbsp;&nbsp;平行四边形面积 = |det| = <b>{{ fmt(Math.abs(det)) }}</b>
    </template>
    <template #note>
      <p><b>这个动画没有滑杆，两个箭头本身就是控件</b></p>
      <ul>
        <li>
          <b>红箭头 u</b>：矩阵的<strong>第一列</strong>
          <MathInline tex="(a, c)" />。用鼠标抓住箭头尖拖动。
        </li>
        <li>
          <b>蓝箭头 v</b>：矩阵的<strong>第二列</strong>
          <MathInline tex="(b, d)" />，同样直接拖。
        </li>
      </ul>
      <p>
        两个箭头张成的平行四边形就是那块"有向面积"。读数区把
        <MathInline tex="ad - bc" /> 的两个乘积逐项写了出来，
        <strong>数字的颜色是有含义的</strong>：红色表示 det 为正、蓝色表示为负、
        灰色表示已经贴近 0（阈值 0.08，用来提示"快压扁了"）。
      </p>
      <p>
        <b>照着做一遍（一）：面积就是 det。</b>初始位置是
        <MathInline tex="\boldsymbol{u}=(2,\ 0.4)" />、<MathInline tex="\boldsymbol{v}=(0.6,\ 1.6)" />，
        读数 <MathInline tex="2\times 1.6 - 0.4\times 0.6 = 2.96" />。
        把 <MathInline tex="\boldsymbol{v}" /> 往上拉长一倍，平行四边形高度翻倍，det 也跟着翻倍——
        <strong>这就是公理里"多重线性"的手感</strong>。
      </p>
      <p>
        <b>照着做一遍（二）：压扁。</b>把 <MathInline tex="\boldsymbol{v}" /> 慢慢拖向
        <MathInline tex="\boldsymbol{u}" /> 所在的那条直线（同向或反向都行）。
        平行四边形越来越扁，det 的数字一路掉向 0，颜色也由红转灰。
        <strong>det = 0 的那一刻，两列共线</strong>——
        <router-link to="/linear-algebra/elimination">上一讲</router-link>"两条方程平行、消元露馅"
        的几何真相就是这个，"奇异矩阵"一词也指这场压扁事故。
      </p>
      <p>
        <b>照着做一遍（三）：负面积。</b>别停在共线处，<strong>继续拖过去</strong>，
        让 <MathInline tex="\boldsymbol{v}" /> 转到 <MathInline tex="\boldsymbol{u}" /> 的另一侧。
        det 穿过 0 变成负数，数字由灰转蓝。面积当然不会是负的——变的是<strong>定向</strong>：
        原来从 u 转到 v 是逆时针，现在成了顺时针。<strong>符号记录的是"翻面"，不是大小。</strong>
        （三维里这就是左手系与右手系之分。）
      </p>
      <p>
        行列式从来不是那个展开式。展开式只是这块面积的<em>计算方法</em>，
        而你刚刚拖的这块面积，才是它本人。
      </p>
    </template>
  </DemoFrame>
</template>
