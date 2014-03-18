/*
 * Connect front end and back end through socket events
 */
var io = requrie('socket.io');
module.exports = {
  listen: function(port) {
    configureSockets(io);
    io.listen(port);
  }
};

/*
 * Set up all socket events
 */
function configureSockets(io) {
  io.sockets.on('connection', function(socket) {
    socket.emit('connect'); // broadcast connect event to all listeners
    
    // TODO
  });
}
