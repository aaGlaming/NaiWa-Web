<script setup>
import { ref, onMounted } from 'vue'

const baseUrl = import.meta.env.BASE_URL || '/'
const history = ref([])

const rarityConfig = {
  N: { label: '普通', color: '#4CAF50' },
  R: { label: '稀有', color: '#2196F3' },
  SR: { label: '史诗', color: '#9C27B0' },
  SSR: { label: '传说', color: '#FFD700' }
}

function loadHistory() {
  try {
    const saved = localStorage.getItem('naiwa_draw_history')
    if (saved) {
      history.value = JSON.parse(saved)
    }
  } catch (e) {
    console.error('Failed to load history:', e)
  }
}

function clearHistory() {
  history.value = []
  localStorage.removeItem('naiwa_draw_history')
}

function formatTime(timestamp) {
  const date = new Date(timestamp)
  return `${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`
}

onMounted(() => {
  loadHistory()
})
</script>

<template>
  <div class="p-6  border-4 border-black bg-[#C4B5FD]/80"
    style="box-shadow: 6px 6px 0 #FF3AF2, 12px 12px 0 #00F5D4;">
    <div class="flex items-center justify-between mb-4">
      <h3 class="font-heading text-xl font-bold text-[#FFD93D] uppercase">📋 抽卡记录</h3>
      <button
        v-if="history.length > 0"
        @click="clearHistory"
        class="text-sm text-black/50 hover:text-[#FFD93D] transition-colors"
      >
        清空记录
      </button>
    </div>

    <div v-if="history.length === 0" class="text-center py-8 text-black/40">
      <p class="text-4xl mb-2">🎰</p>
      <p>还没有抽卡记录</p>
    </div>

    <div v-else class="space-y-2 max-h-64 overflow-y-auto">
      <div
        v-for="(record, index) in history.slice().reverse()"
        :key="index"
        class="flex items-center gap-3 p-3 rounded-xl bg-[#FFFDF5]/50 border border-black"
      >
        <img
          :src="`${baseUrl}images/${record.image}`"
          :alt="record.image"
          class="w-10 h-10 rounded-lg object-cover"
        />
        <div class="flex-1 min-w-0">
          <p class="text-black/80 text-sm truncate">{{ record.image }}</p>
          <p class="text-black/40 text-xs">{{ formatTime(record.timestamp) }}</p>
        </div>
        <span
          class="px-2 py-1 rounded-full text-xs font-bold"
          :style="{
            color: rarityConfig[record.rarity].color,
            backgroundColor: rarityConfig[record.rarity].color + '20',
            border: `1px solid ${rarityConfig[record.rarity].color}40`
          }"
        >
          {{ rarityConfig[record.rarity].label }}
        </span>
      </div>
    </div>
  </div>
</template>
