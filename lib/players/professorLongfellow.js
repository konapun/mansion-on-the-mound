var Player = require('../player'),
    move = require('actions/move'),
    takeDamage = require('actions/takeDamage');

var attributes = {
  speed: {
    values: [0, 2, 3, 4, 4, 4, 5, 6, 8],
    index: 4
  },
  might: {
    values: [0, 3, 4, 4, 4, 4, 5, 6, 8],
    index: 3
  },
  sanity: {
    values: [0, 1, 1, 2, 4, 4, 4, 5, 5],
    index: 5
  },
  knowledge: {
    values: [0, 2, 3, 3, 4, 4, 5, 6, 8],
    index: 3
  }
};

var professor = new Player(attributes);
professor.registerAction(move); // The professor can move by default
professor.registerAction(takeDamage); // The professor is mortal

module.exports = professor;

