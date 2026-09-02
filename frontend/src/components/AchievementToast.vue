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
        class="fixed top-24 right-6 z-[200] max-w-sm border-4 border-black bg-[#FFD93D] p-5 shadow-neo"
        @click="user.clearToast()"
      >
        <div class="flex items-start gap-3">
          <span class="text-3xl">{{ user.pendingToast.icon }}</span>
          <div>
            <p class="font-heading font-black uppercase text-sm text-[#FF6B6B]">成就解锁！</p>
            <p class="font-heading font-black text-lg">{{ user.pendingToast.title }}</p>
            <p class="text-sm font-bold text-black/70">{{ user.pendingToast.desc }}</p>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.toast-enter-active, .toast-leave-active { transition: all 0.3s ease; }
.toast-enter-from, .toast-leave-to { opacity: 0; transform: translateX(100%); }
</style>
