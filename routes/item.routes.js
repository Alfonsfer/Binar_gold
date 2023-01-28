const express = require('express')
const router = express.Router()
const {ItemController} = require('../controller/item.controller')

const itemController = new ItemController()

router.get('/',itemController.getItems)
router.post('/', itemController.createItem)
router.get('/:id', itemController.getItem)
router.patch('/:id', itemController.updateItem)
router.delete('/:id', itemController.deleteItem)



module.exports = router