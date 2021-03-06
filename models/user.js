'use strict';
const {
  Model
} = require('sequelize');
const JWT = require('../helpers/jwt')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsToMany(models.Product, { through: models.Transaction })
    }
  };
  User.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
    sequelize,
    hooks: {
      beforeCreate (data, opt) {
        if (data.role !== 'admin') {
          data.role = "customer"
        }
        data.password = JWT.create(data.password)
      }
    },
    modelName: 'User',
  });
  return User;
};