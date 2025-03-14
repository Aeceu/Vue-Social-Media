import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { TUser } from '@/types/user'

export const useUserStore = defineStore('userStore', () => {
  const user = ref<TUser | null>(null)
  const setUser = (newUser: TUser | null) => {
    user.value = newUser
  }

  return { user, setUser }
})
