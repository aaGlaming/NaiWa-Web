<script setup>
import { ref, onMounted, computed } from 'vue'
import { useImageStore } from '@/stores/images'
import SectionTitle from '@/components/ui/SectionTitle.vue'
import ImageCard from '@/components/ui/ImageCard.vue'
import MaximalButton from '@/components/ui/MaximalButton.vue'
import FavoriteButton from '@/components/FavoriteButton.vue'
import { useUserStore } from '@/stores/user'
import { usePageMeta } from '@/composables/usePageMeta'

usePageMeta()
const store = useImageStore()
const user = useUserStore()
const baseUrl = import.meta.env.BASE_URL || '/'
const previewImage = ref(null)
const currentPage = ref(1)
const pageSize = ref(24)

const totalPages = computed(() => Math.ceil(store.filteredImages.length / pageSize.value))
const paginatedImages = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  return store.filteredImages.slice(start, start + pageSize.value)
})

function handlePreview(image) { previewImage.value = image }
function closePreview() { previewImage.value = null }
function nextPage() { if (currentPage.value < totalPages.value) currentPage.value++ }
function prevPage() { if (currentPage.value > 1) currentPage.value-- }
function goToPage(page) { currentPage.value = page }
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

onMounted(() => { store.fetchImages() })
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="relative min-h-[40vh] flex items-center justify-center px-6 py-24 overflow-hidden">
      <div class="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
        <span class="text-[10rem] md:text-[18rem] font-heading font-black text-black/[0.03] uppercase select-none leading-none">GALLERY</span>
      </div>
      <FloatingShape :colorIndex="2" size="xl" shape="square" animation="float" top="10%" left="5%" />
      <FloatingShape :colorIndex="0" size="lg" shape="circle" animation="float" top="20%" right="8%" />
      <div class="relative z-20 text-center max-w-4xl mx-auto">
        <div class="text-8xl md:text-9xl mb-8 animate-bounce-subtle">🖼️</div>
        <h1 class="font-heading text-5xl md:text-7xl lg:text-8xl font-black uppercase leading-none mb-8 tracking-tight text-[#C4B5FD]">图片库</h1>
        <div class="border-4 border-black bg-white px-6 py-3 inline-block shadow-neo-sm">
          <p class="font-bold text-lg md:text-xl">{{ store.stats.total }} 张精选奶蛙素材</p>
        </div>
      </div>
    </section>

    <!-- Stats Bar -->
    <section class="py-8 px-6 border-y-8 border-black bg-[#FFD93D]">
      <div class="max-w-6xl mx-auto flex flex-wrap items-center justify-center gap-8 md:gap-16">
        <div class="text-center font-bold"><span class="font-heading text-2xl font-black">总计 {{ store.stats.total }}</span></div>
        <div class="text-center font-bold"><span class="font-heading text-2xl font-black text-[#FF6B6B]">表情包 {{ store.stats.emoji }}</span></div>
        <div class="text-center font-bold"><span class="font-heading text-2xl font-black text-[#C4B5FD]">贴图 {{ store.stats.sticker }}</span></div>
        <div class="text-center font-bold"><span class="font-heading text-2xl font-black">动画 {{ store.stats.animation }}</span></div>
      </div>
    </section>

    <!-- Filters -->
    <section class="py-10 px-6">
      <div class="max-w-6xl mx-auto">
        <div class="mb-8 max-w-md mx-auto">
          <input type="text" placeholder="🔍 搜索图片..." class="w-full px-6 py-4 border-4 border-black bg-white font-bold text-lg placeholder-black/40 focus:bg-[#FFD93D] focus:shadow-neo-sm outline-none transition-all duration-200"
            :value="store.searchQuery" @input="handleSearch($event.target.value)" />
        </div>
        <div class="flex flex-wrap items-center justify-center gap-3">
          <button v-for="(cat, index) in store.categories" :key="cat.id" @click="handleCategoryChange(cat.id)"
            class="px-5 py-2.5 border-4 border-black font-heading font-bold uppercase tracking-wider text-sm transition-all duration-100 shadow-neo-sm"
            :class="[store.currentCategory === cat.id ? 'translate-x-[2px] translate-y-[2px] shadow-none' : 'hover:-translate-y-1', index % 3 === 0 ? 'bg-[#FF6B6B] text-white' : index % 3 === 1 ? 'bg-[#FFD93D]' : 'bg-[#C4B5FD]']">
            {{ cat.icon }} {{ cat.label }}
          </button>
        </div>
      </div>
    </section>

    <!-- Gallery Grid -->
    <section class="py-12 px-6">
      <div class="max-w-7xl mx-auto">
        <div v-if="store.loading" class="text-center py-24"><div class="text-6xl animate-spin-slow mb-4">⏳</div><p class="font-bold text-xl">加载中...</p></div>
        <div v-else-if="store.error" class="text-center py-24"><div class="text-6xl mb-4">😵</div><p class="text-[#FF6B6B] text-xl font-bold mb-4">{{ store.error }}</p><MaximalButton color="accent" @click="store.fetchImages()">重试</MaximalButton></div>
        <div v-else-if="paginatedImages.length === 0" class="text-center py-24"><div class="text-6xl mb-4 animate-bounce-subtle">🐸</div><p class="font-bold text-xl">没有找到匹配的图片</p></div>
        <div v-else class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
          <ImageCard v-for="(image, index) in paginatedImages" :key="image.filename" :image="image" :colorIndex="index % 5" :index="index" @preview="handlePreview" />
        </div>
        <!-- Pagination -->
        <div v-if="totalPages > 1" class="mt-16 flex items-center justify-center gap-3">
          <MaximalButton variant="outline" size="sm" :disabled="currentPage === 1" @click="prevPage">← 上一页</MaximalButton>
          <template v-for="page in totalPages" :key="page">
            <button v-if="page === 1 || page === totalPages || (page >= currentPage - 2 && page <= currentPage + 2)" @click="goToPage(page)"
              class="w-10 h-10 border-4 border-black font-heading font-black transition-all duration-100 shadow-neo-sm"
              :class="page === currentPage ? 'bg-[#FF6B6B] text-white translate-x-[2px] translate-y-[2px] shadow-none' : 'bg-white hover:bg-[#FFD93D]'">{{ page }}</button>
            <span v-else-if="page === currentPage - 3 || page === currentPage + 3" class="text-black/40 font-bold">...</span>
          </template>
          <MaximalButton variant="outline" size="sm" :disabled="currentPage === totalPages" @click="nextPage">下一页 →</MaximalButton>
        </div>
      </div>
    </section>

    <!-- Preview Modal -->
    <Teleport to="body">
      <div v-if="previewImage" class="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60" @click.self="closePreview">
        <div class="relative max-w-4xl w-full border-8 border-black bg-white p-8" style="box-shadow: 16px 16px 0px 0px #000;">
          <button @click="closePreview" class="absolute -top-5 -right-5 w-12 h-12 border-4 border-black bg-[#FF6B6B] text-white flex items-center justify-center text-xl font-black shadow-neo-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all duration-100">✕</button>
          <div class="flex items-center justify-center min-h-[400px] bg-black border-4 border-black mb-6">
            <img :src="`${baseUrl}images/${previewImage.filename}`" :alt="previewImage.filename" class="max-w-full max-h-[60vh] object-contain" />
          </div>
          <div class="text-center">
            <h3 class="font-heading text-xl font-black uppercase mb-3">{{ previewImage.filename }}</h3>
            <div class="flex items-center justify-center gap-3 flex-wrap">
              <FavoriteButton :filename="previewImage.filename" size="lg" />
              <MaximalButton color="accent" size="md" icon="⬇️" @click="downloadImage(previewImage)">下载图片</MaximalButton>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>
