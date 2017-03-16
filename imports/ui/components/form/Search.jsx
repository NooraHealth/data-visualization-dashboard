
'use strict';

import React from 'react';

var Search = React.createClass({

  propTypes: {
    value: React.PropTypes.string,
    label: React.PropTypes.string,
    icon: React.PropTypes.string,
    required: React.PropTypes.bool,
    onChange: React.PropTypes.func,
    source: React.PropTypes.array
  },

  defaultProps() {
    return {
      value: "",
      icon: "",
      onChange: function(){}
    }
  },

  componentDidMount() {
    const changeInputValue = (function(e) {
      const activeResult = $(this.search).find(".result.active");
      const text = $(this.search).find(".result.active").text();
      const acceptedKeyCodes = [ 13, 40, 38 ];
      if(
        acceptedKeyCodes.indexOf(e.keyCode) != -1 &&
        activeResult.length == 1 &&
        text != this.props.value ){
          this.props.onChange( text );
        }
    }).bind(this);

    $(this.input).keyup(changeInputValue);
    this._initializeSearch();
  },

  componentDidUpdate( prevProps, prevState ) {
    const shouldUpdateSearch = this.props.source !== null &&
                        prevProps.source !== null &&
                        JSON.stringify( this.props.source ) !== JSON.stringify(prevProps.source);
    if(shouldUpdateSearch){
      this._initializeSearch()
    }
  },

  _initializeSearch(){
    $(this.search)
      .search({
        source: this.props.source,
        searchFields: [
          'title'
        ],
        searchFullText: false,
        minCharacters: 0
      });
    $(this.search).search("clear cache");
  },

  handleClick( onChange, e ){
    const onResultClicked = function(e) {
      let text = $(e.target).text();
      onChange( text );
    };

    $(this.search).find(".result").click(onResultClicked);
  },

  handleChange( onChange, e ){
    if(e.target && e.target.value !== undefined ) {
      onChange(e.target.value);
    }
  },

  handleFocus(){
    $(this.search).search("search local", "");
  },

  render(){
    var { label, icon, value, onChange, required, source, loading, ...inputProps } = this.props;
    const getInputClasses = function() {
      const defaultClasses = "ui fluid";
      const type = (icon)? "left icon": "";
      // return defaultClasses + type + " input";
      return defaultClasses + type;
    }
    const getInputPrefix = function() {
      if( icon ){
        return <i className={icon}></i>;
      } else {
        return (
          <label>{ label }</label>
        )
      }
    }
    return (
      <div className={ (required)? "required field" : "field" }>
        { getInputPrefix() }
        <div
          className="ui search"
          ref={ (search)=> this.search = search }
          >
          <div className={ getInputClasses() }>
            <input
              { ...inputProps }
              className="prompt"
              type="text"
              value={ value }
              onBlur={ this.handleClick.bind(this, onChange) }
              onFocus={ this.handleFocus }
              onChange={ this.handleChange.bind(this, onChange) }
              ref={ (input) => this.input = input }
              />
          </div>
          <div className="results" ref={(results)=> this.results = results}></div>
        </div>
      </div>
    );
  }
});

export { Search };
