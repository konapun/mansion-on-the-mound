/*
 * This socket command handles all interactions with a player since all player
 * actions are implemented as plugins
 */
module.exports = {
  register: function(socket) {
    socket.on('action', function(data) {
      var playerID = data.playerID,
          action = data.action.name,
          arguments = data.action.arguments;
      
      var player = null; // TODO: Get player by ID
      player.actions[action].apply(player, arguments);
      // TODO: Sync clients
    });
  }
};
