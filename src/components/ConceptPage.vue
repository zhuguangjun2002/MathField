<script setup>
import { computed } from 'vue'
import { calculusConcepts, conceptNeighbors } from '../data/courses.js'

const props = defineProps({ slug: { type: String, required: true } })

const info = computed(() => calculusConcepts.find((c) => c.slug === props.slug))
const nav = computed(() => conceptNeighbors(props.slug))
const index = computed(() => calculusConcepts.findIndex((c) => c.slug === props.slug) + 1)
</script>

<template>
  <article class="page">
    <header class="concept-header">
      <div class="concept-eyebrow">微积分 · 第 {{ index }} 讲</div>
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
      <router-link v-if="nav.prev" :to="nav.prev.path" class="nav-prev">
        <div class="nav-dir">← 上一讲</div>
        <div class="nav-title">{{ nav.prev.title }}</div>
      </router-link>
      <router-link v-else to="/calculus" class="nav-prev">
        <div class="nav-dir">← 返回</div>
        <div class="nav-title">微积分总览</div>
      </router-link>
      <router-link v-if="nav.next" :to="nav.next.path" class="nav-next">
        <div class="nav-dir">下一讲 →</div>
        <div class="nav-title">{{ nav.next.title }}</div>
      </router-link>
    </nav>
  </article>
</template>
