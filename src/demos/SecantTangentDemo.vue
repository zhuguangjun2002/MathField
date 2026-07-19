<script setup>
import { ref, computed } from 'vue'
import { usePlot, makeView, drawAxes, plotFn, drawPoint, drawLabel, C, fmt } from './plot.js'
import DemoFrame from '../components/DemoFrame.vue'
import ControlSlider from '../components/ControlSlider.vue'

// 自由落体：s(t) = 5t²（取 g ≈ 10 m/s²）
const s = (t) => 5 * t * t

const canvas = ref(null)
const t0 = ref(1.0)
const logH = ref(0) // h = 10^logH
const h = computed(() => Math.pow(10, logH.value))

const avgV = computed(() => (s(t0.value + h.value) - s(t0.value)) / h.value)
const instV = computed(() => 10 * t0.value)

usePlot(
  canvas,
  (ctx, w, hh) => {
    const v = makeView(w, hh, 0, 3.2, 0, 36)
    drawAxes(ctx, v, {
      xTicks: [1, 2, 3],
      yTicks: [10, 20, 30],
      xLabel: 't（秒）',
      yLabel: 's（米）',
    })

    const a = t0.value
    const b = t0.value + h.value

    // 切线（要逼近的目标，虚线）
    plotFn(ctx, v, (x) => s(a) + 10 * a * (x - a), {
      color: C.indigo,
      width: 1.8,
      dash: [7, 5],
    })

    // 割线
    const slope = avgV.value
    plotFn(ctx, v, (x) => s(a) + slope * (x - a), { color: C.accent, width: 2.2 })

    // 曲线本体
    plotFn(ctx, v, s, { color: C.ink, width: 2.6 })

    // Δt、Δs 的直角边
    ctx.strokeStyle = C.gold
    ctx.lineWidth = 1.6
    ctx.setLineDash([3, 3])
    ctx.beginPath()
    ctx.moveTo(v.X(a), v.Y(s(a)))
    ctx.lineTo(v.X(b), v.Y(s(a)))
    ctx.lineTo(v.X(b), v.Y(s(b)))
    ctx.stroke()
    ctx.setLineDash([])
    if (h.value > 0.12) {
      drawLabel(ctx, (v.X(a) + v.X(b)) / 2, v.Y(s(a)) + 18, 'Δt = h', {
        color: C.gold,
        align: 'center',
      })
      drawLabel(ctx, v.X(b) + 8, (v.Y(s(a)) + v.Y(s(b))) / 2, 'Δs', { color: C.gold })
    }

    drawPoint(ctx, v, a, s(a), { color: C.accent })
    drawPoint(ctx, v, b, s(b), { color: C.accent, hollow: true })
    drawLabel(ctx, v.X(a) - 8, v.Y(s(a)) - 10, `t₀=${fmt(a)}`, { color: C.accent, align: 'right' })

    drawLabel(ctx, v.pad.l + 10, v.pad.t + 18, '— 割线（平均速度）', { color: C.accent })
    drawLabel(ctx, v.pad.l + 10, v.pad.t + 38, '- - 切线（瞬时速度）', { color: C.indigo })
  },
  { height: 380, watchSources: [t0, logH] },
)
</script>

<template>
  <DemoFrame title="从平均速度到瞬时速度：割线倒向切线">
    <canvas ref="canvas" class="demo-canvas"></canvas>
    <template #controls>
      <ControlSlider
        label="时刻 t₀"
        v-model="t0"
        :min="0.4"
        :max="2.2"
        :step="0.05"
        :display="(x) => x.toFixed(2) + ' s'"
      />
      <ControlSlider
        label="时间间隔 h（对数刻度）"
        v-model="logH"
        :min="-3"
        :max="0"
        :step="0.01"
        :display="() => h.toFixed(3) + ' s'"
      />
    </template>
    <template #readout>
      [t₀, t₀+h] 上的平均速度 Δs/Δt = <b>{{ avgV.toFixed(4) }}</b> m/s
      &nbsp;&nbsp;→&nbsp;&nbsp; t₀ 时刻的瞬时速度 = <b>{{ instV.toFixed(4) }}</b> m/s
      &nbsp;&nbsp;（差距 {{ Math.abs(avgV - instV).toExponential(2) }}）
    </template>
    <template #note>
      石头下落的距离是 s(t) = 5t²。把 h 从 1 秒一路缩小到 0.001 秒：割线（红）越来越贴近切线（蓝），
      平均速度稳稳地逼近 10·t₀ —— 这个「逼近的目标值」就是导数。注意 h 永远不等于 0
      （否则 0/0 没有意义），但目标值却清清楚楚。
    </template>
  </DemoFrame>
</template>
