<script setup>
import { ref, computed } from 'vue'
import { usePlot, makeSquareView, drawPoint, drawLabel, C, fmt } from './plot.js'
import DemoFrame from '../components/DemoFrame.vue'
import ControlSlider from '../components/ControlSlider.vue'
import MathInline from '../components/MathInline.vue'

// 解两条直线的交点 = 解一个 2×2 线性方程组 A x = b。
//   L1: y = m1(x−1) + 1        （固定）
//   L2: y = m2(x−1) + 1 + δ    （m2 = m1 − d；δ 是给右端 b 的微小扰动）
// 两条线都被强制穿过 (1,1)，所以 δ=0 时名义解恒为 (1,1)——不管 d 怎么变。
// 这一点很要紧：肆节那条不等式量的是解的**相对**误差 ‖δx‖/‖x‖，
// 若名义解落在原点（旧版就是如此），这个比值根本没有定义。
const m1 = 0.6
const SOL = [1, 1] // 名义解，钉死不动
// 默认档位要一眼看得出"两个解分开了"：d=0.6、δ=0.05 时两点相距不到半格，
// 叠成一个点，读者会以为什么都没发生。取 d=0.3、δ=0.15，解从 (1,1) 移到 (1.5,1.3)。
const d = ref(0.3) // 两线斜率差：小 = 近乎平行 = 病态
const delta = ref(0.15) // 给 L2 的竖直扰动，等价于把 b 的第二个分量动一点点

const m2 = computed(() => m1 - d.value)
// A = [[m1,−1],[m2,−1]]，名义右端 b₀ = (m1−1, m2−1)ᵀ；扰动只动它的第二个分量
const b0 = computed(() => [m1 - 1, m2.value - 1])

// 扰动后的交点：m1(x−1)+1 = m2(x−1)+1+δ ⟹ (x−1)d = δ
const pPerturbed = computed(() => {
  const x = 1 + delta.value / d.value
  return [x, m1 * (x - 1) + 1]
})

// κ₂(A) = σmax/σmin，2×2 直接由 AᵀA 的特征值开方
const kappa = computed(() => {
  const a = m1, b = -1, c = m2.value, e = -1
  const p = a * a + c * c
  const q = a * b + c * e
  const r = b * b + e * e
  const tr = p + r
  const det = p * r - q * q
  const disc = Math.sqrt(Math.max(0, (tr * tr) / 4 - det))
  return Math.sqrt((tr / 2 + disc) / Math.max(tr / 2 - disc, 1e-30))
})

const norm = (v) => Math.hypot(v[0], v[1])
// 解的相对变化 与 数据的相对变化
const relX = computed(
  () => norm([pPerturbed.value[0] - SOL[0], pPerturbed.value[1] - SOL[1]]) / norm(SOL),
)
const relB = computed(() => Math.abs(delta.value) / norm(b0.value))
const amp = computed(() => (delta.value === 0 ? null : relX.value / relB.value))
// 两条直线的夹角（度），比"斜率差"直观
const angle = computed(
  () => Math.abs(Math.atan(m1) - Math.atan(m2.value)) * (180 / Math.PI),
)

const canvas = ref(null)
usePlot(
  canvas,
  (ctx, w, h) => {
    const v = makeSquareView(w, h, 4)

    ctx.save()
    ctx.strokeStyle = C.grid
    ctx.lineWidth = 1
    for (let i = Math.ceil(v.x0); i <= v.x1; i++) {
      ctx.beginPath()
      ctx.moveTo(v.X(i), v.pad.t)
      ctx.lineTo(v.X(i), v.pad.t + v.ih)
      ctx.stroke()
    }
    for (let j = Math.ceil(v.y0); j <= v.y1; j++) {
      ctx.beginPath()
      ctx.moveTo(v.pad.l, v.Y(j))
      ctx.lineTo(v.pad.l + v.iw, v.Y(j))
      ctx.stroke()
    }
    ctx.strokeStyle = '#b9b3a6'
    ctx.beginPath()
    ctx.moveTo(v.pad.l, v.Y(0))
    ctx.lineTo(v.pad.l + v.iw, v.Y(0))
    ctx.moveTo(v.X(0), v.pad.t)
    ctx.lineTo(v.X(0), v.pad.t + v.ih)
    ctx.stroke()
    ctx.restore()

    // 过 (1,1) 且斜率为 slope 的直线，再整体上移 shift
    const line = (slope, shift, color, width, dash = []) => {
      ctx.save()
      ctx.strokeStyle = color
      ctx.lineWidth = width
      ctx.setLineDash(dash)
      const Y = (x) => slope * (x - 1) + 1 + shift
      ctx.beginPath()
      ctx.moveTo(v.X(v.x0), v.Y(Y(v.x0)))
      ctx.lineTo(v.X(v.x1), v.Y(Y(v.x1)))
      ctx.stroke()
      ctx.restore()
    }

    line(m1, 0, C.ink, 2.2) // L1（第一个方程）
    line(m2.value, 0, 'rgba(139,132,148,0.75)', 1.8, [6, 4]) // L2 名义位置
    if (delta.value !== 0) line(m2.value, delta.value, C.accent, 2.2) // L2 扰动后

    // 两个点都落在三条线交汇处，标签不垫底就会被线划穿，糊得读不出字
    const tag = (x, y, text, color) => {
      ctx.save()
      ctx.font = '12px "PingFang SC", "Noto Sans SC", sans-serif'
      const w = ctx.measureText(text).width
      ctx.fillStyle = 'rgba(250,248,243,0.88)'
      ctx.fillRect(x - 3, y - 12, w + 6, 16)
      ctx.restore()
      drawLabel(ctx, x, y, text, { color, size: 12 })
    }

    drawPoint(ctx, v, SOL[0], SOL[1], { color: C.green, r: 5.5 })
    // 真解的标签挂在左下方，给右上方让出位置——扰动小的时候两个点几乎重合，
    // 两个标签若都挂在右侧会叠成一团糊字
    tag(v.X(SOL[0]) - 68, v.Y(SOL[1]) + 26, '真解 (1, 1)', C.green)
    if (delta.value !== 0) {
      const [px, py] = pPerturbed.value
      const inView = px >= v.x0 && px <= v.x1 && py >= v.y0 && py <= v.y1
      if (inView) {
        drawPoint(ctx, v, px, py, { color: C.accent, r: 5.5 })
        // 两点像素距离够开才标注，否则文字会压在真解的标签上
        const gap = Math.hypot(v.X(px) - v.X(SOL[0]), v.Y(py) - v.Y(SOL[1]))
        // 画布上 1 个单位只有 40 多像素，阈值放到 16px 才不会把明明分得开的两点也算作重合
        if (gap > 16) {
          tag(v.X(px) + 11, v.Y(py) - 14, '算出来的解', C.accent)
        }
      } else {
        drawLabel(ctx, v.pad.l + 12, v.pad.t + v.ih - 14, '⚠ 算出来的解已飞出画面！', {
          color: C.accent,
          size: 13,
        })
      }
    }
    drawLabel(
      ctx,
      v.pad.l + 12,
      v.pad.t + 18,
      angle.value < 10 ? '两线近乎平行 → 病态' : '两线夹角明显 → 良态',
      { color: angle.value < 10 ? C.accent : C.green, size: 13 },
    )
  },
  { height: 380, watchSources: [d, delta] },
)
</script>

<template>
  <DemoFrame title="条件数：同样的扰动，为什么有的方程组稳如磐石，有的一碰就飞">
    <canvas ref="canvas" class="demo-canvas"></canvas>
    <template #controls>
      <ControlSlider
        label="斜率差 d（越小越平行）"
        v-model="d"
        :min="0.03"
        :max="1.4"
        :step="0.01"
        :display="(v) => fmt(v, 2)"
      />
      <ControlSlider
        label="扰动 δ（挪动第二个方程）"
        v-model="delta"
        :min="-0.2"
        :max="0.2"
        :step="0.01"
        :display="(v) => fmt(v, 2)"
      />
    </template>
    <template #readout>
      两线夹角 {{ fmt(angle, 1) }}°，条件数 κ(A) =
      <b :style="{ color: kappa > 20 ? '#b23a2f' : '#2f7d4f' }">{{
        kappa < 100 ? fmt(kappa, 1) : Math.round(kappa)
      }}</b>
      <br />
      <template v-if="amp === null">把 δ 拖离 0，这里会显示"数据动了几 % → 解动了几 %"</template>
      <template v-else>
        数据动了 {{ fmt(relB * 100, 2) }}% → 解动了
        <b>{{ fmt(relX * 100, 2) }}%</b>，实际放大
        <b :style="{ color: amp > 5 ? '#b23a2f' : '#2f7d4f' }">{{ fmt(amp, 2) }}</b> 倍（κ
        是上限 {{ fmt(kappa, 1) }}）
      </template>
    </template>
    <template #note>
      <b>两个控件</b>：①<b>斜率差 d</b>——第一条线斜率固定 0.6，第二条是 <MathInline tex="0.6-d" />，
      所以 d 越小两线越平行（读数区把它换算成更直观的<b>夹角</b>）；
      ②<b>扰动 δ</b>——把第二个方程整条<b>竖直挪</b> δ 个单位（坐标轴上的格子），
      相当于右端向量 <MathInline tex="\mathbf{b}" /> 的第二个分量被测量误差动了一下。
      两条线都被强制穿过 <MathInline tex="(1,1)" />，所以 <MathInline tex="\delta=0" /> 时<b>真解恒为 (1,1)</b>，
      不管 d 怎么变——这样"解的相对误差"才有得比（要是真解落在原点，除以零就没意义了）。
      <br /><br />
      <b>照这几组拖。</b>
      ① <b>d=1.4、δ=0.05</b>：夹角 69.6°，κ=1.5，数据动 2.71% 解动 2.95%，放大 <b>1.09 倍</b>——
      几乎原样传过去，<b>良态</b>；
      ② <b>d 一路拖到 0.03、δ 不动</b>：夹角 1.3°，κ 冲到 <b>89.5</b>，同样的 δ 被放大 <b>16.1 倍</b>——
      数据只动 8.51%，解却动了 <b>137%</b>，红点跑到 <MathInline tex="x\approx2.67" />；
      ③ <b>再把 δ 拖到 0.2</b>：解动 550%，直接飞出画面（<MathInline tex="x\approx7.67" />）。
      输入只动了百分之几，答案面目全非——<b>病根在问题本身，不在算法</b>；
      ④ <b>固定 d，只来回拖 δ</b>：注意"实际放大"那个数<b>一动不动</b>。
      这正是条件数的含义——放大倍数是<b>矩阵 A 的属性</b>，与你扰动多大无关。
      <br /><br />
      <b>为什么实际放大总是小于 κ？</b>κ 是<b>最坏情况</b>的上限：只有当 <MathInline tex="\mathbf{b}" />
      恰好指在最"软"的方向、而扰动恰好指在最"硬"的方向时才顶得满。
      这个 demo 里 δ 只能竖直挪，方向被限死了，所以拿不到满分——
      但 d 一小，实际放大和 κ 就一起往上冲，量级完全同步。
    </template>
  </DemoFrame>
</template>
