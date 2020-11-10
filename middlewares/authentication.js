const { User } = require('../models')
const JWT = require("../helpers/jwt")

module.exports = async (req, res, next) => {
  try {
    const data = JWT.compare(req.headers.access_token)
    // console.log(data.email, "dari authentication");
    if(!data.email) throw { msg: "Wrong token", status: 400}
    else {
      const user = await User.findOne({ where: { email: data.email }})
      // console.log(user, "dari authentication");
      if(!user) throw { msg: "Wrong token", status: 400 }
      else if(user.role !== "admin") throw { msg: "User is not admin", status: 401}
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