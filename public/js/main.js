MansionApp = window.MansionApp = {};

// Require game scripts using browserify (via grunt task)
require('./game/game');
require('./game/components');
require('./game/tiles');
require('./game/scenes');
require('./game/events');

var socket = io.connect('http://localhost'),
    events = MansionApp.events;
for (var eventName in events) { // register client events
  socket.on(eventName, function(data) {
    var event = events[eventName];
    event(data, socket);
  });
}


var players = [];
window.addEventListener('load', MansionApp.Game.start(players));
