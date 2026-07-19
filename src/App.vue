<script setup>
import { useRoute } from 'vue-router'
import { courses } from './data/courses.js'
const route = useRoute()
const openCourses = courses.filter((c) => c.available)
</script>

<template>
  <div class="app-shell">
    <header class="site-header">
      <router-link to="/" class="site-brand">
        <span class="brand-mark">∫</span>
        <span class="brand-text">数学的来龙去脉</span>
      </router-link>
      <nav class="site-nav">
        <router-link to="/" :class="{ active: route.path === '/' }">首页</router-link>
        <router-link
          v-for="c in openCourses"
          :key="c.slug"
          :to="c.path"
          :class="{ active: route.path.startsWith(c.path) }"
        >{{ c.title }}</router-link>
      </nav>
    </header>
    <main class="site-main">
      <router-view />
    </main>
    <footer class="site-footer">
      <p>概念不是从天上掉下来的 —— 每一个定义背后，都有一段人类挣扎的历史。</p>
    </footer>
  </div>
</template>
