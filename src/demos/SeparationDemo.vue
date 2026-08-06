<script setup>
import { ref, computed } from 'vue'
import { usePlot, makeView, drawAxes, plotFn, drawLabel, C, fmt } from './plot.js'
import DemoFrame from '../components/DemoFrame.vue'
import ControlSlider from '../components/ControlSlider.vue'
import MathInline from '../components/MathInline.vue'

// 同一初始条件（偏左的三角形拨弦），在波动方程 vs 热方程下演化
const EQ = ref('wave')
const t = ref(0)
const NMODES = 7

// 拨弦位置可调：正文要讲"拨在哪儿决定哪些泛音缺席"，读者得能亲手拖到 0.5、0.2 上去验
const pluckPos = ref(0.3)
const pluck = (x) =>
  x < pluckPos.value ? x / pluckPos.value : (1 - x) / (1 - pluckPos.value)

// bₙ = 2/(n²π²) · 1/(p(1−p)) · sin(nπp)（解析式，已与数值积分逐位核对）
const coefs = computed(() =>
  Array.from({ length: NMODES }, (_, k) => {
    const n = k + 1
    const p = pluckPos.value
    return (2 / (n * n * Math.PI * Math.PI) / (p * (1 - p))) * Math.sin(n * Math.PI * p)
  }),
)

// 每个模式的时间因子：波动 cos(nπt)，热 e^{−n²π²τ}（τ 用缩放的 t）
const timeFactor = (n, tt) =>
  EQ.value === 'wave' ? Math.cos(n * Math.PI * tt) : Math.exp(-n * n * Math.PI * Math.PI * tt * 0.02)

const solution = (x, tt) => {
  let s = 0
  for (let n = 1; n <= NMODES; n++)
    s += coefs.value[n - 1] * Math.sin(n * Math.PI * x) * timeFactor(n, tt)
  return s
}

const MODECOLORS = [C.accent, C.indigo, C.gold, C.green, '#7a4a8f', '#4a8f8a', '#8f6a4a']

const canvas = ref(null)
usePlot(
  canvas,
  (ctx, w, h) => {
    const v = makeView(w, h, 0, 1, -1.1, 1.1)
    drawAxes(ctx, v, { xTicks: [0, pluckPos.value, 1], yTicks: [-1, 1], xLabel: 'x', yLabel: 'u' })

    // 初始形状（灰虚线）
    plotFn(ctx, v, pluck, { color: 'rgba(139, 132, 148, 0.5)', width: 1.4, dash: [6, 4] })
    // 各模式
    for (let n = 1; n <= NMODES; n++) {
      plotFn(ctx, v, (x) => coefs.value[n - 1] * Math.sin(n * Math.PI * x) * timeFactor(n, t.value), {
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
  { height: 340, watchSources: [EQ, t, pluckPos] },
)

// 各模式的相对强度（以基频为 1），最能看出"拨在哪儿，哪些泛音缺席"
const modeStatus = computed(() => {
  const b1 = Math.abs(coefs.value[0]) || 1e-9
  return [1, 2, 3, 4, 5]
    .map((n) => `${n}:${((Math.abs(coefs.value[n - 1]) / b1) * 100).toFixed(0)}`)
    .join(' ')
})
const t1Status = computed(() =>
  [1, 2, 3].map((n) => `${n}:${fmt(timeFactor(n, t.value), 2)}`).join(' '),
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
      <ControlSlider label="拨弦位置 p（占弦长）" v-model="pluckPos" :min="0.05" :max="0.5" :step="0.01" />
      <ControlSlider label="时间 t" v-model="t" :min="0" :max="2" :step="0.005" />
    </template>
    <template #readout>
      泛音强度（基频 100）<b>{{ modeStatus }}</b>&nbsp;&nbsp;时间因子 <b>{{ t1Status }}</b>
    </template>
    <template #note>
      <b>三个控件。</b><b>方程</b>是下拉框，两档喂给它的是<b>同一份初始条件</b>，
      只是让它按不同的方程往前走；<b>拨弦位置 p</b> 是你把弦提起来的地方，
      单位是"占弦长的几分之几"（0.5 = 正中间，0.05 = 紧贴琴桥），
      它决定初始那个三角形的顶点在哪儿；<b>时间 t</b> 的尺子取成"基频一个周期 = 2"。
      弦长取 1、波速取 1，热方程那档的时间另有缩放（否则一瞬间就平了，看不清过程）。
      <br /><br />
      灰虚线是同一份初始条件（在 x = p 处拨起的弦 / 同形状的初始温度）。解法三步走：
      <b>① 分解</b>——把初始形状拆到正弦模式上（细彩线，系数 bₙ 由傅里叶积分给出）；
      <b>② 独立演化</b>——每个模式不理会别人，按自己的常微分方程走：波动方程给它配
      cos(nπt)（永恒振荡），热方程给它配 <MathInline tex="e^{-n^2\pi^2\tau}" />（指数消亡）；
      <b>③ 叠加</b>——黑线 = 各模式之和。切换方程看两种命运：同一份初始数据，
      在波动方程下永远荡下去（拖到任何 t 形状都还"记得"当初），在热方程下高频秒死、
      最终归于平坦（历史被遗忘——这就是可逆与不可逆的分水岭）。
      整套流程你在线代第五讲见过一模一样的：<b>按特征向量分解 → 各特征值独立演化 → 叠加</b>。
      正弦函数就是这里的特征向量，分离变量法就是函数空间里的对角化。
      <br /><br />
      <b>第四步（把 t 归零，拖拨弦位置 p）</b>：盯住读数区那张泛音强度表。
      <b>p 拖到 0.50</b>（正中间）——2、4 号<b>整整齐齐变成 0%</b>，
      读数是 100 / 0 / 11 / 0 / 4，声音最闷；
      <b>拖到 0.20</b>（弦长 1/5）——归零的换成了 <b>5 号</b>，读数 100 / 40 / 18 / 6 / 0；
      <b>拖到 0.05</b>（紧贴琴桥）——100 / 49 / 32 / 23 / 18，高次泛音全在，声音最亮。
      规律只有一句：<b>在 x = 1/k 处拨，第 k、2k、3k… 号泛音全部缺席</b>——
      因为你的手指正按在它们的节点上，那里本来就不动，你根本拨不动它。
      这就是吉他手"靠琴桥拨亮、靠音孔拨暖"的全部道理，伍节把系数算给你看。
    </template>
  </DemoFrame>
</template>
