var commands = [
  require('./connect'),
  require('./disconnect'),
  require('./move')
];
module.exports.handleSocketEvents = function(socket) {
  commands.forEach(function(element) {
    
  });
  
};
