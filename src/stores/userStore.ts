import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { TLikes, TLogin, TPost, TSharedPost, TUser } from '@/types/user'
import { useToast } from 'vue-toastification'
import { useRouter } from 'vue-router'

const toast = useToast()

export const useUserStore = defineStore('userStore', () => {
  const userToken = ref<string | null>(null)
  const user = ref<TUser | null>(null)
  const posts = ref<TPost[]>([])
  const post = ref<TPost | null>(null)
  const sharedPosts = ref<TSharedPost[]>([])
  const commentsLoading = ref(false)
  const router = useRouter()

  // fetch user using token save in local storage
  // const getUser = (token: string | null) => {}

  const persistUser = () => {
    const token = localStorage.getItem('token')
    if (!token) return console.log("User's token not found")

    const users = localStorage.getItem('users')
    if (!users) return console.log('All users not found')

    const foundUser = JSON.parse(users).find((item: TUser) => item.id === token)
    if (!foundUser) return console.log("User's data not found")

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
    const res = localStorage.getItem('users')
    if (res) {
      return (user.value = JSON.parse(res))
    }
    return []
  }

  const getAllPosts = () => {
    const res = localStorage.getItem('posts')
    if (res) {
      return (posts.value = JSON.parse(res))
    }
    return (posts.value = [])
  }

  const getAllSharedPost = () => {
    const res = localStorage.getItem('sharedPosts')
    if (res) {
      return (posts.value = JSON.parse(res))
    }
    return (posts.value = [])
  }

  const setUser = (newUser: TUser | null) => {
    user.value = newUser
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

    // if (foundPost) return (post.value = foundPost)
    // const posts = localStorage.getItem('posts')
    // if (posts) {
    //   return JSON.parse(posts).find((item: TPost) => item.id === postId)
    // }
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
    userToken,
    user,
    posts,
    post,
    sharedPosts,
    commentsLoading,
    getAllSharedPost,
    getAllUsers,
    getAllPosts,
    getPost,
    handleLogin,
    handleSignup,
    handleLogout,
    setUser,
    addPost,
    likePost,
    deletePost,
    editPost,
    addComment,
    sharePost,
    getSharedPost,
    updateSharedPost,
    deleteSharedPost,
    persistUser,
  }
})
