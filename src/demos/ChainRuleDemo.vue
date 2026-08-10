<script setup>
import { ref, computed } from 'vue'
import { usePlot, makeView, drawLabel, drawArrow, C, fmt } from './plot.js'
import DemoFrame from '../components/DemoFrame.vue'
import ControlSlider from '../components/ControlSlider.vue'
import MathInline from '../components/MathInline.vue'

// 四组复合函数。gp/fp 是解析导数，只用来在读数区给出"极限值"当对照。
const PAIRS = {
  sqSin: {
    label: 'u = x²，y = sin u  （即 y = sin x²）',
    gTex: 'u = x^2',
    fTex: 'y = \\sin u',
    dTex: "y' = 2x\\cos(x^2)",
    g: (x) => x * x,
    f: (u) => Math.sin(u),
    gp: (x) => 2 * x,
    fp: (u) => Math.cos(u),
    xMin: -1.6,
    xMax: 1.6,
    x0: 0.9,
  },
  sinSq: {
    label: 'u = sin x，y = u²  （即 y = sin²x）',
    gTex: 'u = \\sin x',
    fTex: 'y = u^2',
    dTex: "y' = 2\\sin x\\cos x = \\sin 2x",
    g: (x) => Math.sin(x),
    f: (u) => u * u,
    gp: (x) => Math.cos(x),
    fp: (u) => 2 * u,
    xMin: -2.5,
    xMax: 2.5,
    x0: 0.6,
  },
  sqrt: {
    label: 'u = 1 + x²，y = √u  （弧长公式里的那个）',
    gTex: 'u = 1 + x^2',
    fTex: 'y = \\sqrt{u}',
    dTex: "y' = x/\\sqrt{1+x^2}",
    g: (x) => 1 + x * x,
    f: (u) => Math.sqrt(u),
    gp: (x) => 2 * x,
    fp: (u) => 1 / (2 * Math.sqrt(u)),
    xMin: -2.4,
    xMax: 2.4,
    x0: 1.2,
  },
  gauss: {
    label: 'u = −x²/2，y = eᵘ  （正态分布那条钟形曲线）',
    gTex: 'u = -x^2/2',
    fTex: 'y = e^{u}',
    dTex: "y' = -x\\,e^{-x^2/2}",
    g: (x) => (-x * x) / 2,
    f: (u) => Math.exp(u),
    gp: (x) => -x,
    fp: (u) => Math.exp(u),
    xMin: -2.6,
    xMax: 2.6,
    x0: 1.0,
  },
}

const pairKey = ref('sqSin')
const x0 = ref(0.9)
const h = ref(0.2) // 迈出的那一小步（线性刻度，0.2 / 0.1 这类整数值要能精确取到）

const P = computed(() => PAIRS[pairKey.value])

function onPairChange() {
  x0.value = P.value.x0
}

const vals = computed(() => {
  const p = P.value
  const a = x0.value
  const b = a + h.value
  const u0 = p.g(a)
  const u1 = p.g(b)
  const y0 = p.f(u0)
  const y1 = p.f(u1)
  const du = u1 - u0
  const dy = y1 - y0
  return {
    a,
    b,
    u0,
    u1,
    y0,
    y1,
    dx: h.value,
    du,
    dy,
    r1: du / h.value, // Δu/Δx
    r2: du === 0 ? NaN : dy / du, // Δy/Δu
    r3: dy / h.value, // Δy/Δx（直接量）
    exact: p.gp(a) * p.fp(u0), // h→0 的极限值
  }
})

// 三把尺子共用同一刻度，否则"放大倍数"在画面上就成了假的
const span = computed(() => {
  const v = vals.value
  return Math.max(Math.abs(v.dx), Math.abs(v.du), Math.abs(v.dy), 1e-6) * 1.7
})
const tickStep = computed(() => {
  const raw = span.value / 3.2
  const p10 = Math.pow(10, Math.floor(Math.log10(raw)))
  const m = raw / p10
  return (m >= 5 ? 5 : m >= 2 ? 2 : 1) * p10
})

const ROWS = [2.05, 0, -2.05] // 三把尺子在数据坐标里的高度

const canvas = ref(null)
usePlot(
  canvas,
  (ctx, w, hh) => {
    const s = span.value
    const v = makeView(w, hh, -s * 1.28, s * 1.28, -3.3, 3.1, { l: 92, r: 18, t: 14, b: 16 })
    const V = vals.value
    const step = tickStep.value

    const rulers = [
      { y: ROWS[0], name: '输入 x', at: V.a, d: V.dx, color: C.ink, sym: 'Δx' },
      { y: ROWS[1], name: '中间 u', at: V.u0, d: V.du, color: C.accent, sym: 'Δu' },
      { y: ROWS[2], name: '输出 y', at: V.y0, d: V.dy, color: C.indigo, sym: 'Δy' },
    ]

    for (const r of rulers) {
      const py = v.Y(r.y)
      // 尺身
      ctx.save()
      ctx.strokeStyle = C.grid
      ctx.lineWidth = 1.2
      ctx.beginPath()
      ctx.moveTo(v.X(-s * 1.2), py)
      ctx.lineTo(v.X(s * 1.2), py)
      ctx.stroke()
      // 刻度（三把尺子步长相同，这是"同一个放大倍率"的凭据）
      for (let k = -12; k <= 12; k++) {
        const t = k * step
        if (Math.abs(t) > s * 1.2) continue
        const px = v.X(t)
        ctx.beginPath()
        ctx.moveTo(px, py - (k === 0 ? 9 : 5))
        ctx.lineTo(px, py + (k === 0 ? 9 : 5))
        ctx.stroke()
      }
      ctx.restore()
      // 增量条
      ctx.save()
      ctx.fillStyle = r.color
      ctx.globalAlpha = 0.75
      const x1 = v.X(0)
      const x2 = v.X(r.d)
      ctx.fillRect(Math.min(x1, x2), py - 13, Math.abs(x2 - x1), 11)
      ctx.restore()
      // 左侧行名与当前取值
      drawLabel(ctx, v.pad.l - 10, py - 6, r.name, { color: r.color, align: 'right', size: 13 })
      drawLabel(ctx, v.pad.l - 10, py + 12, `= ${fmt(r.at, 3)}`, { color: C.soft, align: 'right', size: 12 })
      // 增量数值（贴在条的外端，避开尺身）
      const tip = Math.abs(x2 - x1) < 2 ? x1 + 6 : x2 + (x2 >= x1 ? 8 : -8)
      drawLabel(ctx, tip, py - 18, `${r.sym} = ${fmt(r.d, 4)}`, {
        color: r.color,
        align: x2 >= x1 ? 'left' : 'right',
        size: 12,
      })
    }

    // 两级放大箭头
    const ax = s * 0.92
    const mag = [
      { from: ROWS[0], to: ROWS[1], val: V.r1, tag: 'Δu/Δx' },
      { from: ROWS[1], to: ROWS[2], val: V.r2, tag: 'Δy/Δu' },
    ]
    for (const m of mag) {
      drawArrow(ctx, v, ax, m.from - 0.5, ax, m.to + 0.55, { color: C.gold, width: 2 })
      const py = (v.Y(m.from) + v.Y(m.to)) / 2
      const txt = Number.isFinite(m.val) ? `×${m.val.toFixed(3).replace('-', '−')}` : '× 未定义'
      drawLabel(ctx, v.X(ax) + 10, py - 2, txt, { color: C.gold, size: 14 })
      drawLabel(ctx, v.X(ax) + 10, py + 15, m.tag, { color: C.soft, size: 11 })
    }

    drawLabel(ctx, v.pad.l, v.pad.t + 12, `三把尺子刻度相同：每小格 = ${fmt(step, 4)}`, {
      color: C.soft,
      size: 12,
    })
    if (!Number.isFinite(V.r2)) {
      drawLabel(ctx, v.pad.l, v.Y(-2.95), 'Δu = 0：中间那一步除以了零 —— 正是教科书证明里跳过的坑', {
        color: C.accent,
        size: 13,
      })
    }
  },
  { height: 400, watchSources: [pairKey, x0, h] },
)
</script>

<template>
  <DemoFrame title="链式法则：两次放大，倍数相乘">
    <canvas ref="canvas" class="demo-canvas"></canvas>
    <template #controls>
      <label class="ctrl">
        <span class="ctrl-label">复合函数</span>
        <select v-model="pairKey" class="ctrl-select" @change="onPairChange">
          <option v-for="(p, k) in PAIRS" :key="k" :value="k">{{ p.label }}</option>
        </select>
      </label>
      <ControlSlider
        label="输入点 x₀"
        v-model="x0"
        :min="P.xMin"
        :max="P.xMax"
        :step="0.05"
        :display="(x) => x.toFixed(2)"
      />
      <ControlSlider
        label="增量 h（往右迈一小步）"
        v-model="h"
        :min="0.01"
        :max="0.5"
        :step="0.01"
        :display="(x) => x.toFixed(2)"
      />
    </template>
    <template #readout>
      Δx = <b>{{ fmt(vals.dx, 4) }}</b> → Δu = <b>{{ fmt(vals.du, 4) }}</b> → Δy =
      <b>{{ fmt(vals.dy, 4) }}</b
      ><br />
      <template v-if="Number.isFinite(vals.r2)">
        {{ vals.r1.toFixed(3) }} × {{ vals.r2.toFixed(3) }} = <b>{{ (vals.r1 * vals.r2).toFixed(3) }}</b> ＝
        Δy/Δx <b>{{ vals.r3.toFixed(3) }}</b> · h→0 的极限 <MathInline tex="g'(x_0)f'(u_0)" /> =
        <b>{{ vals.exact.toFixed(3) }}</b>
      </template>
      <template v-else>
        Δu = 0，中间比值 Δy/Δu <b>没有定义</b> · 而 Δy/Δx = <b>{{ vals.r3.toFixed(3) }}</b> 照样算得出来
      </template>
    </template>
    <template #note>
      <p><b>三个旋钮分别是什么</b></p>
      <ul>
        <li>
          <b>复合函数</b>（下拉）：选一对 <MathInline tex="u = g(x)" /> 与
          <MathInline tex="y = f(u)" />。四组都是正文或后面几讲真会用到的：
          <MathInline tex="\sin x^2" />、<MathInline tex="\sin^2 x" />、
          <MathInline tex="\sqrt{1+x^2}" />（弧长公式的芯）、
          <MathInline tex="e^{-x^2/2}" />（正态分布那条钟形曲线）。
        </li>
        <li>
          <b>输入点 x₀</b>：在哪一点考察。它是<strong>真参数</strong>——换个点，两级放大倍数都变。
        </li>
        <li>
          <b>增量 h</b>：往右迈出的那一小步有多长（0.01 到 0.5）。
          它<strong>不是</strong>函数的参数，是"你拿多长的尺子去量变化率"——
          量出来的永远是一段区间上的平均放大倍数，h 缩小它才逼近某一点的瞬时倍数。
        </li>
      </ul>
      <p>
        <b>画面在说什么</b>：三把横尺分别是 x、u、y 的<strong>局部放大镜</strong>，
        中心那道长刻度就是当前的 <MathInline tex="x_0" />、<MathInline tex="u_0" />、
        <MathInline tex="y_0" />（左侧写着具体值）。彩色横条是各自迈出的那一步
        <MathInline tex="\Delta x,\ \Delta u,\ \Delta y" />。
        <strong>要紧的是：三把尺子的每小格代表同样大的数</strong>（画面左上角写着每小格是多少），
        所以横条的<strong>长短可以直接比</strong>——第二条比第一条长多少倍，
        就是第一级放大倍数 <MathInline tex="\Delta u/\Delta x" />，金色箭头旁边写着它。
      </p>
      <p>
        <b>照着做一遍（一）：亲眼看见"倍数相乘"。</b>选第一组
        <MathInline tex="y = \sin x^2" />，x₀ 停在 <b>0.90</b>，h 拖到 <b>0.200</b>。
        读数区给出 Δx = 0.2 → Δu = <b>0.4</b> → Δy = <b>0.2113</b>，两级倍数是
        <b>2.000 × 0.528</b>，乘起来 <b>1.057</b>；而末行的 Δy/Δx 也正是 <b>1.057</b>。
        <strong>两者一模一样不是巧合，是恒等式</strong>：
        <MathInline tex="\frac{\Delta y}{\Delta u}\cdot\frac{\Delta u}{\Delta x}" /> 里的
        <MathInline tex="\Delta u" /> 是<em>同一个数</em>，真的约得掉。
        <b>链式法则在有限的 h 上就已经成立了，取极限只是最后一步。</b>
      </p>
      <p>
        <b>照着做一遍（二）：看它收敛到解析答案。</b>保持 x₀ = 0.90，把 h 从 0.50 拖到 0.01，
        盯着最后两个数：乘积从 <b>0.402</b> 一路爬到 <b>1.236</b>，
        而"h→0 的极限"那一栏<strong>始终是 <b>1.241</b> 纹丝不动</strong>
        （即 <MathInline tex="2x\cos(x^2)=1.8\cos 0.81" />，它不含 h）。
        h = 0.01 时两者只差 <b>0.005</b>。顺带留意 h = 0.5 那一档有多离谱（0.402 对 1.241）——
        <strong>"放大倍数"是个瞬时概念，尺子太长量出来的是别人</strong>。
      </p>
      <p>
        <b>照着做一遍（三）：撞一次证明里的坑。</b>选第一组，
        把 h 拖到 <b>0.100</b>、x₀ 拖到 <b>−0.05</b>。此时
        <MathInline tex="u = x^2" /> 在 −0.05 与 +0.05 处<strong>取值相同</strong>，于是
        <MathInline tex="\Delta u = 0" />：画面中间那把尺子上的横条<strong>缩没了</strong>，
        读数区直说"Δy/Δu 没有定义"。
        <strong>可 Δy/Δx 照样算得出来</strong>，而且是干干净净的 <b>0</b>
        （两端 u 相同，y 自然也相同）。
        这正是肆节要补的那个漏洞：把链式法则写成"两个比值相乘"的证明，
        在 <MathInline tex="\Delta u = 0" /> 的时刻会当场除以零，
        而这种时刻<strong>要多少有多少</strong>——教科书多半一句带过，正文里给了补丁。
      </p>
      <p>
        （<b>一个诚实的小注</b>：<MathInline tex="\Delta u" /> 那一栏显示 0.0000 时，
        它可能是<em>真的</em> 0（如上例），也可能只是小于四位小数。判据看金色箭头：
        真为 0 时才会显示"× 未定义"。）
      </p>
    </template>
  </DemoFrame>
</template>
