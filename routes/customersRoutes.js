const router = require('express').Router()
const Customer = require('../controllers/customerControllers')
const authentication = require('../middlewares/authentication')

router.use(authentication)

router.get('/', Customer.getCart)

router.post('/', Customer.cart)

router.patch('/', Customer.checkout)

router.delete('/', Customer.delCart)

module.exports = router