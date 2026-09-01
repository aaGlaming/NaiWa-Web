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
  accent:    { bg: 'bg-max-accent', border: 'border-max-accent', text: 'text-max-background', hover: 'hover:bg-max-secondary hover:border-max-secondary' },
  secondary: { bg: 'bg-max-secondary', border: 'border-max-secondary', text: 'text-white', hover: 'hover:bg-max-accent hover:border-max-accent' },
  tertiary:  { bg: 'bg-max-tertiary', border: 'border-max-tertiary', text: 'text-max-background', hover: 'hover:bg-max-quaternary hover:border-max-quaternary' },
  quaternary:{ bg: 'bg-max-quaternary', border: 'border-max-quaternary', text: 'text-white', hover: 'hover:bg-max-quinary hover:border-max-quinary' },
  quinary:   { bg: 'bg-max-quinary', border: 'border-max-quinary', text: 'text-white', hover: 'hover:bg-max-accent hover:border-max-accent' }
}

const sizeClasses = {
  sm: 'h-10 px-6 text-sm',
  md: 'h-14 px-10 text-base',
  lg: 'h-16 px-12 text-lg'
}

const colors = computed(() => colorMap[props.color] || colorMap.accent)

const classes = computed(() => {
  const base = 'relative inline-flex items-center justify-center gap-2 font-heading font-bold uppercase tracking-widest rounded-full border-4 transition-all duration-300 cursor-pointer select-none'
  const size = sizeClasses[props.size]

  if (props.variant === 'primary') {
    return `${base} ${size} ${colors.value.bg} ${colors.value.border} ${colors.value.text} ${colors.value.hover} hover:scale-110 active:scale-95 shadow-multi hover:shadow-multi-lg`
  }
  if (props.variant === 'secondary') {
    return `${base} ${size} bg-transparent ${colors.value.border} ${colors.value.text} border-dashed ${colors.value.hover} hover:scale-105 hover:border-solid active:scale-95`
  }
  if (props.variant === 'outline') {
    return `${base} ${size} bg-max-muted/50 ${colors.value.border} ${colors.value.text} ${colors.value.hover} hover:scale-105 active:scale-95 shadow-multi hover:shadow-multi-lg`
  }
  // ghost
  return `${base} ${size} bg-transparent border-transparent ${colors.value.text} hover:bg-max-muted/30 hover:border-max-muted hover:scale-105`
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
