var Dice = require('./dice.js');

/*
 * Create a player via attributes (contained in the data directory)
 */
var Player = function(attributes) {
	this.attributes = attributes;
	this.roomsLeft = 0;
	this.canExit = false;
};
Player.prototype.setPosition = function(tile, x, y) {

};
Player.prototype.isAlive = function() {
	var alive = true;
	['sanity', 'strength', 'speed', 'knowledge'].some(function(attr) {
		if (this[attr].index === 0) {
			alive = false;
			return true;
		}
	});
	
	return alive;
};
Player.prototype.getAttributeValue = function(attr) {
	return this._getPropValue(attr);
};
Player.prototype.incrementAttribute = function(attr, levels) {
	return this._runPropChange(attr, levels);
};
Player.prototype.decrementAttribute = function(attr, levels) {
	return this._runPropChange(attr, levels, true);
};
Player.prototype.rollDice = function(ndice) {
	ndice = typeof ndice === 'undefined' ? 1 : ndice;
	
	var total = 0;
	for (var i = 0; i < ndice; i++) {
		total += Dice.roll();
	}
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

module.exports = Player;
exports.Attributes = {
	SANITY: 'sanity',
	SPEED: 'speed',
	KNOWLEDGE: 'knowledge',
	STRENGTH: 'strength'
};

