<script setup>
import { computed } from 'vue'
import { courses, courseBySlug } from '../data/courses.js'
import { courseProgress, lastVisited } from '../composables/useProgress.js'

const stages = [
  { name: '地基', note: '从这里开始：先学会和「无穷」打交道，后面每门课都说它的语言' },
  { name: '主干', note: '两条并行的干道——一条管方程与空间，一条管运气' },
  { name: '进阶', note: '把微积分搬进复数世界；把公式失效的题真的算出来' },
  { name: '收官', note: '琴弦、热量与引力场：前面所有课埋的伏笔在这里兑现' },
]

const grouped = computed(() =>
  stages
    .map((s) => ({
      ...s,
      courses: courses
        .filter((c) => c.stage === s.name)
        .sort((a, b) => (a.order || 99) - (b.order || 99)),
    }))
    .filter((s) => s.courses.length)
)

const last = computed(() => lastVisited())

function prereqNames(c) {
  return (c.prereqCourses || [])
    .map((slug) => courseBySlug(slug))
    .filter(Boolean)
    .map((x) => x.title)
    .join('、')
}
</script>

<template>
  <div class="page-wide">
    <section class="hero">
      <h1>把每个数学概念的<em>来龙去脉</em>讲清楚</h1>
      <p class="hero-sub">
        <strong>不需要你先学过任何一门大学数学课。</strong>每个符号第一次出现都会交代它怎么读、从哪来；
        每个概念都从当年数学家撞上的那个具体麻烦讲起——因为教科书把「答案」直接给了你，
        却没讲他们为什么非发明它不可。这里按「历史困境 → 为什么发明 → 亲手动画 → 严格定义 → 应用」从零讲一遍。
      </p>
      <router-link v-if="last" :to="last.concept.path" class="resume-link">
        ▶ 继续上次：{{ last.course.title }} · 第 {{ last.index }} 讲「{{ last.concept.title }}」
      </router-link>
    </section>

    <div class="path">
      <section v-for="(s, si) in grouped" :key="s.name" class="path-stage">
        <div class="stage-head">
          <span class="stage-no">{{ si + 1 }}</span>
          <div>
            <div class="stage-name">{{ s.name }}</div>
            <div class="stage-note">{{ s.note }}</div>
          </div>
        </div>
        <div class="card-grid">
          <template v-for="c in s.courses" :key="c.slug">
            <router-link v-if="c.available" :to="c.path" class="course-card">
              <span class="card-title">
                {{ c.title }}
                <span class="tag tag-open" v-if="courseProgress(c).done === courseProgress(c).total">✓ 全部读完</span>
                <span class="tag tag-open" v-else-if="courseProgress(c).done > 0">已读 {{ courseProgress(c).done }}/{{ courseProgress(c).total }} 讲</span>
                <span class="tag tag-open" v-else>{{ c.concepts.length }} 讲</span>
              </span>
              <span class="card-sub">{{ c.subtitle }}</span>
              <span class="card-foot">
                <span class="card-difficulty" :title="'难度 ' + (c.difficulty || 1) + '/3'">
                  <span v-for="d in 3" :key="d" class="dot" :class="{ on: d <= (c.difficulty || 1) }"></span>
                </span>
                <span v-if="prereqNames(c)" class="card-prereq">先修：{{ prereqNames(c) }}</span>
                <span v-else class="card-prereq">零基础可读</span>
              </span>
            </router-link>
            <div v-else class="course-card disabled">
              <span class="card-title">{{ c.title }} <span class="tag tag-soon">筹备中</span></span>
              <span class="card-sub">{{ c.subtitle }}</span>
            </div>
          </template>
        </div>
        <div v-if="si < grouped.length - 1" class="stage-arrow">↓</div>
      </section>
    </div>
  </div>
</template>
