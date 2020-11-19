const { User } = require('../models')
const Bcrypt = require('../helpers/bcrypt')
const JWT = require('../helpers/jwt')

module.exports = class UserController {
  static async login(req, res, next) {
    try {
      const { email, password } = req.body
      const data = await User.findOne({ where: { email }})
      if(!data) throw { msg: "Email/Password wrong", status: 400 }
      else {
        const valid = Bcrypt.compare(password, data.password)
        if(!valid) throw { msg: "Email/Password wrong", status: 400 }
        else {
          const access_token = JWT.create({ email: data.email, id: data.id, role: data.role })
          res.status(200).json({ access_token })
        }
      }
    } catch (error) {
      next(error)
    }
  }

  static async register (req, res, next) {
    try {
      const { email, password } = req.body
      const user = await User.create({ email, password })
      const access_token = JWT.create({ email: user.email, id: user.id, role: user.role })
      res.status(201).json({ access_token })
    } catch (err) {
      next(err)
    }
  }
}