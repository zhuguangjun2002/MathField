<script setup>
import { ref, computed } from 'vue'
import { usePlot, drawLabel, C, fmt } from './plot.js'
import DemoFrame from '../components/DemoFrame.vue'
import ControlSlider from '../components/ControlSlider.vue'

const prevalence = ref(10) // 患病率，‰
const sens = ref(90) // 灵敏度：患病者中检出阳性的比例 %
const fpr = ref(9) // 误报率：健康者中误判阳性的比例 %

const counts = computed(() => {
  const D = Math.round(1000 * (prevalence.value / 1000))
  const H = 1000 - D
  const TP = Math.round(D * (sens.value / 100))
  const FN = D - TP
  const FP = Math.round(H * (fpr.value / 100))
  const TN = H - FP
  return { D, H, TP, FN, FP, TN }
})

const posterior = computed(() => {
  const { TP, FP } = counts.value
  return TP + FP === 0 ? 0 : TP / (TP + FP)
})

const COLORS = {
  TP: '#b23a2f', // 患病且阳性
  FN: 'rgba(178, 58, 47, 0.35)', // 患病但漏检
  FP: '#b07d2b', // 健康却误报阳性
  TN: '#e4e0d3', // 健康且阴性
}

const canvas = ref(null)
usePlot(
  canvas,
  (ctx, w, h) => {
    const cols = 50
    const rows = 20
    const padT = 26
    const padB = 30
    const cell = Math.min((w - 24) / cols, (h - padT - padB) / rows)
    const ox = (w - cell * cols) / 2
    const oy = padT

    const { TP, FN, FP } = counts.value
    // 排队顺序：真阳 → 漏检 → 误报 → 健康阴性，逐行填充
    const colorOf = (i) => (i < TP ? COLORS.TP : i < TP + FN ? COLORS.FN : i < TP + FN + FP ? COLORS.FP : COLORS.TN)

    for (let i = 0; i < 1000; i++) {
      const r = Math.floor(i / cols)
      const c = i % cols
      ctx.fillStyle = colorOf(i)
      ctx.fillRect(ox + c * cell + 0.5, oy + r * cell + 0.5, cell - 1, cell - 1)
    }

    // 圈出全部"阳性"人群（前 TP+FN 之后的 FP 与 TP 不相邻，改为下划线标注区域边界）
    drawLabel(ctx, ox, 16, `1000 个人一字排开：`, { color: C.soft, size: 12 })
    drawLabel(ctx, ox + 96, 16, `■ 患病·检出`, { color: COLORS.TP, size: 12 })
    drawLabel(ctx, ox + 176, 16, `■ 患病·漏检`, { color: 'rgba(178,58,47,0.55)', size: 12 })
    drawLabel(ctx, ox + 256, 16, `■ 健康·误报`, { color: COLORS.FP, size: 12 })
    drawLabel(ctx, ox + 336, 16, `■ 健康·阴性`, { color: '#a49e8f', size: 12 })
    drawLabel(
      ctx,
      w / 2,
      h - 10,
      `拿到"阳性"报告的共 ${TP + FP} 人：深红 ${TP} 人真患病，金色 ${FP} 人是虚惊`,
      { color: C.ink, align: 'center', size: 13 },
    )
  },
  { height: 330, watchSources: [prevalence, sens, fpr] },
)
</script>

<template>
  <DemoFrame title="贝叶斯：阳性报告到底该多慌">
    <canvas ref="canvas" class="demo-canvas"></canvas>
    <template #controls>
      <ControlSlider label="患病率 ‰" v-model="prevalence" :min="1" :max="200" :step="1" />
      <ControlSlider label="灵敏度 %（患病者检出率）" v-model="sens" :min="50" :max="100" :step="1" />
      <ControlSlider label="误报率 %（健康者误判率）" v-model="fpr" :min="1" :max="20" :step="1" />
    </template>
    <template #readout>
      阳性者中真正患病的比例：P(患病 | 阳性) = {{ counts.TP }} / ({{ counts.TP }} + {{ counts.FP }}) =
      <b style="color: #b23a2f">{{ fmt(posterior * 100, 1) }}%</b>
    </template>
    <template #note>
      <b>三个旋钮，分别由三方说了算，缺一不可。</b>
      <b>患病率 ‰</b>（千分之几）由<b>流行病学</b>决定——这批人里本来有多少病人，
      跟检测好不好毫无关系；它就是贝叶斯公式里的<b>先验</b>。
      <b>灵敏度 %</b> 由<b>实验室</b>决定——真病人里能被查出来的比例。
      <b>误报率 %</b> 也是实验室的指标——健康人里被冤枉的比例。
      图上永远是 1000 个小方块（一格一人）：深红 = 真阳性、金色 = 假阳性、浅色 = 阴性，
      读数区那个百分比就是深红占"深红 + 金色"的份额。
      <br /><br />
      默认参数下（患病率 1%、灵敏度 90%、误报率 9%）：阳性报告在手，真患病的概率竟只有约一成。
      原因一眼可见——<b>健康人基数太大</b>，9% 的误报率乘上 990 个健康人，产出的金色"虚惊者"
      远多于深红的真病人。这就是贝叶斯公式的全部内容：把"检测多准"（P(阳|病)）倒转成"阳了多险"（P(病|阳)），
      必须用患病率加权。把患病率滑杆拉高到 200‰（比如高危人群复查），同一份检测的含金量立刻大变——
      <b>证据的意义取决于先验</b>。医生让你"别慌，再查一次"，背后就是这张图。
      <br /><br />
      <b>照着做一遍</b>（三组配置，粗体是读数区会显示的数，都已核对过）：
      ① 只把患病率拖到 <b>200‰</b>（高危人群复查）——含金量从 9.2% 跳到
      <b>71.4%</b>，同一份检测换一群人就换了个意义；
      ② 患病率拨回 10‰，把误报率从 9% 压到 <b>1%</b>——升到 <b>47.4%</b>；
      ③ 保持默认，只把灵敏度从 90% 拉满到 <b>100%</b>——只升到 <b>10.1%</b>，
      看着"零漏诊"很美，读数却几乎不动。
      <b>② 和 ③ 对照着看最有价值</b>：压低误报率的效果远大于提高灵敏度，
      因为灵敏度拉满也只能让分子从 9 变成 10，而分母里那 89 个被冤枉的健康人纹丝不动。
      <b>筛查系统真正的瓶颈在假阳性，不在漏诊</b>——这也是为什么大规模普查往往先做一道
      便宜的初筛、再对阳性者做一道昂贵的复查：第一道的作用不是下结论，是把先验抬上去。
    </template>
  </DemoFrame>
</template>
