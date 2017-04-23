
import * as d3 from 'd3';

const yAxis = {
  render: function( chart, yScale, height ){
    var yAxis = d3.axisLeft()
      .scale(yScale)

    chart.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    }
}

export { yAxis };
