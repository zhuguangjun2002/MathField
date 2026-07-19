<script setup>
import { calculusConcepts } from '../data/courses.js'

const timeline = [
  {
    era: '约公元前 450 年',
    title: '芝诺抛出四个悖论',
    text: '「飞矢不动」「阿基里斯追不上乌龟」——无穷第一次显露獠牙，希腊人选择绕着走。',
  },
  {
    era: '约公元前 250 年',
    title: '阿基米德的穷竭法',
    text: '用内接多边形一步步"穷竭"曲边图形，算出抛物线弓形面积——积分思想的最早雏形。',
  },
  {
    era: '1629 — 1665 年',
    title: '费马求极值，牛顿算流数',
    text: '解析几何登场后，切线和瞬时速度成了迫切问题。牛顿在瘟疫假期里发明了"流数术"。',
  },
  {
    era: '1684 年',
    title: '莱布尼茨发表微积分',
    text: '独立发明并给出沿用至今的记号 dy/dx 与 ∫。求导与求积分被基本定理焊接为一体。',
  },
  {
    era: '1734 年',
    title: '贝克莱主教的攻击',
    text: '「无穷小是消失量的幽灵！」——微积分好用但逻辑漏洞百出，第二次数学危机爆发。',
  },
  {
    era: '1821 — 1861 年',
    title: '柯西与魏尔斯特拉斯的严格化',
    text: '用 ε-δ 语言重建极限，无穷小被彻底逐出定义。你教科书上的那些定义，就是这场大扫除的成果。',
  },
]
</script>

<template>
  <div class="page">
    <header class="concept-header">
      <div class="concept-eyebrow">课程</div>
      <h1 class="concept-title">微积分</h1>
      <p class="concept-subtitle">从芝诺悖论到 ε-δ：人类驯服「无穷」的两千年</p>
    </header>

    <div class="concept-body">
      <p>
        微积分只回答两个几何问题：<strong>曲线在一点有多陡</strong>（导数），
        <strong>曲线下方围了多大面积</strong>（积分）。让它难学的从来不是这两个问题本身，
        而是回答它们必须动用「无穷」—— 无穷细分、无穷逼近。整部微积分史，
        就是人类学会与无穷安全打交道的历史。
      </p>

      <h2>两千年时间线</h2>
      <div class="timeline">
        <div v-for="t in timeline" :key="t.era" class="timeline-item">
          <div class="tl-era">{{ t.era }}</div>
          <div class="tl-title">{{ t.title }}</div>
          <div class="tl-text">{{ t.text }}</div>
        </div>
      </div>

      <h2>五讲目录</h2>
      <p>
        建议按顺序读：极限是地基，导数和积分是两座塔，基本定理是塔间的桥，泰勒展开是桥上的风景。
      </p>
      <div class="concept-list">
        <router-link v-for="(c, i) in calculusConcepts" :key="c.slug" :to="c.path" class="concept-item">
          <div class="concept-index">{{ ['一', '二', '三', '四', '五'][i] }}</div>
          <div>
            <div class="ci-title">{{ c.title }}</div>
            <div class="ci-sub">{{ c.subtitle }}</div>
            <div class="ci-q">🤔 {{ c.question }}</div>
            <div class="ci-meta">{{ c.era }} · {{ c.figures }}</div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>
