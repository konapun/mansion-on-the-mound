/*
 * Prototype for game objects that have a position on a tile
 */
function Entity(tile, x, y) {
  this.setPosition(tile, x, y);
}
Entity.prototype.setPosition = function(tile, x, y) {
  if (x < 0 || y < 0 || x > tile.getWidth() || y  > tile.getHeight()) {
    throw new Error("Position out of bounds");
  }
  this.position = {
    tile: tile,
    x: x,
    y: y
  };
};
Entity.prototype.getPosition = function() {
  return this.position;
};

