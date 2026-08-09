<script setup>
import { ref, computed } from 'vue'
import { usePlot, makeSquareView, drawArrow, drawLabel, C, fmt } from './plot.js'
import DemoFrame from '../components/DemoFrame.vue'
import ControlSlider from '../components/ControlSlider.vue'
import MathInline from '../components/MathInline.vue'

const alpha = ref(35) // v2 与 v1 的夹角（度）
const beta = ref(40) // v3 抬离 xy 平面的角度（度）
const phi = ref(28) // 观察方位角（度）
const theta = ref(22) // 观察俯仰角（度）：0 = 贴着地平线平视

const rad = (deg) => (deg * Math.PI) / 180

const cross = (p, q) => [p[1] * q[2] - p[2] * q[1], p[2] * q[0] - p[0] * q[2], p[0] * q[1] - p[1] * q[0]]
const dot = (p, q) => p[0] * q[0] + p[1] * q[1] + p[2] * q[2]
const norm = (p) => Math.hypot(p[0], p[1], p[2])

// ―― 挑战模式：五组写死的向量（先判断共不共面，再用视角验证）――
// 每组的 |det| 都独立算过；五组都把 (方位角, 俯仰角) 全量程扫了一遍，确认三件事：
// ① 共面那三组在"俯仰 0 + 某个整数方位角"处偏离精确为 0；
// ② 不共面那两组在全部视角下都不像一条线（三根之间的最大夹角，R2 最小 29°、R4 最小 8°）；
// 　 注意衡量的是夹角不是像素——短箭头偏 20px 是个大角度，长箭头偏 20px 几乎看不出来；
// ③ 任何视角下箭头都不出画布（|w| ≤ 2.91 < 3.4）。
// 另外刻意避开了"某根向量正对着镜头缩成一点"的退化摆法——那看着像画少了一根。
const CHALLENGE = [
  {
    v: [[2.6, 0, 1.3], [0.4, 1.6, 1], [1, -0.2, 0.4]],
    flat: true,
    why: '同一张斜平面：俯仰 0、方位 135° 就叠成一条线。散开不能证明什么。',
  },
  {
    v: [[2, 0, 0], [0.6, 1.9, 0], [0.9, 0.5, 1.05]],
    flat: false,
    why: '转遍所有视角都叠不拢：最扁的一档，三根之间仍张着 29° 的角。',
  },
  {
    v: [[0.6, 0.8, 1.6], [0.72, 0.84, 1.68], [2.2, 0.25, 0.5]],
    flat: true,
    why: 'v₁ v₂ 几乎同向只是障眼法：俯仰 0、方位 90°，三根叠成一线。',
  },
  {
    v: [[2.6, 0, 1.3], [0.4, 1.6, 1], [2.2, -0.6, 1.3]],
    flat: false,
    why: '最阴的一关：v₃ 离 v₁ v₂ 那张平面只有 0.41，最扁的视角也留着 8° 的夹角。',
  },
  {
    v: [[1.2, 1.2, 0.8], [0.4, 0.4, 1.8], [-0.7, -0.7, 1.2]],
    flat: true,
    why: '三根都住在竖直平面 x = y 上：俯仰 0、方位 45° 一转就现形。',
  },
]

const challenge = ref(false)
const round = ref(0)
const picked = ref(null) // 本关已选：true = 共面，false = 撑满三维，null = 未答
const score = ref(0)

function resetView() {
  phi.value = 28
  theta.value = 22
}
function startChallenge() {
  challenge.value = true
  round.value = 0
  picked.value = null
  score.value = 0
  resetView()
}
function quitChallenge() {
  challenge.value = false
  picked.value = null
}
function answer(isFlat) {
  if (picked.value !== null) return
  picked.value = isFlat
  if (isFlat === CHALLENGE[round.value].flat) score.value += 1
}
function nextRound() {
  if (round.value < CHALLENGE.length - 1) {
    round.value += 1
    picked.value = null
    resetView()
  }
}
// 未答题时不许剧透：藏起张成集合、判定文字与读数区的秩/体积
const revealed = computed(() => !challenge.value || picked.value !== null)

const freeVecs = computed(() => {
  const v1 = [2, 0, 0]
  const v2 = [2 * Math.cos(rad(alpha.value)), 2 * Math.sin(rad(alpha.value)), 0]
  // v3 的"平面内成分"取在 v1 与 v2 之间（夹角 0.8α），这样 α = 0 时三者共线、
  // 秩真能降到 1；否则 v3 永远指着别的方向，读数最低只到 2，note 里
  // "拖到 0 看直线"就成了做不到的事。
  const g = rad(0.8 * alpha.value)
  const cb = Math.cos(rad(beta.value))
  const sb = Math.sin(rad(beta.value))
  return [v1, v2, [2 * (cb * Math.cos(g)), 2 * (cb * Math.sin(g)), 2 * sb]]
})
const vecs = computed(() => (challenge.value ? CHALLENGE[round.value].v : freeVecs.value))

const volume = computed(() => {
  const [a, b, c] = vecs.value
  return Math.abs(dot(cross(a, b), c))
})

const rank = computed(() => {
  if (volume.value > 0.12) return 3
  const [a, b, c] = vecs.value
  const pairs = [cross(a, b), cross(a, c), cross(b, c)]
  return pairs.some((p) => norm(p) > 0.12) ? 2 : 1
})

const rankText = { 1: '一条直线（1 维）', 2: '一张平面（2 维）', 3: '整个空间（3 维）' }

const canvas = ref(null)
usePlot(
  canvas,
  (ctx, w, h) => {
    const view = makeSquareView(w, h, 3.4)
    const cp = Math.cos(rad(phi.value))
    const sp = Math.sin(rad(phi.value))
    const ct = Math.cos(rad(theta.value))
    const st = Math.sin(rad(theta.value))
    // 轴测投影：三维点 → 画布数学坐标。俯仰角 θ 决定摄像机抬得多高，
    // θ = 0 就是贴着地平线平视（此时整张 xy 平面被压成一条水平线）
    const P = (p) => {
      const u = p[0] * cp - p[1] * sp
      const dep = p[0] * sp + p[1] * cp
      return [u, p[2] * ct - dep * st]
    }
    const line3 = (p, q, color, width = 1.2, dash = []) => {
      const a = P(p)
      const b = P(q)
      ctx.save()
      ctx.strokeStyle = color
      ctx.lineWidth = width
      ctx.setLineDash(dash)
      ctx.beginPath()
      ctx.moveTo(view.X(a[0]), view.Y(a[1]))
      ctx.lineTo(view.X(b[0]), view.Y(b[1]))
      ctx.stroke()
      ctx.restore()
    }

    const [v1, v2, v3] = vecs.value

    // 张成集合（画在向量下面）——挑战答题前藏起来，它就是答案
    if (revealed.value && rank.value === 1) {
      const d = v1.map((x) => x / norm(v1))
      line3(
        d.map((x) => x * -3.4),
        d.map((x) => x * 3.4),
        C.gold,
        2.4,
        [6, 5],
      )
    } else if (revealed.value && rank.value === 2) {
      // 取两个无关向量，正交化后画平面网格
      let e1 = v1
      let e2 = norm(cross(v1, v2)) > 0.12 ? v2 : v3
      const n1 = norm(e1)
      e1 = e1.map((x) => x / n1)
      const proj = dot(e2, e1)
      e2 = e2.map((x, i) => x - proj * e1[i])
      const n2 = norm(e2)
      e2 = e2.map((x) => x / n2)
      const R = 2.6
      const corner = (s, t) => e1.map((x, i) => x * s + e2[i] * t)
      // 半透明底
      const cs = [corner(-R, -R), corner(R, -R), corner(R, R), corner(-R, R)].map(P)
      ctx.save()
      ctx.beginPath()
      cs.forEach((p, i) => (i ? ctx.lineTo(view.X(p[0]), view.Y(p[1])) : ctx.moveTo(view.X(p[0]), view.Y(p[1]))))
      ctx.closePath()
      ctx.fillStyle = 'rgba(176, 125, 43, 0.12)'
      ctx.fill()
      ctx.restore()
      for (let k = -2; k <= 2; k++) {
        const t = (k / 2) * R
        line3(corner(-R, t), corner(R, t), 'rgba(176, 125, 43, 0.5)', 1)
        line3(corner(t, -R), corner(t, R), 'rgba(176, 125, 43, 0.5)', 1)
      }
    }

    // 坐标轴
    line3([-3, 0, 0], [3, 0, 0], '#c9c3b6', 1.2)
    line3([0, -3, 0], [0, 3, 0], '#c9c3b6', 1.2)
    line3([0, 0, -1.6], [0, 0, 2.6], '#c9c3b6', 1.2)
    const lab = (p, s) => {
      const q = P(p)
      drawLabel(ctx, view.X(q[0]) + 4, view.Y(q[1]), s, { color: C.soft, size: 12 })
    }
    lab([3, 0, 0], 'x')
    lab([0, 3, 0], 'y')
    lab([0, 0, 2.6], 'z')

    // 三个向量
    const arrows = [
      [v1, C.ink, 'v₁'],
      [v2, C.accent, 'v₂'],
      [v3, C.indigo, 'v₃'],
    ]
    for (const [vec, color, name] of arrows) {
      const q = P(vec)
      drawArrow(ctx, view, 0, 0, q[0], q[1], { color, width: 2.8 })
      drawLabel(ctx, view.X(q[0]) + 8, view.Y(q[1]) - 4, name, { color, size: 14 })
    }

    if (revealed.value) {
      const msg =
        rank.value === 3
          ? '张成 = 整个三维空间：任何点都是三者的线性组合'
          : rank.value === 2
            ? '三个向量困在同一张平面里 —— 线性相关！'
            : '三个向量挤在同一条直线上 —— 严重相关'
      drawLabel(ctx, view.pad.l + 12, view.pad.t + 24, msg, {
        color: rank.value === 3 ? C.green : C.accent,
        size: 14,
      })
    } else {
      drawLabel(ctx, view.pad.l + 12, view.pad.t + 24, '共面，还是撑满三维？', {
        color: C.indigo,
        size: 14,
      })
      drawLabel(ctx, view.pad.l + 12, view.pad.t + 44, '把俯仰角拖到 0，再转方位角找找看', {
        color: C.soft,
        size: 12,
      })
    }
  },
  { height: 380, watchSources: [alpha, beta, phi, theta, challenge, round, picked] },
)
</script>

<template>
  <DemoFrame title="张成空间：三个向量能「够」到哪里">
    <canvas ref="canvas" class="demo-canvas"></canvas>
    <template #controls>
      <ControlSlider
        v-if="!challenge"
        label="v₂ 偏离 v₁ 的角度"
        v-model="alpha"
        :min="0"
        :max="90"
        :step="1"
        :display="(x) => x + '°'"
      />
      <ControlSlider
        v-if="!challenge"
        label="v₃ 抬离平面的角度"
        v-model="beta"
        :min="0"
        :max="80"
        :step="1"
        :display="(x) => x + '°'"
      />
      <ControlSlider
        label="看的方位角（绕着转一圈）"
        v-model="phi"
        :min="0"
        :max="360"
        :step="1"
        :display="(x) => x + '°'"
      />
      <ControlSlider
        label="看的俯仰角（0 = 贴地平视）"
        v-model="theta"
        :min="0"
        :max="80"
        :step="1"
        :display="(x) => x + '°'"
      />
      <div class="ctrl">
        <button v-if="!challenge" class="challenge-btn" type="button" @click="startChallenge">
          ⚔️ 挑战模式：五关判共面
        </button>
        <template v-else>
          <template v-if="picked === null">
            <button class="challenge-btn" type="button" @click="answer(true)">共面（≤ 2 维）</button>
            <button class="challenge-btn" type="button" @click="answer(false)">撑满三维</button>
          </template>
          <button
            v-else-if="round < CHALLENGE.length - 1"
            class="challenge-btn is-on"
            type="button"
            @click="nextRound"
          >
            下一关 →
          </button>
          <button class="challenge-btn" type="button" @click="quitChallenge">退出挑战</button>
        </template>
      </div>
    </template>
    <template #readout>
      <template v-if="challenge">
        <span class="challenge-badge">第 {{ round + 1 }}/5 关 · 已对 {{ score }}</span><br />
        <template v-if="picked === null">
          先判断：这三根箭头共面吗？（读数区的秩与体积已藏起）
        </template>
        <template v-else>
          {{ picked === CHALLENGE[round].flat ? '✅ 对！' : '❌ 错。' }}
          秩 = <b>{{ rank }}</b> · |det| = <b>{{ fmt(volume) }}</b><br />
          {{ CHALLENGE[round].why }}
        </template>
      </template>
      <template v-else>
        张成空间维数（秩）= <b>{{ rank }}</b> —— {{ rankText[rank] }}
        &nbsp;&nbsp;平行六面体体积 |det[v₁ v₂ v₃]| = <b>{{ fmt(volume) }}</b>
      </template>
    </template>
    <template #note>
      <p><b>四个旋钮：前两个动向量，后两个只动摄像机</b></p>
      <ul>
        <li>
          <b>v₂ 偏离 v₁ 的角度</b>（0–90°）：<MathInline tex="\boldsymbol{v}_1" /> 固定躺在 x 轴上，
          这个角控制 <MathInline tex="\boldsymbol{v}_2" /> 在<strong>水平面内</strong>转开多少。
          <MathInline tex="\boldsymbol{v}_3" /> 的水平分量跟着它一起转（取在两者之间），
          所以这个角为 0 时<strong>三根向量全部重合</strong>。
        </li>
        <li>
          <b>v₃ 抬离平面的角度</b>（0–80°）：把 <MathInline tex="\boldsymbol{v}_3" /> 从水平面里
          <strong>抬起来</strong>多少。只有它才能带来"第三个方向"。
        </li>
        <li>
          <b>看的方位角</b>（0–360°）：<strong>纯粹是摄像机绕着 z 轴转，不改变任何向量</strong>。
        </li>
        <li>
          <b>看的俯仰角</b>（0–80°）：摄像机抬多高。80° 是从头顶往下看，
          <strong>0° 是蹲下来贴着地平线平视</strong>——这一档最有用，下面就说为什么。
        </li>
      </ul>
      <p>
        <b>读数区两个量</b>：<strong>秩</strong>是这三根向量能"够到"的空间维数；
        <strong>平行六面体体积</strong>就是
        <router-link to="/linear-algebra/determinant">上一讲</router-link>的
        <MathInline tex="|\det|" /> 的三维版。体积一旦为零，三根共面，秩必定小于 3。
      </p>
      <p>
        <b>照着做一遍（一）：看两次跳变。</b>把前两个角度<strong>都拖到 0</strong>——
        三根向量叠成一根，读数是<b>一条直线（1 维）</b>。
        现在慢慢加大第一个角：<MathInline tex="\boldsymbol{v}_2" /> 一离开
        <MathInline tex="\boldsymbol{v}_1" />，读数<strong>跳</strong>到<b>一张平面（2 维）</b>，
        中间没有 1.5 维。接着加大第二个角：<MathInline tex="\boldsymbol{v}_3" /> 一抬离水平面，
        读数再<strong>跳</strong>到<b>整个空间（3 维）</b>，体积同时从 0 开始长。
        反过来把第二个角推回 0，体积精确归零，秩掉回 2。
      </p>
      <p>
        <b>照着做一遍（二）：不看读数，怎么用眼睛断定共不共面。</b>
        屏幕是平的，<strong>三根箭头在画面上永远画得出一个"平面图"</strong>——
        所以"看着散开"什么都证明不了。但反过来有一条<strong>铁律</strong>：
        <b>三根向量共面，当且仅当存在某个视角，让它们在画面上叠成同一条直线</b>。
        道理很简单——共面就是它们都住在一张纸上，那就一定能<strong>侧着看这张纸</strong>，
        把纸看成一条线（不共面的话，第三根戳出纸面，怎么侧都戳在外面）。
        而且找这个视角有固定招法：<b>先把俯仰角拖到 0（贴地平视），再慢慢转方位角</b>。
        任何一张过原点的平面都和地面交出一条水平线，蹲到那条线的方向上看过去，纸就侧过来了——
        所以这一招<strong>对任何平面都管用，一次都不会漏</strong>。
        试试看：把 <MathInline tex="\boldsymbol{v}_3" /> 抬离角设成 0（三根共面），
        俯仰角拖到 0——不管方位角转到哪里，三根箭头都躺在同一条水平线上。
        再把抬离角调回 40°，同样贴地转一圈：<MathInline tex="\boldsymbol{v}_3" /> 始终高高翘着，
        <strong>怎么转都压不下去</strong>。
      </p>
      <p>
        <b>⚔️ 挑战模式：五关判共面。</b>点开之后前两个旋钮消失，
        换成五组<strong>写死的</strong>向量（每关的 |det| 都事先算过），
        读数区的秩与体积、画面上的平面网格与判定文字<strong>全部藏起来</strong>——
        只剩三根箭头和两个视角旋钮。你要做的就是用上面那招判断：共面，还是撑满三维？
        答完当场揭晓真值并给出这一关的门道，答错不清零已过关数。
        五关是：① 斜平面上的共面（起始视角看着很散，其实 φ = 135°、俯仰 0 就叠成线）；
        ② 撑满三维（转遍所有视角，最扁的一档三根之间仍张着 <b>29°</b>）；
        ③ 共面，但 <MathInline tex="\boldsymbol{v}_1" />、<MathInline tex="\boldsymbol{v}_2" />
        几乎同向，看着像只有两根（φ = 90°、俯仰 0）；
        ④ <b>最阴的一关</b>：不共面，但 <MathInline tex="\boldsymbol{v}_3" /> 只离开
        <MathInline tex="\boldsymbol{v}_1" />、<MathInline tex="\boldsymbol{v}_2" /> 张成的那张平面
        0.41 个单位（正是第 1 关那张斜平面）。最扁的那个视角（φ = 129°、俯仰 11°）
        三根之间仍张着约 <b>8°</b>、缝隙约 14 像素；照口诀贴地找（俯仰 0、φ = 328°）
        更宽些，约 10°——缝就是缝，体积 2.08 不是 0；
        ⑤ 共面，但那张平面是竖直的 <MathInline tex="x = y" />（φ = 45°、俯仰 0）。
        这五个角度都是把全部视角扫过一遍验算出来的，照着拖必定复现。
      </p>
      <p>
        <b>"线性相关"不是抽象口诀，就是"有人没贡献新方向"</b>——
        秩只能取 1、2、3 而没有中间值，正是因为"方向"是数得清的。
      </p>
      <p>
        （<b>一个诚实的小注</b>：程序判定秩时用了 0.12 的容差，所以跳变会比理论上晚一两度——
        第一个角要拖到约 <b>2°</b> 才从 1 跳到 2，第二个角同样要约 <b>2°</b> 才从 2 跳到 3。
        这不是数学，是数值判据必须有个阈值：现实中的数据带噪声，
        "体积是不是零"从来没法用等号去问。<router-link to="/numerical/linear-system">数值分析
        第五讲</router-link>讲的就是这件事该怎么问才靠谱。
        挑战模式里的判定不受这个容差影响：五组向量的共面与否是写死的，不是现算的。）
      </p>
    </template>
  </DemoFrame>
</template>
