import { createApp } from 'vue'
import App from './App.vue'
import router from "@/router/index.js";
import store from "@/store/index.js";
import axios from 'axios'
import { vMaska } from "maska"


const app = createApp(App)
app.directive("maska", vMaska)

// app.config.globalProperties.IP = 'http://79.174.84.44:8080'
const BASE = import.meta.env.VITE_API_URL || '/api'
app.config.globalProperties.IP = BASE
app.config.globalProperties.fileMaxSizeMB = 150
// app.config.globalProperties.IP = 'http://localhost:8080/api'

async function initAnonymousToken() {
    const key = 'access_token'
    if (!localStorage.getItem(key)) {
      try {
        const res = await axios.post(`${BASE}/authorize/anonymous`)
        localStorage.setItem(key, res.data.token)
        console.log('Получен анонимный токен:', res.data.token)
      } catch (err) {
        console.error('Не удалось получить анонимный токен', err)
      }
    }
  }
  
  initAnonymousToken().then(() => {
    app.use(router)
    app.use(store)
    app.mount('#app')
  })

