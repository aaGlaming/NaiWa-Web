<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: v => ['primary', 'secondary', 'outline', 'ghost'].includes(v)
  },
  size: {
    type: String,
    default: 'md',
    validator: v => ['sm', 'md', 'lg'].includes(v)
  },
  color: {
    type: String,
    default: 'accent'
  },
  icon: String,
  disabled: Boolean,
  loading: Boolean
})

const emit = defineEmits(['click'])

const colorMap = {
  accent:     'bg-[#FF6B6B] text-white',
  secondary:  'bg-[#FFD93D] text-black',
  tertiary:   'bg-[#C4B5FD] text-black',
  quaternary: 'bg-white text-black',
  quinary:    'bg-[#FF6B6B] text-white'
}

const sizeClasses = {
  sm: 'h-10 px-5 text-xs',
  md: 'h-12 px-8 text-sm',
  lg: 'h-14 px-10 text-base'
}

const colorClass = computed(() => colorMap[props.color] || colorMap.accent)

const classes = computed(() => {
  const base = 'relative inline-flex items-center justify-center gap-2 font-heading font-bold uppercase tracking-wider border-4 border-black transition-all duration-100 cursor-pointer select-none'
  const size = sizeClasses[props.size]

  if (props.variant === 'primary') {
    return `${base} ${size} ${colorClass.value} shadow-neo-sm hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] active:translate-x-[4px] active:translate-y-[4px]`
  }
  if (props.variant === 'secondary') {
    return `${base} ${size} bg-transparent ${colorClass.value.replace('bg-', 'border-4 border-black hover:bg-').split(' ')[0]} border-black hover:shadow-neo-sm hover:translate-x-[2px] hover:translate-y-[2px] active:translate-x-[4px] active:translate-y-[4px]`
  }
  if (props.variant === 'outline') {
    return `${base} ${size} bg-white text-black shadow-neo-sm hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] active:translate-x-[4px] active:translate-y-[4px]`
  }
  // ghost
  return `${base} ${size} bg-transparent border-transparent hover:border-black hover:bg-[#FFD93D] hover:shadow-neo-sm hover:translate-x-[2px] hover:translate-y-[2px]`
})
</script>

<template>
  <button
    :class="[classes, disabled && 'opacity-50 cursor-not-allowed pointer-events-none']"
    :disabled="disabled"
    @click="emit('click', $event)"
  >
    <span v-if="loading" class="animate-spin-slow">⏳</span>
    <span v-else-if="icon">{{ icon }}</span>
    <slot />
  </button>
</template>
