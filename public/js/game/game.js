/*
 * Available floors in the mansion
 */
var Floors = {
	UPPER: 'upper',
	GROUND: 'ground',
	BASEMENT: 'basement'
};

/*
 * Directions and operations on directions for player movement, tile connection
 */
var Directions = {
	/*
	 * Enum for directions
	 */
	RIGHT: 'right',
	LEFT: 'left',
	DOWN: 'down',
	UP: 'up',
	ABOVE: 'above',
	BELOW: 'below',
	
	/*
	 * Return the reverse of any direction
	 */
	reverse: function(direction) {
		if (direction === this.RIGHT) {
			return this.LEFT;
		}
		if (direction === this.LEFT) {
			return this.RIGHT;
		}
		if (direction === this.UP) {
			return this.DOWN;
		}
		if (direction === this.DOWN) {
			return this.UP;
		}
		
		return direction; // ABOVE and BELOW won't change
	},
	
	/*
	 * Rotate a direction either clockwise (default) or counterclockwise
	 */
	rotate: function(direction, counterclockwise) {
		counterclockwise = typeof counterclockwise === 'undefined' ? false : counterclockwise;
		
		var rotated = direction;
		if (direction === this.RIGHT) {
			rotated = this.DOWN;
		}
		else if (direction === this.LEFT) {
			rotated = this.UP;
		}
		else if (direction === this.UP) { 
			rotated = this.RIGHT;
		}
		else if (direction === this.DOWN) {
			rotated = this.LEFT;
		}
		
		if (counterclockwise) {
			rotated = this.reverse(rotated);
		}
		
		return rotated;
	}
};

/*
 * A stack of cards. Will have a separate stack for each card type
 */
var CardStack = function(cards) {
	cards = typeof cards === 'undefined' ? [] : cards;
	this.cards = cards;
};
CardStack.prototype.draw = function() {
	return this.cards.pop();
};
CardStack.prototype.shuffle = function() { // adapted from http://jsfromhell.com/array/shuffle
	var cards = this.cards;
	for (var j, x, i = cards.length; i; j = Math.floor(Math.random() * i), x = cards[--i], cards[i] = cards[j], cards[j] = x);
	this.cards = cards;
	return cards;
};

/*
 * A six-sided die, but die sounds scarier than dice even though it's more correct...
 */
var Dice = {
	roll: function() {
		return Math.floor(Math.random() * 6) + 1; // number between 1 and 6
	}
};

var Game = {
	players: [],
	turn: 0,
	map_grid: {
		width: 1,
		height: 1,
		tile: {
			width: 188,
			height: 188
		}
	},
	
	width: function() {
		return this.map_grid.width * this.map_grid.tile.width;
	},
	
	height: function() {
		return this.map_grid.height * this.map_grid.tile.height;
	},
	
	takeTurn: function() {
		var char = this.characterForTurn();
		this.players.forEach(function(player) {
			if (player
		});
		this.turn++;
	},
	
	characterForTurn: function() {
		return this.players[this.turn % this.players.length];
	},
	
	/*
	 * Initialize a new game with a list of given players
	 */
	start: function(players) {
		this.players = players;
		
		Crafty.init(Game.width(), Game.height(), document.getElementById('game'));
		Crafty.scene('Loading');
	}
};

 
$text_css = { 'font-size': '24px', 'font-family': 'Arial', 'color': 'white', 'text-align': 'center' };

