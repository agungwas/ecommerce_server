const bcrypt = require('bcryptjs')

module.exports = class Bcrypt {
  static create(password) {
    const salt = bcrypt.genSaltSync(Number(process.env.SALT))
    return bcrypt.hashSync(password, salt)
    
  }
  static compare(password, hashed) {
    return bcrypt.compareSync(password, hashed)
  }
}