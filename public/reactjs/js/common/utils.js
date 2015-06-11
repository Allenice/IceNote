/*
*
* 工具方法
* */

var AppConstants = require('../constants/NoteConstants'),
    ajax = require('./ajax');

var utils = {

  // 生成唯一 id
  uuid: (function() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return function() {
      return s4() + s4() + '' + s4() + '' + s4() + '' +
        s4() + '' + s4() + s4() + s4();
    };
  })(),

  extend: function (target/*,source...*/) {
    var length = arguments.length;

    if(length > 1) {
      for(var i = 1; i < length; i++) {
        var source = arguments[i];
        for(var key in source) {
          target[key] = source[key];
        }
      }
    }
    return target;
  },

  getUserId: function() {
    return window.localStorage.getItem(AppConstants.ICE_NOTE_USER_KEY);
  },

  initUserId: function() {
    var uid = this.uuid();

    ajax({
      url: '/api/user/',
      method: 'post',
      data: {
        id: uid
      },
      success: function(note) {
        console.log(note);
        window.localStorage.setItem(AppConstants.ICE_NOTE_USER_KEY, uid);
      },
      error: function () {
        alert('创建用户失败');
      }
    });
  }
}

module.exports = utils;