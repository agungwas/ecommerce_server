const router = require('express').Router()
const UserController = require('../controllers/usersControllers')

router.post('/login', UserController.login)

module.exports = router