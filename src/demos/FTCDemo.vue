<script setup>
import { ref, computed } from 'vue'
import { usePlot, makeView, drawAxes, plotFn, drawPoint, drawLabel, C } from './plot.js'
import DemoFrame from '../components/DemoFrame.vue'
import ControlSlider from '../components/ControlSlider.vue'
import MathInline from '../components/MathInline.vue'

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
        label="扫描位置 x（面积扫到哪）"
        v-model="x"
        :min="0.15"
        :max="6.28"
        :step="0.01"
        :display="(v) => v.toFixed(2)"
      />
    </template>
    <template #readout>
      已扫过的面积 A(x) = <b>{{ A(x).toFixed(4) }}</b>
      &nbsp;&nbsp;数值求导 A′(x) ≈ <b>{{ slopeNum.toFixed(4) }}</b>
      &nbsp;&nbsp;曲线高度 f(x) = <b>{{ f(x).toFixed(4) }}</b><br />
      两者之差 = {{ Math.abs(slopeNum - f(x)).toExponential(2) }} —— 只剩数值求导本身的误差
    </template>
    <template #note>
      <p><b>唯一的旋钮是什么</b></p>
      <ul>
        <li>
          <b>扫描位置 x</b>：面积从 0 一路扫到哪里为止，范围 0.15 到
          <MathInline tex="2\pi \approx 6.28" />（正好一个完整周期）。
          它同时是上图阴影的右边界、下图那个蓝点的横坐标——<strong>两张图共用这一个 x</strong>。
        </li>
      </ul>
      <p>
        <b>画的是哪条曲线</b>：上图是
        <MathInline tex="f(t) = \sin t + 1.5" />（整体抬高 1.5 是为了让它全程为正，
        面积不必分正负），阴影就是 <MathInline tex="A(x) = \int_0^x f(t)\,\mathrm{d}t" />。
        下图画的正是这个 <MathInline tex="A" /> 本身，
        闭式是 <MathInline tex="A(x) = 1.5x - \cos x + 1" />（代 x = 0 得 0，对得上）。
      </p>
      <p>
        <b>读数区那个 A′ 是怎么来的</b>：不是解析求导，而是<strong>当场用差商现算</strong>——
        取 <MathInline tex="\bigl(A(x{+}0.001) - A(x{-}0.001)\bigr)/0.002" />，
        即左右各挪 0.001 的中心差商。所以它和 <MathInline tex="f(x)" /> 不会<em>字面上</em>
        一模一样，读数区第二行那个差就是这点数值误差（量级 <MathInline tex="10^{-7}" /> 上下）。
        <strong>它小到这个地步，本身就是 A′ = f 的证据。</strong>
      </p>
      <p>
        <b>照着做一遍</b>：把 x 拖到 <b>1.57</b>（约 <MathInline tex="\pi/2" />）——
        上图曲线正在最高点，读数 f = 2.5000，而下图的 A 在这里<strong>爬得最陡</strong>。
        再拖到 <b>4.71</b>（约 <MathInline tex="3\pi/2" />）——曲线掉到最低点 f = 0.5000，
        下图的 A 立刻变得最平缓（但仍在上升，因为 f 始终为正）。
        <strong>曲线的高度，恰好就是面积函数的陡峭程度</strong>——
        这一句就是微积分基本定理第一部分的全部内容。
      </p>
      <p>
        顺带留意：无论 x 拖到哪，A 都<strong>只增不减</strong>。
        这不是巧合——f 全程为正，按定理 A′ = f &gt; 0，所以 A 必然单调上升。
        要是把 1.5 那个抬高去掉，f 会有负的一段，A 就会在那一段掉头往下。
      </p>
    </template>
  </DemoFrame>
</template>
