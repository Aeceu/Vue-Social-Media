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
  user: TUser
  createdAt: Date
  comments: TComment[]
  likes: TLikes[]
}

export type TComment = {
  id: string
  content: string
  createdAt: Date
  user: TUser
  post: TPost
}

export type TLikes = {
  id: string
  user: TUser
  post: TPost
}
