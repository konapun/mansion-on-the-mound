module.exports = function(app){

	// home route
	var home = require('../app/controllers/home');
	app.get('/', home.index);
  
  // games routes
  var games = require('../app/controllers/games');
  app.get('/games/search', games.search);
  app.get('/games/new', games.new);
};
