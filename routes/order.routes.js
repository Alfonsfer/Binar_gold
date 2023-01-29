const express = require('express')
const router = express.Router()
const {OrderController} = require('../controller/order.controller')

const orderController = new OrderController

router.get('/', orderController.getOrders)



module.exports = router