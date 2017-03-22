
Immutable = require 'immutable'

BaseAttendanceChart = Immutable.Record {
  data: Immutable.Seq(),
  margin: Immutable.Map(),
  height: 500,
  width: 940
}

class AttendanceChart extends BaseAttendanceChart
  constructor: ( properties )->
    super Object.assign({}, properties, {
      data: Immutable.Seq properties && properties.data
    }, {
      margin: Immutable.Map properties && properties.margin
    });

module.exports.AttendanceChart = AttendanceChart
