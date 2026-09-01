<script setup>
import { computed } from 'vue'
import { getAccentColor } from '@/utils'

const props = defineProps({
  title: { type: String, required: true },
  subtitle: String,
  colorIndex: { type: Number, default: 0 },
  shadow: { type: String, default: 'triple', validator: v => ['single', 'double', 'triple', 'mega'].includes(v) },
  gradient: Boolean,
  emoji: String,
  align: { type: String, default: 'center' }
})

const color = computed(() => getAccentColor(props.colorIndex))

const shadowClass = computed(() => `text-shadow-${props.shadow}`)

const alignClass = computed(() => ({
  center: 'text-center',
  left: 'text-left',
  right: 'text-right'
}[props.align]))
</script>

<template>
  <div :class="['mb-18 md:mb-24', alignClass]">
    <div class="flex items-center justify-center gap-4.5 mb-6" :class="align === 'center' ? 'justify-center' : align === 'right' ? 'justify-end' : ''">
      <span v-if="emoji" class="text-4xl md:text-5xl animate-wiggle">{{ emoji }}</span>
      <h2
        class="font-heading text-4xl md:text-5xl lg:text-7xl font-black uppercase leading-none"
        :class="[shadowClass, gradient ? 'gradient-text' : '']"
        :style="gradient ? {} : { color: color }"
      >
        {{ title }}
      </h2>
      <span v-if="emoji" class="text-4xl md:text-5xl animate-float">{{ emoji }}</span>
    </div>
    <p v-if="subtitle" class="text-white/70 text-lg md:text-xl max-w-2xl mx-auto" :class="align === 'left' ? 'mx-0' : align === 'right' ? 'mx-0 ml-auto' : ''">
      {{ subtitle }}
    </p>
  </div>
</template>
