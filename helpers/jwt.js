const jwt = require('jsonwebtoken')

module.exports = class JWT {
  static create(payload) {
    return jwt.sign(payload, process.env.SECRET)
  }
  static compare(token) {
    return jwt.verify(token, process.env.SECRET)
  }
}