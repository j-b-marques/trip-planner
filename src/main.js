import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import VueSelect from 'vue-next-select'

import './assets/styles/index.scss'
import 'vue-next-select/dist/index.min.css'

const app = createApp(App)

app.component('vue-select', VueSelect)

app.use(createPinia())

app.mount('#app')
