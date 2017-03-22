
'use strict';

//import { React } from 'react';
import React from 'react';
// import { Bars } from './components/Bars.jsx';
import * as d3 from 'd3';

class BarChart = React.createClass({

  propTypes: {
    data: React.PropTypes.array,
    height: React.PropTypes.number,
    width: React.PropTypes.number,
    value: React.PropTypes.string,
    name: React.PropTypes.string
  },

  defaultProps() {
    return {
      height: 0,
      width: 0,
      value: "",
      name: "",
      data: []
    }
  },

  componentDidMount() {
    this.updateChart();
  },

  shouldComponentUpdate(nextProps, nextState) {
    this.updateChart();
    return false;
  },

  componentDidUpdate(prevProps, prevState) {
  },

  render(){
    return (
      <div id={ this.props.chartId } ></div>
    )
  },

  updateChart() {
    const chart        = d3.select( "#" + this.props.chartId );
    const margin       = this.props.margin;
    const name         = this.props.name;
    const value        = this.props.value;
    const innerHeight  = this.props.height - margin.top - margin.bottom;
    const innerWidth   = this.props.width - margin.left - margin.right;
    const data         = this.props.data;
    const barNames     = data.map( function(d){ return d[name] });
    const maxValue     = d3.max(data, function(d) { return d[value]; });
    const y            = this.yScale( innerHeight, maxValue );
    const x            = this.xScale( barNames, innerWidth );

    this.renderChartContainer( chart, this.props.width, this.props.height, margin );
    this.renderBars( chart, data, name, value, x, y);
    this.renderXAxis( chart, x, innerHeight );
    this.renderYAxis( chart, y );
  },

  renderChartContainer( chart, width, height, margin ) {
    chart.append("svg")
      .attr("width", width )
      .attr("height", height )
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  },

  renderBars( chart, data, name, value, x, y ) {
    chart.selectAll("g").remove();

    var bars = chart.selectAll("g")
      .data(data)
      .enter()
      .append("g")
      .attr("transform", function(d, i) {
        return "translate(" + x(d[name]) + ",0)";
      })

    bars.append("rect")
      .attr("y", function(d) { return y(d[value]); })
      .attr("height", function(d) { return height - y(d[value]); })
      .attr("class", "fill blue")
      .on("mouseover", function(d) {
        d3.select(this).attr("class", "fill orange");
      })
      .on("mouseout", function(d) {
        d3.select(this).attr("class", "fill blue");
      })

    bars.append("text")
      .attr("x", x.bandwidth() / 2)
      .attr("y", function(d) { return y(d[value]) + 3; })
      .attr("dy", ".75em")
      .attr("class", "white text")
      .text(function(d) { return d[value]; });

    bars.exit().remove()
  },

  renderXAxis(chart, xScale, height) {
    var xAxis = d3.axisBottom()
      .scale(xScale)

    chart.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);
  },

  renderYAxis(chart, yScale) {
    var yAxis = d3.axisLeft()
      .scale(yScale)

    chart.append("g")
      .attr("class", "y axis")
      .call(yAxis)
  },

  xScale( barNames, width ) {
    return d3.scaleBand()
      .domain( barNames )
      .rangeRound([0, width])
      .padding(0.1);
  },

  yScale( height, maxValue ) {
    return d3.scaleLinear()
      .range([height, 0])
      .domain([0, maxValue ]);
  }
});

export { BarChart };
