function Game(players) {
  this.players = players;
  this.turn = 0;
  this.running = false;
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

/*
 * Start the game. The game will run until it is stopped by a character calls
 * game.stop
 */
Game.prototype.start = function() {
  var game = this;
  game.running = true;
  while (game.running) {
    this.players.forEach(function(player) {
      if (player.isAlive()) {
        player.takeTurn(game);
      }
    });
  }
};

Game.prototype.stop = function() {
  this.running = false;
};

module.exports = Game;
