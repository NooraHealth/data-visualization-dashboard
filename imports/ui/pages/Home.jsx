'use strict';

//import { React } from 'react';
import React from 'react';
import { ClassesCrossfilter } from '../../api/crossfilters/ClassesCrossfilter.js';
import { SelectFacilityContainer } from '../containers/SelectFacilityContainer.jsx';
import { BarChart } from '../components/charts/BarChart.js';
import { AttendanceByMonth } from '../../api/immutables/AttendanceByMonth.coffee';
import { List } from 'immutable'
import * as d3 from 'd3';

const HomePage = React.createClass({

  propTypes: {
    classes: React.PropTypes.array,
    facilityName: React.PropTypes.string,
    loading: React.PropTypes.bool
  },

  defaultProps() {
    return {
      classes: [],
      facilityName: "",
      loading: true
    }
  },

  getInitialState() {
    const attendanceByMonth = new AttendanceByMonth({
      data: null,
      width: 500,
      height: 250,
      numMonthsToShow: 4,
      margin: { top: 20, right: 30, bottom: 30, left: 40 }
    });
    return {
      attendanceByMonth: attendanceByMonth
    };
  },

  componentDidMount() {
    this.classesCrossfilter = new ClassesCrossfilter( this.props.classes );
    if( this.props.classes ){
      BarChart.update( this._getAttendanceByMonthProps( this.classesCrossfilter ));
    }
  },

  componentDidUpdate(prevProps, prevState) {
    if( this.props.classes ){
      this.classesCrossfilter.clear().setClasses( this.props.classes );
      BarChart.update( this._getAttendanceByMonthProps( this.classesCrossfilter ));
    }
  },

  render(){
    return (
      <div className="ui grid">
        <SelectFacilityContainer />
        <svg id="attendance-chart"/>
      </div>
    )
  },

  _getAttendanceByMonthProps( classesCrossfilter ) {
    const numMonths = this.state.attendanceByMonth.numMonthsToShow;
    const attendanceData = classesCrossfilter.getAttendanceByMonthData( numMonths )
      .map((d)=> { return d.value; });
    return {
      data:    attendanceData,
      margin:  this.state.attendanceByMonth.margin.toJS(),
      height:  this.state.attendanceByMonth.height,
      width:   this.state.attendanceByMonth.width,
      name:    "month",
      value:   "numAttended",
      chartId: "attendance-chart"
    }
  }

});

export { HomePage };
