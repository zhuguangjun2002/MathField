import { reactive } from 'vue'
import { conceptContext } from '../data/courses.js'

/**
 * 全站阅读进度，localStorage 单 key 存储。
 * 读写全包 try/catch：隐私模式 / 无 localStorage 时静默降级为「本次会话内存态」。
 * "读完"判定在 ConceptPage 里做（IntersectionObserver 看到讲末导航），此处只管存取。
 */
const KEY = 'mathfield-progress'

function load() {
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) {
      const d = JSON.parse(raw)
      if (d && d.v === 1 && d.read && d.quiz) return d
    }
  } catch (e) {
    /* 忽略：降级为内存态 */
  }
  return { v: 1, read: {}, quiz: {}, last: null }
}

const state = reactive(load())

function save() {
  try {
    localStorage.setItem(KEY, JSON.stringify(state))
  } catch (e) {
    /* 忽略 */
  }
}

/** 讲末打点：首次读完记时间戳 */
export function markRead(slug) {
  if (!state.read[slug]) {
    state.read[slug] = Date.now()
    save()
  }
}

export function isRead(slug) {
  return Boolean(state.read[slug])
}

/** 进入一讲时记录"最近读到哪"，供首页「继续上次」 */
export function touchVisit(slug) {
  state.last = { slug, t: Date.now() }
  save()
}

export function markQuiz(quizId) {
  if (!state.quiz[quizId]) {
    state.quiz[quizId] = true
    save()
  }
}

export function isQuizDone(quizId) {
  return Boolean(state.quiz[quizId])
}

/** 一门课读完几讲 -> { done, total } */
export function courseProgress(course) {
  const total = course.concepts ? course.concepts.length : 0
  const done = course.concepts ? course.concepts.filter((c) => isRead(c.slug)).length : 0
  return { done, total }
}

/** 最近访问的讲 -> conceptContext 结果（含 course/concept/index），没有则 null */
export function lastVisited() {
  if (!state.last || !state.last.slug) return null
  return conceptContext(state.last.slug)
}
