<script setup>
import { RouterView, RouterLink, useRoute } from 'vue-router'
import { ref } from 'vue'
import CardReveal from '@/components/CardReveal.vue'
import DesktopPet from '@/components/DesktopPet.vue'
import AchievementToast from '@/components/AchievementToast.vue'
import { usePageMeta } from '@/composables/usePageMeta'

const route = useRoute()
const isMenuOpen = ref(false)
const showCardReveal = ref(true)

usePageMeta()

const navItems = [
  { path: '/', label: '首页', icon: '🏠' },
  { path: '/gallery', label: '图片库', icon: '🖼️' },
  { path: '/lucky', label: '抽卡', icon: '🎰' },
  { path: '/meme', label: '梗图', icon: '😂' },
  { path: '/collection', label: '图鉴', icon: '📚' },
  { path: '/quiz', label: '测试', icon: '🧠' },
  { path: '/about', label: '关于', icon: '🐸' },
  { path: '/contact', label: '联系', icon: '💌' }
]

const moreItems = [
  { path: '/wallpaper', label: '壁纸', icon: '🎨' },
  { path: '/tarot', label: '塔罗', icon: '🔮' },
  { path: '/pet', label: '桌宠', icon: '🐸' },
  { path: '/changelog', label: '日志', icon: '📋' }
]

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}
</script>

<template>
  <div class="min-h-screen bg-[#FFFDF5] text-[#000] relative overflow-hidden">
    <!-- Global Pattern Layer -->
    <div class="fixed inset-0 pointer-events-none z-0 pattern-dots opacity-[0.03]"></div>

    <!-- Navigation Header -->
    <header class="fixed top-0 left-0 right-0 z-50 bg-[#FFFDF5] border-b-4 border-black">
      <nav class="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        <!-- Logo -->
        <RouterLink to="/" class="flex items-center gap-3 group">
          <div class="w-12 h-12 bg-[#FFD93D] border-4 border-black flex items-center justify-center shadow-neo-sm group-hover:shadow-neo group-hover:translate-x-[2px] group-hover:translate-y-[2px] transition-all duration-100">
            <span class="text-2xl">🐸</span>
          </div>
          <span class="font-heading text-2xl font-black uppercase tracking-tight">
            奶蛙世界
          </span>
        </RouterLink>

        <!-- Desktop Nav -->
        <div class="hidden lg:flex items-center gap-1.5 flex-wrap justify-end max-w-3xl">
          <RouterLink
            v-for="item in navItems"
            :key="item.path"
            :to="item.path"
            class="px-3 py-2 font-heading font-bold uppercase tracking-wide text-xs border-4 border-black transition-all duration-100"
            :class="[
              route.path === item.path
                ? 'bg-[#FF6B6B] text-white shadow-neo-sm translate-x-[2px] translate-y-[2px] shadow-none'
                : 'bg-[#FFD93D] hover:bg-[#FF6B6B] hover:text-white shadow-neo-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none active:translate-x-[4px] active:translate-y-[4px]'
            ]"
          >
            {{ item.icon }} {{ item.label }}
          </RouterLink>
          <div class="relative group">
            <span class="px-3 py-2 font-heading font-bold uppercase tracking-wide text-xs border-4 border-black bg-[#C4B5FD] cursor-default shadow-neo-sm inline-block">➕ 更多</span>
            <div class="absolute right-0 top-full pt-2 hidden group-hover:block z-50">
              <div class="border-4 border-black bg-white p-2 min-w-[140px] shadow-neo">
                <RouterLink
                  v-for="item in moreItems"
                  :key="item.path"
                  :to="item.path"
                  class="block px-3 py-2 font-bold text-sm hover:bg-[#FFD93D] border-b-2 border-black/10 last:border-0"
                >
                  {{ item.icon }} {{ item.label }}
                </RouterLink>
              </div>
            </div>
          </div>
        </div>

        <!-- Mobile Menu Toggle -->
        <button
          @click="toggleMenu"
          class="lg:hidden w-12 h-12 border-4 border-black bg-[#FFD93D] flex items-center justify-center shadow-neo-sm transition-all duration-100 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
          :aria-label="isMenuOpen ? '关闭菜单' : '打开菜单'"
        >
          <span class="text-2xl font-black">{{ isMenuOpen ? '✕' : '☰' }}</span>
        </button>
      </nav>

      <!-- Mobile Menu -->
      <div
        v-show="isMenuOpen"
        class="lg:hidden border-t-4 border-black bg-[#FFFDF5]"
      >
        <div class="px-6 py-4 flex flex-col gap-3">
          <RouterLink
            v-for="item in [...navItems, ...moreItems]"
            :key="item.path"
            :to="item.path"
            @click="isMenuOpen = false"
            class="px-5 py-4 font-heading font-bold uppercase tracking-wide text-sm border-4 border-black text-center transition-all duration-100"
            :class="[
              route.path === item.path
                ? 'bg-[#FF6B6B] text-white shadow-neo-sm translate-x-[2px] translate-y-[2px] shadow-none'
                : 'bg-[#FFD93D] shadow-neo-sm active:translate-x-[2px] active:translate-y-[2px] active:shadow-none'
            ]"
          >
            {{ item.icon }} {{ item.label }}
          </RouterLink>
        </div>
      </div>
    </header>

    <!-- Card Reveal Popup -->
    <CardReveal v-if="showCardReveal" @close="showCardReveal = false" />

    <AchievementToast />
    <DesktopPet />

    <!-- Main Content -->
    <main class="relative z-10 pt-28">
      <RouterView />
    </main>

    <!-- Footer -->
    <footer class="relative z-10 border-t-8 border-black bg-[#FFD93D] mt-24">
      <div class="max-w-7xl mx-auto px-8 py-16">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
          <!-- Brand -->
          <div>
            <div class="flex items-center gap-3 mb-4">
              <div class="w-12 h-12 bg-[#FF6B6B] border-4 border-black flex items-center justify-center shadow-neo-sm">
                <span class="text-2xl">🐸</span>
              </div>
              <h3 class="font-heading text-3xl font-black uppercase tracking-tight">奶蛙世界</h3>
            </div>
            <p class="text-black/70 text-lg">
              探索奶蛙的奇妙世界，感受互联网文化的独特魅力。
            </p>
          </div>

          <!-- Links (two columns) -->
          <div>
            <h4 class="font-heading text-xl font-black uppercase tracking-wider mb-4 border-b-4 border-black pb-2 inline-block">导航</h4>
            <div class="grid grid-cols-2 gap-x-6 gap-y-3">
              <RouterLink
                v-for="item in [...navItems, ...moreItems]"
                :key="item.path"
                :to="item.path"
                class="font-bold text-base border-b-2 border-transparent hover:border-black hover:bg-[#FF6B6B] hover:text-white px-1 transition-all duration-100"
              >
                {{ item.icon }} {{ item.label }}
              </RouterLink>
            </div>
          </div>

          <!-- Info -->
          <div>
            <h4 class="font-heading text-xl font-black uppercase tracking-wider mb-4 border-b-4 border-black pb-2 inline-block">关于</h4>
            <p class="text-black/70 text-base mb-2">图片素材来源于网络公开资源</p>
            <p class="text-black/70 text-base">仅供个人娱乐，非商业用途</p>
            <div class="mt-4 flex flex-wrap gap-2">
              <span class="px-3 py-1.5 bg-[#FF6B6B] text-white border-2 border-black font-bold text-sm shadow-neo-sm">🐸 奶蛙</span>
              <span class="px-3 py-1.5 bg-[#C4B5FD] border-2 border-black font-bold text-sm shadow-neo-sm">😄 表情包</span>
              <span class="px-3 py-1.5 bg-white border-2 border-black font-bold text-sm shadow-neo-sm">🎬 动画</span>
            </div>
          </div>
        </div>

        <!-- Bottom Bar -->
        <div class="mt-12 pt-8 border-t-4 border-black text-center">
          <p class="font-bold text-base uppercase tracking-wider">
            © 2026 奶蛙世界 - 个人娱乐项目 | 设计风格: Neo-Brutalism
          </p>
          <p class="text-black/50 text-sm mt-2">
            角色形象版权归原作者所有，请勿用于商业用途 ·
            <RouterLink to="/changelog" class="underline hover:text-black">更新日志</RouterLink>
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>
