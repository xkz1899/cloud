import { $api } from "../http";
import { AppDispatch } from "../store";
import { setAuth, setCurrentUser } from "../store/reducers/authSlice";
import { AuthResponse } from './../models/AuthResponse';
import { IUser } from './../models/IUser';


export const registration = (email: string, password: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await $api.post<AuthResponse>(`/auth/registration`, {email, password})
    console.log(response.data)
    localStorage.setItem("accessToken", response.data.accessToken)
    dispatch(setAuth(true))
    dispatch(setCurrentUser(response.data.user))
  }
  catch (err) {
    console.log(err)  
  }
}

export const login = (email: string, password: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await $api.post<AuthResponse>(`/auth/login`, {email, password})
    console.log(response.data)
    localStorage.setItem("accessToken", response.data.accessToken)
    dispatch(setAuth(true))
    dispatch(setCurrentUser(response.data.user))
  }
  catch (err) {
    console.log(err)  
  }
}

export const logout = () => async (dispatch: AppDispatch) => {
  try {
    const response = await $api.post(`/auth/logout`)
    console.log(response.data)
    localStorage.removeItem("accessToken")
    dispatch(setAuth(false))
    dispatch(setCurrentUser({} as IUser))
  }
  catch (err) {
    console.log(err)  
  }
}

export const refresh = () => async (dispatch: AppDispatch) => {
  try {
    const response = await $api.post<AuthResponse>(`/auth/refresh`)
    console.log(response.data)
    localStorage.setItem("accessToken", response.data.accessToken)
    dispatch(setAuth(true))
    dispatch(setCurrentUser(response.data.user))
  }
  catch (err) {
    console.log(err)  
  }
}
