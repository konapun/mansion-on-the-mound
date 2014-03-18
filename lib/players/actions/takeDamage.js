/*
 * Action for moving a player on the board
 */
module.exports = {
  name: 'takeDamage',
  execute: function() {
    var player = this,
        args = Array.prototype.slice.call(arguments, 0),
        type = args[0],
        hitpoints = args.length > 1 ? args[1] : 1; // how many units on the slider to move down (default: 1)
    
    player.decrementAttribute(type, hitpoints);
  }
};
