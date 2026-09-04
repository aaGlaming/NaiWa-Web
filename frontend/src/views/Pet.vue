<script setup>
import { usePageMeta } from '@/composables/usePageMeta'
import MaximalButton from '@/components/ui/MaximalButton.vue'
import { useRouter } from 'vue-router'

usePageMeta()
const router = useRouter()

const tips = [
  '右下角可以隐藏或召唤桌宠',
  '拖拽到屏幕任意位置',
  '单击让它冒出一句短话',
  '双击打开本页',
  '形象源自 GitHub 开源桌宠项目'
]
</script>

<template>
  <div>
    <section class="ed-page pt-16 md:pt-24 pb-12 grid grid-cols-1 md:grid-cols-12 gap-10">
      <div class="md:col-span-7">
        <p class="ed-meta mb-6">Companion — Studio note</p>
        <h1 class="ed-display">
          一只<br />可拖拽的<br /><em class="italic">空白。</em>
        </h1>
        <p class="mt-8 text-lg text-charcoal max-w-md">
          漂浮在屏幕角落。它不会催你工作，只会陪你躺平。
        </p>
      </div>
    </section>

    <section class="ed-page pb-24">
      <p class="ed-meta mb-4"><span class="ed-num">01</span> Instructions</p>
      <hr class="ed-rule mb-2" />
      <p
        v-for="(tip, i) in tips"
        :key="i"
        class="grid grid-cols-12 gap-4 py-5 border-b border-ink/10"
      >
        <span class="col-span-2 ed-num">{{ String(i + 1).padStart(2, '0') }}</span>
        <span class="col-span-10">{{ tip }}</span>
      </p>
      <div class="mt-12">
        <MaximalButton variant="ghost" @click="router.push('/')">返回封面</MaximalButton>
      </div>
    </section>
  </div>
</template>
