/*
* 应用启动程序
* */


var React = require('react/addons'),
    NoteApp = require('./components/NoteApp.react'),
    AppConstants = require('./constants/NoteConstants'),
    NoteStore = require('./stores/NoteStore'),
    utils = require('./common/utils'),
    NoteModel = require('./models/NoteModel'),
    ajax = require('./common/ajax')
    ;

var app = {

  _init: function() {
    var _this = this;

    // 启用触摸事件
    React.initializeTouchEvents(true);

    // prevent page dragging
    document.body.addEventListener('touchmove', function(e) {
      e.preventDefault();
    });

    // 检查用户
    var uid = utils.getUserId();
    
    if(!uid) {
      utils.initUserId(function() {
        _this._loadNoteList();
      });
    } else {
      this._loadNoteList();
    };

  },
  
  _loadNoteList: function() {

    NoteModel.fetch(function(notes) {
      NoteStore.setNoteList(notes);
    }, function(data) {
      alert(data.message);
    });

  },

  run: function() {
    app._init();
    React.render(
      <NoteApp />,
      document.getElementById('app')
    );
  }
};

app.run();


