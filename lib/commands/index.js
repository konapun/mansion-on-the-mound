/*
 * Export all commands
 */
var path = require('path'),
    filename = path.basename(__filename),
    commands = [];

require('fs').readdirSync(__dirname).forEach(function(file) {
  if (file !== filename) {
    commands.push(require('./' + file));
  }
});

module.exports = commands;
