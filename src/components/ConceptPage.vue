<script setup>
import { computed } from 'vue'
import { conceptContext } from '../data/courses.js'

const props = defineProps({ slug: { type: String, required: true } })

const ctx = computed(() => conceptContext(props.slug))
const info = computed(() => ctx.value.concept)
const course = computed(() => ctx.value.course)
</script>

<template>
  <article class="page">
    <header class="concept-header">
      <div class="concept-eyebrow">{{ course.title }} · 第 {{ ctx.index }} 讲</div>
      <h1 class="concept-title">{{ info.title }}</h1>
      <p class="concept-subtitle">{{ info.subtitle }}</p>
      <div class="concept-meta">
        <span>🕰 {{ info.era }}</span>
        <span>👤 {{ info.figures }}</span>
      </div>
    </header>

    <div class="concept-body">
      <slot />
    </div>

    <nav class="concept-nav">
      <router-link v-if="ctx.prev" :to="ctx.prev.path" class="nav-prev">
        <div class="nav-dir">← 上一讲</div>
        <div class="nav-title">{{ ctx.prev.title }}</div>
      </router-link>
      <router-link v-else :to="course.path" class="nav-prev">
        <div class="nav-dir">← 返回</div>
        <div class="nav-title">{{ course.title }}总览</div>
      </router-link>
      <router-link v-if="ctx.next" :to="ctx.next.path" class="nav-next">
        <div class="nav-dir">下一讲 →</div>
        <div class="nav-title">{{ ctx.next.title }}</div>
      </router-link>
    </nav>
  </article>
</template>
