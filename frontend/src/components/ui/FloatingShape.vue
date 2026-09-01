<script setup>
import { computed } from 'vue'
import { getAccentColor } from '@/utils'

const props = defineProps({
  colorIndex: { type: Number, default: 0 },
  size: { type: String, default: 'md' },
  shape: { type: String, default: 'circle', validator: v => ['circle', 'square', 'diamond'].includes(v) },
  animation: { type: String, default: 'float', validator: v => ['float', 'float-reverse', 'wiggle', 'bounce', 'spin'].includes(v) },
  top: String,
  left: String,
  right: String,
  bottom: String,
  emoji: String
})

const color = computed(() => getAccentColor(props.colorIndex))

const sizeClasses = {
  sm: 'w-6 h-6',
  md: 'w-10 h-10',
  lg: 'w-16 h-16',
  xl: 'w-24 h-24'
}

const shapeClasses = {
  circle: 'rounded-full',
  square: 'rounded-xl',
  diamond: 'rounded-xl rotate-45'
}

const animClasses = {
  'float': 'animate-float',
  'float-reverse': 'animate-float-reverse',
  'wiggle': 'animate-wiggle',
  'bounce': 'animate-bounce-subtle',
  'spin': 'animate-spin-slow'
}

const style = computed(() => ({
  backgroundColor: color.value,
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
    :class="[sizeClasses[size], shapeClasses[shape], animClasses[animation], 'opacity-50 pointer-events-none']"
    :style="style"
    aria-hidden="true"
  >
    <span v-if="emoji" class="flex items-center justify-center h-full text-2xl">{{ emoji }}</span>
  </div>
</template>
