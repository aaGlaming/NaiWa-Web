<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const emit = defineEmits(['skip', 'complete'])

const showText = ref(false)
const showCard = ref(false)
const particles = ref([])

// 生成粒子
function generateParticles() {
  const newParticles = []
  for (let i = 0; i < 50; i++) {
    newParticles.push({
      id: i,
      x: 50,
      y: 50,
      size: Math.random() * 8 + 4,
      color: ['#FFD700', '#FFA500', '#FF6347', '#FFE600', '#FFFFFF'][Math.floor(Math.random() * 5)],
      angle: Math.random() * 360,
      speed: Math.random() * 3 + 2,
      delay: Math.random() * 0.5
    })
  }
  particles.value = newParticles
}

onMounted(() => {
  generateParticles()

  // 动画序列
  setTimeout(() => showText.value = true, 300)
  setTimeout(() => showCard.value = true, 1200)
  setTimeout(() => emit('complete'), 2500)
})

function skip() {
  emit('skip')
}
</script>

<template>
  <div class="fixed inset-0 z-[300] flex items-center justify-center" @click="skip">
    <!-- 金色光芒背景 -->
    <div class="absolute inset-0 legendary-bg"></div>

    <!-- 粒子效果 -->
    <div class="absolute inset-0 pointer-events-none">
      <div
        v-for="p in particles"
        :key="p.id"
        class="absolute rounded-full particle"
        :style="{
          left: p.x + '%',
          top: p.y + '%',
          width: p.size + 'px',
          height: p.size + 'px',
          backgroundColor: p.color,
          '--angle': p.angle + 'deg',
          '--speed': p.speed + 's',
          '--delay': p.delay + 's'
        }"
      ></div>
    </div>

    <!-- 金色传说文字 -->
    <Transition name="legendary-text">
      <div v-if="showText" class="relative z-10 text-center">
        <h1 class="legendary-title text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-wider">
          金色传说
        </h1>
        <p class="text-xl md:text-2xl text-yellow-200/80 mt-4 font-heading">★ SSR ★</p>
      </div>
    </Transition>

    <!-- 跳过提示 -->
    <div class="absolute bottom-8 text-white/50 text-lg animate-pulse z-10">
      点击任意处跳过
    </div>
  </div>
</template>

<style scoped>
.legendary-bg {
  background: radial-gradient(
    ellipse at center,
    rgba(255, 215, 0, 0.4) 0%,
    rgba(255, 165, 0, 0.2) 30%,
    rgba(139, 69, 19, 0.1) 60%,
    rgba(0, 0, 0, 0.9) 100%
  );
  animation: pulse-bg 1.5s ease-in-out infinite alternate;
}

@keyframes pulse-bg {
  0% { opacity: 0.8; transform: scale(1); }
  100% { opacity: 1; transform: scale(1.1); }
}

.legendary-title {
  font-family: 'Bangers', 'Outfit', cursive;
  background: linear-gradient(
    180deg,
    #FFD700 0%,
    #FFA500 25%,
    #FFD700 50%,
    #FFE600 75%,
    #FFD700 100%
  );
  background-size: 100% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: none;
  filter: drop-shadow(0 0 20px rgba(255, 215, 0, 0.8))
          drop-shadow(0 0 40px rgba(255, 165, 0, 0.5))
          drop-shadow(0 0 60px rgba(255, 215, 0, 0.3));
  animation: shimmer 2s ease-in-out infinite, text-glow 1s ease-in-out infinite alternate;
}

@keyframes shimmer {
  0% { background-position: 0% 0%; }
  100% { background-position: 0% 100%; }
}

@keyframes text-glow {
  0% { filter: drop-shadow(0 0 20px rgba(255, 215, 0, 0.8)) drop-shadow(0 0 40px rgba(255, 165, 0, 0.5)); }
  100% { filter: drop-shadow(0 0 40px rgba(255, 215, 0, 1)) drop-shadow(0 0 80px rgba(255, 165, 0, 0.8)); }
}

.particle {
  animation: explode var(--speed) ease-out var(--delay) forwards;
  opacity: 0;
}

@keyframes explode {
  0% {
    opacity: 1;
    transform: translate(0, 0) scale(1);
  }
  100% {
    opacity: 0;
    transform: translate(
      calc(cos(var(--angle)) * 300px),
      calc(sin(var(--angle)) * 300px)
    ) scale(0);
  }
}

.legendary-text-enter-active {
  animation: text-enter 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

@keyframes text-enter {
  0% {
    opacity: 0;
    transform: scale(0.3) rotate(-10deg);
  }
  50% {
    opacity: 1;
    transform: scale(1.2) rotate(5deg);
  }
  100% {
    opacity: 1;
    transform: scale(1) rotate(0deg);
  }
}
</style>
