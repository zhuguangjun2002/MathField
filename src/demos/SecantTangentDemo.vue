<script setup>
import { ref, computed } from 'vue'
import { usePlot, makeView, drawAxes, plotFn, drawPoint, drawLabel, C, fmt } from './plot.js'
import DemoFrame from '../components/DemoFrame.vue'
import ControlSlider from '../components/ControlSlider.vue'
import MathInline from '../components/MathInline.vue'

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

    drawLabel(ctx, v.pad.l + 10, v.pad.t + 40, '— 割线（平均速度）', { color: C.accent })
    drawLabel(ctx, v.pad.l + 10, v.pad.t + 60, '- - 切线（瞬时速度）', { color: C.indigo })
  },
  { height: 380, watchSources: [t0, logH] },
)
</script>

<template>
  <DemoFrame title="从平均速度到瞬时速度：割线倒向切线">
    <canvas ref="canvas" class="demo-canvas"></canvas>
    <template #controls>
      <ControlSlider
        label="时刻 t₀（秒·真参数）"
        v-model="t0"
        :min="0.4"
        :max="2.2"
        :step="0.05"
        :display="(x) => x.toFixed(2) + ' s'"
      />
      <ControlSlider
        label="时间间隔 h（秒·对数刻度）"
        v-model="logH"
        :min="-3"
        :max="0"
        :step="0.01"
        :display="() => h.toFixed(3) + ' s'"
      />
    </template>
    <template #readout>
      [t₀, t₀+h] 平均速度 Δs/Δt = <b>{{ avgV.toFixed(4) }}</b> m/s
      &nbsp;&nbsp;→&nbsp;&nbsp; 瞬时速度 = <b>{{ instV.toFixed(4) }}</b> m/s
      &nbsp;（差距 {{ Math.abs(avgV - instV).toExponential(2) }}）
    </template>
    <template #note>
      <p><b>两个旋钮分别是什么</b></p>
      <ul>
        <li>
          <b>时刻 t₀</b>：想问哪一瞬间的速度，单位秒。这是<strong>真物理参数</strong>——
          换一个 t₀，答案跟着变（自由落体越落越快）。
        </li>
        <li>
          <b>时间间隔 h</b>：拿来求平均速度的那段时间有多长，单位也是秒，
          量的是从 t₀ 往右延伸多远。滑杆走的是<strong>对数刻度</strong>——
          它拖的其实是 <MathInline tex="\lg h" />，从 −3 到 0，所以 h 在
          <strong>0.001 秒到 1 秒</strong>之间跑；这么设是因为 h 要缩小好几个数量级才看得出门道，
          线性刻度全挤在左端。读数区旁边显示的始终是 h 本身，不是滑杆值。
        </li>
      </ul>
      <p>
        <b>图上三条线</b>：黑色是路程曲线 <MathInline tex="s(t) = 5t^2" />（米）；
        红色是<strong>割线</strong>，连接 <MathInline tex="t_0" /> 与
        <MathInline tex="t_0 + h" /> 两点，它的斜率就是这段的平均速度；
        蓝色虚线是<strong>切线</strong>，也就是要逼近的目标。金色的两条直角边标出
        <MathInline tex="\Delta t = h" /> 与 <MathInline tex="\Delta s" />，
        平均速度就是这两条边之比。
      </p>
      <p>
        <b>照着做一遍</b>：把 t₀ 停在 1.00，然后把 h 从 1 一路拖到 0.001，
        盯着读数区的三个数——平均速度从 <b>15</b> 依次经过 <b>10.5</b>、<b>10.05</b> 落到
        <b>10.005</b>，而差距那一栏从 5.00e+0 一路掉到 5.00e−3：
        <strong>h 每缩小 10 倍，差距也正好缩小 10 倍</strong>。
        这不是巧合——正文算过，平均速度恒等于 <MathInline tex="10\,t_0 + 5h" />，
        差距就是 <MathInline tex="5h" />。
      </p>
      <p>
        再把 t₀ 拖到 2.00 重来一次：目标值换成了 20，但"差距 = 5h"这条规律纹丝不动。
        <strong>注意 h 永远不等于 0</strong>（滑杆最左端也只是 0.001），所以 0/0 从未发生，
        可那个"逼近的目标"却清清楚楚——这就是导数。
      </p>
    </template>
  </DemoFrame>
</template>
