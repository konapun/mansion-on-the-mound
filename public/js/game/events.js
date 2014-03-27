/*
 * Store for events to be triggered by component actions
 */
var events = MansionApp.events = (function() {
  
  var events = {};
  return {
    
    register: function(name, cb) {
      events[name] = cb;
    },
    
    trigger: function(eventName) {
      var event = events[eventName];
      event.apply(this, Array.prototype.slice.call(arguments, 1));
    }
  };
})();

// Register some default events
events.register('move', function(direction, units) {
  console.log("MOVING: " + units + " units " + direction);
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
