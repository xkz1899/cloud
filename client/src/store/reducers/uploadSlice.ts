import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { FileUpload } from "./../../models/FileUpload"
import { UploadInitialState } from "./../../models/UploadInitialState"

const initialState: UploadInitialState = {
	isVisible: false,
	files: [],
}

const uploadSlice = createSlice({
	name: "upload",
	initialState,
	reducers: {
		setVisibleUploader(state, action: PayloadAction<boolean>) {
			state.isVisible = action.payload
		},
		pushUploadFile(state, action: PayloadAction<FileUpload>) {
			state.files.push(action.payload)
		},
		deleteUploadFile(state, action: PayloadAction<FileUpload>) {
			state.files = [...state.files].filter(
				file => file.id !== action.payload.id
			)
		},
		changeFileUpload(state, action: PayloadAction<FileUpload>) {
			const file = state.files.find(f => f.id === action.payload.id)
			console.log("FILE!!!", file)
			if (file) {
				file.progress = action.payload.progress
			}
		},
	},
})

export default uploadSlice.reducer
export const {
	setVisibleUploader,
	pushUploadFile,
	deleteUploadFile,
	changeFileUpload,
} = uploadSlice.actions
