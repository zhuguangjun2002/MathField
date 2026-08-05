<script setup>
import { ref, computed } from 'vue'
import { usePlot, makeView, drawAxes, plotFn, drawPoint, drawLabel, C } from './plot.js'
import DemoFrame from '../components/DemoFrame.vue'
import ControlSlider from '../components/ControlSlider.vue'
import MathInline from '../components/MathInline.vue'

// f(x) = (x² − 1)/(x − 1)：在 x = 1 处无定义，但极限是 2
const f = (x) => (x * x - 1) / (x - 1)
const A = 1
const L = 2

const canvas = ref(null)
const eps = ref(0.6)
const delta = ref(0.9)

const ok = computed(() => delta.value <= eps.value + 1e-9)

usePlot(
  canvas,
  (ctx, w, h) => {
    const v = makeView(w, h, -0.6, 3, -0.4, 4.2)
    drawAxes(ctx, v, { xTicks: [1, 2], yTicks: [2], xLabel: 'x', yLabel: 'f(x)' })

    // 水平 ε 带（目标区）
    ctx.fillStyle = C.indigoSoft
    ctx.fillRect(v.pad.l, v.Y(L + eps.value), v.iw, v.Y(L - eps.value) - v.Y(L + eps.value))

    // 垂直 δ 带（我方承诺区）
    ctx.fillStyle = C.accentSoft
    ctx.fillRect(v.X(A - delta.value), v.pad.t, v.X(A + delta.value) - v.X(A - delta.value), v.ih)

    // 曲线整体
    plotFn(ctx, v, f, { color: C.ink, width: 2 })

    // δ 带内的曲线段：达标则绿、超标则红
    ctx.save()
    ctx.beginPath()
    ctx.rect(v.X(A - delta.value), v.pad.t, v.X(A + delta.value) - v.X(A - delta.value), v.ih)
    ctx.clip()
    plotFn(ctx, v, f, { color: ok.value ? C.green : C.accent, width: 3.4 })
    ctx.restore()

    // 虚线标注 L 与 a
    ctx.strokeStyle = C.soft
    ctx.setLineDash([4, 4])
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(v.pad.l, v.Y(L))
    ctx.lineTo(v.X(A), v.Y(L))
    ctx.lineTo(v.X(A), v.pad.t + v.ih)
    ctx.stroke()
    ctx.setLineDash([])

    // x=1 处的“洞”
    drawPoint(ctx, v, A, L, { color: C.ink, hollow: true })
    drawLabel(ctx, v.X(A) + 10, v.Y(L) - 10, 'x=1 处没有定义！', { color: C.soft })
    drawLabel(ctx, v.pad.l + 6, v.Y(L + eps.value) - 6, 'L + ε', { color: C.indigo })
    drawLabel(ctx, v.pad.l + 6, v.Y(L - eps.value) + 16, 'L − ε', { color: C.indigo })
    drawLabel(ctx, v.X(A - delta.value) + 4, v.pad.t + v.ih - 8, '1−δ', { color: C.accent })
    drawLabel(ctx, v.X(A + delta.value) + 4, v.pad.t + v.ih - 8, '1+δ', { color: C.accent })
  },
  { height: 360, watchSources: [eps, delta] },
)
</script>

<template>
  <DemoFrame title="ε–δ 攻防：函数极限的严格定义">
    <canvas ref="canvas" class="demo-canvas"></canvas>
    <template #controls>
      <ControlSlider
        label="对手出招 ε（纵向容差）"
        v-model="eps"
        :min="0.1"
        :max="1.4"
        :step="0.01"
        :display="(x) => x.toFixed(2)"
      />
      <ControlSlider
        label="你的应答 δ（横向半径）"
        v-model="delta"
        :min="0.05"
        :max="1.5"
        :step="0.01"
        :display="(x) => x.toFixed(2)"
      />
    </template>
    <template #readout>
      <template v-if="ok">
        ✅ <b>δ = {{ delta.toFixed(2) }} 可行</b>：只要 0 &lt; |x−1| &lt; δ，曲线（绿色段）就全部落在 L±ε 的蓝带里。
      </template>
      <template v-else>
        ❌ <b>δ = {{ delta.toFixed(2) }} 太大了</b>：红色段跑出了蓝带 —— 把 δ 调小一点再试。
      </template>
    </template>
    <template #note>
      <p><b>两个旋钮分别是什么</b></p>
      <ul>
        <li>
          <b>对手出招 ε</b>：函数值<strong>允许偏离 2 多少</strong>，量在纵轴上。
          蓝色横带就是 <MathInline tex="2 \pm \varepsilon" />，ε 越小带子越扁。
        </li>
        <li>
          <b>你的应答 δ</b>：x <strong>允许偏离 1 多少</strong>，量在横轴上。
          红色竖带就是 <MathInline tex="1 \pm \delta" />，它是你交的答卷。
        </li>
      </ul>
      <p>
        两个都是普通正数，没有一个是"无穷小"。判定规则：竖带内的那段曲线（加粗）
        <strong>整段落在蓝带里就算达标</strong>，探出去一点就变红判负。
      </p>
      <p>
        <b>画的是哪条曲线</b>：<MathInline tex="f(x) = \dfrac{x^2-1}{x-1}" />，它在
        <MathInline tex="x = 1" /> 处分母为零、<strong>根本没有定义</strong>（图上那个空心圈）。
        但 <MathInline tex="x \neq 1" /> 时约分就是 <MathInline tex="x+1" />，所以
        <MathInline tex="|f(x)-2| = |x-1|" />——<strong>这就是本例只要
        <MathInline tex="\delta \le \varepsilon" /> 就一定达标的全部原因</strong>
        （正文那个"δ 到底怎么找"的折叠框里连非平凡的例子一起算过）。
      </p>
      <p>
        <b>照着做一遍</b>：把 ε 拖到 0.10，再把 δ 从 1.50 慢慢往下拖——δ 一跨过 0.10
        曲线就由红转绿。反过来固定 δ = 0.90 再把 ε 从 1.40 往下拖，ε 跌破 0.90 时判负。
        <strong>始终是"δ ≤ ε 才达标"这一条线在起作用，而它是算出来的，不是调出来的。</strong>
        顺带注意：无论怎么拖，<MathInline tex="x = 1" /> 那个空心点从来没被用到过——
        极限只问"接近时的趋势"，不问该点本身。
      </p>
    </template>
  </DemoFrame>
</template>
