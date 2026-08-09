<script setup>
import { ref, computed } from 'vue'
import { usePlot, makeView, drawAxes, plotFn, drawLabel, C, fmt, rng } from './plot.js'
import DemoFrame from '../components/DemoFrame.vue'
import ControlSlider from '../components/ControlSlider.vue'
import MathInline from '../components/MathInline.vue'

// gamma = 原料本身的偏度（一次抽取的偏度），CLT 说标准化均值的偏度应为 gamma/√n
const DISTS = {
  dice: {
    label: '骰子（平的）',
    mu: 3.5,
    sigma: Math.sqrt(35 / 12),
    gamma: 0,
    draw: (r) => Math.floor(r() * 6) + 1,
  },
  uniform: {
    label: '均匀 U(0,1)（平的）',
    mu: 0.5,
    sigma: 1 / Math.sqrt(12),
    gamma: 0,
    draw: (r) => r(),
  },
  exp: {
    label: '指数分布（严重右偏）',
    mu: 1,
    sigma: 1,
    gamma: 2,
    draw: (r) => -Math.log(1 - r()),
  },
  coin: {
    label: '不均匀硬币 P(1)=0.1（极偏）',
    mu: 0.1,
    sigma: 0.3,
    gamma: (1 - 2 * 0.1) / Math.sqrt(0.1 * 0.9), // = 8/3
    draw: (r) => (r() < 0.1 ? 1 : 0),
  },
}

const distKey = ref('dice')
const n = ref(1) // 每个样本包含 n 次抽取
const M = 3000 // 样本个数

const stdNormal = (z) => Math.exp(-z * z / 2) / Math.sqrt(2 * Math.PI)

// M 个"n 次抽取的均值"，标准化成 z = (x̄ − μ)/(σ/√n)
const zs = computed(() => {
  const d = DISTS[distKey.value]
  const r = rng(31 + n.value * 7)
  const arr = new Float64Array(M)
  for (let j = 0; j < M; j++) {
    let s = 0
    for (let i = 0; i < n.value; i++) s += d.draw(r)
    arr[j] = (s / n.value - d.mu) / (d.sigma / Math.sqrt(n.value))
  }
  return arr
})

// 直方图的偏度：三阶中心矩 ÷ 标准差三次方。对称形状给 0，右边拖长尾给正数。
const skew = computed(() => {
  const a = zs.value
  let m = 0
  for (const z of a) m += z
  m /= a.length
  let m2 = 0
  let m3 = 0
  for (const z of a) {
    const d = z - m
    m2 += d * d
    m3 += d * d * d
  }
  return m3 / a.length / Math.pow(m2 / a.length, 1.5)
})
const skewTheory = computed(() => DISTS[distKey.value].gamma / Math.sqrt(n.value))

const BINS = 56
const hist = computed(() => {
  const bw = 8 / BINS // z ∈ [-4, 4]
  const counts = new Array(BINS).fill(0)
  let clipped = 0
  for (const z of zs.value) {
    const i = Math.floor((z + 4) / bw)
    if (i >= 0 && i < BINS) counts[i]++
    else clipped++
  }
  return { bw, heights: counts.map((c) => c / (M * bw)), clipped }
})

const canvas = ref(null)
usePlot(
  canvas,
  (ctx, w, h) => {
    const v = makeView(w, h, -4, 4, -0.02, 0.62)
    drawAxes(ctx, v, { xTicks: [-3, -2, -1, 0, 1, 2, 3], yTicks: [0.2, 0.4], xLabel: 'z（标准化后的样本均值）', yLabel: '密度' })

    const { bw, heights } = hist.value
    ctx.save()
    ctx.fillStyle = 'rgba(178, 58, 47, 0.2)'
    ctx.strokeStyle = C.accent
    ctx.lineWidth = 1
    for (let i = 0; i < BINS; i++) {
      if (!heights[i]) continue
      const px = v.X(-4 + i * bw)
      const pw = v.X(-4 + (i + 1) * bw) - px
      const py = v.Y(Math.min(heights[i], 0.62))
      ctx.fillRect(px, py, pw, v.Y(0) - py)
      ctx.strokeRect(px, py, pw, v.Y(0) - py)
    }
    ctx.restore()

    plotFn(ctx, v, stdNormal, { color: C.indigo, width: 2.6 })
    drawLabel(ctx, v.X(1.3), v.Y(stdNormal(1.3)) - 10, '标准正态曲线', { color: C.indigo })
  },
  { height: 340, watchSources: [distKey, n] },
)
</script>

<template>
  <DemoFrame title="中心极限定理：不管原料多歪，平均出来都是钟形">
    <canvas ref="canvas" class="demo-canvas"></canvas>
    <template #controls>
      <label class="ctrl">
        <span class="ctrl-label">原始分布</span>
        <select v-model="distKey" class="ctrl-select">
          <option v-for="(d, k) in DISTS" :key="k" :value="k">{{ d.label }}</option>
        </select>
      </label>
      <ControlSlider label="每个样本的抽取次数 n" v-model="n" :min="1" :max="64" :step="1" />
    </template>
    <template #readout>
      红色：3000 个"n 次抽取的平均值"（已标准化）的直方图；蓝色：标准正态密度<br />
      n = <b>{{ n }}</b> &nbsp;·&nbsp; 直方图偏度 = <b>{{ fmt(skew, 3) }}</b>
      &nbsp;·&nbsp; 理论值 <MathInline tex="\gamma/\sqrt{n}" /> = <b>{{ fmt(skewTheory, 3) }}</b>
      &nbsp;（原料偏度 <MathInline tex="\gamma" /> = {{ fmt(DISTS[distKey].gamma, 3) }}）
    </template>
    <template #note>
      <b>两个控件。</b><b>原料分布</b>是下拉框，选的是"每一次抽取"服从什么——
      它是<b>被平均的东西</b>，不是结果；<b>每个样本的抽取次数 n</b> 就是"平均几个"，
      也就是本讲公式里的那个 n。
      图上永远画 3000 个样本均值，且已按
      <MathInline tex="(\bar X_n - \mu)/(\sigma/\sqrt n)" /> 标准化——
      <b>标准化正是为了让不同 n、不同原料能画在同一张图上比</b>，
      所以蓝色的标准正态曲线是个固定不动的靶子。
      <br /><br />
      n = 1 时，直方图就是原始分布本来的样子：骰子是六根平柱，指数分布歪向一边，硬币只有两根孤柱。
      现在拖大 n：<b>无论原料多么不像钟形，平均值的分布都固执地趋向同一条蓝色曲线</b>。
      这就是中心极限定理——大量独立小随机量的叠加，细节被互相抵消，只留下"钟形"这个公共形状。
      测量误差是无数小干扰之和、身高是无数基因与环境因素之和，所以它们都是正态的。
      也注意反例的分寸：换"极偏硬币"，n = 30 时钟形还很勉强——教科书那句"n ≥ 30 即可"是经验话术，
      <b>原料越偏，需要的 n 越大</b>。
      <br /><br />
      <b>这句"越偏越慢"在伍节那个折叠框里有精确的出处</b>：证明中三阶项带着
      <MathInline tex="n^{-1/2}" />，衰减得比二阶项慢得多，而原料的偏斜程度正是三阶矩。
      所以"要多大的 n"取决于三阶矩有多大——对称的骰子几下就成钟形，
      极偏硬币要拖到很大才勉强像样。
      <br /><br />
      <b>读数区第二行就是这句话的量化版，先说清那个"偏度"是什么。</b>
      算法只有一句：把每个数据减去平均值，<b>三次方</b>之后再取平均，最后除以标准差的三次方
      （除这一下只是为了把单位除掉，让它变成一个不带量纲的纯数）。
      要害在三次方<b>保留正负号</b>：右边拖出去的长尾是很大的正偏差，三次方后被放得极大，
      左边挤成一堆的小负偏差三次方后仍然很小，两边抵不平——<b>偏度为正就是"右边有长尾"</b>。
      最低例子：那枚 P(1) = 0.1 的硬币，十次里九次开 0、只有一次开 1，
      那个孤零零的 1 就是长尾，算出来偏度是 <MathInline tex="8/3 = 2.667" />；
      而骰子六个面对称，正负偏差成对抵消，偏度正好是 0。
      <b>钟形的偏度是 0，所以偏度离 0 有多远，就是"还差多少才是钟形"的一把尺子。</b>
      <br /><br />
      <b>照着做一遍：让"越偏越慢"变成一个数。</b>
      选<b>不均匀硬币 P(1)=0.1</b>，把 n 依次拖到 1、4、16、64，只看读数区的偏度：
      <b>2.6 → 1.302 → 0.656 → 0.342</b>。
      <b>n 每乘 4，偏度就对折一次</b>——因为理论值是
      <MathInline tex="\gamma/\sqrt{n}" />，n 翻四倍，<MathInline tex="\sqrt{n}" /> 才翻一倍。
      这就是"钟形不是突然冒出来的"：歪斜是被
      <MathInline tex="1/\sqrt{n}" /> 一点一点磨掉的，而这个速度慢得让人心焦。
      顺手就能量出教科书那句"n ≥ 30 即可"在这个原料上有多不够用：<b>n = 30 时偏度还有 0.479</b>，
      离 0 差着老远，画面上也确实还看得出右边那条尾巴。
      换成<b>骰子</b>再拖一遍作对照：n = 1 时偏度就已经是 −0.023，
      整条滑杆拖下来始终在 ±0.07 里晃——<b>原料本来就对称，压根没有歪斜要磨</b>。
      （样本偏度和理论值不会分毫不差，3000 个样本自带随机误差：
      比如指数分布 n = 16 时读数是 0.417，理论值 0.5。差的这一点就是抽样噪声，不是定理出了错。）
      <br /><br />
      <b>还有一个本图故意没收进下拉框的反例</b>：柯西分布的样本均值<b>永远</b>不变钟形，
      因为它方差无穷、定理的前提就不成立（肆节给了实测：平均一万个柯西样本，
      分布跟只取一个一模一样）。没放进来正是因为拖 n 时画面纹丝不动，看着像程序坏了。
    </template>
  </DemoFrame>
</template>
