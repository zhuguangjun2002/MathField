<script setup>
import { ref, computed } from 'vue'
import { usePlot, makeView, drawAxes, plotFn, drawPoint, drawLabel, C, fmt } from './plot.js'
import DemoFrame from '../components/DemoFrame.vue'
import ControlSlider from '../components/ControlSlider.vue'
import MathInline from '../components/MathInline.vue'

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
      <b>只有一个旋钮：</b>它控制 <MathInline tex="x = 10^{-p}" /> 里的指数 p——
      <b>把 p 拖大就是让 x 越来越接近 0</b>；x 本身不是滑杆读数，读数区会给出它的值。
      两条线用的是<b>同一台机器、同一个 x</b>，只是把式子写成了两种代数上等价的形式。
      <br /><br />
      公式 <b>(1 − cos x) / x²</b> 在 <MathInline tex="x \to 0" /> 时的<b>极限</b>是 <b>1/2</b>
      （洛必达一下就知道；注意是极限，不是恒等——x = 0.1 时它真值就是 0.49958）。
      可拖动滑杆让 x 变小，
      红线在 x ≈ 10⁻⁸ 附近突然从 0.5 摔到 0——这不是我编的动画，是浏览器<b>真的用双精度浮点算出来的</b>。
      原因：x 很小时 cos x 极接近 1，float64 只有约 16 位有效数字，<b>1 − cos x</b> 一相减，
      前面十几位相同的数字全部抵消归零，只剩下最末尾几位被舍入污染过的"垃圾"，再除以更小的 x² 便彻底放大成噪声。
      这就是<b>灾难性抵消</b>——不是算法错，是"相近数相减"这个动作本身有毒。
      蓝色那条稳如泰山的线用的是同一台机器，只把式子改写成 <b>2 sin²(x/2) / x²</b>，
      不做危险的相减，误差就再也没冒头。<b>写法不同，精度天差地别</b>，这正是数值分析要教你的第一课。
      <br /><br />
      <b>拖的时候请分清两件事，它们混在同一条曲线上。</b>
      <b>p = 1 到 5</b> 这一段，红蓝两条线<b>几乎完全重合</b>，而且都不等于 0.5
      （p = 1 时是 0.49958）——那不是误差，是<b>数学上的真值</b>：极限是 1/2，但 x 还没小到那儿。
      <b>从 p = 6 起红线才开始跑偏</b>（0.50004，而蓝线仍是 0.50000），<b>p = 8 直接摔成 0</b>。
      前一段是"函数本来就长这样"，后一段才是"机器算崩了"。
      <br /><br />
      顺带看一眼：红线离 0.5 最近的时候在 <b>p = 4 附近</b>（相对误差 6×10⁻⁹），
      往两边都变差——左边是 x 还不够小（截断误差），右边是抵消开始吃有效数字（舍入误差）。
      <b>这个 U 形是数值分析里反复出现的形状</b>：同一个参数往两个方向走各有各的坏处，
      最优点卡在中间。<router-link to="/numerical/root-finding">下一讲</router-link>算数值导数时会再撞见它。
    </template>
  </DemoFrame>
</template>
