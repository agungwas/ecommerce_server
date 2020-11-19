const router = require('express').Router()
const usersRouter = require('./usersRoutes')
const productsRouter = require('./productsRoutes')
const customersRouter = require('./customersRoutes')
const bannersRouter = require('./bannersRoutes')


router.get("/", (req, res) => res.status(200).json({ msg: 'Welcome to E-Commerce API'}))

router.use(usersRouter)

router.use('/banners', bannersRouter)

router.use('/transactions', customersRouter)

router.use('/products', productsRouter)

module.exports = router