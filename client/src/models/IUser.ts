export interface IUser {
	id: number
	email: string
	avatar: string | null
	usedSpace: bigint
	diskSpace: bigint
	role: string
}
