'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * Este método no es parte del ciclo de vida de Sequelize.
     * El archivo `models/index` llamará a este método automáticamente.
     */
    static associate(models) {
      Order.belongsTo(models.User, { foreignKey: 'userId' });
      Order.hasMany(models.OrderDetail, { foreignKey: 'orderId' });
    }
  }

  Order.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users', // Debe coincidir con el nombre de la tabla en la base de datos
          key: 'id',
        },
        validate: {
          isInt: true, // Asegura que sea un número entero
        },
      },
      total: {
        type: DataTypes.DECIMAL(10, 2), // Formato decimal con 2 decimales
        allowNull: false,
        validate: {
          isDecimal: true, // Verifica que sea un número decimal
          min: 0, // No permite valores negativos
        },
      },
      estado: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: [['pendiente', 'pagado', 'cancelado']], // Solo permite estos valores
        },
      },
    },
    {
      sequelize,
      modelName: 'Order',
    }
  );

  return Order;
};
