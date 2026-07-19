<script setup>
import { ref, computed } from 'vue'
import { usePlot, makeView, drawAxes, plotFn, C } from './plot.js'
import DemoFrame from '../components/DemoFrame.vue'
import ControlSlider from '../components/ControlSlider.vue'

const FNS = {
  parabola: {
    label: 'f(x) = x²，区间 [0, 2]',
    f: (x) => x * x,
    a: 0,
    b: 2,
    exact: 8 / 3,
    exactTex: '8/3 ≈ 2.6667',
    y1: 4.4,
  },
  sin: {
    label: 'f(x) = sin x，区间 [0, π]',
    f: Math.sin,
    a: 0,
    b: Math.PI,
    exact: 2,
    exactTex: '2',
    y1: 1.25,
  },
}

const canvas = ref(null)
const fnKey = ref('parabola')
const n = ref(8)
const method = ref('left')

const cfg = computed(() => FNS[fnKey.value])

const sum = computed(() => {
  const { f, a, b } = cfg.value
  const dx = (b - a) / n.value
  let total = 0
  for (let i = 0; i < n.value; i++) {
    const x =
      method.value === 'left'
        ? a + i * dx
        : method.value === 'right'
          ? a + (i + 1) * dx
          : a + (i + 0.5) * dx
    total += f(x) * dx
  }
  return total
})

usePlot(
  canvas,
  (ctx, w, h) => {
    const { f, a, b, y1 } = cfg.value
    const v = makeView(w, h, a - (b - a) * 0.06, b + (b - a) * 0.06, -y1 * 0.06, y1)
    drawAxes(ctx, v, { xTicks: [a, b], yTicks: [], xLabel: 'x', yLabel: 'f(x)' })

    // 矩形
    const dx = (b - a) / n.value
    ctx.fillStyle = C.greenSoft
    ctx.strokeStyle = C.green
    ctx.lineWidth = 1
    for (let i = 0; i < n.value; i++) {
      const xL = a + i * dx
      const xs =
        method.value === 'left' ? xL : method.value === 'right' ? xL + dx : xL + dx / 2
      const y = f(xs)
      const px = v.X(xL)
      const pw = v.X(xL + dx) - px
      const py = v.Y(Math.max(y, 0))
      const ph = Math.abs(v.Y(0) - v.Y(y))
      ctx.fillRect(px, py, pw, ph)
      ctx.strokeRect(px, py, pw, ph)
    }

    plotFn(ctx, v, f, { color: C.ink, width: 2.6 })
  },
  { height: 340, watchSources: [n, method, fnKey] },
)
</script>

<template>
  <DemoFrame title="黎曼和：用矩形围剿曲边面积">
    <canvas ref="canvas" class="demo-canvas"></canvas>
    <template #controls>
      <label class="ctrl">
        <span class="ctrl-label">函数</span>
        <select v-model="fnKey" class="ctrl-select">
          <option v-for="(c, k) in FNS" :key="k" :value="k">{{ c.label }}</option>
        </select>
      </label>
      <label class="ctrl">
        <span class="ctrl-label">取样点</span>
        <select v-model="method" class="ctrl-select">
          <option value="left">左端点（偏小/偏大）</option>
          <option value="mid">中点（最准）</option>
          <option value="right">右端点</option>
        </select>
      </label>
      <ControlSlider label="矩形个数 n" v-model="n" :min="1" :max="150" :step="1" />
    </template>
    <template #readout>
      {{ n }} 个矩形的面积和 = <b>{{ sum.toFixed(5) }}</b>
      &nbsp;&nbsp;真实面积 = <b>{{ cfg.exactTex }}</b>
      &nbsp;&nbsp;误差 = {{ Math.abs(sum - cfg.exact).toExponential(2) }}
    </template>
    <template #note>
      把 n 从 1 拖到 150：无论取样点怎么选，矩形面积之和都收敛到同一个数 ——
      这个「所有分法共同的极限」就是定积分 ∫f(x)dx 的定义。这正是阿基米德"穷竭法"的现代化身。
      顺带一提：你学过的计算数学里的「矩形公式/中点公式」数值求积分，就是黎曼和直接拿来用。
    </template>
  </DemoFrame>
</template>
