<script setup>
import { ref } from 'vue'
import SectionTitle from '@/components/ui/SectionTitle.vue'
import MaximalCard from '@/components/ui/MaximalCard.vue'
import MaximalButton from '@/components/ui/MaximalButton.vue'
import FloatingShape from '@/components/ui/FloatingShape.vue'
import { ACCENT_COLORS } from '@/utils'
import { usePageMeta } from '@/composables/usePageMeta'
import { loadJson, saveJson } from '@/utils/storage'

usePageMeta()

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

  const payload = { ...form.value, time: new Date().toISOString() }

  try {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form.value)
    })
    if (res.ok) {
      submitted.value = true
      form.value = { name: '', email: '', subject: '', message: '' }
      return
    }
  } catch (_) { /* fallback below */ }

  // 无后端时：存本地 + mailto 回退
  const inbox = loadJson('naiwa_contact_messages', [])
  inbox.push(payload)
  saveJson('naiwa_contact_messages', inbox)

  const subject = encodeURIComponent(`[奶蛙世界] ${form.value.subject}`)
  const body = encodeURIComponent(
    `姓名：${form.value.name}\n邮箱：${form.value.email}\n\n${form.value.message}`
  )
  window.location.href = `mailto:a36194113019@gmail.com?subject=${subject}&body=${body}`

  submitted.value = true
  form.value = { name: '', email: '', subject: '', message: '' }
  submitting.value = false
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
    <section class="relative min-h-[50vh] flex items-center justify-center px-6 py-36 overflow-hidden">
      <div class="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
        <span class="text-[10rem] md:text-[18rem] font-heading font-bold text-[#FF6B6B]/10 uppercase select-none leading-none">
          CONTACT
        </span>
      </div>

      <FloatingShape :colorIndex="3" size="xl" shape="circle" animation="float" top="10%" left="5%" />
      <FloatingShape :colorIndex="0" size="lg" shape="diamond" animation="float-reverse" top="20%" right="8%" />
      <FloatingShape :colorIndex="2" size="md" shape="square" animation="wiggle" bottom="15%" left="10%" />
      <FloatingShape :colorIndex="1" size="lg" shape="circle" animation="bounce" bottom="20%" right="12%" />

      <div class="relative z-20 text-center max-w-4xl mx-auto">
        <div class="text-8xl md:text-9xl mb-9 animate-wiggle">💌</div>
        <h1 class="font-heading text-5xl md:text-7xl lg:text-8xl font-bold uppercase leading-none mb-9 text-shadow-mega text-[#FF6B6B]">
          联系我们
        </h1>
        <p class="text-xl md:text-2xl text-black/80 max-w-3xl mx-auto">
          有问题、建议或合作意向？<br class="hidden md:block" />
          欢迎随时联系我们
        </p>
      </div>
    </section>

    <!-- Contact Methods -->
    <section class="relative py-36 px-6">
      <div class="max-w-4xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-9 place-items-center">
          <div
            v-for="(method, index) in contactMethods"
            :key="method.title"
            class="text-center p-6 rounded-3xl border-4 bg-[#C4B5FD]/60 backdrop-blur-sm transition-all duration-300 hover:scale-105"
            :style="{
              borderColor: ACCENT_COLORS[method.colorIndex],
              boxShadow: `4px 4px 0 ${ACCENT_COLORS[(method.colorIndex + 1) % 5]}, 8px 8px 0 ${ACCENT_COLORS[(method.colorIndex + 2) % 5]}`
            }"
          >
            <div class="text-4xl mb-4.5 animate-bounce-subtle">{{ method.emoji }}</div>
            <h3 class="font-heading text-lg font-bold uppercase mb-1.5" :style="{ color: ACCENT_COLORS[method.colorIndex] }">
              {{ method.title }}
            </h3>
            <p class="text-black/70">{{ method.value }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Form -->
    <section class="relative py-36 px-6">
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
          <div class="text-center py-18">
            <div class="text-7xl mb-9 animate-bounce-subtle">🎉</div>
            <h3 class="font-heading text-3xl font-bold text-[#C4B5FD] uppercase mb-6 text-shadow-double">
              发送成功！
            </h3>
            <p class="text-black/80 text-lg mb-9">感谢你的留言，我们会尽快回复你！</p>
            <MaximalButton color="tertiary" size="md" @click="submitted = false">
              发送更多消息
            </MaximalButton>
          </div>
        </MaximalCard>

        <!-- Form -->
        <MaximalCard v-else :colorIndex="3" pattern="stripes">
          <form @submit.prevent="handleSubmit" class="space-y-9">
            <!-- Error -->
            <div v-if="error" class="p-4 rounded-2xl border-4 border-black bg-[#FFD93D]/10 text-[#FFD93D] text-center">
              {{ error }}
            </div>

            <!-- Name -->
            <div>
              <label class="block font-heading text-sm font-bold text-[#FF6B6B] uppercase tracking-wider mb-3">
                🐸 你的名字
              </label>
              <input
                v-model="form.name"
                type="text"
                required
                placeholder="输入你的名字"
                class="w-full px-6 py-6 rounded-full border-4 border-[#FF6B6B] bg-[#C4B5FD]/50 backdrop-blur-sm text-white text-lg placeholder-white/40 focus:border-black focus:ring-4 focus:ring-max-secondary/30 focus:ring-offset-2 focus:ring-offset-max-background outline-none transition-all duration-300"
              />
            </div>

            <!-- Email -->
            <div>
              <label class="block font-heading text-sm font-bold text-[#FFD93D] uppercase tracking-wider mb-3">
                📧 邮箱地址
              </label>
              <input
                v-model="form.email"
                type="email"
                required
                placeholder="输入你的邮箱"
                class="w-full px-6 py-6 rounded-full border-4 border-black bg-[#C4B5FD]/50 backdrop-blur-sm text-white text-lg placeholder-white/40 focus:border-black focus:ring-4 focus:ring-max-tertiary/30 focus:ring-offset-2 focus:ring-offset-max-background outline-none transition-all duration-300"
              />
            </div>

            <!-- Subject -->
            <div>
              <label class="block font-heading text-sm font-bold text-[#C4B5FD] uppercase tracking-wider mb-3">
                📌 主题
              </label>
              <input
                v-model="form.subject"
                type="text"
                required
                placeholder="消息主题"
                class="w-full px-6 py-6 rounded-full border-4 border-black bg-[#C4B5FD]/50 backdrop-blur-sm text-white text-lg placeholder-white/40 focus:border-black focus:ring-4 focus:ring-max-quaternary/30 focus:ring-offset-2 focus:ring-offset-max-background outline-none transition-all duration-300"
              />
            </div>

            <!-- Message -->
            <div>
              <label class="block font-heading text-sm font-bold text-[#FF6B6B] uppercase tracking-wider mb-3">
                💬 留言内容
              </label>
              <textarea
                v-model="form.message"
                required
                rows="5"
                placeholder="写下你想说的..."
                class="w-full px-6 py-6 rounded-3xl border-4 border-black bg-[#C4B5FD]/50 backdrop-blur-sm text-white text-lg placeholder-white/40 focus:border-black focus:ring-4 focus:ring-max-quinary/30 focus:ring-offset-2 focus:ring-offset-max-background outline-none transition-all duration-300 resize-none"
              ></textarea>
            </div>

            <!-- Submit -->
            <div class="text-center pt-6">
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
    <section class="relative py-36 px-6">
      <div class="max-w-4xl mx-auto">
        <SectionTitle
          title="常见问题"
          subtitle="这些问题可能你也想知道"
          :colorIndex="4"
          shadow="triple"
          emoji="❓"
        />

        <div class="space-y-6">
          <MaximalCard
            v-for="(item, index) in faqItems"
            :key="item.question"
            :colorIndex="index % 5"
            :rotate="index % 2 === 1"
          >
            <h3 class="font-heading text-lg font-bold uppercase mb-4.5" :style="{ color: ACCENT_COLORS[index % 5] }">
              {{ item.question }}
            </h3>
            <p class="text-black/80 text-base leading-relaxed">{{ item.answer }}</p>
          </MaximalCard>
        </div>
      </div>
    </section>

    <!-- Bottom CTA -->
    <section class="relative py-36 px-6">
      <div class="max-w-4xl mx-auto text-center">
        <div class="relative p-12 rounded-3xl border-4 border-black bg-[#C4B5FD]/80 backdrop-blur-sm pattern-checker"
          style="box-shadow: 8px 8px 0 #FF6B35, 16px 16px 0 #7B2FFF, 24px 24px 0 #FFE600;"
        >
          <div class="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden" aria-hidden="true">
            <span class="text-[8rem] md:text-[12rem] font-heading font-bold text-[#FF6B6B]/5 uppercase select-none leading-none">
              HI
            </span>
          </div>

          <div class="relative z-10">
            <div class="text-5xl mb-6 animate-wiggle">👋</div>
            <h2 class="font-heading text-2xl md:text-4xl font-bold uppercase text-[#FF6B6B] text-shadow-double mb-6">
              期待你的来信！
            </h2>
            <p class="text-black/70 text-lg mb-9">
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
