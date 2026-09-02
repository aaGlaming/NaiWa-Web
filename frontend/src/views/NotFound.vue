<script setup>
import { usePageMeta } from '@/composables/usePageMeta'
import MaximalButton from '@/components/ui/MaximalButton.vue'
import { useRouter } from 'vue-router'

usePageMeta()
const router = useRouter()
</script>

<template>
  <div class="min-h-[70vh] flex items-center justify-center px-6 py-24">
    <div class="text-center max-w-lg border-8 border-black bg-[#FFD93D] p-12 shadow-neo">
      <div class="text-9xl mb-6 animate-bounce-subtle">🐸❓</div>
      <h1 class="font-heading text-6xl font-black uppercase mb-4">404</h1>
      <p class="font-bold text-xl mb-2">这只奶蛙找不到路了…</p>
      <p class="font-bold text-black/60 mb-8">页面可能不存在，或者奶蛙躺平睡过头了</p>
      <MaximalButton color="accent" size="lg" icon="🏠" @click="router.push('/')">回首页躺平</MaximalButton>
    </div>
  </div>
</template>
