<script setup>
import SectionTitle from '@/components/ui/SectionTitle.vue'
import MaximalCard from '@/components/ui/MaximalCard.vue'
import MaximalButton from '@/components/ui/MaximalButton.vue'
import FloatingShape from '@/components/ui/FloatingShape.vue'
import { ACCENT_COLORS } from '@/utils'

const characteristics = [
  {
    title: '圆滚滚的白肚子',
    description: '奶蛙最显著的特征就是那圆鼓鼓的白色腹部，看起来就像装满了牛奶一样。这个可爱的肚子让它在众多表情包中脱颖而出。',
    emoji: '🥛',
    colorIndex: 0
  },
  {
    title: '慵懒的躺姿',
    description: '四肢放松地仰躺在水面上，完全放空自己。这种"躺平"的姿态完美捕捉了现代人想要逃离压力的内心渴望。',
    emoji: '😴',
    colorIndex: 1
  },
  {
    title: '呆萌的表情',
    description: '半闭的眼睛、微微张开的嘴巴，奶蛙的表情似乎在说"随便吧"。这种佛系态度让它成为了情绪表达的完美载体。',
    emoji: '😑',
    colorIndex: 2
  },
  {
    title: '绿色的身体',
    description: '清新的绿色皮肤配上白色肚子，简洁的配色让人一眼就爱上。简单的设计却蕴含着无限的创作空间。',
    emoji: '💚',
    colorIndex: 3
  }
]

const usageScenarios = [
  { title: '工作摸鱼', emoji: '💼', description: '当你想要偷偷放松的时候，发一张奶蛙躺平的表情' },
  { title: '表达无奈', emoji: '🤷', description: '面对无法改变的事情，奶蛙的"随便"态度最合适' },
  { title: '自我安慰', emoji: '🤗', description: '压力山大时，看看奶蛙，告诉自己"不重要"' },
  { title: '搞笑互动', emoji: '😂', description: '和朋友聊天时，奶蛙表情包永远是破冰利器' },
  { title: '治愈时刻', emoji: '💕', description: '心情低落时，奶蛙的呆萌瞬间治愈你' },
  { title: '创意表达', emoji: '🎨', description: '网友们用奶蛙创作了无数有趣的内容' }
]

const funFacts = [
  '奶蛙最初的名字是"变异奶龙"，后来被网友亲切地称为"奶蛙"',
  '它的形象源自GitHub上的一个开源桌宠项目',
  '奶蛙的走红与"佛系"、"躺平"等社会现象密切相关',
  '网友为奶蛙创作了上千种不同的表情变体',
  '奶蛙的表情包在微信、QQ等平台广泛传播',
  '它已经成为中文互联网最具代表性的表情包之一'
]
</script>

<template>
  <div>
    <!-- Hero Section -->
    <section class="relative min-h-[70vh] flex items-center justify-center px-6 py-24 overflow-hidden">
      <!-- Background -->
      <div class="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
        <span class="text-[12rem] md:text-[20rem] font-heading font-black text-max-secondary/10 uppercase select-none leading-none">
          ABOUT
        </span>
      </div>

      <FloatingShape :colorIndex="1" size="xl" shape="circle" animation="float" top="10%" left="8%" />
      <FloatingShape :colorIndex="3" size="lg" shape="diamond" animation="float-reverse" top="20%" right="10%" />
      <FloatingShape :colorIndex="0" size="md" shape="square" animation="wiggle" bottom="15%" left="5%" />
      <FloatingShape :colorIndex="4" size="lg" shape="circle" animation="bounce" bottom="25%" right="8%" />

      <div class="relative z-20 text-center max-w-4xl mx-auto">
        <div class="text-8xl md:text-9xl mb-6 animate-wiggle">🐸</div>
        <h1 class="font-heading text-5xl md:text-7xl lg:text-8xl font-black uppercase leading-none mb-6 text-shadow-mega text-max-secondary">
          关于奶蛙
        </h1>
        <p class="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed">
          从一只默默无闻的小青蛙，到风靡全网的顶流表情包<br class="hidden md:block" />
          这就是奶蛙的传奇故事
        </p>
      </div>
    </section>

    <!-- Origin Story -->
    <section class="relative py-24 px-6">
      <div class="max-w-4xl mx-auto">
        <SectionTitle
          title="起源故事"
          subtitle="一切从2015年的那个夏天开始"
          :colorIndex="0"
          shadow="triple"
          emoji="📖"
        />

        <MaximalCard :colorIndex="0" pattern="dots">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <div class="text-6xl mb-4 animate-float">🏝️</div>
              <h3 class="font-heading text-2xl font-black text-max-accent uppercase mb-4">台湾PTT论坛</h3>
              <p class="text-white/80 text-lg leading-relaxed mb-4">
                2015年，一个名为"奶蛙"的形象在台湾最大的网络论坛PTT上首次出现。它的形象来源于GitHub上的一个开源桌宠项目，经过网友们的二次创作和传播，迅速走红。
              </p>
              <p class="text-white/80 text-lg leading-relaxed">
                奶蛙的名字来源于它那圆鼓鼓的白色肚子——看起来就像装满了牛奶。这个简单却可爱的设计，瞬间击中了无数网友的心。
              </p>
            </div>
            <div class="relative p-8 rounded-3xl border-4 border-max-secondary bg-max-muted/60 pattern-stripes"
              style="box-shadow: 8px 8px 0 #FF3AF2, 16px 16px 0 #FFE600;"
            >
              <div class="text-center">
                <div class="text-7xl mb-4">🐸</div>
                <div class="font-heading text-4xl font-black text-max-secondary text-shadow-double mb-2">2015</div>
                <div class="text-white/60 text-lg">奶蛙诞生</div>
              </div>
            </div>
          </div>
        </MaximalCard>
      </div>
    </section>

    <!-- Characteristics -->
    <section class="relative py-24 px-6">
      <div class="max-w-4xl mx-auto">
        <SectionTitle
          title="奶蛙特征"
          subtitle="这些特点让它成为互联网顶流"
          :colorIndex="1"
          shadow="mega"
          emoji="🔍"
          gradient
        />

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 place-items-center">
          <MaximalCard
            v-for="(char, index) in characteristics"
            :key="char.title"
            :colorIndex="char.colorIndex"
            :rotate="index % 2 === 1"
            :pattern="['dots', 'stripes', 'checker', 'mesh'][index]"
          >
            <div class="text-5xl mb-4 animate-wiggle">{{ char.emoji }}</div>
            <h3 class="font-heading text-2xl font-black uppercase mb-3" :style="{ color: ACCENT_COLORS[char.colorIndex] }">
              {{ char.title }}
            </h3>
            <p class="text-white/80 text-lg leading-relaxed">{{ char.description }}</p>
          </MaximalCard>
        </div>
      </div>
    </section>

    <!-- Usage Scenarios -->
    <section class="relative py-24 px-6">
      <div class="max-w-4xl mx-auto">
        <SectionTitle
          title="使用场景"
          subtitle="奶蛙表情包的正确打开方式"
          :colorIndex="2"
          shadow="triple"
          emoji="🎯"
        />

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 place-items-center">
          <div
            v-for="(scenario, index) in usageScenarios"
            :key="scenario.title"
            class="p-6 rounded-3xl border-4 bg-max-muted/60 backdrop-blur-sm transition-all duration-300 hover:scale-105"
            :style="{
              borderColor: ACCENT_COLORS[index],
              boxShadow: `4px 4px 0 ${ACCENT_COLORS[(index + 1) % 5]}, 8px 8px 0 ${ACCENT_COLORS[(index + 2) % 5]}`
            }"
          >
            <div class="text-4xl mb-3 animate-bounce-subtle">{{ scenario.emoji }}</div>
            <h3 class="font-heading text-xl font-black uppercase mb-2" :style="{ color: ACCENT_COLORS[index] }">
              {{ scenario.title }}
            </h3>
            <p class="text-white/70 text-base">{{ scenario.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Fun Facts -->
    <section class="relative py-24 px-6">
      <div class="max-w-4xl mx-auto">
        <SectionTitle
          title="冷知识"
          subtitle="你可能不知道的奶蛙趣事"
          :colorIndex="3"
          shadow="double"
          emoji="🧠"
        />

        <div class="space-y-4">
          <div
            v-for="(fact, index) in funFacts"
            :key="index"
            class="flex items-center gap-4 p-5 rounded-2xl border-4 bg-max-muted/60 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] mx-auto max-w-3xl"
            :style="{
              borderColor: ACCENT_COLORS[index % 5],
              boxShadow: `4px 4px 0 ${ACCENT_COLORS[(index + 1) % 5]}`
            }"
          >
            <span class="text-3xl animate-wiggle shrink-0">{{ ['💡', '🐙', '📊', '🎭', '💬', '🏆'][index] }}</span>
            <p class="text-white/80 text-lg leading-relaxed">{{ fact }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Cultural Impact -->
    <section class="relative py-24 px-6">
      <div class="max-w-5xl mx-auto">
        <SectionTitle
          title="文化影响"
          subtitle="奶蛙如何影响了互联网文化"
          :colorIndex="4"
          shadow="mega"
          emoji="🌍"
          gradient
        />

        <MaximalCard :colorIndex="4" pattern="mesh">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="text-center">
              <div class="text-5xl mb-3 animate-float">🧘</div>
              <h4 class="font-heading text-xl font-black text-max-quinary uppercase mb-2">佛系文化</h4>
              <p class="text-white/70">奶蛙的慵懒姿态完美诠释了"佛系"精神，成为年轻人表达生活态度的载体。</p>
            </div>
            <div class="text-center">
              <div class="text-5xl mb-3 animate-wiggle">😴</div>
              <h4 class="font-heading text-xl font-black text-max-accent uppercase mb-2">躺平符号</h4>
              <p class="text-white/70">在"躺平"文化兴起的背景下，奶蛙成为了最直观的视觉符号。</p>
            </div>
            <div class="text-center">
              <div class="text-5xl mb-3 animate-bounce-subtle">🎨</div>
              <h4 class="font-heading text-xl font-black text-max-secondary uppercase mb-2">创意激发</h4>
              <p class="text-white/70">简单的形象激发了无数网友的创作灵感，产生了丰富的二创作品。</p>
            </div>
          </div>
        </MaximalCard>
      </div>
    </section>

    <!-- CTA -->
    <section class="relative py-24 px-6">
      <div class="max-w-4xl mx-auto text-center">
        <div class="text-6xl mb-6 animate-wiggle">🐸💖</div>
        <h2 class="font-heading text-3xl md:text-5xl font-black uppercase text-max-accent text-shadow-triple mb-6">
          爱上奶蛙了吗？
        </h2>
        <p class="text-white/70 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
          现在就去图片库，收藏你最爱的奶蛙表情包吧！
        </p>
        <MaximalButton color="accent" size="lg" icon="🖼️" @click="$router.push('/gallery')">
          进入图片库
        </MaximalButton>
      </div>
    </section>
  </div>
</template>
