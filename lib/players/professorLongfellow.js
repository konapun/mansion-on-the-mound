var Player = require('../player.js');

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

module.exports = new Player(attributes);

