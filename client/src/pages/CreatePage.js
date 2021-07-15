import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import useHttp from '../hooks/http.hook'
import useMessage from '../hooks/message.hook'

export default function CreatePage() {
	const history = useHistory()
	const msg = useMessage()
	const auth = useContext(AuthContext)
	const { loading, error, clearError, request } = useHttp()
	const [link, setLink] = useState('')

	const goHandler = useCallback(async () => {
		try {
			const data = await request(
				'/api/link/generate',
				'POST',
				{ to: link },
				{ Authorization: `Bearer ${auth.token}` }
			)

			history.push(`/detail/${data.link._id}`)
		} catch (e) {}
	}, [link, history, auth, request])

	const pressHandler = useCallback(
		(e) => {
			if (e.key !== 'Enter' || loading) return
			goHandler()
		},
		[loading, goHandler]
	)

	useEffect(() => {
		window.M.updateTextFields()
	}, [])

	useEffect(() => {
		msg(error)
		clearError()
	}, [error, clearError, msg])

	return (
		<>
			<div className="row" style={{ paddingTop: '40px' }}>
				<div className="col s8 offset-s">
					<div className="input-field">
						<input
							type="text"
							placeholder="Вставьте ссылку"
							id="linkInp"
							value={link}
							onChange={(e) => setLink(e.target.value)}
							onKeyPress={pressHandler}
						/>
						<label htmlFor="linkInp">Ссылка</label>
					</div>
					<button
						className="btn blue darken-1"
						disabled={loading}
						onClick={goHandler}
					>
						Создать
					</button>
				</div>
			</div>
		</>
	)
}
