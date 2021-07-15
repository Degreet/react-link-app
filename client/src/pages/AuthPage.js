import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import useHttp from '../hooks/http.hook'
import useMessage from '../hooks/message.hook'

export default function AuthPage() {
	const { loading, error, clearError, request } = useHttp()
	const auth = useContext(AuthContext)
	const msg = useMessage()

	const [form, setForm] = useState({
		email: '',
		password: '',
	})

	useEffect(() => {
		msg(error)
		clearError()
	}, [error, msg, clearError])

	useEffect(() => {
		window.M.updateTextFields()
	}, [])

	const changeHandler = (e) => {
		setForm({
			...form,
			[e.target.name]: e.target.value,
		})
	}

	const registerHandler = async () => {
		try {
			const data = await request('/api/auth/register', 'POST', { ...form })
			msg(data.message)
		} catch (e) {}
	}

	const loginHandler = async () => {
		try {
			const data = await request('/api/auth/login', 'POST', { ...form })
			auth.login(data.token, data.userId)
		} catch (e) {}
	}

	return (
		<>
			<div className="row">
				<div className="col s6 offset-s3">
					<h2>Сократи ссылку</h2>
					<div className="card blue darken-1">
						<div className="card-content white-text">
							<span className="card-title">Авторизация</span>
							<div>
								<div className="input-field">
									<input
										type="email"
										placeholder="Введите email"
										className="validate yellow-input"
										id="emailInp"
										name="email"
										value={form.email}
										onChange={changeHandler}
									/>
									<label htmlFor="emailInp">Email</label>
								</div>
								<div className="input-field">
									<input
										type="password"
										placeholder="Введите пароль"
										className="validate yellow-input"
										id="passwordInp"
										name="password"
										value={form.password}
										onChange={changeHandler}
									/>
									<label htmlFor="passwordInp">Пароль</label>
								</div>
							</div>
						</div>
						<div className="card-action">
							<button
								className="btn yellow darken-4 mr"
								disabled={loading}
								onClick={loginHandler}
							>
								Войти
							</button>
							<button
								className="btn grey lighten-1 black-text"
								onClick={registerHandler}
								disabled={loading}
							>
								Зарегистрироваться
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
