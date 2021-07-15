const { Router } = require('express')
const router = Router()

const shortid = require('shortid')
const auth = require('../middleware/auth.middleware')
const Link = require('../models/Link')

router.post('/generate', auth, async (req, res) => {
	try {
		const baseUrl = process.env.BASE_URL
		const { to } = req.body
		const code = shortid.generate()

		const existing = await Link.findOne({ to })

		if (existing) {
			return res.json({ link: existing })
		}

		const from = `${baseUrl}/t/${code}`

		const link = new Link({ from, to, code, owner: req.user.userId })
		await link.save()

		res.status(201).json({ link })
	} catch (e) {
		res.status(500).json({
			message: 'Что-то пошло не так. Попробуйте снова',
		})
	}
})

router.get('/', auth, async (req, res) => {
	try {
		const links = await Link.find({ owner: req.user.userId })
		res.json(links)
	} catch (e) {
		res.status(500).json({
			message: 'Что-то пошло не так. Попробуйте снова',
		})
	}
})

router.get('/:id', async (req, res) => {
	try {
		const link = await Link.findById(req.params.id)
		res.json(link)
	} catch (e) {
		res.status(500).json({
			message: 'Что-то пошло не так. Попробуйте снова',
		})
	}
})

module.exports = router
