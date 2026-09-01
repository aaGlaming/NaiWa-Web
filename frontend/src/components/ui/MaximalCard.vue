<script setup>
import { computed } from 'vue'

const props = defineProps({
  colorIndex: { type: Number, default: 0 },
  rotate: { type: Boolean, default: false },
  offset: { type: Boolean, default: false },
  pattern: { type: String, default: '' }
})

const cardColors = ['#FF6B6B', '#FFD93D', '#C4B5FD', '#000000', '#FFFFFF']

const bgColor = computed(() => {
  const color = cardColors[props.colorIndex % cardColors.length]
  return color === '#000000' ? 'bg-black text-white' :
         color === '#FFFFFF' ? 'bg-white text-black' :
         `text-black`
})

const cardClasses = computed(() => {
  const base = 'relative border-4 border-black p-8 transition-all duration-200 hover:-translate-y-2'
  const rotation = props.rotate ? 'rotate-1 hover:rotate-2' : ''
  const offsetStyle = props.offset ? '-mt-8 md:-mt-12' : ''
  const patternClass = props.pattern ? `pattern-${props.pattern}` : ''
  return `${base} ${rotation} ${offsetStyle} ${patternClass} ${bgColor.value}`
})

const cardStyle = computed(() => {
  const bgColors = ['#FF6B6B', '#FFD93D', '#C4B5FD', '#000000', '#FFFFFF']
  return {
    backgroundColor: bgColors[props.colorIndex % bgColors.length],
    boxShadow: '8px 8px 0px 0px #000'
  }
})
</script>

<template>
  <div :class="cardClasses" :style="cardStyle">
    <slot />
  </div>
</template>
