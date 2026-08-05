<script setup>
import { ref, computed } from 'vue'
import { usePlot, makeView, drawArrow, drawLabel, C, fmt } from './plot.js'
import DemoFrame from '../components/DemoFrame.vue'
import ControlSlider from '../components/ControlSlider.vue'
import MathInline from '../components/MathInline.vue'

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
        label="拆开程度（只是动画进度）"
        v-model="explode"
        :min="0"
        :max="1"
        :step="0.01"
        :display="(x) => (x < 0.02 ? '合上' : x > 0.98 ? '完全拆开' : (x * 100).toFixed(0) + '%')"
      />
    </template>
    <template #readout>
      <b>大矩形</b> (a+b)(c+d) = {{ W }}×{{ H }} = <b>{{ W * H }}</b><br />
      &nbsp;−&nbsp; <span :style="{ color: '#b07d2b' }">½ac 三角形</span>×2 = {{ a * c }}
      &nbsp;−&nbsp; <span :style="{ color: '#33518f' }">½bd 三角形</span>×2 = {{ b * d }}
      &nbsp;−&nbsp; <span :style="{ color: '#2f7d4f' }">b×c 长方形</span>×2 = {{ 2 * b * c }}
      &nbsp;=&nbsp; <b :style="{ color: '#b23a2f' }">ad − bc = {{ det }}</b>
    </template>
    <template #note>
      <p><b>唯一的旋钮是什么</b></p>
      <ul>
        <li>
          <b>拆开程度</b>：把六块边角料从大矩形里整体推出去多远。
          <strong>它不是任何数学参数，纯粹是动画进度</strong>——
          拖到哪一档，面积都一分不变，读数区那一行数字自始至终不动。
          它存在的唯一目的是让你看清"哪六块"。
        </li>
      </ul>
      <p>
        <b>这张图的 a、b、c、d 是写死的</b>：取
        <MathInline tex="\boldsymbol{u} = (a,c) = (3,1)" />、
        <MathInline tex="\boldsymbol{v} = (b,d) = (1,2)" />（图上没有改它们的旋钮，
        想自己换数请用下一个动画，那个可以直接拖箭头）。于是大矩形是
        <MathInline tex="4\times 3 = 12" />，而
        <MathInline tex="\det = ad - bc = 3\cdot 2 - 1\cdot 1 = 5" />。
      </p>
      <p>
        <b>六块分别是</b>：两个金色直角三角形（直角边 a 与 c，各
        <MathInline tex="\tfrac12 ac = 1.5" />）、两个靛蓝直角三角形（直角边 b 与 d，各
        <MathInline tex="\tfrac12 bd = 1" />）、两个绿色长方形（<MathInline tex="b\times c = 1" />）。
        合计 <MathInline tex="1.5\times 2 + 1\times 2 + 1\times 2 = 7" />，
        而 <MathInline tex="12 - 7 = 5" />——正是中间那块红色平行四边形。
      </p>
      <p>
        <b>照着做一遍</b>：先停在"合上"，确认六块加红色平行四边形<strong>严丝合缝铺满</strong>大矩形，
        没有重叠也没有空隙；再拖到"完全拆开"，六块飞出去，中间那块<strong>原地不动</strong>。
        <strong>平行四边形 = 大矩形 − 边角料</strong>，逐项相减
        <MathInline tex="(a+b)(c+d) - ac - bd - 2bc" />，展开抵消后只剩
        <MathInline tex="ad - bc" />。这就是行列式那个"交叉相乘再相减"的几何真身。
      </p>
      <p>
        （若把 <MathInline tex="\boldsymbol{v}" /> 拖到 <MathInline tex="\boldsymbol{u}" /> 的另一侧，
        同样的割补会得到 <MathInline tex="bc - ad" />，即负号——那是"有向面积"，
        下一个动画可以亲手试。）
      </p>
    </template>
  </DemoFrame>
</template>
