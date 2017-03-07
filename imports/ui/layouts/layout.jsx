
import React from 'react';
import { NavBar } from './components/header/Navbar.jsx';

var MainLayout = React.createClass({
  render: function(){
    return (
      <div>
        <div className="ui fixed inverted menu">
          <NavBar children={ this.props.nav_components }></NavBar>
        </div>
        <div id="body" className="ui main container">
          { this.props.content }
        </div>
      </div>
    )
  }
});

export { MainLayout };
