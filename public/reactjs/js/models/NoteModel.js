/*
* NoteModel
* */

var ajax = require('../common/ajax'),
    utils = require('../common/utils');

var url = '/api/note/';

function NoteModel(note) {

  utils.extend(this, {
    id: 0,
    uid: utils.getUserId(),
    title: '',
    content: ''
  }, note);

}

utils.extend(NoteModel.prototype, {

  save: function(cb, errorCallback) {
    var _this = this,
        postUrl = url,
        method =  'post',
        data = this.getJson(),
        isNew = true;

    // 如果有 id，表示更新
    if(this.id) {
      postUrl += this.id;
      method = 'put';
      isNew = false;
    }

    delete data.id;

    if(data.title === '' || data.content === '' || data.uid === '') {
      errorCallback && errorCallback({message: '标题或内容不能为空'});
      return;
    }

    ajax({
      url: postUrl,
      method: method,
      data: data,
      success: function(note) {
        if(isNew) {
          _this.id = note.id;
        }
        cb && cb.call(_this, _this, isNew);
      },
      error: function(json) {
        errorCallback && errorCallback(json);
      }
    })
  },

  destroy: function(cb, errorCallback) {
    var _this = this;

    if(this.id) {
      ajax({
        url: url + this.id,
        method: 'delete',
        success: function() {
          cb && cb.call(_this);
        },
        error: function(data) {
          errorCallback && errorCallback(data);
        }
      });
    }
  },

  getJson: function() {
    return {
      id: this.id,
      uid: this.uid,
      title: this.title,
      content: this.content
    }
  }
});


NoteModel.fetch = function(cb, errorCallback) {
  ajax({
    url: url,
    data: {
      uid: utils.getUserId()
    },
    success: function(notes) {
      notes = notes.map(function(note) {
        return new NoteModel(note);
      });
      cb && cb(notes);
    },
    error: function(data) {
      errorCallback && errorCallback(data);
    }
  })
}

module.exports = NoteModel;