/*
* 内容编辑组件
* */

var React = require('react');

var EditBox = React.createClass({

  onChange: function() {
    var html = this.getDOMNode().innerHTML;
    if(this.props.onChange && html != this.lastHtml) {
      this.props.onChange({
        target: {
          value: html
        }
      });
    }

    this.lastHtml = html;
  },

  render: function() {
    return <div  className="edit-box" onInput={this.onChange} onBlur={this.onChange} contentEditable dangerouslySetInnerHTML={{__html: this.props.html}} ></div>;
  }
  
});

module.exports = EditBox;