const dotenv = require('dotenv')
const envConfig = dotenv.config()

const express = require('express')
const app = express()
const cors = require('cors')
const connection = require('./db')

const port = 8080

const db = async () => {
    await connection()
}
db()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/auth", require("./routes/authRoute"));

app.use((error, req, res, next) => {
    res.status(500).json({ error: error.message })
})

app.listen(port, () => { console.log('Listening to port:' + port) })

module.exports = app