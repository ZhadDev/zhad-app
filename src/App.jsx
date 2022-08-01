import { BrowserRouter, Routes, Route } from 'react-router-dom'

/* PAGINAS A RUTEAR */
import NotFoundPage from './EcomerceZhad/pages/notFoundPage/NotFoundPage'
import Home from './EcomerceZhad/pages/home/Home'

// import useAuth from './component/hooks/useAuth'

// eslint-disable-next-line react/prop-types
/* const AuthRoute = ({ children }) => {
	const { isAuthenticated } = useAuth()
	if (isAuthenticated) {
		return <Navigate to='*' />
	}
	return children
} */

const App = _ => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='*' element={<NotFoundPage />} />
			</Routes>
		</BrowserRouter>
	)
}

export default App
