<script setup>
import { ref, computed } from 'vue'
import { usePlot, makeView, drawAxes, plotFn, drawLabel, C, fmt } from './plot.js'
import DemoFrame from '../components/DemoFrame.vue'
import ControlSlider from '../components/ControlSlider.vue'

const MODE = ref('travel') // travel | standing
const t = ref(0)

// —— 行波视角：初始鼓包 φ(x)（初速为零），解 = 左右各半的行波
const bump = (x) => Math.exp(-40 * (x - 0.5) * (x - 0.5))
// 两端固定 [0,1]：用奇延拓的周期像正确处理反弹
function oddExt(f, x) {
  let y = ((x % 2) + 2) % 2 // 周期 2
  return y <= 1 ? f(y) : -f(2 - y)
}
const travelU = (x, tt) => 0.5 * (oddExt(bump, x - tt) + oddExt(bump, x + tt))

// —— 驻波视角：前 5 个模式叠加逼近同一个鼓包
const NMODES = 5
const coefs = Array.from({ length: NMODES }, (_, k) => {
  // b_n = 2∫₀¹ bump(x) sin(nπx) dx，数值梯形
  const n = k + 1
  let s = 0
  const N = 400
  for (let i = 0; i <= N; i++) {
    const x = i / N
    const w = i === 0 || i === N ? 0.5 : 1
    s += w * bump(x) * Math.sin(n * Math.PI * x)
  }
  return (2 * s) / N
})
const modeU = (n, x, tt) => coefs[n - 1] * Math.sin(n * Math.PI * x) * Math.cos(n * Math.PI * tt)
const standingU = (x, tt) => {
  let s = 0
  for (let n = 1; n <= NMODES; n++) s += modeU(n, x, tt)
  return s
}

const MODECOLORS = [C.accent, C.indigo, C.gold, C.green, '#7a4a8f']

const canvas = ref(null)
usePlot(
  canvas,
  (ctx, w, h) => {
    const v = makeView(w, h, 0, 1, -1.25, 1.25)
    drawAxes(ctx, v, { xTicks: [0, 0.5, 1], yTicks: [-1, 1], xLabel: 'x', yLabel: 'u' })

    if (MODE.value === 'travel') {
      // 两个半波各自的位置（虚线）+ 叠加（实线）
      plotFn(ctx, v, (x) => 0.5 * oddExt(bump, x - t.value), { color: C.indigo, width: 1.6, dash: [5, 4] })
      plotFn(ctx, v, (x) => 0.5 * oddExt(bump, x + t.value), { color: C.gold, width: 1.6, dash: [5, 4] })
      plotFn(ctx, v, (x) => travelU(x, t.value), { color: C.ink, width: 2.8 })
      drawLabel(ctx, v.pad.l + 8, v.pad.t + 18, '蓝：右行波 f(x−ct)　金：左行波 g(x+ct)　黑：两者之和', {
        color: C.soft,
        size: 12,
      })
    } else {
      for (let n = 1; n <= NMODES; n++) {
        plotFn(ctx, v, (x) => modeU(n, x, t.value), { color: MODECOLORS[n - 1], width: 1.3, dash: [4, 4] })
      }
      plotFn(ctx, v, (x) => standingU(x, t.value), { color: C.ink, width: 2.8 })
      drawLabel(ctx, v.pad.l + 8, v.pad.t + 18, '虚线：5 个驻波模式各奏各的　黑：合奏（叠加）', {
        color: C.soft,
        size: 12,
      })
    }
    drawLabel(ctx, v.pad.l + v.iw - 8, v.pad.t + 18, `t = ${fmt(t.value)}`, { color: C.ink, align: 'right' })
  },
  { height: 340, watchSources: [t, MODE] },
)
</script>

<template>
  <DemoFrame title="同一根弦的两种解释：行波在跑 vs 驻波在合奏">
    <canvas ref="canvas" class="demo-canvas"></canvas>
    <template #controls>
      <label class="ctrl">
        <span class="ctrl-label">视角</span>
        <select v-model="MODE" class="ctrl-select">
          <option value="travel">达朗贝尔：行波分解</option>
          <option value="standing">伯努利：驻波叠加</option>
        </select>
      </label>
      <ControlSlider label="时间 t" v-model="t" :min="0" :max="2" :step="0.005" />
    </template>
    <template #readout>
      <template v-if="MODE === 'travel'">初始鼓包劈成两半，各以速度 c = 1 向左右跑；碰到固定端上下翻转弹回</template>
      <template v-else>
        鼓包 ≈ {{ coefs.map((c, i) => `${fmt(c, 2)}·sin(${i + 1}πx)`).slice(0, 3).join(' + ') }} + …（各模式频率是基频的整数倍）
      </template>
    </template>
    <template #note>
      拖动时间，两个视角看同一件事。<b>达朗贝尔说</b>：解就是"一半向左跑 + 一半向右跑"，
      u = f(x−ct) + g(x+ct)——注意波形碰到固定端点会<b>翻转反弹</b>，这是回声的数学。
      <b>伯努利说</b>：解是若干"驻波"的合奏——每个模式原地站桩振动（波形不跑，只是幅度按各自频率伸缩），
      节点越多的模式振得越快（频率恰是基频的 2、3、4 倍——这就是音乐里的<b>泛音列</b>，
      吉他为什么在 1/2 处按出高八度）。两边都对，可当年谁也不服谁：任意的尖鼓包怎么可能是圆滑正弦之和？
      这场争论吵了半个世纪，答案在下一讲由一个"外行"给出。
    </template>
  </DemoFrame>
</template>
