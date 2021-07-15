import React, { useCallback, useContext } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

export default function Navbar() {
	const history = useHistory()
	const auth = useContext(AuthContext)

	const logoutHandler = useCallback(
		(e) => {
			e.preventDefault()
			auth.logout()
			history.push('/')
		},
		[auth, history]
	)

	return (
		<nav>
			<div className="blue darken-1 nav-wrapper">
				<span className="brand-logo">Linker</span>
				<ul id="nav-mobile" className="right hide-on-med-and-down">
					<li>
						<NavLink to="/create">Создать</NavLink>
					</li>
					<li>
						<NavLink to="/links">Ссылки</NavLink>
					</li>
					<li>
						<a href="/" onClick={logoutHandler}>
							Выйти
						</a>
					</li>
				</ul>
			</div>
		</nav>
	)
}
