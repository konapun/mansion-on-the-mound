MansionApp = window.MansionApp = {};

// Require game scripts using browserify (via grunt task)
require('./game/globals');
require('./game/events');
require('./game/game');
require('./game/components');
require('./game/tiles');
require('./game/scenes');

var socket = MansionApp.globals.socket,
    events = MansionApp.events;
for (var eventName in events) { // register client events
  socket.on(eventName, function(data) {
    var event = events[eventName];
    event(data, socket);
  });
}


var players = [];
window.addEventListener('load', MansionApp.Game.start(players));
