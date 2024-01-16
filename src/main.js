import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from '@/store'

import './assets/main.scss'

import 'vant/es/dialog/style'
import 'vant/es/toast/style'

const app = createApp(App)

app.use(router).use(store)

app.mount('#app')
