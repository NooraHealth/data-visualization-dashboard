'use strict';

//import { React } from 'react';
import React from 'react';
import crossfilter from 'crossfilter';
import { SelectFacilityContainer } from '../containers/SelectFacilityContainer.jsx';
import { BarChart } from '../components/charts/BarChart.js';
import { AttendanceChart } from '../../api/immutables/AttendanceChart.coffee';
import { List } from 'immutable'
import * as d3 from 'd3';

const HomePage = React.createClass({

  statics: {
    humanReadableMonths: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ]
  },

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
      margin: { top: 20, right: 30, bottom: 30, left: 40 }
    });
    return {
      attendanceChart: attendanceChart,
      updated: false
    };
  },

  componentDidMount() {
    if( this.props.classes ){
      this._updateChartData();
    }
  },

  shouldComponentUpdate(nextProps, nextState) {
    if( nextProps.loading ){
      this.setState({ updated: false })
      return false;
    } else if ( !this.props.loading && nextState.updated ) {
      console.log("UPDATING CHART DATA");
      this._updateChartData();
      this.setState({ updated: true });
      return true;
    }
    return false;
  },

  componentDidUpdate(prevProps, prevState) {
    console.log("UPDATING THE CHART");
    console.log(this.state.attendanceChart.data.toArray());
    BarChart.update( this._getAttendanceChartProps() );
  },

  render(){
    return (
      <div className="ui grid">
        <SelectFacilityContainer />
        <svg id="attendance-chart"/>
      </div>
    )
  },

  _getAttendanceChartProps() {
    const attendanceData = this.state.attendanceChart.data.toArray().map((d)=> { return d.value; });
    return {
      data:    attendanceData,
      margin:  this.state.attendanceChart.margin.toJS(),
      height:  this.state.attendanceChart.height,
      width:   this.state.attendanceChart.width,
      name:    "month",
      value:   "numAttended",
      chartId: "attendance-chart"
    }
  },

  _updateChartData(){
    const ndx = crossfilter( this.props.classes || [] );
    const attendanceData = this._getAttendanceChartData( ndx );
    const list = List( attendanceData );
    const chart = this.state.attendanceChart.set( "data", list );
    this.setState({ attendanceChart: chart, crossfilter: ndx });
  },

  _getAttendanceChartData( ndx ){
    if( !this.props.classes ) { return null };

    const getMonthOfClass = function( klass ){
      const monthIndex = d3.timeMonth(new Date( klass.date )).getMonth();
      return HomePage.humanReadableMonths[monthIndex];
    };

    const attendanceByMonth = ndx.dimension( (d)=> {
      return getMonthOfClass( d );
    });

    const reduced =  attendanceByMonth.group().reduce( (p, v)=> {
        p.numAttended += v.total_patients + v.total_family_members;
        p.month = ( p.month )? p.month : getMonthOfClass(v);
        return p;
      }, (p, v)=> {
        p.numAttended -= v.total_patients + v.total_family_members;
        return p;
      }, (p, v)=> {
        return {
          month: null,
          numAttended: 0
        }
    });

    return reduced.all();
  }
});

export { HomePage };
