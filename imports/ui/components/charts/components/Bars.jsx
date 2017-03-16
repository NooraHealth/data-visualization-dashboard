
'use strict';

//import { React } from 'react';
import React from 'react';
import * as d3 from 'd3';

const Bars = React.createClass({

  propTypes: {
    height: React.PropTypes.number,
    width: React.PropTypes.number,
    data: React.PropTypes.array,
    value: React.PropTypes.string,
    name: React.PropTypes.string
  },

  defaultProps() {
    return {
      data: [],
      value: "",
      name: "",
      width: 0,
      height: 0
    }
  },

  componentDidMount() {
    console.log("in did mount");
    if( this.props.chart ){
      this.renderBars();
    }
  },

  componentDidUpdate(prevProps, prevState) {
    if( this.props.chart ){
      this.renderBars();
    }
  },

  render(){
    return ( <div></div> )
  },

  renderBars(){
    const name    = this.props.name;
    const value   = this.props.value;
    const height  = this.props.height;
    const width   = this.props.width;
    const data    = this.props.data;
    const chart   = this.props.chart;
    const barNames = data.map( function(d){ return d[name] });

    var x = d3.scaleBand()
      .domain( barNames )
      .rangeRound([0, width])
      .padding(0.1);

    var y = d3.scaleLinear()
      .range([height, 0])
      .domain([0, d3.max(data, function(d) { return d[value]; })]);

    console.log("D3");
    console.log(d3);
    console.log("CHART");
    console.log(chart);
    console.log("DATA");
    console.log(data);
    console.log("SELECT ALL");
    console.log(chart.selectAll("g"));
    console.log("SELECT ALL with data");
    console.log(chart.selectAll("g").data([10, 22, 33]));
    var bar = chart.selectAll("g")
      .data([10, 24, 1])
      .enter().append("g")
      // .text(function(d){ return d[name] })
      // .attr("transform", function(d, i) {
      //   console.log("Returning ");
      //   console.log(d[name]);
      //   console.log(i);
      //   return "translate(" + i * x(d[name]) + ",0)";
      // });
    console.log(data);
    console.log("Barj");
    console.log(bar);
      // .enter().append("div")

    bar.append("rect")
      .attr("y", function(d) { return y(d[value]); })
      .attr("height", function(d) { return height - y(d[value]); })
      .attr("width", x.bandwidth() );

    bar.append("text")
      .attr("x", x.bandwidth() / 2)
      .attr("y", function(d) { return y(d[value]) + 3; })
      .attr("dy", ".75em")
      .text(function(d) { return d[value]; });},
});

export { Bars };
