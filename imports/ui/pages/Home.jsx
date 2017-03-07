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
        <p className="eight wide column"><a
          href="/addClass"
          className="fluid ui blue button"
          > Add Class
        </a></p>

        <p className="eight wide column"><a
          href="/selectClass/editClass"
          className="fluid ui yellow button"
          > Edit Class
        </a></p>

        <p className="eight wide column"><a
          href="/selectClass/addNewAttendees"
          className="fluid ui blue button"
          > Add Attendees
        </a></p>

        <p className="eight wide column"><a
          href="/selectClass/editAttendees"
          className="fluid ui yellow button"
          > Edit Attendees
        </a></p>
      </div>
    )
  }
});

export { HomePage };
