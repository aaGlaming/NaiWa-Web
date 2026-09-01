<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { ACCENT_COLORS } from '@/utils'

const emit = defineEmits(['close'])

const baseUrl = import.meta.env.BASE_URL || '/'
const visible = ref(true)
const images = ref([])
const revealed = ref([false, false, false, false, false])
const showResult = ref(false)
const allRevealed = computed(() => revealed.value.every(r => r))

// 从图片库随机抽取5张
async function loadRandomImages() {
  try {
    const base = import.meta.env.BASE_URL || '/'
    const response = await fetch(base + 'images.json')
    const data = await response.json()
    const shuffled = [...data.images].sort(() => Math.random() - 0.5)
    images.value = shuffled.slice(0, 5)
  } catch (e) {
    console.error('Failed to load images:', e)
  }
}

// 按Enter显示所有卡牌
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
  setTimeout(() => {
    showResult.value = true
  }, 600)
}

function revealCard(index) {
  if (!revealed.value[index]) {
    revealed.value[index] = true
    if (allRevealed.value) {
      setTimeout(() => {
        showResult.value = true
      }, 600)
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
      <div
        v-if="visible"
        class="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-black/90 backdrop-blur-sm"
        @click.self="closeModal"
      >
        <!-- 卡牌区域 -->
        <div class="flex flex-wrap items-center justify-center gap-4 md:gap-6 px-4 mb-8">
          <div
            v-for="(image, index) in images"
            :key="index"
            class="relative w-32 h-44 md:w-40 md:h-56 cursor-pointer perspective-1000"
            @click="revealCard(index)"
          >
            <!-- 卡牌容器 -->
            <div
              class="relative w-full h-full transition-transform duration-500"
              :class="{ 'rotate-y-180': revealed[index] }"
              style="transform-style: preserve-3d;"
            >
              <!-- 卡牌背面 -->
              <div
                class="absolute inset-0 rounded-2xl border-4 flex flex-col items-center justify-center backface-hidden"
                :style="{
                  borderColor: ACCENT_COLORS[index % 5],
                  backgroundColor: '#2D1B4E',
                  boxShadow: `0 0 20px ${ACCENT_COLORS[index % 5]}40, 4px 4px 0 ${ACCENT_COLORS[(index + 1) % 5]}`
                }"
              >
                <span class="text-5xl md:text-6xl mb-2">🐸</span>
                <span
                  class="font-heading text-sm font-bold uppercase tracking-wider"
                  :style="{ color: ACCENT_COLORS[index % 5] }"
                >
                  ?????
                </span>
              </div>

              <!-- 卡牌正面 -->
              <div
                class="absolute inset-0 rounded-2xl border-4 overflow-hidden rotate-y-180 backface-hidden"
                :style="{
                  borderColor: ACCENT_COLORS[(index + 2) % 5],
                  boxShadow: `0 0 20px ${ACCENT_COLORS[(index + 2) % 5]}40`
                }"
              >
                <img
                  :src="`${baseUrl}images/${image.filename}`"
                  :alt="image.filename"
                  class="w-full h-full object-cover"
                />
                <!-- 单张下载按钮 -->
                <button
                  @click.stop="downloadImage(image)"
                  class="absolute bottom-2 right-2 w-8 h-8 rounded-full bg-max-background/80 border-2 flex items-center justify-center text-sm transition-all duration-300 hover:scale-110"
                  :style="{
                    borderColor: ACCENT_COLORS[index % 5],
                    color: ACCENT_COLORS[index % 5]
                  }"
                  title="下载"
                >
                  ⬇
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- 提示文字 -->
        <p class="text-white/60 text-lg font-body animate-pulse">
          💡 按 Enter 直接显示所有
        </p>
      </div>
    </Transition>

    <!-- 结果弹窗 -->
    <Transition name="fade">
      <div
        v-if="showResult"
        class="fixed inset-0 z-[210] flex items-center justify-center bg-black/80 backdrop-blur-sm"
      >
        <div
          class="relative max-w-2xl w-full mx-4 rounded-3xl border-4 p-8 pattern-mesh"
          style="background-color: #2D1B4E; border-color: #FFE600; box-shadow: 12px 12px 0 #FFE600, 24px 24px 0 #FF3AF2, 36px 36px 0 #00F5D4;"
        >
          <!-- 关闭按钮 -->
          <button
            @click="closeModal"
            class="absolute top-4 right-4 w-10 h-10 rounded-full border-4 border-max-secondary bg-max-background text-max-secondary hover:bg-max-secondary hover:text-max-background transition-all duration-300 flex items-center justify-center text-lg font-bold"
          >
            ✕
          </button>

          <!-- 标题 -->
          <div class="text-center mb-6">
            <h2 class="font-heading text-3xl md:text-4xl font-bold uppercase text-max-accent text-shadow-double mb-2">
              恭喜获得！
            </h2>
            <p class="text-white/70">你抽到了这5张奶蛙卡牌</p>
          </div>

          <!-- 卡牌预览 -->
          <div class="flex justify-center gap-2 mb-8">
            <div
              v-for="(image, index) in images"
              :key="index"
              class="relative w-16 h-20 md:w-20 md:h-24 rounded-xl border-2 overflow-hidden"
              :style="{ borderColor: ACCENT_COLORS[index % 5] }"
            >
              <img
                :src="`${baseUrl}images/${image.filename}`"
                :alt="image.filename"
                class="w-full h-full object-cover"
              />
            </div>
          </div>

          <!-- 操作按钮 -->
          <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
            <!-- 全部下载 -->
            <button
              @click="downloadAll"
              class="px-8 py-3 rounded-full border-4 font-heading font-bold uppercase tracking-wider transition-all duration-300 hover:scale-105"
              style="background: linear-gradient(90deg, #FFE600, #FF3AF2, #00F5D4); border-color: #7B2FFF; color: #0D0D1A; box-shadow: 6px 6px 0 #7B2FFF;"
            >
              ⬇️ 全部下载
            </button>

            <!-- 关闭 -->
            <button
              @click="closeModal"
              class="px-8 py-3 rounded-full border-4 border-dashed border-max-secondary text-max-secondary font-heading font-bold uppercase tracking-wider transition-all duration-300 hover:bg-max-secondary hover:text-max-background hover:border-solid hover:scale-105"
            >
              ✕ 关闭
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.perspective-1000 {
  perspective: 1000px;
}

.rotate-y-180 {
  transform: rotateY(180deg);
}

.backface-hidden {
  backface-visibility: hidden;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
