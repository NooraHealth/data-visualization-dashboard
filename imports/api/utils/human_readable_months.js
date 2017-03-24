
import { timeMonth } from 'd3';
import { wrappingSlice } from './array_utils.js';

const humanReadableMonths = {
  names: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ],

  getMonthName: function( date ){
    const monthIndex = timeMonth( date ).getMonth();
    return this.names[ monthIndex ];
  },

  getMonths: function( startDate, num ){
    const startIndex = this.names.indexOf( this.getMonthName( startDate ) );
    return wrappingSlice( this.names, startIndex, num );
  },

  reorderMonths: function( startMonthIndex ){
    const firstChunk = this.names.slice( startMonthIndex, this.names.length);
    const secondChunk = this.names.slice( 0, startMonthIndex );
    return firstChunk.concat(secondChunk);
  }
}

export { humanReadableMonths };
