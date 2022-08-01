import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
	name: 'users',
	initialState: { auth: true, ubication: 'products' },
	reducers: {
		setUserAuth: (state, action) => {
			state.auth = action.payload
		},
		setUbication: (state, action) => {
			state.ubication = action.payload
		},
	},
})
export const { setUserAuth, setUbication } = userSlice.actions
export default userSlice.reducer
