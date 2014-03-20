/*
 * Respond to socket messages from server
 */
MansionApp.events = {
  'connect': function(data, socket) {
    alert("Got connect");
  },
  'disconnect': function(data, socket) {
    alert("Got disconnect");
  }
};

