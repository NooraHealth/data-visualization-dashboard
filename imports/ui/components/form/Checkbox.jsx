
import React, { PropTypes } from 'react'

var Checkbox = React.createClass({

  propTypes: {
    label: React.PropTypes.string,
    onChange: React.PropTypes.func,
    required: React.PropTypes.bool,
    checked: React.PropTypes.bool
  },

  defaultProps(){
    return {
      label: "",
      onChange: function(){},
      checked: false
    }
  },

  componentDidMount() {
    const onChange = this.props.onChange;
    $(this.checkbox).checkbox({
      onChange: ()=> {
        const checked = $(this.checkbox).checkbox("is checked");
        onChange( checked );
      }
    });
    this.setChecked(this.props.checked);
  },

  componentDidUpdate(prevProps, prevState) {
    if( this.props.checked !== prevProps.checked ){
      this.setChecked(this.props.checked);
    }
  },

  render(){
    var { label, onChange, required, ...inputProps } = this.props;
    return (
      <div className={ (required)? "required inline field": "inline field" }>
        <label>{ label }</label>
        <div className="ui checkbox" ref={ (checkbox)=> this.checkbox = checkbox }>
          <input type="checkbox" name="activation"/>
        </div>
      </div>
    );
  },

  setChecked( value ){
    let behavior = ( value )? "set checked": "set unchecked";
    $(this.checkbox).checkbox(behavior);
  }

});

module.exports.Checkbox = Checkbox;
