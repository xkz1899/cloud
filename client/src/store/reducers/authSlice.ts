import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IUser } from "./../../models/IUser"
import { AuthInitialState } from "./../../models/AuthInitialState"

const initialState: AuthInitialState = {
	isAuth: false,
	currentUser: {} as IUser,
}

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setAuth(state, action: PayloadAction<boolean>) {
			state.isAuth = action.payload
		},
		setCurrentUser(state, action: PayloadAction<IUser>) {
			state.currentUser = action.payload
		},
	},
})

export default authSlice.reducer
export const { setAuth, setCurrentUser } = authSlice.actions
