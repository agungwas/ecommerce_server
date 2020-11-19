'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsToMany(models.User, { through: models.Transaction })
      Product.hasMany(models.Transaction)
    }
  };
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Name is required"
        },
        notEmpty: {
          args: true,
          msg: "Name is required"
        }
      }
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Category is required"
        },
        notEmpty: {
          args: true,
          msg: "Category is required"
        }
      }
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Image is required"
        },
        notEmpty: {
          args: true,
          msg: "Image is required"
        },
        isUrl: {
          args: true,
          msg: "Image url must be valid url"
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Price is required"
        },
        notEmpty: {
          args: true,
          msg: "Price is required"
        },
        min: {
          args: [1],
          msg: "Price cannot below 1"
        },
        isInt: {
          args: true,
          msg: "Price must be number"
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Stock is required"
        },
        notEmpty: {
          args: true,
          msg: "Stock is required"
        },
        min: {
          args: [0],
          msg: "Stock cannot below 0"
        },
        isInt: {
          args: true,
          msg: "Stock must be number"
        }
      }
    },
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};