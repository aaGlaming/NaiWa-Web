<script setup>
defineProps({
  colorIndex: { type: Number, default: 0 },
  size: { type: String, default: 'md' },
  shape: { type: String, default: 'square' },
  animation: { type: String, default: 'float' },
  top: String,
  left: String,
  right: String,
  bottom: String,
  emoji: String
})
</script>

<template>
  <!-- Decorative color blocks removed in editorial system -->
  <span class="sr-only" aria-hidden="true" />
</template>
