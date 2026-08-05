<script setup>
import { ref, computed } from 'vue'
import { usePlot, makeSquareView, drawArrow, drawLabel, C, fmt } from './plot.js'
import DemoFrame from '../components/DemoFrame.vue'
import ControlSlider from '../components/ControlSlider.vue'
import MathInline from '../components/MathInline.vue'

const alpha = ref(35) // v2 与 v1 的夹角（度）
const beta = ref(40) // v3 抬离 xy 平面的角度（度）
const phi = ref(28) // 观察方位角（度）

const rad = (deg) => (deg * Math.PI) / 180

const v1 = computed(() => [2, 0, 0])
const v2 = computed(() => [2 * Math.cos(rad(alpha.value)), 2 * Math.sin(rad(alpha.value)), 0])
const v3 = computed(() => {
  // v3 的"平面内成分"取在 v1 与 v2 之间（夹角 0.8α），这样 α = 0 时三者共线、
  // 秩真能降到 1；否则 v3 永远指着别的方向，读数最低只到 2，note 里
  // "拖到 0 看直线"就成了做不到的事。
  const g = rad(0.8 * alpha.value)
  const cb = Math.cos(rad(beta.value))
  const sb = Math.sin(rad(beta.value))
  return [2 * (cb * Math.cos(g)), 2 * (cb * Math.sin(g)), 2 * sb]
})

const cross = (p, q) => [p[1] * q[2] - p[2] * q[1], p[2] * q[0] - p[0] * q[2], p[0] * q[1] - p[1] * q[0]]
const dot = (p, q) => p[0] * q[0] + p[1] * q[1] + p[2] * q[2]
const norm = (p) => Math.hypot(p[0], p[1], p[2])

const volume = computed(() => Math.abs(dot(cross(v1.value, v2.value), v3.value)))

const rank = computed(() => {
  if (volume.value > 0.12) return 3
  const pairs = [cross(v1.value, v2.value), cross(v1.value, v3.value), cross(v2.value, v3.value)]
  return pairs.some((p) => norm(p) > 0.12) ? 2 : 1
})

const rankText = { 1: '一条直线（1 维）', 2: '一张平面（2 维）', 3: '整个空间（3 维）' }

const canvas = ref(null)
usePlot(
  canvas,
  (ctx, w, h) => {
    const view = makeSquareView(w, h, 3.4)
    const cp = Math.cos(rad(phi.value))
    const sp = Math.sin(rad(phi.value))
    // 轴测投影：三维点 → 画布数学坐标
    const P = (p) => {
      const u = p[0] * cp - p[1] * sp
      const dep = p[0] * sp + p[1] * cp
      return [u, p[2] * 0.92 - dep * 0.38]
    }
    const line3 = (p, q, color, width = 1.2, dash = []) => {
      const a = P(p)
      const b = P(q)
      ctx.save()
      ctx.strokeStyle = color
      ctx.lineWidth = width
      ctx.setLineDash(dash)
      ctx.beginPath()
      ctx.moveTo(view.X(a[0]), view.Y(a[1]))
      ctx.lineTo(view.X(b[0]), view.Y(b[1]))
      ctx.stroke()
      ctx.restore()
    }

    // 张成集合（画在向量下面）
    if (rank.value === 1) {
      const d = v1.value.map((x) => x / norm(v1.value))
      line3(d.map((x) => x * -3.4), d.map((x) => x * 3.4), C.gold, 2.4, [6, 5])
    } else if (rank.value === 2) {
      // 取两个无关向量，正交化后画平面网格
      let e1 = v1.value
      let e2 = norm(cross(v1.value, v2.value)) > 0.12 ? v2.value : v3.value
      const n1 = norm(e1)
      e1 = e1.map((x) => x / n1)
      const proj = dot(e2, e1)
      e2 = e2.map((x, i) => x - proj * e1[i])
      const n2 = norm(e2)
      e2 = e2.map((x) => x / n2)
      const R = 2.6
      const corner = (s, t) => e1.map((x, i) => x * s + e2[i] * t)
      // 半透明底
      const cs = [corner(-R, -R), corner(R, -R), corner(R, R), corner(-R, R)].map(P)
      ctx.save()
      ctx.beginPath()
      cs.forEach((p, i) => (i ? ctx.lineTo(view.X(p[0]), view.Y(p[1])) : ctx.moveTo(view.X(p[0]), view.Y(p[1]))))
      ctx.closePath()
      ctx.fillStyle = 'rgba(176, 125, 43, 0.12)'
      ctx.fill()
      ctx.restore()
      for (let k = -2; k <= 2; k++) {
        const t = (k / 2) * R
        line3(corner(-R, t), corner(R, t), 'rgba(176, 125, 43, 0.5)', 1)
        line3(corner(t, -R), corner(t, R), 'rgba(176, 125, 43, 0.5)', 1)
      }
    }

    // 坐标轴
    line3([-3, 0, 0], [3, 0, 0], '#c9c3b6', 1.2)
    line3([0, -3, 0], [0, 3, 0], '#c9c3b6', 1.2)
    line3([0, 0, -1.6], [0, 0, 2.6], '#c9c3b6', 1.2)
    const lab = (p, s) => {
      const q = P(p)
      drawLabel(ctx, view.X(q[0]) + 4, view.Y(q[1]), s, { color: C.soft, size: 12 })
    }
    lab([3, 0, 0], 'x')
    lab([0, 3, 0], 'y')
    lab([0, 0, 2.6], 'z')

    // 三个向量
    const arrows = [
      [v1.value, C.ink, 'v₁'],
      [v2.value, C.accent, 'v₂'],
      [v3.value, C.indigo, 'v₃'],
    ]
    for (const [vec, color, name] of arrows) {
      const q = P(vec)
      drawArrow(ctx, view, 0, 0, q[0], q[1], { color, width: 2.8 })
      drawLabel(ctx, view.X(q[0]) + 8, view.Y(q[1]) - 4, name, { color, size: 14 })
    }

    const msg =
      rank.value === 3
        ? '张成 = 整个三维空间：任何点都是三者的线性组合'
        : rank.value === 2
          ? '三个向量困在同一张平面里 —— 线性相关！'
          : '三个向量挤在同一条直线上 —— 严重相关'
    drawLabel(ctx, view.pad.l + 12, view.pad.t + 24, msg, {
      color: rank.value === 3 ? C.green : C.accent,
      size: 14,
    })
  },
  { height: 380, watchSources: [alpha, beta, phi] },
)
</script>

<template>
  <DemoFrame title="张成空间：三个向量能「够」到哪里">
    <canvas ref="canvas" class="demo-canvas"></canvas>
    <template #controls>
      <ControlSlider label="v₂ 偏离 v₁ 的角度" v-model="alpha" :min="0" :max="90" :step="1" :display="(x) => x + '°'" />
      <ControlSlider label="v₃ 抬离平面的角度" v-model="beta" :min="0" :max="80" :step="1" :display="(x) => x + '°'" />
      <ControlSlider label="旋转观察视角（只是看的角度）" v-model="phi" :min="0" :max="360" :step="1" :display="(x) => x + '°'" />
    </template>
    <template #readout>
      张成空间维数（秩）= <b>{{ rank }}</b> —— {{ rankText[rank] }}
      &nbsp;&nbsp;平行六面体体积 |det[v₁ v₂ v₃]| = <b>{{ fmt(volume) }}</b>
    </template>
    <template #note>
      <p><b>三个旋钮分别是什么</b></p>
      <ul>
        <li>
          <b>v₂ 偏离 v₁ 的角度</b>（0–90°）：<MathInline tex="\boldsymbol{v}_1" /> 固定躺在 x 轴上，
          这个角控制 <MathInline tex="\boldsymbol{v}_2" /> 在<strong>水平面内</strong>转开多少。
          <MathInline tex="\boldsymbol{v}_3" /> 的水平分量跟着它一起转（取在两者之间），
          所以这个角为 0 时<strong>三根向量全部重合</strong>。
        </li>
        <li>
          <b>v₃ 抬离平面的角度</b>（0–80°）：把 <MathInline tex="\boldsymbol{v}_3" /> 从水平面里
          <strong>抬起来</strong>多少。只有它才能带来"第三个方向"。
        </li>
        <li>
          <b>旋转观察视角</b>（0–360°）：<strong>纯粹是摄像机方位，不改变任何向量</strong>。
          它存在的意义是让你换个角度确认"三根向量真的共面/不共面"——
          从某些方向看过去，共面的三根会骗人地显得散开。
        </li>
      </ul>
      <p>
        <b>读数区两个量</b>：<strong>秩</strong>是这三根向量能"够到"的空间维数；
        <strong>平行六面体体积</strong>就是
        <router-link to="/linear-algebra/determinant">上一讲</router-link>的
        <MathInline tex="|\det|" /> 的三维版。体积一旦为零，三根共面，秩必定小于 3。
      </p>
      <p>
        <b>照着做一遍：看两次跳变。</b>把前两个角度<strong>都拖到 0</strong>——
        三根向量叠成一根，读数是<b>一条直线（1 维）</b>。
        现在慢慢加大第一个角：<MathInline tex="\boldsymbol{v}_2" /> 一离开
        <MathInline tex="\boldsymbol{v}_1" />，读数<strong>跳</strong>到<b>一张平面（2 维）</b>，
        中间没有 1.5 维。接着加大第二个角：<MathInline tex="\boldsymbol{v}_3" /> 一抬离水平面，
        读数再<strong>跳</strong>到<b>整个空间（3 维）</b>，体积同时从 0 开始长。
        反过来把第二个角推回 0，体积精确归零，秩掉回 2。
      </p>
      <p>
        <b>"线性相关"不是抽象口诀，就是"有人没贡献新方向"</b>——
        秩只能取 1、2、3 而没有中间值，正是因为"方向"是数得清的。
      </p>
      <p>
        （<b>一个诚实的小注</b>：程序判定秩时用了 0.12 的容差，所以跳变会比理论上晚一两度——
        第一个角要拖到约 <b>2°</b> 才从 1 跳到 2，第二个角同样要约 <b>2°</b> 才从 2 跳到 3。
        这不是数学，是数值判据必须有个阈值：现实中的数据带噪声，
        "体积是不是零"从来没法用等号去问。<router-link to="/numerical/linear-system">数值分析
        第五讲</router-link>讲的就是这件事该怎么问才靠谱。）
      </p>
    </template>
  </DemoFrame>
</template>
