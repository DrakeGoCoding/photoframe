const dotenv = require('dotenv')
dotenv.config()
const PORT = process.env.PORT || 8080

const express = require('express')
const app = express()
const cors = require('cors')
const connection = require('./db/db')
const cookieParser = require('cookie-parser')

const db = async () => {
	await connection()
}

const authMiddleware = require('./middleware/authMiddleware')
const authRouter = require('./routes/authRoute')
const photoRouter = require('./routes/photoRoute')

db()

app.use(cors())
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: true }))
app.use(cookieParser())

app.use("/auth", authRouter)
app.use("/photo", authMiddleware.authenticateJWT, photoRouter)

app.use((error, req, res, next) => {
	res.status(500).json({ error: error.message })
})

app.listen(PORT, () => { console.log('Listening to PORT:' + PORT) })

module.exports = app