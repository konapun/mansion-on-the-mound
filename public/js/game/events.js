/*
 * Store for events to be triggered by component actions
 */
var events = MansionApp.events = (function() {
  
  var events = {};
  return {
    
    /*
     * Register an event which can be triggered
     */
    register: function(name, cb) {
      events[name] = cb;
    },
    
    /*
     * Trigger a callback by its registration name
     */
    trigger: function(eventName) {
      var event = events[eventName];
      event.apply(this, Array.prototype.slice.call(arguments, 1));
    }
  };
})();

// Register some default events
var socket = MansionApp.globals.socket;
events.register('move', function(direction, units) {
  console.log("MOVING: " + units + " units " + direction);
  socket.emit('call-action', {
    player: -1,
    direction: direction,
    units: units
  });
});

// FIXME - these are responses

/*
 * Respond to socket messages from server
 */
MansionApp.events.responses = {

  /*
   *
   */
  'connect': function(data, socket) {
    var playerName = data.playerName;
    console.log("Got connect");
  },
  'disconnect': function(data, socket) {
    console.log("Got disconnect");
  }
};
