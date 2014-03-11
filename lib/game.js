module.exports = Game;

var Player = require('./player.js');

var Game = function(players) {
	this.players = players;
	this.turn = 0;
}
Game.prototype.addPlayer = function(player) {
	if (!this.players[player.name]) { // player must be unique
		this.players[player.name] = player;
		return true;
	}
	
	return false;
}
Game.prototype.nextTurn = function() {
	var char = this.characterForTurn();
	this.players.forEach(function(player) {
		if (player !== char) {
			player.canExit = false;
		}
	});
}
