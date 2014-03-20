MansionApp = window.MansionApp = {};

// Require game scripts using browserify (via grunt task)
var socket = io.connect('http://localhost'),
    events = require('./game/events'),
    game = require('./game/game'),
    components = require('./game/components.js'), // TODO: require elsewhere
    tiles = require('./game/tiles.js'),
    scenes = require('./game/scenes.js');
for (var eventName in events) { // register client events
  var event = events[eventName];
  socket.on(eventName, function(data) {
    event(data, socket);
  });
}


var players = [

];
window.addEventListener('load', MansionApp.Game.start(players));
