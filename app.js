if(process.env.NODE_ENV !== 'production') require('dotenv').config()
const cors = require('cors')
const express = require('express')
const app = express()
const routes = require('./routes')
const PORT = Number(process.env.PORT)
const errorHandler = require('./middlewares/error')

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(routes)

app.use(errorHandler)

// app.listen(PORT, _=> console.log('Listening on port ', PORT))

module.exports = app