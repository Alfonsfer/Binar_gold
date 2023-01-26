const { Model, DataTypes } = require("sequelize");
const sequelize = require('./sequelize')

class Item extends Model {
}

Item.init(
  {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'user_id'
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    price: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    stock: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
  },
  {
    sequelize: sequelize,
    timestamps: true,
    paranoid: true,
    underscored: true,
    deletedAt: 'deleted_at',
    updatedAt: 'updated_at',
    createdAt: 'created_at',
  },
)

module.exports = Item