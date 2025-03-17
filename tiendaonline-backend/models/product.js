'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file llamará a este método automáticamente.
     */
    static associate(models) {
      Product.hasMany(models.OrderDetail, { foreignKey: 'productId' });
    }
  }

  Product.init(
    {
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true, // No permite cadenas vacías
        },
      },
      descripcion: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      precio: {
        type: DataTypes.DECIMAL(10, 2), // Hasta 99999999.99
        allowNull: false,
        validate: {
          isDecimal: true, // Asegura que sea decimal
          min: 0, // No permite valores negativos
        },
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: true, // Asegura que sea un número entero
          min: 0, // No permite valores negativos
        },
      },
      imagen: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Product',
    }
  );

  return Product;
};
