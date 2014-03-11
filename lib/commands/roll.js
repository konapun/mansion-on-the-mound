module.exports = function(socket, data) {
  var player = data.player,
      attribute = data.attribute;
  
  socket.emit('result', {
    player.rollDice(player.getAttributeValue(attribute));
  });
};
