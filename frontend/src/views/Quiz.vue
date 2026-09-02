<script setup>
import { ref, computed } from 'vue'
import { useImageStore } from '@/stores/images'
import { useUserStore } from '@/stores/user'
import { usePageMeta } from '@/composables/usePageMeta'
import { QUIZ_QUESTIONS, calcQuizResult } from '@/data/quiz'
import MaximalButton from '@/components/ui/MaximalButton.vue'
import FloatingShape from '@/components/ui/FloatingShape.vue'
import { onMounted } from 'vue'

usePageMeta()

const store = useImageStore()
const user = useUserStore()
const baseUrl = import.meta.env.BASE_URL || './'

const step = ref(0)
const scores = ref({ lazy: 0, chill: 0, energetic: 0, social: 0 })
const finished = ref(false)
const result = ref(null)

const currentQ = computed(() => QUIZ_QUESTIONS[step.value])
const progress = computed(() => `${step.value + 1} / ${QUIZ_QUESTIONS.length}`)

function choose(option) {
  for (const [k, v] of Object.entries(option.score)) {
    scores.value[k] = (scores.value[k] || 0) + v
  }
  if (step.value < QUIZ_QUESTIONS.length - 1) {
    step.value++
  } else {
    result.value = calcQuizResult(scores.value)
    finished.value = true
    user.track('quiz')
  }
}

function reset() {
  step.value = 0
  scores.value = { lazy: 0, chill: 0, energetic: 0, social: 0 }
  finished.value = false
  result.value = null
}

function shareResult() {
  if (!result.value) return
  const text = `我是${result.value.title}${result.value.emoji}！${result.value.desc} https://aaglaming.github.io/NaiWa-Web/#/quiz`
  if (navigator.share) {
    navigator.share({ title: result.value.title, text })
  } else {
    navigator.clipboard?.writeText(text)
    alert('结果已复制到剪贴板！')
  }
}

onMounted(() => store.fetchImages())
</script>

<template>
  <div>
    <section class="relative min-h-[40vh] flex items-center justify-center px-6 py-24 overflow-hidden">
      <FloatingShape :colorIndex="2" size="lg" shape="circle" animation="float" top="10%" left="6%" />
      <div class="relative z-10 text-center">
        <div class="text-8xl mb-6">🧠</div>
        <h1 class="font-heading text-5xl md:text-7xl font-black uppercase text-[#C4B5FD]">心情测试</h1>
        <p class="mt-4 font-bold">测测你今天是什么状态的奶蛙</p>
      </div>
    </section>

    <section class="py-12 px-6 max-w-2xl mx-auto">
      <!-- Quiz -->
      <div v-if="!finished" class="border-8 border-black bg-white p-8 shadow-neo">
        <p class="font-heading font-black text-[#FF6B6B] uppercase mb-2">{{ progress }}</p>
        <h2 class="font-heading text-2xl font-black mb-8">{{ currentQ.question }}</h2>
        <div class="space-y-3">
          <button
            v-for="(opt, i) in currentQ.options"
            :key="i"
            class="w-full text-left px-5 py-4 border-4 border-black font-bold transition-all hover:bg-[#FFD93D] hover:-translate-y-1 shadow-neo-sm"
            @click="choose(opt)"
          >
            {{ opt.text }}
          </button>
        </div>
      </div>

      <!-- Result -->
      <div v-else class="border-8 border-black p-10 text-center shadow-neo" :style="{ backgroundColor: result.color }">
        <div class="text-8xl mb-4 animate-bounce-subtle">{{ result.emoji }}</div>
        <h2 class="font-heading text-4xl font-black uppercase mb-4">{{ result.title }}</h2>
        <p class="font-bold text-lg leading-relaxed mb-8">{{ result.desc }}</p>
        <div class="flex flex-wrap gap-3 justify-center">
          <MaximalButton color="accent" icon="🔗" @click="shareResult">分享结果</MaximalButton>
          <MaximalButton color="secondary" icon="🔄" @click="reset">再测一次</MaximalButton>
        </div>
      </div>
    </section>
  </div>
</template>
