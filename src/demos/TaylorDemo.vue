<script setup>
import { ref, computed } from 'vue'
import { usePlot, makeView, drawAxes, plotFn, drawPoint, drawLabel, C } from './plot.js'
import DemoFrame from '../components/DemoFrame.vue'
import ControlSlider from '../components/ControlSlider.vue'
import MathInline from '../components/MathInline.vue'

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

// 检验点：统一取 x = 2，让"余项"这个正文里的主角在读数区有个具体数字。
// ln(1+x) 的收敛半径是 1，所以它在这一点上会当场发散——这正是要给读者看的。
const PROBE = 2
const probeP = computed(() => cfg.value.poly(PROBE, order.value))
const probeF = computed(() => cfg.value.f(PROBE))
const probeErr = computed(() => Math.abs(probeP.value - probeF.value))

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
      <ControlSlider label="展开阶数 n（中心固定在 0）" v-model="order" :min="0" :max="15" :step="1" />
    </template>
    <template #readout>
      P<sub>{{ order }}</sub>(x) = <b>{{ polyStr }}</b><br />
      检验点 x = 2：P<sub>{{ order }}</sub>(2) = <b>{{ probeP.toFixed(4) }}</b>，真值
      <b>{{ probeF.toFixed(4) }}</b>，余项 = {{ probeErr.toExponential(2) }}
    </template>
    <template #note>
      <p><b>两个旋钮分别是什么</b></p>
      <ul>
        <li>
          <b>函数</b>（下拉）：要被冒充的那条曲线（墨色）。红色那条始终是它的泰勒多项式。
        </li>
        <li>
          <b>展开阶数 n</b>：多项式保留到 <MathInline tex="x^n" /> 为止，也就是
          <strong>对齐了目标函数的前 n 阶导数</strong>。
          <strong>展开中心固定在 x = 0</strong>（图上那个靛蓝点），没有单独的中心旋钮——
          所以这里画的都是麦克劳林多项式。注意 sin 只有奇数次项、cos 只有偶数次项，
          所以拖动阶数时它们<strong>每两格才变一次</strong>。
        </li>
      </ul>
      <p>
        <b>读数区第二行是干什么的</b>：正文说"余项才是定理的灵魂"，
        可光看图只能看出"贴得紧不紧"。所以这里固定挑一个<strong>检验点 x = 2</strong>，
        把多项式在那里的值、真值、以及两者之差（也就是<strong>余项</strong>）当场算出来。
        第一行的多项式超过 5 项时会省略成"…"，但计算用的是全部项。
      </p>
      <p>
        <b>照着做一遍（一）：余项怎么塌下去。</b>选 <MathInline tex="\sin x" />，
        把 n 从 0 拖到 15，盯住余项那一栏：
        <b>9.1e-1 → 2.4e-1（n=3）→ 2.4e-2（n=5）→ 1.4e-3（n=8）→ 3.6e-10（n=15）</b>。
        每加两阶就掉一两个数量级——<strong>这是阶乘在分母上碾压幂函数的直接后果</strong>。
        换成 <MathInline tex="e^x" /> 和 <MathInline tex="\cos x" /> 也是同一副样子。
      </p>
      <p>
        <b>照着做一遍（二）：余项怎么爆炸。</b>换成
        <MathInline tex="\ln(1+x)" />，检验点 x = 2 落在金色虚线（收敛半径边界
        <MathInline tex="|x| = 1" />）<strong>外面</strong>。同样把 n 拖上去，余项不但不减，
        反而一路涨：<b>n=3 时 1.6e+0，n=8 时 2.0e+1，n=15 时 1.4e+3</b>
        （多项式给出 1424，真值只有 1.0986）。<strong>出了收敛半径，加项数是帮倒忙。</strong>
        再把注意力挪回边界以内看图形，那里红线仍然乖乖贴着黑线——
        <strong>同一条级数，一线之隔，两种命运</strong>。这条线为什么是"半径"（明明实轴上看是个区间），
        谜底要到<router-link to="/complex/cauchy-integral">复变函数</router-link>才揭晓。
      </p>
    </template>
  </DemoFrame>
</template>
