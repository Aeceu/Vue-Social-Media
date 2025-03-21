import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { TLogin, TUser } from '@/types/user'
import { useToast } from 'vue-toastification'
import { useRouter } from 'vue-router'

const toast = useToast()

export const useUserStore = defineStore('userStore', () => {
  const router = useRouter()
  const timeoutTime = 1000

  const user = ref<TUser | null>(null)

  const userToken = ref<string | null>(null)

  const users = ref<TUser[]>([])

  const usersLoading = ref(false)

  const persistUser = () => {
    const token = localStorage.getItem('token')
    if (!token) return toast.error("User's token not found")

    const users = localStorage.getItem('users')
    if (!users) return toast.error('All users not found')

    const foundUser = JSON.parse(users).find((item: TUser) => item.id === token)
    if (!foundUser) return toast.error("User's data not found")

    user.value = foundUser

    return foundUser
  }

  const handleSignup = (newUser: TUser) => {
    if (!newUser) return toast.error('User not found')

    const users = localStorage.getItem('users')
    if (!users) {
      user.value = {
        id: newUser.id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        password: newUser.password,
      }

      const updatedUsers = JSON.stringify([newUser])
      localStorage.setItem('users', updatedUsers)

      toast.success('Account created successfully')
      return router.push('/login')
    }

    const foundUser = JSON.parse(users).find((item: TUser) => item.email === newUser.email)
    if (foundUser) return toast.error('User already exists')

    user.value = {
      id: newUser.id,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      password: newUser.password,
    }

    const updatedUsers = JSON.stringify([...JSON.parse(users), newUser])
    localStorage.setItem('users', updatedUsers)

    toast.success('Account created successfully')
    router.push('/login')
  }

  const handleLogin = (newUser: TLogin) => {
    if (!newUser) return toast.error('User not found')

    const users = localStorage.getItem('users')
    if (!users) return toast.error('All users not found')

    const foundUser = JSON.parse(users).find((item: TUser) => item.email === newUser.email)
    if (!foundUser) return toast.error('User not found')

    const isValid = foundUser.password === newUser.password
    if (!isValid) return toast.error('Invalid password')

    user.value = foundUser
    userToken.value = foundUser.id
    localStorage.setItem('token', foundUser.id)

    toast.success('Login successfully')
    router.push('/')
  }

  const handleLogout = () => {
    userToken.value = null
    user.value = null
    localStorage.removeItem('token')
    router.push('/login')
  }

  const getAllUsers = () => {
    usersLoading.value = true
    setTimeout(() => {
      const res = localStorage.getItem('users')
      if (res) {
        users.value = JSON.parse(res)
      }

      usersLoading.value = false
    }, timeoutTime)
  }

  const setUser = (newUser: TUser | null) => {
    user.value = newUser
  }

  return {
    userToken,
    user,
    users,
    usersLoading,
    getAllUsers,
    handleLogin,
    handleSignup,
    handleLogout,
    setUser,
    persistUser,
  }
})
