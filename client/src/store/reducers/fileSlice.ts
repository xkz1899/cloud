import { createSlice } from "@reduxjs/toolkit"
import { PayloadAction } from "@reduxjs/toolkit"
import { FileInitialState } from "./../../models/FileInitialState"
import { FileResponse } from "./../../models/FilesResponse"

const initialState: FileInitialState = {
	files: [],
	currentDir: null,
	stackPath: [],
}

const fileSlice = createSlice({
	name: "file",
	initialState,
	reducers: {
		setCurrentDir(state, action: PayloadAction<number | null>) {
			state.currentDir = action.payload
		},
		setFiles(state, action: PayloadAction<Array<FileResponse>>) {
			state.files = action.payload
		},
		pushFile(state, action: PayloadAction<FileResponse>) {
			state.files.push(action.payload)
		},
		pushStackPath(state, action: PayloadAction<number | null>) {
			state.stackPath.push(action.payload)
		},
		popStackPath(state) {
			state.stackPath.pop()
		},
		deleteFile(state, action: PayloadAction<number>) {
			state.files =[...state.files].filter(file => file.id !== action.payload)
		},
	},
})

export default fileSlice.reducer
export const {
	setCurrentDir: setCurrentDir,
	setFiles,
	pushFile,
	pushStackPath,
	popStackPath,
	deleteFile,
} = fileSlice.actions
