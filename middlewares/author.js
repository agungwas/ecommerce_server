const { Product } = require('../models')

module.exports = async (req, res, next) => {
  try {
    const id = Number(req.params.id)
    const { UserId } = req.user
    const product = await Product.findOne({ where: { id }})
    console.log(id, UserId, product);
    if(product.UserId !== UserId) throw { msg: "User not authorized", status: 401}
    req.product = { id, UserId, name: product.name }
    next()
  } catch (error) {
    next(error)
  }
}
