<script setup>
import { ref, computed } from 'vue'
import { usePlot, makeView, drawAxes, drawLabel, C, fmt } from './plot.js'
import DemoFrame from '../components/DemoFrame.vue'
import ControlSlider from '../components/ControlSlider.vue'

const canvas = ref(null)
const eps = ref(0.15)
const seqKey = ref('zeno')

const SEQS = {
  zeno: {
    label: '阿基里斯的路程 1 + ½ + ¼ + …',
    a: (n) => 2 - Math.pow(2, 1 - n),
    L: 2,
    y0: 0.8,
    y1: 2.35,
  },
  e: {
    label: '复利的极限 (1 + 1/n)ⁿ',
    a: (n) => Math.pow(1 + 1 / n, n),
    L: Math.E,
    y0: 1.85,
    y1: 2.95,
  },
  osc: {
    label: '振荡逼近 1 + (−1)ⁿ/n',
    a: (n) => 1 + Math.pow(-1, n) / n,
    L: 1,
    y0: 0.3,
    y1: 1.75,
  },
}

const seq = computed(() => SEQS[seqKey.value])

const bigN = computed(() => {
  const { a, L } = seq.value
  let last = 0
  for (let n = 1; n <= 400; n++) {
    if (Math.abs(a(n) - L) >= eps.value) last = n
  }
  return last + 1
})

usePlot(
  canvas,
  (ctx, w, h) => {
    const s = seq.value
    const v = makeView(w, h, 0, 62, s.y0, s.y1)
    drawAxes(ctx, v, {
      xTicks: [10, 20, 30, 40, 50, 60],
      yTicks: [s.L],
      xLabel: 'n',
      yLabel: 'aₙ',
    })

    // ε 带
    ctx.fillStyle = C.indigoSoft
    const bandTop = v.Y(Math.min(s.L + eps.value, s.y1))
    const bandBot = v.Y(Math.max(s.L - eps.value, s.y0))
    ctx.fillRect(v.pad.l, bandTop, v.iw, bandBot - bandTop)

    // 极限虚线
    ctx.strokeStyle = C.indigo
    ctx.setLineDash([6, 5])
    ctx.lineWidth = 1.6
    ctx.beginPath()
    ctx.moveTo(v.pad.l, v.Y(s.L))
    ctx.lineTo(v.pad.l + v.iw, v.Y(s.L))
    ctx.stroke()
    ctx.setLineDash([])
    drawLabel(ctx, v.pad.l + v.iw - 6, v.Y(s.L) - 8, `L = ${fmt(s.L, 3)}`, {
      color: C.indigo,
      align: 'right',
    })

    // N 竖线
    if (bigN.value <= 60) {
      const nx = v.X(bigN.value)
      ctx.strokeStyle = C.accent
      ctx.setLineDash([4, 4])
      ctx.beginPath()
      ctx.moveTo(nx, v.pad.t)
      ctx.lineTo(nx, v.pad.t + v.ih)
      ctx.stroke()
      ctx.setLineDash([])
      drawLabel(ctx, nx + 6, v.pad.t + 16, `N = ${bigN.value}`, { color: C.accent })
    }

    // 数列的点
    for (let n = 1; n <= 60; n++) {
      const y = s.a(n)
      const inside = Math.abs(y - s.L) < eps.value
      ctx.beginPath()
      ctx.arc(v.X(n), v.Y(y), 3.4, 0, Math.PI * 2)
      ctx.fillStyle = inside ? C.green : C.accent
      ctx.fill()
    }
  },
  { height: 320, watchSources: [eps, seqKey] },
)
</script>

<template>
  <DemoFrame title="数列极限：ε 挑战游戏">
    <canvas ref="canvas" class="demo-canvas"></canvas>
    <template #controls>
      <label class="ctrl">
        <span class="ctrl-label">数列</span>
        <select v-model="seqKey" class="ctrl-select">
          <option v-for="(s, k) in SEQS" :key="k" :value="k">{{ s.label }}</option>
        </select>
      </label>
      <ControlSlider
        label="挑战精度 ε"
        v-model="eps"
        :min="0.01"
        :max="0.5"
        :step="0.005"
        :display="(x) => x.toFixed(3)"
      />
    </template>
    <template #readout>
      挑战：让所有项离 L 不到 ε = {{ eps.toFixed(3) }} &nbsp;→&nbsp; 应答：取
      <b>N = {{ bigN }}</b>，从第 N 项起全部落入蓝色带内（绿点）。
    </template>
    <template #note>
      红点是还没进入 ε 带的项，绿点是已经进入的项。把 ε 调得再小，我也总能给出一个 N ——
      这个「你出 ε、我答 N」的攻防游戏，就是极限严格定义的全部内容。
    </template>
  </DemoFrame>
</template>
