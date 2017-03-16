'use strict';

import React from 'react';
import { Input } from '../Input.jsx';
import { Search } from '../Search.jsx';
import { Checkbox } from '../Checkbox.jsx';
import { Dropdown } from '../Dropdown.jsx';
import { TimePicker } from '../TimePicker.jsx';

var Form = React.createClass({
  propTypes: {
    onSubmit: React.PropTypes.func,
    submitButtonContent: React.PropTypes.string,
    disabled: React.PropTypes.bool
  },

  defaultProps(){
    return {
      onSubmit: function(){},
      children: [],
      submitButtonContent: "SUBMIT"
    }
  },

  getInitialState(){ return {} },

  render(){
    let onSubmit = this.props.onSubmit;
    let submitButtonContent = this.props.submitButtonContent;
    return (
      <div className="ui form">
        { this.props.children }
        <p><button type="submit" key='submitbutton' className="ui fluid blue button" onClick={ onSubmit } disabled={ this.props.disabled }>{ this.props.submitButtonContent }</button></p>
      </div>
    )
  }
});

Form.Input = Input;
Form.Search = Search;
Form.Checkbox = Checkbox;
Form.Dropdown = Dropdown;
Form.TimePicker = TimePicker;

export { Form };
