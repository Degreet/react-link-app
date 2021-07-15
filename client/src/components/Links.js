import React from 'react'

export default function Links({ links }) {
	if (!links || !links.length)
		return <p className="fz20">У Вас пока нет ссылок</p>

	return (
		<ul>
			{links.map((link) => (
				<li key={link._id}>
					<a className="fz20" href={`/detail/${link._id}`}>
						{link.to}
					</a>
				</li>
			))}
		</ul>
	)
}
