var mongoose = require('mongoose'),
    game = require('../../lib/game'),
    Game = mongoose.model('Game');

exports.index = function(req, res){
  /*Article.find(function(err, articles){
    if(err) throw new Error(err);
    res.render('home/index', {
      title: 'Generator-Express MVC',
      articles: articles
    });
  });*/
  
  res.render('home/index', {
    title: 'Mystery at the Mansion on the Mound'
  });
};
