class ErrorResponse extends Error {
  constructor(message, statusCode) {
    super(message)
    this.statusCode = statusCode
    this.status = this.statusCode.toString().startsWith('4') ? 'Fail' : 'Error'
    this.isOperation = true //to check whether it is operational error or not
    //capture the stack trace
    Error.captureStackTrace(this, this.constructure)
  }
}

module.exports = ErrorResponse
