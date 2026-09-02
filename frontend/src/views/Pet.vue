<script setup>
import { usePageMeta } from '@/composables/usePageMeta'
import DesktopPet from '@/components/DesktopPet.vue'
import MaximalButton from '@/components/ui/MaximalButton.vue'
import { useRouter } from 'vue-router'

usePageMeta()
const router = useRouter()

const tips = [
  '右下角可以隐藏/召唤桌宠',
  '拖拽奶蛙到屏幕任意位置',
  '单击让奶蛙冒泡说话',
  '双击打开本页面',
  '奶蛙形象源自 GitHub 开源桌宠项目'
]
</script>

<template>
  <div>
    <section class="relative min-h-[60vh] flex items-center justify-center px-6 py-24">
      <div class="text-center max-w-2xl">
        <div class="text-9xl mb-8 animate-bounce-subtle">🐸</div>
        <h1 class="font-heading text-5xl md:text-6xl font-black uppercase mb-6">奶蛙桌宠</h1>
        <p class="font-bold text-lg mb-8 text-black/70">
          一只佛系的小奶蛙，漂浮在你的屏幕角落。<br />
          它不会催你工作，只会陪你躺平。
        </p>
        <MaximalButton color="secondary" icon="🏠" @click="router.push('/')">返回首页</MaximalButton>
      </div>
    </section>

    <section class="py-12 px-6 max-w-3xl mx-auto">
      <div class="border-4 border-black bg-[#FFD93D] p-8 shadow-neo">
        <h2 class="font-heading font-black text-2xl uppercase mb-6">使用说明</h2>
        <ul class="space-y-3">
          <li v-for="(tip, i) in tips" :key="i" class="flex items-start gap-3 font-bold">
            <span class="w-8 h-8 border-4 border-black bg-white flex items-center justify-center shrink-0 font-black text-sm">{{ i + 1 }}</span>
            {{ tip }}
          </li>
        </ul>
      </div>
    </section>

    <DesktopPet />
  </div>
</template>
