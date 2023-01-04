export interface IUser {
  id: number
  email: string
  avatar: string | null
  usedSpace: number | bigint
  diskSpace: number | bigint
  role: string
}