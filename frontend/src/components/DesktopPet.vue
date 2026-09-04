<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const visible = ref(loadVisible())
const x = ref(typeof window !== 'undefined' ? window.innerWidth - 100 : 0)
const y = ref(typeof window !== 'undefined' ? window.innerHeight - 160 : 0)
const dragging = ref(false)
const moved = ref(false)
const offset = ref({ x: 0, y: 0 })
const messages = ['随便吧…', '躺…', '摸鱼中', '无所谓', 'zzz']
const bubble = ref('')
let bubbleTimer = null

function loadVisible() {
  return localStorage.getItem('naiwa_pet_visible') !== 'false'
}

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
  const nx = Math.max(0, Math.min(window.innerWidth - 72, e.clientX - offset.value.x))
  const ny = Math.max(80, Math.min(window.innerHeight - 72, e.clientY - offset.value.y))
  if (Math.abs(nx - x.value) > 2 || Math.abs(ny - y.value) > 2) moved.value = true
  x.value = nx
  y.value = ny
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

defineExpose({ toggleVisible })
</script>

<template>
  <div v-if="visible" class="fixed z-[90] select-none touch-none" :style="{ left: `${x}px`, top: `${y}px` }">
    <div
      v-if="bubble"
      class="absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-1 bg-paper border border-ink/20 ed-meta text-ink"
    >
      {{ bubble }}
    </div>
    <div
      class="w-14 h-14 border border-ink/25 bg-warm-white flex items-center justify-center text-2xl cursor-grab active:cursor-grabbing"
      @pointerdown="onPointerDown"
      @click="onClick"
      @dblclick="openPetPage"
      title="拖拽移动 · 双击打开桌宠页 · 单击冒泡"
    >
      🐸
    </div>
  </div>

  <button
    v-if="!visible"
    class="fixed bottom-6 right-6 z-[90] ed-meta px-3 py-2 border border-ink/20 bg-paper"
    title="召唤奶蛙桌宠"
    @click="toggleVisible"
  >
    Pet
  </button>
  <button
    v-else
    class="fixed bottom-6 right-6 z-[90] ed-meta px-3 py-2 border border-ink/20 bg-paper"
    title="隐藏桌宠"
    @click="toggleVisible"
  >
    Hide
  </button>
</template>
