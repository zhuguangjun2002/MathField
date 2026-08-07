<script setup>
import { ref, computed } from 'vue'
import { usePlot, makeView, drawAxes, plotFn, drawPoint, drawLabel, C, fmt } from './plot.js'
import DemoFrame from '../components/DemoFrame.vue'
import ControlSlider from '../components/ControlSlider.vue'
import MathInline from '../components/MathInline.vue'

// 解 f(x) = x² − 2 = 0，根是 √2。牛顿迭代 x ← x − f/f' = (x + 2/x)/2 —— 正是巴比伦开方术。
const x0 = ref(3)
const steps = ref(3)

const ROOT = Math.SQRT2

const f = (x) => x * x - 2
const fp = (x) => 2 * x

// ―― 挑战模式：五道写死的预判题（先凭"切线陡不陡"预判，再拖迭代步数对账）――
// 三个固定选项：0 = 一步就落到根边上（|x₁−√2| < 0.1），再两三步顶到机器精度；
//              1 = x₁ 不出默认画面 [0, 3.4]，但离根还差半个单位以上，要走五六步；
//              2 = 切线趴平，x₁ 被甩到 5 以外、画布撑开，六步走完还没到底。
// 每题的答案都用 float64 把这个 demo 的迭代跑过一遍（轨迹见下面的注释）。
const CHALLENGE = [
  // 1.5 → 1.41667 → 1.414216 → 1.41421356（误差 8.6e−2, 2.5e−3, 2.1e−6, 1.6e−12）
  { x0: 1.5, ans: 0, why: 'x₁ = 1.4167 只差 0.0025，到 x₃ 误差已是 1.6×10⁻¹²。' },
  // 0.1 → 10.05 → 5.124 → 2.757 → 1.741 → 1.4449 → 1.41454（六步后误差 3.3e−4）
  { x0: 0.1, ans: 2, why: 'f′(0.1) = 0.2，切线趴平，x₁ = 10.05；六步走完误差还有 3.3×10⁻⁴。' },
  // 3.4 → 1.9941 → 1.4985 → 1.41659 → 1.4142155 → 1.41421356（第五步 1.4e−12）
  { x0: 3.4, ans: 1, why: 'x₁ = 1.994 没出画面，误差 0.58 → 0.084 → 0.0024，第五步才到底。' },
  // 0.5 → 2.25 → 1.5694 → 1.42189 → 1.414234 → 1.41421356（第五步 1.5e−10，第六步归零）
  { x0: 0.5, ans: 1, why: '小初值未必被甩飞：x₁ = 2.25 仍在画面里，第六步才到机器精度。' },
  // 2.0 → 1.5 → 1.41667 → 1.414216 → 1.41421356（与 x₀ = 1 从第一步起完全重合）
  { x0: 2.0, ans: 0, why: 'x₁ = 1.5，和 x₀ = 1 落到同一处（迭代式对 x 与 2/x 对称），再三步到底。' },
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
  x0.value = CHALLENGE[0].x0
  steps.value = 0 // 先只摆出初值，别把答案提前画在图上
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
    x0.value = CHALLENGE[round.value].x0
    steps.value = 0
  }
}

// 生成迭代序列 x0, x1, ...
const seq = computed(() => {
  const xs = [x0.value]
  for (let i = 0; i < steps.value; i++) {
    const x = xs[xs.length - 1]
    xs.push(x - f(x) / fp(x))
  }
  return xs
})
const xn = computed(() => seq.value[seq.value.length - 1])
const errs = computed(() => seq.value.map((x) => Math.abs(x - ROOT)))

// 视野随迭代序列自适应：默认 [0, 3.4] 够用；一旦初值太小把切线甩出去
// （x₀ = 0.1 时 x₁ 就跳到 10.1），画面必须跟着撑开，否则"被甩远"这件事根本看不见。
const XMAX = computed(() => Math.max(3.4, Math.max(...seq.value) * 1.12))
const YMAX = computed(() => Math.max(9, f(XMAX.value) * 1.05))
const overshot = computed(() => Math.max(...seq.value) > 3.4)

const canvas = ref(null)
usePlot(
  canvas,
  (ctx, w, h) => {
    const v = makeView(w, h, 0, XMAX.value, -0.35 * YMAX.value, YMAX.value)
    const xt = overshot.value ? [1, 2, 3].concat(XMAX.value > 8 ? [5, 10] : [5]) : [1, 2, 3]
    drawAxes(ctx, v, {
      xTicks: xt.filter((t) => t < XMAX.value),
      yTicks: overshot.value ? [] : [-2, 0, 2, 4, 6, 8],
      xLabel: 'x',
      yLabel: 'f(x)=x²−2',
    })

    // 曲线
    plotFn(ctx, v, f, { color: C.ink, width: 2.4 })

    // 真根 √2
    ctx.save()
    ctx.strokeStyle = C.greenSoft
    ctx.lineWidth = 8
    ctx.beginPath()
    ctx.moveTo(v.X(ROOT), v.pad.t)
    ctx.lineTo(v.X(ROOT), v.pad.t + v.ih)
    ctx.stroke()
    ctx.restore()
    drawLabel(ctx, v.X(ROOT) + 6, v.pad.t + 16, '真根 √2 ≈ 1.4142', { color: C.green, size: 12 })

    // 牛顿"楼梯"：从 (xk,0) 竖到曲线，再沿切线滑回轴上的 x(k+1)
    const xs = seq.value
    for (let k = 0; k < xs.length; k++) {
      const xk = xs[k]
      const yk = f(xk)
      // 竖线到曲线
      ctx.save()
      ctx.strokeStyle = 'rgba(51, 81, 143, 0.5)'
      ctx.lineWidth = 1.4
      ctx.setLineDash([4, 3])
      ctx.beginPath()
      ctx.moveTo(v.X(xk), v.Y(0))
      ctx.lineTo(v.X(xk), v.Y(yk))
      ctx.stroke()
      ctx.restore()
      drawPoint(ctx, v, xk, yk, { color: C.indigo, r: 3.5 })

      if (k < xs.length - 1) {
        // 切线段：从 (xk, f(xk)) 到 (x(k+1), 0)
        ctx.save()
        ctx.strokeStyle = C.accent
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(v.X(xk), v.Y(yk))
        ctx.lineTo(v.X(xs[k + 1]), v.Y(0))
        ctx.stroke()
        ctx.restore()
      }
      // 轴上的 xk
      drawPoint(ctx, v, xk, 0, { color: k === xs.length - 1 ? C.green : C.accent, r: 4.5 })
      drawLabel(ctx, v.X(xk) - 2, v.Y(0) + 20, 'x' + k, { color: C.soft, size: 12, align: 'center' })
    }
  },
  { height: 360, watchSources: [x0, steps] },
)
</script>

<template>
  <DemoFrame title="牛顿法：用切线一步步滑向根，看正确位数怎么翻倍">
    <canvas ref="canvas" class="demo-canvas"></canvas>
    <template #controls>
      <ControlSlider
        :label="challenge ? '初始猜测 x₀（挑战锁定）' : '初始猜测 x₀'"
        v-model="x0"
        :min="0.1"
        :max="3.4"
        :step="0.05"
        :display="(v) => fmt(v, 2)"
        :disabled="challenge"
      />
      <ControlSlider label="迭代步数" v-model="steps" :min="0" :max="6" :step="1" />
      <div class="ctrl">
        <button v-if="!challenge" class="challenge-btn" type="button" @click="startChallenge">
          ⚔️ 开始挑战（5 题）
        </button>
        <template v-else>
          <template v-if="picked === null">
            <button class="challenge-btn" type="button" @click="answer(0)">甲 · 一步就到根边上</button>
            <button class="challenge-btn" type="button" @click="answer(1)">乙 · 不飞远，五六步</button>
            <button class="challenge-btn" type="button" @click="answer(2)">丙 · 被甩到 5 以外</button>
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
        锁定 x₀ = <b>{{ CHALLENGE[round].x0.toFixed(2) }}</b>
        <template v-if="picked === null">
          <br />从这个初值出发，牛顿法会怎样？甲乙丙各是什么意思，见下方说明
        </template>
        <template v-else-if="picked === CHALLENGE[round].ans">
          <br />✅ 对！{{ CHALLENGE[round].why }}
        </template>
        <template v-else>
          <br />❌ 答案是{{ '甲乙丙'[CHALLENGE[round].ans] }}。{{ CHALLENGE[round].why }}
        </template>
      </template>
      <template v-else>
        第 {{ steps }} 步的近似值 x<sub>{{ steps }}</sub> = <b>{{ xn.toPrecision(10) }}</b>，
        误差 <b>{{ errs[errs.length - 1] < 1e-14 ? '≈ 0（已到机器精度）' : errs[errs.length - 1].toExponential(2) }}</b>
      </template>
    </template>
    <template #note>
      <b>两个旋钮。</b><b>初始猜测 x₀</b> 是你随手报的第一个数——
      <b>它不影响方程，只影响要走几步，有时还影响走不走得到</b>；
      <b>迭代步数</b>是让算法往前推几轮，拖到 0 就只剩你那个初值。
      横轴范围会<b>随迭代序列自动撑开</b>：默认停在 [0, 3.4]，
      一旦某一步被甩出去，画布跟着放大，好让你看见它飞到哪儿了。
      <br /><br />
      方程 <b>x² − 2 = 0</b> 你一眼知道根是 <MathInline tex="\sqrt{2}" />，但计算器芯片不认识"√"这个符号，它只会加减乘除。
      牛顿的主意：在当前猜测处画一条<b>切线</b>（曲线太难，就用它的一次泰勒近似代替），
      切线撞到横轴的地方就是更好的下一个猜测。红色斜线就是切线，蓝虚线把它接回曲线，一级一级往下滑。
      盯着误差看它有多快：<b>{{ errs.map((e, i) => 'x' + i + '误差 ' + (e < 1e-14 ? '0' : e.toExponential(1))).join('　') }}</b>——
      每迭代一步，正确的小数位数<b>大致翻一倍</b>（0.1 → 0.01 → 0.0001 → 0.00000001），这叫<b>二次收敛</b>，快得离谱。
      这个迭代式化简后正好是 <b>x ←（x + 2/x）/ 2</b>：猜一个数、和它除 2 的商取平均——四千年前巴比伦人开方用的就是它。
      <br /><br />
      <b>但牛顿法也脆，而且这件事现在可以亲手拖出来。</b>把 x₀ 拖到最小的 <b>0.10</b>：
      那里曲线几乎水平（f′(0.1) = 0.2），切线趴着，一撞横轴就把下一步甩到
      <b>x₁ = 10.05</b>——画布为此撑到了十倍宽，你能亲眼看见它飞出去。
      此后它还是会老老实实爬回来（10.05 → 5.12 → 2.76 → 1.74 → 1.44 → 1.4145），
      但<b>六步全用完，误差仍有 3.3×10⁻⁴</b>（把「迭代步数」拖到 6，读数区那个 3.27e-4 就是它）；而 x₀ = 1.5 时<b>四步就顶到机器精度</b>
      （从 0.10 出发要走满 8 步才追平）。
      <b>坏初值不会让牛顿法算错，只会让它先浪费几步走回来</b>——
      可如果函数不像抛物线这么听话（有多个根、或有极值挡在路上），
      那几步就可能把你送到<b>另一个根</b>，甚至发散。<b>好初值是它一辈子的命门。</b>
      <br /><br />
      <b>挑战模式的规则。</b>点「开始挑战」后连出五道预判题（<b>题目写死在程序里，谁玩都是同样五道、同样顺序</b>）。
      每道题<b>替你锁定一个 x₀</b>——挑战期间 x₀ 那根滑杆<b>是禁用的</b>（变灰不能拖），
      而<b>迭代步数被复位成 0</b>，图上只剩你的初值那一个点，答案不会提前画出来。
      「迭代步数」滑杆<b>不锁</b>，那正是你答完题后用来对账的工具。
      三个选项每题都是同样这三个，说的是<b>从这个初值出发会发生什么</b>：
      <br />
      <b>甲</b>：一步就落到根的紧邻（x₁ 与 <MathInline tex="\sqrt{2}" /> 差不到 0.1），再走两三步就顶到机器精度；
      <br />
      <b>乙</b>：x₁ 还留在默认画面 [0, 3.4] 里（画布不撑开），但离根还差半个单位以上，要走五六步才到底；
      <br />
      <b>丙</b>：切线趴平，x₁ 被甩到 5 以外、画布跟着撑开，六步全用完还没到机器精度。
      <br />
      建议<b>先别碰滑杆</b>：光看锁定的那个 x₀，心里算一下 f′(x₀) = 2x₀ 陡不陡、
      切线撞轴会落在哪儿（<MathInline tex="x_1 = (x_0 + 2/x_0)/2" />，口算即可），选定答案后再把「迭代步数」
      从 0 一格一格拖到 6，看轨迹和误差是不是照你预判的走。
      第四题和第五题各埋了一个反直觉的点，答完请留意读数区的那句话。
    </template>
  </DemoFrame>
</template>
