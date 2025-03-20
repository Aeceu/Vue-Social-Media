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
  FaChevronLeft,
  FaSearch,
  FaMoon,
  FaSun,
  FaImage,
} from 'oh-vue-icons/icons'
import { addIcons, OhVueIcon } from 'oh-vue-icons'
import Toast, { POSITION } from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

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
  FaWindowClose,
  FaChevronLeft,
  FaSearch,
  FaMoon,
  FaSun,
  FaImage,
)

const app = createApp(App)

app.component('v-icons', OhVueIcon)

app.use(router)
app.use(Toast, {
  position: POSITION.TOP_LEFT,
})

app.use(createPinia())
app.use(ElementPlus)

app.mount('#app')
