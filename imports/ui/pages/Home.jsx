'use strict';

//import { React } from 'react';
import React from 'react';
import { SelectFacilityContainer } from '../containers/SelectFacilityContainer.jsx';
import { BarChart } from '../components/charts/BarChart.jsx';
import { AttendanceChart } from '../../api/immutables/AttendanceChart.coffee';
import * as d3 from 'd3';

const HomePage = React.createClass({

  propTypes: {
    classes: React.PropTypes.array
  },

  defaultProps() {
    return {
      classes: []
    }
  },

  getInitialState() {
    const data = [
      { month: "January", numAttended: 50},
      { month: "February", numAttended: 25},
      { month: "March", numAttended: 30}
    ];
    const attendanceChart = new AttendanceChart({
      data: data,
      width: 500,
      height: 250,
      margin: { top: 20, right: 30, bottom: 30, left: 40 }
    });
    return {
      attendanceChart: attendanceChart
    };
  },

  render(){
    return (
      <div className="ui grid">
        <SelectFacilityContainer />
        <BarChart
          data={ this.state.attendanceChart.data.toArray() }
          margin={ this.state.attendanceChart.margin.toJS() }
          height={ this.state.attendanceChart.height }
          width={ this.state.attendanceChart.width }
          name="month"
          value="numAttended"
          />
      </div>
    )
  }
});

export { HomePage };
