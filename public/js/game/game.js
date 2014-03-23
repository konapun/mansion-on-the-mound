/*
 * Directions and operations on directions for player movement, tile connection
 */
MansionApp.Directions = {
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

MansionApp.Game = {
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
		
		Crafty.init(this.width(), this.height(), document.getElementById('game'));
		Crafty.scene('Loading');
	}
};

 
$text_css = { 'font-size': '24px', 'font-family': 'Arial', 'color': 'white', 'text-align': 'center' };

