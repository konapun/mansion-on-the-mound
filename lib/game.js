module.exports = Game;

var Game = function(players) {
	this.players = players;
	this.turn = 0;
}

/*
 * Add a new playable character to the game
 */
Game.prototype.addPlayer = function(player) {
	if (!this.players[player.name]) { // player must be unique
		this.players[player.name] = player;
		return true;
	}
	
	return false;
};

/*
 * Advance turn to next player
 */
Game.prototype.nextTurn = function() {
	var char = this.currentPlayer();
	this.players.forEach(function(player) {
		if (player !== char) {
			player.canExit = false;
		}
	});
};

/*
 * Return the character who is currently taking a turn
 */
Game.prototype.currentPlayer = function() {
  var players = this.players;
  
  return players[players.length / this.turn];
};
