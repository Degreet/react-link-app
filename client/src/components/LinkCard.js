import React from 'react'

export default function LinkCard({ link }) {
	return (
		<div className="link-card">
			<p>
				Ссылка:{' '}
				<a href={link.from} target="_blank" rel="noopener noreferrer">
					{link.from}
				</a>
			</p>
			<p>
				Куда ведёт:{' '}
				<a href={link.to} target="_blank" rel="noopener noreferrer">
					{link.to}
				</a>
			</p>
			<p>
				Дата создания ссылки: <b>{new Date(link.date).toLocaleDateString()}</b>
			</p>
			<p>
				Кол-во переходов: <b>{link.clicks}</b>
			</p>
		</div>
	)
}
