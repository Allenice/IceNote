/*
 * 笔记模型
 * */

var Sequelize = require('sequelize'),
    UserModel = require('./User');

var UserModel = sequelize.define('note', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  uid: {
    type: Sequelize.STRING,
    allowNull: false,
    reference: {
      model: UserModel,
      key: 'id'
    }
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: [1, 1000]
    }
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false,

    validate: {
      len: [1, 100000]
    }
  }
});

module.exports = UserModel;