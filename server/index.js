const express = require('express')
const app = express()
const port = 1371

const dotenv = require('dotenv')
const envConfig = dotenv.config()
if (envConfig.error) {
    throw envConfig.error
}

const mongoose = require('mongoose')
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.listen(port, () => { console.log('Server started on http://localhost:' + port) })

module.exports = app