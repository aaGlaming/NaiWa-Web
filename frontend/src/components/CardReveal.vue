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

const cardColors = ['#FF6B6B', '#FFD93D', '#C4B5FD', '#000000', '#FF6B6B']
const cardBgText = ['#FFF', '#000', '#000', '#FFF', '#FFF']

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
      <div v-if="visible" class="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-black/80" @click.self="closeModal">
        <!-- 卡牌区域 -->
        <div class="flex flex-wrap items-center justify-center gap-5 md:gap-8 px-4 mb-10">
          <div
            v-for="(image, index) in images"
            :key="index"
            class="relative w-36 h-52 md:w-44 md:h-64 cursor-pointer perspective-1000"
            @click="revealCard(index)"
          >
            <div class="relative w-full h-full transition-transform duration-500" :class="{ 'rotate-y-180': revealed[index] }" style="transform-style: preserve-3d;">
              <!-- Card Back -->
              <div
                class="absolute inset-0 border-4 border-black flex flex-col items-center justify-center backface-hidden"
                :style="{ backgroundColor: cardColors[index], boxShadow: '8px 8px 0px 0px #000' }"
              >
                <span class="text-5xl md:text-6xl mb-3">🐸</span>
                <span class="font-heading text-sm font-bold uppercase tracking-widest" :style="{ color: cardBgText[index] }">?????</span>
              </div>
              <!-- Card Front -->
              <div class="absolute inset-0 border-4 border-black overflow-hidden rotate-y-180 backface-hidden bg-white" :style="{ boxShadow: '8px 8px 0px 0px #000' }">
                <img :src="`${baseUrl}images/${image.filename}`" :alt="image.filename" class="w-full h-full object-cover" />
                <button
                  @click.stop="downloadImage(image)"
                  class="absolute bottom-2 right-2 w-9 h-9 border-4 border-black bg-[#FFD93D] flex items-center justify-center text-sm font-black shadow-neo-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all duration-100"
                  title="下载"
                >⬇</button>
              </div>
            </div>
          </div>
        </div>

        <!-- 提示 -->
        <p class="text-white text-lg font-bold animate-pulse">💡 按 Enter 直接显示所有</p>
      </div>
    </Transition>

    <!-- 结果弹窗 -->
    <Transition name="fade">
      <div v-if="showResult" class="fixed inset-0 z-[210] flex items-center justify-center bg-black/80">
        <div class="relative max-w-2xl w-full mx-4 border-8 border-black bg-[#FFFDF5] p-8" style="box-shadow: 16px 16px 0px 0px #000;">
          <button @click="closeModal" class="absolute top-4 right-4 w-12 h-12 border-4 border-black bg-[#FF6B6B] text-white flex items-center justify-center text-xl font-black shadow-neo-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all duration-100">✕</button>

          <div class="text-center mb-8">
            <h2 class="font-heading text-3xl md:text-4xl font-black uppercase text-[#FF6B6B] mb-2">恭喜获得！</h2>
            <p class="font-bold text-lg">你抽到了这5张奶蛙卡牌</p>
          </div>

          <div class="flex justify-center gap-3 mb-8">
            <div v-for="(image, index) in images" :key="index" class="w-16 h-20 md:w-20 md:h-24 border-4 border-black overflow-hidden" :style="{ boxShadow: '4px 4px 0px 0px #000' }">
              <img :src="`${baseUrl}images/${image.filename}`" :alt="image.filename" class="w-full h-full object-cover" />
            </div>
          </div>

          <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button @click="downloadAll" class="px-8 py-3 border-4 border-black bg-[#FF6B6B] text-white font-heading font-bold uppercase tracking-wider shadow-neo-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all duration-100">⬇️ 全部下载</button>
            <button @click="closeModal" class="px-8 py-3 border-4 border-black bg-[#FFD93D] font-heading font-bold uppercase tracking-wider shadow-neo-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all duration-100">✕ 关闭</button>
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
