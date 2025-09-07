Array.range = function(array, staticNum = 0) {
   return Math.max(...array) - Math.min(...array) + staticNum;
};

Set.prototype.addArray = function(value) {
   if (Array.isArray(value)) this.add(JSON.stringify(value));
};

Set.prototype.hasArray = function(value) {
   if (Array.isArray(value)) this.has(JSON.stringify(value));
};