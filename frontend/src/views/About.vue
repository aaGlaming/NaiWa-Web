<script setup>
import MaximalButton from '@/components/ui/MaximalButton.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const characteristics = [
  { title: '圆滚滚的白肚子', description: '最显著的特征：鼓起的白腹，像被牛奶灌满的一页空白。' },
  { title: '慵懒的躺姿', description: '四肢放松地仰在水面上，把「想逃」画成一个姿势。' },
  { title: '呆萌的表情', description: '半闭的眼、微张的嘴，像在说：随便吧。' },
  { title: '绿色的身体', description: '清淡的绿配上白肚，配色克制，所以容易被记住。' }
]

const usageScenarios = [
  { title: '工作摸鱼', desc: '当你需要把屏幕从任务里拿开一会儿' },
  { title: '表达无奈', desc: '面对无法改写的句子' },
  { title: '自我安慰', desc: '压力把页面排得太密时' },
  { title: '搞笑互动', desc: '和朋友交换一帧表情' },
  { title: '治愈时刻', desc: '心情低落，需要一张空白肚子' },
  { title: '创意表达', desc: '把母题再裁切一次' }
]

const funFacts = [
  '最初的名字是「变异奶龙」，后来被亲切地称作奶蛙。',
  '形象源自 GitHub 上的一个开源桌宠项目。',
  '走红与「佛系」「躺平」等社会气氛叠印。',
  '网友为它制作了上千种变体。',
  '表情包在微信、QQ 等会话里广泛流通。',
  '它已成为中文互联网最具辨识度的表情之一。'
]
</script>

<template>
  <div>
    <section class="ed-page pt-16 md:pt-24 pb-12">
      <div class="grid grid-cols-1 md:grid-cols-12 gap-10">
        <div class="md:col-span-8">
          <p class="ed-meta mb-6">Essay — Words / Images / 2015</p>
          <h1 class="ed-display">
            关于<br />一只<br /><em class="italic">肚子。</em>
          </h1>
        </div>
        <aside class="md:col-span-4 md:pt-24">
          <p class="ed-meta mb-3">Metadata</p>
          <p class="text-sm leading-relaxed text-charcoal">
            从一只默默无闻的青蛙，到被反复转载的顶流表情。这不是产品介绍，是一篇短文。
          </p>
        </aside>
      </div>
    </section>

    <section class="ed-page py-16 md:py-24">
      <p class="ed-meta mb-4"><span class="ed-num">01</span> Origin</p>
      <hr class="ed-rule mb-10" />
      <div class="grid grid-cols-1 md:grid-cols-12 gap-12">
        <div class="md:col-span-7">
          <h2 class="font-display text-3xl md:text-4xl mb-6">台湾 PTT，2015</h2>
          <p class="text-lg leading-relaxed text-charcoal mb-4">
            2015 年，一个名为奶蛙的形象在台湾最大的网络论坛 PTT 上出现。它来自 GitHub 上的开源桌宠。
          </p>
          <p class="text-lg leading-relaxed text-charcoal">
            名字来自那只圆鼓鼓的白肚子——看起来像装满了牛奶。
          </p>
        </div>
        <div class="md:col-span-4 md:col-start-9 border-t border-ink/15 pt-6">
          <p class="font-display text-6xl text-accent">2015</p>
          <p class="ed-meta mt-2">First appearance</p>
        </div>
      </div>
    </section>

    <section class="ed-page py-16">
      <p class="ed-meta mb-4"><span class="ed-num">02</span> Features of the figure</p>
      <hr class="ed-rule mb-2" />
      <article
        v-for="(char, index) in characteristics"
        :key="char.title"
        class="grid grid-cols-12 gap-4 py-8 border-b border-ink/10"
      >
        <span class="col-span-2 ed-num">{{ String(index + 1).padStart(2, '0') }}</span>
        <div class="col-span-10 md:col-span-9">
          <h3 class="font-display text-2xl md:text-3xl mb-2">{{ char.title }}</h3>
          <p class="text-charcoal">{{ char.description }}</p>
        </div>
      </article>
    </section>

    <section class="ed-page py-16">
      <p class="ed-meta mb-4"><span class="ed-num">03</span> How it is used</p>
      <hr class="ed-rule mb-10" />
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-10">
        <div v-for="(s, i) in usageScenarios" :key="s.title">
          <p class="ed-num mb-2">{{ String(i + 1).padStart(2, '0') }}</p>
          <h3 class="font-display text-xl mb-1">{{ s.title }}</h3>
          <p class="text-sm text-warm-gray">{{ s.desc }}</p>
        </div>
      </div>
    </section>

    <section class="ed-page py-16">
      <p class="ed-meta mb-4"><span class="ed-num">04</span> Marginalia</p>
      <hr class="ed-rule mb-2" />
      <p
        v-for="(fact, index) in funFacts"
        :key="index"
        class="py-5 border-b border-ink/10 text-lg leading-relaxed"
      >
        <span class="ed-num mr-4">{{ String(index + 1).padStart(2, '0') }}</span>{{ fact }}
      </p>
    </section>

    <section class="ed-page py-16 md:py-24">
      <p class="ed-meta mb-4"><span class="ed-num">05</span> After the image</p>
      <hr class="ed-rule mb-10" />
      <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <h4 class="font-display text-2xl mb-3">佛系</h4>
          <p class="text-charcoal">慵懒的姿态把一种生活态度写成姿势。</p>
        </div>
        <div>
          <h4 class="font-display text-2xl mb-3">躺平</h4>
          <p class="text-charcoal">在「躺平」被讨论的那些年，它成了最直观的符号。</p>
        </div>
        <div>
          <h4 class="font-display text-2xl mb-3">再创作</h4>
          <p class="text-charcoal">简单的轮廓，反而让改写变得无穷。</p>
        </div>
      </div>
      <div class="mt-16">
        <MaximalButton @click="router.push('/gallery')">进入图片库</MaximalButton>
      </div>
    </section>
  </div>
</template>
