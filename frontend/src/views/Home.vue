<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useImageStore } from '@/stores/images'
import MaximalButton from '@/components/ui/MaximalButton.vue'
import SectionTitle from '@/components/ui/SectionTitle.vue'
import FloatingShape from '@/components/ui/FloatingShape.vue'
import DailyFrog from '@/components/DailyFrog.vue'

const router = useRouter()
const store = useImageStore()
const heroVisible = ref(false)
const statsVisible = ref(false)

const quickLinks = [
  { path: '/lucky', label: '今日抽卡', icon: '🎰' },
  { path: '/meme', label: '制作梗图', icon: '😂' },
  { path: '/wallpaper', label: '生成壁纸', icon: '🎨' },
  { path: '/quiz', label: '心情测试', icon: '🧠' },
  { path: '/tarot', label: '塔罗占卜', icon: '🔮' },
  { path: '/collection', label: '我的图鉴', icon: '📚' }
]

const stats = computed(() => [
  { value: store.stats.total ? `${store.stats.total}` : '…', label: '表情包素材', emoji: '😄', color: '#FF6B6B' },
  { value: '2015', label: '起源年份', emoji: '📅', color: '#FFD93D' },
  { value: '∞', label: '可爱程度', emoji: '💖', color: '#C4B5FD' },
  { value: '🌍', label: '全球传播', emoji: '🌏', color: '#FF6B6B' }
])

const features = [
  { title: '佛系躺平', description: '奶蛙慵懒地躺在水中，四肢放松，完美诠释了"无所谓"的生活态度。', emoji: '🧘' },
  { title: '魔性传播', description: '从台湾PTT论坛出发，奶蛙迅速席卷整个中文互联网。', emoji: '🚀' },
  { title: '治愈能量', description: '奶蛙圆滚滚的白色肚子、呆萌的表情，瞬间治愈你疲惫的心灵。', emoji: '✨' },
  { title: '无限创作', description: '从简单的一张图，网友们创造了无数变体，每一张都充满创意。', emoji: '🎨' }
]

const timeline = [
  { year: '2015', event: '奶蛙在台湾PTT论坛首次出现', emoji: '🌱', bg: 'bg-[#FF6B6B] text-white' },
  { year: '2016', event: '表情包在大陆社交平台走红', emoji: '🔥', bg: 'bg-[#FFD93D]' },
  { year: '2020', event: '与"躺平"文化完美结合', emoji: '😴', bg: 'bg-[#C4B5FD]' },
  { year: '至今', event: '持续创作，热度不减', emoji: '🎉', bg: 'bg-white' }
]

onMounted(() => {
  store.fetchImages()
  setTimeout(() => { heroVisible.value = true }, 100)
  setTimeout(() => { statsVisible.value = true }, 500)
})
</script>

<template>
  <div>
    <section class="relative min-h-screen flex items-center justify-center px-6 py-24 overflow-hidden">
      <div class="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
        <span class="text-[12rem] md:text-[20rem] font-heading font-black text-black/[0.03] uppercase select-none leading-none tracking-tighter">FROG</span>
      </div>

      <FloatingShape :colorIndex="0" size="xl" shape="square" animation="float" top="15%" left="5%" />
      <FloatingShape :colorIndex="1" size="lg" shape="circle" animation="float" top="25%" right="8%" />
      <FloatingShape :colorIndex="2" size="md" shape="diamond" animation="spin" bottom="20%" left="10%" />
      <FloatingShape :colorIndex="3" size="lg" shape="square" animation="bounce" bottom="30%" right="12%" />

      <div class="relative z-20 text-center max-w-5xl mx-auto transition-all duration-500" :class="heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'">
        <div class="text-8xl md:text-9xl mb-8 animate-bounce-subtle" aria-hidden="true">🐸</div>
        <h1 class="font-heading text-5xl md:text-7xl lg:text-9xl font-black uppercase leading-none mb-8 tracking-tight">
          <span class="text-[#FF6B6B]">奶蛙</span><br/>
          <span class="text-[#FFD93D] text-stroke">世界</span>
        </h1>
        <div class="border-4 border-black bg-white px-6 py-3 inline-block shadow-neo-sm mb-8">
          <p class="font-bold text-lg md:text-xl">探索这个风靡互联网的可爱角色</p>
        </div>
        <p class="text-lg text-black/60 mb-10 font-bold">🌟 一个让你瞬间放松的佛系小可爱 🌟</p>
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
          <MaximalButton color="accent" size="lg" icon="🐸" @click="router.push('/about')">了解奶蛙</MaximalButton>
          <MaximalButton color="secondary" size="lg" icon="🖼️" @click="router.push('/gallery')">浏览图片库</MaximalButton>
          <MaximalButton color="tertiary" size="lg" icon="🎰" @click="router.push('/lucky')">立即抽卡</MaximalButton>
        </div>
      </div>
    </section>

    <DailyFrog />

    <section class="relative py-24 px-6 bg-white border-y-8 border-black">
      <div class="max-w-5xl mx-auto">
        <SectionTitle title="玩法入口" subtitle="更多奶蛙互动等你探索" :colorIndex="3" emoji="🎮" />
        <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
          <button
            v-for="link in quickLinks"
            :key="link.path"
            type="button"
            class="border-4 border-black p-6 text-left bg-[#FFD93D] shadow-neo-sm hover:shadow-neo hover:-translate-y-1 transition-all duration-100"
            @click="router.push(link.path)"
          >
            <span class="text-3xl block mb-2" aria-hidden="true">{{ link.icon }}</span>
            <span class="font-heading font-black uppercase">{{ link.label }}</span>
          </button>
        </div>
      </div>
    </section>

    <section class="relative py-36 px-6">
      <div class="max-w-5xl mx-auto">
        <SectionTitle title="奶蛙数据" subtitle="这个小可爱到底有多火？" :colorIndex="0" emoji="📊" />
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 transition-all duration-700" :class="statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'">
          <div v-for="(stat, index) in stats" :key="stat.label"
            class="text-center p-8 border-4 border-black bg-white transition-all duration-200 hover:-translate-y-2"
            :class="index % 2 === 0 ? 'rotate-1' : '-rotate-1'"
            :style="{ boxShadow: '8px 8px 0px 0px #000' }">
            <div class="text-4xl mb-3" aria-hidden="true">{{ stat.emoji }}</div>
            <div class="font-heading text-3xl md:text-4xl font-black mb-1" :style="{ color: stat.color }">{{ stat.value }}</div>
            <div class="text-black/60 text-sm font-bold uppercase tracking-wider">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <section class="relative py-36 px-6 bg-[#FFD93D] border-y-8 border-black">
      <div class="max-w-6xl mx-auto">
        <SectionTitle title="为什么奶蛙这么火" subtitle="这些特质让它成为互联网顶流" :colorIndex="2" emoji="🔥" />
        <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div v-for="(feature, index) in features" :key="feature.title"
            class="border-4 border-black p-10 bg-white transition-all duration-200 hover:-translate-y-2"
            :class="index % 2 === 1 ? 'md:translate-y-8' : ''"
            :style="{ boxShadow: '8px 8px 0px 0px #000' }">
            <div class="text-6xl mb-4 animate-bounce-subtle" aria-hidden="true">{{ feature.emoji }}</div>
            <h3 class="font-heading text-2xl md:text-3xl font-black uppercase mb-4">{{ feature.title }}</h3>
            <p class="text-lg leading-relaxed font-medium">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="relative py-36 px-6">
      <div class="max-w-4xl mx-auto">
        <SectionTitle title="奶蛙编年史" subtitle="从一只小青蛙到互联网顶流" :colorIndex="1" emoji="📜" />
        <div class="relative">
          <div class="absolute left-8 md:left-1/2 top-0 bottom-0 w-2 bg-black -translate-x-1/2"></div>
          <div class="space-y-16">
            <div v-for="(item, index) in timeline" :key="item.year"
              class="relative flex items-center gap-8 md:gap-0"
              :class="index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'">
              <div class="absolute left-8 md:left-1/2 w-16 h-16 rounded-full border-4 border-black bg-[#FFD93D] flex items-center justify-center text-3xl -translate-x-1/2 z-10 shadow-neo-sm" aria-hidden="true">{{ item.emoji }}</div>
              <div class="ml-24 md:ml-0 md:w-1/2" :class="index % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16'">
                <div :class="['inline-block px-5 py-2 border-4 border-black font-heading font-black text-xl mb-3 shadow-neo-sm', item.bg]">{{ item.year }}</div>
                <p class="text-lg font-bold">{{ item.event }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="relative py-36 px-6">
      <div class="max-w-4xl mx-auto text-center">
        <div class="border-8 border-black bg-[#FF6B6B] p-16 relative overflow-hidden" style="box-shadow: 16px 16px 0px 0px #000;">
          <div class="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
            <span class="text-[8rem] md:text-[12rem] font-heading font-black text-white/[0.1] uppercase select-none leading-none">WOW</span>
          </div>
          <div class="relative z-10">
            <div class="text-6xl mb-6 animate-bounce-subtle" aria-hidden="true">🐸✨</div>
            <h2 class="font-heading text-3xl md:text-5xl font-black uppercase text-white mb-6 tracking-tight">准备好被奶蛙治愈了吗？</h2>
            <p class="text-white/80 text-lg md:text-xl mb-10 max-w-2xl mx-auto font-bold">从今天开始，让奶蛙成为你的精神伙伴。</p>
            <MaximalButton color="secondary" size="lg" icon="🎰" @click="router.push('/lucky')">去抽卡</MaximalButton>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
