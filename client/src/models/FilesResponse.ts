export interface FileResponse {
	id: number
	user_id: number
	name: string
  type: string
  accessLink: null | string
  size: number
  path: string
  parent_id: null | number
  date: Date
}
