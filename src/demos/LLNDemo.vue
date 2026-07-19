<script setup>
import { ref, computed } from 'vue'
import { usePlot, makeView, drawAxes, drawLabel, C, fmt, rng } from './plot.js'
import DemoFrame from '../components/DemoFrame.vue'
import ControlSlider from '../components/ControlSlider.vue'

const NMAX = 10000
const K = 6 // 轨迹条数
const eps = ref(0.1)
const seed = ref(1)

// K 条"掷骰子 NMAX 次"的样本均值轨迹
const trajectories = computed(() => {
  const out = []
  for (let k = 0; k < K; k++) {
    const r = rng(97 * seed.value + k)
    const means = new Float64Array(NMAX + 1)
    let sum = 0
    for (let n = 1; n <= NMAX; n++) {
      sum += Math.floor(r() * 6) + 1
      means[n] = sum / n
    }
    out.push(means)
  }
  return out
})

// 每条轨迹最后一次跑出 ε 带的时刻
const lastExit = computed(() =>
  trajectories.value.map((m) => {
    for (let n = NMAX; n >= 1; n--) {
      if (Math.abs(m[n] - 3.5) > eps.value) return n
    }
    return 0
  }),
)

const PALETTE = [C.accent, C.indigo, C.gold, C.green, '#7a4a8f', C.ink]

const canvas = ref(null)
usePlot(
  canvas,
  (ctx, w, h) => {
    // x 轴取 log10(n)：前几十次的疯狂和后几千次的沉稳才能同框
    const v = makeView(w, h, 0, 4, 1, 6, { l: 40 })
    drawAxes(ctx, v, {
      xTicks: [0, 1, 2, 3, 4],
      yTicks: [2, 3, 4, 5, 6],
      xLabel: 'lg n',
      yLabel: '前 n 次平均',
    })

    // ε 带
    ctx.save()
    ctx.fillStyle = C.greenSoft
    const yTop = v.Y(3.5 + eps.value)
    const yBot = v.Y(3.5 - eps.value)
    ctx.fillRect(v.pad.l, yTop, v.iw, yBot - yTop)
    ctx.strokeStyle = C.green
    ctx.setLineDash([5, 4])
    ctx.lineWidth = 1.2
    ctx.beginPath()
    ctx.moveTo(v.pad.l, v.Y(3.5))
    ctx.lineTo(v.pad.l + v.iw, v.Y(3.5))
    ctx.stroke()
    ctx.restore()
    drawLabel(ctx, v.pad.l + v.iw - 8, yTop - 6, `期望 3.5 ± ε`, { color: C.green, align: 'right' })

    // 轨迹（对数轴上自适应抽点）
    ctx.save()
    ctx.beginPath()
    ctx.rect(v.pad.l, v.pad.t, v.iw, v.ih)
    ctx.clip()
    trajectories.value.forEach((m, k) => {
      ctx.strokeStyle = PALETTE[k]
      ctx.lineWidth = 1.5
      ctx.globalAlpha = 0.85
      ctx.beginPath()
      let n = 1
      let first = true
      while (n <= NMAX) {
        const px = v.X(Math.log10(n))
        const py = v.Y(m[n])
        first ? ctx.moveTo(px, py) : ctx.lineTo(px, py)
        first = false
        n = n < 100 ? n + 1 : Math.ceil(n * 1.02)
      }
      ctx.stroke()
    })
    ctx.restore()
  },
  { height: 340, watchSources: [eps, seed] },
)
</script>

<template>
  <DemoFrame title="大数定律：六条骰子均值轨迹的归途">
    <canvas ref="canvas" class="demo-canvas"></canvas>
    <template #controls>
      <ControlSlider label="精度要求 ε" v-model="eps" :min="0.02" :max="0.5" :step="0.01" />
      <ControlSlider label="换一批骰子（种子）" v-model="seed" :min="1" :max="20" :step="1" />
    </template>
    <template #readout>
      这一批里，六条轨迹最后一次跑出 ε 带发生在 n = <b>{{ Math.max(...lastExit) }}</b>
      —— 此后到 10000 次为止全部安分守己
    </template>
    <template #note>
      六条彩线是六个人各掷 10000 次骰子的"前 n 次平均"。开头（左侧）人人大起大落——
      前几把的运气就是能把均值拽到 2 或 5；但往右走，所有轨迹都被吸进期望 3.5 的绿色 ε 带里再也不出来。
      把 ε 收紧到 0.02，轨迹们"安分"得更晚，但<b>仍然全部安分</b>——只是需要更大的 n。
      是不是很眼熟？这正是微积分第一讲那场 ε-N 攻防：你出精度 ε，我答门槛 N。
      大数定律就是"数列极限"披上随机外衣的样子（差别在于这里的保证是"以概率 1"而非"必然"——
      理论上存在永远掷出 6 的倒霉序列，只是它的概率为零）。换几批种子，看看结论稳不稳。
    </template>
  </DemoFrame>
</template>
