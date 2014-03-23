MansionApp = window.MansionApp = {};

// Require game scripts using browserify (via grunt task)
require('./game/game');
require('./game/components');
require('./game/tiles');
require('./game/scenes');

var socket = io.connect('http://localhost'),
    events = require('./game/events');    
for (var eventName in events) { // register client events
  var event = events[eventName];
  socket.on(eventName, function(data) {
    event(data, socket);
  });
}


var players = [

];
window.addEventListener('load', MansionApp.Game.start(players));
