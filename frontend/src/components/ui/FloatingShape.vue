<script setup>
import { computed } from 'vue'

const props = defineProps({
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

const colors = ['#FF6B6B', '#FFD93D', '#C4B5FD', '#000000', '#FFFFFF']

const sizeClasses = {
  sm: 'w-6 h-6',
  md: 'w-10 h-10',
  lg: 'w-16 h-16',
  xl: 'w-24 h-24'
}

const shapeClasses = {
  circle: 'rounded-full',
  square: '',
  diamond: 'rotate-45'
}

const animClasses = {
  'float': 'animate-float',
  'spin': 'animate-spin-slow',
  'bounce': 'animate-bounce-subtle'
}

const style = computed(() => ({
  backgroundColor: colors[props.colorIndex % colors.length],
  border: '3px solid #000',
  position: 'absolute',
  top: props.top,
  left: props.left,
  right: props.right,
  bottom: props.bottom,
  zIndex: 30
}))
</script>

<template>
  <div
    :class="[sizeClasses[size], shapeClasses[shape], animClasses[animation], 'pointer-events-none']"
    :style="style"
    aria-hidden="true"
  >
    <span v-if="emoji" class="flex items-center justify-center h-full text-xl">{{ emoji }}</span>
  </div>
</template>
