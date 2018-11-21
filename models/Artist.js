const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// models are first step to creating new additions to the target database.
// anytime to make a Schema, we have to use mongoose.Schema, to use mongoose, we have to use ('mongoose'); thus require('mongoose') at the top.
// Schema is a feature of mongoose that allows us to make rules for the database, otherwise MongoDB is chaos. Also gives extra features such as default, unique, required, maxlength and minlength.

const artistSchema = new Schema({
      name: String,
      genre: String,
      album: [{type: _Id, ref: 'Album'}],
      song:  [{type: _Id, ref: 'Song'}],
      hometown: String,
      rating: Number,
      reviews: [
        {
          user: [{type: _Id, ref: 'User'}],
          comments: String
        }
      ]
      // rules for the model from this Schema object.
}, {
      timestamps: {
        createdAt: "createdAt",
        updatedAt: "updatedAt"
      }
      // provides timestamp when instance is created.
});

const Artist = mongoose.model('Artist', artistSchema);
// ^ this line creates the model from mongoose, which determines what the collection in the db is called. also gives all the magical methods like .find, .findById, .find


module.exports = Artist;
//  module.exports 
// = {thing: 'blah', message: 'haha you exported the wrong thing'}

// module.exports says 'const this entire file into a variable that can be used in another file.
// module.exports is totally useless without a require statement on the other end.
// without module.exports, const mongoose require('mongoose') means nothing.
// example: const Task = require('./models/Task) and when that is stated, in that file, const Task will equal whatever is equal to module.exports.
// whatever you module.export, this entire file is = to that random object, whether its the setup schema or one string.