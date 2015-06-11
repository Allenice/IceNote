/*
 * 编辑页面
 * */

var React = require('react'),
    NoteAction = require('../actions/NoteAction'),
    NoteStore = require('../stores/NoteStore'),
    AppConstants = require('../constants/NoteConstants'),
    EditBox = require('./EditBox'),
    ajax = require('../common/ajax');


function getState() {
  var note = NoteStore.getNote();
  var isNew = note.id <= 0;
  return {
    title: note.title,
    content: note.content,
    isNew: isNew
  };
}


var EditView = React.createClass({

  getInitialState: function() {
    return getState();
  },

  /**
   * 返回按钮点击
   * @param {object} e
   * @private
   */
  _onBackBtnClick: function(e) {
    NoteAction.showView(AppConstants.LIST_VIEW);
  },

  /**
   * 完成按钮点击
   * @param {object} e
   * @private
   */
  _onFinishBtnClick: function(e) {
    var note = NoteStore.getNote();
    note.title = this.state.title;
    note.content = this.state.content;

    note.save(function(n, isNew) {
      if(isNew) {
        var notes = NoteStore.getNoteList();
        notes.unshift(n);
        NoteStore.setNoteList(notes);
      }
      NoteAction.showView(AppConstants.LIST_VIEW);
    }, function(data) {
      alert(data.message);
    });
  },

  /**
   *
   * @param e
   * @private
   */
  _onEditTitle: function(e) {
    this.setState({
      title: e.target.value
    });
  },
  
  _onEditContent: function(e) {
    this.setState({
      content: e.target.value
    });
  },

  _onViewShow: function(e) {
    this.setState(getState());
  },

  componentDidMount: function() {
    NoteStore.on(AppConstants.EDIT_NOTE_EVENT, this._onViewShow);
  },

  componentWillUnmount: function () {
    NoteStore.off(AppConstants.EDIT_NOTE_EVENT, this._onViewShow);
  },

  /**
   *
   * @returns {XML}
   */
  render: function () {
    var classes = 'page page-edit ';
    var title = this.state.isNew ? '新建' : '编辑';
    if(this.props.className) classes+= this.props.className;

    return (
      <div className={classes}>
        <header>
          <a href="javascript:void(0);" onClick={this._onBackBtnClick} ><i className="fa fa-arrow-left"></i></a>
          <h1>{title}</h1>
          <a className="pull-right" href="javascript:void(0);" onClick={this._onFinishBtnClick}>完成</a>
        </header>
        <div className="content line-bg">
          <div><input type="text" placeholder="Title:" value={this.state.title} onChange={this._onEditTitle} /></div>
          <EditBox html={this.state.content} onChange={this._onEditContent} >
          </EditBox>
        </div>
      </div>
    );
  }
});


module.exports = EditView;