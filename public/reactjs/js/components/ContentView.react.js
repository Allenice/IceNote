/*
 * 查看内容页面
 * */

var React = require('react'),
    NoteAction = require('../actions/NoteAction'),
    NoteStore = require('../stores/NoteStore'),
    AppConstants = require('../constants/NoteConstants');

var ContentView = React.createClass({

  getInitialState: function() {
    return NoteStore.getNote()
  },

  onBackBtnClick: function() {
    NoteAction.showView(AppConstants.LIST_VIEW);
  },

  onEditBtnClick: function() {
    var notes = NoteStore.getNoteList(),
        id = this.state.id;
    var note = notes.filter(function(item) {
      return item.id === id;
    });

    NoteAction.editNote(note[0]);
    NoteAction.showView(AppConstants.EDIT_VIEW);
  },

  _onViewShow: function(note) {
    this.setState(note);
  },

  componentDidMount: function() {
    NoteStore.on(AppConstants.VIEW_NOTE_EVENT, this._onViewShow);
  },

  componentWillUnmount: function() {
    NoteStore.off(AppConstants.VIEW_NOTE_EVENT, this._onViewShow);
  },

  render: function () {

    var classes = 'page page-view ';

    if(this.props.className) classes += this.props.className;

    return (
      <div className={classes}>
        <header>
          <a href="javascript:void(0);" onClick={this.onBackBtnClick}><i className="fa fa-arrow-left"></i></a>
          <h1>{this.state.title}</h1>
          <a className="pull-right" href="javascript:void(0);" onClick={this.onEditBtnClick}><i className="fa fa-pencil"></i></a>
        </header>
        <div className="content line-bg">
          <div className="note-content">{this.state.content}</div>
        </div>
      </div>
    );
  }
});


module.exports = ContentView;