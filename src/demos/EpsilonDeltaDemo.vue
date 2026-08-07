<script setup>
import { ref, computed, watch } from 'vue'
import { usePlot, makeView, drawAxes, plotFn, drawPoint, drawLabel, C } from './plot.js'
import DemoFrame from '../components/DemoFrame.vue'
import ControlSlider from '../components/ControlSlider.vue'
import MathInline from '../components/MathInline.vue'

// f(x) = (x² − 1)/(x − 1)：在 x = 1 处无定义，但极限是 2
const f = (x) => (x * x - 1) / (x - 1)
const A = 1
const L = 2

const canvas = ref(null)
const eps = ref(0.6)
const delta = ref(0.9)

const ok = computed(() => delta.value <= eps.value + 1e-9)

// ―― 挑战模式（回合制）――
// 出招序列固定写死（不用 Math.random，保证 note 里的说法可复现）；
// 每关都验算过可赢：δ 滑杆 0.05–1.50 步长 0.01，终关 ε=0.07 仍有 0.05/0.06/0.07 三档可赢
const ROUNDS = [1.2, 0.6, 0.25, 0.12, 0.07]
const challenge = ref(false)
const round = ref(0) // 当前回合下标
const verdict = ref('') // '' | 'win' | 'lose' | 'passed'

function startChallenge() {
  challenge.value = true
  round.value = 0
  verdict.value = ''
  eps.value = ROUNDS[0]
  delta.value = 1.5
}

function quitChallenge() {
  challenge.value = false
  verdict.value = ''
  eps.value = 0.6
}

function submit() {
  if (ok.value) {
    if (round.value === ROUNDS.length - 1) {
      verdict.value = 'passed'
    } else {
      // 不重置 δ：留着上一关的应答（对新 ε 多半太大、直接显红），读者自己往下压
      verdict.value = 'win'
      round.value += 1
      eps.value = ROUNDS[round.value]
    }
  } else {
    verdict.value = 'lose' // 本关重来，不清零已过关数
  }
}

// 重新拖 δ 就清掉上一次的判定语（通关状态保留）
watch(delta, () => {
  if (verdict.value === 'win' || verdict.value === 'lose') verdict.value = ''
})

usePlot(
  canvas,
  (ctx, w, h) => {
    const v = makeView(w, h, -0.6, 3, -0.4, 4.2)
    drawAxes(ctx, v, { xTicks: [1, 2], yTicks: [2], xLabel: 'x', yLabel: 'f(x)' })

    // 水平 ε 带（目标区）
    ctx.fillStyle = C.indigoSoft
    ctx.fillRect(v.pad.l, v.Y(L + eps.value), v.iw, v.Y(L - eps.value) - v.Y(L + eps.value))

    // 垂直 δ 带（我方承诺区）
    ctx.fillStyle = C.accentSoft
    ctx.fillRect(v.X(A - delta.value), v.pad.t, v.X(A + delta.value) - v.X(A - delta.value), v.ih)

    // 曲线整体
    plotFn(ctx, v, f, { color: C.ink, width: 2 })

    // δ 带内的曲线段：达标则绿、超标则红
    ctx.save()
    ctx.beginPath()
    ctx.rect(v.X(A - delta.value), v.pad.t, v.X(A + delta.value) - v.X(A - delta.value), v.ih)
    ctx.clip()
    plotFn(ctx, v, f, { color: ok.value ? C.green : C.accent, width: 3.4 })
    ctx.restore()

    // 虚线标注 L 与 a
    ctx.strokeStyle = C.soft
    ctx.setLineDash([4, 4])
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(v.pad.l, v.Y(L))
    ctx.lineTo(v.X(A), v.Y(L))
    ctx.lineTo(v.X(A), v.pad.t + v.ih)
    ctx.stroke()
    ctx.setLineDash([])

    // x=1 处的“洞”
    drawPoint(ctx, v, A, L, { color: C.ink, hollow: true })
    drawLabel(ctx, v.X(A) + 10, v.Y(L) - 10, 'x=1 处没有定义！', { color: C.soft })
    drawLabel(ctx, v.pad.l + 6, v.Y(L + eps.value) - 6, 'L + ε', { color: C.indigo })
    drawLabel(ctx, v.pad.l + 6, v.Y(L - eps.value) + 16, 'L − ε', { color: C.indigo })
    drawLabel(ctx, v.X(A - delta.value) + 4, v.pad.t + v.ih - 8, '1−δ', { color: C.accent })
    drawLabel(ctx, v.X(A + delta.value) + 4, v.pad.t + v.ih - 8, '1+δ', { color: C.accent })
  },
  { height: 360, watchSources: [eps, delta] },
)
</script>

<template>
  <DemoFrame title="ε–δ 攻防：函数极限的严格定义">
    <canvas ref="canvas" class="demo-canvas"></canvas>
    <template #controls>
      <ControlSlider
        :label="challenge ? '对手出招 ε（挑战中，由对手控制）' : '对手出招 ε（纵向容差）'"
        v-model="eps"
        :min="0.05"
        :max="1.4"
        :step="0.01"
        :disabled="challenge"
        :display="(x) => x.toFixed(2)"
      />
      <ControlSlider
        label="你的应答 δ（横向半径）"
        v-model="delta"
        :min="0.05"
        :max="1.5"
        :step="0.01"
        :display="(x) => x.toFixed(2)"
      />
      <div class="ctrl">
        <button v-if="!challenge" class="challenge-btn" type="button" @click="startChallenge">
          ⚔️ 开始挑战（5 回合）
        </button>
        <template v-else>
          <button
            class="challenge-btn is-on"
            type="button"
            :disabled="verdict === 'passed'"
            @click="submit"
          >
            交卷：δ = {{ delta.toFixed(2) }}
          </button>
          <button class="challenge-btn" type="button" @click="quitChallenge">退出挑战</button>
        </template>
      </div>
    </template>
    <template #readout>
      <template v-if="challenge">
        <span class="challenge-badge">第 {{ round + 1 }}/5 回合 · 已过 {{ verdict === 'passed' ? 5 : round }} 关</span>&ensp;
        <template v-if="verdict === 'passed'">
          🏆 <b>五关全过！</b>ε 压到 0.07 你也接住了——可以替魏尔斯特拉斯出庭了。
        </template>
        <template v-else-if="verdict === 'lose'">
          ❌ <b>δ = {{ delta.toFixed(2) }} 太大</b>：红段探出蓝带。本关重来（已过的关不清零）。
        </template>
        <template v-else-if="verdict === 'win'">
          ✅ 接住了！对手加码：ε = {{ eps.toFixed(2) }} —— 拖好 δ 再交卷。
        </template>
        <template v-else>
          对手出招 <b>ε = {{ eps.toFixed(2) }}</b>：拖 δ 让加粗段整段落进蓝带，点「交卷」。
        </template>
      </template>
      <template v-else-if="ok">
        ✅ <b>δ = {{ delta.toFixed(2) }} 可行</b>：只要 0 &lt; |x−1| &lt; δ，曲线（绿色段）就全部落在 L±ε 的蓝带里。
      </template>
      <template v-else>
        ❌ <b>δ = {{ delta.toFixed(2) }} 太大了</b>：红色段跑出了蓝带 —— 把 δ 调小一点再试。
      </template>
    </template>
    <template #note>
      <p><b>两个旋钮分别是什么</b></p>
      <ul>
        <li>
          <b>对手出招 ε</b>：函数值<strong>允许偏离 2 多少</strong>，量在纵轴上。
          蓝色横带就是 <MathInline tex="2 \pm \varepsilon" />，ε 越小带子越扁。
        </li>
        <li>
          <b>你的应答 δ</b>：x <strong>允许偏离 1 多少</strong>，量在横轴上。
          红色竖带就是 <MathInline tex="1 \pm \delta" />，它是你交的答卷。
        </li>
      </ul>
      <p>
        两个都是普通正数，没有一个是"无穷小"。判定规则：竖带内的那段曲线（加粗）
        <strong>整段落在蓝带里就算达标</strong>，探出去一点就变红判负。
      </p>
      <p>
        <b>画的是哪条曲线</b>：<MathInline tex="f(x) = \dfrac{x^2-1}{x-1}" />，它在
        <MathInline tex="x = 1" /> 处分母为零、<strong>根本没有定义</strong>（图上那个空心圈）。
        但 <MathInline tex="x \neq 1" /> 时约分就是 <MathInline tex="x+1" />，所以
        <MathInline tex="|f(x)-2| = |x-1|" />——<strong>这就是本例只要
        <MathInline tex="\delta \le \varepsilon" /> 就一定达标的全部原因</strong>
        （正文那个"δ 到底怎么找"的折叠框里连非平凡的例子一起算过）。
      </p>
      <p>
        <b>照着做一遍</b>：把 ε 拖到 0.10，再把 δ 从 1.50 慢慢往下拖——δ 一跨过 0.10
        曲线就由红转绿。反过来固定 δ = 0.90 再把 ε 从 1.40 往下拖，ε 跌破 0.90 时判负。
        <strong>始终是"δ ≤ ε 才达标"这一条线在起作用，而它是算出来的，不是调出来的。</strong>
        顺带注意：无论怎么拖，<MathInline tex="x = 1" /> 那个空心点从来没被用到过——
        极限只问"接近时的趋势"，不问该点本身。
      </p>
      <p>
        <b>挑战模式的规则</b>：点「开始挑战」后 ε 滑杆交给对手，它按固定的五关出招——
        1.20 → 0.60 → 0.25 → 0.12 → 0.07（写死在程序里，谁玩都是这五关，每关都验算过必有可赢的 δ）。
        你拖 δ 点「交卷」：δ ≤ ε 过关，太大则本关重来（已过的关不清零）。五关全过，
        你就亲手演完了定义里那句"<strong>任意</strong> ε &gt; 0，<strong>总存在</strong> δ &gt; 0"——
        对手无论把 ε 压到多小，你都拿得出应答。真正的定义只是把"五关"换成"无穷关"，
        而本例你有必胜策略（答 δ = ε 就行），这正是"极限存在"的含义。
      </p>
    </template>
  </DemoFrame>
</template>
