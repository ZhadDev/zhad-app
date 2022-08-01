import { createSlice } from '@reduxjs/toolkit'

export const carShopSlice = createSlice({
	name: 'cardShop',
	initialState: { list: [], state: false },
	reducers: {
		addCarShop: (state, action) => {
			state.list.push(action.payload)
		},
		deleteCarShop: (state, action) => {
			state.list = action.payload
		},
		setCarShopState: (state, action) => {
			state.cardShop = action.payload
		},
	},
})
export const { addCarShop, setCarShopState, deleteCarShop } =
	carShopSlice.actions
export default carShopSlice.reducer
