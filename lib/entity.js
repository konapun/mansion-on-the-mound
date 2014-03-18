var extend = require('extend');

/*
 * Prototype for game objects that have a position on a tile
 */
function Entity(tile, x, y) {
  this.position = {
    tile: null,
    x: 0,
    y: 0
  };
  if (typeof tile !== 'undefined') {
    this.setPosition(tile, x, y); 
  }
}

/*
 * Set the position of this entity on a tile
 */
Entity.prototype.setPosition = function(tile, x, y) {
  if (x < 0 || y < 0 || x > tile.width || y  > tile.height) {
    throw new Error("Position out of bounds");
  }
  this.position = {
    tile: tile,
    x: x,
    y: y
  };
};

/*
 * Get the position of this entity
 */
Entity.prototype.getPosition = function() {
  return this.position;
};

/*
 * Convenience method for copying a set of properties into a new entity without
 * having to deal with the prototype. Good for one-off entities which can be
 * required without having to be instantiated with `new`
 */
Entity.prototype.extend = function(properties) {
  return extend(true, properties, this);
};

module.exports = Entity;
module.exports.entity = new Entity(); // export an instance for convenient extends
