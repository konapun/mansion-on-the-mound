var Directions = require('./directions'),
    EventArray = require('./util/event-array.js');

/*
 * Main map unit - tiles are linked together as the mansion is explored
 */
function Tile(width, height) {
  this.width = width;
  this.height = height;
  this.entities = new EventArray(); // trigger tile events on add/remove
  this.floors = []; // floors where this tile can be placed
  this.links = {
    Directions.UP: null,
    Directions.DOWN: null,
    Directions.LEFT: null,
    Directions.RIGHT: null
  };
}

/*
 * Connect two tiles together, forming a bidirectional link by default
 */
Tile.prototype.connect = function(direction, tile, bidirectional) {
  bidirectional = typeof bidirectional === 'undefined' ? true : bidirectional;
  
  this.links[direction] = tile;
  if (bidirectional) tile.links[Directions.reverse(direction)] = this;
};

/*
 * Disconnect this tile from tiles it connects to, as well as any bidirectional
 * links
 */
Tile.prototype.disconnect = function() {
  var directions = [Directions.UP, Directions.DOWN, Directions.LEFT, Directions.RIGHT];
  
  directions.forEach(function(direction) { // unlink tiles connected to this
    var tile = this.links[direction];
    if (tile !== null) {
      tile.links[Directions.reverse(direction)] = null;
    }
  });
  
  this.links = { // unlink this from other tiles
    Directions.UP: null,
    Directions.DOWN: null,
    Directions.LEFT: null,
    Directions.RIGHT: null
  };
};

/*
 * Return whether or not it is possible to proceed in a certain direction from
 * this tile
 */
Tile.prototype.hasExit = function(direction) {
  return this.links[direction] !== null;
};

/*
 * Event called when a player is added to this tile
 */
Tile.prototype.onAddPlayer = function(fn) {
  this.entities.onAddElement(fn);
};

/*
 * Event called when a player is removed from this tile
 */
Tile.prototype.onRemovePlayer = function(fn) {
  this.entities.onRemoveElement(fn);
};

exports.Tile = Tile;
exports.Floors = {
	UPPER: 'upper',
	GROUND: 'ground',
	BASEMENT: 'basement'
};
