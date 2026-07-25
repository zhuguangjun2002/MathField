<script setup>
import { ref } from 'vue'

/**
 * 先思考、后揭晓的折叠框。
 * 折叠时只露出标题 + 一句思考提示，读者自己想过一轮再点开看推导。
 * 用法：<RevealBox title="🔍 ……" hint="先自己想想：……" label="展开推导"> 内容 </RevealBox>
 * hint 里要写公式时改用 #hint 具名插槽（可放 MathInline）。
 */
const props = defineProps({
  title: { type: String, required: true },
  hint: { type: String, default: '' },
  label: { type: String, default: '展开推导' },
  closeLabel: { type: String, default: '收起' },
})

const open = ref(false)
</script>

<template>
  <div class="reveal" :class="{ 'is-open': open }">
    <div class="reveal-title">{{ props.title }}</div>
    <p v-if="props.hint || $slots.hint" class="reveal-hint">
      <slot name="hint">{{ props.hint }}</slot>
    </p>
    <div v-show="open" class="reveal-body">
      <slot />
    </div>
    <button
      class="reveal-btn"
      type="button"
      :aria-expanded="open ? 'true' : 'false'"
      @click="open = !open"
    >
      {{ open ? props.closeLabel : props.label }}
    </button>
  </div>
</template>
