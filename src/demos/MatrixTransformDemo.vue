<script setup>
import { ref, computed, watch } from 'vue'
import { usePlot, makeSquareView, drawArrow, drawLabel, C, fmt } from './plot.js'
import DemoFrame from '../components/DemoFrame.vue'
import ControlSlider from '../components/ControlSlider.vue'

const PRESETS = {
  rotate: { label: '旋转 45°', m: [0.707, -0.707, 0.707, 0.707] },
  shear: { label: '剪切（推倒）', m: [1, 1, 0, 1] },
  scale: { label: '伸缩', m: [1.6, 0, 0, 0.6] },
  reflect: { label: '镜像翻转', m: [0, 1, 1, 0] },
  squash: { label: '压扁（det = 0）', m: [1, 0.5, 0.8, 0.4] },
}

// 矩阵 [a b; c d]：e1 ↦ (a,c)，e2 ↦ (b,d)
const a = ref(0.707)
const b = ref(-0.707)
const c = ref(0.707)
const d = ref(0.707)
const t = ref(100) // 变形进度 %
const preset = ref('rotate')

watch(preset, (k) => {
  ;[a.value, b.value, c.value, d.value] = PRESETS[k].m
  t.value = 100
})

const det = computed(() => a.value * d.value - b.value * c.value)

// 插值矩阵 M(t) = (1−t)I + tM，让变形连续可见
const mt = computed(() => {
  const s = t.value / 100
  return [1 + (a.value - 1) * s, b.value * s, c.value * s, 1 + (d.value - 1) * s]
})

function apply([A, B, Cc, D], x, y) {
  return [A * x + B * y, Cc * x + D * y]
}

const canvas = ref(null)
usePlot(
  canvas,
  (ctx, w, h) => {
    const v = makeSquareView(w, h, 2.6)
    const M = mt.value

    // 原网格（淡）
    ctx.save()
    ctx.strokeStyle = C.grid
    ctx.lineWidth = 1
    for (let i = -6; i <= 6; i++) {
      ctx.beginPath()
      ctx.moveTo(v.X(i), v.pad.t)
      ctx.lineTo(v.X(i), v.pad.t + v.ih)
      ctx.moveTo(v.pad.l, v.Y(i))
      ctx.lineTo(v.pad.l + v.iw, v.Y(i))
      ctx.stroke()
    }
    ctx.restore()

    // 变换后的网格
    ctx.save()
    ctx.beginPath()
    ctx.rect(v.pad.l, v.pad.t, v.iw, v.ih)
    ctx.clip()
    ctx.strokeStyle = 'rgba(51, 81, 143, 0.45)'
    ctx.lineWidth = 1.2
    const R = 6
    for (let i = -R; i <= R; i++) {
      ctx.beginPath()
      let first = true
      for (let s = -R; s <= R; s += 0.25) {
        const [x, y] = apply(M, i, s)
        first ? ctx.moveTo(v.X(x), v.Y(y)) : ctx.lineTo(v.X(x), v.Y(y))
        first = false
      }
      ctx.stroke()
      ctx.beginPath()
      first = true
      for (let s = -R; s <= R; s += 0.25) {
        const [x, y] = apply(M, s, i)
        first ? ctx.moveTo(v.X(x), v.Y(y)) : ctx.lineTo(v.X(x), v.Y(y))
        first = false
      }
      ctx.stroke()
    }

    // 单位方格的像（着色，看面积如何被缩放）
    const p00 = apply(M, 0, 0)
    const p10 = apply(M, 1, 0)
    const p11 = apply(M, 1, 1)
    const p01 = apply(M, 0, 1)
    ctx.beginPath()
    ctx.moveTo(v.X(p00[0]), v.Y(p00[1]))
    ctx.lineTo(v.X(p10[0]), v.Y(p10[1]))
    ctx.lineTo(v.X(p11[0]), v.Y(p11[1]))
    ctx.lineTo(v.X(p01[0]), v.Y(p01[1]))
    ctx.closePath()
    ctx.fillStyle = C.accentSoft
    ctx.fill()
    ctx.restore()

    // 基向量的像
    drawArrow(ctx, v, 0, 0, M[0], M[2], { color: C.accent, width: 3 })
    drawArrow(ctx, v, 0, 0, M[1], M[3], { color: C.gold, width: 3 })
    drawLabel(ctx, v.X(M[0]) + 8, v.Y(M[2]) - 6, 'e₁ 的去向 = 第一列', { color: C.accent })
    drawLabel(ctx, v.X(M[1]) + 8, v.Y(M[3]) - 6, 'e₂ 的去向 = 第二列', { color: C.gold })
  },
  { height: 360, watchSources: [a, b, c, d, t] },
)
</script>

<template>
  <DemoFrame title="矩阵 = 整张平面的变形指令">
    <canvas ref="canvas" class="demo-canvas"></canvas>
    <template #controls>
      <label class="ctrl">
        <span class="ctrl-label">预设变换</span>
        <select v-model="preset" class="ctrl-select">
          <option v-for="(p, k) in PRESETS" :key="k" :value="k">{{ p.label }}</option>
        </select>
      </label>
      <ControlSlider label="变形进度 %" v-model="t" :min="0" :max="100" :step="1" />
      <ControlSlider label="a（e₁ 去向的 x）" v-model="a" :min="-2" :max="2" :step="0.1" />
      <ControlSlider label="c（e₁ 去向的 y）" v-model="c" :min="-2" :max="2" :step="0.1" />
      <ControlSlider label="b（e₂ 去向的 x）" v-model="b" :min="-2" :max="2" :step="0.1" />
      <ControlSlider label="d（e₂ 去向的 y）" v-model="d" :min="-2" :max="2" :step="0.1" />
    </template>
    <template #readout>
      矩阵 <code>［{{ fmt(a, 1) }} {{ fmt(b, 1) }}；{{ fmt(c, 1) }} {{ fmt(d, 1) }}］</code>
      &nbsp;&nbsp;det = <b>{{ fmt(det) }}</b>（红色方格的面积倍率）
      <span v-if="Math.abs(det) < 0.05">&nbsp;—— 整张平面被压扁成一条线！</span>
    </template>
    <template #note>
      先选预设、把"变形进度"从 0 拖到 100，看整张网格如何连续变形：直线始终是直线、原点不动、
      平行线保持平行——这就是"线性"三个字的全部含义。矩阵的两列毫不神秘：
      <b>第一列就是 e₁=(1,0) 变到哪，第二列就是 e₂=(0,1) 变到哪</b>。知道两个基向量的去向，
      整张平面的命运就定了。再玩"压扁"预设：det → 0 时二维被拍成一维，上一讲的"奇异"在这里是一场肉眼可见的降维打击。
    </template>
  </DemoFrame>
</template>
