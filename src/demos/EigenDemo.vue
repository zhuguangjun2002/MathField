<script setup>
import { ref, computed } from 'vue'
import { usePlot, makeSquareView, drawArrow, drawLabel, C, fmt } from './plot.js'
import DemoFrame from '../components/DemoFrame.vue'
import ControlSlider from '../components/ControlSlider.vue'

const MATRICES = {
  symmetric: {
    label: '拉伸 A = [2 1; 1 2]（有两个特征方向）',
    m: [2, 1, 1, 2],
    hint: '特征方向在 45° 和 135°，特征值分别是 3 和 1',
  },
  shear: {
    label: '剪切 A = [1 1; 0 1]（只有一个特征方向）',
    m: [1, 1, 0, 1],
    hint: '只有水平方向（0° / 180°）保持不动，λ = 1',
  },
  rotation: {
    label: '旋转 A = [0 −1; 1 0]（没有实特征方向）',
    m: [0, -1, 1, 0],
    hint: '每个向量都被转走 90°，扫一整圈也找不到共线时刻——实特征值不存在',
  },
}

const mKey = ref('symmetric')
const theta = ref(20) // v 的方向角（度）

const M = computed(() => MATRICES[mKey.value].m)

const v = computed(() => {
  const t = (theta.value * Math.PI) / 180
  return [1.4 * Math.cos(t), 1.4 * Math.sin(t)]
})
const Av = computed(() => {
  const [a, b, c, d] = M.value
  return [a * v.value[0] + b * v.value[1], c * v.value[0] + d * v.value[1]]
})

// 共线程度：|v × Av| / (|v||Av|) = sin(夹角)
const sinAngle = computed(() => {
  const cr = v.value[0] * Av.value[1] - v.value[1] * Av.value[0]
  const n = Math.hypot(...v.value) * Math.hypot(...Av.value)
  return n < 1e-9 ? 0 : Math.abs(cr) / n
})
const aligned = computed(() => sinAngle.value < 0.035 && Math.hypot(...Av.value) > 1e-6)

// 共线时的倍率（带符号）：λ = (Av · v) / (v · v)
const lambda = computed(() => {
  const dv = v.value[0] * v.value[0] + v.value[1] * v.value[1]
  return (Av.value[0] * v.value[0] + Av.value[1] * v.value[1]) / dv
})

const canvas = ref(null)
usePlot(
  canvas,
  (ctx, w, h) => {
    const view = makeSquareView(w, h, 3.2)

    // 网格与轴（淡）
    ctx.save()
    ctx.strokeStyle = C.grid
    ctx.lineWidth = 1
    for (let i = Math.ceil(view.x0); i <= view.x1; i++) {
      ctx.beginPath()
      ctx.moveTo(view.X(i), view.pad.t)
      ctx.lineTo(view.X(i), view.pad.t + view.ih)
      ctx.stroke()
    }
    for (let j = Math.ceil(view.y0); j <= view.y1; j++) {
      ctx.beginPath()
      ctx.moveTo(view.pad.l, view.Y(j))
      ctx.lineTo(view.pad.l + view.iw, view.Y(j))
      ctx.stroke()
    }
    ctx.strokeStyle = '#b9b3a6'
    ctx.beginPath()
    ctx.moveTo(view.pad.l, view.Y(0))
    ctx.lineTo(view.pad.l + view.iw, view.Y(0))
    ctx.moveTo(view.X(0), view.pad.t)
    ctx.lineTo(view.X(0), view.pad.t + view.ih)
    ctx.stroke()
    ctx.restore()

    // v 扫过单位圆时 Av 的轨迹（椭圆），提前铺垫"变换把圆变成什么"
    ctx.save()
    ctx.strokeStyle = 'rgba(176, 125, 43, 0.55)'
    ctx.lineWidth = 1.4
    ctx.setLineDash([5, 4])
    ctx.beginPath()
    const [a, b, c, d] = M.value
    for (let k = 0; k <= 120; k++) {
      const t = (k / 120) * Math.PI * 2
      const x = 1.4 * Math.cos(t)
      const y = 1.4 * Math.sin(t)
      const px = view.X(a * x + b * y)
      const py = view.Y(c * x + d * y)
      k ? ctx.lineTo(px, py) : ctx.moveTo(px, py)
    }
    ctx.closePath()
    ctx.stroke()
    ctx.restore()

    // 共线时刻：画出整条特征直线并高亮
    if (aligned.value) {
      const dvx = v.value[0] / Math.hypot(...v.value)
      const dvy = v.value[1] / Math.hypot(...v.value)
      ctx.save()
      ctx.strokeStyle = C.greenSoft
      ctx.lineWidth = 10
      ctx.beginPath()
      ctx.moveTo(view.X(-3.4 * dvx), view.Y(-3.4 * dvy))
      ctx.lineTo(view.X(3.4 * dvx), view.Y(3.4 * dvy))
      ctx.stroke()
      ctx.restore()
    }

    drawArrow(ctx, view, 0, 0, v.value[0], v.value[1], { color: aligned.value ? C.green : C.accent, width: 3 })
    drawArrow(ctx, view, 0, 0, Av.value[0], Av.value[1], { color: aligned.value ? C.green : C.indigo, width: 3 })
    drawLabel(ctx, view.X(v.value[0]) + 8, view.Y(v.value[1]) + 14, 'v', {
      color: aligned.value ? C.green : C.accent,
      size: 15,
    })
    drawLabel(ctx, view.X(Av.value[0]) + 8, view.Y(Av.value[1]) - 6, 'Av', {
      color: aligned.value ? C.green : C.indigo,
      size: 15,
    })

    if (aligned.value) {
      drawLabel(ctx, view.pad.l + 12, view.pad.t + 24, `⚡ 共线了！这是特征方向，λ ≈ ${fmt(lambda.value)}`, {
        color: C.green,
        size: 15,
      })
    }
  },
  { height: 380, watchSources: [theta, mKey] },
)
</script>

<template>
  <DemoFrame title="扫描特征方向：什么时候 Av 与 v 同一条线">
    <canvas ref="canvas" class="demo-canvas"></canvas>
    <template #controls>
      <label class="ctrl">
        <span class="ctrl-label">矩阵</span>
        <select v-model="mKey" class="ctrl-select">
          <option v-for="(m, k) in MATRICES" :key="k" :value="k">{{ m.label }}</option>
        </select>
      </label>
      <ControlSlider label="v 的方向角 θ" v-model="theta" :min="0" :max="360" :step="1" :display="(x) => x + '°'" />
    </template>
    <template #readout>
      v 与 Av 的夹角偏差 sin = <b>{{ fmt(sinAngle, 3) }}</b>
      <template v-if="aligned">
        &nbsp;—— <b style="color: #2f7d4f">共线！特征值 λ ≈ {{ fmt(lambda) }}</b>
      </template>
      <template v-else>&nbsp;（{{ MATRICES[mKey].hint }}）</template>
    </template>
    <template #note>
      慢慢转动 θ，让红色的 v 扫一整圈，盯着蓝色的 Av：大多数方向上 Av 都被"拽歪"了，
      但在某几个特殊方向（绿色闪现处），<b>Av 与 v 恰好落在同一条直线上</b>——只伸缩、不偏转。
      这些方向就是特征向量，伸缩倍数就是特征值。换成"剪切"矩阵试试，只剩一个方向；
      换成"旋转"矩阵，扫一整圈也等不到绿色——它没有实特征方向。金色虚线椭圆是单位圆被
      A 变换后的像：特征方向正是椭圆与原方向"对齐"的地方。
    </template>
  </DemoFrame>
</template>
