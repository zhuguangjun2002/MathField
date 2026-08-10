<script setup>
import { ref, computed } from 'vue'
import { usePlot, makeView, drawAxes, plotFn, drawPoint, drawLabel, C } from './plot.js'
import DemoFrame from '../components/DemoFrame.vue'
import ControlSlider from '../components/ControlSlider.vue'
import MathInline from '../components/MathInline.vue'

const EQS = {
  growth: {
    label: "y′ = 0.8y  （指数增长：变化率正比于当前量）",
    f: (t, y) => 0.8 * y,
    exact: (t, t0, y0) => y0 * Math.exp(0.8 * (t - t0)),
    exactTex: 'y_0e^{0.8(t-t_0)}',
    yMin: -0.5,
    yMax: 5,
    y0: 0.6,
  },
  decay: {
    label: 'y′ = −0.6y  （指数衰减：放射性、冷却、放电）',
    f: (t, y) => -0.6 * y,
    exact: (t, t0, y0) => y0 * Math.exp(-0.6 * (t - t0)),
    exactTex: 'y_0e^{-0.6(t-t_0)}',
    yMin: -0.5,
    yMax: 5,
    y0: 4.2,
  },
  logistic: {
    label: 'y′ = y(1 − y/4)  （逻辑斯蒂：有上限的增长）',
    f: (t, y) => y * (1 - y / 4),
    exact: (t, t0, y0) => (4 * y0) / (y0 + (4 - y0) * Math.exp(-(t - t0))),
    exactTex: '\\dfrac{4y_0}{y_0+(4-y_0)e^{-(t-t_0)}}',
    yMin: -0.5,
    yMax: 5,
    y0: 0.5,
  },
  forced: {
    label: 'y′ = cos t − 0.5y  （受迫：外界在不停推它）',
    f: (t, y) => Math.cos(t) - 0.5 * y,
    exact: null,
    exactTex: '（解析解存在但不止一项，这里只画数值解）',
    yMin: -2.5,
    yMax: 3,
    y0: 2.0,
  },
}

const key = ref('logistic')
const t0 = ref(0.5)
const y0 = ref(0.5)
const P = computed(() => EQS[key.value])
function onEqChange() {
  y0.value = P.value.y0
  t0.value = 0.5
}

const T0 = 0
const T1 = 6

// 四阶龙格-库塔，双向积分出解曲线
function solve(f, ta, ya, tEnd, h) {
  const pts = [[ta, ya]]
  let t = ta
  let y = ya
  const steps = Math.abs(Math.round((tEnd - ta) / h))
  const dt = tEnd > ta ? h : -h
  for (let i = 0; i < steps; i++) {
    const k1 = f(t, y)
    const k2 = f(t + dt / 2, y + (dt * k1) / 2)
    const k3 = f(t + dt / 2, y + (dt * k2) / 2)
    const k4 = f(t + dt, y + dt * k3)
    y += (dt * (k1 + 2 * k2 + 2 * k3 + k4)) / 6
    t += dt
    if (!Number.isFinite(y) || Math.abs(y) > 1e4) break
    pts.push([t, y])
  }
  return pts
}

const curve = computed(() => {
  const p = P.value
  const back = solve(p.f, t0.value, y0.value, T0, 0.01).reverse()
  const fwd = solve(p.f, t0.value, y0.value, T1, 0.01)
  return back.concat(fwd.slice(1))
})

const atEnd = computed(() => {
  const p = P.value
  const pts = curve.value
  const last = pts[pts.length - 1]
  const numer = last[0] >= T1 - 0.02 ? last[1] : NaN
  const ex = p.exact ? p.exact(T1, t0.value, y0.value) : NaN
  return { numer, ex }
})

const canvas = ref(null)
usePlot(
  canvas,
  (ctx, w, hh) => {
    const p = P.value
    const v = makeView(w, hh, T0 - 0.2, T1 + 0.2, p.yMin, p.yMax)
    drawAxes(ctx, v, { xTicks: [0, 1, 2, 3, 4, 5, 6], yTicks: [0, 1, 2, 3, 4], xLabel: 't', yLabel: 'y' })

    // 斜率场：每个格点画一小段方向线
    const nt = 22
    const ny = 13
    ctx.save()
    ctx.strokeStyle = 'rgba(58, 94, 160, 0.55)'
    ctx.lineWidth = 1.3
    const seg = 11 // 像素半长
    for (let i = 0; i <= nt; i++) {
      for (let j = 0; j <= ny; j++) {
        const t = T0 + ((T1 - T0) * i) / nt
        const y = p.yMin + ((p.yMax - p.yMin) * j) / ny
        const s = p.f(t, y)
        if (!Number.isFinite(s)) continue
        // 斜率要按像素比例换算，否则画出来的方向是错的
        const dxPix = v.X(1) - v.X(0)
        const dyPix = v.Y(0) - v.Y(1)
        const ang = Math.atan2(s * dyPix, dxPix)
        const px = v.X(t)
        const py = v.Y(y)
        ctx.beginPath()
        ctx.moveTo(px - seg * Math.cos(ang), py + seg * Math.sin(ang))
        ctx.lineTo(px + seg * Math.cos(ang), py - seg * Math.sin(ang))
        ctx.stroke()
      }
    }
    ctx.restore()

    // 解曲线
    ctx.save()
    ctx.strokeStyle = C.accent
    ctx.lineWidth = 2.6
    ctx.beginPath()
    let pen = false
    for (const [t, y] of curve.value) {
      if (y < p.yMin - 1 || y > p.yMax + 1) {
        pen = false
        continue
      }
      const px = v.X(t)
      const py = v.Y(y)
      pen ? ctx.lineTo(px, py) : ctx.moveTo(px, py)
      pen = true
    }
    ctx.stroke()
    ctx.restore()

    // 平衡解（导数恒为零的水平线）
    for (const ye of [0, 4]) {
      if (Math.abs(p.f(1, ye)) < 1e-12 && ye <= p.yMax) {
        plotFn(ctx, v, () => ye, { color: C.green, width: 1.6, dash: [6, 5] })
        drawLabel(ctx, v.X(T1) - 4, v.Y(ye) - 8, `平衡解 y ≡ ${ye}`, { color: C.green, align: 'right', size: 12 })
      }
    }

    drawPoint(ctx, v, t0.value, y0.value, { color: C.accent, r: 5 })
    drawLabel(ctx, v.X(t0.value) + 8, v.Y(y0.value) - 8, `初值 (${t0.value.toFixed(1)}, ${y0.value.toFixed(2)})`, {
      color: C.accent,
      size: 12,
    })
  },
  { height: 380, watchSources: [key, t0, y0] },
)
</script>

<template>
  <DemoFrame title="斜率场：不解方程，也能看见解长什么样">
    <canvas ref="canvas" class="demo-canvas"></canvas>
    <template #controls>
      <label class="ctrl">
        <span class="ctrl-label">方程</span>
        <select v-model="key" class="ctrl-select" @change="onEqChange">
          <option v-for="(e, k) in EQS" :key="k" :value="k">{{ e.label }}</option>
        </select>
      </label>
      <ControlSlider label="初始时刻 t₀" v-model="t0" :min="0" :max="5" :step="0.1" :display="(x) => x.toFixed(1)" />
      <ControlSlider
        label="初始值 y(t₀)"
        v-model="y0"
        :min="P.yMin + 0.5"
        :max="P.yMax - 0.3"
        :step="0.05"
        :display="(x) => x.toFixed(2)"
      />
    </template>
    <template #readout>
      t = 6 处 · 数值解（RK4，步长 0.01）= <b>{{ atEnd.numer.toFixed(5) }}</b>
      <template v-if="P.exact">
        · 解析解 = <b>{{ atEnd.ex.toFixed(5) }}</b> · 差
        <b>{{ (atEnd.numer - atEnd.ex).toExponential(2) }}</b> </template
      ><br />
      <template v-if="P.exact">解析式 <MathInline :tex="P.exactTex" /></template>
      <template v-else>本档解析解不止一项，只给数值解</template>
    </template>
    <template #note>
      <p><b>三个旋钮分别是什么</b></p>
      <ul>
        <li>
          <b>方程</b>（下拉）：四个都是形如 <MathInline tex="y' = f(t,y)" /> 的一阶方程——
          <strong>它只告诉你"在每个位置该往哪个方向走"，不直接给你 y</strong>。
        </li>
        <li>
          <b>初始时刻 t₀</b> / <b>初始值 y(t₀)</b>：从平面上哪一点出发。
          <strong>这两个数就是"初始条件"</strong>，它从一整族解里挑出唯一的一条。
        </li>
      </ul>
      <p>
        <b>画面在说什么</b>：蓝色小短线组成的是<strong>斜率场</strong>——
        在每个格点 <MathInline tex="(t,y)" /> 上，画一小段斜率为
        <MathInline tex="f(t,y)" /> 的线。<strong>它是方程本身的画像，
        跟解是谁无关</strong>。红色曲线是从你选的那点出发、
        <strong>处处顺着小短线的方向</strong>走出来的那条路（程序用四阶龙格-库塔法
        以 0.01 的步长向前向后各推一遍）。绿色虚线是<strong>平衡解</strong>：
        那里 <MathInline tex="f=0" />，一旦落上去就永远不动。
      </p>
      <p>
        <b>照着做一遍（一）：初值只是"挑一条"，不改变场。</b>
        拖动 <MathInline tex="y_0" />，你会看到红线换了一条，<strong>可蓝色短线一根都没动</strong>。
        这正是"通解是一族、初值定一条"的画面版。
      </p>
      <p>
        <b>照着做一遍（二）：数值解与解析解对账。</b>选<strong>指数衰减</strong>档，
        t₀ = <b>0.5</b>、y₀ = <b>4.20</b>。读数区第一行给两个数：数值解 <b>0.15491</b>、
        解析解 <MathInline tex="4.2\,e^{-0.6\times 5.5}=4.2\,e^{-3.3}" /> = <b>0.15491</b>，
        差 <b>5.6e−12</b>——<strong>四阶方法在这种光滑问题上精度极高</strong>
        （<router-link to="/numerical/root-finding">数值分析</router-link>那门课专讲这件事）。
      </p>
      <p>
        <b>照着做一遍（三）：逻辑斯蒂的两条平衡线。</b>换到第三档，
        绿色虚线出现在 <MathInline tex="y=0" /> 与 <MathInline tex="y=4" />。
        把 y₀ 拖到 <b>0.50</b>：曲线从底下爬起来，先加速、过 y = 2 之后减速，
        最后<strong>贴着 y = 4 拉平</strong>（t = 6 处读数 <b>3.88875</b>）；
        再把 y₀ 拖到 <b>4.50</b>（上方出发）：曲线<strong>从上往下压向 4</strong>。
        <strong>两边都被吸向同一条线</strong>——这就是"稳定平衡"，
        而 <MathInline tex="y=0" /> 是不稳定的：稍微偏离一点就一路跑到 4。
        <strong>整张图里最要紧的信息，你没解方程就读出来了。</strong>
      </p>
      <p>
        （<b>一个诚实的小注</b>：斜率场的小短线是按<strong>像素</strong>换算角度画的
        ——因为横纵坐标的像素比例不同，直接用数学斜率画会歪。
        另外第四档"受迫"没有单项的解析解，读数只给数值解。）
      </p>
    </template>
  </DemoFrame>
</template>
