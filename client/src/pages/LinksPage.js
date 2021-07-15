import React, { useCallback, useContext, useEffect, useState } from 'react'
import useHttp from '../hooks/http.hook'
import { AuthContext } from '../context/AuthContext'
import useMessage from '../hooks/message.hook'
import Loader from '../components/Loader'
import Links from '../components/Links'

export default function LinksPage() {
	const auth = useContext(AuthContext)
	const msg = useMessage()
	const { error, clearError, loading, request } = useHttp()
	const [links, setLinks] = useState([])

	const getLinks = useCallback(async () => {
		try {
			const data = await request('/api/link/', 'GET', null, {
				Authorization: `Bearer ${auth.token}`,
			})

			setLinks(data)
		} catch (e) {}
	}, [request, setLinks, auth])

	useEffect(() => {
		getLinks()
	}, [getLinks])

	useEffect(() => {
		msg(error)
		clearError()
	}, [error, clearError, msg])

	if (loading) {
		return <Loader />
	}

	return (
		<>
			<h1>Мои ссылки</h1>

			{!loading && <Links links={links} />}
		</>
	)
}
