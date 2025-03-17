'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * El archivo `models/index` llamará automáticamente a este método.
     */
    static associate(models) {
      User.hasMany(models.Order, { foreignKey: 'userId', onDelete: 'CASCADE' });
      User.hasMany(models.Cart, { foreignKey: 'userId', onDelete: 'CASCADE' });

    }
  }

  User.init(
    {
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true, // No permite valores vacíos
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true, // Valida formato de email
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [6, 100], // Debe tener mínimo 6 caracteres
        },
      },
      rol: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: [['admin', 'cliente']], // Solo permite estos valores
        },
      },
    },
    {
      sequelize,
      modelName: 'User',
    }
  );

  return User;
};
