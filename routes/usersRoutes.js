const router = require('express').Router()
const UserController = require('../controllers/usersControllers')

router.post('/login', UserController.login)

router.post('/register', UserController.register)

module.exports = router