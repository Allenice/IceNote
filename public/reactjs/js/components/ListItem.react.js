/*
* 笔记列表项
* */

var React = require('react'),
    NoteAction = require('../actions/NoteAction'),
    NoteStore = require('../stores/NoteStore'),
    AppConstants = require('../constants/NoteConstants');


var ListItem = React.createClass({

  _startTouch: null,

  listItem: null,

  _onItemClick: function() {
    NoteStore.emit(AppConstants.VIEW_NOTE_EVENT, this.props.note);
    NoteAction.showView(AppConstants.CONTENT_VIEW);
  },

  _onDeleteBtnClick: function(e) {
    var _this = this;
    var note = this.props.note;

    if(confirm('是否删除笔记：' + note.title)) {
      _this._translateX(0);
      note.destroy(function(data) {
        var noteList = NoteStore.getNoteList(),
          nl;

        nl = noteList.filter(function(item) {
          return item.id != note.id;
        });
        NoteStore.setNoteList(nl);
      }, function(data) {
        alert(data.message);
      });
    }
  },

  _onTouchStart: function(event) {
    this._startTouch = {
      pageX: event.targetTouches[0].pageX
    };
    this.listItem = React.findDOMNode(this.refs.listItem);
    this.delta = 0;
  },
  
  _onTouchEnd: function(event) {
    var _this = this;

    if(this.delta < -40) {
      this._translateX(-80);

      setTimeout(function() {
        _this._translateX(0);
      }, 3000);
    } else {
      this._translateX(0);
    }

    this._startTouch = null;
    this.delta = 0;
  },
  
  _onTouchMove: function(event) {
    if(this._startTouch) {
      var curTouch = event.targetTouches[0];
      var dis = this.delta =  curTouch.pageX - this._startTouch.pageX;
      if(dis < 0 && dis >= -80) {
        this._translateX(dis);
      }
    }
  },

  _translateX: function(value) {
    //if(value === 0) {
    //  this.listItem.style.transition = '0.3s';
    //} else {
    //  this.listItem.style.transition = '0s';
    //}
    this.listItem.style.webkitTransform = 'translateX('+ value +'px)';
    this.listItem.style.transform = 'translateX('+ value +'px)';
  },

  render: function () {
    return (
      <li>
        <a className="link" href="javascript:void(0);" ref="listItem"
           onClick={this._onItemClick}
           onTouchStart={this._onTouchStart}
           onTouchEnd={this._onTouchEnd}
           onTouchMove={this._onTouchMove}
          >{this.props.note.title}</a>
        <a href="javascript:void(0);" className="action" onClick={this._onDeleteBtnClick} >删除</a>
      </li>
    );
  }

});

module.exports = ListItem;