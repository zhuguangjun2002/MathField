<script setup>
import { ref, computed } from 'vue'
import { usePlot, makeView, drawAxes, drawLabel, C, fmt } from './plot.js'
import DemoFrame from '../components/DemoFrame.vue'
import ControlSlider from '../components/ControlSlider.vue'
import MathInline from '../components/MathInline.vue'

const canvas = ref(null)
const eps = ref(0.15)
const seqKey = ref('zeno')

const SEQS = {
  zeno: {
    label: '阿基里斯的路程 1 + ½ + ¼ + …',
    a: (n) => 2 - Math.pow(2, 1 - n),
    L: 2,
    y0: 0.8,
    y1: 2.35,
  },
  e: {
    label: '复利的极限 (1 + 1/n)ⁿ',
    a: (n) => Math.pow(1 + 1 / n, n),
    L: Math.E,
    y0: 1.85,
    y1: 2.95,
  },
  osc: {
    label: '振荡逼近 1 + (−1)ⁿ/n',
    a: (n) => 1 + Math.pow(-1, n) / n,
    L: 1,
    y0: 0.3,
    y1: 1.75,
  },
}

const seq = computed(() => SEQS[seqKey.value])

const bigN = computed(() => {
  const { a, L } = seq.value
  let last = 0
  for (let n = 1; n <= 400; n++) {
    if (Math.abs(a(n) - L) >= eps.value) last = n
  }
  return last + 1
})

// 第 N 项与第 N−1 项的实际误差：前者已进带、后者还在带外，
// 正好说明读数区给出的 N 是能应答的最小值
const errAtN = computed(() => Math.abs(seq.value.a(bigN.value) - seq.value.L))
const errBeforeN = computed(() =>
  bigN.value > 1 ? Math.abs(seq.value.a(bigN.value - 1) - seq.value.L) : null,
)

usePlot(
  canvas,
  (ctx, w, h) => {
    const s = seq.value
    const v = makeView(w, h, 0, 62, s.y0, s.y1)
    drawAxes(ctx, v, {
      xTicks: [10, 20, 30, 40, 50, 60],
      yTicks: [s.L],
      xLabel: 'n',
      yLabel: 'aₙ',
    })

    // ε 带
    ctx.fillStyle = C.indigoSoft
    const bandTop = v.Y(Math.min(s.L + eps.value, s.y1))
    const bandBot = v.Y(Math.max(s.L - eps.value, s.y0))
    ctx.fillRect(v.pad.l, bandTop, v.iw, bandBot - bandTop)

    // 极限虚线
    ctx.strokeStyle = C.indigo
    ctx.setLineDash([6, 5])
    ctx.lineWidth = 1.6
    ctx.beginPath()
    ctx.moveTo(v.pad.l, v.Y(s.L))
    ctx.lineTo(v.pad.l + v.iw, v.Y(s.L))
    ctx.stroke()
    ctx.setLineDash([])
    drawLabel(ctx, v.pad.l + v.iw - 6, v.Y(s.L) - 8, `L = ${fmt(s.L, 3)}`, {
      color: C.indigo,
      align: 'right',
    })

    // N 竖线
    if (bigN.value <= 60) {
      const nx = v.X(bigN.value)
      ctx.strokeStyle = C.accent
      ctx.setLineDash([4, 4])
      ctx.beginPath()
      ctx.moveTo(nx, v.pad.t)
      ctx.lineTo(nx, v.pad.t + v.ih)
      ctx.stroke()
      ctx.setLineDash([])
      drawLabel(ctx, nx + 6, v.pad.t + 16, `N = ${bigN.value}`, { color: C.accent })
    }

    // 数列的点
    for (let n = 1; n <= 60; n++) {
      const y = s.a(n)
      const inside = Math.abs(y - s.L) < eps.value
      ctx.beginPath()
      ctx.arc(v.X(n), v.Y(y), 3.4, 0, Math.PI * 2)
      ctx.fillStyle = inside ? C.green : C.accent
      ctx.fill()
    }
  },
  { height: 320, watchSources: [eps, seqKey] },
)
</script>

<template>
  <DemoFrame title="数列极限：ε 挑战游戏">
    <canvas ref="canvas" class="demo-canvas"></canvas>
    <template #controls>
      <label class="ctrl">
        <span class="ctrl-label">数列</span>
        <select v-model="seqKey" class="ctrl-select">
          <option v-for="(s, k) in SEQS" :key="k" :value="k">{{ s.label }}</option>
        </select>
      </label>
      <ControlSlider
        label="挑战精度 ε（允许的误差）"
        v-model="eps"
        :min="0.01"
        :max="0.5"
        :step="0.005"
        :display="(x) => x.toFixed(3)"
      />
    </template>
    <template #readout>
      对手出招 ε = {{ eps.toFixed(3) }} &nbsp;→&nbsp; 我方应答 <b>N = {{ bigN }}</b>（从第 N 项起全在蓝带内）<br />
      对账：<MathInline
        tex="|a_N - L|"
      /> = <b>{{ errAtN.toFixed(4) }}</b>（已进带·绿）<template
        v-if="errBeforeN !== null"
      >，前一项 = <b>{{ errBeforeN.toFixed(4) }}</b>（还在带外·红）—— 所以这个 N 已经最小</template>
    </template>
    <template #note>
      <p><b>两个旋钮分别是什么</b></p>
      <ul>
        <li>
          <b>数列</b>（下拉）：换一个 <MathInline tex="a_n" /> 来挑战。三档的极限 L 都是算出来的定值——
          阿基里斯那档是 <MathInline tex="a_n = 2 - 2^{\,1-n}" />，<MathInline tex="L = 2" />；
          复利那档 <MathInline tex="L = e = 2.718\ldots" />；振荡那档
          <MathInline tex="a_n = 1 + (-1)^n/n" />，<MathInline tex="L = 1" />（它从两侧交替逼近）。
        </li>
        <li>
          <b>挑战精度 ε</b>：对手要求的<strong>误差上限</strong>，单位就是纵轴的单位。
          蓝色带正是 <MathInline tex="L \pm \varepsilon" /> 这条横带，ε 越小带子越窄。
        </li>
      </ul>
      <p>
        <b>读数区的 N 是怎么来的</b>：程序从头扫到第 400 项，记下<strong>最后一个</strong>还在带外的项，
        再加 1——这是能应答的最小的 N。它不是滑杆，是被 ε 逼出来的答案。
        红点是还没进带的项，绿点是已经进带的项；N 那条红色竖线就是红绿分界。
      </p>
      <p>
        <b>照着做一遍</b>：选阿基里斯那档，把 ε 从 0.5 拖到 0.01，N 只从 3 涨到 8——
        ε 每砍一半 N 才加 1（误差按 <MathInline tex="2^{\,1-n}" /> 衰减）。
        再换成振荡那档做同一件事：同样从 0.5 拖到 0.01，N 却从 3 涨到 101
        （误差只按 <MathInline tex="1/n" /> 衰减，要压到 ε 就得 <MathInline tex="n > 1/\varepsilon" />）。
        <strong>两档都答得出 N，这就是"极限存在"；答得快慢差了两个数量级，那叫收敛速度</strong>——
        后者正是数值分析里"收敛阶"要量的东西。
      </p>
      <p>
        中间那档（复利）和振荡档同属 <MathInline tex="1/n" /> 这一级，只是又慢了一点：
        同样把 ε 从 0.5 拖到 0.01，N 从 2 涨到 135。它的误差大约按
        <MathInline tex="e/(2n)" /> 衰减，所以应答的 N 不用试也能算出来——
        取 <MathInline tex="N = \lceil e/(2\varepsilon)\rceil" /> 必定合格
        （ε = 0.05 时算出 28，这里扫出来的最小值是 27）。推导见本讲伍节。
      </p>
    </template>
  </DemoFrame>
</template>
