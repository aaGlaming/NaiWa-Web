<script setup>
import { ref } from 'vue'
import SectionTitle from '@/components/ui/SectionTitle.vue'
import MaximalCard from '@/components/ui/MaximalCard.vue'
import MaximalButton from '@/components/ui/MaximalButton.vue'
import FloatingShape from '@/components/ui/FloatingShape.vue'
import { ACCENT_COLORS } from '@/utils'
import axios from 'axios'

const form = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const submitted = ref(false)
const submitting = ref(false)
const error = ref(null)

async function handleSubmit() {
  submitting.value = true
  error.value = null
  try {
    await axios.post('/api/contact', form.value)
    submitted.value = true
    form.value = { name: '', email: '', subject: '', message: '' }
  } catch (e) {
    error.value = e.response?.data?.detail || '提交失败，请稍后重试'
  } finally {
    submitting.value = false
  }
}

const contactMethods = [
  { title: '邮箱', value: 'a36194113019@gmail.com', emoji: '📧', colorIndex: 0 },
  { title: '社交媒体', value: '13056991779', emoji: '📱', colorIndex: 1 },
  { title: 'GitHub', value: 'github.com/aaGlaming', emoji: '💻', colorIndex: 2 }
]

const faqItems = [
  {
    question: '奶蛙图片可以商用吗？',
    answer: '不可以。奶蛙表情包的版权归原作者所有，本站提供的所有图片仅供个人娱乐使用，请勿用于商业用途。'
  },
  {
    question: '如何下载图片？',
    answer: '在图片库中点击任意图片即可查看大图，然后右键选择"图片另存为"即可下载。'
  },
  {
    question: '图片会定期更新吗？',
    answer: '本站会不定期更新奶蛙表情包合集，添加新的热门表情和创作。'
  },
  {
    question: '我可以提交自己的创作吗？',
    answer: '当然欢迎！如果你有原创的奶蛙表情包作品，可以通过联系方式提交给我们。'
  }
]
</script>

<template>
  <div>
    <!-- Hero Section -->
    <section class="relative min-h-[50vh] flex items-center justify-center px-6 py-24 overflow-hidden">
      <div class="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
        <span class="text-[10rem] md:text-[18rem] font-heading font-black text-max-quaternary/10 uppercase select-none leading-none">
          CONTACT
        </span>
      </div>

      <FloatingShape :colorIndex="3" size="xl" shape="circle" animation="float" top="10%" left="5%" />
      <FloatingShape :colorIndex="0" size="lg" shape="diamond" animation="float-reverse" top="20%" right="8%" />
      <FloatingShape :colorIndex="2" size="md" shape="square" animation="wiggle" bottom="15%" left="10%" />
      <FloatingShape :colorIndex="1" size="lg" shape="circle" animation="bounce" bottom="20%" right="12%" />

      <div class="relative z-20 text-center max-w-4xl mx-auto">
        <div class="text-8xl md:text-9xl mb-6 animate-wiggle">💌</div>
        <h1 class="font-heading text-5xl md:text-7xl lg:text-8xl font-black uppercase leading-none mb-6 text-shadow-mega text-max-quaternary">
          联系我们
        </h1>
        <p class="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto">
          有问题、建议或合作意向？<br class="hidden md:block" />
          欢迎随时联系我们
        </p>
      </div>
    </section>

    <!-- Contact Methods -->
    <section class="relative py-24 px-6">
      <div class="max-w-4xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 place-items-center">
          <div
            v-for="(method, index) in contactMethods"
            :key="method.title"
            class="text-center p-6 rounded-3xl border-4 bg-max-muted/60 backdrop-blur-sm transition-all duration-300 hover:scale-105"
            :style="{
              borderColor: ACCENT_COLORS[method.colorIndex],
              boxShadow: `4px 4px 0 ${ACCENT_COLORS[(method.colorIndex + 1) % 5]}, 8px 8px 0 ${ACCENT_COLORS[(method.colorIndex + 2) % 5]}`
            }"
          >
            <div class="text-4xl mb-3 animate-bounce-subtle">{{ method.emoji }}</div>
            <h3 class="font-heading text-lg font-black uppercase mb-1" :style="{ color: ACCENT_COLORS[method.colorIndex] }">
              {{ method.title }}
            </h3>
            <p class="text-white/70">{{ method.value }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Form -->
    <section class="relative py-24 px-6">
      <div class="max-w-3xl mx-auto">
        <SectionTitle
          title="发送消息"
          subtitle="填写表单，我们会尽快回复"
          :colorIndex="3"
          shadow="triple"
          emoji="✍️"
        />

        <!-- Success State -->
        <MaximalCard v-if="submitted" :colorIndex="2" pattern="dots">
          <div class="text-center py-12">
            <div class="text-7xl mb-6 animate-bounce-subtle">🎉</div>
            <h3 class="font-heading text-3xl font-black text-max-tertiary uppercase mb-4 text-shadow-double">
              发送成功！
            </h3>
            <p class="text-white/80 text-lg mb-6">感谢你的留言，我们会尽快回复你！</p>
            <MaximalButton color="tertiary" size="md" @click="submitted = false">
              发送更多消息
            </MaximalButton>
          </div>
        </MaximalCard>

        <!-- Form -->
        <MaximalCard v-else :colorIndex="3" pattern="stripes">
          <form @submit.prevent="handleSubmit" class="space-y-6">
            <!-- Error -->
            <div v-if="error" class="p-4 rounded-2xl border-4 border-max-secondary bg-max-secondary/10 text-max-secondary text-center">
              {{ error }}
            </div>

            <!-- Name -->
            <div>
              <label class="block font-heading text-sm font-bold text-max-accent uppercase tracking-wider mb-2">
                🐸 你的名字
              </label>
              <input
                v-model="form.name"
                type="text"
                required
                placeholder="输入你的名字"
                class="w-full px-6 py-4 rounded-full border-4 border-max-accent bg-max-muted/50 backdrop-blur-sm text-white text-lg placeholder-white/40 focus:border-max-secondary focus:ring-4 focus:ring-max-secondary/30 focus:ring-offset-2 focus:ring-offset-max-background outline-none transition-all duration-300"
              />
            </div>

            <!-- Email -->
            <div>
              <label class="block font-heading text-sm font-bold text-max-secondary uppercase tracking-wider mb-2">
                📧 邮箱地址
              </label>
              <input
                v-model="form.email"
                type="email"
                required
                placeholder="输入你的邮箱"
                class="w-full px-6 py-4 rounded-full border-4 border-max-secondary bg-max-muted/50 backdrop-blur-sm text-white text-lg placeholder-white/40 focus:border-max-tertiary focus:ring-4 focus:ring-max-tertiary/30 focus:ring-offset-2 focus:ring-offset-max-background outline-none transition-all duration-300"
              />
            </div>

            <!-- Subject -->
            <div>
              <label class="block font-heading text-sm font-bold text-max-tertiary uppercase tracking-wider mb-2">
                📌 主题
              </label>
              <input
                v-model="form.subject"
                type="text"
                required
                placeholder="消息主题"
                class="w-full px-6 py-4 rounded-full border-4 border-max-tertiary bg-max-muted/50 backdrop-blur-sm text-white text-lg placeholder-white/40 focus:border-max-quaternary focus:ring-4 focus:ring-max-quaternary/30 focus:ring-offset-2 focus:ring-offset-max-background outline-none transition-all duration-300"
              />
            </div>

            <!-- Message -->
            <div>
              <label class="block font-heading text-sm font-bold text-max-quaternary uppercase tracking-wider mb-2">
                💬 留言内容
              </label>
              <textarea
                v-model="form.message"
                required
                rows="5"
                placeholder="写下你想说的..."
                class="w-full px-6 py-4 rounded-3xl border-4 border-max-quaternary bg-max-muted/50 backdrop-blur-sm text-white text-lg placeholder-white/40 focus:border-max-quinary focus:ring-4 focus:ring-max-quinary/30 focus:ring-offset-2 focus:ring-offset-max-background outline-none transition-all duration-300 resize-none"
              ></textarea>
            </div>

            <!-- Submit -->
            <div class="text-center pt-4">
              <MaximalButton
                color="quaternary"
                size="lg"
                :icon="submitting ? '' : '💌'"
                :loading="submitting"
                :disabled="submitting"
              >
                {{ submitting ? '发送中...' : '发送消息' }}
              </MaximalButton>
            </div>
          </form>
        </MaximalCard>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="relative py-24 px-6">
      <div class="max-w-4xl mx-auto">
        <SectionTitle
          title="常见问题"
          subtitle="这些问题可能你也想知道"
          :colorIndex="4"
          shadow="triple"
          emoji="❓"
        />

        <div class="space-y-4">
          <MaximalCard
            v-for="(item, index) in faqItems"
            :key="item.question"
            :colorIndex="index % 5"
            :rotate="index % 2 === 1"
          >
            <h3 class="font-heading text-lg font-black uppercase mb-3" :style="{ color: ACCENT_COLORS[index % 5] }">
              {{ item.question }}
            </h3>
            <p class="text-white/80 text-base leading-relaxed">{{ item.answer }}</p>
          </MaximalCard>
        </div>
      </div>
    </section>

    <!-- Bottom CTA -->
    <section class="relative py-24 px-6">
      <div class="max-w-4xl mx-auto text-center">
        <div class="relative p-12 rounded-3xl border-4 border-max-quaternary bg-max-muted/80 backdrop-blur-sm pattern-checker"
          style="box-shadow: 8px 8px 0 #FF6B35, 16px 16px 0 #7B2FFF, 24px 24px 0 #FFE600;"
        >
          <div class="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden" aria-hidden="true">
            <span class="text-[8rem] md:text-[12rem] font-heading font-black text-max-quaternary/5 uppercase select-none leading-none">
              HI
            </span>
          </div>

          <div class="relative z-10">
            <div class="text-5xl mb-4 animate-wiggle">👋</div>
            <h2 class="font-heading text-2xl md:text-4xl font-black uppercase text-max-quaternary text-shadow-double mb-4">
              期待你的来信！
            </h2>
            <p class="text-white/70 text-lg mb-6">
              无论你是奶蛙爱好者、表情包创作者，还是只是想聊聊天，我们都欢迎你！
            </p>
            <MaximalButton variant="secondary" color="quaternary" size="md" icon="🐸" @click="$router.push('/')">
              返回首页
            </MaximalButton>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
