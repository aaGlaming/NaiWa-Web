<script setup>
import { ref, onMounted } from 'vue'

const emit = defineEmits(['skip', 'complete'])
const showText = ref(false)

onMounted(() => {
  setTimeout(() => { showText.value = true }, 200)
  setTimeout(() => emit('complete'), 2800)
})

function skip() {
  emit('skip')
}
</script>

<template>
  <div class="fixed inset-0 z-[300] flex items-center justify-center bg-ink cursor-pointer" @click="skip">
    <Transition name="legendary-text">
      <div v-if="showText" class="text-center px-6">
        <p class="ed-meta text-paper/60 mb-6">SSR — Cover story</p>
        <h1 class="font-display text-paper text-6xl md:text-8xl leading-[0.88]">
          A cover<br />worth keeping.
        </h1>
        <p class="ed-meta text-paper/50 mt-10">Click to continue</p>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.legendary-text-enter-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.legendary-text-enter-from {
  opacity: 0;
  transform: translateY(12px);
}
</style>
