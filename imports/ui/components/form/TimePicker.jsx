'use strict'
import moment from 'moment';
import React from 'react';
import { getHour } from '../../../api/utils';
import { getMinute } from '../../../api/utils.coffee';

const TimePicker = React.createClass({

  propTypes: {
    onChange: React.PropTypes.func,
    startTime: React.PropTypes.string,
    endTime: React.PropTypes.string
  },

  getDefaultProps() {
    return {
      onChange: function(){},
      startTime: null,
      endTime: null
    };
  },

  componentDidMount() {
    $(this.picker).calendar({
      type: "time",
      onChange: this._onChange
    });
    this._setTime( this.props.value );
  },

  componentDidUpdate( prevProps, prevState ){
    if ( prevProps.time !== this.props.time ){
      this._setTime( this.props.value );
    }
  },

  render() {
    return (
      <div className="ui calendar" ref={(picker)=> this.picker = picker}>
        <div className="ui input left icon">
          <i className="time icon"></i>
          <input type="text" placeholder="Time"/>
        </div>
      </div>
    );
  },

  _getMoment(time){
    return moment([2016, 1, 1])
      .add( getHour(time), "hours" )
      .add( getMinute(time), "minutes" );
  },

  _onChange( value ){
    const time = (value)? moment(value).format("HH:mm"): null;
    this.props.onChange( time );
  },

  _setTime( time ){
    const formattedTime = ( time == null )? "" : this._getMoment(time).toDate();
    $(this.picker).calendar("set date", formattedTime );
  }

});

export { TimePicker };
