const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const songSchema = new Schema({
      title: String,
      album: {type: __id, ref: 'Album'},
      artist: {type: _id, ref: 'Artist'},
      duration: Number,
      producer: String,
      musician: String,
      rating: Number,
      favorite: Boolean,
      reviews: [
        {
          user: [{type: _Id, ref: 'User'}],
          comments: String
        }
      ]
}, {
  timestamps: {
    createdAt: "createdAt",
    updatedAt: "updatedAt"
  }
  // provides timestamp when instance is created.
});

const Song = mongoose.model('Song', songSchema);
// ^ this line creates the model from mongoose, which determines what the collection in the db is called. also gives all the magical methods like .find, .findById, .find


module.exports = Song;
//  module.exports 
// = {thing: 'blah', message: 'haha you exported the wrong thing'}

// module.exports says 'const this entire file into a variable that can be used in another file.
// module.exports is totally useless without a require statement on the other end.
// without module.exports, const mongoose require('mongoose') means nothing.
// example: const Task = require('./models/Task) and when that is stated, in that file, const Task will equal whatever is equal to module.exports.
// whatever you module.export, this entire file is = to that random object, whether its the setup schema or one string.