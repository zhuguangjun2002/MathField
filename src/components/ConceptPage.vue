<script setup>
import { computed, onMounted, onBeforeUnmount, ref, watch } from 'vue'
import { conceptContext, conceptBySlug } from '../data/courses.js'
import { markRead, isRead, touchVisit } from '../composables/useProgress.js'
import RichText from './RichText.vue'

const props = defineProps({ slug: { type: String, required: true } })

const ctx = computed(() => conceptContext(props.slug))
const info = computed(() => ctx.value.concept)
const course = computed(() => ctx.value.course)

/** 先修讲：slug 引用解析成 { path, title, why, read } */
const prereqs = computed(() =>
  (info.value.prereqs || [])
    .map((p) => {
      const c = conceptBySlug(p.slug)
      return c ? { path: c.path, title: c.title, why: p.why, read: isRead(c.slug) } : null
    })
    .filter(Boolean)
)

// 进度：进页面记"最近读到"；滚到讲末导航即算读完（IntersectionObserver，30 讲共用此处一份实现）
const navEl = ref(null)
let observer = null

function observeEnd() {
  if (observer) observer.disconnect()
  if (!navEl.value || typeof IntersectionObserver === 'undefined') return
  observer = new IntersectionObserver(
    (entries) => {
      if (entries.some((e) => e.isIntersecting)) markRead(props.slug)
    },
    { threshold: 0.5 }
  )
  observer.observe(navEl.value)
}

onMounted(() => {
  touchVisit(props.slug)
  observeEnd()
})
watch(() => props.slug, (s) => {
  touchVisit(s)
  observeEnd()
})
onBeforeUnmount(() => {
  if (observer) observer.disconnect()
})
</script>

<template>
  <article class="page">
    <header class="concept-header">
      <div class="concept-eyebrow">{{ course.title }} · 第 {{ ctx.index }} 讲</div>
      <h1 class="concept-title">{{ info.title }}</h1>
      <p class="concept-subtitle"><RichText :text="info.subtitle" /></p>
      <div class="concept-meta">
        <span>🕰 {{ info.era }}</span>
        <span>👤 {{ info.figures }}</span>
        <span v-if="isRead(info.slug)" class="meta-read">✓ 已读完</span>
      </div>
      <div v-if="prereqs.length" class="prereq-bar">
        🧭 开始前你需要会：
        <span v-for="(p, i) in prereqs" :key="p.path" class="prereq-item">
          <router-link :to="p.path">{{ p.title }}</router-link><span v-if="p.read" class="prereq-read">✓</span>（{{ p.why }}）<span v-if="i < prereqs.length - 1">、</span>
        </span>
      </div>
      <div v-else-if="info.baseline" class="prereq-bar">
        🧭 零基础可读 · 只需<RichText :text="info.baseline" />
      </div>
    </header>

    <div class="concept-body">
      <slot />
    </div>

    <nav class="concept-nav" ref="navEl">
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
