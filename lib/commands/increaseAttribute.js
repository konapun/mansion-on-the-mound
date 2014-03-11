module.exports = function(socket, data) {
  var player = data.player,
      attribute = data.attribute,
      levels = data.levels;
  
  player.increaseAttribute(attribute, levels);
};
