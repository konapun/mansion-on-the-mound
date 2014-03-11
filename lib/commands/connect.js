var game = require('../game');

module.exports = function(sockets, data) {
  socket.on('connection', function(socket) {
    var player;
    if (game.acceptsNewPlayer()) {
      socket.on('select-character', function(name) {
        player = game.addPlayer(characters[name]);
        if (player) {
          sockets.emit('player-add', {
            player: player
          });
        }
      });
    }
    else {
      socket.emit('fail');
    }
  });
}
