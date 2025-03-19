import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import PostView from '@/views/PostView.vue'
import SignupVIew from '@/views/SignupVIew.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/post/:id',
      name: 'post',
      component: PostView,
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginView,
    },
    {
      path: '/signup',
      name: 'Signup',
      component: SignupVIew,
    },
  ],
})

export default router
