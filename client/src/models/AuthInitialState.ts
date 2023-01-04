import { IUser } from "./IUser"

export interface AuthInitialState {
	isAuth: boolean
	currentUser: IUser
}
