const { Transaction, Product } = require('../models')

module.exports = class Controller {
  static async cart (req, res, next) {
    try {
      let { ProductId, amount } = req.body
      const { UserId } = req.user
      let existCart = await Transaction.findOne({ where: { UserId, ProductId }})
      if (existCart) {
        amount = +amount + +existCart.amount
      }
      const stockProduct = await Product.findByPk(ProductId)
      if (stockProduct.stock < amount) throw { msg: 'Not enough stock', status: 400 }
      const cart = await Transaction.create({ ProductId, amount, UserId })
      res.status(201).json({ cart })
    } catch (error) {
      next(error)
    }
  }

  static async checkout (req, res, next) {
    try {
      const { UserId } = req.user
      let updateStock = await Transaction.findAll({ where: { UserId, confirmed: false }, include: Product })
      if (updateStock.length === 0) throw { msg: 'There is nothing to checkout', status: 400 }
      updateStock = JSON.parse(JSON.stringify(updateStock, null, 2))

      let err = []
      updateStock.forEach(el => (el.amount > el.Product.stock) ? err.push(`Sorry '${el.Product.name}' stock only ${el.Product.stock} left`) : false)
      if (err.length > 0) throw { msg: err, status: 400 }

      let success = []
      for (const el of updateStock) {
        const stock = el.Product.stock - el.amount
        await Product.update({ stock }, { where: { id: el.ProductId }})
        success.push(el.Product.name.toString())
        await Transaction.update({ confirmed: true }, { where: { UserId, ProductId: el.ProductId }})
      }
      res.status(201).json({ msg: success.join(', ') + ' checkouted successfully'})
    } catch (error) {
      next(error)
    }
  }

  static async delCart (req, res, next) {
    try {
      const { UserId } = req.user
      const ProductId = +req.body.ProductId
      const delProduct = Product.findOne({ where: { id: ProductId }})
      const deleted = await Transaction.destroy({ where: { UserId, ProductId, confirmed: false }, returning: true })
      if (!deleted) throw { msg: `Product '${delProduct.name}' is not in cart`, status: 400 }
      res.status(200).json({ msg: `${delProduct.name} deleted from cart successfully`})
    } catch (error) {
      next(error)
    }
  }

  static async getCart (req, res, next) {
    try {
      const { UserId } = req.user
      const data = await Transaction.findAll({ where: { UserId }})
      res.status(200).json({ carts: data })
    } catch (error) {
      next(error)
    }
  }
}