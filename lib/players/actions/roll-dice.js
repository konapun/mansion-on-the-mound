/*
 * Roll a given number of dice and return the total for the roll.
 *
 * Usage: player.actions.rollDice(numberOfDice)
 */
 
var dice = require('./dice');

module.exports = {
  name: 'rollDice',
  execute: function() {
    var player = this,
        args = Array.prototype.slice.call(arguments, 0),
        ndice = args.length > 0 ? args[0] : 1; // just roll 1 die
    
    var total = 0;
	  for (var i = 0; i < ndice; i++) {
		  total += dice.roll();
	  }
	  return total;
  }
};

