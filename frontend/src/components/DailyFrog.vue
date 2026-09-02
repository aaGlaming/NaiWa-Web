<script setup>
import { computed, onMounted, ref } from 'vue'
import { useImageStore } from '@/stores/images'
import { getDailyQuote, getDailyImageIndex } from '@/data/quotes'
import FavoriteButton from '@/components/FavoriteButton.vue'
import MaximalButton from '@/components/ui/MaximalButton.vue'
import { useRouter } from 'vue-router'
import { shareContent } from '@/utils/share'

const store = useImageStore()
const router = useRouter()
const baseUrl = import.meta.env.BASE_URL || './'
const shareTip = ref('')

const quote = getDailyQuote()

const dailyImage = computed(() => {
  if (!store.images.length) return null
  const idx = getDailyImageIndex(store.images.length)
  return store.images[idx]
})

async function shareDaily() {
  if (!dailyImage.value) return
  const result = await shareContent({
    title: '今日奶蛙',
    text: `「${quote}」—— 今日奶蛙`,
    url: `${location.origin}${location.pathname}#/`
  })
  shareTip.value = result === 'copied' ? '已复制分享内容' : result === 'shared' ? '分享成功' : ''
}

onMounted(() => store.fetchImages())
</script>

<template>
  <section class="relative py-24 px-6 bg-[#C4B5FD] border-y-8 border-black">
    <div class="max-w-4xl mx-auto border-8 border-black bg-white p-8 md:p-12 shadow-neo">
      <div class="text-center mb-8">
        <span class="inline-block px-4 py-1 bg-[#FFD93D] border-4 border-black font-heading font-black uppercase text-sm shadow-neo-sm mb-4">
          📅 今日奶蛙
        </span>
        <p class="font-heading text-2xl md:text-3xl font-black leading-snug">「{{ quote }}」</p>
      </div>

      <div v-if="dailyImage" class="flex flex-col md:flex-row items-center gap-8">
        <div class="relative w-48 h-48 md:w-56 md:h-56 border-4 border-black bg-black flex items-center justify-center shrink-0">
          <img
            :src="`${baseUrl}images/${dailyImage.filename}`"
            :alt="dailyImage.filename"
            class="max-w-full max-h-full object-contain"
            loading="lazy"
            decoding="async"
          />
          <div class="absolute top-2 right-2">
            <FavoriteButton :filename="dailyImage.filename" size="sm" />
          </div>
        </div>
        <div class="text-center md:text-left flex-1">
          <p class="font-bold text-black/60 mb-2">今日专属奶蛙</p>
          <p class="font-heading font-black text-xl mb-6 break-all">{{ dailyImage.filename }}</p>
          <div class="flex flex-wrap gap-3 justify-center md:justify-start">
            <MaximalButton color="accent" size="md" icon="🖼️" @click="router.push('/gallery')">浏览图库</MaximalButton>
            <MaximalButton color="secondary" size="md" icon="😂" @click="router.push('/meme')">制作梗图</MaximalButton>
            <MaximalButton color="tertiary" size="md" icon="🔗" @click="shareDaily">分享今日</MaximalButton>
          </div>
          <p v-if="shareTip" class="text-sm font-bold mt-3 text-black/60">{{ shareTip }}</p>
        </div>
      </div>
      <div v-else class="text-center py-8 font-bold">加载今日奶蛙中…</div>
    </div>
  </section>
</template>
