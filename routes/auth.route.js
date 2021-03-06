const { Router } = require('express')
const router = Router()

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { check, validationResult } = require('express-validator')

const User = require('../models/User')

router.post(
	'/register',
	[
		check('email', 'Некорректный email').isEmail(),
		check('password', 'Пароль должен содержать от 6 до 32 символов').isLength({
			min: 6,
			max: 32,
		}),
	],
	async (req, res) => {
		try {
			const errors = validationResult(req)

			if (!errors.isEmpty()) {
				return res.status(400).json({
					errors: errors.array(),
					message: 'Некорректные данные',
				})
			}

			const { email, password } = req.body
			const candidate = await User.findOne({ email })

			if (candidate) {
				return res.status(400).json({
					message: 'Такой пользователь уже существует',
				})
			}

			const hashedPassword = await bcrypt.hash(password, 12)
			const user = new User({ email, password: hashedPassword })
			await user.save()

			res.status(200).json({
				message: 'Пользователь создан',
			})
		} catch (e) {
			res.status(500).json({
				message: 'Что-то пошло не так. Попробуйте снова',
			})
		}
	}
)

router.post(
	'/login',
	[
		check('email', 'Введите корректный email').normalizeEmail().isEmail(),
		check('password', 'Введите пароль').exists(),
	],
	async (req, res) => {
		try {
			const errors = validationResult(req)

			if (!errors.isEmpty()) {
				return res.status(400).json({
					errors: errors.array(),
					message: 'Некорректные данные',
				})
			}

			const { email, password } = req.body
			const user = await User.findOne({ email })

			if (!user) {
				return res.status(400).json({
					message: 'Пользователь не найден',
				})
			}

			const isMatch = await bcrypt.compare(password, user.password)

			if (!isMatch) {
				return res.status(400).json({
					message: 'Неверный пароль',
				})
			}

			const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
				expiresIn: '24h',
			})

			res.json({ token, userId: user.id })
		} catch (e) {
			res.status(500).json({
				message: 'Что-то пошло не так. Попробуйте снова',
			})
		}
	}
)

module.exports = router
