const { Banner } = require('../models')

module.exports = class Controllers {
  static async get (req, res, next) {
    try {
      const data = await Banner.findAll()
      res.status(200).json({ banners: data })
    } catch (error) {
      next(error)
    }
  }

  static async add (req, res, next) {

  }

  static async toggle (req, res, next) {

  }

  static async del (req, res, next) {

  }
}