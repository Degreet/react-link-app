const { Router } = require('express')
const router = Router()

const Link = require('../models/Link')

router.get('/:code', async (req, res) => {
	try {
		const { code } = req.params
		const link = await Link.findOne({ code })

		if (!link) {
			return res.status(404).json({
				message: 'Ссылка не найдена',
			})
		}

		link.clicks++
		await link.save()

		return res.redirect(link.to)
	} catch (e) {
		res.status(500).json({
			message: 'Что-то пошло не так. Попробуйте снова',
		})
	}
})

module.exports = router
