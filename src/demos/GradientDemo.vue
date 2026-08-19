<script setup>
import { ref, computed } from 'vue'
import { usePlot, makeSquareView, sampleGrid, contourSegments, drawArrow, drawPoint, drawLabel, C } from './plot.js'
import DemoFrame from '../components/DemoFrame.vue'
import ControlSlider from '../components/ControlSlider.vue'
import MathInline from '../components/MathInline.vue'

const SURFACES = {
  bowl: {
    label: 'f = x² + 2y²  （一只碗：唯一的谷底）',
    f: (x, y) => x * x + 2 * y * y,
    fx: (x) => 2 * x,
    fy: (x, y) => 4 * y,
    step: 0.7,
    x0: 1.1,
    y0: 0.8,
  },
  saddle: {
    label: 'f = x² − y²  （马鞍：一个方向上坡、另一个下坡）',
    f: (x, y) => x * x - y * y,
    fx: (x) => 2 * x,
    fy: (x, y) => -2 * y,
    step: 0.6,
    x0: 0.9,
    y0: 0.6,
  },
  hills: {
    label: 'f = 两座高斯山峰  （有局部极大，也有鞍）',
    f: (x, y) => 2 * Math.exp(-((x - 1) ** 2 + (y - 0.6) ** 2)) + 1.4 * Math.exp(-((x + 1.1) ** 2 + (y + 0.7) ** 2) / 1.3),
    fx: (x, y) =>
      2 * Math.exp(-((x - 1) ** 2 + (y - 0.6) ** 2)) * (-2 * (x - 1)) +
      1.4 * Math.exp(-((x + 1.1) ** 2 + (y + 0.7) ** 2) / 1.3) * ((-2 * (x + 1.1)) / 1.3),
    fy: (x, y) =>
      2 * Math.exp(-((x - 1) ** 2 + (y - 0.6) ** 2)) * (-2 * (y - 0.6)) +
      1.4 * Math.exp(-((x + 1.1) ** 2 + (y + 0.7) ** 2) / 1.3) * ((-2 * (y + 0.7)) / 1.3),
    step: 0.15,
    x0: 0.2,
    y0: 0.2,
  },
}

const key = ref('bowl')
const px = ref(1.1)
const py = ref(0.8)
const theta = ref(30) // 走的方向（度）
const S = computed(() => SURFACES[key.value])
function onChange() {
  px.value = S.value.x0
  py.value = S.value.y0
}

// ―― 挑战模式：五道"读等高线，指出最陡上升方向"的题 ――
// 每题锁死曲面与站位，你把 θ 滑杆拖到你认为最陡的方向再交卷；判定容差 ±5°。
// 五个答案都在 node 里用解析梯度 atan2(f_y, f_x) 算过（见 #note 的分题列表），
// 且都刻意避开 0°/360°（θ 滑杆的两端），免得"绕圈"这件事干扰判定。
const TOL = 5 // 判定容差（度）
const CHALLENGE = [
  { key: 'bowl', x: 1.1, y: 0.8, best: 55.5, why: '碗在 y 向陡一倍（2y²），最陡偏向 y 轴，不是背离原点。' },
  { key: 'hills', x: 0.3, y: -0.7, best: 120.9, why: '两座山各拉一把，合力离两座山顶的方位各差 59°。' },
  { key: 'saddle', x: -0.8, y: 0.7, best: 221.2, why: '鞍上 y 方向是下坡，得往 −y 走；背离原点反而在下山。' },
  { key: 'saddle', x: -0.6, y: -1.1, best: 118.6, why: '「背离原点」这一猜差了 123°，几乎正相反。' },
  { key: 'hills', x: 0.0, y: -0.2, best: 88.9, why: '梯度只有 0.27，很弱；而且哪座山顶都不指。' },
]
const challenge = ref(false)
const round = ref(0)
const submitted = ref(false)
const score = ref(0)
// 未交卷时不许画红箭头、不许报梯度与最陡方向——那本来就是答案
const revealed = computed(() => !challenge.value || submitted.value)

// 两个角度之间的最短夹角（0–180）
function angDiff(a, b) {
  const d = Math.abs(((a - b) % 360 + 360) % 360)
  return Math.min(d, 360 - d)
}
const myErr = computed(() => angDiff(theta.value, CHALLENGE[round.value].best))

function loadRound() {
  const r = CHALLENGE[round.value]
  key.value = r.key
  px.value = r.x
  py.value = r.y
  theta.value = 0 // 与 θ 滑杆的下限一致，否则滑杆显示 0 而模型是别的值
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

const rad = (d) => (d * Math.PI) / 180

const info = computed(() => {
  const s = S.value
  const gx = s.fx(px.value, py.value)
  const gy = s.fy(px.value, py.value)
  const norm = Math.hypot(gx, gy)
  const ux = Math.cos(rad(theta.value))
  const uy = Math.sin(rad(theta.value))
  const dir = gx * ux + gy * uy // 方向导数 = 梯度 · 单位向量
  const best = norm === 0 ? 0 : (Math.atan2(gy, gx) * 180) / Math.PI
  return { gx, gy, norm, dir, ux, uy, best: (best + 360) % 360, f: s.f(px.value, py.value) }
})

const canvas = ref(null)
usePlot(
  canvas,
  (ctx, w, hh) => {
    const s = S.value
    const v = makeSquareView(w, hh, 2.2)
    const N = 200
    const g = sampleGrid(s.f, N, v.x0, v.x1, v.y0, v.y1)

    // 等高线
    ctx.save()
    ctx.strokeStyle = 'rgba(58, 94, 160, 0.45)'
    ctx.lineWidth = 1.1
    ctx.beginPath()
    contourSegments(g, N, v.x0, v.x1, v.y0, v.y1, s.step, (ax, ay, bx, by) => {
      ctx.moveTo(v.X(ax), v.Y(ay))
      ctx.lineTo(v.X(bx), v.Y(by))
    })
    ctx.stroke()
    ctx.restore()

    const I = info.value
    const L = 0.9 // 箭头显示长度（单位：数据单位）
    // 梯度方向（归一化后按固定长度画，另用读数给模长）
    if (I.norm > 1e-9 && revealed.value) {
      drawArrow(ctx, v, px.value, py.value, px.value + (L * I.gx) / I.norm, py.value + (L * I.gy) / I.norm, {
        color: C.accent,
        width: 3,
      })
    }
    // 你选的方向
    drawArrow(ctx, v, px.value, py.value, px.value + L * I.ux, py.value + L * I.uy, {
      color: C.green,
      width: 2.4,
    })
    drawPoint(ctx, v, px.value, py.value, { color: C.ink, r: 5 })

    drawLabel(ctx, v.pad.l + 10, v.pad.t + 18, '— 蓝：等高线', { color: 'rgba(58, 94, 160, 0.9)', size: 12 })
    if (revealed.value) {
      drawLabel(ctx, v.pad.l + 10, v.pad.t + 36, '— 红：梯度（最陡上升）', { color: C.accent, size: 12 })
    } else {
      drawLabel(ctx, v.pad.l + 10, v.pad.t + 36, '— 红：交卷后揭晓', { color: C.indigo, size: 12 })
    }
    drawLabel(ctx, v.pad.l + 10, v.pad.t + 54, '— 绿：你选的方向', { color: C.green, size: 12 })
    if (I.norm < 1e-9) {
      drawLabel(ctx, v.pad.l + 10, v.pad.t + 76, '梯度为零：这是个驻点', { color: C.accent, size: 13 })
    }
  },
  { height: 380, watchSources: [key, px, py, theta, challenge, submitted] },
)
</script>

<template>
  <DemoFrame title="梯度：山坡上往哪边走最陡">
    <canvas ref="canvas" class="demo-canvas"></canvas>
    <template #controls>
      <label class="ctrl">
        <span class="ctrl-label">曲面</span>
        <select v-model="key" class="ctrl-select" :disabled="challenge" @change="onChange">
          <option v-for="(s, k) in SURFACES" :key="k" :value="k">{{ s.label }}</option>
        </select>
      </label>
      <ControlSlider label="站的位置 x" v-model="px" :min="-2" :max="2" :step="0.05" :display="(x) => x.toFixed(2)" :disabled="challenge" />
      <ControlSlider label="站的位置 y" v-model="py" :min="-2" :max="2" :step="0.05" :display="(x) => x.toFixed(2)" :disabled="challenge" />
      <ControlSlider
        label="要走的方向 θ"
        v-model="theta"
        :min="0"
        :max="360"
        :step="1"
        :display="(x) => x + '°'"
      />
      <div class="ctrl">
        <button v-if="!challenge" class="challenge-btn" type="button" @click="startChallenge">
          ⚔️ 开始挑战（5 题）
        </button>
        <template v-else>
          <button v-if="!submitted" class="challenge-btn is-on" type="button" @click="submit">
            交卷：θ = {{ theta }}°
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
        只看蓝色等高线，把 θ 拖到你认为<b>最陡上升</b>的方向，再交卷（容差 ±{{ TOL }}°）
      </template>
      <template v-else-if="challenge">
        <span class="challenge-badge">第 {{ round + 1 }}/5 题 · 已对 {{ score }}</span><br />
        <template v-if="myErr <= TOL">✅ 对！</template><template v-else>❌ </template>
        最陡是 <b>{{ CHALLENGE[round].best.toFixed(1) }}°</b>，你答 <b>{{ theta }}°</b>（差
        {{ myErr.toFixed(1) }}°）。{{ CHALLENGE[round].why }}
      </template>
      <template v-else>
      <MathInline tex="\nabla f" /> = (<b>{{ info.gx.toFixed(3) }}</b
      >, <b>{{ info.gy.toFixed(3) }}</b
      >) · 模长 <MathInline tex="|\nabla f|" /> = <b>{{ info.norm.toFixed(4) }}</b> · 最陡方向
      <b>{{ info.best.toFixed(1) }}°</b><br />
      沿 θ = {{ theta }}° 的方向导数 = <b>{{ info.dir.toFixed(4) }}</b> ＝
      <MathInline tex="|\nabla f|\cos\varphi" />，占最大值的
      <b>{{ info.norm < 1e-9 ? '—' : ((info.dir / info.norm) * 100).toFixed(1) + '%' }}</b>
      </template>
    </template>
    <template #note>
      <p><b>四个旋钮分别是什么</b></p>
      <ul>
        <li>
          <b>曲面</b>（下拉）：把 <MathInline tex="f(x,y)" /> 想成一片<strong>地形的海拔</strong>。
          蓝色圈就是<strong>等高线</strong>——同一条线上海拔相同，正如地图上那样。
        </li>
        <li>
          <b>站的位置 x / y</b>：你现在站在地形的哪一点（黑点）。
        </li>
        <li>
          <b>要走的方向 θ</b>：从 0° 到 360°，指你打算朝哪个方位迈步
          （0° 是正东即 +x，90° 是正北即 +y）。<strong>它不改变地形，只改变你的选择。</strong>
        </li>
      </ul>
      <p>
        <b>画面在说什么</b>：<strong>红箭头是梯度</strong>
        <MathInline tex="\nabla f=(f_x,f_y)" />，它指向<strong>此处最陡的上坡方向</strong>；
        <strong>绿箭头是你选的方向</strong>。读数第二行给的是"沿绿箭头走，海拔涨得多快"，
        也就是<strong>方向导数</strong>。（两支箭头都按固定长度画，
        <strong>陡不陡看读数不看长度</strong>——否则平坦处的箭头会缩成一个点。）
      </p>
      <p>
        <b>照着做一遍（一）：转一圈，看余弦。</b>默认档（碗），
        位置停在 <b>(1.10, 0.80)</b>：梯度是 <b>(2.200, 3.200)</b>，模长 <b>3.8833</b>，
        最陡方向 <b>55.5°</b>。现在慢慢拖 θ 转一整圈，盯着方向导数：
        θ = 55° 时 <b>3.8832</b>（几乎顶格），θ = <b>145°</b> 时只剩 <b>0.0333</b>
        （<strong>几乎正好沿着等高线走，海拔不变</strong>——真正的零点在 145.5°，
        滑杆步长 1° 恰好跨过去），
        θ = <b>235°</b> 时 <b>−3.8832</b>（最陡下坡）。
        <strong>它按 <MathInline tex="|\nabla f|\cos\varphi" /> 变化</strong>，
        <MathInline tex="\varphi" /> 是绿箭头与红箭头的夹角。
      </p>
      <p>
        <b>照着做一遍（二）：梯度永远垂直于等高线。</b>随便把点拖到哪里，
        红箭头都<strong>与它脚下那条蓝线成直角</strong>。
        道理就是上一条：沿等高线走海拔不变，方向导数为 0，
        而 <MathInline tex="\nabla f\cdot u=0" /> 就是<strong>垂直</strong>。
        <strong>看地图找最陡的下山路，不必测量——垂直于等高线走就是了。</strong>
      </p>
      <p>
        <b>照着做一遍（三）：驻点的三种命运。</b>把位置拖到 <b>(0, 0)</b>：
      </p>
      <ul>
        <li><strong>碗</strong>：读数 <MathInline tex="\nabla f=(0,0)" />，画面提示"这是个驻点"——它是<strong>极小值</strong>；</li>
        <li>
          <strong>马鞍</strong>：同样是 <MathInline tex="(0,0)" />，可它<strong>既不是极大也不是极小</strong>
          ——沿 x 轴走是上坡，沿 y 轴走是下坡。把 x 拖到 0.30、y 保持 0，方向导数在 θ=0° 时为正；
          再把 y 拖到 0.30、x 保持 0，θ=90° 时为负。<strong>这就是"鞍点"</strong>；
        </li>
        <li>
          <strong>双峰</strong>：把点拖到 <b>(1.00, 0.60)</b> 附近，梯度模长掉到 <b>0.05</b> 以下（读数 0.0488）
          ——那是右边那座山的<strong>山顶</strong>（局部极大）。
          <strong>而山顶不止一个</strong>：另一座在 (−1.10, −0.70) 附近。
          这正是"梯度下降会陷进局部极值"的画面。
        </li>
      </ul>
      <p>
        <b>挑战模式的规则。</b>点「开始挑战」后连出五道题（<b>题目写死在程序里，谁玩都是
        同样五道、同样顺序</b>）。每题<b>替你锁定曲面和站的位置</b>——挑战期间曲面下拉与
        两根位置滑杆<b>都是禁用的</b>，只有 θ 那根能动，它就是你的答题工具（每题开始时
        <b>复位到 0°</b>，正是滑杆的下限）。要紧的是：<b>交卷前红箭头不画、读数区的梯度、
        模长、最陡方向、方向导数全部不显示</b>——那几样本来就是答案，尤其方向导数，
        留着它你只要拖一圈找最大值就行了，等高线根本不用看。
        你手里只有<b>蓝色等高线</b>和你自己那支绿箭头。
        <b>判定容差 ±5°</b>：θ 滑杆步长 1°，而答案带一位小数（如 55.5°），
        所以就算你答得完全正确也可能差 0.5°，容差必须比它宽；
        五个答案也都刻意避开了 0°/360°，免得"绕一圈"这件事干扰判定。
      </p>
      <p>
        <b>怎么下手</b>：<b>梯度垂直于等高线，指向数值变大的那一侧</b>（上面第二条已经验过）。
        所以办法是：看清脚下那条蓝线的走向，取它的垂线，再判断哪一头是"往高处"。
        <b>不要用"背离原点"去猜</b>——五道题<b>全部</b>是拿这个猜法开刀的，
        它在五题里分别差 19.5°、172.3°、82.4°、122.8°、178.9°，没有一道能蒙混过关。
      </p>
      <p>
        <b>五道题的门道</b>（想自己先玩就别往下看）：
      </p>
      <ul>
        <li>
          <b>① 碗，站 (1.10, 0.80)</b> → <b>55.5°</b>。天真的"背离原点"给 36.0°，<b>差 19.5°</b>。
          因为这只碗<b>不是圆的</b>：<MathInline tex="f=x^2+2y^2" /> 在 y 方向陡一倍，
          梯度 <MathInline tex="(2x,4y)=(2.2,3.2)" /> 被 y 分量拽了过去。
          等高线是<b>椭圆</b>，而椭圆的法线本来就不过圆心。
        </li>
        <li>
          <b>② 双峰，站 (0.30, −0.70)</b> → <b>120.9°</b>。两座高斯山各拉一把，
          合力是<b>矢量和</b>：右峰在 61.9° 方位、左峰在 179.8° 方位，
          而答案 120.9° <b>离两边各差 58.9°</b>——不偏不倚卡在正中间，<b>谁都不指</b>。
          （"背离原点"在这题给 293.2°，差 172.3°，几乎正相反。）
        </li>
        <li>
          <b>③ 马鞍，站 (−0.80, 0.70)</b> → <b>221.2°</b>（指向第三象限）。
          天真猜法给 138.8°，<b>差 82.4°</b>。因为 <MathInline tex="f=x^2-y^2" /> 里
          <b>y 方向是下坡</b>（梯度的 y 分量是 <MathInline tex="-2y" />，在 y&gt;0 处为负），
          想上坡得往 −y 走。
        </li>
        <li>
          <b>④ 马鞍，站 (−0.60, −1.10)</b> → <b>118.6°</b>。这题最狠：
          "背离原点"给 241.4°，和真答案<b>差 122.8°，几乎正相反</b>——
          照那个猜法走，你是在飞快地<b>下山</b>。
        </li>
        <li>
          <b>⑤ 双峰，站 (0.00, −0.20)</b> → <b>88.9°</b>（几乎正北）。收官题最难，
          难在<b>梯度只有 0.27</b>，等高线在这一带很稀疏，方向不好读；
          而且这个方向<b>指向哪座山顶都不是</b>（右峰在 38.7° 方位、左峰在 204.4° 方位）——
          你站在两山之间的鞍形地带，合力被挤到了两者之外。
        </li>
      </ul>
      <p>
        （<b>一个诚实的小注</b>：读数里的梯度是<strong>解析求导</strong>算出来的，
        不是差商近似；"最陡方向"由 <MathInline tex="\arctan(f_y/f_x)" /> 给出，
        在驻点处方向没有意义，那时读数会显示 0°。）
      </p>
    </template>
  </DemoFrame>
</template>
