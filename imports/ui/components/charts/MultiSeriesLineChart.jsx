'use strict';

import * as d3 from 'd3';
import { Chart } from './components/chart.js';
import { xAxis } from './components/xAxis.js';
import { yAxis } from './components/yAxis.js';

const BarChart = {

  update: function( props ){
    const margin       = props.margin;
    const name         = props.name;
    const value        = props.value;
    const innerHeight  = props.height - margin.top - margin.bottom;
    const innerWidth   = props.width - margin.left - margin.right;
    const data         = props.data;
    const barNames     = data.map( function(d){ return d[name] });
    const maxValue     = d3.max( data, function(d) { return d[value]; });
    const y            = this.yScale( innerHeight, maxValue );
    const x            = this.xScale( barNames, innerWidth );
    const chart        = Chart.select( props.chartId );
    Chart.reset( chart );

    const container = Chart.render( chart, props.width, props.height, margin );
    this.renderBars( container, innerHeight, data, name, value, x, y );
    xAxis.render( container, x, innerHeight );
    yAxis.render( container, y );
  },

  renderBars: function( chart, height, data, name, value, x, y ) {

    var bars = chart.selectAll(".bars")
      .data(data)
      .enter()
      .append("g")
      .attr("transform", function(d, i) {
        return "translate(" + x(d[name]) + ",0)";
      })

    bars.append("rect")
      .attr("y", function(d) { return y(d[value]); })
      .attr("height", function(d) { return height - y(d[value]); })
      .attr("width", x.bandwidth() )
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

  xScale: function( barNames, width ) {
    return d3.scaleBand()
      .domain( barNames )
      .rangeRound([0, width])
      .padding(0.1);
  },

  yScale: function( height, maxValue ) {
    return d3.scaleLinear()
      .range([ height, 0])
      .domain([0, maxValue ]);
  }
};

export { BarChart };
