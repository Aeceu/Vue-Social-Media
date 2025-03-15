import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import {
  FaThumbsUp,
  FaThumbsDown,
  FaCommentDots,
  FaTrash,
  FaEdit,
  FaWindowClose,
} from 'oh-vue-icons/icons'
import { addIcons, OhVueIcon } from 'oh-vue-icons'

addIcons(FaThumbsUp, FaThumbsDown, FaCommentDots, FaTrash, FaEdit, FaWindowClose)

const app = createApp(App)

app.component('v-icons', OhVueIcon)
app.use(createPinia())
app.use(router)

app.mount('#app')
