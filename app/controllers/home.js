exports.index = function(req, res) {
  
  /*
   * Home page
   */
  res.render('home/index', {
    title: 'Mystery at the Mansion on the Mound'
  });
};
