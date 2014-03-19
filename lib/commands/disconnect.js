module.exports = {
  register: function(socket) {
    socket.on('disconnect', function() {
      console.log("Disconnecting");
      //sockets.emit('player-disconnect', {
      //  player: player
      //});
    });
  }
};
