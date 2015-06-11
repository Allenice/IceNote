/*
 * 笔记列表
 * */

var React = require('react'),
    ListItem = require('./ListItem.react'),
    AppConstants = require('../constants/NoteConstants'),
    NoteStore = require('../stores/NoteStore');



var ListBox = React.createClass({

  getInitialState: function() {
    return {
      notes: []
    };
  },

  _onNoteListUpdate: function() {
    this.setState({
      notes: NoteStore.getNoteList()
    });
  },

  componentDidMount: function() {
    NoteStore.on(AppConstants.NOTE_LIST_UPDATE_EVENT, this._onNoteListUpdate);
  },

  componentWillUnmount: function() {
    NoteStore.off(AppConstants.NOTE_LIST_UPDATE_EVENT, this._onNoteListUpdate);
  },

  render: function () {

    var items = [];

    for(var i = 0; i < this.state.notes.length; i++) {
      var note = this.state.notes[i];
      items.push(<ListItem key={i} note={note} />);
    }

    return (
      <ul className="note-list line-bg">
        {items}
      </ul>
    );
  }

});

module.exports = ListBox;