import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  { path: '/', component: () => import('./views/HomeView.vue') },
  { path: '/calculus', component: () => import('./views/CourseView.vue') },
  { path: '/calculus/limit', component: () => import('./views/concepts/LimitView.vue') },
  { path: '/calculus/derivative', component: () => import('./views/concepts/DerivativeView.vue') },
  { path: '/calculus/integral', component: () => import('./views/concepts/IntegralView.vue') },
  { path: '/calculus/ftc', component: () => import('./views/concepts/FTCView.vue') },
  { path: '/calculus/taylor', component: () => import('./views/concepts/TaylorView.vue') },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    return { top: 0 }
  },
})

export default router
