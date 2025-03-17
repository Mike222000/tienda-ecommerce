const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    static associate(models) {
      models.User.hasMany(Cart, { foreignKey: 'userId' });
      models.Product.hasMany(Cart, { foreignKey: 'productId' });
      Cart.belongsTo(models.User, { foreignKey: 'userId' });
      Cart.belongsTo(models.Product, { foreignKey: 'productId' });
    }
  }

  Cart.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
    },
    {
      sequelize,
      modelName: 'Cart',
    }
  );

  return Cart;
};
