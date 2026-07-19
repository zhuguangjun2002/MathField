<script setup>
const props = defineProps({
  label: { type: String, required: true },
  modelValue: { type: Number, required: true },
  min: { type: Number, required: true },
  max: { type: Number, required: true },
  step: { type: Number, default: 1 },
  display: { type: Function, default: null },
})

const emit = defineEmits(['update:modelValue'])

function onInput(e) {
  emit('update:modelValue', Number(e.target.value))
}
</script>

<template>
  <label class="ctrl">
    <span class="ctrl-label">{{ label }}</span>
    <input type="range" :min="min" :max="max" :step="step" :value="modelValue" @input="onInput" />
    <span class="ctrl-value">{{ display ? display(modelValue) : modelValue }}</span>
  </label>
</template>
