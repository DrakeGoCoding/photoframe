const dotenv = require('dotenv')
dotenv.config()

const express = require('express')
const app = express()
const cors = require('cors')
const connection = require('./db')

const PORT = process.env.PORT || 8080

const db = async () => {
    await connection()
}
db()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/auth", require("./routes/authRoute"))

app.use((error, req, res, next) => {
    res.status(500).json({ error: error.message })
})

app.listen(PORT, () => { console.log('Listening to PORT:' + PORT) })

module.exports = app