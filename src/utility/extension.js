window.rmRef = function (obj) {
   return JSON.stringify(obj);
}

Array.prototype.first = function() {
   return this[0];
}

Array.prototype.last = function(array) {
   return this.toReversed().first();
}

Array.range = function(array, staticNum = 0) {
   return Math.max(...array) - Math.min(...array) + staticNum;
};

Set.prototype.addArray = function(value) {
   if (Array.isArray(value)) this.add(JSON.stringify(value));
};

Set.prototype.hasArray = function(value) {
   if (Array.isArray(value)) return this.has(JSON.stringify(value));
};