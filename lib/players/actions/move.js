var attributes = require('../../player').attributes,
    directions = require('../../directions');

/*
 * Action for moving a player on the board
 */
module.exports = {
  name: 'move',
  execute: function() {
    var player = this,
        args = Array.prototype.slice.call(arguments, 0),
        direction = args[0],
        speed = player.getAttributeValue(attributes.SPEED), // how many pixels/socket call to move. Animation will be handled by client
        position = player.getPosition(),
        tile = position.tile,
        x = position.x,
        y = position.y;
    
    // TODO: validate position
    
    // Coordinate system is tile-based with (0, 0) being the upper-left corner
    switch (direction) {
      case directions.LEFT:
        x -= speed;
        break;
      case directions.RIGHT:
        x += speed;
        break;
      case directions.UP:
        y -= speed;
        break;
      case directions.DOWN:
        y += speed;
        break;
      default:
        throw new Error("Unknown direction: '" + direction + "'");
    };
    
    // Check for over/underflow on tile and move to next one if possible
    // TODO: reposition on landing tile
    if (x < 0) {
      if (tile.hasExit(directions.LEFT)) {
        tile = tile.links[directions.LEFT];
      }
    }
    else if (position.x > tile.width) {
       if (tile.hasExit(directions.RIGHT)) {
        tile = tile.links[directions.RIGHT];
       }
    }
    else if (position.y < 0) {
      if (tile.hasExit(directions.UP)) {
        tile = tile.links[directions.UP];
      }
    }
    else if (position.y > tile.height) {
      if (tile.hasExit(directions.DOWN)) {
        tile = tile.links[directions.DOWN];
      }
    }
    
    player.setPosition(tile, position.x, position.y);
  };
};
