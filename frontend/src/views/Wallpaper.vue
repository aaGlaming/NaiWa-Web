<script setup>
import { ref, onMounted, nextTick } from 'vue'
import MaximalButton from '@/components/ui/MaximalButton.vue'
import FloatingShape from '@/components/ui/FloatingShape.vue'
import { ACCENT_COLORS } from '@/utils'

const baseUrl = import.meta.env.BASE_URL || '/'

// 壁纸配置
const wallpaperWidth = ref(1920)
const wallpaperHeight = ref(1080)
const bgColor = ref('#0D0D1A')
const bgColorOptions = [
  { name: '深空黑', value: '#0D0D1A' },
  { name: '深紫', value: '#2D1B4E' },
  { name: '渐变紫', value: 'gradient-purple' },
  { name: '渐变蓝', value: 'gradient-blue' },
  { name: '渐变粉', value: 'gradient-pink' }
]

// 图片数据
const allImages = ref([])
const selectedImages = ref([])
const canvasRef = ref(null)
const isGenerating = ref(false)
const showPreview = ref(false)

// 尺寸预设
const sizePresets = [
  { name: '桌面 1920×1080', width: 1920, height: 1080 },
  { name: '桌面 2560×1440', width: 2560, height: 1440 },
  { name: '手机 1080×1920', width: 1080, height: 1920 },
  { name: '手机 1440×2560', width: 1440, height: 2560 },
  { name: '平板 2048×2732', width: 2048, height: 2732 },
  { name: '超宽 3440×1440', width: 3440, height: 1440 }
]

// 加载图片列表
async function loadImages() {
  try {
    const response = await fetch(baseUrl + 'images.json')
    const data = await response.json()
    allImages.value = data.images // 显示所有图片
  } catch (e) {
    console.error('Failed to load images:', e)
  }
}

// 切换图片选择
function toggleImage(image) {
  const index = selectedImages.value.findIndex(i => i.filename === image.filename)
  if (index > -1) {
    selectedImages.value.splice(index, 1)
  } else if (selectedImages.value.length < 12) {
    selectedImages.value.push(image)
  }
}

function isSelected(image) {
  return selectedImages.value.some(i => i.filename === image.filename)
}

// 设置尺寸
function setSize(preset) {
  wallpaperWidth.value = preset.width
  wallpaperHeight.value = preset.height
}

// 自动生成功能
async function autoGenerate() {
  if (allImages.value.length === 0) return

  isGenerating.value = true
  selectedImages.value = []

  // 随机选择5-12张图片
  const count = Math.floor(Math.random() * 8) + 5
  const shuffled = [...allImages.value].sort(() => Math.random() - 0.5)
  selectedImages.value = shuffled.slice(0, count)

  await nextTick()
  await generateWallpaper()
  isGenerating.value = false
}

// 生成壁纸
async function generateWallpaper() {
  if (selectedImages.value.length === 0) return

  const canvas = canvasRef.value
  if (!canvas) return

  const ctx = canvas.getContext('2d')
  canvas.width = wallpaperWidth.value
  canvas.height = wallpaperHeight.value

  // 绘制背景
  if (bgColor.value === 'gradient-purple') {
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
    gradient.addColorStop(0, '#0D0D1A')
    gradient.addColorStop(1, '#2D1B4E')
    ctx.fillStyle = gradient
  } else if (bgColor.value === 'gradient-blue') {
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
    gradient.addColorStop(0, '#0D0D1A')
    gradient.addColorStop(1, '#1a1a3a')
    ctx.fillStyle = gradient
  } else if (bgColor.value === 'gradient-pink') {
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
    gradient.addColorStop(0, '#2D1B4E')
    gradient.addColorStop(1, '#4a1a5e')
    ctx.fillStyle = gradient
  } else {
    ctx.fillStyle = bgColor.value
  }
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  // 绘制装饰背景
  drawBackgroundDecor(ctx, canvas.width, canvas.height)

  // 计算图片布局
  const images = selectedImages.value
  const padding = Math.min(canvas.width, canvas.height) * 0.04
  const gap = padding * 0.75

  let cols, rows
  if (images.length <= 2) { cols = images.length; rows = 1 }
  else if (images.length <= 4) { cols = 2; rows = 2 }
  else if (images.length <= 6) { cols = 3; rows = 2 }
  else if (images.length <= 9) { cols = 3; rows = 3 }
  else { cols = 4; rows = Math.ceil(images.length / 4) }

  const cellWidth = (canvas.width - padding * 2 - gap * (cols - 1)) / cols
  const cellHeight = (canvas.height - padding * 2 - gap * (rows - 1)) / rows

  // 加载并绘制图片
  const loadPromises = images.map((img, index) => {
    return new Promise((resolve) => {
      const imgEl = new Image()
      imgEl.crossOrigin = 'anonymous'
      imgEl.onload = () => {
        const col = index % cols
        const row = Math.floor(index / cols)

        const x = padding + col * (cellWidth + gap)
        const y = padding + row * (cellHeight + gap)

        const scale = Math.min(cellWidth / imgEl.width, cellHeight / imgEl.height)
        const drawWidth = imgEl.width * scale
        const drawHeight = imgEl.height * scale
        const drawX = x + (cellWidth - drawWidth) / 2
        const drawY = y + (cellHeight - drawHeight) / 2

        // 绘制圆角背景
        ctx.save()
        roundRect(ctx, x, y, cellWidth, cellHeight, 20)
        ctx.fillStyle = 'rgba(45, 27, 78, 0.8)'
        ctx.fill()
        ctx.strokeStyle = ACCENT_COLORS[index % 5]
        ctx.lineWidth = 4
        ctx.stroke()
        ctx.restore()

        // 绘制图片
        ctx.save()
        roundRect(ctx, drawX, drawY, drawWidth, drawHeight, 12)
        ctx.clip()
        ctx.drawImage(imgEl, drawX, drawY, drawWidth, drawHeight)
        ctx.restore()

        resolve()
      }
      imgEl.onerror = () => resolve()
      imgEl.src = `${baseUrl}images/${img.filename}`
    })
  })

  await Promise.all(loadPromises)

  // 绘制水印
  ctx.save()
  ctx.font = `bold ${Math.max(20, canvas.width * 0.012)}px Outfit, sans-serif`
  ctx.fillStyle = 'rgba(255, 230, 0, 0.3)'
  ctx.textAlign = 'right'
  ctx.fillText('🐸 奶蛙世界', canvas.width - 30, canvas.height - 30)
  ctx.restore()
}

// 绘制装饰背景
function drawBackgroundDecor(ctx, width, height) {
  ctx.save()
  ctx.fillStyle = 'rgba(255, 58, 242, 0.08)'
  for (let x = 0; x < width; x += 40) {
    for (let y = 0; y < height; y += 40) {
      ctx.beginPath()
      ctx.arc(x, y, 2, 0, Math.PI * 2)
      ctx.fill()
    }
  }
  ctx.restore()

  ctx.save()
  const gradient1 = ctx.createRadialGradient(width * 0.2, height * 0.3, 0, width * 0.2, height * 0.3, width * 0.2)
  gradient1.addColorStop(0, 'rgba(255, 230, 0, 0.08)')
  gradient1.addColorStop(1, 'transparent')
  ctx.fillStyle = gradient1
  ctx.fillRect(0, 0, width, height)

  const gradient2 = ctx.createRadialGradient(width * 0.8, height * 0.7, 0, width * 0.8, height * 0.7, width * 0.2)
  gradient2.addColorStop(0, 'rgba(0, 245, 212, 0.08)')
  gradient2.addColorStop(1, 'transparent')
  ctx.fillStyle = gradient2
  ctx.fillRect(0, 0, width, height)
  ctx.restore()
}

// 圆角矩形
function roundRect(ctx, x, y, width, height, radius) {
  ctx.beginPath()
  ctx.moveTo(x + radius, y)
  ctx.lineTo(x + width - radius, y)
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius)
  ctx.lineTo(x + width, y + height - radius)
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height)
  ctx.lineTo(x + radius, y + height)
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius)
  ctx.lineTo(x, y + radius)
  ctx.quadraticCurveTo(x, y, x + radius, y)
  ctx.closePath()
}

// 下载壁纸
function downloadWallpaper() {
  const canvas = canvasRef.value
  if (!canvas || selectedImages.value.length === 0) return

  const link = document.createElement('a')
  link.download = `奶蛙壁纸_${wallpaperWidth.value}x${wallpaperHeight.value}.png`
  link.href = canvas.toDataURL('image/png')
  link.click()
}

// 预览
function openPreview() {
  showPreview.value = true
}

onMounted(() => {
  loadImages()
})
</script>

<template>
  <div>
    <!-- Hero Section -->
    <section class="relative min-h-[35vh] flex items-center justify-center px-6 py-30 overflow-hidden">
      <div class="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
        <span class="text-[10rem] md:text-[18rem] font-heading font-bold text-max-quaternary/10 uppercase select-none leading-none">
          WALLPAPER
        </span>
      </div>

      <FloatingShape :colorIndex="3" size="xl" shape="circle" animation="float" top="10%" left="5%" />
      <FloatingShape :colorIndex="0" size="lg" shape="diamond" animation="float-reverse" top="20%" right="8%" />

      <div class="relative z-20 text-center max-w-4xl mx-auto">
        <div class="text-8xl md:text-9xl mb-9 animate-wiggle">🖼️</div>
        <h1 class="font-heading text-5xl md:text-7xl lg:text-8xl font-bold uppercase leading-none mb-9 text-shadow-mega text-max-quaternary">
          壁纸生成器
        </h1>
        <p class="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto">
          选择你喜欢的奶蛙图片，一键生成专属壁纸
        </p>
      </div>
    </section>

    <!-- Main Content -->
    <section class="relative py-36 px-6">
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">

          <!-- Left Panel: Settings -->
          <div class="lg:col-span-1 space-y-9">
            <!-- Size Preset -->
            <div class="p-6 rounded-3xl border-4 border-max-accent bg-max-muted/80"
              style="box-shadow: 6px 6px 0 #FFE600, 12px 12px 0 #FF3AF2;">
              <h3 class="font-heading text-xl font-bold text-max-accent uppercase mb-6">📐 尺寸选择</h3>
              <div class="grid grid-cols-2 gap-3">
                <button
                  v-for="preset in sizePresets"
                  :key="preset.name"
                  @click="setSize(preset)"
                  class="px-3 py-3 rounded-xl border-2 text-sm font-bold transition-all duration-300"
                  :class="[
                    wallpaperWidth === preset.width && wallpaperHeight === preset.height
                      ? 'bg-max-accent text-max-background border-max-accent'
                      : 'border-max-muted text-white/70 hover:border-max-accent'
                  ]"
                >
                  {{ preset.name }}
                </button>
              </div>
              <div class="mt-6 text-white/60 text-sm">
                当前: <span class="text-max-accent font-bold">{{ wallpaperWidth }} × {{ wallpaperHeight }}</span>
              </div>
            </div>

            <!-- Background Color -->
            <div class="p-6 rounded-3xl border-4 border-max-secondary bg-max-muted/80"
              style="box-shadow: 6px 6px 0 #FF3AF2, 12px 12px 0 #00F5D4;">
              <h3 class="font-heading text-xl font-bold text-max-secondary uppercase mb-6">🎨 背景颜色</h3>
              <div class="space-y-3">
                <button
                  v-for="color in bgColorOptions"
                  :key="color.name"
                  @click="bgColor = color.value"
                  class="w-full px-4 py-4.5 rounded-xl border-2 text-left transition-all duration-300 flex items-center gap-4.5"
                  :class="[
                    bgColor === color.value
                      ? 'border-max-secondary bg-max-secondary/20'
                      : 'border-max-muted hover:border-max-secondary'
                  ]"
                >
                  <div
                    class="w-8 h-8 rounded-lg border-2 border-white/20"
                    :style="{ background: color.value === 'gradient-purple' ? 'linear-gradient(135deg, #0D0D1A, #2D1B4E)' : color.value === 'gradient-blue' ? 'linear-gradient(135deg, #0D0D1A, #1a1a3a)' : color.value === 'gradient-pink' ? 'linear-gradient(135deg, #2D1B4E, #4a1a5e)' : color.value }"
                  ></div>
                  <span class="text-white/80">{{ color.name }}</span>
                </button>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="space-y-4.5">
              <MaximalButton
                color="accent"
                size="lg"
                icon="🎲"
                :loading="isGenerating"
                @click="autoGenerate"
                class="w-full"
              >
                一键生成
              </MaximalButton>

              <MaximalButton
                v-if="selectedImages.length > 0"
                color="tertiary"
                size="md"
                icon="⬇️"
                @click="downloadWallpaper"
                class="w-full"
              >
                下载壁纸
              </MaximalButton>
            </div>
          </div>

          <!-- Right Panel: Image Selection + Preview -->
          <div class="lg:col-span-2 space-y-9">
            <!-- Image Selection Header -->
            <div class="flex items-center justify-between">
              <h3 class="font-heading text-2xl font-bold text-max-accent uppercase">
                🖼️ 选择图片 ({{ selectedImages.length }}/12)
              </h3>
              <button
                v-if="selectedImages.length > 0"
                @click="selectedImages = []"
                class="text-max-secondary hover:text-white transition-colors text-sm"
              >
                清空选择
              </button>
            </div>

            <!-- Image Grid -->
            <div class="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-3 max-h-[400px] overflow-y-auto p-4 rounded-3xl border-4 border-max-tertiary bg-max-muted/50">
              <div
                v-for="(image, index) in allImages"
                :key="image.filename"
                @click="toggleImage(image)"
                class="relative aspect-square rounded-xl border-2 overflow-hidden cursor-pointer transition-all duration-200"
                :class="[
                  isSelected(image)
                    ? 'border-max-accent scale-105 shadow-lg ring-2 ring-max-accent'
                    : 'border-transparent hover:border-max-secondary hover:scale-105'
                ]"
              >
                <img
                  :src="`${baseUrl}images/${image.filename}`"
                  :alt="image.filename"
                  class="w-full h-full object-cover"
                  loading="lazy"
                />
                <div
                  v-if="isSelected(image)"
                  class="absolute top-1 right-1 w-6 h-6 rounded-full bg-max-accent flex items-center justify-center text-max-background text-xs font-bold"
                >
                  ✓
                </div>
                <div
                  v-if="isSelected(image)"
                  class="absolute bottom-1 left-1 px-2 py-1 rounded-full bg-max-background/80 text-max-accent text-xs font-bold"
                >
                  #{{ selectedImages.indexOf(image) + 1 }}
                </div>
              </div>
            </div>

            <!-- Canvas Preview -->
            <div class="p-4 rounded-3xl border-4 border-max-quaternary bg-max-muted/50"
              style="box-shadow: 6px 6px 0 #FF6B35, 12px 12px 0 #7B2FFF;">
              <h3 class="font-heading text-xl font-bold text-max-quaternary uppercase mb-6">📱 壁纸预览</h3>
              <div class="relative bg-black rounded-2xl overflow-hidden" style="aspect-ratio: 16/9;">
                <canvas
                  ref="canvasRef"
                  class="w-full h-full object-contain"
                ></canvas>
                <div v-if="selectedImages.length === 0" class="absolute inset-0 flex items-center justify-center">
                  <p class="text-white/40 text-lg">请先选择图片或点击"一键生成"</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Preview Modal -->
    <Teleport to="body">
      <Transition name="fade">
        <div
          v-if="showPreview"
          class="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/90 backdrop-blur-sm"
          @click.self="showPreview = false"
        >
          <div class="relative max-w-6xl w-full">
            <button
              @click="showPreview = false"
              class="absolute -top-12 right-0 w-10 h-10 rounded-full border-4 border-max-secondary bg-max-background text-max-secondary hover:bg-max-secondary hover:text-max-background transition-all duration-300 flex items-center justify-center text-lg font-bold z-10"
            >
              ✕
            </button>
            <div class="rounded-3xl border-4 border-max-accent overflow-hidden"
              style="box-shadow: 12px 12px 0 #FFE600, 24px 24px 0 #FF3AF2;">
              <canvas ref="canvasRef" class="w-full"></canvas>
            </div>
            <div class="mt-9 text-center">
              <MaximalButton color="accent" size="lg" icon="⬇️" @click="downloadWallpaper">
                下载壁纸 ({{ wallpaperWidth }}×{{ wallpaperHeight }})
              </MaximalButton>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #2D1B4E;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: #FFE600;
  border-radius: 4px;
}
</style>
