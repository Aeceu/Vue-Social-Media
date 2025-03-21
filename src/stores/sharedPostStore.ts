import type { TPost, TSharedPost, TUser } from '@/types/user'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useToast } from 'vue-toastification'

export const useSharedPostStore = defineStore('shareStore', () => {
  const toast = useToast()

  const sharedPosts = ref<TSharedPost[]>([])

  const getAllSharedPost = () => {
    const res = localStorage.getItem('sharedPosts')
    if (res) {
      return (sharedPosts.value = JSON.parse(res))
    }
    return (sharedPosts.value = [])
  }

  const sharePost = (post: TPost, user: TUser) => {
    const sharedPost: TSharedPost = {
      id: Math.random().toString(),
      content: post.content,
      createdAt: new Date(),
      user: user,
      comments: [],
      likes: [],
      originalPost: post,
    }
    sharedPosts.value = [...sharedPosts.value, sharedPost]
    toast.success('Post shared successfully')
  }

  const getSharedPost = (postId: string) => {
    return sharedPosts.value.find((item) => item.id === postId)
  }

  const updateSharedPost = (sharedPostId: string, newContent: string) => {
    toast.success('Sharedpost edited successfully')
    sharedPosts.value = sharedPosts.value.map((item) =>
      item.id === sharedPostId ? { ...item, content: newContent, createdAt: new Date() } : item,
    )
  }

  const deleteSharedPost = (sharedPostId: string) => {
    toast.error('Sharedpost deleted successfully')
    sharedPosts.value = sharedPosts.value.filter((item) => item.id !== sharedPostId)
  }

  return {
    sharedPosts,
    getAllSharedPost,
    sharePost,
    getSharedPost,
    updateSharedPost,
    deleteSharedPost,
  }
})
