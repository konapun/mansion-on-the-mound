/*
 * Connect front end and back end through socket events
 */
var io = require('socket.io'),
    commands = require('../lib/commands');

module.exports = {
  listen: function(port) {
    var server = io.listen(port);
    
    server.sockets.on('connection', function(socket) { // register all commands with socket events
      socket.emit('connect');
      commands.forEach(function(command) {
        command.register(socket);
      });
    });
  }
};
