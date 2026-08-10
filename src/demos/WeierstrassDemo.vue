<script setup>
import { ref, computed } from 'vue'
import { usePlot, makeView, drawAxes, plotFn, drawLabel, C } from './plot.js'
import DemoFrame from '../components/DemoFrame.vue'
import ControlSlider from '../components/ControlSlider.vue'
import MathInline from '../components/MathInline.vue'

// 魏尔斯特拉斯函数 W(x) = Σ aⁿ cos(bⁿ π x)。原文的条件是 0<a<1、b 为奇整数、
// 且 ab > 1 + 3π/2 ≈ 5.71；这里取 a=0.5, b=13（ab = 6.5）满足条件，保证处处不可导。
const A = 0.5
const B = 13

const terms = ref(12)
const logZoom = ref(0) // 窗口半宽 = 0.5 × 10^(−logZoom)
const x0 = ref(0.31)
const which = ref('w')

const W = (x, n) => {
  let s = 0
  for (let k = 0; k < n; k++) s += Math.pow(A, k) * Math.cos(Math.pow(B, k) * Math.PI * x)
  return s
}
const parab = (x) => 8 * (x - 0.31) * (x - 0.31) + 0.4

const f = computed(() => (which.value === 'w' ? (x) => W(x, terms.value) : parab))
const halfW = computed(() => 0.5 * Math.pow(10, -logZoom.value))

// 窗口内曲线与"两端连线"的最大偏离——用它衡量"这一小段有多不直"
const stats = computed(() => {
  const fn = f.value
  const a = x0.value - halfW.value
  const b = x0.value + halfW.value
  const fa = fn(a)
  const fb = fn(b)
  let dev = 0
  const N = 1200
  for (let i = 0; i <= N; i++) {
    const x = a + ((b - a) * i) / N
    const chord = fa + ((fb - fa) * (x - a)) / (b - a)
    dev = Math.max(dev, Math.abs(fn(x) - chord))
  }
  return { dev, ratio: dev / (2 * halfW.value), a, b, fa, fb }
})

const canvas = ref(null)
usePlot(
  canvas,
  (ctx, w, hh) => {
    const fn = f.value
    const a = x0.value - halfW.value
    const b = x0.value + halfW.value
    // 纵向自适应：把窗口内的取值范围装下
    let lo = Infinity
    let hi = -Infinity
    for (let i = 0; i <= 600; i++) {
      const y = fn(a + ((b - a) * i) / 600)
      lo = Math.min(lo, y)
      hi = Math.max(hi, y)
    }
    const padY = Math.max((hi - lo) * 0.25, 1e-12)
    const v = makeView(w, hh, a, b, lo - padY, hi + padY)
    drawAxes(ctx, v, { xTicks: [], yTicks: [], xLabel: 'x', yLabel: '' })

    // 两端连线（"如果它在这一档上像直线，就该贴着这条线"）
    const S = stats.value
    plotFn(ctx, v, (x) => S.fa + ((S.fb - S.fa) * (x - a)) / (b - a), {
      color: C.indigo,
      width: 1.8,
      dash: [7, 5],
    })
    plotFn(ctx, v, fn, { color: C.ink, width: 2, samples: 2400 })

    drawLabel(ctx, v.pad.l + 8, v.pad.t + 18, `窗口宽度 = ${(2 * halfW.value).toExponential(1)}`, {
      color: C.soft,
      size: 12,
    })
    drawLabel(ctx, v.pad.l + 8, v.pad.t + 36, '- - 两端连线（直线参照）', { color: C.indigo, size: 12 })
  },
  { height: 340, watchSources: [terms, logZoom, x0, which] },
)
</script>

<template>
  <DemoFrame title="放大再放大：有的曲线会变直，有的永远是毛的">
    <canvas ref="canvas" class="demo-canvas"></canvas>
    <template #controls>
      <label class="ctrl">
        <span class="ctrl-label">看哪条曲线</span>
        <select v-model="which" class="ctrl-select">
          <option value="w">魏尔斯特拉斯函数 W(x) = Σ 0.5ⁿ cos(13ⁿ πx)</option>
          <option value="p">普通抛物线（对照组）</option>
        </select>
      </label>
      <ControlSlider label="中心位置 x₀" v-model="x0" :min="0.05" :max="0.95" :step="0.01" :display="(x) => x.toFixed(2)" />
      <ControlSlider
        label="放大倍数（10 的几次方）"
        v-model="logZoom"
        :min="0"
        :max="5"
        :step="0.25"
        :display="(x) => '×' + Math.round(Math.pow(10, x)).toLocaleString('en-US') + ' 倍'"
      />
      <ControlSlider v-if="which === 'w'" label="级数取多少项" v-model="terms" :min="1" :max="16" :step="1" />
    </template>
    <template #readout>
      窗口宽度 = <b>{{ (2 * halfW).toExponential(2) }}</b> · 曲线偏离"两端连线"最多
      <b>{{ stats.dev.toExponential(2) }}</b
      ><br />
      <b>偏离 ÷ 窗宽 = {{ stats.ratio.toExponential(2) }}</b>
      ——它趋于 0 才说明"放大后像直线"（可导的标志）
    </template>
    <template #note>
      <p><b>四个旋钮分别是什么</b></p>
      <ul>
        <li>
          <b>看哪条曲线</b>：<strong>魏尔斯特拉斯函数</strong>
          <MathInline tex="W(x)=\sum_{n\ge0} 0.5^{\,n}\cos(13^{\,n}\pi x)" />
          （1872 年那个"处处连续、处处不可导"的怪物），或者一条<strong>普通抛物线</strong>做对照。
        </li>
        <li><b>中心位置 x₀</b>：放大镜对准哪一点。</li>
        <li>
          <b>放大倍数</b>：窗口半宽 = <MathInline tex="0.5\times 10^{-k}" />，
          滑杆拖的是 k（0 到 5，步长 0.25），<strong>读数直接显示放大倍数</strong>，最大十万倍。
        </li>
        <li>
          <b>级数取多少项</b>（只在 W 这一档出现）：<MathInline tex="W" /> 是无穷级数，
          程序只能取有限项。<strong>这个旋钮很要紧，下面第三条专门说它。</strong>
        </li>
      </ul>
      <p>
        <b>画面与读数在说什么</b>：蓝色虚线是<strong>窗口两端的连线</strong>。
        <router-link to="/calculus/derivative">第二讲</router-link>说过，
        "可导"的几何含义是<strong>放大之后越来越像一条直线</strong>。
        所以读数给的关键量是 <strong>"偏离 ÷ 窗宽"</strong>——
        曲线偏离那条连线最多多少，再除以窗口宽度。
        <strong>这个无量纲的数趋于 0，才叫"放大后变直"。</strong>
      </p>
      <p>
        <b>照着做一遍（一）：抛物线会变直。</b>切到<strong>对照组</strong>，
        x₀ = <b>0.31</b>，把放大倍数从 <b>×1 倍</b>依次拖到 <b>×10</b>、<b>×100</b>、<b>×1,000 倍</b>：
        "偏离 ÷ 窗宽"从 <b>2.00e+0</b> 依次变成 <b>2.00e−1</b>、<b>2.00e−2</b>、<b>2.00e−3</b>——
        <strong>每放大 10 倍，它就小 10 倍</strong>，干净利落。这正是可导的量化含义
        （<router-link to="/calculus/derivative">第二讲</router-link>那个
        <MathInline tex="o(h)" />：误差比 h 本身还小一个数量级）。
      </p>
      <p>
        <b>照着做一遍（二）：W 永远是毛的。</b>切回<strong>魏尔斯特拉斯</strong>，
        项数保持 <b>12</b>，同样把放大倍数从 ×1 拖到 ×1,000 倍：
        "偏离 ÷ 窗宽"分别是 <b>1.42e+0 → 1.18e+1 → 4.19e+1 → 3.54e+2</b>——
        <strong>不但没有变小，反而一路涨了两个半数量级</strong>。
        画面也一样：<strong>放大一千倍之后，它看上去和原来一样毛</strong>。
        <strong>这就是"处处不可导"的定量样子</strong>：可导要求这个比值趋于 0，
        而它<em>趋于无穷</em>——放大镜调得越大，曲线相对于窗口就越陡峭。
        （理论上 <MathInline tex="W" /> 在尺度 h 上的振幅约是
        <MathInline tex="h^{\alpha}" />，<MathInline tex="\alpha=\ln 2/\ln 13 = 0.27" />，
        所以比值按 <MathInline tex="h^{-0.73}" /> 发散，
        每放大十倍约涨 <MathInline tex="10^{0.73}\approx 5.4" /> 倍——上面那串数正是这个节奏。）
      </p>
      <p>
        <b>照着做一遍（三）：一个诚实的坑。</b>把项数拖到 <b>3</b>，再放大到 <b>×10,000 倍</b>：
        画面<strong>变直了</strong>，"偏离 ÷ 窗宽"掉到 <b>3.09e−1</b> 并继续往下走。
        <strong>这不是 W 的性质，是"只取三项"的性质</strong>——
        有限项的和是三个余弦的叠加，<strong>光滑得很</strong>，当然放大会变直。
        真正的 W 是无穷级数：<strong>每放大一档，就有更高频的项接管画面</strong>，
        所以永远轮不到"变直"。<strong>程序能画的永远只是有限项</strong>，
        本 demo 的做法是：项数够大时，第 n 项的波长
        <MathInline tex="2/13^{\,n}" /> 早已远小于一个像素，画出来与真值无异——
        项数 12 时最高频项的波长约 <MathInline tex="1.1\times10^{-12}" />，
        对 ×100,000 倍的窗口（宽 <MathInline tex="10^{-5}" />）绰绰有余。
      </p>
      <p>
        （<b>再一个诚实的小注</b>：这里的 <MathInline tex="a=0.5,\ b=13" /> 取自
        魏尔斯特拉斯原文的条件 <MathInline tex="ab\gt 1+\tfrac{3\pi}{2}\approx 5.71" />
        （这里 <MathInline tex="ab=6.5" />），它保证处处不可导。
        <strong>参数取得不对的话，函数可能是可导的</strong>——
        这个反例的每一个细节都是精心配平过的。）
      </p>
    </template>
  </DemoFrame>
</template>
