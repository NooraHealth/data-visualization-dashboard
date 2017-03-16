import React, { PropTypes } from 'react'

var Dropdown = React.createClass({

  propTypes: {
    placeholder: React.PropTypes.string,
    required: React.PropTypes.bool,
    options: React.PropTypes.arrayOf(( options, index )=> {
      return new SimpleSchema({
        value: { type:String },
        name: { type:String }
      }).validate(options[index]);
    }),
    selected: React.PropTypes.arrayOf(( options, index )=> {
      return new SimpleSchema({
        value: { type:String },
        name: { type:String }
      }).validate(options[index]);
    }),
    onChange: React.PropTypes.func
  },

  defaultProps(){
    return {
      placeholder: "",
      onChange: function(){},
      options: [],
      selected: []
    }
  },

  componentDidMount() {
    const onChange = this.props.onChange;
    $(this.dropdown).dropdown({
      allowAdditions: false,
      onChange: function(value, text, selectedItem) {
        onChange(value);
      },
      fullTextSearch: true
    });
    const values = this._getValues(this.props.selected);
    $(this.dropdown).dropdown("set selected", values);
  },

  componentDidUpdate(prevProps, prevState) {
    if( JSON.stringify(this.props.selected) !== JSON.stringify(prevProps.selected)){
      const values = this._getValues(this.props.selected);
      if( values.length == 0 ){
        $(this.dropdown).dropdown("clear");
      } else {
        $(this.dropdown).dropdown("set selected", values);
      }
    }
  },

  render(){
    const { options, multiple, required, label, selected, placeholder, style } = this.props;
    const optionElems = options.map(function(option, i){
      const key = "option-" + option.value;
      return <option value={option.value} key={key}>{option.name}</option>
    });

    const getClasses = ()=> {
      if (multiple) {
        return "ui fluid multiple search normal selection dropdown";
      } else {
        return "ui fluid search normal selection dropdown";
      }
    }
    return (
      <div
        style={ style }
        className={ (required)? "required field": "field" }
        >
        <label>{ label }</label>
        <select
          multiple=''
          className={ getClasses() }
          ref={ (elem)=> this.dropdown = elem }
          >
          <option value="">{ placeholder }</option>
          { optionElems }
        </select>
      </div>
    );
  },

  _getValues( options ){
    return (options)? options.map((selected)=>{ return selected.value }): [];
  }

});

export { Dropdown };
