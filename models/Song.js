const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// models are first step to creating new additions to the target database.
// anytime to make a Schema, we have to use mongoose.Schema, to use mongoose, we have to use ('mongoose'); thus require('mongoose') at the top.
// Schema is a feature of mongoose that allows us to make rules for the database, otherwise MongoDB is chaos. Also gives extra features such as default, unique, required, maxlength and minlength.

const songSchema = new Schema({
  title: String,
  genre: String,
  album: [{type: Schema.Types.ObjectId}],
  producer: String,
  rating: Number
  // rules for the model from this Schema object.
}, {
  timestamps: true
  // provides timestamp when instance is created.
})

const Song = mongoose.model('Song', songSchema);
// ^ this line creates the model from mongoose, which determines what the collection in the db is called. also gives all the magical methods like .find, .findById, .find


module.exports = Song;