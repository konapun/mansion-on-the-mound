var Directions = require('./directions');

/*
 * Available floors in the mansion
 */
var Floors = {
	UPPER: 'upper',
	GROUND: 'ground',
	BASEMENT: 'basement'
};

/*
 * Main map unit - tiles are linked together as the mansion is explored
 */
function Tile(width, height) {
  this.width = width;
  this.height = height;
  this.entities = [];
  this.floors = []; // floors where this tile can be placed
  this.links = {
    Directions.UP: null,
    Directions.DOWN: null,
    Directions.LEFT: null,
    Directions.RIGHT: null
  };
  this.events = {
    onAddPlayer: [],
    onRemovePlayer: []
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
  this.events.onAddPlayer.push(fn);
};

/*
 * Event called when a player is removed from this tile
 */
Tile.prototype.onRemovePlayer = function(fn) {
  this.events.onRemovePlayer.push(fn);
};

module.exports = Tile;
exports.Floors = Floors;
