export type TUser = {
  id: string
  firstName: string
  lastName: string
  email: string
  password: string
}

export type TPost = {
  id: string
  content: string
  postImage: string | null
  user: TUser
  createdAt: Date | string
  comments: TComment[]
  likes: TLikes[]
}

export type TComment = {
  id: string
  content: string
  createdAt: Date | string
  user: TUser
  post: TPost
}

export type TLikes = {
  id: string
  user: TUser
  post: TPost
}

export type TSharedPost = {
  id: string
  content: string
  user: TUser
  createdAt: Date | string
  comments: TComment[]
  likes: TLikes[]
  originalPost: TPost
}

export type TLogin = {
  email: string
  password: string
}
