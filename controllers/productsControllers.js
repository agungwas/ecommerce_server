const { Product } = require('../models')

module.exports = class ProductController {
  static view(req, res, next) {
    Product.findAll()
    .then(data => {
      res.status(200).json(data)
    })
    .catch(error => {
      next(error)
    })
  }
  
  static add(req, res, next) {
    const { name, image_url, stock, price, category } = req.body
    const { UserId } = req.user
    Product.create({ name, image_url, stock, price, category, UserId })
      .then(data => {
        res.status(201).json({ msg: `Success add ${name}`})
      })
      .catch(err => {
        next(err)
      })
  }

  static delete(req, res, next) {
    const { UserId, id, name } = req.product
    Product.destroy({ where: { UserId, id }, returning: true })
      .then(destroyed => {
        res.status(201).json({ msg: `Product '${name}' deleted successfully`})
      })
      .catch(err => {
        console.log(err, 'error dari controller');
      })
  }

  static edit(req, res, next) {
    const { UserId, id } = req.product
    const { name, image_url, stock, price, category } = req.body
    Product.update({ name, image_url, stock, price, category }, { where: { UserId, id }})
      .then(data => {
        res.status(201).json({ msg: `Product '${req.product.name}' updated successfully`})
      })
      .catch(err => {
        next(err)
      })
  }
}