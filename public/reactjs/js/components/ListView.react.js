/*
* 首页 -- 列表页
* */

var React = require('react'),
    ListBox = require('./ListBox.react'),
    NoteAction = require('../actions/NoteAction'),
    NoteModel = require('../models/NoteModel'),
    AppConstants = require('../constants/NoteConstants');

var ListView = React.createClass({

  onAddBtnClick: function() {
    NoteAction.editNote(new NoteModel());
    NoteAction.showView(AppConstants.EDIT_VIEW);
  },

  render: function () {
    var classes = 'page page-index ';

    if(this.props.className) classes += this.props.className;

    return (
      <div className={classes}>
        <header>
          <h1>笔记</h1>
          <a className="pull-right" href="javascript:void(0);" onClick={this.onAddBtnClick}  ><i className="fa fa-plus"></i></a>
        </header>
        <div className="content">
          <ListBox></ListBox>
        </div>
      </div>
    );
  }
});


module.exports = ListView;