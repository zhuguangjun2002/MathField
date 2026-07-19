<script setup>
import { ref, computed } from 'vue'
import { usePlot, makeSquareView, drawLabel, C } from './plot.js'
import DemoFrame from '../components/DemoFrame.vue'
import ControlSlider from '../components/ControlSlider.vue'

const FNS = {
  square: {
    label: 'f(z) = z²（解析）',
    f: (x, y) => [x * x - y * y, 2 * x * y],
    analytic: true,
    dom: 1.15,
    scale: 2.6,
  },
  exp: {
    label: 'f(z) = eᶻ（解析）',
    f: (x, y) => [Math.exp(x) * Math.cos(y), Math.exp(x) * Math.sin(y)],
    analytic: true,
    dom: 1.15,
    scale: 3.4,
  },
  nonanalytic: {
    label: 'f(z) = z + z̄/2（不解析）',
    f: (x, y) => [x + x / 2, y - y / 2],
    analytic: false,
    dom: 1.15,
    scale: 2.2,
  },
}

const fnKey = ref('square')
const t = ref(100) // 变形进度 %

const cfg = computed(() => FNS[fnKey.value])

// 插值：(1−t)·z + t·f(z)，让变形连续可看
function morph(x, y) {
  const s = t.value / 100
  const [u, v] = cfg.value.f(x, y)
  return [x + (u - x) * s, y + (v - y) * s]
}

const canvas = ref(null)
usePlot(
  canvas,
  (ctx, w, h) => {
    const view = makeSquareView(w, h, cfg.value.scale)

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

    // 原域是 [-dom, dom]² 的网格；竖线画朱红、横线画靛蓝
    const D = cfg.value.dom
    const LINES = 9
    ctx.save()
    ctx.beginPath()
    ctx.rect(view.pad.l, view.pad.t, view.iw, view.ih)
    ctx.clip()
    ctx.lineWidth = 1.4
    for (let i = 0; i < LINES; i++) {
      const c = -D + (2 * D * i) / (LINES - 1)
      // 竖线 x = c
      ctx.strokeStyle = 'rgba(178, 58, 47, 0.55)'
      ctx.beginPath()
      let first = true
      for (let s = -D; s <= D + 1e-9; s += D / 60) {
        const [u, v] = morph(c, s)
        first ? ctx.moveTo(view.X(u), view.Y(v)) : ctx.lineTo(view.X(u), view.Y(v))
        first = false
      }
      ctx.stroke()
      // 横线 y = c
      ctx.strokeStyle = 'rgba(51, 81, 143, 0.55)'
      ctx.beginPath()
      first = true
      for (let s = -D; s <= D + 1e-9; s += D / 60) {
        const [u, v] = morph(s, c)
        first ? ctx.moveTo(view.X(u), view.Y(v)) : ctx.lineTo(view.X(u), view.Y(v))
        first = false
      }
      ctx.stroke()
    }
    ctx.restore()

    drawLabel(
      ctx,
      view.pad.l + 12,
      view.pad.t + 22,
      cfg.value.analytic ? '解析：网格弯了，但每个交叉处仍是直角' : '不解析：交叉角当场被改变',
      { color: cfg.value.analytic ? C.green : C.accent, size: 14 },
    )
  },
  { height: 380, watchSources: [fnKey, t] },
)
</script>

<template>
  <DemoFrame title="保角性：复可导的函数不敢动你的角度">
    <canvas ref="canvas" class="demo-canvas"></canvas>
    <template #controls>
      <label class="ctrl">
        <span class="ctrl-label">函数</span>
        <select v-model="fnKey" class="ctrl-select">
          <option v-for="(c, k) in FNS" :key="k" :value="k">{{ c.label }}</option>
        </select>
      </label>
      <ControlSlider label="变形进度 %" v-model="t" :min="0" :max="100" :step="1" />
    </template>
    <template #readout>
      朱红 = 原来的竖线族，靛蓝 = 原来的横线族；原图中两族处处垂直
    </template>
    <template #note>
      把进度从 0 拖到 100：z² 把网格弯成一族抛物线，eᶻ 把它弯成极坐标网——但凑近任何一个交叉点看，
      <b>红蓝两族相交处依然是标准的直角</b>，小方格只是被整体旋转、缩放成了小方格。
      这就是"保角"（conformal），解析函数的胎记：因为在每一点的局部，复可导的函数就是"乘一个复数
      f′(z)"——上一讲刚看过，乘复数 = 旋转 + 伸缩，而旋转伸缩不改变角度。
      切到 z + z̄/2（它不满足柯西-黎曼方程）：网格被横向拉宽、纵向压扁，直角当场变成钝角锐角——
      不解析的函数各方向伸缩率不一致，角度立刻失守。
    </template>
  </DemoFrame>
</template>
