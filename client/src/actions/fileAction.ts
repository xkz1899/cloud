import { nanoid } from "nanoid"
import { $api } from "../http"
import { AppDispatch } from "../store"
import { setLoading } from "../store/reducers/appSlice"
import { setCurrentUser } from "../store/reducers/authSlice"
import { deleteFile, pushFile, setFiles } from "../store/reducers/fileSlice"
import {
	changeFileUpload,
	pushUploadFile,
	setVisibleUploader,
} from "../store/reducers/uploadSlice"
import { FileResponse } from "./../models/FilesResponse"
import { IUser } from "./../models/IUser"

export const getFiles =
	(parent: number | null, sort: string | null) =>
	async (dispatch: AppDispatch) => {
		try {
			dispatch(setLoading(true))
			let url = `/files`
			if (parent) url += `/files?parent=${parent}`
			if (sort) url = `/files?sort=${sort}`
			if (parent && sort) url = `/files?sort=${sort}&parent=${parent}`
			const response = await $api.get<FileResponse[]>(url)
			dispatch(setFiles(response.data))
		} catch (err) {
			dispatch(setLoading(false))
			console.error(err)
		} finally {
			dispatch(setLoading(false))
		}
	}

export const createDir =
	(name: string, parent: number | null) => async (dispatch: AppDispatch) => {
		const response = await $api.post<FileResponse>(`/files`, {
			name,
			type: "dir",
			parent,
		})
		dispatch(pushFile(response.data))
	}

export const uploadFile =
	(file: File, parent: number | null) => async (dispatch: AppDispatch) => {
		try {
			const formData = new FormData()
			formData.append(`file`, file)
			if (parent) {
				formData.append(`parent`, parent + "")
			}
			const uploadFiles = {
				id: nanoid(),
				name: file.name,
				progress: 0,
			}
			dispatch(setVisibleUploader(true))
			dispatch(pushUploadFile(uploadFiles))

			console.log(formData)
			const response = await $api.post<FileResponse>(
				`/files/upload`,
				formData,
				{
					onUploadProgress: progressEvent => {
						const totalLength =
							progressEvent.event.lengthComputable && progressEvent.total
						if (totalLength) {
							let progress = Math.round(
								(progressEvent.loaded * 100) / totalLength
							)
							dispatch(
								changeFileUpload({
									id: uploadFiles.id,
									name: uploadFiles.name,
									progress,
								})
							)
						}
					},
				}
			)
			await dispatch(pushFile(response.data))
		} catch (err) {
			console.log(err)
		}
	}

export const downloadFile =
	(file: FileResponse) => async (dispatch: AppDispatch) => {
		try {
			const response = await fetch(
				`${process.env.REACT_APP_API_URL}/api/files/download/?id=${file.id}`,
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
						credentials: "include",
					},
				}
			)
			if (response.status === 200) {
				const blob = await response.blob()
				const downloadUrl = window.URL.createObjectURL(blob)
				const link = document.createElement("a")
				link.href = downloadUrl
				link.download = file.name
				document.body.appendChild(link)
				link.click()
				link.remove()
			}
		} catch (err) {
			console.log(err)
		}
	}

export const deleteFiles =
	(file: FileResponse) => async (dispatch: AppDispatch) => {
		try {
			await $api.delete(`/files/delete?id=${file.id}`)
			dispatch(deleteFile(file.id))
		} catch (err) {
			console.log(err)
		}
	}

export const searchFiles =
	(search: string, sort: string | null) => async (dispatch: AppDispatch) => {
		try {
			const response = await $api.get(
				`/files/search?search=${search}&sort=${sort}`
			)
			dispatch(setFiles(response.data))
			return response.data
		} catch (err) {
			console.log(err)
		}
	}

export const uploadAvatar = (file: File) => async (dispatch: AppDispatch) => {
	try {
		const formData = new FormData()
		formData.append(`file`, file)
		const response = await $api.post<IUser>("/files/avatar", formData)
		dispatch(setCurrentUser(response.data))
	} catch (err) {
		console.log(err)
	}
}

export const deleteAvatar = () => async (dispatch: AppDispatch) => {
	try {
		const response = await $api.delete<IUser>("/files/avatar")
		dispatch(setCurrentUser(response.data))
	} catch (err) {
		console.log(err)
	}
}
