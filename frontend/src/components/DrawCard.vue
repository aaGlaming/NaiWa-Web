<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  image: { type: Object, required: true },
  rarity: { type: String, default: 'N' },
  revealed: { type: Boolean, default: false },
  index: { type: Number, default: 0 },
  falling: { type: Boolean, default: false }
})

const emit = defineEmits(['reveal', 'download'])

const isRevealed = ref(props.revealed)

watch(() => props.revealed, (val) => {
  isRevealed.value = val
})

const baseUrl = import.meta.env.BASE_URL || '/'

const rarityConfig = {
  N: { label: '普通', color: '#4CAF50', bg: '#1a2e1a', glow: 'rgba(76,175,80,0.4)', stars: '★' },
  R: { label: '稀有', color: '#2196F3', bg: '#1a1a2e', glow: 'rgba(33,150,243,0.4)', stars: '★★' },
  SR: { label: '史诗', color: '#9C27B0', bg: '#2e1a2e', glow: 'rgba(156,39,176,0.4)', stars: '★★★' },
  SSR: { label: '传说', color: '#FFD700', bg: '#2e2a1a', glow: 'rgba(255,215,0,0.5)', stars: '★★★★' }
}

const config = computed(() => rarityConfig[props.rarity] || rarityConfig.N)

function handleClick() {
  if (!isRevealed.value) {
    isRevealed.value = true
    emit('reveal')
  }
}

function handleDownload(e) {
  e.stopPropagation()
  emit('download')
}
</script>

<template>
  <div
    class="card-container"
    :class="{ 'falling': falling }"
    :style="{ '--delay': index * 0.15 + 's' }"
    @click="handleClick"
  >
    <div
      class="card-inner"
      :class="{ 'flipped': isRevealed }"
    >
      <!-- 卡牌背面 -->
      <div
        class="card-face card-back"
        :style="{
          borderColor: config.color,
          boxShadow: `0 0 20px ${config.glow}, 4px 4px 0 ${config.color}`
        }"
      >
        <div class="card-pattern"></div>
        <div class="card-content">
          <span class="text-5xl mb-2">🐸</span>
          <span class="rarity-badge" :style="{ color: config.color }">{{ config.stars }}</span>
          <span class="rarity-label" :style="{ color: config.color }">{{ config.label }}</span>
        </div>
      </div>

      <!-- 卡牌正面 -->
      <div
        class="card-face card-front"
        :style="{
          borderColor: config.color,
          boxShadow: `0 0 30px ${config.glow}, 6px 6px 0 ${config.color}`
        }"
      >
        <img
          :src="`${baseUrl}images/${image.filename}`"
          :alt="image.filename"
          class="card-image"
        />
        <div class="card-footer" :style="{ backgroundColor: config.bg }">
          <span class="rarity-tag" :style="{ color: config.color }">{{ config.label }}</span>
          <button
            @click="handleDownload"
            class="download-btn"
            :style="{ borderColor: config.color, color: config.color }"
            title="下载"
          >
            ⬇
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card-container {
  perspective: 1000px;
  width: 180px;
  height: 260px;
  cursor: pointer;
  opacity: 0;
  animation: card-appear 0.5s ease forwards;
  animation-delay: var(--delay);
}

.card-container.falling {
  animation: card-fall 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  animation-delay: var(--delay);
}

@keyframes card-appear {
  0% { opacity: 0; transform: translateY(-50px) rotate(-5deg); }
  100% { opacity: 1; transform: translateY(0) rotate(0); }
}

@keyframes card-fall {
  0% { opacity: 0; transform: translateY(-200px) rotate(-15deg) scale(0.8); }
  60% { opacity: 1; transform: translateY(10px) rotate(5deg) scale(1.05); }
  100% { opacity: 1; transform: translateY(0) rotate(0) scale(1); }
}

.card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  transform-style: preserve-3d;
}

.card-inner.flipped {
  transform: rotateY(180deg);
}

.card-face {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 16px;
  border-width: 4px;
  border-style: solid;
  overflow: hidden;
}

.card-back {
  background: linear-gradient(135deg, #2D1B4E 0%, #1a1a2e 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-pattern {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px);
  background-size: 10px 10px;
}

.card-content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.rarity-badge {
  font-size: 24px;
  text-shadow: 0 0 10px currentColor;
}

.rarity-label {
  font-family: 'Outfit', sans-serif;
  font-weight: 800;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.card-front {
  transform: rotateY(180deg);
  background: #0D0D1A;
  display: flex;
  flex-direction: column;
}

.card-image {
  flex: 1;
  width: 100%;
  object-fit: cover;
}

.card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
}

.rarity-tag {
  font-family: 'Outfit', sans-serif;
  font-weight: 800;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.download-btn {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 2px solid;
  background: rgba(13, 13, 26, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  transition: all 0.2s;
}

.download-btn:hover {
  background: currentColor;
  color: #0D0D1A !important;
  transform: scale(1.1);
}

@media (max-width: 640px) {
  .card-container {
    width: 140px;
    height: 200px;
  }
}
</style>
