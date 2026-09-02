<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const visible = ref(localStorage.getItem('naiwa_pet_visible') === 'true')
const x = ref(Math.max(16, window.innerWidth - 100))
const y = ref(Math.max(100, window.innerHeight - 180))
const dragging = ref(false)
const moved = ref(false)
const offset = ref({ x: 0, y: 0 })
const messages = ['随便吧…', '躺…', '摸鱼中', '无所谓', 'zzz']
const bubble = ref('')
let bubbleTimer = null

function toggleVisible() {
  visible.value = !visible.value
  localStorage.setItem('naiwa_pet_visible', visible.value ? 'true' : 'false')
}

function onPointerDown(e) {
  dragging.value = true
  moved.value = false
  offset.value = { x: e.clientX - x.value, y: e.clientY - y.value }
  e.target.setPointerCapture?.(e.pointerId)
}

function onPointerMove(e) {
  if (!dragging.value) return
  moved.value = true
  x.value = Math.max(0, Math.min(window.innerWidth - 72, e.clientX - offset.value.x))
  y.value = Math.max(80, Math.min(window.innerHeight - 72, e.clientY - offset.value.y))
}

function onPointerUp() {
  dragging.value = false
}

function showBubble() {
  bubble.value = messages[Math.floor(Math.random() * messages.length)]
  clearTimeout(bubbleTimer)
  bubbleTimer = setTimeout(() => { bubble.value = '' }, 2000)
}

function onClick() {
  if (moved.value) return
  showBubble()
}

function openPetPage() {
  router.push('/pet')
}

onMounted(() => {
  window.addEventListener('pointermove', onPointerMove)
  window.addEventListener('pointerup', onPointerUp)
})

onUnmounted(() => {
  window.removeEventListener('pointermove', onPointerMove)
  window.removeEventListener('pointerup', onPointerUp)
  clearTimeout(bubbleTimer)
})
</script>

<template>
  <div v-if="visible" class="fixed z-[90] select-none touch-none" :style="{ left: `${x}px`, top: `${y}px` }">
    <div
      v-if="bubble"
      class="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1 bg-white border-4 border-black font-bold text-xs shadow-neo-sm"
    >
      {{ bubble }}
    </div>
    <div
      class="w-16 h-16 border-4 border-black bg-[#FFD93D] flex items-center justify-center text-3xl cursor-grab active:cursor-grabbing shadow-neo-sm hover:shadow-neo transition-shadow animate-bounce-subtle"
      role="button"
      tabindex="0"
      aria-label="奶蛙桌宠，拖拽移动，双击打开说明"
      @pointerdown="onPointerDown"
      @click="onClick"
      @dblclick="openPetPage"
    >
      🐸
    </div>
  </div>

  <button
    v-if="!visible"
    type="button"
    class="fixed bottom-6 left-6 z-[90] w-14 h-14 border-4 border-black bg-[#FFD93D] text-2xl shadow-neo-sm hover:shadow-neo transition-all"
    aria-label="召唤奶蛙桌宠"
    @click="toggleVisible"
  >
    🐸
  </button>
  <button
    v-else
    type="button"
    class="fixed bottom-6 left-6 z-[90] w-10 h-10 border-4 border-black bg-white text-sm font-black shadow-neo-sm"
    aria-label="隐藏桌宠"
    @click="toggleVisible"
  >
    ✕
  </button>
</template>
