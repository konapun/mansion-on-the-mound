/*
 * Handle connection from client
 */
module.exports = {
  register: function(socket) {
    socket.on('connect', function(data) {
      // server-side connect event
    });
  }
};
