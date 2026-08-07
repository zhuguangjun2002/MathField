<script setup>
import { ref, computed } from 'vue'
import { usePlot, drawLabel, C } from './plot.js'
import DemoFrame from '../components/DemoFrame.vue'
import ControlSlider from '../components/ControlSlider.vue'

const aNeed = ref(1) // 甲还差几局获胜
const bNeed = ref(2) // 乙还差几局获胜

// ―― 挑战模式：五道写死的分账题（先心算，再数叶子对账）――
// 全部 9 档答案已逐一枚举验算：见 #note 的规则说明
const CHALLENGE = [
  { a: 2, b: 2, opts: ['1/2', '2/3', '3/4'], ans: 0, why: '两人对称，答案只能是对半——树上红蓝叶子恰好各半' },
  { a: 1, b: 3, opts: ['3/4', '7/8', '5/6'], ans: 1, why: '乙要连赢三局才翻盘，8 条路里只有 1 条——甲拿 7/8' },
  { a: 2, b: 1, opts: ['1/4', '1/3', '1/2'], ans: 0, why: '就是默认档的镜像：乙差 1、甲差 2，甲只占 1/4' },
  { a: 2, b: 3, opts: ['3/4', '11/16', '2/3'], ans: 1, why: '16 条等长路里甲赢 11 条——分母是 2⁴，分不出 3 的倍数' },
  { a: 3, b: 2, opts: ['5/16', '1/4', '1/3'], ans: 0, why: '上一题的镜像：16 条里甲只赢 5 条' },
]
const challenge = ref(false)
const round = ref(0)
const picked = ref(null)
const score = ref(0)

function startChallenge() {
  challenge.value = true
  round.value = 0
  picked.value = null
  score.value = 0
  aNeed.value = CHALLENGE[0].a
  bNeed.value = CHALLENGE[0].b
}
function quitChallenge() {
  challenge.value = false
  picked.value = null
}
function answer(i) {
  if (picked.value !== null) return
  picked.value = i
  if (i === CHALLENGE[round.value].ans) score.value += 1
}
function nextRound() {
  if (round.value < CHALLENGE.length - 1) {
    round.value += 1
    picked.value = null
    aNeed.value = CHALLENGE[round.value].a
    bNeed.value = CHALLENGE[round.value].b
  }
}

const depth = computed(() => aNeed.value + bNeed.value - 1)
const total = computed(() => 2 ** depth.value)

// 费马的招：假想把剩下 a+b−1 局全部赌完，每种输赢序列等可能。
// 叶子 i 的二进制位：0 = 该局甲胜。甲拿满 a 局即甲赢下整个系列。
const winsOfLeaf = (i) => {
  let ones = 0
  for (let k = 0; k < depth.value; k++) if ((i >> k) & 1) ones++
  return depth.value - ones // 甲在该序列中的胜局数
}
const aWinLeaves = computed(() => {
  let n = 0
  for (let i = 0; i < total.value; i++) if (winsOfLeaf(i) >= aNeed.value) n++
  return n
})

function gcd(x, y) {
  return y ? gcd(y, x % y) : x
}
const shareText = computed(() => {
  const g = gcd(aWinLeaves.value, total.value)
  return `${aWinLeaves.value / g}/${total.value / g}`
})

const canvas = ref(null)
usePlot(
  canvas,
  (ctx, w, h) => {
    const d = depth.value
    const top = 34
    const bottom = h - 44
    const levelY = (k) => top + ((bottom - top) * k) / Math.max(d, 1)
    const nodeX = (k, i) => w * ((i + 0.5) / 2 ** k)

    // 边：每个 k 层节点 i 的孩子是 (k+1, 2i)（甲胜）与 (2i+1)（乙胜）
    ctx.save()
    ctx.lineWidth = 1.2
    for (let k = 0; k < d; k++) {
      for (let i = 0; i < 2 ** k; i++) {
        const x = nodeX(k, i)
        const y = levelY(k)
        ctx.strokeStyle = 'rgba(178, 58, 47, 0.5)'
        ctx.beginPath()
        ctx.moveTo(x, y)
        ctx.lineTo(nodeX(k + 1, 2 * i), levelY(k + 1))
        ctx.stroke()
        ctx.strokeStyle = 'rgba(51, 81, 143, 0.5)'
        ctx.beginPath()
        ctx.moveTo(x, y)
        ctx.lineTo(nodeX(k + 1, 2 * i + 1), levelY(k + 1))
        ctx.stroke()
      }
    }
    // 中间节点
    ctx.fillStyle = C.ink
    for (let k = 0; k < d; k++) {
      for (let i = 0; i < 2 ** k; i++) {
        ctx.beginPath()
        ctx.arc(nodeX(k, i), levelY(k), k === 0 ? 5 : 3, 0, Math.PI * 2)
        ctx.fill()
      }
    }
    // 叶子：方块，按整个系列的胜者着色
    const leafW = Math.min(18, (w / total.value) * 0.6)
    for (let i = 0; i < total.value; i++) {
      const aWon = winsOfLeaf(i) >= aNeed.value
      ctx.fillStyle = aWon ? C.accent : C.indigo
      ctx.fillRect(nodeX(d, i) - leafW / 2, levelY(d) - leafW / 2, leafW, leafW)
    }
    ctx.restore()

    drawLabel(ctx, w / 2, 18, `中断时刻：甲还差 ${aNeed.value} 局，乙还差 ${bNeed.value} 局 —— 把剩下 ${d} 局全部"假想赌完"`, {
      color: C.soft,
      align: 'center',
    })
    drawLabel(ctx, 12, h - 14, `■ 甲最终获胜的结局（左枝 = 这一局甲胜）`, { color: C.accent, size: 12 })
    drawLabel(ctx, w - 12, h - 14, `■ 乙最终获胜的结局`, { color: C.indigo, align: 'right', size: 12 })
  },
  { height: 320, watchSources: [aNeed, bNeed] },
)
</script>

<template>
  <DemoFrame title="点数分配：数一数未来所有的等可能结局">
    <canvas ref="canvas" class="demo-canvas"></canvas>
    <template #controls>
      <ControlSlider label="甲还差几局" v-model="aNeed" :min="1" :max="3" :step="1" :disabled="challenge" />
      <ControlSlider label="乙还差几局" v-model="bNeed" :min="1" :max="3" :step="1" :disabled="challenge" />
      <div class="ctrl">
        <button v-if="!challenge" class="challenge-btn" type="button" @click="startChallenge">
          ⚔️ 开始挑战（5 题）
        </button>
        <template v-else>
          <template v-if="picked === null">
            <button
              v-for="(o, i) in CHALLENGE[round].opts"
              :key="o"
              class="challenge-btn"
              type="button"
              @click="answer(i)"
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
        <template v-if="picked === null">
          甲还差 {{ CHALLENGE[round].a }} 局、乙还差 {{ CHALLENGE[round].b }} 局——赌注该分给甲几分之几？
        </template>
        <template v-else-if="picked === CHALLENGE[round].ans">
          ✅ 对！甲分 {{ CHALLENGE[round].opts[CHALLENGE[round].ans] }}<br />{{ CHALLENGE[round].why }}
        </template>
        <template v-else>
          ❌ 答案是 {{ CHALLENGE[round].opts[CHALLENGE[round].ans] }}<br />{{ CHALLENGE[round].why }}
        </template>
      </template>
      <template v-else>
        未来共 2<sup>{{ depth }}</sup> = <b>{{ total }}</b> 种等可能结局，其中甲最终获胜
        <b>{{ aWinLeaves }}</b> 种 —— 赌注应分给甲 <b style="color: #b23a2f">{{ shareText }}</b>
      </template>
    </template>
    <template #note>
      <b>两个旋钮，合起来描述"从此刻起还要打成什么样"。</b>
      <b>甲还差几局</b>、<b>乙还差几局</b>——注意它们不是已经赢了多少，而是<b>还需要再赢几局才夺冠</b>
      （帕斯卡那道原题是"先胜 3 局、甲 2:1 领先"，换算过来就是甲还差 1、乙还差 2，
      正是两根滑杆的默认位置）。<b>本图假设双方势均力敌</b>，每局各占一半，
      所以才能靠"数叶子"直接得出答案；实力不等时的推广见伍节那张赛制表。
      <br /><br />
      这是费马的算法：赌局虽然中断了，但可以<b>假想把剩下的局数全部赌完</b>——每一局非甲即乙、机会均等，
      于是每条从树根到树叶的路径等可能。数一数红色叶子的占比，就是甲"赢面"的大小，赌注按它来分才公平。
      默认情形（甲差 1 局、乙差 2 局）答案是 3/4——注意<b>不是</b>按已胜局数 2:1 分！
      分钱看的不是过去的战绩，而是<b>未来的可能性</b>。另一个陷阱：如果"赌到分出胜负就停"，
      树叶就不再等可能（短路径的叶子概率更大）——达朗贝尔当年就是在这里栽的跟头：
      他数两枚硬币的结果"两正/两反/一正一反"共三种，就断定各占 1/3。等可能，从来不能拍脑袋。
      <br /><br />
      <b>照着做一遍</b>：把两根滑杆各拖一轮，九种组合的读数依次是——
      对称档（差 1 对 1、差 2 对 2、差 3 对 3）全是 <b>1/2</b>；
      甲差 1 时对乙差 2、差 3 分别是 <b>3/4、7/8</b>（乙要连赢才翻盘，每多差一局赢面减半地缩）；
      镜像档甲差 2 对乙差 1 是 <b>1/4</b>、甲差 3 对乙差 1 是 <b>1/8</b>；
      最有意思的是差 2 对 3 的 <b>11/16</b> 和差 3 对 2 的 <b>5/16</b>——
      分母都是 2 的幂（等可能路径数），两数之和恰为 1（同一棵树换个立场数）。
      <br /><br />
      <b>挑战模式的规则</b>：点「开始挑战」连出五道分账题（题目写死在程序里，谁玩都一样），
      滑杆交给题目锁定。先<b>心算或画小树</b>选答案，选完看图上的红蓝叶子亲手对账。
      五题答案都从上面那九档里出，错项也都是「按已胜局数分」之类的历史错法——
      三百七十年前整个欧洲都答错的题，看你五题能对几题。
    </template>
  </DemoFrame>
</template>
