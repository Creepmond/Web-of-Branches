Array.range = function(array, staticNum = 0) {
   return Math.max(...array) - Math.min(...array) + staticNum;
};