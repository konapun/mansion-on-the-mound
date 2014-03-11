module.exports = function(socket, data) {
  var player = data.player,
      attribute = data.attribute,
      levels = data.levels;
  
  player.decrementAttribute(attribute, levels);
  if (!player.isAlive()) {
    socket.emit('die', {
      player: player
    });
  }
};
