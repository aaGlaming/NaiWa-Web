<script setup>
import { ref, computed, onMounted } from 'vue'
import { useImageStore } from '@/stores/images'
import { useUserStore } from '@/stores/user'
import { usePageMeta } from '@/composables/usePageMeta'
import { QUIZ_QUESTIONS, calcQuizResult } from '@/data/quiz'
import MaximalButton from '@/components/ui/MaximalButton.vue'

usePageMeta()

const store = useImageStore()
const user = useUserStore()

const step = ref(0)
const scores = ref({ lazy: 0, chill: 0, energetic: 0, social: 0 })
const finished = ref(false)
const result = ref(null)

const currentQ = computed(() => QUIZ_QUESTIONS[step.value])
const progress = computed(() => `${String(step.value + 1).padStart(2, '0')} / ${String(QUIZ_QUESTIONS.length).padStart(2, '0')}`)

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
  const text = `我是${result.value.title}！${result.value.desc} https://aaglaming.github.io/NaiWa-Web/#/quiz`
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
    <section class="ed-page pt-16 md:pt-24 pb-10">
      <p class="ed-meta mb-4">Questionnaire</p>
      <h1 class="ed-display">心情.</h1>
      <p class="mt-6 text-charcoal max-w-md">测测你今天是哪一种躺法。</p>
    </section>

    <section class="ed-page max-w-2xl pb-24">
      <div v-if="!finished">
        <p class="ed-meta mb-4">{{ progress }}</p>
        <hr class="ed-rule mb-8" />
        <h2 class="font-display text-3xl md:text-4xl mb-10 leading-snug">{{ currentQ.question }}</h2>
        <button
          v-for="(opt, i) in currentQ.options"
          :key="i"
          type="button"
          class="ed-row"
          @click="choose(opt)"
        >
          <span class="ed-num">{{ String(i + 1).padStart(2, '0') }}</span>
          <span class="ed-row-title text-xl">{{ opt.text }}</span>
          <span class="ed-meta hidden sm:inline">Select</span>
        </button>
      </div>

      <div v-else>
        <p class="ed-meta mb-4">Result</p>
        <h2 class="font-display text-5xl md:text-6xl mb-6">{{ result.title }}</h2>
        <p class="text-lg leading-relaxed text-charcoal mb-10">{{ result.desc }}</p>
        <div class="flex flex-wrap gap-8">
          <MaximalButton @click="shareResult">分享</MaximalButton>
          <MaximalButton variant="ghost" @click="reset">再测一次</MaximalButton>
        </div>
      </div>
    </section>
  </div>
</template>
