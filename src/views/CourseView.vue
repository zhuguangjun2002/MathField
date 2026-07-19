<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { courseByPath, numerals } from '../data/courses.js'

const route = useRoute()
const course = computed(() => courseByPath(route.path))
</script>

<template>
  <div class="page" v-if="course">
    <header class="concept-header">
      <div class="concept-eyebrow">课程</div>
      <h1 class="concept-title">{{ course.title }}</h1>
      <p class="concept-subtitle">{{ course.subtitle }}</p>
    </header>

    <div class="concept-body">
      <p v-html="course.intro"></p>

      <h2>{{ course.timelineTitle }}</h2>
      <div class="timeline">
        <div v-for="t in course.timeline" :key="t.era" class="timeline-item">
          <div class="tl-era">{{ t.era }}</div>
          <div class="tl-title">{{ t.title }}</div>
          <div class="tl-text">{{ t.text }}</div>
        </div>
      </div>

      <h2>{{ numerals[course.concepts.length - 1] }}讲目录</h2>
      <p>{{ course.tocNote }}</p>
      <div class="concept-list">
        <router-link v-for="(c, i) in course.concepts" :key="c.slug" :to="c.path" class="concept-item">
          <div class="concept-index">{{ numerals[i] }}</div>
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
