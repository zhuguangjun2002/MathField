<script setup>
import { ref, computed } from 'vue'
import { usePlot, drawLabel, C } from './plot.js'
import DemoFrame from '../components/DemoFrame.vue'
import ControlSlider from '../components/ControlSlider.vue'

const aNeed = ref(1) // 甲还差几局获胜
const bNeed = ref(2) // 乙还差几局获胜

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
      <ControlSlider label="甲还差几局" v-model="aNeed" :min="1" :max="3" :step="1" />
      <ControlSlider label="乙还差几局" v-model="bNeed" :min="1" :max="3" :step="1" />
    </template>
    <template #readout>
      未来共 2<sup>{{ depth }}</sup> = <b>{{ total }}</b> 种等可能结局，其中甲最终获胜
      <b>{{ aWinLeaves }}</b> 种 —— 赌注应分给甲 <b style="color: #b23a2f">{{ shareText }}</b>
    </template>
    <template #note>
      这是费马的算法：赌局虽然中断了，但可以<b>假想把剩下的局数全部赌完</b>——每一局非甲即乙、机会均等，
      于是每条从树根到树叶的路径等可能。数一数红色叶子的占比，就是甲"赢面"的大小，赌注按它来分才公平。
      默认情形（甲差 1 局、乙差 2 局）答案是 3/4——注意<b>不是</b>按已胜局数 2:1 分！
      分钱看的不是过去的战绩，而是<b>未来的可能性</b>。另一个陷阱：如果"赌到分出胜负就停"，
      树叶就不再等可能（短路径的叶子概率更大）——达朗贝尔当年就是在这里栽的跟头：
      他数两枚硬币的结果"两正/两反/一正一反"共三种，就断定各占 1/3。等可能，从来不能拍脑袋。
    </template>
  </DemoFrame>
</template>
