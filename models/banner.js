'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Banner extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Banner.init({
    url: DataTypes.STRING,
    shown: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Banner',
  });
  return Banner;
};