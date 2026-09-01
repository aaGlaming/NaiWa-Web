<script setup>
import SectionTitle from '@/components/ui/SectionTitle.vue'
import MaximalCard from '@/components/ui/MaximalCard.vue'
import MaximalButton from '@/components/ui/MaximalButton.vue'
import FloatingShape from '@/components/ui/FloatingShape.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const characteristics = [
  { title: '圆滚滚的白肚子', description: '奶蛙最显著的特征就是那圆鼓鼓的白色腹部，看起来就像装满了牛奶一样。', emoji: '🥛', colorIndex: 0 },
  { title: '慵懒的躺姿', description: '四肢放松地仰躺在水面上，完美捕捉了现代人想要逃离压力的内心渴望。', emoji: '😴', colorIndex: 1 },
  { title: '呆萌的表情', description: '半闭的眼睛、微微张开的嘴巴，奶蛙的表情似乎在说"随便吧"。', emoji: '😑', colorIndex: 2 },
  { title: '绿色的身体', description: '清新的绿色皮肤配上白色肚子，简洁的配色让人一眼就爱上。', emoji: '💚', colorIndex: 3 }
]

const usageScenarios = [
  { title: '工作摸鱼', emoji: '💼', desc: '当你想要偷偷放松的时候' },
  { title: '表达无奈', emoji: '🤷', desc: '面对无法改变的事情' },
  { title: '自我安慰', emoji: '🤗', desc: '压力山大时' },
  { title: '搞笑互动', emoji: '😂', desc: '和朋友聊天时' },
  { title: '治愈时刻', emoji: '💕', desc: '心情低落时' },
  { title: '创意表达', emoji: '🎨', desc: '网友们创作的素材' }
]

const funFacts = [
  '奶蛙最初的名字是"变异奶龙"，后来被网友亲切地称为"奶蛙"',
  '它的形象源自GitHub上的一个开源桌宠项目',
  '奶蛙的走红与"佛系"、"躺平"等社会现象密切相关',
  '网友为奶蛙创作了上千种不同的表情变体',
  '奶蛙的表情包在微信、QQ等平台广泛传播',
  '它已经成为中文互联网最具代表性的表情包之一'
]

const bgColors = ['bg-[#FF6B6B] text-white', 'bg-[#FFD93D]', 'bg-[#C4B5FD]', 'bg-white', 'bg-black text-white']
</script>

<template>
  <div>
    <!-- Hero Section -->
    <section class="relative min-h-[60vh] flex items-center justify-center px-6 py-24 overflow-hidden">
      <div class="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
        <span class="text-[12rem] md:text-[20rem] font-heading font-black text-black/[0.03] uppercase select-none leading-none">ABOUT</span>
      </div>

      <FloatingShape :colorIndex="1" size="xl" shape="square" animation="float" top="10%" left="8%" />
      <FloatingShape :colorIndex="3" size="lg" shape="circle" animation="float" top="20%" right="10%" />
      <FloatingShape :colorIndex="0" size="md" shape="diamond" animation="spin" bottom="15%" left="5%" />
      <FloatingShape :colorIndex="4" size="lg" shape="square" animation="bounce" bottom="25%" right="8%" />

      <div class="relative z-20 text-center max-w-4xl mx-auto">
        <div class="text-8xl md:text-9xl mb-8 animate-bounce-subtle">🐸</div>
        <h1 class="font-heading text-5xl md:text-7xl lg:text-8xl font-black uppercase leading-none mb-8 tracking-tight text-[#FF6B6B]">关于奶蛙</h1>
        <p class="text-xl md:text-2xl font-bold max-w-3xl mx-auto border-4 border-black bg-[#FFD93D] px-6 py-3 inline-block shadow-neo-sm">
          从一只默默无闻的小青蛙，到风靡全网的顶流表情包
        </p>
      </div>
    </section>

    <!-- Origin Story -->
    <section class="relative py-36 px-6">
      <div class="max-w-5xl mx-auto">
        <SectionTitle title="起源故事" subtitle="一切从2015年的那个夏天开始" :colorIndex="0" emoji="📖" />
        <MaximalCard :colorIndex="1">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <div class="text-6xl mb-4 animate-float">🏝️</div>
              <h3 class="font-heading text-2xl font-black uppercase mb-4">台湾PTT论坛</h3>
              <p class="text-lg leading-relaxed mb-4 font-medium">2015年，一个名为"奶蛙"的形象在台湾最大的网络论坛PTT上首次出现。它的形象来源于GitHub上的一个开源桌宠项目。</p>
              <p class="text-lg leading-relaxed font-medium">奶蛙的名字来源于它那圆鼓鼓的白色肚子——看起来就像装满了牛奶。</p>
            </div>
            <div class="border-4 border-black bg-white p-10 text-center shadow-neo" style="box-shadow: 12px 12px 0px 0px #000;">
              <div class="text-7xl mb-4">🐸</div>
              <div class="font-heading text-4xl font-black text-[#FF6B6B] mb-2">2015</div>
              <div class="font-bold text-lg">奶蛙诞生</div>
            </div>
          </div>
        </MaximalCard>
      </div>
    </section>

    <!-- Characteristics -->
    <section class="relative py-36 px-6 bg-[#C4B5FD] border-y-8 border-black">
      <div class="max-w-5xl mx-auto">
        <SectionTitle title="奶蛙特征" subtitle="这些特点让它成为互联网顶流" :colorIndex="3" emoji="🔍" />
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <MaximalCard v-for="(char, index) in characteristics" :key="char.title" :colorIndex="char.colorIndex" :rotate="index % 2 === 1">
            <div class="text-5xl mb-4 animate-bounce-subtle">{{ char.emoji }}</div>
            <h3 class="font-heading text-2xl font-black uppercase mb-4">{{ char.title }}</h3>
            <p class="text-lg leading-relaxed font-medium">{{ char.description }}</p>
          </MaximalCard>
        </div>
      </div>
    </section>

    <!-- Usage Scenarios -->
    <section class="relative py-36 px-6">
      <div class="max-w-5xl mx-auto">
        <SectionTitle title="使用场景" subtitle="奶蛙表情包的正确打开方式" :colorIndex="1" emoji="🎯" />
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="(scenario, index) in usageScenarios" :key="scenario.title"
            class="border-4 border-black p-8 bg-white transition-all duration-200 hover:-translate-y-2 hover:-rotate-1"
            :style="{ boxShadow: '8px 8px 0px 0px #000' }">
            <div class="text-4xl mb-3 animate-bounce-subtle">{{ scenario.emoji }}</div>
            <h3 class="font-heading text-xl font-black uppercase mb-2">{{ scenario.title }}</h3>
            <p class="text-black/70 font-bold">{{ scenario.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Fun Facts -->
    <section class="relative py-36 px-6 bg-[#FFD93D] border-y-8 border-black">
      <div class="max-w-4xl mx-auto">
        <SectionTitle title="冷知识" subtitle="你可能不知道的奶蛙趣事" :colorIndex="3" emoji="🧠" />
        <div class="space-y-6">
          <div v-for="(fact, index) in funFacts" :key="index"
            class="flex items-center gap-6 p-6 border-4 border-black bg-white transition-all duration-200 hover:-translate-y-1"
            :style="{ boxShadow: '6px 6px 0px 0px #000' }">
            <span class="text-3xl animate-bounce-subtle shrink-0">{{ ['💡', '🐙', '📊', '🎭', '💬', '🏆'][index] }}</span>
            <p class="text-lg leading-relaxed font-medium">{{ fact }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Cultural Impact -->
    <section class="relative py-36 px-6">
      <div class="max-w-5xl mx-auto">
        <SectionTitle title="文化影响" subtitle="奶蛙如何影响了互联网文化" :colorIndex="2" emoji="🌍" />
        <MaximalCard :colorIndex="4">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div class="text-center">
              <div class="text-5xl mb-3 animate-float">🧘</div>
              <h4 class="font-heading text-xl font-black uppercase mb-3 border-b-4 border-black pb-2">佛系文化</h4>
              <p class="text-black/70 font-medium">奶蛙的慵懒姿态完美诠释了"佛系"精神。</p>
            </div>
            <div class="text-center">
              <div class="text-5xl mb-3 animate-bounce-subtle">😴</div>
              <h4 class="font-heading text-xl font-black uppercase mb-3 border-b-4 border-black pb-2">躺平符号</h4>
              <p class="text-black/70 font-medium">在"躺平"文化兴起的背景下，奶蛙成为了最直观的视觉符号。</p>
            </div>
            <div class="text-center">
              <div class="text-5xl mb-3 animate-spin-slow">🎨</div>
              <h4 class="font-heading text-xl font-black uppercase mb-3 border-b-4 border-black pb-2">创意激发</h4>
              <p class="text-black/70 font-medium">简单的形象激发了无数网友的创作灵感。</p>
            </div>
          </div>
        </MaximalCard>
      </div>
    </section>

    <!-- CTA -->
    <section class="relative py-36 px-6">
      <div class="max-w-4xl mx-auto text-center">
        <div class="border-8 border-black bg-[#FF6B6B] p-16" style="box-shadow: 16px 16px 0px 0px #000;">
          <div class="text-6xl mb-6 animate-bounce-subtle">🐸💖</div>
          <h2 class="font-heading text-3xl md:text-5xl font-black uppercase text-white mb-6">爱上奶蛙了吗？</h2>
          <p class="text-white/80 text-lg md:text-xl mb-10 font-bold">现在就去图片库，收藏你最爱的奶蛙表情包吧！</p>
          <MaximalButton color="secondary" size="lg" icon="🖼️" @click="router.push('/gallery')">进入图片库</MaximalButton>
        </div>
      </div>
    </section>
  </div>
</template>
