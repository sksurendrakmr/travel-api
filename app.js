const morgan = require('morgan')
const express = require('express')

const tourRouter = require('./routes/tourRoutes')

if (process.env.NODE_ENV === 'development') {
  morgan('dev')
}

const app = express()
app.use(express.json())

app.use('/api/v1/tours', tourRouter)

module.exports = app
