var mongoose = require('mongoose'),
    Game = mongoose.model('Game');

module.exports = {
  
  /*
   * Search for a game to join
   */
  search: function(req, res) {
    res.render('games/search', {
      title: 'Search for game to join'
    });
  },
  
  /*
   * Start a new game
   */
  new: function(req, res) {
  
  }
};
