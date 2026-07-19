<script setup>
import { ref, computed } from 'vue'
import { usePlot, makeView, drawAxes, plotFn, drawPoint, drawLabel, C, fmt } from './plot.js'
import DemoFrame from '../components/DemoFrame.vue'
import ControlSlider from '../components/ControlSlider.vue'

// 解 f(x) = x² − 2 = 0，根是 √2。牛顿迭代 x ← x − f/f' = (x + 2/x)/2 —— 正是巴比伦开方术。
const x0 = ref(3)
const steps = ref(3)

const ROOT = Math.SQRT2

const f = (x) => x * x - 2
const fp = (x) => 2 * x

// 生成迭代序列 x0, x1, ...
const seq = computed(() => {
  const xs = [x0.value]
  for (let i = 0; i < steps.value; i++) {
    const x = xs[xs.length - 1]
    xs.push(x - f(x) / fp(x))
  }
  return xs
})
const xn = computed(() => seq.value[seq.value.length - 1])
const errs = computed(() => seq.value.map((x) => Math.abs(x - ROOT)))

const canvas = ref(null)
usePlot(
  canvas,
  (ctx, w, h) => {
    const v = makeView(w, h, 0, 3.4, -3, 9)
    drawAxes(ctx, v, { xTicks: [1, 2, 3], yTicks: [-2, 0, 2, 4, 6, 8], xLabel: 'x', yLabel: 'f(x)=x²−2' })

    // 曲线
    plotFn(ctx, v, f, { color: C.ink, width: 2.4 })

    // 真根 √2
    ctx.save()
    ctx.strokeStyle = C.greenSoft
    ctx.lineWidth = 8
    ctx.beginPath()
    ctx.moveTo(v.X(ROOT), v.pad.t)
    ctx.lineTo(v.X(ROOT), v.pad.t + v.ih)
    ctx.stroke()
    ctx.restore()
    drawLabel(ctx, v.X(ROOT) + 6, v.pad.t + 16, '真根 √2 ≈ 1.4142', { color: C.green, size: 12 })

    // 牛顿"楼梯"：从 (xk,0) 竖到曲线，再沿切线滑回轴上的 x(k+1)
    const xs = seq.value
    for (let k = 0; k < xs.length; k++) {
      const xk = xs[k]
      const yk = f(xk)
      // 竖线到曲线
      ctx.save()
      ctx.strokeStyle = 'rgba(51, 81, 143, 0.5)'
      ctx.lineWidth = 1.4
      ctx.setLineDash([4, 3])
      ctx.beginPath()
      ctx.moveTo(v.X(xk), v.Y(0))
      ctx.lineTo(v.X(xk), v.Y(yk))
      ctx.stroke()
      ctx.restore()
      drawPoint(ctx, v, xk, yk, { color: C.indigo, r: 3.5 })

      if (k < xs.length - 1) {
        // 切线段：从 (xk, f(xk)) 到 (x(k+1), 0)
        ctx.save()
        ctx.strokeStyle = C.accent
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(v.X(xk), v.Y(yk))
        ctx.lineTo(v.X(xs[k + 1]), v.Y(0))
        ctx.stroke()
        ctx.restore()
      }
      // 轴上的 xk
      drawPoint(ctx, v, xk, 0, { color: k === xs.length - 1 ? C.green : C.accent, r: 4.5 })
      drawLabel(ctx, v.X(xk) - 2, v.Y(0) + 20, 'x' + k, { color: C.soft, size: 12, align: 'center' })
    }
  },
  { height: 360, watchSources: [x0, steps] },
)
</script>

<template>
  <DemoFrame title="牛顿法：用切线一步步滑向根，看正确位数怎么翻倍">
    <canvas ref="canvas" class="demo-canvas"></canvas>
    <template #controls>
      <ControlSlider label="初始猜测 x₀" v-model="x0" :min="0.4" :max="3.4" :step="0.05" :display="(v) => fmt(v, 2)" />
      <ControlSlider label="迭代步数" v-model="steps" :min="0" :max="6" :step="1" />
    </template>
    <template #readout>
      第 {{ steps }} 步的近似值 x<sub>{{ steps }}</sub> = <b>{{ xn.toPrecision(10) }}</b>，
      误差 <b>{{ errs[errs.length - 1] < 1e-14 ? '≈ 0（已到机器精度）' : errs[errs.length - 1].toExponential(2) }}</b>
    </template>
    <template #note>
      方程 <b>x² − 2 = 0</b> 你一眼知道根是 √2，但计算器芯片不认识"√"这个符号，它只会加减乘除。
      牛顿的主意：在当前猜测处画一条<b>切线</b>（曲线太难，就用它的一次泰勒近似代替），
      切线撞到横轴的地方就是更好的下一个猜测。红色斜线就是切线，蓝虚线把它接回曲线，一级一级往下滑。
      盯着误差看它有多快：<b>{{ errs.map((e, i) => 'x' + i + '误差 ' + (e < 1e-14 ? '0' : e.toExponential(1))).join('　') }}</b>——
      每迭代一步，正确的小数位数<b>大致翻一倍</b>（0.1 → 0.01 → 0.0001 → 0.00000001），这叫<b>二次收敛</b>，快得离谱。
      这个迭代式化简后正好是 <b>x ←（x + 2/x）/ 2</b>：猜一个数、和它除 2 的商取平均——四千年前巴比伦人开方用的就是它。
      但牛顿法也脆：把 x₀ 拖到很靠近 0，切线几乎水平，下一步会被甩到很远——好初值是它的命门。
    </template>
  </DemoFrame>
</template>
