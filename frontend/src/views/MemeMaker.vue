<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useImageStore } from '@/stores/images'
import { useUserStore } from '@/stores/user'
import { usePageMeta } from '@/composables/usePageMeta'
import SectionTitle from '@/components/ui/SectionTitle.vue'
import MaximalButton from '@/components/ui/MaximalButton.vue'
import FloatingShape from '@/components/ui/FloatingShape.vue'
import { shareContent } from '@/utils/share'

usePageMeta()

const store = useImageStore()
const user = useUserStore()
const baseUrl = import.meta.env.BASE_URL || './'

const selected = ref(null)
const topText = ref('无所谓')
const bottomText = ref('躺平万岁')
const fontSize = ref(48)
const textColor = ref('#FFFFFF')
const strokeColor = ref('#000000')
const canvasRef = ref(null)
const search = ref('')
const category = ref('all')
const shareTip = ref('')

const pickerImages = computed(() => {
  let list = store.images
  if (category.value !== 'all') {
    list = list.filter(i => i.category === category.value)
  }
  if (search.value.trim()) {
    const q = search.value.toLowerCase()
    list = list.filter(i => i.filename.toLowerCase().includes(q))
  }
  return list
})

function selectImage(img) {
  selected.value = img
}

async function renderMeme() {
  if (!selected.value || !canvasRef.value) return
  const canvas = canvasRef.value
  const ctx = canvas.getContext('2d')
  const img = new Image()
  img.crossOrigin = 'anonymous'
  img.src = `${baseUrl}images/${selected.value.filename}`

  await new Promise((resolve, reject) => {
    img.onload = resolve
    img.onerror = reject
  })

  canvas.width = img.width
  canvas.height = img.height
  ctx.drawImage(img, 0, 0)

  const drawText = (text, yRatio) => {
    if (!text.trim()) return
    const size = fontSize.value
    ctx.font = `900 ${size}px Impact, "Arial Black", sans-serif`
    ctx.textAlign = 'center'
    ctx.lineWidth = size / 12
    ctx.strokeStyle = strokeColor.value
    ctx.fillStyle = textColor.value
    const y = canvas.height * yRatio
    ctx.strokeText(text.toUpperCase(), canvas.width / 2, y)
    ctx.fillText(text.toUpperCase(), canvas.width / 2, y)
  }

  drawText(topText.value, 0.12)
  drawText(bottomText.value, 0.92)
}

watch([selected, topText, bottomText, fontSize, textColor, strokeColor], () => {
  if (selected.value) renderMeme()
})

function downloadMeme() {
  if (!canvasRef.value) return
  const link = document.createElement('a')
  link.download = `奶蛙梗图_${Date.now()}.png`
  link.href = canvasRef.value.toDataURL('image/png')
  link.click()
  user.track('meme')
}

async function shareMeme() {
  if (!canvasRef.value) return
  const result = await shareContent({
    title: '奶蛙梗图',
    text: `${topText.value} / ${bottomText.value}`,
    url: `${location.origin}${location.pathname}#/meme`
  })
  shareTip.value = result === 'copied' ? '链接已复制' : result === 'shared' ? '分享成功' : ''
}

onMounted(() => store.fetchImages())
</script>

<template>
  <div>
    <section class="relative min-h-[40vh] flex items-center justify-center px-6 py-24 overflow-hidden">
      <FloatingShape :colorIndex="0" size="lg" shape="square" animation="float" top="15%" left="8%" />
      <FloatingShape :colorIndex="2" size="md" shape="circle" animation="bounce" top="20%" right="10%" />
      <div class="relative z-10 text-center">
        <div class="text-8xl mb-6 animate-bounce-subtle" aria-hidden="true">😂</div>
        <h1 class="font-heading text-5xl md:text-7xl font-black uppercase text-[#FF6B6B]">梗图制作器</h1>
        <p class="mt-4 font-bold text-lg">选图 → 加字 → 导出，奶蛙帮你表达一切</p>
      </div>
    </section>

    <section class="py-12 px-6 max-w-7xl mx-auto">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div class="border-4 border-black bg-white p-6 shadow-neo">
          <SectionTitle title="编辑区" subtitle="上下文字经典梗图布局" :colorIndex="1" emoji="✏️" />
          <div class="space-y-4 mb-6">
            <input v-model="topText" placeholder="顶部文字" aria-label="顶部文字" class="w-full px-4 py-3 border-4 border-black font-bold" />
            <input v-model="bottomText" placeholder="底部文字" aria-label="底部文字" class="w-full px-4 py-3 border-4 border-black font-bold" />
            <label class="block font-bold text-sm">字号 {{ fontSize }}</label>
            <input v-model.number="fontSize" type="range" min="24" max="96" class="w-full" aria-label="字号" />
            <div class="flex gap-4">
              <label class="font-bold text-sm">文字色 <input v-model="textColor" type="color" class="ml-2" aria-label="文字颜色" /></label>
              <label class="font-bold text-sm">描边色 <input v-model="strokeColor" type="color" class="ml-2" aria-label="描边颜色" /></label>
            </div>
          </div>
          <div class="border-4 border-black bg-black min-h-[280px] flex items-center justify-center overflow-hidden">
            <canvas v-show="selected" ref="canvasRef" class="max-w-full max-h-[400px]" />
            <p v-if="!selected" class="text-white font-bold p-8">← 先从右侧选一张图</p>
          </div>
          <div class="mt-6 flex flex-wrap gap-3 justify-center">
            <MaximalButton color="accent" size="lg" icon="⬇️" :disabled="!selected" @click="downloadMeme">下载梗图</MaximalButton>
            <MaximalButton color="secondary" size="md" icon="🔗" :disabled="!selected" @click="shareMeme">分享</MaximalButton>
          </div>
          <p v-if="shareTip" class="text-center text-sm font-bold mt-3 text-black/60">{{ shareTip }}</p>
        </div>

        <div>
          <SectionTitle title="选图" subtitle="支持搜索和分类" :colorIndex="2" emoji="🖼️" />
          <div class="flex flex-wrap gap-2 mb-4">
            <button
              v-for="cat in store.categories"
              :key="cat.id"
              type="button"
              class="px-3 py-1 border-4 border-black font-bold text-sm shadow-neo-sm"
              :class="category === cat.id ? 'bg-[#FF6B6B] text-white' : 'bg-white'"
              @click="category = cat.id"
            >{{ cat.icon }} {{ cat.label }}</button>
          </div>
          <input
            v-model="search"
            type="search"
            placeholder="🔍 搜索图片..."
            aria-label="搜索梗图素材"
            class="w-full px-4 py-3 border-4 border-black font-bold mb-4"
          />
          <div v-if="store.loading" class="text-center py-12 font-bold">加载中…</div>
          <div v-else-if="!pickerImages.length" class="text-center py-12 font-bold text-black/50">没有匹配的图片</div>
          <div v-else class="grid grid-cols-3 sm:grid-cols-4 gap-3 max-h-[600px] overflow-y-auto pr-2">
            <button
              v-for="img in pickerImages"
              :key="img.filename"
              type="button"
              class="aspect-square border-4 border-black p-1 bg-white transition-all hover:-translate-y-1"
              :class="selected?.filename === img.filename ? 'ring-4 ring-[#FF6B6B] bg-[#FFD93D]' : ''"
              @click="selectImage(img)"
            >
              <img :src="`${baseUrl}images/${img.filename}`" :alt="img.filename" class="w-full h-full object-contain" loading="lazy" decoding="async" />
            </button>
          </div>
          <p class="text-sm font-bold text-black/50 mt-3">共 {{ pickerImages.length }} 张可选</p>
        </div>
      </div>
    </section>
  </div>
</template>
