<script setup>
import { ref, computed } from 'vue'
import { usePlot, makeView, drawAxes, plotFn, drawLabel, C, fmt } from './plot.js'
import DemoFrame from '../components/DemoFrame.vue'
import ControlSlider from '../components/ControlSlider.vue'
import MathInline from '../components/MathInline.vue'

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

// 行波视角的读数：两个半波包此刻各跑到哪儿（碰端点会折返，所以位置是三角波）
const fold = (x) => {
  const y = ((x % 2) + 2) % 2
  return y <= 1 ? y : 2 - y
}
const rightPos = computed(() => fold(0.5 + t.value))
const leftPos = computed(() => fold(0.5 - t.value))
const midU = computed(() =>
  MODE.value === 'travel' ? travelU(0.5, t.value) : standingU(0.5, t.value),
)

// 鼓包对称地打在弦中央，偶数号模式的节点正好在那里，系数为 0。
// 读数区跳过这些零项，免得列出一串 "0.00·sin(2πx)" 反而遮住规律。
const seriesText = computed(() =>
  coefs
    .map((c, i) => ({ c, n: i + 1 }))
    .filter(({ c }) => Math.abs(c) > 0.01)
    .slice(0, 3)
    .map(({ c, n }, k) => `${k === 0 ? '' : c < 0 ? '− ' : '+ '}${fmt(Math.abs(c), 2)}·sin(${n}πx)`)
    .join(' '),
)

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
      <template v-if="MODE === 'travel'">
        右行半波包 x ≈ <b>{{ fmt(rightPos, 2) }}</b>&nbsp;&nbsp;左行半波包 x ≈
        <b>{{ fmt(leftPos, 2) }}</b>（c = 1，碰端点翻转弹回）&nbsp;&nbsp;中点 u(0.5, t) ≈
        <b>{{ fmt(midU, 3) }}</b>
      </template>
      <template v-else>
        鼓包 ≈ {{ seriesText }} + …&nbsp;&nbsp;中点 u(0.5, t) ≈ <b>{{ fmt(midU, 3) }}</b>
      </template>
    </template>
    <template #note>
      <b>两个控件。</b><b>视角</b>是个下拉框，两档画的是<b>同一根弦的同一次振动</b>，
      只是拆法不同：选"行波分解"看达朗贝尔怎么拆，选"驻波叠加"看伯努利怎么拆——
      两档的弦形曲线本来就该长得一样，不一样才是出了错。
      <b>时间 t</b> 是滑杆，尺子取成"基频振动一个周期 = 2"，所以从 0 拖到 2 正好看完一次完整往复；
      弦长取 1、波速取 c = 1，初始鼓包是写死的
      <MathInline tex="\varphi(x) = e^{-40(x - 0.5)^2}" />（初速为零）。
      <br /><br />
      拖动时间，两个视角看同一件事。<b>达朗贝尔说</b>：解就是"一半向左跑 + 一半向右跑"，
      u = f(x−ct) + g(x+ct)——注意波形碰到固定端点会<b>翻转反弹</b>，这是回声的数学。
      <b>伯努利说</b>：解是若干"驻波"的合奏——每个模式原地站桩振动（波形不跑，只是幅度按各自频率伸缩），
      节点越多的模式振得越快，频率恰是基频的 2、3、4 倍——这一串整数倍的频率就叫<b>泛音列</b>，
      它是"同一根弦能同时发出的所有音"的清单，也是为什么两个不同乐器奏同一个音你还能分辨出来
      （基频一样，泛音的配比不一样）。顺带解释了一件吉他上的事：在弦长一半处轻轻一按，
      基频那一档被掐死、只剩偶数号模式，听到的就是高八度的泛音。
      <br /><br />
      两边都对，可当年谁也不服谁：任意的尖鼓包怎么可能是圆滑正弦之和？
      这场争论吵了半个世纪，答案在下一讲由一个"外行"给出。
      <b>顺带在读数区验一下"两边都对"，也看清它的代价</b>：把 t 拖到 0，
      行波档的中点位移是 1.000，驻波档却是 0.969——<b>差了 3%</b>。
      不是哪一边算错了，是驻波档只叠了 5 个模式，剩下的高次泛音被截掉了；
      而鼓包越尖，越依赖那些高次项。模式加得越多两档越贴合，
      "要多少个正弦才能拼出一个尖形状"正是下一讲的正题。
      还有一个现成的线索藏在读数里：<b>2 号、4 号模式的系数是 0</b>
      （所以读数区列出的是 1、3、5 号）。原因是这个鼓包正好对称地打在弦的正中，
      而偶数号模式的节点恰好就在正中——<b>你拨的地方是它的死点，根本拨不动它</b>。
      这正是伍节说的"拨弦位置决定音色"，在读数区当场看得见。
    </template>
  </DemoFrame>
</template>
