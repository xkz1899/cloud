import { configureStore } from "@reduxjs/toolkit"
import authSlice from "./reducers/authSlice"
import fileSlice from "./reducers/fileSlice"
import uploadSlice from "./reducers/uploadSlice"
import appSlice from "./reducers/appSlice"

export const store = configureStore({
	reducer: {
		authSlice,
		fileSlice,
		uploadSlice,
		appSlice,
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
