<script setup>
import { ref, onMounted, computed } from 'vue'
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
  // 保底机制：10次未出SR以上，第11次必出SR+
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

// 抽卡
async function drawCards() {
  if (isDrawing.value || allImages.value.length === 0) return

  isDrawing.value = true
  drawnCards.value = []

  // 等待动画
  await new Promise(r => setTimeout(r, 100))

  // 抽取1张
  const image = getRandomImage()
  const rarity = rollRarity()

  const card = {
    image,
    rarity,
    revealed: false
  }

  drawnCards.value = [card]

  // 如果是传说，播放特效
  if (rarity === 'SSR') {
    legendaryImage.value = image
    setTimeout(() => {
      showLegendary.value = true
    }, 800)
  }

  isDrawing.value = false
}

// 翻转卡牌
function revealCard(index) {
  if (drawnCards.value[index]) {
    drawnCards.value[index].revealed = true
    const rarity = drawnCards.value[index].rarity
    stats.value[rarity]++

    // 保存记录
    saveHistory(drawnCards.value[index])
  }
}

// 传说动画完成
function onLegendaryComplete() {
  showLegendary.value = false
  // 自动翻转卡牌
  if (drawnCards.value[0]) {
    drawnCards.value[0].revealed = true
    stats.value.SSR++
    saveHistory(drawnCards.value[0])
  }
}

// 跳过传说动画
function skipLegendary() {
  showLegendary.value = false
  if (drawnCards.value[0]) {
    drawnCards.value[0].revealed = true
    stats.value.SSR++
    saveHistory(drawnCards.value[0])
  }
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
    // 只保留最近50条
    if (history.length > 50) {
      history.splice(0, history.length - 50)
    }
    localStorage.setItem('naiwa_draw_history', JSON.stringify(history))
  } catch (e) {
    console.error('Failed to save history:', e)
  }
}

// 统计数据
const totalDraws = computed(() => stats.value.N + stats.value.R + stats.value.SR + stats.value.SSR)

onMounted(() => {
  loadImages()
  // 加载保底计数
  const savedPity = localStorage.getItem('naiwa_pity_count')
  if (savedPity) pityCount.value = parseInt(savedPity) || 0
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
    <section class="relative min-h-[40vh] flex items-center justify-center px-6 py-24 overflow-hidden">
      <div class="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
        <span class="text-[10rem] md:text-[18rem] font-heading font-black text-max-secondary/10 uppercase select-none leading-none">
          LUCKY
        </span>
      </div>

      <FloatingShape :colorIndex="1" size="xl" shape="circle" animation="float" top="10%" left="5%" />
      <FloatingShape :colorIndex="3" size="lg" shape="diamond" animation="float-reverse" top="20%" right="8%" />
      <FloatingShape :colorIndex="0" size="md" shape="square" animation="wiggle" bottom="15%" left="10%" />

      <div class="relative z-20 text-center max-w-4xl mx-auto">
        <div class="text-8xl md:text-9xl mb-6 animate-wiggle">🎰</div>
        <h1 class="font-heading text-5xl md:text-7xl lg:text-8xl font-black uppercase leading-none mb-6 text-shadow-mega text-max-secondary">
          奶蛙抽卡机
        </h1>
        <p class="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto">
          每次抽取一张奶蛙卡牌<br class="hidden md:block" />
          集齐所有稀有卡牌！
        </p>
      </div>
    </section>

    <!-- Main Content -->
    <section class="relative py-12 px-6">
      <div class="max-w-6xl mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <!-- Left Panel: Stats & Draw Button -->
          <div class="lg:col-span-1 space-y-6">
            <!-- Draw Button -->
            <div class="text-center">
              <MaximalButton
                color="secondary"
                size="lg"
                icon="🎰"
                :loading="isDrawing"
                :disabled="isDrawing"
                @click="drawCards"
              >
                {{ isDrawing ? '抽取中...' : '开始抽卡' }}
              </MaximalButton>
              <p class="text-white/40 text-sm mt-2">
                保底进度: {{ pityCount }}/10
              </p>
            </div>

            <!-- Rarity Info -->
            <div class="p-6 rounded-3xl border-4 border-max-accent bg-max-muted/80"
              style="box-shadow: 6px 6px 0 #FFE600, 12px 12px 0 #FF3AF2;">
              <h3 class="font-heading text-xl font-black text-max-accent uppercase mb-4">📊 稀有度概率</h3>
              <div class="space-y-3">
                <div v-for="(config, rarity) in rarityConfig" :key="rarity" class="flex items-center justify-between">
                  <span class="font-bold" :style="{ color: config.color }">
                    {{ config.label }} ({{ rarity }})
                  </span>
                  <span class="text-white/60">{{ config.weight }}%</span>
                </div>
              </div>
            </div>

            <!-- Draw Stats -->
            <div class="p-6 rounded-3xl border-4 border-max-tertiary bg-max-muted/80"
              style="box-shadow: 6px 6px 0 #00F5D4, 12px 12px 0 #FFE600;">
              <h3 class="font-heading text-xl font-black text-max-tertiary uppercase mb-4">📈 我的统计</h3>
              <div class="space-y-2">
                <div class="flex items-center justify-between text-white/70">
                  <span>总抽卡次数</span>
                  <span class="font-bold text-max-accent">{{ totalDraws }}</span>
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
            <div class="p-8 rounded-3xl border-4 border-max-quaternary bg-max-muted/50 min-h-[400px] flex items-center justify-center"
              style="box-shadow: 6px 6px 0 #FF6B35, 12px 12px 0 #7B2FFF;">

              <!-- Empty State -->
              <div v-if="drawnCards.length === 0" class="text-center">
                <div class="text-8xl mb-4 animate-float">🐸</div>
                <p class="text-white/50 text-xl">点击"开始抽卡"试试运气吧！</p>
                <p class="text-white/30 text-sm mt-2">每次抽取一张，集齐稀有卡牌</p>
              </div>

              <!-- Card Display -->
              <div v-else class="flex items-center justify-center">
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

            <!-- Tips -->
            <div class="mt-6 p-4 rounded-2xl border-2 border-dashed border-max-accent/30 bg-max-muted/30">
              <p class="text-white/50 text-sm text-center">
                💡 提示：点击卡牌翻转查看奶蛙图片，每张卡牌右下角可单独下载
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
