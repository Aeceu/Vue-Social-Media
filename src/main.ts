import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import {
  FaThumbsUp,
  FaShare,
  FaCommentDots,
  FaTrash,
  FaPaperPlane,
  FaEdit,
  FaWindowClose,
  PrSpinner,
  RiRefreshLine,
  FaArrowLeft,
} from 'oh-vue-icons/icons'
import { addIcons, OhVueIcon } from 'oh-vue-icons'

addIcons(
  RiRefreshLine,
  PrSpinner,
  FaPaperPlane,
  FaThumbsUp,
  FaShare,
  FaCommentDots,
  FaTrash,
  FaEdit,
  FaWindowClose,
  FaArrowLeft,
)

const app = createApp(App)

app.component('v-icons', OhVueIcon)
app.use(createPinia())
app.use(router)

app.mount('#app')
