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
    if (I.norm > 1e-9) {
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
    drawLabel(ctx, v.pad.l + 10, v.pad.t + 36, '— 红：梯度（最陡上升）', { color: C.accent, size: 12 })
    drawLabel(ctx, v.pad.l + 10, v.pad.t + 54, '— 绿：你选的方向', { color: C.green, size: 12 })
    if (I.norm < 1e-9) {
      drawLabel(ctx, v.pad.l + 10, v.pad.t + 76, '梯度为零：这是个驻点', { color: C.accent, size: 13 })
    }
  },
  { height: 380, watchSources: [key, px, py, theta] },
)
</script>

<template>
  <DemoFrame title="梯度：山坡上往哪边走最陡">
    <canvas ref="canvas" class="demo-canvas"></canvas>
    <template #controls>
      <label class="ctrl">
        <span class="ctrl-label">曲面</span>
        <select v-model="key" class="ctrl-select" @change="onChange">
          <option v-for="(s, k) in SURFACES" :key="k" :value="k">{{ s.label }}</option>
        </select>
      </label>
      <ControlSlider label="站的位置 x" v-model="px" :min="-2" :max="2" :step="0.05" :display="(x) => x.toFixed(2)" />
      <ControlSlider label="站的位置 y" v-model="py" :min="-2" :max="2" :step="0.05" :display="(x) => x.toFixed(2)" />
      <ControlSlider
        label="要走的方向 θ"
        v-model="theta"
        :min="0"
        :max="360"
        :step="1"
        :display="(x) => x + '°'"
      />
    </template>
    <template #readout>
      <MathInline tex="\nabla f" /> = (<b>{{ info.gx.toFixed(3) }}</b
      >, <b>{{ info.gy.toFixed(3) }}</b
      >) · 模长 <MathInline tex="|\nabla f|" /> = <b>{{ info.norm.toFixed(4) }}</b> · 最陡方向
      <b>{{ info.best.toFixed(1) }}°</b><br />
      沿 θ = {{ theta }}° 的方向导数 = <b>{{ info.dir.toFixed(4) }}</b> ＝
      <MathInline tex="|\nabla f|\cos\varphi" />，占最大值的
      <b>{{ info.norm < 1e-9 ? '—' : ((info.dir / info.norm) * 100).toFixed(1) + '%' }}</b>
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
        （<b>一个诚实的小注</b>：读数里的梯度是<strong>解析求导</strong>算出来的，
        不是差商近似；"最陡方向"由 <MathInline tex="\arctan(f_y/f_x)" /> 给出，
        在驻点处方向没有意义，那时读数会显示 0°。）
      </p>
    </template>
  </DemoFrame>
</template>
