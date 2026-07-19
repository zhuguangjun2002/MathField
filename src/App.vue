<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()
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
        <router-link to="/calculus" :class="{ active: route.path.startsWith('/calculus') }">微积分</router-link>
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
