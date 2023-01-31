const express = require('express')
const router = express.Router()
// const authUser = require('../middleware/authentication')
const {ItemController} = require('../controller/item.controller')

const itemController = new ItemController()

router.get('/',itemController.getItems)

router.post('/', itemController.createItem)
// router.post('/', authUser, itemController.createItem)


router.get('/:id', itemController.getItem)


router.patch('/:id', itemController.updateItem)
// router.patch('/:id', authUser, itemController.updateItem)


router.delete('/:id', itemController.deleteItem)
// router.delete('/:id', authUser, itemController.deleteItem)



module.exports = router