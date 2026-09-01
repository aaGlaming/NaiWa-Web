<script setup>
import { ref, onMounted, computed } from 'vue'
import TarotCard from '@/components/TarotCard.vue'
import MaximalButton from '@/components/ui/MaximalButton.vue'
import FloatingShape from '@/components/ui/FloatingShape.vue'
import tarotData from '@/data/tarot.json'

// 状态
const deck = ref([])
const drawnCards = ref([])
const cardBack = ref('')
const isShuffling = ref(false)
const spreadMode = ref('single') // 'single' or 'three'
const allowReversed = ref(false)
const showResult = ref(false)
const currentReading = ref(null)

// 洗牌动画
function shuffleDeck() {
  isShuffling.value = true
  drawnCards.value = []
  showResult.value = false
  currentReading.value = null

  // 随机选择牌背
  cardBack.value = tarotData.cardBacks[Math.floor(Math.random() * tarotData.cardBacks.length)]

  // 打乱牌组
  const allCards = [...tarotData.majorArcana, ...tarotData.minorArcana]
  deck.value = allCards.sort(() => Math.random() - 0.5)

  setTimeout(() => {
    isShuffling.value = false
  }, 1500)
}

// 抽牌
function drawCards() {
  if (isShuffling.value || deck.value.length === 0) return

  const count = spreadMode.value === 'single' ? 1 : 3
  const newDrawn = []

  for (let i = 0; i < count; i++) {
    if (deck.value.length > 0) {
      const card = deck.value.pop()
      const isReversed = allowReversed.value && Math.random() < 0.3
      newDrawn.push({
        ...card,
        reversed: isReversed,
        position: spreadMode.value === 'three'
          ? tarotData.spreadMeanings.three[['past', 'present', 'future'][i]]
          : tarotData.spreadMeanings.single[0]
      })
    }
  }

  drawnCards.value = newDrawn

  // 生成解读
  currentReading.value = generateReading(newDrawn)
}

// 生成解读
function generateReading(cards) {
  const keywords = cards.map(c => c.keywords[Math.floor(Math.random() * c.keywords.length)])
  const names = cards.map(c => c.name)

  let interpretation = ''
  if (cards.length === 1) {
    interpretation = `今日的关键词是「${keywords[0]}」。奶蛙提醒你，保持${keywords[0]}的心态，会有好运降临。`
  } else {
    interpretation = `过去：${names[0]}（${keywords[0]}）→ 现在：${names[1]}（${keywords[1]}）→ 未来：${names[2]}（${keywords[2]}）。奶蛙告诉你，从过去到未来，你需要关注「${keywords[1]}」这个主题。`
  }

  return {
    cards,
    keywords,
    interpretation
  }
}

// 重置
function resetReading() {
  drawnCards.value = []
  showResult.value = false
  currentReading.value = null
  shuffleDeck()
}

// 翻牌完成
function onCardReveal(index) {
  if (spreadMode.value === 'three' && drawnCards.value.length === 3) {
    // 三张牌全部翻完后显示结果
    if (drawnCards.value.every(c => c.revealed)) {
      setTimeout(() => {
        showResult.value = true
      }, 500)
    }
  } else if (spreadMode.value === 'single') {
    setTimeout(() => {
      showResult.value = true
    }, 500)
  }
}

// 卡牌点击（循环翻转）
function onCardClick(index) {
  drawnCards.value[index].revealed = !drawnCards.value[index].revealed
  onCardReveal(index)
}

onMounted(() => {
  shuffleDeck()
})
</script>

<template>
  <div>
    <!-- Hero Section -->
    <section class="relative min-h-[35vh] flex items-center justify-center px-6 py-20 overflow-hidden">
      <div class="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
        <span class="text-[10rem] md:text-[18rem] font-heading font-black text-max-quinary/10 uppercase select-none leading-none">
          TAROT
        </span>
      </div>

      <FloatingShape :colorIndex="4" size="xl" shape="circle" animation="float" top="10%" left="5%" />
      <FloatingShape :colorIndex="0" size="lg" shape="diamond" animation="float-reverse" top="20%" right="8%" />
      <FloatingShape :colorIndex="2" size="md" shape="square" animation="wiggle" bottom="15%" left="10%" />

      <div class="relative z-20 text-center max-w-4xl mx-auto">
        <div class="text-8xl md:text-9xl mb-6 animate-wiggle">🔮</div>
        <h1 class="font-heading text-5xl md:text-7xl lg:text-8xl font-black uppercase leading-none mb-6 text-shadow-mega text-max-quinary">
          奶蛙塔罗牌
        </h1>
        <p class="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto">
          让奶蛙为你揭示命运的奥秘<br class="hidden md:block" />
          每一张牌都是奶蛙的祝福
        </p>
      </div>
    </section>

    <!-- Main Content -->
    <section class="relative py-12 px-6">
      <div class="max-w-6xl mx-auto">

        <!-- Controls -->
        <div class="flex flex-wrap items-center justify-center gap-4 mb-12">
          <!-- Spread Mode -->
          <div class="flex items-center gap-2 p-2 rounded-2xl border-4 border-max-secondary bg-max-muted/50">
            <button
              @click="spreadMode = 'single'"
              class="px-4 py-2 rounded-xl font-heading font-bold text-sm transition-all duration-300"
              :class="[
                spreadMode === 'single'
                  ? 'bg-max-secondary text-max-background'
                  : 'text-white/70 hover:text-white'
              ]"
            >
              🎴 单张占卜
            </button>
            <button
              @click="spreadMode = 'three'"
              class="px-4 py-2 rounded-xl font-heading font-bold text-sm transition-all duration-300"
              :class="[
                spreadMode === 'three'
                  ? 'bg-max-secondary text-max-background'
                  : 'text-white/70 hover:text-white'
              ]"
            >
              🃏 三张牌阵
            </button>
          </div>

          <!-- Reversed Toggle -->
          <label class="flex items-center gap-2 px-4 py-2 rounded-2xl border-4 border-max-tertiary bg-max-muted/50 cursor-pointer">
            <input
              type="checkbox"
              v-model="allowReversed"
              class="w-5 h-5 accent-max-tertiary"
            />
            <span class="text-white/70 text-sm font-heading">允许逆位</span>
          </label>

          <!-- Shuffle Button -->
          <MaximalButton
            color="quinary"
            size="md"
            icon="🔀"
            :loading="isShuffling"
            @click="shuffleDeck"
          >
            {{ isShuffling ? '洗牌中...' : '洗牌' }}
          </MaximalButton>

          <!-- Draw Button -->
          <MaximalButton
            color="accent"
            size="md"
            icon="✨"
            :disabled="isShuffling || drawnCards.length > 0"
            @click="drawCards"
          >
            抽牌
          </MaximalButton>

          <!-- Reset Button -->
          <MaximalButton
            v-if="drawnCards.length > 0"
            color="secondary"
            size="md"
            icon="🔄"
            @click="resetReading"
          >
            重新开始
          </MaximalButton>
        </div>

        <!-- Reading Area -->
        <div class="relative p-8 md:p-12 rounded-3xl border-4 border-max-quinary bg-max-muted/30 min-h-[400px]"
          style="box-shadow: 8px 8px 0 #7B2FFF, 16px 16px 0 #FFE600; background-image: radial-gradient(circle, rgba(123, 47, 255, 0.1) 1px, transparent 1px); background-size: 20px 20px;">

          <!-- Empty State -->
          <div v-if="drawnCards.length === 0 && !isShuffling" class="flex flex-col items-center justify-center h-[300px]">
            <div class="text-6xl mb-4 animate-float">🔮</div>
            <p class="text-white/50 text-xl">点击"抽牌"开始占卜</p>
            <p class="text-white/30 text-sm mt-2">先洗牌，再抽牌</p>
          </div>

          <!-- Shuffling Animation -->
          <div v-if="isShuffling" class="flex items-center justify-center h-[300px]">
            <div class="flex gap-4">
              <div
                v-for="i in 5"
                :key="i"
                class="w-20 h-32 rounded-xl border-4 border-max-quinary bg-max-muted animate-shuffle"
                :style="{ '--i': i }"
              >
                <img
                  v-if="cardBack"
                  :src="`${baseUrl}images/${cardBack}`"
                  class="w-full h-full object-cover rounded-xl"
                />
              </div>
            </div>
          </div>

          <!-- Drawn Cards -->
          <div v-if="drawnCards.length > 0 && !isShuffling" class="flex flex-col items-center">
            <div class="flex flex-wrap items-end justify-center gap-6 md:gap-10">
              <div v-for="(card, index) in drawnCards" :key="card.id" class="text-center">
                <TarotCard
                  :card="card"
                  :cardBack="cardBack"
                  :reversed="card.reversed"
                  :index="index"
                  :position="card.position"
                  @click="onCardClick(index)"
                />
              </div>
            </div>

            <!-- Reading Result -->
            <Transition name="fade">
              <div v-if="showResult && currentReading" class="mt-12 max-w-2xl text-center">
                <div class="p-8 rounded-3xl border-4 border-max-accent bg-max-muted/80"
                  style="box-shadow: 6px 6px 0 #FFE600, 12px 12px 0 #FF3AF2;">
                  <h3 class="font-heading text-2xl font-black text-max-accent uppercase mb-4">🔮 奶蛙解读</h3>

                  <!-- Keywords -->
                  <div class="flex flex-wrap justify-center gap-3 mb-6">
                    <span
                      v-for="(kw, i) in currentReading.keywords"
                      :key="i"
                      class="px-4 py-2 rounded-full border-2 font-heading font-bold text-sm"
                      :style="{
                        borderColor: ['#FFE600', '#FF3AF2', '#00F5D4'][i % 3],
                        color: ['#FFE600', '#FF3AF2', '#00F5D4'][i % 3]
                      }"
                    >
                      {{ kw }}
                    </span>
                  </div>

                  <!-- Interpretation -->
                  <p class="text-white/80 text-lg leading-relaxed">
                    {{ currentReading.interpretation }}
                  </p>

                  <div class="mt-6 text-4xl animate-wiggle">🐸✨</div>
                </div>
              </div>
            </Transition>
          </div>
        </div>

        <!-- Instructions -->
        <div class="mt-8 p-4 rounded-2xl border-2 border-dashed border-max-accent/30 bg-max-muted/30">
          <p class="text-white/50 text-sm text-center">
            💡 提示：选择牌阵模式 → 点击洗牌 → 点击抽牌 → 点击卡牌翻转查看结果
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.animate-shuffle {
  animation: shuffle 0.5s ease-in-out infinite;
  animation-delay: calc(var(--i) * 0.1s);
}

@keyframes shuffle {
  0%, 100% { transform: translateX(0) rotate(0); }
  25% { transform: translateX(-15px) rotate(-10deg); }
  75% { transform: translateX(15px) rotate(10deg); }
}
</style>
