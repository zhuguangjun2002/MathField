<script setup>
import { ref, computed } from 'vue'
import { usePlot, makeView, drawAxes, plotFn, drawPoint, drawLabel, C } from './plot.js'
import DemoFrame from '../components/DemoFrame.vue'
import ControlSlider from '../components/ControlSlider.vue'

function fact(n) {
  let r = 1
  for (let i = 2; i <= n; i++) r *= i
  return r
}

const SUP = { 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹' }
const sup = (n) => String(n).split('').map((d) => SUP[d]).join('')

const FNS = {
  sin: {
    label: 'sin x',
    f: Math.sin,
    x0: -7.4,
    x1: 7.4,
    y0: -2.7,
    y1: 2.7,
    poly: (x, n) => {
      let s = 0
      for (let k = 0; 2 * k + 1 <= n; k++) s += ((k % 2 ? -1 : 1) * Math.pow(x, 2 * k + 1)) / fact(2 * k + 1)
      return s
    },
    terms: (n) => {
      const t = []
      for (let k = 0; 2 * k + 1 <= n; k++) {
        const d = 2 * k + 1
        t.push(`${k === 0 ? '' : k % 2 ? '− ' : '+ '}x${d > 1 ? sup(d) : ''}${d > 1 ? '/' + fact(d) : ''}`)
      }
      return t
    },
  },
  cos: {
    label: 'cos x',
    f: Math.cos,
    x0: -7.4,
    x1: 7.4,
    y0: -2.7,
    y1: 2.7,
    poly: (x, n) => {
      let s = 0
      for (let k = 0; 2 * k <= n; k++) s += ((k % 2 ? -1 : 1) * Math.pow(x, 2 * k)) / fact(2 * k)
      return s
    },
    terms: (n) => {
      const t = []
      for (let k = 0; 2 * k <= n; k++) {
        const d = 2 * k
        t.push(d === 0 ? '1' : `${k % 2 ? '− ' : '+ '}x${sup(d)}/${fact(d)}`)
      }
      return t
    },
  },
  exp: {
    label: 'eˣ',
    f: Math.exp,
    x0: -3.4,
    x1: 3.4,
    y0: -1.2,
    y1: 13,
    poly: (x, n) => {
      let s = 0
      for (let k = 0; k <= n; k++) s += Math.pow(x, k) / fact(k)
      return s
    },
    terms: (n) => {
      const t = []
      for (let k = 0; k <= n; k++)
        t.push(k === 0 ? '1' : k === 1 ? '+ x' : `+ x${sup(k)}/${fact(k)}`)
      return t
    },
  },
  log: {
    label: 'ln(1+x)',
    f: (x) => (x > -1 ? Math.log(1 + x) : NaN),
    x0: -1.5,
    x1: 3.4,
    y0: -3.4,
    y1: 3.4,
    radius: 1,
    poly: (x, n) => {
      let s = 0
      for (let k = 1; k <= n; k++) s += ((k % 2 ? 1 : -1) * Math.pow(x, k)) / k
      return s
    },
    terms: (n) => {
      const t = []
      for (let k = 1; k <= n; k++)
        t.push(k === 1 ? 'x' : `${k % 2 ? '+ ' : '− '}x${sup(k)}${k > 1 ? '/' + k : ''}`)
      return t
    },
  },
}

const canvas = ref(null)
const fnKey = ref('sin')
const order = ref(3)
const cfg = computed(() => FNS[fnKey.value])

const polyStr = computed(() => {
  const t = cfg.value.terms(order.value)
  if (!t.length) return '0'
  return t.length > 5 ? t.slice(0, 5).join(' ') + ' + …' : t.join(' ')
})

usePlot(
  canvas,
  (ctx, w, h) => {
    const c = cfg.value
    const v = makeView(w, h, c.x0, c.x1, c.y0, c.y1)
    const xt = []
    for (let i = Math.ceil(c.x0); i <= Math.floor(c.x1); i += 2) if (i !== 0) xt.push(i)
    drawAxes(ctx, v, { xTicks: xt, yTicks: [], xLabel: 'x', yLabel: 'f(x)' })

    // 收敛半径边界（仅 ln(1+x)）
    if (c.radius) {
      ctx.strokeStyle = C.gold
      ctx.setLineDash([5, 5])
      ctx.lineWidth = 1.6
      for (const bx of [-c.radius, c.radius]) {
        ctx.beginPath()
        ctx.moveTo(v.X(bx), v.pad.t)
        ctx.lineTo(v.X(bx), v.pad.t + v.ih)
        ctx.stroke()
      }
      ctx.setLineDash([])
      drawLabel(ctx, v.X(c.radius) + 6, v.pad.t + 18, '收敛半径边界 |x| = 1', { color: C.gold })
    }

    // 真实函数（墨色）与泰勒多项式（红色）
    plotFn(ctx, v, c.f, { color: C.ink, width: 2.6 })
    plotFn(ctx, v, (x) => c.poly(x, order.value), { color: C.accent, width: 2.2 })

    // 展开中心
    drawPoint(ctx, v, 0, c.f(0), { color: C.indigo })
    drawLabel(ctx, v.X(0) + 8, v.Y(c.f(0)) - 10, '展开中心 x=0', { color: C.indigo })

    drawLabel(ctx, v.pad.l + 10, v.pad.t + 18, '— 真实函数', { color: C.ink })
    drawLabel(ctx, v.pad.l + 10, v.pad.t + 38, `— 泰勒多项式（${order.value} 阶）`, {
      color: C.accent,
    })
  },
  { height: 380, watchSources: [fnKey, order] },
)
</script>

<template>
  <DemoFrame title="泰勒展开：多项式一层层「长成」目标函数">
    <canvas ref="canvas" class="demo-canvas"></canvas>
    <template #controls>
      <label class="ctrl">
        <span class="ctrl-label">函数</span>
        <select v-model="fnKey" class="ctrl-select">
          <option v-for="(c, k) in FNS" :key="k" :value="k">{{ c.label }}</option>
        </select>
      </label>
      <ControlSlider label="展开阶数 n" v-model="order" :min="0" :max="15" :step="1" />
    </template>
    <template #readout>
      P<sub>{{ order }}</sub>(x) = <b>{{ polyStr }}</b>
    </template>
    <template #note>
      拖动阶数：0 阶是水平线（只对上函数值），1 阶是切线（再对上斜率），2 阶抱住弯曲方向……
      每加一阶，多项式就多"模仿"目标函数的一层导数信息，贴合的范围随之扩大。
      试试 ln(1+x)：无论加多少阶，多项式在 |x| &gt; 1 之外都会失控发散 ——
      这就是「收敛半径」，它的真正解释要到复变函数里才水落石出。
    </template>
  </DemoFrame>
</template>
