<script setup>
import { useUserStore } from '@/stores/user'

const props = defineProps({
  filename: { type: String, required: true },
  size: { type: String, default: 'md' }
})

const user = useUserStore()

const sizeClass = {
  sm: 'w-8 h-8 text-sm',
  md: 'w-10 h-10 text-base',
  lg: 'w-12 h-12 text-xl'
}
</script>

<template>
  <button
    type="button"
    class="border-4 border-black font-black transition-all duration-100 shadow-neo-sm hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none"
    :class="[
      sizeClass[size],
      user.isFavorite(filename) ? 'bg-[#FF6B6B] text-white' : 'bg-white text-black'
    ]"
    :title="user.isFavorite(filename) ? '取消收藏' : '收藏'"
    @click.stop="user.toggleFavorite(filename)"
  >
    {{ user.isFavorite(filename) ? '💖' : '🤍' }}
  </button>
</template>
