/*
 * Respond to socket messages from server
 */
var socket = io.connect(server);

socket.on('player-add', function(data) { // new player added to game

});

socket.on('player-disconnect', function(data) { // player disconnected from game

});

socket.on('player-move', function(data) { // orient players across all instances

});
