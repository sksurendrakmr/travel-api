const morgan = require('morgan')
const express = require('express')

const tourRouter = require('./routes/tourRoutes')
const ErrorResponse = require('./utils/errorResponse')
const errorHandler = require('./controllers/errorController')
const app = express()
app.use(express.json())

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use('/api/v1/tours', tourRouter)

app.all('*', (req, res, next) => {
  /*
  const err = new Error(`Can't find ${req.originalUrl} on this server`)
  err.statusCode = 404
  err.status = 'Fail'
  next(err)
  */
  //whenever next() recieve an arguments no matter what
  //it is, express automatically know there was an error
  // and then it will skip all the middleware in the
  //middleware stack and sent the error we passed in to
  //the global error handling middleware

  next(new ErrorResponse(`Can't find ${req.originalUrl} on this server`, 404))
})

app.use(errorHandler)

module.exports = app
