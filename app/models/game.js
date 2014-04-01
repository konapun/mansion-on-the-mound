var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var GameSchema = new Schema({
  title: String,
  url: String,
  text: String
});

GameSchema.virtual('date')
  .get(function(){
    return this._id.getTimestamp();
  });

mongoose.model('Game', GameSchema);
