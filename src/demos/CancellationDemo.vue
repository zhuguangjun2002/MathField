<script setup>
import { ref, computed } from 'vue'
import { usePlot, makeView, drawAxes, plotFn, drawPoint, drawLabel, C, fmt } from './plot.js'
import DemoFrame from '../components/DemoFrame.vue'
import ControlSlider from '../components/ControlSlider.vue'

// 目标：计算 g(x) = (1 − cos x) / x²，x→0 时真值是 1/2。
// naive 直接算，会在 x 很小时把两个几乎相等的数相减 → 灾难性抵消。
// stable 用恒等式 1 − cos x = 2 sin²(x/2) 改写，避免相减。
const p = ref(4) // x = 10^(−p)

function naive(x) {
  return (1 - Math.cos(x)) / (x * x)
}
function stable(x) {
  const s = Math.sin(x / 2)
  return 0.5 * (s / (x / 2)) * (s / (x / 2))
}

const x = computed(() => Math.pow(10, -p.value))
const vNaive = computed(() => naive(x.value))
const vStable = computed(() => stable(x.value))

// 相对误差（以 stable 为准，它几乎就是真值 0.5）
const relErr = computed(() => Math.abs(vNaive.value - vStable.value) / Math.abs(vStable.value))

const canvas = ref(null)
usePlot(
  canvas,
  (ctx, w, h) => {
    // 横轴用 u = log10(x) ∈ [−9, 0]，纵轴看结果是否守在 0.5
    const v = makeView(w, h, -9, 0, -0.2, 1.15)
    drawAxes(ctx, v, {
      xTicks: [-9, -7, -5, -3, -1],
      yTicks: [0, 0.5, 1],
      xLabel: 'log₁₀ x',
      yLabel: '算得的 g(x)',
    })

    // 真值参考线 0.5（stable 的结果，一路平稳）
    plotFn(ctx, v, () => 0.5, { color: C.indigo, width: 1.6, dash: [6, 4] })

    // naive 的实际计算结果：这条线是真用 float64 算出来的，会在左侧塌掉
    plotFn(ctx, v, (u) => naive(Math.pow(10, u)), { color: C.accent, width: 2.4, samples: 900 })

    // 当前 x 的位置
    const u = -p.value
    drawPoint(ctx, v, u, Math.max(-0.2, Math.min(1.15, vNaive.value)), { color: C.accent, r: 5 })

    drawLabel(ctx, v.pad.l + 10, v.pad.t + 18, '蓝虚线：真值 1/2　红：直接相减算出来的结果', {
      color: C.soft,
      size: 12,
    })
    drawLabel(ctx, v.X(-8.6), v.Y(0.06), '← 这里本该也是 0.5，却崩了', { color: C.accent, size: 12 })
  },
  { height: 340, watchSources: [p] },
)
</script>

<template>
  <DemoFrame title="亲眼看着 float64 算崩：两个几乎相等的数一相减，有效数字全没了">
    <canvas ref="canvas" class="demo-canvas"></canvas>
    <template #controls>
      <ControlSlider
        label="让 x 越来越小（x = 10⁻ᵖ）"
        v-model="p"
        :min="1"
        :max="9"
        :step="0.1"
        :display="(v) => 'x = 1e−' + fmt(v, 1)"
      />
    </template>
    <template #readout>
      x = <b>{{ x.toExponential(1) }}</b>：直接算
      <b style="color: #b23a2f">{{ vNaive.toPrecision(8) }}</b>
      ，改写后算 <b style="color: #33518f">{{ vStable.toPrecision(8) }}</b>
      （真值 0.5）—— 相对误差已达 <b>{{ relErr < 1e-12 ? '≈ 0' : relErr.toPrecision(2) }}</b>
    </template>
    <template #note>
      公式 <b>(1 − cos x) / x²</b> 数学上恒等于 <b>1/2</b>（洛必达一下就知道），可拖动滑杆让 x 变小，
      红线在 x ≈ 10⁻⁸ 附近突然从 0.5 摔到 0——这不是我编的动画，是浏览器<b>真的用双精度浮点算出来的</b>。
      原因：x 很小时 cos x 极接近 1，float64 只有约 16 位有效数字，<b>1 − cos x</b> 一相减，
      前面十几位相同的数字全部抵消归零，只剩下最末尾几位被舍入污染过的"垃圾"，再除以更小的 x² 便彻底放大成噪声。
      这就是<b>灾难性抵消</b>——不是算法错，是"相近数相减"这个动作本身有毒。
      蓝色那条稳如泰山的线用的是同一台机器，只把式子改写成 <b>2 sin²(x/2) / x²</b>，
      不做危险的相减，误差就再也没冒头。<b>写法不同，精度天差地别</b>，这正是数值分析要教你的第一课。
    </template>
  </DemoFrame>
</template>
