import { createApp } from 'vue'
import App from './App.vue'
import router from "@/router/index.js";
import store from "@/store/index.js";

import { vMaska } from "maska"


let app = createApp(App)
app.directive("maska", vMaska)
// app.config.globalProperties.IP = 'http://79.174.84.44:8080'
app.config.globalProperties.IP = 'https://mephi-22.ru/api/'
app.config.globalProperties.fileMaxSizeMB = 150
// app.config.globalProperties.IP = 'http://localhost:8080/api'

app.use(router)
app.use(store)

app.mount('#app')

