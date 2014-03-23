/*
 * Respond to socket messages from server
 */
MansionApp.events = {

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
