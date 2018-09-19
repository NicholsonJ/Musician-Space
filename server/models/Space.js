const mongoose = require('mongoose');

const spaceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'The practice space name is required'],
    minlength: 1
  },
  loc: {
    type: 'Point',
    coordinates: [String],
    required: [true, 'The practice space name is required']
  },
  website: String,
  description: String,
  price: String,
  picture: String,
  _user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

const Space = mongoose.model('Space', spaceSchema);

module.exports = Space;
