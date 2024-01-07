import { createApp } from 'vue'
import App from './App.vue'
import router from "@/router/index.js";
import store from "@/store/index.js";


let app = createApp(App)
app.config.globalProperties.IP = 'http://79.174.84.44:8080'
app.use(router).use(store).mount('#app')
// createApp(App).use(router).use(store).mount('#app')
