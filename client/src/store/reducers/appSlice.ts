import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const initialState = {
	isLoading: false,
}

const appSlice = createSlice({
	name: "app",
	initialState,
	reducers: {
		setLoading(state, action: PayloadAction<boolean>) {
			state.isLoading = action.payload
		},
	},
})

export default appSlice.reducer
export const { setLoading } = appSlice.actions
