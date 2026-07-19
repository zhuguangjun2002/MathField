<script setup>
import { ref, computed } from 'vue'
import { drawLabel, usePlot, C, fmt } from './plot.js'
import DemoFrame from '../components/DemoFrame.vue'
import ControlSlider from '../components/ControlSlider.vue'

// 正方形板，四边温度可调，内部从 0 开始"取邻居平均"迭代
const N = 41
const topT = ref(100)
const bottomT = ref(0)
const leftT = ref(0)
const rightT = ref(50)
const iters = ref(0)

const field = computed(() => {
  const g = new Float64Array(N * N)
  const at = (i, j) => g[i * N + j]
  // 边界
  const setBC = (arr) => {
    for (let j = 0; j < N; j++) {
      arr[0 * N + j] = topT.value
      arr[(N - 1) * N + j] = bottomT.value
    }
    for (let i = 0; i < N; i++) {
      arr[i * N + 0] = leftT.value
      arr[i * N + N - 1] = rightT.value
    }
  }
  setBC(g)
  const tmp = new Float64Array(g)
  for (let k = 0; k < iters.value; k++) {
    for (let i = 1; i < N - 1; i++) {
      for (let j = 1; j < N - 1; j++) {
        tmp[i * N + j] = 0.25 * (at(i - 1, j) + at(i + 1, j) + at(i, j - 1) + at(i, j + 1))
      }
    }
    setBC(tmp)
    g.set(tmp)
  }
  return g
})

// 迭代残差：内部各点与邻居平均的最大偏差
const residual = computed(() => {
  const g = field.value
  let m = 0
  for (let i = 1; i < N - 1; i++) {
    for (let j = 1; j < N - 1; j++) {
      const avg = 0.25 * (g[(i - 1) * N + j] + g[(i + 1) * N + j] + g[i * N + j - 1] + g[i * N + j + 1])
      m = Math.max(m, Math.abs(g[i * N + j] - avg))
    }
  }
  return m
})

// 温度 → 暖纸色系热图
function color(v) {
  const t = Math.max(0, Math.min(1, v / 100))
  const r = Math.round(38 + t * (178 - 38) + t * t * 40)
  const g2 = Math.round(51 + t * (58 - 51) + (1 - t) * 60 * (1 - t))
  const b = Math.round(143 * (1 - t) + 47 * t)
  return `rgb(${r},${g2},${b})`
}

const canvas = ref(null)
usePlot(
  canvas,
  (ctx, w, h) => {
    const size = Math.min(w - 24, h - 46)
    const ox = (w - size) / 2
    const oy = 8
    const cell = size / N
    const g = field.value
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        ctx.fillStyle = color(g[i * N + j])
        ctx.fillRect(ox + j * cell, oy + i * cell, cell + 0.5, cell + 0.5)
      }
    }
    // 等温线（简单 marching：画 25/50/75 度的过渡格子）
    ctx.strokeStyle = 'rgba(250, 248, 244, 0.85)'
    ctx.lineWidth = 1
    for (const level of [25, 50, 75]) {
      for (let i = 0; i < N - 1; i++) {
        for (let j = 0; j < N - 1; j++) {
          const a = g[i * N + j]
          const b = g[i * N + j + 1]
          const c = g[(i + 1) * N + j]
          if ((a - level) * (b - level) < 0 || (a - level) * (c - level) < 0) {
            ctx.strokeRect(ox + j * cell, oy + i * cell, cell, cell)
          }
        }
      }
    }
    drawLabel(ctx, w / 2, oy + size + 22, '蓝 = 0°　红 = 100°　白框 = 等温线（25° / 50° / 75°）', {
      color: C.soft,
      align: 'center',
      size: 12,
    })
  },
  { height: 380, watchSources: [iters, topT, bottomT, leftT, rightT] },
)
</script>

<template>
  <DemoFrame title="松弛法：每点不断取邻居平均，直到「无话可说」">
    <canvas ref="canvas" class="demo-canvas"></canvas>
    <template #controls>
      <ControlSlider label="迭代次数" v-model="iters" :min="0" :max="1500" :step="10" />
      <ControlSlider label="上边温度" v-model="topT" :min="0" :max="100" :step="5" />
      <ControlSlider label="右边温度" v-model="rightT" :min="0" :max="100" :step="5" />
      <ControlSlider label="下边温度" v-model="bottomT" :min="0" :max="100" :step="5" />
    </template>
    <template #readout>
      迭代 <b>{{ iters }}</b> 次后，最不"服帖"的点与其邻居平均还差 <b>{{ fmt(residual, 2) }}</b>°
      —— 差值归零之时，就是拉普拉斯方程解出之日
    </template>
    <template #note>
      一块金属板，四条边各接恒温热源（滑杆可调），内部初始一片冰冷。规则只有一条：
      <b>每一轮，每个内部点把自己改成四个邻居的平均值</b>。把迭代次数从 0 拖到 1500：
      边界的温度像墨水一样渗进内部，最终定格成一幅再也不变的图像——每点都恰好等于邻居平均、
      "无话可说"的状态。这幅定格图就是拉普拉斯方程 Δu = 0 的解：<b>调和 = 处处等于邻域平均</b>。
      注意两件事：终态里<b>没有任何局部热斑或冷斑</b>（极值只能出现在边界上——最大值原理）；
      改动任何一条边的温度，整幅内部图像都会跟着变——解完全由边界决定，这正是复变第三讲
      "解析函数全息性"的物理孪生。
    </template>
  </DemoFrame>
</template>
