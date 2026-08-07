<script setup>
import { ref, computed } from 'vue'
import { usePlot, makeSquareView, drawArrow, drawLabel, C, fmt } from './plot.js'
import DemoFrame from '../components/DemoFrame.vue'
import ControlSlider from '../components/ControlSlider.vue'
import MathInline from '../components/MathInline.vue'

const MATRICES = {
  symmetric: {
    label: '拉伸 A = [2 1; 1 2]（有两个特征方向）',
    m: [2, 1, 1, 2],
    hint: '特征方向在 45° 和 135°，特征值分别是 3 和 1',
  },
  shear: {
    label: '剪切 A = [1 1; 0 1]（只有一个特征方向）',
    m: [1, 1, 0, 1],
    hint: '只有水平方向（0° / 180°）保持不动，λ = 1',
  },
  rotation: {
    label: '旋转 A = [0 −1; 1 0]（没有实特征方向）',
    m: [0, -1, 1, 0],
    hint: '每个向量都被转走 90°，扫一整圈也找不到共线时刻——实特征值不存在',
  },
}

const mKey = ref('symmetric')
const theta = ref(20) // v 的方向角（度）

// ―― 挑战模式：五道写死的判定题（先凭 tr、det 心算，再扫圈验证）――
// 每道都验算过：λ² − (tr A)λ + det A 的判别式决定 2 / 1 / 0 条实特征方向
const CHALLENGE = [
  { m: [0, 1, 1, 0], ans: 2, why: '镜像：λ = ±1，特征线在 45° 与 135°' },
  { m: [3, 1, 0, 3], ans: 1, why: '(λ−3)² 重根，但方向只解出一条' },
  { m: [1, -1, 1, 1], ans: 0, why: 'λ²−2λ+2 判别式为负，实数里无解' },
  { m: [2, 0, 0, -1], ans: 2, why: 'λ = 2 与 −1 躺在对角线上，两条轴' },
  { m: [1, 1, 1, 0], ans: 2, why: '斐波那契矩阵！两根正是 φ 与 ψ' },
]
const challenge = ref(false)
const round = ref(0)
const picked = ref(null) // 本题已选的答案（null = 未答）
const score = ref(0)

function startChallenge() {
  challenge.value = true
  round.value = 0
  picked.value = null
  score.value = 0
  theta.value = 20
}

function quitChallenge() {
  challenge.value = false
  picked.value = null
}

function answer(n) {
  if (picked.value !== null) return
  picked.value = n
  if (n === CHALLENGE[round.value].ans) score.value += 1
}

function nextRound() {
  if (round.value < CHALLENGE.length - 1) {
    round.value += 1
    picked.value = null
    theta.value = 20
  }
}

const M = computed(() => (challenge.value ? CHALLENGE[round.value].m : MATRICES[mKey.value].m))

const v = computed(() => {
  const t = (theta.value * Math.PI) / 180
  return [1.4 * Math.cos(t), 1.4 * Math.sin(t)]
})
const Av = computed(() => {
  const [a, b, c, d] = M.value
  return [a * v.value[0] + b * v.value[1], c * v.value[0] + d * v.value[1]]
})

// 共线程度：|v × Av| / (|v||Av|) = sin(夹角)
const sinAngle = computed(() => {
  const cr = v.value[0] * Av.value[1] - v.value[1] * Av.value[0]
  const n = Math.hypot(...v.value) * Math.hypot(...Av.value)
  return n < 1e-9 ? 0 : Math.abs(cr) / n
})
const aligned = computed(() => sinAngle.value < 0.035 && Math.hypot(...Av.value) > 1e-6)

// 共线时的倍率（带符号）：λ = (Av · v) / (v · v)
const lambda = computed(() => {
  const dv = v.value[0] * v.value[0] + v.value[1] * v.value[1]
  return (Av.value[0] * v.value[0] + Av.value[1] * v.value[1]) / dv
})

const canvas = ref(null)
usePlot(
  canvas,
  (ctx, w, h) => {
    const view = makeSquareView(w, h, 3.2)

    // 网格与轴（淡）
    ctx.save()
    ctx.strokeStyle = C.grid
    ctx.lineWidth = 1
    for (let i = Math.ceil(view.x0); i <= view.x1; i++) {
      ctx.beginPath()
      ctx.moveTo(view.X(i), view.pad.t)
      ctx.lineTo(view.X(i), view.pad.t + view.ih)
      ctx.stroke()
    }
    for (let j = Math.ceil(view.y0); j <= view.y1; j++) {
      ctx.beginPath()
      ctx.moveTo(view.pad.l, view.Y(j))
      ctx.lineTo(view.pad.l + view.iw, view.Y(j))
      ctx.stroke()
    }
    ctx.strokeStyle = '#b9b3a6'
    ctx.beginPath()
    ctx.moveTo(view.pad.l, view.Y(0))
    ctx.lineTo(view.pad.l + view.iw, view.Y(0))
    ctx.moveTo(view.X(0), view.pad.t)
    ctx.lineTo(view.X(0), view.pad.t + view.ih)
    ctx.stroke()
    ctx.restore()

    // v 扫过单位圆时 Av 的轨迹（椭圆），提前铺垫"变换把圆变成什么"
    ctx.save()
    ctx.strokeStyle = 'rgba(176, 125, 43, 0.55)'
    ctx.lineWidth = 1.4
    ctx.setLineDash([5, 4])
    ctx.beginPath()
    const [a, b, c, d] = M.value
    for (let k = 0; k <= 120; k++) {
      const t = (k / 120) * Math.PI * 2
      const x = 1.4 * Math.cos(t)
      const y = 1.4 * Math.sin(t)
      const px = view.X(a * x + b * y)
      const py = view.Y(c * x + d * y)
      k ? ctx.lineTo(px, py) : ctx.moveTo(px, py)
    }
    ctx.closePath()
    ctx.stroke()
    ctx.restore()

    // 共线时刻：画出整条特征直线并高亮
    if (aligned.value) {
      const dvx = v.value[0] / Math.hypot(...v.value)
      const dvy = v.value[1] / Math.hypot(...v.value)
      ctx.save()
      ctx.strokeStyle = C.greenSoft
      ctx.lineWidth = 10
      ctx.beginPath()
      ctx.moveTo(view.X(-3.4 * dvx), view.Y(-3.4 * dvy))
      ctx.lineTo(view.X(3.4 * dvx), view.Y(3.4 * dvy))
      ctx.stroke()
      ctx.restore()
    }

    drawArrow(ctx, view, 0, 0, v.value[0], v.value[1], { color: aligned.value ? C.green : C.accent, width: 3 })
    drawArrow(ctx, view, 0, 0, Av.value[0], Av.value[1], { color: aligned.value ? C.green : C.indigo, width: 3 })
    drawLabel(ctx, view.X(v.value[0]) + 8, view.Y(v.value[1]) + 14, 'v', {
      color: aligned.value ? C.green : C.accent,
      size: 15,
    })
    drawLabel(ctx, view.X(Av.value[0]) + 8, view.Y(Av.value[1]) - 6, 'Av', {
      color: aligned.value ? C.green : C.indigo,
      size: 15,
    })

    if (aligned.value) {
      drawLabel(ctx, view.pad.l + 12, view.pad.t + 24, `⚡ 共线了！这是特征方向，λ ≈ ${fmt(lambda.value)}`, {
        color: C.green,
        size: 15,
      })
    }
  },
  { height: 380, watchSources: [theta, mKey] },
)
</script>

<template>
  <DemoFrame title="扫描特征方向：什么时候 Av 与 v 同一条线">
    <canvas ref="canvas" class="demo-canvas"></canvas>
    <template #controls>
      <label class="ctrl" v-if="!challenge">
        <span class="ctrl-label">矩阵</span>
        <select v-model="mKey" class="ctrl-select">
          <option v-for="(m, k) in MATRICES" :key="k" :value="k">{{ m.label }}</option>
        </select>
      </label>
      <ControlSlider label="v 的方向角 θ" v-model="theta" :min="0" :max="360" :step="1" :display="(x) => x + '°'" />
      <div class="ctrl">
        <button v-if="!challenge" class="challenge-btn" type="button" @click="startChallenge">
          ⚔️ 开始挑战（5 题）
        </button>
        <template v-else>
          <template v-if="picked === null">
            <button class="challenge-btn" type="button" @click="answer(2)">2 条</button>
            <button class="challenge-btn" type="button" @click="answer(1)">1 条</button>
            <button class="challenge-btn" type="button" @click="answer(0)">0 条</button>
          </template>
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
      <template v-if="challenge">
        <span class="challenge-badge">第 {{ round + 1 }}/5 题 · 已对 {{ score }}</span>&ensp;
        <MathInline
          :tex="'A = \\begin{pmatrix}' + M[0] + '&' + M[1] + '\\\\' + M[2] + '&' + M[3] + '\\end{pmatrix}'"
        />&ensp;
        <template v-if="picked === null">几条实特征方向？（先心算 tr、det，再扫圈验证）</template>
        <template v-else-if="picked === CHALLENGE[round].ans">
          ✅ 对！<br />{{ CHALLENGE[round].why }}
        </template>
        <template v-else>❌ 答案是 {{ CHALLENGE[round].ans }} 条<br />{{ CHALLENGE[round].why }}</template>
      </template>
      <template v-else>
        v 与 Av 的夹角偏差 sin = <b>{{ fmt(sinAngle, 3) }}</b>
        <template v-if="aligned">
          &nbsp;—— <b style="color: #2f7d4f">共线！特征值 λ ≈ {{ fmt(lambda) }}</b>
        </template>
        <template v-else>&nbsp;（{{ MATRICES[mKey].hint }}）</template>
      </template>
    </template>
    <template #note>
      <p><b>两个旋钮分别是什么</b></p>
      <ul>
        <li>
          <b>矩阵</b>（下拉）：三档不是随便选的，它们<strong>恰好演出特征值的三种结局</strong>——
          两个实特征方向、只有一个、一个也没有。正文第肆节把这三个矩阵都算过。
        </li>
        <li>
          <b>v 的方向角 θ</b>（0–360°）：红箭头 <MathInline tex="\boldsymbol{v}" /> 指向哪。
          <strong>长度是固定的（1.4），只有方向在变</strong>——因为特征方向只关心方向，
          把 v 拉长缩短不影响它是不是特征向量。
        </li>
      </ul>
      <p>
        <b>图上画的是什么</b>：红箭头是你转动的 <MathInline tex="\boldsymbol{v}" />，
        蓝箭头是它被矩阵作用后的像 <MathInline tex="A\boldsymbol{v}" />；
        金色虚线椭圆是<strong>整个单位圆</strong>被 A 变换后的像。
        读数区那个"夹角偏差 sin"就是两根箭头夹角的正弦——
        <strong>它等于 0 就意味着两根共线</strong>，此时读数变绿并报出特征值。
      </p>
      <p>
        <b>照着做一遍（一）：两个方向。</b>选第一档
        <MathInline tex="A=\begin{pmatrix}2&1\\1&2\end{pmatrix}" />，
        把 θ 从 0 慢慢转起来。偏差 sin 先变大再变小，到 <b>45°</b> 时归零变绿，
        报出 <MathInline tex="\lambda \approx 3" />；继续转到 <b>135°</b> 再绿一次，
        <MathInline tex="\lambda \approx 1" />。（再转下去 225° 和 315° 还会绿——
        那是同两条直线的反方向，<strong>不算新的特征方向</strong>。）
        注意这两条线<strong>互相垂直</strong>，因为这是个对称矩阵。
      </p>
      <p>
        <b>照着做一遍（二）：只剩一个方向。</b>换成剪切
        <MathInline tex="\begin{pmatrix}1&1\\0&1\end{pmatrix}" />。
        扫一整圈，只在 <b>0°</b> 和 <b>180°</b> 附近变绿，正中心处
        <MathInline tex="\lambda = 1" />——<strong>而这两处是同一条直线</strong>。
        特征方程有两个根（都是 1），方向却只凑出一条，
        所以这个矩阵<strong>不可对角化</strong>。
        （这一档的绿色区间比第一档宽出不少，两边各有七八度：
        因为共线判据留了 0.035 的容差，而剪切让 Av 偏离 v 的速度很慢。
        区间边缘报出的 λ 会漂到 1.1 上下，<strong>只有正中心那个 1 才是真的</strong>。）
      </p>
      <p>
        <b>照着做一遍（三）：一整圈都等不到绿色。</b>换成旋转
        <MathInline tex="\begin{pmatrix}0&-1\\1&\ \ 0\end{pmatrix}" />。
        θ 转满 360°，偏差 sin <strong>始终恒等于 1</strong>（夹角永远是 90°），
        一次都不变绿。它把每个方向都硬转 90°，谁也保不住。
        <strong>它不是没有特征值，是特征值 <MathInline tex="\pm i" /> 不住在实平面上</strong>。
      </p>
      <p>
        金色椭圆还有个额外的读法：<strong>特征方向正是"椭圆的半径与原方向对齐"的地方</strong>。
        第一档里椭圆的长轴短轴就落在 45°/135° 上，长短半轴恰好是两个特征值 3 和 1；
        第三档里"椭圆"根本还是个圆（旋转不改变任何长度），处处一样长，也就处处谈不上对齐。
      </p>
      <p>
        <b>挑战模式的规则</b>：点「开始挑战」后连出五道判定题（题目写死在程序里，谁玩都是同样五道、
        同样顺序），每道给你一个新矩阵，问它有<strong>几条实特征方向：2、1 还是 0</strong>。
        建议先别拖 θ——凭正文那条速算规律
        <MathInline tex="\lambda^2 - (\operatorname{tr}A)\lambda + \det A = 0" />
        心算判别式（两个不同实根 → 2 条；重根 → 通常 1 条，还得像剪切那样验一下方向；
        负判别式 → 0 条），选定答案后再扫一圈 θ 数绿色，亲眼对账。
        第五题是个老朋友——认出它是谁，本讲就算真读完了。
      </p>
    </template>
  </DemoFrame>
</template>
