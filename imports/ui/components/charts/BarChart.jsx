
'use strict';

//import { React } from 'react';
import React from 'react';
import { Bars } from './components/Bars.jsx';
import * as d3 from 'd3';

const BarChart = React.createClass({

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
    this.renderBars();
  },

  render(){
    return (
      <div>
        <svg className="attendance-chart">
        </svg>
      </div>
    )
  },

  renderBars() {
    const margin  = this.props.margin;
    const name    = this.props.name;
    const value   = this.props.value;
    const height  = this.props.height - margin.top - margin.bottom;
    const width   = this.props.width - margin.left - margin.right;
    const data    = this.props.data;

    const chart = d3.select(".attendance-chart")
      .attr("width", width + margin.left + margin.right )
      .attr("height", height + margin.top + margin.bottom )
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    const barNames = data.map( function(d){ return d[name] });

    var x = d3.scaleBand()
      .domain( barNames )
      .rangeRound([0, width])
      .padding(0.1);

    var maxValue = d3.max(data, function(d) { return d[value]; });

    var y = d3.scaleLinear()
      .range([height, 0])
      .domain([0, maxValue ]);

    var bar = chart.selectAll("g")
      .data(data)
      .enter().append("g")
      .attr("transform", function(d, i) {
        return "translate(" + x(d[name]) + ",0)";
      });

    bar.append("rect")
      .attr("y", function(d) { return y(d[value]); })
      .attr("height", function(d) { return height - y(d[value]); })
      .attr("width", x.bandwidth())
      .attr("class", "fill blue")
      .on("mouseover", function(d) {
        d3.select(this).attr("class", "fill orange");
      })
      .on("mouseout", function(d) {
        d3.select(this).attr("class", "fill blue");
      });

    bar.append("text")
      .attr("x", x.bandwidth() / 2)
      .attr("y", function(d) { return y(d[value]) + 3; })
      .attr("dy", ".75em")
      .text(function(d) { return d[value]; });

    var xAxis = d3.axisBottom()
      .scale(x)

    var yAxis = d3.axisLeft()
      .scale(y)

    chart.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

    chart.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    }
});

export { BarChart };
