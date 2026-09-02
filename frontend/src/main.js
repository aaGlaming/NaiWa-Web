import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import router from './router'
import { useUserStore } from './stores/user'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.mount('#app')

useUserStore(pinia).evaluateAchievements()

if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    const version = import.meta.env.VITE_BUILD_TIME || '1'
    navigator.serviceWorker
      .register(`${import.meta.env.BASE_URL}sw.js?v=${version}`)
      .catch(() => {})
  })
}
