var Player = require('../player.js');

var attributes = {
  speed: [0, 2, 3, 4, 4, 4, 5, 6, 8],
  might: [0, 3, 4, 4, 4, 4, 5, 6, 8],
  sanity: [0, 1, 1, 2, 4, 4, 4, 5, 5],
  knowledge: [0, 2, 3, 3, 4, 4, 5, 6, 8],
  speedIndex: 4,
  mightIndex: 3,
  sanityIndex: 5,
  knowledgeIndex: 3
};

module.exports = new Player(attributes);

