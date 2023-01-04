import axios from "axios"
import { AxiosHeaders } from "axios"

export const API_URL = `http://localhost:5000/api`

export const $api = axios.create({
	baseURL: API_URL,
	withCredentials: true,
})

$api.interceptors.request.use(config => {
	// config.headers = { ...config.headers } as AxiosHeaders
	// config.headers!.set("Authorization", `Bearer ${localStorage.getItem("accessToken")}`)
	// config.headers!.Authorization = `Bearer ${localStorage.getItem("accessToken")}`
	(config.headers as AxiosHeaders).set('Authorization', `Bearer ${localStorage.getItem("accessToken")}`);
	return config
})

