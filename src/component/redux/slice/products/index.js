import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const productSlice = createSlice({
	name: 'products',
	initialState: { list: [], btnCreate: false },
	reducers: {
		setProduct: (state, action) => {
			state.list = action.payload
		},
		setBtnCreate: (state, action) => {
			state.btnCreate = action.payload
		},
	},
})
export const { setProduct, setBtnCreate } = productSlice.actions
export default productSlice.reducer

export const axiosAllProducts = () => dispatch => {
	axios
		.get('http://localhost:8080/api/v1/product/allProduct')
		.then(response => {
			dispatch(setProduct(response.data.data))
		})
		.catch(error => console.log('error del servidor', error))
}

export const axiosDeleteProduct = id => dispatch => {
	axios
		.delete(`http://localhost:8080/api/v1/product/delete/${id}`)
		.then(response => {
			dispatch(setProduct(response.data.data))
		})
		.catch(error => console.log('error del servidor', error))
}

export const axiosCreateProduct = objConfig => dispatch => {
	axios
		.post(`http://localhost:8080/api/v1/product/save`, objConfig)
		.then(response => {
			dispatch(setProduct(response.data.data))
		})
		.catch(error => console.log('error del servidor', error))
}

export const openModalProducto = value => {
	setBtnCreate(value)
}
