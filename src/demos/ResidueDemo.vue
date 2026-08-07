<script setup>
import { ref, computed } from 'vue'
import { usePlot, makeSquareView, drawLabel, C, fmt } from './plot.js'
import DemoFrame from '../components/DemoFrame.vue'
import ControlSlider from '../components/ControlSlider.vue'
import MathInline from '../components/MathInline.vue'

// f(z) = 1/(z−1) + 2/(z+1) − 1/(z−i)：三个一阶极点及其留数
const POLES = [
  { x: 1, y: 0, res: 1, label: 'z=1，留数 1' },
  { x: -1, y: 0, res: 2, label: 'z=−1，留数 2' },
  { x: 0, y: 1, res: -1, label: 'z=i，留数 −1' },
]

const cx = ref(0)
const cy = ref(0)
const R = ref(1.5)

// ―― 挑战模式：五道写死的判定题（圆心/半径锁定，先心算圈住了谁，再看图对账）――
// 五组配置与答案都用数值积分核算过：∮f dz ÷ 2πi 恰好等于圈内留数之和
const CHALLENGE = [
  {
    cx: 0,
    cy: 0,
    R: 1.5,
    ans: 2,
    opts: [3, 2, 4],
    why: '三个极点到圆心都恰好是 1，全都 < 1.5：1 + 2 + (−1) = 2。<br />选 4 是把 z=i 的留数 −1 当成了 1（丢了负号）；<br />选 3 是漏数了 z=i 这个不在实轴上的极点。',
  },
  {
    cx: 0,
    cy: -0.3,
    R: 1.1,
    ans: 3,
    opts: [1, 2, 3],
    why: '圆心下移 0.3：到 z=±1 都是 1.044 < 1.1（圈住），<br />到 z=i 是 1.3 > 1.1（甩在外面）。1 + 2 = 3。<br />选 2 有两种走法都会踩到：把圈外的 z=i 也减了进来，<br />或者把「圈内极点个数 2」当成了留数和。',
  },
  {
    cx: 0,
    cy: 1,
    R: 0.5,
    ans: -1,
    opts: [1, -1, 2],
    why: '圆心正压在 z=i 上，只圈住它一个，留数就是 −1。<br />选 1 是丢了负号；选 2 是以为「不管怎么圈，<br />积分总给出全部留数和」——那是第 1 题才成立的巧合。',
  },
  {
    cx: 1,
    cy: 0,
    R: 0.5,
    ans: 1,
    opts: [0, 1, 2],
    why: '圆心压在 z=1 上，只圈住它：留数 1。<br />选 0 多半是把判据错记成「到原点的距离 < R」<br />（原点到 z=1 是 1 > 0.5）——判的是到圆心的距离。',
  },
  {
    cx: 0,
    cy: 0,
    R: 0.6,
    ans: 0,
    opts: [3, 0, 2],
    why: '三个极点到圆心都是 1 > 0.6，一个也没圈住，和为 0。<br />被积函数在回路上并不是零，积分却是零——这就是柯西定理。<br />选 3 是把实轴上那两个「看着近」的算了进来：<br />圈没圈住是非黑即白的判定，差 0.4 也是在外面。',
  },
]
const challenge = ref(false)
const round = ref(0)
const picked = ref(null) // 本题已选的答案（null = 未答）
const score = ref(0)

const cur = computed(() => CHALLENGE[round.value])
// 未作答时不许剧透：圈内/圈外的着色、留数和标签、数值积分全部暂时藏起来
const revealed = computed(() => !challenge.value || picked.value !== null)

function loadRound() {
  cx.value = cur.value.cx
  cy.value = cur.value.cy
  R.value = cur.value.R
}

function startChallenge() {
  challenge.value = true
  round.value = 0
  picked.value = null
  score.value = 0
  loadRound()
}

function quitChallenge() {
  challenge.value = false
  picked.value = null
}

function answer(n) {
  if (picked.value !== null) return
  picked.value = n
  if (n === cur.value.ans) score.value += 1
}

function nextRound() {
  if (round.value < CHALLENGE.length - 1) {
    round.value += 1
    picked.value = null
    loadRound()
  }
}

function fval(x, y) {
  let u = 0
  let v = 0
  for (const p of POLES) {
    const dx = x - p.x
    const dy = y - p.y
    const d = dx * dx + dy * dy
    u += (p.res * dx) / d
    v += (-p.res * dy) / d
  }
  return [u, v]
}

// 沿圆周数值积分，除以 2πi
const measured = computed(() => {
  const N = 3000
  let re = 0
  let im = 0
  let px = cx.value + R.value
  let py = cy.value
  let [fu, fv] = fval(px, py)
  for (let k = 1; k <= N; k++) {
    const t = (k / N) * Math.PI * 2
    const qx = cx.value + R.value * Math.cos(t)
    const qy = cy.value + R.value * Math.sin(t)
    const [gu, gv] = fval(qx, qy)
    const dx = qx - px
    const dy = qy - py
    const mu = (fu + gu) / 2
    const mv = (fv + gv) / 2
    re += mu * dx - mv * dy
    im += mu * dy + mv * dx
    ;[px, py] = [qx, qy]
    ;[fu, fv] = [gu, gv]
  }
  // ∫f dz / (2πi)：除以 2πi 即 (re+im·i)/(2πi) = im/(2π) − re/(2π)·i
  // 舍入残渣（1e-17 量级）会被 fmt 显示成刺眼的"−0"，就地归零
  const snap = (v) => (Math.abs(v) < 5e-4 ? 0 : v)
  return [snap(im / (2 * Math.PI)), snap(-re / (2 * Math.PI))]
})

const inside = computed(() =>
  POLES.filter((p) => Math.hypot(p.x - cx.value, p.y - cy.value) < R.value),
)
const expected = computed(() => inside.value.reduce((s, p) => s + p.res, 0))
const nearEdge = computed(() =>
  POLES.some((p) => Math.abs(Math.hypot(p.x - cx.value, p.y - cy.value) - R.value) < 0.12),
)

const canvas = ref(null)
usePlot(
  canvas,
  (ctx, w, h) => {
    const view = makeSquareView(w, h, 2.4)

    ctx.save()
    ctx.strokeStyle = '#b9b3a6'
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(view.pad.l, view.Y(0))
    ctx.lineTo(view.pad.l + view.iw, view.Y(0))
    ctx.moveTo(view.X(0), view.pad.t)
    ctx.lineTo(view.X(0), view.pad.t + view.ih)
    ctx.stroke()
    ctx.restore()

    // 回路（内部着色）
    ctx.save()
    const pr = view.X(cx.value + R.value) - view.X(cx.value)
    ctx.beginPath()
    ctx.arc(view.X(cx.value), view.Y(cy.value), pr, 0, Math.PI * 2)
    ctx.fillStyle = C.greenSoft
    ctx.fill()
    ctx.strokeStyle = C.green
    ctx.lineWidth = 2.4
    ctx.stroke()
    // 逆时针方向箭头
    ctx.fillStyle = C.green
    const ax = view.X(cx.value)
    const ay = view.Y(cy.value) - pr
    ctx.beginPath()
    ctx.moveTo(ax - 9, ay)
    ctx.lineTo(ax + 3, ay - 6)
    ctx.lineTo(ax + 3, ay + 6)
    ctx.closePath()
    ctx.fill()
    ctx.restore()

    // 极点（挑战模式未作答时一律画成中性色，不提前泄露谁在圈内）
    for (const p of POLES) {
      const isIn = revealed.value && Math.hypot(p.x - cx.value, p.y - cy.value) < R.value
      ctx.save()
      ctx.strokeStyle = isIn ? C.accent : C.soft
      ctx.lineWidth = 2.6
      const px = view.X(p.x)
      const py = view.Y(p.y)
      ctx.beginPath()
      ctx.moveTo(px - 7, py - 7)
      ctx.lineTo(px + 7, py + 7)
      ctx.moveTo(px - 7, py + 7)
      ctx.lineTo(px + 7, py - 7)
      ctx.stroke()
      ctx.restore()
      drawLabel(ctx, px + 10, py - 8, p.label, { color: isIn ? C.accent : C.soft, size: 12 })
    }

    drawLabel(
      ctx,
      view.pad.l + 12,
      view.pad.t + 22,
      revealed.value ? `圈内留数和 = ${expected.value}` : `第 ${round.value + 1}/5 题：圈内留数和 = ？`,
      { color: revealed.value ? C.ink : C.soft, size: 14 },
    )
  },
  { height: 380, watchSources: [cx, cy, R, challenge, round, picked] },
)
</script>

<template>
  <DemoFrame title="留数定理：回路积分 = 2πi ×（圈进来的留数之和）">
    <canvas ref="canvas" class="demo-canvas"></canvas>
    <template #controls>
      <ControlSlider label="回路中心 x" v-model="cx" :min="-2" :max="2" :step="0.05" :disabled="challenge" />
      <ControlSlider label="回路中心 y" v-model="cy" :min="-1.6" :max="1.6" :step="0.05" :disabled="challenge" />
      <ControlSlider label="回路半径 R" v-model="R" :min="0.3" :max="2.2" :step="0.05" :disabled="challenge" />
      <div class="ctrl">
        <button v-if="!challenge" class="challenge-btn" type="button" @click="startChallenge">
          ⚔️ 开始挑战（5 题）
        </button>
        <template v-else>
          <template v-if="picked === null">
            <button
              v-for="o in cur.opts"
              :key="o"
              class="challenge-btn"
              type="button"
              @click="answer(o)"
            >
              {{ o }}
            </button>
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
        圆心 ({{ cur.cx }}, {{ cur.cy }})，半径 R = {{ cur.R }}
        <template v-if="picked === null">
          <br />圈内留数和是多少？先算三个极点到<b>圆心</b>各有多远。
        </template>
        <template v-else>
          <br /><template v-if="picked === cur.ans">✅ 对！</template>
          <template v-else>❌ 答案是 {{ cur.ans }}（你选了 {{ picked }}）</template>
          <br /><span v-html="cur.why"></span>
          <br />数值积分对账：<MathInline tex="\oint f(z)\, dz \div 2\pi i" /> ≈
          <b>{{ fmt(measured[0], 3) }} {{ measured[1] >= 0 ? '+' : '−' }} {{ fmt(Math.abs(measured[1]), 3) }}i</b>
        </template>
      </template>
      <template v-else>
        数值积分 <MathInline tex="\oint f(z)\, dz \div 2\pi i" /> ≈ <b>{{ fmt(measured[0], 3) }} {{ measured[1] >= 0 ? '+' : '−' }} {{ fmt(Math.abs(measured[1]), 3) }}i</b>
        &nbsp;&nbsp;圈内留数和 = <b>{{ expected }}</b>
        <template v-if="nearEdge">&nbsp;（回路快擦到极点了，数值误差会变大）</template>
      </template>
    </template>
    <template #note>
      <p>
        <b>这里的被积函数是</b>
        <MathInline tex="f(z) = \dfrac{1}{z-1} + \dfrac{2}{z+1} - \dfrac{1}{z-i}" />。
        它是三个"一阶极点"直接摆在一起：<MathInline tex="z=1" /> 处留数
        <b>1</b>、<MathInline tex="z=-1" /> 处留数 <b>2</b>、<MathInline tex="z=i" /> 处留数
        <b>−1</b>（分子上那个系数就是留数——按上面"划掉因子"的公式一算即得，
        这也是它被特意写成这个形状的原因：答案一眼可见，方便和数值积分对账）。
        三个旋钮给的是绿色圆形回路的<b>圆心坐标与半径</b>，单位就是复平面上的长度。
      </p>
      三个极点打叉标出，各自带一个"留数"。拖动绿色回路：不管它是大是小、中心在哪，
      <b>沿它一圈的积分永远等于 2πi 乘以圈内留数之和</b>——数值积分与右边的整数和实时对账。
      几组值得一试的配置（三个极点到原点的距离都是 1，所以光调半径它们同进同出，得挪圆心）：
      <b>(0, 0, R=1.5)</b> 三个全圈住 → 1+2−1 = 2；<b>(0, −0.3, R=1.1)</b> 把 z=i 甩在外面 → 3；
      <b>(0, 1, R=0.5)</b> 只套住 z=i → −1；<b>(1, 0, R=0.5)</b> 只套住 z=1 → 1；
      <b>(0, 0, R=0.6)</b> 谁也不圈 → 恒等于 0（这正是上一讲的柯西定理）。
      被积函数在回路上千变万化，但它"值多少钱"只看圈进了哪几张"账单"——
      无穷多个函数值的积分信息，全部浓缩在有限几个点上。这就是"把积分变成数圈圈"。
      <p>
        <b>挑战模式的规则</b>：点「开始挑战」后连出五道题（题目写死在程序里，谁玩都是同样五道、
        同样顺序），用的正是上面那五组配置。每题会<strong>把三个滑杆全部锁住</strong>
        （圆心 x、圆心 y、半径 R 都拖不动了，画面就是那一组配置），问你
        <strong>圈内留数和是多少</strong>，给三个整数选项。
        为了不提前剧透，未作答时<strong>三个极点一律画成灰色</strong>（不区分圈内圈外）、
        画布左上角的"圈内留数和"和读数区的数值积分也都先藏起来。
        建议先心算：<strong>拿每个极点的坐标减去圆心坐标，算它到圆心的距离，与 R 比大小</strong>
        （比如第 2 题圆心在 (0, −0.3)，到 <MathInline tex="z=\pm 1" /> 是
        <MathInline tex="\sqrt{1 + 0.09} = 1.044" />，到 <MathInline tex="z=i" /> 是 1.3，
        而 R = 1.1 正好卡在中间），把圈住的那几个留数<strong>连符号一起</strong>加起来。
        选定之后再看图对账：极点重新按圈内（朱红）/圈外（灰）着色，
        数值积分也现身，和你的答案对得上才算真懂。三个错误选项都是有人真踩过的坑——
        丢负号、把圈外的也算进来、以及把"到原点的距离"错当成"到圆心的距离"。
      </p>
    </template>
  </DemoFrame>
</template>
