module.exports = function(socket, data) {
  var player = data.player,
      coords = data.coords;
      
  player.setPosition(coords.x, coords.y);
};
