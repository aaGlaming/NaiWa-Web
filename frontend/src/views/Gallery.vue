<script setup>
import { ref, onMounted, computed } from 'vue'
import { useImageStore } from '@/stores/images'
import SectionTitle from '@/components/ui/SectionTitle.vue'
import ImageCard from '@/components/ui/ImageCard.vue'
import MaximalButton from '@/components/ui/MaximalButton.vue'
import FloatingShape from '@/components/ui/FloatingShape.vue'
import { ACCENT_COLORS } from '@/utils'

const store = useImageStore()

const previewImage = ref(null)
const currentPage = ref(1)
const pageSize = ref(24)

const totalPages = computed(() => Math.ceil(store.filteredImages.length / pageSize.value))
const paginatedImages = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  return store.filteredImages.slice(start, start + pageSize.value)
})

function handlePreview(image) {
  previewImage.value = image
}

function closePreview() {
  previewImage.value = null
}

function nextPage() {
  if (currentPage.value < totalPages.value) currentPage.value++
}

function prevPage() {
  if (currentPage.value > 1) currentPage.value--
}

function goToPage(page) {
  currentPage.value = page
}

function handleSearch(value) {
  store.setSearch(value)
  currentPage.value = 1
}

function handleCategoryChange(category) {
  store.setCategory(category)
  currentPage.value = 1
}

async function downloadImage(image) {
  const imageUrl = `/images/${image.filename}`
  const fileName = image.filename

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

async function downloadAll() {
  for (let i = 0; i < store.filteredImages.length; i++) {
    await downloadImage(store.filteredImages[i])
    await new Promise(r => setTimeout(r, 500))
  }
}

onMounted(() => {
  store.fetchImages()
})
</script>

<template>
  <div>
    <!-- Hero Section -->
    <section class="relative min-h-[50vh] flex items-center justify-center px-6 py-24 overflow-hidden">
      <div class="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
        <span class="text-[10rem] md:text-[18rem] font-heading font-black text-max-tertiary/10 uppercase select-none leading-none">
          GALLERY
        </span>
      </div>

      <FloatingShape :colorIndex="2" size="xl" shape="circle" animation="float" top="10%" left="5%" />
      <FloatingShape :colorIndex="0" size="lg" shape="diamond" animation="float-reverse" top="20%" right="8%" />
      <FloatingShape :colorIndex="4" size="md" shape="square" animation="wiggle" bottom="15%" left="10%" />
      <FloatingShape :colorIndex="1" size="lg" shape="circle" animation="bounce" bottom="20%" right="12%" />

      <div class="relative z-20 text-center max-w-4xl mx-auto">
        <div class="text-8xl md:text-9xl mb-6 animate-wiggle">🖼️</div>
        <h1 class="font-heading text-5xl md:text-7xl lg:text-8xl font-black uppercase leading-none mb-6 text-shadow-mega text-max-tertiary">
          图片库
        </h1>
        <p class="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto">
          {{ store.stats.total }} 张精选奶蛙素材<br class="hidden md:block" />
          表情包、贴图、动画应有尽有
        </p>
      </div>
    </section>

    <!-- Stats Bar -->
    <section class="relative py-6 px-6 border-y-4 border-dashed border-max-accent">
      <div class="max-w-6xl mx-auto flex flex-wrap items-center justify-center gap-6 md:gap-12">
        <div class="text-center">
          <div class="font-heading text-2xl font-black text-max-accent">{{ store.stats.total }}</div>
          <div class="text-white/60 text-sm">总计</div>
        </div>
        <div class="text-center">
          <div class="font-heading text-2xl font-black text-max-secondary">{{ store.stats.emoji }}</div>
          <div class="text-white/60 text-sm">表情包</div>
        </div>
        <div class="text-center">
          <div class="font-heading text-2xl font-black text-max-tertiary">{{ store.stats.sticker }}</div>
          <div class="text-white/60 text-sm">贴图</div>
        </div>
        <div class="text-center">
          <div class="font-heading text-2xl font-black text-max-quaternary">{{ store.stats.animation }}</div>
          <div class="text-white/60 text-sm">动画</div>
        </div>
      </div>
    </section>

    <!-- Filters -->
    <section class="relative py-8 px-6">
      <div class="max-w-6xl mx-auto">
        <!-- Search -->
        <div class="mb-6">
          <div class="relative max-w-md mx-auto">
            <input
              type="text"
              placeholder="🔍 搜索图片..."
              class="w-full px-6 py-4 rounded-full border-4 border-max-secondary bg-max-muted/50 backdrop-blur-sm text-white text-lg font-body placeholder-white/40 focus:border-max-accent focus:ring-4 focus:ring-max-accent/30 focus:ring-offset-2 focus:ring-offset-max-background outline-none transition-all duration-300"
              :value="store.searchQuery"
              @input="handleSearch($event.target.value)"
            />
          </div>
        </div>

        <!-- Category Tabs -->
        <div class="flex flex-wrap items-center justify-center gap-3">
          <button
            v-for="(cat, index) in store.categories"
            :key="cat.id"
            @click="handleCategoryChange(cat.id)"
            class="px-5 py-2 rounded-full border-4 font-heading font-bold uppercase tracking-wider text-sm transition-all duration-300"
            :class="[
              store.currentCategory === cat.id
                ? 'scale-105 shadow-multi'
                : 'hover:scale-105'
            ]"
            :style="{
              borderColor: ACCENT_COLORS[index],
              backgroundColor: store.currentCategory === cat.id ? ACCENT_COLORS[index] : 'transparent',
              color: store.currentCategory === cat.id ? '#0D0D1A' : ACCENT_COLORS[index]
            }"
          >
            {{ cat.icon }} {{ cat.label }}
          </button>
        </div>

        <!-- Download All Button -->
        <div class="mt-6 text-center">
          <MaximalButton color="accent" size="md" icon="⬇️" @click="downloadAll">
            下载当前分类全部图片 ({{ store.filteredImages.length }})
          </MaximalButton>
        </div>
      </div>
    </section>

    <!-- Gallery Grid -->
    <section class="relative py-12 px-6">
      <div class="max-w-7xl mx-auto">
        <!-- Loading State -->
        <div v-if="store.loading" class="text-center py-24">
          <div class="text-6xl animate-spin-slow mb-4">⏳</div>
          <p class="text-white/60 text-xl">加载中...</p>
        </div>

        <!-- Error State -->
        <div v-else-if="store.error" class="text-center py-24">
          <div class="text-6xl mb-4">😵</div>
          <p class="text-max-secondary text-xl mb-4">{{ store.error }}</p>
          <MaximalButton color="secondary" size="md" @click="store.fetchImages()">
            重试
          </MaximalButton>
        </div>

        <!-- Empty State -->
        <div v-else-if="paginatedImages.length === 0" class="text-center py-24">
          <div class="text-6xl mb-4 animate-wiggle">🐸</div>
          <p class="text-white/60 text-xl mb-2">没有找到匹配的图片</p>
          <p class="text-white/40 text-lg">试试其他搜索词或分类吧</p>
        </div>

        <!-- Image Grid -->
        <div v-else class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
          <ImageCard
            v-for="(image, index) in paginatedImages"
            :key="image.filename"
            :image="image"
            :colorIndex="index % 5"
            :index="index"
            @preview="handlePreview"
          />
        </div>

        <!-- Pagination -->
        <div v-if="totalPages > 1" class="mt-12 flex items-center justify-center gap-3">
          <MaximalButton
            variant="secondary"
            color="tertiary"
            size="sm"
            :disabled="currentPage === 1"
            @click="prevPage"
          >
            ← 上一页
          </MaximalButton>

          <template v-for="page in totalPages" :key="page">
            <button
              v-if="page === 1 || page === totalPages || (page >= currentPage - 2 && page <= currentPage + 2)"
              @click="goToPage(page)"
              class="w-10 h-10 rounded-full border-4 font-heading font-bold transition-all duration-300"
              :class="[
                page === currentPage
                  ? 'bg-max-accent text-max-background border-max-accent scale-110'
                  : 'border-max-muted text-white hover:border-max-accent hover:text-max-accent'
              ]"
            >
              {{ page }}
            </button>
            <span
              v-else-if="page === currentPage - 3 || page === currentPage + 3"
              class="text-white/40"
            >
              ...
            </span>
          </template>

          <MaximalButton
            variant="secondary"
            color="tertiary"
            size="sm"
            :disabled="currentPage === totalPages"
            @click="nextPage"
          >
            下一页 →
          </MaximalButton>
        </div>
      </div>
    </section>

    <!-- Image Preview Modal -->
    <Teleport to="body">
      <div
        v-if="previewImage"
        class="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm"
        @click.self="closePreview"
      >
        <div
          class="relative max-w-4xl w-full rounded-3xl border-4 border-max-accent bg-max-muted p-8 pattern-mesh"
          style="box-shadow: 12px 12px 0 #FFE600, 24px 24px 0 #FF3AF2, 36px 36px 0 #00F5D4;"
        >
          <!-- Close Button -->
          <button
            @click="closePreview"
            class="absolute top-4 right-4 w-12 h-12 rounded-full border-4 border-max-secondary bg-max-background text-max-secondary hover:bg-max-secondary hover:text-max-background transition-all duration-300 flex items-center justify-center text-xl font-bold"
          >
            ✕
          </button>

          <!-- Download Button -->
          <button
            @click="downloadImage(previewImage)"
            class="absolute top-4 left-4 w-12 h-12 rounded-full border-4 border-max-accent bg-max-background text-max-accent hover:bg-max-accent hover:text-max-background transition-all duration-300 flex items-center justify-center text-xl font-bold"
            title="下载图片"
          >
            ⬇
          </button>

          <!-- Image -->
          <div class="flex items-center justify-center min-h-[400px] bg-max-background rounded-2xl mb-6 overflow-hidden">
            <img
              :src="`/images/${previewImage.filename}`"
              :alt="previewImage.filename"
              class="max-w-full max-h-[60vh] object-contain"
            />
          </div>

          <!-- Info -->
          <div class="text-center">
            <h3 class="font-heading text-xl font-black text-max-accent uppercase tracking-wider mb-2">
              {{ previewImage.filename }}
            </h3>
            <div class="inline-block px-4 py-1 rounded-full border-2 text-sm font-heading font-bold"
              :style="{
                borderColor: ACCENT_COLORS[0],
                color: ACCENT_COLORS[0]
              }"
            >
              {{ previewImage.category === 'emoji' ? '😄 表情包' : previewImage.category === 'animation' ? '🎬 动画' : '🏷️ 贴图' }}
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>
