<script setup>
import { ref, computed, watch } from 'vue'
import { usePlot, makeView, drawAxes, drawLabel, C, fmt } from './plot.js'
import DemoFrame from '../components/DemoFrame.vue'
import ControlSlider from '../components/ControlSlider.vue'
import MathInline from '../components/MathInline.vue'

const canvas = ref(null)
const eps = ref(0.15)
const seqKey = ref('zeno')

const SEQS = {
  zeno: {
    label: '阿基里斯的路程 1 + ½ + ¼ + …',
    a: (n) => 2 - Math.pow(2, 1 - n),
    L: 2,
    y0: 0.8,
    y1: 2.35,
  },
  e: {
    label: '复利的极限 (1 + 1/n)ⁿ',
    a: (n) => Math.pow(1 + 1 / n, n),
    L: Math.E,
    y0: 1.85,
    y1: 2.95,
  },
  osc: {
    label: '振荡逼近 1 + (−1)ⁿ/n',
    a: (n) => 1 + Math.pow(-1, n) / n,
    L: 1,
    y0: 0.3,
    y1: 1.75,
  },
}

const seq = computed(() => SEQS[seqKey.value])

const bigN = computed(() => {
  const { a, L } = seq.value
  let last = 0
  for (let n = 1; n <= 400; n++) {
    if (Math.abs(a(n) - L) >= eps.value) last = n
  }
  return last + 1
})

// 第 N 项与第 N−1 项的实际误差：前者已进带、后者还在带外，
// 正好说明读数区给出的 N 是能应答的最小值
const errAtN = computed(() => Math.abs(seq.value.a(bigN.value) - seq.value.L))
const errBeforeN = computed(() =>
  bigN.value > 1 ? Math.abs(seq.value.a(bigN.value - 1) - seq.value.L) : null,
)

// ―― 挑战模式（回合制）――
// 出招序列固定写死（不用 Math.random，保证 note 里的说法可复现）。
// 判定是整数相等（答案必须是最小的那个 N），没有浮点容差问题；
// 五关的正确答案依次是 4、6、17、19、34，全部落在 N 滑杆量程 [2, 60] 内侧，
// 离两端都有余量。逐关 node -e 验算过：ε 与 |a_N − L|、|a_{N−1} − L| 都不相等，不压刀刃。
const LEVELS = [
  { seq: 'zeno', eps: 0.15 },
  { seq: 'e', eps: 0.2 },
  { seq: 'osc', eps: 0.06 },
  { seq: 'e', eps: 0.07 },
  { seq: 'e', eps: 0.04 },
]
const answerN = ref(2)
const challenge = ref(false)
const round = ref(0)
const verdict = ref('') // '' | 'win' | 'small' | 'big' | 'passed'

function applyLevel(i) {
  seqKey.value = LEVELS[i].seq
  eps.value = LEVELS[i].eps
}

function startChallenge() {
  challenge.value = true
  round.value = 0
  verdict.value = ''
  answerN.value = 2 // 与 N 滑杆的下限一致，否则滑杆显示 2 而模型是 1
  applyLevel(0)
}

function quitChallenge() {
  challenge.value = false
  verdict.value = ''
  eps.value = 0.15
  seqKey.value = 'zeno'
}

function submit() {
  if (answerN.value === bigN.value) {
    if (round.value === LEVELS.length - 1) {
      verdict.value = 'passed'
    } else {
      verdict.value = 'win'
      round.value += 1
      applyLevel(round.value)
      // 不重置 answerN：留着上一关的答案，让读者自己判断新一关该往哪边挪
    }
  } else {
    // 分开两种错法：答小了是真没接住；答大了其实合格，只是不最小
    verdict.value = answerN.value < bigN.value ? 'small' : 'big'
  }
}

// 重新拖 N 就清掉上一次的判定语（通关状态保留）
watch(answerN, () => {
  if (verdict.value && verdict.value !== 'passed') verdict.value = ''
})

usePlot(
  canvas,
  (ctx, w, h) => {
    const s = seq.value
    const v = makeView(w, h, 0, 62, s.y0, s.y1)
    drawAxes(ctx, v, {
      xTicks: [10, 20, 30, 40, 50, 60],
      yTicks: [s.L],
      xLabel: 'n',
      yLabel: 'aₙ',
    })

    // ε 带
    ctx.fillStyle = C.indigoSoft
    const bandTop = v.Y(Math.min(s.L + eps.value, s.y1))
    const bandBot = v.Y(Math.max(s.L - eps.value, s.y0))
    ctx.fillRect(v.pad.l, bandTop, v.iw, bandBot - bandTop)

    // 极限虚线
    ctx.strokeStyle = C.indigo
    ctx.setLineDash([6, 5])
    ctx.lineWidth = 1.6
    ctx.beginPath()
    ctx.moveTo(v.pad.l, v.Y(s.L))
    ctx.lineTo(v.pad.l + v.iw, v.Y(s.L))
    ctx.stroke()
    ctx.setLineDash([])
    drawLabel(ctx, v.pad.l + v.iw - 6, v.Y(s.L) - 8, `L = ${fmt(s.L, 3)}`, {
      color: C.indigo,
      align: 'right',
    })

    // N 竖线：平时画程序算出的答案；挑战时画读者自己拖的那条（答案不能提前露出来）
    const nShown = challenge.value ? answerN.value : bigN.value
    if (nShown <= 60) {
      const nx = v.X(nShown)
      ctx.strokeStyle = C.accent
      ctx.setLineDash([4, 4])
      ctx.beginPath()
      ctx.moveTo(nx, v.pad.t)
      ctx.lineTo(nx, v.pad.t + v.ih)
      ctx.stroke()
      ctx.setLineDash([])
      drawLabel(
        ctx,
        nx + 6,
        v.pad.t + 16,
        challenge.value ? `你答 N = ${nShown}` : `N = ${nShown}`,
        { color: C.accent },
      )
    }

    // 数列的点
    for (let n = 1; n <= 60; n++) {
      const y = s.a(n)
      const inside = Math.abs(y - s.L) < eps.value
      ctx.beginPath()
      ctx.arc(v.X(n), v.Y(y), 3.4, 0, Math.PI * 2)
      ctx.fillStyle = inside ? C.green : C.accent
      ctx.fill()
    }
  },
  { height: 320, watchSources: [eps, seqKey, answerN, challenge] },
)
</script>

<template>
  <DemoFrame title="数列极限：ε 挑战游戏">
    <canvas ref="canvas" class="demo-canvas"></canvas>
    <template #controls>
      <label class="ctrl" :class="{ 'is-disabled': challenge }">
        <span class="ctrl-label">数列{{ challenge ? '（对手指定）' : '' }}</span>
        <select v-model="seqKey" class="ctrl-select" :disabled="challenge">
          <option v-for="(s, k) in SEQS" :key="k" :value="k">{{ s.label }}</option>
        </select>
      </label>
      <ControlSlider
        :label="challenge ? '对手出招 ε（已锁定）' : '挑战精度 ε（允许的误差）'"
        v-model="eps"
        :min="0.01"
        :max="0.5"
        :step="0.005"
        :disabled="challenge"
        :display="(x) => x.toFixed(3)"
      />
      <ControlSlider
        v-if="challenge"
        label="你的应答 N（第几项起全绿）"
        v-model="answerN"
        :min="2"
        :max="60"
        :step="1"
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
            交卷：N = {{ answerN }}
          </button>
          <button class="challenge-btn" type="button" @click="quitChallenge">退出挑战</button>
        </template>
      </div>
    </template>
    <template #readout>
      <template v-if="challenge">
        <span class="challenge-badge">第 {{ round + 1 }}/5 回合 · 已过 {{ verdict === 'passed' ? 5 : round }} 关</span><br />
        <template v-if="verdict === 'passed'">
          🏆 <b>五关全过！</b>最慢的复利数列你也数准了。
        </template>
        <template v-else-if="verdict === 'small'">
          ❌ <b>N = {{ answerN }} 太小</b>：第 {{ answerN }} 项之后还有红点，承诺没兑现。本关重来。
        </template>
        <template v-else-if="verdict === 'big'">
          ⚠️ <b>N = {{ answerN }} 合格</b>，但不是最小的那个 —— 往左再找找。
        </template>
        <template v-else-if="verdict === 'win'">
          ✅ 数准了！对手换招：ε = {{ eps.toFixed(3) }}，数列见左。
        </template>
        <template v-else>
          对手出招 <b>ε = {{ eps.toFixed(3) }}</b>：把 N 拖到<b>第一个绿点</b>，点「交卷」。
        </template>
      </template>
      <template v-else>
        对手出招 ε = {{ eps.toFixed(3) }} &nbsp;→&nbsp; 我方应答 <b>N = {{ bigN }}</b>（从第 N 项起全在蓝带内）<br />
        对账：<MathInline
          tex="|a_N - L|"
        /> = <b>{{ errAtN.toFixed(4) }}</b>（已进带·绿）<template
          v-if="errBeforeN !== null"
        >，前一项 = <b>{{ errBeforeN.toFixed(4) }}</b>（还在带外·红）—— 所以这个 N 已经最小</template>
      </template>
    </template>
    <template #note>
      <p><b>平时的两个旋钮分别是什么</b></p>
      <ul>
        <li>
          <b>数列</b>（下拉）：换一个 <MathInline tex="a_n" /> 来挑战。三档的极限 L 都是算出来的定值——
          阿基里斯那档是 <MathInline tex="a_n = 2 - 2^{\,1-n}" />，<MathInline tex="L = 2" />；
          复利那档 <MathInline tex="L = e = 2.718\ldots" />；振荡那档
          <MathInline tex="a_n = 1 + (-1)^n/n" />，<MathInline tex="L = 1" />（它从两侧交替逼近）。
        </li>
        <li>
          <b>挑战精度 ε</b>：对手要求的<strong>误差上限</strong>，单位就是纵轴的单位。
          蓝色带正是 <MathInline tex="L \pm \varepsilon" /> 这条横带，ε 越小带子越窄。
        </li>
      </ul>
      <p>
        <b>读数区的 N 是怎么来的</b>：程序从头扫到第 400 项，记下<strong>最后一个</strong>还在带外的项，
        再加 1——这是能应答的最小的 N。它不是滑杆，是被 ε 逼出来的答案。
        红点是还没进带的项，绿点是已经进带的项；N 那条红色竖线就是红绿分界。
      </p>
      <p>
        <b>照着做一遍</b>：选阿基里斯那档，把 ε 从 0.5 拖到 0.01，N 只从 3 涨到 8——
        ε 每砍一半 N 才加 1（误差按 <MathInline tex="2^{\,1-n}" /> 衰减）。
        再换成振荡那档做同一件事：同样从 0.5 拖到 0.01，N 却从 3 涨到 101
        （误差只按 <MathInline tex="1/n" /> 衰减，要压到 ε 就得 <MathInline tex="n > 1/\varepsilon" />）。
        <strong>两档都答得出 N，这就是"极限存在"；答得快慢差了两个数量级，那叫收敛速度</strong>——
        后者正是数值分析里"收敛阶"要量的东西。
      </p>
      <p>
        中间那档（复利）和振荡档同属 <MathInline tex="1/n" /> 这一级，只是又慢了一点：
        同样把 ε 从 0.5 拖到 0.01，N 从 2 涨到 135。它的误差大约按
        <MathInline tex="e/(2n)" /> 衰减，所以应答的 N 不用试也能算出来——
        取 <MathInline tex="N = \lceil e/(2\varepsilon)\rceil" /> 必定合格
        （ε = 0.05 时算出 28，这里扫出来的最小值是 27）。推导见本讲伍节。
      </p>
      <p><b>⚔️ 挑战模式：这回换你当应答方</b></p>
      <p>
        点「开始挑战」，对手会连出五招。每一关它<strong>指定一个数列、报一个 ε</strong>，
        你拖第三个滑杆给出 N，再点「交卷」。挑战期间数列下拉和 ε 滑杆都锁住，
        图上那条竖线也不再是程序算的答案，而是<strong>你自己拖到哪它就在哪</strong>。
        看图的办法只有一个：<strong>找红绿分界</strong>——红点是还在带外的项，绿点是已经进带的项，
        把 N 拖到第一个绿点上。
      </p>
      <ul>
        <li>
          <b>五关的出招（写死的，不是随机）</b>：
          ① 阿基里斯 ε = 0.15；② 复利 ε = 0.2；③ 振荡 ε = 0.06；
          ④ 复利 ε = 0.07；⑤ 复利 ε = 0.04。
          五关答案都落在 4 到 34 之间，离 N 滑杆的两端（2 和 60）都有富余，逐关验算过必定可赢。
        </li>
        <li>
          <b>判定要的是「最小的那个 N」</b>，判定方式是整数相等，没有容差可言。
          之所以要最小，纯粹是为了让答案唯一、判得清——
          <strong>定义本身只要求「存在一个 N」，答大了照样合格</strong>。
          所以答大了不算输：读数区会告诉你「合格但不是最小」，让你往左再找；
          只有答小了才是真没接住（第 N 项之后还有红点）。
        </li>
        <li>
          <b>第 ③ 关有个坑</b>：振荡数列是从两侧交替逼近的，红点会一上一下地出现。
          只看上边或只看下边都会数早，得等到<strong>两侧都进带</strong>才算数。
        </li>
        <li>
          输了只是本关重来，<strong>已经过掉的关不清零</strong>；badge 上「已过 x 关」就是战绩。
        </li>
      </ul>
    </template>
  </DemoFrame>
</template>
