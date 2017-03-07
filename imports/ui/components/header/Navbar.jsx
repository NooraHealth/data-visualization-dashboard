
'use strict';

import React from 'react';

var NavBar = React.createClass({
  render: function(){
    let children = React.Children.map( this.props.children, function( child ){
      return <div className="ui right floated borderless item">{child}</div>
    })
    return (
      <div className="ui container">
        <a href="/" className="ui borderless item">
          <img className="ui" alt="Noora Health" src="/NHlogo.png"/>
        </a>
        { children }
      </div>
    )
  }
});

export { NavBar };
