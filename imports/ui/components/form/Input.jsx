
'use strict';

import React from 'react';

var Input = React.createClass({

  propTypes: {
    icon: React.PropTypes.string,
    required: React.PropTypes.bool,
    onChange: React.PropTypes.func
  },

  defaultProps() {
    return {
      value: "",
      icon: "",
      onChange: null
    }
  },

  _handleChange(onChange, e) {
    if(e.target && e.target.value !== undefined) {
      onChange(e.target.value);
    }
  },

  render(){
    var { title, icon, value, required, inputClasses, onChange, ...inputProps } = this.props;
    let classes = (required)? "required field" : "field";
    if( inputClasses !== undefined ){
      classes = inputClasses + " " + classes;
    }
    return (
      <div className={ classes }>
        { this.getInputPrefix() }
        <input
          { ...inputProps }
          value={ value }
          onInput={ this._handleChange.bind(this, onChange) }
        />
      </div>
    );
  },

  getInputPrefix() {
    if( this.props.icon ){
      return <i className={ this.props.icon }></i>;
    }

    if( this.props.label ){
      return (
        <label className="ui sub header"> { this.props.label } </label>
      )
    } else {
      return <div></div>
    }
  }

});

export { Input };
