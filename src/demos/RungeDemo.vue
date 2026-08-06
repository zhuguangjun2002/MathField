<script setup>
import { ref, computed } from 'vue'
import { usePlot, makeView, drawAxes, plotFn, drawPoint, drawLabel, C, fmt } from './plot.js'
import DemoFrame from '../components/DemoFrame.vue'
import ControlSlider from '../components/ControlSlider.vue'
import MathInline from '../components/MathInline.vue'

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
      <b>两个控件。</b><b>节点个数</b>决定多项式次数（次数 = 个数 − 1），
      也就是"你用多少个已知点去钉这条曲线"；<b>节点分布</b>的下拉框决定<b>这些点摆在哪儿</b>——
      两档取的点<b>个数完全一样</b>，只是位置不同。被逼近的函数始终是
      <MathInline tex="f(x) = 1/(1+25x^2)" />，区间始终是 [−1, 1]。
      <br /><br />
      直觉说"过的点越多，曲线越贴合"。拖动节点个数试试：选<b>等距</b>时，中间确实越来越准，
      可<b>两端翘起越来越狂的大浪</b>——9 个点已明显，15 个点直接甩出画面。这就是龙格 1901 年发现的现象，
      当年狠狠打了"高次 = 高精度"的脸。为什么？高次多项式太"僵硬"，被逼着穿过所有点后只能在空隙里剧烈摆动；
      更深的原因藏在<b>复平面</b>里（见下文与复变的联系）。
      现在把节点切到<b>切比雪夫点</b>——同样的次数、同样的函数，只是把取样点往两端挤了挤，大浪瞬间平息、误差稳稳下降。
      结论反直觉却极重要：<b>插值好不好，取决于把点放在哪，而不只是放几个</b>。这也是为什么实际工程宁可用
      分段低次的样条，也不敢用一根高次多项式硬穿全场。
      <br /><br />
      <b>拖的时候有一档容易误会，先说在前面：节点个数在 3 到 5 之间时，两种分布几乎没有差别</b>
      （n = 3 时两者的误差都是 0.646，n = 5 是 0.438 对 0.460，<b>等距反而略胜</b>）。
      那不是切换失灵——点太少时谁也谈不上"分布"，差距要到次数升上去才拉开。
      读数区的对照表（拖着看）：
      <br />
      　n = 9 　等距 <b>1.045</b>　切比雪夫 <b>0.205</b>
      <br />
      　n = 15　等距 <b>7.195</b>　切比雪夫 <b>0.054</b>
      <br />
      　n = 21　等距 <b>59.8</b>　切比雪夫 <b>0.018</b>
      <br />
      <b>等距那一列每加两个点就翻一倍，切比雪夫那一列每加两个点就掉三分之一</b>——
      同一个函数、同样的点数，一列指数发散、一列指数收敛，分水岭只是"点摆在哪"。
      顺带留意函数本身的取值范围只有 0 到 1：<b>误差 59.8 意味着曲线已经飞出画面几十倍</b>。
    </template>
  </DemoFrame>
</template>
