
const wrappingSlice = function( arr, startIndex, numToSlice ) {
    var endIndex = startIndex + numToSlice;
    if( endIndex >= arr.length ){
      endIndex -= arr.length;
      const firstChunk = arr.slice( startIndex, arr.length );
      const secondChunk = arr.slice( 0, endIndex );
      return firstChunk.concat( secondChunk );
    } else {
      return arr.slice( startIndex, endIndex );
    }
};

export { wrappingSlice };
