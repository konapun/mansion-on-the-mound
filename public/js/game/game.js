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

