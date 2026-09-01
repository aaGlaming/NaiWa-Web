<script setup>
import { ref, onMounted } from 'vue'

const emit = defineEmits(['skip', 'complete'])

const showText = ref(false)
const showRings = ref(false)
const particles = ref([])

// 生成粒子
function generateParticles() {
  const newParticles = []
  for (let i = 0; i < 80; i++) {
    const angle = (i / 80) * 360
    newParticles.push({
      id: i,
      x: 50,
      y: 50,
      size: Math.random() * 12 + 4,
      color: ['#FFD700', '#FFA500', '#FF6347', '#FFE600', '#FFFFFF', '#FF4500'][Math.floor(Math.random() * 6)],
      angle: angle,
      speed: Math.random() * 4 + 3,
      delay: Math.random() * 0.8
    })
  }
  particles.value = newParticles
}

onMounted(() => {
  generateParticles()

  // 动画序列
  setTimeout(() => showRings.value = true, 200)
  setTimeout(() => showText.value = true, 500)
  setTimeout(() => emit('complete'), 3000)
})

function skip() {
  emit('skip')
}
</script>

<template>
  <div class="fixed inset-0 z-[300] flex items-center justify-center" @click="skip">
    <!-- 金色光芒背景 -->
    <div class="absolute inset-0 legendary-bg"></div>

    <!-- 旋转光环 -->
    <div v-if="showRings" class="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div class="ring ring-1"></div>
      <div class="ring ring-2"></div>
      <div class="ring ring-3"></div>
    </div>

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
        <!-- 上方装饰 -->
        <div class="text-5xl mb-4 animate-bounce-subtle">✨👑✨</div>

        <!-- 主标题 -->
        <h1 class="legendary-title text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-wider">
          金色传说
        </h1>

        <!-- 下方装饰 -->
        <p class="text-2xl md:text-3xl text-yellow-200/80 mt-4 font-heading tracking-widest">
          ★ ★ ★ ★ SSR ★ ★ ★ ★
        </p>

        <!-- 装饰线 -->
        <div class="flex items-center justify-center gap-4 mt-6">
          <div class="h-1 w-20 bg-gradient-to-r from-transparent to-yellow-400"></div>
          <span class="text-3xl">🐸</span>
          <div class="h-1 w-20 bg-gradient-to-l from-transparent to-yellow-400"></div>
        </div>
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
    rgba(255, 215, 0, 0.5) 0%,
    rgba(255, 165, 0, 0.3) 25%,
    rgba(255, 69, 0, 0.15) 50%,
    rgba(0, 0, 0, 0.95) 100%
  );
  animation: pulse-bg 1.5s ease-in-out infinite alternate;
}

@keyframes pulse-bg {
  0% { opacity: 0.8; transform: scale(1); }
  100% { opacity: 1; transform: scale(1.15); }
}

/* 旋转光环 */
.ring {
  position: absolute;
  border-radius: 50%;
  border: 4px solid;
  animation: spin-ring 3s linear infinite;
}

.ring-1 {
  width: 300px;
  height: 300px;
  border-color: rgba(255, 215, 0, 0.6);
  animation-duration: 3s;
}

.ring-2 {
  width: 400px;
  height: 400px;
  border-color: rgba(255, 165, 0, 0.4);
  animation-duration: 4s;
  animation-direction: reverse;
}

.ring-3 {
  width: 500px;
  height: 500px;
  border-color: rgba(255, 69, 0, 0.3);
  animation-duration: 5s;
}

@keyframes spin-ring {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.legendary-title {
  font-family: 'Bangers', 'Outfit', cursive;
  background: linear-gradient(
    180deg,
    #FFD700 0%,
    #FFA500 20%,
    #FFD700 40%,
    #FFE600 60%,
    #FFD700 80%,
    #FFA500 100%
  );
  background-size: 100% 300%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: none;
  filter: drop-shadow(0 0 30px rgba(255, 215, 0, 0.9))
          drop-shadow(0 0 60px rgba(255, 165, 0, 0.6))
          drop-shadow(0 0 90px rgba(255, 69, 0, 0.3));
  animation: shimmer 2s ease-in-out infinite, text-glow 1s ease-in-out infinite alternate;
}

@keyframes shimmer {
  0% { background-position: 0% 0%; }
  100% { background-position: 0% 100%; }
}

@keyframes text-glow {
  0% { filter: drop-shadow(0 0 30px rgba(255, 215, 0, 0.9)) drop-shadow(0 0 60px rgba(255, 165, 0, 0.6)); }
  100% { filter: drop-shadow(0 0 50px rgba(255, 215, 0, 1)) drop-shadow(0 0 100px rgba(255, 165, 0, 0.9)); }
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
      calc(cos(var(--angle)) * 400px),
      calc(sin(var(--angle)) * 400px)
    ) scale(0);
  }
}

.legendary-text-enter-active {
  animation: text-enter 1s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

@keyframes text-enter {
  0% {
    opacity: 0;
    transform: scale(0.2) rotate(-15deg);
  }
  50% {
    opacity: 1;
    transform: scale(1.3) rotate(5deg);
  }
  100% {
    opacity: 1;
    transform: scale(1) rotate(0deg);
  }
}
</style>
