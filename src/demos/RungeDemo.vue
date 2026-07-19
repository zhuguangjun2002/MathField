<script setup>
import { ref, computed } from 'vue'
import { usePlot, makeView, drawAxes, plotFn, drawPoint, drawLabel, C, fmt } from './plot.js'
import DemoFrame from '../components/DemoFrame.vue'
import ControlSlider from '../components/ControlSlider.vue'

// 龙格函数 f(x) = 1/(1+25x²)，在 [−1,1] 上插值。
const f = (x) => 1 / (1 + 25 * x * x)

const n = ref(9) // 节点个数（多项式次数 = n−1）
const nodeType = ref('equi') // 'equi' 等距 | 'cheb' 切比雪夫

const nodes = computed(() => {
  const N = n.value
  const xs = []
  if (nodeType.value === 'equi') {
    for (let i = 0; i < N; i++) xs.push(-1 + (2 * i) / (N - 1))
  } else {
    // 切比雪夫点：两端加密
    for (let i = 0; i < N; i++) xs.push(Math.cos(((2 * i + 1) * Math.PI) / (2 * N)))
  }
  return xs.map((x) => ({ x, y: f(x) }))
})

// 拉格朗日插值多项式在 x 处的值
function interp(x) {
  const pts = nodes.value
  let s = 0
  for (let i = 0; i < pts.length; i++) {
    let L = 1
    for (let j = 0; j < pts.length; j++) {
      if (j !== i) L *= (x - pts[j].x) / (pts[i].x - pts[j].x)
    }
    s += pts[i].y * L
  }
  return s
}

// 全区间最大误差
const maxErr = computed(() => {
  let m = 0
  for (let k = 0; k <= 400; k++) {
    const x = -1 + (2 * k) / 400
    m = Math.max(m, Math.abs(interp(x) - f(x)))
  }
  return m
})

const canvas = ref(null)
usePlot(
  canvas,
  (ctx, w, h) => {
    const v = makeView(w, h, -1.05, 1.05, -0.6, 1.7)
    drawAxes(ctx, v, { xTicks: [-1, -0.5, 0, 0.5, 1], yTicks: [0, 0.5, 1, 1.5], xLabel: 'x', yLabel: 'y' })

    // 目标函数（灰虚线）
    plotFn(ctx, v, f, { color: 'rgba(139,132,148,0.7)', width: 1.8, dash: [6, 4] })
    // 插值多项式（红）
    plotFn(ctx, v, interp, { color: C.accent, width: 2.4, samples: 700 })
    // 节点
    for (const p of nodes.value) drawPoint(ctx, v, p.x, p.y, { color: C.indigo, r: 4 })

    drawLabel(ctx, v.pad.l + 10, v.pad.t + 18, '灰虚线：真函数 1/(1+25x²)　红：过这些蓝点的多项式', {
      color: C.soft,
      size: 12,
    })
  },
  { height: 360, watchSources: [n, nodeType] },
)
</script>

<template>
  <DemoFrame title="龙格现象：等距取点，次数越高两端震得越凶">
    <canvas ref="canvas" class="demo-canvas"></canvas>
    <template #controls>
      <ControlSlider label="节点个数（多项式次数 = 个数−1）" v-model="n" :min="3" :max="21" :step="1" />
      <label class="ctrl">
        <span class="ctrl-label">节点怎么放</span>
        <select v-model="nodeType" class="ctrl-select">
          <option value="equi">等距（均匀铺开）</option>
          <option value="cheb">切比雪夫点（两端加密）</option>
        </select>
      </label>
    </template>
    <template #readout>
      全区间最大误差 =
      <b :style="{ color: maxErr > 0.5 ? '#b23a2f' : '#2f7d4f' }">{{ maxErr < 0.01 ? maxErr.toExponential(2) : fmt(maxErr, 3) }}</b>
      <template v-if="nodeType === 'equi' && maxErr > 1">　←　次数升高，误差反而爆炸</template>
      <template v-else-if="nodeType === 'cheb'">　←　换切比雪夫点，误差随次数稳稳变小</template>
    </template>
    <template #note>
      直觉说"过的点越多，曲线越贴合"。拖动节点个数试试：选<b>等距</b>时，中间确实越来越准，
      可<b>两端翘起越来越狂的大浪</b>——9 个点已明显，15 个点直接甩出画面。这就是龙格 1901 年发现的现象，
      当年狠狠打了"高次 = 高精度"的脸。为什么？高次多项式太"僵硬"，被逼着穿过所有点后只能在空隙里剧烈摆动；
      更深的原因藏在<b>复平面</b>里（见下文与复变的联系）。
      现在把节点切到<b>切比雪夫点</b>——同样的次数、同样的函数，只是把取样点往两端挤了挤，大浪瞬间平息、误差稳稳下降。
      结论反直觉却极重要：<b>插值好不好，取决于把点放在哪，而不只是放几个</b>。这也是为什么实际工程宁可用
      分段低次的样条，也不敢用一根高次多项式硬穿全场。
    </template>
  </DemoFrame>
</template>
