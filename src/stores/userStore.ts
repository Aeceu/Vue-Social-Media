import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { TPost, TUser } from '@/types/user'

export const useUserStore = defineStore('userStore', () => {
  const user = ref<TUser | null>(null)
  const posts = ref<TPost[]>([])
  const setUser = (newUser: TUser | null) => {
    user.value = newUser
  }
  const addPost = (newPost: TPost) => {
    posts.value = [...posts.value, newPost]
  }

  const deletePost = (postId: string) => {
    posts.value = posts.value.filter((item) => item.id !== postId)
  }

  const editPost = ({ postId, newContent }: { postId: string; newContent: string }) => {
    posts.value = posts.value.map((item) =>
      item.id === postId ? { ...item, content: newContent } : item,
    )
  }

  return { user, posts, setUser, addPost, deletePost, editPost }
})
