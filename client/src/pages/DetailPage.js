import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import LinkCard from '../components/LinkCard'
import Loader from '../components/Loader'
import { AuthContext } from '../context/AuthContext'
import useHttp from '../hooks/http.hook'
import useMessage from '../hooks/message.hook'

export default function DetailPage() {
	const auth = useContext(AuthContext)
	const { loading, error, clearError, request } = useHttp()
	const msg = useMessage()
	const [link, setLink] = useState(null)
	const linkId = useParams().id

	const getLink = useCallback(async () => {
		try {
			const fetched = await request(`/api/link/${linkId}`, 'GET', null, {
				Authorization: `Bearer ${auth.token}`,
			})

			setLink(fetched)
		} catch (e) {}
	}, [setLink, linkId, auth, request])

	useEffect(() => {
		getLink()
	}, [getLink])

	useEffect(() => {
		msg(error)
		clearError()
	}, [error, clearError, msg])

	if (loading) {
		return <Loader />
	}

	return (
		<>
			<h1>О ссылке</h1>
			{!loading && link && <LinkCard link={link} />}
		</>
	)
}
