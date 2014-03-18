var directions = require('./directions'),
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
    up: null,
    down: null,
    left: null,
    right: null
  };
}

/*
 * Connect two tiles together, forming a bidirectional link by default
 */
Tile.prototype.connect = function(direction, tile, bidirectional) {
  bidirectional = typeof bidirectional === 'undefined' ? true : bidirectional;
  
  this.links[direction] = tile;
  if (bidirectional) tile.links[directions.reverse(direction)] = this;
};

/*
 * Disconnect this tile from tiles it connects to, as well as any bidirectional
 * links
 */
Tile.prototype.disconnect = function() {
  var dirs = [directions.UP, directions.DOWN, directions.LEFT, directions.RIGHT];
  
  dirs.forEach(function(direction) { // unlink tiles connected to this
    var tile = this.links[direction];
    if (tile !== null) {
      tile.links[directions.reverse(direction)] = null;
    }
  });
  
  this.links = { // unlink this from other tiles
    up: null,
    down: null,
    left: null,
    right: null
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
