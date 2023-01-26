const User = require('./users.model')
const Item = require('./items.model')
const Order = require('./orders.model')
const OrderItem = require('./order-item.model')
const sequelize = require('./sequelize')

User.hasMany(Item, {
  as: 'item'
})

User.hasMany(Order, {
  as: 'order'
})

Item.belongsTo(User, {
  as: 'user',
  foreignKey: 'user_id',
})

Item.hasMany(OrderItem, {
  as: 'order-item'
})

Order.belongsTo(User, {
  as: 'user',
  foreignKey: 'user_id'
})

Order.hasMany(OrderItem, {
  as: 'order-item'
})

OrderItem.belongsTo(Order, {
  as: 'order',
  foreignKey: 'order_id'
})

OrderItem.belongsTo(Item, {
  as: 'item',
  foreignKey: 'item_id'
})

module.exports = {
  User,
  Item,
  Order,
  OrderItem,
  sequelize
}
