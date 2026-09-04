<script setup>
defineProps({
  colorIndex: { type: Number, default: 0 },
  rotate: { type: Boolean, default: false },
  offset: { type: Boolean, default: false },
  pattern: { type: String, default: '' }
})
</script>

<template>
  <div class="relative border-t border-ink/15 py-8 md:py-10">
    <slot />
  </div>
</template>
