import axios from "axios"
import { AuthResponse } from "./../models/AuthResponse"

export const API_URL = `${process.env.REACT_APP_API_URL}/api`

export const $api = axios.create({
	baseURL: API_URL,
	withCredentials: true,
})

$api.interceptors.request.use(config => {
	// (config.headers as AxiosHeaders).set('Authorization', `Bearer ${localStorage.getItem("accessToken")}`);
	config.headers!.Authorization = `Bearer ${localStorage.getItem(
		"accessToken"
	)}`
	return config
})

$api.interceptors.response.use(
	config => {
		return config
	},
	async error => {
		const originalRequest = error.config
		if (
			error.response.status == 401 &&
			error.config &&
			!error.config._isRetry
		) {
			originalRequest._isRetry = true
			try {
				const response = await axios.get<AuthResponse>(
					`${API_URL}/auth/refresh`,
					{
						withCredentials: true,
					}
				)
				localStorage.setItem("token", response.data.accessToken)
				return $api.request(originalRequest)
			} catch (e) {
				console.log("Не авторизован.")
			}
		}
		throw error
	}
)
