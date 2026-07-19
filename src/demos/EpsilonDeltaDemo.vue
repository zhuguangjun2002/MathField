<script setup>
import { ref, computed } from 'vue'
import { usePlot, makeView, drawAxes, plotFn, drawPoint, drawLabel, C } from './plot.js'
import DemoFrame from '../components/DemoFrame.vue'
import ControlSlider from '../components/ControlSlider.vue'

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
        label="对手出招 ε"
        v-model="eps"
        :min="0.1"
        :max="1.4"
        :step="0.01"
        :display="(x) => x.toFixed(2)"
      />
      <ControlSlider
        label="你的应答 δ"
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
      函数 f(x) = (x²−1)/(x−1) 在 x = 1 处根本没有定义（分母为零），但这不妨碍我们谈论
      「x 无限接近 1 时 f(x) 无限接近 2」。对手任意给一个苛刻的 ε，你都能找到应答的
      δ（这里只要 δ ≤ ε 就行）—— 所以极限存在且等于 2。
    </template>
  </DemoFrame>
</template>
