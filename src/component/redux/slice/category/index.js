import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const categorySlice = createSlice({
	name: 'category',
	initialState: { list: [], selectCtgy: [] },
	reducers: {
		setCategory: (state, action) => {
			state.list = action.payload
		},
		setSelectCategory: (state, action) => {
			state.selectCtgy = action.payload
		},
	},
})
export const { setCategory, setSelectCategory } = categorySlice.actions
export default categorySlice.reducer

export const axiosAllCategory = () => dispatch => {
	axios
		.get('http://localhost:8080/api/v1/category/allCategory')
		.then(response => {
			const res = response.data.data

			dispatch(setCategory(res))
			const obj = []
			for (let index = 0; index < res.length; index++) {
				const element = res[index]
				const rest = { value: element.id, label: element.name }
				obj.push(rest)
			}
			dispatch(setSelectCategory(obj))
		})
		.catch(error => console.log('error del servidor', error))
}

export const axiosDeleteCategory = id => dispatch => {
	axios
		.delete(`http://localhost:8080/api/v1/category/deleteCategory/${id}`)
		.then(response => {
			dispatch(setCategory(response.data.data))
			dispatch(axiosAllCategory())
		})
		.catch(error => console.log('error del servidor', error))
}

export const axiosCreateCategory = objConfig => dispatch => {
	axios
		.post('http://localhost:8080/api/v1/category/saveCategory', objConfig)
		.then(response => {
			dispatch(setCategory(response.data.data))
			dispatch(axiosAllCategory())
		})
		.catch(error => console.log('error del servidor', error))
}
