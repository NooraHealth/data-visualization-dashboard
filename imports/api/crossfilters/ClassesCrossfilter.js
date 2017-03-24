
import crossfilter from 'crossfilter';
import { timeMonth } from 'd3';
import { humanReadableMonths } from '../utils/human_readable_months.js';

class ClassesCrossfilter {
  constructor( classes ){
    this.ndx = crossfilter( classes || [] );

    this.attendanceByMonth = this.ndx.dimension( (d)=> {
      return humanReadableMonths.getMonthName(new Date( d.date ));
    });

    this.attendanceByLocation = this.ndx.dimension( (d)=> {
      return d.location;
    });

    this.dimensions = [
      this.attendanceByLocation,
      this.attendanceByMonth
    ];
  }

  clear(){
    this.ndx.remove();
    return this;
  }

  setClasses( classes ){
    this.clear();
    this.ndx.add(classes);
    return this;
  }

  getAttendanceChartData( numMonthsToShow ){
    if( numMonthsToShow <= 0 ) { return null };

    const startMonthIndex = timeMonth(new Date()).getMonth() - numMonthsToShow + 1;
    const reorderedCalendar = humanReadableMonths.reorderMonths( startMonthIndex );
    const reduced =  this.attendanceByMonth.group().reduce( (p, v)=> {
        p.numAttended += v.total_patients + v.total_family_members;
        p.month = ( p.month )? p.month : humanReadableMonths.getMonthName(new Date(v.date));
        return p;
      }, (p, v)=> {
        p.numAttended -= v.total_patients + v.total_family_members;
        return p;
      }, (p, v)=> {
        return {
          month: null,
          numAttended: 0
        }
      }).order( (p)=> {
        return -reorderedCalendar.indexOf(p.month);
      }).top( numMonthsToShow );

    return reduced;
  }
}

export { ClassesCrossfilter };
