/*
 * Add an item to the player's inventory.
 *
 * Usage: player.actions.pickupItem(item)
 */
 
var dice = require('./dice');

module.exports = {
  name: 'pickupItem',
  execute: function() {
    var player = this,
        args = Array.prototype.slice.call(arguments, 0),
        item = args[0];
    
    player.inventory.push(item);
  }
};

