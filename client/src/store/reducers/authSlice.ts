import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IUser } from "./../../models/IUser"
import { AuthInitialState } from "./../../models/AuthInitialState"

const initialState: AuthInitialState = {
	isAuth: false,
	isLoading: false,
	currentUser: {} as IUser,
	error: null,
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
		setLoadingAuth(state, action: PayloadAction<boolean>) {
			state.isLoading = action.payload
		},
		setError(state, action: PayloadAction<string | null>) {
			state.error = action.payload
		},
	},
})

export default authSlice.reducer
export const { setAuth, setCurrentUser, setLoadingAuth, setError } =
	authSlice.actions
