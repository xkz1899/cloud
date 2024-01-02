import { $api } from "../http"
import { AppDispatch } from "../store"
import {
	setAuth,
	setCurrentUser,
	setError,
	setLoadingAuth,
} from "../store/reducers/authSlice"
import { AuthResponse } from "./../models/AuthResponse"
import { IUser } from "./../models/IUser"

export const registration =
	(email: string, password: string) => async (dispatch: AppDispatch) => {
		try {
			const response = await $api.post(`/auth/registration`, {
				email,
				password,
			})
			localStorage.setItem("accessToken", response.data.accessToken)
			dispatch(setAuth(true))
			dispatch(setCurrentUser(response.data.user))
		} catch (err: any) {
			dispatch(setError(err.response.data.message))
		}
	}

export const login =
	(email: string, password: string) => async (dispatch: AppDispatch) => {
		try {
			const response = await $api.post<AuthResponse>(`/auth/login`, {
				email,
				password,
			})
			localStorage.setItem("accessToken", response.data.accessToken)
			dispatch(setAuth(true))
			dispatch(setCurrentUser(response.data.user))
		} catch (err: any) {
			dispatch(setError(err.response.data.message))
		}
	}

export const logout = () => async (dispatch: AppDispatch) => {
	try {
		await $api.post(`/auth/logout`)
		localStorage.removeItem("accessToken")
		dispatch(setAuth(false))
		dispatch(setCurrentUser({} as IUser))
	} catch (err) {
		console.log(err)
	}
}

export const refresh = () => async (dispatch: AppDispatch) => {
	try {
		dispatch(setLoadingAuth(true))
		const response = await $api.post(`/auth/refresh`)
		localStorage.setItem("accessToken", response.data.accessToken)
		dispatch(setAuth(true))
		dispatch(setCurrentUser(response.data.user))
	} catch (err: any) {
		dispatch(setError(err.response.data.message))
	} finally {
		dispatch(setLoadingAuth(false))
	}
}
