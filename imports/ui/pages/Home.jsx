'use strict';

//import { React } from 'react';
import React from 'react';

const HomePage = React.createClass({

  propTypes: {
    currentFacilityName: React.PropTypes.string
  },

  defaultProps() {
    return {
      currentFacilityName: ""
    }
  },

  render(){
    return (
      <div className="ui grid">
        <div> CONTENT </div>
      </div>
    )
  }
});

export { HomePage };
