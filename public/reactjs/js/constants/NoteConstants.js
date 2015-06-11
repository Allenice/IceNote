/*
*
* 笔记相关常量
* */

var keyMirror = require('keymirror');

module.exports = keyMirror({

  // 用户 id 存储的 key
  ICE_NOTE_USER_KEY: null,

  // view 相关
  LIST_VIEW: null,
  EDIT_VIEW: null,
  CONTENT_VIEW: null,
  SHOW_VIEW: null,

  // 新建或编辑笔记
  EDIT_NOTE: null,

  // 笔记列表更新事件
  NOTE_LIST_UPDATE_EVENT: null,

  // 新建或编辑笔记事件
  EDIT_NOTE_EVENT: null,

  // 查看笔记事件
  VIEW_NOTE_EVENT: null,

  // 页面切换事件
  CHANGE_VIEW_EVENT: null

});