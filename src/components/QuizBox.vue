<script setup>
import { ref } from 'vue'
import RichText from './RichText.vue'
import { markQuiz, isQuizDone } from '../composables/useProgress.js'

/**
 * 选择题自测框（先想后选，沿 RevealBox 的"对答案"传统）。
 * 用法：
 *   <QuizBox quiz-id="limit-q1" question="……可含 $...$" hint="先想 30 秒再选"
 *     :options="[{ t: '选项甲', why: '点评甲' }, ...]" :answer="1" />
 * 规矩（CLAUDE.md「QuizBox 使用规范」）：
 * - 每个错误选项必须是一种真实的常见误解，why 写清"你这么选是因为把 X 当成了 Y"；
 * - 答错就地展开该项 why、不揭示正确答案、可继续选；答对记入 localStorage；
 * - quiz-id 用 <讲slug>-q1 格式，全站唯一。
 */
const props = defineProps({
  quizId: { type: String, required: true },
  question: { type: String, required: true },
  options: { type: Array, required: true }, // [{ t, why }]
  answer: { type: Number, required: true },
  hint: { type: String, default: '' },
})

// 重访已答对的题：直接摊开答案与全部点评，不制造重复做题的假成就感
const solved = ref(isQuizDone(props.quizId))
const picked = ref(solved.value ? props.options.map((_, i) => i) : [])

function pick(i) {
  if (solved.value) return
  if (!picked.value.includes(i)) picked.value = [...picked.value, i]
  if (i === props.answer) {
    solved.value = true
    markQuiz(props.quizId)
  }
}

function stateOf(i) {
  if (solved.value && i === props.answer) return 'right'
  if (picked.value.includes(i)) return i === props.answer ? 'right' : 'wrong'
  return ''
}
</script>

<template>
  <div class="quiz" :class="{ 'is-solved': solved }">
    <div class="quiz-title">✏️ 自测一下</div>
    <p class="quiz-question"><RichText :text="props.question" /></p>
    <p v-if="props.hint && !solved" class="quiz-hint">{{ props.hint }}</p>
    <div class="quiz-options">
      <div v-for="(opt, i) in props.options" :key="i" class="quiz-option" :class="stateOf(i)">
        <button
          class="quiz-btn"
          type="button"
          :disabled="solved || picked.includes(i)"
          @click="pick(i)"
        >
          <span class="quiz-mark">{{ stateOf(i) === 'right' ? '✓' : stateOf(i) === 'wrong' ? '✗' : '○' }}</span>
          <span><RichText :text="opt.t" /></span>
        </button>
        <p v-if="stateOf(i)" class="quiz-why"><RichText :text="opt.why" /></p>
      </div>
    </div>
    <p v-if="solved" class="quiz-done">已答对 ✓（答案会替你记住）</p>
  </div>
</template>
