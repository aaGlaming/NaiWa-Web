<script setup>
import { ref, onMounted } from 'vue'
import MaximalButton from '@/components/ui/MaximalButton.vue'
import MaximalCard from '@/components/ui/MaximalCard.vue'
import SectionTitle from '@/components/ui/SectionTitle.vue'
import FloatingShape from '@/components/ui/FloatingShape.vue'
import { ACCENT_COLORS } from '@/utils'

const heroVisible = ref(false)
const statsVisible = ref(false)

const stats = [
  { value: '447+', label: '表情包素材', emoji: '😄', colorIndex: 0 },
  { value: '2015', label: '起源年份', emoji: '📅', colorIndex: 1 },
  { value: '∞', label: '可爱程度', emoji: '💖', colorIndex: 2 },
  { value: '🌍', label: '全球传播', emoji: '🌏', colorIndex: 3 }
]

const features = [
  {
    title: '佛系躺平',
    description: '奶蛙慵懒地躺在水中，四肢放松，完美诠释了"无所谓"的生活态度。这种佛系精神让它成为了年轻人表达压力的首选表情。',
    emoji: '🧘',
    colorIndex: 0,
    pattern: 'dots'
  },
  {
    title: '魔性传播',
    description: '从台湾PTT论坛出发，奶蛙迅速席卷整个中文互联网。简单的形象却蕴含着无限的创作可能，让每个网友都能找到共鸣。',
    emoji: '🚀',
    colorIndex: 1,
    pattern: 'stripes'
  },
  {
    title: '治愈能量',
    description: '奶蛙圆滚滚的白色肚子、呆萌的表情，瞬间治愈你疲惫的心灵。看一眼就能感受到温暖，这就是奶蛙的魔力。',
    emoji: '✨',
    colorIndex: 2,
    pattern: 'checker'
  },
  {
    title: '无限创作',
    description: '从简单的一张图，网友们创造了无数变体：奶蛙打工、奶蛙恋爱、奶蛙摸鱼...每一张都充满创意和笑点。',
    emoji: '🎨',
    colorIndex: 3,
    pattern: 'mesh'
  }
]

const timeline = [
  { year: '2015', event: '奶蛙在台湾PTT论坛首次出现', emoji: '🌱' },
  { year: '2016', event: '表情包在大陆社交平台走红', emoji: '🔥' },
  { year: '2020', event: '与"躺平"文化完美结合', emoji: '😴' },
  { year: '至今', event: '持续创作，热度不减', emoji: '🎉' }
]

onMounted(() => {
  setTimeout(() => heroVisible.value = true, 100)
  setTimeout(() => statsVisible.value = true, 500)
})
</script>

<template>
  <div>
    <!-- ========== Hero Section ========== -->
    <section class="relative min-h-screen flex items-center justify-center px-6 py-36 overflow-hidden">
      <!-- Background Text -->
      <div class="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
        <span class="text-[15rem] md:text-[25rem] font-heading font-bold text-max-accent/10 uppercase select-none leading-none">
          FROG
        </span>
      </div>

      <!-- Floating Decorations -->
      <FloatingShape :colorIndex="0" size="xl" shape="circle" animation="float" top="15%" left="5%" />
      <FloatingShape :colorIndex="1" size="lg" shape="diamond" animation="float-reverse" top="25%" right="8%" />
      <FloatingShape :colorIndex="2" size="md" shape="square" animation="wiggle" bottom="20%" left="10%" />
      <FloatingShape :colorIndex="3" size="lg" shape="circle" animation="bounce" bottom="30%" right="12%" />
      <FloatingShape :colorIndex="4" size="sm" shape="circle" animation="float" top="50%" left="3%" />
      <FloatingShape :colorIndex="0" size="md" shape="diamond" animation="spin" top="10%" right="20%" />
      <FloatingShape :colorIndex="2" size="lg" shape="circle" animation="float" bottom="10%" left="25%" />

      <!-- Hero Content -->
      <div
        class="relative z-20 text-center max-w-5xl mx-auto transition-all duration-1000"
        :class="heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'"
      >
        <!-- Emoji -->
        <div class="text-8xl md:text-9xl mb-9 animate-bounce-subtle">🐸</div>

        <!-- Main Title -->
        <h1 class="font-heading text-5xl md:text-7xl lg:text-9xl font-bold uppercase leading-none mb-9 text-shadow-mega">
          <span class="text-max-accent">奶蛙</span>
          <br />
          <span class="gradient-text">世界</span>
        </h1>

        <!-- Subtitle -->
        <p class="text-xl md:text-2xl text-white/80 mb-6 max-w-3xl mx-auto leading-relaxed">
          探索这个风靡互联网的可爱角色<br class="hidden md:block" />
          感受奶蛙带来的治愈与欢乐
        </p>

        <p class="text-lg text-white/50 mb-15">
          🌟 一个让你瞬间放松的佛系小可爱 🌟
        </p>

        <!-- CTA Buttons -->
        <div class="flex flex-col sm:flex-row items-center justify-center gap-6">
          <MaximalButton color="accent" size="lg" icon="🐸" @click="$router.push('/about')">
            了解奶蛙
          </MaximalButton>
          <MaximalButton variant="secondary" color="secondary" size="lg" icon="🖼️" @click="$router.push('/gallery')">
            浏览图片库
          </MaximalButton>
        </div>
      </div>

      <!-- Scroll Indicator -->
      <div class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce-subtle z-20">
        <div class="text-4xl">👇</div>
      </div>
    </section>

    <!-- ========== Stats Section ========== -->
    <section class="relative py-36 px-6">
      <div class="max-w-4xl mx-auto">
        <SectionTitle
          title="奶蛙数据"
          subtitle="这个小可爱到底有多火？"
          :colorIndex="1"
          shadow="triple"
          emoji="📊"
        />

        <div
          class="grid grid-cols-2 md:grid-cols-4 gap-9 md:gap-12 transition-all duration-700 place-items-center"
          :class="statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
        >
          <div
            v-for="(stat, index) in stats"
            :key="stat.label"
            class="text-center p-6 rounded-3xl border-4 bg-max-muted/60 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:rotate-1"
            :style="{
              borderColor: ACCENT_COLORS[index],
              boxShadow: `6px 6px 0 ${ACCENT_COLORS[(index + 1) % 5]}, 12px 12px 0 ${ACCENT_COLORS[(index + 2) % 5]}`
            }"
          >
            <div class="text-3xl md:text-4xl mb-3">{{ stat.emoji }}</div>
            <div class="font-heading text-3xl md:text-4xl font-bold text-shadow-double" :style="{ color: ACCENT_COLORS[index] }">
              {{ stat.value }}
            </div>
            <div class="text-white/60 text-sm mt-1.5 uppercase tracking-wider">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- ========== Features Section ========== -->
    <section class="relative py-36 px-6">
      <div class="max-w-6xl mx-auto">
        <SectionTitle
          title="为什么奶蛙这么火"
          subtitle="这些特质让它成为互联网顶流"
          :colorIndex="2"
          shadow="mega"
          emoji="🔥"
          gradient
        />

        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-18">
          <MaximalCard
            v-for="(feature, index) in features"
            :key="feature.title"
            :colorIndex="feature.colorIndex"
            :rotate="index % 2 === 1"
            :offset="index > 1"
            :pattern="feature.pattern"
          >
            <div class="text-5xl mb-6 animate-wiggle">{{ feature.emoji }}</div>
            <h3 class="font-heading text-2xl md:text-3xl font-bold uppercase mb-6" :style="{ color: ACCENT_COLORS[feature.colorIndex] }">
              {{ feature.title }}
            </h3>
            <p class="text-white/80 text-lg leading-relaxed">
              {{ feature.description }}
            </p>
          </MaximalCard>
        </div>
      </div>
    </section>

    <!-- ========== Timeline Section ========== -->
    <section class="relative py-36 px-6">
      <div class="max-w-4xl mx-auto">
        <SectionTitle
          title="奶蛙编年史"
          subtitle="从一只小青蛙到互联网顶流"
          :colorIndex="3"
          shadow="triple"
          emoji="📜"
        />

        <div class="relative">
          <!-- Timeline Line -->
          <div class="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-max-accent/50 -translate-x-1/2"></div>

          <div class="space-y-18">
            <div
              v-for="(item, index) in timeline"
              :key="item.year"
              class="relative flex items-center gap-9 md:gap-0"
              :class="index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'"
            >
              <!-- Dot -->
              <div
                class="absolute left-8 md:left-1/2 w-12 h-12 rounded-full border-4 flex items-center justify-center text-2xl -translate-x-1/2 z-10"
                :style="{
                  backgroundColor: ACCENT_COLORS[index],
                  borderColor: ACCENT_COLORS[(index + 1) % 5]
                }"
              >
                {{ item.emoji }}
              </div>

              <!-- Content -->
              <div
                class="ml-20 md:ml-0 md:w-1/2"
                :class="index % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16'"
              >
                <div
                  class="inline-block px-4 py-3 rounded-2xl border-4 mb-3 font-heading font-bold text-xl"
                  :style="{
                    borderColor: ACCENT_COLORS[index],
                    color: ACCENT_COLORS[index],
                    backgroundColor: '#2D1B4E'
                  }"
                >
                  {{ item.year }}
                </div>
                <p class="text-white/80 text-lg">{{ item.event }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ========== CTA Section ========== -->
    <section class="relative py-36 px-6">
      <div class="max-w-4xl mx-auto text-center">
        <div class="relative p-12 md:p-16 rounded-3xl border-4 border-max-accent bg-max-muted/80 backdrop-blur-sm pattern-mesh"
          style="box-shadow: 12px 12px 0 #FFE600, 24px 24px 0 #FF3AF2, 36px 36px 0 #00F5D4;"
        >
          <!-- Background Text -->
          <div class="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden" aria-hidden="true">
            <span class="text-[10rem] md:text-[15rem] font-heading font-bold text-max-accent/5 uppercase select-none leading-none">
              WOW
            </span>
          </div>

          <div class="relative z-10">
            <div class="text-6xl mb-9 animate-wiggle">🐸✨</div>
            <h2 class="font-heading text-3xl md:text-5xl font-bold uppercase text-max-accent text-shadow-triple mb-9">
              准备好被奶蛙治愈了吗？
            </h2>
            <p class="text-white/70 text-lg md:text-xl mb-12 max-w-2xl mx-auto">
              从今天开始，让奶蛙成为你的精神伙伴。无论是工作疲惫还是生活压力，看看奶蛙，一切都变得不那么重要了。
            </p>
            <MaximalButton color="accent" size="lg" icon="🖼️" @click="$router.push('/gallery')">
              立即探索图片库
            </MaximalButton>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
