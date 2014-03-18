var Entity = require('./entity'),
    Dice = require('./dice');

var Attributes = {
	SANITY: 'sanity',
	SPEED: 'speed',
	KNOWLEDGE: 'knowledge',
	STRENGTH: 'strength'
};

/*
 * Create a player via attributes (contained in the data directory)
 */
var Player = function(attributes) {
	this.attributes = attributes;
	this.roomsLeft = 0;
	this.canExit = false;
	this.actions = {};
};
Player.prototype = Object.create(Entity.prototype);

/*
 * If any player attribute is 0, the player is dead
 */
Player.prototype.isAlive = function() {
	var alive = true;
	[Attributes.SANITY, Attributes.STRENGTH, Attributes.SPEED, Attributes.KNOWLEDGE].some(function(attr) {
		if (this[attr].index === 0) {
			alive = false;
			return true;
		}
	});
	
	return alive;
};

/*
 * Retrieve the current value for an attribute
 */
Player.prototype.getAttributeValue = function(attr) {
	return this._getPropValue(attr);
};

/*
 * Increment an attribute by its value slide and return the new value. If the
 * slider is already maxed out, the value is not changed and instead is only
 * returned
 */
Player.prototype.incrementAttribute = function(attr, levels) {
	return this._runPropChange(attr, levels);
};

/*
 * Like incrementAttribute, but reverse
 */
Player.prototype.decrementAttribute = function(attr, levels) {
	return this._runPropChange(attr, levels, true);
};

/*
 * Give this player a new move, making this object available through `this` in
 * the action
 */
Player.prototype.registerAction = function(action) {
  var fn = action.execute;
  this.actions[action.name] = function() {
    fn.apply(this, arguments);
  };
};

/*
 * Remove a move from this player
 */
Player.prototype.unregisterAction = function(actionName) {
  delete this.actions[actionName];
};

/*
 * Roll a given number of dice and return the total for the roll
 */
Player.prototype.rollDice = function(ndice) {
	ndice = typeof ndice === 'undefined' ? 1 : ndice;
	
	var total = 0;
	for (var i = 0; i < ndice; i++) {
		total += Dice.roll();
	}
};

Player.prototype.takeTurn = function(game) {
  // TODO
};

Player.prototype._runPropChange = function(attr, levels, minus) {
	levels = typeof levels === 'undefined' ? 1 : levels;
	minus = typeof minus === 'undefined' ? false : minus;
	
	if (levels == 0) {
		return this._getPropValue(attr);
	}
	else {
		if (minus) { // decrement prop index
			if (this[attr].index > 0) {
				this[attr].index--;
			}
			else {
				levels = 0;
			}
		}
		else { // increment prop index
			if (this[attr].index < this[attr].values.length-2) {
				this[attr].index++;
			}
			else {
				levels = 0;
			}
		}
		this._runPropChange(attr, levels-1, minus);
	}
};

Player.prototype._getPropValue = function(attr) {
	return this[attr].values[this[attr].index];
}

exports.Player = Player;
exports.Attributes = Attributes;

