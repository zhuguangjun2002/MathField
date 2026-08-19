<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { usePlot, makeSquareView, drawArrow, drawLabel, C, fmt } from './plot.js'
import DemoFrame from '../components/DemoFrame.vue'
import MathInline from '../components/MathInline.vue'

// 列向量 u = (a, c)，v = (b, d)；矩阵 [a b; c d]
const ux = ref(2)
const uy = ref(0.4)
const vx = ref(0.6)
const vy = ref(1.6)

const det = computed(() => ux.value * vy.value - uy.value * vx.value)

// ―― 挑战模式：五道"给定目标 det，拖蓝箭头去够"的题 ――
// 每题把红箭头 u 锁死（挑战期间抓不动），只留蓝箭头 v 给你拖；
// 交卷前读数区不报 det，否则就成了盯着数字微调，几何一眼都不用看。
// 五个目标都在 node 里验过：在 0.1 的吸附网格上都有精确解（见 #note 的分题列表），
// 且可达的偏差值是 0、0.1、0.2……，容差 0.12 正好卡在 0.1 与 0.2 之间，不压刀刃。
const TOL = 0.12
const CHALLENGE = [
  { ux: 2, uy: 0, target: 3, why: 'u 水平，det = 2 × v 的纵坐标；横坐标拖到哪都不影响。' },
  { ux: 2, uy: 0, target: -3, why: '同样大的面积，符号要负——v 必须翻到 u 的另一侧去。' },
  { ux: 2, uy: 1, target: 0, why: 'det = 0 就是两箭头共线：v 落在 u 所在那条直线上。' },
  { ux: 1, uy: 2, target: 4, why: 'u 不再水平，可达解仍是一条平行于 u 的直线。' },
  { ux: 2, uy: -1, target: -2, why: 'u 指向第四象限，还要负号：v 得落在 u 的顺时针一侧。' },
]
const challenge = ref(false)
const round = ref(0)
const submitted = ref(false)
const score = ref(0)
const revealed = computed(() => !challenge.value || submitted.value)
const myErr = computed(() => Math.abs(det.value - CHALLENGE[round.value].target))

function loadRound() {
  const r = CHALLENGE[round.value]
  ux.value = r.ux
  uy.value = r.uy
  vx.value = 0 // 每题把 v 复位到原点上方一点，别让上一题的答案留在场上
  vy.value = 0.1
}

function startChallenge() {
  challenge.value = true
  round.value = 0
  submitted.value = false
  score.value = 0
  loadRound()
}

function quitChallenge() {
  challenge.value = false
  submitted.value = false
}

function submit() {
  if (submitted.value) return
  submitted.value = true
  if (myErr.value <= TOL) score.value += 1
}

function nextRound() {
  if (round.value < CHALLENGE.length - 1) {
    round.value += 1
    submitted.value = false
    loadRound()
  }
}

let view = null
let dragging = null // 'u' | 'v' | null

const canvas = ref(null)
const { render } = usePlot(
  canvas,
  (ctx, w, h) => {
    const v = makeSquareView(w, h, 3.1)
    view = v

    // 淡网格 + 轴
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
    ctx.lineWidth = 1.4
    ctx.beginPath()
    ctx.moveTo(v.pad.l, v.Y(0))
    ctx.lineTo(v.pad.l + v.iw, v.Y(0))
    ctx.moveTo(v.X(0), v.pad.t)
    ctx.lineTo(v.X(0), v.pad.t + v.ih)
    ctx.stroke()
    ctx.restore()

    const d = det.value
    const a = ux.value
    const c = uy.value
    const b = vx.value
    const dd = vy.value

    // 平行四边形：0, u, u+v, v。正定向填暖红、反定向填靛蓝、接近 0 变灰
    ctx.save()
    ctx.beginPath()
    ctx.moveTo(v.X(0), v.Y(0))
    ctx.lineTo(v.X(a), v.Y(c))
    ctx.lineTo(v.X(a + b), v.Y(c + dd))
    ctx.lineTo(v.X(b), v.Y(dd))
    ctx.closePath()
    ctx.fillStyle = Math.abs(d) < 0.08 ? 'rgba(139,132,148,0.25)' : d > 0 ? C.accentSoft : C.indigoSoft
    ctx.fill()
    ctx.strokeStyle = Math.abs(d) < 0.08 ? C.soft : d > 0 ? C.accent : C.indigo
    ctx.lineWidth = 1.2
    ctx.setLineDash([4, 4])
    ctx.stroke()
    ctx.restore()

    drawArrow(ctx, v, 0, 0, a, c, { color: C.accent, width: 2.8 })
    drawArrow(ctx, v, 0, 0, b, dd, { color: C.indigo, width: 2.8 })
    drawLabel(ctx, v.X(a) + 10, v.Y(c) + 4,
      `u = (${fmt(a, 1)}, ${fmt(c, 1)})${challenge.value ? ' 已锁定' : ' 拖我'}`, { color: C.accent })
    drawLabel(ctx, v.X(b) + 10, v.Y(dd) - 8, `v = (${fmt(b, 1)}, ${fmt(dd, 1)}) 拖我`, { color: C.indigo })

    if (Math.abs(d) < 0.08 && revealed.value) {
      drawLabel(ctx, v.pad.l + 12, v.pad.t + 24, 'det ≈ 0：平行四边形被压扁成一条线（矩阵"奇异"）', {
        color: C.accent,
        size: 14,
      })
    }
  },
  { height: 360, watchSources: [ux, uy, vx, vy, challenge, submitted] },
)

function pointerPos(e) {
  const rect = canvas.value.getBoundingClientRect()
  return [e.clientX - rect.left, e.clientY - rect.top]
}

function onDown(e) {
  if (!view) return
  const [px, py] = pointerPos(e)
  const du = challenge.value ? Infinity : Math.hypot(px - view.X(ux.value), py - view.Y(uy.value))
  const dv = Math.hypot(px - view.X(vx.value), py - view.Y(vy.value))
  if (Math.min(du, dv) > 28) return
  dragging = du <= dv ? 'u' : 'v'
  canvas.value.setPointerCapture(e.pointerId)
  e.preventDefault()
}

function onMove(e) {
  if (!dragging || !view) return
  const [px, py] = pointerPos(e)
  const x = Math.round(view.invX(px) * 10) / 10
  const y = Math.round(view.invY(py) * 10) / 10
  if (dragging === 'u') {
    ux.value = x
    uy.value = y
  } else {
    vx.value = x
    vy.value = y
  }
}

function onUp() {
  dragging = null
}

onMounted(() => {
  const el = canvas.value
  el.addEventListener('pointerdown', onDown)
  el.addEventListener('pointermove', onMove)
  el.addEventListener('pointerup', onUp)
  el.style.touchAction = 'none'
  el.style.cursor = 'grab'
})

onBeforeUnmount(() => {
  const el = canvas.value
  if (!el) return
  el.removeEventListener('pointerdown', onDown)
  el.removeEventListener('pointermove', onMove)
  el.removeEventListener('pointerup', onUp)
})
</script>

<template>
  <DemoFrame title="行列式：拖动两个列向量，看有向面积">
    <canvas ref="canvas" class="demo-canvas"></canvas>
    <template #controls>
      <div class="ctrl">
        <button v-if="!challenge" class="challenge-btn" type="button" @click="startChallenge">
          ⚔️ 开始挑战（5 题）
        </button>
        <template v-else>
          <button v-if="!submitted" class="challenge-btn is-on" type="button" @click="submit">
            交卷
          </button>
          <button
            v-else-if="round < CHALLENGE.length - 1"
            class="challenge-btn is-on"
            type="button"
            @click="nextRound"
          >
            下一题 →
          </button>
          <button class="challenge-btn" type="button" @click="quitChallenge">退出挑战</button>
        </template>
      </div>
    </template>
    <template #readout>
      <template v-if="challenge && !submitted">
        <span class="challenge-badge">第 {{ round + 1 }}/5 题 · 已对 {{ score }}</span><br />
        红箭头已锁定在 <b>u = ({{ fmt(ux, 1) }}, {{ fmt(uy, 1) }})</b>，请把蓝箭头 v 拖到使
        <b>det = {{ CHALLENGE[round].target }}</b> 的位置（容差 ±{{ TOL }}），再交卷
      </template>
      <template v-else-if="challenge">
        <span class="challenge-badge">第 {{ round + 1 }}/5 题 · 已对 {{ score }}</span><br />
        <template v-if="myErr <= TOL">✅ 对！</template><template v-else>❌ </template>
        v = ({{ fmt(vx, 1) }}, {{ fmt(vy, 1) }}) 给出 det =
        <b>{{ fmt(det) }}</b>，目标 {{ CHALLENGE[round].target }}。{{ CHALLENGE[round].why }}
      </template>
      <template v-else>
      矩阵
      <code>［{{ fmt(ux, 1) }} {{ fmt(vx, 1) }}；{{ fmt(uy, 1) }} {{ fmt(vy, 1) }}］</code><br />
      det = {{ fmt(ux, 1) }}×{{ fmt(vy, 1) }} − {{ fmt(uy, 1) }}×{{ fmt(vx, 1) }} =
      <b :style="{ color: det > 0.08 ? '#b23a2f' : det < -0.08 ? '#33518f' : '#8b8494' }">{{ fmt(det) }}</b>
      &nbsp;&nbsp;平行四边形面积 = |det| = <b>{{ fmt(Math.abs(det)) }}</b>
      </template>
    </template>
    <template #note>
      <p><b>这个动画没有滑杆，两个箭头本身就是控件</b></p>
      <ul>
        <li>
          <b>红箭头 u</b>：矩阵的<strong>第一列</strong>
          <MathInline tex="(a, c)" />。用鼠标抓住箭头尖拖动。
        </li>
        <li>
          <b>蓝箭头 v</b>：矩阵的<strong>第二列</strong>
          <MathInline tex="(b, d)" />，同样直接拖。
        </li>
      </ul>
      <p>
        两个箭头张成的平行四边形就是那块"有向面积"。读数区把
        <MathInline tex="ad - bc" /> 的两个乘积逐项写了出来，
        <strong>数字的颜色是有含义的</strong>：红色表示 det 为正、蓝色表示为负、
        灰色表示已经贴近 0（阈值 0.08，用来提示"快压扁了"）。
      </p>
      <p>
        <b>照着做一遍（一）：面积就是 det。</b>初始位置是
        <MathInline tex="\boldsymbol{u}=(2,\ 0.4)" />、<MathInline tex="\boldsymbol{v}=(0.6,\ 1.6)" />，
        读数 <MathInline tex="2\times 1.6 - 0.4\times 0.6 = 2.96" />。
        把 <MathInline tex="\boldsymbol{v}" /> 往上拉长一倍，平行四边形高度翻倍，det 也跟着翻倍——
        <strong>这就是公理里"多重线性"的手感</strong>。
      </p>
      <p>
        <b>照着做一遍（二）：压扁。</b>把 <MathInline tex="\boldsymbol{v}" /> 慢慢拖向
        <MathInline tex="\boldsymbol{u}" /> 所在的那条直线（同向或反向都行）。
        平行四边形越来越扁，det 的数字一路掉向 0，颜色也由红转灰。
        <strong>det = 0 的那一刻，两列共线</strong>——
        <router-link to="/linear-algebra/elimination">上一讲</router-link>"两条方程平行、消元露馅"
        的几何真相就是这个，"奇异矩阵"一词也指这场压扁事故。
      </p>
      <p>
        <b>照着做一遍（三）：负面积。</b>别停在共线处，<strong>继续拖过去</strong>，
        让 <MathInline tex="\boldsymbol{v}" /> 转到 <MathInline tex="\boldsymbol{u}" /> 的另一侧。
        det 穿过 0 变成负数，数字由灰转蓝。面积当然不会是负的——变的是<strong>定向</strong>：
        原来从 u 转到 v 是逆时针，现在成了顺时针。<strong>符号记录的是"翻面"，不是大小。</strong>
        （三维里这就是左手系与右手系之分。）
      </p>
      <p>
        <b>挑战模式的规则。</b>点「开始挑战」后连出五道题（<b>题目写死在程序里，谁玩都是
        同样五道、同样顺序</b>）。每题<b>把红箭头 u 锁死</b>——挑战期间它抓不动，标签会写「已锁定」，
        你只能拖蓝箭头 v；每题开始时 v 复位到 (0, 0.1)，免得上一题的答案留在场上。
        题目给一个<b>目标 det</b>，你把 v 拖到位再交卷。
        <b>交卷前读数区不报 det</b>——留着那个数字，这题就变成盯着它微调，几何一眼都不用看了。
        你手里只有网格（一格 = 1）、锁定的红箭头，和平行四边形的颜色
        （红＝正、蓝＝负、灰＝贴近 0，还是那个 0.08 阈值）。
      </p>
      <p>
        <b>判定容差 ±0.12</b>，这个数字是挑出来的不是拍的：箭头坐标吸附到 0.1 的网格上，
        所以 det 只能取到一串离散值，<b>与目标的偏差只可能是 0、0.1、0.2……</b>
        容差 0.12 正好卡在 0.1 与 0.2 中间——差 0.1 算过、差 0.2 算错，
        <b>不会出现"差一点点到底算不算"的刀刃</b>。五个目标也都验过：
        在这张吸附网格上<b>都有精确解</b>。
      </p>
      <p>
        <b>五道题的门道</b>（想自己先玩就别往下看）：
      </p>
      <ul>
        <li>
          <b>① u = (2, 0)，目标 det = 3</b>。因为 u 水平，
          <MathInline tex="\det = 2v_y - 0\cdot v_x = 2v_y" />，
          所以<b>只有 v 的高度算数</b>：<MathInline tex="v_y = 1.5" /> 就成，
          而 <MathInline tex="v_x" /> 拖到哪里都不影响。这张网格上<b>精确解有 63 个</b>，
          连成一条<b>水平直线</b>。这就是行列式最要紧的那条几何事实：
          <b>沿着 u 的方向平移 v，面积一点不变</b>（底不变、高不变）。
        </li>
        <li>
          <b>② u = (2, 0)，目标 det = −3</b>。面积一样大，但符号要负——
          光把 v 拖短拖长没用，<b>必须把它翻到 u 的另一侧</b>（<MathInline tex="v_y = -1.5" />）。
          这一题是专门拿来打「det 就是面积」这个半截理解的：<b>面积没有负的，定向才有</b>。
        </li>
        <li>
          <b>③ u = (2, 1)，目标 det = 0</b>。要把平行四边形<b>压成一条线</b>：
          v 必须落在 u 所在的那条直线上（<MathInline tex="v_y = v_x/2" />），
          如 (2, 1)、(−2, −1)、(1, 0.5)。精确解 31 个，连成的正是<b>那条直线本身</b>。
        </li>
        <li>
          <b>④ u = (1, 2)，目标 det = 4</b>。u 不再水平，① 那条规律照样成立：
          可达解仍是<b>一条平行于 u 的直线</b>，只是斜了。一个现成的答案是 v = (−1, 2)
          （<MathInline tex="1\times 2 - 2\times(-1) = 4" />）。
        </li>
        <li>
          <b>⑤ u = (2, −1)，目标 det = −2</b>。收官题把前面几样凑一块：u 指向第四象限，
          目标还带负号，所以 v 要落在 u 的<b>顺时针那一侧</b>。
          一个答案是 v = (0, −1)（<MathInline tex="2\times(-1) - (-1)\times 0 = -2" />）。
        </li>
      </ul>
      <p>
        行列式从来不是那个展开式。展开式只是这块面积的<em>计算方法</em>，
        而你刚刚拖的这块面积，才是它本人。
      </p>
    </template>
  </DemoFrame>
</template>
