<script setup>
import { computed } from 'vue'
import katex from 'katex'

// 文本里用 $...$ 包住的片段交给 KaTeX，其余原样当 HTML 输出
const props = defineProps({ text: { type: String, default: '' } })

const html = computed(() =>
  props.text.replace(/\$([^$]+)\$/g, (_, tex) =>
    katex.renderToString(tex, { throwOnError: false, displayMode: false }),
  ),
)
</script>

<template>
  <span v-html="html" />
</template>
