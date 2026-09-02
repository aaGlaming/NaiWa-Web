<script setup>
import { usePageMeta } from '@/composables/usePageMeta'
import SectionTitle from '@/components/ui/SectionTitle.vue'
import MaximalButton from '@/components/ui/MaximalButton.vue'
import { useRouter } from 'vue-router'

usePageMeta()
const router = useRouter()

const logs = [
  { date: '2026-09-02', title: 'v2.1 优化', items: [
    '性能：移除未使用的 Element Plus，主包体积大幅缩小',
    '体验：开屏弹窗仅首次显示，桌宠默认隐藏',
    '功能：图库批量打包下载、梗图全库搜索、分享按钮',
    '修复：联系表单不再强制跳转 mailto，图库加载更稳定',
    'SEO：补充 robots.txt、sitemap.xml、og:image',
    'PWA：Service Worker 按构建版本更新缓存'
  ]},
  { date: '2026-09-02', title: 'v2.0 大更新', items: [
    '新增：梗图制作器、心情测试、图鉴收藏、成就系统',
    '新增：奶蛙桌宠（可拖拽浮动组件）',
    '新增：每日一图 + 佛系语录',
    '修复：图片库在 GitHub Pages 上的加载问题',
    '优化：联系表单 mailto 回退、PWA 支持、SEO 页面标题'
  ]},
  { date: '2026-03-01', title: 'v1.0 上线', items: [
    '首页、关于、图片库、抽卡、壁纸、塔罗、联系页',
    'Neo-Brutalism 设计风格',
    '447+ 张奶蛙表情包素材',
    'Enter 键彩蛋与开屏动画'
  ]}
]
</script>

<template>
  <div>
    <section class="relative min-h-[40vh] flex items-center justify-center px-6 py-24">
      <div class="text-center">
        <div class="text-8xl mb-6">📋</div>
        <h1 class="font-heading text-5xl md:text-7xl font-black uppercase">更新日志</h1>
      </div>
    </section>

    <section class="py-12 px-6 max-w-3xl mx-auto space-y-10">
      <div v-for="log in logs" :key="log.date" class="border-4 border-black bg-white p-8 shadow-neo">
        <div class="flex flex-wrap items-center gap-3 mb-4">
          <span class="px-3 py-1 bg-[#FF6B6B] text-white border-4 border-black font-black text-sm">{{ log.date }}</span>
          <h2 class="font-heading font-black text-2xl uppercase">{{ log.title }}</h2>
        </div>
        <ul class="space-y-2">
          <li v-for="(item, i) in log.items" :key="i" class="font-bold flex gap-2">
            <span class="text-[#FFD93D]">▸</span>{{ item }}
          </li>
        </ul>
      </div>
      <div class="text-center">
        <MaximalButton color="accent" icon="🏠" @click="router.push('/')">返回首页</MaximalButton>
      </div>
    </section>
  </div>
</template>
