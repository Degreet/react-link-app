import { useCallback, useEffect, useState } from 'react'

export default function useAuth() {
	const [ready, setReady] = useState(false)
	const [token, setToken] = useState(null)
	const [userId, setUserId] = useState(null)

	const login = useCallback(
		(jwtToken, id) => {
			setToken(jwtToken)
			setUserId(id)
		},
		[setToken, setUserId]
	)

	const logout = useCallback(() => {
		setToken(null)
		setUserId(null)
	}, [setToken, setUserId])

	useEffect(() => {
		const token = localStorage.token
		const userId = localStorage.userId

		if (token) {
			login(token, userId)
		}

		setReady(true)
	}, [login])

	useEffect(() => {
		if (!token || !userId) return localStorage.clear()
		localStorage.token = token
		localStorage.userId = userId
	}, [token, userId])

	return { token, userId, ready, login, logout }
}
