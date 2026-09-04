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

const sizeClasses = {
  sm: 'text-[11px] py-2 px-4',
  md: 'text-xs py-3 px-6',
  lg: 'text-sm py-3.5 px-8'
}

const classes = computed(() => {
  const base = 'inline-flex items-center justify-center gap-2 font-body tracking-[0.12em] uppercase cursor-pointer select-none transition-colors duration-200 disabled:opacity-40 disabled:pointer-events-none rounded-none'
  const size = sizeClasses[props.size]

  if (props.variant === 'ghost' || props.variant === 'secondary') {
    return `${base} ${size} bg-transparent text-ink border-0 hover:text-accent`
  }
  if (props.variant === 'outline') {
    return `${base} ${size} bg-transparent text-ink border border-ink/20 hover:border-accent hover:text-accent`
  }
  return `${base} ${size} bg-ink text-paper hover:bg-accent`
})
</script>

<template>
  <button
    :class="classes"
    :disabled="disabled || loading"
    @click="emit('click', $event)"
  >
    <span v-if="loading">…</span>
    <slot />
    <span v-if="!loading && variant !== 'primary'" aria-hidden="true">→</span>
  </button>
</template>
