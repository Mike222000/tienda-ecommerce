'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class OrderDetail extends Model {
    /**
     * Helper method for defining associations.
     * Este método no es parte del ciclo de vida de Sequelize.
     * El archivo `models/index` llamará a este método automáticamente.
     */
    static associate(models) {
      OrderDetail.belongsTo(models.Order, { foreignKey: 'orderId' });
      OrderDetail.belongsTo(models.Product, { foreignKey: 'productId' });
    }
  }

  OrderDetail.init(
    {
      orderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Orders', // Debe coincidir con el nombre de la tabla en la base de datos
          key: 'id',
        },
        validate: {
          isInt: true, // Asegura que sea un número entero
        },
      },
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Products', // Debe coincidir con el nombre de la tabla
          key: 'id',
        },
        validate: {
          isInt: true, // Asegura que sea un número entero
        },
      },
      cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: true, // Asegura que sea un número entero
          min: 1, // No permite valores menores a 1
        },
      },
      precio: {
        type: DataTypes.DECIMAL(10, 2), // Formato decimal con 2 decimales
        allowNull: false,
        validate: {
          isDecimal: true, // Verifica que sea un número decimal
          min: 0, // No permite valores negativos
        },
      },
    },
    {
      sequelize,
      modelName: 'OrderDetail',
    }
  );

  return OrderDetail;
};
