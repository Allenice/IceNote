/*
* 笔记相关操作
* */

var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/NoteConstants');

var AppAction = {

  /**
   * 显示某一界面
   * @param {string} view
   */
  showView: function(view) {
    AppDispatcher.dispatch({
      actionType: AppConstants.SHOW_VIEW,
      view: view
    });
  },

  /**
   * 新建或编辑笔记
   * @param note
   */
  editNote: function(note) {
    AppDispatcher.dispatch({
      actionType: AppConstants.EDIT_NOTE,
      note: note
    });
  }

};


module.exports = AppAction;