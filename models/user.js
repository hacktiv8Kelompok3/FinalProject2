'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require("../helpers/bcrypt")
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Photo);
      this.hasMany(models.Comment);
    }
  }
  User.init({
    full_name: DataTypes.STRING,
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg:"password is required"
        }
      }
    }, 
    profile_image_url: DataTypes.TEXT,
    age: DataTypes.INTEGER,
    phone_number: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: (user, opt) => {
        const hashedPass = hashPassword(user.password)
        user.password = hashedPass
      },
      beforeUpdate: (user, opt) => {
        const hashedPass = hashPassword(user.dataValues.password)
        user.dataValues.password = hashedPass
      }
    }
  });
  return User;
};