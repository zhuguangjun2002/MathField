<script setup>
import { ref, computed } from 'vue'
import { usePlot, makeView, drawAxes, plotFn, drawLabel, C } from './plot.js'
import DemoFrame from '../components/DemoFrame.vue'
import ControlSlider from '../components/ControlSlider.vue'
import MathInline from '../components/MathInline.vue'

// 每一档给出 u = g(x) 与 f(u)，左panel 画 f(g(x))·g'(x)，右panel 画 f(u)
const CASES = {
  cos: {
    label: 'u = x²，被积函数 2x·cos(x²)',
    g: (x) => x * x,
    gp: (x) => 2 * x,
    f: (u) => Math.cos(u),
    leftTex: '2x\\cos(x^2)',
    rightTex: '\\cos u',
    xMin: 0.1,
    xMax: 1.9,
    a: 0.2,
    b: 1.6,
  },
  gauss: {
    label: 'u = x²，被积函数 2x·e^(−x²)',
    g: (x) => x * x,
    gp: (x) => 2 * x,
    f: (u) => Math.exp(-u),
    leftTex: '2x\\,e^{-x^2}',
    rightTex: 'e^{-u}',
    xMin: 0.1,
    xMax: 2.0,
    a: 0.2,
    b: 1.8,
  },
  sin: {
    label: 'u = sin x，被积函数 sin²x·cos x',
    g: (x) => Math.sin(x),
    gp: (x) => Math.cos(x),
    f: (u) => u * u,
    leftTex: '\\sin^2 x\\cos x',
    rightTex: 'u^2',
    xMin: 0.05,
    xMax: 1.45,
    a: 0.1,
    b: 1.4,
  },
}

const caseKey = ref('cos')
const a = ref(0.2)
const b = ref(1.6)
const nStrip = ref(8)

const P = computed(() => CASES[caseKey.value])
function onCaseChange() {
  a.value = P.value.a
  b.value = P.value.b
}

const integrand = (p) => (x) => p.f(p.g(x)) * p.gp(x)

// 辛普森法，取够密，两边独立算（不共用中间量，才叫"对账"）
function simpson(fn, lo, hi, n = 2000) {
  const h = (hi - lo) / n
  let s = fn(lo) + fn(hi)
  for (let i = 1; i < n; i++) s += fn(lo + i * h) * (i % 2 ? 4 : 2)
  return (s * h) / 3
}

const areas = computed(() => {
  const p = P.value
  const left = simpson(integrand(p), a.value, b.value)
  const right = simpson(p.f, p.g(a.value), p.g(b.value))
  return { left, right, diff: left - right, ua: p.g(a.value), ub: p.g(b.value) }
})

const STRIP_COLORS = [
  'rgba(178, 58, 47, 0.45)',
  'rgba(176, 125, 43, 0.45)',
  'rgba(58, 94, 160, 0.45)',
  'rgba(58, 140, 92, 0.45)',
]

const canvas = ref(null)
usePlot(
  canvas,
  (ctx, w, hh) => {
    const p = P.value
    const F = integrand(p)
    const A = a.value
    const B = b.value
    const ua = p.g(A)
    const ub = p.g(B)

    // 左右两块必须共用同一套刻度（同样的数据跨度 + 同样的像素宽），
    // 否则"右边被拉宽了 g′ 倍、压矮了 g′ 倍"在画面上就是假的——各自自适应会偷偷把它缩回去
    const yMaxL = Math.max(...Array.from({ length: 200 }, (_, i) => Math.abs(F(A + ((B - A) * i) / 199))))
    const yMaxR = Math.max(...Array.from({ length: 200 }, (_, i) => Math.abs(p.f(ua + ((ub - ua) * i) / 199))))
    const yMax = Math.max(yMaxL, yMaxR) * 1.2
    const span = Math.max(B - A, Math.abs(ub - ua)) * 1.18
    const half = w / 2
    const cL = (A + B) / 2
    const cR = (ua + ub) / 2
    const vL = makeView(w, hh, cL - span / 2, cL + span / 2, 0, yMax, { l: 44, r: w - half + 14, t: 26, b: 30 })
    const vR = makeView(w, hh, cR - span / 2, cR + span / 2, 0, yMax, { l: half + 44, r: 16, t: 26, b: 30 })

    const ticksIn = (v) => [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5].filter((t) => t > v.x0 + 0.06 && t < v.x1 - 0.06)
    drawAxes(ctx, vL, { xTicks: ticksIn(vL), yTicks: [], xLabel: 'x', yLabel: '' })
    drawAxes(ctx, vR, { xTicks: ticksIn(vR), yTicks: [], xLabel: 'u', yLabel: '' })

    // 同色的一对细条：左边宽 Δx、高 f(g)·g′，右边宽 Δu、高 f(u)——面积相同
    const n = nStrip.value
    for (let i = 0; i < n; i++) {
      const x0 = A + ((B - A) * i) / n
      const x1 = A + ((B - A) * (i + 1)) / n
      const xm = (x0 + x1) / 2
      const col = STRIP_COLORS[i % STRIP_COLORS.length]
      ctx.fillStyle = col
      // 左
      const lx = vL.X(x0)
      const lw = vL.X(x1) - lx
      const lh = vL.Y(0) - vL.Y(Math.abs(F(xm)))
      ctx.fillRect(lx, vL.Y(Math.abs(F(xm))), lw, lh)
      ctx.strokeStyle = 'rgba(255,255,255,0.85)'
      ctx.lineWidth = 1
      ctx.strokeRect(lx, vL.Y(Math.abs(F(xm))), lw, lh)
      // 右（同一段被 g 映过去）
      const rx = vR.X(p.g(x0))
      const rw = vR.X(p.g(x1)) - rx
      const rh = vR.Y(0) - vR.Y(Math.abs(p.f(p.g(xm))))
      ctx.fillStyle = col
      ctx.fillRect(rx, vR.Y(Math.abs(p.f(p.g(xm)))), rw, rh)
      ctx.strokeRect(rx, vR.Y(Math.abs(p.f(p.g(xm)))), rw, rh)
    }

    plotFn(ctx, vL, (x) => Math.abs(F(x)), { color: C.ink, width: 2.4 })
    plotFn(ctx, vR, (u) => Math.abs(p.f(u)), { color: C.ink, width: 2.4 })

    // 区间写进面板标题，不往横轴上贴——那里已经有刻度数字，两者会叠在一起
    drawLabel(ctx, vL.pad.l, 16, `左：x 的尺子上量 |f(g(x))·g′(x)|`, { color: C.soft, size: 12 })
    drawLabel(ctx, vL.pad.l, 16, `　　　　　　　　　　　　　　　　　x ∈ [${A.toFixed(2)}, ${B.toFixed(2)}]`, {
      color: C.accent,
      size: 12,
    })
    drawLabel(ctx, vR.pad.l, 16, '右：u 的尺子上量 |f(u)|', { color: C.soft, size: 12 })
    drawLabel(ctx, vR.pad.l, 16, `　　　　　　　　　　　　u ∈ [${ua.toFixed(2)}, ${ub.toFixed(2)}]`, {
      color: C.accent,
      size: 12,
    })
  },
  { height: 340, watchSources: [caseKey, a, b, nStrip] },
)
</script>

<template>
  <DemoFrame title="换元积分：同一块面积，换一把尺子量">
    <canvas ref="canvas" class="demo-canvas"></canvas>
    <template #controls>
      <label class="ctrl">
        <span class="ctrl-label">换元</span>
        <select v-model="caseKey" class="ctrl-select" @change="onCaseChange">
          <option v-for="(c, k) in CASES" :key="k" :value="k">{{ c.label }}</option>
        </select>
      </label>
      <ControlSlider
        label="左端 a"
        v-model="a"
        :min="P.xMin"
        :max="P.xMax - 0.2"
        :step="0.05"
        :display="(x) => x.toFixed(2)"
      />
      <ControlSlider
        label="右端 b"
        v-model="b"
        :min="P.xMin + 0.2"
        :max="P.xMax"
        :step="0.05"
        :display="(x) => x.toFixed(2)"
      />
      <ControlSlider label="配对细条的条数" v-model="nStrip" :min="4" :max="24" :step="1" />
    </template>
    <template #readout>
      左 <MathInline tex="\int_a^b f(g(x))g'(x)\,\mathrm{d}x" /> = <b>{{ areas.left.toFixed(6) }}</b> ·
      右 <MathInline tex="\int_{u(a)}^{u(b)} f(u)\,\mathrm{d}u" /> = <b>{{ areas.right.toFixed(6) }}</b
      ><br />
      两者之差 = <b>{{ areas.diff.toExponential(2) }}</b>（两边各自独立数值积分算出，没有共用中间结果）
    </template>
    <template #note>
      <p><b>四个旋钮分别是什么</b></p>
      <ul>
        <li>
          <b>换元</b>（下拉）：选一组 <MathInline tex="u=g(x)" /> 与 <MathInline tex="f" />。
          左边画的永远是<strong>换元前</strong>的被积函数
          <MathInline tex="f(g(x))\,g'(x)" />，右边是<strong>换元后</strong>的
          <MathInline tex="f(u)" />。
        </li>
        <li><b>左端 a</b> / <b>右端 b</b>：x 那一侧的积分区间。右边的区间是它被 g 映过去的像。</li>
        <li>
          <b>配对细条的条数</b>：只影响<strong>画面</strong>，不影响读数。
          同一个颜色的两根细条是<strong>同一段</strong>——左边那根宽
          <MathInline tex="\Delta x" />，右边那根宽 <MathInline tex="\Delta u \approx g'(x)\Delta x" />。
        </li>
      </ul>
      <p>
        <b>画面在说什么</b>：这是换元法的全部内容。看任意一对同色细条——
        右边那根<strong>横向被拉宽了 <MathInline tex="g'(x)" /> 倍</strong>
        （<MathInline tex="u=x^2" /> 在 x 大处拉得更狠），
        而它<strong>纵向正好矮了 <MathInline tex="g'(x)" /> 倍</strong>
        （因为左边的高度多乘了一个 <MathInline tex="g'" />）。一拉一压，
        <strong>面积分毫不差</strong>。所有细条都如此，整块面积自然相等。
        <MathInline tex="\mathrm{d}u = g'(x)\,\mathrm{d}x" /> 这个"像约分一样"的写法，
        说的就是这件事。
        <strong>两块面板共用同一套横纵刻度</strong>（同样的数据跨度画在同样宽的像素上），
        所以"拉宽多少、压矮多少"是真能拿眼睛量的，不是各自缩放出来的错觉。
      </p>
      <p>
        <b>照着做一遍（一）：核对两侧读数。</b>默认档
        <MathInline tex="u=x^2" />、<MathInline tex="f=\cos" />，a = <b>0.20</b>、b = <b>1.60</b>：
        左边 <b>0.509366</b>、右边 <b>0.509366</b>，差 <b>2.02e−13</b>——
        这两个数是<strong>各自独立</strong>用辛普森法算出来的（2000 段），没有共用任何中间结果。
        解析地看：原函数是 <MathInline tex="\sin(x^2)" />，
        <MathInline tex="\sin(2.56)-\sin(0.04)=0.549355-0.039989=0.509366" />，一位不差。
      </p>
      <p>
        <b>照着做一遍（二）：看清"拉宽多少、压矮多少"。</b>把条数拖到 <b>4</b>，
        盯着最右边那根绿条：<strong>左边又窄又高，右边又宽又矮</strong>——
        它在 <MathInline tex="x=1.525" /> 附近，那里 <MathInline tex="g'=2x=3.05" />，
        于是右边正好宽了 3.05 倍、矮了 3.05 倍（左高 2.090、右高 0.685），一乘还是同一块面积。
        再把 a 拖到 <b>1.00</b>——此时 <MathInline tex="g'(x)=2x \ge 2" />，
        <strong>右边的区间被拉长到左边的两倍以上</strong>（x 从 1 到 1.6 只有 0.6 宽，
        u 从 1 到 2.56 有 1.56 宽），而两侧读数照样一致，都是 <b>−0.292116</b>。
        <strong>读数是负的而画面全在轴上方</strong>，是因为画面画的是绝对值：
        <MathInline tex="\cos u" /> 在 <MathInline tex="u>\pi/2" /> 之后翻到了轴下面。
      </p>
      <p>
        <b>照着做一遍（三）：一个 x 的差别。</b>换到第二档
        <MathInline tex="2x\,e^{-x^2}" />：它的原函数是
        <MathInline tex="-e^{-x^2}" />，一眼可验。
        <strong>可把前面那个 2x 去掉，<MathInline tex="e^{-x^2}" /> 就再也积不出初等原函数了</strong>
        （刘维尔 1835 年证明的，不是没人想出来）。
        <strong>换元法能不能用，全看被积函数里有没有"配套的" <MathInline tex="g'(x)" /></strong>——
        这就是为什么积分是门"认形状"的手艺，而求导只是照章办事。
      </p>
      <p>
        （<b>两个诚实的小注</b>：① 画面画的是<strong>绝对值</strong>
        <MathInline tex="|f|" />，这样第三档在 x 越过 π/2 后仍然看得见条
        （读数区给的是带符号的真值）；② 差值那一栏通常在
        <MathInline tex="10^{-13}" /> 以下，那是辛普森法自身的截断误差与浮点舍入，
        不是换元法不精确——理论上两者<strong>精确相等</strong>。）
      </p>
    </template>
  </DemoFrame>
</template>
