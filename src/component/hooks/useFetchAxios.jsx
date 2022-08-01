import { useState, useEffect } from 'react'

export const useFetchAxios = () => {
	const [response, setResponse] = useState([])
	const [error, setError] = useState('')
	const [loading, setLoading] = useState(false)
	const [controller, setController] = useState()

	const axiosFetch = async configOjb => {
		const { axiosInstance, method, url, requestConfig = {} } = configOjb
		// eslint-disable-next-line no-debugger
		try {
			setLoading(true)
			const ctrl = new AbortController()
			setController(ctrl)
			const res = await axiosInstance[method.toLowerCase()](url, {
				...requestConfig,
				signal: ctrl.signal,
			})
			console.log(res)
			setResponse(res?.data?.data)
		} catch (err) {
			console.log(err.message)
			setError(err.message)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		//	console.log(controller)

		// useEffect cleanup function.
		return () => controller && controller.abort()
	}, [controller])

	return [response, error, loading, axiosFetch]
}

export default useFetchAxios
