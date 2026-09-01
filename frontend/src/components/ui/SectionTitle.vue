<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: { type: String, required: true },
  subtitle: String,
  colorIndex: { type: Number, default: 0 },
  shadow: { type: String, default: 'triple' },
  gradient: Boolean,
  emoji: String,
  align: { type: String, default: 'center' }
})

const titleColors = ['#FF6B6B', '#FFD93D', '#C4B5FD', '#000000', '#FFFFFF']

const titleColor = computed(() => titleColors[props.colorIndex % titleColors.length])

const alignClass = computed(() => ({
  center: 'text-center',
  left: 'text-left',
  right: 'text-right'
}[props.align]))
</script>

<template>
  <div :class="['mb-18 md:mb-24', alignClass]">
    <div class="flex items-center justify-center gap-4 mb-6" :class="align === 'center' ? 'justify-center' : align === 'right' ? 'justify-end' : ''">
      <span v-if="emoji" class="text-4xl md:text-5xl animate-bounce-subtle">{{ emoji }}</span>
      <h2
        class="font-heading text-4xl md:text-5xl lg:text-7xl font-black uppercase leading-none tracking-tight"
        :style="{ color: titleColor }"
      >
        {{ title }}
      </h2>
      <span v-if="emoji" class="text-4xl md:text-5xl animate-spin-slow">{{ emoji }}</span>
    </div>
    <div v-if="subtitle" class="flex justify-center" :class="align === 'left' ? 'justify-start' : align === 'right' ? 'justify-end' : ''">
      <p class="text-lg md:text-xl font-bold max-w-2xl border-4 border-black px-4 py-2 bg-[#FFD93D] shadow-neo-sm inline-block">
        {{ subtitle }}
      </p>
    </div>
  </div>
</template>
