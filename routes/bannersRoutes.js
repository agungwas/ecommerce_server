const router = require('express').Router()
const BannersController = require('../controllers/bannersControllers')

router.get('/', BannersController.get)

router.post('/', BannersController.add)

module.exports = router