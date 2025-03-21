import type { TPost, TLikes, TUser } from '@/types/user'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useToast } from 'vue-toastification'

export const usePostStore = defineStore('postStore', () => {
  const toast = useToast()
  const timeoutTime = 1000

  const post = ref<TPost | null>(null)
  const posts = ref<TPost[]>([])

  const commentsLoading = ref(false)
  const feedLoading = ref(false)

  const getAllPosts = () => {
    feedLoading.value = true
    setTimeout(() => {
      const res = localStorage.getItem('posts')
      if (res) {
        posts.value = JSON.parse(res)
      }
      feedLoading.value = false
    }, timeoutTime)
  }

  const getAllSharedPost = () => {
    const res = localStorage.getItem('sharedPosts')
    if (res) {
      return (posts.value = JSON.parse(res))
    }
    return (posts.value = [])
  }

  const addPost = (newPost: TPost) => {
    posts.value = [...posts.value, newPost]
    const UpdatedPosts = JSON.stringify([...posts.value])
    localStorage.setItem('posts', UpdatedPosts)
    toast.success('Post added successfully')
  }

  const deletePost = (postId: string) => {
    toast.error('Post deleted successfully')
    posts.value = posts.value.filter((item) => item.id !== postId)
    const UpdatedPosts = JSON.stringify([...posts.value])
    localStorage.setItem('posts', UpdatedPosts)
  }

  const editPost = ({ postId, newContent }: { postId: string; newContent: string }) => {
    toast.success('Post edited successfully')
    posts.value = posts.value.map((item) =>
      item.id === postId ? { ...item, content: newContent, createdAt: new Date() } : item,
    )
    const UpdatedPosts = JSON.stringify([...posts.value])
    localStorage.setItem('posts', UpdatedPosts)
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
    const localStoragePosts = localStorage.getItem('posts')
    if (!localStoragePosts) return toast.error('Posts not found!')

    const post = posts.value.find((item: TPost) => item.id === postId)

    commentsLoading.value = true
    setTimeout(() => {
      if (post && user) {
        const updatedposts: TPost[] = JSON.parse(localStoragePosts).map((item: TPost) =>
          item.id === postId
            ? {
                ...item,
                comments: [
                  ...item.comments,
                  {
                    id: String(post.comments.length),
                    content: comment,
                    createdAt: new Date(),
                    post: post,
                    user: user,
                  },
                ],
              }
            : item,
        )
        posts.value = updatedposts
        localStorage.setItem('posts', JSON.stringify(updatedposts))
        commentsLoading.value = false
        return JSON.parse(localStoragePosts).find((item: TPost) => item.id === postId)
      }
    }, 500)
  }

  const likePost = (postId: string, user: TUser) => {
    const post = posts.value.find((item: TPost) => item.id === postId)
    if (!post) return toast.error('Post not found')

    const isLiked = post.likes.some((like: TLikes) => like.user.id === user.id)

    let UpdatedPosts
    if (isLiked) {
      UpdatedPosts = posts.value.map((item: TPost) =>
        item.id === post.id
          ? {
              ...item,
              likes: item.likes.filter((like: TLikes) => like.user.id !== user.id),
            }
          : item,
      )
    } else {
      UpdatedPosts = posts.value.map((item: TPost) =>
        item.id === post.id
          ? {
              ...item,
              likes: [...item.likes, { id: Math.random().toString(), post: post, user: user }],
            }
          : item,
      )
    }
    posts.value = UpdatedPosts
    localStorage.setItem('posts', JSON.stringify(UpdatedPosts))
  }
  return {
    post,
    posts,
    commentsLoading,
    feedLoading,
    getAllPosts,
    getAllSharedPost,
    addPost,
    deletePost,
    editPost,
    getPost,
    addComment,
    likePost,
  }
})
