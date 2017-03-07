'use strict';

import React from 'react';

var BackButton = React.createClass({
  render: function(){
    return (
      <div>
        <a href="/" className="ui inverted button"> <i className="arrow circle outline left icon"></i>Go Back</a>
      </div>
    )
  }
});

export { BackButton };
