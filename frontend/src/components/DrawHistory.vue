<script setup>
import { ref, onMounted } from 'vue'

const baseUrl = import.meta.env.BASE_URL || '/'
const history = ref([])

const rarityConfig = {
  N: { label: 'Ordinary' },
  R: { label: 'Noted' },
  SR: { label: 'Selected' },
  SSR: { label: 'Cover' }
}

function loadHistory() {
  try {
    const saved = localStorage.getItem('naiwa_draw_history')
    if (saved) history.value = JSON.parse(saved)
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
  return `${String(date.getDate()).padStart(2, '0')}.${String(date.getMonth() + 1).padStart(2, '0')}`
}

onMounted(() => loadHistory())
</script>

<template>
  <div class="border-t border-ink/15 pt-6">
    <div class="flex items-center justify-between mb-4">
      <h3 class="ed-meta">Record</h3>
      <button
        v-if="history.length > 0"
        type="button"
        class="ed-meta hover:text-accent"
        @click="clearHistory"
      >
        Clear
      </button>
    </div>

    <p v-if="history.length === 0" class="ed-meta py-8">尚无记录</p>

    <div v-else class="space-y-0 max-h-64 overflow-y-auto">
      <div
        v-for="(record, index) in history.slice().reverse()"
        :key="index"
        class="flex items-center gap-3 py-3 border-b border-ink/10"
      >
        <img
          :src="`${baseUrl}images/${record.image}`"
          :alt="record.image"
          class="w-10 h-12 object-cover bg-warm-white"
        />
        <div class="flex-1 min-w-0">
          <p class="text-sm truncate">{{ record.image }}</p>
          <p class="ed-meta">{{ formatTime(record.timestamp) }}</p>
        </div>
        <span class="ed-meta text-accent">{{ rarityConfig[record.rarity]?.label }}</span>
      </div>
    </div>
  </div>
</template>
