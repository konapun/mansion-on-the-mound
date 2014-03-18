var Entity = require('../../entity');

/*
 * A tutti fruitti point 'n shooty
 */
module.exports = Entity.extend({
  name: 'revolver',
  damage: 1, // where the damage number is how many indexes to move down
  use: function() {
    args = Array.prototype.slice.call(arguments, 0),
    target = args[0]; // entity being shot
    
    // TODO
    //target.takeDamage(
  }
});

