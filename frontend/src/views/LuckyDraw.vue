<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import DrawCard from '@/components/DrawCard.vue'
import LegendaryEffect from '@/components/LegendaryEffect.vue'
import DrawHistory from '@/components/DrawHistory.vue'
import MaximalButton from '@/components/ui/MaximalButton.vue'
import FloatingShape from '@/components/ui/FloatingShape.vue'
import { ACCENT_COLORS } from '@/utils'

const baseUrl = import.meta.env.BASE_URL || '/'

// 状态
const allImages = ref([])
const drawnCards = ref([])
const isDrawing = ref(false)
const showLegendary = ref(false)
const legendaryImage = ref(null)
const pityCount = ref(0)
const stats = ref({ N: 0, R: 0, SR: 0, SSR: 0 })
const drawMode = ref('single') // 'single' or 'ten'

// 稀有度配置
const rarityConfig = {
  N: { label: '普通', color: '#4CAF50', weight: 60 },
  R: { label: '稀有', color: '#2196F3', weight: 25 },
  SR: { label: '史诗', color: '#9C27B0', weight: 12 },
  SSR: { label: '传说', color: '#FFD700', weight: 3 }
}

// 加载图片
async function loadImages() {
  try {
    const response = await fetch(baseUrl + 'images.json')
    const data = await response.json()
    allImages.value = data.images
  } catch (e) {
    console.error('Failed to load images:', e)
  }
}

// 抽取稀有度（带保底）
function rollRarity() {
  if (pityCount.value >= 10) {
    pityCount.value = 0
    return Math.random() < 0.2 ? 'SSR' : 'SR'
  }

  const totalWeight = Object.values(rarityConfig).reduce((sum, r) => sum + r.weight, 0)
  let random = Math.random() * totalWeight

  for (const [rarity, config] of Object.entries(rarityConfig)) {
    random -= config.weight
    if (random <= 0) {
      if (rarity === 'N' || rarity === 'R') {
        pityCount.value++
      } else {
        pityCount.value = 0
      }
      return rarity
    }
  }

  pityCount.value++
  return 'N'
}

// 抽取随机图片
function getRandomImage() {
  const index = Math.floor(Math.random() * allImages.value.length)
  return allImages.value[index]
}

// 抽卡（单抽或十连）
async function drawCards() {
  if (isDrawing.value || allImages.value.length === 0) return

  isDrawing.value = true
  drawnCards.value = []

  await new Promise(r => setTimeout(r, 100))

  const count = drawMode.value === 'single' ? 1 : 10
  const cards = []
  let hasSSR = false

  for (let i = 0; i < count; i++) {
    const image = getRandomImage()
    const rarity = rollRarity()

    if (rarity === 'SSR') {
      hasSSR = true
      legendaryImage.value = image
    }

    cards.push({
      image,
      rarity,
      revealed: false
    })
  }

  drawnCards.value = cards

  // 十连抽保底：至少一张SR以上
  if (count === 10 && !cards.some(c => c.rarity === 'SR' || c.rarity === 'SSR')) {
    const randomIndex = Math.floor(Math.random() * 10)
    drawnCards.value[randomIndex].rarity = 'SR'
  }

  // 如果有传说，播放特效
  if (hasSSR && legendaryImage.value) {
    setTimeout(() => {
      showLegendary.value = true
    }, 800)
  }

  isDrawing.value = false
}

// 翻转单张卡牌
function revealCard(index) {
  if (drawnCards.value[index] && !drawnCards.value[index].revealed) {
    drawnCards.value[index].revealed = true
    const rarity = drawnCards.value[index].rarity
    stats.value[rarity]++
    saveHistory(drawnCards.value[index])
  }
}

// 翻转所有卡牌
function revealAll() {
  drawnCards.value.forEach((card, index) => {
    if (!card.revealed) {
      setTimeout(() => {
        card.revealed = true
        stats.value[card.rarity]++
        saveHistory(card)
      }, index * 100)
    }
  })
}

// Enter键处理
function handleKeydown(e) {
  if (e.key === 'Enter' && drawnCards.value.length > 0 && !isDrawing.value) {
    const hasUnrevealed = drawnCards.value.some(c => !c.revealed)
    if (hasUnrevealed) {
      revealAll()
    }
  }
}

// 传说动画完成
function onLegendaryComplete() {
  showLegendary.value = false
}

// 跳过传说动画
function skipLegendary() {
  showLegendary.value = false
}

// 下载图片
function downloadImage(image) {
  const link = document.createElement('a')
  link.href = `${baseUrl}images/${image.filename}`
  link.download = image.filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

// 保存抽卡记录
function saveHistory(card) {
  try {
    const history = JSON.parse(localStorage.getItem('naiwa_draw_history') || '[]')
    history.push({
      image: card.image.filename,
      rarity: card.rarity,
      timestamp: Date.now()
    })
    if (history.length > 50) {
      history.splice(0, history.length - 50)
    }
    localStorage.setItem('naiwa_draw_history', JSON.stringify(history))
  } catch (e) {
    console.error('Failed to save history:', e)
  }
}

// 计算属性
const hasUnrevealed = computed(() => drawnCards.value.some(c => !c.revealed))

onMounted(() => {
  loadImages()
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <div>
    <!-- 传说特效 -->
    <LegendaryEffect
      v-if="showLegendary"
      @skip="skipLegendary"
      @complete="onLegendaryComplete"
    />

    <!-- Hero Section -->
    <section class="relative min-h-[35vh] flex items-center justify-center px-6 py-30 overflow-hidden">
      <div class="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
        <span class="text-[10rem] md:text-[18rem] font-heading font-bold text-[#FFD93D]/10 uppercase select-none leading-none">
          LUCKY
        </span>
      </div>

      <FloatingShape :colorIndex="1" size="xl" shape="circle" animation="float" top="10%" left="5%" />
      <FloatingShape :colorIndex="3" size="lg" shape="diamond" animation="float-reverse" top="20%" right="8%" />
      <FloatingShape :colorIndex="0" size="md" shape="square" animation="wiggle" bottom="15%" left="10%" />

      <div class="relative z-20 text-center max-w-4xl mx-auto">
        <div class="text-8xl md:text-9xl mb-9 animate-wiggle">🎰</div>
        <h1 class="font-heading text-5xl md:text-7xl lg:text-8xl font-bold uppercase leading-none mb-9 text-shadow-mega text-[#FFD93D]">
          奶蛙抽卡机
        </h1>
        <p class="text-xl md:text-2xl text-black/80 max-w-3xl mx-auto">
          每次抽取一张或十张奶蛙卡牌<br class="hidden md:block" />
          集齐所有稀有卡牌！
        </p>
      </div>
    </section>

    <!-- Main Content -->
    <section class="relative py-36 px-6">
      <div class="max-w-6xl mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">

          <!-- Left Panel: Stats & Controls -->
          <div class="lg:col-span-1 space-y-9">
            <!-- Draw Mode -->
            <div class="flex items-center gap-3 p-2 rounded-2xl border-4 border-black bg-[#C4B5FD]/50">
              <button
                @click="drawMode = 'single'"
                class="flex-1 px-4 py-4.5 rounded-xl font-heading font-bold text-sm transition-all duration-300"
                :class="[
                  drawMode === 'single'
                    ? 'bg-[#FFD93D] text-max-background'
                    : 'text-black/70 hover:text-white'
                ]"
              >
                🎴 单抽
              </button>
              <button
                @click="drawMode = 'ten'"
                class="flex-1 px-4 py-4.5 rounded-xl font-heading font-bold text-sm transition-all duration-300"
                :class="[
                  drawMode === 'ten'
                    ? 'bg-[#FFD93D] text-max-background'
                    : 'text-black/70 hover:text-white'
                ]"
              >
                🎰 十连抽
              </button>
            </div>

            <!-- Draw Button -->
            <MaximalButton
              color="secondary"
              size="lg"
              icon="🎰"
              :loading="isDrawing"
              :disabled="isDrawing"
              @click="drawCards"
              class="w-full"
            >
              {{ isDrawing ? '抽取中...' : drawMode === 'single' ? '开始抽卡' : '十连抽！' }}
            </MaximalButton>

            <!-- Reveal All Button -->
            <MaximalButton
              v-if="hasUnrevealed"
              color="accent"
              size="md"
              icon="👁️"
              @click="revealAll"
              class="w-full"
            >
              一键查看全部
            </MaximalButton>

            <!-- Hint -->
            <p v-if="drawnCards.length > 0 && hasUnrevealed" class="text-black/40 text-sm text-center">
              💡 按 Enter 一键查看 | 点击卡牌逐张翻转
            </p>

            <!-- Rarity Info -->
            <div class="p-6 rounded-3xl border-4 border-[#FF6B6B] bg-[#C4B5FD]/80"
              style="box-shadow: 6px 6px 0 #FFE600, 12px 12px 0 #FF3AF2;">
              <h3 class="font-heading text-xl font-bold text-[#FF6B6B] uppercase mb-6">📊 稀有度概率</h3>
              <div class="space-y-4.5">
                <div v-for="(config, rarity) in rarityConfig" :key="rarity" class="flex items-center justify-between">
                  <span class="font-bold" :style="{ color: config.color }">
                    {{ config.label }} ({{ rarity }})
                  </span>
                  <span class="text-black/60">{{ config.weight }}%</span>
                </div>
              </div>
            </div>

            <!-- Draw Stats -->
            <div class="p-6 rounded-3xl border-4 border-black bg-[#C4B5FD]/80"
              style="box-shadow: 6px 6px 0 #00F5D4, 12px 12px 0 #FFE600;">
              <h3 class="font-heading text-xl font-bold text-[#C4B5FD] uppercase mb-6">📈 我的统计</h3>
              <div class="space-y-3">
                <div class="flex items-center justify-between text-black/70">
                  <span>总抽卡次数</span>
                  <span class="font-bold text-[#FF6B6B]">{{ stats.N + stats.R + stats.SR + stats.SSR }}</span>
                </div>
                <div class="flex items-center justify-between">
                  <span :style="{ color: '#4CAF50' }">普通</span>
                  <span class="font-bold" :style="{ color: '#4CAF50' }">{{ stats.N }}</span>
                </div>
                <div class="flex items-center justify-between">
                  <span :style="{ color: '#2196F3' }">稀有</span>
                  <span class="font-bold" :style="{ color: '#2196F3' }">{{ stats.R }}</span>
                </div>
                <div class="flex items-center justify-between">
                  <span :style="{ color: '#9C27B0' }">史诗</span>
                  <span class="font-bold" :style="{ color: '#9C27B0' }">{{ stats.SR }}</span>
                </div>
                <div class="flex items-center justify-between">
                  <span :style="{ color: '#FFD700' }">传说</span>
                  <span class="font-bold" :style="{ color: '#FFD700' }">{{ stats.SSR }}</span>
                </div>
              </div>
            </div>

            <!-- Draw History -->
            <DrawHistory />
          </div>

          <!-- Right Panel: Card Display -->
          <div class="lg:col-span-2">
            <div class="p-8 rounded-3xl border-4 border-black bg-[#C4B5FD]/50 min-h-[400px] flex items-center justify-center"
              style="box-shadow: 6px 6px 0 #FF6B35, 12px 12px 0 #7B2FFF;">

              <!-- Empty State -->
              <div v-if="drawnCards.length === 0" class="text-center">
                <div class="text-8xl mb-6 animate-float">🐸</div>
                <p class="text-black/50 text-xl">点击"开始抽卡"试试运气吧！</p>
                <p class="text-black/30 text-sm mt-3">支持单抽和十连抽</p>
              </div>

              <!-- Card Display -->
              <div v-else class="flex flex-wrap items-center justify-center gap-6 md:gap-9">
                <DrawCard
                  v-for="(card, index) in drawnCards"
                  :key="index"
                  :image="card.image"
                  :rarity="card.rarity"
                  :revealed="card.revealed"
                  :index="index"
                  :falling="true"
                  @reveal="revealCard(index)"
                  @download="downloadImage(card.image)"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
