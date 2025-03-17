import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { TPost, TUser } from '@/types/user'

export const useUserStore = defineStore('userStore', () => {
  const user = ref<TUser | null>(null)
  const posts = ref<TPost[]>([])
  const commentsLoading = ref(false)

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
      item.id === postId ? { ...item, content: newContent, createdAt: new Date() } : item,
    )
  }

  const getPost = (postId: string | string[]) => {
    return posts.value.find((item) => item.id === postId)
  }

  const addComment = ({
    comment,
    postId,
    user,
  }: {
    postId: string
    comment: string
    user: TUser
  }) => {
    const post = posts.value.find((item) => item.id === postId)
    commentsLoading.value = true
    setTimeout(() => {
      if (post && user) {
        post.comments = [
          ...post.comments,
          {
            id: String(post.comments.length),
            content: comment,
            createdAt: new Date(),
            post: post,
            user: user,
          },
        ].reverse()
      }
      commentsLoading.value = false
    }, 1000)
  }

  const likePost = (postId: string, user: TUser) => {
    const post = posts.value.find((item) => item.id === postId)
    if (!post) return 'Post not found'

    const isLiked = post.likes.some((like) => like.user.id === user.id)
    if (isLiked) {
      return (post.likes = post.likes.filter((like) => like.user.id !== user.id))
    }
    post.likes = [
      ...post.likes,
      {
        id: Math.random().toString(),
        post: post,
        user: user,
      },
    ]
  }
  return {
    user,
    posts,
    setUser,
    addPost,
    likePost,
    deletePost,
    editPost,
    getPost,
    addComment,
    commentsLoading,
  }
})
