import { useState } from 'react'

const useAuth = _ => {
	const [isAuthenticated, setIsAuthenticated] = useState(false)

	const login = _ => setIsAuthenticated(true)

	const logOut = _ => setIsAuthenticated(false)

	return { isAuthenticated, login, logOut }
}

export default useAuth
