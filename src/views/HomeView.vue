<script setup>
import { courses } from '../data/courses.js'
</script>

<template>
  <div class="page-wide">
    <section class="hero">
      <h1>把每个数学概念的<em>来龙去脉</em>讲清楚</h1>
      <p class="hero-sub">
        会做题，却总觉得概念懵懵懂懂？那是因为教科书把「答案」直接给了你，
        却没讲当年的数学家遇到了什么麻烦、为什么非发明这个概念不可。
        这里按「历史困境 → 为什么发明 → 动画直觉 → 严格定义 → 应用」重讲一遍。
      </p>
    </section>

    <div class="card-grid">
      <template v-for="c in courses" :key="c.slug">
        <router-link v-if="c.available" :to="c.path" class="course-card">
          <span class="card-title">{{ c.title }} <span class="tag tag-open">已上线 · {{ c.concepts.length }} 讲</span></span>
          <span class="card-sub">{{ c.subtitle }}</span>
        </router-link>
        <div v-else class="course-card disabled">
          <span class="card-title">{{ c.title }} <span class="tag tag-soon">筹备中</span></span>
          <span class="card-sub">{{ c.subtitle }}</span>
        </div>
      </template>
    </div>
  </div>
</template>
