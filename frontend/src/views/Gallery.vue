<script setup>
import { ref, onMounted, computed } from 'vue'
import { useImageStore } from '@/stores/images'
import ImageCard from '@/components/ui/ImageCard.vue'
import MaximalButton from '@/components/ui/MaximalButton.vue'
import FavoriteButton from '@/components/FavoriteButton.vue'
import { useUserStore } from '@/stores/user'
import { usePageMeta } from '@/composables/usePageMeta'
import { shareContent } from '@/utils/share'
import { downloadImagesAsZip } from '@/utils/batchDownload'

usePageMeta()
const store = useImageStore()
const user = useUserStore()
const baseUrl = import.meta.env.BASE_URL || './'
const previewImage = ref(null)
const currentPage = ref(1)
const pageSize = ref(24)
const batchLoading = ref(false)
const shareTip = ref('')

const totalPages = computed(() => Math.ceil(store.filteredImages.length / pageSize.value))
const paginatedImages = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  return store.filteredImages.slice(start, start + pageSize.value)
})

const batchLabel = computed(() => {
  const cat = store.categories.find(c => c.id === store.currentCategory)
  return cat && cat.id !== 'all' ? `奶蛙${cat.label}` : '奶蛙精选'
})

function handlePreview(image) { previewImage.value = image }
function closePreview() { previewImage.value = null; shareTip.value = '' }
function nextPage() { if (currentPage.value < totalPages.value) currentPage.value++ }
function prevPage() { if (currentPage.value > 1) currentPage.value-- }
function goToPage(page) { currentPage.value = page; window.scrollTo({ top: 200, behavior: 'smooth' }) }
function handleSearch(value) { store.setSearch(value); currentPage.value = 1 }
function handleCategoryChange(category) { store.setCategory(category); currentPage.value = 1 }

function downloadImage(image) {
  const link = document.createElement('a')
  link.href = `${baseUrl}images/${image.filename}`
  link.download = image.filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  user.track('download')
}

async function batchDownload() {
  const list = store.filteredImages.slice(0, 50)
  if (!list.length) return
  batchLoading.value = true
  try {
    const count = await downloadImagesAsZip(list, baseUrl, batchLabel.value)
    user.track('download')
    shareTip.value = `已打包下载 ${count} 张图片`
  } catch (e) {
    shareTip.value = e.message || '打包失败，请稍后重试'
  } finally {
    batchLoading.value = false
  }
}

async function shareImage(image) {
  const result = await shareContent({
    title: '奶蛙表情包',
    text: `分享一张奶蛙：${image.filename}`,
    url: `${location.origin}${location.pathname}#/gallery`
  })
  shareTip.value = result === 'copied' ? '链接已复制' : result === 'shared' ? '分享成功' : ''
}

onMounted(() => { store.fetchImages(true) })
</script>

<template>
  <div>
    <section class="ed-page pt-16 md:pt-24 pb-10">
      <p class="ed-meta mb-4">Archive — {{ store.stats.total }} plates</p>
      <h1 class="ed-display">图库.</h1>
    </section>

    <section class="ed-page pb-8">
      <div class="flex flex-wrap gap-x-10 gap-y-2 ed-meta border-y border-ink/15 py-4">
        <span>总计 {{ store.stats.total }}</span>
        <span>表情 {{ store.stats.emoji }}</span>
        <span>贴图 {{ store.stats.sticker }}</span>
        <span>动画 {{ store.stats.animation }}</span>
        <button
          type="button"
          class="ed-link"
          :disabled="batchLoading || !store.filteredImages.length"
          @click="batchDownload"
        >打包下载</button>
      </div>
      <p v-if="shareTip" class="ed-meta mt-3">{{ shareTip }}</p>
    </section>

    <section class="ed-page pb-8">
      <input
        type="search"
        placeholder="Search filename…"
        class="ed-input max-w-md"
        :value="store.searchQuery"
        @input="handleSearch($event.target.value)"
      />
      <div class="flex flex-wrap gap-6 mt-6">
        <button
          v-for="cat in store.categories"
          :key="cat.id"
          type="button"
          class="ed-meta pb-1 border-b transition-colors duration-200"
          :class="store.currentCategory === cat.id ? 'text-accent border-accent' : 'text-ink border-transparent hover:text-accent'"
          @click="handleCategoryChange(cat.id)"
        >
          {{ cat.label }}
        </button>
      </div>
    </section>

    <section class="ed-page pb-24">
      <div v-if="store.loading" class="ed-meta py-24">Loading…</div>
      <div v-else-if="store.error" class="py-24">
        <p class="text-accent mb-4">{{ store.error }}</p>
        <MaximalButton @click="store.fetchImages()">重试</MaximalButton>
      </div>
      <p v-else-if="paginatedImages.length === 0" class="ed-meta py-24">没有匹配的影像</p>
      <div v-else class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-10">
        <ImageCard
          v-for="(image, index) in paginatedImages"
          :key="image.filename"
          :image="image"
          :index="(currentPage - 1) * pageSize + index"
          @preview="handlePreview"
        />
      </div>

      <div v-if="totalPages > 1" class="mt-16 flex items-center justify-center gap-4 flex-wrap">
        <button type="button" class="ed-link" :disabled="currentPage === 1" @click="prevPage">上一页</button>
        <template v-for="page in totalPages" :key="page">
          <button
            v-if="page === 1 || page === totalPages || (page >= currentPage - 2 && page <= currentPage + 2)"
            type="button"
            class="ed-meta w-8"
            :class="page === currentPage ? 'text-accent' : ''"
            @click="goToPage(page)"
          >{{ String(page).padStart(2, '0') }}</button>
          <span v-else-if="page === currentPage - 3 || page === currentPage + 3" class="ed-meta">—</span>
        </template>
        <button type="button" class="ed-link" :disabled="currentPage === totalPages" @click="nextPage">下一页</button>
      </div>
    </section>

    <Teleport to="body">
      <div v-if="previewImage" class="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-ink/80" @click.self="closePreview">
        <div class="relative max-w-4xl w-full bg-paper p-6 md:p-10">
          <button type="button" class="absolute top-4 right-4 ed-meta" @click="closePreview">Close</button>
          <div class="flex items-center justify-center min-h-[360px] bg-warm-white mb-6">
            <img :src="`${baseUrl}images/${previewImage.filename}`" :alt="previewImage.filename" class="max-w-full max-h-[60vh] object-contain" />
          </div>
          <p class="font-display text-xl mb-4">{{ previewImage.filename }}</p>
          <div class="flex items-center gap-4">
            <FavoriteButton :filename="previewImage.filename" size="lg" />
            <MaximalButton @click="downloadImage(previewImage)">下载</MaximalButton>
            <MaximalButton variant="ghost" @click="shareImage(previewImage)">分享</MaximalButton>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>
