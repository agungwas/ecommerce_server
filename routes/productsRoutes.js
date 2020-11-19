const router = require('express').Router()
const ProductController = require('../controllers/productsControllers')
const authentication = require('../middlewares/authentication')
const author = require('../middlewares/author')

router.get("/", ProductController.view)

router.use(authentication)

router.post('/', ProductController.add)

router.delete('/:id', author, ProductController.delete)

router.patch('/:id', author, ProductController.edit)

module.exports = router