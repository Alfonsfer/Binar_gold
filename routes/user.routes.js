const express = require('express')
const router = express.Router()
const { userController } = require('../controller/user.controller')


//register routes
router.post('/register',userController.register)

//login routes
router.post('/login', userController.login)

module.exports = router