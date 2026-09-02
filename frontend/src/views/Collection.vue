<script setup>
import { ref, computed, onMounted } from 'vue'
import { useImageStore } from '@/stores/images'
import { useUserStore } from '@/stores/user'
import { usePageMeta } from '@/composables/usePageMeta'
import SectionTitle from '@/components/ui/SectionTitle.vue'
import FavoriteButton from '@/components/FavoriteButton.vue'
import FloatingShape from '@/components/ui/FloatingShape.vue'

usePageMeta()

const store = useImageStore()
const user = useUserStore()
const baseUrl = import.meta.env.BASE_URL || './'
const activeTab = ref('favorites')

const favoriteImages = computed(() =>
  user.favorites.map(f => store.getByFilename(f)).filter(Boolean)
)

const collectionImages = computed(() =>
  user.collection.map(f => store.getByFilename(f)).filter(Boolean)
)

const displayImages = computed(() =>
  activeTab.value === 'favorites' ? favoriteImages.value : collectionImages.value
)

onMounted(() => store.fetchImages())
</script>

<template>
  <div>
    <section class="relative min-h-[40vh] flex items-center justify-center px-6 py-24 overflow-hidden">
      <FloatingShape :colorIndex="1" size="lg" shape="diamond" animation="float" top="12%" right="8%" />
      <div class="relative z-10 text-center">
        <div class="text-8xl mb-6">📚</div>
        <h1 class="font-heading text-5xl md:text-7xl font-black uppercase text-[#FFD93D]">我的图鉴</h1>
        <p class="mt-4 font-bold">收藏 · 抽卡图鉴 · 成就徽章</p>
      </div>
    </section>

    <section class="px-6 pb-6">
      <div class="max-w-5xl mx-auto flex flex-wrap justify-center gap-3">
        <button
          v-for="t in [
            { id: 'favorites', label: '💖 收藏夹', count: user.favorites.length },
            { id: 'collection', label: '🎴 抽卡图鉴', count: user.collection.length },
            { id: 'achievements', label: '🏆 成就', count: user.unlocked.length }
          ]"
          :key="t.id"
          class="px-5 py-2 border-4 border-black font-heading font-black uppercase text-sm shadow-neo-sm transition-all"
          :class="activeTab === t.id ? 'bg-[#FF6B6B] text-white translate-x-[2px] translate-y-[2px] shadow-none' : 'bg-[#FFD93D]'"
          @click="activeTab = t.id"
        >
          {{ t.label }} ({{ t.count }})
        </button>
      </div>
    </section>

    <section v-if="activeTab !== 'achievements'" class="py-12 px-6 max-w-6xl mx-auto">
      <div v-if="displayImages.length === 0" class="text-center py-20 border-4 border-black bg-white shadow-neo">
        <div class="text-6xl mb-4">🐸</div>
        <p class="font-bold text-xl">
          {{ activeTab === 'favorites' ? '还没有收藏，去图片库点 🤍 吧' : '还没有解锁，去抽卡试试运气' }}
        </p>
      </div>
      <div v-else class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        <div
          v-for="img in displayImages"
          :key="img.filename"
          class="border-4 border-black bg-white p-3 shadow-neo-sm relative"
        >
          <div class="absolute top-2 right-2 z-10">
            <FavoriteButton :filename="img.filename" size="sm" />
          </div>
          <div class="aspect-square bg-black flex items-center justify-center mb-2">
            <img :src="`${baseUrl}images/${img.filename}`" :alt="img.filename" class="max-w-full max-h-full object-contain" />
          </div>
          <p class="text-xs font-bold truncate">{{ img.filename }}</p>
        </div>
      </div>
    </section>

    <section v-else class="py-12 px-6 max-w-4xl mx-auto">
      <SectionTitle title="成就徽章" subtitle="解锁全部成为奶蛙大师" :colorIndex="0" emoji="🏆" />
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
        <div
          v-for="ach in user.achievementProgress"
          :key="ach.id"
          class="border-4 border-black p-5 flex items-center gap-4 transition-all"
          :class="ach.unlocked ? 'bg-[#FFD93D] shadow-neo' : 'bg-white opacity-60 shadow-neo-sm'"
        >
          <span class="text-4xl" :class="ach.unlocked ? '' : 'grayscale'">{{ ach.icon }}</span>
          <div>
            <p class="font-heading font-black uppercase">{{ ach.title }}</p>
            <p class="text-sm font-bold text-black/70">{{ ach.desc }}</p>
            <p v-if="ach.unlocked" class="text-xs font-black text-[#FF6B6B] mt-1">✓ 已解锁</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
