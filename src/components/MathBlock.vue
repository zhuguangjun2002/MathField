<script setup>
import { computed } from 'vue'
import katex from 'katex'

const props = defineProps({ tex: { type: String, required: true } })

const html = computed(() =>
  katex.renderToString(props.tex, { throwOnError: false, displayMode: true }),
)
</script>

<template>
  <div class="math-block" v-html="html" />
</template>
