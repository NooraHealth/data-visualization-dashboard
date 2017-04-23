
Immutable = require 'immutable'

BaseAttendanceByMonth = Immutable.Record {
  data: Immutable.List(),
  margin: Immutable.Map(),
  height: 500,
  width: 940,
  numMonthsToShow: 4
}

class AttendanceByMonth extends BaseAttendanceByMonth
  constructor: ( properties )->
    super Object.assign({}, properties, {
      data: Immutable.List properties && properties.data
    }, {
      margin: Immutable.Map properties && properties.margin
    });

module.exports.AttendanceByMonth = AttendanceByMonth;
