<script setup>
import { watch } from 'vue'
import { useUserStore } from '@/stores/user'

const user = useUserStore()

watch(() => user.pendingToast, (val) => {
  if (val) setTimeout(() => user.clearToast(), 4000)
})
</script>

<template>
  <Teleport to="body">
    <Transition name="toast">
      <div
        v-if="user.pendingToast"
        class="fixed top-20 right-6 z-[200] max-w-sm bg-paper border border-ink/20 p-5 cursor-pointer"
        @click="user.clearToast()"
      >
        <p class="ed-meta text-accent mb-1">Achievement</p>
        <p class="font-display text-2xl leading-tight">{{ user.pendingToast.title }}</p>
        <p class="text-sm text-warm-gray mt-2">{{ user.pendingToast.desc }}</p>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.toast-enter-active, .toast-leave-active { transition: opacity 0.3s ease, transform 0.3s ease; }
.toast-enter-from, .toast-leave-to { opacity: 0; transform: translateY(-8px); }
</style>
