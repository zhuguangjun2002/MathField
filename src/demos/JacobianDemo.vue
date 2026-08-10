<script setup>
import { ref, computed } from 'vue'
import { usePlot, makeView, drawAxes, drawLabel, C } from './plot.js'
import DemoFrame from '../components/DemoFrame.vue'
import ControlSlider from '../components/ControlSlider.vue'
import MathInline from '../components/MathInline.vue'

const nR = ref(5) // r 方向分几格
const nT = ref(6) // θ 方向分几格
const pick = ref(3) // 选中第几圈（从内往外，1 开始）

const R0 = 0.2
const R1 = 2.0
const TH1 = Math.PI / 2

const dR = computed(() => (R1 - R0) / nR.value)
const dT = computed(() => TH1 / nT.value)

const sel = computed(() => {
  const i = Math.min(pick.value, nR.value) - 1
  const r1 = R0 + i * dR.value
  const r2 = r1 + dR.value
  const rmid = (r1 + r2) / 2
  const rectArea = dR.value * dT.value // (r,θ) 平面上那个方格的面积
  const ringArea = (dT.value / 2) * (r2 * r2 - r1 * r1) // xy 平面上扇环块的精确面积
  return { i, r1, r2, rmid, rectArea, ringArea, ratio: ringArea / rectArea }
})

const COLORS = ['rgba(178,58,47,0.35)', 'rgba(176,125,43,0.35)', 'rgba(58,94,160,0.3)', 'rgba(58,140,92,0.3)']

const canvas = ref(null)
usePlot(
  canvas,
  (ctx, w, hh) => {
    const half = w / 2
    // 左：(r, θ) 平面，一张普通方格纸
    const vL = makeView(w, hh, R0 - 0.15, R1 + 0.15, -0.12, TH1 + 0.12, { l: 40, r: w - half + 16, t: 24, b: 30 })
    // 右：xy 平面（等比例，否则扇形会被压扁）
    const ih = hh - 24 - 30
    const scale = ih / (R1 + 0.3)
    const iw = half - 40 - 16
    const vR = makeView(w, hh, -0.15, -0.15 + iw / scale, -0.15, -0.15 + ih / scale, {
      l: half + 40,
      r: 16,
      t: 24,
      b: 30,
    })

    drawAxes(ctx, vL, { xTicks: [0.5, 1, 1.5, 2], yTicks: [0.5, 1, 1.5], xLabel: 'r', yLabel: 'θ' })
    drawAxes(ctx, vR, { xTicks: [1, 2], yTicks: [1, 2], xLabel: 'x', yLabel: 'y' })

    const S = sel.value
    for (let i = 0; i < nR.value; i++) {
      for (let j = 0; j < nT.value; j++) {
        const r1 = R0 + i * dR.value
        const r2 = r1 + dR.value
        const t1 = j * dT.value
        const t2 = t1 + dT.value
        const isSel = i === S.i
        const col = isSel ? 'rgba(178,58,47,0.45)' : COLORS[(i + j) % COLORS.length].replace('0.3', '0.14')
        // 左：矩形
        ctx.fillStyle = col
        ctx.fillRect(vL.X(r1), vL.Y(t2), vL.X(r2) - vL.X(r1), vL.Y(t1) - vL.Y(t2))
        ctx.strokeStyle = 'rgba(255,255,255,0.9)'
        ctx.lineWidth = 1
        ctx.strokeRect(vL.X(r1), vL.Y(t2), vL.X(r2) - vL.X(r1), vL.Y(t1) - vL.Y(t2))
        // 右：扇环块
        ctx.beginPath()
        ctx.moveTo(vR.X(r1 * Math.cos(t1)), vR.Y(r1 * Math.sin(t1)))
        for (let k = 0; k <= 12; k++) {
          const t = t1 + ((t2 - t1) * k) / 12
          ctx.lineTo(vR.X(r2 * Math.cos(t)), vR.Y(r2 * Math.sin(t)))
        }
        for (let k = 12; k >= 0; k--) {
          const t = t1 + ((t2 - t1) * k) / 12
          ctx.lineTo(vR.X(r1 * Math.cos(t)), vR.Y(r1 * Math.sin(t)))
        }
        ctx.closePath()
        ctx.fillStyle = col
        ctx.fill()
        ctx.strokeStyle = 'rgba(255,255,255,0.9)'
        ctx.stroke()
      }
    }

    drawLabel(ctx, vL.pad.l, 15, '左：(r, θ) 平面上的方格纸', { color: C.soft, size: 12 })
    drawLabel(ctx, vR.pad.l, 15, '右：同样这些格子映到 xy 平面', { color: C.soft, size: 12 })
    // 这条提示贴在面板标题那一行的右端，不要压在格子上
    drawLabel(ctx, vL.pad.l + vL.iw, 15, `红色 = 第 ${S.i + 1} 圈`, { color: C.accent, align: 'right', size: 12 })
  },
  { height: 340, watchSources: [nR, nT, pick] },
)
</script>

<template>
  <DemoFrame title="雅可比：换坐标时，小块面积被放大了多少倍">
    <canvas ref="canvas" class="demo-canvas"></canvas>
    <template #controls>
      <ControlSlider label="r 方向格数" v-model="nR" :min="2" :max="10" :step="1" />
      <ControlSlider label="θ 方向格数" v-model="nT" :min="2" :max="12" :step="1" />
      <ControlSlider label="选第几圈（从内往外）" v-model="pick" :min="1" :max="10" :step="1" />
    </template>
    <template #readout>
      选中块：<MathInline tex="r\in" />[<b>{{ sel.r1.toFixed(3) }}</b
      >, <b>{{ sel.r2.toFixed(3) }}</b
      >] · 左边方格面积 <MathInline tex="\Delta r\,\Delta\theta" /> =
      <b>{{ sel.rectArea.toFixed(5) }}</b
      ><br />
      右边扇环块面积 = <b>{{ sel.ringArea.toFixed(5) }}</b> · 面积比 =
      <b>{{ sel.ratio.toFixed(5) }}</b> ＝ 中点半径 <b>{{ sel.rmid.toFixed(5) }}</b>
    </template>
    <template #note>
      <p><b>三个旋钮分别是什么</b></p>
      <ul>
        <li><b>r 方向格数</b> / <b>θ 方向格数</b>：把 <MathInline tex="(r,\theta)" /> 那张方格纸切得多细。</li>
        <li>
          <b>选第几圈</b>：高亮从内往外数第几圈（红色）。<strong>它只改变你在看谁，不改变网格。</strong>
        </li>
      </ul>
      <p>
        <b>画面在说什么</b>：左边是 <MathInline tex="(r,\theta)" /> 平面上一张<strong>普通方格纸</strong>
        ——每个格子都一样大，面积 <MathInline tex="\Delta r\,\Delta\theta" />。
        右边是同样这些格子按 <MathInline tex="x=r\cos\theta,\ y=r\sin\theta" />
        搬到 xy 平面之后的样子：<strong>它们变成了扇环块，而且离原点越远越大</strong>。
        <strong>换坐标不是免费的——面积被拉伸了，拉伸多少就是"雅可比"。</strong>
      </p>
      <p>
        <b>照着做一遍（一）：面积比恰好等于半径。</b>默认档（r 格数 5、θ 格数 6、选第 3 圈）：
        左边方格面积 <b>0.09425</b>，右边扇环块 <b>0.10367</b>，
        <strong>比值 1.10000——正好是这一圈的中点半径 1.10000</strong>。
        换到第 1 圈：比值 <b>0.38000</b>；第 5 圈：<b>1.82000</b>。
        <strong>每一档，比值都精确等于中点半径</strong>（不是近似——扇环面积
        <MathInline tex="\frac{\Delta\theta}{2}(r_2^2-r_1^2)" /> 恰好等于
        <MathInline tex="r_{\text{中}}\,\Delta r\,\Delta\theta" />，因式分解即得）。
      </p>
      <p>
        <b>照着做一遍（二）：把格子切细，"中点半径"就成了"那一点的 r"。</b>
        把 r 格数拖到 <b>10</b>，每格只有 0.18 宽，选中块的比值与它两端半径的差别小到可以忽略。
        <strong>取极限就得到 <MathInline tex="\mathrm{d}A = r\,\mathrm{d}r\,\mathrm{d}\theta" /></strong>
        ——这就是极坐标积分里那个"莫名其妙多出来的 r"的全部来历。
      </p>
      <p>
        <b>照着做一遍（三）：看原点附近发生了什么。</b>选第 1 圈（最内圈），
        比值只有 <b>0.38</b>；<strong>如果内半径能拖到 0，比值会趋于 0</strong>——
        面积被压没了。这正是<strong>雅可比在原点等于零</strong>的后果：
        那里 <MathInline tex="\theta" /> 已经失去意义（原点的角度是多少？），
        坐标变换在这一点<strong>不可逆</strong>。
        正文肆节说的"换元要求雅可比不为零"，指的就是这种地方。
      </p>
      <p>
        （<b>一个诚实的小注</b>：右边面板是<strong>等比例</strong>画的
        （x、y 一个单位占同样的像素），否则扇形会被压扁、"面积变大"就成了错觉；
        左边不是等比例，因为 r 与 θ 是量纲不同的两个量，硬要等比例反而没意义。）
      </p>
    </template>
  </DemoFrame>
</template>
