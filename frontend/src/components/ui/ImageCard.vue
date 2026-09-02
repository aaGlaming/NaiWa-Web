<script setup>
import { computed, ref } from 'vue'
import { getAccentColor, formatFilename } from '@/utils'
import FavoriteButton from '@/components/FavoriteButton.vue'

const props = defineProps({
  image: { type: Object, required: true },
  colorIndex: { type: Number, default: 0 },
  index: { type: Number, default: 0 }
})

const emit = defineEmits(['preview', 'download'])
const isHovered = ref(false)

const accentColor = computed(() => getAccentColor(props.colorIndex))
const borderColor = computed(() => getAccentColor((props.colorIndex + 2) % 5))
const displayName = computed(() => formatFilename(props.image.filename))
const isAnimated = computed(() =>
  props.image.filename.endsWith('.gif') || props.image.filename.endsWith('.webp')
)

const baseUrl = import.meta.env.BASE_URL || '/'
const imageUrl = computed(() => `${baseUrl}images/${props.image.filename}`)

const categoryBadge = computed(() => {
  const map = {
    emoji: { label: '表情包', color: '#FF3AF2' },
    sticker: { label: '贴图', color: '#FFE600' },
    animation: { label: '动画', color: '#00F5D4' }
  }
  return map[props.image.category] || map.sticker
})

async function handleDownload(e) {
  e.stopPropagation()
  const imageUrl = `${import.meta.env.BASE_URL}images/${props.image.filename}`
  const fileName = props.image.filename

  // 尝试使用 File System Access API (Chrome/Edge 支持)
  if ('showSaveFilePicker' in window) {
    try {
      const response = await fetch(imageUrl)
      const blob = await response.blob()
      const handle = await window.showSaveFilePicker({
        suggestedName: fileName,
        types: [{
          description: '图片文件',
          accept: { 'image/*': ['.gif', '.png', '.jpg', '.webp'] }
        }]
      })
      const writable = await handle.createWritable()
      await writable.write(blob)
      await writable.close()
    } catch (err) {
      if (err.name !== 'AbortError') {
        // 用户取消或出错，回退到普通下载
        fallbackDownload(imageUrl, fileName)
      }
    }
  } else {
    fallbackDownload(imageUrl, fileName)
  }
}

function fallbackDownload(url, filename) {
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
</script>

<template>
  <div
    class="relative  border-4 p-4 bg-[#C4B5FD]/80 backdrop-blur-sm transition-all duration-300 cursor-pointer group"
    :style="{
      borderColor: borderColor,
      boxShadow: `6px 6px 0 ${accentColor}, 12px 12px 0 ${borderColor}`
    }"
    :class="[
      index % 2 === 1 ? 'md:translate-y-8' : '',
      'hover:scale-[1.02] hover:rotate-1 hover:shadow-multi-lg'
    ]"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
    @click="emit('preview', image)"
  >
    <!-- Category Badge -->
    <div
      class="absolute top-2 right-2 z-10 px-3 py-1 rounded-full text-xs font-heading font-bold uppercase tracking-wider border-2"
      :style="{
        backgroundColor: categoryBadge.color,
        borderColor: categoryBadge.color,
        color: '#0D0D1A'
      }"
    >
      {{ categoryBadge.label }}
    </div>

    <!-- Download Button -->
    <div class="absolute top-2 left-2 z-10 flex gap-1">
      <FavoriteButton :filename="image.filename" size="sm" />
      <button
      @click="handleDownload"
      class="absolute top-2 left-2 z-10 w-8 h-8 rounded-full border-2 bg-[#FFFDF5]/80 backdrop-blur-sm flex items-center justify-center text-sm transition-all duration-300 hover:scale-110 hover:bg-[#FF6B6B] hover:text-max-background hover:border-[#FF6B6B]"
      :style="{ borderColor: borderColor }"
      title="下载图片"
    >
      ⬇
    </button>
    </div>

    <!-- Image -->
    <div class="relative overflow-hidden  mb-4 aspect-square bg-[#FFFDF5] flex items-center justify-center">
      <img
        :src="imageUrl"
        :alt="displayName"
        class="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
        loading="lazy"
      />
      <!-- Animated Badge -->
      <div v-if="isAnimated" class="absolute bottom-2 left-2 px-2 py-1 bg-[#FFFDF5]/80 rounded-lg text-xs text-[#FF6B6B] border border-[#FF6B6B]">
        🎬 动态
      </div>
    </div>

    <!-- Info -->
    <h3 class="font-heading text-sm font-bold text-[#FF6B6B] uppercase tracking-wider truncate">
      {{ displayName }}
    </h3>
  </div>
</template>
