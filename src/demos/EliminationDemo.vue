<script setup>
import { ref, computed, watch } from 'vue'
import { usePlot, makeSquareView, drawAxes, drawPoint, drawLabel, C, fmt } from './plot.js'
import DemoFrame from '../components/DemoFrame.vue'
import ControlSlider from '../components/ControlSlider.vue'
import MathInline from '../components/MathInline.vue'

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
      <ControlSlider
        label="消元步骤（第几次行变换）"
        v-model="step"
        :min="0"
        :max="maxStep"
        :step="1"
      />
    </template>
    <template #readout>
      <b>第 {{ step }} 步</b>：{{ cur.desc }}
      &nbsp;&nbsp;增广矩阵：<code style="white-space: pre">［{{ fmtRow(cur.rows[0]) }}］ ［{{ fmtRow(cur.rows[1]) }}］</code>
    </template>
    <template #note>
      <p><b>两个旋钮分别是什么</b></p>
      <ul>
        <li>
          <b>方程组</b>（下拉）：两档是<strong>刻意配对</strong>的——"正常情形"两条直线相交，
          "出事情形"两条直线平行。两档的第一个方程完全一样，只有第二个不同。
        </li>
        <li>
          <b>消元步骤</b>：<strong>不是连续参数，是"做到第几次行变换"</strong>。
          每一档对应一次具体的、事先写死的操作（读数区会写明这一步做了什么），
          所以正常情形只有 0–3 共四档、出事情形只有 0–1 两档。
          换方程组时它会自动跳回第 0 步。
        </li>
      </ul>
      <p>
        <b>图上画的是什么</b>：一个二元一次方程 <MathInline tex="ax + by = c" /> 在平面上就是<strong>一条直线</strong>
        （满足它的所有 <MathInline tex="(x,y)" /> 连起来），所以方程组的解就是两条线的<strong>交点</strong>。
        红线是增广矩阵的第一行，蓝线是第二行，绿点是解。
        读数区右边那两个方括号就是当前的增广矩阵，竖线左边是系数、右边是常数项。
      </p>
      <p>
        <b>照着做一遍（一）：交点纹丝不动。</b>选"正常情形"，把步骤从 0 拖到 3，
        <strong>死盯着绿点</strong>。红线蓝线一路换姿势——第 1 步蓝线转了向、第 2 步它变平、
        第 3 步红线也竖了起来——可绿点始终钉在 (2, 3)。
        最后两条线摆成横平竖直，增广矩阵成了
        <MathInline tex="[\,1\ 0 \mid 2\,]" />、<MathInline tex="[\,0\ 1 \mid 3\,]" />，
        答案直接从表上读出来。<strong>这就是"换说法，不换事实"的字面意思。</strong>
      </p>
      <p>
        <b>照着做一遍（二）：无解长什么样。</b>切到"出事情形"
        （<MathInline tex="x+2y=8" /> 与 <MathInline tex="2x+4y=10" />）。
        注意这两条直线<strong>斜率相同</strong>——第二个方程的系数正好是第一个的 2 倍，
        可右端 10 却不是 8 的 2 倍。拖到第 1 步：第二行变成
        <MathInline tex="[\,0\ 0 \mid -6\,]" />，读作 <MathInline tex="0 = -6" />。
        <strong>画面上此时只剩一条红线</strong>——因为"0 = −6"根本不是任何一条直线，
        它是一句胡话，蓝线无处可画。<strong>这就是"无解"的代数指纹</strong>：
        系数那半边塌成全零，右端却没跟着塌。
      </p>
      <p>
        把这两档对照着看，正文第肆节那三种命运就出来了：右端跟着塌成 0 是<em>多解</em>，
        没跟着塌是<em>无解</em>，系数那半边压根没塌就是<em>唯一解</em>。
      </p>
    </template>
  </DemoFrame>
</template>
