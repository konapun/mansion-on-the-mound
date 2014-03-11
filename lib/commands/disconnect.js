module.exports = function(socket, data) {
  socket.on('disconnect', function() {
    sockets.emit('player-disconnect', {
      player: player
    });
  });
};
