<script setup>
import { ref, computed } from 'vue'
import { usePlot, makeView, drawLabel, C } from './plot.js'
import DemoFrame from '../components/DemoFrame.vue'
import ControlSlider from '../components/ControlSlider.vue'
import MathInline from '../components/MathInline.vue'

// n 块砖从上往下叠，第 k 块（自上而下）相对下面一块前伸 1/(2k) 个砖长，
// 总伸出量 = H_n / 2。这是调和级数的物理化身。
const n = ref(8)

const GAMMA = 0.5772156649015329

const H = computed(() => {
  let s = 0
  for (let i = 1; i <= n.value; i++) s += 1 / i
  return s
})
const overhang = computed(() => H.value / 2)
const approx = computed(() => (Math.log(n.value) + GAMMA) / 2)

// 每块砖右端超出桌沿多少（单位：砖长）。桌沿在 x = 0。
// 最底下那块只探出 1/(2n)，往上每块再多探 1/(2k)，最上面那块累计到 H_n/2。
// 写成"从总量里逐层扣掉"最省事：第 i 块（自上而下，i 从 0 数）的右端 = H_n/2 − H_i/2。
const lefts = computed(() => {
  const total = H.value / 2
  const out = []
  let partial = 0 // H_i / 2
  for (let i = 0; i < n.value; i++) {
    out.push(total - partial)
    partial += 1 / (2 * (i + 1))
  }
  return out // out[0] 是最上面那块（探得最远），out[n-1] 是压在桌上的那块
})

const canvas = ref(null)
usePlot(
  canvas,
  (ctx, w, hh) => {
    const N = n.value
    const maxOut = Math.max(1.2, overhang.value * 1.15)
    // 数据坐标：x 以砖长为单位，桌沿在 x = 0；y 以砖厚为单位
    const v = makeView(w, hh, -1.9, maxOut + 0.35, -0.6, Math.max(6, N * 1.06), {
      l: 34,
      r: 14,
      t: 14,
      b: 26,
    })

    // 桌子
    ctx.save()
    ctx.fillStyle = 'rgba(120, 110, 95, 0.20)'
    ctx.fillRect(v.X(-1.9), v.Y(0), v.X(0) - v.X(-1.9), v.Y(-0.55) - v.Y(0))
    ctx.strokeStyle = C.soft
    ctx.lineWidth = 1.6
    ctx.beginPath()
    ctx.moveTo(v.X(-1.9), v.Y(0))
    ctx.lineTo(v.X(0), v.Y(0))
    ctx.lineTo(v.X(0), v.Y(-0.55))
    ctx.stroke()
    ctx.restore()
    drawLabel(ctx, v.X(-0.1), v.Y(-0.3), '桌沿', { color: C.soft, align: 'right', size: 12 })

    // 砖块：自下而上画（数组末尾是最下面那块）
    const L = lefts.value
    const brickH = 1
    for (let i = 0; i < N; i++) {
      // i = 0 是最上面那块，它在最高层
      const right = L[i]
      const left = right - 1
      const yTop = N - i // 层高（最上面那块 y 从 N-1 到 N）
      const px = v.X(left)
      const pw = v.X(right) - px
      const py = v.Y(yTop)
      const ph = v.Y(yTop - brickH) - py
      ctx.fillStyle = i === 0 ? 'rgba(178, 58, 47, 0.42)' : 'rgba(58, 94, 160, 0.26)'
      ctx.fillRect(px, py, pw, ph)
      ctx.strokeStyle = i === 0 ? C.accent : 'rgba(58, 94, 160, 0.7)'
      ctx.lineWidth = 1
      ctx.strokeRect(px, py, pw, ph)
    }

    // 伸出量标注
    ctx.save()
    ctx.strokeStyle = C.green
    ctx.lineWidth = 1.6
    ctx.setLineDash([5, 4])
    ctx.beginPath()
    ctx.moveTo(v.X(overhang.value), v.Y(-0.55))
    ctx.lineTo(v.X(overhang.value), v.Y(N + 0.4))
    ctx.stroke()
    ctx.restore()
    drawLabel(ctx, v.X(overhang.value) + 6, v.Y(N * 0.5), `伸出 ${overhang.value.toFixed(3)} 砖长`, {
      color: C.green,
      size: 12,
    })
    // 一砖长参照线
    ctx.save()
    ctx.strokeStyle = 'rgba(120,110,95,0.55)'
    ctx.lineWidth = 1
    ctx.setLineDash([3, 3])
    ctx.beginPath()
    ctx.moveTo(v.X(1), v.Y(-0.55))
    ctx.lineTo(v.X(1), v.Y(N + 0.4))
    ctx.stroke()
    ctx.restore()
    drawLabel(ctx, v.X(1) + 5, v.Y(-0.3), '1 砖长', { color: C.soft, size: 11 })
  },
  { height: 380, watchSources: [n] },
)
</script>

<template>
  <DemoFrame title="叠砖块：调和级数的物理化身">
    <canvas ref="canvas" class="demo-canvas"></canvas>
    <template #controls>
      <ControlSlider label="砖块数 n" v-model="n" :min="1" :max="60" :step="1" />
    </template>
    <template #readout>
      <MathInline tex="H_n = 1+\tfrac12+\cdots+\tfrac1n" /> = <b>{{ H.toFixed(6) }}</b> · 伸出
      <MathInline tex="H_n/2" /> = <b>{{ overhang.toFixed(6) }}</b> 砖长<br />
      估计式 <MathInline tex="(\ln n+\gamma)/2" /> = <b>{{ approx.toFixed(6) }}</b> · 差
      <b>{{ (overhang - approx).toExponential(2) }}</b>
    </template>
    <template #note>
      <p>
        <b>这个动画在演什么</b>：把一摞完全相同的砖块摞在桌边，
        <strong>每块都要比下面那块往外挪一点</strong>，能挪多远而不倒？
        物理给出的最优摆法是：<strong>自上而下第 k 块，比它下面那块前伸
        <MathInline tex="\frac{1}{2k}" /> 个砖长</strong>
        （每一层的重心都恰好压在下一块的边缘上）。于是总伸出量是
      </p>
      <p>
        <MathInline tex="\text{伸出} = \tfrac12\bigl(1+\tfrac12+\tfrac13+\cdots+\tfrac1n\bigr) = \tfrac{H_n}{2}" />
        ——<strong>调和级数的一半</strong>。这就是本讲主角的实物版。
      </p>
      <p>
        <b>一个旋钮</b>：<b>砖块数 n</b>（1–60）。红色是最上面那块，绿色虚线标出总伸出量，
        灰色虚线是"1 个砖长"的参照。
      </p>
      <p>
        <b>照着做一遍（一）：伸出整整一块砖。</b>把 n 拖到 <b>4</b>：
        <MathInline tex="H_4 = 2.083333" />，伸出 <b>1.041667</b> 砖长——
        <strong>最上面那块已经完全悬在桌子外面了</strong>，
        它的正下方没有任何支撑。四块砖就能做到，
        这件事第一次看到的人几乎都不相信（可以拿几本一样厚的书试）。
      </p>
      <p>
        <b>照着做一遍（二）：伸出两块砖，代价陡增。</b>继续拖：
        n = <b>30</b> 时伸出 <b>1.997494</b>，<strong>差一点</strong>；
        n = <b>31</b> 时 <b>2.013623</b>，才刚够。
        <strong>第一块砖长只要 4 块砖，第二块砖长却要再加 27 块。</strong>
        往后更狠：伸出 3 砖长要 <b>227</b> 块，4 砖长要 <b>1674</b> 块——
        这三个数都是把 <MathInline tex="H_n/2" /> 逐项累加扫出来的。
      </p>
      <p>
        <b>照着做一遍（三）：看它像 ln n。</b>读数第二行是估计式
        <MathInline tex="(\ln n+\gamma)/2" />（<MathInline tex="\gamma=0.5772" /> 是欧拉常数）。
        n = 10 时两者差 <b>2.5e−2</b>，n = 60 时只差 <b>4.2e−3</b>，
        <strong>而且越拖越贴</strong>。这条估计式解释了一切：
        <MathInline tex="\ln n" /> 确实会涨到无穷（所以砖块理论上能伸出任意远），
        但它涨得<strong>慢得荒唐</strong>——要伸出 10 个砖长，
        需要 <MathInline tex="e^{20-\gamma}\approx 2.7\times 10^{8}" /> 块砖；
        伸出 50 个砖长要 <MathInline tex="1.5\times10^{43}" /> 块——
        <strong>把整个地球都拆成砖也只有大约 <MathInline tex="3\times10^{24}" /> 块
        （地球质量 <MathInline tex="6\times10^{24}" /> kg，一块砖按 2 kg 算），
        还差着十九个数量级</strong>。
      </p>
      <p>
        （<b>两个诚实的小注</b>：① 这是<strong>理想化</strong>的——砖是刚体、
        接触面无摩擦损耗、每层重心恰好压在边缘（真做的话稍微碰一下就塌，
        实际摆放要留余量）；② 这个"每块挪 1/(2k)"的摆法是<strong>单块悬挑</strong>下的最优解。
        如果允许下面用多块砖互相配平，能做得更远——2009 年有论文证明
        n 块砖的最优伸出量可以到 <MathInline tex="n^{1/3}" /> 量级，
        比 <MathInline tex="\ln n" /> 快得多。<strong>本 demo 演的是经典的单列版。</strong>）
      </p>
    </template>
  </DemoFrame>
</template>
