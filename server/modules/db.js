/*
* 数据库初始化
* */

var UserModel = require('../model/User');
    NoteModel = require('../model/Note');

module.exports = {

  init: function() {
    return sequelize.sync();
  },

  UserModel: UserModel,
  NoteModel: NoteModel
};