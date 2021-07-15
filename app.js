const express = require('express')
const mongoose = require('mongoose')
const path = require('path')

// setup .env
require('dotenv').config()

const port = process.env.PORT
const uri = process.env.MONGO_URI
const app = express()

app.use(express.json({ extended: true }))
app.use('/api/auth', require('./routes/auth.route'))
app.use('/api/link', require('./routes/links.route'))
app.use('/t', require('./routes/redirect.route'))

if (process.env.NODE_ENV === 'production') {
	app.use('/', express.static(path.join(__dirname, 'client', 'build')))

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
	})
}

// void нужен для того, чтобы не писать ;
void (async () => {
	try {
		await mongoose.connect(uri, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
		})

		app.listen(port, () => console.log('Started'))
	} catch (e) {
		console.error('Server error')
		console.error(e.message)
		process.exit(1)
	}
})()
