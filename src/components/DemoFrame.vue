<script setup>
defineProps({
  title: { type: String, required: true },
})
</script>

<template>
  <figure class="demo-frame">
    <div class="demo-head">
      <span class="demo-badge">动手玩</span>
      <span class="demo-title">{{ title }}</span>
    </div>
    <div class="demo-body">
      <slot />
    </div>
    <div class="demo-controls" v-if="$slots.controls">
      <slot name="controls" />
    </div>
    <div class="demo-readout" v-if="$slots.readout">
      <slot name="readout" />
    </div>
    <figcaption class="demo-note" v-if="$slots.note">
      <slot name="note" />
    </figcaption>
  </figure>
</template>
