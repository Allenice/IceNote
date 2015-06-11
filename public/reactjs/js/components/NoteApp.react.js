/*
* 笔记应用主体
* */

var React = require('react'),
    ListView = require('./ListView.react'),
    EditView = require('./EditView.react'),
    ContentView = require('./ContentView.react'),
    NoteStore = require('../stores/NoteStore'),
    AppConstants = require('../constants/NoteConstants');


var NoteApp = React.createClass({

  getInitialState: function () {
    return {
      view: NoteStore.getView()
    }
  },

  componentDidMount: function() {
    NoteStore.on(AppConstants.CHANGE_VIEW_EVENT, this._onChangeView);
  },

  componentWillUnmount: function() {
    NoteStore.off(AppConstants.CHANGE_VIEW_EVENT, this._onChangeView);
  },

  _onChangeView: function() {
    this.setState({
      view: NoteStore.getView()
    });
  },


  render: function() {

    var view = this.state.view;

    var listViewClass = view === AppConstants.LIST_VIEW ? 'enter' : 'exit';
    var editViewClass = view === AppConstants.EDIT_VIEW ? 'enter' : 'exit';
    var contentViewClass = view === AppConstants.CONTENT_VIEW ? 'enter' : 'exit';

    return (
      <div className="container">
        <ListView className={listViewClass} />
        <EditView className={editViewClass}  />
        <ContentView className={contentViewClass} ></ContentView>
      </div>
    );
  }

});

module.exports = NoteApp;