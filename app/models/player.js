var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var PlayerSchema = new Schema({
  id: Number,
  name: String
});

mongoose.model('Player', PlayerSchema);
