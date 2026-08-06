<script setup>
import { ref, computed } from 'vue'
import { usePlot, makeView, drawAxes, plotFn, drawPoint, drawLabel, C, fmt } from './plot.js'
import DemoFrame from '../components/DemoFrame.vue'
import ControlSlider from '../components/ControlSlider.vue'
import MathInline from '../components/MathInline.vue'

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

// 视野随迭代序列自适应：默认 [0, 3.4] 够用；一旦初值太小把切线甩出去
// （x₀ = 0.1 时 x₁ 就跳到 10.1），画面必须跟着撑开，否则"被甩远"这件事根本看不见。
const XMAX = computed(() => Math.max(3.4, Math.max(...seq.value) * 1.12))
const YMAX = computed(() => Math.max(9, f(XMAX.value) * 1.05))
const overshot = computed(() => Math.max(...seq.value) > 3.4)

const canvas = ref(null)
usePlot(
  canvas,
  (ctx, w, h) => {
    const v = makeView(w, h, 0, XMAX.value, -0.35 * YMAX.value, YMAX.value)
    const xt = overshot.value ? [1, 2, 3].concat(XMAX.value > 8 ? [5, 10] : [5]) : [1, 2, 3]
    drawAxes(ctx, v, {
      xTicks: xt.filter((t) => t < XMAX.value),
      yTicks: overshot.value ? [] : [-2, 0, 2, 4, 6, 8],
      xLabel: 'x',
      yLabel: 'f(x)=x²−2',
    })

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
      <ControlSlider label="初始猜测 x₀" v-model="x0" :min="0.1" :max="3.4" :step="0.05" :display="(v) => fmt(v, 2)" />
      <ControlSlider label="迭代步数" v-model="steps" :min="0" :max="6" :step="1" />
    </template>
    <template #readout>
      第 {{ steps }} 步的近似值 x<sub>{{ steps }}</sub> = <b>{{ xn.toPrecision(10) }}</b>，
      误差 <b>{{ errs[errs.length - 1] < 1e-14 ? '≈ 0（已到机器精度）' : errs[errs.length - 1].toExponential(2) }}</b>
    </template>
    <template #note>
      <b>两个旋钮。</b><b>初始猜测 x₀</b> 是你随手报的第一个数——
      <b>它不影响方程，只影响要走几步，有时还影响走不走得到</b>；
      <b>迭代步数</b>是让算法往前推几轮，拖到 0 就只剩你那个初值。
      横轴范围会<b>随迭代序列自动撑开</b>：默认停在 [0, 3.4]，
      一旦某一步被甩出去，画布跟着放大，好让你看见它飞到哪儿了。
      <br /><br />
      方程 <b>x² − 2 = 0</b> 你一眼知道根是 <MathInline tex="\sqrt{2}" />，但计算器芯片不认识"√"这个符号，它只会加减乘除。
      牛顿的主意：在当前猜测处画一条<b>切线</b>（曲线太难，就用它的一次泰勒近似代替），
      切线撞到横轴的地方就是更好的下一个猜测。红色斜线就是切线，蓝虚线把它接回曲线，一级一级往下滑。
      盯着误差看它有多快：<b>{{ errs.map((e, i) => 'x' + i + '误差 ' + (e < 1e-14 ? '0' : e.toExponential(1))).join('　') }}</b>——
      每迭代一步，正确的小数位数<b>大致翻一倍</b>（0.1 → 0.01 → 0.0001 → 0.00000001），这叫<b>二次收敛</b>，快得离谱。
      这个迭代式化简后正好是 <b>x ←（x + 2/x）/ 2</b>：猜一个数、和它除 2 的商取平均——四千年前巴比伦人开方用的就是它。
      <br /><br />
      <b>但牛顿法也脆，而且这件事现在可以亲手拖出来。</b>把 x₀ 拖到最小的 <b>0.10</b>：
      那里曲线几乎水平（f′(0.1) = 0.2），切线趴着，一撞横轴就把下一步甩到
      <b>x₁ = 10.05</b>——画布为此撑到了十倍宽，你能亲眼看见它飞出去。
      此后它还是会老老实实爬回来（10.05 → 5.12 → 2.76 → 1.74 → 1.44 → 1.4145），
      但<b>六步全用完，误差仍有 2.9×10⁻⁴</b>；而 x₀ = 1.5 时<b>四步就顶到机器精度</b>
      （从 0.10 出发要走满 8 步才追平）。
      <b>坏初值不会让牛顿法算错，只会让它先浪费几步走回来</b>——
      可如果函数不像抛物线这么听话（有多个根、或有极值挡在路上），
      那几步就可能把你送到<b>另一个根</b>，甚至发散。<b>好初值是它一辈子的命门。</b>
    </template>
  </DemoFrame>
</template>
