<script setup>
import { ref, computed } from 'vue'
import { usePlot, makeView, drawAxes, plotFn, drawLabel, C, fmt } from './plot.js'
import DemoFrame from '../components/DemoFrame.vue'
import ControlSlider from '../components/ControlSlider.vue'

// 同一初始条件（偏左的三角形拨弦），在波动方程 vs 热方程下演化
const EQ = ref('wave')
const t = ref(0)
const NMODES = 7

const pluck = (x) => (x < 0.3 ? x / 0.3 : (1 - x) / 0.7) // 在 x=0.3 处拨起

const coefs = Array.from({ length: NMODES }, (_, k) => {
  const n = k + 1
  let s = 0
  const N = 500
  for (let i = 0; i <= N; i++) {
    const x = i / N
    const w = i === 0 || i === N ? 0.5 : 1
    s += w * pluck(x) * Math.sin(n * Math.PI * x)
  }
  return (2 * s) / N
})

// 每个模式的时间因子：波动 cos(nπt)，热 e^{−n²π²τ}（τ 用缩放的 t）
const timeFactor = (n, tt) =>
  EQ.value === 'wave' ? Math.cos(n * Math.PI * tt) : Math.exp(-n * n * Math.PI * Math.PI * tt * 0.02)

const solution = (x, tt) => {
  let s = 0
  for (let n = 1; n <= NMODES; n++) s += coefs[n - 1] * Math.sin(n * Math.PI * x) * timeFactor(n, tt)
  return s
}

const MODECOLORS = [C.accent, C.indigo, C.gold, C.green, '#7a4a8f', '#4a8f8a', '#8f6a4a']

const canvas = ref(null)
usePlot(
  canvas,
  (ctx, w, h) => {
    const v = makeView(w, h, 0, 1, -1.1, 1.1)
    drawAxes(ctx, v, { xTicks: [0, 0.3, 1], yTicks: [-1, 1], xLabel: 'x', yLabel: 'u' })

    // 初始形状（灰虚线）
    plotFn(ctx, v, pluck, { color: 'rgba(139, 132, 148, 0.5)', width: 1.4, dash: [6, 4] })
    // 各模式
    for (let n = 1; n <= NMODES; n++) {
      plotFn(ctx, v, (x) => coefs[n - 1] * Math.sin(n * Math.PI * x) * timeFactor(n, t.value), {
        color: MODECOLORS[n - 1] + '88',
        width: 1.1,
      })
    }
    // 叠加解
    plotFn(ctx, v, (x) => solution(x, t.value), { color: C.ink, width: 2.8, samples: 600 })

    drawLabel(
      ctx,
      v.pad.l + 8,
      v.pad.t + 18,
      EQ.value === 'wave' ? '波动：每个模式按各自频率振荡（能量不灭）' : '热：每个模式按 e^(−n²π²τ) 衰减（高频先死）',
      { color: C.soft, size: 12 },
    )
  },
  { height: 340, watchSources: [EQ, t] },
)

const modeStatus = computed(() =>
  [1, 2, 3].map((n) => `模式${n}: ${fmt(coefs[n - 1], 2)}×${fmt(timeFactor(n, t.value), 2)}`).join('　'),
)
</script>

<template>
  <DemoFrame title="分离变量：同一份初始条件，两种方程两种命运">
    <canvas ref="canvas" class="demo-canvas"></canvas>
    <template #controls>
      <label class="ctrl">
        <span class="ctrl-label">方程</span>
        <select v-model="EQ" class="ctrl-select">
          <option value="wave">波动方程（弦振动）</option>
          <option value="heat">热方程（温度分布）</option>
        </select>
      </label>
      <ControlSlider label="时间 t" v-model="t" :min="0" :max="2" :step="0.005" />
    </template>
    <template #readout>
      解 = Σ bₙ·sin(nπx)·Tₙ(t)，各模式系数×时间因子：{{ modeStatus }}
    </template>
    <template #note>
      灰虚线是同一份初始条件（在 x = 0.3 处拨起的弦 / 同形状的初始温度）。解法三步走：
      <b>① 分解</b>——把初始形状拆到正弦模式上（细彩线，系数 bₙ 由傅里叶积分给出）；
      <b>② 独立演化</b>——每个模式不理会别人，按自己的常微分方程走：波动方程给它配
      cos(nπt)（永恒振荡），热方程给它配 e^(−n²π²τ)（指数消亡）；
      <b>③ 叠加</b>——黑线 = 各模式之和。切换方程看两种命运：同一份初始数据，
      在波动方程下永远荡下去（拖到任何 t 形状都还"记得"当初），在热方程下高频秒死、
      最终归于平坦（历史被遗忘——这就是可逆与不可逆的分水岭）。
      整套流程你在线代第五讲见过一模一样的：<b>按特征向量分解 → 各特征值独立演化 → 叠加</b>。
      正弦函数就是这里的特征向量，分离变量法就是函数空间里的对角化。
    </template>
  </DemoFrame>
</template>
