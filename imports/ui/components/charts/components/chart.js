

import * as d3 from 'd3';

const Chart = {
  select: function( chartId ){
    return d3.select( "#" + chartId );
  },

  reset: function( chart ){
    chart.selectAll("g").remove();
  },

  render: function( chart, width, height, margin ){
    return chart.attr("width", width )
      .attr("height", height )
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    }
}

export { Chart };
