/*
 * An array that accepts callbacks for operations. This is a wrapper for a
 * subset of Array rather than a "subclass" because it's important to know which
 * methods alter the array contents (which could change in the future)
 *
 */
function EventArray() {
  this.elements = []; // Can't add elements before callbacks are allowed to bind
  this._onAddElement = [];
  this._onRemoveElement = [];
}

EventArray.prototype.onAddElement = function(cb) {
  this._onAddElement.push(cb);
};

EventArray.prototype.onRemoveElement = function(cb) {
  this._onRemoveElement.push(cb);
};

EventArray.prototype.pop = function() {
  var removed = this.elements.pop();
  runRemoveCallbacks.apply(this, removed);
  
  return removed;
};

EventArray.prototype.push = function() {
  var len = this.elements.push(arguments);
  runAddCallbacks.apply(this, arguments); //Array.prototype.slice.call(arguments, 0));
  
  return len;
};

EventArray.prototype.reverse = function() {
  return this.elements.reverse();
};

EventArray.prototype.shift = function() {
  var removed = this.elements.shift();
  runRemoveCallbacks.apply(this, removed);
};

EventArray.prototype.unshift = function() {
  var len = this.elements.unshift(arguments);
  runAddCallbacks.apply(this, arguments);
  
  return len;
};

EventArray.prototype.join = function() {
  return this.elements.join(arguments);
};

EventArray.prototype.indexOf = function() {
  return this.elements.indexOf(arguments);
};

EventArray.prototype.lastIndexOf = function() {
  return this.elements.lastIndexOf(arguments);
};

EventArray.prototype.forEach = function() {
  return this.elements.forEach(arguments);
};

EventArray.prototype.every = function() {
  return this.elements.every(arguments);
};

EventArray.prototype.some = function() {
  return this.elements.some(arguments);
};

/*
EventArray.prototype.filter = function() {
  return this.elements.filter(arguments);
};

EventArray.prototype.map = function() {
  return this.elements.map(arguments);
};

EventArray.prototype.reduce = function() {
  return this.elements.reduce(arguments);
};

EventArray.prototype.reduceRight = function() {
  return this.elements.reduceRight(arguments);
};
*/

module.exports = EventArray;

function runAddCallbacks() {
  elements = Array.prototype.slice.call(arguments, 0);
  this._onAddElement.forEach(function(cb) {
    elements.forEach(function(arg) {
      cb(arg);
    });
  });
}

function runRemoveCallbacks(elements) {
  this._onRemoveElement.forEach(function(cb) {
    cb(removed);
  });
} 
