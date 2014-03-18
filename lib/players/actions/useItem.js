/*
 * Action for moving a player on the board
 */
module.exports = {
  name: 'useItem',
  execute: function() {
    var player = this,
        args = Array.prototype.slice.call(arguments, 0),
        item = args[0]; // FIXME I don't know if this is an item name or object yet
    
    var itemIndex = player.inventory.indexOf(item);
    if (itemIndex < 0) {
      throw new Error("Couldn't find item in inventory");
    }
    
    var item = player.inventory[itemIndex];
    if (item.use()) { // Use returns true/false depending on success/failure
      player.inventory.splice(itemIndex, 1);
    }
  };
};
