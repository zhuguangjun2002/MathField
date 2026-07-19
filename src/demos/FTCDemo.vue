<script setup>
import { ref, computed } from 'vue'
import { usePlot, makeView, drawAxes, plotFn, drawPoint, drawLabel, C } from './plot.js'
import DemoFrame from '../components/DemoFrame.vue'
import ControlSlider from '../components/ControlSlider.vue'

// f(t) = sin t + 1.5，面积函数 A(x) = ∫₀ˣ f = 1.5x − cos x + 1
const f = (t) => Math.sin(t) + 1.5
const A = (x) => 1.5 * x - Math.cos(x) + 1
const XMAX = Math.PI * 2

const canvas = ref(null)
const x = ref(2.2)

const slopeNum = computed(() => (A(x.value + 0.001) - A(x.value - 0.001)) / 0.002)

usePlot(
  canvas,
  (ctx, w, h) => {
    // 上图：f(t) 与扫过的面积
    const v1 = makeView(w, h, -0.3, XMAX + 0.3, -0.15, 2.9, { t: 26, b: h - 250 })
    // 下图：面积函数 A(x)
    const v2 = makeView(w, h, -0.3, XMAX + 0.3, -0.4, 10.4, { t: h - 212, b: 30 })

    // ---- 上图 ----
    drawAxes(ctx, v1, { xTicks: [Math.PI, XMAX], yTicks: [1.5], xLabel: 't', yLabel: 'f(t)' })

    // 阴影面积 0..x
    ctx.fillStyle = C.accentSoft
    ctx.beginPath()
    ctx.moveTo(v1.X(0), v1.Y(0))
    const steps = 120
    for (let i = 0; i <= steps; i++) {
      const t = (x.value * i) / steps
      ctx.lineTo(v1.X(t), v1.Y(f(t)))
    }
    ctx.lineTo(v1.X(x.value), v1.Y(0))
    ctx.closePath()
    ctx.fill()

    // x 处的细条：面积的“增长率”就是这里的高度 f(x)
    ctx.fillStyle = 'rgba(178, 58, 47, 0.45)'
    const stripW = 0.1
    ctx.fillRect(
      v1.X(x.value - stripW),
      v1.Y(f(x.value)),
      v1.X(x.value) - v1.X(x.value - stripW),
      v1.Y(0) - v1.Y(f(x.value)),
    )

    plotFn(ctx, v1, f, { color: C.ink, width: 2.4 })
    drawPoint(ctx, v1, x.value, f(x.value), { color: C.accent })
    drawLabel(ctx, v1.X(x.value / 2), v1.Y(0.55), '面积 A(x)', { color: C.accent, align: 'center' })
    drawLabel(ctx, v1.X(x.value) + 8, v1.Y(f(x.value)) - 8, `高度 f(x)`, { color: C.accent })
    drawLabel(ctx, v1.pad.l + 8, 18, '上图：曲线 f(t)，红色阴影 = 从 0 扫到 x 的面积', {
      color: C.soft,
    })

    // ---- 下图 ----
    drawAxes(ctx, v2, { xTicks: [Math.PI, XMAX], yTicks: [5, 10], xLabel: 'x', yLabel: 'A(x)' })

    // A 曲线：已经扫过的部分实线，未扫过的浅色
    plotFn(ctx, v2, A, { color: '#cfcac0', width: 2 })
    ctx.save()
    ctx.beginPath()
    ctx.rect(v2.pad.l, v2.pad.t, v2.X(x.value) - v2.pad.l, v2.ih)
    ctx.clip()
    plotFn(ctx, v2, A, { color: C.indigo, width: 2.6 })
    ctx.restore()

    // x 处切线：斜率 = f(x)
    const k = f(x.value)
    plotFn(ctx, v2, (t) => A(x.value) + k * (t - x.value), {
      color: C.accent,
      width: 1.8,
      dash: [6, 5],
    })
    drawPoint(ctx, v2, x.value, A(x.value), { color: C.indigo })
    drawLabel(ctx, v2.X(x.value) + 10, v2.Y(A(x.value)) + 4, `切线斜率 = f(x)`, {
      color: C.accent,
    })
    drawLabel(ctx, v2.pad.l + 8, v2.pad.t - 8, '下图：把面积记成函数 A(x) —— 它的导数恰好是 f', {
      color: C.soft,
    })
  },
  { height: 520, watchSources: [x] },
)
</script>

<template>
  <DemoFrame title="微积分基本定理：面积的变化率 = 曲线的高度">
    <canvas ref="canvas" class="demo-canvas"></canvas>
    <template #controls>
      <ControlSlider
        label="扫描位置 x"
        v-model="x"
        :min="0.15"
        :max="6.28"
        :step="0.01"
        :display="(v) => v.toFixed(2)"
      />
    </template>
    <template #readout>
      A(x) = <b>{{ A(x).toFixed(4) }}</b>
      &nbsp;&nbsp;数值求导 A′(x) ≈ <b>{{ slopeNum.toFixed(4) }}</b>
      &nbsp;&nbsp;曲线高度 f(x) = <b>{{ f(x).toFixed(4) }}</b> —— 两者完全一致！
    </template>
    <template #note>
      拖动 x，观察下图蓝点处的切线斜率：曲线高的地方（f 大），面积涨得快，A 陡；
      曲线低的地方，面积涨得慢，A 缓。「面积函数的导数 = 原函数」，
      这就是把求导和求面积焊在一起的微积分基本定理：A′(x) = f(x)。
    </template>
  </DemoFrame>
</template>
