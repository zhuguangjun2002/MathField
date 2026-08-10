<script setup>
import { ref, computed } from 'vue'
import { usePlot, makeView, drawPoint, drawLabel, C } from './plot.js'
import DemoFrame from '../components/DemoFrame.vue'
import ControlSlider from '../components/ControlSlider.vue'
import MathInline from '../components/MathInline.vue'

// A = (0,0)，B = (1, −0.6)，重力 g = 9.8。曲线族：直线与摆线的线性插值，s = 1 恰是摆线。
const G = 9.8
const X = 1.0
const Y = 0.6

// 解出过 B 的摆线参数：(1−cosθ)/(θ−sinθ) = Y/X
const thB = (() => {
  const f = (t) => (1 - Math.cos(t)) / (t - Math.sin(t)) - Y / X
  let lo = 0.1
  let hi = 2 * Math.PI - 1e-6
  for (let i = 0; i < 200; i++) {
    const m = (lo + hi) / 2
    f(lo) * f(m) <= 0 ? (hi = m) : (lo = m)
  }
  return (lo + hi) / 2
})()
const A_ = X / (thB - Math.sin(thB))
const T_CYCLOID = thB * Math.sqrt(A_ / G) // 摆线的精确用时

const s = ref(0)

// 用摆线的参数 θ 来走这一族曲线：这样起点处的奇性天然被消掉，数值积分才准
const P = (sv, th) => {
  const x = A_ * (th - Math.sin(th))
  const yc = -A_ * (1 - Math.cos(th))
  const yl = (-Y * x) / X
  return [x, (1 - sv) * yl + sv * yc]
}

// 若曲线中途高过起点，小球从静止根本上不去——这一档物理上无效，必须报出来而不是偷偷跳过
function pathRises(sv, N = 800) {
  for (let i = 0; i <= N; i++) if (P(sv, (thB * i) / N)[1] > 1e-12) return true
  return false
}

function slideTime(sv, N = 1500) {
  let T = 0
  for (let i = 0; i < N; i++) {
    const t1 = (thB * i) / N
    const t2 = (thB * (i + 1)) / N
    const a = P(sv, t1)
    const b = P(sv, t2)
    const m = P(sv, (t1 + t2) / 2)
    const ds = Math.hypot(b[0] - a[0], b[1] - a[1])
    const drop = -m[1]
    if (drop <= 0) continue
    T += ds / Math.sqrt(2 * G * drop)
  }
  return T
}

const invalid = computed(() => pathRises(s.value))
const T = computed(() => slideTime(s.value))
const worse = computed(() => (T.value / T_CYCLOID - 1) * 100)
// 摆线那一档算出来是 −1e−7 量级，直接显示会变成刺眼的 "−0.000%"
const worseText = computed(() => (Math.abs(worse.value) < 5e-4 ? '0.000' : worse.value.toFixed(3)))

const canvas = ref(null)
usePlot(
  canvas,
  (ctx, w, hh) => {
    const v = makeView(w, hh, -0.08, 1.12, -0.95, 0.12)
    // 参考：直线与摆线
    const drawCurve = (sv, color, width, dash) => {
      ctx.save()
      ctx.strokeStyle = color
      ctx.lineWidth = width
      ctx.setLineDash(dash)
      ctx.beginPath()
      for (let i = 0; i <= 400; i++) {
        const p = P(sv, (thB * i) / 400)
        i ? ctx.lineTo(v.X(p[0]), v.Y(p[1])) : ctx.moveTo(v.X(p[0]), v.Y(p[1]))
      }
      ctx.stroke()
      ctx.restore()
    }
    drawCurve(0, 'rgba(120,110,95,0.55)', 1.4, [6, 4])
    drawCurve(1, 'rgba(58,140,92,0.75)', 1.6, [5, 4])
    drawCurve(s.value, C.accent, 2.8, [])

    drawPoint(ctx, v, 0, 0, { color: C.ink, r: 5 })
    drawPoint(ctx, v, X, -Y, { color: C.ink, r: 5 })
    drawLabel(ctx, v.X(0) + 8, v.Y(0) - 8, 'A（起点，静止释放）', { color: C.ink, size: 12 })
    drawLabel(ctx, v.X(X) - 6, v.Y(-Y) + 18, 'B（终点）', { color: C.ink, align: 'right', size: 12 })
    // 图例放左下角空白处：左上角被起点标注和三条曲线占着，压上去会糊成一团
    const legendY = v.pad.t + v.ih
    drawLabel(ctx, v.pad.l + 8, legendY - 46, '- - 灰：直线（s = 0）', { color: C.soft, size: 12 })
    drawLabel(ctx, v.pad.l + 8, legendY - 28, '- - 绿：摆线（s = 1）', { color: 'rgba(58,140,92,0.95)', size: 12 })
    drawLabel(ctx, v.pad.l + 8, legendY - 10, '— 红：当前这条', { color: C.accent, size: 12 })
  },
  { height: 340, watchSources: [s] },
)
</script>

<template>
  <DemoFrame title="最速降线：从 A 滑到 B，哪条滑道最快">
    <canvas ref="canvas" class="demo-canvas"></canvas>
    <template #controls>
      <ControlSlider
        label="曲线形状 s（0 = 直线，1 = 摆线）"
        v-model="s"
        :min="0"
        :max="1.8"
        :step="0.05"
        :display="(x) => x.toFixed(2)"
      />
    </template>
    <template #readout>
      <template v-if="invalid">这条路径中途<b>高过起点</b>，静止释放的小球根本上不去——本档无效</template>
      <template v-else>
        下滑用时 T(s) = <b>{{ T.toFixed(6) }}</b> 秒 · 摆线的理论最优 =
        <b>{{ T_CYCLOID.toFixed(6) }}</b> 秒<br />
        比最优慢 <b>{{ worseText }}%</b>
        <span v-if="Math.abs(s - 1) < 1e-9">——此刻就是摆线本身</span>
      </template>
    </template>
    <template #note>
      <p>
        <b>这个动画在演什么</b>：小球从 A <strong>静止释放</strong>，沿一条光滑无摩擦的滑道滑到
        B（<MathInline tex="A=(0,0)" />、<MathInline tex="B=(1,\,-0.6)" />，
        <MathInline tex="g=9.8" />）。<strong>问哪条滑道用时最短</strong>。
        直觉说"两点之间直线最短"，可这里要的不是路程最短，而是<strong>时间最短</strong>——
        <strong>先陡下去能换来更大的速度</strong>，值不值得绕这个远，只能算。
      </p>
      <p>
        <b>一个旋钮</b>：<b>形状 s</b>。这一族曲线是"直线"与"摆线"的<strong>线性混合</strong>：
        <MathInline tex="s=0" /> 是直线（灰虚线），<MathInline tex="s=1" /> 恰好是摆线（绿虚线），
        中间是过渡，<MathInline tex="s>1" /> 则是"矫枉过正"。红色是当前这条。
      </p>
      <p>
        <b>照着做一遍（一）：直线确实不是最快的。</b>把 s 停在 <b>0.00</b>：
        用时 <b>0.680146</b> 秒。拖到 <b>1.00</b>（摆线）：<b>0.566432</b> 秒。
        <strong>快了 20.08%</strong>——省下的这十分之一秒多，全靠"先陡后缓"换来的速度。
        （直线那一档可以手算对账：沿斜面匀加速，
        <MathInline tex="T=\sqrt{2L^2/(gY)}=0.680136" /> 秒，
        与读数差 1e−5，是数值积分的余量。）
      </p>
      <p>
        <b>照着做一遍（二）：最优点附近是平的。</b>把 s 依次停在
        <b>0.75 / 0.90 / 1.00 / 1.10 / 1.25</b>，用时是
        <b>0.569167 / 0.566836 / 0.566432 / 0.566801 / 0.568606</b>——
        <strong>s 偏离 10%，用时只多 0.07%</strong>。
        这正是<router-link to="/calculus/extremum">极值那一讲</router-link>那条
        "驻点附近一阶项消失、代价从二阶起算"，
        <strong>只不过这一次的"自变量"是一整条曲线</strong>。
      </p>
      <p>
        <b>照着做一遍（三）：过了头也变慢。</b>把 s 拖到 <b>1.80</b>（比摆线还往下探）：
        <b>0.584945</b> 秒，比摆线慢 <b>3.27%</b>。
        <strong>所以 s = 1 是个真正的极小，不是量程的端点</strong>——两侧都往上走。
        （滑杆下限设在 0 是有原因的：<MathInline tex="s<0" /> 时曲线会
        <strong>在中途高过起点</strong>，静止释放的小球根本爬不上去，
        那种路径在物理上不存在。读数区遇到这种情形会直接报"本档无效"，
        而不是偷偷把那几段跳过去。）
      </p>
      <p>
        （<b>一个诚实的小注</b>：起点处小球速度为零，被积函数
        <MathInline tex="1/\sqrt{2g\,(-y)}" /> 在那里发散。
        程序不是按 x 等分求和的——那样算出来会偏小 1% 以上；
        而是<strong>按摆线的参数 θ 等分</strong>，起点的奇性正好被
        <MathInline tex="\mathrm{d}s \propto \theta^2\mathrm{d}\theta" /> 抵消。
        这样 <MathInline tex="s=1" /> 处的数值结果与解析值
        <MathInline tex="T=\theta_B\sqrt{a/g}" /> 在小数点后六位上一致。）
      </p>
    </template>
  </DemoFrame>
</template>
