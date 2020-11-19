module.exports = (err, req, res, next) => {
  console.log(err, "masuk ke error handler\r\n\r\n\r\n")
  if(err.name === "SequelizeValidationError") {
    err = err.errors.map(datum => {
      return datum.message
    })
    err = {msg: err, status: 400}
  }
  if(err.name === "SequelizeUniqueConstraintError") {
    err = 'User already registered'
    err = {msg: err, status: 400}
  }
  if(err.msg) {
    const { msg, status } = err
    if(typeof(msg) === "object") {
    }
    res.status(status).json({ msg })
  } else {
    msg = "Internal server error"
    res.status(500).json({ msg })
  }
}