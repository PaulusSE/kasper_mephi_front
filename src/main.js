import { createApp } from 'vue'
import App from './App.vue'
import router from "@/router/index.js";
import store from "@/store/index.js";
import { MaskInput } from 'vue-3-mask';


let app = createApp(App)
// app.config.globalProperties.IP = 'http://79.174.84.44:8080'
app.config.globalProperties.IP = 'http://95.163.231.174:8080'
app.config.globalProperties.fileMaxSizeMB = 150
// app.config.globalProperties.IP = 'http://localhost:8080'

app.use(router)
app.use(store)
app.component('MaskInput', MaskInput);

app.mount('#app')

