
import * as d3 from 'd3';

const xAxis = {
  render: function( chart, xScale, height ){
    var xAxis = d3.axisBottom()
      .scale(xScale)

    chart.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);
    }
}

export { xAxis };
