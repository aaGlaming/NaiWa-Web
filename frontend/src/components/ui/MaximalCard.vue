<script setup>
import { computed } from 'vue'
import { getAccentColor, getClashingBorder } from '@/utils'

const props = defineProps({
  colorIndex: { type: Number, default: 0 },
  rotate: { type: Boolean, default: false },
  offset: { type: Boolean, default: false },
  pattern: { type: String, default: '' }
})

const accentColor = computed(() => getAccentColor(props.colorIndex))
const borderColor = computed(() => getClashingBorder(props.colorIndex))

const cardClasses = computed(() => {
  const base = 'relative rounded-3xl border-4 p-8 bg-max-muted/80 backdrop-blur-sm transition-all duration-300'
  const rotation = props.rotate ? 'rotate-1 hover:rotate-2' : ''
  const offsetStyle = props.offset ? '-mt-8 md:-mt-12' : ''
  const patternClass = props.pattern ? `pattern-${props.pattern}` : ''
  return `${base} ${rotation} ${offsetStyle} ${patternClass}`
})

const cardStyle = computed(() => ({
  borderColor: borderColor.value,
  boxShadow: `8px 8px 0 ${accentColor.value}, 16px 16px 0 ${borderColor.value}`
}))
</script>

<template>
  <div :class="cardClasses" :style="cardStyle">
    <slot />
  </div>
</template>
