import { IUser } from "./IUser"

export interface AuthInitialState {
	isAuth: boolean
	isLoading: boolean
	currentUser: IUser
	error: string | null
}
