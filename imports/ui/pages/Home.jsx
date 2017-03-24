'use strict';

//import { React } from 'react';
import React from 'react';
import { ClassesCrossfilter } from '../../api/crossfilters/ClassesCrossfilter.js';
import { SelectFacilityContainer } from '../containers/SelectFacilityContainer.jsx';
import { BarChart } from '../components/charts/BarChart.js';
import { AttendanceChart } from '../../api/immutables/AttendanceChart.coffee';
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
    const attendanceChart = new AttendanceChart({
      data: null,
      width: 500,
      height: 250,
      numMonthsToShow: 4,
      margin: { top: 20, right: 30, bottom: 30, left: 40 }
    });
    return {
      attendanceChart: attendanceChart
    };
  },

  componentDidMount() {
    this.classesCrossfilter = new ClassesCrossfilter( this.props.classes );
    if( this.props.classes ){
      BarChart.update( this._getAttendanceChartProps( this.classesCrossfilter ));
    }
  },

  componentDidUpdate(prevProps, prevState) {
    if( this.props.classes ){
      this.classesCrossfilter.clear().setClasses( this.props.classes );
      BarChart.update( this._getAttendanceChartProps( this.classesCrossfilter ));
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

  _getAttendanceChartProps( classesCrossfilter ) {
    const numMonths = this.state.attendanceChart.numMonthsToShow;
    const attendanceData = classesCrossfilter.getAttendanceChartData( numMonths )
      .map((d)=> { return d.value; });
    return {
      data:    attendanceData,
      margin:  this.state.attendanceChart.margin.toJS(),
      height:  this.state.attendanceChart.height,
      width:   this.state.attendanceChart.width,
      name:    "month",
      value:   "numAttended",
      chartId: "attendance-chart"
    }
  }

});

export { HomePage };
