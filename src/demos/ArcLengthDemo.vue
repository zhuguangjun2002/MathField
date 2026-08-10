<script setup>
import { ref, computed } from 'vue'
import { usePlot, makeView, drawAxes, plotFn, drawPoint, drawLabel, C } from './plot.js'
import DemoFrame from '../components/DemoFrame.vue'
import ControlSlider from '../components/ControlSlider.vue'
import MathInline from '../components/MathInline.vue'

const CURVES = {
  parab: {
    label: 'y = x²  在 [0, 2]（弧长有闭式）',
    f: (x) => x * x,
    fp: (x) => 2 * x,
    a: 0,
    b: 2,
    yMin: -0.3,
    yMax: 4.4,
    exactTex: '\\sqrt{17}+\\tfrac14\\ln(4+\\sqrt{17})',
  },
  sine: {
    label: 'y = sin x  在 [0, π]（弧长写不出初等式）',
    f: (x) => Math.sin(x),
    fp: (x) => Math.cos(x),
    a: 0,
    b: Math.PI,
    yMin: -0.3,
    yMax: 1.4,
    exactTex: '\\text{（椭圆积分，无初等表达）}',
  },
  circle: {
    label: 'y = √(1−x²)  在 [−0.9, 0.9]（圆弧）',
    f: (x) => Math.sqrt(Math.max(0, 1 - x * x)),
    fp: (x) => -x / Math.sqrt(Math.max(1e-12, 1 - x * x)),
    a: -0.9,
    b: 0.9,
    yMin: -0.15,
    yMax: 1.25,
    exactTex: '2\\arcsin 0.9',
  },
  cosh: {
    label: 'y = cosh x  在 [−1.5, 1.5]（悬链线）',
    f: (x) => Math.cosh(x),
    fp: (x) => Math.sinh(x),
    a: -1.5,
    b: 1.5,
    yMin: 0,
    yMax: 2.9,
    exactTex: '2\\sinh 1.5',
  },
}

const key = ref('parab')
const n = ref(4)
const P = computed(() => CURVES[key.value])

function simpson(g, lo, hi, m = 4000) {
  const h = (hi - lo) / m
  let s = g(lo) + g(hi)
  for (let i = 1; i < m; i++) s += g(lo + i * h) * (i % 2 ? 4 : 2)
  return (s * h) / 3
}

const exact = computed(() => {
  const p = P.value
  return simpson((x) => Math.sqrt(1 + p.fp(x) ** 2), p.a, p.b)
})

const polyLen = computed(() => {
  const p = P.value
  let s = 0
  for (let i = 0; i < n.value; i++) {
    const x0 = p.a + ((p.b - p.a) * i) / n.value
    const x1 = p.a + ((p.b - p.a) * (i + 1)) / n.value
    s += Math.hypot(x1 - x0, p.f(x1) - p.f(x0))
  }
  return s
})

const err = computed(() => exact.value - polyLen.value)

const canvas = ref(null)
usePlot(
  canvas,
  (ctx, w, hh) => {
    const p = P.value
    const pad = (p.b - p.a) * 0.08
    const v = makeView(w, hh, p.a - pad, p.b + pad, p.yMin, p.yMax)
    drawAxes(ctx, v, {
      xTicks: [-1, 0, 1, 2, 3].filter((t) => t > p.a - pad && t < p.b + pad),
      yTicks: [1, 2, 3],
      xLabel: 'x',
      yLabel: 'y',
    })

    plotFn(ctx, v, p.f, { color: C.ink, width: 2.6 })

    // 内接折线
    ctx.save()
    ctx.strokeStyle = C.accent
    ctx.lineWidth = 2
    ctx.beginPath()
    for (let i = 0; i <= n.value; i++) {
      const x = p.a + ((p.b - p.a) * i) / n.value
      const px = v.X(x)
      const py = v.Y(p.f(x))
      i ? ctx.lineTo(px, py) : ctx.moveTo(px, py)
    }
    ctx.stroke()
    ctx.restore()
    for (let i = 0; i <= n.value; i++) {
      const x = p.a + ((p.b - p.a) * i) / n.value
      if (n.value <= 24) drawPoint(ctx, v, x, p.f(x), { color: C.accent, r: 3 })
    }

    // 放大第一段，把勾股定理画出来（只在段数少时画，否则太挤）
    if (n.value <= 8) {
      const x0 = p.a
      const x1 = p.a + (p.b - p.a) / n.value
      ctx.save()
      ctx.strokeStyle = C.gold
      ctx.lineWidth = 1.6
      ctx.setLineDash([4, 3])
      ctx.beginPath()
      ctx.moveTo(v.X(x0), v.Y(p.f(x0)))
      ctx.lineTo(v.X(x1), v.Y(p.f(x0)))
      ctx.lineTo(v.X(x1), v.Y(p.f(x1)))
      ctx.stroke()
      ctx.restore()
      drawLabel(ctx, (v.X(x0) + v.X(x1)) / 2, v.Y(p.f(x0)) + 16, 'Δx', { color: C.gold, align: 'center', size: 12 })
      drawLabel(ctx, v.X(x1) + 6, (v.Y(p.f(x0)) + v.Y(p.f(x1))) / 2, 'Δy', { color: C.gold, size: 12 })
    }

    drawLabel(ctx, v.pad.l + 10, v.pad.t + 18, `— 曲线`, { color: C.ink, size: 12 })
    drawLabel(ctx, v.pad.l + 10, v.pad.t + 36, `— 内接折线（${n.value} 段）`, { color: C.accent, size: 12 })
  },
  { height: 360, watchSources: [key, n] },
)
</script>

<template>
  <DemoFrame title="弧长：拿折线去量一条曲线">
    <canvas ref="canvas" class="demo-canvas"></canvas>
    <template #controls>
      <label class="ctrl">
        <span class="ctrl-label">曲线</span>
        <select v-model="key" class="ctrl-select">
          <option v-for="(c, k) in CURVES" :key="k" :value="k">{{ c.label }}</option>
        </select>
      </label>
      <ControlSlider label="折线段数 n" v-model="n" :min="1" :max="64" :step="1" />
    </template>
    <template #readout>
      折线长 = <b>{{ polyLen.toFixed(6) }}</b> · 真弧长
      <MathInline tex="\int\sqrt{1+f'^2}\,\mathrm{d}x" /> = <b>{{ exact.toFixed(6) }}</b><br />
      差 = <b>{{ err.toExponential(3) }}</b> · 差 <MathInline tex="\times\, n^2" /> =
      <b>{{ (err * n * n).toFixed(4) }}</b>（n 翻倍，差降到四分之一）
    </template>
    <template #note>
      <p><b>两个旋钮分别是什么</b></p>
      <ul>
        <li>
          <b>曲线</b>（下拉）：四条都可以拖。第一条的弧长有闭式
          <MathInline tex="\sqrt{17}+\frac14\ln(4+\sqrt{17})" />；
          <strong>第二条（正弦）没有</strong>——它是"椭圆积分"，
          <router-link to="/calculus/integration-methods">上一讲</router-link>说的刘维尔定理管着它。
        </li>
        <li>
          <b>折线段数 n</b>：把区间等分成几段，每段用一条<strong>弦</strong>（直线）冒充曲线。
          这是弧长定义里唯一的动作。
        </li>
      </ul>
      <p>
        <b>画面在说什么</b>：黑色是曲线，红色是<strong>内接折线</strong>，红点是分点。
        段数少时还画出第一段的两条金色直角边 <MathInline tex="\Delta x" /> 与
        <MathInline tex="\Delta y" />——每段弦长就是
        <MathInline tex="\sqrt{\Delta x^2+\Delta y^2}" />，一条勾股定理而已。
        把它提出 <MathInline tex="\Delta x" /> 就成了
        <MathInline tex="\sqrt{1+(\Delta y/\Delta x)^2}\,\Delta x" />，
        取极限正是读数区那个积分。
      </p>
      <p>
        <b>照着做一遍：看误差怎么掉。</b>选第一条 <MathInline tex="y=x^2" />，
        把 n 依次拖到 <b>2、4、8、16、32</b>，只盯最后两栏：
      </p>
      <ul>
        <li>差：<b>7.03e−2 → 2.01e−2 → 5.05e−3 → 1.26e−3 → 3.16e−4</b>，
          <strong>每翻一倍的段数，误差掉到四分之一</strong>；</li>
        <li>而"差 × n²"从 0.2812 起，n ≥ 8 之后<strong>稳稳停在 0.3234</strong>——
          这说明误差确实正比于 <MathInline tex="1/n^2" />，不是"大概差不多"。</li>
      </ul>
      <p>
        <strong>这个二阶收敛是有出处的</strong>：每一小段上，弦与弧的差距由曲线的
        <em>弯曲程度</em>决定，量级是 <MathInline tex="(\Delta x)^3" />；
        一共 n 段，总误差就是 <MathInline tex="n\cdot(1/n)^3 = 1/n^2" />。
        （同样的算术在<router-link to="/numerical/quadrature">数值分析第 4 讲</router-link>
        反复出现，那里叫"复合求积公式的阶"。）
      </p>
      <p>
        <b>再试一件事：折线永远比曲线短。</b>差那一栏<strong>始终为正</strong>，
        任何一档都不例外。道理是两点之间直线最短——每段弦都不长于对应的那段弧。
        所以内接折线是弧长的<strong>下界</strong>，而弧长的严格定义正是
        "所有内接折线长度的<strong>上确界</strong>"（正文肆节）。
      </p>
      <p>
        （<b>一个诚实的小注</b>：读数里的"真弧长"也是算出来的——用辛普森法对
        <MathInline tex="\int\sqrt{1+f'^2}" /> 取 4000 段，精度远高于折线那一侧，
        所以拿它当标尺是安全的。第三条圆弧可以自查：真值应等于
        <MathInline tex="2\arcsin 0.9 = 2.239539" />，读数一位不差。）
      </p>
    </template>
  </DemoFrame>
</template>
