<script setup>
import { ref, computed, watch } from 'vue'
import { usePlot, makeSquareView, drawAxes, drawPoint, drawLabel, C, fmt } from './plot.js'
import DemoFrame from '../components/DemoFrame.vue'
import ControlSlider from '../components/ControlSlider.vue'

// 每个步骤：rows = 增广矩阵 [a, b, c] 表示 ax + by = c
const SYSTEMS = {
  regular: {
    label: '正常情形：x + 2y = 8，3x + 2y = 12',
    steps: [
      { desc: '原始方程组', rows: [[1, 2, 8], [3, 2, 12]] },
      { desc: '第二行减去第一行的 3 倍：x 被消去', rows: [[1, 2, 8], [0, -4, -12]] },
      { desc: '第二行除以 −4：读出 y = 3', rows: [[1, 2, 8], [0, 1, 3]] },
      { desc: '第一行减去第二行的 2 倍：读出 x = 2', rows: [[1, 0, 2], [0, 1, 3]] },
    ],
    solution: [2, 3],
  },
  singular: {
    label: '出事情形：x + 2y = 8，2x + 4y = 10',
    steps: [
      { desc: '原始方程组（注意两条直线平行！）', rows: [[1, 2, 8], [2, 4, 10]] },
      { desc: '第二行减去第一行的 2 倍：得到 0 = −6 ？！', rows: [[1, 2, 8], [0, 0, -6]] },
    ],
    solution: null,
  },
}

const canvas = ref(null)
const sysKey = ref('regular')
const step = ref(0)

const sys = computed(() => SYSTEMS[sysKey.value])
const maxStep = computed(() => sys.value.steps.length - 1)
const cur = computed(() => sys.value.steps[Math.min(step.value, maxStep.value)])

watch(sysKey, () => (step.value = 0))

function fmtRow([a, b, c]) {
  const n = (x) => (Number.isInteger(x) ? String(x) : fmt(x))
  return `${n(a)}  ${n(b)} │ ${n(c)}`
}

// 画直线 ax + by = c
function drawLine(ctx, v, [a, b, c], color) {
  ctx.save()
  ctx.strokeStyle = color
  ctx.lineWidth = 2.4
  ctx.beginPath()
  if (Math.abs(b) > 1e-9) {
    const y = (x) => (c - a * x) / b
    ctx.moveTo(v.X(v.x0), v.Y(y(v.x0)))
    ctx.lineTo(v.X(v.x1), v.Y(y(v.x1)))
  } else if (Math.abs(a) > 1e-9) {
    const x = c / a
    ctx.moveTo(v.X(x), v.Y(v.y0))
    ctx.lineTo(v.X(x), v.Y(v.y1))
  } else {
    // 0x + 0y = c：不再是直线。c≠0 时是"无解"的矛盾行，什么也画不出
    ctx.restore()
    return
  }
  ctx.stroke()
  ctx.restore()
}

usePlot(
  canvas,
  (ctx, w, h) => {
    const v = makeSquareView(w, h, 4.6, { cy: 2.2 })
    drawAxes(ctx, v, { xTicks: [2, 4, 6, 8], yTicks: [2, 4], xLabel: 'x', yLabel: 'y' })

    const rows = cur.value.rows
    drawLine(ctx, v, rows[0], C.accent)
    drawLine(ctx, v, rows[1], C.indigo)
    drawLabel(ctx, v.pad.l + 12, v.pad.t + v.ih - 12, '红 = 第一行方程　蓝 = 第二行方程', { color: C.soft })

    const sol = sys.value.solution
    if (sol) {
      drawPoint(ctx, v, sol[0], sol[1], { color: C.green, r: 6 })
      drawLabel(ctx, v.X(sol[0]) + 10, v.Y(sol[1]) - 10, `解 (${sol[0]}, ${sol[1]})：全程不动`, { color: C.green })
    } else if (Math.abs(rows[1][0]) < 1e-9 && Math.abs(rows[1][1]) < 1e-9) {
      drawLabel(ctx, v.pad.l + 12, v.pad.t + 26, '第二行变成了 0 = −6：矛盾，方程组无解', {
        color: C.accent,
        size: 14,
      })
    }
  },
  { height: 340, watchSources: [step, sysKey] },
)
</script>

<template>
  <DemoFrame title="消元法：矩阵在变，交点纹丝不动">
    <canvas ref="canvas" class="demo-canvas"></canvas>
    <template #controls>
      <label class="ctrl">
        <span class="ctrl-label">方程组</span>
        <select v-model="sysKey" class="ctrl-select">
          <option v-for="(s, k) in SYSTEMS" :key="k" :value="k">{{ s.label }}</option>
        </select>
      </label>
      <ControlSlider label="消元步骤" v-model="step" :min="0" :max="maxStep" :step="1" />
    </template>
    <template #readout>
      <b>第 {{ step }} 步</b>：{{ cur.desc }}
      &nbsp;&nbsp;增广矩阵：<code style="white-space: pre">［{{ fmtRow(cur.rows[0]) }}］ ［{{ fmtRow(cur.rows[1]) }}］</code>
    </template>
    <template #note>
      逐步拖动滑杆：每做一次行变换，红线（第一行）或蓝线（第二行）就换一个姿势，
      但两线的<b>交点从头到尾一动不动</b>——行变换改的只是方程组的"说法"，不是它的解。
      消元的终点是让两条线摆成横平竖直（x = 2，y = 3），解直接读出来。
      再切到"出事情形"看看：两条平行线消元后当场露馅——第二行变成 0 = −6 这句胡话，这就是"无解"的代数指纹。
    </template>
  </DemoFrame>
</template>
