import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'

export const useImageStore = defineStore('images', () => {
  const images = ref([])
  const loading = ref(false)
  const error = ref(null)
  const currentCategory = ref('all')
  const searchQuery = ref('')

  const categories = [
    { id: 'all', label: '全部', icon: '🌟' },
    { id: 'emoji', label: '表情包', icon: '😄' },
    { id: 'sticker', label: '贴图', icon: '🏷️' },
    { id: 'animation', label: '动画', icon: '🎬' }
  ]

  const filteredImages = computed(() => {
    let result = images.value
    if (currentCategory.value !== 'all') {
      result = result.filter(img => img.category === currentCategory.value)
    }
    if (searchQuery.value) {
      const q = searchQuery.value.toLowerCase()
      result = result.filter(img =>
        img.filename.toLowerCase().includes(q) ||
        (img.tags && img.tags.some(t => t.toLowerCase().includes(q)))
      )
    }
    return result
  })

  const stats = computed(() => ({
    total: images.value.length,
    emoji: images.value.filter(i => i.category === 'emoji').length,
    sticker: images.value.filter(i => i.category === 'sticker').length,
    animation: images.value.filter(i => i.category === 'animation').length
  }))

  async function fetchImages() {
    loading.value = true
    error.value = null
    try {
      const response = await axios.get('/api/images')
      images.value = response.data.images
    } catch (e) {
      error.value = e.message || 'Failed to load images'
      console.error('Error fetching images:', e)
    } finally {
      loading.value = false
    }
  }

  function setCategory(category) {
    currentCategory.value = category
  }

  function setSearch(query) {
    searchQuery.value = query
  }

  return {
    images,
    loading,
    error,
    currentCategory,
    searchQuery,
    categories,
    filteredImages,
    stats,
    fetchImages,
    setCategory,
    setSearch
  }
})
