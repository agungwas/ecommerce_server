'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transaction.belongsTo(models.Product)
    }
  };
  Transaction.init({
    UserId: DataTypes.INTEGER,
    ProductId: DataTypes.INTEGER,
    amount: DataTypes.INTEGER,
    confirmed: DataTypes.BOOLEAN
  }, {
    sequelize,
    hooks: {
      beforeCreate (data, opt) {
        data.confirmed = false
      }
    },
    modelName: 'Transaction',
  });
  return Transaction;
};