/*
* 用户模型
* */

var Sequelize = require('sequelize');

var UserModel = sequelize.define('user', {
  id: {
    type: Sequelize.STRING,
    unique: true,
    primaryKey: true,
    allowNull: false
  }
});

module.exports = UserModel;