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
  return { X, Y, invX, x0, x1, y0, y1, pad: p, iw, ih, w, h }
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

export function fmt(x, digits = 2) {
  if (Number.isInteger(x)) return String(x)
  return x.toFixed(digits).replace(/\.?0+$/, '')
}
