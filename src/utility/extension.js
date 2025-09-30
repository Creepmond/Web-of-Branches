window.rmRef = function (obj) {
   return JSON.stringify(obj);
};

//# Array

Array.prototype.random = function() {
   return this[Math.randomRange_int(0, this.length - 1)];
};

Array.prototype.first = function() {
   return this[0];
};

Array.prototype.last = function() {
   return this.toReversed()[0];
};

Array.range = function(array, staticNum = 0) {
   return Math.max(...array) - Math.min(...array) + staticNum;
};

//# END - Array





//# Set

Set.prototype.get = function(index) {
   return [...this][index]
};

Set.prototype.atIndex = function(index) {

};

Set.prototype.random = function() {
   return this.get(Math.randomRange_int(0, this.size - 1));
};

Set.prototype.addArray = function(value) {
   if (Array.isArray(value)) this.add(JSON.stringify(value));
};

Set.prototype.hasArray = function(value) {
   if (Array.isArray(value)) return this.has(JSON.stringify(value));
};

//# END - Set





//# Number

Number.prototype.clamp = function(min, max) {
   return Math.min(Math.max(this.valueOf(), min), max);
};

/*
Number.prototype.toRadian = function() {
   return this * (Math.PI / 180)
}

Number.prototype.toDegree = function() {
   return this * (180 / Math.PI)
}
*/

//# END - Number