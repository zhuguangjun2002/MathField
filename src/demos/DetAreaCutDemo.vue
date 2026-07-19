<script setup>
import { ref, computed } from 'vue'
import { usePlot, makeView, drawArrow, drawLabel, C, fmt } from './plot.js'
import DemoFrame from '../components/DemoFrame.vue'
import ControlSlider from '../components/ControlSlider.vue'

// 固定一组好看的列向量：u = (a, c)、v = (b, d)
const a = 3
const c = 1
const b = 1
const d = 2

// 大矩形 = [0, a+b] × [0, c+d]
const W = a + b // 宽
const H = c + d // 高
const cx = W / 2
const cy = H / 2

// 边角料：2 个 (a,c) 三角形、2 个 (b,d) 三角形、2 个 b×c 长方形
// 六块恰好把「大矩形 − 平行四边形」填满
const pieces = [
  { pts: [[0, 0], [a, 0], [a, c]], color: C.gold, label: '½ac' },
  { pts: [[W, H], [b, H], [b, d]], color: C.gold, label: '½ac' },
  { pts: [[a, c], [W, c], [W, H]], color: C.indigo, label: '½bd' },
  { pts: [[b, d], [0, d], [0, 0]], color: C.indigo, label: '½bd' },
  { pts: [[a, 0], [W, 0], [W, c], [a, c]], color: C.green, label: 'b·c' },
  { pts: [[b, H], [0, H], [0, d], [b, d]], color: C.green, label: 'b·c' },
]

// 每块的外推方向（从大矩形中心指向该块重心）
for (const p of pieces) {
  const gx = p.pts.reduce((s, q) => s + q[0], 0) / p.pts.length
  const gy = p.pts.reduce((s, q) => s + q[1], 0) / p.pts.length
  const dx = gx - cx
  const dy = gy - cy
  const L = Math.hypot(dx, dy) || 1
  p.dir = [dx / L, dy / L]
  p.g = [gx, gy]
}

const softFill = (hex) => {
  // 把调色板颜色转成半透明填充
  const map = {
    [C.gold]: 'rgba(176, 125, 43, 0.18)',
    [C.indigo]: 'rgba(51, 81, 143, 0.16)',
    [C.green]: 'rgba(47, 125, 79, 0.16)',
  }
  return map[hex] || 'rgba(0,0,0,0.1)'
}

const canvas = ref(null)
const explode = ref(0) // 0 合上、1 完全拆开
const SPREAD = 1.35

const det = a * d - b * c // = ad − bc

usePlot(
  canvas,
  (ctx, w, hh) => {
    // 等比例视图，中心对准大矩形，四周留出拆解空间
    const pad = { l: 12, r: 12, t: 12, b: 12 }
    const iw = w - pad.l - pad.r
    const ih = hh - pad.t - pad.b
    const halfY = 3.4
    const halfX = halfY * (iw / ih)
    const v = makeView(w, hh, cx - halfX, cx + halfX, cy - halfY, cy + halfY, pad)

    const t = explode.value
    const off = (p) => [t * SPREAD * p.dir[0], t * SPREAD * p.dir[1]]

    // 坐标轴
    ctx.save()
    ctx.strokeStyle = '#d8d2c4'
    ctx.lineWidth = 1.2
    ctx.beginPath()
    ctx.moveTo(v.X(v.x0), v.Y(0))
    ctx.lineTo(v.X(v.x1), v.Y(0))
    ctx.moveTo(v.X(0), v.Y(v.y0))
    ctx.lineTo(v.X(0), v.Y(v.y1))
    ctx.stroke()
    ctx.restore()

    // 大矩形轮廓（虚线）
    ctx.save()
    ctx.strokeStyle = C.soft
    ctx.lineWidth = 1.4
    ctx.setLineDash([6, 5])
    ctx.strokeRect(v.X(0), v.Y(H), v.X(W) - v.X(0), v.Y(0) - v.Y(H))
    ctx.setLineDash([])
    drawLabel(ctx, v.X(0) + 6, v.Y(H) - 8, `大矩形 (a+b)(c+d) = ${W}×${H} = ${W * H}`, {
      color: C.soft,
      size: 12,
    })
    ctx.restore()

    // 六块边角料
    for (const p of pieces) {
      const [ox, oy] = off(p)
      ctx.save()
      ctx.beginPath()
      p.pts.forEach(([x, y], i) => {
        const px = v.X(x + ox)
        const py = v.Y(y + oy)
        i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py)
      })
      ctx.closePath()
      ctx.fillStyle = softFill(p.color)
      ctx.fill()
      ctx.strokeStyle = p.color
      ctx.lineWidth = 1.4
      ctx.stroke()
      ctx.restore()
      drawLabel(ctx, v.X(p.g[0] + ox), v.Y(p.g[1] + oy) + 4, p.label, {
        color: p.color,
        align: 'center',
        size: 12,
      })
    }

    // 平行四边形（始终留在原处）：O, u, u+v, v
    ctx.save()
    ctx.beginPath()
    ctx.moveTo(v.X(0), v.Y(0))
    ctx.lineTo(v.X(a), v.Y(c))
    ctx.lineTo(v.X(a + b), v.Y(c + d))
    ctx.lineTo(v.X(b), v.Y(d))
    ctx.closePath()
    ctx.fillStyle = 'rgba(178, 58, 47, 0.16)'
    ctx.fill()
    ctx.strokeStyle = C.accent
    ctx.lineWidth = 2
    ctx.stroke()
    ctx.restore()

    // 两个列向量
    drawArrow(ctx, v, 0, 0, a, c, { color: C.accent, width: 2.6 })
    drawArrow(ctx, v, 0, 0, b, d, { color: C.indigo, width: 2.6 })
    drawLabel(ctx, v.X(a) + 8, v.Y(c) + 2, `u = (${a}, ${c})`, { color: C.accent })
    drawLabel(ctx, v.X(b) - 8, v.Y(d) - 8, `v = (${b}, ${d})`, { color: C.indigo, align: 'right' })

    // 平行四边形中心的面积标注
    drawLabel(ctx, v.X((a + b) / 2), v.Y((c + d) / 2) + 5, `ad − bc = ${det}`, {
      color: C.accent,
      align: 'center',
      size: 13,
    })
  },
  { height: 420, watchSources: [explode] },
)
</script>

<template>
  <DemoFrame title="割补法：大矩形剪掉四周边角料，剩下的就是 ad − bc">
    <canvas ref="canvas" class="demo-canvas"></canvas>
    <template #controls>
      <ControlSlider
        label="拆开程度"
        v-model="explode"
        :min="0"
        :max="1"
        :step="0.01"
        :display="(x) => (x < 0.02 ? '合上' : x > 0.98 ? '完全拆开' : (x * 100).toFixed(0) + '%')"
      />
    </template>
    <template #readout>
      <b>大矩形</b> (a+b)(c+d) = {{ W }}×{{ H }} = <b>{{ W * H }}</b>
      &nbsp;−&nbsp; 两个 <span :style="{ color: '#b07d2b' }">½ac 三角形</span>（合 ac = {{ a * c }}）
      &nbsp;−&nbsp; 两个 <span :style="{ color: '#33518f' }">½bd 三角形</span>（合 bd = {{ b * d }}）
      &nbsp;−&nbsp; 两个 <span :style="{ color: '#2f7d4f' }">b×c 长方形</span>（合 2bc = {{ 2 * b * c }}）
      &nbsp;=&nbsp; <b :style="{ color: '#b23a2f' }">ad − bc = {{ det }}</b>
    </template>
    <template #note>
      拖「拆开程度」：把大矩形四周的 6 块边角料整体推出去，中间原地不动的<b>红色平行四边形</b>就是
      u = (a, c)、v = (b, d) 张成的那块。合上时六块正好严丝合缝铺满大矩形；拆开后一目了然——
      <b>平行四边形 = 大矩形 − 边角料</b>。把面积逐项相减：
      (a+b)(c+d) − ac − bd − 2bc，展开抵消后只剩 <b>ad − bc</b>。这就是行列式那个"交叉相乘再相减"的几何真身。
      （若把 v 拖到 u 的另一侧，同样割补会得到 bc − ad，即负号——那是"有向面积"，见下方演示。）
    </template>
  </DemoFrame>
</template>
