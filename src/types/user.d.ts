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
  createdAt: string
}
