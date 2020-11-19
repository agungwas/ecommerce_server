const { User } = require('../models')
const JWT = require("../helpers/jwt")

module.exports = async (req, res, next) => {
  try {
    // console.log(req.originalUrl, 'isi request');
    const data = JWT.compare(req.headers.access_token)
    if(!data.email) throw { msg: "Wrong token", status: 400}
    else {
      const user = await User.findOne({ where: { email: data.email }})
      if(!user) throw { msg: "Wrong token", status: 400 }
      else if(req.originalUrl.includes('products') && user.role !== "admin") throw { msg: "User is not admin", status: 401 }
      else if(req.originalUrl.includes('carts') && user.role !== 'customer') throw { msg: 'You have login as customer', status: 401 }
      else {
        req.user = {
          email: data.email,
          UserId: data.id
        }
        next()
      }
    }
  } catch (error) {
    next(error)
  }
}