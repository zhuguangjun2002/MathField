<script setup>
import { ref, computed } from 'vue'
import { usePlot, makeView, drawAxes, plotFn, drawLabel, C } from './plot.js'
import DemoFrame from '../components/DemoFrame.vue'
import ControlSlider from '../components/ControlSlider.vue'
import MathInline from '../components/MathInline.vue'

// 三档被积函数，区间统一取 [−2, 2]，真值全部有解析表达式（前两档是闭式，
// 第一档 erf(2)√π 用 200000 段辛普森当参考，误差远低于展示位数）。
const A = -2
const B = 2
const FUNCS = {
  gauss: {
    label: 'exp(−x²)　没有初等原函数',
    f: (x) => Math.exp(-x * x),
    yLabel: 'e⁻ˣ²',
    ylo: -0.08,
    yhi: 1.12,
    exact: null, // 下面用细网格算
  },
  cubic: {
    label: '½x³ + x² + 2　三次多项式',
    f: (x) => 0.5 * x * x * x + x * x + 2,
    yLabel: '½x³+x²+2',
    ylo: -0.9,
    yhi: 11,
    exact: 40 / 3,
  },
  sqrt: {
    label: 'sqrt(x+2)　左端点导数无穷',
    f: (x) => Math.sqrt(x + 2),
    yLabel: '√(x+2)',
    ylo: -0.16,
    yhi: 2.25,
    exact: 16 / 3,
  },
}

const N = ref(8) // 子区间个数（保持偶数，辛普森需要）
const method = ref('mid') // mid 中点矩形 | trap 梯形 | simp 辛普森
const which = ref('gauss')

const cur = computed(() => FUNCS[which.value])
const f = (x) => cur.value.f(x)

// 复合公式：三种形状共用一套节点
function quad(fn, n, how) {
  const h = (B - A) / n
  let s = 0
  if (how === 'mid') {
    for (let i = 0; i < n; i++) s += fn(A + (i + 0.5) * h)
    return s * h
  } else if (how === 'trap') {
    s = 0.5 * (fn(A) + fn(B))
    for (let i = 1; i < n; i++) s += fn(A + i * h)
    return s * h
  }
  s = fn(A) + fn(B)
  for (let i = 1; i < n; i++) s += (i % 2 ? 4 : 2) * fn(A + i * h)
  return (s * h) / 3
}

const REF = computed(() => cur.value.exact ?? quad(cur.value.f, 200000, 'simp'))

const approx = computed(() => quad(cur.value.f, N.value, method.value))
const err = computed(() => Math.abs(approx.value - REF.value))
// 上一档（子区间数减半）的误差，用来当场量收敛阶：正文说"N 翻倍误差降到 1/4 或 1/16"，
// 读者要能在读数区直接读到这个 4 和 16。
const halfN = computed(() => (N.value >= 4 ? (N.value % 4 === 0 ? N.value / 2 : null) : null))
const errHalf = computed(() =>
  halfN.value ? Math.abs(quad(cur.value.f, halfN.value, method.value) - REF.value) : null,
)
const ratio = computed(() =>
  errHalf.value && err.value > 0 ? errHalf.value / err.value : null,
)
// 误差小到这个量级就不是"截断误差"了，而是 float64 的舍入地板
const isZero = computed(() => err.value < 1e-12)
const expected = computed(() => (method.value === 'simp' ? 16 : 4))

const canvas = ref(null)
usePlot(
  canvas,
  (ctx, w, h) => {
    const v = makeView(w, h, -2.15, 2.15, cur.value.ylo, cur.value.yhi)
    drawAxes(ctx, v, {
      xTicks: [-2, -1, 0, 1, 2],
      yTicks: which.value === 'cubic' ? [2, 5, 8] : which.value === 'sqrt' ? [1, 2] : [0.5, 1],
      xLabel: 'x',
      yLabel: cur.value.yLabel,
    })

    const n = N.value
    const step = (B - A) / n
    ctx.save()
    ctx.fillStyle = C.accentSoft
    ctx.strokeStyle = C.accent
    // 块数一多，每块的描边就会糊成一片，细下去让色块本身还看得清
    ctx.lineWidth = n > 60 ? 0.4 : n > 24 ? 0.8 : 1.3

    if (method.value === 'mid') {
      for (let i = 0; i < n; i++) {
        const xl = A + i * step
        const mid = xl + step / 2
        const yy = f(mid)
        ctx.beginPath()
        ctx.rect(v.X(xl), v.Y(yy), v.X(xl + step) - v.X(xl), v.Y(0) - v.Y(yy))
        ctx.fill()
        ctx.stroke()
      }
    } else if (method.value === 'trap') {
      for (let i = 0; i < n; i++) {
        const xl = A + i * step
        const xr = xl + step
        ctx.beginPath()
        ctx.moveTo(v.X(xl), v.Y(0))
        ctx.lineTo(v.X(xl), v.Y(f(xl)))
        ctx.lineTo(v.X(xr), v.Y(f(xr)))
        ctx.lineTo(v.X(xr), v.Y(0))
        ctx.closePath()
        ctx.fill()
        ctx.stroke()
      }
    } else {
      // 辛普森：每两个子区间用一段抛物线
      for (let k = 0; k < n; k += 2) {
        const x0 = A + k * step
        const x2 = x0 + 2 * step
        ctx.beginPath()
        ctx.moveTo(v.X(x0), v.Y(0))
        for (let t = 0; t <= 24; t++) {
          const x = x0 + (t / 24) * (x2 - x0)
          // 过 x0,x1,x2 三点的抛物线（拉格朗日）
          const x1 = x0 + step
          const L0 = ((x - x1) * (x - x2)) / ((x0 - x1) * (x0 - x2))
          const L1 = ((x - x0) * (x - x2)) / ((x1 - x0) * (x1 - x2))
          const L2 = ((x - x0) * (x - x1)) / ((x2 - x0) * (x2 - x1))
          const y = f(x0) * L0 + f(x1) * L1 + f(x2) * L2
          ctx.lineTo(v.X(x), v.Y(y))
        }
        ctx.lineTo(v.X(x2), v.Y(0))
        ctx.closePath()
        ctx.fill()
        ctx.stroke()
      }
    }
    ctx.restore()

    // 真曲线
    plotFn(ctx, v, f, { color: C.ink, width: 2.4 })
    drawLabel(ctx, v.pad.l + 10, v.pad.t + 16, '色块：近似用的形状　黑线：真函数', {
      color: C.soft,
      size: 12,
    })
  },
  { height: 340, watchSources: [N, method, which] },
)

const methodName = computed(
  () => ({ mid: '中点矩形', trap: '梯形', simp: '辛普森' }[method.value]),
)
const hStr = computed(() => ((B - A) / N.value).toFixed(4))
</script>

<template>
  <DemoFrame title="用有限个形状去逼近曲边面积：形状越聪明，收敛越快">
    <canvas ref="canvas" class="demo-canvas"></canvas>
    <template #controls>
      <label class="ctrl">
        <span class="ctrl-label">被积函数（区间固定 [−2, 2]）</span>
        <select v-model="which" class="ctrl-select">
          <option v-for="(o, k) in FUNCS" :key="k" :value="k">{{ o.label }}</option>
        </select>
      </label>
      <label class="ctrl">
        <span class="ctrl-label">用什么形状去凑</span>
        <select v-model="method" class="ctrl-select">
          <option value="mid">中点矩形（顶是平的）</option>
          <option value="trap">梯形（顶是斜直线）</option>
          <option value="simp">辛普森（顶是抛物线）</option>
        </select>
      </label>
      <ControlSlider label="子区间个数 N（步长 h=4/N）" v-model="N" :min="2" :max="200" :step="2" />
    </template>
    <template #readout>
      {{ methodName }} N={{ N }}（h={{ hStr }}）得 <b>{{ approx.toPrecision(9) }}</b>，
      真值 <b>{{ REF.toPrecision(9) }}</b>，误差
      <b :style="{ color: isZero ? '#2f7d4f' : '#b23a2f' }">{{
        isZero ? '≈ 0（机器精度）' : err.toExponential(2)
      }}</b>
      <br />
      <template v-if="isZero">这个形状对本档函数<b>精确</b>——再拖 N 也不会更准，因为已经没有误差可减
      </template>
      <template v-else-if="ratio">
        N={{ halfN }} 时误差 {{ errHalf.toExponential(2) }} → 翻倍后降到
        <b>1/{{ ratio.toFixed(1) }}</b>（该方法的阶预言 1/{{ expected }}）
      </template>
      <template v-else>把 N 拖到 4 的倍数，这里会显示"翻倍后误差降到几分之一"</template>
    </template>
    <template #note>
      <b>三个控件</b>：①<b>被积函数</b>——三档共用区间 <MathInline tex="[-2,2]" />，
      真值分别是 <MathInline tex="1.76416278" />（<MathInline tex="\sqrt{\pi}\,\mathrm{erf}(2)" />）、
      <MathInline tex="40/3" />、<MathInline tex="16/3" />；②<b>形状</b>——决定每块的顶是平线、斜线还是抛物线；
      ③<b>N</b>——把 <MathInline tex="[-2,2]" /> 切成几个子区间，步长
      <MathInline tex="h=4/N" />（N 只取偶数，辛普森要两块配一条抛物线）。第二行读数是关键：
      它拿<b>子区间数减半</b>那一档的误差来除当前误差，直接量出收敛阶。
      <br /><br />
      <b>照这几组拖，结论自己会跳出来。</b>
      ① <b>三次多项式档 + 辛普森，N 从 2 拖到 200</b>：误差始终 ≈ 0。三个点定出的抛物线本"应该"只对二次精确，
      它却对三次也精确——这就是正文说的"白捡一阶"，<b>连 N=2（整个区间只用一条抛物线）都是准的</b>；
      ② <b>同一档换成梯形或中点矩形</b>：比值稳稳停在 4.0（这一档的 <MathInline tex="f''" /> 是常数，
      <MathInline tex="h^2" /> 律干干净净）；
      ③ <b><MathInline tex="e^{-x^2}" /> 档 + 辛普森，N=32 → 64</b>：比值 16.0，四阶兑现；
      ④ <b>同一档把 N 拖到 8 以下</b>：辛普森的误差反而<b>大于</b>中点矩形（N=8 时 5.4e−4 对 1.4e−3 还赢，
      N=6 就输了，N=4 输了 25 倍）。阶只是 <MathInline tex="h\to 0" /> 的渐近承诺，h 还很粗时不作数；
      ⑤ <b><MathInline tex="\sqrt{x+2}" /> 档</b>：左端点处导数是无穷大，误差公式里的 <MathInline tex="f^{(4)}(\xi)" /> 不存在，
      三种方法的比值一起塌到 2.8 左右（阶只剩 1.5），辛普森的优势荡然无存——
      <b>高阶公式是拿光滑性换来的，函数不配合就退款。</b>
      <br /><br />
      至于"辛普森比矩形准上千倍"要拖到多大：<MathInline tex="e^{-x^2}" /> 档 N=40 才 75 倍，N=100 是 469 倍，
      <b>N=160 是 1200 倍</b>，滑杆上限 200 那一档 1875 倍。<b>上千倍</b>不是切八块就有的，
      得先把 N 拖到三位数。
    </template>
  </DemoFrame>
</template>
