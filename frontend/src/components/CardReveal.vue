<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { loadImagesCatalog } from '@/utils/fetchJson'

const emit = defineEmits(['close'])
const baseUrl = import.meta.env.BASE_URL || './'
const visible = ref(true)
const images = ref([])
const revealed = ref([false, false, false, false, false])
const showResult = ref(false)
const allRevealed = computed(() => revealed.value.every(r => r))

async function loadRandomImages() {
  try {
    const list = await loadImagesCatalog(baseUrl)
    const shuffled = [...list].sort(() => Math.random() - 0.5)
    images.value = shuffled.slice(0, 5)
  } catch (e) {
    console.error('Failed to load images:', e)
  }
}

function handleKeydown(e) {
  if (e.key === 'Enter' && visible.value && !showResult.value) {
    revealAll()
  }
  if (e.key === 'Escape' && showResult.value) {
    closeModal()
  }
}

function revealAll() {
  revealed.value = [true, true, true, true, true]
  setTimeout(() => { showResult.value = true }, 600)
}

function revealCard(index) {
  if (!revealed.value[index]) {
    revealed.value[index] = true
    if (allRevealed.value) {
      setTimeout(() => { showResult.value = true }, 600)
    }
  }
}

function downloadImage(image) {
  const link = document.createElement('a')
  link.href = `${baseUrl}images/${image.filename}`
  link.download = image.filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

function downloadAll() {
  images.value.forEach((img, i) => {
    setTimeout(() => downloadImage(img), i * 300)
  })
}

function closeModal() {
  visible.value = false
  emit('close')
}

onMounted(() => {
  loadRandomImages()
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="visible" class="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-ink/90" @click.self="closeModal">
        <p class="ed-meta text-paper mb-10">Opening spread — Enter to reveal</p>
        <div class="flex flex-wrap items-center justify-center gap-4 md:gap-6 px-4 mb-10">
          <button
            v-for="(image, index) in images"
            :key="index"
            type="button"
            class="relative w-32 h-48 md:w-40 md:h-60 perspective-1000 bg-transparent border-0 p-0 cursor-pointer"
            @click="revealCard(index)"
          >
            <div class="relative w-full h-full transition-transform duration-500" :class="{ 'rotate-y-180': revealed[index] }" style="transform-style: preserve-3d;">
              <div class="absolute inset-0 border border-paper/30 bg-charcoal flex flex-col items-center justify-center backface-hidden">
                <span class="ed-num text-paper text-2xl">{{ String(index + 1).padStart(2, '0') }}</span>
              </div>
              <div class="absolute inset-0 border border-paper/30 overflow-hidden rotate-y-180 backface-hidden bg-paper">
                <img :src="`${baseUrl}images/${image.filename}`" :alt="image.filename" class="w-full h-full object-cover" />
                <span
                  class="absolute bottom-2 right-2 ed-meta text-paper bg-ink/70 px-2 py-1"
                  @click.stop="downloadImage(image)"
                >Save</span>
              </div>
            </div>
          </button>
        </div>
      </div>
    </Transition>

    <Transition name="fade">
      <div v-if="showResult" class="fixed inset-0 z-[210] flex items-center justify-center bg-ink/90 p-6">
        <div class="relative max-w-2xl w-full bg-paper p-8 md:p-12">
          <button type="button" class="absolute top-4 right-4 ed-meta" @click="closeModal">Close</button>
          <p class="ed-meta mb-3">Vol. 02</p>
          <h2 class="font-display text-4xl md:text-5xl mb-8">Five plates.</h2>
          <div class="flex justify-center gap-2 mb-10">
            <div v-for="(image, index) in images" :key="index" class="w-14 h-20 overflow-hidden bg-warm-white">
              <img :src="`${baseUrl}images/${image.filename}`" :alt="image.filename" class="w-full h-full object-cover" />
            </div>
          </div>
          <div class="flex flex-wrap gap-8">
            <button type="button" class="ed-link" @click="downloadAll">全部下载</button>
            <button type="button" class="ed-link" @click="closeModal">进入刊物</button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.perspective-1000 { perspective: 1000px; }
.rotate-y-180 { transform: rotateY(180deg); }
.backface-hidden { backface-visibility: hidden; }
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
