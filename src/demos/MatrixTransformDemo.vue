<script setup>
import { ref, computed, watch } from 'vue'
import { usePlot, makeSquareView, drawArrow, drawLabel, C, fmt } from './plot.js'
import DemoFrame from '../components/DemoFrame.vue'
import ControlSlider from '../components/ControlSlider.vue'
import MathInline from '../components/MathInline.vue'

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
      <ControlSlider label="变形进度 %（只是动画）" v-model="t" :min="0" :max="100" :step="1" />
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
      <p><b>六个控件分成三类</b></p>
      <ul>
        <li>
          <b>预设变换</b>（下拉）：一键把下面四个数填成五种典型变换之一
          （顺带把变形进度拨回 100%）。它<strong>只是四个滑杆的快捷方式</strong>，
          没有别的作用。
        </li>
        <li>
          <b>变形进度 %</b>：<strong>纯粹是动画进度，不是任何数学参数。</strong>
          它在单位矩阵 <MathInline tex="I" /> 和目标矩阵 <MathInline tex="M" /> 之间做线性插值
          （画的是 <MathInline tex="(1-s)I + sM" />，<MathInline tex="s" /> 就是这个百分比），
          好让你看清"从不动到变形"的连续过程。
          <strong>0% 是什么都没做，100% 才是读数区那个矩阵。</strong>
          注意读数区显示的 det 始终是<em>目标矩阵</em>的，不随这个滑杆变。
        </li>
        <li>
          <b>a、c、b、d 四个滑杆</b>：<strong>这才是真参数</strong>，直接就是矩阵的四个元素。
          按名片法则，<MathInline tex="(a, c)" /> 是 <MathInline tex="\boldsymbol{e}_1" /> 的去向
          （第一列），<MathInline tex="(b, d)" /> 是 <MathInline tex="\boldsymbol{e}_2" /> 的去向
          （第二列）。取值范围 −2 到 2，步长 0.1。
        </li>
      </ul>
      <p>
        <b>图上画的是什么</b>：灰色细线是原来的网格，靛蓝线是变形后的网格；
        <span style="color: #b23a2f"><b>红箭头</b></span>是
        <MathInline tex="\boldsymbol{e}_1" /> 的去向（第一列），
        <span style="color: #b07d2b"><b>金箭头</b></span>是
        <MathInline tex="\boldsymbol{e}_2" /> 的去向（第二列）；
        淡红色的那一小块是单位正方形被变成的平行四边形，
        正是<router-link to="/linear-algebra/determinant">上一讲</router-link>那块有向面积
        （<strong>变形进度拖满 100% 时</strong>，它的面积才等于读数区那个
        <MathInline tex="|\det|" />；中途画的是插值矩阵，面积也在路上）。
      </p>
      <p>
        <b>照着做一遍（一）：线性到底是什么意思。</b>选任意一个预设，
        把变形进度从 0 慢慢拖到 100，盯住三件事——<strong>直线始终是直线</strong>
        （从不弯曲）、<strong>原点始终不动</strong>、<strong>平行线始终平行</strong>
        （网格永远是平行四边形网格，不会变成梯形）。
        这三条就是"线性"两个字的全部可见内容；正文第肆节那两条公理，说的就是它们。
      </p>
      <p>
        <b>照着做一遍（二）：两列各管什么。</b>把预设选成"伸缩"
        （<MathInline tex="a=1.6,\ b=0,\ c=0,\ d=0.6" />，det = 0.96），
        然后<strong>只拖 a</strong>：横向被拉伸而竖向纹丝不动。再<strong>只拖 d</strong>：
        反过来。最后拖 c——横轴那根箭头开始翘起来，网格被"推倒"，
        这就是剪切。<strong>四个数各管一件事，而且分得干干净净。</strong>
      </p>
      <p>
        <b>照着做一遍（三）：降维打击。</b>选"压扁（det = 0）"预设
        （<MathInline tex="a=1,\ b=0.5,\ c=0.8,\ d=0.4" />）。这四个数不是随便凑的——
        <MathInline tex="\det = 1\times 0.4 - 0.5\times 0.8 = 0" /> 恰好为零，
        因为第二列正好是第一列的 0.5 倍。把变形进度拖到 100：
        <strong>整张二维网格被拍成一条直线</strong>，读数区弹出"压扁成一条线"的提示。
        <router-link to="/linear-algebra/determinant">上一讲</router-link>说的"奇异"，
        在这里是一场肉眼可见的降维打击；而
        <router-link to="/linear-algebra/elimination">第一讲</router-link>那个解不出来的方程组，
        坏就坏在系数矩阵干的正是这件事——
        <strong>信息在压扁的一瞬间被永久丢掉了，再也倒不回去</strong>。
      </p>
      <p>
        （想手工造一个压扁的矩阵？让两列成比例即可，比如
        <MathInline tex="a=2,\ c=1" /> 配 <MathInline tex="b=-2,\ d=-1" />，
        det 立刻归零。滑杆步长 0.1，很容易凑准。）
      </p>
    </template>
  </DemoFrame>
</template>
