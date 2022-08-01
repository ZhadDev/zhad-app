import { configureStore } from '@reduxjs/toolkit'
import users from './slice/users'
import products from './slice/products'
import categories from './slice/category'
import addCarShop from './slice/carShop'

export const store = configureStore({
	reducer: {
		users,
		products,
		categories,
		addCarShop,
	},
})
