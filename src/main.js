import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import App from './App.vue'

const app = createApp(App)

app.use(createPinia())
app.use(ElementPlus)

app.mount('#app')
