/*
* 笔记数据
* */

var AppDispatcher = require('../dispatcher/AppDispatcher'),
    EventEmitter = require('events').EventEmitter,
    AppConstants = require('../constants/NoteConstants'),
    NoteModel = require('../models/NoteModel'),
    assign = require('object-assign');

// 当前页面
var _view = AppConstants.LIST_VIEW;

// 当前要编辑的比较，内容空表示新建
var _curNote = new NoteModel();

// 笔记列表
var _noteList = [];


var NoteStore = assign({}, EventEmitter.prototype, {

  // 返回要显示的页面
  getView: function() {
    return _view;
  },

  // 返回要编辑的笔记
  getNote: function () {
    return _curNote;
  },

  // 获取笔记列表
  getNoteList: function() {
    return _noteList;
  },

  // 存储笔记列表
  setNoteList: function(noteList) {
    _noteList = noteList;
    this.emit(AppConstants.NOTE_LIST_UPDATE_EVENT);
  }

});


AppDispatcher.register(function(action) {

  switch (action.actionType) {

    // show a view
    case AppConstants.SHOW_VIEW:
      _view = action.view;
      NoteStore.emit(AppConstants.CHANGE_VIEW_EVENT);
      break;

    // 编辑或新建笔记
    case AppConstants.EDIT_NOTE:
      _curNote = action.note;
      NoteStore.emit(AppConstants.EDIT_NOTE_EVENT);
      break;
  }

});

module.exports = NoteStore;