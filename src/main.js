import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from "@/router/router.js";
import ElementPlus from 'element-plus'
import App from './App.vue'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ElementPlus)

app.mount('#app')
