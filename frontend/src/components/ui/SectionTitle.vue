<script setup>
defineProps({
  title: { type: String, required: true },
  subtitle: String,
  colorIndex: { type: Number, default: 0 },
  shadow: { type: String, default: 'triple' },
  gradient: Boolean,
  emoji: String,
  align: { type: String, default: 'left' },
  index: { type: String, default: '' }
})
</script>

<template>
  <header :class="['mb-12 md:mb-16', align === 'center' ? 'text-center' : align === 'right' ? 'text-right' : 'text-left']">
    <p v-if="index || emoji" class="ed-meta mb-4">
      <span v-if="index" class="ed-num mr-2">{{ index }}</span>
      {{ subtitle || '' }}
    </p>
    <p v-else-if="subtitle" class="ed-meta mb-4">{{ subtitle }}</p>
    <hr class="ed-rule mb-6" />
    <h2 class="font-display text-4xl md:text-5xl lg:text-6xl leading-[0.95]">
      {{ title }}
    </h2>
  </header>
</template>
