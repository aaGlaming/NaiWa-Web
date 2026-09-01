<script setup>
import { RouterView, RouterLink, useRoute } from 'vue-router'
import { ref, computed } from 'vue'
import CardReveal from '@/components/CardReveal.vue'

const route = useRoute()
const isMenuOpen = ref(false)
const showCardReveal = ref(true)

const navItems = [
  { path: '/', label: '首页', icon: '🏠' },
  { path: '/about', label: '关于奶蛙', icon: '🐸' },
  { path: '/gallery', label: '图片库', icon: '🖼️' },
  { path: '/lucky', label: '抽卡', icon: '🎰' },
  { path: '/wallpaper', label: '壁纸', icon: '🎨' },
  { path: '/contact', label: '联系', icon: '💌' }
]

const currentNavIndex = computed(() => {
  return navItems.findIndex(item => item.path === route.path)
})

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}
</script>

<template>
  <div class="min-h-screen bg-max-background relative overflow-hidden">
    <!-- Global Pattern Layers -->
    <div class="fixed inset-0 pointer-events-none z-0 pattern-dots opacity-30"></div>
    <div class="fixed inset-0 pointer-events-none z-0 pattern-stripes opacity-20"></div>
    <div class="fixed inset-0 pointer-events-none z-0 pattern-mesh"></div>

    <!-- Floating Decorative Shapes -->
    <div class="fixed top-[10%] left-[5%] w-6 h-6 bg-max-accent rounded-full animate-float opacity-60 z-30" aria-hidden="true"></div>
    <div class="fixed top-[20%] right-[8%] w-8 h-8 bg-max-secondary rotate-45 animate-float-reverse opacity-50 z-30" aria-hidden="true"></div>
    <div class="fixed bottom-[15%] left-[10%] w-10 h-10 bg-max-tertiary rounded-full animate-wiggle opacity-40 z-30" aria-hidden="true"></div>
    <div class="fixed top-[60%] right-[5%] w-5 h-5 bg-max-quaternary animate-bounce-subtle opacity-50 z-30" aria-hidden="true"></div>
    <div class="fixed bottom-[30%] right-[15%] w-7 h-7 bg-max-quinary rounded-full animate-float opacity-45 z-30" aria-hidden="true"></div>

    <!-- Navigation Header -->
    <header class="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-max-background/80 border-b-4 border-max-accent">
      <nav class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <!-- Logo -->
        <RouterLink to="/" class="flex items-center gap-3 group">
          <span class="text-4xl animate-wiggle">🐸</span>
          <span class="font-heading text-2xl font-black uppercase text-max-accent text-shadow-double group-hover:text-max-secondary transition-colors duration-300">
            奶蛙世界
          </span>
        </RouterLink>

        <!-- Desktop Nav -->
        <div class="hidden md:flex items-center gap-2">
          <RouterLink
            v-for="(item, index) in navItems"
            :key="item.path"
            :to="item.path"
            class="relative px-5 py-2 font-heading font-bold uppercase tracking-wider text-sm border-2 transition-all duration-300 rounded-full"
            :class="[
              route.path === item.path
                ? 'bg-max-accent text-max-background border-max-accent shadow-multi scale-105'
                : 'border-max-secondary text-max-foreground hover:bg-max-secondary hover:border-max-secondary hover:text-max-background hover:scale-105'
            ]"
          >
            <span class="mr-1">{{ item.icon }}</span>
            {{ item.label }}
          </RouterLink>
        </div>

        <!-- Mobile Menu Toggle -->
        <button
          @click="toggleMenu"
          class="md:hidden p-2 border-4 border-max-secondary rounded-full text-max-secondary hover:bg-max-secondary hover:text-max-background transition-all duration-300"
          :aria-label="isMenuOpen ? '关闭菜单' : '打开菜单'"
        >
          <svg v-if="!isMenuOpen" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </nav>

      <!-- Mobile Menu -->
      <div
        v-show="isMenuOpen"
        class="md:hidden border-t-4 border-max-secondary bg-max-background/95 backdrop-blur-md"
      >
        <div class="px-6 py-4 flex flex-col gap-3">
          <RouterLink
            v-for="item in navItems"
            :key="item.path"
            :to="item.path"
            @click="isMenuOpen = false"
            class="px-5 py-3 font-heading font-bold uppercase tracking-wider text-sm border-4 rounded-2xl text-center transition-all duration-300"
            :class="[
              route.path === item.path
                ? 'bg-max-accent text-max-background border-max-accent'
                : 'border-max-tertiary text-max-foreground hover:bg-max-tertiary hover:text-max-background'
            ]"
          >
            <span class="mr-2">{{ item.icon }}</span>
            {{ item.label }}
          </RouterLink>
        </div>
      </div>
    </header>

    <!-- Card Reveal Popup -->
    <CardReveal v-if="showCardReveal" @close="showCardReveal = false" />

    <!-- Main Content -->
    <main class="relative z-10 pt-20">
      <RouterView />
    </main>

    <!-- Footer -->
    <footer class="relative z-10 border-t-8 border-double border-max-secondary mt-24">
      <div class="max-w-7xl mx-auto px-8 py-16">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
          <!-- Brand -->
          <div>
            <div class="flex items-center gap-3 mb-4">
              <span class="text-5xl animate-wiggle">🐸</span>
              <h3 class="font-heading text-3xl font-black text-max-accent text-shadow-double">奶蛙世界</h3>
            </div>
            <p class="text-white/70 text-lg">
              探索奶蛙的奇妙世界，感受互联网文化的独特魅力。
            </p>
          </div>

          <!-- Links -->
          <div>
            <h4 class="font-heading text-xl font-bold text-max-tertiary uppercase tracking-wider mb-4">导航</h4>
            <div class="flex flex-col gap-2">
              <RouterLink
                v-for="item in navItems"
                :key="item.path"
                :to="item.path"
                class="text-white/70 hover:text-max-accent transition-colors text-lg"
              >
                {{ item.icon }} {{ item.label }}
              </RouterLink>
            </div>
          </div>

          <!-- Info -->
          <div>
            <h4 class="font-heading text-xl font-bold text-max-quaternary uppercase tracking-wider mb-4">关于</h4>
            <p class="text-white/70 text-lg mb-2">图片素材来源于网络公开资源</p>
            <p class="text-white/70 text-lg">仅供个人娱乐，非商业用途</p>
            <div class="mt-4 flex gap-2">
              <span class="px-3 py-1 bg-max-muted rounded-full text-sm text-max-accent border-2 border-max-accent">🐸 奶蛙</span>
              <span class="px-3 py-1 bg-max-muted rounded-full text-sm text-max-secondary border-2 border-max-secondary">😄 表情包</span>
              <span class="px-3 py-1 bg-max-muted rounded-full text-sm text-max-tertiary border-2 border-max-tertiary">🎬 动画</span>
            </div>
          </div>
        </div>

        <!-- Bottom Bar -->
        <div class="mt-12 pt-8 border-t-4 border-dashed border-max-quinary text-center">
          <p class="text-white/50 text-lg">
            © 2026 奶蛙世界 - 个人娱乐项目 | 设计风格: Maximalism / Dopamine
          </p>
          <p class="text-white/30 text-sm mt-2">
            角色形象版权归原作者所有，请勿用于商业用途
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>
