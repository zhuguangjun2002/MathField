import { onMounted, onBeforeUnmount, watch } from 'vue'

export const C = {
  ink: '#26232c',
  soft: '#8b8494',
  grid: '#eceade',
  accent: '#b23a2f',
  indigo: '#33518f',
  gold: '#b07d2b',
  green: '#2f7d4f',
  accentSoft: 'rgba(178, 58, 47, 0.14)',
  indigoSoft: 'rgba(51, 81, 143, 0.14)',
  greenSoft: 'rgba(47, 125, 79, 0.16)',
}

/**
 * 挂载一个自适应宽度、支持高分屏的 canvas。
 * draw(ctx, w, h) 以 CSS 像素为单位绘制；watchSources 变化时自动重绘。
 */
export function usePlot(canvasRef, draw, { height = 340, watchSources = [] } = {}) {
  let ro = null

  function render() {
    const canvas = canvasRef.value
    if (!canvas) return
    const w = canvas.clientWidth
    if (!w) return
    const dpr = window.devicePixelRatio || 1
    canvas.style.height = height + 'px'
    canvas.width = Math.round(w * dpr)
    canvas.height = Math.round(height * dpr)
    const ctx = canvas.getContext('2d')
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    ctx.clearRect(0, 0, w, height)
    draw(ctx, w, height)
  }

  onMounted(() => {
    render()
    ro = new ResizeObserver(() => render())
    if (canvasRef.value) ro.observe(canvasRef.value)
  })

  onBeforeUnmount(() => ro && ro.disconnect())

  if (watchSources.length) watch(watchSources, () => render())

  return { render }
}

/** 数学坐标 -> 画布坐标 的映射 */
export function makeView(w, h, x0, x1, y0, y1, pad = {}) {
  const p = { l: 46, r: 16, t: 16, b: 32, ...pad }
  const iw = w - p.l - p.r
  const ih = h - p.t - p.b
  const X = (x) => p.l + ((x - x0) / (x1 - x0)) * iw
  const Y = (y) => p.t + ih - ((y - y0) / (y1 - y0)) * ih
  const invX = (px) => x0 + ((px - p.l) / iw) * (x1 - x0)
  const invY = (py) => y0 + ((p.t + ih - py) / ih) * (y1 - y0)
  return { X, Y, invX, invY, x0, x1, y0, y1, pad: p, iw, ih, w, h }
}

/** 等比例视图：x、y 单位长度在屏幕上相等（几何/变换类动画必用，否则旋转会变形） */
export function makeSquareView(w, h, halfY = 2.5, { cy = 0, pad } = {}) {
  const p = { l: 12, r: 12, t: 12, b: 12, ...pad }
  const iw = w - p.l - p.r
  const ih = h - p.t - p.b
  const halfX = halfY * (iw / ih)
  return makeView(w, h, -halfX, halfX, cy - halfY, cy + halfY, p)
}

/**
 * 等比例视图，且保证把以 (cx, cy) 为心、spanX × spanY 大的数据框整个装进内框。
 * 与 makeSquareView 的区别：可以用 pad 把画布切成左右两半，做"原像 / 像"双面板，
 * 两个面板给同样的 span 就能拿到同样的像素比例，变形动画才不会看起来偷偷缩放。
 */
export function makeFitView(w, h, cx, cy, spanX, spanY, pad = {}) {
  const p = { l: 12, r: 12, t: 12, b: 12, ...pad }
  const iw = w - p.l - p.r
  const ih = h - p.t - p.b
  const s = Math.min(iw / spanX, ih / spanY) // 像素每单位
  return makeView(w, h, cx - iw / (2 * s), cx + iw / (2 * s), cy - ih / (2 * s), cy + ih / (2 * s), p)
}

/** 把后续绘制限制在视图内框里（双面板必用，否则一边的曲线会画到另一边去） */
export function clipView(ctx, v) {
  ctx.beginPath()
  ctx.rect(v.pad.l, v.pad.t, v.iw, v.ih)
  ctx.clip()
}

/** 从数学坐标 (x0,y0) 指向 (x1,y1) 的箭头 */
export function drawArrow(ctx, v, x0, y0, x1, y1, { color = C.accent, width = 2.4, head = 9 } = {}) {
  const px0 = v.X(x0)
  const py0 = v.Y(y0)
  const px1 = v.X(x1)
  const py1 = v.Y(y1)
  const ang = Math.atan2(py1 - py0, px1 - px0)
  const len = Math.hypot(px1 - px0, py1 - py0)
  if (len < 1) return
  ctx.save()
  ctx.strokeStyle = color
  ctx.fillStyle = color
  ctx.lineWidth = width
  ctx.beginPath()
  ctx.moveTo(px0, py0)
  ctx.lineTo(px1 - head * 0.6 * Math.cos(ang), py1 - head * 0.6 * Math.sin(ang))
  ctx.stroke()
  ctx.beginPath()
  ctx.moveTo(px1, py1)
  ctx.lineTo(px1 - head * Math.cos(ang - 0.42), py1 - head * Math.sin(ang - 0.42))
  ctx.lineTo(px1 - head * Math.cos(ang + 0.42), py1 - head * Math.sin(ang + 0.42))
  ctx.closePath()
  ctx.fill()
  ctx.restore()
}

export function drawAxes(ctx, v, { xTicks = [], yTicks = [], xLabel = '', yLabel = '' } = {}) {
  ctx.save()
  ctx.strokeStyle = C.grid
  ctx.lineWidth = 1
  ctx.font = '12px "SF Mono", Consolas, monospace'
  ctx.fillStyle = C.soft

  // 网格与刻度
  for (const t of xTicks) {
    const px = v.X(t)
    ctx.beginPath()
    ctx.moveTo(px, v.pad.t)
    ctx.lineTo(px, v.pad.t + v.ih)
    ctx.stroke()
    ctx.textAlign = 'center'
    ctx.fillText(fmt(t), px, v.pad.t + v.ih + 18)
  }
  for (const t of yTicks) {
    const py = v.Y(t)
    ctx.beginPath()
    ctx.moveTo(v.pad.l, py)
    ctx.lineTo(v.pad.l + v.iw, py)
    ctx.stroke()
    ctx.textAlign = 'right'
    ctx.fillText(fmt(t), v.pad.l - 8, py + 4)
  }

  // 坐标轴（若 0 在范围内画在 0 处，否则贴边）
  ctx.strokeStyle = '#b9b3a6'
  ctx.lineWidth = 1.4
  const yAxisX = v.x0 <= 0 && v.x1 >= 0 ? v.X(0) : v.pad.l
  const xAxisY = v.y0 <= 0 && v.y1 >= 0 ? v.Y(0) : v.pad.t + v.ih
  ctx.beginPath()
  ctx.moveTo(v.pad.l, xAxisY)
  ctx.lineTo(v.pad.l + v.iw, xAxisY)
  ctx.moveTo(yAxisX, v.pad.t)
  ctx.lineTo(yAxisX, v.pad.t + v.ih)
  ctx.stroke()

  if (xLabel) {
    ctx.fillStyle = C.ink
    ctx.textAlign = 'right'
    ctx.font = 'italic 13px Georgia, serif'
    ctx.fillText(xLabel, v.pad.l + v.iw - 4, xAxisY - 8)
  }
  if (yLabel) {
    ctx.fillStyle = C.ink
    ctx.textAlign = 'left'
    ctx.font = 'italic 13px Georgia, serif'
    ctx.fillText(yLabel, yAxisX + 8, v.pad.t + 12)
  }
  ctx.restore()
}

/** 绘制函数曲线，自动跳过间断/越界段 */
export function plotFn(ctx, v, f, { color = C.ink, width = 2.2, dash = [], samples = 400 } = {}) {
  ctx.save()
  ctx.beginPath()
  ctx.rect(v.pad.l, v.pad.t, v.iw, v.ih)
  ctx.clip()
  ctx.strokeStyle = color
  ctx.lineWidth = width
  ctx.setLineDash(dash)
  ctx.beginPath()
  let pen = false
  const margin = (v.y1 - v.y0) * 2
  for (let i = 0; i <= samples; i++) {
    const x = v.x0 + ((v.x1 - v.x0) * i) / samples
    const y = f(x)
    if (!Number.isFinite(y) || y < v.y0 - margin || y > v.y1 + margin) {
      pen = false
      continue
    }
    const px = v.X(x)
    const py = v.Y(y)
    if (pen) ctx.lineTo(px, py)
    else ctx.moveTo(px, py)
    pen = true
  }
  ctx.stroke()
  ctx.restore()
}

export function drawPoint(ctx, v, x, y, { color = C.accent, r = 4.5, hollow = false } = {}) {
  ctx.save()
  ctx.beginPath()
  ctx.arc(v.X(x), v.Y(y), r, 0, Math.PI * 2)
  if (hollow) {
    ctx.fillStyle = '#faf8f4'
    ctx.fill()
    ctx.strokeStyle = color
    ctx.lineWidth = 2
    ctx.stroke()
  } else {
    ctx.fillStyle = color
    ctx.fill()
  }
  ctx.restore()
}

export function drawLabel(ctx, x, y, text, { color = C.ink, align = 'left', size = 13 } = {}) {
  ctx.save()
  ctx.font = `${size}px "PingFang SC", "Noto Sans SC", sans-serif`
  ctx.fillStyle = color
  ctx.textAlign = align
  ctx.fillText(text, x, y)
  ctx.restore()
}

// marching squares 的 16 种格点情形：四角按 bit 1/2/4/8（左下、右下、右上、左上）
// 记"大于等值"，查出等值线穿过哪两条边（边 0=下 1=右 2=上 3=左）
const MS_CASES = [
  [], [[0, 3]], [[0, 1]], [[1, 3]], [[1, 2]], [[0, 1], [2, 3]], [[0, 2]], [[2, 3]],
  [[2, 3]], [[0, 2]], [[0, 3], [1, 2]], [[1, 2]], [[1, 3]], [[0, 1]], [[0, 3]], [],
]

function msEdge(e, L, va, vb, vc, vd, x, y, dx, dy) {
  if (e === 0) return [x + (dx * (L - va)) / (vb - va), y]
  if (e === 1) return [x + dx, y + (dy * (L - vb)) / (vc - vb)]
  if (e === 2) return [x + (dx * (L - vd)) / (vc - vd), y + dy]
  return [x, y + (dy * (L - va)) / (vd - va)]
}

/**
 * 等值线（marching squares）。g 是 (N+1)×(N+1) 的网格值（行优先，j 为纵向）。
 * 等值取 base + k·step 的全部层级，逐格把穿越段回调给 emit(ax, ay, bx, by)（数学坐标）。
 * 只发一小段一小段、不连成折线，是故意的：调用方可以把两个端点再经一次映射，
 * 于是同一族等值线能同时画在原平面和像平面上（茹科夫斯基 demo 靠这个）。
 * opts.skip(x, y) 返回 true 的格子跳过（挖掉物体内部或奇点邻域）；
 * 值在一格内跳变超过 opts.jump 的也跳过（辐角割线、极点）。
 */
export function contourSegments(g, N, x0, x1, y0, y1, step, emit, opts = {}) {
  const { base = 0, skip = null, jump = 6 * step } = opts
  const n1 = N + 1
  const dx = (x1 - x0) / N
  const dy = (y1 - y0) / N
  for (let j = 0; j < N; j++) {
    for (let i = 0; i < N; i++) {
      const va = g[j * n1 + i]
      const vb = g[j * n1 + i + 1]
      const vc = g[(j + 1) * n1 + i + 1]
      const vd = g[(j + 1) * n1 + i]
      if (!Number.isFinite(va + vb + vc + vd)) continue
      const lo = Math.min(va, vb, vc, vd)
      const hi = Math.max(va, vb, vc, vd)
      if (hi - lo > jump) continue
      const x = x0 + i * dx
      const y = y0 + j * dy
      if (skip && skip(x + dx / 2, y + dy / 2)) continue
      for (let k = Math.ceil((lo - base) / step); k <= Math.floor((hi - base) / step); k++) {
        const L = base + k * step
        const idx = (va > L ? 1 : 0) | (vb > L ? 2 : 0) | (vc > L ? 4 : 0) | (vd > L ? 8 : 0)
        for (const [p, q] of MS_CASES[idx]) {
          const A = msEdge(p, L, va, vb, vc, vd, x, y, dx, dy)
          const B = msEdge(q, L, va, vb, vc, vd, x, y, dx, dy)
          emit(A[0], A[1], B[0], B[1])
        }
      }
    }
  }
}

/** 在视图范围上把 f(x,y) 采成 (N+1)² 网格，喂给 contourSegments */
export function sampleGrid(f, N, x0, x1, y0, y1) {
  const g = new Float64Array((N + 1) * (N + 1))
  for (let j = 0; j <= N; j++) {
    const y = y0 + ((y1 - y0) * j) / N
    for (let i = 0; i <= N; i++) g[j * (N + 1) + i] = f(x0 + ((x1 - x0) * i) / N, y)
  }
  return g
}

/** 可复现的伪随机数生成器（mulberry32）：模拟类动画用它，保证同一 seed 重绘结果一致 */
export function rng(seed) {
  let a = seed >>> 0
  return function () {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export function fmt(x, digits = 2) {
  if (Number.isInteger(x)) return String(x)
  return x.toFixed(digits).replace(/\.?0+$/, '')
}
